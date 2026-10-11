// Derives per-scene start/end seconds inside a single continuous narration file.
// Inputs: whisper.cpp token-level transcript JSON (from @remotion/install-whisper-cpp),
//         narration/script.md (per-scene text), ffmpeg silencedetect log.
// Output: scene-boundaries.json + a human-readable report on stdout.
// Scenes are emitted as a contiguous tiling of the file: each boundary is the midpoint of the
// pause that precedes the next scene's first spoken word, so Sequence windows built from these
// spans stay locked to the single continuous audio track.
// Usage: node scripts/derive-scene-boundaries.mjs <transcript.json> <silence.log> <out.json> <totalSeconds> [script.md]
import fs from 'node:fs';

const [transcriptPath, silencePath, outPath, totalSecondsArg, scriptPath = 'src/episodes/001-redis/narration/script.md'] =
  process.argv.slice(2);
const totalSeconds = Number(totalSecondsArg);

const norm = (w) =>
  w.toLowerCase().replace(/[^a-z0-9]/g, '');
const numberWords = {ten: '10', twenty: '20'};
const canon = (w) => {
  const n = norm(w);
  return numberWords[n] ?? n;
};

// --- script: scene -> words
const md = fs.readFileSync(scriptPath, 'utf8');
const sceneBlocks = [...md.matchAll(/^## Scene (\d\d) — .*\n\n([\s\S]*?)\n\n\*\(Est/gm)];
const scenes = sceneBlocks.map((m) => ({
  id: m[1],
  text: m[2],
  words: m[2].replace(/—|\.\.\./g, ' ').split(/\s+/).map(canon).filter(Boolean),
}));
const sceneIds = [...fs.readFileSync('src/episodes/001-redis/scenes.ts', 'utf8').matchAll(/^    id: '(\d\d-[a-z-]+)'/gm)].map((m) => m[1]);
if (scenes.length !== 14 || sceneIds.length !== 14)
  throw new Error(`expected 14 scenes, got script=${scenes.length} scenes.ts=${sceneIds.length}`);
const scriptWords = scenes.flatMap((s, si) => s.words.map((w) => ({w, si})));

// --- transcript: merge tokens into words with start/end seconds
const tr = JSON.parse(fs.readFileSync(transcriptPath, 'utf8')).transcription;
const spoken = [];
for (const seg of tr) {
  const t = seg.text;
  if (!t || t.startsWith('[')) continue;
  const start = seg.offsets.from / 1000;
  const end = seg.offsets.to / 1000;
  if (t.startsWith(' ') || spoken.length === 0) spoken.push({raw: t.trim(), start, end});
  else {
    const last = spoken[spoken.length - 1];
    last.raw += t;
    last.end = end;
  }
}
// split "word," glued with following punctuation tokens is already handled; drop empties
const words = spoken.map((s) => ({...s, w: canon(s.raw)})).filter((s) => s.w);

// --- silences (speech gaps)
const silences = [...fs.readFileSync(silencePath, 'utf8').matchAll(/silence_start: ([\d.]+)[\s\S]*?silence_end: ([\d.]+)/g)].map(
  (m) => ({start: +m[1], end: +m[2]}),
);

// --- global alignment (Needleman-Wunsch, edit distance)
const n = scriptWords.length, m = words.length;
const D = Array.from({length: n + 1}, () => new Int32Array(m + 1));
for (let i = 0; i <= n; i++) D[i][0] = i;
for (let j = 0; j <= m; j++) D[0][j] = j;
for (let i = 1; i <= n; i++)
  for (let j = 1; j <= m; j++) {
    const sub = D[i - 1][j - 1] + (scriptWords[i - 1].w === words[j - 1].w ? 0 : 1);
    D[i][j] = Math.min(sub, D[i - 1][j] + 1, D[i][j - 1] + 1);
  }
const map = new Array(n).fill(-1); // script idx -> transcript idx (exact matches only)
let i = n, j = m;
while (i > 0 && j > 0) {
  const same = scriptWords[i - 1].w === words[j - 1].w;
  if (D[i][j] === D[i - 1][j - 1] + (same ? 0 : 1)) {
    if (same) map[i - 1] = j - 1;
    else map[i - 1] = -2 - (j - 1); // substituted: remember position, lower confidence
    i--; j--;
  } else if (D[i][j] === D[i - 1][j] + 1) i--;
  else j--;
}
const posOf = (idx) => (map[idx] >= 0 ? map[idx] : map[idx] <= -2 ? -2 - map[idx] : -1);

const result = [];
const report = [];
for (let si = 0; si < scenes.length; si++) {
  const idxs = scriptWords.map((s, k) => (s.si === si ? k : -1)).filter((k) => k >= 0);
  const matched = idxs.filter((k) => map[k] >= 0).length;
  const firstPos = idxs.map(posOf).find((p) => p >= 0);
  const lastPos = [...idxs].reverse().map(posOf).find((p) => p >= 0);
  const startSeconds = words[firstPos].start;
  let endSeconds = words[lastPos].end;
  // whisper stretches a word's end into following silence; snap to real silence onset
  const sil = silences.find((s) => s.start >= words[lastPos].start && s.start <= endSeconds + 0.6);
  if (sil) endSeconds = Math.min(endSeconds, sil.start);
  result.push({sceneId: scenes[si].id, startSeconds, endSeconds, _firstWord: words[firstPos].raw, _lastWord: words[lastPos].raw, _confidence: matched / idxs.length});
}
// Contiguous tiling: boundary k = midpoint of the pause ending at scene k's first word.
const lowConfidence = [];
const bounds = result.map((r, k) => {
  if (k === 0) return 0;
  const sil = silences.find((x) => x.end >= r.startSeconds - 0.15 && x.end <= r.startSeconds + 0.25);
  if (!sil) lowConfidence.push(r.sceneId);
  return sil ? (sil.start + sil.end) / 2 : r.startSeconds - 0.15;
});
const round = (v) => Math.round(v * 100) / 100;
const out = result.map((r, k) => ({
  sceneId: sceneIds[k],
  startSeconds: round(bounds[k]),
  endSeconds: round(k + 1 < bounds.length ? bounds[k + 1] : totalSeconds),
}));
fs.writeFileSync(outPath, JSON.stringify(out, null, 2) + '\n');
console.log('scene start    end    dur   words  wps  conf  speech[start-end]  first/last');
result.forEach((r, k) => {
  const dur = out[k].endSeconds - out[k].startSeconds;
  console.log(
    `${r.sceneId}  ${out[k].startSeconds.toFixed(2).padStart(7)} ${out[k].endSeconds.toFixed(2).padStart(7)} ${dur.toFixed(2).padStart(6)}  ${String(scenes[k].words.length).padStart(4)}  ${(scenes[k].words.length / dur).toFixed(2)}  ${r._confidence.toFixed(2)}  [${r.startSeconds.toFixed(2)}-${r.endSeconds.toFixed(2)}]  ${r._firstWord} … ${r._lastWord}`,
  );
});
console.log('boundaries without a clear preceding pause:', lowConfidence.join(', ') || 'none');
