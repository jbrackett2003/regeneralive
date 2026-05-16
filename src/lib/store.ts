/**
 * In-memory store for newsletter subscribers, contact inquiries, and
 * affiliate click events. In a production deployment this would be swapped
 * for a database. For the demo, an in-memory store is sufficient and lets
 * every endpoint return realistic responses.
 */

export interface ClickEvent {
  id: string;
  productSlug: string;
  source?: string;
  referer?: string;
  userAgent?: string;
  createdAt: string;
}

export interface Subscriber {
  email: string;
  source?: string;
  createdAt: string;
}

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
}

declare global {
  // eslint-disable-next-line no-var
  var __regeneralive_store:
    | {
        clicks: ClickEvent[];
        subscribers: Map<string, Subscriber>;
        inquiries: Inquiry[];
      }
    | undefined;
}

const store =
  globalThis.__regeneralive_store ??
  (globalThis.__regeneralive_store = {
    clicks: [],
    subscribers: new Map(),
    inquiries: [],
  });

function id() {
  return Math.random().toString(36).slice(2, 10);
}

export function logClick(input: {
  productSlug: string;
  source?: string;
  referer?: string;
  userAgent?: string;
}) {
  const e: ClickEvent = {
    id: id(),
    createdAt: new Date().toISOString(),
    ...input,
  };
  store.clicks.unshift(e);
  if (store.clicks.length > 5000) store.clicks.length = 5000;
  return e;
}

export function addSubscriber(input: { email: string; source?: string }) {
  const email = input.email.trim().toLowerCase();
  if (!store.subscribers.has(email)) {
    store.subscribers.set(email, {
      email,
      source: input.source,
      createdAt: new Date().toISOString(),
    });
  }
  return store.subscribers.get(email)!;
}

export function addInquiry(input: Omit<Inquiry, "id" | "createdAt">) {
  const i: Inquiry = { id: id(), createdAt: new Date().toISOString(), ...input };
  store.inquiries.unshift(i);
  return i;
}

export function getStats() {
  return {
    clicks: store.clicks.length,
    subscribers: store.subscribers.size,
    inquiries: store.inquiries.length,
  };
}