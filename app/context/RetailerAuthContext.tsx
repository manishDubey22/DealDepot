import {
  createContext,
  FC,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react"

import { STORAGE_KEY } from "@/lib/constants"
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

export interface RetailerAuthProviderProps {}

function loadStoredUserInfo(): {
  userAuth: UserAuth | null
  userRole: string | null
} {
  try {
    const stored = load<{
      role?: string
      authToken?: string
      accessToken?: string
      userId?: string
      retailer_id?: string
      refreshToken?: string
    }>(STORAGE_KEY.USER_INFO)
    if (!stored) return { userAuth: null, userRole: null }

    const accessToken = stored.authToken ?? stored.accessToken
    const userId = stored.userId ?? stored.retailer_id
    if (!accessToken || !userId) return { userAuth: null, userRole: stored.role ?? null }

    if (!stored.refreshToken) {
      console.warn("[RetailerAuth] userInfo missing refreshToken; session restored without it.")
    }
    return {
      userAuth: {
        accessToken,
        userId,
        refreshToken: stored.refreshToken ?? "",
      },
      userRole: stored.role ?? null,
    }
  } catch {
    remove(STORAGE_KEY.USER_INFO)
    return { userAuth: null, userRole: null }
  }
}

export const RetailerAuthProvider: FC<PropsWithChildren<RetailerAuthProviderProps>> = ({
  children,
}) => {
  const { userAuth: initialAuth, userRole: initialRole } = loadStoredUserInfo()

  const [userAuth, setUserAuthState] = useState<UserAuth | null>(initialAuth)
  const [userRole, setUserRoleState] = useState<string | null>(initialRole)

  useEffect(() => {
    if (userAuth && userRole) {
      save(STORAGE_KEY.USER_INFO, {
        role: userRole,
        authToken: userAuth.accessToken,
        userId: userAuth.userId,
        refreshToken: userAuth.refreshToken || "",
      })
    } else if (!userAuth && !userRole) {
      remove(STORAGE_KEY.USER_INFO)
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
    remove(STORAGE_KEY.USER_INFO)
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
