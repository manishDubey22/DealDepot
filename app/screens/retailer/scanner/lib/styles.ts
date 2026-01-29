import { StyleSheet, Dimensions } from "react-native"

import { colors } from "@/theme/colors"
import { CommonStyles } from "@/theme/common-styles"

const { width } = Dimensions.get("window")

export const styles = StyleSheet.create({
  bottomLeft: {
    borderBottomLeftRadius: 12,
    borderBottomWidth: 4,
    borderLeftWidth: 4,
    bottom: -2,
    left: -2,
  },
  bottomRight: {
    borderBottomRightRadius: 12,
    borderBottomWidth: 4,
    borderRightWidth: 4,
    bottom: -2,
    right: -2,
  },
  buttonContainer: {
    gap: 12,
    width: "100%",
  },
  camera: {
    flex: 1,
  },
  container: {
    backgroundColor: colors.palette.black500,
    flex: 1,
  },
  errorContainer: {
    alignItems: "center",
    backgroundColor: colors.palette.neutral100,
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  errorIcon: {
    fontSize: 64,
    marginBottom: 20,
  },
  errorMessage: {
    color: colors.palette.neutral550,
    fontFamily: CommonStyles.fontFamily.fontFamily,
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 30,
    textAlign: "center",
  },
  errorTitle: {
    color: colors.palette.neutral900,
    fontFamily: CommonStyles.fontFamily.fontFamily,
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 12,
    textAlign: "center",
  },
  instructionText: {
    color: colors.palette.neutral100,
    fontFamily: CommonStyles.fontFamily.fontFamily,
    fontSize: 16,
    marginTop: 30,
    paddingHorizontal: 20,
    textAlign: "center",
  },
  overlay: {
    alignItems: "center",
    backgroundColor: colors.transparent,
    flex: 1,
    justifyContent: "center",
  },
  permissionContainer: {
    alignItems: "center",
    backgroundColor: colors.palette.neutral100,
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  permissionIcon: {
    fontSize: 64,
    marginBottom: 20,
  },
  permissionMessage: {
    color: colors.palette.neutral550,
    fontFamily: CommonStyles.fontFamily.fontFamily,
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 30,
    textAlign: "center",
  },
  permissionTitle: {
    color: colors.palette.neutral900,
    fontFamily: CommonStyles.fontFamily.fontFamily,
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 12,
    textAlign: "center",
  },
  scanFrame: {
    backgroundColor: colors.transparent,
    borderColor: colors.customColors.GREEN,
    borderRadius: 12,
    borderWidth: 2,
    height: width * 0.8,
    width: width * 0.8,
  },
  scanFrameCorner: {
    borderColor: colors.customColors.GREEN,
    height: 30,
    position: "absolute",
    width: 30,
  },
  topLeft: {
    borderLeftWidth: 4,
    borderTopLeftRadius: 12,
    borderTopWidth: 4,
    left: -2,
    top: -2,
  },
  topRight: {
    borderRightWidth: 4,
    borderTopRightRadius: 12,
    borderTopWidth: 4,
    right: -2,
    top: -2,
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
