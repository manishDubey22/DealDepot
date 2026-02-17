import { Platform } from "react-native"
import * as Updates from "expo-updates"

/**
 * Checks for OTA update on Android and applies it automatically.
 * Only runs in production builds (not in development).
 * Does not block UI rendering.
 */
export async function checkForAppUpdate(): Promise<void> {
  // Skip in development mode
  if (__DEV__) {
    return
  }

  // Android only for now
  if (Platform.OS !== "android") {
    return
  }

  try {
    console.log("[updateService] Checking for OTA update...")

    const update = await Updates.checkForUpdateAsync()

    if (!update.isAvailable) {
      console.log("[updateService] No update available")
      return
    }

    console.log("[updateService] Update available, fetching...")

    const fetchResult = await Updates.fetchUpdateAsync()

    if (!fetchResult.isNew) {
      console.log("[updateService] Update fetched but not new")
      return
    }

    console.log("[updateService] Update applied, reloading...")
    await Updates.reloadAsync()
  } catch (error) {
    console.warn("[updateService] Update check failed:", error)
  }
}
