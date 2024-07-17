import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React from "react";
import { COLORS } from "../../theme/colors";
import { SIZE } from "../../theme/fonts";
import { formatNumber } from "../../utils";
import VectorIcon from "../Atoms/VectorIcon";
import Chip from "../Atoms/Chip";

export default function PackageDetailCard({
  isBought,
  name,
  fixPrice,
  discountPrice,
  pakageType,
  ribbonText,
  usePercent,
  navigation,
}) {
  const percent = usePercent / 100;

  return (
    <View style={styles.container}>
      <View style={styles.imageSection}>
        <ImageBackground
          style={styles.image}
          source={require("../../assets/images/Court.png")}
        />
        <View style={styles.overlay}></View>
        {ribbonText && (
          <View style={styles.ribbon}>
            <Text style={styles.ribbonText}>{ribbonText}</Text>
          </View>
        )}

        <View style={styles.level}>
          <Text style={[styles.ribbonText, { fontSize: 14 }]}>
            {pakageType}
          </Text>
        </View>
      </View>

      <View style={styles.nameSection}>
        <Text
          style={[
            styles.nameText,
            { fontSize: SIZE.size_12, color: "#7B7B7B", marginBottom: 10 },
          ]}
        >
          Ưu đãi đến từ Smashh It
        </Text>
        <Text style={styles.nameText}>{name}</Text>
      </View>

      <View style={styles.bottomSection}>
        {isBought ? (
          <Chip
            backgroundColor={COLORS.orangeBackground}
            borderColor={COLORS.orangeBackground}
            textColor={COLORS.orangeText}
            text={"Gói đề xuất"}
            textFamily={"quicksand-semibold"}
            borderRadius={5}
          />
        ) : (
          <>
            <View style={styles.priceSection}>
              <Text style={styles.oldPrice}>{formatNumber(fixPrice)}đ </Text>
              <Text style={styles.newPrice}>
                {formatNumber(discountPrice)}đ / tháng
              </Text>
            </View>

            <View>
              <Chip
                backgroundColor={COLORS.orangeBackground}
                borderColor={COLORS.orangeBackground}
                textColor={COLORS.orangeText}
                text={"Gói đề xuất"}
                textFamily={"quicksand-semibold"}
                borderRadius={5}
              />
            </View>
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},

  imageSection: {
    width: "100%",
    position: "relative",
    borderRadius: 6,
    overflow: "hidden",
    marginBottom: 15,
  },

  image: {
    width: "100%",
    height: undefined,
    aspectRatio: 28 / 13,
  },

  overlay: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 10,
  },

  ribbon: {
    position: "absolute",
    top: 15,
    left: 15,
    backgroundColor: COLORS.orangeText,
    alignItems: "center",
    justifyContent: "center",
    width: 110,
    height: 28,
    borderRadius: 15,
    zIndex: 11,
  },

  ribbonText: {
    color: "white",
    fontSize: SIZE.size_12,
    fontFamily: "quicksand-bold",
    lineHeight: 18,
  },

  level: {
    position: "absolute",
    bottom: 20,
    left: 20,
    zIndex: 11,
  },

  nameSection: {
    width: "100%",
    marginBottom: 10,
  },

  nameText: {
    fontSize: SIZE.size_14,
    fontFamily: "quicksand-semibold",
    lineHeight: 18,
  },

  bottomSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  priceSection: {
    flexDirection: "row",
    gap: 5,
  },

  oldPrice: {
    fontSize: SIZE.size_12,
    color: "#888",
    fontFamily: "quicksand-regular",
    lineHeight: 18,
    textDecorationLine: "line-through",
  },

  newPrice: {
    fontSize: SIZE.size_14,
    color: COLORS.darkGreenText,
    fontFamily: "quicksand-semibold",
    lineHeight: 18,
  },

  progressSection: {},

  progressTextSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 5,
  },

  progessText: {
    fontSize: SIZE.size_12,
    lineHeight: 18,
  },

  buttonSection: {
    flexDirection: "row",
    gap: 4,
    alignItems: "center",
  },

  iconContainer: {
    width: 12.5,
    height: 12.5,
    borderRadius: 6.25,
    backgroundColor: COLORS.orangeText,
    alignItems: "center",
    justifyContent: "center",
  },
});
