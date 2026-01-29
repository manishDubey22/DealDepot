import { StyleSheet } from "react-native"

import { colors } from "@/theme/colors"
import { CommonStyles } from "@/theme/common-styles"

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
  },
  emptyContainer: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  emptyText: {
    color: colors.palette.neutral550,
    fontFamily: CommonStyles.fontFamily.fontFamily,
    fontSize: 16,
    textAlign: "center",
  },
  itemPrice: {
    color: colors.palette.neutral900,
    fontFamily: CommonStyles.fontFamily.fontFamily,
    fontSize: 14,
    fontWeight: "600",
  },
  itemQuantity: {
    color: colors.palette.neutral700,
    fontFamily: CommonStyles.fontFamily.fontFamily,
    fontSize: 14,
    fontWeight: "600",
    marginRight: 8,
  },
  itemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  itemText: {
    color: colors.palette.neutral700,
    flex: 1,
    fontFamily: CommonStyles.fontFamily.fontFamily,
    fontSize: 14,
  },
  loaderContainer: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  mainContainer: {
    backgroundColor: colors.palette.neutral100,
    flex: 1,
  },
  orderCard: {
    backgroundColor: colors.palette.neutral100,
    borderRadius: 8,
    marginBottom: 16,
    padding: 16,
    shadowColor: colors.palette.black500,
    shadowOffset: {
      height: 2,
      width: 0,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  orderDate: {
    color: colors.palette.neutral550,
    fontFamily: CommonStyles.fontFamily.fontFamily,
    fontSize: 14,
  },
  orderHeader: {
    borderBottomColor: colors.palette.neutral200,
    borderBottomWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
    paddingBottom: 12,
  },
  orderId: {
    color: colors.palette.neutral900,
    fontFamily: CommonStyles.fontFamily.fontFamily,
    fontSize: 16,
    fontWeight: "700",
  },
  orderItems: {
    marginBottom: 12,
  },
  orderTotal: {
    borderTopColor: colors.palette.neutral200,
    borderTopWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
    paddingTop: 12,
  },
  shareButton: {
    alignItems: "center",
    backgroundColor: colors.customColors.GREEN,
    borderRadius: 8,
    marginTop: 12,
    padding: 12,
  },
  shareButtonText: {
    color: colors.palette.neutral100,
    fontFamily: CommonStyles.fontFamily.fontFamily,
    fontSize: 16,
    fontWeight: "600",
  },
  totalLabel: {
    color: colors.palette.neutral900,
    fontFamily: CommonStyles.fontFamily.fontFamily,
    fontSize: 16,
    fontWeight: "700",
  },
  totalValue: {
    color: colors.customColors.GREEN,
    fontFamily: CommonStyles.fontFamily.fontFamily,
    fontSize: 18,
    fontWeight: "700",
  },
})
