/**
 * Apply v4 Thorne dedup migration to LOCAL data-store/regeneralive.db so the
 * dev server reflects the new state. Production runs the same logic via
 * `migrateApplyProductImages` on Railway boot.
 */
const fs = require("fs");
const path = require("path");
const db = require("better-sqlite3")(
  path.join(__dirname, "..", "data-store", "regeneralive.db")
);

const manifest = JSON.parse(
  fs.readFileSync(path.join(__dirname, "thorne-batch", "manifest_final.json"))
);
const overrides = Object.fromEntries(
  manifest.map((e) => [e.slug, `/products/${e.slug}.png`])
);
// Also re-point the 4 entries in the existing override map that flipped to .png
const REPOINT_PNG = [
  "thorne-basic-prenatal",
  "thorne-calcium-magnesium-citrate",
  "thorne-prenatal-postnatal-dha",
  "thorne-vitamin-d-5000",
];
for (const s of REPOINT_PNG) overrides[s] = `/products/${s}.png`;

const HIDE = [
  "thorne-d-5-000-vitamin-d-capsule",
  "thorne-women-s-daily-probiotic",
  "thorne-magnesium-citramate-powder",
  "thorne-bio-quench",
  "thorne-beauty-powder",
  "thorne-bone-protect",
  "thorne-cats-claw",
  "thorne-dhea-25",
  "thorne-holy-basil",
  "thorne-pregnenolone",
  "thorne-memoractiv",
  "thorne-neuromag",
  "thorne-biological-age-test",
  "thorne-gut-health-test",
  "thorne-sleep-test",
  "thorne-stress-test",
  "thorne-vitamin-d-test",
];

const upd = db.prepare("UPDATE products SET image_url = ? WHERE slug = ?");
const hide = db.prepare("UPDATE products SET is_hidden = 1 WHERE slug = ?");
let a = 0, h = 0;
for (const [slug, img] of Object.entries(overrides)) {
  if (upd.run(img, slug).changes > 0) a++;
}
for (const slug of HIDE) {
  if (hide.run(slug).changes > 0) h++;
}
console.log(`Applied ${a} image overrides; hid ${h} slugs.`);

// Verify
const dups = db
  .prepare(
    "SELECT image_url, COUNT(*) c FROM products WHERE slug LIKE 'thorne-%' AND is_hidden = 0 GROUP BY image_url HAVING c > 1 ORDER BY c DESC"
  )
  .all();
console.log(`\nRemaining duplicate Thorne image_urls (visible only): ${dups.length}`);
dups.forEach((r) => console.log(` ${r.c} × ${r.image_url}`));

const visible = db.prepare("SELECT COUNT(*) c FROM products WHERE slug LIKE 'thorne-%' AND is_hidden = 0").get();
const hiddenCount = db.prepare("SELECT COUNT(*) c FROM products WHERE slug LIKE 'thorne-%' AND is_hidden = 1").get();
console.log(`\nThorne products: ${visible.c} visible, ${hiddenCount.c} hidden`);