import { useCallback, useEffect, useMemo, useState } from "react"
import Toast from "react-native-toast-message"

import type { FavouriteProductItem, PriceEntry } from "@/api/retailer/favourites"
import { useGetFavouritesQuery } from "@/api/retailer/favourites"
import { profileQueryOptions } from "@/api/retailer/profile"
import { useRetailerAuth } from "@/context/RetailerAuthContext"
import { RetailerRoutes } from "@/navigators/retailer/routes"
import { loadString } from "@/utils/storage"

import { STORAGE_KEYS, UI_TEXT } from "../lib/constants"
import type { FavouritesFlatItem, FavouritesListItem } from "../lib/types"

function getLatestPriceForPeerGroup(
  item: FavouriteProductItem,
  peerGroupKey: string | null,
  fallbackPeerGroupKey?: string | null,
): string {
  if (!item?.price || typeof item.price !== "object") return "0"
  const key = peerGroupKey || fallbackPeerGroupKey
  if (!key) return "0"
  const prices: PriceEntry[] = item.price[key]
  if (!Array.isArray(prices) || prices.length === 0) return "0"
  const sorted = [...prices].sort((a, b) => new Date(b.Date).getTime() - new Date(a.Date).getTime())
  return sorted[0]?.price ?? "0"
}

function buildFlatListData(
  items: FavouriteProductItem[],
  currentPeerGroup: string | null,
  routePeerGroup?: string | null,
): FavouritesFlatItem[] {
  if (!items?.length) return []
  const byCategory = items.reduce<Record<string, FavouriteProductItem[]>>((acc, item) => {
    const cat = item.category_desc || "Other"
    if (!acc[cat]) acc[cat] = []
    acc[cat].push(item)
    return acc
  }, {})
  const flat: FavouritesFlatItem[] = []
  Object.entries(byCategory).forEach(([title, list]) => {
    flat.push({ isHeader: true, title: `${UI_TEXT.CATEGORY_PREFIX}${title}` })
    list.forEach((item) => {
      const latestPrice = getLatestPriceForPeerGroup(item, currentPeerGroup, routePeerGroup)
      flat.push({ ...item, isHeader: false, latestPrice })
    })
  })
  return flat
}

export function useFavourites(navigation: any, route?: { params?: { peerGroup?: string } }) {
  const { userAuth } = useRetailerAuth()
  const retailerId = userAuth?.userId ?? ""
  const routePeerGroup = route?.params?.peerGroup ?? null

  const [currentPeerGroup, setCurrentPeerGroup] = useState<string | null>(null)
  const [peerGroupModalVisible, setPeerGroupModalVisible] = useState(false)
  const [refreshing, setRefreshing] = useState(false)

  const {
    data: favouritesResponse,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetFavouritesQuery(retailerId || "")
  const { data: peersResponse } = profileQueryOptions.useGetStaticPeerGroupsQuery()

  const isSubscribed = useMemo(() => {
    const val = loadString(STORAGE_KEYS.PREMIUM_USER)
    return !!val
  }, [])

  useEffect(() => {
    const saved = loadString(STORAGE_KEYS.PEER_GROUP)
    setCurrentPeerGroup(saved || null)
  }, [])

  useEffect(() => {
    if (
      isError &&
      error &&
      (error as { response?: { status?: number } })?.response?.status !== 400
    ) {
      Toast.show({
        type: "error",
        text1: UI_TEXT.FAILED_TO_LOAD,
        text2: UI_TEXT.SOME_FEATURES_UNAVAILABLE,
      })
      console.error("Favourites load error", error)
    }
  }, [isError, error])

  const favouritesData = (favouritesResponse as { data?: FavouriteProductItem[] })?.data ?? []
  const flatData = useMemo(
    () => buildFlatListData(favouritesData, currentPeerGroup, routePeerGroup),
    [favouritesData, currentPeerGroup, routePeerGroup],
  )

  const peerGroupsList = useMemo(() => {
    const list = (peersResponse as { data?: string[] })?.data ?? []
    return list
  }, [peersResponse])

  const onRefresh = useCallback(async () => {
    setRefreshing(true)
    try {
      await refetch()
    } catch (e) {
      console.error(e)
    } finally {
      setRefreshing(false)
    }
  }, [refetch])

  const openPeerGroupModal = useCallback(() => {
    if (isSubscribed && favouritesData.length > 0) setPeerGroupModalVisible(true)
  }, [isSubscribed, favouritesData.length])

  const selectPeerGroup = useCallback((group: string) => {
    setCurrentPeerGroup(group)
    setPeerGroupModalVisible(false)
  }, [])

  const onItemPress = useCallback(
    (item: FavouritesListItem) => {
      navigation.navigate(RetailerRoutes.PRODUCT_DESCRIPTION, {
        productDetails: item,
        singleProductId: item.product_id,
      })
    },
    [navigation],
  )

  const onSubscribePress = useCallback(() => {
    navigation.navigate(RetailerRoutes.SUBSCRIPTIONPLAN)
  }, [navigation])

  return {
    flatData,
    isLoading,
    favouritesData,
    isSubscribed,
    currentPeerGroup,
    peerGroupModalVisible,
    setPeerGroupModalVisible,
    peerGroupsList,
    refreshing,
    onRefresh,
    openPeerGroupModal,
    selectPeerGroup,
    onItemPress,
    onSubscribePress,
    isPeerGroupButtonDisabled: !isSubscribed || favouritesData.length === 0,
  }
}
