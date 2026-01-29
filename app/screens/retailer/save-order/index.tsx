import { useEffect } from "react"
import {
  View,
  Text,
  FlatList,
  RefreshControl,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native"
import { BackHandler } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

import { RetailerRoutes } from "@/navigators/retailer/routes"
import { colors } from "@/theme/colors"

import { useSaveOrder } from "./hooks/use-save-order"
import { UI_TEXT } from "./lib/constants"
import { styles } from "./lib/styles"

export default function SaveOrder({ navigation }: any) {
  const { orders, isLoading, isError, refreshing, onRefresh, handleSharePDF, formatDate } =
    useSaveOrder(navigation)

  // Handle back button - navigate to Search screen
  useEffect(() => {
    const backHandler = BackHandler.addEventListener("hardwareBackPress", () => {
      navigation.navigate(RetailerRoutes.SEARCH)
      return true
    })

    return () => backHandler.remove()
  }, [navigation])

  // Render order card
  const renderOrderCard = ({ item: order }: { item: (typeof orders)[0] }) => {
    return (
      <View style={styles.orderCard}>
        <View style={styles.orderHeader}>
          <View>
            <Text style={styles.orderId}>
              {UI_TEXT.ORDER_ID}: {order.orderId}
            </Text>
            <Text style={styles.orderDate}>
              {UI_TEXT.DATE}: {formatDate(order.date)}
            </Text>
          </View>
        </View>

        <View style={styles.orderItems}>
          {order.items.map((item, index) => (
            <View key={index} style={styles.itemRow}>
              <Text style={styles.itemQuantity}>{item.quantity}x</Text>
              <Text style={styles.itemText} numberOfLines={2}>
                {item.product_desc}
              </Text>
              <Text style={styles.itemPrice}>${item.productTotalPrice.toFixed(2)}</Text>
            </View>
          ))}
        </View>

        <View style={styles.orderTotal}>
          <Text style={styles.totalLabel}>{UI_TEXT.TOTAL}:</Text>
          <Text style={styles.totalValue}>${order.totalOrderPrice.toFixed(2)}</Text>
        </View>

        <TouchableOpacity style={styles.shareButton} onPress={() => handleSharePDF(order)}>
          <Text style={styles.shareButtonText}>{UI_TEXT.SHARE_PDF}</Text>
        </TouchableOpacity>
      </View>
    )
  }

  // Render content based on state
  const renderContent = () => {
    if (isLoading && !refreshing) {
      return (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color={colors.customColors.GREEN} />
          <Text style={styles.emptyText}>{UI_TEXT.LOADING}</Text>
        </View>
      )
    }

    if (isError || !orders || orders.length === 0) {
      return (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>{UI_TEXT.NO_ORDERS}</Text>
        </View>
      )
    }

    return (
      <FlatList
        data={orders}
        keyExtractor={(item, index) => `${item.orderId}-${index}`}
        renderItem={renderOrderCard}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      />
    )
  }

  return (
    <View style={styles.mainContainer}>
      <SafeAreaView style={styles.container}>{renderContent()}</SafeAreaView>
    </View>
  )
}
