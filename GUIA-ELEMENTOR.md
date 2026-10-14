# Invictus Clean: migrating the site to WordPress + Elementor

This file maps each HTML page in this folder to what you need to configure in Elementor.
Every value (sizes, colors, spacing) was measured from the live site at 1440px (desktop) and 390px (mobile),
and each page was compared side by side with the live one (total height within 1–4px).

---

## What changed in v2

Animations, carousels, mega menu, card buttons, the new FAQ and 3 new Home sections (10 changes). Where a section below (6.x) disagrees with this list, this list wins. Everything else is identical to `Site-HTML/`. In the code, look for the `v2` comments in
`index.html`, `about.html`, the **"v2 — ANIMATIONS"** block at the end of `css/style.css` and at the end of `js/main.js`.

### 1. Home hero: typing headline
- The last part of the title is typed letter by letter, held, highlighted and replaced:
  **"Commercial & Residential Cleaning"** + *Solutions* → *You Can Trust* → *Across Adelaide* → *Done Right* (loops).
- Typed text in **Accent `#D26D51`**, with a blinking cursor in the same color. ~110ms per letter, holds 2.2s.
- For Google and screen readers the H1 is always the full sentence "Commercial & Residential Cleaning Solutions".
- **Elementor:** **Animated Headline** widget (Pro) → *Style: Animated* · *Animation: Typing* ·
  *Before Text:* `Commercial & Residential Cleaning` · *Animated Text:* one phrase per line · *Loop: Yes* ·
  *Duration:* ~2200ms · HTML tag **H1**. Style: title = H1 Page Title global font; animated text color = Accent.
- To change the phrases, edit `data-typing` in `index.html` (or the lines in the widget).

### 2. Home: client logos strip (new section, between "Our Services" and the testimonials)
- Title **"Trusted by businesses across Adelaide"** (H2) + a row of logos scrolling sideways non-stop,
  with the edges fading out. Pauses on hover. Section background `#F1F5F7`, padding `70px 0 80px`.
- ⚠️ **The logos are placeholders** ("Client logo 1…8"). Send the real client logos (PNG/SVG with a transparent background,
  ideally horizontal) and I'll swap them in. In the HTML, replace each `<span class="ic-logo-placeholder">` with
  `<img src="images/client-logo-01.webp" alt="Client name">`.
- **Elementor:** **Image Carousel** widget → *Slides to show:* 6 (tablet 4, mobile 2) · *Autoplay: Yes* · *Autoplay speed:* 0 ·
  *Animation speed:* 5000 · *Infinite loop: Yes* · *Pause on hover: Yes* · no arrows/dots. Then paste this into the widget's
  *Advanced → Custom CSS* so the movement is continuous (no stops):
  `selector .swiper-wrapper { transition-timing-function: linear !important; }`
  (Alternative without code: any "logo ticker / marquee" add-on.)

### 3. About: photo carousel instead of the single photo
- 6 **real team photos** (from your own backup), fading every 4.5s, with arrows (on hover; always visible on mobile),
  dots and swipe. **Always runs on its own**: it does not pause when the mouse is over it; clicking an arrow or dot just
  restarts the 4.5s count.
- Photos (already cropped to the same frame, in `images/`): `about-carousel-01-team` · `02-cleaner-smiling` · `03-victor-van` ·
  `04-handrail` · `05-office-vacuuming` · `06-reception`.
- **Elementor:** **Image Carousel** widget → *Slides to show: 1* · *Effect: Fade* · *Autoplay speed:* 4500 · *Pause on hover: **No*** · *Pause on interaction: No* ·
  *Navigation: Arrows and Dots* · *Image size:* full · *Image Stretch: Yes*.

### 4. Home: "Our Sectors" and "Our Services" as carousels
- Same cards as before (border, illustration, label), now in a carousel. Structure based on "Sectors we support"
  (totalclean.co.uk): centred title (no line below it), **4 cards per view**, square arrow buttons **outside** the cards
  (left/right) and **one dot per page** (4 pages for the 13 sectors). No autoplay. Arrows fade out at the start/end.
- Tablet: 3 cards per view · Mobile: 1 card + a peek of the next one; on both the arrows sit next to the dots. Swipe works on touch.
- **"Our Services" (6 cards) uses the same carousel** (2 pages on desktop and tablet). Same Elementor settings.
- **Elementor:** **Loop Carousel** (Pro; best option, the card is a Loop Item template = Image + label, link on the whole box)
  or **Image Carousel** with captions → *Slides to show:* 4 (tablet 3, mobile 1) · *Slides to scroll:* 4 (tablet 3, mobile 1) ·
  *Autoplay: No* · *Infinite loop: No* · *Navigation: Arrows and Dots* · *Space between:* 30px.
  Arrows: 44×44px, border 2px Primary, radius 8px, white background, hover = Primary background + white icon.

### 5. Header: mega menu for "Sectors" and "Services" (all pages)
- Reference: the client's screenshot of totalclean.co.uk. Hovering "Sectors" or "Services" opens a **full-width panel**
  under the header: small title in Accent (`CLEANING SECTORS` / `CLEANING SERVICES`, 12.5px, uppercase, letter spacing 0.1em)
  + links in **3 columns**, each row separated by a thin line (`#E6EDF0`). Hover on a link: Accent color + small arrow.
- Small chevron next to "Sectors"/"Services" that flips when the panel is open.
- The panel stays open for ~0.3s after the mouse leaves, so moving diagonally from the menu to a link doesn't close it.
  Also opens with the keyboard (Tab).
- Mobile/tablet menu (hamburger) is unchanged.
- 👉 **Full step-by-step (in Portuguese): [`COMO-FAZER-O-MEGA-MENU.md`](COMO-FAZER-O-MEGA-MENU.md).** Summary below.
- **Elementor — yes, this is native:** use the **Menu** widget (Elementor Pro, the newer one, not the legacy "Nav Menu"):
  1. Add the items Home, About Us, Sectors, Services, Blog, Contact.
  2. On "Sectors" and "Services": *Dropdown content* → **Mega Menu** → *Edit template*: a container with a Heading
     (the small Accent title) + a container in **3 columns** with the links (Icon List or Text Editor), bottom border 1px `#E6EDF0` on each item.
  3. Widget settings: *Content width* → **Full width** · *Open dropdown on* → **Hover** · *Animation* → Fade.
  4. Style the panel: white background, padding `30px 43px 40px`, shadow `0 26px 40px -14px rgba(41,77,93,.2)`.

### 6. Sector/service cards: "Find Out More" button
- Each card in both carousels now has a small **"Find Out More"** button at the bottom (Primary background, white text,
  12px/500, padding `10px 22px`, radius 4.8px; darker `#3A6272` when the card is hovered). Card height: **310px**.
- The **whole card is still the link**; the button is only a visual cue that the card is clickable.
- **Elementor:** in the Loop Item template (or Image Box), add a **Button** widget under the label, linking to the same page.

### 7. FAQ: new "simple list" style, on the Home **and** on About
- Reference: the client's screenshot (totalclean.co.uk). Light background `#F1F5F7`, centered H2, one column (max 1080px),
  question text (**17px**, mobile 15px, weight 400, Primary; Accent on hover), thin **"+"** on the right that turns into **"–"**,
  1px line `#D5DEE2` under each row. **Only one answer open at a time.**
- The 15 existing questions were **split, not duplicated** (same content on two pages hurts SEO):
  - **Home** (new section between the testimonials and Contact), title **"Cleaning Services Adelaide FAQs"**, 8 service questions:
    arrival time, how often, supplies, hourly rates, insurance, unlock/lock & alarm, contract, payment.
  - **About** (replaces the old 2 dark accordions), title "Frequently asked questions", 7 company questions:
    what "Invictus" means, staff turnover, same cleaner, training, vetting, smooth changeover, references
    + the "If you have any other questions…" text and "Get in Touch" button below the list.
- **Elementor:** **Accordion** widget (the nested one) → *Max items expanded: One* · *Default state: All collapsed* ·
  icon "+" / active icon "–" on the right · Title typography 17px/400 (mobile 15px), padding 21px 20px · Divider/border bottom 1px `#D5DEE2` per item ·
  container max width 1080px, centered. Section background `#F1F5F7`, padding `85px 0 95px`.

### 8. Home: "Why Adelaide Trusts Invictus Clean" band (replaces the values row)
- Reference: "Peace of Mind" (totalclean.co.uk). The **same 4 values** (Eco-friendly, Safe, Industry Expertise, Fair Pricing)
  moved out of the "Professional cleaners in Adelaide" block into their own band, right after it.
- Band: background **Primary**, padding `85px 0 95px`, white H2 + intro line (16px, 90% opacity):
  "No hidden fees, no surprises. What we quote is what you pay. We deliver what we promise." (copy from the Commercial Cleaning page).
- 4 **white** cards, radius 12px, padding `36px 22px 32px`, Primary text; icons now in Primary (`home-value-0X-*-dark.webp`).
- The small "Contact us for your free quote now! / Get in Touch" line under the old values was removed (the new quote band does that job).
- **Elementor:** Container (background Primary) + Heading + Text Editor + 4 **Icon Box** (image icon) in a 4-column container (2 on tablet, 1 on mobile).

### 9. Home: "Our Cleaning Process" (new, after Our Services)
- Reference: "Our ... Office Cleaning Process" (totalclean.co.uk). Background `#F1F5F7`, H2 + intro, **4 numbered steps**
  in the site's card style (2px Primary border, radius 8px, white). Number in a 52px Primary circle.
- Steps (copy adapted from the landing pages + FAQ): 1 Tell us about your space · 2 Free on-site assessment ·
  3 Custom quote within 24 hours · 4 A seamless start.
- **Elementor:** 4 **Icon Box** widgets — instead of an icon, use a Heading with the number styled as a circle
  (or Icon Box with a number icon). 4 columns → 2 on tablet → 1 on mobile.

### 10. Home: free quote band (new, right after the process)
- Reference: "Request a ... quote ... today" (totalclean.co.uk). Background photo `home-quote-cta-bg.webp`
  (own team photo, gloved hand + cloth) with a dark overlay `rgba(31,58,70,0.84)`; white text, centered.
- H2 "Get a Free, No-Obligation Cleaning Quote in Adelaide" + paragraph + checklist (peach circle with a Primary check):
  Free on-site assessment · Custom quote within 24 hours · No lock-in contracts · Seamless changeover if switching ·
  Direct line to management (all copied from the landing pages).
- White button "Request My Free Quote ›" → jumps to the contact form at the bottom of the Home (`#contact`).
- **Elementor:** Container with *Background: Classic (image)* + *Background Overlay* · Heading · Text Editor ·
  **Icon List** (icon: check in a circle, color Peach) · Button (white background, Primary text) linking to `#contact`.

---

## 1. Folder structure

```
Site-HTML/
├── index.html                  → Home
├── about.html                  → About Us
├── contact.html                → Contact
├── banking-and-finance.html    → SECTOR template (the other 12 sectors use the same layout)
├── builders-cleaning.html      → SERVICE template (the other 5 services use the same layout)
├── blog.html                   → Blog listing (Archive template)
├── blog-bank-cleaning-services-adelaide-security-hygiene.html → Blog post (Single Post template)
├── css/style.css               → one stylesheet for every page, organized by component/page
├── js/main.js                  → mobile menu + testimonial carousel (not needed in Elementor)
├── images/                     → optimized WebP images, same names as in wordpress-renomeadas/
└── GUIA-ELEMENTOR.md           → this file
```

Open any `.html` file in a browser to preview it. The menu links between pages work locally.

> **About the links:** locally, links point to files (`about.html`, `blog-….html`). In WordPress they become the
> real slugs (`/about`, `/blog/…`). Links to pages that haven't been built yet (other sectors/services, other posts)
> will show "file not found" locally; that's expected.

---

## 2. Recommended stack

| Item | Recommendation | Why |
|---|---|---|
| Theme | **Hello Elementor** | Blank theme with no CSS of its own to fight against |
| Builder | **Elementor Pro** | Theme Builder (header, footer, blog archive, single post), Form, Testimonial Carousel |
| SEO | Rank Math or Yoast | Title, meta description, OG, schema |
| Form (if you don't use Pro) | WPForms Lite or Contact Form 7 | |
| Redirects | Rank Math (built-in module) or the Redirection plugin | See section 9 |

---

## 3. Site Settings (do this first)

**Elementor → Site Settings**. Everything else inherits from here.

### Global Colors
| Name | Hex | Use |
|---|---|---|
| Primary | `#294D5D` | Text, headings, buttons, dark cards |
| Accent | `#D26D51` | Brand terracotta (header shadow) |
| Teal | `#48988F` | Footer |
| Peach | `#FAB981` | Brand light orange |
| Field border | `#8A9DA6` | Form field borders |
| White | `#FFFFFF` | |

### Global Fonts (Google Font: **Quicksand**)
| Style | Size (desktop / mobile) | Weight | Line height | Where |
|---|---|---|---|---|
| Body | 13.73px / 13px | 300 | 1.94 | All text |
| H1 (page title) | 67.3px / 44.4px | 500 | 1.317 | Hero titles on Home, About, Contact, sectors, services |
| H2 (sections) | 43.1px / 30.2px | 500 | 1.4 | "Our Sectors", "Frequently asked questions"… |
| Large Text | 20.64px / 17px | 700 | 40px | Dark card titles, "TRUSTED CLEANING…" |
| Testimonials title | 36px / 26px | 700 | 1.25 | "Real Feedback From Real People" |
| Blog card title | 38.4px / 27px | 500 | 1.15 | Titles on the blog listing |
| Post title | 38.4px / 29px | 700 | 1.15 | Title of each post |
| Post H2 | 31.2px / 22px | 700 | 1.2 | Subheadings inside posts |

Body letter spacing: `0.01em`.

### Buttons
- Background `#294D5D`, text white, **Quicksand 500, 13.73px**
- Padding: `19px 32px` · Border radius: `4.8px`
- Hover: opacity 0.8 (or background `#3a6272`)

### Form fields (applies to every form)
- Border **1px solid `#8A9DA6`**, **square corners** (radius 0), transparent background, height 39px, padding `5px 10px`
- Labels 13.73px/300; "First Name"/"Last Name" 12px; "(required)" 12px at 70% opacity
- Focus: border `#294D5D`

### Layout
- Content width: **1240px** (1440 minus 100px margin on each side)
- Breakpoints: keep Elementor's defaults (tablet 1024 / mobile 767). The CSS already uses them.

---

## 4. Header and Footer (Theme Builder)

### Header (`Templates → Theme Builder → Header`)
Container: full width, height **116px**, side padding **43px**, background white,
shadow `0 6px 24px rgba(210,109,81,.12)`, **Sticky: Top** (Pro → Motion Effects).

| Element | Widget | Details |
|---|---|---|
| Logo | Site Logo / Image | `global-logo.webp`, width 132px (mobile 52px) |
| Menu | Nav Menu | Quicksand 300, 13.73px, gap 33px, underline pointer on hover **and on the current page**. "Sectors" and "Services" have submenus (see the list in `index.html`) |
| Phones | Menu items or Text | Weight **700**, `tel:` links |
| Social | Social Icons | Instagram, Facebook, LinkedIn · color `#294D5D` · size 21px · gap 33px |
| CTA | Button | "Get a Quote" · 12px · padding `17px 28px` |

Mobile (≤1024px): hide phones/social/CTA and use the Nav Menu **dropdown** (hamburger), as on the live site.

### Footer (`Templates → Theme Builder → Footer`)
Container: min height **416px**, padding `47px 43px 48px`.
- **Background:** `global-footer-shape.webp`, *Cover*, *Center*.
- **Background overlay:** white at **15% opacity**. This matches the tone of the live site exactly.
- Mobile: background *Position: Bottom Left*, *Size: auto 100%*, height ~255px (or use the CSS in section 8).

| Element | Widget | Details |
|---|---|---|
| Tagline | Text Editor | 20.64px, line height 40px, right-aligned, max width 501px |
| Phones / email | Text Editor | Underlined links, phones in bold |
| White logo | Image | `global-logo-white.webp`, 160px, left, ~132px from the top |
| Copyright | Text Editor | 12px, italic, `#FCF9F9`, centered |

---

## 5. Reusable blocks (save them as Elementor templates)

These show up on more than one page. Build each one once and save it (**right-click → Save as Template**) so you can reuse it.

| Block | CSS class | Where | Settings |
|---|---|---|---|
| **Dark card** | `.ic-panel` | Home (values), About (vision/mission/values), sectors (2 cards) | Background `#294D5D`, radius 8px, white text, centered · title 20.64px/700 |
| **Contact form** | `.ic-form` | Home, Contact | See "Form fields" in section 3. Fields: First Name*, Last Name* (50/50), Company Name, Phone*, Email*, Message* · button centered ("Send" on the Home, "Submit" on Contact) · Actions After Submit: Email → `contact@invictusclean.com.au` |
| **Contact info** | `.ic-contact__info` | Home, Contact | Text Editor: intro + **Email** + **Phones** (Victor / Karla) with availability |

---

## 6. Page by page

> For every page: **Page Layout → Elementor Full Width** and use **Containers (Flexbox)**.

### 6.1 Home (`index.html` → `/`)

#### Hero: `.ic-hero`
- Container: padding `50px 0 55px` · 2 columns: **671px** | rest (gap 11px) · vertical align: center
- Left column:
  - **Heading H1**: "Commercial & Residential Cleaning Solutions"
  - Inner container with margin-left **114px**, max width **501px**:
    - Text Editor: "Reliable cleaning for Adelaide businesses and houses. Free on-site assessment."
    - Button "Get a Quote" → `/contact`, aligned **right**
- Right column: Image `home-hero.webp` (max 558px)
- **Mobile:** 1 column; text → button (left) → image; margin-left 0

#### About + Values: `.ic-about`
- Row 1: 2 columns **614px** | **558px** (gap 12px), padding-top 47px
  - Image `home-professional.webp` (ratio 614:357)
  - Right column **right-aligned**: H2 "Professional cleaners in Adelaide" + 2 paragraphs + "Read More" button → `/about`
  - **Mobile:** text first, then image, then button (centered)
- Row 2: 4 **Icon Box** widgets (dark card), each **246 × 300px**, gap 38px, centered, padding `50px 15px 30px`
  - Icon: image 40×40px (`home-value-0X-*.webp`) · title 20.64px/700 · text 13.73px
  - Tablet: 2 per row · Mobile: 1 per row
- Row 3 (centered): "Contact us for your free quote now!" + "Get in Touch" button → `/contact`

#### Our Sectors + Our Services: `.ic-cards-section`
- Padding `95px 0`. H2 centered.
- Grid: **3 columns of 276px**, gap **48px (vertical) × 122px (horizontal)**, centered.
- Each card = **Image Box** with the link on the whole box:
  - Border **2px solid #294D5D**, radius **8px**, height **233px**
  - Image **230×230px**, label 13.73px/300 at the bottom
  - Suggested hover: lift 4px + light shadow (already in the CSS)
- "Residential Homes" sits alone in the **middle column** of the last row.
- Services block: H2 "Our Services" + H3 "TRUSTED CLEANING SERVICES PROVIDER" (20.64px/700) + 3 centered paragraphs (max width 880px) + grid of 6 cards.
- Tablet: 2 columns · Mobile: 1 column

**Card links** (keep the same slugs in WordPress!):

| Sectors | Services |
|---|---|
| `/banking-and-finance` | `/builders-cleaning` |
| `/car-dealership-showroom` | `/upholstery-and-carpet-cleaning` |
| `/business-office` | `/deep-cleaning` |
| `/hospitality-accommodation` | `/exit-cleaning` |
| `/professional-practice` | `/window-cleaning` |
| `/healthcare-medical-centre` | `/carpark-and-facade-cleaning` |
| `/property-management` | |
| `/public-sector` | |
| `/retail-gym-and-leisure` | |
| `/school-education` | |
| `/tv-radio-film-studio` | |
| `/church-community-centre` | |
| `/residential-homes` | |

#### Testimonials: `.ic-testimonials`
- Padding `95px 0`. Title left-aligned, 43px from the edge.
- **Testimonial Carousel** (Pro) or **Loop Carousel**:
  - Slides **398px** wide, gap 60px, min height 250px, background `#294D5D`
  - Name: 22.37px/500 white · text: 12px/300 white
  - Arrows: 60px circles, background `rgba(41,77,93,.7)`, white arrow, **below** the carousel and centered
  - Pagination: none · Loop: yes
- The 10 testimonials (name + text) are in `index.html`.

#### Contact: `.ic-contact`
- Padding `58px 0`, side padding 140px · 2 columns **522px** | **575px**
- Left: H2 "Contact us" + **Contact info** block (section 5)
- Right: **Contact form** block (section 5), button "Send"

### 6.2 About (`about.html` → `/about`)

#### Hero + Vision/Mission/Values: `.ic-about-hero`
- Container padding-top 95px · 2 columns **558px** | **558px**, gap 68px
- Left column:
  - **H1** "About Invictus Clean Adelaide" + Text Editor (margin-top 24px)
  - 2 **dark cards** side by side ("Our Vision:", "Our Mission:"), each **246 × 219px**, gap 38px, padding 15px, margin-top 52px, shifted **42px** to the right
- Right column: Image `about-hero.webp` **558 × 430px** (cover), margin-top 41px
- Below, full width: **dark card "Our Values:"** **1156 × 300px** (margin-left 42px), padding 15px, with **4 columns** (216 / 216 / 273 / 216px, space-between): label in bold uppercase 13.73px + text
- **Mobile:** 1 column: title → image → Vision → Mission → Values (columns stacked)

#### Story: `.ic-about-story`
- Padding-top 36px · H2 centered "A New option in the local cleaning industry" · 3 **justified** paragraphs (margin-top 24px)

#### Marquee (scrolling band): `.ic-marquee`
- Band **69px** tall, background `#294D5D`, 43px from the page edges, margin-top 11px
- White text, 20.64px / 500, scrolling left continuously (40s per loop, pauses on hover)
- Elementor doesn't have this widget natively. Use an **HTML widget** with the markup from `about.html` (the `<div class="ic-marquee">…</div>` block) and paste the `.ic-marquee` CSS (section 8) into Custom CSS.

#### FAQ: `.ic-faq`
- Padding `51px 0 94px` · H2 centered + text + "Get in Touch" button → `/contact`
- **2 × Accordion widget** side by side, **444px** each, gap 11px, centered (8 questions left, 7 right)
  - Background `#294D5D`, radius 8px, padding `30px 13px 32px`
  - Title: 20.64px/300 white, padding `15px 0` · divider **1px white** between items (and above the first/below the last)
  - Icon: thin "+" 14px on the right; turns into "–" when open
  - Answer: 13.73px white · all start **closed**
- The 15 questions and answers are in `about.html`.
- **Mobile:** accordions stacked, title 15px

### 6.3 Contact (`contact.html` → `/contact`)
- Container padding `95px 0 96px` · 2 columns **550px** | **607px** (space-between)
- Left: **H1** "Contact us" (67.3px) + **Contact info** block. Here "Phones:" has a colon, and there's only one blank line between the intro and "Email"
- Right: **Contact form** block, button "**Submit**"
- **Mobile:** 1 column, form below the info

### 6.4 Sector template (`banking-and-finance.html` → `/banking-and-finance`)
The **13 sector pages** use this layout. Build one, **save it as a template** and just swap the text and the illustration for each one.

- **Hero** `.ic-page-hero--sector`: padding `95px 0 102px` · 2 columns **614px** | **614px**, gap 12px
  - Left: **H1** (3 lines) + 2 **justified** paragraphs, with a **blank line** between them (26.6px)
  - Button "Get in Touch" → `/contact`, below the text, aligned **right** with 35px margin on the right
  - Right: illustration `home-sector-XX-*.webp` at **450px**, centered in the column
- **Details** `.ic-page-details`: padding `95px 0 120px`
  - H2 centered (e.g. "Professional Cleaning Services") + 2 justified paragraphs (margin-top 25px)
  - **2 dark cards** side by side, **588 × 260px**, gap 94px, padding `24px 15px 15px`, title 20.64px/700
- **Mobile:** title → text → illustration (240px) → button (centered) → cards stacked

### 6.5 Service template (`builders-cleaning.html` → `/builders-cleaning`)
The **6 service pages** use this layout (it's the sector layout **mirrored**, with no cards).

- **Hero** `.ic-page-hero--service`: padding `95px 0 96px` · 2 columns **614px** | **614px**
  - Left: illustration `home-service-XX-*.webp` at **401px**, centered
  - Right, text **aligned right**: **H1** + 1 paragraph
  - Button "Get in Touch" below the text, on the **left** side of the column (34px from the edge)
- **Details** `.ic-page-details--service`: padding **176px** top and bottom · H2 centered + 3 justified paragraphs
- **Mobile:** title → text → illustration (240px) → button (centered)

### 6.6 Blog listing (`blog.html` → `/blog`)
In WordPress this page isn't built by hand: **Theme Builder → Archive** (or Posts Page) with the **Posts** / **Loop Grid** widget.
- Container padding `42px 41px 172px` (the grid runs almost edge to edge: 1358px)
- **3 columns**, gap **25px** horizontal / **50px** vertical, **9 posts per page**
- Each card:
  - Featured image with ratio **436:291** (3:2, cover)
  - Meta: date (`M/D/YY` format) • author, 13.73px/500, margin-top 19px
  - Title 38.4px/500, line height 1.15
  - "Read More" link 12px, underlined, margin-top 9px
- Pagination: "Older Posts ›" aligned right, 137px below the grid
- Tablet: 2 columns · Mobile: 1 column

### 6.7 Blog post (`blog-bank-cleaning-services-adelaide-security-hygiene.html` → `/blog/…`)
**Theme Builder → Single Post**. The text for each post goes into the normal WordPress editor.
- Content column **1015px** centered, padding `44px 0 86px`
- **Post Title** 38.4px/**700** · **Post Info** (date "May 1" • "Written By Victor Ribeiro"), 13.73px/500, margin-top 32px
- **Post Content**: margin-top 50px · paragraphs 13.73px · H2 31.2px/700 (margin `27px 0 13px`) · underlined links
- **Author**: name 12px, 43px below the text
- **Post Navigation**: next post only, aligned right, title 16.2px/500 + thin chevron (18×32px)
- The featured image **doesn't show inside the post** (on the live site it only appears on the listing and when shared)

---

## 7. Images: upload to the Media Library

Use the files in `Site-HTML/images/`: they have the **same names** as in `Documentos/Images/wordpress-renomeadas/`,
but they're already optimized (resized, and the Home icons cropped).
The **alt text** is already written in the HTML of each page (and in `INVENTARIO-IMAGENS.md`).

| File | Where |
|---|---|
| `global-logo.webp` · `global-logo-white.webp` · `global-favicon.webp` · `global-footer-shape.webp` | Header, footer, Site Identity |
| `home-hero.webp` · `home-professional.webp` | Home |
| `home-value-01…04-*.webp` (4) | Home values cards |
| `home-sector-01…13-*.webp` (13) | Home cards **and** the illustration on each sector page |
| `home-service-01…06-*.webp` (6) | Home cards **and** the illustration on each service page |
| `about-hero.webp` | About |
| `blog-*.webp` (6) + `commercial-gallery-01-gym.webp`, `commercial-gallery-03-open-plan-office.webp`, `adelaide-residential-gallery-01-kitchen.webp` | **Featured images** of the posts (see the table in `INVENTARIO-IMAGENS.md`) |

---

## 8. Global CSS (optional, speeds things up)

Paste these parts of `css/style.css` into **Site Settings → Custom CSS** and add the matching class under *Advanced → CSS Classes* on the widget:

| Class | What it does |
|---|---|
| `.ic-card` + `:hover` | Home cards lift on hover |
| `.ic-field input / textarea` | Boxed form fields (if the form widget doesn't allow all the settings) |
| `.ic-marquee` + `@keyframes ic-marquee` | About scrolling band |
| `.ic-accordion` | FAQ accordion look (thin +/– icon, white dividers) |
| `@media (max-width: 767px) .ic-footer::before` | Mobile footer shape |

---

## 9. SEO: don't lose your ranking during the migration

1. **Keep the same URLs.** Every slug has to exist in WordPress exactly as it is today. Blog posts: set **Settings → Permalinks** to `/blog/%postname%/`.
2. **Title and meta description** of each page (Rank Math/Yoast). They're copied from the live site into each HTML file's `<head>`:

| Page | Title |
|---|---|
| Home | Invictus Clean \| Commercial Cleaning Adelaide \| Office Cleaning |
| About | About Us \| Experience Reliable Cleaning Today |
| Contact | Contact \| Request Service Today |
| Banking and Finance | Banking and Finance \| Enhance Security and Cleanliness Today |
| Builder’s Cleaning | Builder’s Cleaning \| Request Expert Builder's Cleaning Today |
| Blog | Invictus Clean \| Commercial & Residential Cleaning Blog Adelaide |
| Bank post | Invictus Clean \| Bank Cleaning Services Adelaide |

3. **Schema LocalBusiness**: the ready-made JSON-LD is in the `<head>` of `index.html` (Rank Math → Local SEO fills it in automatically).
4. After switching the DNS, submit the new sitemap in Google Search Console.

---

## 10. What I improved compared to the original (the visual stayed the same)

| Item | Squarespace | This version |
|---|---|---|
| H1 | Home, About, Contact, sectors and services had **no H1** (the titles were H2), and the blog listing had **9 H1s** | Exactly **one H1 per page**: better for SEO |
| "Eco-friendly" card (Home) | Narrower and without rounded corners (a layout bug) | Same as the other 3 |
| Card grid (Home) | Off-center by ~30px | Centered |
| FAQ (About) | The right column started 17px higher than the left | Both aligned |
| "Cost-Efficiency" column (About) | 14px lower than the other 3 | Aligned |
| Images | Heavy PNGs | WebP with lazy loading |
| Alt text | Several were wrong ("Black background with…") | Descriptive alt text |
| "Sectors"/"Services" menu items | Opened the first sub-page | Scroll to the matching section on the Home |

If you want the Squarespace version exactly as it was on any of these points, it's a one-line CSS change.
