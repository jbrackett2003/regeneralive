import { NextRequest, NextResponse } from "next/server";

// We use Edge-compatible HMAC verification here (no bcrypt or sqlite at the edge).
// This is a thin gate; the actual login uses bcrypt in a Node route handler.

const SESSION_COOKIE = "regen_admin_session";

async function hmac(secret: string, payload: string): Promise<string> {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(payload));
  const bytes = new Uint8Array(sig);
  let hex = "";
  for (let i = 0; i < bytes.length; i++) {
    hex += bytes[i].toString(16).padStart(2, "0");
  }
  return hex;
}

async function isValid(token: string | undefined, secret: string): Promise<boolean> {
  if (!token) return false;
  const parts = token.split(":");
  if (parts.length !== 3) return false;
  const [role, expStr, sig] = parts;
  if (role !== "admin") return false;
  const exp = parseInt(expStr, 10);
  if (!Number.isFinite(exp) || exp < Math.floor(Date.now() / 1000)) return false;
  const expected = await hmac(secret, `${role}:${exp}`);
  if (sig.length !== expected.length) return false;
  // Constant-time compare in JS:
  let r = 0;
  for (let i = 0; i < sig.length; i++) r |= sig.charCodeAt(i) ^ expected.charCodeAt(i);
  return r === 0;
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // --- Canonical host: redirect apex regeneralive.com -> www.regeneralive.com ---
  // This fires only when traffic actually reaches Railway (i.e., DNS for the
  // apex points at us). Until then, Squarespace serves a parking page on its
  // own infra; this redirect is a safety net for once DNS is moved.
  const host = req.headers.get("host")?.toLowerCase() ?? "";
  if (host === "regeneralive.com") {
    const url = new URL(req.url);
    url.protocol = "https:";
    url.hostname = "www.regeneralive.com";
    url.port = "";
    return NextResponse.redirect(url, 308);
  }

  // Always inject pathname header so server components can detect /admin
  const reqHeaders = new Headers(req.headers);
  reqHeaders.set("x-pathname", pathname);

  // Only guard /admin and /admin/* (but allow /admin/login itself)
  if (!pathname.startsWith("/admin")) {
    return NextResponse.next({ request: { headers: reqHeaders } });
  }
  if (pathname === "/admin/login") {
    return NextResponse.next({ request: { headers: reqHeaders } });
  }

  const secret = process.env.SESSION_SECRET;
  if (!secret) {
    return NextResponse.redirect(new URL("/admin/login?err=config", req.url));
  }
  const token = req.cookies.get(SESSION_COOKIE)?.value;
  const ok = await isValid(token, secret);
  if (!ok) {
    const url = new URL("/admin/login", req.url);
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }
  return NextResponse.next({ request: { headers: reqHeaders } });
}

export const config = {
  // Run on everything except static assets so we can set x-pathname globally
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|gif|webp|svg|ico|css|js|woff|woff2)).*)"],
};