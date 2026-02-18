import { forwardRef, useCallback, useMemo, useState } from "react"
import { Text, TextInput, TouchableOpacity, View } from "react-native"
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet"
import type { BottomSheetBackdropProps } from "@gorhom/bottom-sheet"

import { styles } from "./quantity-bottom-sheet.styles"

interface QuantityBottomSheetProps {
  wholesalerName: string
  unitPrice: number | string
  onConfirm: (quantity: number) => Promise<void>
}

export const QuantityBottomSheet = forwardRef<BottomSheetModal, QuantityBottomSheetProps>(
  function QuantityBottomSheet({ wholesalerName, unitPrice, onConfirm }, ref) {
    const snapPoints = ["50%"]
    const [quantity, setQuantity] = useState("1")
    const [isLoading, setIsLoading] = useState(false)

    const handleSheetChange = useCallback((index: number) => {
      if (index >= 0) {
        // Sheet is open - reset quantity to 1
        setQuantity("1")
      }
    }, [])

    const numericQuantity = useMemo(() => {
      const parsed = parseInt(quantity, 10)
      return isNaN(parsed) || parsed < 1 ? 1 : parsed
    }, [quantity])

    const numericUnitPrice = useMemo(() => {
      if (typeof unitPrice === "number" && !isNaN(unitPrice)) {
        return unitPrice
      }
      if (typeof unitPrice === "string") {
        const parsed = parseFloat(unitPrice)
        return isNaN(parsed) ? 0 : parsed
      }
      return 0
    }, [unitPrice])

    const totalPrice = useMemo(() => {
      return numericQuantity * numericUnitPrice
    }, [numericQuantity, numericUnitPrice])

    const renderBackdrop = useCallback(
      (props: BottomSheetBackdropProps) => (
        <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} opacity={0.5} />
      ),
      [],
    )

    const handleConfirm = useCallback(async () => {
      if (numericQuantity <= 0 || isLoading) return

      setIsLoading(true)
      try {
        await onConfirm(numericQuantity)
        // Bottom sheet will be closed by parent after success
        setQuantity("1")
      } catch (error) {
        // Error handling is done in onConfirm
        console.log("error =>", error)
      } finally {
        setIsLoading(false)
      }
    }, [numericQuantity, onConfirm, isLoading])

    const handleCancel = useCallback(() => {
      if (typeof ref !== "function" && ref?.current) {
        ref.current.dismiss()
      }
      setQuantity("1")
    }, [ref])

    return (
      <BottomSheetModal
        ref={ref}
        snapPoints={snapPoints}
        enablePanDownToClose
        backdropComponent={renderBackdrop}
        onChange={handleSheetChange}
      >
        <BottomSheetView style={styles.contentContainer}>
          <Text style={styles.title}>Enter Quantity</Text>
          <Text style={styles.wholesalerName}>{wholesalerName}</Text>
          <View style={styles.divider} />

          <View style={styles.quantityInputContainer}>
            <TextInput
              style={styles.quantityInput}
              value={quantity}
              onChangeText={setQuantity}
              keyboardType="numeric"
              textAlign="center"
              editable={!isLoading}
            />
          </View>

          <View style={styles.pricingSection}>
            <Text style={styles.unitPriceText}>Unit Price: ${numericUnitPrice.toFixed(2)}</Text>
            <Text style={styles.totalPriceText}>Total: ${totalPrice.toFixed(2)}</Text>
          </View>

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
        </BottomSheetView>
      </BottomSheetModal>
    )
  },
)
