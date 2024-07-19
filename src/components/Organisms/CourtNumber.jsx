import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { COLORS } from "../../theme/colors";
import { SIZE, WEIGHT } from "../../theme/fonts";
const CourtNumber = ({
    courtImage,
    courtName,
    courtTimeSlot,
    courtPrice,

}) => {
  return (
    <View style={styles.outline}>
      <View style={styles.outlineImage}>
        <Image style={styles.image} source={courtImage} />
      </View>
      <View style={styles.courtInfo}>
        <View>
          <Text style={styles.courtName}>{courtName}</Text>
        </View>
        <View style={styles.courtTimeSlot}>
          <Text>Khung giờ đang đặt </Text>
          <View style={styles.courtTimeSlot_No}>
            <Text style={{ color: COLORS.orangeText }}>{courtTimeSlot}</Text>
          </View>
        </View>
        <View>
          <Text style={styles.courtNotice}>
            <Text style={styles.courtPrice}>{courtPrice}đ / giờ </Text>(Giá sân có
            thể thay đổi theo ngày lễ hoặc cuối tuần)
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  outline: {
    borderColor: COLORS.darkGreyBorder,
    borderWidth: 1,
    borderRadius: 10,
    aspectRatio: 3,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  outlineImage: {
    // width: '30%',
    height: "100%",
    aspectRatio: 1,
    padding: 10,
    // backgroundColor: 'black',
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    objectFit: "cover",
    height: "100%",
    width: "100%",
    borderRadius: 10,
  },
  courtInfo: {
    // backgroundColor: 'pink',
    aspectRatio: 2,
    height: "100%",
    // width: '100%',
    display: "flex",
    // alignItems: 'stretch',
    flexDirection: "column",
    flexWrap: "wrap",
    gap: 15,
    justifyContent: 'center',
  },
  courtName: {
    fontSize: SIZE.size_14,
    fontWeight: WEIGHT.weight_600,
  },
  courtTimeSlot: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  courtTimeSlot_Text: {
    fontSize: SIZE.size_12,
  },
  courtTimeSlot_No: {
    width: 25,
    height: 25,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.orangeBackground,
    borderRadius: 8,
  },
  courtNotice: {
    fontSize: SIZE.size_12,
    fontWeight: WEIGHT.weight_600,
  },
  courtPrice: {
    fontSize: SIZE.size_16,
    fontWeight: WEIGHT.weight_600,
    color: COLORS.darkGreenText,
  },
});

export default CourtNumber;
