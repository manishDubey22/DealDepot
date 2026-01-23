import { StyleSheet } from "react-native"

import { colors } from "@/theme/colors"
import { CommonStyles } from "@/theme/common-styles"

export const styles = StyleSheet.create({
  container: { backgroundColor: colors.customColors.WHITE },
  content: {
    display: "flex",
    flexDirection: "column",
    gap: 98,
    width: "100%",
  },
  imageBackground: {
    alignItems: "center",
    display: "flex",
    height: "100%",
    justifyContent: "center",
    paddingHorizontal: 21.5,
    paddingVertical: 228,
  },
  questionText: {
    color: colors.customColors.MEDIUM_GRAY,
    fontFamily: CommonStyles.fontFamily.fontFamily,
    fontSize: 24,
    fontWeight: "700",
    textAlign: "center",
  },
})
