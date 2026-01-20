/**
 * Constants for the version API
 */

export const BASE_URL = "https://api.madrchecker.com/api/"

export const VERSION_ENDPOINT = "static/v1/get-version"

/**
 * Query key for React Query
 * Used for caching and invalidation
 */
export const API_VERSION_KEYS = ["version", "application"] as const
