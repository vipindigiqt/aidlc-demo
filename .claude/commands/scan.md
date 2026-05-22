---
name: scan
description: /scan — Brownfield Project Detection
---

# /scan — Brownfield Project Detection

Existing projects only. New → `/init`.

Flow: detect codebase → write context files → flag undetected → run `/check`.

## Detection
All steps before any write.

1. **Packages** — read `package.json` + lockfile. Extract: frontend fw, backend fw, routing, styling, UI lib, state mgmt, data fetching, forms, ORM/DB, auth, pkg manager, bundler.
2. **Config files** — `tsconfig.json` (strict, paths), `vite.config.*`/`next.config.*` (plugins, env), Tailwind (`tailwind.config.*` or `@import "tailwindcss"` in CSS), `.eslintrc.*`/`eslint.config.*`, `prettier.config.*`.
3. **Folder structure** — top 2 levels (ignore `node_modules`, `.git`, `dist`, `.next`, `build`). Identify: module-based vs flat, component/hook/schema/util locations, shared folder, feature/domain folders.
4. **Patterns** — read 3–5 representative source files. Identify: API call style, state mgmt, component structure (named vs default exports, co-location), error handling, naming conventions.
5. **API** — if backend exists, scan route files: base URL/prefix, auth header, error response shape, existing routes (method + path + rough req/res shape).
6. **Decisions inference** — log inferred decisions in `decisions.md` with today's date + `[inferred]` marker.

## After Detection
Write all context files:
- Format per file — no prose, no blank fields
- Delete unused sections — never leave empty
- Undetected → write `UNKNOWN`, list all `UNKNOWN`s at end

Then:
> "Could not detect: [list]. Please fill manually."

Run `/check`.
