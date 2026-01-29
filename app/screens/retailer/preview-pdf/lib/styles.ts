import { StyleSheet } from "react-native"

import { colors } from "@/theme/colors"
import { CommonStyles } from "@/theme/common-styles"

export const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: colors.customColors.GREEN,
    borderRadius: 8,
    flex: 1,
    padding: 16,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 12,
    marginTop: 20,
  },
  buttonDisabled: {
    backgroundColor: colors.palette.neutral300,
    opacity: 0.6,
  },
  buttonText: {
    color: colors.palette.neutral100,
    fontFamily: CommonStyles.fontFamily.fontFamily,
    fontSize: 16,
    fontWeight: "600",
  },
  container: {
    flex: 1,
    padding: 16,
  },
  errorButton: {
    marginTop: 20,
  },
  errorContainer: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  errorText: {
    color: colors.palette.red500,
    fontFamily: CommonStyles.fontFamily.fontFamily,
    fontSize: 16,
    textAlign: "center",
  },
  loaderContainer: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  loaderText: {
    color: colors.palette.neutral550,
    fontFamily: CommonStyles.fontFamily.fontFamily,
    fontSize: 16,
    marginTop: 12,
  },
  mainContainer: {
    backgroundColor: colors.palette.neutral100,
    flex: 1,
  },
})
