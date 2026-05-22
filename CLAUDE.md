# CLAUDE.md

## Response Style — caveman ON by default
Caveman mode active every response in this project. Min tokens, full technical accuracy. Canonical rules: `.claude/skills/caveman/SKILL.md`.

Inline summary so no reload needed:
- Drop: articles, filler (just/really/basically/actually/simply), pleasantries (sure/certainly/happy to), hedging, trailing summaries, preambles.
- Fragments OK. One word when one word enough. Arrows for causality (X -> Y).
- Abbreviate: DB, auth, config, req/res, fn, impl, deps.
- Unchanged: technical terms, code blocks, error strings, file paths.
- Prefer tables/bullets over prose for ≥3 items.

**Auto-Clarity Exception** — full sentences for: destructive-action confirms, security warnings, multi-step order-sensitive instructions, when user asks "explain more". Resume caveman after.

**Disable** — only when user says `stop caveman` or `normal mode`.

## Commands
| Command | File | Purpose |
|---------|------|---------|
| `/init` | `.claude/commands/init.md` | Scaffold new greenfield project |
| `/scan` | `.claude/commands/scan.md` | Detect + document existing project |
| `/check` | `.claude/commands/check.md` | Validate context files populated |
| `/reset` | `.claude/commands/reset.md` | Clear working memory, re-read core context |
| `/task` | `.claude/commands/task.md` | Start task with clarifying questions |

Every conversation starts with `/check`. If fails → run `/init` or `/scan`.

## Context Files — Load on Demand
| File | Load when |
|------|-----------|
| `.claude/context/stack.md` | Any task |
| `.claude/context/structure.md` | Creating/moving files |
| `.claude/context/patterns.md` | Writing any code |
| `.claude/context/decisions.md` | Making major decision |
| `.claude/context/ui.md` | UI / component work |
| `.claude/context/api.md` | Backend / API work |

## Clarifying Questions
Before any code, on every request:
- List unknowns matching Major Decisions below. Ask sequentially, next depends on previous. One at a time.
- Once resolved, confirm plan in one sentence, proceed.

## Major Decisions — Always Ask, Never Assume
- Library not in `stack.md`
- Two valid implementation approaches
- New module or shared component
- Schema or API contract change
- Pattern not in `patterns.md`
- Change touching >3 modules
- Deleting / deprecating / disabling shared code

## During Implementation
- Follow `stack.md`, `structure.md`, `patterns.md` exactly
- Scaffold in current working dir — never create subfolder unless asked
- Install: `npm install <pkg>` no version pin — latest
- Never auto-install pkg not approved this conversation
- No new modules without confirmed name + location

## After Implementation
| What happened | Update |
|---------------|--------|
| Major decision made | `decisions.md` |
| New module/folder | `structure.md` |
| New API route | `api.md` |
| New pattern established | `patterns.md` |

## Never
- Write code before clarifying questions resolved
- Pin package versions unless asked
- Create abstractions not asked for
- Rename/move/delete files without explicit instruction
- Add explanatory comments unless asked
- Commit or push without explicit instruction
