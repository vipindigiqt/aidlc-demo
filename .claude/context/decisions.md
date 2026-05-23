# Decisions

Append-only. Never edit/delete existing rows. `/scan` adds inferred entries with `[inferred]` marker.

| Date | Decision | Reason |
|------|----------|--------|
| 2026-05-23 | Global client state = zustand | Minimal boilerplate, selector-based re-render control, slices scale w/o context-tree churn |
