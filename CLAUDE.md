# CLAUDE.md

## Commands
| Command | File | Purpose |
|---------|------|---------|
| `/init` | `.claude/commands/init.md` | Scaffold a new greenfield project |
| `/scan` | `.claude/commands/scan.md` | Detect and document an existing project |
| `/check` | `.claude/commands/check.md` | Validate all context files are populated |
| `/reset` | `.claude/commands/reset.md` | Clear working memory, re-read core context |
| `/task` | `.claude/commands/task.md` | Start a task with clarifying questions |

**Every conversation starts with `/check`.** If it fails, run `/init` or `/scan` first.

---

## Context Files — Load on Demand
| File | Load when... |
|------|--------------|
| `.claude/context/stack.md` | Any task |
| `.claude/context/structure.md` | Creating or moving files |
| `.claude/context/patterns.md` | Writing any code |
| `.claude/context/decisions.md` | Making a major decision |
| `.claude/context/ui.md` | Any UI or component work |
| `.claude/context/api.md` | Any backend or API work |

---

## Clarifying Questions
Do not wait for `/task`. On every user request, before writing any code:
1. Identify all unknowns that qualify as major decisions (see below)
2. Ask questions sequentially — next question depends on previous answer
3. Never ask more than one decision at a time
4. Once all unknowns are resolved, confirm the plan in one sentence then proceed

---

## Major Decisions — Always Ask, Never Assume
- Any library not already in `stack.md`
- Choosing between two valid implementation approaches
- Creating a new module or shared component
- Any schema or API contract change
- Any pattern not yet in `patterns.md`
- Any change touching more than 3 modules
- Deleting, deprecating, or disabling existing shared code

---

## During Implementation
- Follow `stack.md`, `structure.md`, and `patterns.md` exactly
- Scaffold all boilerplate in the current working directory — never create a subfolder unless explicitly asked
- When installing packages: `npm install <package>` with no version pin — always installs latest
- Never auto-install a package the user has not approved in the current conversation
- No new modules without confirmed name and location

---

## After Implementation
| What happened | Update |
|---------------|--------|
| Major decision made | `decisions.md` |
| New module or folder | `structure.md` |
| New API route | `api.md` |
| New pattern established | `patterns.md` |

---

## Never
- Write code before clarifying questions are resolved
- Pin package versions unless explicitly asked
- Create abstractions not asked for
- Rename, move, or delete files without explicit instruction
- Add explanatory comments unless asked
- Commit or push without explicit instruction