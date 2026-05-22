# UI Conventions

## Component Rules
- Prefer Mantine primitives for inputs, modals, menus, tables, notifications
- Use plain HTML + Tailwind for layout and bespoke UI
- Never mix Mantine `style` prop with Tailwind on the same element — pick one

## Styling
- Always use Tailwind CSS v4 utility classes for layout, spacing, color, typography
- CSS-first config — no `tailwind.config.js`; extend via `@theme` directive in `src/index.css`
- Mantine component styles imported in `main.tsx` BEFORE `./index.css` — Tailwind wins on conflicts
- No `var()` calls inside `className` — use Tailwind's CSS variable syntax (`bg-[color:var(--x)]`) only when unavoidable

## Naming
- Components: PascalCase
- Files: PascalCase.tsx for components, kebab-case.ts for utils/hooks/schemas
- CSS: only `src/index.css` for global; component styles via Tailwind utilities

## Design Tokens
- Defined in `src/index.css` via Tailwind v4 `@theme` directive (none added yet)

## Component Library
- Mantine 9 — @mantine/core, @mantine/hooks, @mantine/form, @mantine/notifications
- `MantineProvider` wraps the app in `src/main.tsx`
- `<Notifications />` mounted once at the root for `notifications.show(...)` calls
