import { useState, useEffect, useCallback } from "react"
import { View, TouchableOpacity, Text, StyleSheet, Image, Modal, Linking } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { ScrollView } from "react-native-gesture-handler"
import { SafeAreaView } from "react-native-safe-area-context"
import Toast from "react-native-toast-message"

import { RetailerRoutes } from "@/navigators/retailer/routes"
import { colors } from "@/theme/colors"
import { loadString } from "@/utils/storage"

import { Icon } from "../../../../assets/icons/wholeSeller"
import { useWhoAmIQuery } from "../../../api/retailer/auth/whoami"

const Options = () => {
  const [peerGroup, setPeerGroup] = useState(null)
  const [showPopup, setShowPopup] = useState(false)

  const { data, isSuccess } = useWhoAmIQuery()

  useEffect(() => {
    const getPeerGroupDetails = () => {
      const key = loadString("peergroup")
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

  const navigation = useNavigation()

  const navigateHome = (pathToNavigate) => {
    switch (pathToNavigate) {
      case "Scan Item":
        navigation.navigate(RetailerRoutes.TAB_CONTAINER, {
          screen: RetailerRoutes.SCAN,
        })
        break
      case "Search Item":
        navigation.navigate("Search")
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
  }

  const madrCheckerLink = useCallback(async () => {
    const supported = await Linking.canOpenURL("https://www.MADRCHECKER.com")
    console.log(supported)
    if (supported) {
      await Linking.openURL("https://www.MADRCHECKER.com")
    } else {
      Toast.show({
        text1: `Invalid URL: ${"https://www.MADRCHECKER.com"}`,
        type: "error",
      })
    }
  }, [])

  const buttons = ["Scan Item", "Search Item", "Favorites", "Upload MADR Peer Group File"]

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.guide}>WIC MADR GUIDE</Text>
          <View
            style={{
              display: "flex",
              gap: 20,
              marginBottom: 5,
              flexWrap: "wrap",
            }}
          >
            {buttons.map((buttonLabel, index) => (
              <TouchableOpacity
                key={index} // Added key prop
                style={styles.button}
                onPress={() => navigateHome(buttonLabel)}
              >
                <Text style={styles.textdata}>{buttonLabel}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
        <Text
          style={{
            fontSize: 16,
            fontWeight: "bold",
          }}
          onPress={madrCheckerLink}
        >
          Contact us: www.MADRCHECKER.com
        </Text>
      </View>
      <Image
        source={Icon.FOOTER}
        style={{
          width: "100%",
          height: "12%",
          position: "absolute",
          bottom: 0,
        }}
      />
      <Modal transparent={true} visible={showPopup} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Membership required !</Text>
            <View style={styles.iconContainer}>
              <Text style={styles.icon}>🔒</Text>
            </View>
            <Text style={styles.modalText}>
              You are a using a free trail version . Upgrade to our premium membership plans.
            </Text>
            <TouchableOpacity style={styles.closeButton} onPress={() => setShowPopup(false)}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.customColors.LIGHTGREEN,
    color: colors.customColors.WHITE,
    fontSize: 20,
    padding: 15,
  },
  closeButton: {
    backgroundColor: colors.customColors.LIGHTGREEN,
    borderRadius: 5,
    padding: 10,
  },
  closeButtonText: {
    color: colors.palette.neutral100,
    fontSize: 16,
  },
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "space-around",
    marginTop: "15%",
    padding: 10,
    paddingBottom: "20%",
  },
  guide: {
    color: colors.customColors.BLACK,
    fontFamily: "Arial-Rounded-Bold",
    fontSize: 35,
    marginBottom: "10%",
    textAlign: "center",
  },
  icon: {
    color: colors.palette.red700,
    fontSize: 24,
  },
  iconContainer: {
    backgroundColor: colors.palette.red50,
    borderRadius: 50,
    marginBottom: 20,
    padding: 10,
  },
  modalContainer: {
    alignItems: "center",
    backgroundColor: colors.palette.black500,
    flex: 1,
    justifyContent: "center",
  },
  modalContent: {
    alignItems: "center",
    backgroundColor: colors.palette.neutral100,
    borderRadius: 10,
    padding: 20,
    width: "80%",
  },
  modalText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  textdata: {
    color: colors.palette.neutral100,
    fontSize: 26,
    fontWeight: "700",
    textAlign: "center",
  },
})

export default Options
