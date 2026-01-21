import {
  createContext,
  FC,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react"

import { getRole, load, remove, removeRole, save, setRole } from "@/utils/storage"

export interface RoleContextType {
  userRole: string | null
  setUserRole: (role: string | null) => void
  clearRole: () => void
  isLoading: boolean
}

export const RoleContext = createContext<RoleContextType | null>(null)

const USER_INFO_KEY = "userInfo"

export interface RoleProviderProps {}

export const RoleProvider: FC<PropsWithChildren<RoleProviderProps>> = ({ children }) => {
  const [userRole, setUserRoleState] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  // Initialize role on mount
  useEffect(() => {
    const initializeRole = () => {
      try {
        setIsLoading(true)

        // Try MMKV first (synchronous, fast)
        let role = getRole()

        // If not found in MMKV, check userInfo in MMKV for backward compatibility
        if (!role) {
          try {
            const userInfo = load<{
              role?: string
              authToken?: string
              userId?: string
              refreshToken?: string
            }>(USER_INFO_KEY)
            if (userInfo?.role) {
              role = userInfo.role
              // Migrate to dedicated role storage in MMKV
              setRole(role)
              // Remove role from userInfo (keep other data)
              const updatedUserInfo = { ...userInfo }
              delete updatedUserInfo.role
              if (Object.keys(updatedUserInfo).length > 0) {
                // Save updated userInfo back to MMKV
                save(USER_INFO_KEY, updatedUserInfo)
              } else {
                remove(USER_INFO_KEY)
              }
            }
          } catch (error) {
            console.error("Error reading role from userInfo:", error)
          }
        }

        setUserRoleState(role)
      } catch (error) {
        console.error("Error initializing role:", error)
      } finally {
        setIsLoading(false)
      }
    }

    initializeRole()
  }, [])

  const setUserRole = useCallback((role: string | null) => {
    setUserRoleState(role)
    setRole(role)

    // Optionally sync to userInfo in MMKV if it exists (for backward compatibility)
    try {
      const userInfo = load<{
        role?: string
        authToken?: string
        userId?: string
        refreshToken?: string
      }>(USER_INFO_KEY)
      if (userInfo) {
        if (role) {
          const updatedUserInfo = { ...userInfo, role }
          save(USER_INFO_KEY, updatedUserInfo)
        } else {
          const updatedUserInfo = { ...userInfo }
          delete updatedUserInfo.role
          if (Object.keys(updatedUserInfo).length > 0) {
            save(USER_INFO_KEY, updatedUserInfo)
          } else {
            remove(USER_INFO_KEY)
          }
        }
      }
    } catch (error) {
      console.error("Error syncing role to userInfo:", error)
    }
  }, [])

  const clearRole = useCallback(() => {
    setUserRoleState(null)
    removeRole()

    // Clear from userInfo in MMKV if exists
    try {
      const userInfo = load<{
        role?: string
        authToken?: string
        userId?: string
        refreshToken?: string
      }>(USER_INFO_KEY)
      if (userInfo) {
        const updatedUserInfo = { ...userInfo }
        delete updatedUserInfo.role
        if (Object.keys(updatedUserInfo).length > 0) {
          save(USER_INFO_KEY, updatedUserInfo)
        } else {
          remove(USER_INFO_KEY)
        }
      }
    } catch (error) {
      console.error("Error clearing role from userInfo:", error)
    }
  }, [])

  const value: RoleContextType = {
    userRole,
    setUserRole,
    clearRole,
    isLoading,
  }

  return <RoleContext.Provider value={value}>{children}</RoleContext.Provider>
}

export const useRole = () => {
  const context = useContext(RoleContext)
  if (!context) {
    throw new Error("useRole must be used within a RoleProvider")
  }
  return context
}
