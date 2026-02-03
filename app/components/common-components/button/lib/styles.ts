import { StyleSheet } from "react-native"
import { responsiveWidth } from "react-native-responsive-dimensions"

import { colors } from "@/theme/colors"
import { commonStyles } from "@/theme/styles"

import { BORDER_RADIUS, FONT_FAMILY, FONT_SIZE, PADDING_HORIZONTAL } from "./constants"

export const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: "center",
    backgroundColor: commonStyles.colors.primaryColor,
    borderRadius: commonStyles.borderRadius.small,
    flexDirection: "row",
    justifyContent: "center",
    paddingHorizontal: PADDING_HORIZONTAL,
  },
  buttonContainerActive: {
    alignItems: "center",
    backgroundColor: commonStyles.colors.primaryColor,
    borderRadius: BORDER_RADIUS,
    flexDirection: "row",
    justifyContent: "center",
    paddingHorizontal: PADDING_HORIZONTAL,
  },
  buttonContainerDisabled: {
    alignItems: "center",
    backgroundColor: colors.palette.neutral200,
    borderRadius: BORDER_RADIUS,
    flexDirection: "row",
    justifyContent: "center",
    paddingHorizontal: PADDING_HORIZONTAL,
  },
  buttonText: {
    color: colors.palette.neutral100,
    fontFamily: FONT_FAMILY,
    fontSize: FONT_SIZE,
    textTransform: commonStyles.textTransform.capitalize as
      | "capitalize"
      | "lowercase"
      | "uppercase"
      | "none",
  },
  buttonTextCenter: {
    alignSelf: "center",
  },
  buttonTextDisabled: {
    color: colors.customColors.BLACK,
  },
  buttonTextLeft: {
    flex: 1,
    textAlign: "left",
  },
  iconContainer: {
    marginRight: responsiveWidth(3),
  },
})
