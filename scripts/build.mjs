// Netlify build step (netlify.toml [build] command), also safe to run locally:
//   node scripts/build.mjs          regenerate everything below
//   node scripts/build.mjs --check  exit 1 if anything in the repo is out of date
//
// What it generates, always into both the root and the /site/ mirror:
//   - the JSON-LD block between <!-- entity-ld:start --> and <!-- entity-ld:end -->
//     on every page that carries the markers, from data/entity.json
//   - board.md, the plain Markdown copy of /board for AI agents
//   - llms.txt and llms-full.txt
//   - feed.xml
//   - <lastmod> in sitemap.xml for any page with a "Page last reviewed" date
// and, repo only (not published), data/listing-checklist.md.
//
// The one date to change when /board's copy changes is the
// <time class="reviewed" datetime="..."> line in its footer. Everything else
// (schema dateModified, sitemap, feed, board.md) follows it.
//
// No dependencies, Node 18+. It throws rather than guess if a page it reads
// has lost a marker, so a broken page fails the build and the live site
// stays on the last good deploy.

import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const CHECK = process.argv.includes("--check");
const entity = JSON.parse(read("data/entity.json"));
const SITE = entity.site;
const stale = [];

function read(rel) {
  return readFileSync(join(ROOT, rel), "utf8");
}
function write(rel, content) {
  const p = join(ROOT, rel);
  const old = existsSync(p) ? readFileSync(p, "utf8") : null;
  if (old === content) return;
  if (CHECK) {
    stale.push(rel);
    return;
  }
  writeFileSync(p, content);
  console.log("wrote " + rel);
}
// Every published file lives twice: /x and /site/x. Root is the source.
function writeBoth(rel, content) {
  write(rel, content);
  write("site/" + rel, content);
}

// ---------------------------------------------------------------- HTML helpers

// House style: no em or en dashes in anything this script publishes, even
// when a page title it quotes has one.
const undash = (s) => s.replace(/\s*[\u2014\u2013]\s*/g, ": ");

const ENTITIES = {
  amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " ", middot: "·",
  pound: "£", rsquo: "’", lsquo: "‘", rdquo: "”", ldquo: "“", hellip: "…",
  times: "×", copy: "©", rarr: "→", larr: "←",
};
function decode(s) {
  return s
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(+d))
    .replace(/&([a-z]+);/gi, (m, n) => ENTITIES[n.toLowerCase()] ?? m);
}
function text(html) {
  return decode(html.replace(/<[^>]+>/g, "")).replace(/\s+/g, " ").trim();
}
function must(value, what) {
  if (value == null || value === "") throw new Error("build.mjs: could not find " + what);
  return value;
}
function meta(html, name) {
  const m = html.match(new RegExp(`<meta (?:name|property)="${name}" content="([^"]*)"`));
  return m ? decode(m[1]) : null;
}
function title(html) {
  return text(must(html.match(/<title>([\s\S]*?)<\/title>/), "<title>")[1]);
}
function reviewed(html) {
  const m = html.match(/<time class="reviewed" datetime="(\d{4}-\d{2}-\d{2})"/);
  return m ? m[1] : null;
}
function noindex(html) {
  return /<meta name="robots" content="[^"]*noindex/.test(html);
}
function section(html, key) {
  const m = html.match(new RegExp(`<section[^>]*data-md="${key}"[^>]*>([\\s\\S]*?)</section>`));
  return must(m, `section data-md="${key}"`)[1];
}
function para(html, key) {
  const m = html.match(new RegExp(`<(p|div)[^>]*data-md="${key}"[^>]*>([\\s\\S]*?)</\\1>`));
  return must(m, `data-md="${key}"`)[2];
}

// A deliberately small HTML to Markdown converter. It knows the shapes the
// /board page uses (rail tiles, steps, cards, facts) and treats anything else
// as headings, paragraphs and list items.
function toMarkdown(html) {
  let h = html
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<(script|style|svg|video|form|nav|footer|noscript|template)\b[\s\S]*?<\/\1>/g, "")
    .replace(/<div class="fig">[\s\S]*?<div class="ds">[\s\S]*?<\/div><\/div><\/div>/g, "")
    .replace(/<div id="sent"[\s\S]*?<\/div>/g, "")
    .replace(/<div class="(eb|ml|folio|clip-caption)">[\s\S]*?<\/div>/g, "")
    .replace(/<img[^>]*>/g, "");
  // rail tile: title and timing
  h = h.replace(/<div class="r">\s*(?:<div class="ic">\s*<\/div>)?\s*<div class="t">([\s\S]*?)<\/div>\s*<div class="m">([\s\S]*?)<\/div>\s*<\/div>/g,
    (_, t, m) => `<li>${t}: ${m}</li>`);
  // step: number, heading, text, timing
  h = h.replace(/<div class="step">\s*<div class="n">[\s\S]*?<\/div>\s*<div>\s*<h3>([\s\S]*?)<\/h3>\s*<p>([\s\S]*?)<\/p>\s*<\/div>\s*<div class="t">([\s\S]*?)<\/div>\s*<\/div>/g,
    (_, t, p, d) => `<h3>${t}${text(d) ? " (" + d + ")" : ""}</h3><p>${p}</p>`);
  // facts row
  h = h.replace(/<div><span>([\s\S]*?)<\/span><b>([\s\S]*?)<\/b><\/div>/g, (_, a, b) => `<li>${a}: ${b}</li>`);
  // pull quote
  h = h.replace(/<div class="pull">\s*<p>([\s\S]*?)<\/p>\s*<\/div>/g, (_, p) => `<blockquote>${p}</blockquote>`);
  // links: keep the address, absolute
  h = h.replace(/<a [^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/g, (_, href, t) => {
    if (href.startsWith("#") || href.startsWith("javascript:")) return t;
    const url = href.startsWith("/") ? SITE + href : href;
    return `[${text(t)}](${url})`;
  });
  h = h.replace(/<br\s*\/?>/g, " ");
  // a bold label run straight into its text ("<strong>Who</strong>Fifteen") needs a gap
  h = h.replace(/<\/(strong|b|span|dt)>(?=\S)/g, "</$1> ");

  const out = [];
  const re = /<(h[1-4]|p|li|blockquote|td|th)\b[^>]*>([\s\S]*?)<\/\1>/g;
  let m;
  while ((m = re.exec(h))) {
    const t = text(m[2]);
    if (!t) continue;
    const tag = m[1];
    if (tag[0] === "h") out.push("#".repeat(+tag[1]) + " " + t);
    else if (tag === "li") out.push("- " + t);
    else if (tag === "blockquote") out.push("> " + t);
    else out.push(t);
  }
  // list items sit together, everything else gets a blank line
  return out.reduce((acc, line, i) => {
    if (i === 0) return line;
    const tight = line.startsWith("- ") && out[i - 1].startsWith("- ");
    return acc + (tight ? "\n" : "\n\n") + line;
  }, "");
}

// ---------------------------------------------------------------- schema

const addr = {
  "@type": "PostalAddress",
  addressLocality: "Milton Keynes",
  addressRegion: "England",
  addressCountry: "GB",
};
const city = { "@type": "City", name: entity.board.areaServed };
const clean = (o) => JSON.parse(JSON.stringify(o, (k, v) => (v === null || (Array.isArray(v) && !v.length) ? undefined : v)));

function catalystOrg() {
  const c = entity.catalyst;
  return {
    "@type": "Organization", "@id": c.id, name: c.name, url: c.url, logo: c.logo,
    description: c.description, email: c.email, telephone: c.telephone, address: addr,
    founder: { "@id": entity.founder.id }, sameAs: c.sameAs,
  };
}
function boardOrg() {
  const b = entity.board;
  return {
    "@type": "Organization", "@id": b.id, name: b.name, url: b.url, logo: b.logo,
    description: b.description, email: b.email, telephone: b.telephone, address: addr,
    parentOrganization: { "@id": entity.catalyst.id }, founder: { "@id": entity.founder.id },
    areaServed: city,
    sameAs: [...b.sameAs, b.linkedin, b.googleBusinessProfile].filter(Boolean),
  };
}
function person() {
  const f = entity.founder;
  return {
    "@type": "Person", "@id": f.id, name: f.name, jobTitle: f.jobTitle, url: f.url,
    image: f.image, worksFor: { "@id": entity.catalyst.id }, sameAs: f.sameAs,
  };
}
function website() {
  return {
    "@type": "WebSite", "@id": SITE + "/#website", url: SITE + "/",
    name: entity.catalyst.name, inLanguage: "en-GB", publisher: { "@id": entity.catalyst.id },
  };
}
function webPage(url, html, published) {
  return {
    "@type": "WebPage", "@id": url + "#webpage", url, name: title(html),
    description: meta(html, "description"), inLanguage: "en-GB",
    isPartOf: { "@id": SITE + "/#website" },
    datePublished: published, dateModified: reviewed(html) ?? published,
  };
}
function breadcrumb(url, name) {
  return {
    "@type": "BreadcrumbList", "@id": url + "#breadcrumb",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE + "/" },
      { "@type": "ListItem", position: 2, name, item: url },
    ],
  };
}
// The FAQ schema is read off the visible page, so it can never carry a
// question the page does not show.
function faqFromPage(html) {
  const block = section(html, "faq");
  const qs = [...block.matchAll(/<div class="q"><h3>([\s\S]*?)<\/h3><p>([\s\S]*?)<\/p><\/div>/g)];
  must(qs.length || null, "FAQ questions on /board");
  return qs.map(([, q, a]) => ({
    "@type": "Question", name: text(q),
    acceptedAnswer: { "@type": "Answer", text: text(a) },
  }));
}

function ldBlock(graph) {
  const json = JSON.stringify(clean({ "@context": "https://schema.org", "@graph": graph }), null, 2);
  return `<!-- entity-ld:start -->\n<script type="application/ld+json">\n${json}\n</script>\n<!-- entity-ld:end -->`;
}

const PAGES = {
  "board.html": (html) => {
    const url = SITE + "/board";
    const page = webPage(url, html, "2026-09-19");
    page.about = { "@id": entity.board.id };
    page.breadcrumb = { "@id": url + "#breadcrumb" };
    page.primaryImageOfPage = { "@type": "ImageObject", url: SITE + "/images/img-1990-og.jpg", width: 1200, height: 630 };
    const service = {
      "@type": "Service", "@id": url + "#service", name: "at.theboard men's business group",
      serviceType: "Peer advisory group for business owners", provider: { "@id": entity.board.id },
      areaServed: city, url,
      audience: { "@type": "BusinessAudience", name: "Male owner-managers of businesses with £500k to £5m turnover" },
    };
    if (entity.confirmed.price) service.offers = entity.confirmed.price.offer;
    return [
      catalystOrg(), boardOrg(), person(), website(), page, service,
      { "@type": "FAQPage", "@id": url + "#faq", url, isPartOf: { "@id": url + "#webpage" }, mainEntity: faqFromPage(html) },
      breadcrumb(url, "at.theboard"),
    ];
  },
  "business-groups-milton-keynes.html": (html) => {
    const url = SITE + "/business-groups-milton-keynes";
    const page = webPage(url, html, "2026-10-07");
    page.breadcrumb = { "@id": url + "#breadcrumb" };
    const names = [...html.matchAll(/<section class="opt"[^>]*>\s*<h2[^>]*>([\s\S]*?)<\/h2>/g)].map((m) => text(m[1]));
    must(names.length === 6 ? names : null, "six options on the comparison page");
    page.mainEntity = {
      "@type": "ItemList", "@id": url + "#options", name: "Business groups for owners in Milton Keynes",
      numberOfItems: names.length,
      itemListElement: names.map((name, i) => ({
        "@type": "ListItem", position: i + 1, name,
        ...(name === "at.theboard" ? { item: { "@id": entity.board.id } } : {}),
      })),
    };
    return [catalystOrg(), boardOrg(), website(), page, breadcrumb(url, "Business groups in Milton Keynes")];
  },
  "index.html": () => [catalystOrg(), person(), website()],
};
// The one-to-one and team programmes: the Catalyst Organization plus one
// Service per offer. A price goes in only where the page publishes one.
const SERVICES = {
  "leadstrong.html": [{
    slug: "leadstrong", name: "LeadStrong",
    description: "Six months of weekly Whiteboard Sessions for a corporate leader, around twenty-four sessions, on two or three outcomes agreed at the start. £7,200 for the whole engagement, which is £300 a session, with the option to stop at three months and pay £3,600.",
    price: 7200,
  }],
};
function service(url, s) {
  return {
    "@type": "Service", "@id": url + "#service" + (s.anchor ? "-" + s.anchor : ""), name: s.name,
    description: s.description, provider: { "@id": entity.catalyst.id }, url: s.anchor ? url + "#" + s.anchor : url,
    offers: s.price ? { "@type": "Offer", price: String(s.price), priceCurrency: "GBP", url } : null,
  };
}
for (const [file, list] of Object.entries(SERVICES)) {
  const url = SITE + "/" + list[0].slug;
  PAGES[file] = () => [catalystOrg(), ...list.map((s) => service(url, s))];
}
// TeamStrong: a short main page and one page for each kind of leadership
// team. The Day is priced from £3,500 plus VAT; the Six Months is agreed per
// team and never published, so only the Day carries an offer.
const TEAMSTRONG = {
  "teamstrong-one-team.html": {
    path: "/teamstrong/one-team", crumb: "For teams who work as one",
    audience: "Leadership teams of five to ten who run the business together",
  },
  "teamstrong-leaders.html": {
    path: "/teamstrong/leaders", crumb: "For leaders who each run their own area",
    audience: "Leadership teams of five to ten where each leader runs their own region, function or division",
  },
};
// Questions are read off the visible accordion, so the schema can never
// carry a question the page does not show.
function faqFromDetails(html, file) {
  const qs = [...section(html, "faq").matchAll(/<details>\s*<summary><h3>([\s\S]*?)<\/h3><\/summary>\s*<p>([\s\S]*?)<\/p>\s*<\/details>/g)];
  must(qs.length || null, "FAQ questions on " + file);
  return qs.map(([, q, a]) => ({
    "@type": "Question", name: text(q),
    acceptedAnswer: { "@type": "Answer", text: text(a) },
  }));
}
PAGES["teamstrong.html"] = (html) => {
  const url = SITE + "/teamstrong";
  const page = webPage(url, html, "2026-11-23");
  page.breadcrumb = { "@id": url + "#breadcrumb" };
  page.hasPart = Object.values(TEAMSTRONG).map((t) => ({ "@id": SITE + t.path + "#webpage" }));
  return [
    catalystOrg(), website(), page,
    {
      "@type": "Service", "@id": url + "#service", name: "TeamStrong",
      description: "For leadership teams of five to ten. One high impact day, or six months, at your venue or ours.",
      provider: { "@id": entity.catalyst.id }, url,
    },
    breadcrumb(url, "TeamStrong"),
  ];
};
for (const [file, t] of Object.entries(TEAMSTRONG)) {
  PAGES[file] = (html) => {
    const url = SITE + t.path;
    const page = webPage(url, html, "2026-11-23");
    page.breadcrumb = { "@id": url + "#breadcrumb" };
    page.isPartOf = [{ "@id": SITE + "/#website" }, { "@id": SITE + "/teamstrong#webpage" }];
    page.mainEntity = { "@id": url + "#the-day" };
    return [
      catalystOrg(), website(), page,
      {
        "@type": "Service", "@id": url + "#the-day", name: "TeamStrong: The Day",
        serviceType: "Leadership team development day",
        description: text(para(html, "day")),
        provider: { "@id": entity.catalyst.id }, url: url + "#the-day",
        isRelatedTo: { "@id": SITE + "/teamstrong#service" },
        audience: { "@type": "BusinessAudience", name: t.audience },
        offers: {
          "@type": "Offer", url: url + "#the-day", priceCurrency: "GBP", price: "3500",
          priceSpecification: {
            "@type": "PriceSpecification", minPrice: 3500, priceCurrency: "GBP", valueAddedTaxIncluded: false,
          },
        },
      },
      { "@type": "FAQPage", "@id": url + "#faq", url, isPartOf: { "@id": url + "#webpage" }, mainEntity: faqFromDetails(html, file) },
      {
        "@type": "BreadcrumbList", "@id": url + "#breadcrumb",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE + "/" },
          { "@type": "ListItem", position: 2, name: "TeamStrong", item: SITE + "/teamstrong" },
          { "@type": "ListItem", position: 3, name: t.crumb, item: url },
        ],
      },
    ];
  };
}

// LeadStrong for medical devices: two sister pages of /leadstrong, each for
// one reader. Same offer and price as LeadStrong; reached by direct link,
// not from the menus.
const MEDTECH = {
  "mdsvp.html": {
    path: "/mdsvp", crumb: "For vice presidents in medical devices",
    audience: "Vice presidents in medical device companies working towards general manager, regional leadership or the executive committee",
  },
  "mdsdir.html": {
    path: "/mdsdir", crumb: "For sales directors in medical devices",
    audience: "Sales directors in medical device companies working towards vice president",
  },
};
for (const [file, t] of Object.entries(MEDTECH)) {
  PAGES[file] = (html) => {
    const url = SITE + t.path;
    const page = webPage(url, html, "2026-11-23");
    page.breadcrumb = { "@id": url + "#breadcrumb" };
    page.mainEntity = { "@id": url + "#service" };
    return [
      catalystOrg(), website(), page,
      {
        "@type": "Service", "@id": url + "#service", name: "LeadStrong",
        serviceType: "One-to-one executive coaching",
        description: "Six months of weekly one-to-one coaching at the whiteboard, about 24 sessions, on two or three outcomes agreed at the start. £7,200 for six months, or £3,600 to stop at three months.",
        provider: { "@id": entity.catalyst.id }, url,
        isRelatedTo: { "@id": SITE + "/leadstrong#service" },
        audience: { "@type": "BusinessAudience", name: t.audience },
        offers: { "@type": "Offer", price: "7200", priceCurrency: "GBP", url: url + "#book" },
      },
      {
        "@type": "BreadcrumbList", "@id": url + "#breadcrumb",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE + "/" },
          { "@type": "ListItem", position: 2, name: "LeadStrong", item: SITE + "/leadstrong" },
          { "@type": "ListItem", position: 3, name: t.crumb, item: url },
        ],
      },
    ];
  };
}

// at.theboard one-to-one: one-to-one coaching for business owners, men and
// women. Served at /board/one-to-one from board-one-to-one.html (see _redirects).
PAGES["board-one-to-one.html"] = (html) => {
  const url = SITE + "/board/one-to-one";
  const page = webPage(url, html, "2026-11-24");
  page.breadcrumb = { "@id": url + "#breadcrumb" };
  page.mainEntity = { "@id": url + "#service" };
  return [
    catalystOrg(), boardOrg(), person(), website(), page,
    {
      "@type": "Service", "@id": url + "#service", name: "at.theboard one-to-one",
      serviceType: "One-to-one business coaching for owners",
      description: "Six months of fortnightly one-to-one coaching at the whiteboard for business owners, men and women, online or in person in Milton Keynes. Twelve sessions of 90 minutes. £600 a month, £3,600 for the six months, or £1,800 to stop at three months.",
      provider: { "@id": entity.board.id }, url,
      areaServed: [city, { "@type": "Country", name: "United Kingdom" }],
      audience: { "@type": "BusinessAudience", name: "Business owners, men and women, with 5 to 25 staff" },
      offers: {
        "@type": "Offer", price: "600", priceCurrency: "GBP", url: url + "#book",
        description: "£600 a month for six months (£3,600), or £1,800 if you stop at three months",
        priceSpecification: { "@type": "UnitPriceSpecification", price: 600, priceCurrency: "GBP", unitText: "MONTH" },
      },
    },
    { "@type": "FAQPage", "@id": url + "#faq", url, isPartOf: { "@id": url + "#webpage" }, mainEntity: faqFromPage(html) },
    {
      "@type": "BreadcrumbList", "@id": url + "#breadcrumb",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE + "/" },
        { "@type": "ListItem", position: 2, name: "at.theboard", item: SITE + "/board" },
        { "@type": "ListItem", position: 3, name: "One-to-one", item: url },
      ],
    },
  ];
};

// Every other public page carries the Catalyst Organization and nothing else.
const ORG_ONLY = [
  "about.html", "in-practice.html",
  "going-further.html", "contact.html", "growth-audit/index.html",
  "fluency/numbers/index.html", "fluency/ai/index.html",
];
for (const f of ORG_ONLY) PAGES[f] = () => [catalystOrg()];

for (const [file, graph] of Object.entries(PAGES)) {
  const html = read(file);
  if (!/<!-- entity-ld:start -->[\s\S]*?<!-- entity-ld:end -->/.test(html))
    throw new Error(`build.mjs: ${file} has no entity-ld markers`);
  const mirror = "site/" + file;
  if (existsSync(join(ROOT, mirror))) {
    const strip = (s) => s.replace(/<!-- entity-ld:start -->[\s\S]*?<!-- entity-ld:end -->/, "");
    if (strip(read(mirror)) !== strip(html))
      console.warn(`warning: ${mirror} differs from ${file}; the root copy wins`);
  }
  const out = html.replace(/<!-- entity-ld:start -->[\s\S]*?<!-- entity-ld:end -->/, ldBlock(graph(html)));
  writeBoth(file, out);
}

// ---------------------------------------------------------------- board.md

const board = read("board.html");
const boardReviewed = must(reviewed(board), "the review date on /board");
const longDate = (iso) =>
  new Date(iso + "T12:00:00Z").toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

function boardMarkdown() {
  const turnUp = section(board, "turn-up");
  const [main, format] = turnUp.split('<div class="more">');
  must(format, "the session format block on /board");
  const parts = [
    `<!-- canonical: ${SITE}/board -->`,
    "# " + text(must(board.match(/<h1[^>]*>([\s\S]*?)<\/h1>/), "h1")[1]),
    text(para(board, "opening")),
    toMarkdown(main.replace(/<p data-md="location"[\s\S]*?<\/p>/, "")),
    "## The session format\n\n" + toMarkdown('<div class="more">' + format.replace(/<p data-md="location"[\s\S]*?<\/p>/, "")),
    "## The rules of the circle\n\n" + toMarkdown(section(board, "rules")).replace(/^## .*\n\n/, ""),
    "## Who runs it\n\n" + toMarkdown(section(board, "who")).replace(/^## .*\n\n/, ""),
    toMarkdown(section(board, "faq")),
    "## Location\n\n" + text(para(board, "location")),
    "## How to join\n\n" + toMarkdown(section(board, "join")).replace(/^## .*\n\n/, "") +
      `\n\nBook a Whiteboard Session: ${SITE}/board#book`,
    `Page last reviewed ${longDate(boardReviewed)}`,
  ];
  if (entity.confirmed.menOnly) parts.splice(parts.length - 3, 0, "## Why is it men only?\n\n" + entity.confirmed.menOnly);
  // The cost question is now asked in the page's own FAQ; only add it here if it is not.
  if (entity.confirmed.price && !/How much does it cost\?/.test(section(board, "faq"))) parts.splice(parts.length - 3, 0, "## How much does it cost?\n\n" + entity.confirmed.price.text);
  return parts.join("\n\n") + "\n";
}
const boardMd = boardMarkdown();
writeBoth("board.md", undash(boardMd));

// ---------------------------------------------------------------- TeamStrong .md

// One plain Markdown copy per TeamStrong page, served at /teamstrong.md,
// /teamstrong/one-team.md and /teamstrong/leaders.md (see _redirects).
function pageMarkdown(file, path, cta = "Book a conversation") {
  const html = read(file);
  let body = must(html.match(/<main>([\s\S]*?)<\/main>/), "<main> on " + file)[1];
  // a whole-card link: keep the card's heading and text, then the link
  body = body.replace(/<a class="route-card" href="([^"]+)">([\s\S]*?)<span class="go">([\s\S]*?)<\/span>\s*<\/a>/g,
    (_, href, inner, go) => `${inner}<p><a href="${href}">${go}</a></p>`);
  return [
    `<!-- canonical: ${SITE}${path} -->`,
    toMarkdown(body),
    `${cta}: ${SITE}${path}#book`,
  ].join("\n\n") + "\n";
}
function writeMdAs([file, path, md], cta) {
  const out = undash(pageMarkdown(file, path, cta));
  writeBoth(md, out);
  return { path, out };
}
function writeMd([file, path, md]) {
  const out = undash(pageMarkdown(file, path, "Book a Whiteboard Session"));
  writeBoth(md, out);
  return { path, out };
}
const ONE_TO_ONE_MD = writeMdAs(["board-one-to-one.html", "/board/one-to-one", "board-one-to-one.md"], "Book a Whiteboard Session");
const MEDTECH_MD = [
  ["mdsvp.html", "/mdsvp", "mdsvp.md"],
  ["mdsdir.html", "/mdsdir", "mdsdir.md"],
].map(writeMd);
const TEAMSTRONG_MD = [
  ["teamstrong.html", "/teamstrong", "teamstrong.md"],
  ["teamstrong-one-team.html", "/teamstrong/one-team", "teamstrong-one-team.md"],
  ["teamstrong-leaders.html", "/teamstrong/leaders", "teamstrong-leaders.md"],
].map(([file, path, md]) => {
  const out = undash(pageMarkdown(file, path));
  writeBoth(md, out);
  return { path, out };
});

// ---------------------------------------------------------------- llms.txt

const facts = [
  "- Location: Milton Keynes, England. In-person sessions at the Shire Retreat; online between sessions.",
  "- at.theboard circle: five male owner-managers, twelve months, two sessions a month, every man on the whiteboard every month.",
  "- Founder: John Obidipe, Gallup-certified in CliftonStrengths, 15+ years in organisational consulting and executive coaching.",
  "- Way in: one free Whiteboard Session, open to anyone.",
];
facts.push("- LeadStrong for medical devices: one-to-one coaching at the whiteboard for vice presidents (/mdsvp) and sales directors (/mdsdir) in medical device companies. Six months, weekly, £7,200.");
facts.push("- TeamStrong: for leadership teams of five to ten. The Day is one high impact day from £3,500 plus VAT, priced on numbers. The Six Months is one session a month, one-to-ones included, price agreed with each team.");
if (entity.confirmed.menOnly) facts.push("- Why men only: " + entity.confirmed.menOnly);
if (entity.confirmed.price) facts.push("- Price: " + entity.confirmed.price.text);

const llms = `# Catalyst Growth Coaching and at.theboard

> Catalyst Growth Coaching is John Obidipe's executive coaching practice, based in Milton Keynes, UK. at.theboard is its men's business group: a circle of five owner-managers in Milton Keynes who meet at a whiteboard for twelve months.

A circle is the five men who meet together for the year.

## at.theboard, the men's business group in Milton Keynes

- [at.theboard](${SITE}/board): what the circle is, how it meets, the rules, who it is for, how to join
- [at.theboard, plain text](${SITE}/board.md): the same page as Markdown
- [at.theboard one-to-one](${SITE}/board/one-to-one): one-to-one coaching at the whiteboard for business owners, men and women. Six months, fortnightly, online or in Milton Keynes.
- [at.theboard one-to-one, plain text](${SITE}/board/one-to-one.md): the same page as Markdown

## TeamStrong, for leadership teams of five to ten

- [TeamStrong](${SITE}/teamstrong): one high impact day, or six months, at your venue or ours
- [For teams who work as one](${SITE}/teamstrong/one-team): leadership teams who run the business together
- [For leaders who each run their own area](${SITE}/teamstrong/leaders): leaders who each run a region, function or division
- Plain text: [TeamStrong](${SITE}/teamstrong.md), [teams who work as one](${SITE}/teamstrong/one-team.md), [leaders who each run their own area](${SITE}/teamstrong/leaders.md)

## Catalyst Growth Coaching

- [Home](${SITE}/): the practice and the free Whiteboard Session
- [LeadStrong](${SITE}/leadstrong): six months of weekly Whiteboard Sessions for a corporate leader
- LeadStrong for medical devices: one-to-one coaching at the whiteboard for vice presidents ([/mdsvp](${SITE}/mdsvp)) and sales directors ([/mdsdir](${SITE}/mdsdir)) in medical device companies. Six months, weekly, £7,200.
- Plain text: [for vice presidents](${SITE}/mdsvp.md), [for sales directors](${SITE}/mdsdir.md)
- [Leadership Hub](https://learn.catalystgrowthcoach.co.uk/): the Fluency Series in podcast, slides and infographic form

## Key facts

${facts.join("\n")}

## Optional

- [Instagram, at.theboard](https://www.instagram.com/at.theboard/)
`;
writeBoth("llms.txt", undash(llms));

const home = read("index.html");
const homeMd = toMarkdown(home.replace(/^[\s\S]*?<body[^>]*>/, ""));
const llmsFull = `# Catalyst Growth Coaching and at.theboard, full text

> The full text of ${SITE}/board, ${SITE}/, the at.theboard one-to-one page, the three TeamStrong pages and the two LeadStrong pages for medical devices, as Markdown. See ${SITE}/llms.txt for the short version.

${boardMd.replace(/^<!-- canonical:.*\n\n/, "")}
---

<!-- canonical: ${SITE}/ -->

# Catalyst Growth Coaching, home page

${homeMd}
${[ONE_TO_ONE_MD, ...TEAMSTRONG_MD, ...MEDTECH_MD].map((t) => "\n---\n\n" + t.out).join("")}`;
writeBoth("llms-full.txt", undash(llmsFull));

// ---------------------------------------------------------------- sitemap

let sitemap = read("sitemap.xml");
const lastmods = {};
for (const [file] of Object.entries(PAGES)) {
  const d = reviewed(read(file));
  if (!d) continue;
  const path = file === "index.html" ? "/" : "/" + file.replace(/\/index\.html$/, "").replace(/\.html$/, "");
  lastmods[SITE + path] = d;
}
sitemap = sitemap.replace(/<url><loc>([^<]+)<\/loc><lastmod>[^<]+<\/lastmod>/g, (m, loc) =>
  lastmods[loc] ? `<url><loc>${loc}</loc><lastmod>${lastmods[loc]}</lastmod>` : m);
writeBoth("sitemap.xml", sitemap);

// ---------------------------------------------------------------- feed.xml

// Pages that belong in the feed. Considered Leader issues or new Fluency
// pages go here when they are added to the site; noindex pages are skipped
// automatically until they are ready.
const FEED = ["board.html", "business-groups-milton-keynes.html", "fluency/numbers/index.html", "fluency/ai/index.html"];
const xml = (s) => undash(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const rfc822 = (iso) => new Date(iso + "T09:00:00Z").toUTCString().replace("GMT", "+0000");
const items = FEED.map((file) => {
  const html = read(file);
  if (noindex(html)) return null;
  const path = "/" + file.replace(/\/index\.html$/, "").replace(/\.html$/, "");
  const url = SITE + path;
  const date = reviewed(html) ?? (sitemap.match(new RegExp(`<loc>${url}</loc><lastmod>([^<]+)<`)) || [])[1];
  must(date, "a date for " + file + " (review line or sitemap lastmod)");
  return { url, date, title: title(html), description: meta(html, "description") ?? "" };
}).filter(Boolean).sort((a, b) => (a.date < b.date ? 1 : -1));

const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
<title>Catalyst Growth Coaching and at.theboard</title>
<link>${SITE}/</link>
<atom:link href="${SITE}/feed.xml" rel="self" type="application/rss+xml" />
<description>Updates to at.theboard, the men's business group in Milton Keynes, and to John Obidipe's Catalyst Growth Coaching pages.</description>
<language>en-gb</language>
<lastBuildDate>${rfc822(items[0].date)}</lastBuildDate>
${items.map((i) => `<item>
<title>${xml(i.title)}</title>
<link>${i.url}</link>
<guid isPermaLink="true">${i.url}</guid>
<pubDate>${rfc822(i.date)}</pubDate>
<description>${xml(i.description)}</description>
</item>`).join("\n")}
</channel>
</rss>
`;
writeBoth("feed.xml", feed);

// ---------------------------------------------------------------- listing checklist

const c = entity.catalyst, b = entity.board, f = entity.founder;
const missing = "[JOHN TO SUPPLY]";
write("data/listing-checklist.md", `# Listing checklist: paste this wording exactly

Generated from data/entity.json by scripts/build.mjs. Do not edit by hand;
change data/entity.json and run \`node scripts/build.mjs\`.

Use the same words everywhere: Google Business Profile, Collaborate MK,
Business MK, LinkedIn and Instagram. AI search tools treat a business as one
thing only when every listing agrees.

## at.theboard

- Name: ${b.name}
- Website: ${b.url}
- Short description: A men's business group in Milton Keynes. Five owner-managers, twelve months, one whiteboard.
- Full description: ${b.description}
- Location: ${b.address} (in person at ${b.venue}, online between sessions)
- Area served: ${b.areaServed} and the surrounding area
- Email: ${b.email}
- Phone: ${b.telephone ?? missing}
- Run by: ${f.name}, ${f.jobTitle}
- Instagram: ${b.sameAs[0]}
- LinkedIn page: ${b.linkedin ?? missing}
- Google Business Profile: ${b.googleBusinessProfile ?? missing}
- Bio line for Instagram and LinkedIn: Men's business group in Milton Keynes. Five owner-managers, twelve months. ${b.url}

## Catalyst Growth Coaching

- Name: ${c.name}
- Website: ${c.url}
- Description: ${c.description}
- Location: ${c.address}
- Email: ${c.email}
- Phone: ${c.telephone ?? missing}
- Founder: ${f.name}
- LinkedIn: ${f.sameAs[0]}
`);

if (CHECK && stale.length) {
  console.error("Out of date, run `node scripts/build.mjs`:\n  " + stale.join("\n  "));
  process.exit(1);
}
