import { api } from "@/lib/api-client"
import { getApiUrl } from "@/lib/api-config"
import { userPaths } from "@/lib/paths"

import type { WhoAmIResponse } from "./types"

export const getWhoAmI = () => {
  const url = `${getApiUrl()}/${userPaths.whoami()}`
  return api.get<WhoAmIResponse>(url)
}
