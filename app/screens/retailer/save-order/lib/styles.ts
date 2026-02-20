import { StyleSheet } from "react-native"

import { colors } from "@/theme/colors"
import { CommonStyles } from "@/theme/common-styles"
import { spacing } from "@/theme/spacing"
import { commonStyles } from "@/theme/styles"

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: spacing.md,
    paddingBottom: spacing.lg,
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
  header: {
    alignItems: "center",
    backgroundColor: commonStyles.colors.backgroundQuinary,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerTitle: {
    color: commonStyles.colors.text,
    fontFamily: CommonStyles.fontFamily.fontFamily,
    fontSize: commonStyles.fontSize.large,
    fontWeight: commonStyles.fontWeight.bold,
  },
  loaderContainer: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  mainContainer: {
    backgroundColor: commonStyles.colors.backgroundTertiary,
    flex: 1,
  },
  refreshButton: {
    padding: spacing.sm,
  },
  refreshButtonText: {
    color: commonStyles.colors.primary,
    fontFamily: CommonStyles.fontFamily.fontFamily,
    fontSize: commonStyles.fontSize.small,
    fontWeight: commonStyles.fontWeight.medium,
  },
})
