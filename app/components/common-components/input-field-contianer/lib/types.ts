import { StyleProp, TextInputProps, ViewStyle } from "react-native"

export interface ITextContainerProps {
  title: string
  textContainerStyle?: StyleProp<ViewStyle>
  showIcon?: boolean
  editable?: boolean
  secureTextEntry?: boolean
  onChangeText?: (text: string) => void
  onTogglePassword?: () => void
  dropdownData?: Array<{ key: string; value: string }>
  setSelectedValue?: React.Dispatch<React.SetStateAction<string>>
}

export type IProps = ITextContainerProps & TextInputProps
