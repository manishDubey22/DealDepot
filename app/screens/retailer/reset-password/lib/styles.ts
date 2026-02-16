import { StyleSheet } from "react-native"
import { responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions"

import { colors } from "@/theme/colors"
import { CommonStyles } from "@/theme/common-styles"

export const styles = StyleSheet.create({
  buttonMargin: {
    marginTop: responsiveHeight(4),
  },
  container: {
    marginTop: responsiveHeight(2),
  },
  helperText2: {
    color: colors.customColors.GREEN,
    fontFamily: CommonStyles.fontFamily.fontFamily,
    fontSize: 16,
    fontWeight: "500",
    marginTop: responsiveHeight(0.5),
    textAlign: "center",
    textDecorationLine: "underline",
  },
  helperTextContainer: {
    alignItems: "center",
    marginTop: responsiveHeight(3),
  },
  helpertext1: {
    color: colors.customColors.LIGHT_GRAY,
    fontFamily: CommonStyles.fontFamily.fontFamily,
    fontSize: 16,
    textAlign: "center",
  },
  mainContainer: {
    backgroundColor: colors.customColors.WHITE,
    flex: 1,
    paddingHorizontal: responsiveWidth(5),
  },
  otpBox: {
    borderColor: colors.palette.neutral400,
    borderRadius: 8,
    borderWidth: 1,
    fontFamily: CommonStyles.fontFamily.fontFamily,
    fontSize: 24,
    height: 56,
    textAlign: "center",
    width: 56,
  },
  otpContainer: {
    flexDirection: "row",
    gap: responsiveWidth(3),
    justifyContent: "center",
    marginTop: responsiveHeight(3),
  },
  otpSubtitleEmail: {
    color: colors.customColors.GREEN,
    fontFamily: CommonStyles.fontFamily.fontFamily,
    fontSize: 16,
    fontWeight: "500",
    marginTop: responsiveHeight(0.5),
    textAlign: "center",
  },
  safeAreaView: {
    flex: 1,
    width: "100%",
  },
  stepSubtitle: {
    color: colors.customColors.LIGHT_GRAY,
    fontFamily: CommonStyles.fontFamily.fontFamily,
    fontSize: 16,
    marginTop: responsiveHeight(1),
    paddingHorizontal: responsiveWidth(2),
    textAlign: "center",
  },
  stepTitle: {
    color: colors.customColors.BLACK,
    fontFamily: CommonStyles.fontFamily.fontFamily,
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
  },
  textInputMargin: {
    marginTop: responsiveHeight(2),
  },
  validationError: {
    color: colors.customColors.PASTEL_RED,
    fontFamily: CommonStyles.fontFamily.fontFamily,
    fontSize: 14,
    marginTop: responsiveHeight(0.5),
  },
})
