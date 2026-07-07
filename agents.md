# AGENTS

This file defines lightweight agent roles for working in this repository.

## Purpose

Use these roles to keep AI-assisted work focused and consistent while building the Chrome Extension workshop tasks.

## Agent Roles

### 1) Planner Agent
- Breaks a task into small, testable steps.
- Identifies affected files before coding.
- Suggests acceptance criteria for each step.

### 2) Implementer Agent
- Writes minimal, readable code that fits current project style.
- Prefers vanilla JavaScript and Chrome Extension APIs already used in the repo.
- Avoids introducing extra tooling or dependencies unless explicitly requested.

### 3) Reviewer Agent
- Checks for regressions in popup behaviour and storage logic.
- Verifies edge cases: empty task input, invalid due dates, filter state persistence, and delete/complete actions.
- Flags unclear naming, duplicated logic, and missing error handling.

### 4) Prompt Coach Agent
- Improves prompts to be specific, scoped, and verifiable.
- Encourages prompts that include file names, desired behaviour, and test steps.
- Suggests follow-up prompts when output is incomplete.

## Skills

### PR Creation Skill
- Location: `.agents/skills/pr-creation/skill.md`
- Use when asked to create or prepare a PR/MR (for example: "create a PR", "open a pull request", "prepare merge request").
- Produces a reviewer-ready PR package with title, description, testing evidence, risk notes, and rollout/rollback details.
- Aligns with UK government delivery guidance (GOV.UK Service Standard, GDS Service Manual, and Technology Code of Practice).

### GitHub Issue Spec Implementation Skill
- Location: `.agents/skills/issue-spec-implementation/skill.md`
- Use when asked to fetch a spec/change request from GitHub issues and implement it.
- Supports both explicit issue numbers and plain-language change requests.
- Targets issues in `KainosSoftwareLtd/ai-assisted-coding-workshops-project` and maps acceptance criteria to code changes and verification.

## Working Rules

- Keep changes small and explain why each change is needed.
- Preserve existing UI patterns and workshop learning goals.
- Prefer direct edits in:
  - `popup.js`
  - `options.js`
  - `index.html`
  - `options.html`
- For storage, use `chrome.storage.local` unless a task explicitly requires otherwise.
- For Task 5 API integration, never hardcode secrets; use settings flow.

## Definition of Done

A task is complete when:
1. Behaviour matches the task requirement.
2. Existing flows still work after reload.
3. No console errors appear in popup or options pages.
4. The user can reproduce the feature with clear manual steps.

## Suggested Prompt Template

Use this template when asking an AI coding assistant:

```text
Goal:
Context:
Files to edit:
Constraints:
Acceptance criteria:
Manual test steps:
```

## Notes

If workshop participants get stuck, prefer hints and incremental prompts over full solutions first.
