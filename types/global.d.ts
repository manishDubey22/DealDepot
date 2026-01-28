// Global type declarations for production builds

declare module "*.png" {
  const value: any
  export default value
}

declare module "*.jpg" {
  const value: any
  export default value
}

declare module "*.jpeg" {
  const value: any
  export default value
}

declare module "*.gif" {
  const value: any
  export default value
}

declare module "*.svg" {
  const value: any
  export default value
}

declare module "lodash/debounce" {
  const debounce: any
  export default debounce
}

// Extend global types
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: "development" | "production" | "test"
    }
  }
}

// Common interface extensions
interface IFormInput {
  [key: string]: any
}

interface IUserVerifyType {
  [key: string]: any
}

interface IOTPVerify {
  [key: string]: any
}

interface LoginResponse {
  [key: string]: any
}

interface AuthResponse {
  [key: string]: any
}

interface UpdateUserType {
  [key: string]: any
}

interface IPDfInfo {
  [key: string]: any
}

// Navigation types
declare module "@react-navigation/native" {
  export interface NavigationProp<ParamList, RouteName extends keyof ParamList = keyof ParamList> {
    navigate: (screen: any, params?: any) => void
  }
}

// Axios extensions
declare module "axios" {
  interface AxiosRequestConfig {
    contentType?: string
    refreshToken?: string
  }
}

export {}
