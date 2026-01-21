import {
  createContext,
  FC,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react"

import { load, save, remove } from "@/utils/storage"

export interface UserAuth {
  accessToken: string
  userId: string
  refreshToken: string
}

export interface RetailerAuthContextType {
  userAuth: UserAuth | null
  userRole: string | null
  setUserAuth: (auth: UserAuth | null) => void
  setUserRole: (role: string | null) => void
  clearAuth: () => void
}

export const RetailerAuthContext = createContext<RetailerAuthContextType | null>(null)

const USER_INFO_KEY = "userInfo"

export interface RetailerAuthProviderProps {}

export const RetailerAuthProvider: FC<PropsWithChildren<RetailerAuthProviderProps>> = ({
  children,
}) => {
  const storedUserInfo = load<{
    role?: string
    authToken?: string
    userId?: string
    refreshToken?: string
  }>(USER_INFO_KEY)

  const [userAuth, setUserAuthState] = useState<UserAuth | null>(
    storedUserInfo?.authToken && storedUserInfo?.userId && storedUserInfo?.refreshToken
      ? {
          accessToken: storedUserInfo.authToken,
          userId: storedUserInfo.userId,
          refreshToken: storedUserInfo.refreshToken,
        }
      : null,
  )

  const [userRole, setUserRoleState] = useState<string | null>(storedUserInfo?.role ?? null)

  useEffect(() => {
    if (userAuth && userRole) {
      save(USER_INFO_KEY, {
        role: userRole,
        authToken: userAuth.accessToken,
        userId: userAuth.userId,
        refreshToken: userAuth.refreshToken,
      })
    } else if (!userAuth && !userRole) {
      remove(USER_INFO_KEY)
    }
  }, [userAuth, userRole])

  const setUserAuth = useCallback((auth: UserAuth | null) => {
    setUserAuthState(auth)
  }, [])

  const setUserRole = useCallback((role: string | null) => {
    setUserRoleState(role)
  }, [])

  const clearAuth = useCallback(() => {
    setUserAuthState(null)
    setUserRoleState(null)
    remove(USER_INFO_KEY)
  }, [])

  const value: RetailerAuthContextType = {
    userAuth,
    userRole,
    setUserAuth,
    setUserRole,
    clearAuth,
  }

  return <RetailerAuthContext.Provider value={value}>{children}</RetailerAuthContext.Provider>
}

export const useRetailerAuth = () => {
  const context = useContext(RetailerAuthContext)
  if (!context) {
    throw new Error("useRetailerAuth must be used within a RetailerAuthProvider")
  }
  return context
}
