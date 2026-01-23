import { StyleSheet } from "react-native"

import { colors } from "@/theme/colors"

export const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.customColors.LIGHTGREEN,
    color: colors.customColors.WHITE,
    fontSize: 20,
    padding: 15,
  },
  buttonsContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: 20,
    marginBottom: 5,
  },
  closeButton: {
    backgroundColor: colors.customColors.LIGHTGREEN,
    borderRadius: 5,
    padding: 10,
  },
  closeButtonText: {
    color: colors.palette.neutral100,
    fontSize: 16,
  },
  contactUsText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "space-around",
    marginTop: "15%",
    padding: 10,
    paddingBottom: "20%",
  },
  footerImage: {
    bottom: 0,
    height: "12%",
    position: "absolute",
    width: "100%",
  },
  guide: {
    color: colors.customColors.BLACK,
    fontFamily: "Arial-Rounded-Bold",
    fontSize: 35,
    marginBottom: "10%",
    textAlign: "center",
  },
  icon: {
    color: colors.palette.red700,
    fontSize: 24,
  },
  iconContainer: {
    backgroundColor: colors.palette.red50,
    borderRadius: 50,
    marginBottom: 20,
    padding: 10,
  },
  modalContainer: {
    alignItems: "center",
    backgroundColor: colors.palette.black500,
    flex: 1,
    justifyContent: "center",
  },
  modalContent: {
    alignItems: "center",
    backgroundColor: colors.palette.neutral100,
    borderRadius: 10,
    padding: 20,
    width: "80%",
  },
  modalText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  safeAreaView: {
    flex: 1,
  },
  textdata: {
    color: colors.palette.neutral100,
    fontSize: 26,
    fontWeight: "700",
    textAlign: "center",
  },
})
