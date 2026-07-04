import fs from "fs";

const BASE_URL = "https://www.fxpayout.com";

const languages = [
  "",
  "id",
  "jp",
  "zh-CN",
  "th",
  "vi",
  "pt",
  "es",
  "ar",
  "ko",
];

const pages = [
  { path: "", priority: "1.0" },
  { path: "broker", priority: "0.9" },
  { path: "forex", priority: "0.9" },
  { path: "vip-rebate", priority: "0.9" },
  { path: "affiliate", priority: "0.9" },
  { path: "transfer", priority: "0.8" },
  { path: "rebate-forex", priority: "0.7" },
  { path: "news", priority: "0.7" },
  { path: "calculator", priority: "0.6" },
];

function buildUrl(lang, page) {
  const parts = [];

  if (lang) parts.push(lang);
  if (page.path) parts.push(page.path);

  return `${BASE_URL}/${parts.join("/")}`.replace(/\/$/, "");
}

let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n`;
xml += `xmlns:xhtml="http://www.w3.org/1999/xhtml">\n`;

for (const page of pages) {
  for (const lang of languages) {
    xml += `<url>\n`;

    xml += `  <loc>${buildUrl(lang, page)}</loc>\n`;

    for (const alt of languages) {
      xml += `  <xhtml:link rel="alternate" hreflang="${alt || "en"}" href="${buildUrl(
        alt,
        page
      )}" />\n`;
    }

    xml += `  <xhtml:link rel="alternate" hreflang="x-default" href="${buildUrl(
      "",
      page
    )}" />\n`;

    xml += `  <priority>${page.priority}</priority>\n`;

    xml += `</url>\n`;
  }
}

xml += `</urlset>`;

fs.writeFileSync("./public/sitemap.xml", xml);

console.log("Sitemap generated!");