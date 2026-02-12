import {
  ActivityIndicator,
  FlatList,
  Image,
  Modal,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import Toast from "react-native-toast-message"

import { colors } from "@/theme/colors"

import { useFavourites } from "./hooks/use-favourites"
import { UI_TEXT } from "./lib/constants"
import { styles } from "./lib/styles"
import { isHeader, type FavouritesFlatItem, type FavouritesListItem } from "./lib/types"
import { Images } from "../../../../assets/Images/wholeSeller"

export default function Favourites({
  navigation,
  route,
}: {
  navigation: any
  route?: { params?: { peerGroup?: string } }
}) {
  const {
    flatData,
    isLoading,
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
    isPeerGroupButtonDisabled,
  } = useFavourites(navigation, route)

  if (isLoading) {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color={colors.customColors.GREEN} />
        </View>
      </View>
    )
  }

  const renderItem = ({ item }: { item: FavouritesFlatItem }) => {
    if (isHeader(item)) {
      return (
        <View style={styles.categoryHeader}>
          <Text style={styles.categoryHeaderText}>{item.title}</Text>
        </View>
      )
    }
    const row = item as FavouritesListItem
    const displayPrice = isSubscribed ? `$${row.latestPrice}` : "$0"
    return (
      <TouchableOpacity style={styles.cardBox} onPress={() => onItemPress(row)} activeOpacity={0.8}>
        <View style={styles.cardBoxLeft}>
          <View style={styles.imageContainer}>
            <Image
              source={row.image_url ? { uri: row.image_url } : Images.SoyaMilk}
              style={styles.image}
              resizeMode="cover"
            />
          </View>
          <View>
            <Text style={styles.productDesc} numberOfLines={2}>
              {row.product_desc}
            </Text>
            <Text style={styles.productId}>ID: {row.product_id}</Text>
          </View>
        </View>
        <View style={styles.priceContainer}>
          <Text style={styles.priceText}>{displayPrice}</Text>
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <View style={styles.mainContainer}>
      <SafeAreaView edges={["bottom"]} style={styles.container}>
        {flatData.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>{UI_TEXT.NO_FAVOURITES}</Text>
            {!isSubscribed && (
              <TouchableOpacity style={styles.subscribeButton} onPress={onSubscribePress}>
                <Text style={styles.subscribeButtonText}>{UI_TEXT.SUBSCRIBE_CTA}</Text>
              </TouchableOpacity>
            )}
          </View>
        ) : (
          <>
            <TouchableOpacity
              style={[
                styles.peerGroupButton,
                isPeerGroupButtonDisabled && styles.peerGroupButtonDisabled,
              ]}
              onPress={openPeerGroupModal}
              disabled={isPeerGroupButtonDisabled}
            >
              <Text style={styles.peerGroupButtonText}>
                {UI_TEXT.CURRENT_PEER_GROUP} : {currentPeerGroup || "—"}
              </Text>
            </TouchableOpacity>
            {isSubscribed && flatData.length > 0 && (
              <Text style={styles.hintText}>{UI_TEXT.SELECT_PEER_GROUP_HINT}</Text>
            )}
            {!isSubscribed && (
              <TouchableOpacity style={styles.subscribeButton} onPress={onSubscribePress}>
                <Text style={styles.subscribeButtonText}>{UI_TEXT.SUBSCRIBE_CTA}</Text>
              </TouchableOpacity>
            )}
            <FlatList
              data={flatData}
              keyExtractor={(item, index) =>
                isHeader(item)
                  ? `header-${item.title}-${index}`
                  : `row-${(item as FavouritesListItem).product_id}-${index}`
              }
              renderItem={renderItem}
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                  colors={[colors.customColors.GREEN]}
                />
              }
              showsVerticalScrollIndicator={false}
            />
          </>
        )}
      </SafeAreaView>

      <Modal
        visible={peerGroupModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setPeerGroupModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <TouchableOpacity
            style={StyleSheet.absoluteFill}
            activeOpacity={1}
            onPress={() => setPeerGroupModalVisible(false)}
          />
          <View style={styles.modalContent} onStartShouldSetResponder={() => true}>
            <Text style={styles.modalTitle}>{UI_TEXT.CURRENT_PEER_GROUP}</Text>
            {peerGroupsList.map((group) => (
              <TouchableOpacity
                key={group}
                style={styles.modalOption}
                onPress={() => selectPeerGroup(group)}
              >
                <Text style={styles.modalOptionText}>{group}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>

      <Toast />
    </View>
  )
}
