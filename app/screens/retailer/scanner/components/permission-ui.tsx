import { View, Text } from "react-native"

import ButtonField from "@/components/common-components/button/button"

import { UI_TEXT } from "../lib/constants"
import { styles } from "../lib/styles"
import type { PermissionUIProps } from "../lib/types"

export const PermissionUI: React.FC<PermissionUIProps> = ({
  onRequestPermission,
  onOpenSettings,
}) => {
  return (
    <View style={styles.permissionContainer}>
      <Text style={styles.permissionIcon}>📷</Text>
      <Text style={styles.permissionTitle}>{UI_TEXT.CAMERA_PERMISSION_REQUIRED}</Text>
      <Text style={styles.permissionMessage}>{UI_TEXT.CAMERA_PERMISSION_MESSAGE}</Text>
      <View style={styles.buttonContainer}>
        <ButtonField value={UI_TEXT.REQUEST_PERMISSION} onPress={onRequestPermission} />
        <ButtonField value={UI_TEXT.OPEN_SETTINGS} onPress={onOpenSettings} />
      </View>
    </View>
  )
}
