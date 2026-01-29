import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native"
import { useNavigation } from "@react-navigation/native"
import Toast from "react-native-toast-message"

import type { CartItem } from "@/api/retailer/order"
import { productQueryOptions } from "@/api/retailer/product"
import { colors } from "@/theme/colors"

import { PeerGroupModal } from "./components/peer-group-modal"
import { QuantityModal } from "./components/quantity-modal"
import { SortModal } from "./components/sort-modal"
import { useProductDescription } from "./hooks/use-product-description"
import { SORT_OPTIONS_ARRAY, UI_TEXT } from "./lib/constants"
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
    // peerGroup,
    selectedPeerGroup,
    isSubscribed,
    showQuantityModal,
    showSortModal,
    showPeerGroupModal,
    selectedWholesaler,
    quantityInput,
    sortOption,
    handleToggleFavorite,
    handleAddToCart,
    handleIncrement,
    handleDecrement,
    // handleQuantityChange,
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

  // Get peer groups for modal
  const { data: staticPeersData } = productQueryOptions.useStaticPeersQuery()
  const peerGroups = staticPeersData?.data || []

  // Get cart item for wholesaler
  const getCartItem = (wholesalerId: string): CartItem | undefined => {
    return cartItems.find(
      (item) => item.wholesaler_id === wholesalerId && item.product_id === productData?.product_id,
    )
  }

  // Get price for peer group
  const getPeerGroupPrice = (wholesaler: any) => {
    if (!adminPrice || !selectedPeerGroup) return wholesaler.price
    const priceInfo = adminPrice[selectedPeerGroup]
    if (!priceInfo || priceInfo.length === 0) return wholesaler.price
    const sortedPriceInfo = [...priceInfo].sort(
      (a, b) => new Date(b.Date).getTime() - new Date(a.Date).getTime(),
    )
    return sortedPriceInfo[0]?.price || wholesaler.price
  }

  // Render wholesaler item
  const renderWholesalerItem = ({ item: wholesaler, index }: { item: any; index: number }) => {
    const cartItem = getCartItem(wholesaler.wholesaler_id)
    const isInCart = !!cartItem
    const quantity = cartItem?.items || 0
    const showBlur = !isSubscribed && index >= 2
    const price = getPeerGroupPrice(wholesaler)

    return (
      <TouchableOpacity
        style={styles.wholesalerItem}
        onPress={() => handleNavigateToSalesGraph(wholesaler)}
        disabled={showBlur}
      >
        {showBlur && <View style={styles.blurOverlay} />}
        <View style={styles.wholesalerHeader}>
          <Text style={styles.wholesalerName}>{wholesaler.name}</Text>
          <Text style={styles.wholesalerPrice}>${price.toFixed(2)}</Text>
        </View>
        {wholesaler.date && (
          <Text style={styles.wholesalerDate}>
            Updated: {new Date(wholesaler.date).toLocaleDateString()}
          </Text>
        )}
        {isInCart ? (
          <View style={styles.cartControls}>
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={() => handleDecrement(wholesaler)}
              disabled={isLoading}
            >
              <Text style={styles.quantityButtonText}>-</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setSelectedWholesaler(wholesaler)
                setQuantityInput(quantity.toString())
                setShowQuantityModal(true)
              }}
              disabled={isLoading}
            >
              <Text style={styles.quantityText}>{quantity}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={() => handleIncrement(wholesaler)}
              disabled={isLoading}
            >
              <Text style={styles.quantityButtonText}>+</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => handleAddToCart(wholesaler)}
            disabled={showBlur || isLoading}
          >
            <Text style={styles.addButtonText}>{UI_TEXT.ADD}</Text>
          </TouchableOpacity>
        )}
      </TouchableOpacity>
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

  // Get price for display
  const displayPrice =
    selectedPeerGroup && adminPrice?.[selectedPeerGroup]
      ? (() => {
          const priceInfo = adminPrice[selectedPeerGroup]
          const sortedPriceInfo = [...priceInfo].sort(
            (a, b) => new Date(b.Date).getTime() - new Date(a.Date).getTime(),
          )
          return sortedPriceInfo[0]?.price || 0
        })()
      : null

  return (
    <View style={styles.mainContainer}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Product Header */}
        <View style={styles.productHeader}>
          {productData.image_url && (
            <Image source={{ uri: productData.image_url }} style={styles.productImage} />
          )}
          <View style={styles.productInfo}>
            <Text style={styles.productName}>{productData.product_desc}</Text>
            {productData.category_desc && (
              <Text style={styles.productCategory}>{productData.category_desc}</Text>
            )}
            {productData.subCategory_desc && (
              <Text style={styles.productCategory}>{productData.subCategory_desc}</Text>
            )}
            <Text style={styles.productId}>ID: {productData.product_id}</Text>
            {displayPrice && <Text style={styles.wholesalerPrice}>${displayPrice.toFixed(2)}</Text>}
          </View>
        </View>

        {/* Controls */}
        <View style={styles.controlsContainer}>
          {isSubscribed && (
            <TouchableOpacity style={styles.controlButton} onPress={() => setShowSortModal(true)}>
              <Text style={styles.controlButtonText}>
                {sortOption
                  ? SORT_OPTIONS_ARRAY.find((opt) => opt.id === sortOption)?.label ||
                    UI_TEXT.SORT_BY
                  : UI_TEXT.SORT_BY}
              </Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={styles.controlButton}
            onPress={() => setShowPeerGroupModal(true)}
            disabled={!isSubscribed}
          >
            <Text style={styles.controlButtonText}>{selectedPeerGroup || UI_TEXT.PEER_GROUP}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.favoriteButton} onPress={handleToggleFavorite}>
            <Text style={styles.quantityButtonText}>{isFavorite ? "❤️" : "🤍"}</Text>
          </TouchableOpacity>
        </View>

        {/* Price History Button */}
        {adminPrice && selectedPeerGroup && (
          <TouchableOpacity style={styles.controlButton} onPress={handleNavigateToPriceHistory}>
            <Text style={styles.controlButtonText}>{UI_TEXT.SHOW_PRICE_HISTORY}</Text>
          </TouchableOpacity>
        )}

        {/* Wholesaler List */}
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
