import { Platform, StyleSheet } from "react-native"
import { responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions"

import { colors } from "@/theme/colors"
import { commonStyles } from "@/theme/styles"

export const styles = StyleSheet.create({
  avatarContainer: {
    alignItems: "center",
    marginBottom: responsiveHeight(2),
  },
  buttonContainer: {
    marginBottom: responsiveHeight(4),
    marginTop: responsiveHeight(2),
    paddingHorizontal: responsiveWidth(2),
  },
  container: {
    flex: 1,
    paddingBottom: responsiveHeight(12),
    paddingHorizontal: responsiveWidth(5),
    paddingTop: responsiveHeight(2),
  },
  errorText: {
    color: colors.palette.angry500,
    fontSize: 12,
    marginLeft: 4,
    marginTop: 4,
  },
  fieldCard: {
    backgroundColor: commonStyles.colors.secondaryColor,
    borderRadius: 16,
    marginBottom: 0,
    paddingHorizontal: responsiveWidth(4),
    paddingVertical: responsiveHeight(2),
    ...Platform.select({
      android: { elevation: 3 },
      ios: {
        shadowColor: colors.palette.neutral900,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
      },
    }),
  },
  fieldContainer: {
    marginBottom: 18,
  },
  fieldsContainer: {
    marginBottom: responsiveHeight(2),
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  loaderContainer: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  mainContainer: {
    backgroundColor: colors.palette.neutral200,
    flex: 1,
  },
  titleText: {
    fontWeight: "bold",
  },
})
