// Parses the two source CSVs (Videos.csv = horizontal, Shorts.csv = vertical)
// into src/portfolioVideos.json. Every clip is tagged with one of three
// chapters — Expeditions / Automotive / Industrial — used to filter the
// portfolio. The chapter assignment here is round-robin; edit the JSON to put
// each real clip in its true chapter.
//
// Re-run with:  node scripts/build-portfolio-data.mjs
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, "..");
const DESKTOP = "C:/Users/RENTKAR/Desktop";

const extractId = (url) => {
  const u = url.trim();
  let m = u.match(/youtu\.be\/([^?&/]+)/);
  if (m) return m[1];
  m = u.match(/shorts\/([^?&/]+)/);
  if (m) return m[1];
  m = u.match(/[?&]v=([^?&]+)/);
  if (m) return m[1];
  return null;
};

const lines = (csv) =>
  csv
    .split(/\r?\n/)
    .map((s) => s.trim())
    .filter(Boolean);

const videoLines = lines(readFileSync(`${DESKTOP}/Videos.csv`, "utf8")).slice(1);
const shortLines = lines(readFileSync(`${DESKTOP}/Shorts.csv`, "utf8")).slice(1);

// The three portfolio chapters.
const CHAPTERS = [
  { slug: "expeditions", label: "Expeditions" },
  { slug: "automotive", label: "Automotive" },
  { slug: "industrial", label: "Industrial" },
];

const CHAPTER_DESC = {
  expeditions:
    "Shot on location in unforgiving terrain — real conditions, real stories, earned one frame at a time.",
  automotive:
    "Rolling shots, motion-control rigs and studio precision that make machines feel alive.",
  industrial:
    "Plants, people and processes captured with clarity for brands at work.",
};

const pad = (n) => String(n).padStart(2, "0");

const build = (urls, kind) =>
  urls
    .map((url, i) => {
      const youtubeId = extractId(url);
      if (!youtubeId) return null;
      const chapter = CHAPTERS[i % CHAPTERS.length];
      const n = pad(i + 1);
      return {
        id: `${kind}-${n}`,
        youtubeId,
        title: kind === "video" ? `Film No. ${n}` : `Reel No. ${n}`,
        category: chapter.label,
        categorySlug: chapter.slug,
        description: CHAPTER_DESC[chapter.slug],
      };
    })
    .filter(Boolean);

const videos = build(videoLines, "video");
const shorts = build(shortLines, "short");

const out = { chapters: CHAPTERS, videos, shorts };
writeFileSync(
  join(projectRoot, "src", "portfolioVideos.json"),
  JSON.stringify(out, null, 2) + "\n",
  "utf8"
);

console.log(
  `Wrote src/portfolioVideos.json — ${videos.length} videos, ${shorts.length} shorts.`
);
