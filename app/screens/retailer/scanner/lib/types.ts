import type { AppStateStatus } from "react-native"

export interface UseScannerReturn {
  hasPermission: boolean
  isCameraActive: boolean
  isInitialized: boolean
  cameraError: string | null
  handleRequestPermission: () => Promise<void>
  handleOpenSettings: () => Promise<void>
  handleRetry: () => void
  handleBackPress: () => boolean
}

export interface ScannedCode {
  type: "qr" | "ean-13" | "code-128"
  value: string
  productId: string
}

export interface PermissionUIProps {
  onRequestPermission: () => Promise<void>
  onOpenSettings: () => Promise<void>
}

export interface ErrorStateProps {
  error: string
  onRetry: () => void
}
