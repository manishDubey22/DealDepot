import { View, Text } from "react-native"
import { Camera, useCameraDevice } from "react-native-vision-camera"

import { ErrorState } from "./components/error-state"
import { PermissionUI } from "./components/permission-ui"
import { useScanner } from "./hooks/use-scanner"
import { UI_TEXT } from "./lib/constants"
import { styles } from "./lib/styles"

export default function Scanner() {
  const {
    hasPermission,
    isCameraActive,
    isInitialized,
    cameraError,
    handleRequestPermission,
    handleOpenSettings,
    handleRetry,
    handleCodeScanned,
  } = useScanner()

  const device = useCameraDevice("back")

  // Show permission UI if permission not granted
  if (!hasPermission) {
    return (
      <PermissionUI
        onRequestPermission={handleRequestPermission}
        onOpenSettings={handleOpenSettings}
      />
    )
  }

  // Show error state if camera error
  if (cameraError || !device) {
    return <ErrorState error={cameraError || "Camera device not available"} onRetry={handleRetry} />
  }

  // Show camera view
  return (
    <View style={styles.container}>
      {isInitialized && device && (
        <Camera
          style={styles.camera}
          device={device}
          isActive={isCameraActive}
          codeScanner={{
            codeTypes: ["qr", "ean-13", "code-128"],
            onCodeScanned: handleCodeScanned,
          }}
        />
      )}
      <View style={styles.overlay}>
        <View style={styles.scanFrame}>
          <View style={[styles.scanFrameCorner, styles.topLeft]} />
          <View style={[styles.scanFrameCorner, styles.topRight]} />
          <View style={[styles.scanFrameCorner, styles.bottomLeft]} />
          <View style={[styles.scanFrameCorner, styles.bottomRight]} />
        </View>
        <Text style={styles.instructionText}>{UI_TEXT.POSITION_BARCODE}</Text>
      </View>
    </View>
  )
}
