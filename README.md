# bynergex.com

The Bynergex Consulting site: a single page with a scroll-scrubbed hero film,
live warm-dust particles over it, and the assurance and SSEG commissioning
content from `copy/brand-kit.md`.

## Run and build

```bash
npm install
npm run dev                    # http://localhost:5173
npm run build -- --base=./     # portable static build in dist/
npx vite preview               # check the build over HTTP (never open dist/ via file://)
```

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

The enquiry form does not send anything itself. On submit it checks the
required fields, then opens the visitor's own email app with a message to
**consultant@bynergex.com**, pre-filled with the service, project stage,
pending decision and their details. Nothing is stored on the site.

## Contact details on the site

consultant@bynergex.com, +27 66 252 2655, and
https://www.linkedin.com/in/bramwillbruinders (footer, About, enquiry section).
The copy speaks as "we"; the About section introduces Bramwill Bruinders,
Pr. Tech. Eng., as principal.
