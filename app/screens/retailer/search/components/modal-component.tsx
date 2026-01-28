import { Modal, View, Text, TouchableOpacity, FlatList, Pressable } from "react-native"

import { modalStyles } from "../lib/styles"

type IModalProps = {
  visible: boolean
  items: ArrayLike<any> | null | undefined
  onSelect: (subcategory: any) => void
  onClose: () => void
}

const ModalComponent = ({ visible, items, onSelect, onClose }: IModalProps) => {
  return (
    <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={onClose}>
      <Pressable onPress={() => onClose()} style={modalStyles.centeredView}>
        <View style={modalStyles.modalView}>
          <FlatList
            data={items}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={modalStyles.itemContainer}
                onPress={() => {
                  onSelect(item)
                  onClose()
                }}
              >
                <Text style={modalStyles.itemText}>{item}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </Pressable>
    </Modal>
  )
}

export default ModalComponent
