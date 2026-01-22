export interface StaticPeersRequest {
  // Empty interface since this is a void query
}

export interface StaticPeersResponse {
  data: string[]
}

export interface StaticPeersErrorResponse {
  error?: {
    data?: {
      message?: string
    }
  }
  message?: string
  response?: {
    data?: {
      message?: string
    }
  }
}

export interface ApiRequestContext {
  signal?: AbortSignal
}
