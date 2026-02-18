import { useState, useEffect, useMemo } from "react"
import { ActivityIndicator, FlatList, ScrollView, Text, View } from "react-native"
import { useNavigation } from "@react-navigation/native"
import Toast from "react-native-toast-message"

import type { CartItem } from "@/api/retailer/order"
import { productQueryOptions } from "@/api/retailer/product"
import { WholesalerData } from "@/api/retailer/product/types"
import { colors } from "@/theme/colors"
// import { spacing } from "@/theme/spacing"
// import { commonStyles } from "@/theme/styles"

// import { AddToCartButton } from "./components/add-to-cart-button"
import { PeerGroupModal } from "./components/peer-group-modal"
import { PeerGroupPriceCard } from "./components/peer-group-price-card"
import { PeerGroupSelector } from "./components/peer-group-selector"
// import { PriceBox } from "./components/price-box"
import { ProductHeaderCard } from "./components/product-header-card"
import { QuantityModal } from "./components/quantity-modal"
import { SortButton } from "./components/sort-button"
import { SortModal } from "./components/sort-modal"
import { WholesalerCard } from "./components/wholesaler-card"
import { useProductDescription } from "./hooks/use-product-description"
import { UI_TEXT } from "./lib/constants"
import { styles } from "./lib/styles"

export default function ProductDescription() {
  const navigation = useNavigation()
  const {
    productData,
    wholesalerData,
    adminPrice,
    isFavorite,
    isLoading,
    isError,
    cartItems,
    selectedPeerGroup,
    isSubscribed,
    showQuantityModal,
    showSortModal,
    showPeerGroupModal,
    selectedWholesaler,
    quantityInput,
    // sortOption,
    handleToggleFavorite,
    handleAddToCart,
    handleIncrement,
    handleDecrement,
    handleQuantitySubmit,
    handleSortSelect,
    handlePeerGroupSelect,
    handleNavigateToPriceHistory,
    handleNavigateToSalesGraph,
    setShowQuantityModal,
    setShowSortModal,
    setShowPeerGroupModal,
    setQuantityInput,
    setSelectedWholesaler,
  } = useProductDescription(navigation)

  // Get peer groups for selector
  const { data: staticPeersData } = productQueryOptions.useStaticPeersQuery()
  const peerGroups = staticPeersData?.data || []

  // Local UI state for peer group selection (defaults to first peer group when available)
  const [uiSelectedPeerGroup, setUiSelectedPeerGroup] = useState<string | null>(null)

  // Default to first peer group when peer groups load, or sync with stored value from hook
  useEffect(() => {
    if (peerGroups.length === 0) return
    setUiSelectedPeerGroup((prev) => {
      const storedInList =
        selectedPeerGroup && peerGroups.includes(selectedPeerGroup) ? selectedPeerGroup : null
      const firstGroup = peerGroups[0]
      // Keep current if it's still in the list
      if (prev && peerGroups.includes(prev)) return prev
      // Prefer stored value from hook if it's in the list
      if (storedInList) return storedInList
      // Default to first peer group so PeerGroupPriceCard shows
      return firstGroup
    })
  }, [peerGroups, selectedPeerGroup])

  // Handle UI-level peer group selection
  const handleUiPeerGroupSelect = (peerGroup: string) => {
    setUiSelectedPeerGroup(peerGroup)
    // Also update the hook's peer group if subscribed
    if (isSubscribed) {
      handlePeerGroupSelect(peerGroup)
    }
  }

  // Get cart item for wholesaler
  const getCartItem = (wholesalerId: string): CartItem | undefined => {
    return cartItems.find(
      (item) => item.wholesaler_id === wholesalerId && item.product_id === productData?.product_id,
    )
  }

  // Get price for peer group
  const getPeerGroupPrice = (wholesaler: any) => {
    if (!adminPrice || !uiSelectedPeerGroup) return wholesaler.price
    const priceInfo = adminPrice[uiSelectedPeerGroup]
    if (!priceInfo || priceInfo.length === 0) return wholesaler.price
    const sortedPriceInfo = [...priceInfo].sort(
      (a, b) => new Date(b.Date).getTime() - new Date(a.Date).getTime(),
    )
    return sortedPriceInfo[0]?.price || wholesaler.price
  }

  // Get peer group price for display
  const peerGroupPrice = useMemo(() => {
    if (!adminPrice || !uiSelectedPeerGroup) return null
    const priceInfo = adminPrice[uiSelectedPeerGroup]
    if (!priceInfo || priceInfo.length === 0) return null
    const sortedPriceInfo = [...priceInfo].sort(
      (a, b) => new Date(b.Date).getTime() - new Date(a.Date).getTime(),
    )
    return {
      price: sortedPriceInfo[0]?.price || 0,
      date: sortedPriceInfo[0]?.Date,
    }
  }, [adminPrice, uiSelectedPeerGroup])

  // Render wholesaler item
  const renderWholesalerItem = ({
    item: wholesaler,
    index,
  }: {
    item: WholesalerData
    index: number
  }) => {
    const cartItem = getCartItem(wholesaler.wholesaler_id)
    const isInCart = !!cartItem
    const showBlur = !isSubscribed && index >= 2
    const unitPrice = getPeerGroupPrice(wholesaler)
    const displayUnitPrice = unitPrice > 0 && !isNaN(unitPrice) ? unitPrice : 0
    const casePrice = wholesaler.casePrice ?? displayUnitPrice
    // Calculate per unit price from case price if available (assuming case has multiple units)
    // If casePrice exists and is different from unitPrice, calculate per unit; otherwise use unitPrice
    const perUnitPrice =
      wholesaler.casePrice && wholesaler.casePrice > 0 && wholesaler.casePrice !== displayUnitPrice
        ? wholesaler.casePrice / 12
        : displayUnitPrice

    return (
      <View style={showBlur ? styles.blurredContainer : undefined}>
        <WholesalerCard
          wholesalerName={wholesaler.name}
          updatedDate={wholesaler.date}
          unitPrice={displayUnitPrice}
          casePrice={casePrice}
          perUnitPrice={perUnitPrice}
          onPress={() => handleNavigateToSalesGraph(wholesaler)}
          onAddToCart={() => handleAddToCart(wholesaler)}
          disabled={showBlur}
          isLoading={false}
          isInCart={isInCart}
          quantity={cartItem?.items || 0}
          onIncrement={() => handleIncrement(wholesaler)}
          onDecrement={() => handleDecrement(wholesaler)}
          onQuantityPress={() => {
            setSelectedWholesaler(wholesaler)
            setQuantityInput((cartItem?.items || 0).toString())
            setShowQuantityModal(true)
          }}
        />
      </View>
    )
  }

  // Loading state
  if (isLoading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color={colors.customColors.GREEN} />
      </View>
    )
  }

  // Error or empty state
  if (isError || !productData) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>
          {isError ? UI_TEXT.SOMETHING_WENT_WRONG : UI_TEXT.FREE_TRIAL_OVER}
        </Text>
      </View>
    )
  }

  return (
    <View style={styles.mainContainer}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* 1. Product Header Card */}
        <ProductHeaderCard
          imageUrl={productData.image_url}
          productName={productData.product_desc}
          productId={productData.product_id}
          category={productData.category_desc}
          subCategory={productData.subCategory_desc}
          onPriceHistoryPress={handleNavigateToPriceHistory}
          onFavoritePress={handleToggleFavorite}
          isFavorite={isFavorite}
        />

        {/* 2. Peer Group Price Section */}
        {peerGroups.length > 0 && (
          <View style={styles.sectionPeerGroupPrice}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Peer Group Price</Text>
              <PeerGroupSelector
                peerGroups={peerGroups}
                selectedPeerGroup={uiSelectedPeerGroup}
                onSelect={handleUiPeerGroupSelect}
              />
            </View>
            {peerGroupPrice && uiSelectedPeerGroup && (
              <PeerGroupPriceCard
                peerGroupName={uiSelectedPeerGroup}
                price={peerGroupPrice.price}
                updatedDate={peerGroupPrice.date}
              />
            )}
          </View>
        )}

        {/* 3. Wholesaler Prices Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Wholesaler Prices</Text>
            {isSubscribed && <SortButton onPress={() => setShowSortModal(true)} />}
          </View>

          <FlatList
            data={wholesalerData}
            keyExtractor={(item) => item.wholesaler_id}
            renderItem={renderWholesalerItem}
            scrollEnabled={false}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>No wholesalers available</Text>
              </View>
            }
          />
        </View>
      </ScrollView>

      {/* Modals */}
      <SortModal
        visible={showSortModal}
        onSelect={handleSortSelect}
        onClose={() => setShowSortModal(false)}
      />
      <PeerGroupModal
        visible={showPeerGroupModal}
        peerGroups={peerGroups}
        selectedPeerGroup={selectedPeerGroup}
        onSelect={handlePeerGroupSelect}
        onClose={() => setShowPeerGroupModal(false)}
      />
      <QuantityModal
        visible={showQuantityModal}
        wholesaler={selectedWholesaler}
        quantity={quantityInput}
        onQuantityChange={setQuantityInput}
        onSubmit={handleQuantitySubmit}
        onClose={() => {
          setShowQuantityModal(false)
          setSelectedWholesaler(null)
        }}
        isLoading={false}
      />

      <Toast />
    </View>
  )
}
