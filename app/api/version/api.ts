import { BASE_URL, VERSION_ENDPOINT } from "./constants"
import type { ApiVersionResponse } from "./types"

/**
 * Fetches the application version from the API
 * @returns Promise resolving to the version response
 * @throws Error if the request fails
 */
export async function getApplicationVersion(): Promise<ApiVersionResponse> {
  const url = `${BASE_URL}${VERSION_ENDPOINT}`

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })

  if (!response.ok) {
    throw new Error(
      `Failed to fetch application version: ${response.status} ${response.statusText}`,
    )
  }

  const data: ApiVersionResponse = await response.json()

  return data
}
