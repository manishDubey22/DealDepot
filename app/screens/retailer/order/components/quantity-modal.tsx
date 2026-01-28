import { useState, useEffect } from "react"
import { View, Text, TextInput, Modal, TouchableOpacity } from "react-native"

import { UI_TEXT } from "../lib/constants"
import { modalStyles } from "../lib/styles"
import type { QuantityModalProps } from "../lib/types"

const QuantityModal: React.FC<QuantityModalProps> = ({
  visible,
  item,
  quantity,
  onQuantityChange,
  onSubmit,
  onClose,
  isLoading,
}) => {
  const [localQuantity, setLocalQuantity] = useState(quantity)

  useEffect(() => {
    if (visible && item) {
      setLocalQuantity(item.items.toString())
    }
  }, [visible, item])

  const handleSubmit = () => {
    onQuantityChange(localQuantity)
    onSubmit()
  }

  return (
    <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={onClose}>
      <View style={modalStyles.overlay}>
        <View style={modalStyles.container}>
          <Text style={modalStyles.title}>{UI_TEXT.QUANTITY_MODAL_TITLE}</Text>
          {item && (
            <View style={modalStyles.itemInfo}>
              <Text style={modalStyles.itemName}>{item.product_desc}</Text>
              <Text style={modalStyles.itemId}>ID: {item.product_id}</Text>
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

export default QuantityModal
