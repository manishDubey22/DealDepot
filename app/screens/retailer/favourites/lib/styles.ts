import { StyleSheet } from "react-native"
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions"

import { colors } from "@/theme/colors"
import { CommonStyles } from "@/theme/common-styles"
import { commonStyles } from "@/theme/styles"

// const { width } = Dimensions.get("window")

export const styles = StyleSheet.create({
  cardBox: {
    alignItems: "center",
    backgroundColor: colors.palette.neutral100,
    borderColor: colors.palette.grey300,
    borderRadius: 12,
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 14,
    marginHorizontal: 2,
    paddingHorizontal: responsiveWidth(4),
    paddingVertical: 14,
  },
  cardBoxLeft: {
    alignItems: "flex-start",
    flex: 1,
    flexDirection: "row",
    gap: 12,
    justifyContent: "flex-start",
  },
  categoryHeader: {
    backgroundColor: colors.palette.neutral200,
    marginTop: responsiveHeight(1.2),
    paddingHorizontal: responsiveWidth(4),
    paddingVertical: responsiveHeight(1.2),
  },
  categoryHeaderText: {
    color: colors.customColors.BLACK,
    fontFamily: CommonStyles.fontFamily.fontFamily,
    fontSize: responsiveFontSize(1.8),
    fontWeight: "600",
  },
  categoryHeaderValue: {
    color: colors.customColors.GREEN,
    fontFamily: CommonStyles.fontFamily.fontFamily,
    fontWeight: "600",
  },
  changeButton: {
    alignItems: "center",
    backgroundColor: commonStyles.colors.primaryColor,
    borderRadius: 12,
    flexDirection: "row",
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  changeButtonDisabled: {
    backgroundColor: colors.palette.grey500,
  },
  changeButtonIcon: {
    height: 14,
    tintColor: colors.palette.neutral100,
    width: 14,
  },
  changeButtonText: {
    color: colors.palette.neutral100,
    fontFamily: CommonStyles.fontFamily.fontFamily,
    fontSize: 16,
    fontWeight: "600",
  },
  container: {
    flex: 1,
    paddingBottom: responsiveHeight(4),
    paddingHorizontal: responsiveWidth(1),
    paddingTop: responsiveHeight(0.5),
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
    borderRadius: 12,
    height: 88,
    width: 88,
  },
  imageContainer: {
    borderRadius: 12,
    overflow: "hidden",
    position: "relative",
  },
  infoContainer: {
    flex: 1,
    gap: 2,
    justifyContent: "center",
  },
  likeBadge: {
    alignItems: "center",
    backgroundColor: colors.palette.neutral100,
    borderRadius: 999,
    height: 28,
    justifyContent: "center",
    position: "absolute",
    right: 4,
    top: 4,
    width: 28,
  },
  likeIcon: {
    height: 16,
    width: 16,
  },
  loaderContainer: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  madrPriceLabel: {
    color: colors.palette.grey700,
    fontFamily: CommonStyles.fontFamily.fontFamily,
    fontSize: 14,
    marginTop: 10,
  },
  mainContainer: {
    backgroundColor: colors.palette.neutral200,
    flex: 1,
  },
  peerGroupCard: {
    alignItems: "center",
    backgroundColor: colors.palette.green50,
    borderColor: colors.palette.green100,
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    paddingHorizontal: responsiveWidth(3),
    paddingVertical: 12,
  },
  peerGroupCurrentText: {
    color: colors.palette.grey700,
    fontFamily: CommonStyles.fontFamily.fontFamily,
    fontSize: 20,
  },
  peerGroupTitle: {
    color: colors.customColors.BLACK,
    fontFamily: CommonStyles.fontFamily.fontFamily,
    fontSize: responsiveFontSize(2.2),
    fontWeight: "600",
  },
  priceContainer: {
    alignItems: "flex-end",
    justifyContent: "flex-end",
    minWidth: 90,
  },
  priceText: {
    color: colors.customColors.GREEN,
    fontFamily: CommonStyles.fontFamily.fontFamily,
    fontSize: 35,
    fontWeight: "600",
  },
  productDesc: {
    color: colors.customColors.BLACK,
    fontFamily: CommonStyles.fontFamily.fontFamily,
    fontSize: 25,
    fontWeight: "700",
  },
  productId: {
    color: colors.palette.neutral600,
    fontFamily: CommonStyles.fontFamily.fontFamily,
    fontSize: 20,
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
  successBanner: {
    alignItems: "center",
    backgroundColor: colors.customColors.GREEN,
    borderRadius: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: responsiveWidth(2),
    marginTop: responsiveHeight(0.8),
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  successBannerLeft: {
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
  },
  successBannerText: {
    color: colors.palette.neutral100,
    fontFamily: CommonStyles.fontFamily.fontFamily,
    fontSize: 17,
    fontWeight: "600",
  },
  successCloseIcon: {
    height: 16,
    tintColor: colors.palette.neutral100,
    width: 16,
  },
})
