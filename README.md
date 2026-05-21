# Google Ads Agent — Buddy

> The most comprehensive Google Ads + advertising automation plugin for Claude Code.
> By [**Ahmeego**](https://www.ahmeego.com) · [`itallstartedwithaidea`](https://github.com/itallstartedwithaidea) · powered by **Buddy**

[![PyPI](https://img.shields.io/pypi/v/googleadsagent-mcp.svg?label=googleadsagent-mcp)](https://pypi.org/project/googleadsagent-mcp/)
[![npm](https://img.shields.io/npm/v/@googleadsagent/ad-creative-mcp.svg?label=%40googleadsagent%2Fad-creative-mcp)](https://www.npmjs.com/package/@googleadsagent/ad-creative-mcp)
[![Claude Code Plugin](https://img.shields.io/badge/Claude%20Code-Plugin-7c3aed.svg)](https://code.claude.com/docs/en/plugin-marketplaces)
[![License: Proprietary](https://img.shields.io/badge/License-Proprietary-red.svg)](LICENSE)

---

## What you get

- **Buddy** — flagship Opus-powered Google Ads enterprise agent with live API access
- **6 specialized sub-agents** (Simba, Nemo, Elsa, Aladdin, Moana, Baymax) covering reporting, research, optimization, Shopping/PMax, creative, and creative-innovate
- **2 MCP servers** — `googleadsagent-mcp` (Google Ads API) and `@googleadsagent/ad-creative-mcp` (Cloudinary-backed creative validation)
- **~77 production skills** across Google Ads, AI agent engineering, Claude mythos, software dev, security, infrastructure, productivity, web frontend, scientific research, and media creative
- **7 slash commands** — `/analyze`, `/audit`, `/optimize`, `/status`, `/login`, `/logout`, `/switch`
- **Safety hooks** — `PreToolUse` GAQL validation prevents write operations from read-only contexts, `PostToolUse` audit logging
- **Background anomaly monitor** — surfaces CPA spikes, CTR drops, and zero-conversion spend in real time
- **Buddy as the default agent** — `settings.json` activates Buddy immediately on plugin load

> Built by a practitioner with $350M+ in managed ad spend across Google, Meta, Microsoft, and Amazon.
> Reference architecture is the production system behind [`ahmeego.com`](https://www.ahmeego.com).

---

## Install (one command)

Once the plugin is approved in Anthropic's community marketplace:

```shell
/plugin marketplace add anthropics/claude-plugins-community
/plugin install googleadsagent@claude-community
```

### Self-hosted install (available immediately)

```shell
/plugin marketplace add itallstartedwithaidea/claude-googleadsagent
/plugin install googleadsagent@claude-googleadsagent
```

### Local dev install

```bash
git clone https://github.com/itallstartedwithaidea/claude-googleadsagent
claude --plugin-dir ./claude-googleadsagent
```

---

## Authentication

The Google Ads MCP server needs OAuth credentials. Copy `.env.example` to `.env` and fill in:

| Variable | Where to get it |
|---|---|
| `GOOGLE_ADS_DEVELOPER_TOKEN` | [Google Ads → Tools → API Center](https://ads.google.com/aw/apicenter) |
| `GOOGLE_ADS_CLIENT_ID` | [Google Cloud Console → OAuth 2.0 Client IDs](https://console.cloud.google.com/apis/credentials) |
| `GOOGLE_ADS_CLIENT_SECRET` | Same as above |
| `GOOGLE_ADS_REFRESH_TOKEN` | Run `claude-googleadsagent oauth` (see wiki) |
| `GOOGLE_ADS_LOGIN_CUSTOMER_ID` | Your MCC account ID (no dashes) |

Full walkthrough: [Wiki → Authentication](https://github.com/itallstartedwithaidea/claude-googleadsagent/wiki/Authentication)
Or use the Ahmeego hosted OAuth flow: [ahmeego.com/docs/google-ads-auth](https://www.ahmeego.com/docs/google-ads-auth)

---

## Quick start

Inside Claude Code after installing the plugin:

```shell
# Talk to Buddy directly
> Hey Buddy, audit my Google Ads account 1234567890 for the last 30 days

# Run a slash command
/googleadsagent:audit My MCC, last 30 days, focus on PMax campaigns

# Invoke a sub-agent explicitly
> @simba pull a search-term waste report for campaigns with >$50 spend and zero conversions
> @aladdin which Shopping product groups are limited by budget?
> @baymax resize these display creatives for all standard IAB sizes

# Use a specific skill
/googleadsagent:keyword-research expand my "personal injury lawyer" keyword list with high-intent variants
```

---

## What's in the box

### Agents (7)

| Agent | Role |
|---|---|
| **Buddy** | Flagship Google Ads strategist — orchestrates everything |
| **Simba** | Reporting & analysis |
| **Nemo** | Research & competitive intelligence |
| **Elsa** | Bulk optimization & write ops |
| **Aladdin** | Shopping & Performance Max |
| **Moana** | Visual ad creative (RDA, Demand Gen) |
| **Baymax** | Creative resizing & format conversion |

### MCP servers (2)

| Server | Source | Powers |
|---|---|---|
| `google-ads` | [`googleadsagent-mcp`](https://pypi.org/project/googleadsagent-mcp/) (PyPI) | Live Google Ads API — read, analyze, create, modify |
| `ad-creative` | [`@googleadsagent/ad-creative-mcp`](https://www.npmjs.com/package/@googleadsagent/ad-creative-mcp) (npm) | Cloudinary-backed creative validation, resizing, optimization |

### Skill categories (77 skills)

- **Google Ads (16)** — audit, analysis, write, math, mcp, keyword-research, ad-copy-generation, budget-optimization, pmax-optimization, shopping-ads, audience-targeting, conversion-tracking, quality-score-optimization, remarketing-strategy, competitor-analysis, landing-page-audit
- **AI Agent Engineering (10)** — knowledge-base-injection, entity-memory-management, multi-model-routing, proactive-intelligence, mcp-server-creation, parallel-agent-orchestration, memory-persistence, continuous-learning, token-optimization, long-horizon-workflows
- **Claude Mythos (10)** — prompt-architecture, context-engineering, anthropic-tool-mastery, cognitive-scaffolding, verification-loops, self-healing-agents, adversarial-resilience, agent-instinct-system, session-archaeology, multi-harness-portability
- **Software Dev (8)** — code-review, test-driven-development, systematic-debugging, git-worktrees, brainstorming, subagent-driven-development, writing-plans, executing-plans
- **Security (4)** — agent-security-scanning, codeql-semgrep, sandbox-hardening, secret-protection
- **Infrastructure (6)** — cloudflare-workers, ci-cd-pipelines, edge-rendering, observability, service-discovery, configuration-management
- **Productivity (6)** — workflow-orchestration, batch-processing, knowledge-base-rag, ai-chat-studio, low-code-generation, assistant-presets
- **Web Frontend (6)** — react-best-practices, react-native-guidelines, view-transitions, edge-deployment, composition-patterns, web-design-guidelines
- **Scientific Research (8)** — data-analysis, machine-learning, bioinformatics, cheminformatics, geospatial-analysis, research-methodology, scientific-writing, database-lookup
- **Media Creative (3)** — web-asset-generation, programmatic-video, ml-model-integration

### Slash commands (7)
`/analyze` · `/audit` · `/optimize` · `/status` · `/login` · `/logout` · `/switch`

### Hooks (2)
- **`PreToolUse`** → validates GAQL queries before execution to block accidental writes from read-only contexts
- **`PostToolUse`** → logs every Google Ads tool call to an audit trail

### Background monitor (1)
- **`google-ads-anomaly-watch`** → polls every 15 min for CPA spikes >20%, CTR drops >15%, zero-conversion spend, budget-limited campaigns, disapproved ads

---

## Roadmap

- v1.1 — 14 additional platform MCPs from [MiniAgent](https://github.com/itallstartedwithaidea/MiniAgent) (Meta, Microsoft, Amazon, LinkedIn, TikTok, Snap, Pinterest, Reddit, X, Spotify, TradeDesk, Criteo, AdRoll)
- v1.2 — Writing Agent / Ghost Writer skills (18 platform formatters, AI-detection validation)
- v1.3 — ContextOS cognitive primitives as built-in skills
- v2.0 — LSP server for GAQL files, real-time campaign health dashboard

---

## Links

- **Plugin source** — [github.com/itallstartedwithaidea/claude-googleadsagent](https://github.com/itallstartedwithaidea/claude-googleadsagent)
- **Wiki + docs** — [github.com/itallstartedwithaidea/claude-googleadsagent/wiki](https://github.com/itallstartedwithaidea/claude-googleadsagent/wiki)
- **Homepage** — [ahmeego.com](https://www.ahmeego.com)
- **Hosted tools** — [ahmeego.com]([https://www.ahmeego.com/tools) — Buddy AI Agent, Auditor, Campaign Builder, Keyword Analyzer
- **Author** — [@itallstartedwithaidea](https://github.com/itallstartedwithaidea) · [LinkedIn](https://www.linkedin.com/in/johnmichaelwilliams) · [Substack](https://itallstartedwithaidea.substack.com)

---

## License

Proprietary — © 2026 John Williams / Ahmeego. All Rights Reserved.
See [LICENSE](LICENSE). For commercial use beyond the runtime grant, contact `john@itallstartedwithaidea.com`.

---

<sub>Buddy is a registered name of Ahmeego. Claude Code, Anthropic, and the Anthropic logo are trademarks of Anthropic, PBC. Google Ads, Performance Max, and related marks are trademarks of Google LLC. This plugin is not officially endorsed by Anthropic or Google.</sub>
