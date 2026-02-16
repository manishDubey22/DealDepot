import { Platform, StyleSheet } from "react-native"
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions"

import { colors } from "@/theme/colors"
import { CommonStyles } from "@/theme/common-styles"

// const { width } = Dimensions.get("window")

export const styles = StyleSheet.create({
  cardBox: {
    alignItems: "center",
    backgroundColor: colors.palette.neutral100,
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
    marginHorizontal: 2,
    paddingHorizontal: responsiveWidth(4),
    paddingVertical: 14,
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
  cardBoxLeft: {
    alignItems: "center",
    flex: 1,
    flexDirection: "row",
    gap: 12,
    justifyContent: "flex-start",
  },
  categoryHeader: {
    backgroundColor: colors.palette.neutral200,
    marginTop: responsiveHeight(1),
    paddingHorizontal: responsiveWidth(4),
    paddingVertical: responsiveHeight(1.2),
  },
  categoryHeaderText: {
    color: colors.customColors.BLACK,
    fontFamily: CommonStyles.fontFamily.fontFamily,
    fontSize: responsiveFontSize(1.8),
    fontWeight: "600",
  },
  container: {
    flex: 1,
    paddingBottom: responsiveHeight(4),
    paddingHorizontal: responsiveWidth(2),
    paddingTop: responsiveHeight(1),
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  emptyText: {
    color: colors.palette.neutral600,
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
  },
  hintText: {
    color: colors.palette.neutral600,
    fontSize: 13,
    marginBottom: 8,
    textAlign: "center",
  },
  image: {
    borderRadius: 8,
    height: 45,
    width: 45,
  },
  imageContainer: {
    borderRadius: 8,
    overflow: "hidden",
  },
  loaderContainer: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  mainContainer: {
    backgroundColor: colors.palette.neutral200,
    flex: 1,
  },
  modalContent: {
    backgroundColor: colors.palette.neutral100,
    borderRadius: 12,
    maxHeight: "70%",
    padding: 16,
  },
  modalOption: {
    borderBottomColor: colors.palette.neutral300,
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingVertical: 12,
  },
  modalOptionText: {
    fontFamily: CommonStyles.fontFamily.fontFamily,
    fontSize: 16,
  },
  modalOverlay: {
    backgroundColor: colors.palette.neutral900,
    flex: 1,
    justifyContent: "center",
    opacity: 0.5,
    padding: 24,
  },
  modalTitle: {
    fontFamily: CommonStyles.fontFamily.fontFamily,
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 16,
    textAlign: "center",
  },
  peerGroupButton: {
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: colors.customColors.GREEN,
    borderRadius: 10,
    marginBottom: 12,
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  peerGroupButtonDisabled: {
    backgroundColor: colors.palette.grey500,
  },
  peerGroupButtonText: {
    color: colors.palette.neutral100,
    fontFamily: CommonStyles.fontFamily.fontFamily,
    fontSize: 14,
    fontWeight: "600",
  },
  priceContainer: {
    alignItems: "flex-end",
  },
  priceText: {
    color: colors.customColors.BLACK,
    fontFamily: CommonStyles.fontFamily.fontFamily,
    fontSize: 14,
    fontWeight: "600",
  },
  productDesc: {
    color: colors.customColors.BLACK,
    fontFamily: CommonStyles.fontFamily.fontFamily,
    fontSize: 14,
    fontWeight: "500",
  },
  productId: {
    color: colors.palette.neutral600,
    fontFamily: CommonStyles.fontFamily.fontFamily,
    fontSize: 12,
    marginTop: 2,
  },
  subscribeButton: {
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: colors.customColors.GREEN,
    borderRadius: 10,
    marginTop: 16,
    paddingHorizontal: 20,
    paddingVertical: 14,
  },
  subscribeButtonText: {
    color: colors.palette.neutral100,
    fontFamily: CommonStyles.fontFamily.fontFamily,
    fontSize: 14,
    fontWeight: "600",
  },
})
