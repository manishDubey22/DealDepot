import Axios, { InternalAxiosRequestConfig } from "axios"

import { getApiUrl } from "./api-config"
import { getToken } from "./authStorage"

const getBaseURL = () => {
  return getApiUrl()
}

async function authRequestInterceptor(config: InternalAxiosRequestConfig) {
  if (config.headers) {
    config.headers.Accept = "application/json"

    // Skip auth for preauth endpoints
    if (!config.url?.includes("preauth")) {
      const token = await getToken()
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
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
  (error) => {
    // Keep 501 retry logic - appears idempotent (retries same request)
    if (error.response?.status === 501) {
      return api.request(error.config)
    }

    // Pass errors back to React Query consumers
    return Promise.reject(error)
  },
)
