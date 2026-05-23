# aidlc-demo — Claude Setup Guide

Getting-started doc for devs new to this repo's Claude Code config. Explains the four moving parts: **CLAUDE.md**, **context files**, **commands**, **skills**.

---

## TL;DR

```
.claude/
├── commands/   # slash-commands you type:  /init /scan /check /reset /task
├── context/    # project facts Claude loads on demand (stack, structure, etc.)
├── skills/     # auto-triggered expertise (React, NestJS, Tailwind, ...)
└── settings.local.json
CLAUDE.md       # top-level rules — loaded every conversation
```

Flow per session:
1. Claude auto-runs `/check` → context files OK?
2. No → run `/init` (new project) or `/scan` (existing).
3. Yes → make your request. `/task` auto-runs: clarifying Qs → plan → code.
4. Post-implementation: Claude updates relevant context file.

---

## 1. CLAUDE.md (root)

Always loaded. Defines:
- **Response style** — caveman mode ON by default (terse, fragments, no filler). Disable: `stop caveman` / `normal mode`.
- **Commands table** — which slash-commands exist.
- **Context files load-on-demand table** — when each `.claude/context/*.md` gets pulled in.
- **Major Decisions list** — triggers that force Claude to ask before coding (new lib, schema change, >3 modules, etc.).
- **Never list** — hard rules (no version pins, no unrequested abstractions, no commit without permission, ...).

Edit this file to change global behavior for this repo.

---

## 2. Context Files (`.claude/context/`)

Project memory. Append-only for some. Claude loads only what current task needs.

| File | Purpose | Loaded when |
|------|---------|-------------|
| `stack.md` | Languages, frameworks, libs, versions, tooling | Every task |
| `structure.md` | Folder layout + conventions | Creating/moving files |
| `patterns.md` | How code is written here (routing, styling, components, ...) | Writing any code |
| `decisions.md` | Append-only log: date / decision / reason | Major decision needed |
| `ui.md` | Component rules, styling rules, naming | UI work |
| `api.md` | Conventions + append-only routes table | Backend work |

Rules:
- `decisions.md` + `api.md` routes table → **append-only**. Never edit/delete rows.
- Empty fields not allowed in `stack.md`. Delete unused sections.
- Inferred entries (from `/scan`) tagged `[inferred]`.

---

## 3. Commands (`.claude/commands/`)

Slash-commands. Type them in chat.

| Command | When to use |
|---------|-------------|
| `/init` | Brand-new project. Walks decision tree (name, frontend/backend/fullstack, ...) → scaffolds in CWD → installs deps → writes context files |
| `/scan` | Existing codebase. Reads `package.json`, configs, folder tree, sample source files → fills context files with detected + inferred values |
| `/check` | Validates all 6 context files exist + populated. Auto-runs at session start. Blocks tasks on fail |
| `/reset` | Wipes context files back to empty templates. Requires explicit `yes` confirmation. Use when stack changes radically |
| `/task` | Auto-runs on every user request. Loads relevant context → asks clarifying Qs sequentially → confirms plan → implements → updates context files. **You don't type this** |

First-time session checklist:
1. `/check` → likely fails on fresh repo
2. `/init` (new) or `/scan` (existing)
3. `/check` again → green
4. Start making requests

---

## 4. Skills (`.claude/skills/`)

Auto-triggered expertise bundles. Claude picks them based on file type / keywords. No invocation needed.

| Skill | Triggers on |
|-------|-------------|
| `caveman` | Default-on this project. Compresses output ~75% |
| `react-best-practices` | `.tsx`/`.jsx` with React imports |
| `nestjs-best-practices` | NestJS code (modules, DI, decorators) |
| `typescript` | `.ts`/`.tsx` work — strict types, generics, no `any` |
| `tailwind-4` | Tailwind className / variants / cn() |
| `zod-4` | Zod schemas (v3→v4 migration covered) |
| `zustand-5` | Zustand stores, selectors, persist |
| `mantine-form` | `@mantine/form` — useForm, validation, field arrays |

Each skill has its own `SKILL.md` with rules. Read directly if curious.

---

## How A Typical Request Flows

```
You: "add a /users endpoint that returns paginated users"
  │
  ▼
/task auto-runs
  │  loads stack.md + api.md + patterns.md
  ▼
Major decisions check
  │  new route → ask: pagination style? cursor or offset?
  ▼
You answer → Claude confirms 2-bullet plan
  ▼
Implements
  │  nestjs-best-practices skill activates (NestJS detected)
  │  typescript skill activates (.ts file)
  │  zod-4 activates (DTO validation)
  ▼
Post-task
  │  appends row to api.md routes table
  │  if new pattern → adds to patterns.md
  ▼
Done
```

---

## Common Pitfalls

- **Don't edit `decisions.md` / `api.md` routes manually after the fact** — append only.
- **Don't pin pkg versions** unless explicitly required. Default install is latest.
- **Don't ask Claude to skip clarifying Qs.** They prevent rework on Major Decisions.
- **Don't create subfolders unprompted** — Claude scaffolds in CWD by design.
- **Caveman mode confuses new readers** — say `normal mode` if onboarding someone.

---

## Modifying The Setup

| Want to | Edit |
|---------|------|
| Change default response style | `CLAUDE.md` § Response Style |
| Add a Major Decision trigger | `CLAUDE.md` § Major Decisions |
| Add a context file | New file in `.claude/context/` + row in `CLAUDE.md` load-on-demand table |
| Add a slash-command | New `.md` in `.claude/commands/` with `name` + `description` frontmatter |
| Add a skill | New folder in `.claude/skills/<name>/SKILL.md` with frontmatter + trigger conditions |
| Tighten permissions | `.claude/settings.local.json` |

---

## Reference

- Anthropic Claude Code docs: https://docs.claude.com/claude-code
- Skills spec: each `SKILL.md` is self-documenting — read frontmatter `description` for trigger logic
