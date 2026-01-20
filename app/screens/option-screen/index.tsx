// eslint-disable-next-line no-restricted-imports
import React from "react"
import {
  ImageBackground,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from "react-native"

import { Images } from "@assets/Images/wholeSeller"

import { OptionBotton } from "@/components/option-button/option-botton"
import { Text } from "@/components/Text"
import { useAppTheme } from "@/theme/context"
import { $styles } from "@/theme/styles"
import { role } from "@/utils/role"

import { useOptionScreen } from "./hooks/useOptionScreen"
import { OPTION_SCREEN_BUTTON_VALUE_RETAILER, OPTION_SCREEN_QUESTION } from "./lib/constants"
import {
  $backgroundImage,
  $buttonContainer,
  $container,
  $content,
  $questionText,
} from "./lib/styles"

interface OptionScreenProps {}

export const OptionScreen: React.FC<OptionScreenProps> = (): React.JSX.Element => {
  const { handleOptionPress } = useOptionScreen()
  const { themed } = useAppTheme()

  return (
    <View style={themed($container)}>
      <StatusBar hidden />
      <SafeAreaView>
        <ImageBackground source={Images.Option} style={themed($backgroundImage)} resizeMode="cover">
          <View style={themed($content)}>
            <Text style={themed($questionText)}>{OPTION_SCREEN_QUESTION}</Text>
            <View style={themed($buttonContainer)}>
              <TouchableOpacity
                onPress={() => handleOptionPress(role.RETAILER)}
                style={themed($styles.touchableOpacity) as TouchableOpacityProps["style"]}
              >
                <OptionBotton value={OPTION_SCREEN_BUTTON_VALUE_RETAILER} />
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
