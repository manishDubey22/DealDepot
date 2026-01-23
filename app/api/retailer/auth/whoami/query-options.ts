import { queryOptions, useQuery } from "@tanstack/react-query"

import { createQueryKeys } from "@/lib/react-query/keys"

import { getWhoAmI } from "./api"
import { WHOAMI_KEYS } from "./constants"

export const queryKeys = createQueryKeys([...WHOAMI_KEYS], {
  whoami: () => ({
    key: [],
    sub: {
      byRequest: (_params?: void) => ({
        key: [],
      }),
    },
  }),
})

export const getWhoAmIQueryOptions = (_request?: void) => {
  return queryOptions({
    queryKey: queryKeys.whoami().sub.byRequest().key,
    async queryFn() {
      const response = await getWhoAmI()
      return response.data
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  })
}

export function useWhoAmIQuery() {
  const query = useQuery(getWhoAmIQueryOptions())

  // Map status to match RTK Query behavior
  const status = query.isPending ? "pending" : query.isError ? "rejected" : "fulfilled"

  return {
    data: query.data,
    error: query.error,
    status,
    isLoading: query.isLoading,
    isError: query.isError,
    isSuccess: query.isSuccess,
    refetch: query.refetch,
  }
}
