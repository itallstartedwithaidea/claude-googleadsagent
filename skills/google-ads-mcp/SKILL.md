---
name: google-ads-mcp
description: >
  MCP (Model Context Protocol) server configuration for live Google Ads API access.
  Activate when the user wants to connect Claude to their Google Ads account via
  MCP, set up the google-ads-mcp server, or configure credentials for live API
  queries. Provides setup instructions, server configuration, and troubleshooting.
---

# Google Ads MCP Server

This skill configures the [google-ads-mcp](https://github.com/itallstartedwithaidea/google-ads-mcp) server for live Google Ads API access through Claude Code, Claude Desktop, Cursor, or any MCP client.

## Quick Setup

### 1. Install

```bash
pip install git+https://github.com/itallstartedwithaidea/google-ads-mcp.git
```

### 2. Configure Credentials

Create a `.env` file or set environment variables:

```env
GOOGLE_ADS_DEVELOPER_TOKEN=your-developer-token
GOOGLE_ADS_CLIENT_ID=your-oauth-client-id
GOOGLE_ADS_CLIENT_SECRET=your-oauth-client-secret
GOOGLE_ADS_REFRESH_TOKEN=your-refresh-token
GOOGLE_ADS_LOGIN_CUSTOMER_ID=123-456-7890
```

Or point to an existing `google-ads.yaml`:

```env
GOOGLE_ADS_CREDENTIALS=/path/to/google-ads.yaml
GOOGLE_ADS_LOGIN_CUSTOMER_ID=123-456-7890
```

### 3. Run

```bash
python -m ads_mcp.server
```

## Claude Code Configuration

Place `.mcp.json` in your project root:

```json
{
  "mcpServers": {
    "google-ads": {
      "type": "stdio",
      "command": "python",
      "args": ["-m", "ads_mcp.server"],
      "env": {
        "GOOGLE_ADS_CREDENTIALS": "${GOOGLE_ADS_CREDENTIALS}",
        "GOOGLE_ADS_LOGIN_CUSTOMER_ID": "${GOOGLE_ADS_LOGIN_CUSTOMER_ID}"
      }
    }
  }
}
```

Claude Code auto-discovers `.mcp.json` and loads the server on startup.

## Claude Desktop Configuration

Add to `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "google-ads": {
      "command": "python",
      "args": ["-m", "ads_mcp.server"],
      "env": {
        "GOOGLE_ADS_CREDENTIALS": "/path/to/google-ads.yaml",
        "GOOGLE_ADS_LOGIN_CUSTOMER_ID": "123-456-7890"
      }
    }
  }
}
```

## Available Tools (29)

### Read Tools (9)

| Tool | Description |
|---|---|
| `list_accessible_customers` | List all accessible customer accounts |
| `list_accounts` | List accounts under an MCC with details |
| `execute_gaql` | Run custom GAQL queries |
| `get_campaign_performance` | Campaign metrics with date range |
| `get_keyword_performance` | Keyword metrics and quality scores |
| `get_search_terms` | Search term report with wasted spend |
| `get_ad_performance` | Ad creative performance |
| `get_account_budget_summary` | Budget utilization analysis |
| `generate_keyword_ideas` | Keyword Planner search volume and CPC |

### Audit Tools (7)

| Tool | Description |
|---|---|
| `get_auction_insights` | Competitive auction data |
| `get_change_history` | Recent account changes |
| `get_device_performance` | Performance by device type |
| `get_geo_performance` | Performance by location |
| `get_recommendations` | Google's optimization suggestions |
| `get_pmax_performance` | Performance Max campaign data |
| `get_impression_share` | Impression share and lost opportunity |

### Write Tools (11) — dry-run by default

| Tool | Description |
|---|---|
| `update_campaign_budget` | Change daily budget |
| `update_campaign_status` | Pause or enable a campaign |
| `update_ad_group_status` | Pause or enable an ad group |
| `update_keyword_bid` | Change keyword CPC bid |
| `add_keywords` | Add keywords to an ad group |
| `add_negative_keywords` | Add negative keywords |
| `remove_negative_keyword` | Remove a negative keyword |
| `create_campaign` | Create a new campaign (paused) |
| `create_ad_group` | Create a new ad group |
| `switch_bidding_strategy` | Change bidding strategy |
| `generic_mutate` | Raw Google Ads API mutation |

All write tools use `confirm=False` by default (dry-run preview). Pass `confirm=True` only after reviewing the preview.

### Doc Tools (2)

| Tool | Description |
|---|---|
| `get_gaql_reference` | GAQL syntax and field reference |
| `get_workflow_guide` | Step-by-step workflow instructions |

## Credential Sources

| Value | Where to Get It |
|---|---|
| Developer Token | ads.google.com → Tools & Settings → API Center |
| Client ID | console.cloud.google.com → Credentials |
| Client Secret | console.cloud.google.com → Credentials |
| Refresh Token | OAuth Playground or `google-ads` Python auth helper |
| Login Customer ID | Your MCC account ID (top of Google Ads UI) |

## Troubleshooting

| Problem | Fix |
|---|---|
| `UNAUTHENTICATED` | Refresh token expired — regenerate via OAuth Playground |
| `PERMISSION_DENIED` | Account not accessible under your MCC |
| `DEVELOPER_TOKEN_NOT_APPROVED` | Apply for Basic Access at ads.google.com → API Center |
| Rate limit exceeded | Basic Access: 15K ops/day. Use LIMIT clauses and filters. |

## Related

- [google-ads-mcp repo](https://github.com/itallstartedwithaidea/google-ads-mcp) — Full source code
- [google-ads-api-agent](https://github.com/itallstartedwithaidea/google-ads-api-agent) — Python agent with 28 tools
- [googleadsagent.ai](https://googleadsagent.ai) — Production system (Buddy)
