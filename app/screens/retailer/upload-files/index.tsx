import { View, Text, TouchableOpacity, Modal, ScrollView } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

import { HeaderComponent } from "@/components/common-components"
import ButtonField from "@/components/common-components/button/button"

import { useUploadFiles } from "./hooks/use-upload-files"
import { UI_TEXT } from "./lib/constants"
import { styles } from "./lib/styles"

export default function UploadFiles() {
  const {
    selectedPeerGroup,
    peerGroupModalVisible,
    openMADRLink,
    openPeerGroupModal,
    closePeerGroupModal,
    selectPeerGroup,
    handleDocumentUpload,
    peerGroups,
    isUploading,
  } = useUploadFiles()

  return (
    <View style={styles.mainContainer}>
      <HeaderComponent value="Upload Files" />
      <SafeAreaView style={styles.safeArea} edges={["bottom"]}>
        <View style={styles.stepBlock}>
          <Text style={styles.stepTitle}>{UI_TEXT.STEP_DOWNLOAD}</Text>
          <View style={styles.stepButton}>
            <ButtonField value={UI_TEXT.STEP_DOWNLOAD} onPress={openMADRLink} />
          </View>
        </View>

        <View style={styles.stepBlock}>
          <Text style={styles.stepTitle}>{UI_TEXT.STEP_SELECT_PEER}</Text>
          <TouchableOpacity
            style={styles.peerGroupButton}
            onPress={openPeerGroupModal}
            activeOpacity={0.8}
          >
            <Text style={styles.peerGroupButtonText}>
              {selectedPeerGroup ?? UI_TEXT.PEER_GROUP_PLACEHOLDER}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.stepBlock}>
          <ButtonField value={UI_TEXT.SELECT_MADR_FILE} onPress={handleDocumentUpload} />
        </View>

        <View style={styles.stepBlock}>
          <ButtonField
            value={isUploading ? UI_TEXT.UPLOADING : UI_TEXT.UPLOAD}
            onPress={handleDocumentUpload}
            isDisabled={isUploading}
            isLoading={isUploading}
          />
        </View>
      </SafeAreaView>

      <Modal
        visible={peerGroupModalVisible}
        transparent
        animationType="fade"
        onRequestClose={closePeerGroupModal}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={closePeerGroupModal}
        >
          <TouchableOpacity
            activeOpacity={1}
            onPress={(e) => e.stopPropagation()}
            style={styles.modalContent}
          >
            <Text style={styles.modalTitle}>{UI_TEXT.STEP_SELECT_PEER}</Text>
            <ScrollView keyboardShouldPersistTaps="handled">
              {peerGroups.map((group) => (
                <TouchableOpacity
                  key={group}
                  style={styles.peerOption}
                  onPress={() => selectPeerGroup(group)}
                >
                  <Text style={styles.peerOptionText}>{group}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            <TouchableOpacity style={styles.modalCloseButton} onPress={closePeerGroupModal}>
              <Text style={styles.modalCloseText}>Close</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </View>
  )
}
