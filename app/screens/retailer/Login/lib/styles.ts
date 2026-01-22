import { StyleSheet } from "react-native"

import { colors } from "@/theme/colors"
import { CommonStyles } from "@/theme/common-styles"

export const styles = StyleSheet.create({
  backToOptionScreen: { marginTop: 10, textAlign: "center" },
  container: { paddingTop: 30 },
  helperText2: {
    color: colors.customColors.GREEN,
    fontSize: 19,
    fontWeight: "500",
    marginTop: 8,
    textAlign: "center",
    textDecorationLine: "underline",
  },
  helpertext1: { color: colors.customColors.LIGHT_GRAY, fontSize: 16, textAlign: "center" },

  loginText: {
    color: colors.palette.neutral100,
    fontSize: 19,
    fontWeight: "500",
    textAlign: "center",
  },

  mainContainer: {
    backgroundColor: colors.customColors.WHITE,
    flex: 1,
    paddingLeft: 18,
    paddingRight: 18,
  },
  passwordTextContainer: {
    marginTop: 36,
  },
  retailerText: { fontSize: 20, fontWeight: "500", textAlign: "center" },
  safeAreaView: {
    display: "flex",
    flexDirection: "column",
    gap: 87,
    height: "100%",
    width: "100%",
  },
  textColor: {
    color: colors.customColors.GREEN,
    fontSize: 16,
  },
  textInputMargin: {
    marginTop: 16,
  },
  validationError: {
    color: colors.customColors.PASTEL_RED,
    fontFamily: CommonStyles.fontFamily.fontFamily,
    fontSize: 16,
    marginTop: 10,
  },
})
