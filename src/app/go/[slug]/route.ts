import { NextRequest, NextResponse } from "next/server";
import { getProductBySlug } from "@/data/products";
import { logClick } from "@/lib/store";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return NextResponse.redirect(new URL("/shop", req.url), { status: 302 });
  }

  // Best-effort log; never block redirect on logging failure.
  try {
    const url = new URL(req.url);
    logClick({
      productSlug: slug,
      source: url.searchParams.get("src") || undefined,
      referer: req.headers.get("referer") || undefined,
      userAgent: req.headers.get("user-agent") || undefined,
    });
  } catch (e) {
    console.error("Click log failed", e);
  }

  return NextResponse.redirect(product.affiliateUrl, { status: 302 });
}