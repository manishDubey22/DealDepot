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

export interface RegisterRequest {
  name: string
  storeName: string
  email: string
  password: string
  number: string
  location: string
  city: string
  state: string
  zipCode: string
  peerGroup: string
  agreement: boolean
}

export interface RegisterResponse {
  status: boolean
  message: string
  data?: any
}

export interface RegisterErrorResponse {
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
