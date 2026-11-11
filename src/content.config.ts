import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// All text lives in /content at the repo root. Each section file is its own
// one-entry collection so it gets a strict schema.

const nonEmpty = z.string().trim().min(1);

const about = defineCollection({
  loader: glob({ pattern: 'about.md', base: './content' }),
  schema: z.object({
    name: nonEmpty,
    headline: nonEmpty,
    tagline: nonEmpty,
    location: nonEmpty,
    workRights: z.string().optional(),
  }),
});

const experience = defineCollection({
  loader: glob({ pattern: 'experience.md', base: './content' }),
  schema: z.object({
    roles: z.array(
      z.object({
        company: nonEmpty,
        title: nonEmpty,
        type: nonEmpty,
        location: nonEmpty,
        period: nonEmpty,
        summary: nonEmpty,
        highlights: z.array(nonEmpty).default([]),
        // Project slugs, matching filenames in content/projects/
        projects: z.array(nonEmpty).default([]),
      }),
    ),
    education: z
      .array(
        z.object({
          degree: nonEmpty,
          institution: nonEmpty,
          location: nonEmpty,
          period: nonEmpty,
          result: z.string().optional(),
        }),
      )
      .default([]),
  }),
});

const skills = defineCollection({
  loader: glob({ pattern: 'skills.md', base: './content' }),
  schema: z.object({
    groups: z.array(
      z.object({
        name: nonEmpty,
        items: z.array(nonEmpty).min(1),
      }),
    ),
  }),
});

const contact = defineCollection({
  loader: glob({ pattern: 'contact.md', base: './content' }),
  schema: z.object({
    email: z.email(),
    phone: nonEmpty,
    linkedin: z.url(),
    github: z.url(),
    location: nonEmpty,
  }),
});

const projects = defineCollection({
  // The entry id is the filename without .md, e.g. "sso-server".
  loader: glob({ pattern: '*.md', base: './content/projects' }),
  schema: ({ image }) =>
    z.object({
      title: nonEmpty,
      company: nonEmpty,
      employment: nonEmpty,
      client: nonEmpty,
      role: nonEmpty,
      // May be empty, in which case the period is hidden.
      period: z.string().default(''),
      summary: nonEmpty,
      tags: z.array(nonEmpty).default([]),
      status: nonEmpty,
      links: z
        .object({
          live: z.url().optional(),
          repo: z.url().optional(),
        })
        .nullish()
        .transform((l) => l ?? {}),
      cover: image().optional(),
      coverAlt: z.string().optional(),
      screenshots: z
        .array(
          z.object({
            src: image(),
            alt: nonEmpty,
            caption: z.string().optional(),
          }),
        )
        .nullish()
        .transform((s) => s ?? []),
      featured: z.boolean().default(false),
      order: z.number().int(),
    })
    .refine((p) => !p.cover || (p.coverAlt && p.coverAlt.trim().length > 0), {
      message: 'coverAlt is required when cover is set',
      path: ['coverAlt'],
    }),
});

export const collections = { about, experience, skills, contact, projects };
