import { Platform, StyleSheet } from "react-native"
import { responsiveHeight } from "react-native-responsive-dimensions"

import { colors } from "@/theme/colors"
import { CommonStyles } from "@/theme/common-styles"

export const styles = StyleSheet.create({
  checkbox: {
    alignItems: "center",
    backgroundColor: colors.palette.neutral100,
    borderColor: colors.palette.neutral400,
    borderRadius: 3,
    borderWidth: 2,
    height: 20,
    justifyContent: "center",
    marginRight: 10,
    marginTop: 2,
    width: 20,
  },

  checkboxChecked: {
    backgroundColor: colors.customColors.GREEN,
    borderColor: colors.customColors.GREEN,
  },

  checkboxContainer: {
    alignItems: "flex-start",
    flexDirection: "row",
    marginBottom: 20,
    paddingHorizontal: 5,
  },

  checkboxError: {
    backgroundColor: colors.palette.red50,
    borderColor: colors.customColors.PASTEL_RED,
  },

  checkboxErrorMessage: {
    color: colors.customColors.PASTEL_RED,
    fontFamily: CommonStyles.fontFamily.fontFamily,
    fontSize: 14,
    marginLeft: 30,
    marginTop: 5,
  },
  checkboxText: {
    color: colors.palette.neutral550,
    flex: 1,
    fontFamily: CommonStyles.fontFamily.fontFamily,
    fontSize: 14,
    lineHeight: 20,
  },
  checkmark: {
    color: colors.palette.neutral100,
    fontSize: 12,
    fontWeight: "bold",
  },
  createButton: {
    backgroundColor: colors.customColors.GREEN,
    borderRadius: 5,
    marginHorizontal: 18,
    marginTop: "20%",
    paddingVertical: 22,
    width: "90%",
  },
  createText: {
    color: colors.palette.neutral100,
    fontSize: 17,
    fontWeight: "500",
    textAlign: "center",
  },

  heading: {
    color: colors.palette.neutral550,
    fontFamily: CommonStyles.fontFamily.fontFamily,
    fontSize: 22,
    fontWeight: "600",
    textAlign: "center",
    width: "100%",
  },

  helperMessage: {
    color: colors.customColors.LIGHT_GRAY,
    fontFamily: CommonStyles.fontFamily.fontFamily,
    fontSize: 14,
    fontStyle: "italic",
    marginTop: 10,
    textAlign: "center",
  },

  helperText2: {
    color: colors.customColors.GREEN,
    fontSize: 16,
    fontWeight: "500",
    marginTop: 8,
    textAlign: "left",
    textDecorationLine: "underline",
  },

  helperTextContainer: { marginHorizontal: 18, marginTop: 20, width: "100%" },

  helpertext1: { color: colors.customColors.LIGHT_GRAY, fontSize: 14, textAlign: "left" },

  loginButtonContainer: {
    marginBottom: 20,
  },

  mainContainer: {
    backgroundColor: colors.palette.neutral100,
    paddingLeft: Platform.OS === "ios" ? 10 : null,
    paddingRight: Platform.OS === "ios" ? 10 : null,
  },

  peerGroupTextContainer: {
    marginTop: 10,
  },

  safeAreaView: {
    display: "flex",
    flexDirection: "column",
    gap: responsiveHeight(10),
    height: "100%",
    paddingBottom: 100,
    paddingHorizontal: 18,
    width: "100%",
  },

  textInputContainer: { paddingTop: responsiveHeight(5) },

  textInputMargin: {
    marginTop: 16,
  },

  validationError: {
    color: colors.customColors.PASTEL_RED,
    fontFamily: CommonStyles.fontFamily.fontFamily,
    fontSize: 14,
    marginTop: 10,
  },
})
