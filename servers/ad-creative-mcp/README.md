# ad-creative-mcp (bundled)

This is a self-contained, dependency-bundled build of [`@googleadsagent/ad-creative-mcp`](https://github.com/itallstartedwithaidea/ad-creative-mcp) — a Cloudinary-backed MCP server for ad creative validation, resizing, and optimization across 50+ ad platforms.

## Why bundled?

The plugin ships this build inline (instead of `npx`-ing the npm package) so first-time installs work without any external package fetches. Single 455KB ESM file with all dependencies inlined via esbuild.

## Launch

The plugin's `.mcp.json` launches it as:

```bash
node ${CLAUDE_PLUGIN_ROOT}/servers/ad-creative-mcp/server.mjs
```

## Env vars

| Variable | Required |
|---|---|
| `CLOUDINARY_CLOUD_NAME` | yes |
| `CLOUDINARY_API_KEY` | yes |
| `CLOUDINARY_API_SECRET` | yes |

Without Cloudinary keys, the server starts in degraded mode (validation only, no transforms).

## Source

Upstream source: https://github.com/itallstartedwithaidea/ad-creative-mcp
Build command: `npx esbuild src/index.js --bundle --platform=node --format=esm --outfile=dist/server.mjs --minify --banner:js="import { createRequire } from 'module'; const require = createRequire(import.meta.url);"`

## License

Proprietary — see top-level [LICENSE](../../LICENSE).
