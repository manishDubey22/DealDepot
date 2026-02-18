import { StyleSheet } from "react-native"

import { colors } from "@/theme/colors"
import { spacing } from "@/theme/spacing"
import { commonStyles } from "@/theme/styles"

export const styles = StyleSheet.create({
  addToCartButton: {
    alignItems: "center",
    backgroundColor: commonStyles.colors.primaryColor,
    borderRadius: 14,
    flex: 1,
    paddingVertical: 14,
  },
  addToCartButtonDisabled: {
    backgroundColor: colors.palette.grey300,
    opacity: 0.6,
  },
  addToCartButtonText: {
    color: colors.palette.neutral100,
    fontFamily: commonStyles.fontFamily.bold,
    fontSize: 16,
    fontWeight: commonStyles.fontWeight.semiBold,
  },
  buttonsRow: {
    flexDirection: "row",
    gap: spacing.sm,
  },
  cancelButton: {
    alignItems: "center",
    backgroundColor: commonStyles.colors.backgroundQuinary,
    borderRadius: commonStyles.borderRadius.medium,
    flex: 1,
    opacity: 0.8,
    paddingVertical: 14,
  },
  cancelButtonText: {
    color: colors.palette.neutral900,
    fontFamily: commonStyles.fontFamily.regular,
    fontSize: 16,
    fontWeight: commonStyles.fontWeight.medium,
  },
  contentContainer: {
    flex: 1,
    paddingBottom: spacing.xl,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
  },
  divider: {
    backgroundColor: colors.palette.grey200,
    height: 1,
    marginBottom: spacing.lg,
    width: "100%",
  },
  pricingSection: {
    marginBottom: spacing.xl,
  },
  quantityInput: {
    color: colors.customColors.BLACK,
    fontFamily: commonStyles.fontFamily.bold,
    fontSize: 24,
    fontWeight: commonStyles.fontWeight.semiBold,
    textAlign: "center",
    width: "100%",
  },
  quantityInputContainer: {
    alignItems: "center",
    alignSelf: "center",
    borderColor: commonStyles.colors.primaryColor,
    borderRadius: 14,
    borderWidth: 2,
    height: 60,
    justifyContent: "center",
    marginBottom: spacing.lg,
    width: 100,
  },
  title: {
    color: colors.customColors.BLACK,
    fontFamily: commonStyles.fontFamily.bold,
    fontSize: 18,
    fontWeight: commonStyles.fontWeight.semiBold,
    marginBottom: spacing.xs,
    textAlign: "center",
  },
  totalPriceText: {
    color: commonStyles.colors.primaryColor,
    fontFamily: commonStyles.fontFamily.bold,
    fontSize: 16,
    fontWeight: commonStyles.fontWeight.semiBold,
  },
  unitPriceText: {
    color: colors.palette.neutral550,
    fontFamily: commonStyles.fontFamily.regular,
    fontSize: commonStyles.fontSize.small,
    marginBottom: spacing.xs,
  },
  wholesalerName: {
    color: colors.palette.neutral550,
    fontFamily: commonStyles.fontFamily.regular,
    fontSize: commonStyles.fontSize.small,
    marginBottom: spacing.sm,
    textAlign: "center",
  },
})
