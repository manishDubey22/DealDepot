import { queryOptions, useQuery } from "@tanstack/react-query"

import { createQueryKeys } from "@/lib/react-query/keys"

import { getStaticPeers } from "./api"
import { STATIC_PEERS_KEYS } from "./constants"

export const queryKeys = createQueryKeys([...STATIC_PEERS_KEYS], {
  getStaticPeers: () => ({
    key: [],
    sub: {
      byRequest: (_params?: void) => ({
        key: [],
      }),
    },
  }),
})

export const getStaticPeersQueryOptions = (_request?: void) => {
  return queryOptions({
    queryKey: queryKeys.getStaticPeers().sub.byRequest().key,
    async queryFn(context) {
      const response = await getStaticPeers(undefined, context)
      return response.data
    },
    // staleTime: 600000, // 10 minutes
    // gcTime: 1800000, // 30 minutes
    // retry: 2,
    // retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    // refetchOnMount: false,
  })
}

export function useStaticPeersQuery() {
  const query = useQuery(getStaticPeersQueryOptions())

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
