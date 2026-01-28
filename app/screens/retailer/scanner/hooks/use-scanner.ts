import { useState, useEffect, useCallback, useRef } from "react"
import { AppState, AppStateStatus, BackHandler, Linking, Platform } from "react-native"
import { useFocusEffect, useNavigation } from "@react-navigation/native"
import { request, PERMISSIONS, RESULTS, openSettings } from "react-native-permissions"
import { useCameraDevice } from "react-native-vision-camera"

import { RetailerRoutes } from "@/navigators/retailer/routes"

import { BARCODE_TYPES, CONSOLE_MESSAGES, PRODUCT_ID_LENGTH } from "../lib/constants"
import type { ScannedCode, UseScannerReturn } from "../lib/types"

export interface UseScannerReturnWithHandler extends UseScannerReturn {
  handleCodeScanned: (codes: any[]) => void
}

export function useScanner(): UseScannerReturnWithHandler {
  const navigation = useNavigation()
  const [hasPermission, setHasPermission] = useState(false)
  const [isCameraActive, setIsCameraActive] = useState(false)
  const [isInitialized, setIsInitialized] = useState(false)
  const [cameraError, setCameraError] = useState<string | null>(null)
  const [appState, setAppState] = useState<AppStateStatus>(AppState.currentState)
  const isFocusedRef = useRef(false)
  const hasNavigatedRef = useRef(false)

  const device = useCameraDevice("back")

  // Extract product ID from scanned code
  const extractProductId = useCallback((code: ScannedCode): string => {
    if (code.type === BARCODE_TYPES.QR) {
      // QR codes: Use full value
      return code.value
    } else {
      // EAN-13 and CODE-128: Extract last 12 characters
      return code.value.slice(-PRODUCT_ID_LENGTH)
    }
  }, [])

  // Handle barcode scan - exported for use in Camera component
  const handleCodeScanned = useCallback(
    (codes: any[]) => {
      if (hasNavigatedRef.current || !isFocusedRef.current) {
        return
      }

      if (codes && codes.length > 0) {
        const code = codes[0]
        const codeType = code.type?.toLowerCase() || "qr"

        let scannedCode: ScannedCode
        if (codeType.includes("qr")) {
          scannedCode = {
            type: BARCODE_TYPES.QR,
            value: code.value || "",
            productId: "",
          }
        } else if (codeType.includes("ean-13") || codeType.includes("ean13")) {
          scannedCode = {
            type: BARCODE_TYPES.EAN_13,
            value: code.value || "",
            productId: "",
          }
        } else if (codeType.includes("code-128") || codeType.includes("code128")) {
          scannedCode = {
            type: BARCODE_TYPES.CODE_128,
            value: code.value || "",
            productId: "",
          }
        } else {
          // Default to QR for unknown types
          scannedCode = {
            type: BARCODE_TYPES.QR,
            value: code.value || "",
            productId: "",
          }
        }

        scannedCode.productId = extractProductId(scannedCode)

        console.log(CONSOLE_MESSAGES.CODE_SCANNED, scannedCode)
        console.log(CONSOLE_MESSAGES.PRODUCT_ID_EXTRACTED, scannedCode.productId)

        // Validate product ID
        if (!scannedCode.productId || scannedCode.productId.trim().length === 0) {
          console.log(CONSOLE_MESSAGES.INVALID_PRODUCT_ID)
          return
        }

        // Prevent multiple navigations
        hasNavigatedRef.current = true

        // Navigate to Product Description screen
        console.log(CONSOLE_MESSAGES.NAVIGATING_TO_PRODUCT)
        // @ts-expect-error - navigation type doesn't include all RetailerRoutes
        navigation.navigate(RetailerRoutes.PRODUCT_DESCRIPTION, {
          singleProductId: scannedCode.productId,
        })
      }
    },
    [extractProductId, navigation],
  )

  // Check camera permission
  const checkPermission = useCallback(async () => {
    try {
      const cameraPermission =
        Platform.OS === "ios" ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA

      const result = await request(cameraPermission)

      if (result === RESULTS.GRANTED) {
        setHasPermission(true)
        setCameraError(null)
        console.log(CONSOLE_MESSAGES.PERMISSION_GRANTED)
      } else {
        setHasPermission(false)
        console.log(CONSOLE_MESSAGES.PERMISSION_DENIED)
      }
    } catch (error) {
      console.log(CONSOLE_MESSAGES.CAMERA_ERROR, error)
      setCameraError("Failed to check camera permission")
      setHasPermission(false)
    }
  }, [])

  // Request camera permission
  const handleRequestPermission = useCallback(async () => {
    await checkPermission()
  }, [checkPermission])

  // Open device settings
  const handleOpenSettings = useCallback(async () => {
    try {
      await openSettings()
    } catch (error) {
      console.log("Failed to open settings:", error)
      Linking.openSettings()
    }
  }, [])

  // Handle retry
  const handleRetry = useCallback(() => {
    setCameraError(null)
    hasNavigatedRef.current = false
    checkPermission()
  }, [checkPermission])

  // Handle back press
  const handleBackPress = useCallback(() => {
    setIsCameraActive(false)
    hasNavigatedRef.current = false
    // @ts-expect-error - navigation type doesn't include all RetailerRoutes
    navigation.navigate(RetailerRoutes.OPTIONS)
    return true
  }, [navigation])

  // App state change handler
  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState: AppStateStatus) => {
      console.log(CONSOLE_MESSAGES.APP_STATE_CHANGED, nextAppState)
      setAppState(nextAppState)

      if (nextAppState === "background" || nextAppState === "inactive") {
        setIsCameraActive(false)
        hasNavigatedRef.current = false
      }
    })

    return () => {
      subscription.remove()
    }
  }, [])

  // Back handler
  useEffect(() => {
    const backHandler = BackHandler.addEventListener("hardwareBackPress", handleBackPress)
    return () => backHandler.remove()
  }, [handleBackPress])

  // Check permission on mount
  useEffect(() => {
    checkPermission()
  }, [checkPermission])

  // Camera lifecycle management
  useFocusEffect(
    useCallback(() => {
      isFocusedRef.current = true
      hasNavigatedRef.current = false

      if (hasPermission && device && appState === "active") {
        setIsCameraActive(true)
        setIsInitialized(true)
        console.log(CONSOLE_MESSAGES.CAMERA_ACTIVATED)
      }

      return () => {
        isFocusedRef.current = false
        setIsCameraActive(false)
        console.log(CONSOLE_MESSAGES.CAMERA_DEACTIVATED)
      }
    }, [hasPermission, device, appState]),
  )

  // Camera error handling
  useEffect(() => {
    if (device && hasPermission) {
      setIsInitialized(true)
      setCameraError(null)
      console.log(CONSOLE_MESSAGES.CAMERA_INITIALIZED)
    } else if (!hasPermission) {
      setIsInitialized(false)
    } else if (!device) {
      setIsInitialized(false)
      setCameraError("Camera device not available")
    }
  }, [device, hasPermission])

  return {
    hasPermission,
    isCameraActive: isCameraActive && hasPermission && !!device && appState === "active",
    isInitialized,
    cameraError,
    handleRequestPermission,
    handleOpenSettings,
    handleRetry,
    handleBackPress,
    handleCodeScanned,
  }
}
