/**
 * Persistent store for newsletter subscribers, contact inquiries, and
 * affiliate click events. Backed by SQLite (via repos.ts).
 */
import {
  logClick as repoLogClick,
  addNewsletterSignup,
  addContactMessage,
  listNewsletterSignups,
  listContactMessages,
  totalClicks,
} from "./repos";

export function logClick(input: {
  productSlug: string;
  source?: string;
  referer?: string;
  userAgent?: string;
  ip?: string;
}) {
  repoLogClick(input);
}

export function addSubscriber(input: { email: string; source?: string }) {
  const email = input.email.trim().toLowerCase();
  addNewsletterSignup(email);
  return { email, source: input.source, createdAt: new Date().toISOString() };
}

export function addInquiry(input: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  addContactMessage(input);
  return { ...input, id: "saved", createdAt: new Date().toISOString() };
}

export function getStats() {
  return {
    clicks: totalClicks(365),
    subscribers: listNewsletterSignups().length,
    inquiries: listContactMessages().length,
  };
}
