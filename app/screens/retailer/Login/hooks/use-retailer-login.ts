import { useCallback, useState } from "react"
import { yupResolver } from "@hookform/resolvers/yup"
import {
  useForm,
  type Control,
  type FieldErrors,
  type UseFormHandleSubmit,
  type UseFormReset,
} from "react-hook-form"
import { Toast } from "react-native-toast-message/lib/src/Toast"

import { authMutationOptions } from "@/api/retailer/auth"
import { useRetailerAuth } from "@/context/RetailerAuthContext"
import { useRole } from "@/context/RoleContext"
import { RetailerRoutes } from "@/navigators/retailer/routes"
import { loginSchema } from "@/utils/schema/login-schema"
import { save } from "@/utils/storage"

import {
  CONSOLE_MESSAGES,
  ERROR_MESSAGES,
  MODAL_INITIAL_STATE,
  STORAGE_KEYS,
} from "../lib/constants"
import type { IFormInput, IShowModalType } from "../lib/types"

export interface UseRetailerLoginReturn {
  // Form management
  control: Control<IFormInput>
  handleSubmit: UseFormHandleSubmit<IFormInput>
  errors: FieldErrors<IFormInput>
  reset: UseFormReset<IFormInput>

  // Loading state
  isLoading: boolean

  // Password visibility
  isShowPassword: boolean
  handleTogglePassword: () => void

  // Submit handler
  onSubmit: (data: IFormInput) => Promise<void>

  // Navigation handlers
  handleNavigateToResetPassword: () => void
  handleNavigateToCreateAccount: () => void
  handleBackToOption: () => void

  // Modal state (for potential future use)
  showModal: IShowModalType
  setShowModal: React.Dispatch<React.SetStateAction<IShowModalType>>
}

export function useRetailerLogin(navigation: any): UseRetailerLoginReturn {
  const [showModal, setShowModal] = useState<IShowModalType>(MODAL_INITIAL_STATE)
  const [isShowPassword, setIsShowPassword] = useState(true)

  const { mutateAsync: handleLoginPress, isPending: isLoading } =
    authMutationOptions.useLoginMutation()
  const { setUserAuth } = useRetailerAuth()
  const { clearRole } = useRole()

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IFormInput>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: "7z47vigy9y@elatter.com",
      password: "Java@123",
    },
  })

  const handleTogglePassword = useCallback(() => {
    setIsShowPassword((prev) => !prev)
  }, [])

  const onSubmit = useCallback(
    async (data: IFormInput) => {
      try {
        const response = await handleLoginPress(data)
        if (response?.data?.status) {
          const isSubscribed = response?.data?.data?.isSubscribed.toString()
          const peerGroup = response?.data?.data?.peerGroup.toString()
          // save(STORAGE_KEYS.PREMIUM_USER, isSubscribed)
          console.log("isSubscribed =>", isSubscribed)
          save(STORAGE_KEYS.PREMIUM_USER, JSON.stringify(true))
          save(STORAGE_KEYS.PEER_GROUP, peerGroup)
          save(STORAGE_KEYS.LOGIN_TIME, new Date().getTime())

          Toast.show({
            type: "success",
            text1: response?.data?.message?.toUpperCase(),
          })
          const result = response?.data?.data
          save(STORAGE_KEYS.USER_INFO, result)
          save(STORAGE_KEYS.USER_ID, result?.retailer_id)
          save(STORAGE_KEYS.ACCESS_TOKEN, result?.accessToken)
          save(STORAGE_KEYS.REFRESH_TOKEN, result?.refreshToken)
          const payload = {
            accessToken: result?.accessToken,
            userId: result?.retailer_id,
            refreshToken: result?.refreshToken,
          }
          console.log(payload)

          // Store user info in AsyncStorage immediately after login
          // try {
          //   const userInfo = {
          //     role: USER_ROLE.RETAILER,
          //     authToken: result?.accessToken,
          //     userId: result?.retailer_id,
          //     refreshToken: result?.refreshToken,
          //   }
          //   const jsonValue = JSON.stringify(userInfo)
          //   await AsyncStorage.setItem(STORAGE_KEYS.USER_INFO, jsonValue)
          //   console.log(CONSOLE_MESSAGES.STORAGE_SUCCESS)
          // } catch (error) {
          //   console.error(CONSOLE_MESSAGES.STORAGE_ERROR, error)
          // }

          setUserAuth(payload)
          navigation.navigate(RetailerRoutes.TAB_CONTAINER)
          reset()
        } else {
          const errorMessage = response?.data?.message || ERROR_MESSAGES.LOGIN_FAILED
          Toast.show({
            type: "error",
            text1: errorMessage.toUpperCase(),
          })
        }
      } catch (error: any) {
        console.error(CONSOLE_MESSAGES.LOGIN_REQUEST_FAILED, error)

        // Handle different types of errors
        if (error?.status === "NETWORK_ERROR" || error?.message?.includes("Network")) {
          Toast.show({
            type: "error",
            text1: ERROR_MESSAGES.NETWORK_ERROR,
            text2: ERROR_MESSAGES.NETWORK_ERROR_DESCRIPTION,
          })
        } else {
          const errorMessage =
            error?.error?.data?.message || error?.message || ERROR_MESSAGES.LOGIN_FAILED_GENERIC
          Toast.show({
            type: "error",
            text1: errorMessage.toUpperCase(),
            text2: ERROR_MESSAGES.PLEASE_TRY_AGAIN,
          })
        }
      }
    },
    [handleLoginPress, setUserAuth, navigation, reset],
  )

  const handleNavigateToResetPassword = useCallback(() => {
    navigation.navigate(RetailerRoutes.RESET_PASSWORD)
  }, [navigation])

  const handleNavigateToCreateAccount = useCallback(() => {
    navigation.navigate(RetailerRoutes.CREATE_NEW_ACCOUNT)
  }, [navigation])

  const handleBackToOption = useCallback(() => {
    clearRole()
    navigation.navigate(RetailerRoutes.OPTION)
  }, [clearRole, navigation])

  return {
    control,
    handleSubmit,
    errors,
    reset,
    isLoading,
    isShowPassword,
    handleTogglePassword,
    onSubmit,
    handleNavigateToResetPassword,
    handleNavigateToCreateAccount,
    handleBackToOption,
    showModal,
    setShowModal,
  }
}
