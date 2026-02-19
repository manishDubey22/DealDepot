import { useCallback, useEffect, useMemo, useState } from "react"
import {
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native"

import { styles } from "./quantity-modal.styles"

interface QuantityModalProps {
  visible: boolean
  wholesalerName: string
  unitPrice: number | string
  onClose: () => void
  onConfirm: (quantity: number) => Promise<void>
}

export function QuantityModal({
  visible,
  wholesalerName,
  unitPrice,
  onClose,
  onConfirm,
}: QuantityModalProps) {
  const [quantity, setQuantity] = useState("1")
  const [isLoading, setIsLoading] = useState(false)

  // Reset quantity when modal opens
  useEffect(() => {
    if (visible) setQuantity("1")
  }, [visible])

  const numericQuantity = useMemo(() => {
    const parsed = parseInt(quantity, 10)
    if (isNaN(parsed) || parsed < 1) return 1
    return parsed
  }, [quantity])

  const numericUnitPrice = useMemo(() => {
    if (typeof unitPrice === "number" && !isNaN(unitPrice)) return unitPrice
    if (typeof unitPrice === "string") {
      const parsed = parseFloat(unitPrice)
      return isNaN(parsed) ? 0 : parsed
    }
    return 0
  }, [unitPrice])

  const totalPrice = useMemo(
    () => numericQuantity * numericUnitPrice,
    [numericQuantity, numericUnitPrice],
  )

  const handleQuantityChange = useCallback((text: string) => {
    const numericValue = text.replace(/[^0-9]/g, "")
    if (numericValue === "") {
      setQuantity("1")
      return
    }
    const parsed = parseInt(numericValue, 10)
    if (!isNaN(parsed) && parsed >= 1) setQuantity(numericValue)
    else if (numericValue === "0") setQuantity("1")
  }, [])

  const handleConfirm = useCallback(async () => {
    if (numericQuantity <= 0 || isLoading) return
    setIsLoading(true)
    try {
      await onConfirm(numericQuantity)
      setQuantity("1")
      onClose()
    } catch (error) {
      console.log("error =>", error)
    } finally {
      setIsLoading(false)
    }
  }, [numericQuantity, onConfirm, isLoading, onClose])

  const handleCancel = useCallback(() => {
    Keyboard.dismiss()
    setQuantity("1")
    onClose()
  }, [onClose])

  const handleBackdropPress = useCallback(() => {
    Keyboard.dismiss()
    handleCancel()
  }, [handleCancel])

  const handleSubmitEditing = useCallback(() => {
    Keyboard.dismiss()
  }, [])

  if (!visible) return null

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={handleCancel}
      statusBarTranslucent
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoid}
      >
        <TouchableWithoutFeedback onPress={handleBackdropPress}>
          <View style={styles.backdrop}>
            <TouchableWithoutFeedback onPress={() => {}}>
              <View style={styles.card}>
                <Text style={styles.title}>Enter Quantity</Text>
                <Text style={styles.wholesalerName}>{wholesalerName}</Text>
                <View style={styles.divider} />

                <View style={styles.quantityInputContainer}>
                  <TextInput
                    style={styles.quantityInput}
                    value={quantity}
                    onChangeText={handleQuantityChange}
                    keyboardType="numeric"
                    returnKeyType="done"
                    textAlign="center"
                    editable={!isLoading}
                    onSubmitEditing={handleSubmitEditing}
                  />
                </View>

                <View style={styles.pricingSection}>
                  <Text style={styles.unitPriceText}>
                    Unit Price: ${numericUnitPrice.toFixed(2)}
                  </Text>
                  <Text style={styles.totalPriceText}>Total: ${totalPrice.toFixed(2)}</Text>
                </View>

                <View style={styles.divider} />

                <View style={styles.buttonsRow}>
                  <TouchableOpacity
                    style={styles.cancelButton}
                    onPress={handleCancel}
                    disabled={isLoading}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.cancelButtonText}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.addToCartButton,
                      (numericQuantity <= 0 || isLoading) && styles.addToCartButtonDisabled,
                    ]}
                    onPress={handleConfirm}
                    disabled={numericQuantity <= 0 || isLoading}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.addToCartButtonText}>Add to Cart</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </Modal>
  )
}
