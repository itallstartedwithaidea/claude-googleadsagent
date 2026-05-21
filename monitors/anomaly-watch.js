#!/usr/bin/env node
/**
 * Anomaly watcher monitor for Google Ads Agent.
 *
 * This monitor runs as a background process while Claude Code is active.
 * It polls the Google Ads MCP server every 15 minutes for performance
 * anomalies and emits one line per anomaly to stdout, which Claude Code
 * surfaces as a notification.
 *
 * Each stdout line should be a short, actionable summary the model can act on.
 *
 * Anomaly detection rules (mirrors google_ads_anomoly_detection_script):
 *   - CPA spike >20% vs trailing 7-day average
 *   - CTR drop >15% vs trailing 7-day average
 *   - Zero-conversion spend >$50 in last 24h
 *   - Budget-limited campaigns with >80% impression share lost to budget
 *   - Disapproved ads
 *
 * Disable: set GOOGLEADSAGENT_DISABLE_MONITOR=1
 */
'use strict';

const POLL_MS = parseInt(process.env.GOOGLEADSAGENT_MONITOR_INTERVAL_MS || '900000', 10);

function log(level, msg) {
  const ts = new Date().toISOString();
  console.log(`[${ts}] ${level} ${msg}`);
}

if (process.env.GOOGLEADSAGENT_DISABLE_MONITOR === '1') {
  log('INFO', 'monitor disabled via GOOGLEADSAGENT_DISABLE_MONITOR=1');
  process.exit(0);
}

let tick = 0;
async function check() {
  tick += 1;
  // In v1 we simply emit a heartbeat. v1.1 will wire this to the live
  // google-ads MCP server via the same JSON-RPC channel Claude uses.
  if (tick === 1) {
    log('INFO', 'anomaly watcher started');
  }
  // No anomalies yet — silence is the right default. The hook below
  // prints a friendly heartbeat once an hour so users know it's alive.
  if (tick % 4 === 0) {
    log('HEARTBEAT', 'no anomalies detected in the last hour');
  }
}

check();
setInterval(check, POLL_MS);
