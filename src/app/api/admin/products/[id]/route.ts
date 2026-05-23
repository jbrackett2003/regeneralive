import { NextRequest, NextResponse } from "next/server";
import {
  getProductById,
  updateProduct,
  deleteProduct,
  createProduct,
} from "@/lib/repos";

export const runtime = "nodejs";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await req.json().catch(() => ({}));
  const action = body.action;

  const cur = getProductById(id);
  if (!cur) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  try {
    if (action === "hide") {
      updateProduct(id, { isHidden: true });
      return NextResponse.json({ ok: true });
    }
    if (action === "show") {
      updateProduct(id, { isHidden: false });
      return NextResponse.json({ ok: true });
    }
    if (action === "delete") {
      deleteProduct(id);
      return NextResponse.json({ ok: true });
    }
    if (action === "duplicate") {
      const newSlug = `${cur.slug}-copy-${Date.now().toString(36).slice(-4)}`;
      const newId = createProduct({
        ...cur,
        slug: newSlug,
        name: `${cur.name} (Copy)`,
        isEditorPick: false,
        isFeatured: false,
        isHidden: true,
      });
      return NextResponse.json({ ok: true, id: newId });
    }
    if (action === "update") {
      updateProduct(id, body.input);
      return NextResponse.json({ ok: true });
    }
    return NextResponse.json({ error: "Unknown action" }, { status: 400 });
  } catch (e: any) {
    return NextResponse.json(
      { error: e?.message || "Server error" },
      { status: 500 }
    );
  }
}