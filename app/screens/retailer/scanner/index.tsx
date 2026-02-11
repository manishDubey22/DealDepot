import type { ComponentType } from "react"
import { useRef, useState } from "react"
import { View, Text } from "react-native"

import { ErrorState } from "./components/error-state"
import { PermissionUI } from "./components/permission-ui"
import { useScanner } from "./hooks/use-scanner"
import { UI_TEXT } from "./lib/constants"
import { styles } from "./lib/styles"

const BARCODE_TYPES_EXPO = ["qr", "ean13", "code128"] as const

let CameraView: ComponentType<{
  style?: unknown
  facing?: "back" | "front"
  barcodeScannerSettings?: { barcodeTypes: readonly string[] }
  onBarcodeScanned?: (result: { type?: string; data?: string }) => void
  onMountError?: (event: { message: string }) => void
}> | null = null
try {
  CameraView = require("expo-camera").CameraView
} catch {
  // Native module not linked (e.g. Expo Go); show error from useScanner instead
}

export default function Scanner() {
  const lastScannedRef = useRef<string | null>(null)
  const [mountError, setMountError] = useState<string | null>(null)
  const {
    hasPermission,
    isCameraActive,
    cameraError,
    handleRequestPermission,
    handleOpenSettings,
    handleRetry,
    handleCodeScanned,
  } = useScanner()

  const onBarcodeScanned = (result: { type?: string; data?: string }) => {
    const data = result?.data ?? ""
    if (!data) return
    if (lastScannedRef.current === data) return
    lastScannedRef.current = data
    handleCodeScanned(result)
  }

  const onRetry = () => {
    setMountError(null)
    handleRetry()
  }

  const displayError = cameraError || mountError
  if (displayError) {
    return <ErrorState error={displayError} onRetry={onRetry} />
  }

  if (!hasPermission) {
    return (
      <PermissionUI
        onRequestPermission={handleRequestPermission}
        onOpenSettings={handleOpenSettings}
      />
    )
  }

  return (
    <View style={styles.container}>
      {isCameraActive && CameraView && (
        <CameraView
          style={styles.camera}
          facing="back"
          barcodeScannerSettings={{
            barcodeTypes: [...BARCODE_TYPES_EXPO],
          }}
          onBarcodeScanned={onBarcodeScanned}
          onMountError={({ message }) => {
            setMountError(message || UI_TEXT.CAMERA_ERROR_MESSAGE)
          }}
        />
      )}
      <View style={styles.overlay} pointerEvents="none">
        <View style={styles.overlayTop} />
        <View style={styles.overlayBottom} />
        <View style={styles.overlayLeft} />
        <View style={styles.overlayRight} />
        <View style={styles.centerContent}>
          <View style={styles.frame} />
          <Text style={styles.instructionText}>{UI_TEXT.POSITION_BARCODE}</Text>
        </View>
      </View>
    </View>
  )
}
