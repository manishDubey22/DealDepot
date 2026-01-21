import React from "react"
import {
  Image,
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native"
import { Icon } from "../../assets/icons/wholeSeller"

type ITextContainerProps = {
  title: string
  textContainerStyle?: StyleProp<ViewStyle>
  showIcon?: boolean
}
type IProps = ITextContainerProps & TextInputProps

export const TextInputContainer = ({
  title,
  textContainerStyle,
  showIcon = false,
  ...rest
}: IProps) => {
  return (
    <View style={textContainerStyle}>
      <Text style={styles.titleText}>{title}</Text>
      <View style={styles.textInputContainer}>
        <TextInput {...rest} style={styles.textInput} />
        <TouchableOpacity>
          {showIcon && (
            <Image source={Icon.SHOWPASSWORD} resizeMode="contain" style={styles.icon} />
          )}
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  titleText: {
    color: "#28332D",
    fontSize: 14,
  },

  textInputContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    borderWidth: 0.4,
    borderColor: "#575555B2",
    borderRadius: 5,
    padding: 12,
    marginTop: 6,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4.65,

    elevation: 8,
    backgroundColor: "white",
  },

  textInput: {
    fontSize: 17,
    width: "90%",
  },

  icon: { width: 30, height: 24 },
})
