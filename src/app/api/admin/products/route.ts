import { type NextRequest, NextResponse } from "next/server";
import { createProduct } from "@/lib/repos";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const id = createProduct(body);
    return NextResponse.json({ ok: true, id });
  } catch (e: any) {
    return NextResponse.json(
      { error: e?.message || "Server error" },
      { status: 500 }
    );
  }
}