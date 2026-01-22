import { api } from "@/lib/api-client"
import { getApiUrl } from "@/lib/api-config"
import { userPaths } from "@/lib/paths"

import type { LoginApiResponse, LoginRequest, RegisterResponse, RegisterRequest } from "./types"

export const postLoginData = (request: LoginRequest) => {
  return api.post<LoginApiResponse>(`${getApiUrl()}/${userPaths.login()}`, request)
}

export function postRegisterData(request: RegisterRequest) {
  const url = `${getApiUrl()}/${userPaths.register()}`
  return api.post<RegisterResponse>(url, request)
}
