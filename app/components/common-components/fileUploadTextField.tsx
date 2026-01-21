import { View, Text, Image, StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native"
import React, { FC } from "react"
import { Icon } from "../../assets/icons/wholeSeller"
import { useNavigation } from "@react-navigation/native"
import { CommonStyles } from "../../sharedStyles/styles"
import { useAppSelector } from "../../redux/store"
import { responsiveHeight } from "react-native-responsive-dimensions"
import Toast from "react-native-toast-message"
import { Constant } from "../../utils/wholeSeller/constant"

interface FileData {
  _id: string
  fileName: string
  createdAt: string
}

const FileUploadTextField: FC<{ value: FileData }> = ({ value }) => {
  const userDetails = useAppSelector((state) => state?.rootReducer?.auth?.userVerification.data)
  const timestamp = value?.Date
  const date = timestamp.split("T")[0]
  const navigation = useNavigation()
  const handleSingleProduct = () => {
    let fileInfo = value
    navigation.navigate(Constant.ScreenName.Order, { fileInfo })
  }

  return (
    <TouchableOpacity style={styles.container} onPress={handleSingleProduct}>
      <View style={styles.subContainer}>
        <Image source={Icon.File} style={styles.image} />
        <Text style={styles.fileText}>{value?.file_name}</Text>
      </View>
      <View style={styles.dateContainer}>
        <Text style={styles.dateContainerText}>Date</Text>
        <Text style={[styles.dateContainerText, { paddingLeft: 5 }]}> {date}</Text>
      </View>
      {/* <View ><Text style={styles.dateContainerText}>{value?.group}</Text></View> */}
    </TouchableOpacity>
  )
}
const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    elevation: 4,
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginTop: 23,
    backgroundColor: "#FFF",
  },
  subContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  image: { width: 20.4, height: 21 },
  dateContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  fileText: { paddingLeft: 5, ...CommonStyles.customFontSize },
  dateContainerText: { ...CommonStyles.customFontSize, fontFamily: "Arial-Rounded-Bold" },
})

export default FileUploadTextField
