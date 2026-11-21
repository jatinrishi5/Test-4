# JRishiCPAs — website (Modern fintech design)

A responsive website for **JRishiCPAs**, an online Canadian tax and accounting firm founded by Jatin Rishi. This version is designed as a modern fintech product site: white, deep navy and electric blue, rounded product cards and soft gradients. It is a static site with plain HTML, CSS and a little vanilla JavaScript: no build step and no dependencies apart from Google Fonts.

Live site (GitHub Pages): <https://jatinrishi5.github.io/Test-4/>

## Viewing the site

**Locally:** open `index.html` in any modern browser, or serve the folder:

```bash
python3 -m http.server 8000
```

**GitHub Pages:** published from the `main` branch, `/ (root)` folder. Anything pushed to `main` is republished automatically.

## What's on the page

| Section | Notes |
| --- | --- |
| Header | Sticky glass header, mobile menu, "Book a free call" button |
| Hero | Centred headline, free-consultation call to action, and an illustrative "Your 2026 return" dashboard (progress tracker, estimated refund, documents, live CRA deadline countdown) that flattens as you scroll |
| Software | Scrolling strip of the accounting tools the firm works in |
| Features | Bento grid of services, each with a small product-style illustration |
| Service finder | Tap the situations that apply to see matching services, then book with them pre-filled |
| How it works | Four-step process |
| Meet your accountant | Founder quote and the firm's four promises on a dark band |
| Tax calendar | 2026 CRA deadlines with the next one highlighted, plus a personal/business document checklist |
| FAQ | Accordion |
| Book | 3-step booking form that lists the services to cover |

## Structure

```
index.html      All page sections
css/base.css    Shared layout, accessibility, accordion, checklist and form styles
css/styles.css  This design's look and layout
js/site.js      Menu, reveals, deadlines countdown, tabs, checklists, FAQ and booking form
js/fx.js        Dashboard scroll effect, card glow, greeting and the Service finder
images/         Founder photo and software logos
```

## Before going live

- The phone number and email are placeholders (`(555) 010-0000`, `hello@example.com`).
- Booking: set `BOOKING_URL` in `js/site.js` to your Calendly (or similar) link. Until then, finished requests open an email to `CONTACT_EMAIL`.
- The firm's promises (quote before work starts, client portal, hours) should be confirmed before launch.
- Update the CRA deadline list each tax year (`data-date` attributes in `index.html`).
