import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native"
import React, { FC } from "react"
import { color } from "../../utils"
import { useNavigation } from "@react-navigation/native"
import { responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions"

type IShowModalType = {
  resetPassword: boolean
  otpValidation: boolean
  resetCredentials: boolean
  verify?: boolean
}
type ShowModalType = {
  showOTPContainer: boolean
}
interface ButtonFieldProps {
  value: string
  screen?: string
  onPress?: () => void
  isDisabled?: boolean
  btnDisable?: boolean
  handleNewPasswordScreen?: () => void
  isLoading?: boolean
}

const ButtonField: FC<ButtonFieldProps> = ({
  value,
  onPress,
  isDisabled,
  btnDisable,
  isLoading,
}) => {
  return (
    <TouchableOpacity
      disabled={btnDisable || isDisabled}
      style={{
        backgroundColor: color.GREEN,
        paddingHorizontal: 40,
        paddingVertical: responsiveHeight(3),
        borderRadius: 5,
      }}
      onPress={onPress}
    >
      {isLoading ? (
        <ActivityIndicator size="small" color="#00ff00" />
      ) : (
        <Text
          style={{
            color: "#FFF",
            fontFamily: "Arial-Rounded-Bold",
            fontSize: 18,
            alignSelf: "center",
          }}
        >
          {value}
        </Text>
      )}
    </TouchableOpacity>
  )
}

export default ButtonField
