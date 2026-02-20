import { StyleSheet } from "react-native"

import { colors } from "@/theme/colors"
import { CommonStyles } from "@/theme/common-styles"

export const orderItemRowStyles = StyleSheet.create({
  left: {
    flex: 1,
    marginRight: 12,
  },
  price: {
    color: colors.palette.neutral900,
    fontFamily: CommonStyles.fontFamily.fontFamily,
    fontSize: 14,
    fontWeight: "600",
  },
  productName: {
    color: colors.palette.neutral900,
    fontFamily: CommonStyles.fontFamily.fontFamily,
    fontSize: 14,
    fontWeight: "500",
  },
  quantityLine: {
    color: colors.palette.neutral550,
    fontFamily: CommonStyles.fontFamily.fontFamily,
    fontSize: 13,
    marginTop: 2,
  },
  row: {
    alignItems: "flex-start",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
  },
})
