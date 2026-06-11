import { type NextRequest, NextResponse } from "next/server";
import { updatePromotion, deletePromotion } from "@/lib/repos";

export const runtime = "nodejs";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await req.json().catch(() => ({}));
  const action = body.action;

  try {
    if (action === "activate") {
      updatePromotion(id, { isActive: true });
      return NextResponse.json({ ok: true });
    }
    if (action === "deactivate") {
      updatePromotion(id, { isActive: false });
      return NextResponse.json({ ok: true });
    }
    if (action === "delete") {
      deletePromotion(id);
      return NextResponse.json({ ok: true });
    }
    if (action === "update") {
      updatePromotion(id, body.input);
      return NextResponse.json({ ok: true });
    }
    return NextResponse.json({ error: "Unknown action" }, { status: 400 });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Server error" }, { status: 500 });
  }
}