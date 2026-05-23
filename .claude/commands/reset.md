---
name: reset
description: /reset — Fresh Project Reset
---

# /reset — Fresh Project Reset

Wipe project-specific context to empty templates. Use when starting fresh on the same workspace — old stack/decisions/patterns no longer apply. After reset, run `/init` (new project) or `/scan` (existing codebase) to refill.

## Flow
1. List the 6 files to be wiped. Show the confirmation prompt below.
2. Wait for explicit `yes`. Any other reply → abort, do nothing.
3. On `yes` → overwrite each file with its template body (see Templates).
4. Drop session working memory. Confirm:
   > "Reset complete. 6 context files wiped to empty templates. Run `/init` or `/scan` next."

## Confirmation Prompt
Show this verbatim before wiping:

```
/reset will wipe project context to empty templates:
  - .claude/context/stack.md
  - .claude/context/structure.md
  - .claude/context/patterns.md
  - .claude/context/decisions.md
  - .claude/context/ui.md
  - .claude/context/api.md

CLAUDE.md, .claude/skills/, .claude/commands/, and persistent memory are untouched.

Type `yes` to proceed.
```

## Templates

### `.claude/context/stack.md`
```markdown
# Stack

<!-- FORMAT: "- Key: value" only. No prose. Delete unused sections entirely — do not leave empty fields.
     Filled by /init or /scan. -->

## Core
```

### `.claude/context/structure.md`
```markdown
# Structure

## Folder Convention

## Root Layout

## Non-obvious Conventions

## Modules

## Shared
```

### `.claude/context/patterns.md`
```markdown
# Patterns

## Routing

## Styling

## Components

## Forms

## Data

## Error Handling

## Auth

## Naming
```

### `.claude/context/decisions.md`
```markdown
# Decisions

Append-only. Never edit/delete existing rows. `/scan` adds inferred entries with `[inferred]` marker.

| Date | Decision | Reason |
|------|----------|--------|
```

### `.claude/context/ui.md`
```markdown
# UI Conventions

## Component Rules

## Styling

## Naming

## Design Tokens

## Component Library
```

### `.claude/context/api.md`
```markdown
# API Contracts

Routes table append-only — never edit existing rows.

## Conventions

## Routes
| Method | Path | Request | Response | Notes |
|--------|------|---------|----------|-------|
```

## Rules
- Destructive — never wipe without explicit `yes`
- Never touch `CLAUDE.md`, `.claude/skills/`, `.claude/commands/`, or `~/.claude/projects/.../memory/`
- After wipe, suggest `/init` or `/scan` — do not auto-run
- `/check` immediately after `/reset` will fail by design (empty sections) — that confirms reset worked
