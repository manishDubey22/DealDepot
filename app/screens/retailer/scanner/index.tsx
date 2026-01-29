import { Component, ErrorInfo, ReactNode } from "react"
import { View, Text } from "react-native"
import { Camera } from "react-native-vision-camera"

import { ErrorState } from "./components/error-state"
import { PermissionUI } from "./components/permission-ui"
import { useScanner } from "./hooks/use-scanner"
import { UI_TEXT } from "./lib/constants"
import { styles } from "./lib/styles"

// Error Boundary to catch native module errors
class ScannerErrorBoundary extends Component<
  { children: ReactNode; onError: (error: Error) => void },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: { children: ReactNode; onError: (error: Error) => void }) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Scanner ErrorBoundary caught error:", error, errorInfo)
    this.props.onError(error)
  }

  render() {
    if (this.state.hasError && this.state.error) {
      const errorMessage =
        this.state.error.message?.includes("getConstants") ||
        this.state.error.message?.includes("CameraDevices")
          ? UI_TEXT.CAMERA_MODULE_NOT_LINKED
          : this.state.error.message || UI_TEXT.CAMERA_ERROR_MESSAGE

      return (
        <ErrorState
          error={errorMessage}
          onRetry={() => {
            this.setState({ hasError: false, error: null })
          }}
        />
      )
    }

    return this.props.children
  }
}

function ScannerContent() {
  const {
    hasPermission,
    isCameraActive,
    // isInitialized,
    cameraError,
    handleRequestPermission,
    handleOpenSettings,
    handleRetry,
    handleCodeScanned,
    device,
  } = useScanner()

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
      {isCameraActive && device && (
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

export default function Scanner() {
  const handleError = (error: Error) => {
    console.error("Scanner error:", error)
  }

  return (
    <ScannerErrorBoundary onError={handleError}>
      <ScannerContent />
    </ScannerErrorBoundary>
  )
}
