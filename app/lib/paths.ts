import {
  API_RETAILER_VERSION,
  API_STATIC_VERSION,
  API_USER_VERSION,
  API_VERSION,
} from "./constants"

export const retailerPaths = {
  root: (retailerId: string) => `/${API_RETAILER_VERSION}/${retailerId}/${API_VERSION}`,

  product: (retailerId: string, productId: string) =>
    `/${API_RETAILER_VERSION}/${retailerId}/${API_VERSION}/product/${productId}`,

  productSearch: (retailerId: string) =>
    `/${API_RETAILER_VERSION}/${retailerId}/${API_VERSION}/products/search`,

  cart: (retailerId: string) => `/${API_RETAILER_VERSION}/${retailerId}/${API_VERSION}/cart`,

  placeOrder: (retailerId: string) =>
    `/${API_RETAILER_VERSION}/${retailerId}/${API_VERSION}/place-order`,

  order: (retailerId: string, orderId: string) =>
    `/${API_RETAILER_VERSION}/${retailerId}/${API_VERSION}/order/${orderId}`,
}

//static paths
export const staticPaths = {
  getAppVersion: () => `/${API_STATIC_VERSION}/${API_VERSION}/get-version`,
}

export const userPaths = {
  login: () => `${API_USER_VERSION}/${API_VERSION}/${API_RETAILER_VERSION}/login`,
  register: () => `${API_USER_VERSION}/${API_VERSION}/${API_RETAILER_VERSION}/register`,
  verify: () => `${API_USER_VERSION}/${API_VERSION}/${API_RETAILER_VERSION}/verify`,
  whoami: () => `${API_VERSION}/whoami`,
}
