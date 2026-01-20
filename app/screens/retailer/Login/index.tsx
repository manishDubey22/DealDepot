import { useState } from "react"
import { View, Text, ScrollView } from "react-native"
import { yupResolver } from "@hookform/resolvers/yup"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useForm, Controller } from "react-hook-form"
import { TouchableOpacity } from "react-native-gesture-handler"
import { SafeAreaView } from "react-native-safe-area-context"
import { Toast } from "react-native-toast-message/lib/src/Toast"

import { useLoginMutation } from "@/api/retailer/auth"
import { useRetailerAuth } from "@/context/RetailerAuthContext"
import { RetailerRoutes } from "@/navigators/retailer/routes"

import { styles } from "./styles"
import ButtonField from "../../../components/CommonComponents/button"
import { InputFieldContianer } from "../../../components/CommonComponents/InputFieldContianer"
import { loginSchema } from "../../../utils/schema"

interface IFormInput {
  email: string
  password: string
}
type IShowModalType = {
  resetPassword: boolean
  otpValidation: boolean
  resetCredentials: boolean
  verify?: boolean
}

export default function Login({ navigation }: any) {
  const { mutateAsync: handleLoginPress, isPending: isLoading } = useLoginMutation()
  const { setUserAuth, setUserRole } = useRetailerAuth()
  // const userAuthToken = useAppSelector(state => state.rootReducer.auth.userVerification.data);
  const [setShowModal] = useState<IShowModalType>({
    resetPassword: false,
    otpValidation: false,
    resetCredentials: false,
    verify: false,
  })
  const [isShowPassword, setIsShowPassword] = useState(true)
  const {
    // register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IFormInput>({ resolver: yupResolver(loginSchema) })

  const onSubmit = async (data: IFormInput) => {
    try {
      const response = await handleLoginPress(data)
      if (response?.data?.status) {
        const isSubscribed = response?.data?.data?.isSubscribed.toString()
        const peerGroup = response?.data?.data?.peerGroup.toString()
        await AsyncStorage.setItem("premuimUser", isSubscribed)
        await AsyncStorage.setItem("peergroup", peerGroup)
        await AsyncStorage.setItem("loginTime", new Date().getTime().toString())

        Toast.show({
          type: "success",
          text1: response?.data?.message?.toUpperCase(),
        })
        const result = response?.data?.data
        const payload = {
          accessToken: result?.accessToken,
          userId: result?.retailer_id,
          refreshToken: result?.refreshToken,
        }
        console.log(payload)

        // Store user info in AsyncStorage immediately after login
        try {
          const userInfo = {
            role: "retailer",
            authToken: result?.accessToken,
            userId: result?.retailer_id,
            refreshToken: result?.refreshToken,
          }
          const jsonValue = JSON.stringify(userInfo)
          await AsyncStorage.setItem("userInfo", jsonValue)
          console.log("User info stored in AsyncStorage successfully")
        } catch (error) {
          console.error("Error storing user details in AsyncStorage:", error)
        }

        setUserAuth(payload)
        navigation.navigate(RetailerRoutes.TAB_CONTAINER)
        reset()
      } else {
        const errorMessage = response?.data?.message || "Login failed"
        Toast.show({
          type: "error",
          text1: errorMessage.toUpperCase(),
        })
      }
    } catch (error: any) {
      console.error("Login request failed:", error)

      // Handle different types of errors
      if (error?.status === "NETWORK_ERROR" || error?.message?.includes("Network")) {
        Toast.show({
          type: "error",
          text1: "Network Error",
          text2: "Please check your internet connection",
        })
      } else {
        const errorMessage = error?.error?.data?.message || error?.message || "Login Failed"
        Toast.show({
          type: "error",
          text1: errorMessage.toUpperCase(),
          text2: "Please try again",
        })
      }
    }
  }

  const handleTogglePassword = () => {
    setIsShowPassword(!isShowPassword)
  }
  return (
    <View style={styles.mainContainer}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <SafeAreaView style={styles.safeAreaView}>
          <View style={styles.container}>
            <Text style={styles.retailerText}>Retailer</Text>
            <View>
              <Controller
                control={control}
                render={({ field: { onChange, value } }) => (
                  <InputFieldContianer
                    title="User Name"
                    placeholder="Email / Phone Number"
                    textContainerStyle={styles.textInputMargin}
                    value={value}
                    onChangeText={(text) => {
                      onChange(text?.trimEnd())
                    }}
                  />
                )}
                name="email"
              />
              {errors.email?.message && (
                <Text style={styles.validationError}>{errors.email?.message}</Text>
              )}

              <Controller
                control={control}
                render={({ field: { onChange, value } }) => (
                  <InputFieldContianer
                    title="Password"
                    placeholder="Enter Password"
                    showIcon={value?.length > 0 ? true : false}
                    secureTextEntry={isShowPassword}
                    onTogglePassword={handleTogglePassword}
                    value={value}
                    onChangeText={(text) => {
                      onChange(text?.trimEnd())
                    }}
                    textContainerStyle={styles.textInputMargin}
                  />
                )}
                name="password"
              />
              {errors.password?.message && (
                <Text style={styles.validationError}>{errors.password?.message}</Text>
              )}
            </View>
            <TouchableOpacity
              style={styles.passwordTextContainer}
              onPress={() =>
                setShowModal({
                  resetPassword: true,
                  otpValidation: false,
                  resetCredentials: false,
                })
              }
            >
              <TouchableOpacity onPress={() => navigation.navigate(RetailerRoutes.RESET_PASSWORD)}>
                <Text style={styles.textColor}>Forgot Password?</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          </View>

          <ButtonField value="LOGIN NOW" onPress={handleSubmit(onSubmit)} isDisabled={isLoading} />

          <View>
            <Text style={styles.helpertext1}>Don’t have an account yet?</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate(RetailerRoutes.CREATE_NEW_ACCOUNT)}
            >
              <Text style={styles.helperText2}>Create New Account</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setUserRole(null)

                navigation.navigate(RetailerRoutes.OPTION)
              }}
            >
              <Text style={styles.backToOptionScreen}>Back to Option screen</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </ScrollView>
    </View>
  )
}
