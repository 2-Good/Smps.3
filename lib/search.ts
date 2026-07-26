import Fuse, { IFuseOptions } from "fuse.js";
import smpsData from "@/data/smps.json";

export interface SmpsMetadata {
  canonicalUrl: string | null;
  title: string | null;
  description: string | null;
  author: string | null;
  keywords: string | null;
  languageCode: string | null;
}

export interface SmpsEntry {
  url: string;
  metadata: SmpsMetadata;
  text: string;
  markdown: string;
}

const typedData = smpsData as unknown as SmpsEntry[];

const fuseOptions: IFuseOptions<SmpsEntry> = {
  keys: [
    { name: "metadata.title", weight: 0.5 },
    { name: "text", weight: 0.25 },
    { name: "url", weight: 0.15 },
    { name: "markdown", weight: 0.1 },
  ],
  includeScore: true,
  threshold: 0.35,
  ignoreLocation: true,
  minMatchCharLength: 2,
};

const fuse = new Fuse<SmpsEntry>(typedData, fuseOptions);

const MAX_RESULTS = 5;

/**
 * Normalizes a raw query string: lowercases, trims, and collapses
 * repeated whitespace into single spaces.
 */
function normalizeQuery(query: string): string {
  return query.toLowerCase().trim().replace(/\s+/g, " ");
}

export function searchDocs(query: string): SmpsEntry[] {
  const normalized = normalizeQuery(query);

  if (normalized.length === 0) {
    return [];
  }

  const results = fuse.search(normalized, { limit: MAX_RESULTS * 3 });

  const seenUrls = new Set<string>();
  const deduped: SmpsEntry[] = [];

  for (const result of results) {
    const { url } = result.item;
    if (seenUrls.has(url)) {
      continue;
    }
    seenUrls.add(url);
    deduped.push(result.item);

    if (deduped.length === MAX_RESULTS) {
      break;
    }
  }

  return deduped;
}
