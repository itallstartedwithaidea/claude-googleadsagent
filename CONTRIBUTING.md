# Contributing

This is a proprietary plugin (see [LICENSE](LICENSE)), but I welcome bug reports, feature requests, and suggestions.

## Bug reports

[Open an issue](https://github.com/itallstartedwithaidea/claude-googleadsagent/issues/new) with:

- Claude Code version (`claude --version`)
- Plugin version (commit SHA from `/plugin list`)
- The MCP servers involved (`google-ads`, `ad-creative`, or both)
- Steps to reproduce
- Expected vs. actual behavior
- Sanitized logs (no Google Ads customer IDs, no tokens)

## Feature requests

[Open a discussion](https://github.com/itallstartedwithaidea/claude-googleadsagent/discussions) describing:

- The problem you're trying to solve (not just the feature)
- The Google Ads workflow it would unlock
- Any prior art (Gemini extension, Google Ads scripts, etc.)

## Pull requests

Because this is a proprietary codebase, PRs aren't merged by default — but documentation fixes, typo corrections, README improvements, and skill-`description` refinements are welcome via PR. Larger contributions: please open a discussion first.

## Security issues

Do NOT open a public issue for security vulnerabilities. See [SECURITY.md](SECURITY.md).

## Coding conventions

- **No version field in `plugin.json`** — commit SHA drives versions.
- **Skills use kebab-case directory names** — `quality-score-optimization`, not `qualityScoreOptimization`.
- **Hooks must be deterministic and side-effect-free** unless explicitly described otherwise.
- **MCP server references use registry sources** (`uvx`, `npx`) — no bundled source unless a registry publish isn't viable.
- **All env var references in `.mcp.json` use `${VAR}` placeholders** — never hardcoded.

## Project maintainer

[John Williams](https://github.com/itallstartedwithaidea) · `john@ahmeego.com`
