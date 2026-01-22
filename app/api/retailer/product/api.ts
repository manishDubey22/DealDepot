import { api } from "@/lib/api-client"
import { getApiUrl } from "@/lib/api-config"

import { STATIC_PEERS_ENDPOINT } from "./constants"
import type { ApiRequestContext, StaticPeersResponse } from "./types"

export const getStaticPeers = (
  _request: void, // No parameters needed, but keeping signature consistent
  context?: ApiRequestContext,
) => {
  const url = `${getApiUrl()}/${STATIC_PEERS_ENDPOINT}`
  return api.get<StaticPeersResponse>(url, { signal: context?.signal })
}
