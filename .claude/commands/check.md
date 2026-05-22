---
name: check
description: /check — Validate Context Files
---

# /check — Validate Context Files

Verify every context file exists + no empty/`UNKNOWN` fields. Pass/fail per file. Block tasks if any fail.

## Checks
| File | Pass condition |
|------|---------------|
| `stack.md` | Exists. No empty fields in populated sections. No `UNKNOWN`. |
| `structure.md` | Exists. Root layout non-empty. |
| `patterns.md` | Exists. ≥1 pattern entry. |
| `decisions.md` | Exists. ≥1 row. |
| `ui.md` | Exists. Component rules + naming filled. |
| `api.md` | Exists. Conventions filled (routes table may be empty on new projects). |

## Output
```
/check results:
✓ stack.md
✓ structure.md
✗ patterns.md — no entries found
✓ decisions.md
✗ ui.md — component rules empty
✓ api.md

2 file(s) need attention. Resolve before proceeding.
```

## Rules
- All pass → confirm, allow tasks
- Any fail → list failed + missing pieces, block tasks
- Never auto-fix — ask user to run `/init`, `/scan`, or fill manually
