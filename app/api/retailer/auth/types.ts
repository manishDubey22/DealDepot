export interface LoginRequest {
  email: string
  password: string
}

export interface LoginResponseData {
  accessToken: string
  refreshToken: string
  retailer_id: string
  isSubscribed: boolean
  peerGroup: string
}

export interface LoginApiResponse {
  status: boolean
  message: string
  data: LoginResponseData
}

export interface LoginErrorResponse {
  error?: {
    data?: {
      message?: string
    }
  }
  status?: string
}
