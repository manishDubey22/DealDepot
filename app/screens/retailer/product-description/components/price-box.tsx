import { Text, View } from "react-native"

import { styles } from "./price-box.styles"

interface PriceBoxProps {
  label: string
  value: number | string
}

export function PriceBox({ label, value }: PriceBoxProps) {
  const displayValue =
    typeof value === "number" && !isNaN(value) ? `$${value.toFixed(2)}` : `$${value || "0.00"}`

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{displayValue}</Text>
    </View>
  )
}
