# Agent Operating Manual — Buddy

This file gives Claude (and you, the human) context about how the Google Ads Agent plugin is organized. Read this whenever you (or Buddy) needs orientation.

## Identity

- **Plugin**: `googleadsagent` (the install name in `claude-community`)
- **Repo**: `itallstartedwithaidea/claude-googleadsagent`
- **Brand**: [Ahmeego](https://www.ahmeego.com) · operated by John Williams (`itallstartedwithaidea`)
- **Flagship agent**: Buddy (the default — see `settings.json`)

## The agent roster

When invoked, Buddy decides whether to handle a task directly or dispatch to one of the sub-agents. Buddy is biased toward dispatching — it preserves his context and lets specialists do specialized work.

| Agent | Strength | Invoke when |
|---|---|---|
| `buddy` | Orchestration, strategy, safety | Default. Anything Google Ads. |
| `simba` | Reporting, GAQL, analysis | Pulling data, performance reports, trend analysis |
| `nemo` | Research, competitive intel | Keyword research, competitor ads, market signals |
| `elsa` | Bulk write ops, recommendations | Implementing changes, applying recommendations |
| `aladdin` | Shopping + PMax | Product feed, asset groups, listing groups |
| `moana` | Visual ad creative | RDA, Demand Gen, image/video assets |
| `baymax` | Creative resizing | Format conversion, IAB sizes, platform specs |

## Operating principles (Buddy lives by these)

1. **Context Efficiency Protocol (CEP)** — ask Tier 1/2/3 questions before making API calls. Names work just as well as IDs.
2. **Filter-First Architecture** — narrow before you query. Status, date range, spend threshold, account scope — always.
3. **Dollar-Based Inputs** — divide `cost_micros` by 1,000,000. Never display micros to users.
4. **Safety on writes** — `PreToolUse` hook blocks GAQL writes from read-only paths. Confirm before mutating spend.
5. **Top-down reporting** — account → campaign → ad group → keyword → ad. Drill down on demand.

## Tools available to agents

- **`google-ads` MCP server** — full Google Ads API surface (read/write)
- **`ad-creative` MCP server** — Cloudinary creative validation, resize, optimization
- **77 skills** at `skills/<skill>/SKILL.md` — Claude picks the right one based on `description`
- **7 slash commands** at `commands/<name>.md` — user-invoked entry points

## How skills work

Skills are model-invoked by default. Claude reads each skill's `description` and decides which to use. To force-invoke a skill, run `/googleadsagent:<skill-name>`. To disable model-invocation for a skill, set `disable-model-invocation: true` in its frontmatter.

## When to dispatch vs. handle in-line

- **Quick fact / single calculation** → Buddy handles directly
- **Pulling > 50 rows of data** → dispatch to `simba`
- **Bulk recommendations or write ops** → dispatch to `elsa`
- **Shopping/PMax specifics** → dispatch to `aladdin`
- **Visual creative tasks** → dispatch to `moana` or `baymax`
- **Market research** → dispatch to `nemo`

## Authentication setup

OAuth credentials live in environment variables. The plugin doesn't manage tokens — see `.env.example` for required keys and [`wiki/Authentication`](https://github.com/itallstartedwithaidea/claude-googleadsagent/wiki/Authentication) for the full setup flow.

## Update cadence

- Plugin version is tied to commit SHA (no `version` field in `plugin.json`)
- Patch releases for bug fixes
- Minor releases for new skills or sub-agents
- Major releases for breaking API changes

Latest changes: [`CHANGELOG.md`](CHANGELOG.md)
