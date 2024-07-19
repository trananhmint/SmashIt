import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import PackageItem from "../../../components/Organisms/PackageItem";

export default function MyPackage({ navigation }) {
  const pakageList = [
    {
      id: 1,
      name: "Cung cấp tính năng cơ bản cho việc quản lý lịch đặt sân cầu lông.",
      fixPrice: 150000,
      discountPrice: 171103,
      pakageType: "Gói sân cơ bản",
      usePercent: 17,
      ribbonText: "Bán chạy nhất",
    },
    {
      id: 2,
      name: "Cung cấp tính năng cơ bản cho việc quản lý lịch đặt sân cầu lông.",
      fixPrice: 120000,
      discountPrice: 100000,
      pakageType: "Gói sân cơ bản",
      usePercent: 11,
      ribbonText: "Bán chạy nhất",
    },
    {
      id: 3,
      name: "Cung cấp tính năng cơ bản cho việc quản lý lịch đặt sân cầu lông.",
      fixPrice: 150000,
      discountPrice: 100000,
      pakageType: "Gói sân cơ bản",
      usePercent: 3,
    },
  ];

  return (
    <View style={styles.container}>
      <FlatList
        showsVerticalScrollIndicator={false}
        style={{ flex: 1 }}
        contentContainerStyle={{ gap: 30 }}
        data={pakageList}
        renderItem={({ item }) => {
          return (
            <PackageItem
              name={item.name}
              fixPrice={item.fixPrice}
              discountPrice={item.discountPrice}
              pakageType={item.pakageType}
              isBought={true}
              usePercent={item.usePercent}
              ribbonText={item.ribbonText}
              navigation={navigation}
            />
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
  },
});
