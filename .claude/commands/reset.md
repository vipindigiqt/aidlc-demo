---
name: reset
description: /reset — Reset Working Memory
---

# /reset — Reset Working Memory

Drop accumulated session context. Re-read core baseline. Use when session long, context stale, or behavior drifted.

## Steps
1. Drop all context from working memory except CLAUDE.md itself
2. Re-read `CLAUDE.md`
3. Re-read `.claude/context/stack.md`
4. Confirm:
   > "Reset complete. Re-read CLAUDE.md + stack.md. Other context loads on demand."

## Rules
- Do not summarize or carry over prior session state
- Do not re-read all context files — load on demand per CLAUDE.md table
- Task immediately after `/reset` → load relevant context first
