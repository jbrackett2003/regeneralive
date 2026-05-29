import path from "path";
import fs from "fs";

/**
 * Resolves the persistent data directory.
 *
 * - In development: defaults to ./data-store inside the repo
 * - In production (Railway): the DATA_DIR env var points to a mounted volume
 *   so the SQLite DB and uploaded images survive deploys/restarts.
 */
export const DATA_DIR =
  process.env.DATA_DIR || path.join(process.cwd(), "data-store");

export const UPLOAD_DIR = path.join(DATA_DIR, "uploads");

export function ensureDataDirs() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}