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

// Product Types
export interface Product {
  product_id: string
  product_desc: string
  category_desc: string
  subCategory_desc?: string
  image_url?: string
  adminPrice?: {
    [peerGroup: string]: Array<{
      Date: string
      price: number
    }>
  }
}

// Request Types
export interface SearchProductsParams {
  name: string
  retailerId: string
}

export interface CategoryListParams {
  retailerId: string
}

export interface SubCategoryListParams {
  retailerId: string
  category: string
}

export interface ProductsByNameAndCategoryParams {
  retailerId: string
  name: string
  category: string
  subcategory: string
}

// Response Types
export interface ProductsResponse {
  data: Product[]
  message?: string
  status?: boolean
}

export interface CategoryListResponse {
  data: string[]
  message?: string
  status?: boolean
}

export interface SubCategoryListResponse {
  data: string[]
  message?: string
  status?: boolean
}

export interface ApiError {
  status?: number
  data?: {
    message?: string
  }
  message?: string
}
