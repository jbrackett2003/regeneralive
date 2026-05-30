# Fix: Why `regeneralive.com` (without www) shows the Squarespace parking page

## The exact problem

Right now:

| URL | What happens |
|---|---|
| `https://www.regeneralive.com` | ✅ Loads your real site (Railway) |
| `http://regeneralive.com` (no `s`) | ✅ Redirects to www, then loads your site |
| `https://regeneralive.com` (no `s`!) | ❌ Squarespace "Coming Soon" parking page |

Most modern browsers default to `https://` — so a friend who types `regeneralive.com` into Chrome/Safari sees the parking page, not your store. That's the bug.

## Why it happens (in plain English)

You set up Squarespace's **URL Forwarding** rule (`@` → `https://www.regeneralive.com`). That rule works **only over HTTP**. The moment a browser asks for the site over HTTPS, Squarespace's own servers answer first, present *their* SSL certificate, and serve their parking page — before the forwarding rule ever runs. They simply don't issue an HTTPS certificate for forwarded apex domains.

This is a hard Squarespace limitation. We can't fix it inside Squarespace's settings. The fix is to take DNS off Squarespace entirely.

## The fix: switch nameservers to Cloudflare (free, ~15 min)

Cloudflare gives free **CNAME flattening** — meaning we can point the apex `regeneralive.com` directly at Railway, just like we already do for `www`. They also issue automatic free HTTPS for both. This is what Railway's docs explicitly recommend for Squarespace-registered domains ([source](https://docs.railway.com/networking/domains/working-with-domains)).

Your domain stays registered at Squarespace — you're just changing **who answers DNS questions** about it. Squarespace becomes the registrar of record only; Cloudflare handles the actual routing.

### Step 1 — Sign up for Cloudflare (free, 2 min)

1. Go to **[cloudflare.com](https://cloudflare.com)** → **Sign Up**.
2. Confirm your email.
3. After login, click **Add a Site** → enter `regeneralive.com` → choose the **Free** plan.
4. Cloudflare will scan your existing DNS. It'll find your current www CNAME — that's fine.

### Step 2 — Save the DNS records you'll need (1 min)

In Cloudflare's DNS panel, **delete** any auto-imported records, then **add these two**:

| Type | Name | Target | Proxy status |
|---|---|---|---|
| `CNAME` | `@` (or `regeneralive.com`) | *the CNAME target Railway gave you for www* | 🟠 **Proxied** (orange cloud ON) |
| `CNAME` | `www` | *same Railway CNAME target* | 🟠 **Proxied** (orange cloud ON) |

**Where to find the Railway CNAME target:**
Railway dashboard → your project → **Settings** → **Domains** → next to `www.regeneralive.com` you'll see the target it told you to point at (looks like `something-production-abc1.up.railway.app`). Use that exact value for both records.

> ⚠️ **Don't delete** any MX records (email) Cloudflare auto-imports if you have email at this domain. Only delete A/AAAA/CNAME records that conflict with what we're adding.

### Step 3 — Cloudflare gives you 2 nameservers — copy them (1 min)

After adding the records, Cloudflare shows a screen like:

> *Replace your nameservers with:*
> *`alex.ns.cloudflare.com`*
> *`zara.ns.cloudflare.com`*

(Yours will be different. Each Cloudflare account gets randomly-assigned names.)

Keep that tab open.

### Step 4 — Change nameservers at Squarespace (3 min)

1. Go to **[Squarespace Domains panel](https://account.squarespace.com/domains)**.
2. Click **`regeneralive.com`**.
3. Find **"Use Custom Nameservers"** or **"Advanced Settings" → "Nameservers"**.
4. Replace whatever's there with the **two Cloudflare nameservers** from Step 3.
5. Save.

> 💡 Squarespace may warn you that changing nameservers disconnects the domain from Squarespace services. That's exactly what we want — we no longer need Squarespace for DNS or forwarding.

### Step 5 — Tell Cloudflare you've done it (30 sec)

Back in Cloudflare, click **"Done, check nameservers"**. Cloudflare will start polling.

### Step 6 — Wait for propagation (5 min – 24 hr, usually <1 hr)

Cloudflare emails you when nameservers have switched. Then:
- Cloudflare's free SSL certificate auto-issues within ~15 minutes.
- Both `https://regeneralive.com` and `https://www.regeneralive.com` will reach Railway.
- Our app's middleware automatically redirects bare `regeneralive.com` to `www.regeneralive.com` (already deployed — see `src/middleware.ts`).

### Step 7 — Verify (30 sec)

After the email + 15 min, run this in your terminal (or just open the URLs):

```
curl -sI https://regeneralive.com | head -5
```

Expected: a `308` redirect with `Location: https://www.regeneralive.com/`. **Not** the Squarespace parking page.

---

## Cleanup (optional, after Step 7 verifies)

In Squarespace's domain settings, you can now:
- **Delete** the URL forwarding rule (`@` → www) — Cloudflare handles it now.
- Leave the domain registered at Squarespace (no need to transfer the registration).

---

## Why not just use Squarespace's "primary domain" toggle?

Some Squarespace forum threads suggest setting `regeneralive.com` as a "primary domain" inside Squarespace. That only works if you have an active **Squarespace site subscription** ($16+/mo) — which we don't, and shouldn't pay for. Cloudflare is free.

## Why not move the domain registration to Cloudflare?

You can — Cloudflare Registrar offers **at-cost** domain renewal (no markup). Saves you a few bucks a year vs. Squarespace. But that's a separate optional step. Doing it later is fine.

## Troubleshooting

**"Cloudflare says nameservers haven't updated yet"**
Squarespace can be slow. Wait 2–4 hours. If it's been over 24 hours, double-check you saved the nameservers correctly at Squarespace.

**"I see a 'too many redirects' error"**
Means Cloudflare's SSL mode is wrong. In Cloudflare → SSL/TLS → set encryption mode to **"Full"** (not "Flexible").

**"www works but apex still hits parking page"**
DNS hasn't fully propagated. Try `curl -sI https://regeneralive.com` from a different network or from [whatsmydns.net](https://www.whatsmydns.net/#A/regeneralive.com). If multiple regions show Cloudflare IPs (like `104.x.x.x` or `172.x.x.x`), the fix is live and your local DNS just hasn't refreshed yet.

---

## TL;DR for the impatient

1. Sign up at [cloudflare.com](https://cloudflare.com) (free).
2. Add `regeneralive.com`. Add 2 CNAMEs (`@` and `www`) pointing at your Railway CNAME target. Both proxied (orange cloud).
3. Copy the 2 nameservers Cloudflare gives you.
4. Paste them into Squarespace → Domains → `regeneralive.com` → Nameservers.
5. Wait for the email. Done.

Total active time: ~15 min. After propagation, both `https://regeneralive.com` and `https://www.regeneralive.com` work, with proper SSL, and bare apex auto-redirects to www.