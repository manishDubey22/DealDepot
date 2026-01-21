import React from "react"
import { StyleSheet, Text, TextInput, View, SafeAreaView } from "react-native"
import {
  responsiveFontSize,
  responsiveScreenFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from "react-native-responsive-dimensions"
import { color } from "../../utils"
import ButtonField from "./button/button"
import { usePostResetPasswordVerifyQuery } from "../../api/retailer/authApiSlice/api"
import { skipToken } from "@reduxjs/toolkit/dist/query"
import { Toast } from "react-native-toast-message/lib/src/Toast"
import { useAppDispatch } from "../../redux/store"
import { updateResetPasswordTokenAction } from "../../redux/wholeSeller/reduxSlice/auth/authSlice"
type ResetPasswordOTPScreenProps = {
  prepareProps: {
    email: string
    role: string
  }
  setIsShowSetNewPasswordScreen: (value: boolean) => void
  setIsShowResetOtpContainer: (value: boolean) => void
}
type IsOtpVerification = {
  email: string
  otp: string
}
export const ResetPasswordOTPScreen: React.FC<ResetPasswordOTPScreenProps> = ({
  prepareProps,
  setIsShowSetNewPasswordScreen,
  setIsShowResetOtpContainer,
}) => {
  const [otp, setOtp] = React.useState(["", "", "", ""])
  const inputRefs = React.useRef(Array(4).fill(null))
  const [otpContainer, setOtpContainer] = React.useState<IsOtpVerification>()
  const {
    data: passwordVerifyData,
    isLoading: passwordVerifyIsLoading,
    isError: passwordVerifyIsError,
    error: passwordVerifyError,
    isSuccess: passwordVerifyIsSuccess,
  } = usePostResetPasswordVerifyQuery(
    prepareProps.email && prepareProps.role && otpContainer ? otpContainer : skipToken,
  )
  const dispatch = useAppDispatch()
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
        inputRefs.current[index - 1].focus()
      }
    }
  }
  const handleResetPassword = () => {
    const enteredOtp = otp.join("")
    setOtpContainer({ email: prepareProps?.email, otp: enteredOtp })
  }
  React.useEffect(() => {
    if (passwordVerifyIsSuccess) {
      Toast.show({
        type: "success",
        text1: passwordVerifyData?.message.toUpperCase(),
      })
      const Token = passwordVerifyData?.data?.resetPasswordToken
      dispatch(updateResetPasswordTokenAction(Token))
      setIsShowResetOtpContainer(false)
      setIsShowSetNewPasswordScreen(true)
    } else if (passwordVerifyIsError) {
      Toast.show({
        type: "error",
        text1: passwordVerifyError?.data?.message.toUpperCase(),
      })
      console.log("error ResetPassword verification", passwordVerifyError)
    }
  }, [passwordVerifyIsSuccess, passwordVerifyIsError, passwordVerifyData])

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.subContainer}>
        <View>
          <Text style={styles.helpertext1}>We have send you one time password on </Text>
          <Text style={styles.helperText2}> {prepareProps?.email || "example123@gmail.com"}.</Text>
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
              ref={(input) => (inputRefs.current[index] = input)}
            />
          ))}
        </View>
      </View>
      <ButtonField
        value="SUBMIT OTP"
        onPress={handleResetPassword}
        isDisabled={passwordVerifyIsLoading}
      />
    </SafeAreaView>
  )
}
export const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: "white",
    paddingLeft: 18,
    paddingRight: 23,
    paddingTop: responsiveScreenHeight(10),
  },
  subContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: responsiveScreenHeight(10),
  },

  safeAreaView: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  otpContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 21,
    gap: 10,
  },
  otpBox: {
    borderWidth: 0.5,
    width: responsiveScreenWidth(15),
    height: responsiveScreenHeight(7),
    borderRadius: 10,
    textAlign: "center",
    shadowColor: "green",
    shadowOffset: {
      width: 7,
      height: 4,
    },
    shadowOpacity: 1,
    shadowRadius: 4.65,
    fontSize: responsiveFontSize(2),
  },
  helpertext1: {
    fontSize: responsiveScreenFontSize(1.9),
    color: color.MEDIUM_GRAY,
    textAlign: "center",
  },
  helperText2: {
    fontSize: responsiveScreenFontSize(1.9),
    color: color.MEDIUM_GRAY,
    fontWeight: "bold",
    textAlign: "center",
  },
})
