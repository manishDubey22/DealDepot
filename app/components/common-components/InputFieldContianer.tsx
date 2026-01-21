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
  KeyboardAvoidingView,
  Platform,
} from "react-native"
import { Icon } from "../../assets/icons/wholeSeller"
import { CommonStyles } from "../../sharedStyles/styles"

import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
  responsiveScreenHeight,
} from "react-native-responsive-dimensions"
import { color } from "../../utils"
import { SelectList } from "react-native-dropdown-select-list"

type ITextContainerProps = {
  title: string
  textContainerStyle?: StyleProp<ViewStyle>
  showIcon?: boolean
  editable?: boolean
  secureTextEntry?: boolean
  onChangeText?: (text: string) => void
  // onChangeText?: () => void
  onTogglePassword?: () => void
  dropdownData?: Array<{ key: string; value: string }>
  setSelectedValue?: React.Dispatch<React.SetStateAction<string>>
}
type IProps = ITextContainerProps & TextInputProps

export const InputFieldContianer = ({
  title,
  textContainerStyle,
  showIcon = false,
  onChangeText,
  onTogglePassword,
  secureTextEntry,
  editable,
  dropdownData,
  setSelectedValue,
  ...rest
}: IProps) => {
  return (
    <View style={[textContainerStyle]}>
      <Text style={styles.titleText}>{title}</Text>
      {dropdownData ? (
        <View style={{ marginTop: 3 }}>
          <SelectList
            setSelected={(val: any) => {
              setSelectedValue && setSelectedValue(val)
              onChangeText && onChangeText(val)
            }}
            data={dropdownData}
            inputStyles={styles.titleText}
            boxStyles={styles.dropdownBox}
            save="value"
            dropdownTextStyles={styles.titleText}
            dropdownStyles={styles.dropdownBox}
          />
        </View>
      ) : (
        <View style={[styles.textInputContainer, { paddingHorizontal: 2 }]}>
          <TextInput
            style={styles.textInput}
            onChangeText={onChangeText}
            secureTextEntry={secureTextEntry && secureTextEntry}
            placeholderTextColor="gray"
            editable={editable && editable}
            {...rest}
          />
          {showIcon && (
            <TouchableOpacity style={styles.iconContainer} onPress={onTogglePassword}>
              <Image
                source={!secureTextEntry ? Icon.HIDE_PASSWORD : Icon.SHOWPASSWORD}
                resizeMode="contain"
                style={styles.icon}
              />
            </TouchableOpacity>
          )}
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  titleText: {
    color: color.LIGHT_GRAY,
    fontSize: 14,
  },
  dropdownBox: {
    borderWidth: 0.4,
    borderRadius: 5,
    borderColor: "#575555B2",
    elevation: 8,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    marginTop: 5,
    shadowOpacity: 0.2,
    shadowRadius: 4.65,
  },
  textInputContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    borderWidth: 0.4,
    borderColor: "#575555B2",
    borderRadius: 5,
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
    padding: Platform.OS === "ios" ? 10 : null,
  },

  textInput: {
    ...CommonStyles.customFontSize,
    flex: 1,
    padding: Platform.OS === "ios" ? 4 : null,
  },

  iconContainer: {
    paddingHorizontal: 7,
  },

  icon: {
    width: 22,
    height: 22,
  },
})
