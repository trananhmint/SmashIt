import React from "react";
import { StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import { COLORS } from "../../theme/colors";
import { SIZE, TYPE, WEIGHT } from "../../theme/fonts";
import { formatNumber } from "../../utils";

const HistoryCourt = ({
  name,
  numOfCourt,
  numOfSlot,
  bookingTime,
  price,
  paymentMethod,
}) => {
  return (
    <View style={styles.outline}>
      <View style={styles.info}>
        <Text style={styles.info_Text}>{name}</Text>
        <View style={{flexDirection: "row", gap: 15}}>
          <View style={styles.directionRow} >
            <View style={styles.bullet} />
            <Text style={styles.info_Text}>{numOfCourt} sân</Text>
          </View>
          <View style={styles.directionRow}>
            <View style={styles.bullet} />
            <Text style={styles.info_Text}>{numOfSlot} khung giờ</Text>
          </View>
          
        </View>
        <Text style={[styles.info_Text, { color: COLORS.greyText, fontFamily: "quicksand-medium" }]}>
          {bookingTime}
        </Text>
        <TouchableOpacity style={{}}>
          <View style={styles.directionRow}>
            <Text style={[styles.info_Text, { color: COLORS.orangeText, fontSize: SIZE.size_12 }]}>
              Đặt lại
            </Text>
            <View style={styles.arrow}>
              <Icon name="arrowright" color={COLORS.orangeText} size={14} />
            </View>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.payment}>
        <Text style={[styles.info_Text, { color: COLORS.darkGreenText }]}>
          {formatNumber(price)}đ
        </Text>
        <Text style={{fontFamily: "quicksand-regular", fontSize: SIZE.size_12}}>{paymentMethod}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  outline: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    aspectRatio: 3,
    padding: 4,
  },
  info: {
    height: "100%",
    aspectRatio: 2,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  info_Text: {
    // fontFamily: TYPE.quicksand,
    fontSize: SIZE.size_14,
    fontFamily: "quicksand-semibold"
  },
  bullet: {
    height: 6,
    width: 6,
    borderRadius: 3,
    backgroundColor: COLORS.darkGreenText,
  },
  directionRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: 'center',
    gap: 5,
  },
  arrow: {
    width: 20,
    height: 20,
    borderRadius: 15,
    backgroundColor: COLORS.orangeBackground,
    alignItems: "center",
    justifyContent: "center",
  },
  payment: {
    height: "100%",
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default HistoryCourt;
