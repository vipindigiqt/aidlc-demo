# /scan — Brownfield Project Detection

<!-- Run this command for existing projects only. For new projects, run /init instead. -->

## What This Command Does
1. Reads the codebase to detect stack, structure, and patterns
2. Writes all context files from what is detected
3. Flags anything it could not detect and asks the user to fill it in
4. Runs `/check` to confirm all files are populated

---

## Detection Steps

Run all steps before writing any context file.

### Step 1 — Package detection
Read `package.json` (and `package-lock.json` or `yarn.lock` if present).
Extract:
- Frontend framework (React, Next.js, Vite, etc.)
- Backend framework (NestJS, Express, Hono, etc.)
- Routing library (TanStack Router, React Router, etc.)
- Styling (Tailwind, CSS Modules, styled-components, etc.)
- UI library (Mantine, shadcn, MUI, etc.)
- State management (Zustand, Redux, Jotai, etc.)
- Data fetching (React Query, SWR, Apollo, etc.)
- Form library (react-hook-form, Formik, etc.)
- ORM / DB client (Prisma, Drizzle, TypeORM, etc.)
- Auth library (NextAuth, Clerk, Lucia, etc.)
- Package manager (npm, yarn, pnpm — check lockfile)
- Bundler (Vite, Webpack, Turbopack — check config files)

### Step 2 — Config file detection
Check for and read:
- `tsconfig.json` → note strict mode, path aliases
- `vite.config.ts` / `next.config.ts` → note plugins, env setup
- `tailwind.config.*` or CSS entry with `@import "tailwindcss"` → confirm Tailwind version
- `.eslintrc.*` / `eslint.config.*` → note linting rules
- `prettier.config.*` → note formatting rules

### Step 3 — Folder structure detection
Read the top 2 levels of the directory tree (ignore `node_modules`, `.git`, `dist`, `.next`, `build`).
Identify:
- Module-based structure vs flat structure
- Location of components, hooks, schemas, utils
- Shared folder existence and contents
- Any feature or domain folders

### Step 4 — Pattern detection
Read 3–5 representative source files across different modules.
Identify:
- How API calls are made (fetch, axios, React Query, etc.)
- How state is managed locally and globally
- How components are structured (named exports, default exports, co-location)
- How errors are handled
- Naming conventions (camelCase files, PascalCase components, etc.)

### Step 5 — API detection
If a backend exists, scan route files to extract:
- Base URL or prefix convention
- Auth header pattern
- Error response shape
- Existing routes (method + path + rough request/response shape)

### Step 6 — Decisions inference
Based on everything detected, infer past architectural decisions and log them in `decisions.md` with today's date and `[inferred]` marker.

---

## After Detection

Write all context files. Rules:
- Follow each file's format exactly — no prose, no blank fields
- Delete unused sections rather than leaving them empty
- If something could not be detected, write `UNKNOWN` in that field and list all `UNKNOWN` fields at the end as a prompt for the user to fill in

Flag undetected fields:
> "I could not detect the following — please fill them in manually: [list fields]"

Then run `/check` to confirm.