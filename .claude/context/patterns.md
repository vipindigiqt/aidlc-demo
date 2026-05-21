# Patterns

<!-- FORMAT: One line per pattern. No prose. Point to a file for examples, don't inline code.
     Template: "- Topic: approach — see path/to/example.ts"
     Mark stale patterns [deprecated YYYY-MM-DD]. /scan removes deprecated entries on next run. -->

## Routing
- File-based routes in `src/routes/` via `@tanstack/router-plugin` — see src/routes/index.tsx
- Root layout uses `createRootRoute` with `<Outlet />` — see src/routes/__root.tsx
- Router registered globally via `declare module '@tanstack/react-router'` in main.tsx for type-safe `Link`/`navigate`

## Styling
- Tailwind v4 utilities first; Mantine components for complex primitives — see src/routes/index.tsx
- CSS-first Tailwind config — no `tailwind.config.js`; customize via `@theme` in `src/index.css`
- Preflight disabled — `src/index.css` imports only `tailwindcss/theme.css` and `tailwindcss/utilities.css`; Mantine owns the baseline reset
- Mantine theming is opt-in — `MantineProvider` ships with no theme prop until a real customization is needed

## Components
- Controlled modal pattern: parent owns `opened`/`onClose`, modal resets form on open via `useEffect` watching `opened` — see src/shared/components/DeveloperNameModal.tsx and src/modules/logsheet/components/LogEntryForm.tsx
- Non-dismissible gate modal: `withCloseButton={false}` + `closeOnClickOutside={false}` + `closeOnEscape={false}` — see DeveloperNameModal `dismissible` prop

## Forms
- @mantine/form via `useForm` — see src/modules/logsheet/components/LogEntryForm.tsx
- Type-aware validation (one field's rule depends on another field's value) — pass `values` to the validator, see LogEntryForm `validate.hours`

## Data
- Dexie DB lives in a module's `utils/db.ts`; export `upsert*` / `delete*` helpers from the same file — see src/modules/logsheet/utils/db.ts
- Live queries via `useLiveQuery` from `dexie-react-hooks` wrapped in a module hook — see src/modules/logsheet/hooks/use-log-entries.ts
- Date primary keys: ISO `YYYY-MM-DD` strings (lexicographic = chronological, works with Dexie `.between`)
- Single-value localStorage: pair a `utils/<key>.ts` (get/set/slugify) with a `hooks/use-<key>.ts` that syncs cross-tab via the `storage` event — see src/shared/utils/developer-name.ts + src/shared/hooks/use-developer-name.ts

## Export
- ExcelJS workbook generated in-browser; download via `Blob` + temporary `<a download>` — see src/modules/logsheet/utils/export-excel.ts

## Error Handling
-

## Auth
-

## Naming
- Components: PascalCase
- Files: kebab-case for non-component files, PascalCase.tsx for component files
- Route files: lowercase, file-based (`index.tsx`, `__root.tsx`, `posts.$postId.tsx`, etc.)
