import { api } from "@/lib/api-client"
import { getApiUrl } from "@/lib/api-config"
import { userPaths } from "@/lib/paths"

import type {
  LoginApiResponse,
  LoginRequest,
  RegisterResponse,
  RegisterRequest,
  OTPVerifyRequest,
  OTPVerifyResponse,
  WhoAmIRequest,
  WhoAmIResponse,
} from "./types"

export const postLoginData = (request: LoginRequest) => {
  return api.post<LoginApiResponse>(`${getApiUrl()}/${userPaths.login()}`, request)
}

export function postRegisterData(request: RegisterRequest) {
  const url = `${getApiUrl()}/${userPaths.register()}`
  return api.post<RegisterResponse>(url, request)
}

export function postOtpVerify(request: OTPVerifyRequest) {
  const url = `${getApiUrl()}/${userPaths.verify()}`
  return api.post<OTPVerifyResponse>(url, request)
}

export const getWhoAmI = (request?: WhoAmIRequest) => {
  const url = `${getApiUrl()}/${userPaths.whoami()}`
  // POST request with userId in body if provided
  return api.post<WhoAmIResponse>(url, request?.userId ? { userId: request.userId } : {})
}
