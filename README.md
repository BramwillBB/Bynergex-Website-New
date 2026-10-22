# bynergex.com

The Bynergex Consulting site: a single page with a scroll-scrubbed hero film,
live warm-dust particles over it, and the assurance and SSEG commissioning
content from `copy/brand-kit.md`.

## Run and build

```bash
npm install
npm run dev                    # http://localhost:5173
npm run build                  # static build in dist/, served from the domain root
npx vite preview               # check the build over HTTP (never open dist/ via file://)
```

## Pages

- `/` (`index.html`): the film story, Energy Loss Audit, efficiency first,
  assurance, SSEG, about, FAQ, enquiry
- `/energy-audit/`, `/sseg-commissioning/`, `/electrical-compliance-assurance/`:
  one search landing page per service, each with its own title, description,
  canonical URL, FAQ and JSON-LD (Service, BreadcrumbList, FAQPage)
- `/blog/` and `/blog/<slug>/`: the blog index and articles. A new article is a
  new `blog/<slug>/index.html` (copy the first one: BlogPosting, BreadcrumbList
  and FAQPage JSON-LD), plus a card on `blog/index.html`, a `blogPost` entry in
  its JSON-LD, a line in `vite.config.js` and a URL in `public/sitemap.xml`.
- `vite.config.js` lists every page for the build. Navigation, enquiry form
  and footer are repeated in each page, so change them in all four.
- `public/robots.txt`, `public/sitemap.xml` (update `lastmod` when pages change)
  and `public/.htaccess` (301s from the old React site's URLs, plus Hostinger's
  own `.builds` rule, which must stay)
- If an FAQ answer changes, change the matching JSON-LD `FAQPage` text in the
  same file so they stay identical.

## Blog downloads, ratings and questions

- `public/api/lead.php`: A download form at the end of each post. It emails the
  reader the companion PDF and the article PDF, emails the lead to
  consultant@bynergex.com, and appends it to `leads.csv` in the private folder.
- `public/api/comments.php`: Ratings (one per visitor per post) and "Ask the
  engineer" questions. A new question emails Bramwill a signed link to publish
  it (with an answer, which is also emailed to the reader) or delete it.
- `public/api/_lib.php`: Shared helpers and the `POSTS` list. Add every new post
  there with its download files.
- Private data (questions, ratings, leads, the signing secret) lives in
  `bynergex-private/` beside `public_html` on Hostinger, so deploys never touch it.
- PDFs live in `public/downloads/` with random filename suffixes, are
  `noindex`, and are excluded in `robots.txt`. Their sources and the Chrome
  render script are in `copy/pdf-source/`.
- `/privacy/`: The POPIA privacy policy, linked from every footer and form.

## Going live

bynergex.com builds automatically from GitHub `BramwillBB/Bynergex-Website-New`,
branch `main`. Copy this folder's files (not `node_modules` or `dist`) into the
repo and push to main; Hostinger builds and publishes in under a minute.

## Where things live

- `index.html`: all copy and sections
- `src/style.css`: brand tokens (navy, Bynergex orange, Outfit and Inter) and layout
- `src/main.js`: smooth scroll, the film scrub (story section only), beat fades,
  the evidence line, reveals, SSEG tabs, the enquiry form
- `src/atmosphere.js` and `src/particles.js`: the WebGL dust and sparks layer
- `public/film.mp4`: the hero film, re-encoded for scrubbing (loaded as a Blob so
  it scrubs on hosts without HTTP Range support). Phones and reduced-motion
  visitors get the poster `public/img/hero.jpg` instead and never download it.
- `public/img/`: poster, world, doorway (a frame from the film), copper macro,
  the original and reversed logo, the social share image

## Where a visitor's message goes

The enquiry form posts to `public/api/enquiry.php` on Hostinger, which emails
it straight to **consultant@bynergex.com** through Hostinger's own mail server
(the domain's MX and SPF records are Hostinger's, so no password is stored in
the code). Reply-To is set to the visitor, so replying answers them directly.
Spam protection: a hidden "website" field, a 3-second minimum fill time and at
most 5 enquiries per visitor per hour. If sending fails, the visitor is shown
the email address and phone number instead. Nothing is stored on the site.
The PHP file only runs on Hostinger; in `npm run dev` the form shows its
fallback message.

## Contact details on the site

consultant@bynergex.com, +27 66 252 2655, and
https://www.linkedin.com/in/bramwillbruinders (footer, About, enquiry section).
The copy speaks as "we"; the About section introduces Bramwill Bruinders,
Pr. Tech. Eng., as principal.
