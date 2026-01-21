import { View, Text, Image, StyleSheet, Platform } from "react-native"
import React, { FC } from "react"
import { Images } from "../../assets/Images/wholeSeller"
import { color } from "../../utils"

const CustomCard: FC = (data: any) => {
  return (
    <View style={{ padding: Platform.OS === "ios" ? 10 : 0 }}>
      <View style={styles.container}>
        <Image source={Images.SoyaMilk} style={styles.image} />
        <View style={styles.rightPart}>
          <Text style={styles.helperText1}>Authorised ID - {data?.value?.product_id}</Text>
          <Text style={styles.helperText2}>{data?.value?.product_desc}</Text>
          <Text style={styles.helperText3}>{data?.value?.price}</Text>
        </View>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 26,
    paddingVertical: 12,
    borderRadius: 10,
    shadowColor: "rgba(0, 0, 0, 1)",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 1,
    marginBottom: 6,
    backgroundColor: color.WHITE,
    margin: 20,
    marginTop: 10,
  },
  image: { width: 50, height: 80 },
  rightPart: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  text: {
    fontSize: 14,
    fontFamily: "Arial-Rounded-Bold",
    color: color.MEDIUM_GRAY,
  },
  helperText1: {
    fontSize: 14,
    color: color.BLACK,
    fontFamily: "Arial-Rounded-Bold",
  },
  helperText2: {
    fontSize: 17,
    color: color.BLACK,
    fontFamily: "Arial-Rounded-Bold",
  },
  helperText3: {
    fontSize: 17,
    color: color.GREEN,
  },
})

export default CustomCard
