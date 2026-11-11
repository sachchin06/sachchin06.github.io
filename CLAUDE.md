# CLAUDE.md

Personal portfolio for Sachchithananthan Kaneswaran, built with Astro (static output) and deployed to GitHub Pages at https://sachchin06.github.io.

## Writing rules

- British English spelling (optimise, organisation, colour).
- No em dashes. Use commas, colons, full stops or brackets instead.
- No emoji.
- UI text (button labels, headings) must be plain and specific. Avoid words like "passionate", "leverage", "dynamic".
- Content in `/content` is used exactly as written. Do not invent, expand or reword experience, skills, dates or numbers.
- If content is missing or incomplete, show a visible TODO (the `Todo` component) and tell the owner.

## Project layout

- `content/`: all site text. `about.md`, `experience.md`, `skills.md`, `contact.md`, and `projects/<slug>.md`. Project images go in `content/projects/images/<slug>/`.
- `src/content.config.ts`: Zod schemas for every content file. A build fails if front matter does not match.
- `src/lib/content.ts`: helpers (sorting, tel links, CV file name).
- `src/components/`: one component per home page section, plus `ProjectCard`, `Gallery`, `TagList`, `Icon`, `Todo`.
- `src/pages/`: `index.astro` (single scrolling page), `projects/[slug].astro` (detail pages), `404.astro`.
- `src/styles/global.css`: colour tokens for light and dark themes, base styles.
- `public/`: favicon, Open Graph image, robots.txt, and the CV PDF (`sachchithananthan-kaneswaran-cv.pdf`) once added.
- `scripts/make-images.mjs`: regenerates favicon PNG/ICO and the Open Graph image from `content/about.md`.
- `scripts/contrast.mjs`: checks WCAG AA contrast for the colour tokens. Update it if colours change.

## Conventions

- Plain CSS, no UI framework. Keep JavaScript to the two small inline scripts (theme and mobile menu).
- One accent colour only (`--accent`), for links, buttons and small highlights.
- Every text/background pair must meet WCAG AA. Run `node scripts/contrast.mjs` after changing colours.
- Motion stays subtle and is switched off under `prefers-reduced-motion`.
- No analytics, no external font or script requests.

## Commands

- `npm run dev`: local dev server at http://localhost:4321
- `npm run build`: `astro check` (types and content schemas) then build to `dist/`
- `npm run preview`: serve the built site

Astro 7.4+ needs Node 22.22.0 or newer (some dependencies need at least 22.19). Local development and CI both use Node 22.

## Deployment

Pushing to `main` runs `.github/workflows/deploy.yml` (withastro/action), which builds and deploys to GitHub Pages. Settings > Pages > Source must be "GitHub Actions".
