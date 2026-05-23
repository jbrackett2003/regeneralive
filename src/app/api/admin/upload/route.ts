import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";
import crypto from "crypto";

export const runtime = "nodejs";

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");

function ensureDir() {
  if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

const MAX_BYTES = 8 * 1024 * 1024; // 8MB
const ALLOWED_EXT = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif", ".svg"]);

export async function POST(req: NextRequest) {
  try {
    ensureDir();
    const fd = await req.formData();
    const file = fd.get("file") as File | null;
    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }
    if (file.size > MAX_BYTES) {
      return NextResponse.json({ error: "File too large (max 8MB)" }, { status: 400 });
    }
    const ext = path.extname(file.name).toLowerCase() || ".jpg";
    if (!ALLOWED_EXT.has(ext)) {
      return NextResponse.json(
        { error: "Unsupported file type" },
        { status: 400 }
      );
    }
    const buf = Buffer.from(await file.arrayBuffer());
    const hash = crypto.createHash("sha1").update(buf).digest("hex").slice(0, 12);
    const safeName = `${Date.now().toString(36)}-${hash}${ext}`;
    const filePath = path.join(UPLOAD_DIR, safeName);
    fs.writeFileSync(filePath, buf);
    return NextResponse.json({
      ok: true,
      url: `/uploads/${safeName}`,
    });
  } catch (e: any) {
    return NextResponse.json(
      { error: e?.message || "Upload failed" },
      { status: 500 }
    );
  }
}