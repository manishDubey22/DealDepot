import { useCallback, useEffect, useRef, useState } from "react"
import { AppState, AppStateStatus, BackHandler, Linking } from "react-native"
import { useFocusEffect, useNavigation } from "@react-navigation/native"

import { RetailerRoutes } from "@/navigators/retailer/routes"

import { BARCODE_TYPES, CONSOLE_MESSAGES, PRODUCT_ID_LENGTH, UI_TEXT } from "../lib/constants"
import type { ScannedCode, UseScannerReturn } from "../lib/types"

type PermissionTuple = [
  { granted: boolean; canAskAgain: boolean } | null,
  () => Promise<{ granted: boolean }>,
  () => Promise<{ granted: boolean }>,
]

function useCameraPermissionsStub(): PermissionTuple {
  const [perm] = useState(() => ({ granted: false, canAskAgain: true }))
  return [perm, async () => ({ granted: false }), async () => ({ granted: false })]
}

let useCameraPermissionsSafe: () => PermissionTuple
let cameraModuleAvailable: boolean

try {
  const expoCamera = require("expo-camera")
  if (typeof expoCamera?.useCameraPermissions === "function") {
    useCameraPermissionsSafe = expoCamera.useCameraPermissions
    cameraModuleAvailable = true
  } else {
    cameraModuleAvailable = false
    useCameraPermissionsSafe = useCameraPermissionsStub
  }
} catch {
  cameraModuleAvailable = false
  useCameraPermissionsSafe = useCameraPermissionsStub
}

export interface BarcodeScanningResultLike {
  type?: string
  data?: string
}

export interface UseScannerReturnWithHandler extends UseScannerReturn {
  handleCodeScanned: (result: BarcodeScanningResultLike) => void
}

export function useScanner() {
  const navigation = useNavigation()
  const [permission, requestPermission] = useCameraPermissionsSafe()
  const [cameraError, setCameraError] = useState<string | null>(() =>
    cameraModuleAvailable ? null : UI_TEXT.CAMERA_MODULE_NOT_LINKED,
  )
  const [appState, setAppState] = useState<AppStateStatus>(AppState.currentState)
  const isFocusedRef = useRef(false)
  const hasNavigatedRef = useRef(false)

  const hasPermission = permission?.granted ?? false
  const isCameraActive = true

  const extractProductId = useCallback((type: string, value: string): string => {
    const codeType = (type || "qr").toLowerCase()
    if (codeType === "qr") {
      return value || ""
    }
    if (
      codeType.includes("ean") ||
      codeType.includes("ean13") ||
      codeType.includes("code128") ||
      codeType.includes("code-128")
    ) {
      return (value || "").slice(-PRODUCT_ID_LENGTH)
    }
    return (value || "").slice(-PRODUCT_ID_LENGTH)
  }, [])

  const handleCodeScanned = useCallback(
    (result: BarcodeScanningResultLike) => {
      if (hasNavigatedRef.current || !isFocusedRef.current) {
        return
      }

      const value = result?.data ?? ""
      const codeType = (result?.type ?? "qr").toLowerCase()

      let scannedCode: ScannedCode
      if (codeType === "qr") {
        scannedCode = {
          type: BARCODE_TYPES.QR,
          value,
          productId: "",
        }
      } else if (codeType.includes("ean") || codeType.includes("ean13")) {
        scannedCode = {
          type: BARCODE_TYPES.EAN_13,
          value,
          productId: "",
        }
      } else if (codeType.includes("code128") || codeType.includes("code-128")) {
        scannedCode = {
          type: BARCODE_TYPES.CODE_128,
          value,
          productId: "",
        }
      } else {
        scannedCode = {
          type: BARCODE_TYPES.QR,
          value,
          productId: "",
        }
      }

      scannedCode.productId = extractProductId(codeType, scannedCode.value)

      console.log(CONSOLE_MESSAGES.CODE_SCANNED, scannedCode)
      console.log(CONSOLE_MESSAGES.PRODUCT_ID_EXTRACTED, scannedCode.productId)

      if (!scannedCode.productId || scannedCode.productId.trim().length === 0) {
        console.log(CONSOLE_MESSAGES.INVALID_PRODUCT_ID)
        return
      }

      hasNavigatedRef.current = true

      console.log(CONSOLE_MESSAGES.NAVIGATING_TO_PRODUCT)
      // @ts-expect-error - navigation type doesn't include all RetailerRoutes
      navigation.navigate(RetailerRoutes.PRODUCT_DESCRIPTION, {
        singleProductId: scannedCode.productId,
      })
    },
    [extractProductId, navigation],
  )

  const handleRequestPermission = useCallback(async () => {
    if (!cameraModuleAvailable) return
    setCameraError(null)
    await requestPermission()
  }, [requestPermission])

  const handleOpenSettings = useCallback(async () => {
    try {
      await Linking.openSettings()
    } catch (error) {
      console.log("Failed to open settings:", error)
    }
  }, [])

  const handleRetry = useCallback(() => {
    if (!cameraModuleAvailable) return
    setCameraError(null)
    hasNavigatedRef.current = false
    requestPermission()
  }, [requestPermission])

  const handleBackPress = useCallback(() => {
    hasNavigatedRef.current = false
    // @ts-expect-error - navigation type doesn't include all RetailerRoutes
    navigation.navigate(RetailerRoutes.OPTIONS)
    return true
  }, [navigation])

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState: AppStateStatus) => {
      console.log(CONSOLE_MESSAGES.APP_STATE_CHANGED, nextAppState)
      setAppState(nextAppState)
      if (nextAppState === "background" || nextAppState === "inactive") {
        hasNavigatedRef.current = false
      }
    })
    return () => subscription.remove()
  }, [])

  useEffect(() => {
    const backHandler = BackHandler.addEventListener("hardwareBackPress", handleBackPress)
    return () => backHandler.remove()
  }, [handleBackPress])

  useFocusEffect(
    useCallback(() => {
      isFocusedRef.current = true
      hasNavigatedRef.current = false
      if (appState === "active") {
        console.log(CONSOLE_MESSAGES.CAMERA_ACTIVATED)
      }
      return () => {
        isFocusedRef.current = false
        console.log(CONSOLE_MESSAGES.CAMERA_DEACTIVATED)
      }
    }, [appState]),
  )

  return {
    hasPermission,
    isCameraActive: isCameraActive && hasPermission && appState === "active",
    isInitialized: true,
    cameraError,
    device: null,
    handleRequestPermission,
    handleOpenSettings,
    handleRetry,
    handleBackPress,
    handleCodeScanned,
  }
}
