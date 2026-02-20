import { StyleSheet } from "react-native"

import { colors } from "@/theme/colors"
import { CommonStyles } from "@/theme/common-styles"
import { commonStyles } from "@/theme/styles"

export const orderCardStyles = StyleSheet.create({
  card: {
    backgroundColor: colors.palette.neutral100,
    borderRadius: 16,
    elevation: 3,
    marginBottom: 16,
    padding: 16,
    shadowColor: colors.palette.black500,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  dateText: {
    color: colors.palette.neutral550,
    fontFamily: CommonStyles.fontFamily.fontFamily,
    fontSize: 13,
  },
  header: {
    alignItems: "flex-start",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  headerLeft: {},
  itemsSection: {},
  orderId: {
    color: colors.palette.neutral900,
    fontFamily: CommonStyles.fontFamily.fontFamily,
    fontSize: 16,
    fontWeight: "700",
    marginTop: 4,
  },
  pdfButton: {
    alignItems: "center",
    alignSelf: "flex-start",
    backgroundColor: commonStyles.colors.primaryLight,
    borderRadius: commonStyles.borderRadius.large,
    flexDirection: "row",
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  pdfButtonText: {
    color: colors.customColors.GREEN,
    fontFamily: CommonStyles.fontFamily.fontFamily,
    fontSize: 12,
    fontWeight: "500",
    marginLeft: 6,
  },
  pdfIcon: {
    height: 14,
    width: 14,
  },
  separator: {
    backgroundColor: colors.palette.neutral200,
    height: 1,
  },
  totalLabel: {
    color: colors.palette.neutral900,
    fontFamily: CommonStyles.fontFamily.fontFamily,
    fontSize: 16,
  },
  totalRow: {
    alignItems: "center",
    borderTopColor: colors.palette.neutral200,
    borderTopWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
    paddingTop: 8,
  },
  totalValue: {
    color: colors.customColors.GREEN,
    fontFamily: CommonStyles.fontFamily.fontFamily,
    fontSize: 18,
    fontWeight: "700",
  },
})
