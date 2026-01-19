// eslint-disable-next-line no-restricted-imports
import React from "react"
import {
  ImageBackground,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  // eslint-disable-next-line no-restricted-imports
  Text,
  TouchableOpacity,
  View,
} from "react-native"

import { Images } from "@assets/Images/wholeSeller"

import { OptionBotton } from "@/components/option-button/option-botton"
import { useAppDispatch } from "@/store"
import { updateUserRoleAction } from "@/store/auth/authSlice"
import { role } from "@/utils/role"

interface OptionScreenProps {}

export const OptionScreen: React.FC<OptionScreenProps> = (): React.JSX.Element => {
  const dispatch = useAppDispatch()

  const handleOptionPress = async (selectedValue: string) => {
    dispatch(updateUserRoleAction(selectedValue as typeof role.RETAILER | typeof role.WHOLE_SELLER))
    // Navigation to appropriate stack will be handled by parent navigation logic based on Redux state
  }

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <SafeAreaView style={styles.safeArea}>
        <ImageBackground source={Images.Option} style={styles.backgroundImage} resizeMode="cover">
          <View style={styles.content}>
            <Text style={styles.questionText}>How would you like to continue?</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                onPress={() => handleOptionPress(role.RETAILER)}
                activeOpacity={0.8}
              >
                <OptionBotton value="Retailer" />
              </TouchableOpacity>
              {/* Hidden as per Client's Requirement */}
              {/* <TouchableOpacity onPress={() => handleOptionPress(role.WHOLE_SELLER)} activeOpacity={0.8}>
                <OptionBtn value="Wholesaler" />
              </TouchableOpacity> */}
            </View>
          </View>
        </ImageBackground>
      </SafeAreaView>
    </View>
  )
}

/* eslint-disable react-native/no-color-literals */
const styles = StyleSheet.create({
  backgroundImage: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 21.5,
    paddingVertical: 228,
  },
  buttonContainer: {
    flexDirection: "column",
    gap: 98,
    width: "100%",
  },
  container: {
    backgroundColor: "#FFF",
    flex: 1,
  },
  content: {
    alignItems: "center",
    width: "100%",
  },
  questionText: {
    color: "rgba(87, 85, 85, 0.80)",
    fontFamily: "Arial-Rounded-Bold",
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 98,
    textAlign: "center",
  },
  safeArea: {
    flex: 1,
  },
})
/* eslint-enable react-native/no-color-literals */
