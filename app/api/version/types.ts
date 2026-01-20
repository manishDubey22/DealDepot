/**
 * Type definitions for the version API
 */

export interface ApiVersionData {
  current_version: string
  force_update: boolean
  id?: number
  name?: string
}

export interface ApiVersionResponse {
  data: ApiVersionData
}

/**
 * Response details interface used in VersionContext
 */
export interface ApiResponseDetails {
  id: number
  name: string
}
