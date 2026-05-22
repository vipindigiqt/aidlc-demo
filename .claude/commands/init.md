---
name: init
description: /init — Greenfield Project Setup
---

# /init — Greenfield Project Setup

New projects only. Existing → `/scan`.

Flow: walk decision tree → scaffold in CWD → install pkgs → write context files → confirm.

## Decision Tree
Sequential. Wait for answer before next step.

1. **Project name** — "What is the project name?"
2. **Repo type** — "frontend / backend / fullstack?"
   - frontend → step 4
   - backend → step 8
   - fullstack → step 3
3. **Fullstack structure** — "monorepo (frontend `/client`, backend `/server`) or separate repos?"
   - separate → user reruns `/init` per repo; ask which to scaffold now
4. **Frontend framework**
   - Vite + TS → `npm create vite@latest . -- --template react-ts`
   - Next.js → `npx create-next-app@latest .`
5. **Routing** (skip if Next.js — file-based)
   - TanStack → `npm install @tanstack/react-router`
   - React Router → `npm install react-router`
6. **UI** — Mantine or custom?
   - Mantine → `npm install @mantine/core @mantine/hooks @mantine/form @mantine/notifications` then add `MantineProvider` to app root
   - Custom → tell user to add manually + document in `ui.md`

   Tailwind v4 always installed (no ask):
   ```
   npm install tailwindcss @tailwindcss/vite
   ```
   Configure per Tailwind v4 docs — CSS-first, no `tailwind.config.js`.
7. **Frontend done** — write frontend context. Fullstack → step 8.
8. **Backend framework**
   - NestJS → `npx @nestjs/cli new . --skip-git`
   - Express → base Express + TS
   - Hono → `npm create hono@latest .`
9. **Done** — install pkgs, write context files, run `/check`, print summary.

## Context Writing
- `stack.md` — every field per choices. Delete unused sections.
- `structure.md` — actual folder tree. Non-obvious conventions only.
- `patterns.md` — seed with framework defaults (Next.js App vs Pages Router; TanStack file-based vs code-based).
- `decisions.md` — log every decision-tree choice with today's date.
- `ui.md` — chosen UI framework conventions.
- `api.md` — if backend scaffolded: base URL + conventions. Routes table empty.

Context file format: `- Key: value` only, no prose. Delete unused sections — never leave empty fields.

## Rules
- Scaffold in CWD — never create parent subfolder
- Latest versions — no pins unless user asks
- Never skip a step — every question answered before proceeding
- User unsure → 2–3 line tradeoffs, re-ask
