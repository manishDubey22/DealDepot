export const STATIC_PEERS_ENDPOINT = "static/v1/peer-groups"

export const STATIC_PEERS_KEYS = ["product", "static-peers"] as const

export const PRODUCT_KEYS = ["product"] as const

export const PRODUCT_ENDPOINTS = {
  SEARCH: (retailerId: string, name: string) =>
    `retailer/${retailerId}/v1/products/search?name=${encodeURIComponent(name)}`,
  TRENDING: (retailerId: string) => `retailer/${retailerId}/v1/trending`,
  CATEGORY: (retailerId: string) => `retailer/${retailerId}/v1/category`,
  SUB_CATEGORY: (retailerId: string, category: string) =>
    `retailer/${retailerId}/v1/sub-category?category=${encodeURIComponent(category)}`,
  SEARCH_BY_CATEGORY: (retailerId: string, category: string, subcategory: string) =>
    `retailer/${retailerId}/v1/products/search?category=${encodeURIComponent(category)}&subcategory=${encodeURIComponent(subcategory)}`,
} as const
