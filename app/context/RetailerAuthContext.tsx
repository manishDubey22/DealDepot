import React, {
  createContext,
  FC,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"

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

export const RetailerAuthProvider: FC<PropsWithChildren<RetailerAuthProviderProps>> = ({
  children,
}) => {
  const [userAuth, setUserAuthState] = useState<UserAuth | null>(null)
  const [userRole, setUserRoleState] = useState<string | null>(null)
  const [isInitialized, setIsInitialized] = useState(false)

  // Initialize from AsyncStorage on mount
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const userInfoString = await AsyncStorage.getItem("userInfo")
        if (userInfoString) {
          const userInfo = JSON.parse(userInfoString)
          if (userInfo.role) {
            setUserRoleState(userInfo.role)
          }
          if (userInfo.authToken && userInfo.userId && userInfo.refreshToken) {
            setUserAuthState({
              accessToken: userInfo.authToken,
              userId: userInfo.userId,
              refreshToken: userInfo.refreshToken,
            })
          }
        }
      } catch (error) {
        console.error("Error initializing auth from AsyncStorage:", error)
      } finally {
        setIsInitialized(true)
      }
    }

    initializeAuth()
  }, [])

  // Persist userAuth to AsyncStorage when it changes
  useEffect(() => {
    if (!isInitialized) return

    const updateAsyncStorage = async () => {
      try {
        if (userAuth) {
          const userInfo = {
            role: userRole || "retailer",
            authToken: userAuth.accessToken,
            userId: userAuth.userId,
            refreshToken: userAuth.refreshToken,
          }
          await AsyncStorage.setItem("userInfo", JSON.stringify(userInfo))
        } else if (userAuth === null && userRole === null) {
          // Only clear if both are null (full logout)
          await AsyncStorage.removeItem("userInfo")
        }
      } catch (error) {
        console.error("Error updating AsyncStorage:", error)
      }
    }

    updateAsyncStorage()
  }, [userAuth, userRole, isInitialized])

  const setUserAuth = useCallback((auth: UserAuth | null) => {
    setUserAuthState(auth)
  }, [])

  const setUserRole = useCallback((role: string | null) => {
    setUserRoleState(role)
  }, [])

  const clearAuth = useCallback(async () => {
    setUserAuthState(null)
    setUserRoleState(null)
    try {
      await AsyncStorage.removeItem("userInfo")
    } catch (error) {
      console.error("Error clearing AsyncStorage:", error)
    }
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
