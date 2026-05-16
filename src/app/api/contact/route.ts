import { NextRequest, NextResponse } from "next/server";
import { addInquiry } from "@/lib/store";

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const name = String(body?.name || "").trim();
    const email = String(body?.email || "").trim();
    const subject = String(body?.subject || "general").trim();
    const message = String(body?.message || "").trim();

    if (!name || name.length < 2) {
      return NextResponse.json(
        { ok: false, error: "Tell us your name." },
        { status: 400 }
      );
    }
    if (!emailRe.test(email)) {
      return NextResponse.json(
        { ok: false, error: "Please enter a valid email." },
        { status: 400 }
      );
    }
    if (!message || message.length < 10) {
      return NextResponse.json(
        { ok: false, error: "Please add a message (10+ characters)." },
        { status: 400 }
      );
    }

    addInquiry({ name, email, subject, message });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Bad request." },
      { status: 400 }
    );
  }
}