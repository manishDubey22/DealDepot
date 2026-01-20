import { queryOptions } from "@tanstack/react-query"

import { getApplicationVersion } from "./api"
import { API_VERSION_KEYS } from "./constants"
import type { ApiVersionResponse } from "./types"

/**
 * React Query options for the getApplicationVersion query
 * Configured with appropriate caching, retry, and stale time settings
 */
export const getApplicationVersionQueryOptions = () =>
  queryOptions<ApiVersionResponse, Error>({
    queryKey: API_VERSION_KEYS,
    queryFn: getApplicationVersion,
    staleTime: 300000, // 5 minutes - version doesn't change frequently
    gcTime: 600000, // 10 minutes (formerly cacheTime)
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000), // Exponential backoff: 1s, 2s, 4s, max 30s
  })
