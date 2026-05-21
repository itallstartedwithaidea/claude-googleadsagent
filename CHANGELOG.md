# Changelog

All notable changes to the Google Ads Agent plugin will be documented here.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and the plugin follows commit-SHA-based versioning (every commit on `main` is a new version in the Anthropic community marketplace).

## [1.0.1] — 2026-05-21

### Added
- **`@googleadsagent/ad-creative-mcp` 1.0.0 published to npm** — alternative distribution channel for users who want to update the MCP server independently of the plugin.

### Changed
- **`ad-creative` MCP server is now bundled** into the plugin at `servers/ad-creative-mcp/server.mjs` (455KB single-file ESM bundle with all dependencies inlined via esbuild). No external network fetch on install — faster cold start, works offline.
- `.mcp.json` now launches `ad-creative` via `node ${CLAUDE_PLUGIN_ROOT}/servers/ad-creative-mcp/server.mjs` instead of `npx -y @googleadsagent/ad-creative-mcp`. The npm-published package remains available for users who want to override.

## [1.0.0] — 2026-05-21

### Initial public release

- **Buddy** flagship Google Ads enterprise agent (Opus-powered)
- **6 specialized sub-agents** — Simba (reporting), Nemo (research), Elsa (optimization), Aladdin (Shopping/PMax), Moana (creative), Baymax (creative-innovate)
- **2 MCP servers**:
  - `googleadsagent-mcp` (PyPI) — Google Ads API live read/write
  - `@googleadsagent/ad-creative-mcp` (npm) — Cloudinary-backed creative tools
- **77 production skills** across Google Ads, AI agent engineering, Claude mythos, software dev, security, infrastructure, productivity, web frontend, scientific research, and media creative
- **7 slash commands** — `/analyze`, `/audit`, `/optimize`, `/status`, `/login`, `/logout`, `/switch`
- **2 safety hooks** — PreToolUse GAQL validation, PostToolUse audit logging
- **1 background monitor** — Google Ads anomaly watch
- **Default agent** — Buddy via `settings.json`

### Source repos consolidated

This plugin merges and packages content from:

- `itallstartedwithaidea/google-ads-api-agent` — Buddy + sub-agent system prompts
- `itallstartedwithaidea/agent-skills` — 73-skill library
- `itallstartedwithaidea/google-ads-skills` — additional Google Ads skills
- `itallstartedwithaidea/google-ads-gemini-extension` — commands + hooks (ported from Gemini)
- `itallstartedwithaidea/google-ads-mcp` — Google Ads MCP server (published as `googleadsagent-mcp`)
- `itallstartedwithaidea/ad-creative-mcp` — Ad Creative MCP server (re-scoped to `@googleadsagent`)

### Distribution

- Submitted to Anthropic's `claude-community` marketplace
- Self-hosted at `itallstartedwithaidea/claude-googleadsagent` as an immediate fallback
- License: Proprietary (© Ahmeego / John Williams)
