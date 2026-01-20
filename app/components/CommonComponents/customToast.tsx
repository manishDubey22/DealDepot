import React from "react"
import { Text, View } from "react-native"
import Toast, { BaseToast, ErrorToast } from "react-native-toast-message"
export const toastConfig = {
  success: (props: any) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: "green" }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 12,
        fontWeight: "400",
        color: "green",
        textTransform: "capitalize",
      }}
      text2Style={{
        fontSize: 12,
        fontWeight: "400",
      }}
    />
  ),

  error: (props: any) => (
    <ErrorToast
      {...props}
      text1Style={{
        fontSize: 12,
        color: "red",
      }}
      text2Style={{
        fontSize: 12,
        color: "red",
      }}
    />
  ),

  tomatoToast: ({ text1, props }: any) => (
    <View style={{ height: 60, width: "100%", backgroundColor: "tomato" }}>
      <Text>{text1}</Text>
      <Text>{props.uuid}</Text>
    </View>
  ),
}
