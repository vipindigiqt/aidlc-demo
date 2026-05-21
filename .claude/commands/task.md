# /task — Task Intake

<!-- This command runs automatically on every user request — user does not need to type /task.
     Claude triggers this flow whenever a task is received before writing any code. -->

## What This Command Does
1. Reads the task description
2. Loads relevant context files
3. Identifies all unknowns that qualify as major decisions
4. Asks clarifying questions sequentially
5. Confirms the plan
6. Proceeds with implementation

---

## Flow

### Step 1 — Load context
Based on the task, load:
- Always: `stack.md`
- If creating/moving files: `structure.md`
- If writing code: `patterns.md`
- If UI work: `ui.md`
- If API work: `api.md`
- If a major decision may be made: `decisions.md`

### Step 2 — Identify unknowns
Before asking anything, internally list every unknown that qualifies as a major decision:
- Any library not in `stack.md`
- Any approach where two valid options exist
- Any new module, folder, or shared component
- Any schema or API contract change
- Any pattern not in `patterns.md`
- Any change touching more than 3 modules
- Any deletion or deprecation of shared code

If no unknowns → skip to Step 4.

### Step 3 — Ask clarifying questions
- Ask one question at a time
- Next question is determined by the answer to the previous one (decision tree, not a flat list)
- Frame each question with brief context so the user understands why it matters
- If the user is unsure, offer 2–3 options with one-line tradeoffs, then re-ask
- Never proceed until all major unknowns are resolved

### Step 4 — Confirm the plan
State the implementation plan in 2–4 bullet points. Example:
> "Here's what I'll do:
> - Create `src/modules/auth/` with `auth.service.ts`, `auth.controller.ts`, `auth.schema.ts`
> - Add POST /auth/login and POST /auth/register to api.md
> - Install `@mantine/form` for the login form
> Proceeding unless you want to change anything."

Wait 5 seconds (or for user response) before starting. If user says go, proceed immediately.

### Step 5 — Implement
Follow all rules in CLAUDE.md during implementation.

### Step 6 — Post-task updates
Update relevant context files per the After Implementation table in CLAUDE.md.

---

## Rules
- This flow is mandatory — never skip straight to implementation
- Questions must be sequential, not batched
- Plan confirmation must happen before any file is written
- If the task is very small and has zero unknowns (e.g. "fix this typo"), skip Steps 2–4 and proceed directly