$ErrorActionPreference = 'Stop'

$projectRoot = Split-Path -Parent $PSScriptRoot
$canonicalSkill = Join-Path $projectRoot '.agents/skills/technical-story-video/SKILL.md'
$claudeSkillDirectory = Join-Path $projectRoot '.claude/skills/technical-story-video'
$claudeSkill = Join-Path $claudeSkillDirectory 'SKILL.md'

if (-not (Test-Path -LiteralPath $canonicalSkill)) {
  throw "Canonical skill not found: $canonicalSkill"
}

New-Item -ItemType Directory -Path $claudeSkillDirectory -Force | Out-Null
Copy-Item -LiteralPath $canonicalSkill -Destination $claudeSkill -Force

$canonicalHash = (Get-FileHash -LiteralPath $canonicalSkill -Algorithm SHA256).Hash
$claudeHash = (Get-FileHash -LiteralPath $claudeSkill -Algorithm SHA256).Hash

if ($canonicalHash -ne $claudeHash) {
  throw 'Custom skill synchronization failed: hashes differ.'
}

Write-Output "Synchronized technical-story-video ($canonicalHash)"
