import { useRef } from "react"
import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  RefreshControl,
  Text,
  View,
} from "react-native"
import { BottomSheetModal } from "@gorhom/bottom-sheet"
import { SafeAreaView } from "react-native-safe-area-context"
import Toast from "react-native-toast-message"

import { colors } from "@/theme/colors"

import { PeerGroupBottomSheet } from "./components/peer-group-bottom-sheet"
import { useFavourites } from "./hooks/use-favourites"
import { UI_TEXT } from "./lib/constants"
import { styles } from "./lib/styles"
import { isHeader, type FavouritesFlatItem, type FavouritesListItem } from "./lib/types"
import { Icon } from "../../../../assets/icons/wholeSeller"
import { Images } from "../../../../assets/Images/wholeSeller"

export default function Favorites({
  navigation,
  route,
}: {
  navigation: any
  route?: { params?: { peerGroup?: string } }
}) {
  const peerGroupSheetRef = useRef<BottomSheetModal>(null)
  const {
    flatData,
    isLoading,
    isSubscribed,
    currentPeerGroup,
    banner,
    dismissBanner,
    peerGroupsList,
    refreshing,
    onRefresh,
    canChangePeerGroup,
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
      const categoryTitle = item.title.replace(UI_TEXT.CATEGORY_PREFIX, "")
      return (
        <View style={styles.categoryHeader}>
          <Text style={styles.categoryHeaderText}>
            {UI_TEXT.CATEGORY_PREFIX}
            <Text style={styles.categoryHeaderValue}>{categoryTitle}</Text>
          </Text>
        </View>
      )
    }
    const row = item as FavouritesListItem
    const displayPrice = isSubscribed ? `$${row.latestPrice}` : "$0"
    return (
      <Pressable style={styles.cardBox} onPress={() => onItemPress(row)}>
        <View style={styles.cardBoxLeft}>
          <View style={styles.imageContainer}>
            <Image
              source={row.image_url ? { uri: row.image_url } : Images.SoyaMilk}
              style={styles.image}
              resizeMode="cover"
            />
            <View style={styles.likeBadge}>
              <Image source={Icon.LIKEBUTTON} style={styles.likeIcon} resizeMode="contain" />
            </View>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.productDesc} numberOfLines={2}>
              {row.product_desc}
            </Text>
            <Text style={styles.productId}>ID: {row.product_id}</Text>
            <Text style={styles.madrPriceLabel}>{UI_TEXT.MADR_PRICE}</Text>
          </View>
        </View>
        <View style={styles.priceContainer}>
          <Text style={styles.priceText}>{displayPrice}</Text>
        </View>
      </Pressable>
    )
  }

  return (
    <View style={styles.mainContainer}>
      <SafeAreaView edges={["bottom"]} style={styles.container}>
        {banner.visible ? (
          <View style={styles.successBanner}>
            <View style={styles.successBannerLeft}>
              <Text style={styles.successBannerText}>✓</Text>
              <Text style={styles.successBannerText}>{banner.message}</Text>
            </View>
            <Pressable onPress={dismissBanner} hitSlop={10}>
              <Image source={Icon.CLOSE} style={styles.successCloseIcon} resizeMode="contain" />
            </Pressable>
          </View>
        ) : null}

        {flatData.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>{UI_TEXT.NO_FAVOURITES}</Text>
            {!isSubscribed ? (
              <Pressable style={styles.subscribeButton} onPress={onSubscribePress}>
                <Text style={styles.subscribeButtonText}>{UI_TEXT.SUBSCRIBE_CTA}</Text>
              </Pressable>
            ) : null}
          </View>
        ) : (
          <>
            <View style={styles.peerGroupCard}>
              <View>
                <Text style={styles.peerGroupTitle}>{UI_TEXT.PEER_GROUP}</Text>
                <Text style={styles.peerGroupCurrentText}>
                  {UI_TEXT.CURRENT_PEER_GROUP} {currentPeerGroup || "—"}
                </Text>
              </View>
              <Pressable
                style={[
                  styles.changeButton,
                  isPeerGroupButtonDisabled ? styles.changeButtonDisabled : null,
                ]}
                onPress={() => {
                  if (canChangePeerGroup) {
                    peerGroupSheetRef.current?.present()
                  }
                }}
                disabled={isPeerGroupButtonDisabled}
              >
                <Text style={styles.changeButtonText}>{UI_TEXT.CHANGE}</Text>
                <Image source={Icon.DOWNARROWICON} style={styles.changeButtonIcon} />
              </Pressable>
            </View>

            {/* {!isSubscribed ? (
              <Pressable style={styles.subscribeButton} onPress={onSubscribePress}>
                <Text style={styles.subscribeButtonText}>{UI_TEXT.SUBSCRIBE_CTA}</Text>
              </Pressable>
            ) : null} */}
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
      <PeerGroupBottomSheet
        ref={peerGroupSheetRef}
        peerGroups={peerGroupsList}
        selectedPeerGroup={currentPeerGroup}
        onSelect={selectPeerGroup}
      />

      <Toast />
    </View>
  )
}
