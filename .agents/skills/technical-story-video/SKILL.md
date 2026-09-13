---
name: technical-story-video
description: Plan, implement, render, and review multilingual technical explainer episodes in technical-story-engine. Use for narrative, storyboard, visual metaphor, Remotion scene work, or director review in this repository; not for unrelated Remotion projects.
---

# Technical Story Video

Read the active task and the repository-root `AGENTS.md` before acting. Use `docs/production-architecture.md` for scene, timing, assets, and multilingual constraints, and `docs/agent-workflow.md` for validation and review.

## Workflow

Move from source material to a reviewed video deliberately:

```text
source material -> core technical thesis -> video narrative -> narration
-> storyboard -> visual metaphor -> technical representation
-> implementation -> render -> agent review -> human review -> revision
```

At each step preserve the active task's scope. State the single technical thesis, remove details that do not support it, and make each scene earn its place. Use real-world metaphor only when it maps clearly to the engineering model:

```text
real-world metaphor -> explicit visual mapping -> technical model
```

## Production decisions

- Technical clarity is more important than visual novelty.
- Use the installed official Remotion skills for current API and markup guidance.
- Keep motion scene-relative and adaptable to narration timing.
- Keep one conceptual visual master for `en`, `de`, and `fr`; avoid baked-in essential text.
- Consume external media through logical asset IDs, never provider-specific components.
- Use humor sparingly: explain -> tiny joke -> continue.
- Keep prototypes in DEV compositions until the task authorizes production-scene work.
- Treat rendered media as pending human review. Only explicit user acceptance can mark an asset approved.
- Use the canonical feedback handoff in `docs/agent-workflow.md`: enumerate human-review artifacts and external-asset requirements, or state `None.` explicitly. Provide external-media requirements, not final provider prompts.

## Completion

Run the checks relevant to the change. For visible work, render and inspect representative frames using the checklist and Human Media Review Gate in `docs/agent-workflow.md`. Record real results and known issues, state `HUMAN REVIEW: PENDING`, and stop rather than beginning the next task.
