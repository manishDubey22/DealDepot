import { StyleSheet } from "react-native"

import { colors } from "@/theme/colors"
import { commonStyles } from "@/theme/styles"

export const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  optionRow: {
    borderBottomColor: colors.palette.grey300,
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingVertical: 14,
  },
  optionText: {
    color: colors.palette.charcoal500,
    fontFamily: commonStyles.fontFamily.bold,
    fontSize: 16,
  },
  selectedOptionText: {
    color: colors.customColors.GREEN,
  },
  title: {
    color: colors.palette.charcoal500,
    fontFamily: commonStyles.fontFamily.bold,
    fontSize: 20,
    marginBottom: 8,
    textAlign: "center",
  },
})
