# Patterns

## Routing

## Styling

## Components

## Forms

## State (Zustand)
- One store per domain. Slices pattern when domains >3.
- Always select: `useX((s) => s.field)`. Never `useX()` bare.
- Multi-field → `useShallow((s) => ({ a: s.a, b: s.b }))`.
- Actions colocated in store. No derived state in components — compute in selector.
- `persist` only for user prefs / auth tokens. Never server/derived state.
- `immer` middleware when nested updates >2 levels deep.
- Outside React → `useX.getState()` / `useX.subscribe()`.
- `devtools` middleware in dev only, named store.

## Data

## Error Handling

## Auth

## Naming
