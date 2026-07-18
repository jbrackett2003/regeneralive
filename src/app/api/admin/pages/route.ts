import { type NextRequest, NextResponse } from "next/server";
import { listMarkdownPages, upsertMarkdownPage } from "@/lib/repos";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({ ok: true, pages: listMarkdownPages() });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (
      typeof body.slug !== "string" ||
      typeof body.title !== "string" ||
      typeof body.body !== "string"
    ) {
      return NextResponse.json(
        { error: "slug, title, body required" },
        { status: 400 }
      );
    }
    upsertMarkdownPage({
      slug: body.slug,
      title: body.title,
      body: body.body,
      metaDescription: body.metaDescription ?? null,
    });
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json(
      { error: e?.message || "Server error" },
      { status: 500 }
    );
  }
}