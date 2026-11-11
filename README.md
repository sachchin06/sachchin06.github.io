# sachchin06.github.io

Source for https://sachchin06.github.io, built with [Astro](https://astro.build) and deployed to GitHub Pages.

## Run locally

Requires Node.js 22.22 or newer.

```sh
npm install
npm run dev       # http://localhost:4321
npm run build     # type and content checks, then build to dist/
npm run preview   # serve the built site
```

## Edit content

All text lives in [`content/`](content/). Each file's front matter is validated at build time by [`src/content.config.ts`](src/content.config.ts), so a typo in a field name fails the build with a clear message.

| File | Shown in |
| --- | --- |
| `content/about.md` | Hero (front matter) and About (body) |
| `content/experience.md` | Experience timeline and Education |
| `content/skills.md` | Skills |
| `content/contact.md` | Contact |
| `content/projects/<slug>.md` | Project cards and `/projects/<slug>/` |

### Add a project

1. Copy an existing file in `content/projects/`, e.g. `sso-server.md`, to `content/projects/my-project.md`. The filename becomes the URL: `/projects/my-project/`.
2. Edit the front matter and body. Only projects with `featured: true` get a card on the home page, sorted by `order` (lower first). Every project gets a detail page either way, and can be linked from a role in Experience.
3. To link it from a role, add `"my-project"` to that role's `projects` list in `content/experience.md`.

### Add a cover image or screenshots

1. Put the images in `content/projects/images/<slug>/`, e.g. `content/projects/images/my-project/cover.png`.
2. In the project's front matter:

   ```yaml
   cover: ./images/my-project/cover.png
   coverAlt: "Admin dashboard listing invoices by status"
   screenshots:
     - src: ./images/my-project/invoice-detail.png
       alt: "Invoice detail page with payment history"
       caption: "Invoice detail"
   ```

   Paths are relative to the Markdown file. Astro converts images to AVIF and WebP at several sizes. The cover shows on the project card; screenshots show as a gallery on the detail page. Leave them out (or `screenshots: []`) and nothing is shown.

### Add the CV

Save the PDF as `public/sachchithananthan-kaneswaran-cv.pdf`. A CV button appears in the Hero on the next build. Until the file exists, no button is shown.
