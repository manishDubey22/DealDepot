import { TouchableOpacityProps, ViewStyle } from "react-native"

import { colors } from "./colors"
import { spacing } from "./spacing" // @demo remove-current-line

/* Use this file to define styles that are used in multiple places in your app. */
export const $styles = {
  row: { flexDirection: "row" } as ViewStyle,
  flex1: { flex: 1 } as ViewStyle,
  flexWrap: { flexWrap: "wrap" } as ViewStyle,

  // @demo remove-block-start
  container: {
    paddingTop: spacing.lg + spacing.xl,
    paddingHorizontal: spacing.lg,
  } as ViewStyle,
  // @demo remove-block-end
  toggleInner: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  } as ViewStyle,
  touchableOpacity: {
    activeOpacity: 0.8,
  } as TouchableOpacityProps,
}

export const commonStyles = {
  borderColor: {
    primary: colors.customColors.GREEN,
    quaternary: colors.customColors.WHITE,
    secondary: colors.customColors.MEDIUM_GRAY,
    tertiary: colors.customColors.BLACK,
  },
  borderRadius: {
    large: 12,
    medium: 8,
    small: 4,
  },
  borderWidth: {
    large: 3,
    medium: 2,
    small: 1,
  },
  boxShadow: {
    small: {
      shadowColor: colors.customColors.GREEN,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
    },
  },
  colors: {
    primaryColor: colors.customColors.GREEN,
    secondaryColor: colors.customColors.WHITE,
  },
  fontFamily: {
    bold: "Arial-Rounded-Bold",
    regular: "Arial-Rounded-Regular",
  },
  fontSize: {
    large: 20,
    medium: 16,
    small: 12,
  },
  fontStyle: {
    italic: "italic",
    normal: "normal",
  },
  fontWeight: {
    bold: "700",
    light: "300",
    medium: "500",
    regular: "400",
  },
  textAlign: {
    center: "center",
    left: "left",
    right: "right",
  },
  textDecoration: {
    none: "none",
    underline: "underline",
  },
  textTransform: {
    capitalize: "capitalize",
    lowercase: "lowercase",
    uppercase: "uppercase",
  },
}
