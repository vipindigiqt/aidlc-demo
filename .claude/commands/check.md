# /check — Validate Context Files

## What This Command Does
Checks that all context files exist and contain no empty or `UNKNOWN` fields.
Outputs a pass/fail for each file.
Blocks all tasks if any file fails.

---

## Checks

| File | Pass condition |
|------|---------------|
| `stack.md` | Exists. No empty fields in populated sections. No `UNKNOWN` values. |
| `structure.md` | Exists. Root layout is not empty. |
| `patterns.md` | Exists. At least one pattern entry exists. |
| `decisions.md` | Exists. At least one row in the table. |
| `ui.md` | Exists. Component rules and naming fields are filled. |
| `api.md` | Exists. Conventions section is filled (routes table may be empty on new projects). |

---

## Output Format

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

---

## Rules
- If all files pass → confirm and allow tasks to proceed
- If any file fails → list failed files, explain what is missing, block tasks until resolved
- Do not attempt to auto-fix failed files — ask user to run `/init`, `/scan`, or fill in manually