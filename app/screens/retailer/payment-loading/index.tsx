import { View, Text, ActivityIndicator } from "react-native"

import { colors } from "@/theme/colors"

import { usePaymentLoading } from "./hooks/use-payment-loading"
import { UI_TEXT } from "./lib/constants"
import { styles } from "./lib/styles"
import type { PaymentLoadingScreenProps } from "./lib/types"

export default function PaymentLoading(props: PaymentLoadingScreenProps) {
  usePaymentLoading(props)

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={colors.customColors.GREEN} />
      <Text style={styles.loadingText}>{UI_TEXT.LOADING}</Text>
      <Text style={styles.verifyingText}>{UI_TEXT.VERIFYING}</Text>
    </View>
  )
}
