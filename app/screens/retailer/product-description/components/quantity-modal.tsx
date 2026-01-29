import { useEffect, useState } from "react"
import { Modal, Text, TextInput, TouchableOpacity, View } from "react-native"

import type { productTypes } from "@/api/retailer/product"

import { UI_TEXT } from "../lib/constants"
import { modalStyles } from "../lib/styles"

interface QuantityModalProps {
  visible: boolean
  wholesaler: productTypes.WholesalerData | null
  quantity: string
  onQuantityChange: (value: string) => void
  onSubmit: () => void
  onClose: () => void
  isLoading: boolean
}

export const QuantityModal: React.FC<QuantityModalProps> = ({
  visible,
  wholesaler,
  quantity,
  onQuantityChange,
  onSubmit,
  onClose,
  isLoading,
}) => {
  const [localQuantity, setLocalQuantity] = useState(quantity)

  useEffect(() => {
    if (visible) {
      setLocalQuantity(quantity || "1")
    }
  }, [visible, quantity])

  const handleSubmit = () => {
    onQuantityChange(localQuantity)
    onSubmit()
  }

  return (
    <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={onClose}>
      <View style={modalStyles.overlay}>
        <View style={modalStyles.container}>
          <Text style={modalStyles.title}>{UI_TEXT.QUANTITY_MODAL_TITLE}</Text>
          {wholesaler && (
            <View style={modalStyles.itemInfo}>
              <Text style={modalStyles.itemName}>{wholesaler.name}</Text>
              <Text style={modalStyles.itemId}>Price: ${wholesaler.price}</Text>
            </View>
          )}
          <TextInput
            style={modalStyles.input}
            value={localQuantity}
            onChangeText={setLocalQuantity}
            keyboardType="numeric"
            placeholder="Enter quantity"
            editable={!isLoading}
          />
          <View style={modalStyles.buttonContainer}>
            <TouchableOpacity
              style={[modalStyles.button, modalStyles.cancelButton]}
              onPress={onClose}
              disabled={isLoading}
            >
              <Text style={modalStyles.cancelButtonText}>{UI_TEXT.QUANTITY_MODAL_CANCEL}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[modalStyles.button, modalStyles.submitButton]}
              onPress={handleSubmit}
              disabled={isLoading || !localQuantity || parseInt(localQuantity) < 0}
            >
              <Text style={modalStyles.submitButtonText}>{UI_TEXT.QUANTITY_MODAL_SUBMIT}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  )
}
