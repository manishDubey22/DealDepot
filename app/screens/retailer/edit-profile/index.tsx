import {
  ActivityIndicator,
  ScrollView,
  Text,
  View,
  KeyboardAvoidingView,
  Platform,
} from "react-native"
import { Controller } from "react-hook-form"
import Toast from "react-native-toast-message"

import { Avatar, ButtonField, InputFieldContianer } from "@/components/common-components"
import { colors } from "@/theme/colors"

import { useEditProfile } from "./hooks/use-edit-profile"
import { UI_TEXT } from "./lib/constants"
import { styles } from "./lib/styles"

export default function EditProfile({ navigation }: { navigation: any }) {
  const {
    control,
    handleSubmit,
    errors,
    btnDisable,
    isLoading,
    profileData,
    dropdownArray,
    onSubmit,
    isProfileLoading,
  } = useEditProfile(navigation)

  if (isProfileLoading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color={colors.customColors.GREEN} />
      </View>
    )
  }

  return (
    <View style={styles.mainContainer}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.keyboardAvoidingView}
      >
        <ScrollView
          style={styles.container}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {profileData && (
            <>
              <View style={styles.avatarContainer}>
                <Avatar name={profileData.name} size={80} />
              </View>

              <View style={styles.fieldsContainer}>
                <View style={styles.fieldContainer}>
                  <Controller
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <InputFieldContianer
                        title={UI_TEXT.RETAILER_NAME}
                        placeholder={UI_TEXT.RETAILER_NAME}
                        // textContainerStyle={styles.fieldCard}
                        titleStyle={styles.titleText}
                        value={value}
                        onChangeText={onChange}
                      />
                    )}
                    name="name"
                  />
                  {errors.name?.message && (
                    <Text style={styles.errorText}>{errors.name.message}</Text>
                  )}
                </View>

                <View style={styles.fieldContainer}>
                  <Controller
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <InputFieldContianer
                        title={UI_TEXT.STORE_NAME}
                        placeholder={UI_TEXT.STORE_NAME}
                        // textContainerStyle={styles.fieldCard}
                        titleStyle={styles.titleText}
                        value={value}
                        onChangeText={onChange}
                      />
                    )}
                    name="storeName"
                  />
                  {errors.storeName?.message && (
                    <Text style={styles.errorText}>{errors.storeName.message}</Text>
                  )}
                </View>

                <View style={styles.fieldContainer}>
                  <Controller
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <InputFieldContianer
                        title={UI_TEXT.PHONE}
                        placeholder={UI_TEXT.PHONE}
                        // textContainerStyle={styles.fieldCard}
                        titleStyle={styles.titleText}
                        value={value}
                        onChangeText={onChange}
                      />
                    )}
                    name="number"
                  />
                  {errors.number?.message && (
                    <Text style={styles.errorText}>{errors.number.message}</Text>
                  )}
                </View>

                <View style={styles.fieldContainer}>
                  <Controller
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <InputFieldContianer
                        title={UI_TEXT.LOCATION}
                        placeholder={UI_TEXT.LOCATION}
                        // textContainerStyle={styles.fieldCard}
                        titleStyle={styles.titleText}
                        value={value}
                        onChangeText={onChange}
                      />
                    )}
                    name="location"
                  />
                  {errors.location?.message && (
                    <Text style={styles.errorText}>{errors.location.message}</Text>
                  )}
                </View>

                <View style={styles.fieldContainer}>
                  <Controller
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <InputFieldContianer
                        title={UI_TEXT.CITY}
                        placeholder={UI_TEXT.CITY}
                        // textContainerStyle={styles.fieldCard}
                        titleStyle={styles.titleText}
                        value={value}
                        onChangeText={onChange}
                      />
                    )}
                    name="city"
                  />
                  {errors.city?.message && (
                    <Text style={styles.errorText}>{errors.city.message}</Text>
                  )}
                </View>

                <View style={styles.fieldContainer}>
                  <Controller
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <InputFieldContianer
                        title={UI_TEXT.ZIP_CODE}
                        placeholder={UI_TEXT.ZIP_CODE}
                        // textContainerStyle={styles.fieldCard}
                        titleStyle={styles.titleText}
                        value={value}
                        onChangeText={onChange}
                      />
                    )}
                    name="zipCode"
                  />
                  {errors.zipCode?.message && (
                    <Text style={styles.errorText}>{errors.zipCode.message}</Text>
                  )}
                </View>

                <View style={styles.fieldContainer}>
                  <Controller
                    control={control}
                    render={({ field: { onChange } }) => (
                      <InputFieldContianer
                        title={UI_TEXT.PEER_GROUP}
                        placeholder={UI_TEXT.PEER_GROUP}
                        // textContainerStyle={styles.fieldCard}
                        titleStyle={styles.titleText}
                        dropdownData={dropdownArray}
                        setSelectedValue={onChange}
                        onChangeText={onChange}
                      />
                    )}
                    name="peerGroup"
                  />
                  {errors.peerGroup?.message && (
                    <Text style={styles.errorText}>{errors.peerGroup.message}</Text>
                  )}
                </View>
              </View>

              <View style={styles.buttonContainer}>
                <ButtonField
                  value={UI_TEXT.UPDATE}
                  onPress={handleSubmit(onSubmit)}
                  btnDisable={btnDisable}
                  isLoading={isLoading}
                  variant={btnDisable || isLoading ? "disabled" : "active"}
                />
              </View>
            </>
          )}
        </ScrollView>
      </KeyboardAvoidingView>

      <Toast />
    </View>
  )
}
