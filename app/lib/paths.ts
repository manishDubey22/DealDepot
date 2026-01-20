import { API_VERSION } from "./constants"

export const retailerPaths = {
  root: (retailerId: string) => `/retailer/${retailerId}/${API_VERSION}`,

  product: (retailerId: string, productId: string) =>
    `/retailer/${retailerId}/${API_VERSION}/product/${productId}`,

  productSearch: (retailerId: string) => `/retailer/${retailerId}/${API_VERSION}/products/search`,

  cart: (retailerId: string) => `/retailer/${retailerId}/${API_VERSION}/cart`,

  placeOrder: (retailerId: string) => `/retailer/${retailerId}/${API_VERSION}/place-order`,

  order: (retailerId: string, orderId: string) =>
    `/retailer/${retailerId}/${API_VERSION}/order/${orderId}`,
}

//static paths
export const staticPaths = {
  getAppVersion: () => `/static/v1/get-version`,
}
