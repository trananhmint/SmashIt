import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { SIZE } from "../../theme/fonts";
import images from "../../constants/images";
import { SafeAreaView } from "react-native-safe-area-context";

const vouchers = [
  {
    id: 1,
    title:
      "Ưu đãi thành viên mới, giảm 10% khi đặt sân lần đầu tại ứng dụng SmashIt",
    endDate: "11/04/2024",
    image: images.voucher,
  },
  {
    id: 2,
    title:
      "Ưu đãi thành viên mới, giảm 10% khi đặt sân lần đầu tại ứng dụng SmashIt",
    endDate: "11/04/2024",
    image: images.voucher,
  },
  {
    id: 3,
    title:
      "Ưu đãi thành viên mới, giảm 10% khi đặt sân lần đầu tại ứng dụng SmashIt",
    endDate: "11/04/2024",
    image: images.voucher,
  },
];

const MyVoucherCard = () => {
  return (
    <SafeAreaView>
      <FlatList
        ListHeaderComponent={() => (
          <Text style={styles.title}>Kho khuyến mãi của tôi</Text>
        )}
        data={vouchers}
        keyExtractor={(voucher) => voucher.id}
        renderItem={({ item: voucher }) => (
          <View style={styles.voucherContainer}>
            <Image source={voucher.image} style={styles.image} />
            <Text style={styles.vchTitle}>{voucher.title}</Text>
            <View style={styles.expiryDate}>
              <Text style={styles.desc}>Sẽ hết hạn vào</Text>
              <Text style={styles.expire}>{voucher.endDate}</Text>
            </View>
          </View>
        )}
        contentContainerStyle={{
          marginLeft: 15,
        }}
      />
    </SafeAreaView>
  );
};

export default MyVoucherCard;

const styles = StyleSheet.create({
  title: {
    fontSize: SIZE.size_20,
    fontFamily: "quicksand-bold",
    marginBottom: 20,
  },
  voucherContainer: {
    flexDirection: "column",
    marginBottom: 30,
  },
  image: {
    width: "calc(100% - 15)",
    height: 180,
    borderRadius: 8,
    marginRight: 15,
  },
  vchTitle: {
    fontFamily: "quicksand-semibold",
    fontSize: SIZE.size_14,
    width: "calc(100% - 15)",
    marginVertical: 10,
  },
  expiryDate: {
    flexDirection: "row",
    alignItems: "center",
  },
  desc: {
    fontFamily: "quicksand-regular",
    fontSize: SIZE.size_14,
  },
  expire: {
    fontFamily: "quicksand-semibold",
    fontSize: SIZE.size_14,
    color: "#FF8A00",
    marginLeft: 10,
  },
});
