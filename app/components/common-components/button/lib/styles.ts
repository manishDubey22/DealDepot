import { StyleSheet } from "react-native"

import { colors } from "@/theme/colors"

import { BORDER_RADIUS, FONT_FAMILY, FONT_SIZE, PADDING_HORIZONTAL } from "./constants"

export const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: colors.customColors.GREEN,
    borderRadius: BORDER_RADIUS,
    paddingHorizontal: PADDING_HORIZONTAL,
  },
  buttonText: {
    alignSelf: "center",
    color: colors.palette.neutral100,
    fontFamily: FONT_FAMILY,
    fontSize: FONT_SIZE,
  },
})
