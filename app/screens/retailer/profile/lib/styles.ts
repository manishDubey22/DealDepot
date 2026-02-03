import { Platform, StyleSheet } from "react-native"
import { responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions"

import { colors } from "@/theme/colors"
import { CommonStyles } from "@/theme/common-styles"
import { commonStyles } from "@/theme/styles"

export const styles = StyleSheet.create({
  avatarContainer: {
    alignItems: "center",
    marginBottom: responsiveHeight(1.5),
  },
  buttonsContainer: {
    flexDirection: "row",
    gap: responsiveWidth(4),
    justifyContent: "center",
    marginBottom: responsiveHeight(4),
    marginTop: responsiveHeight(3),
    paddingHorizontal: responsiveWidth(2),
  },
  container: {
    flex: 1,
    paddingBottom: responsiveHeight(12),
    paddingHorizontal: responsiveWidth(5),
    paddingTop: responsiveHeight(2),
  },
  crownIcon: {
    fontSize: 14,
    marginRight: 4,
  },
  deleteButton: {
    alignItems: "center",
    backgroundColor: commonStyles.colors.quaternaryColor,
    borderRadius: commonStyles.borderRadius.large,
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    paddingHorizontal: responsiveWidth(4),
    paddingVertical: responsiveHeight(2),
    ...Platform.select({
      android: { elevation: 2 },
      ios: {
        shadowColor: colors.palette.neutral900,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
      },
    }),
  },
  deleteButtonText: {
    color: colors.palette.neutral100,
    fontFamily: CommonStyles.fontFamily.fontFamily,
    fontSize: 16,
    textAlign: "center",
  },
  fieldCard: {
    backgroundColor: commonStyles.colors.secondaryColor,
    borderRadius: commonStyles.borderRadius.medium,
    marginBottom: responsiveHeight(1.5),
    paddingHorizontal: responsiveWidth(4),
    paddingVertical: responsiveHeight(1.5),
    ...Platform.select({
      android: { elevation: 2 },
      ios: {
        shadowColor: colors.palette.neutral900,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
      },
    }),
  },
  fieldsContainer: {
    marginBottom: responsiveHeight(2),
    marginTop: responsiveHeight(2),
  },
  loaderContainer: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  logoutButton: {
    alignItems: "center",
    backgroundColor: commonStyles.colors.quinaryColor,
    borderRadius: commonStyles.borderRadius.large,
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: responsiveWidth(4),
    paddingVertical: responsiveHeight(2),
    ...Platform.select({
      android: { elevation: 2 },
      ios: {
        shadowColor: colors.palette.neutral900,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
      },
    }),
  },
  logoutButtonText: {
    color: colors.customColors.BLACK,
    fontFamily: CommonStyles.fontFamily.fontFamily,
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  mainContainer: {
    backgroundColor: colors.palette.neutral200,
    flex: 1,
  },
  premiumMemberRow: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: responsiveHeight(0.5),
  },
  premiumMemberText: {
    color: colors.palette.neutral600,
    fontFamily: CommonStyles.fontFamily.fontFamily,
    fontSize: 14,
  },
  titleText: {
    fontWeight: "bold",
  },
  userName: {
    color: colors.customColors.BLACK,
    fontFamily: CommonStyles.fontFamily.fontFamily,
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
  },
})
