import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { SIZE } from "../../theme/fonts";
import Icon from "react-native-vector-icons/AntDesign";
import { COLORS } from "../../theme/colors";

export default function CourtInfo({
  courtName,
  address,
  rating,
  
}) {
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require("../../assets/images/Court.png")}
      />

      <View style={styles.infoSection}>
        <Text style={styles.primaryText}>Sân cầu lông {courtName}</Text>
        <Text style={styles.secondaryText}>
          {address}
        </Text>
        <View style={styles.ratingSection}>
          <Icon
            name="star"
            color={"#F49831"}
            size={9}
            style={{ marginTop: 2.5 }}
          />
          <Text style={styles.secondaryText}>5.0 (100 lượt đặt)</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 16,
  },

  image: {
    width: 108,
    height: 71,
    borderRadius: 6,
  },

  infoSection: {
    flex: 1,
  },

  primaryText: {
    fontSize: SIZE.size_12,
    fontFamily: "quicksand-semibold",
    lineHeight: 18,
    marginBottom: 6,
  },

  secondaryText: {
    fontSize: SIZE.size_10,
    fontFamily: "quicksand-regular",
    marginBottom: 3,
  },

  ratingSection: {
    flexDirection: "row",
    gap: 5,
  },
});
