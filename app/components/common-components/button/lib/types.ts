export interface ButtonFieldProps {
  value: string
  screen?: string
  onPress?: () => void
  isDisabled?: boolean
  btnDisable?: boolean
  handleNewPasswordScreen?: () => void
  isLoading?: boolean
}
