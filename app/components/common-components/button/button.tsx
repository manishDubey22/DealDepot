import { FC } from "react"
import { Text, TouchableOpacity, ActivityIndicator } from "react-native"
import { responsiveHeight } from "react-native-responsive-dimensions"

import { colors } from "@/theme/colors"

// type IShowModalType = {
//   resetPassword: boolean
//   otpValidation: boolean
//   resetCredentials: boolean
//   verify?: boolean
// }
// type ShowModalType = {
//   showOTPContainer: boolean
// }
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
        backgroundColor: colors.customColors.GREEN,
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
