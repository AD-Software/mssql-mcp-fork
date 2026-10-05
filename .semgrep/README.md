# Custom Semgrep rules

Security rules wired as a CI gate by `.github/workflows/semgrep.yml`.

| Rule file                                  | Guards against                                                                                                             |
| ------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------- |
| `hardcoded-cloud-secret.yml`               | Hard-coded credentials committed to source, CI, or Dockerfiles: AWS access key, GitLab PAT / npm registry authToken, JWT, GitHub token, PEM private key, connection URL with an inline password, Google OAuth token, secret spelled out in a comment |
| `unguarded-authorization-header-split.yml` | Reading the `Authorization` header and calling `.split(' ')` without a null guard (throws a 500 when the header is absent) |

The CI job runs **diff-aware** on pull requests (`--baseline-commit`): only
findings introduced by the change fail the build. Pre-existing findings the team
has accepted or is fixing separately do not block unrelated PRs — but any _new_
occurrence does. The job runs on pull requests only (no scan on direct pushes).

Each rule `.yml` has a sibling `.js` fixture (`// ruleid:` / `// ok:` lines) run
by `semgrep --test` in CI; the fixtures hold intentional fake secrets, so
`.semgrep/` is excluded from the scan.

Run locally: `semgrep scan --config .semgrep --exclude=.semgrep`

False positive on a line you add? Append `// nosemgrep: <rule-id>` (or
`# nosemgrep: <rule-id>`) to that line, with a short reason in the PR.

Add project-specific rules by dropping more `*.yml` files in this directory.
