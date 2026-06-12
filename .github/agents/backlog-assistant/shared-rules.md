# Shared Content Rules

Read these rules before writing any ticket or breakdown content.

## Title

- Keep it clear, concise and professional
- The title should be 7-8 words long maximum; flag any title exceeding 8 words and prompt the user to shorten it before writing
- First character must be uppercase
- At least two whitespace-separated words
- **For SPIKE tickets**: prefix the title with `[Spike]` — exactly that casing (capital `S`), followed by a single space (e.g. `[Spike] Investigate authentication options`)

## Introduction Prefix

- The introduction MUST use `*As the* Todo App {PERSONA}` — never `*As a*`
- A newly created ticket may already contain a pre-filled introduction stub: `*As the* Todo App {PERSONA}` / `*I want* {GOAL}` / `*So that* {OUTCOME}`. When this stub is present, **only replace** the `{PERSONA}`, `{GOAL}`, and `{OUTCOME}` placeholder tokens — do **not** rewrite or re-derive the `*As the* Todo App` prefix; it is already correct

## Jira Formatting

Follow [Jira formatting guidelines](jira-formatting-guidelines.md) for all content — use `{code}…{code}` blocks for structured content, backticks for file references.
