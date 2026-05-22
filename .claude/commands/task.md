---
name: task
description: /task — Task Intake
---

# /task — Task Intake

Auto-runs on every user request before any code. User does not type `/task`.

## Flow
1. **Load context** — always `stack.md`; add `structure.md` (files), `patterns.md` (code), `ui.md` (UI), `api.md` (backend), `decisions.md` (if major decision likely).
2. **List unknowns** — internally enumerate every Major Decision (see CLAUDE.md). If zero → skip to step 4.
3. **Ask** — one question at a time. Next question depends on previous answer (decision tree, not flat list). Brief context per question. If user unsure, offer 2–3 options + one-line tradeoffs, re-ask. Never proceed until all majors resolved.
4. **Confirm plan** — 2–4 bullets. Wait for user response or 5s. Then implement.
5. **Implement** — follow CLAUDE.md rules.
6. **Post-task** — update context files per CLAUDE.md "After Implementation" table.

## Rules
- Mandatory — never skip to implementation
- Questions sequential, not batched
- Plan confirm before any file write
- Zero-unknown trivia (typo fix etc.) → skip steps 2–4
