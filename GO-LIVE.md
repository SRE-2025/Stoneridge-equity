# Stoneridge Equity — Go-Live Checklist

From private demo → live, findable, lead-capturing site. Work top to bottom.
**[You]** = needs you · **[Me]** = I can do it (some need a value from you first).

> **Golden rule:** do NOT flip `noindex` off (Phase 4) until Phases 1–3 are done.
> You don't want Google indexing placeholder numbers or an unreviewed investor tool.

---

## Phase 1 — Make the content true  *(the credibility gate)*

- [ ] **[You→Me]** Replace the fabricated figures with real ones (or honest "new firm" framing): `$3.4B AUM`, `Est. 2016`, `40+ investments`, `9 realizations`, `12,000+ jobs`. Send me the real numbers (or "we're new, here's the honest version") and I'll swap them everywhere.
- [ ] **[You→Me]** Portfolio: real companies, or relabel clearly as illustrative / remove. Same for the **Meridian Systems** case study.
- [ ] **[You→Me]** Team: real names, titles, bios, and **headshots** (send photos → I place them in the treated frames).
- [ ] **[You→Me]** Real office address, phone, and the correct emails (`inquiries@`, `deals@`, `ir@`, `careers@`).
- [ ] **[You]** Decide on **Investor Login**: wire it to a real portal, or I hide it until you have one (right now it's a dead `#`).

## Phase 2 — Turn on lead capture  *(so leads actually arrive)*

- [ ] **[You]** Create a free account at **formspree.io** → New Form → deliver to your inbox → copy the form ID (e.g. `xyzabcd`).
- [ ] **[You→Me]** Send me the ID. I replace `YOUR_FORM_ID` in **contact.html**, **insights.html**, and **careers.html** (contact, newsletter, and careers forms) and push. *(~2 min.)*
- [ ] **[Me]** After it's live, I'll submit a real test through each form to confirm it lands in your inbox.
- [ ] **[You→Me]** *(Optional)* Add privacy-friendly **analytics** (Plausible or GA4) so you can actually measure conversion. I'll wire it; you create the account.

## Phase 3 — Legal & compliance sign-off  *(non-negotiable for a firm that manages money)*

- [ ] **[You]** Have **securities counsel review the investor Fit tool** (`fit-invest.html`) and any investor-facing copy — Reg D / general-solicitation rules affect *how* you're allowed to raise. It's conservative and disclaimered, but counsel should bless it before it's public.
- [ ] **[You→Me]** Provide the **real Privacy Policy, Terms of Use, and Form ADV** link (SEC IAPD). I wire the footer links (currently `#`).
- [ ] **[You]** Confirm the site-wide disclaimer language is acceptable to counsel.

## Phase 4 — Custom domain + go public

- [ ] **[You]** At your registrar (wherever `stoneridge-equity.com` is managed), add:

  | Type  | Host | Value |
  |-------|------|-------|
  | A     | `@`  | `185.199.108.153` |
  | A     | `@`  | `185.199.109.153` |
  | A     | `@`  | `185.199.110.153` |
  | A     | `@`  | `185.199.111.153` |
  | CNAME | `www`| `sre-2025.github.io` |

- [ ] **[You]** GitHub repo → **Settings → Pages → Custom domain** → enter `stoneridge-equity.com` → Save. Wait for the check, then tick **Enforce HTTPS**.
- [ ] **[Me]** *(alternative)* I can commit a `CNAME` file instead — say the word.
- [ ] **[Me]** Flip to indexable: in `robots.txt` change `Disallow: /` → `Allow: /`, and remove the `noindex` meta from every page (inside `<!-- seo:start -->`). One small commit.
- [ ] **[You]** In **Google Search Console**: add the property, verify, and submit `https://stoneridge-equity.com/sitemap.xml`.

## Phase 5 — Final QA  *(I run this once Phases 1–4 land)*

- [ ] **[Me]** Submit a real lead through all 3 forms → confirm delivery.
- [ ] **[Me]** Walk all 3 Fit Finders end-to-end on the live domain.
- [ ] **[Me]** Click every link — no `#` dead ends remain.
- [ ] **[Me]** Check the social-share preview (`og.png`) renders in iMessage / LinkedIn / Slack.
- [ ] **[Me]** Re-check mobile + light/dark, and Lighthouse (perf/SEO/a11y).

---

### The 4 things ONLY you can unblock
1. Real content + numbers (Phase 1)
2. Formspree ID (Phase 2)
3. Counsel review + real legal links (Phase 3)
4. DNS records + Pages custom-domain toggle (Phase 4)

Everything else is mine. Send me any of the above and I'll knock it out immediately.
