// Dependency-free repository checks used by CI (and runnable locally: `node tools/check-content.mjs`).
// Errors fail the build. Warnings are reported but do not fail it.
import fs from "node:fs";
import path from "node:path";
import {execSync} from "node:child_process";
import {fileURLToPath} from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const app = path.join(root, "app");
const errors = [];
const warnings = [];
const err = (m) => errors.push(m);
const warn = (m) => warnings.push(m);
const rel = (p) => path.relative(root, p);
const SKIP = new Set([".git", "node_modules", "extracted", "_private"]);

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, {withFileTypes: true})) {
    if (SKIP.has(e.name)) continue;
    const p = path.join(dir, e.name);
    e.isDirectory() ? walk(p, out) : out.push(p);
  }
  return out;
}
const all = walk(root);
const readJSON = (p) => {
  try {
    return JSON.parse(fs.readFileSync(p, "utf8"));
  } catch (e) {
    err(`${rel(p)}: invalid JSON (${e.message})`);
    return null;
  }
};

// 1. Every JSON file parses
for (const f of all.filter((f) => f.endsWith(".json"))) readJSON(f);

// 2. Locales: shape, unknown keys, placeholders, missing translations (warning)
const en = readJSON(path.join(app, "locales/en.json"))?.strings ?? {};
const index = readJSON(path.join(app, "locales/index.json"));
const ph = (s) =>
  [...String(s).matchAll(/\{(\w+)\}/g)]
    .map((m) => m[1])
    .sort()
    .join(",");
const langCodes = (index?.languages ?? []).map((l) => l.code);
for (const code of langCodes) {
  const f = path.join(app, "locales", `${code}.json`);
  if (!fs.existsSync(f)) {
    err(`locales/${code}.json listed in index.json but missing`);
    continue;
  }
  const doc = readJSON(f);
  if (!doc) continue;
  if (!doc._meta?.code || !doc.strings) {
    err(`locales/${code}.json: needs _meta and strings`);
    continue;
  }
  if (code === "en") continue;
  for (const k of Object.keys(doc.strings))
    if (!(k in en))
      err(`locales/${code}.json: key "${k}" does not exist in en.json`);
  for (const [k, v] of Object.entries(doc.strings))
    if (k in en && ph(v) !== ph(en[k]))
      err(`locales/${code}.json: "${k}" must keep placeholders {${ph(en[k])}}`);
  const missing = Object.keys(en).filter((k) => !(k in doc.strings));
  if (missing.length)
    warn(
      `locales/${code}.json: ${missing.length} key(s) fall back to English (${missing.slice(0, 4).join(", ")}${missing.length > 4 ? ", ..." : ""})`,
    );
  if (doc._meta.review_status !== "reviewed")
    warn(
      `locales/${code}.json: review_status is "${doc._meta.review_status}" (not clinically/linguistically reviewed)`,
    );
}

// 3. Learning cards: every card has its strings and a source
const learn = readJSON(path.join(app, "data/learn.json"));
(learn?.cards ?? []).forEach((c, i) => {
  if (!c.source) err(`learn.json card ${i + 1}: missing source`);
  for (const k of [`card${i + 1}_title`, `card${i + 1}_text`])
    if (!(k in en)) err(`en.json: missing ${k} for learn card ${i + 1}`);
});

// 4. Hydration rules
const rules = readJSON(path.join(app, "data/hydration-rules.json"));
if (rules) {
  if (rules.clinically_validated !== true)
    warn(
      "hydration-rules.json: clinically_validated is false (sample thresholds). Block any release until a clinician signs off",
    );
  if (
    !(
      rules.alert?.temp_min > rules.attention?.temp_min &&
      rules.alert?.pulse_min > rules.attention?.pulse_min
    )
  )
    err(
      "hydration-rules.json: alert thresholds must be above attention thresholds",
    );
}

// 5. Videos: licence, author, source and credit; tracks: licence and file
const attribution = fs.existsSync(path.join(root, "legal/ATTRIBUTION.md"))
  ? fs.readFileSync(path.join(root, "legal/ATTRIBUTION.md"), "utf8")
  : "";
const videos = readJSON(path.join(app, "data/videos.json"));
for (const v of videos?.videos ?? []) {
  for (const k of [
    "id",
    "title",
    "category",
    "license",
    "author",
    "source_url",
    "language",
  ])
    if (!v[k]) err(`videos.json ${v.id ?? "?"}: missing "${k}"`);
  if (!videos.categories.includes(v.category))
    err(`videos.json ${v.id}: unknown category "${v.category}"`);
  if (v.src && !fs.existsSync(path.join(app, v.src)))
    err(`videos.json ${v.id}: src file ${v.src} not found`);
  if (v.source_url && !attribution.includes(v.source_url))
    err(`videos.json ${v.id}: not credited in legal/ATTRIBUTION.md`);
}
const tracks = readJSON(path.join(app, "data/tracks.json"));
for (const t of tracks?.tracks ?? []) {
  for (const k of ["id", "file", "title", "category", "license", "source_url"])
    if (!t[k]) err(`tracks.json ${t.id ?? "?"}: missing "${k}"`);
  if (["unlicensed", "needs-permission"].includes(t.licence_status))
    err(
      `tracks.json ${t.id}: licence_status "${t.licence_status}" cannot ship in an open release`,
    );
  if (t.file && !fs.existsSync(path.join(app, t.file)))
    err(`tracks.json ${t.id}: file ${t.file} not found`);
}

// 6. Policy: no audio or video files in the repository
let tracked = [];
try {
  tracked = execSync("git ls-files", {cwd: root, encoding: "utf8"})
    .split("\n")
    .filter(Boolean);
} catch {
  tracked = all.map(rel);
}
for (const f of tracked)
  if (/\.(mp3|m4a|wav|aiff|aac|flac|ogg|mp4|mov|webm|mkv|avi)$/i.test(f))
    err(
      `${f}: audio/video files must not be committed (see QA_PROCESS.md section 6)`,
    );

// 7. Required licence and legal files
for (const f of [
  "LICENSE.md",
  "NOTICE",
  "TRADEMARKS.md",
  "legal/ATTRIBUTION.md",
  "LICENSES/Apache-2.0.txt",
  "LICENSES/CC-BY-SA-4.0.txt",
])
  if (!fs.existsSync(path.join(root, f))) err(`${f} is missing`);

// 8. Service worker: precache list matches the app
const sw = fs.readFileSync(path.join(app, "sw.js"), "utf8");
const shellBlock = sw.match(/const SHELL = \[([\s\S]*?)\];/)?.[1] ?? "";
const shell = [...shellBlock.split("...[")[0].matchAll(/'([^']+)'/g)]
  .map((m) => m[1])
  .filter((p) => p !== "./");
for (const p of shell)
  if (!fs.existsSync(path.join(app, p)))
    err(`sw.js SHELL lists ${p} but the file does not exist`);
const spread = shellBlock.match(/\[((?:'[a-z]+',?\s*)+)\]\.map/)?.[1];
if (spread) {
  const codes = [...spread.matchAll(/'([a-z]+)'/g)].map((m) => m[1]);
  if (codes.sort().join() !== [...langCodes].sort().join())
    err(
      `sw.js language list (${codes}) differs from locales/index.json (${langCodes})`,
    );
}
const shouldCache = all
  .map(rel)
  .filter((f) => /^app\/(js\/.*\.js|css\/.*\.css|data\/.*\.json)$/.test(f))
  .map((f) => f.slice(4));
for (const f of shouldCache)
  if (!shell.includes(f)) warn(`sw.js SHELL does not precache ${f}`);

// 9. Markdown: relative links resolve
for (const f of all.filter(
  (f) => f.endsWith(".md") && !rel(f).startsWith("research/evidence-other"),
)) {
  const text = fs.readFileSync(f, "utf8").replace(/```[\s\S]*?```/g, "");
  for (const m of text.matchAll(/\]\((?!https?:|mailto:|#)([^)\s#]+)/g)) {
    const target = path.resolve(path.dirname(f), decodeURIComponent(m[1]));
    if (!fs.existsSync(target)) err(`${rel(f)}: broken relative link ${m[1]}`);
  }
}

// 10. Basic secret scan
const secrets = [
  /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/,
  /AKIA[0-9A-Z]{16}/,
  /ghp_[A-Za-z0-9]{36}/,
  /github_pat_[A-Za-z0-9_]{50,}/,
  /xox[baprs]-[A-Za-z0-9-]{10,}/,
  /AIza[0-9A-Za-z_-]{35}/,
];
for (const f of all) {
  if (
    /\.(png|jpg|jpeg|gif|webp|ico|pdf|zip|mp3|mp4|woff2?)$/i.test(f) ||
    fs.statSync(f).size > 2_000_000
  )
    continue;
  const text = fs.readFileSync(f, "utf8");
  for (const re of secrets)
    if (re.test(text))
      err(`${rel(f)}: looks like a secret (${re.source.slice(0, 24)}...)`);
}

for (const w of warnings) console.log(`::warning::${w}`);
for (const e of errors) console.log(`::error::${e}`);
console.log(
  `\nchecked ${all.length} files: ${errors.length} error(s), ${warnings.length} warning(s)`,
);
process.exit(errors.length ? 1 : 0);
