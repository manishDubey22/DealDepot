import { api } from "@/lib/api-client"
import { getApiUrl } from "@/lib/api-config"

import { PRODUCT_ENDPOINTS, STATIC_PEERS_ENDPOINT } from "./constants"
import type {
  ApiRequestContext,
  CategoryListParams,
  CategoryListResponse,
  ProductsByNameAndCategoryParams,
  ProductsResponse,
  SearchProductsParams,
  StaticPeersResponse,
  SubCategoryListParams,
  SubCategoryListResponse,
} from "./types"

export const getStaticPeers = (
  _request: void, // No parameters needed, but keeping signature consistent
  context?: ApiRequestContext,
) => {
  const url = `${getApiUrl()}/${STATIC_PEERS_ENDPOINT}`
  return api.get<StaticPeersResponse>(url, { signal: context?.signal })
}

export const getSearchProducts = (params: SearchProductsParams) => {
  const url = `${getApiUrl()}/${PRODUCT_ENDPOINTS.SEARCH(params.retailerId, params.name)}`
  return api.get<ProductsResponse>(url)
}

export const getTrendingProducts = (retailerId: string) => {
  const url = `${getApiUrl()}/${PRODUCT_ENDPOINTS.TRENDING(retailerId)}`
  return api.get<ProductsResponse>(url)
}

export const getCategoryList = (params: CategoryListParams) => {
  const url = `${getApiUrl()}/${PRODUCT_ENDPOINTS.CATEGORY(params.retailerId)}`
  return api.get<CategoryListResponse>(url)
}

export const getSubCategoryList = (params: SubCategoryListParams) => {
  const url = `${getApiUrl()}/${PRODUCT_ENDPOINTS.SUB_CATEGORY(params.retailerId, params.category)}`
  return api.get<SubCategoryListResponse>(url)
}

export const getProductsByNameAndCategory = (params: ProductsByNameAndCategoryParams) => {
  const url = `${getApiUrl()}/${PRODUCT_ENDPOINTS.SEARCH_BY_CATEGORY(
    params.retailerId,
    params.category,
    params.subcategory,
  )}`
  return api.get<ProductsResponse>(url)
}
