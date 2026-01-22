import React from "react"
import { Text, View } from "react-native"
import Toast, { BaseToast, ErrorToast } from "react-native-toast-message"

import {
  CONTENT_CONTAINER_PADDING_HORIZONTAL,
  ERROR_TEXT_COLOR,
  SUCCESS_BORDER_LEFT_COLOR,
  SUCCESS_TEXT_COLOR,
  TOMATO_TOAST_BACKGROUND_COLOR,
  TOMATO_TOAST_HEIGHT,
  TEXT_FONT_SIZE,
  TEXT_FONT_WEIGHT,
} from "./lib/constants"
import type { ToastProps } from "./lib/types"

export const toastConfig = {
  success: (props: any) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: SUCCESS_BORDER_LEFT_COLOR }}
      contentContainerStyle={{ paddingHorizontal: CONTENT_CONTAINER_PADDING_HORIZONTAL }}
      text1Style={{
        color: SUCCESS_TEXT_COLOR,
        fontSize: TEXT_FONT_SIZE,
        fontWeight: TEXT_FONT_WEIGHT,
        textTransform: "capitalize",
      }}
      text2Style={{
        fontSize: TEXT_FONT_SIZE,
        fontWeight: TEXT_FONT_WEIGHT,
      }}
    />
  ),

  error: (props: any) => (
    <ErrorToast
      {...props}
      text1Style={{
        color: ERROR_TEXT_COLOR,
        fontSize: TEXT_FONT_SIZE,
      }}
      text2Style={{
        color: ERROR_TEXT_COLOR,
        fontSize: TEXT_FONT_SIZE,
      }}
    />
  ),

  tomatoToast: ({ text1, props }: ToastProps) => (
    <View
      style={{
        height: TOMATO_TOAST_HEIGHT,
        width: "100%",
        backgroundColor: TOMATO_TOAST_BACKGROUND_COLOR,
      }}
    >
      <Text>{text1}</Text>
      <Text>{props?.uuid}</Text>
    </View>
  ),
}
