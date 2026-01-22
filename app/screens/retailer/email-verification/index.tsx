import { useRef, useState } from "react"
import { View, Text, TextInput, StyleSheet } from "react-native"
import { useRoute } from "@react-navigation/native"
import { RouteProp, NavigationProp } from "@react-navigation/native"
import { ScrollView } from "react-native-gesture-handler"
import {
  responsiveScreenHeight,
  responsiveScreenWidth,
  responsiveScreenFontSize,
  responsiveFontSize,
} from "react-native-responsive-dimensions"
import { SafeAreaView } from "react-native-safe-area-context"
import { Toast } from "react-native-toast-message/lib/src/Toast"

import { authMutationOptions } from "@/api/retailer/auth"
import ButtonField from "@/components/common-components/button/button"
import { useRetailerAuth } from "@/context/RetailerAuthContext"
import { STORAGE_KEY } from "@/lib/constants"
import { RetailerRoutes } from "@/navigators/retailer/routes"
import { colors } from "@/theme/colors"
import { save, saveString } from "@/utils/storage"

type RootStackParamList = {
  EmailVerification: undefined
  [RetailerRoutes.TAB_CONTAINER]: undefined
}

type EmailVerificationScreenRouteProp = RouteProp<RootStackParamList, "EmailVerification">
type EmailVerificationScreenNavigationProp = NavigationProp<RootStackParamList, "EmailVerification">

type EmailVerificationProps = {
  route?: EmailVerificationScreenRouteProp
  navigation: EmailVerificationScreenNavigationProp
}

export default function EmailVerification({ navigation }: EmailVerificationProps) {
  const route = useRoute()
  const [otp, setOtp] = useState(["", "", "", ""])
  const inputRefs = useRef(Array(4).fill(null))
  const { email } = route?.params as { email: string }
  const { mutateAsync: verifyOtp, isPending: isLoading } =
    authMutationOptions.useOtpVerifyMutation()
  const { setUserAuth } = useRetailerAuth()

  console.log("EmailVerification email: " + email)

  const handleOtpChange = (value: string, index: number) => {
    const updatedOtp = [...otp]
    updatedOtp[index] = value
    setOtp(updatedOtp)
    if (value !== "") {
      if (index < 3) {
        inputRefs.current[index + 1].focus()
      } else if (index === 3) {
        inputRefs.current[index].focus()
      }
    } else {
      if (index > 0) {
        console.log(";;updatedOtp", updatedOtp)
        inputRefs.current[index - 1].focus()
      }
    }
  }
  const handleOtpSubmit = async () => {
    const enteredOtp = otp.join("")
    if (!email || enteredOtp.length !== 4) {
      Toast.show({
        type: "error",
        text1: "Please enter a valid 4-digit OTP",
      })
      return
    }

    try {
      const response = await verifyOtp({ email, otp: enteredOtp })

      if (response?.message && response?.data) {
        // Store subscription and peer group in storage
        const isSubscribed = response.data.isSubscribed.toString()
        const peerGroup = response.data.peerGroup.toString()
        saveString("premuimUser", isSubscribed)
        saveString("peergroup", peerGroup)

        // Store user info in storage
        try {
          const userInfo = {
            role: "retailer",
            authToken: response.data.accessToken,
            userId: response.data.retailer_id,
            refreshToken: response.data.refreshToken,
          }
          save(STORAGE_KEY.USER_INFO, userInfo)
        } catch (storageError) {
          console.error("Error storing user info:", storageError)
        }

        // Update auth context
        const payload = {
          accessToken: response.data.accessToken,
          userId: response.data.retailer_id,
          refreshToken: response.data.refreshToken,
        }
        setUserAuth(payload)

        // Show success toast
        Toast.show({
          type: "success",
          text1: response.message.toUpperCase(),
        })

        console.log("emailVerification Success data", response)

        // Navigate to tab container
        navigation.navigate(RetailerRoutes.TAB_CONTAINER)
      }
    } catch (error: any) {
      console.log("errorOTPVerification", error)

      // Extract error message
      let errorMessage = "OTP verification failed"
      if (error?.response?.data?.message) {
        errorMessage = error.response.data.message
      } else if (error?.message) {
        errorMessage = error.message
      } else if (error?.error?.data?.message) {
        errorMessage = error.error.data.message
      }

      Toast.show({
        type: "error",
        text1: errorMessage.toUpperCase(),
      })
    }
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.mainContainer}>
      <SafeAreaView style={styles.safeAreaView}>
        {
          <View style={styles.subContainer}>
            <View>
              <Text style={styles.helpertext1}>We have send you one time password on </Text>
              <Text style={styles.helperText2}> {email ? email : "example123@gmail.com"}.</Text>
            </View>
            <View style={styles.otpContainer}>
              {otp.map((value, index) => (
                <TextInput
                  key={index}
                  style={styles.otpBox}
                  onChangeText={(text) => handleOtpChange(text, index)}
                  value={value}
                  maxLength={1}
                  keyboardType="numeric"
                  autoFocus={index === 0}
                  editable={!isLoading}
                  ref={(input) => (inputRefs.current[index] = input)}
                />
              ))}
            </View>
          </View>

          // )
        }
        <ButtonField value="SUBMIT" isDisabled={isLoading} onPress={handleOtpSubmit} />
      </SafeAreaView>
    </ScrollView>
  )
}

export const styles = StyleSheet.create({
  helperText2: {
    color: colors.customColors.MEDIUM_GRAY,
    fontSize: responsiveScreenFontSize(1.9),
    fontWeight: "bold",
    textAlign: "center",
  },
  helpertext1: {
    color: colors.customColors.MEDIUM_GRAY,
    fontSize: responsiveScreenFontSize(1.9),
    textAlign: "center",
  },

  mainContainer: {
    backgroundColor: "white",
    paddingLeft: 18,
    paddingRight: 23,
    paddingTop: responsiveScreenHeight(10),
  },
  otpBox: {
    borderRadius: 10,
    borderWidth: 0.5,
    fontSize: responsiveFontSize(2),
    height: responsiveScreenHeight(7),
    shadowColor: "green",
    shadowOffset: {
      width: 7,
      height: 4,
    },
    shadowOpacity: 1,
    shadowRadius: 4.65,
    textAlign: "center",
    width: responsiveScreenWidth(15),
  },
  otpContainer: {
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    gap: 10,
    justifyContent: "space-between",
    paddingTop: 21,
  },
  safeAreaView: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    width: "100%",
  },
  subContainer: {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    paddingBottom: responsiveScreenHeight(10),
  },
})
