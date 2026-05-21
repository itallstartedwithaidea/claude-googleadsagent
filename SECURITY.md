# Security Policy

## Reporting a vulnerability

If you discover a security vulnerability in the Google Ads Agent plugin, the MCP servers it ships, or the agents/skills/hooks it contains, **please do not open a public issue**. Instead, email the maintainer privately:

- **Email**: `security@ahmeego.com` (or `john@ahmeego.com` if the security alias bounces)
- **PGP**: available on request

You will receive an acknowledgement within 72 hours and a status update within 7 days.

## Scope

We take seriously, in order of priority:

1. **Credential exfiltration** — anything that exposes Google Ads OAuth tokens, refresh tokens, developer tokens, Cloudinary keys, or the Anthropic API key out of the local environment
2. **Unauthorized writes to Google Ads accounts** — any path that lets the agent mutate spend without explicit user confirmation
3. **Prompt injection that bypasses safety hooks** — the `PreToolUse` GAQL validator and confirmation gates
4. **MCP server vulnerabilities** — RCE, SSRF, or path traversal in `googleadsagent-mcp` or `@googleadsagent/ad-creative-mcp`
5. **Supply-chain attacks** — malicious dependencies introduced via the published PyPI/npm packages

## Out of scope

- Issues in unrelated Google Ads scripts, the broader `agent-skills` library, or other projects in the `itallstartedwithaidea` namespace (file those there directly).
- Issues that require an attacker to already have root on the user's machine or full access to their Google Ads MCC.
- Issues in Anthropic Claude Code itself — report those to [security@anthropic.com](mailto:security@anthropic.com).

## Hardening this plugin against AI/agent misuse

We follow the [Claude Code plugin security model](https://code.claude.com/docs/en/discover-plugins#security):

- Hooks run as system commands and have full access to your shell. We ship only deterministic, side-effect-free hooks (`validate-gaql.js` and `log-tool-call.js`).
- MCP servers are launched via the package registries (`uvx`, `npx`) using pinned major versions.
- No hook references files outside `${CLAUDE_PLUGIN_ROOT}`.
- No secret is embedded in the plugin — all credentials come from environment variables.
- Pre-publish, every file is scanned for token-shaped strings (`sk-`, `ya29.`, `pypi-`, etc.).

## Auditing

To audit what this plugin will execute on your machine:

```bash
# After install, plugins are cached here:
ls ~/.claude/plugins/cache/claude-community/googleadsagent

# Inspect hooks
cat ~/.claude/plugins/cache/claude-community/googleadsagent/hooks/hooks.json

# Inspect MCP server commands
cat ~/.claude/plugins/cache/claude-community/googleadsagent/.mcp.json
```

## Coordinated disclosure

We follow a 90-day coordinated disclosure window from the date of acknowledgement, with extensions for complex issues. Reporters who follow this policy will be credited in the release notes (opt-in).
