import Axios, { AxiosError, InternalAxiosRequestConfig } from "axios"

import { load, remove, save } from "@/utils/storage"

import { getApiUrl } from "./api-config"
import { getToken, getRefreshToken } from "./authStorage"
import { STORAGE_KEY } from "./constants"

const getBaseURL = () => {
  return getApiUrl()
}

async function authRequestInterceptor(config: InternalAxiosRequestConfig) {
  if (config.headers) {
    config.headers.Accept = "application/json"

    // Check if this is an auth endpoint (don't add auth headers)
    const isAuthEndpoint =
      config.url?.includes("/login") ||
      config.url?.includes("/register") ||
      config.url?.includes("/verify") ||
      config.url?.includes("/reset-password") ||
      config.url?.includes("preauth")

    // Only add auth headers for non-auth endpoints
    if (!isAuthEndpoint) {
      const token = await getToken()
      const refreshToken = await getRefreshToken()

      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }

      if (refreshToken) {
        config.headers.refreshToken = refreshToken
      }
    }
  }
  return config
}

export const api = Axios.create({
  baseURL: getBaseURL(),
  timeout: 10000,
  headers: {
    Accept: "application/json",
  },
})

api.interceptors.request.use(authRequestInterceptor)

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean }

    // Keep 501 retry logic - appears idempotent (retries same request)
    if (error.response?.status === 501) {
      return api.request(originalRequest)
    }

    // Handle 401 Unauthorized - Token refresh
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        // Get refresh token from storage
        const userInfo = load<{
          role?: string
          authToken?: string
          accessToken?: string
          userId?: string
          refreshToken?: string
        }>(STORAGE_KEY.USER_INFO)

        if (!userInfo?.refreshToken) {
          throw new Error("No refresh token available")
        }

        // Call refresh endpoint
        const refreshResponse = await Axios.put(
          `${getApiUrl()}/v1/refresh`,
          { refreshToken: userInfo.refreshToken },
          {
            headers: {
              "Content-Type": "application/json",
            },
          },
        )

        if (refreshResponse?.data?.data) {
          // Update tokens in storage
          const updatedUserInfo = {
            ...userInfo,
            authToken: refreshResponse.data.data.accessToken,
            refreshToken: refreshResponse.data.data.refreshToken,
          }
          save(STORAGE_KEY.USER_INFO, updatedUserInfo)

          // Update Authorization header and retry original request
          originalRequest.headers = originalRequest.headers || {}
          originalRequest.headers.Authorization = `Bearer ${refreshResponse.data.data.accessToken}`
          originalRequest.headers.refreshToken = refreshResponse.data.data.refreshToken

          return api(originalRequest)
        }
      } catch (refreshError) {
        // Refresh failed - clear storage
        remove(STORAGE_KEY.USER_INFO)
        // Pass error to React Query consumers (they can handle navigation)
        return Promise.reject(refreshError)
      }
    }

    // Pass errors back to React Query consumers
    return Promise.reject(error)
  },
)
