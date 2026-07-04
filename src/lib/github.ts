import type { GithubRepoStats } from "@/types";

const GITHUB_USER = "Prograto";

/**
 * Calls the public GitHub REST API directly from the browser (it's CORS-
 * enabled and needs no auth for public data). Unauthenticated requests are
 * capped at 60/hour per IP, which is why results are cached client-side via
 * React Query rather than re-fetched on every render.
 */
async function fetchRepoStats(slug: string): Promise<GithubRepoStats | null> {
  try {
    const res = await fetch(`https://api.github.com/repos/${GITHUB_USER}/${slug}`, {
      headers: { Accept: "application/vnd.github+json" },
    });
    if (!res.ok) return null;
    const data = await res.json();
    return {
      stars: data.stargazers_count ?? 0,
      forks: data.forks_count ?? 0,
      language: data.language ?? null,
      updatedAt: data.pushed_at ?? data.updated_at ?? "",
      url: data.html_url ?? `https://github.com/${GITHUB_USER}/${slug}`,
    };
  } catch {
    return null;
  }
}

export async function fetchAllRepoStats(
  slugs: string[],
): Promise<Record<string, GithubRepoStats | null>> {
  const entries = await Promise.all(
    slugs.map(async (slug) => [slug, await fetchRepoStats(slug)] as const),
  );
  return Object.fromEntries(entries);
}
