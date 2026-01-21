// eslint-disable-next-line no-restricted-imports
import React from "react"
import { ImageBackground, SafeAreaView, StatusBar, TouchableOpacity, View } from "react-native"

import { Images } from "@assets/Images/wholeSeller"

import { OptionBotton } from "@/components/option-button/option-botton"
import { Text } from "@/components/Text"
import { role } from "@/utils/role"

import { useOptionScreen } from "./hooks/useOptionScreen"
import { OPTION_SCREEN_BUTTON_VALUE_RETAILER, OPTION_SCREEN_QUESTION } from "./lib/constants"
import { styles } from "./lib/styles"

interface OptionScreenProps {}

export const OptionScreen: React.FC<OptionScreenProps> = (): React.JSX.Element => {
  const { handleOptionPress } = useOptionScreen()

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <SafeAreaView>
        <ImageBackground source={Images.Option} resizeMode="cover" style={styles.imageBackground}>
          <View style={styles.content}>
            <Text style={styles.questionText}>{OPTION_SCREEN_QUESTION}</Text>
            <TouchableOpacity onPress={() => handleOptionPress(role.RETAILER)}>
              <OptionBotton value={OPTION_SCREEN_BUTTON_VALUE_RETAILER} />
            </TouchableOpacity>
            {/* Hidden as per Client's Requirement */}
            {/* <TouchableOpacity onPress={() => handleOptionPress(role.WHOLE_SELLER)} activeOpacity={0.8}>
                <OptionBtn value="Wholesaler" />
              </TouchableOpacity> */}
          </View>
        </ImageBackground>
      </SafeAreaView>
    </View>
  )
}
