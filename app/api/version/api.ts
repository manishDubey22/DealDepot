import { api } from "@/lib/api-client"
import { getApiUrl } from "@/lib/api-config"
import { ENDPOINTS } from "@/lib/constants"

import type { ApiVersionResponse } from "./types"

export const getApplicationVersionApi = () => {
  return api.get<ApiVersionResponse>(`${getApiUrl()}/${ENDPOINTS.GET_VERSION}`)
}
