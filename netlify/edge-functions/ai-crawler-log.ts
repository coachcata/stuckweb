// Records visits from AI crawlers to /board and its machine-readable copies,
// so John can see whether ChatGPT, Claude, Perplexity and the rest are actually
// fetching the page. Search Console cannot show this.
//
// Each visit is one entry in the Netlify Blobs store "ai-crawler-log"
// (Netlify > Project > Blobs), keyed by date, holding the bot name and time.
// Production writes to the site-wide store; previews to a per-deploy store so
// tests never mix with real visits. Ordinary visitors are passed straight
// through untouched. Logging can never break the page: any error is swallowed.

import type { Config, Context } from "@netlify/edge-functions";
import { getDeployStore, getStore } from "@netlify/blobs";

// Matched in order, so the more specific names come first.
const BOTS = [
  "OAI-SearchBot", "ChatGPT-User", "GPTBot",
  "Claude-SearchBot", "Claude-User", "ClaudeBot",
  "Perplexity-User", "PerplexityBot",
  "Google-Extended", "Googlebot",
  "bingbot", "Applebot-Extended", "Applebot",
  "Meta-ExternalAgent", "meta-externalfetcher",
  "CCBot", "Amazonbot", "DuckAssistBot", "YouBot", "MistralAI-User",
];

function match(ua: string): string | null {
  const lower = ua.toLowerCase();
  return BOTS.find((b) => lower.includes(b.toLowerCase())) ?? null;
}

export default async (req: Request, context: Context) => {
  const bot = match(req.headers.get("user-agent") ?? "");
  if (!bot) return; // ordinary visitor: carry on to the page as normal

  let logged = "no";
  try {
    const store = context.deploy.context === "production"
      ? getStore("ai-crawler-log")
      : getDeployStore("ai-crawler-log");
    const time = new Date().toISOString();
    const path = new URL(req.url).pathname;
    await store.setJSON(`${time.slice(0, 10)}/${time}-${bot}-${crypto.randomUUID().slice(0, 8)}`, {
      bot, time, path, ua: req.headers.get("user-agent"),
    });
    console.log(`ai-crawler-log: ${bot} ${path}`);
    logged = "yes";
  } catch (err) {
    console.log("ai-crawler-log: could not record visit. " + (err as Error).message);
  }

  const res = await context.next();
  res.headers.set("x-ai-crawler-log", `${bot}; recorded=${logged}`);
  return res;
};

export const config: Config = {
  path: [
    "/board", "/board/", "/board.html", "/board.md",
    "/site/board", "/site/board/", "/site/board.html", "/site/board.md",
    "/llms.txt", "/llms-full.txt",
  ],
};
