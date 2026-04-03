# Create A GitHub Issue From A Plan File

Use this guide to create a GitHub issue directly from a Markdown plan file (for example `apps/web/plans/02-ssr-lodges-fetch-plan.md`) using GitHub CLI.

## Prerequisites

- `gh` is installed.
- You are authenticated: `gh auth status`
- You run commands from the repository root.

## Minimal Command

```bash
gh issue create --title "<title>" --body-file <path-to-plan.md>
```

Example:

```bash
gh issue create \
  --title "Implement SSR lodge fetching plan" \
  --body-file apps/web/plans/02-ssr-lodges-fetch-plan.md
```

## Recommended Workflow

1. Confirm the plan file exists.

```bash
ls -la apps/web/plans/02-ssr-lodges-fetch-plan.md
```

2. Choose a clear, action-oriented issue title.
3. Create the issue from the plan file body.

```bash
gh issue create \
  --title "Implement SSR lodge fetching plan" \
  --body-file apps/web/plans/02-ssr-lodges-fetch-plan.md \
  --label "enhancement" \
  --assignee "@me"
```

4. Open or copy the returned issue URL and verify the body formatting on GitHub.

## Optional Flags

- `--label "<label>"` to add one or more labels
- `--assignee "@me"` or `--assignee "<username>"`
- `--milestone "<milestone-name>"`
- `--project "<org-or-user>/<project-number>"`

Example with more metadata:

```bash
gh issue create \
  --title "Implement SSR lodge fetching plan" \
  --body-file apps/web/plans/02-ssr-lodges-fetch-plan.md \
  --label "enhancement" \
  --label "planning" \
  --assignee "@me" \
  --milestone "Sprint 12"
```

## Troubleshooting

Authentication problems:

```bash
gh auth login
gh auth status
```

Wrong repository context:

```bash
gh repo view
```

If it points to the wrong repo, run from the correct repository root and retry.

Missing plan file path:

```bash
ls -la <path-to-plan.md>
```

If the file is not found, fix the path and rerun `gh issue create`.
