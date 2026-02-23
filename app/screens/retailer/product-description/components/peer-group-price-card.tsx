import { Text, View } from "react-native"

import { styles } from "./peer-group-price-card.styles"

interface PeerGroupPriceCardProps {
  peerGroupName: string
  price: number | string
  updatedDate?: string
}

export function PeerGroupPriceCard({ peerGroupName, price, updatedDate }: PeerGroupPriceCardProps) {
  const priceNumber = Number(price)
  const displayPrice = !isNaN(priceNumber) && isFinite(priceNumber) ? priceNumber : 0
  const formattedDate = updatedDate
    ? new Date(updatedDate).toLocaleDateString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
    : null

  return (
    <View style={styles.container}>
      <View style={styles.leftSection}>
        <Text style={styles.groupName}>Group {peerGroupName}</Text>
        <Text style={styles.price}>${displayPrice.toFixed(2)}</Text>
      </View>
      {formattedDate && (
        <View style={styles.rightSection}>
          <Text style={styles.updatedLabel}>Updated</Text>
          <Text style={styles.updatedDate}>{formattedDate}</Text>
        </View>
      )}
    </View>
  )
}
