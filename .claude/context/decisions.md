# Decisions

<!-- FORMAT: Append-only. Never edit or delete existing rows.
     /scan backfills inferred decisions with [inferred] marker.
     Template: YYYY-MM-DD | Decision | Reason | [inferred] (if auto-detected) -->

| Date | Decision | Reason |
|------|----------|--------|
| 2026-05-21 | Frontend-only repo | Per /init Step 2 |
| 2026-05-21 | Vite + TypeScript (React 19) | Per /init Step 4 — SPA, fast dev server |
| 2026-05-21 | TanStack Router (file-based, autoCodeSplitting) | Per /init Step 5 — type-safe routing |
| 2026-05-21 | Mantine 9 for UI primitives | Per /init Step 6 — ready-made components + form + notifications |
| 2026-05-21 | Tailwind CSS v4 via `@tailwindcss/vite` (CSS-first config) | Per /init — always installed |
| 2026-05-21 | Mantine styles imported before Tailwind in `main.tsx` | Tailwind utilities must override Mantine component defaults |
| 2026-05-21 | `npm` as package manager | Default; matches /init scaffolding commands |
| 2026-05-21 | Dexie (IndexedDB) for browser persistence | Logsheet feature — structured records, indexed by date, scales past localStorage limits |
| 2026-05-21 | ExcelJS for .xlsx export | Logsheet feature — needed styled headers + leave-row fills + frozen header |
| 2026-05-21 | @mantine/dates + dayjs for date inputs | Logsheet feature — `DateInput` and `MonthPickerInput` |
| 2026-05-21 | Logsheet schema: 5 entry types, date as primary key (one entry per date) | Matches timesheet semantics; re-entering a date edits in place |
| 2026-05-21 | Excel export scope = pick a month at export time (not WYSIWYG) | Cleaner for monthly timesheet submission flow |
| 2026-05-21 | Tailwind v4 preflight disabled (theme + utilities only) | Mantine baseline reset is authoritative; preflight conflicted with Mantine defaults |
| 2026-05-21 | MantineProvider stays un-themed until a real need surfaces | Avoid premature theming abstraction |
| 2026-05-21 | Developer name stored in `localStorage` under `aidlc:developerName` | Single tiny scalar — avoids adding a Dexie table or a new module |
| 2026-05-21 | Logging is gated by a non-dismissible `DeveloperNameModal` at `__root.tsx` | Cannot create log entries without an identity attached to the export |
| 2026-05-21 | Developer name editable via gear icon in logsheet header | Discoverable, doesn't crowd the title bar |
| 2026-05-21 | Excel export includes developer name (row above headers + filename slug) | Monthly timesheet hand-offs need an owner stamped on the file |
