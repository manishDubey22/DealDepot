import { TextStyle, ViewStyle } from "react-native"

import type { ThemedStyle } from "@/theme/types"

export const $backgroundImage: ThemedStyle<ViewStyle> = () => ({
  alignItems: "center",
  flex: 1,
  justifyContent: "center",
  paddingHorizontal: 21.5,
  paddingVertical: 228,
})

export const $buttonContainer: ThemedStyle<ViewStyle> = () => ({
  flexDirection: "column",
  gap: 98,
  width: "100%",
})

export const $container: ThemedStyle<ViewStyle> = ({ colors }) => ({
  backgroundColor: colors.palette.neutral100,
  flex: 1,
})

export const $content: ThemedStyle<ViewStyle> = () => ({
  alignItems: "center",
  width: "100%",
})

export const $questionText: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: `${colors.palette.neutral550}CC`, // 80% opacity (CC = 204/255 ≈ 0.8)
  fontFamily: "Arial-Rounded-Bold",
  fontSize: 24,
  fontWeight: "700",
  marginBottom: 98,
  textAlign: "center",
})

export const $safeArea: ThemedStyle<ViewStyle> = () => ({
  flex: 1,
})
