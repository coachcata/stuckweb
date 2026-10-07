// After a production deploy is live, send the pages that changed to IndexNow
// (Bing, and the engines that read Bing, including ChatGPT search and Copilot).
//
// Changed pages come from the git diff between this deploy and the last one.
// If that diff is unavailable, or data/entity.json or the build script changed
// (which touches the schema on every page), every URL in sitemap.xml is sent.
// Only URLs in the sitemap are ever sent, so mirrors and noindex pages are not.
// This step never fails the deploy: anything that goes wrong is logged.

const { execSync } = require("node:child_process");
const { readFileSync } = require("node:fs");

const ENDPOINT = "https://api.indexnow.org/indexnow";

function sitemapUrls() {
  return [...readFileSync("sitemap.xml", "utf8").matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
}

function changedUrls(site, all) {
  const from = process.env.CACHED_COMMIT_REF;
  const to = process.env.COMMIT_REF;
  if (!from || !to || from === to) return all;
  let files;
  try {
    files = execSync(`git diff --name-only ${from} ${to}`, { encoding: "utf8" }).split("\n").filter(Boolean);
  } catch {
    return all;
  }
  if (files.some((f) => f === "data/entity.json" || f === "scripts/build.mjs")) return all;
  const urls = files
    .filter((f) => f.endsWith(".html") && !f.startsWith("site/"))
    .map((f) => site + (f === "index.html" ? "/" : "/" + f.replace(/\/index\.html$/, "").replace(/\.html$/, "")));
  return urls.filter((u) => all.includes(u));
}

module.exports = {
  async onSuccess({ inputs }) {
    if (process.env.CONTEXT !== "production") {
      console.log("IndexNow: not a production deploy, nothing sent.");
      return;
    }
    try {
      const all = sitemapUrls();
      const site = new URL(all[0]).origin;
      const urlList = changedUrls(site, all);
      if (!urlList.length) {
        console.log("IndexNow: no changed pages in the sitemap, nothing sent.");
        return;
      }
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify({
          host: new URL(site).host,
          key: inputs.key,
          keyLocation: `${site}/${inputs.key}.txt`,
          urlList,
        }),
      });
      console.log(`IndexNow: ${res.status} for ${urlList.length} URL(s): ${urlList.join(", ")}`);
    } catch (err) {
      console.log("IndexNow: ping failed, deploy unaffected. " + err.message);
    }
  },
};
