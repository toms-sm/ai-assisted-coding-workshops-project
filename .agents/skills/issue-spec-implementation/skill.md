---
name: issue-spec-implementation
description: Fetch a change specification from GitHub issues and implement it end-to-end in this repository.
---

# GitHub Issue Spec Implementation Skill

Use this skill whenever the user asks for any of the following (or similar intent):
- implement issue <number>
- pick up issue <number>
- fetch spec from GitHub issue
- build the change from this issue
- make this change based on issue details
- grab the requirement and implement it

If the user does not provide an issue number, use their requested change text to find the best matching open issue in:
- https://github.com/KainosSoftwareLtd/ai-assisted-coding-workshops-project/issues/

## Goal

Turn a user change request into a shipped code change by:
1. finding the correct GitHub issue
2. extracting the requirement/spec clearly
3. implementing the change in code
4. validating behavior and reporting outcome

## Inputs

- Required:
  - user change request (plain language)
- Optional:
  - issue number (preferred when available)
  - acceptance criteria, constraints, or deadline from user

## Workflow

1. Resolve the issue
- If issue number is provided, fetch that issue directly.
- If no issue number is provided, search open issues using the user change request and pick the closest match.
- If multiple issues are plausible, ask one concise disambiguation question.

2. Extract the spec
- Capture:
  - problem statement
  - required behavior
  - acceptance criteria
  - constraints/non-goals
  - linked references (if present)
- Do not invent missing requirements. Mark unknowns explicitly.

3. Plan and implement
- Identify files likely impacted before editing.
- Make the smallest safe change set that satisfies the issue.
- Preserve existing workshop patterns (vanilla JS, Chrome extension APIs, minimal dependencies).

4. Verify
- Run relevant checks/tests when available.
- If automated tests do not exist, provide concise manual verification steps.
- Confirm acceptance criteria coverage against the issue spec.
- Use the standard QA approach below for every change.

5. Report
- Summarize what was implemented and why.
- List files changed.
- Note any assumptions, follow-ups, or remaining risks.
- Include QA evidence using the standard QA report format below.

## Standard QA Approach (Use For Any Change)

Always provide both automated and manual verification where possible. If one path is unavailable, state exactly why.

1. Automated checks
- Run any relevant static and automated checks available in the repo (lint, tests, type checks, syntax checks).
- Record command, result, and failure reason (if any).

2. Acceptance criteria traceability
- Map each acceptance criterion to evidence.
- Evidence can be: test output, UI behavior observed, or code path reference.

3. Manual smoke checks
- Verify core user flows affected by the change.
- Include at least: happy path, toggle/reversal path (if applicable), and failure/edge path.

4. Regression checks
- Verify adjacent behavior likely impacted by the change still works.
- Keep this concise and risk-based.

5. Environment limitations
- If tooling is missing (for example, Node not installed), call this out explicitly and provide the next-best verification performed.

## Standard QA Report Format

Use this structure in the final response for any implementation task:

```md
## QA Evidence

### Automated checks
- <command>: <pass/fail> (<notes>)

### Acceptance criteria coverage
1. <criterion>: <pass/fail> - <evidence>
2. <criterion>: <pass/fail> - <evidence>

### Manual checks
1. <step>: <result>
2. <step>: <result>

### Regression checks
1. <check>: <result>

### Limitations
- <tooling/runtime limits and impact>
```

## GitHub Retrieval Guidance

Prefer GitHub tooling/API to fetch issue details accurately.

If using GitHub CLI, this repository may require explicit repo targeting:
- `-R KainosSoftwareLtd/ai-assisted-coding-workshops-project`

Useful command patterns:

```bash
gh issue view <number> -R KainosSoftwareLtd/ai-assisted-coding-workshops-project
gh issue list -R KainosSoftwareLtd/ai-assisted-coding-workshops-project --state open --search "<change request>"
```

If CLI/API access is unavailable, use the issue web page content and clearly state that limitation.

## Quality Bar

A task is complete only when:
- chosen issue is explicitly identified (number + title)
- implementation maps to issue acceptance criteria
- verification evidence is provided
- unresolved ambiguities are listed clearly
