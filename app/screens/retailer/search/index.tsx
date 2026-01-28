import { useEffect, useState, useCallback } from "react"
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  RefreshControl,
} from "react-native"
import { useFocusEffect } from "@react-navigation/native"
import debounce from "lodash/debounce"
import { ScrollView } from "react-native-gesture-handler"
import { SafeAreaView } from "react-native-safe-area-context"
import { Toast } from "react-native-toast-message/lib/src/Toast"

import { productQueryOptions } from "@/api/retailer/product"
import type { Product } from "@/api/retailer/product/types"
import SearchField from "@/components/common-components/search-field/search-field"
import { useRetailerAuth } from "@/context/RetailerAuthContext"
import { STORAGE_KEY } from "@/lib/constants"
import { RetailerRoutes } from "@/navigators/retailer/routes"
import { colors } from "@/theme/colors"
import { loadString, save } from "@/utils/storage"

import ModalComponent from "./components/modal-component"
import { styles } from "./lib/styles"
import { Images } from "../../../../assets/Images/wholeSeller"

export default function Search({ navigation }: any) {
  const { userAuth, userRole } = useRetailerAuth()
  const userDetails = userAuth
    ? {
        userId: userAuth.userId,
        accessToken: userAuth.accessToken,
        refreshToken: userAuth.refreshToken,
      }
    : null

  const [query, setQuery] = useState("")
  const [ItemsArray, setItemsArray] = useState<Product[]>([])
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

  const onCategorySelect = (category: string) => {
    if (category === "All") {
      handleShowAll()
    } else {
      setSelectedCategory(category)
      setSubCategoryModalVisible(true)
    }
  }

  const onSubCategorySelect = (subcategory: string) => {
    setSelectedSubCategory(subcategory)
  }

  const {
    data: filteredData,
    isSuccess: isSucces,
    isError: isErrorproduct,
    refetch: refetchCategoryList,
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
  useEffect(() => {
    if (isSucces && filteredData?.data) {
      setItemsArray(filteredData.data)
    }
  }, [isSucces, filteredData, refetchCategoryList])

  const {
    data: categoryListData,
    isLoading: isLoadingCategoryList,
    error: categoryListError,
  } = productQueryOptions.useCategoryListQuery({
    retailerId: userDetails?.userId || "",
  })

  // Handle category list errors
  useEffect(() => {
    if (categoryListError) {
      console.log("Category list API error:", categoryListError)
      // Don't show error toast for 404s as this might be expected
      if (categoryListError?.status !== 404) {
        Toast.show({
          type: "error",
          text1: "Failed to load categories",
          text2: "Some features may not be available",
        })
      }
    }
  }, [categoryListError])

  const {
    data: subCategoryListData,
    isLoading: isLoadingSubCategoryList,
    error: subCategoryListError,
  } = productQueryOptions.useSubCategoryListQuery(
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

  // Handle trending products errors
  useEffect(() => {
    if (errorTrendingData) {
      console.log("Trending products API error:", errorTrendingData)
      // Don't show error toast for 404s as this might be expected
      if (errorTrendingData?.status !== 404) {
        Toast.show({
          type: "error",
          text1: "Failed to load trending products",
          text2: "Some features may not be available",
        })
      }
    }
  }, [errorTrendingData])

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

  useEffect(() => {
    if (trendingData?.data) {
      setItemsArray(trendingData.data)
    }
  }, [trendingData])

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

  const handleShowAll = () => {
    refetchTrendingData()
    setIsStartSearch(false)
    setQuery("")
    setShouldTrendingDataFetch(true)
    setSelectedCategory(null)
    setSelectedSubCategory(null)
    setIsCategoryAll("All")
  }

  const categoryDescArray = categoryListData?.data ? ["All", ...categoryListData.data] : []

  const subCategoryDescArray = subCategoryListData?.data

  const debouncedSearch = useCallback(
    debounce((nextQuery: string) => {
      if (nextQuery && nextQuery.trim().length > 0) {
        setIsStartSearch(true)
      }
    }, 1000),
    [],
  )

  useEffect(() => {
    console.log(`Refetching: isStartSearch is ${isStartSearch}, query is ${query}`)
    if (query && isStartSearch) {
      console.log("Calling refetch...wowwwww")
      refetch()
    }
  }, [query, isStartSearch, refetch, peerGroup])

  useEffect(() => {
    const key = loadString("peergroup")
    setPeerGroup(key || "")
  }, [])
  console.log("peerGroup", peerGroup)
  const CardItem = ({ modifyValue }: any) => {
    const priceInfo = modifyValue?.adminPrice && modifyValue?.adminPrice[peerGroup]
    const sortedPriceInfo = priceInfo?.length
      ? [...priceInfo].sort((a, b) => new Date(b.Date).getTime() - new Date(a.Date).getTime())
      : null

    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate(RetailerRoutes.PRODUCT_DESCRIPTION, {
            productDetails: modifyValue,
            singleProductId: modifyValue?.product_id,
          })
        }
        style={styles.cardBox}
      >
        <View style={styles.cardBoxLeft}>
          <View style={{ width: "20%" }}>
            <Image
              source={modifyValue?.image_url ? { uri: modifyValue?.image_url } : Images.SoyaMilk}
              style={{ width: 30, height: 60 }}
            />
          </View>
          <View style={{ display: "flex", gap: 8, width: "60%" }}>
            <Text style={styles.helperText1}>{modifyValue?.product_desc}</Text>
            <Text style={styles.helperText2}>{modifyValue?.category_desc}</Text>
            <Text style={styles.helperText2}>00{modifyValue?.product_id}</Text>
          </View>
          <View style={{ width: "20%", alignItems: "flex-end" }}>
            <Text style={styles.helperText3}>
              ${sortedPriceInfo ? sortedPriceInfo[0].price : 20}
            </Text>
          </View>
        </View>
        {/* <Image source={Icon.CART} style={{width: 25, height: 22}} /> */}
      </TouchableOpacity>
    )
  }

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
      console.log("error occur in tendingData", errorTrendingData)
    }
  }, [
    isSuccessTrendingData,
    isErrorTrendingData,
    trendingData,
    shouldTrendingDataFetch,
    errorTrendingData,
  ])

  useEffect(() => {
    console.log(isSuccess, "isSuccess", isLoading, "isLoading", isError, "isError")

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
      console.log("error occur in homePage", error)
    }
  }, [isSuccess, isError, searchedItems, isStartSearch, refetch, status, isLoading, error])

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
      } catch (error) {
        console.error("Error storing user details: ", error)
      }
    }
  }, [userDetails, userRole])

  const renderData = () => {
    if (isLoading || isLoadingTrendingData) {
      return (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color={colors.customColors.ACTIVE_GREEN} />
        </View>
      )
    }

    if (ItemsArray?.length > 0) {
      return (
        <FlatList
          data={ItemsArray}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => <CardItem modifyValue={item} />}
          showsVerticalScrollIndicator={false}
        />
      )
    }

    if (query && filteredData?.data.length === 0) {
      return (
        <View style={styles.loaderContainer}>
          <Text style={{ fontSize: 16, fontWeight: "600" }}>No Products found</Text>
        </View>
      )
    }

    if (trendingArray?.length > 0) {
      return (
        <FlatList
          data={trendingArray}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => <CardItem modifyValue={item} />}
          showsVerticalScrollIndicator={false}
        />
      )
    }

    return (
      <View style={styles.loaderContainer}>
        <Text style={{ fontSize: 16, fontWeight: "600" }}>No Products found</Text>
      </View>
    )
  }

  useEffect(() => {
    if ((query === "" || query.trim() === "") && trendingData?.data) {
      setItemsArray(trendingData.data)
    }
  }, [query, trendingData])

  const handleSearch = (query: string) => {
    setQuery(query)
    setIsStartSearch(true)
  }

  return (
    <View style={styles.mainContainer}>
      <SafeAreaView style={styles.container}>
        <View style={styles.searchCard}>
          <SearchField
            setQuery={setQuery}
            query={query}
            handleOnSearchIcon={() => query && handleSearch(query)}
            isLoading={isLoading}
            handleDelete={() => {
              refetchTrendingData()
              setIsStartSearch(false)
              setQuery("")
              setShouldTrendingDataFetch(true)
              setSelectedCategory(null)
              setSelectedSubCategory(null)
            }}
            debouncedSearch={debouncedSearch}
          />
        </View>
      </SafeAreaView>

      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        {!(!isLoading && ItemsArray?.length > 0 && query) && (
          <View style={{ marginTop: 5 }}>
            <TouchableOpacity
              style={styles.peerGroupButton}
              onPress={() => {
                setCategoryModalVisible(true)
              }}
            >
              <Text style={styles.peerGroupButtonText}>
                {selectedCategory ? selectedCategory : isCategoryAll}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.peerGroupButton}
              onPress={() => selectedCategory && setSubCategoryModalVisible(true)}
            >
              <Text style={styles.peerGroupButtonText}>
                {selectedSubCategory ? selectedSubCategory : "SubCategory"}
              </Text>
            </TouchableOpacity>

            <ModalComponent
              visible={isCategoryModalVisible}
              items={categoryDescArray}
              onSelect={onCategorySelect}
              onClose={() => setCategoryModalVisible(false)}
            />

            <ModalComponent
              visible={isSubCategoryModalVisible}
              items={subCategoryDescArray}
              onSelect={onSubCategorySelect}
              onClose={() => setSubCategoryModalVisible(false)}
            />
          </View>
        )}
        {renderData()}
      </ScrollView>
    </View>
  )
}
