import bcrypt from "bcryptjs";
import crypto from "crypto";
import { cookies } from "next/headers";
import { getSetting, setSetting } from "./repos";

const SESSION_COOKIE = "regen_admin_session";
const SESSION_DURATION = 60 * 60 * 24 * 30; // 30 days

function getSecret(): string {
  const s = process.env.SESSION_SECRET;
  if (!s) throw new Error("SESSION_SECRET is not set");
  return s;
}

function getPasswordHash(): string {
  // 1) Prefer the hash stored in the settings table (so user can change it)
  const stored = getSetting("admin_password_hash");
  if (stored) return stored;
  // 2) Fallback to env var (for first-time setup)
  const h = process.env.ADMIN_PASSWORD_HASH;
  if (!h) throw new Error("Admin password is not configured");
  return h;
}

export function setNewPassword(newPassword: string) {
  const hash = bcrypt.hashSync(newPassword, 10);
  setSetting("admin_password_hash", hash);
}

function sign(payload: string): string {
  return crypto.createHmac("sha256", getSecret()).update(payload).digest("hex");
}

export function verifyPassword(password: string): boolean {
  return bcrypt.compareSync(password, getPasswordHash());
}

export async function setSessionCookie() {
  const exp = Math.floor(Date.now() / 1000) + SESSION_DURATION;
  const payload = `admin:${exp}`;
  const sig = sign(payload);
  const value = `${payload}:${sig}`;
  const c = await cookies();
  c.set(SESSION_COOKIE, value, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_DURATION,
  });
}

export async function clearSessionCookie() {
  const c = await cookies();
  c.delete(SESSION_COOKIE);
}

export function isValidSessionToken(token: string | undefined): boolean {
  if (!token) return false;
  const parts = token.split(":");
  if (parts.length !== 3) return false;
  const [role, expStr, sig] = parts;
  if (role !== "admin") return false;
  const exp = Number.parseInt(expStr, 10);
  if (!Number.isFinite(exp) || exp < Math.floor(Date.now() / 1000)) return false;
  const expected = sign(`${role}:${exp}`);
  // Constant-time compare
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

export async function isAuthenticated(): Promise<boolean> {
  const c = await cookies();
  const token = c.get(SESSION_COOKIE)?.value;
  return isValidSessionToken(token);
}

export const SESSION_COOKIE_NAME = SESSION_COOKIE;