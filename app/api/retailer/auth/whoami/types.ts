export interface WhoAmIResponseData {
  isSubscribed: boolean
  peerGroup: string
  name: string
  email: string
  location: string
  number: string
  storeName?: string
  city?: string
  zipCode?: string
  _id?: string
  createdAt?: string
  role?: string
}

export interface WhoAmIResponse {
  data: WhoAmIResponseData
  message?: string
  status?: boolean
}

export interface WhoAmIErrorResponse {
  error?: {
    data?: {
      message?: string
    }
  }
  message?: string
  status?: boolean
  response?: {
    data?: {
      message?: string
    }
  }
}
