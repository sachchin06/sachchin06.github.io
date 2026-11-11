import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { getCollection, getEntry, type CollectionEntry } from 'astro:content';

type SingleCollection = 'about' | 'experience' | 'skills' | 'contact';

/** Loads a one-file collection such as content/about.md. */
export async function getSingle<C extends SingleCollection>(name: C): Promise<CollectionEntry<C>> {
  const entry = await getEntry(name, name);
  if (!entry) throw new Error(`Missing content file: content/${name}.md`);
  return entry as CollectionEntry<C>;
}

/**
 * Projects shown on the home page: only `featured: true`, sorted by `order`.
 * Every project still gets a detail page and can be linked from Experience.
 */
export async function getFeaturedProjects() {
  const projects = await getCollection('projects', (p) => p.data.featured);
  return projects.sort((a, b) => a.data.order - b.data.order);
}

/** "+44 7438 664432" -> "+447438664432" for tel: links. */
export function toTelHref(phone: string) {
  return `tel:${phone.replace(/[^\d+]/g, '')}`;
}

/** Shows a client line only when it adds information. */
export function showClient(client: string) {
  return client.trim().toLowerCase() !== 'not named';
}

// The CV button links here once the PDF is added to /public.
export const CV_FILE = 'sachchithananthan-kaneswaran-cv.pdf';
export const CV_PATH = `/${CV_FILE}`;
// Resolved from the project root, because this module is bundled at build time.
export const hasCv = () => existsSync(join(process.cwd(), 'public', CV_FILE));
