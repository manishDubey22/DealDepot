import Config from "@/config"

export const getApiUrl = () => {
  const currentURL = window.location.href
  const isLocalHost = currentURL.includes("localhost")
  return isLocalHost ? `${Config.BASE}` : `${Config.API_URL}`
}

export const buildQueryParams = (params: Record<string, string | number | undefined>) => {
  const query = Object.entries(params)
    .filter(([, value]) => value !== undefined)
    .map(([key, value]) => `${key}=${encodeURIComponent(String(value))}`)
    .join("&")

  return query ? `?${query}` : ""
}
