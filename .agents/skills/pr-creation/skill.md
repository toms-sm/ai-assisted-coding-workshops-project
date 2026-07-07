---
name: PR Creation Skill
description: Prepare a high-quality pull request (or merge request) with clear context, risk, testing evidence, and reviewer-ready metadata.
---

# PR Creation Skill

Use this skill whenever the user asks for any of the following (or similar intent):
- create a PR
- open a PR
- raise a PR
- submit a PR
- pull request
- merge request
- MR
- draft PR
- ready this for review
- prepare this branch for review

If the user intent is ambiguous, ask one concise question to confirm whether they want a code review summary only, or a full PR package (title, description, checklist, and reviewer notes).

## Goal

Create a reviewer-ready PR package that:
- explains the problem and user outcome
- summarizes what changed and why
- captures testing and evidence
- highlights risk, security, and rollback considerations
- supports fast, safe, and accountable delivery

## Best-Practice Principles

Follow industry best practice with explicit alignment to UK government guidance:
- Keep changes small and understandable (incremental delivery).
- Write clear, plain-English summaries for non-specialists.
- Include test evidence and traceability from requirement to change.
- Surface risks early (security, privacy, accessibility, performance, operations).
- Make review and rollout safe (feature flags, rollback steps, monitoring).

## UK Government Alignment (apply where relevant)

Use these principles in the PR narrative and checklist:
- GOV.UK Service Standard:
  - Solve a real user need and explain the expected user impact.
  - Use agile, iterative delivery and reduce delivery risk.
  - Ensure accessibility, security, and operational sustainability are considered.
- Government Digital Service (GDS) Service Manual:
  - Prefer small, frequent releases and clear documentation.
  - Capture evidence of testing and quality checks.
  - Communicate risks, assumptions, and constraints clearly.
- Government Technology Code of Practice:
  - Design for maintainability and secure operation.
  - Use open, reusable approaches and avoid unnecessary complexity.

When evidence is missing, do not invent it. Clearly mark unknowns and request the minimum extra information needed.

## PR Workflow

1. Confirm scope
- Identify branch, linked issue/task, and intended outcome.
- Confirm whether PR should be `Draft` or `Ready for review`.

2. Gather change summary
- List key files changed and behavior changes.
- Capture noteworthy implementation decisions and trade-offs.

3. Validate quality signals
- Summarize tests run (unit/integration/manual) and outcomes.
- Note lint/build/type-check status.
- Record any known limitations.

4. Assess risk and controls
- Risk level: low/medium/high with brief justification.
- Security/privacy/accessibility/performance considerations.
- Rollback plan and any migration/deployment notes.

5. Produce PR content
- Create a clear title in imperative style.
- Write concise description using the template below.
- Include reviewer guidance and validation steps.

6. Final readiness check
- Ensure claims map to observable evidence.
- Remove vague language and internal-only jargon.
- Keep the PR easy to review in one pass.

## PR Title Guidance

Use one line, imperative mood, specific scope.
Examples:
- Add due-date validation for task creation
- Fix popup filter state persistence after reload
- Refactor options save flow to handle storage errors

## PR Description Template

```md
## Summary
- What changed
- Why this change is needed
- Expected user/service impact

## Context
- Problem statement
- Linked issue/ticket: <id or URL>
- Scope boundaries (what is intentionally out of scope)

## Changes Made
- <change 1>
- <change 2>
- <change 3>

## Testing and Evidence
- Automated tests: <commands/results>
- Manual checks: <steps/results>
- Screenshots/logs (if relevant): <links or note>

## Risk and Mitigation
- Risk level: <low|medium|high>
- Key risks: <list>
- Mitigations: <list>
- Rollback plan: <short, concrete steps>

## Accessibility, Security, and Privacy
- Accessibility impact: <none|details>
- Security impact: <none|details>
- Privacy/data impact: <none|details>

## Deployment Notes
- Feature flag/config required: <yes/no + details>
- Migration/backfill required: <yes/no + details>
- Monitoring/alerts to watch: <details>

## Reviewer Checklist
- [ ] Scope is clear and proportionate
- [ ] Tests and evidence are sufficient
- [ ] Risks are documented and mitigated
- [ ] Rollback path is practical
- [ ] Documentation updated where needed
```

## Quality Bar

A PR is ready when:
- description is understandable to an unfamiliar reviewer
- evidence supports key behavioral claims
- known risks and operational steps are explicit
- reviewer can validate with provided steps

## Communication Style

- Use plain English and short sentences.
- Prefer concrete statements over marketing language.
- State uncertainty explicitly.
- Keep the final PR description concise but complete.
