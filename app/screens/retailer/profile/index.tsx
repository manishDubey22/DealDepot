import { ActivityIndicator, ScrollView, Text, TouchableOpacity, View } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { responsiveHeight } from "react-native-responsive-dimensions"
import Toast from "react-native-toast-message"

import {
  Avatar,
  ButtonField,
  InputFieldContianer,
  PopupModal,
} from "@/components/common-components"
import { colors } from "@/theme/colors"

import { useProfile } from "./hooks/use-profile"
import { UI_TEXT } from "./lib/constants"
import { styles } from "./lib/styles"

export default function Profile() {
  const navigation = useNavigation()
  const {
    profileData,
    isLoading,
    showDeleteModal,
    isDeleting,
    handleLogout,
    handleDeleteAccount,
    handleConfirmDelete,
    handleCancelDelete,
  } = useProfile(navigation)

  if (isLoading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color={colors.customColors.GREEN} />
      </View>
    )
  }

  return (
    <View style={styles.mainContainer}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {profileData && (
          <>
            <View style={styles.avatarContainer}>
              <Avatar name={profileData.name} size={100} />
            </View>

            <View style={styles.fieldsContainer}>
              <InputFieldContianer
                editable={false}
                placeholder={UI_TEXT.NAME}
                title={UI_TEXT.NAME}
                value={profileData.name}
              />
              <InputFieldContianer
                editable={false}
                placeholder={UI_TEXT.EMAIL}
                title={UI_TEXT.EMAIL}
                value={profileData.email}
              />
              <InputFieldContianer
                editable={false}
                placeholder={UI_TEXT.STORE_NAME}
                title={UI_TEXT.STORE_NAME}
                value={profileData.storeName}
              />
              <InputFieldContianer
                editable={false}
                placeholder={UI_TEXT.LOCATION}
                title={UI_TEXT.LOCATION}
                value={profileData.location}
              />
              <InputFieldContianer
                editable={false}
                placeholder={UI_TEXT.CITY}
                title={UI_TEXT.CITY}
                value={profileData.city}
              />
              <InputFieldContianer
                editable={false}
                placeholder={UI_TEXT.ZIP_CODE}
                title={UI_TEXT.ZIP_CODE}
                value={profileData.zipCode}
              />
              <InputFieldContianer
                editable={false}
                placeholder={UI_TEXT.PHONE}
                title={UI_TEXT.PHONE}
                value={profileData.number}
              />
              <InputFieldContianer
                editable={false}
                placeholder={UI_TEXT.PEER_GROUP}
                title={UI_TEXT.PEER_GROUP}
                value={profileData.peerGroup}
              />
            </View>

            <View style={styles.buttonsContainer}>
              <ButtonField
                btnDisable={isDeleting}
                isLoading={false}
                onPress={handleLogout}
                value={UI_TEXT.LOGOUT}
              />
              <TouchableOpacity
                disabled={isDeleting}
                onPress={handleDeleteAccount}
                style={[styles.deleteButton, { paddingVertical: responsiveHeight(3) }]}
              >
                {isDeleting ? (
                  <ActivityIndicator color={colors.palette.neutral100} size="small" />
                ) : (
                  <Text style={styles.deleteButtonText}>{UI_TEXT.DELETE_ACCOUNT}</Text>
                )}
              </TouchableOpacity>
            </View>
          </>
        )}
      </ScrollView>

      <PopupModal
        cancelText={UI_TEXT.DELETE_CANCEL}
        confirmText={UI_TEXT.DELETE_CONFIRM}
        isVisible={showDeleteModal}
        message={UI_TEXT.DELETE_CONFIRM_MESSAGE}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
      />

      <Toast />
    </View>
  )
}
