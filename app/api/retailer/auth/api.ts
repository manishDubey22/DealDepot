import { api } from "@/lib/api-client"
import { getApiUrl } from "@/lib/api-config"
import { userPaths } from "@/lib/paths"

import { BASE_URL, LOGIN_ENDPOINT } from "./constants"
import type { LoginApiResponse, LoginRequest } from "./types"

export async function postLoginDatat(request: LoginRequest): Promise<{ data: LoginApiResponse }> {
  const url = `${BASE_URL}${LOGIN_ENDPOINT}`

  const response = await api.post<{ data: LoginApiResponse }>(url, request, {
    headers: {
      "Content-Type": "application/json",
    },
  })

  return response.data
}

export const postLoginData = (request: LoginRequest) => {
  return api.post<LoginApiResponse>(`${getApiUrl()}/${userPaths.login()}`, request)
}
