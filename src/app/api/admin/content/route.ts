import { type NextRequest, NextResponse } from "next/server";
import { listContentBlocks, setBlock, resetBlock } from "@/lib/repos";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    return NextResponse.json({ ok: true, blocks: listContentBlocks() });
  } catch (e: any) {
    return NextResponse.json(
      { error: e?.message || "Server error" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (body.action === "reset" && typeof body.key === "string") {
      resetBlock(body.key);
      return NextResponse.json({ ok: true });
    }
    if (
      typeof body.key !== "string" ||
      typeof body.value !== "string"
    ) {
      return NextResponse.json(
        { error: "key and value are required strings" },
        { status: 400 }
      );
    }
    setBlock({ key: body.key, value: body.value });
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json(
      { error: e?.message || "Server error" },
      { status: 500 }
    );
  }
}