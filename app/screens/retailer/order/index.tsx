import { View, Text, Image, TouchableOpacity, FlatList, ActivityIndicator } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

import ButtonField from "@/components/common-components/button/button"
import { colors } from "@/theme/colors"

import QuantityModal from "./components/quantity-modal"
import { useOrder } from "./hooks/use-order"
import { UI_TEXT } from "./lib/constants"
import { styles } from "./lib/styles"
import { Images } from "../../../../assets/Images/wholeSeller"

export default function Order({ navigation }: any) {
  const {
    cartData,
    isLoading,
    showQuantityModal,
    selectedItem,
    quantityInput,
    setShowQuantityModal,
    setSelectedItem,
    setQuantityInput,
    handleIncrement,
    handleDecrement,
    handleQuantityPress,
    handleQuantitySubmit,
    handlePlaceOrder,
  } = useOrder(navigation)

  const renderCartItem = ({ item }: { item: any }) => {
    return (
      <View style={styles.cardBox}>
        <View style={styles.cardBoxLeft}>
          <View style={styles.imageContainer}>
            <Image
              source={item?.image_url ? { uri: item.image_url } : Images.SoyaMilk}
              style={styles.productImage}
              resizeMode="contain"
            />
          </View>
          <View style={styles.productInfo}>
            <Text style={styles.productDesc}>{item.product_desc}</Text>
            {item.subCategory_desc && (
              <Text style={styles.productCategory}>{item.subCategory_desc}</Text>
            )}
            <Text style={styles.productId}>ID: {item.product_id}</Text>
          </View>
          <View style={styles.priceContainer}>
            <Text style={styles.priceText}>${item.price}</Text>
          </View>
        </View>

        <View style={styles.quantityContainer}>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => handleDecrement(item)}
            disabled={isLoading}
          >
            <Text style={styles.quantityButtonText}>-</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleQuantityPress(item)} disabled={isLoading}>
            <Text style={styles.quantityText}>{item.items}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => handleIncrement(item)}
            disabled={isLoading}
          >
            <Text style={styles.quantityButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  const renderContent = () => {
    if (isLoading) {
      return (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color={colors.customColors.ACTIVE_GREEN} />
        </View>
      )
    }

    if (!cartData || cartData.length === 0) {
      return (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>{UI_TEXT.EMPTY_CART}</Text>
        </View>
      )
    }

    return (
      <>
        <FlatList
          data={cartData}
          keyExtractor={(item, index) => `${item.product_id}-${item.wholesaler_id}-${index}`}
          renderItem={renderCartItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentContainer}
          ListFooterComponent={
            <View style={styles.saveOrderButton}>
              <ButtonField
                value={UI_TEXT.SAVE_ORDER}
                onPress={handlePlaceOrder}
                isDisabled={isLoading || !cartData || cartData.length === 0}
                isLoading={isLoading}
              />
            </View>
          }
        />
      </>
    )
  }

  return (
    <View style={styles.mainContainer}>
      <SafeAreaView style={styles.container}>{renderContent()}</SafeAreaView>

      <QuantityModal
        visible={showQuantityModal}
        item={selectedItem}
        quantity={quantityInput}
        onQuantityChange={setQuantityInput}
        onSubmit={handleQuantitySubmit}
        onClose={() => {
          setShowQuantityModal(false)
          setSelectedItem(null)
          setQuantityInput("")
        }}
        isLoading={isLoading}
      />
    </View>
  )
}
