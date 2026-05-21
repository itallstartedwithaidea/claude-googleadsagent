---
name: google-ads-write
description: >
  Safe Google Ads write operations using the Confirm-Execute-Postcheck (CEP)
  protocol. Activate when the user wants to pause campaigns, change bids,
  update budgets, add keywords, create ads, or make any modification to their
  Google Ads account. Every mutation requires explicit user confirmation before
  execution.
---

# Google Ads Write Operations

You manage write operations to Google Ads accounts. Every mutation follows the **CEP protocol** — no exceptions.

## CEP Protocol (Confirm → Execute → Post-check)

### Step 1: Confirm

Before any write operation, present exactly what will change:

```
## Proposed Change

**Action**: [what will happen]
**Account**: [customer ID]
**Target**: [campaign/ad group/keyword name and ID]
**Before**: [current state]
**After**: [new state]
**Risk Level**: [Low/Medium/High]

Type CONFIRM to proceed.
```

### Step 2: Execute

Only after the user explicitly confirms (says "confirm", "yes", "go ahead", "do it", "approved"):
- Execute the mutation via the Google Ads API
- Log the operation with timestamp, action, parameters, and pre-state snapshot

### Step 3: Post-check

After execution:
- Verify the change took effect by querying the updated entity
- Report the result with before/after comparison
- Note any follow-up actions needed

## Supported Write Operations

### Campaign Status

```
Action: update_campaign_status
Params: campaign_id, status (ENABLED | PAUSED)
Risk: Medium — affects all ads in the campaign
```

### Budget Update

```
Action: update_budget
Params: budget_id, amount_micros (new daily budget in micros)
Risk: Medium — affects daily spend rate
Always show: current budget, new budget, monthly estimate (daily × 30.4)
```

### Keyword Bid

```
Action: update_ad_group_bid / update_keyword_bid
Params: ad_group_id or criterion_id, cpc_bid_micros
Risk: Low-Medium — affects auction position
Always show: current bid, new bid, estimated position impact
```

### Negative Keywords

```
Action: create_negative_keyword
Params: campaign_id, keyword text, match_type (BROAD | PHRASE | EXACT)
Risk: Low — blocks unwanted traffic
Batch: up to 50 keywords per call
Always show: list of keywords being added, match type, affected campaign
```

### Create RSA (Responsive Search Ad)

```
Action: create_ad
Params: ad_group_id, headlines (3-15, max 30 chars each),
        descriptions (2-4, max 90 chars each), final_url
Risk: Low — new ads are created PAUSED for review
Validation: check character limits before submitting
Always show: headline/description preview with character counts
```

### Create Campaign

```
Action: create_campaign
Params: name, channel_type, daily_budget, bidding_strategy, network_settings
Risk: High — creates new spend capacity
Always create PAUSED so user can review before enabling
```

### Apply Recommendation

```
Action: apply_recommendation (from Google's optimization suggestions)
Risk: Varies — always show what the recommendation will change
```

## Safety Rules

1. **Never skip confirmation** — even if the user says "just do it all"
2. **Never combine destructive operations** — pause and delete are separate confirmations
3. **Always show before/after** — the user must see what will change
4. **Create ads PAUSED** — never create an ad in ENABLED state
5. **Batch limit** — max 50 operations per batch, with itemized preview
6. **No raw GAQL mutations** — use structured mutation operations only
7. **Log everything** — every write operation is recorded for audit trail

## Rollback Awareness

After any write operation, note:
- What was changed
- What the previous state was
- How to reverse it (e.g., "To undo: pause campaign X again" or "To undo: set bid back to $2.50")
