# /reset — Reset Working Memory

## What This Command Does
Clears all context from working memory accumulated during a long session.
Re-reads only the essential files to restore a clean baseline.
Use when the session is long, context feels stale, or behaviour has drifted.

---

## Steps

1. Drop all context from working memory except this file
2. Re-read `CLAUDE.md`
3. Re-read `.claude/context/stack.md`
4. Confirm reset is complete:
   > "Reset complete. I've re-read CLAUDE.md and stack.md. All other context files will be loaded on demand as tasks require them."

---

## Rules
- Do not summarise or carry over anything from the previous session state
- Do not re-read all context files — load them on demand per the table in CLAUDE.md
- If a task is requested immediately after /reset, load the relevant context files before proceeding