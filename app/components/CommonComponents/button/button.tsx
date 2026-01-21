import { FC } from "react"
import { ActivityIndicator, Text, TouchableOpacity } from "react-native"
import { responsiveHeight } from "react-native-responsive-dimensions"

import { ACTIVITY_INDICATOR_COLOR, ACTIVITY_INDICATOR_SIZE } from "./lib/constants"
import { styles } from "./lib/styles"
import type { ButtonFieldProps } from "./lib/types"

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
      style={[styles.buttonContainer, { paddingVertical: responsiveHeight(3) }]}
      onPress={onPress}
    >
      {isLoading ? (
        <ActivityIndicator color={ACTIVITY_INDICATOR_COLOR} size={ACTIVITY_INDICATOR_SIZE} />
      ) : (
        <Text style={styles.buttonText}>{value}</Text>
      )}
    </TouchableOpacity>
  )
}

export default ButtonField
