# Epic Breakdown

Slice an epic into INVEST-compliant user stories.

Read [shared rules](shared-rules.md) before writing any content.
Read [breakdown patterns](breakdown-patterns.md) for INVEST criteria and splitting patterns.
Read [breakdown file format](breakdown-file-format.md) for file shape, ownership, and validators.

Absolutely NEVER implement any code changes.

---

## Prerequisites

The `.breakdown` file at `.tickets/breakdowns/epic-ABC-<id>.breakdown` must already exist. It is created by the **Backlog Assistant: Epic Breakdown** command in VS Code, which fetches the epic's existing stories from Jira. Do not write a `.breakdown` from scratch — its `existing-stories` array reflects live Jira state that only the extension can produce.

If the file is missing, stop and tell the user to run **Backlog Assistant: Epic Breakdown** in VS Code first.

If the parent epic ticket (`.tickets/jira/epic-ABC-<id>-<slug>.ticket`) is not present locally, ask the user to fetch it first with **Backlog Assistant: Fetch Ticket**. Slicing without the parent is guessing.

---

## Step 1 — Load Breakdown File

Read both files:

- `.tickets/breakdowns/epic-ABC-<id>.breakdown` — the breakdown
- `.tickets/jira/epic-ABC-<id>-<slug>.ticket` — the parent epic (gives you the goal, scope, dependencies)

Take stock of `existing-stories` (read-only context — already in Jira) and any `new-stories` entries that already have a `jiraKey` (also locked).

---

## Step 2 — Interview the User

Confirm the parent epic satisfies INVEST minus Small. If it doesn't, surface the gap rather than slice — the most common failure is **Valuable** (a task pretending to be an epic). If the epic is unclear about persona or outcome, ask before slicing. Never invent.

Identify the splitting pattern(s) that fit the epic (see [breakdown patterns](breakdown-patterns.md)). Ask **one question at a time**, list options as A / B / C, mark the recommended option in **bold**. Do not re-ask anything already answered.

### Focus areas to probe (skip if already covered)

- Pick the dominant splitting pattern (Workflow Steps, Operations, Business Rule Variations, ...). Propose the most likely one with a one-line rationale.
- Resolve unknowns the pattern surfaces — workflow middle steps, the set of operations behind a `manage` / `support` verb, quantified non-functional thresholds, the choice of a third-party component, etc.
- Decide whether a `[Spike]` slice is needed up front to resolve an implementation unknown.

Never invent personas, thresholds, third-party choices, deadlines, or named teams.

---

## Step 3 — Provide Proposed Breakdown

Once the slicing approach is agreed, present the proposed list of stories:

- Title and introduction for each slice
- Ordering rationale (most independent / highest-value first)
- How existing stories relate to the new slices

Wait for the user to approve or request changes before proceeding to Step 4.

---

## Step 4 — Update Breakdown File

Once the user confirms, update only the unlocked entries in the `new-stories` array. Write all proposed entries in one go.

### Rules

- Only edit `.ticket` and `.breakdown` files — never modify any other file in the workspace
- **Never** modify `epicKey`, `bucketId`, or `existing-stories`
- **Never** modify a `new-stories` entry that already has a `jiraKey` (it is locked — already created in Jira)
- **Never** set the `jiraKey` field yourself — the extension does that after creation
- Every new entry must pass the validators documented in [breakdown file format](breakdown-file-format.md)
- Order matters — the extension creates stories sequentially. Put the most independent / highest-value slice first; put a slice that depends on scaffolding from another after that scaffolding.
- Keep locked entries in their original positions

### After writing

Summarise what changed: which slices were added or edited, which questions stayed open, and any fields the user still needs to set themselves via the structured editor in VS Code (bucket, draft flag).

Write a detailed document summerising all decisions discussed during the breakdown session and store it under `.work/<ticketId>/epic-breakdown-notes.md`
