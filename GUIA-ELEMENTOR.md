# Invictus Clean: building the site in WordPress + Elementor

This file maps the HTML prototype in this folder (v2) to what you configure in Elementor.

> **How the layout works (since the October 2026 refactor):** the prototype no longer copies Squarespace pixel by pixel.
> Every spacing comes from **one spacing scale**, every grid uses **equal or proportional columns** (½ + ½, 4 equal columns…)
> with **one shared gap**, and everything sits in **one content width**. Set these values once in *Site Settings*
> (section 2) and every page just reuses them.
> The previous pixel-perfect version is kept in `../Site-HTML-v2-backup-antes-refatoracao/` (see `../REVERTER-REFATORACAO.md`).

---

## 1. Folder structure

```
Site-HTML-v2/
├── index.html                  → Home
├── about.html                  → About Us
├── contact.html                → Contact
├── banking-and-finance.html    → SECTOR template (the other 12 sectors use the same layout)
├── builders-cleaning.html      → SERVICE template (the other 5 services use the same layout)
├── blog.html                   → Blog listing (Archive template)
├── blog-bank-cleaning-services-adelaide-security-hygiene.html → Blog post (Single Post template)
├── css/style.css               → design tokens + components + page sections (one file, commented)
├── js/main.js                  → menu, carousels, typing title, slider (Elementor widgets replace all of it)
├── images/                     → optimized WebP images, same names as in Documentos/Images/wordpress-renomeadas/
├── COMO-FAZER-O-MEGA-MENU.md   → step-by-step for the mega menu (in Portuguese)
└── GUIA-ELEMENTOR.md           → this file
```

Open any `.html` file in a browser to preview it. Links to pages not built yet (other sectors, services, posts) show
"file not found" locally; that's expected. In WordPress the links become the real slugs (`/about`, `/blog/…`).

**Stack:** theme **Hello Elementor** · **Elementor Pro** (Theme Builder, Menu, Form, carousels, Animated Headline) ·
**Rank Math** (SEO, redirects, local schema) · **WP Mail SMTP** (so form emails arrive).

---

## 2. Design system → Elementor Site Settings (do this first)

These are the `:root` variables at the top of `css/style.css`. In Elementor: **☰ → Site Settings**.

### 2.1 Global Colors

| Name | Value | Use |
|---|---|---|
| Primary | `#294D5D` | Text, headings, buttons, dark bands and cards |
| Primary hover | `#3A6272` | Button hover |
| Accent | `#D26D51` | Terracotta: typing title, mega menu titles, hover states |
| Teal | `#48988F` | Footer artwork |
| Peach | `#FAB981` | Check icons |
| Tint | `#F1F5F7` | Light section background (Process, Logos, FAQ) |
| Line | `#D5DEE2` | Dividers (FAQ) |
| Line soft | `#E6EDF0` | Dividers inside the mega menu |
| Field border | `#8A9DA6` | Form fields |
| White | `#FFFFFF` | |

### 2.2 Global Fonts (Google Font **Quicksand**)

Sizes kept from the original design. Desktop / tablet / mobile.

| Name | Size | Weight | Line height | Use |
|---|---|---|---|---|
| Body | 13.73 / 13.73 / 13px | 300 | 1.94 | All text (letter spacing 0.01em) |
| H1 | 67.3 / 52 / 44.4px | 500 | 1.32 | Page titles |
| H2 | 43.1 / 36 / 30.2px | 500 | 1.4 | Section titles |
| Large | 20.64 / 20.64 / 17px | 700 | 1.3 | Card titles, "TRUSTED CLEANING…" |
| Small | 12px | 300 | 1.9 | Testimonials, card buttons, meta |

Other one-off sizes: testimonials title 36/26px (700), blog card title 38.4/30/27px, post title 38.4/29px (700),
post H2 31.2/22px (700), FAQ question 17/15px (400).

### 2.3 Spacing scale (use only these values)

| Token | px | Typical use |
|---|---|---|
| space-1 | 4 | Label → field |
| space-2 | 8 | Small gaps (icon ↔ text, dots) |
| space-3 | 12 | Paragraph-ish gaps, list items |
| space-4 | 16 | Default paragraph spacing |
| space-5 | 24 | Title → text, card padding |
| space-6 | 32 | Larger card padding |
| space-7 | 48 | **Section heading → section content**, column gap in 2-column layouts |
| space-8 | 64 | Hero padding, contact columns gap |
| space-9 | 96 | **Section padding (desktop)** |

### 2.4 Layout tokens

| Token | Desktop | Tablet (≤1024) | Mobile (≤767) | Elementor setting |
|---|---|---|---|---|
| Content width | 1240px | — | — | *Site Settings → Layout → Content Width* |
| Wide width | 1360px | — | — | Header, footer, mega menu, testimonials (container *Boxed*, width 1360) |
| Side gutter (min) | 24px | 32px | 20px | Container padding left/right |
| Section padding (top + bottom) | **96px** | **72px** | **56px** | Every section container |
| Gap between columns/cards | **32px** | **24px** | **16px** | Container *Gap* / Grid *Gap* |
| Heading → content | 48px | 48px | 32px | Margin under the section heading block |
| Header height | 112px | 88px | 72px | Header container min height |

Breakpoints: Elementor defaults (tablet 1024, mobile 767).

### 2.5 Shape, buttons, form

- **Radius:** buttons **4px** · cards and panels **8px** · "Why" cards **12px**
- **Card shadow on hover:** `0 12px 28px rgba(41,77,93,.14)` + move up 4px
- **Buttons:** Primary background, white text, Quicksand 500 13.73px, padding **18px 32px**, radius 4px, hover opacity 0.8.
  Small variant: padding 14px 24px, 12px. Light variant: white background, Primary text.
- **Form fields:** border 1px Field border, radius 0, transparent, height 40px, padding 8px 12px, focus = Primary border.
  Labels Body; "(required)" Small at 70% opacity. Two-column row (First/Last name) = 50/50, gap 12px.

### 2.6 Grid patterns used everywhere

| Pattern | Columns (desktop → tablet → mobile) | Where |
|---|---|---|
| Two halves | ½ + ½ → ½ + ½ → 1 | Home about, About hero, sector/service hero, sector feature boxes |
| Hero split | 55% + 45% → same → 1 | Home hero |
| Contact split | 45% + 55% → same → 1 | Contact (Home + Contact page) |
| Four equal | 4 → 2 → 1 | Why cards, Process steps, About values |
| Three equal | 3 → 2 → 1 | Blog listing |
| Card carousel | 4 visible → 3 → 1 + peek | Our Sectors, Our Services |

In Elementor: a **Container** with *Direction: Row* (or *Grid*), children set to equal widths (or the % above), and the global **Gap**.
Never set fixed pixel widths on columns.

---

## 3. Header and footer (Theme Builder)

### Header (`Templates → Theme Builder → Header`)
- Container *Boxed* 1360px, min height **112px**, white, shadow `0 6px 24px rgba(210,109,81,.12)`, **Sticky: Top**.
- Row: Logo (132px; tablet 100px; mobile 52px) · **Menu** widget · social icons (21px) · "Get a Quote" button (small).
  Gaps: logo ↔ menu 48px, menu items 32px, social icons 32px, social ↔ button 48px.
- Menu: Body font, Primary, underline pointer 1px on hover and on the current page; phone numbers weight 700.
- **Sectors / Services open a mega menu** → full step-by-step in **[`COMO-FAZER-O-MEGA-MENU.md`](COMO-FAZER-O-MEGA-MENU.md)**.
  Panel: full width, padding 32px top / 48px bottom, inner width 1360px, small Accent title (12.5px uppercase, 0.1em)
  + links in **3 columns** (gap 64px), each link 12px top/bottom padding with a 1px Line-soft border.
- Tablet/mobile (≤1024): hamburger; hide social + button.

### Footer (`Templates → Theme Builder → Footer`)
- Container *Boxed* 1360px, min height **416px** (the artwork needs it), padding 48px top/bottom.
- Background `global-footer-shape.webp` *Cover/Center* + white overlay 15%.
- Grid: logo (left, bottom-aligned) | text column max 512px (right-aligned) · copyright full width at the bottom, centered, white, 12px italic.
- Mobile: one column (text → logo → copyright); background *Bottom Left*, height ~255px.

---

## 4. Reusable blocks (save as Elementor templates)

| Block | Class | Where | Notes |
|---|---|---|---|
| Section heading | `.ic-h2` + intro | Every section | H2 centered + optional intro (max 48rem, Body) · 48px to the content below |
| Free quote band | `.ic-quote-cta` | Home (button → `#contact`), every sector and service page (button → `/contact`) | Photo background + dark overlay, H2, text, checklist, light button |
| Dark panel | `.ic-panel` | About (vision, mission, values), sector feature boxes | Primary background, white text, centered, padding 24px, radius 8px, title Large |
| Sector/service card | `.ic-card` | Our Sectors / Our Services carousels | Border 2px Primary, radius 8px, padding 16/16/24px, illustration max 200px square, label, small "Find Out More" button pushed to the bottom; whole card is the link |
| Contact info | `.ic-contact__info` | Home, Contact | Intro · **Email** · **Phones** (Victor / Karla + availability) |
| Contact form | `.ic-form` | Home ("Send"), Contact ("Submit") | First*, Last* (50/50), Company, Phone*, Email*, Message* · button centered · email to `contact@invictusclean.com.au` |
| FAQ list | `.ic-faq-list` | Home (8 service Qs), About (7 company Qs) | Tint background · **Accordion** widget, *Max expanded: One*, all collapsed · max width 1000px · question 17/15px, padding 24px, "+"/"–" icon right, 1px Line under each item |

---

## 5. Page by page

> Every page: *Page Layout → Elementor Full Width*. Every section = a container with the **section padding**
> (96/72/56) and the **content width** (1240), unless noted.

### 5.1 Home (`index.html` → `/`) — section order
1. **Hero** — hero split 55/45, vertical align center, padding **64px** (not the full 96px, it sits under the header).
   - H1 with **typing animation**: *Animated Headline* (Pro) → *Typing* · Before text `Commercial & Residential Cleaning` ·
     Animated text: Solutions / You Can Trust / Across Adelaide / Done Right (one per line) · loop · ~2200ms · color Accent · HTML tag H1.
   - Text (max 32rem, 16px below the title) + "Get a Quote" button (24px below), both left-aligned.
   - Right: **photo carousel of clean spaces** (client feedback: results on the Home, people on About) — *Image Carousel*:
     1 slide · *Fade* · autoplay 4500ms · pause on hover **No** · **dots only** · image ratio 4:3 · radius 8px.
     Photos, alternating commercial / residential: `home-hero-01-reception-desk` · `02-open-plan-office` · `03-bedroom` ·
     `04-office-lounge` · `05-carpeted-bedroom`. Full-size originals of the client's new photos:
     `Documentos/Images/wordpress-renomeadas/01-home/home-hero-0X-*-original.jpg`.
   - Mobile: 1 column, carousel below the button.
2. **Professional cleaners in Adelaide** — two halves, center aligned: photo `home-professional.webp` (16:10, cover) | text right-aligned
   (H2 → 24px → 2 paragraphs → 24px → "Read More"). Mobile: text first (left-aligned), photo below.
3. **Why Adelaide Trusts Invictus Clean** — Primary band, white H2 + intro (16px, 90% opacity), **four equal** white cards
   (radius 12px, padding 32/24px, icon 44px `home-value-0X-*-dark.webp`, title Large, text). *Icon Box* ×4.
4. **Our Sectors** — H2 + **card carousel**; then **Our Services** (64px below): H2 + "TRUSTED CLEANING SERVICES PROVIDER"
   (Large) + 3 centered paragraphs (max 55rem) + **card carousel**.
   *Loop Carousel* (best) or *Image Carousel*: slides 4 / 3 / 1 · slides to scroll = slides shown · no autoplay, no loop ·
   arrows + dots · space between = global gap. Arrows 44×44px, 2px Primary border, radius 8px, outside the cards (24px away)
   on desktop; on tablet/mobile next to the dots.
5. **Our Cleaning Process** — Tint band, H2 + intro, **four equal** cards (2px Primary border, radius 8px, white, padding 32/24px):
   number in a 52px Primary circle, title Large (500), text. Steps: Tell us about your space · Free on-site assessment ·
   Custom quote within 24 hours · A seamless start.
6. **Free quote band** — background `home-quote-cta-bg.webp` + overlay `rgba(31,58,70,0.84)`, padding = section padding × 1.2,
   white centered content (max 52rem): H2 · paragraph (16px) · checklist (Icon List, peach check circles 26px, 17px/500, gap 12px) ·
   light button "Request My Free Quote ›" → `#contact` (48px below the list).
7. **Trusted by businesses across Adelaide** — Tint band, H2, logos scrolling non-stop, edges faded, pause on hover.
   ⚠️ Logos are **placeholders** — waiting for the real client logos.
   *Image Carousel*: slides 6 / 4 / 2 · autoplay, speed 0, animation 5000ms · loop · pause on hover · no arrows/dots ·
   Custom CSS: `selector .swiper-wrapper { transition-timing-function: linear !important; }`.
8. **Real Feedback From Real People** — title (36px/700) left-aligned in the wide width; *Testimonial Carousel*: slides 400px,
   Primary background, padding 24px, gap = global gap, slides start aligned with the wide container and scroll to the screen edge;
   round arrows (56px) centered below (48px gap). 10 testimonials in `index.html`.
9. **Cleaning Services Adelaide FAQs** — FAQ list block (8 questions).
10. **Contact us** — contact split 45/55, gap 64px: contact info | form ("Send").

### 5.2 About (`about.html` → `/about`)
Order changed after client feedback: **the story first**, vision / mission / values after.
1. **Hero** — two halves, 48px gap, vertically centered.
   Left: **H1** "About Invictus Clean Adelaide" → 24px → **H2** "A New option in the local cleaning industry" (Large style) →
   16px → the 3 story paragraphs.
   Right: **photo carousel** (4:3, radius 8px) — *Image Carousel*: 1 slide · *Fade* · autoplay 4500ms · **pause on hover: No** ·
   arrows + dots. Photos: `about-carousel-01…06-*.webp`.
   Mobile: text first, photos below.
2. **Our Vision, Mission and Values** — H2 centered + intro line ("Our vision, mission and values are the source of
   inspiration…") → 48px → **Vision + Mission** dark panels (two halves, global gap) → **Our Values** dark panel with
   **four equal** columns (TRUST / PEOPLE FIRST / QUALITY / COST-EFFICIENCY). Mobile: everything stacked.
3. **Scrolling band** — Primary band in the content width, white Large text scrolling left (40s loop, pause on hover),
   padding 24px top/bottom. Elementor: *HTML widget* with the `.ic-marquee` markup from `about.html` + its CSS.
4. **Frequently asked questions** — FAQ list block (7 questions) + "If you have any other questions…" + "Get in Touch" (48px below).

### 5.3 Contact (`contact.html` → `/contact`)
- One section: contact split 45/55, gap 64px. Left: **H1** "Contact us" + contact info ("Phones:" with colon). Right: form ("Submit").

### 5.4 Sector template (`banking-and-finance.html`) — used by all 13 sectors
- **Hero** — two halves, 48px gap: H1 + 2 justified paragraphs + "Get in Touch" (24px below) | illustration (max 440px, centered).
- **Details** — H2 centered + 2 justified paragraphs (24px below the title) + **two halves** of dark panels (48px below), global gap.
- **Other Sectors We Clean** — Tint band, H2 centered + the **same card carousel as the Home**, listing the other 12 sectors
  (leave out the current page). Gives each page more content and internal links. *Loop Carousel* with a query/filter that
  excludes the current page, or a manual *Image Carousel* per page.
- **Free quote band** — the same block as the Home (save it as a template once and insert it); button → `/contact`.
- Mobile: title → text → illustration (max 240px) → button centered → panels stacked.

### 5.5 Service template (`builders-cleaning.html`) — used by all 6 services
- **Hero** — mirrored: illustration (max 440px) | H1 + paragraph + button, **right-aligned**.
- **Details** — H2 centered + 3 justified paragraphs.
- **Other Cleaning Services** — Tint band + card carousel with the other 5 services (same rules as the sector template).
- **Free quote band** — same template as the Home; button → `/contact`.
- Mobile: same order as the sector template.

### 5.6 Blog listing (`blog.html` → `/blog`) — *Theme Builder → Archive* / *Loop Grid*
- Content width, **three equal** columns (2 tablet, 1 mobile), gap 48px vertical / global gap horizontal, 9 posts per page.
- Card: featured image 3:2 cover · meta (date • author, 500) 16px below · title (38.4px/500, line height 1.15) · "Read More" (Small, underlined).
- "Older Posts ›" right-aligned, 64px below the grid.

### 5.7 Blog post — *Theme Builder → Single Post*
- Column **760px** centered (comfortable reading width), padding 48px top / section padding bottom.
- Post Title (38.4px/700) · Post Info 24px below · content 48px below (paragraph spacing 12px, H2 31.2px/700 with 32px above) ·
  author (Small) 48px below · Post Navigation (next post, right-aligned, in the wide width).
- The featured image is not shown inside the post.

---

## 6. Images

Use `Site-HTML-v2/images/` (optimized; same names as `Documentos/Images/wordpress-renomeadas/`). Alt texts are in the HTML.

| Files | Where |
|---|---|
| `global-*` | Logo, white logo, favicon (`global-favicon-512.png`), footer artwork |
| `home-hero-01…05-*.webp`, `home-professional.webp`, `home-quote-cta-bg.webp` | Home (hero carousel, about block, quote band) |
| `home-value-0X-*-dark.webp` (4) | "Why" cards |
| `home-sector-01…13-*` / `home-service-01…06-*` | Carousel cards **and** the illustration of each sector/service page |
| `about-carousel-01…06-*` | About photo carousel |
| `blog-*` + 3 reused photos | Post featured images (table in `INVENTARIO-IMAGENS.md`) |

---

## 7. SEO checklist

1. **Keep the same URLs.** Posts: *Settings → Permalinks* → `/blog/%postname%/`.
2. **Title + meta description** per page (Rank Math) — copied in each HTML `<head>`.
3. **One H1 per page** (the prototype already does it; Squarespace didn't).
4. ⚠️ The `<meta name="robots" content="noindex, nofollow">` in every HTML file is **only for the online preview**. Never copy it to WordPress.
5. LocalBusiness schema: Rank Math → Local SEO (JSON-LD reference in `index.html`).
6. After the DNS switch, submit the sitemap in Google Search Console.

---

## 8. Still to confirm with the client

- Real **client logos** for the logos strip.
- "Custom quote within 24 hours" and "No lock-in contracts" (copied from the landing pages, now prominent on the Home).
- Opening hours (the site shows 9–5 on Contact but 9–6 in Google data).
