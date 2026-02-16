import { StyleSheet } from "react-native"
import { responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions"

import { colors } from "@/theme/colors"
import { CommonStyles } from "@/theme/common-styles"

export const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: colors.customColors.WHITE,
    flex: 1,
    paddingHorizontal: responsiveWidth(5),
  },
  safeArea: {
    flex: 1,
  },
  stepBlock: {
    marginTop: responsiveHeight(3),
  },
  stepButton: {
    marginTop: responsiveHeight(1.5),
  },
  stepTitle: {
    color: colors.customColors.BLACK,
    fontFamily: CommonStyles.fontFamily.fontFamily,
    fontSize: 16,
    fontWeight: "500",
  },
  peerGroupButton: {
    alignItems: "center",
    borderColor: colors.palette.neutral400,
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: responsiveHeight(1),
    paddingHorizontal: responsiveWidth(4),
    paddingVertical: responsiveHeight(1.5),
  },
  peerGroupButtonText: {
    color: colors.palette.neutral700,
    fontFamily: CommonStyles.fontFamily.fontFamily,
    fontSize: 16,
  },
  modalOverlay: {
    backgroundColor: "rgba(0,0,0,0.5)",
    flex: 1,
    justifyContent: "center",
    padding: responsiveWidth(5),
  },
  modalContent: {
    backgroundColor: colors.customColors.WHITE,
    borderRadius: 12,
    maxHeight: "70%",
    padding: responsiveWidth(4),
  },
  modalTitle: {
    fontFamily: CommonStyles.fontFamily.fontFamily,
    fontSize: 18,
    fontWeight: "600",
    marginBottom: responsiveHeight(2),
    textAlign: "center",
  },
  peerOption: {
    borderBottomColor: colors.palette.neutral200,
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingVertical: responsiveHeight(1.5),
  },
  peerOptionText: {
    fontFamily: CommonStyles.fontFamily.fontFamily,
    fontSize: 16,
  },
  modalCloseButton: {
    marginTop: responsiveHeight(2),
    paddingVertical: responsiveHeight(1),
  },
  modalCloseText: {
    color: colors.customColors.GREEN,
    fontFamily: CommonStyles.fontFamily.fontFamily,
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
  },
})
