import { Dimensions, StyleSheet } from "react-native"
import { responsiveFontSize, responsiveHeight } from "react-native-responsive-dimensions"

import { colors } from "@/theme/colors"

const { width, height } = Dimensions.get("window") // Get the full width and height of the screen

export const styles = StyleSheet.create({
  cardBox: {
    alignItems: "center",
    backgroundColor: colors.customColors.WHITE,
    borderRadius: 5,
    display: "flex",
    elevation: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
    paddingHorizontal: 26,
    paddingVertical: 12,
    shadowColor: colors.palette.grey500,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
  cardBoxLeft: {
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    gap: 12,
    justifyContent: "space-evenly",
  },
  container: {
    paddingTop: 10,
  },
  fileImage: {
    borderRadius: 5,
    height: 45,
    width: 45,
  },
  fileUploadContainer: {
    bottom: 0,
    elevation: 3,
    padding: 20,
    position: "absolute",
    right: 0,
    shadowColor: colors.customColors.BLACK,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  helperText1: {
    color: colors.customColors.BLACK,
    fontFamily: "Arial-Rounded-Bold",
    fontSize: 14,
  },
  helperText2: {
    color: colors.customColors.BLACK,
    fontFamily: "Arial-Rounded-Bold",
    fontSize: 17,
  },
  helperText3: {
    color: colors.customColors.PASTEL_RED,
    fontSize: 17,
    fontWeight: "700",
  },
  latestTrendsHeading: {
    color: colors.customColors.GREEN,
    fontFamily: "Arial-Rounded-Bold",
    fontSize: responsiveFontSize(3),
    marginVertical: 10,
    textAlign: "center",
    textShadowColor: colors.palette.grey500,
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  loaderConatiner: {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    flex: 1,
    justifyContent: "center",
  },
  loaderContainer: {
    alignSelf: "center",
    paddingTop: responsiveHeight(30),
  },
  mainContainer: {
    backgroundColor: colors.palette.grey50,
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
  },
  peerGroupButton: {
    backgroundColor: colors.customColors.LIGHTGREEN,
    borderColor: colors.customColors.MEDIUM_GRAY,
    marginBottom: 10,
    padding: 10,
    width: "100%",
  },
  peerGroupButtonText: {
    color: colors.palette.neutral100,
    fontSize: 25,
    fontWeight: "800",
    letterSpacing: 2,
    textAlign: "center",
  },
  searchCard: {
    backgroundColor: colors.palette.neutral100,
    borderRadius: 8,
    elevation: 3,
    padding: 5,
    shadowColor: colors.customColors.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
})

export const modalStyles = StyleSheet.create({
  centeredView: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    marginTop: 22,
  },
  itemContainer: {
    alignItems: "center",
    marginVertical: 5,
    padding: 10,
    width: "100%",
  },
  itemText: {
    color: colors.customColors.BLACK,
    fontSize: 16,
  },
  modalView: {
    alignItems: "center",
    backgroundColor: colors.customColors.WHITE,
    borderRadius: 20,
    elevation: 5,
    height: height - 100,
    margin: 20,
    paddingTop: 35,
    shadowColor: colors.customColors.BLACK,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    width: width - 50,
  },
})
