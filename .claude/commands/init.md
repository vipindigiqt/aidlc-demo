# /init — Greenfield Project Setup

<!-- Run this command for new projects only. For existing projects, run /scan instead. -->

## What This Command Does
1. Runs the decision tree below to gather all project configuration
2. Scaffolds the boilerplate in the current working directory
3. Installs all required packages
4. Writes all context files with detected values
5. Confirms setup is complete

---

## Decision Tree

Run each step in order. Wait for user answer before proceeding to next step.

### Step 1 — Project name
Ask: "What is the project name?"

### Step 2 — Repo type
Ask: "Is this frontend only, backend only, or fullstack?"
- Frontend only → skip to Step 4
- Backend only → skip to Step 8
- Fullstack → continue to Step 3

### Step 3 — Fullstack structure
Ask: "Should frontend and backend live in the same repo (monorepo) or separate repos?"
- Monorepo → scaffold both in current directory, frontend in `/client`, backend in `/server`
- Separate repos → note that user will run /init separately for each; ask which to scaffold now, then continue

### Step 4 — Frontend framework
Ask: "Which frontend framework?"
- Vite + TypeScript → scaffold with `npm create vite@latest . -- --template react-ts`
- Next.js → scaffold with `npx create-next-app@latest .`

### Step 5 — Routing
Ask: "Which routing library?"
- TanStack Router → `npm install @tanstack/react-router`
- React Router → `npm install react-router`

> Skip this step if Next.js was chosen — Next.js uses file-based routing.

### Step 6 — UI framework
Ask: "Custom design system or Mantine?"
- Mantine → run:
  ```
  npm install @mantine/core @mantine/hooks @mantine/form @mantine/notifications
  ```
  Then add MantineProvider to the app root.
- Custom → notify user: "Add your design system manually. Document it in `.claude/context/ui.md` when ready."

> Tailwind CSS v4 is always installed — do not ask. Run:
> ```
> npm install tailwindcss @tailwindcss/vite
> ```
> Configure per latest Tailwind v4 docs (no tailwind.config.js — uses CSS-first config).

### Step 7 — Frontend done
Write frontend context, then check if backend is needed (go to Step 8 if fullstack, otherwise done).

### Step 8 — Backend framework
Ask: "Which backend framework?"
- NestJS → scaffold with `npx @nestjs/cli new . --skip-git`
- Express → scaffold with base Express + TypeScript setup
- Hono → scaffold with `npm create hono@latest .`

### Step 9 — Done
- Install all chosen packages
- Write all context files (see Context Writing section below)
- Run `/check` to confirm
- Print summary of what was scaffolded

---

## Context Writing After Init

After scaffolding, write these files:

**`stack.md`** — fill every field based on choices made above. Delete unused sections.

**`structure.md`** — write the actual folder tree created. Document any non-obvious conventions from the scaffolding.

**`patterns.md`** — seed with framework defaults:
- If Next.js: note App Router vs Pages Router
- If TanStack Router: note file-based vs code-based route config
- Note any patterns established during scaffolding

**`decisions.md`** — log every choice made in the decision tree with today's date.

**`ui.md`** — fill with chosen UI framework conventions.

**`api.md`** — if backend was scaffolded, fill base URL and conventions. Leave routes table empty.

---

## Rules
- Always scaffold in the current working directory — never create a parent subfolder
- Always install latest versions — never pin unless user asks
- Never skip a step in the decision tree — every question must be answered before proceeding
- If user is unsure about a step, explain the tradeoffs in 2–3 lines then re-ask