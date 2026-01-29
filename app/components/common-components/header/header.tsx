import { Image, Text, TouchableOpacity, View } from "react-native"
// import { LinearGradient } from "expo-linear-gradient"
import { useNavigation } from "@react-navigation/native"
// import LinearGradient from "react-native-linear-gradient"
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context"

import { RetailerRoutes } from "@/navigators/retailer/routes"
import { Heading } from "@/screens/retailer"

import {
  // GRADIENT_COLOR,
  // GRADIENT_END,
  // GRADIENT_START,
  HOME_SCREEN_VALUE,
  NAVIGATE_TO_OPTIONS_SCREENS,
  SHOW_NO_BACK_BUTTON,
  WITHOUT_IMAGE_HEADER_PADDING_LEFT,
  WITHOUT_IMAGE_HEADER_PADDING_RIGHT,
} from "./lib/constants"
import { styles } from "./lib/styles"
import type { HeaderComponentProps } from "./lib/types"
import { Icon } from "../../../../assets/icons/wholeSeller"

const HeaderComponent: React.FC<HeaderComponentProps> = ({ value }) => {
  const insets = useSafeAreaInsets()
  const navigation = useNavigation()

  const handlePress = () => {
    console.log("value", value)
    if (NAVIGATE_TO_OPTIONS_SCREENS.includes(value)) {
      // @ts-expect-error - navigation type doesn't include all RetailerRoutes
      navigation.navigate(RetailerRoutes.OPTIONS)
    } else {
      navigation.goBack()
    }
  }

  return (
    <SafeAreaView style={{ paddingTop: insets.top }}>
      {/* <LinearGradient
        colors={[GRADIENT_COLOR, GRADIENT_COLOR]}
        start={GRADIENT_START}
        end={GRADIENT_END}
        style={styles.header}
      > */}
      {!SHOW_NO_BACK_BUTTON.includes(value) && (
        <TouchableOpacity onPress={handlePress} style={styles.iconContainer}>
          <Image source={Icon.LeftArrow} resizeMode="contain" style={styles.icon} />
        </TouchableOpacity>
      )}
      <View
        style={
          SHOW_NO_BACK_BUTTON.includes(value)
            ? styles.iconContainerWithoutBackIcon
            : styles.iconContainerWithBackIcon
        }
      >
        <Text style={styles.headerText}>{value}</Text>
      </View>
      {/* </LinearGradient> */}
      {value === HOME_SCREEN_VALUE && <Heading />}
    </SafeAreaView>
  )
}

const Header = (value: string) => {
  return <HeaderComponent value={value} />
}

const WithoutImageHeader = () => {
  const insets = useSafeAreaInsets()
  const navigation = useNavigation()
  return (
    <SafeAreaView style={{ paddingTop: insets.top }}>
      <View style={styles.withoutImageHeader}>
        <View style={{ paddingLeft: WITHOUT_IMAGE_HEADER_PADDING_LEFT }}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconContainer}>
            <Image source={Icon.LeftArrow} resizeMode="contain" style={styles.icon} />
          </TouchableOpacity>
        </View>

        <View style={{ paddingRight: WITHOUT_IMAGE_HEADER_PADDING_RIGHT }}></View>
      </View>
    </SafeAreaView>
  )
}

export { WithoutImageHeader, Header, HeaderComponent }
