import { View, TouchableOpacity, Text, Image, Modal } from "react-native"
import { ScrollView } from "react-native-gesture-handler"
// import { SafeAreaView } from "react-native-safe-area-context"

import { Screen } from "@/components/Screen"

import { useHomeOptionList } from "./hooks/use-home-option-list"
import { UI_TEXT } from "./lib/constants"
import { styles } from "./lib/styles"
import { Icon } from "../../../../assets/icons/wholeSeller"

const HomeOptionList = () => {
  const { showPopup, setShowPopup, navigateHome, madrCheckerLink, buttons } = useHomeOptionList()

  return (
    <Screen preset="auto">
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.guide}>{UI_TEXT.GUIDE_TITLE}</Text>
          <View style={styles.buttonsContainer}>
            {buttons.map((buttonLabel, index) => (
              <TouchableOpacity
                key={index}
                style={styles.button}
                onPress={() => navigateHome(buttonLabel)}
              >
                <Text style={styles.textdata}>{buttonLabel}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
        <Text style={styles.contactUsText} onPress={madrCheckerLink}>
          {UI_TEXT.CONTACT_US_TEXT}
        </Text>
      </View>
      <Image source={Icon.FOOTER} style={styles.footerImage} />
      <Modal transparent={true} visible={showPopup} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{UI_TEXT.MODAL_TITLE}</Text>
            <View style={styles.iconContainer}>
              <Text style={styles.icon}>🔒</Text>
            </View>
            <Text style={styles.modalText}>{UI_TEXT.MODAL_TEXT}</Text>
            <TouchableOpacity style={styles.closeButton} onPress={() => setShowPopup(false)}>
              <Text style={styles.closeButtonText}>{UI_TEXT.CLOSE_BUTTON_TEXT}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </Screen>
  )
}

export default HomeOptionList
