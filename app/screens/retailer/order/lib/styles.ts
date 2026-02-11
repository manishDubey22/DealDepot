import { Platform, StyleSheet } from "react-native"
import { responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions"

import { colors } from "@/theme/colors"
import { CommonStyles } from "@/theme/common-styles"

export const styles = StyleSheet.create({
  cardBox: {
    backgroundColor: colors.palette.neutral100,
    borderRadius: 12,
    marginBottom: 14,
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
    flexDirection: "row",
    gap: 12,
  },
  container: {
    flex: 1,
    paddingHorizontal: responsiveWidth(5),
    paddingTop: responsiveHeight(1),
  },
  contentContainer: {
    paddingBottom: responsiveHeight(18),
  },
  emptyContainer: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    padding: 24,
  },
  emptyText: {
    color: colors.palette.neutral550,
    fontFamily: CommonStyles.fontFamily.fontFamily,
    fontSize: 18,
    textAlign: "center",
  },
  footerSummary: {
    alignItems: "center",
    backgroundColor: colors.palette.neutral200,
    borderTopColor: colors.palette.neutral300,
    borderTopWidth: StyleSheet.hairlineWidth,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: responsiveWidth(5),
    paddingVertical: responsiveHeight(2),
  },
  footerSummaryLeft: {
    justifyContent: "center",
  },
  footerSummaryTotalLabel: {
    color: colors.palette.neutral600,
    fontFamily: CommonStyles.fontFamily.fontFamily,
    fontSize: 14,
  },
  footerSummaryTotalPrice: {
    color: colors.customColors.BLACK,
    fontFamily: CommonStyles.fontFamily.fontFamily,
    fontSize: 22,
    fontWeight: "700",
    marginTop: 2,
  },
  imageContainer: {
    width: 72,
  },
  loaderContainer: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    padding: 24,
  },
  mainContainer: {
    backgroundColor: colors.palette.neutral200,
    flex: 1,
  },
  priceContainer: {
    alignItems: "flex-end",
    justifyContent: "flex-start",
    minWidth: 56,
  },
  priceText: {
    color: colors.customColors.GREEN,
    fontFamily: CommonStyles.fontFamily.fontFamily,
    fontSize: 16,
    fontWeight: "700",
  },
  productCategory: {
    color: colors.palette.neutral500,
    fontFamily: CommonStyles.fontFamily.fontFamily,
    fontSize: 13,
    marginTop: 2,
  },
  productDesc: {
    color: colors.customColors.BLACK,
    fontFamily: CommonStyles.fontFamily.fontFamily,
    fontSize: 15,
    fontWeight: "700",
  },
  productId: {
    color: colors.palette.neutral500,
    fontFamily: CommonStyles.fontFamily.fontFamily,
    fontSize: 12,
    marginTop: 2,
  },
  productImage: {
    borderRadius: 8,
    height: 72,
    width: 72,
  },
  productInfo: {
    flex: 1,
    gap: 2,
    justifyContent: "flex-start",
    minWidth: 0,
  },
  quantityButton: {
    alignItems: "center",
    borderRadius: 999,
    height: 36,
    justifyContent: "center",
    width: 36,
  },
  quantityButtonMinus: {
    backgroundColor: colors.palette.neutral300,
  },
  quantityButtonPlus: {
    backgroundColor: colors.customColors.GREEN,
  },
  quantityButtonText: {
    color: colors.palette.neutral100,
    fontFamily: CommonStyles.fontFamily.fontFamily,
    fontSize: 20,
    fontWeight: "700",
  },
  quantityButtonTextMinus: {
    color: colors.palette.neutral700,
  },
  quantityContainer: {
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
    justifyContent: "flex-end",
    marginTop: 10,
  },
  quantityPill: {
    alignItems: "center",
    backgroundColor: colors.customColors.GREEN,
    borderRadius: 999,
    minWidth: 40,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  quantityText: {
    color: colors.palette.neutral100,
    fontFamily: CommonStyles.fontFamily.fontFamily,
    fontSize: 16,
    fontWeight: "700",
    textAlign: "center",
  },
  saveOrderButton: {
    borderRadius: 999,
    minWidth: 120,
    paddingHorizontal: responsiveWidth(6),
    paddingVertical: responsiveHeight(1.8),
  },
  wholesalerText: {
    color: colors.customColors.GREEN,
    fontFamily: CommonStyles.fontFamily.fontFamily,
    fontSize: 13,
    fontWeight: "600",
    marginTop: 2,
  },
})

export const modalStyles = StyleSheet.create({
  button: {
    borderRadius: 8,
    flex: 1,
    padding: 12,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 12,
  },
  cancelButton: {
    backgroundColor: colors.palette.neutral200,
  },
  cancelButtonText: {
    color: colors.palette.neutral900,
    fontFamily: CommonStyles.fontFamily.fontFamily,
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  container: {
    backgroundColor: colors.palette.neutral100,
    borderRadius: 12,
    padding: 20,
    width: "80%",
  },
  input: {
    borderColor: colors.palette.neutral400,
    borderRadius: 8,
    borderWidth: 1,
    fontFamily: CommonStyles.fontFamily.fontFamily,
    fontSize: 18,
    marginBottom: 20,
    padding: 12,
    textAlign: "center",
  },
  itemId: {
    color: colors.palette.neutral550,
    fontFamily: CommonStyles.fontFamily.fontFamily,
    fontSize: 14,
  },
  itemInfo: {
    marginBottom: 16,
  },
  itemName: {
    color: colors.palette.neutral900,
    fontFamily: CommonStyles.fontFamily.fontFamily,
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  overlay: {
    alignItems: "center",
    backgroundColor: colors.palette.grey500,
    flex: 1,
    justifyContent: "center",
  },
  submitButton: {
    backgroundColor: colors.customColors.GREEN,
  },
  submitButtonText: {
    color: colors.palette.neutral100,
    fontFamily: CommonStyles.fontFamily.fontFamily,
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  title: {
    color: colors.palette.neutral900,
    fontFamily: CommonStyles.fontFamily.fontFamily,
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 16,
    textAlign: "center",
  },
})
