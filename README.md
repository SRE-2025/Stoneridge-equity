# Stoneridge Equity — Website

A fast, dependency-free marketing site for **Stoneridge Equity**, a lower-middle-market
private equity firm in Austin, Texas. Static HTML/CSS/JS — no build step, no framework.

The design was built after studying four institutional PE sites (Blackstone, Warburg
Pincus, Hellman & Friedman, Axial) and one creative VC site (ATX Venture Partners), and
borrows the patterns that make them feel established:

- **Rotating hero creed** (H&F) — "Own with conviction / Built to endure / Aligned, always"
- **Track-record stat band** with count-up (Warburg)
- **Founder-led "Our Story"** (H&F)
- **Accordion sectors** (H&F / Warburg)
- **Operator-led "extended team"** value creation (ATX)
- **Featured-investment case-study spotlight** (H&F Medline-style)
- **Investor Login** in the nav (Warburg / H&F)
- A bespoke **topographic-contour motif** — literally "stone-*ridge*" — as the signature
  visual, in place of generic stock photography.

## Brand

Derived from the Stoneridge mountain mark:

| Token        | Value       | Use                          |
|--------------|-------------|------------------------------|
| Forest green | `#22331c`   | Dark sections, primary ink   |
| Cream / snow | `#f2efe6`   | Light surfaces, text on dark |
| Copper       | `#a5673f`   | Accent (the wordmark color)  |
| Sage         | `#6f8759`   | Secondary green accent       |

- **Display:** Fraunces (serif) · **Wordmark/labels:** Oswald (condensed) · **Body:** Inter
- All colors are CSS variables at the top of `assets/css/main.css`.

## Your logo

`assets/img/mark-web.png` is your **real mountain mark**, cropped from
`Stoneridge Digital Logo.png` (the source file's wordmark reads "DIGITAL", so only the mark
was used). The wordmark on the site is set as text: **STONERIDGE / EQUITY PARTNERS**.

**To drop in a proper Stoneridge Equity logo:** save it as `assets/img/logo-equity.png`
(or `.svg`) and tell me — I'll replace the `<img class="brand__mark">` + text lockup in
every header/footer. Full-resolution source is preserved at `assets/img/logo-large.png`.

## Pages

`index.html` · `firm.html` · `approach.html` · `portfolio.html` · `team.html` ·
`insights.html` · `contact.html` — all on the same v2 design system.

## Add real photography (optional but recommended)

Every image area is a `.media-frame` that currently shows the topographic motif. To use a
real photo, add an `<img>` as the **first child** of the frame (before the `<svg class="topo">`):

```html
<div class="media-frame aspect-portrait">
  <img src="assets/img/story.jpg" alt="Our Austin office" />
  <svg class="topo" ...>…</svg>   <!-- keep or remove -->
</div>
```

The photo is automatically given a forest-green duotone treatment so it stays on-brand.
Good candidates: Austin skyline / hill country (hero + story), the office, and team
headshots (replace the motif in each `team.html` portrait frame).

## Replace before launch

- **Stats** — `$3.4B`, `40+`, `12,000+`, `9`, `Est. 2016` (search the files).
- **Portfolio companies** and the **Meridian Systems** case study (illustrative).
- **Team** names/titles (bracketed placeholders) + headshots.
- **Office address, emails**, Investor Login destination, legal links.
- **Insights** headlines → real posts.
- Forms are **front-end only** — wire to Formspree / Netlify Forms / your CRM.

## Run locally

```bash
npx serve .      # then open the printed URL
```

## Deploy

Fully static — hosts anywhere: GitHub Pages (push to `SRE-2025/Stoneridge-equity`,
enable Pages on `main`), Netlify, Vercel, or Cloudflare Pages. No build command.
Point `stoneridge-equity.com` at the host once live.
