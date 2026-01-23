import { useState, useEffect, useCallback } from "react"
import { Linking } from "react-native"
import { useNavigation } from "@react-navigation/native"
import Toast from "react-native-toast-message"

import { useWhoAmIQuery } from "@/api/retailer/auth/whoami"
import { RetailerRoutes } from "@/navigators/retailer/routes"
import { loadString } from "@/utils/storage"

import { BUTTONS, MADRCHECKER_URL, STORAGE_KEYS, UI_TEXT } from "../lib/constants"
import type { UseHomeOptionListReturn } from "../lib/types"

export function useHomeOptionList(): UseHomeOptionListReturn {
  const [peerGroup, setPeerGroup] = useState<string | null>(null)
  const [showPopup, setShowPopup] = useState(false)

  const { data, isSuccess } = useWhoAmIQuery()
  const navigation = useNavigation()

  useEffect(() => {
    const getPeerGroupDetails = () => {
      const key = loadString(STORAGE_KEYS.PEER_GROUP)
      setPeerGroup(key)
    }

    getPeerGroupDetails()

    // if (isSuccess && data) {
    //   if (data.data.isSubscribed) {
    //     setIsPremium(true);
    //   } else {
    //     setShowPopup(true);
    //   }
    // }
  }, [isSuccess, data])

  const navigateHome = useCallback(
    (pathToNavigate: string) => {
      switch (pathToNavigate) {
        case "Scan Item":
          navigation.navigate(RetailerRoutes.TAB_CONTAINER, {
            screen: RetailerRoutes.SCAN,
          })
          break
        case "Search Item":
          navigation.navigate(RetailerRoutes.SEARCH)
          break
        case "Favorites":
          navigation.navigate(RetailerRoutes.FAVOURITES, {
            peerGroup: peerGroup,
          })
          break
        case "Upload MADR Peer Group File":
          navigation.navigate(RetailerRoutes.UPLOAD_FILE)
          break
      }
    },
    [navigation, peerGroup],
  )

  const madrCheckerLink = useCallback(async () => {
    const supported = await Linking.canOpenURL(MADRCHECKER_URL)
    console.log(supported)
    if (supported) {
      await Linking.openURL(MADRCHECKER_URL)
    } else {
      Toast.show({
        text1: UI_TEXT.INVALID_URL_ERROR,
        type: "error",
      })
    }
  }, [])

  return {
    showPopup,
    setShowPopup,
    navigateHome,
    madrCheckerLink,
    buttons: [...BUTTONS],
    data,
    isSuccess,
  }
}
