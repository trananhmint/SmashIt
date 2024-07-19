import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { COLORS } from "../../theme/colors";
import { SIZE } from "../../theme/fonts";
import { formatNumber } from "../../utils";

export default function FinancialActivities({ data }) {
  return (
    <View style={styles.container}>
      <View style={styles.leftSection}>
        <View style={styles.iconContainer}>
          <Icon
            name="calendar-minus-o"
            size={24}
            color={COLORS.orangeText}
            style={{ padding: 10 }}
          />
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.primaryText}>
            {data.transactionType.typeOfTransaction}
          </Text>
          {/* <Text style={styles.secondaryText}>Được thêm tự động</Text> */}
        </View>
      </View>
      <View style={styles.rightSection}>
        <Text
          style={[
            styles.moneyText,
            {
              fontFamily: "quicksand-semibold",
              color: data.amount > 0 ? COLORS.darkGreenText : COLORS.red,
            },
          ]}
        >
          {formatNumber(data?.amount)}đ
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  leftSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },

  iconContainer: {
    backgroundColor: COLORS.orangeBackground,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 360,
    width: 50,
    height: 50,
  },

  textContainer: {},

  primaryText: {
    fontSize: SIZE.size_14,
    fontFamily: "quicksand-medium",
  },

  secondaryText: {
    fontSize: SIZE.size_12,
    fontFamily: "quicksand-medium",
    color: "#A1A1A1",
    lineHeight: 18,
  },

  moneyText: {
    fontSize: SIZE.size_14,
    fontFamily: "quicksand-semibold",
    lineHeight: 18,
  },

  rightSection: {},
});
