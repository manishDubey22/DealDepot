import { View, Text, Image, SafeAreaView, StyleSheet } from "react-native"
import React, { FC } from "react"
import { Icon } from "../../assets/icons/wholeSeller"
import { useNavigation } from "@react-navigation/native"
import { TouchableOpacity } from "react-native-gesture-handler"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import LinearGradient from "react-native-linear-gradient"
import { color } from "../../utils"
import Headerimg from "../../screens/retailer/optionList/Header"
import { Constant } from "../../utils/retailer/constant"

const showNoBackButton = ["Options", "Home"]

// Create a proper React component for the header
const HeaderComponent: React.FC<{ value: string }> = ({ value }) => {
  const insets = useSafeAreaInsets()
  const navigation = useNavigation()

  const handlePress = () => {
    console.log("value", value)
    if (value === "Scanner" || value === "Search" || value === "SaveOrder" || value === "My Cart") {
      navigation.navigate(Constant.ScreenName.OPTIONS)
    } else {
      navigation.goBack()
    }
  }

  return (
    <SafeAreaView style={{ paddingTop: insets.top }}>
      <LinearGradient
        colors={["#843c9f", "#843c9f"]}
        start={{ x: 1, y: 0 }}
        end={{ x: 0, y: 0 }}
        style={styles.header}
      >
        {!showNoBackButton.includes(value) && (
          <TouchableOpacity onPress={handlePress} style={styles.iconContainer}>
            <Image source={Icon.LeftArrow} resizeMode="contain" style={styles.icon} />
          </TouchableOpacity>
        )}
        <View
          style={
            showNoBackButton.includes(value)
              ? styles.iconContainerWithoutBackIcon
              : styles.iconContainerWithBackIcon
          }
        >
          <Text style={styles.headerText}>{value}</Text>
        </View>
      </LinearGradient>
      {value === "Home" && <Headerimg />}
    </SafeAreaView>
  )
}

// Keep the old Header function for backward compatibility
const Header = (value: string) => {
  return <HeaderComponent value={value} />
}

const WithoutImageHeader = (value: string) => {
  const insets = useSafeAreaInsets()
  const navigation = useNavigation()
  return (
    <SafeAreaView style={{ paddingTop: insets.top }}>
      <View
        style={{
          height: 80,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "white",
        }}
      >
        <View style={{ paddingLeft: 24 }}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconContainer}>
            <Image source={Icon.LeftArrow} resizeMode="contain" style={styles.icon} />
          </TouchableOpacity>
        </View>

        <View style={{ paddingRight: 20 }}></View>
      </View>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  header: {
    height: 80,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerText: {
    fontSize: 24,
    fontFamily: "Arial-Rounded-Bold",
    color: color.WHITE,
    textAlign: "center",
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1,
  },
  icon: {
    width: 40,
    height: 40,
  },
  iconContainer: {
    padding: 10,
  },
  iconPlaceholder: {
    width: 25,
    height: 28,
  },
  iconContainerWithoutBackIcon: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    width: "100%",
    paddingRight: "5%",
  },
  iconContainerWithBackIcon: {
    marginRight: 10,
  },
})

export { WithoutImageHeader, Header, HeaderComponent }

// #843c9f
