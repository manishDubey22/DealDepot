import { useCallback, useEffect, useState } from "react"
import { useFocusEffect } from "@react-navigation/native"
import debounce from "lodash/debounce"
import { Toast } from "react-native-toast-message/lib/src/Toast"

import { productQueryOptions } from "@/api/retailer/product"
import type { Product } from "@/api/retailer/product/types"
import { useRetailerAuth } from "@/context/RetailerAuthContext"
import { STORAGE_KEY } from "@/lib/constants"
import { loadString, save } from "@/utils/storage"

export function useSearch() {
  const { userAuth, userRole } = useRetailerAuth()
  const userDetails = userAuth
    ? {
        userId: userAuth.userId,
        accessToken: userAuth.accessToken,
        refreshToken: userAuth.refreshToken,
      }
    : null

  const [query, setQuery] = useState("")
  const [itemsArray, setItemsArray] = useState<Product[]>([])
  const [trendingArray, setTrendingArray] = useState<Product[]>([])
  const [isStartSearch, setIsStartSearch] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(null)
  const [isCategoryModalVisible, setCategoryModalVisible] = useState(false)
  const [isSubCategoryModalVisible, setSubCategoryModalVisible] = useState(false)
  const [shouldTrendingDataFetch, setShouldTrendingDataFetch] = useState<boolean>(false)
  const [peerGroup, setPeerGroup] = useState("")
  const [isCategoryAll, setIsCategoryAll] = useState<string>("Category")
  const [refreshing, setRefreshing] = useState<boolean>(false)

  const {
    data: filteredData,
    isSuccess: isSucces,
    // refetch: refetchCategoryList,
  } = productQueryOptions.useProductsByNameAndCategoryQuery(
    {
      retailerId: userDetails?.userId || "",
      name: query,
      category: selectedCategory || "",
      subcategory: selectedSubCategory || "",
    },
    {
      enabled: !!(userDetails?.userId && selectedCategory && selectedSubCategory),
    },
  )

  const { data: categoryListData, error: categoryListError } =
    productQueryOptions.useCategoryListQuery({
      retailerId: userDetails?.userId || "",
    })

  const { data: subCategoryListData } = productQueryOptions.useSubCategoryListQuery(
    {
      retailerId: userDetails?.userId || "",
      category: selectedCategory || "",
    },
    {
      enabled: !!selectedCategory && !!userDetails?.userId,
    },
  )

  const {
    data: trendingData,
    isSuccess: isSuccessTrendingData,
    isLoading: isLoadingTrendingData,
    isError: isErrorTrendingData,
    refetch: refetchTrendingData,
    error: errorTrendingData,
  } = productQueryOptions.useTrendingProductsQuery(userDetails?.userId, {
    enabled: !!userDetails?.userId,
  })

  const {
    data: searchedItems,
    isSuccess,
    isLoading,
    isError,
    error,
    refetch,
    status,
  } = productQueryOptions.useSearchProductsQuery(
    {
      name: query,
      retailerId: userDetails?.userId || "",
    },
    {
      enabled: isStartSearch && !!query && !!userDetails?.userId,
    },
  )

  const handleShowAll = useCallback(() => {
    refetchTrendingData()
    setIsStartSearch(false)
    setQuery("")
    setShouldTrendingDataFetch(true)
    setSelectedCategory(null)
    setSelectedSubCategory(null)
    setIsCategoryAll("All")
  }, [refetchTrendingData])

  const onCategorySelect = useCallback(
    (category: string) => {
      if (category === "All") {
        handleShowAll()
      } else {
        setSelectedCategory(category)
        setSubCategoryModalVisible(true)
      }
    },
    [handleShowAll],
  )

  const onSubCategorySelect = useCallback((subcategory: string) => {
    setSelectedSubCategory(subcategory)
  }, [])

  const onRefresh = useCallback(() => {
    setRefreshing(true)
    refetchTrendingData()
      .then(() => {
        const key = loadString("peergroup")
        setPeerGroup(key || "")
        setRefreshing(false)
      })
      .catch((refreshError) => {
        console.error("Error occurred while refreshing:", refreshError)
        setRefreshing(false)
      })
  }, [refetchTrendingData])

  useFocusEffect(
    useCallback(() => {
      onRefresh()
    }, [onRefresh]),
  )

  const debouncedSearch = useCallback(
    debounce((nextQuery: string) => {
      if (nextQuery && nextQuery.trim().length > 0) {
        setIsStartSearch(true)
      }
    }, 1000),
    [],
  )

  const handleSearch = useCallback((searchQuery: string) => {
    setQuery(searchQuery)
    setIsStartSearch(true)
  }, [])

  const handleClearSearch = useCallback(() => {
    refetchTrendingData()
    setIsStartSearch(false)
    setQuery("")
    setShouldTrendingDataFetch(true)
    setSelectedCategory(null)
    setSelectedSubCategory(null)
  }, [refetchTrendingData])

  const categoryDescArray = categoryListData?.data ? ["All", ...categoryListData.data] : []
  const subCategoryDescArray = subCategoryListData?.data

  useEffect(() => {
    if (isSucces && filteredData?.data) {
      setItemsArray(filteredData.data)
    }
  }, [isSucces, filteredData, query, selectedCategory, selectedSubCategory])

  useEffect(() => {
    if (categoryListError && categoryListError?.status !== 404) {
      Toast.show({
        type: "error",
        text1: "Failed to load categories",
        text2: "Some features may not be available",
      })
    }
  }, [categoryListError])

  useEffect(() => {
    if (errorTrendingData && errorTrendingData?.status !== 404) {
      Toast.show({
        type: "error",
        text1: "Failed to load trending products",
        text2: "Some features may not be available",
      })
    }
  }, [errorTrendingData])

  useEffect(() => {
    if (trendingData?.data) {
      setItemsArray(trendingData.data)
    }
  }, [trendingData])

  useEffect(() => {
    if (query && isStartSearch) {
      refetch()
    }
  }, [query, isStartSearch, refetch, peerGroup])

  useEffect(() => {
    const key = loadString("peergroup")
    setPeerGroup(key || "")
  }, [])

  useEffect(() => {
    if (isSuccessTrendingData && trendingData?.data) {
      setTrendingArray(trendingData.data)
      setItemsArray(trendingData.data)
      setShouldTrendingDataFetch(false)
    } else if (isErrorTrendingData) {
      Toast.show({
        type: "error",
        text1: "Server Error",
        position: "top",
        topOffset: 90,
      })
    }
  }, [
    isSuccessTrendingData,
    isErrorTrendingData,
    trendingData,
    shouldTrendingDataFetch,
    errorTrendingData,
  ])

  useEffect(() => {
    if (isSuccess && status === "fulfilled" && searchedItems?.data) {
      setItemsArray(searchedItems.data.slice(0, 20))
      setIsStartSearch(false)
    } else if (isError) {
      setQuery("")
      Toast.show({
        type: "error",
        text1: "Server Error",
        position: "top",
        topOffset: 90,
      })
      setIsStartSearch(false)
    }
  }, [isSuccess, isError, searchedItems, status, isLoading, error])

  useEffect(() => {
    if (userDetails && userRole) {
      try {
        const userInfo = {
          role: userRole,
          authToken: userDetails?.accessToken,
          userId: userDetails?.userId,
          refreshToken: userDetails?.refreshToken,
        }
        save(STORAGE_KEY.USER_INFO, userInfo)
      } catch (err) {
        console.error("Error storing user details: ", err)
      }
    }
  }, [userDetails, userRole])

  useEffect(() => {
    if ((query === "" || query.trim() === "") && trendingData?.data) {
      setItemsArray(trendingData.data)
    }
  }, [query, trendingData])

  return {
    categoryDescArray,
    debouncedSearch,
    filteredData,
    handleClearSearch,
    handleSearch,
    isCategoryAll,
    isCategoryModalVisible,
    isSubCategoryModalVisible,
    isLoading,
    isLoadingTrendingData,
    itemsArray,
    onCategorySelect,
    onRefresh,
    onSubCategorySelect,
    peerGroup,
    query,
    refreshing,
    selectedCategory,
    selectedSubCategory,
    setCategoryModalVisible,
    setQuery,
    setSubCategoryModalVisible,
    subCategoryDescArray,
    trendingArray,
  }
}
