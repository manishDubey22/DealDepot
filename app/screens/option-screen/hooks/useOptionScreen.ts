import { useCallback } from "react"

import { useAppDispatch } from "@/store"
import { updateUserRoleAction } from "@/store/auth/authSlice"
import { RoleType } from "@/utils/role"

export interface UseOptionScreenReturn {
  handleOptionPress: (selectedValue: string) => Promise<void>
}

export const useOptionScreen = (): UseOptionScreenReturn => {
  const dispatch = useAppDispatch()

  const handleOptionPress = useCallback(
    async (selectedValue: string) => {
      dispatch(updateUserRoleAction(selectedValue as RoleType))
      // Navigation to appropriate stack will be handled by parent navigation logic based on Redux state
    },
    [dispatch],
  )

  return {
    handleOptionPress,
  }
}
