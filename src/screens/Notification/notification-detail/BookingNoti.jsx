import { TouchableOpacity } from "react-native";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import NotificationInfo from "../../../components/Organisms/NotificationInfo";
import { SafeAreaView } from "react-native-safe-area-context";
import { SIZE } from "../../../theme/fonts";
import icons from "../../../constants/icons";
import Oops from "../../../components/Organisms/Oops";

const bookings = [
  // {
  //   title: "Đã đặt sân thành công!",
  //   desc: "Chúc mừng bạn đã đặt sân thành công tại Sân cầu lông Sơn Tạ, hãy kiểm tra lại thông tin trước khi check-in nhé! ",
  //   timeStamp: "02 Th4, 16:10",
  //   id: 1,
  // },
  // {
  //   title: "Đã đặt sân thành công!",
  //   desc: "Chúc mừng bạn đã đặt sân thành công tại Sân cầu lông Sơn Tạ, hãy kiểm tra lại thông tin trước khi check-in nhé! ",
  //   timeStamp: "02 Th4, 16:10",
  //   id: 2,
  // },
];

const BookingNoti = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <Image source={icons.goback} style={styles.goback} />
        </TouchableOpacity>
        <Text style={styles.title}>Thông tin đặt sân</Text>
      </View>
      {bookings?.length <= 0 ? (
        <Oops text={"Oops, bạn chưa có lịch sử đặt sân !"} />
      ) : (
        <NotificationInfo list={bookings} icon={icons.voucher} />
      )}
    </View>
  );
};

export default BookingNoti;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: SIZE.size_20,
    fontFamily: "quicksand-bold",
  },
  header: {
    alignItems: "center",
    flexDirection: "row",
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 20,
    gap: 10,
  },
  goback: {
    width: 28,
    height: 28,
  },
});