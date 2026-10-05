# Custom Semgrep rules

Security rules wired as a CI gate by `.github/workflows/semgrep.yml`.

| Rule file | Guards against |
|---|---|
| `hardcoded-cloud-secret.yml` | Hard-coded AWS access key / GitLab PAT / npm registry authToken committed to source, CI, or Dockerfiles |
| `unguarded-authorization-header-split.yml` | Reading the `Authorization` header and calling `.split(' ')` without a null guard (throws a 500 when the header is absent) |

The CI job runs **diff-aware** on pull requests (`--baseline-commit`): only
findings introduced by the change fail the build. Pre-existing findings the team
has accepted or is fixing separately do not block unrelated PRs — but any *new*
occurrence does. The job runs on pull requests only (no scan on direct pushes).

Run locally: `semgrep scan --config .semgrep`

Add project-specific rules by dropping more `*.yml` files in this directory.
