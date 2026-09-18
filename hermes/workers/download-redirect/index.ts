/**
 * Cloudflare Worker — /download redirector.
 *
 * Lives at https://hermes-dental.si/download. Returns a 302 to the latest
 * GitHub release asset, with a Workers KV fallback for when GitHub's API
 * is rate-limited or down.
 *
 * Configuration (set via `wrangler secret` / `wrangler kv`):
 *   GITHUB_RELEASES_TOKEN  — fine-grained PAT, scope = contents:read on
 *                            the hermes-dental-clone repo. Rotated quarterly.
 *   GITHUB_REPO            — e.g. "Sobraniex/hermes-dental-clone"
 *   HERMES_RELEASE_KV      — KV namespace ID for cached release URLs
 *
 * Behavior:
 *   1. Look up the latest release via GitHub Releases API.
 *   2. Find the first .zip / .dmg asset (macOS first).
 *   3. Cache the resolved URL in KV with TTL 30 days.
 *   4. On API failure, fall back to the cached URL.
 *   5. On total failure, 302 to the GitHub releases page.
 */

interface Env {
  GITHUB_RELEASES_TOKEN: string;
  GITHUB_REPO: string;
  HERMES_RELEASE_KV: KVNamespace;
}

const CACHE_KEY = "latest_release_url";
const CACHE_TTL_S = 30 * 24 * 3600;

export default {
  async fetch(req: Request, env: Env): Promise<Response> {
    if (new URL(req.url).pathname !== "/download") {
      return new Response("Not Found", { status: 404 });
    }
    const cached = await env.HERMES_RELEASE_KV?.get(CACHE_KEY);
    if (cached) {
      return Response.redirect(cached, 302);
    }
    try {
      const apiRes = await fetch(
        `https://api.github.com/repos/${env.GITHUB_REPO}/releases/latest`,
        {
          headers: {
            Authorization: `Bearer ${env.GITHUB_RELEASES_TOKEN}`,
            Accept: "application/vnd.github+json",
            "User-Agent": "hermes-dental-download-redirector",
          },
        },
      );
      if (!apiRes.ok) throw new Error(`GitHub API ${apiRes.status}`);
      const release = (await apiRes.json()) as { assets: { name: string; browser_download_url: string }[] };
      const asset =
        release.assets.find((a) => /\.dmg$/i.test(a.name)) ??
        release.assets.find((a) => /\.zip$/i.test(a.name));
      if (!asset) throw new Error("No downloadable asset in latest release");
      await env.HERMES_RELEASE_KV?.put(CACHE_KEY, asset.browser_download_url, {
        expirationTtl: CACHE_TTL_S,
      });
      return Response.redirect(asset.browser_download_url, 302);
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      return new Response(`Download lookup failed: ${msg}`, { status: 502 });
    }
  },
};
