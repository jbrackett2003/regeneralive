# Connecting regeneralive.com to your site

This guide walks you through pointing your domain `regeneralive.com` at this site so visitors actually land on your store. You only need to do this **once**.

## What needs to happen, in plain English

Right now your site lives in a development sandbox at a long, ugly URL. To use **regeneralive.com**, three things need to come together:

1. **A real host** — a server that runs your site 24/7. The dev sandbox doesn't qualify.
2. **A connection between your domain and that host** — done by editing DNS records at your domain registrar.
3. **HTTPS / SSL** — so the address bar shows a padlock. Modern hosts handle this for free, automatically.

I'll walk you through each step. Total time: about 30 minutes, most of it waiting for DNS to update.

---

## Step 1 — Pick a host (Vercel is the right choice)

The site is built on Next.js. The company that *makes* Next.js — Vercel — runs the best free hosting for it. You don't need a credit card.

**Why Vercel:**
- Free for sites at your traffic level (you'd need ~100,000+ visits/month before paying)
- Automatic HTTPS — no certificate work to do
- Global CDN — your site loads fast everywhere
- One-click rollback if anything breaks
- Direct integration with GitHub (push code, it deploys)

**Alternatives** (only if you have a strong preference):
- **Netlify** — similar to Vercel, also free, also good
- **Railway** — pay-as-you-go ($5/month-ish), good for small projects
- **DigitalOcean App Platform** — $5/month, more control
- **Self-hosted on a $5/month VPS** — only if you want to learn server admin

I'll give Vercel instructions because it's what I'd pick for you.

---

## Step 2 — Get your code into GitHub

Vercel deploys *from* GitHub. So we need your code there first.

1. Go to [github.com](https://github.com) and create a free account if you don't have one.
2. Click the **+** in the top-right → **New repository**.
3. Name it `regeneralive` (or whatever you like). Set it to **Private** (your code, your call). Don't initialize with a README.
4. **Send me the repository URL** (it'll look like `https://github.com/yourusername/regeneralive`) and I'll push the code there for you in about 30 seconds.

Or if you want to do it yourself: I'll give you the exact terminal commands.

---

## Step 3 — Deploy to Vercel

1. Go to [vercel.com](https://vercel.com) → **Sign Up with GitHub**.
2. After signing in, click **Add New → Project**.
3. Find your `regeneralive` repo in the list and click **Import**.
4. **Important — Environment Variables:** Add these three (you can copy them from the working `.env.local` file):
   - `ADMIN_PASSWORD_HASH` — your hashed admin password
   - `SESSION_SECRET` — the long random string
   - `ADMIN_NAME` — `Admin` (or whatever name you want shown)

   *I can give you these values when you're ready to deploy.*

5. **Important — Persistent Storage:** The site uses SQLite stored in a `data-store/` folder. On Vercel's serverless tier, files don't persist between deploys. You have two options:

   **Option A (simpler) — Keep using SQLite, on a host with persistent disk.** Use **Railway** or **DigitalOcean App Platform** instead of Vercel. Both give you persistent disk for ~$5/month. The SQLite file lives on, your edits persist forever.

   **Option B — Migrate to a hosted database.** I'd swap SQLite for a managed Postgres database (Neon, Supabase, or Vercel Postgres — all have free tiers). One-time migration; your admin keeps working exactly the same. **I recommend this if you go with Vercel.**

   👉 **My honest recommendation:** Go with **Railway** for now (option A). It's $5/month, it just works, you don't need to migrate anything. We can move to Vercel + hosted Postgres later if you outgrow it.

6. Click **Deploy**. After ~2 minutes, you'll get a URL like `regeneralive-abc123.vercel.app` (or `regeneralive.up.railway.app`). Test it — the site should be fully functional.

---

## Step 4 — Point regeneralive.com at the host

This is the only step that touches your domain registrar (where you bought regeneralive.com — likely GoDaddy, Namecheap, Google Domains, Squarespace Domains, etc.).

### What you'll do

1. Log into your domain registrar.
2. Find the **DNS** or **DNS settings** or **Manage DNS** page for `regeneralive.com`.
3. Add or edit two records:

#### For Vercel:
| Type | Name | Value |
|---|---|---|
| `A` | `@` | `76.76.21.21` |
| `CNAME` | `www` | `cname.vercel-dns.com` |

#### For Railway:
| Type | Name | Value |
|---|---|---|
| `CNAME` | `@` (or root/apex) | (Railway gives you a domain like `your-app.up.railway.app`) |
| `CNAME` | `www` | (same value) |

*Some registrars don't allow CNAME on the root `@` — in that case use **ALIAS** or **ANAME**, or use Railway's IPv4/IPv6 records they'll provide.*

4. **Then back in Vercel/Railway**, go to your project's **Domains** settings and add `regeneralive.com` and `www.regeneralive.com`. The host will verify the DNS and automatically issue an HTTPS certificate.

### What happens next

- DNS changes take **5 minutes to 48 hours** to spread globally (called "propagation"). Usually under an hour.
- During this time, some visitors might see the old site, others the new — that's normal.
- Once propagation finishes, `https://regeneralive.com` will load your site, with the padlock in the browser.

---

## Step 5 — Test the live site

Once `regeneralive.com` resolves to your site, test these:

- [ ] Homepage loads at `https://regeneralive.com`
- [ ] Login at `https://regeneralive.com/admin/login` works
- [ ] Click an affiliate link, ensure it redirects to the brand site (and earns you commission)
- [ ] Email yourself the contact form to make sure it captures messages

That's it. You're live.

---

## Common questions

### "Where did I buy regeneralive.com from?"
If you don't remember, search your email inbox for "regeneralive.com" — your purchase confirmation will be there. Or check ICANN's [whois lookup](https://lookup.icann.org/en/lookup) — type in `regeneralive.com` and it'll tell you the registrar.

### "I want a custom email like hello@regeneralive.com"
Separate from this. The simplest setup is **Google Workspace** ($6/month per mailbox) or **Fastmail** ($3/month). They give you DNS records (MX records) to add at your registrar; takes ~10 minutes.

### "I want to move from Railway/Vercel later"
Easy. The DB is portable, the code is portable. Anytime you want to migrate, the only step is updating DNS to point to the new host. Less than an hour of work.

### "Something broke after I changed DNS"
Don't panic. Edits to DNS are reversible. Worst case, you can revert any DNS change within minutes. I can help diagnose.

### "Do I need to do all of this?"
The dev sandbox URL works perfectly fine for now if you just want to share with a few people. The real reason to deploy is when you're ready for **public traffic** — search engines, social media, business cards, etc. Until then, no rush.

---

## When you're ready

Just message me with:
1. Whether you went with Vercel, Railway, or another host
2. The deployment URL the host gave you
3. Your registrar (GoDaddy, Namecheap, etc.)

I'll walk you through the DNS settings live, screenshot by screenshot if needed.