import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  RefreshControl,
} from "react-native"
import { ScrollView } from "react-native-gesture-handler"
import { SafeAreaView } from "react-native-safe-area-context"

import type { Product } from "@/api/retailer/product/types"
import SearchField from "@/components/common-components/search-field/search-field"
import { RetailerRoutes } from "@/navigators/retailer/routes"
import { colors } from "@/theme/colors"

import ModalComponent from "./components/modal-component"
import { useSearch } from "./hooks/use-search"
import { styles } from "./lib/styles"
import { Icon } from "../../../../assets/icons/wholeSeller"
import { Images } from "../../../../assets/Images/wholeSeller"

export default function Search({ navigation }: any) {
  const {
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
  } = useSearch()

  const renderCardItem = (modifyValue: Product) => {
    const priceInfo = modifyValue?.adminPrice && modifyValue?.adminPrice[peerGroup]
    const sortedPriceInfo = priceInfo?.length
      ? [...priceInfo].sort((a, b) => new Date(b.Date).getTime() - new Date(a.Date).getTime())
      : null
    const categorySubcategory =
      modifyValue?.subCategory_desc != null && modifyValue?.subCategory_desc !== ""
        ? `${modifyValue?.category_desc || ""} • ${modifyValue?.subCategory_desc || ""}`
        : modifyValue?.category_desc || ""

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
          <View style={styles.imageContainer}>
            <Image
              source={modifyValue?.image_url ? { uri: modifyValue?.image_url } : Images.SoyaMilk}
              style={styles.image}
            />
          </View>
          <View style={styles.productInfo}>
            <Text style={styles.helperText1}>{modifyValue?.product_desc}</Text>
            <Text style={styles.helperText2}>{categorySubcategory}</Text>
            <Text style={styles.helperText2}>ID: {modifyValue?.product_id}</Text>
          </View>
          <View style={styles.priceContainer}>
            <Text style={styles.helperText3}>
              ${sortedPriceInfo ? sortedPriceInfo[0].price : 20}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  const renderData = () => {
    if (isLoading || isLoadingTrendingData) {
      return (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color={colors.customColors.ACTIVE_GREEN} />
        </View>
      )
    }

    if (itemsArray?.length > 0) {
      return (
        <FlatList
          data={itemsArray}
          keyExtractor={(item) => item.product_id.toString()}
          renderItem={({ item }) => renderCardItem(item)}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
        />
      )
    }

    if (query && filteredData?.data?.length === 0) {
      return (
        <View style={styles.loaderContainer}>
          <Text style={styles.emptyText}>No Products found</Text>
        </View>
      )
    }

    if (trendingArray?.length > 0) {
      return (
        <FlatList
          data={trendingArray}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => renderCardItem(item)}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
        />
      )
    }

    return (
      <View style={styles.loaderContainer}>
        <Text style={styles.emptyText}>No Products found</Text>
      </View>
    )
  }

  return (
    <View style={styles.mainContainer}>
      <SafeAreaView style={styles.container}>
        {/* <View style={styles.searchCard}> */}
        <SearchField
          setQuery={setQuery}
          query={query}
          handleOnSearchIcon={() => query && handleSearch(query)}
          isLoading={isLoading}
          handleDelete={handleClearSearch}
          debouncedSearch={debouncedSearch}
        />
        {/* </View> */}
      </SafeAreaView>

      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        {!(!isLoading && itemsArray?.length > 0 && query) && (
          <View style={styles.categoryContainer}>
            <TouchableOpacity
              style={styles.peerGroupButton}
              onPress={() => setCategoryModalVisible(true)}
            >
              <Text style={styles.peerGroupButtonText}>{selectedCategory ?? isCategoryAll}</Text>
              <Image
                source={Icon.LeftBackArrow}
                resizeMode="contain"
                style={styles.dropdownArrow}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.peerGroupButton}
              onPress={() => selectedCategory && setSubCategoryModalVisible(true)}
            >
              <Text style={styles.peerGroupButtonText}>{selectedSubCategory ?? "Subcategory"}</Text>
              <Image
                source={Icon.LeftBackArrow}
                resizeMode="contain"
                style={styles.dropdownArrow}
              />
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
