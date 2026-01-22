import { StyleSheet } from "react-native"

import { colors } from "@/theme/colors"

import {
  FONT_FAMILY,
  HEADER_HEIGHT,
  HEADER_PADDING_HORIZONTAL,
  HEADER_TEXT_FONT_SIZE,
  ICON_CONTAINER_PADDING,
  ICON_CONTAINER_WITHOUT_BACK_ICON_PADDING_RIGHT,
  ICON_CONTAINER_WITH_BACK_ICON_MARGIN_RIGHT,
  ICON_HEIGHT,
  ICON_PLACEHOLDER_HEIGHT,
  ICON_PLACEHOLDER_WIDTH,
  ICON_WIDTH,
  TEXT_SHADOW_COLOR,
  TEXT_SHADOW_OFFSET,
  TEXT_SHADOW_RADIUS,
} from "./constants"

export const styles = StyleSheet.create({
  header: {
    alignItems: "center",
    flexDirection: "row",
    height: HEADER_HEIGHT,
    justifyContent: "space-between",
    paddingHorizontal: HEADER_PADDING_HORIZONTAL,
  },
  headerText: {
    color: colors.customColors.WHITE,
    fontFamily: FONT_FAMILY,
    fontSize: HEADER_TEXT_FONT_SIZE,
    textAlign: "center",
    textShadowColor: TEXT_SHADOW_COLOR,
    textShadowOffset: TEXT_SHADOW_OFFSET,
    textShadowRadius: TEXT_SHADOW_RADIUS,
  },
  icon: {
    height: ICON_HEIGHT,
    width: ICON_WIDTH,
  },
  iconContainer: {
    padding: ICON_CONTAINER_PADDING,
  },
  iconContainerWithBackIcon: {
    marginRight: ICON_CONTAINER_WITH_BACK_ICON_MARGIN_RIGHT,
  },
  iconContainerWithoutBackIcon: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingRight: ICON_CONTAINER_WITHOUT_BACK_ICON_PADDING_RIGHT,
    width: "100%",
  },
  iconPlaceholder: {
    height: ICON_PLACEHOLDER_HEIGHT,
    width: ICON_PLACEHOLDER_WIDTH,
  },
  withoutImageHeader: {
    alignItems: "center",
    backgroundColor: colors.palette.neutral100,
    display: "flex",
    flexDirection: "row",
    height: 80,
    justifyContent: "space-between",
  },
})
