import { useCallback, useState } from "react"
import { Linking } from "react-native"
import * as DocumentPicker from "expo-document-picker"
import { useNavigation } from "@react-navigation/native"
import { Toast } from "react-native-toast-message/lib/src/Toast"

import { productQueryOptions } from "@/api/retailer/product"
import { useRetailerAuth } from "@/context/RetailerAuthContext"
import { RetailerRoutes } from "@/navigators/retailer/routes"

import { MADRFILEURL, UI_TEXT } from "../lib/constants"

export function useUploadFiles() {
  const navigation = useNavigation()
  const { userAuth } = useRetailerAuth()
  const retailerId = userAuth?.userId ?? ""

  const [selectedPeerGroup, setSelectedPeerGroup] = useState<string | null>(null)
  const [peerGroupModalVisible, setPeerGroupModalVisible] = useState(false)

  const { data: peerGroupsData, isLoading: isLoadingPeers } =
    productQueryOptions.useStaticPeersQuery()
  const peerGroups = peerGroupsData?.data ?? []

  const { mutateAsync: uploadFileAsync, isPending: isUploading } =
    productQueryOptions.useUploadRetailerFileMutation()

  const openMADRLink = useCallback(async () => {
    try {
      const canOpen = await Linking.canOpenURL(MADRFILEURL)
      if (canOpen) {
        await Linking.openURL(MADRFILEURL)
      } else {
        Toast.show({
          type: "error",
          text1: UI_TEXT.INVALID_URL_TOAST(MADRFILEURL),
        })
      }
    } catch {
      Toast.show({
        type: "error",
        text1: UI_TEXT.INVALID_URL_TOAST(MADRFILEURL),
      })
    }
  }, [])

  const openPeerGroupModal = useCallback(() => {
    setPeerGroupModalVisible(true)
  }, [])

  const closePeerGroupModal = useCallback(() => {
    setPeerGroupModalVisible(false)
  }, [])

  const selectPeerGroup = useCallback((group: string) => {
    setSelectedPeerGroup(group)
    setPeerGroupModalVisible(false)
  }, [])

  const handleDocumentUpload = useCallback(async () => {
    if (!selectedPeerGroup) {
      Toast.show({
        type: "error",
        text1: UI_TEXT.SELECT_PEER_TOAST,
      })
      return
    }
    if (!retailerId) {
      return
    }
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "application/pdf",
        copyToCacheDirectory: true,
      })
      if (result.canceled) {
        return
      }
      const file = result.assets[0]
      const formData = new FormData()
      formData.append("file", {
        uri: file.uri,
        name: file.name ?? "document.pdf",
        type: file.mimeType ?? "application/pdf",
      } as any)
      const response = await uploadFileAsync({
        formData,
        retailerId,
        peer_group: selectedPeerGroup,
      })
      const message = response?.data?.message ?? "File uploaded successfully"
      Toast.show({
        type: "success",
        text1: `${String(message).toUpperCase()}${UI_TEXT.SUCCESS_SUFFIX}`,
      })
      navigation.navigate(RetailerRoutes.SEARCH as never)
    } catch (err: any) {
      const msg =
        err?.response?.data?.message ?? err?.data?.message ?? "Upload failed. Please try again."
      Toast.show({
        type: "error",
        text1: (msg as string).toUpperCase(),
      })
    }
  }, [selectedPeerGroup, retailerId, uploadFileAsync, navigation])

  return {
    selectedPeerGroup,
    peerGroupModalVisible,
    openMADRLink,
    openPeerGroupModal,
    closePeerGroupModal,
    selectPeerGroup,
    handleDocumentUpload,
    peerGroups,
    isLoadingPeers,
    isUploading,
  }
}
