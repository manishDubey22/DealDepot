import { useState, useCallback } from "react"
import { useFocusEffect } from "@react-navigation/native"
import Toast from "react-native-toast-message"

import { ordersQueryOptions } from "@/api/retailer/orders"
import type { Order } from "@/api/retailer/orders/types"
import { useRetailerAuth } from "@/context/RetailerAuthContext"
import { RetailerRoutes } from "@/navigators/retailer/routes"

import { CONSOLE_MESSAGES, ERROR_MESSAGES, UI_TEXT } from "../lib/constants"
import type { UseSaveOrderReturn } from "../lib/types"

export function useSaveOrder(navigation: any): UseSaveOrderReturn {
  const { userAuth } = useRetailerAuth()
  const retailerId = userAuth?.userId || ""

  const [refreshing, setRefreshing] = useState(false)

  const {
    data: ordersResponse,
    isLoading,
    isError,
    error,
    refetch,
  } = ordersQueryOptions.useGetOrdersQuery(
    { retailerId },
    {
      enabled: !!retailerId,
    },
  )

  // Refetch on screen focus
  useFocusEffect(
    useCallback(() => {
      if (retailerId) {
        refetch()
      }
    }, [retailerId, refetch]),
  )

  // Handle errors
  if (isError && error) {
    const errorMessage =
      (error as any)?.data?.message || (error as any)?.message || ERROR_MESSAGES.FETCH_FAILED
    Toast.show({
      text1: UI_TEXT.ERROR,
      text2: errorMessage,
      type: "error",
    })
    console.error(CONSOLE_MESSAGES.ORDERS_ERROR, error)
  }

  // Handle successful data load
  if (ordersResponse?.data) {
    console.log(CONSOLE_MESSAGES.ORDERS_LOADED, ordersResponse.data.orderData.length)
  }

  // Pull to refresh
  const onRefresh = useCallback(async () => {
    setRefreshing(true)
    console.log(CONSOLE_MESSAGES.REFRESHING)
    try {
      await refetch()
    } finally {
      setRefreshing(false)
    }
  }, [refetch])

  // Format date from ISO timestamp to YYYY-MM-DD
  const formatDate = useCallback((dateString: string): string => {
    try {
      return dateString.split("T")[0]
    } catch {
      return dateString
    }
  }, [])

  // Handle PDF share
  const handleSharePDF = useCallback(
    (order: Order) => {
      console.log(CONSOLE_MESSAGES.SHARING_PDF, order.orderId)
      navigation.navigate(RetailerRoutes.PREVIEW_PDF, {
        order,
        vendorData: ordersResponse?.data?.vendorData,
      })
    },
    [navigation, ordersResponse?.data?.vendorData],
  )

  // Sort orders by date (newest first)
  const sortedOrders = ordersResponse?.data?.orderData
    ? [...ordersResponse.data.orderData].sort((a, b) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime()
      })
    : []

  return {
    orders: sortedOrders,
    vendorData: ordersResponse?.data?.vendorData || null,
    isLoading,
    isError,
    error,
    refreshing,
    onRefresh,
    handleSharePDF,
    formatDate,
  }
}
