import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React from "react";
import { COLORS } from "../../theme/colors";
import { SIZE, WEIGHT } from "../../theme/fonts";
import Icon from "react-native-vector-icons/FontAwesome";
import * as Progress from "react-native-progress";
import { formatNumber } from "../../utils";

// TODO: Add Progress Bar for user who has bought the package

export default function PackageItem({
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
            <Text style={styles.ribbonText}>Bán chạy nhất</Text>
          </View>
        )}

        <View style={styles.level}>
          <Text style={[styles.ribbonText, { fontSize: 14 }]}>
            {pakageType}
          </Text>
        </View>
      </View>

      <View style={styles.nameSection}>
        <Text style={styles.nameText}>{name}</Text>
      </View>

      <View style={styles.bottomSection}>
        {isBought ? (
          <View style={styles.progressSection}>
            <View style={styles.progressTextSection}>
              <Text
                style={[
                  styles.progessText,
                  { fontFamily: "quicksand-regular" },
                ]}
              >
                Đã sử dụng
              </Text>
              <Text
                style={[
                  styles.progessText,
                  {
                    fontFamily: "quicksand-semibold",
                    color: COLORS.orangeText,
                  },
                ]}
              >
                {usePercent}%
              </Text>
            </View>
            <Progress.Bar
              progress={percent}
              width={165}
              height={8}
              borderRadius={10}
              borderColor="white"
              unfilledColor="#D9D9D9"
              color={COLORS.orangeText}
            />
          </View>
        ) : (
          <View style={styles.priceSection}>
            <Text style={styles.oldPrice}>{formatNumber(fixPrice)}đ </Text>
            <Text style={styles.newPrice}>
              {formatNumber(discountPrice)}đ / tháng
            </Text>
          </View>
        )}

        <TouchableWithoutFeedback
          onPress={() => {
            navigation.navigate("PackageDetail");
          }}
        >
          <View style={[styles.buttonSection, isBought && { marginTop: 10 }]}>
            <Text style={[styles.ribbonText, { color: COLORS.orangeText }]}>
              Xem thêm
            </Text>
            <Icon
              name="arrow-circle-right"
              size={14}
              color={COLORS.orangeText}
              style={{ marginTop: 2 }}
            />
          </View>
        </TouchableWithoutFeedback>
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
    marginBottom: 10,
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
