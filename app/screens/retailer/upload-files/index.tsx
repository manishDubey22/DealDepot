import { View, Text, TouchableOpacity, ScrollView, Image, ActivityIndicator } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

import { HeaderComponent } from "@/components/common-components"
import ButtonField from "@/components/common-components/button/button"

import { useUploadFiles } from "./hooks/use-upload-files"
import { UI_TEXT } from "./lib/constants"
import { styles } from "./lib/styles"
import { Icon } from "../../../../assets/icons/wholeSeller"

export default function UploadFiles() {
  const {
    selectedPeerGroup,
    filesByPeerGroup,
    banner,
    dismissBanner,
    openMADRLink,
    selectPeerGroup,
    handleDocumentUpload,
    removeFileForGroup,
    peerGroups,
    isUploading,
  } = useUploadFiles()

  return (
    <View style={styles.container}>
      <HeaderComponent value="Upload Files" />

      {banner.visible && (
        <View style={styles.successBanner}>
          <View style={styles.bannerContent}>
            <Text style={styles.bannerText}>✔</Text>
            <Text style={styles.bannerText} numberOfLines={1}>
              {banner.message}
            </Text>
          </View>
          <TouchableOpacity
            onPress={dismissBanner}
            style={styles.bannerDismiss}
            hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
          >
            <Image source={Icon.CLOSE} style={styles.bannerDismissIcon} resizeMode="contain" />
          </TouchableOpacity>
        </View>
      )}

      <ScrollView
        style={styles.mainContainer}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <SafeAreaView edges={["bottom"]}>
          <View style={styles.iconWrapper}>
            <Image source={Icon.UPLOAD_FILES} style={styles.iconImage} resizeMode="contain" />
          </View>

          <Text style={styles.title}>{UI_TEXT.TITLE}</Text>
          <Text style={styles.subtitle}>{UI_TEXT.SUBTITLE}</Text>

          <View style={styles.downloadSection}>
            <Text style={styles.stepTitle}>{UI_TEXT.STEP_DOWNLOAD}</Text>
            <View style={styles.stepButton}>
              <ButtonField value={UI_TEXT.STEP_DOWNLOAD} onPress={openMADRLink} />
            </View>
          </View>

          <View style={styles.peerGroupSection}>
            <Text style={styles.peerGroupSectionLabel}>{UI_TEXT.STEP_SELECT_PEER}</Text>
            {peerGroups.map((group) => {
              const isSelected = selectedPeerGroup === group
              const fileInfo = filesByPeerGroup[group]
              const hasFile = !!fileInfo
              return (
                <TouchableOpacity
                  key={group}
                  activeOpacity={0.8}
                  style={[
                    styles.peerGroupCard,
                    (isSelected || hasFile) && styles.peerGroupSelected,
                  ]}
                  onPress={() => selectPeerGroup(group)}
                >
                  <View style={styles.peerGroupCardMain}>
                    <View style={styles.peerGroupCardContent}>
                      <View
                        style={[
                          styles.radioOuter,
                          (isSelected || hasFile) && styles.radioOuterSelected,
                        ]}
                      >
                        {(isSelected || hasFile) && <View style={styles.radioInner} />}
                      </View>
                      <Text style={styles.peerGroupName}>{UI_TEXT.PEER_GROUP_LABEL(group)}</Text>
                    </View>
                    {hasFile && fileInfo && (
                      <View style={styles.fileContainer}>
                        <View style={styles.fileContainerLeft}>
                          <Image source={Icon.File} style={styles.fileIcon} resizeMode="contain" />
                          <Text style={styles.fileName} numberOfLines={1}>
                            {fileInfo.name}
                          </Text>
                        </View>
                        <TouchableOpacity
                          style={styles.removeButton}
                          onPress={(e) => {
                            e.stopPropagation()
                            removeFileForGroup(group)
                          }}
                          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                        >
                          <Image
                            source={Icon.CLOSE}
                            style={styles.removeIcon}
                            resizeMode="contain"
                          />
                        </TouchableOpacity>
                      </View>
                    )}
                  </View>
                  {hasFile && <Text style={styles.uploadedLabel}>{UI_TEXT.UPLOADED}</Text>}
                </TouchableOpacity>
              )
            })}
          </View>

          <TouchableOpacity
            style={[styles.uploadButton, !selectedPeerGroup && styles.uploadButtonDisabled]}
            onPress={handleDocumentUpload}
            disabled={!selectedPeerGroup || isUploading}
            activeOpacity={0.8}
          >
            {isUploading ? (
              <ActivityIndicator color="#FFF" size="small" />
            ) : (
              <>
                <Image
                  source={Icon.UPLOAD_FILES}
                  style={styles.uploadButtonIcon}
                  resizeMode="contain"
                />
                <Text
                  style={[
                    styles.uploadButtonText,
                    !selectedPeerGroup && styles.uploadButtonTextDisabled,
                  ]}
                >
                  {isUploading ? UI_TEXT.UPLOADING : UI_TEXT.UPLOAD_PDF_FILE}
                </Text>
              </>
            )}
          </TouchableOpacity>

          <View style={styles.fileTypeInfo}>
            <Text style={styles.fileTypeInfoText}>{UI_TEXT.FILE_TYPE_INFO}</Text>
          </View>
        </SafeAreaView>
      </ScrollView>
    </View>
  )
}
