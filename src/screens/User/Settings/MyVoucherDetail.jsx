import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import React from "react";
import TabBar from "../../../components/Molecules/TabBar";
import { SafeAreaView } from "react-native-safe-area-context";
import icons from "../../../constants/icons";
import images from "../../../constants/images";
import VectorIcon from "../../../components/Atoms/VectorIcon";
import HeaderBar from "../../../components/Atoms/HeaderBar";
import { useNavigation } from "@react-navigation/native";
import { SIZE } from "../../../theme/fonts";

const termList = [
  "Đặt sân và thanh toán qua hình thức thanh toán online (voucher sẽ không hiệu lực nếu chọn hình thức thanh toán tại sân)",
  "Phiếu ưu đãi này chỉ được sử dụng 1 lần duy nhất",
  "Phiếu ưu đãi này chỉ được sử dụng 1 lần duy nhất",
  "Phiếu ưu đãi này sẽ hết giá trị sử dụng nếu như sử dụng sau ngày 11/4/2024",
];

const MyVoucherDetail = () => {
  const { width } = useWindowDimensions();
  const navigate = useNavigation();
  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <HeaderBar
          text={"Thông tin khuyến mãi"}
          isGoBack={true}
          goBack={() => navigate.goBack()}
        />
        <View style={styles.vchContainer}>
          <Image
            source={images.voucher}
            style={[styles.vchImg, { width: width - 30 }]}
          />
          <View style={styles.vchTitle}>
            <Text style={styles.vt}>Ưu đãi đến từ SmashIt</Text>
            <Text style={styles.vtDesc}>
              Ưu đãi thành viên mới tham gia, giảm 10% khi đặt sân lần đầu
            </Text>
          </View>
          <View style={styles.expiry}>
            <Text style={styles.eRight}>Hết hạn vào 11/4/2024</Text>
          </View>
          <View style={[styles.divider, { width }]}></View>
          <View style={styles.detailContainer}>
            <Text style={styles.dTitle}>Chi tiết</Text>
            <Text style={styles.dDescription}>
              Giảm 10% tổng chi phí khi đặt sân lần đầu qua ứng dụng SmashIt
            </Text>
          </View>
          <View style={styles.divider}></View>
          <View style={styles.termContainer}>
            <Text style={styles.termTitle}>Các điều khoản và điều kiện</Text>
            <Text style={styles.termBody}>
              Voucher chỉ được áp dụng khi đạt được điều kiện sau đây:
            </Text>
            <View style={styles.tList}>
              {termList.map((item, index) => (
                <View style={[styles.termItem, { width: width - 30 }]}>
                  <View style={styles.iconCheck}>
                    <VectorIcon.FontAwesome5 name="check" color={"#FF8A00"} />
                  </View>
                  <Text style={styles.termDesc}>{item}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>

      <TouchableOpacity
        style={[styles.footerButton, { width: width - 40 }]}
        activeOpacity={0.5}
        onPress={() => navigate.navigate("Search")}
      >
        <Text style={styles.footerButtonText}>Sử dụng ngay</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default MyVoucherDetail;

const styles = StyleSheet.create({
  vchContainer: {
    paddingHorizontal: 15,
  },
  vchImg: {
    borderRadius: 6,
    marginTop: 20,
  },
  vt: {
    marginTop: 15,
    fontSize: SIZE.size_12,
    fontFamily: "quicksand-semibold",
    color: "#7B7B7B",
  },
  vtDesc: {
    fontSize: SIZE.size_16,
    fontFamily: "quicksand-semibold",
    marginTop: 5,
  },
  expiry: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    justifyContent: "space-between",
  },
  eLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  coin: {
    width: 16,
    height: 16,
  },
  lText: {
    fontSize: SIZE.size_14,
    fontFamily: "quicksand-semibold",
    color: "#2A9083",
  },
  eRight: {
    fontSize: SIZE.size_14,
    fontFamily: "quicksand-semibold",
    color: "#FF8A00",
  },
  divider: {
    height: 1,
    backgroundColor: "#E8E8E8",
    marginVertical: 15,
  },
  dTitle: {
    fontSize: SIZE.size_16,
    fontFamily: "quicksand-semibold",
    marginBottom: 10,
  },
  dDescription: {
    fontSize: SIZE.size_14,
    fontFamily: "quicksand-medium",
  },
  termTitle: {
    fontSize: SIZE.size_16,
    fontFamily: "quicksand-semibold",
    marginBottom: 10,
  },
  termBody: {
    fontSize: SIZE.size_14,
    fontFamily: "quicksand-medium",
    marginBottom: 10,
  },
  iconCheck: {
    width: 20,
    height: 20,
    backgroundColor: "rgba(255,138,0,0.1)",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  termItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 10,
  },
  termDesc: {
    fontSize: SIZE.size_14,
    fontFamily: "quicksand-medium",
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 80,
    backgroundColor: "white",
  },
  footerButton: {
    position: "absolute",
    bottom: 10,
    left: 20,
    backgroundColor: "#FF8A00",
    paddingVertical: 15,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    flexDirection: "row",
    gap: 15,
  },
  footerButtonText: {
    color: "white",
    fontSize: SIZE.size_16,
    fontFamily: "quicksand-semibold",
  },
  cText: {
    fontSize: SIZE.size_14,
    fontFamily: "quicksand-semibold",
    color: "white",
  },
  iconSmall: {
    borderRadius: 100,
    backgroundColor: "#2A9083",
    padding: 3,
    alignItems: "center",
    justifyContent: "center",
  },
});
