import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { SIZE } from "../../theme/fonts";
import { COLORS } from "../../theme/colors";
import * as Progress from "react-native-progress";
import { METRICS } from "../../theme/metrics";
import VectorIcon from "../Atoms/VectorIcon";
import icons from "../../constants/icons";

export default function PakageUsage() {
  return (
    <View style={styles.container}>
      <View style={styles.progressItem}>
        <View style={styles.progessTitle}>
          <View style={styles.leftSection}>
            <Text style={[styles.progessText]}>Đã sử dụng</Text>

            <Image
              source={icons.group_light}
              resizeMode="contain"
              style={styles.icon}
            />
          </View>

          <Text style={[styles.progessText]}>50%</Text>
        </View>
        <Progress.Bar
          width={null}
          progress={0.3}
          height={9}
          borderRadius={10}
          borderColor="white"
          unfilledColor="#D9D9D9"
          color={COLORS.orangeText}
        />

        <View style={styles.dataSection}>
          <Text style={[styles.progessText, { color: "#5C5B5B" }]}>
            1000 / 2000 nguời
          </Text>
        </View>
      </View>
      <View style={styles.progressItem}>
        <View style={styles.progessTitle}>
          <View style={styles.leftSection}>
            <Text style={[styles.progessText]}>Doanh thu quảng cáo</Text>

            <Image
              source={icons.paper_light}
              resizeMode="contain"
              style={styles.icon}
            />
          </View>

          <Text style={[styles.progessText]}>20%</Text>
        </View>
        <Progress.Bar
          width={null}
          progress={0.3}
          height={9}
          borderRadius={10}
          borderColor="white"
          unfilledColor="#D9D9D9"
          color={COLORS.orangeText}
        />

        <View style={styles.dataSection}>
          <Text style={[styles.progessText, { color: "#5C5B5B" }]}>
            1000 / 2000 nguời
          </Text>
        </View>
      </View>
      <View style={styles.progressItem}>
        <View style={styles.progessTitle}>
          <View style={styles.leftSection}>
            <Text style={[styles.progessText]}>Đã sử dụng</Text>

            <Image
              source={icons.order_light}
              resizeMode="contain"
              style={styles.icon}
            />
          </View>

          <Text style={[styles.progessText]}>60%</Text>
        </View>
        <Progress.Bar
          width={null}
          progress={0.3}
          height={9}
          borderRadius={10}
          borderColor="white"
          unfilledColor="#D9D9D9"
          color={COLORS.orangeText}
        />

        <View style={styles.dataSection}>
          <Text style={[styles.progessText, { color: "#5C5B5B" }]}>
            1000 / 2000 nguời
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingHorizontal: 14,
    paddingVertical: 16,
    borderColor: "#E8E8E8",
    borderWidth: 1,
    borderRadius: 6,
    gap: 20,
  },

  progressItem: {
    gap: 10,
  },

  progessTitle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  progessText: {
    fontSize: SIZE.size_12,
    lineHeight: 18,
    fontFamily: "quicksand-semibold",
  },

  leftSection: {
    flexDirection: "row",
    gap: 8,
  },

  dataSection: {},
});
