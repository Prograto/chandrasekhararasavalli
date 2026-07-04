import { useQuery } from "@tanstack/react-query";
import { fetchAllRepoStats } from "@/lib/github";

/**
 * Live GitHub stats for a set of repo slugs. Falls back to bundled data
 * (see src/data/projects.ts) automatically — this just returns `undefined`
 * per-slug on failure, and callers should treat that as "use the static
 * copy" rather than an error state.
 */
export function useGithubStats(slugs: string[]) {
  return useQuery({
    queryKey: ["github-stats", ...slugs].sort(),
    queryFn: () => fetchAllRepoStats(slugs),
    staleTime: 1000 * 60 * 30, // 30 min — GitHub stats don't change that fast
    retry: 1,
    enabled: slugs.length > 0,
  });
}
