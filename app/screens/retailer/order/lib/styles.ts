import { StyleSheet } from "react-native"

import { colors } from "@/theme/colors"
import { CommonStyles } from "@/theme/common-styles"

export const styles = StyleSheet.create({
  cardBox: {
    backgroundColor: colors.palette.neutral100,
    borderRadius: 8,
    elevation: 2,
    marginBottom: 12,
    padding: 12,
    shadowColor: colors.palette.black500,
    shadowOffset: {
      height: 1,
      width: 0,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  cardBoxLeft: {
    alignItems: "center",
    flexDirection: "row",
    gap: 12,
  },
  container: {
    flex: 1,
    padding: 16,
  },
  contentContainer: {
    paddingBottom: 100,
  },
  emptyContainer: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  emptyText: {
    color: colors.palette.neutral550,
    fontFamily: CommonStyles.fontFamily.fontFamily,
    fontSize: 18,
    textAlign: "center",
  },
  imageContainer: {
    width: "20%",
  },
  loaderContainer: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  mainContainer: {
    backgroundColor: colors.palette.neutral100,
    flex: 1,
  },
  priceContainer: {
    alignItems: "flex-end",
    width: "20%",
  },
  priceText: {
    color: colors.customColors.GREEN,
    fontFamily: CommonStyles.fontFamily.fontFamily,
    fontSize: 18,
    fontWeight: "700",
  },
  productCategory: {
    color: colors.palette.neutral550,
    fontFamily: CommonStyles.fontFamily.fontFamily,
    fontSize: 14,
  },
  productDesc: {
    color: colors.palette.neutral900,
    fontFamily: CommonStyles.fontFamily.fontFamily,
    fontSize: 16,
    fontWeight: "600",
  },
  productId: {
    color: colors.palette.neutral550,
    fontFamily: CommonStyles.fontFamily.fontFamily,
    fontSize: 12,
  },
  productImage: {
    height: 60,
    width: 30,
  },
  productInfo: {
    display: "flex",
    flex: 1,
    gap: 8,
  },
  quantityButton: {
    alignItems: "center",
    backgroundColor: colors.customColors.LIGHTGREEN,
    borderRadius: 4,
    height: 36,
    justifyContent: "center",
    width: 36,
  },
  quantityButtonText: {
    color: colors.palette.neutral100,
    fontFamily: CommonStyles.fontFamily.fontFamily,
    fontSize: 20,
    fontWeight: "700",
  },
  quantityContainer: {
    alignItems: "center",
    flexDirection: "row",
    gap: 12,
    justifyContent: "center",
    marginTop: 12,
  },
  quantityText: {
    color: colors.palette.neutral900,
    fontFamily: CommonStyles.fontFamily.fontFamily,
    fontSize: 18,
    fontWeight: "600",
    minWidth: 40,
    textAlign: "center",
  },
  saveOrderButton: {
    marginTop: 20,
    paddingHorizontal: 16,
  },
})

export const modalStyles = StyleSheet.create({
  button: {
    borderRadius: 8,
    flex: 1,
    padding: 12,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 12,
  },
  cancelButton: {
    backgroundColor: colors.palette.neutral200,
  },
  cancelButtonText: {
    color: colors.palette.neutral900,
    fontFamily: CommonStyles.fontFamily.fontFamily,
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  container: {
    backgroundColor: colors.palette.neutral100,
    borderRadius: 12,
    padding: 20,
    width: "80%",
  },
  input: {
    borderColor: colors.palette.neutral400,
    borderRadius: 8,
    borderWidth: 1,
    fontFamily: CommonStyles.fontFamily.fontFamily,
    fontSize: 18,
    marginBottom: 20,
    padding: 12,
    textAlign: "center",
  },
  itemId: {
    color: colors.palette.neutral550,
    fontFamily: CommonStyles.fontFamily.fontFamily,
    fontSize: 14,
  },
  itemInfo: {
    marginBottom: 16,
  },
  itemName: {
    color: colors.palette.neutral900,
    fontFamily: CommonStyles.fontFamily.fontFamily,
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  overlay: {
    alignItems: "center",
    backgroundColor: colors.palette.grey500,
    flex: 1,
    justifyContent: "center",
  },
  submitButton: {
    backgroundColor: colors.customColors.GREEN,
  },
  submitButtonText: {
    color: colors.palette.neutral100,
    fontFamily: CommonStyles.fontFamily.fontFamily,
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  title: {
    color: colors.palette.neutral900,
    fontFamily: CommonStyles.fontFamily.fontFamily,
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 16,
    textAlign: "center",
  },
})
