import { useQuery } from "@tanstack/react-query"

import { getApplicationVersion } from "./api"
import { API_VERSION_KEYS, BASE_URL, VERSION_ENDPOINT } from "./constants"
import { getApplicationVersionQueryOptions } from "./query-options"
// import type { ApiResponseDetails, ApiVersionResponse } from "./types"

// Re-export types
export type { ApiResponseDetails, ApiVersionData, ApiVersionResponse } from "./types"

// Re-export constants
export { API_VERSION_KEYS, BASE_URL, VERSION_ENDPOINT }

// Re-export API function
export { getApplicationVersion }

// Re-export query options
export { getApplicationVersionQueryOptions }

/**
 * Custom hook for fetching application version
 * Returns the same interface as RTK Query hook for drop-in replacement
 *
 * @returns Object with version data and query state
 */
export function useGetApplicationVersion() {
  const query = useQuery(getApplicationVersionQueryOptions())

  return {
    data: query.data,
    isError: query.isError,
    isSuccess: query.isSuccess,
    isLoading: query.isLoading,
    error: query.error,
    isFetching: query.isFetching,
    refetch: query.refetch,
  }
}
