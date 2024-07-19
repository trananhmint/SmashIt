import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import HeaderBar from "../../../components/Atoms/HeaderBar";
import PackageDetailCard from "../../../components/Organisms/PackageDetailCard";
import { SIZE } from "../../../theme/fonts";
import PackageDescription from "../../../components/Organisms/PackageDescription";
import { formatNumber } from "../../../utils";
import { COLORS } from "../../../theme/colors";
import PakageUsage from "../../../components/Organisms/PakageUsage";

export default function PackageDetail({ navigation }) {
  const isBought = true;

  const packageDesciption = [
    {
      id: 1,
      title: "Chiến lược quảng bá toàn diện",
      packageText:
        "Cung cấp chiến lược marketing toàn diện bao gồm quảng cáo trực tuyến và ngoại tuyến. Nâng cao nhận thức về thương hiệu trong cộng đồng cầu lông và đối tượng khách hàng.",
    },

    {
      id: 2,
      title: "Chiến lược quảng bá toàn diện",
      packageText:
        "Cung cấp chiến lược marketing toàn diện bao gồm quảng cáo trực tuyến và ngoại tuyến. Nâng cao nhận thức về thương hiệu trong cộng đồng cầu lông và đối tượng khách hàng.",
    },

    {
      id: 3,
      title: "Chiến lược quảng bá toàn diện",
      packageText:
        "Cung cấp chiến lược marketing toàn diện bao gồm quảng cáo trực tuyến và ngoại tuyến. Nâng cao nhận thức về thương hiệu trong cộng đồng cầu lông và đối tượng khách hàng.",
    },
    {
      id: 4,
      title: "Chiến lược quảng bá toàn diện",
      packageText:
        "Cung cấp chiến lược marketing toàn diện bao gồm quảng cáo trực tuyến và ngoại tuyến. Nâng cao nhận thức về thương hiệu trong cộng đồng cầu lông và đối tượng khách hàng.",
    },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.white }}>
      <HeaderBar
        text={"Chi tiết gói ưu đãi"}
        isGoBack={true}
        goBack={() => navigation.goBack()}
      />

      <ScrollView
        style={{
          flex: 1,
          marginTop: 30,
          marginBottom: 40,
        }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        <View style={styles.section}>
          <PackageDetailCard
            name={
              "Hỗ trợ chủ sân tăng cường quảng bá và tiếp thị để thu hút người chơi."
            }
            pakageType={"Gói quảng bá và truyền thông"}
            fixPrice={120000}
            discountPrice={100000}
            isBought={isBought}
          />
        </View>

        {isBought && (
          <View style={styles.section}>
            <Text style={styles.title}>Mức sử dụng</Text>
            <PakageUsage />
          </View>
        )}

        <View style={[styles.section, { flex: 1 }]}>
          <Text style={styles.title}>Quyền lợi sử dụng </Text>
          <FlatList
            style={{ flex: 1 }}
            scrollEnabled={false}
            data={packageDesciption}
            contentContainerStyle={{ gap: 25 }}
            renderItem={({ item }) => {
              return (
                <PackageDescription
                  packageTitle={item.title}
                  packageText={item.packageText}
                />
              );
            }}
          />
        </View>
      </ScrollView>

      {!isBought && (
        <View style={styles.bottomSection}>
          <View style={styles.priceSection}>
            <Text style={styles.oldPrice}>{formatNumber(150000)}đ</Text>
            <Text style={styles.newPrice}>
              {formatNumber(100000)}
              <Text style={[styles.newPrice, { fontSize: SIZE.size_14 }]}>
                đ {""}
              </Text>
              <Text style={[styles.oldPrice, { textDecorationLine: "none" }]}>
                / tháng
              </Text>
            </Text>
          </View>

          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Mua ngay</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    gap: 30,
  },

  section: {
    gap: 20,
  },

  title: {
    fontSize: SIZE.size_16,
    fontFamily: "quicksand-semibold",
  },

  bottomSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    position: "relative",
    bottom: 20,
    paddingHorizontal: 25,
  },

  oldPrice: {
    fontSize: SIZE.size_12,
    color: "#888",
    fontFamily: "quicksand-regular",
    lineHeight: 18,
    textDecorationLine: "line-through",
  },

  newPrice: {
    fontSize: SIZE.size_16,
    color: COLORS.darkGreenText,
    fontFamily: "quicksand-semibold",
    lineHeight: 18,
  },

  button: {
    width: 150,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.orangeText,
    paddingVertical: 12,
    borderRadius: 6,
  },

  buttonText: {
    color: COLORS.white,
    fontFamily: "quicksand-semibold",
    fontSize: SIZE.size_14,
  },
});
