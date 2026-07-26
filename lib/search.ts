import Fuse, { IFuseOptions } from "fuse.js";
import smpsData from "@/data/smps.json";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

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

// ---------------------------------------------------------------------------
// Stop words
//
// These are stripped out before keyword-based search so that question words
// ("who", "what", "how"), articles, and generic filler ("tell", "about",
// "school") don't dilute the match against Fuse's fuzzy scoring. The list
// includes everything requested, plus a few common companions (e.g. "many",
// "there", "does", "much") that show up in the same kinds of questions
// ("how many teachers are there?") and would otherwise pollute keywords.
// ---------------------------------------------------------------------------

const STOP_WORDS = new Set([
  "who",
  "what",
  "where",
  "when",
  "why",
  "how",
  "is",
  "are",
  "the",
  "a",
  "an",
  "of",
  "for",
  "tell",
  "about",
  "please",
  "school",
  "name",
  // extra companions that commonly appear alongside the requested list
  "many",
  "much",
  "there",
  "does",
  "do",
  "can",
  "you",
  "me",
  "in",
  "at",
  "to",
]);

// ---------------------------------------------------------------------------
// Fuse configuration
// ---------------------------------------------------------------------------

const SEARCH_KEYS: IFuseOptions<SmpsEntry>["keys"] = [
  { name: "metadata.title", weight: 0.5 },
  { name: "text", weight: 0.25 },
  { name: "markdown", weight: 0.15 },
  { name: "url", weight: 0.1 },
];

const fuseOptions: IFuseOptions<SmpsEntry> = {
  keys: SEARCH_KEYS,
  includeScore: true,
  threshold: 0.4,
  ignoreLocation: true,
  minMatchCharLength: 2,
};

const fuse = new Fuse<SmpsEntry>(typedData, fuseOptions);

const MAX_RESULTS = 5;

// ---------------------------------------------------------------------------
// Query helpers
// ---------------------------------------------------------------------------

/**
 * Normalizes a raw query string: lowercases, trims, and collapses
 * repeated whitespace into single spaces.
 */
function normalizeQuery(query: string): string {
  return query.toLowerCase().trim().replace(/\s+/g, " ");
}

/**
 * Extracts meaningful keywords from a natural-language question by
 * stripping punctuation, splitting on whitespace, and removing stop
 * words and very short tokens (1 character).
 *
 * e.g. "Who is the principal?" -> ["principal"]
 * e.g. "How many teachers are there?" -> ["teachers"]
 */
function extractKeywords(normalized: string): string[] {
  return normalized
    .replace(/[^\w\s]/g, " ") // strip punctuation like "?", ",", "."
    .split(/\s+/)
    .filter((word) => word.length > 1 && !STOP_WORDS.has(word));
}

/**
 * Builds a single lowercase haystack per document (title + text + markdown
 * + url) for cheap exact-substring matching.
 */
function buildHaystack(doc: SmpsEntry): string {
  return [doc.metadata.title ?? "", doc.text, doc.markdown, doc.url]
    .join(" ")
    .toLowerCase();
}

// ---------------------------------------------------------------------------
// Main search
// ---------------------------------------------------------------------------

/**
 * Searches the SMPS knowledge base for documents relevant to a natural
 * language query.
 *
 * Search runs in three tiers, in priority order, so that the most
 * confident matches always outrank fuzzy guesses:
 *
 *   1. Exact substring match — the full normalized query, or any
 *      extracted keyword, appears verbatim inside a document's
 *      title/text/markdown/url. These are the highest-confidence hits.
 *   2. Full query Fuse search — fuzzy match against the whole question
 *      as typed (handles typos and near-matches on the full phrase).
 *   3. Individual keyword Fuse search — fuzzy match run per extracted
 *      keyword, so a single strong keyword (e.g. "principal") can surface
 *      a document even if the rest of the sentence doesn't match well.
 *
 * Results are merged in that order, deduplicated by URL, and capped at
 * the top 5 documents.
 */
export function searchDocs(query: string): SmpsEntry[] {
  const normalized = normalizeQuery(query);

  if (normalized.length === 0) {
    return [];
  }

  const keywords = extractKeywords(normalized);
  const seenUrls = new Set<string>();
  const ranked: SmpsEntry[] = [];

  const addDoc = (doc: SmpsEntry) => {
    if (seenUrls.has(doc.url)) return;
    seenUrls.add(doc.url);
    ranked.push(doc);
  };

  // --- Tier 1: exact substring match (full query, then each keyword) -------
  const exactTerms = [normalized, ...keywords];
  for (const doc of typedData) {
    if (ranked.length >= MAX_RESULTS) break;
    const haystack = buildHaystack(doc);
    const isExactMatch = exactTerms.some(
      (term) => term.length > 1 && haystack.includes(term)
    );
    if (isExactMatch) {
      addDoc(doc);
    }
  }

  // --- Tier 2: full query fuzzy match ---------------------------------------
  if (ranked.length < MAX_RESULTS) {
    const fullQueryResults = fuse.search(normalized, {
      limit: MAX_RESULTS * 3,
    });
    for (const result of fullQueryResults) {
      if (ranked.length >= MAX_RESULTS) break;
      addDoc(result.item);
    }
  }

  // --- Tier 3: individual keyword fuzzy match -------------------------------
  if (ranked.length < MAX_RESULTS && keywords.length > 0) {
    for (const keyword of keywords) {
      if (ranked.length >= MAX_RESULTS) break;
      const keywordResults = fuse.search(keyword, { limit: MAX_RESULTS });
      for (const result of keywordResults) {
        if (ranked.length >= MAX_RESULTS) break;
        addDoc(result.item);
      }
    }
  }

  return ranked.slice(0, MAX_RESULTS);
}
