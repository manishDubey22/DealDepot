import { StyleSheet } from "react-native"
import { responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions"

import { colors } from "@/theme/colors"
import { CommonStyles } from "@/theme/common-styles"

export const styles = StyleSheet.create({
  avatarContainer: {
    alignItems: "center",
    marginBottom: responsiveHeight(3),
  },
  buttonsContainer: {
    gap: responsiveHeight(2),
    marginTop: responsiveHeight(2),
  },
  container: {
    flex: 1,
    paddingHorizontal: responsiveWidth(5),
    paddingTop: responsiveHeight(3),
  },
  deleteButton: {
    alignItems: "center",
    backgroundColor: colors.palette.red700,
    borderRadius: 8,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  deleteButtonText: {
    color: colors.palette.neutral100,
    fontFamily: CommonStyles.fontFamily.fontFamily,
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  fieldsContainer: {
    gap: responsiveHeight(2),
    marginBottom: responsiveHeight(3),
  },
  loaderContainer: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  logoutButton: {
    backgroundColor: colors.customColors.GREEN,
  },
  mainContainer: {
    backgroundColor: colors.palette.neutral100,
    flex: 1,
  },
})
