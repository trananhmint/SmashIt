import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import { SIZE } from "../../../theme/fonts";
import { ScrollView } from "react-native";
import PackageItem from "../../../components/Organisms/PackageItem";

const PackageList = ({ navigation }) => {
  const pakageList = [
    {
      id: 1,
      name: "Cung cấp tính năng cơ bản cho việc quản lý lịch đặt sân cầu lông.",
      fixPrice: 150000,
      discountPrice: 171103,
      pakageType: "Gói sân cơ bản",
      ribbonText: "Bán chạy nhất",
    },
    {
      id: 2,
      name: "Cung cấp tính năng cơ bản cho việc quản lý lịch đặt sân cầu lông.",
      fixPrice: 120000,
      discountPrice: 100000,
      pakageType: "Gói sân cơ bản",
      ribbonText: "Bán chạy nhất",
    },
    {
      id: 3,
      name: "Cung cấp tính năng cơ bản cho việc quản lý lịch đặt sân cầu lông.",
      fixPrice: 150000,
      discountPrice: 100000,
      pakageType: "Gói sân cơ bản",
      ribbonText: "Bán chạy nhất",
    },
  ];

  return (
    <ScrollView
      style={{ flex: 1, marginBottom: 20 }}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.section}>
        <Text style={styles.title}>Khám phá các ưu đãi</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.title}>Dành cho bạn</Text>
        <FlatList
          scrollEnabled={false}
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
                ribbonText={item.ribbonText}
                navigation={navigation}
              />
            );
          }}
        />
      </View>
    </ScrollView>
  );
};

export default PackageList;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    gap: 30,
  },

  section: {
    flex: 1,
    gap: 20,
  },

  title: {
    fontSize: SIZE.size_16,
    fontFamily: "quicksand-bold",
  },
});
