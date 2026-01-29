import { View, Text, ActivityIndicator, TouchableOpacity } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

import { colors } from "@/theme/colors"

import { usePreviewPDF } from "./hooks/use-preview-pdf"
import { UI_TEXT } from "./lib/constants"
import { styles } from "./lib/styles"

export default function PreviewPDF({ route }: any) {
  const { order, vendorData } = route.params
  const { isLoading, pdfPath, error, generatePDF, sharePDF, downloadPDF } = usePreviewPDF(
    order,
    vendorData,
  )

  const renderContent = () => {
    if (isLoading) {
      return (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color={colors.customColors.GREEN} />
          <Text style={styles.loaderText}>{UI_TEXT.GENERATING}</Text>
        </View>
      )
    }

    if (error) {
      return (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity style={[styles.button, styles.errorButton]} onPress={generatePDF}>
            <Text style={styles.buttonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      )
    }

    return (
      <View style={styles.container}>
        <View style={styles.buttonContainer}>
          {!pdfPath ? (
            <TouchableOpacity style={styles.button} onPress={generatePDF} disabled={isLoading}>
              <Text style={styles.buttonText}>{UI_TEXT.GENERATE_PDF}</Text>
            </TouchableOpacity>
          ) : (
            <>
              <TouchableOpacity
                style={[styles.button, styles.buttonDisabled]}
                onPress={downloadPDF}
                disabled={isLoading}
              >
                <Text style={styles.buttonText}>{UI_TEXT.DOWNLOAD_PDF}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={sharePDF} disabled={isLoading}>
                <Text style={styles.buttonText}>{UI_TEXT.SHARE_PDF}</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    )
  }

  return (
    <View style={styles.mainContainer}>
      <SafeAreaView style={styles.container}>{renderContent()}</SafeAreaView>
    </View>
  )
}
