import { queryOptions, useQuery } from "@tanstack/react-query"

import { createQueryKeys } from "@/lib/react-query/keys"

import { getOrders } from "./api"
import { ORDERS_KEYS } from "./constants"
import type { GetOrdersParams } from "./types"

// Query Keys
export const ordersQueryKeys = createQueryKeys([...ORDERS_KEYS], {
  getOrders: (params: GetOrdersParams) => ({
    key: ["get-orders", params.retailerId],
    sub: {},
  }),
})

// Get Orders Query Options
export const getOrdersQueryOptions = (params: GetOrdersParams, options?: { enabled?: boolean }) => {
  return queryOptions({
    queryKey: ordersQueryKeys.getOrders(params).queryKey,
    queryFn: () => getOrders(params).then((response) => response.data),
    enabled: options?.enabled !== false && !!params.retailerId,
    staleTime: 30 * 1000, // 30 seconds
    gcTime: 5 * 60 * 1000, // 5 minutes
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  })
}

// Get Orders Query Hook
export const useGetOrdersQuery = (params: GetOrdersParams, options?: { enabled?: boolean }) => {
  return useQuery(getOrdersQueryOptions(params, options))
}
