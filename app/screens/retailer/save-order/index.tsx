import { useCallback, useEffect } from "react"
import { View, Text, FlatList, RefreshControl, ActivityIndicator } from "react-native"
import { BackHandler } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

import type { Order } from "@/api/retailer/orders/types"
import { RetailerRoutes } from "@/navigators/retailer/routes"
import { colors } from "@/theme/colors"

import { OrderCard } from "./components/order-card"
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

  const renderOrderCard = useCallback(
    ({ item: order }: { item: Order }) => (
      <OrderCard
        order={order}
        formattedDate={formatDate(order.date)}
        onPDFPress={() => handleSharePDF(order)}
      />
    ),
    [formatDate, handleSharePDF],
  )

  const keyExtractor = useCallback((item: Order) => item.orderId, [])

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
        keyExtractor={keyExtractor}
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
