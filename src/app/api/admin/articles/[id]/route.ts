import { NextRequest, NextResponse } from "next/server";
import { getArticleById, updateArticle, deleteArticle } from "@/lib/repos";

export const runtime = "nodejs";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await req.json().catch(() => ({}));
  const action = body.action;

  const cur = getArticleById(id);
  if (!cur) return NextResponse.json({ error: "Article not found" }, { status: 404 });

  try {
    if (action === "hide") {
      updateArticle(id, { isHidden: true });
      return NextResponse.json({ ok: true });
    }
    if (action === "show") {
      updateArticle(id, { isHidden: false });
      return NextResponse.json({ ok: true });
    }
    if (action === "delete") {
      deleteArticle(id);
      return NextResponse.json({ ok: true });
    }
    if (action === "update") {
      updateArticle(id, body.input);
      return NextResponse.json({ ok: true });
    }
    return NextResponse.json({ error: "Unknown action" }, { status: 400 });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Server error" }, { status: 500 });
  }
}