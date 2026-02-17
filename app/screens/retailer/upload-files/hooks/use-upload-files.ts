import { useCallback, useRef, useState } from "react"
import { Linking } from "react-native"
import * as DocumentPicker from "expo-document-picker"
import { Toast } from "react-native-toast-message/lib/src/Toast"

import { productQueryOptions } from "@/api/retailer/product"
import { useRetailerAuth } from "@/context/RetailerAuthContext"

import { MADRFILEURL, UI_TEXT } from "../lib/constants"

const BANNER_AUTO_HIDE_MS = 2500

export function useUploadFiles() {
  const { userAuth } = useRetailerAuth()
  const retailerId = userAuth?.userId ?? ""
  const bannerTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const [selectedPeerGroup, setSelectedPeerGroup] = useState<string | null>(null)
  const [filesByPeerGroup, setFilesByPeerGroup] = useState<Record<string, { name: string }>>({})
  const [banner, setBanner] = useState<{ visible: boolean; message: string }>({
    visible: false,
    message: "",
  })

  const { data: peerGroupsData } = productQueryOptions.useStaticPeersQuery()
  const peerGroups = peerGroupsData?.data ?? []

  const { mutateAsync: uploadFileAsync, isPending: isUploading } =
    productQueryOptions.useUploadRetailerFileMutation()

  const showBanner = useCallback((message: string) => {
    if (bannerTimeoutRef.current) clearTimeout(bannerTimeoutRef.current)
    setBanner({ visible: true, message })
    bannerTimeoutRef.current = setTimeout(() => {
      setBanner((b) => (b.visible ? { ...b, visible: false } : b))
      bannerTimeoutRef.current = null
    }, BANNER_AUTO_HIDE_MS)
  }, [])

  const dismissBanner = useCallback(() => {
    if (bannerTimeoutRef.current) {
      clearTimeout(bannerTimeoutRef.current)
      bannerTimeoutRef.current = null
    }
    setBanner((b) => (b.visible ? { ...b, visible: false } : b))
  }, [])

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

  const selectPeerGroup = useCallback((group: string) => {
    setSelectedPeerGroup(group)
  }, [])

  const removeFileForGroup = useCallback(
    (peerGroup: string) => {
      setFilesByPeerGroup((prev) => {
        const next = { ...prev }
        delete next[peerGroup]
        return next
      })
      showBanner(UI_TEXT.FILE_REMOVED)
    },
    [showBanner],
  )

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
      const fileName = file.name ?? "document.pdf"
      const formData = new FormData()
      formData.append("file", {
        uri: file.uri,
        name: fileName,
        type: file.mimeType ?? "application/pdf",
      } as any)
      await uploadFileAsync({
        formData,
        retailerId,
        peer_group: selectedPeerGroup,
      })
      setFilesByPeerGroup((prev) => ({
        ...prev,
        [selectedPeerGroup]: { name: fileName },
      }))
      showBanner(UI_TEXT.FILE_UPLOADED_FOR(selectedPeerGroup))
    } catch (err: any) {
      const msg =
        err?.response?.data?.message ?? err?.data?.message ?? "Upload failed. Please try again."
      Toast.show({
        type: "error",
        text1: (msg as string).toUpperCase(),
      })
    }
  }, [selectedPeerGroup, retailerId, uploadFileAsync, showBanner])

  return {
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
  }
}
