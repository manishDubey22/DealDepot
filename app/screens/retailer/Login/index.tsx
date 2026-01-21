import { View, Text, ScrollView } from "react-native"
import { Controller } from "react-hook-form"
import { TouchableOpacity } from "react-native-gesture-handler"
import { SafeAreaView } from "react-native-safe-area-context"

import { useRetailerLogin } from "./hooks/useRetailerLogin"
import { FORM_FIELDS, UI_TEXT } from "./lib/constants"
import { styles } from "./lib/styles"
import ButtonField from "../../../components/CommonComponents/button"
import { InputFieldContianer } from "../../../components/CommonComponents/InputFieldContianer"

export default function Login({ navigation }: any) {
  const {
    control,
    handleSubmit,
    errors,
    isLoading,
    isShowPassword,
    handleTogglePassword,
    onSubmit,
    handleNavigateToResetPassword,
    handleNavigateToCreateAccount,
    handleBackToOption,
    showModal,
    setShowModal,
  } = useRetailerLogin(navigation)

  console.log("showModal", showModal)
  return (
    <View style={styles.mainContainer}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <SafeAreaView style={styles.safeAreaView}>
          <View style={styles.container}>
            <Text style={styles.retailerText}>{UI_TEXT.SCREEN_TITLE}</Text>
            <View>
              <Controller
                control={control}
                render={({ field: { onChange, value } }) => (
                  <InputFieldContianer
                    title={UI_TEXT.EMAIL_FIELD_TITLE}
                    placeholder={UI_TEXT.EMAIL_PLACEHOLDER}
                    textContainerStyle={styles.textInputMargin}
                    value={value}
                    onChangeText={(text) => {
                      onChange(text?.trimEnd())
                    }}
                  />
                )}
                name={FORM_FIELDS.EMAIL}
              />
              {errors.email?.message && (
                <Text style={styles.validationError}>{errors.email?.message}</Text>
              )}

              <Controller
                control={control}
                render={({ field: { onChange, value } }) => (
                  <InputFieldContianer
                    title={UI_TEXT.PASSWORD_FIELD_TITLE}
                    placeholder={UI_TEXT.PASSWORD_PLACEHOLDER}
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
                name={FORM_FIELDS.PASSWORD}
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
              <TouchableOpacity onPress={handleNavigateToResetPassword}>
                <Text style={styles.textColor}>{UI_TEXT.FORGOT_PASSWORD_TEXT}</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          </View>

          <ButtonField
            value={UI_TEXT.LOGIN_BUTTON_TEXT}
            onPress={handleSubmit(onSubmit)}
            isDisabled={isLoading}
          />

          <View>
            <Text style={styles.helpertext1}>{UI_TEXT.NO_ACCOUNT_TEXT}</Text>
            <TouchableOpacity onPress={handleNavigateToCreateAccount}>
              <Text style={styles.helperText2}>{UI_TEXT.CREATE_ACCOUNT_TEXT}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleBackToOption}>
              <Text style={styles.backToOptionScreen}>{UI_TEXT.BACK_TO_OPTION_TEXT}</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </ScrollView>
    </View>
  )
}
