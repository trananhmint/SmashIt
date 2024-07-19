import React, { useContext, useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import HeaderBar from "../../../components/Atoms/HeaderBar";
import { useNavigation, useRoute } from "@react-navigation/native";
import { SIZE } from "../../../theme/fonts";
import VectorIcon from "../../../components/Atoms/VectorIcon";
import cashImage from "../../../assets/images/cash.png";
import VNPayImage from "../../../assets/images/vnpay.png";
import MomoImage from "../../../assets/images/momo.png";
import { COLORS } from "../../../theme/colors";
import CourtInfo from "../../../components/Organisms/CourtInfo";
import courtImage from "../../../assets/images/courtImages.jpg";
import Chip from "../../../components/Atoms/Chip";
import ChipList from "../../../components/Molecules/ChipList";
import { formatNumber } from "../../../utils";
import BookingService from "../../../services/booking.service";
import { AuthContext } from "../../../context/AuthContext";
import Loading from "../../../components/Molecules/Loading";

const Payment = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { user, token, setUser } = useContext(AuthContext);

  const [isLoading, setIsLoading] = useState(false);

  const booking = route.params.booking;
  const badmintonCourt = route.params.badmintonCourt;
  console.log("payment  ", booking);
  console.log("date ", booking?.createBookingSlotRequests[0]?.date);

  const handleBooking = async () => {
    setIsLoading(true);
    await BookingService.createBooking(token, booking, setUser);

    const newBalance = user.balance - booking.priceTotal;
    setUser((prev) => ({ ...prev, balance: newBalance }));

    setIsLoading(false);

    navigation.navigate("PaymentInvoice", {
      status: 1,
      condition: 1,
      amount: booking.priceTotal,
    });
  };

  const paymentMethod = [
    // {
    //   icon: cashImage,
    //   method: "Ví Smash It",
    // },
    // // {
    // //   icon: VNPayImage,
    // //   method: "Ví VNPay",
    // // },
    // // {
    // //   icon: MomoImage,
    // //   method: "Ví MoMo",
    // // },
  ];

  console.log("balance", user.balance, booking.priceTotal);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <View>
      <ScrollView style={styles.container}>
        <HeaderBar
          text={"Thông tin thanh toán"}
          isGoBack={true}
          goBack={() => navigation.goBack()}
        />
        {/* <View style={styles.payment}>
          <Text style={styles.title}>Phương thức thanh toán</Text>
          <ScrollView
            style={styles.paymentMethods}
            showsHorizontalScrollIndicator={false}
            horizontal
          >
            {paymentMethod.map((method, index) => {
              return (
                <TouchableOpacity style={styles.paymentMethod} key={index}>
                  <View style={styles.paymentImage}>
                    <Image style={styles.image} source={method.icon} />
                  </View>

                  <Text>{method.method}</Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View> */}
        <View style={styles.courtAddress}>
          <Text style={styles.title}>Địa chỉ sân</Text>
          <CourtInfo
            courtName={badmintonCourt.courtName}
            address={badmintonCourt.address}
          />
        </View>
        <View style={styles.bookingCourt}>
          <Text style={styles.title}>Thông tin đặt sân</Text>
          {booking.createBookingSlotRequests?.map((court) => {
            console.log("court", court);
            return (
              <View style={[styles.court]}>
                <View style={styles.courtImage}>
                  <Image style={styles.image} source={courtImage} />
                </View>
                <View style={styles.bookingInfo}>
                  <Text style={styles.content_SemiBold}>
                    Sân {court.courtId}
                  </Text>
                  {/* <Text style={styles.content}>{court.date}</Text> */}
                  <View style={styles.time}>
                    <Text style={styles.content}>Giờ đặt:</Text>
                    <View style={{ width: "100%" }}>
                      <ChipList
                        switchColor={true}
                        dataList={court.timeFrames}
                        isHorizontal={false}
                        fontSize={SIZE.size_10}
                        textColor={COLORS.orangeText}
                        backgroundColor={COLORS.orangeBackground}
                        borderRadius={10}
                        textFamily={"quicksand-semibold"}
                        borderColor={COLORS.white}
                      />
                    </View>
                  </View>
                </View>
              </View>
            );
          })}

          {/* <View style={[styles.court]}>
            <View style={styles.courtImage}>
              <Image style={styles.image} source={courtImage} />
            </View>
            <View style={styles.bookingInfo}>
              <Text style={styles.content_SemiBold}>Sân 1</Text>
              <Text style={styles.content}>Thứ 3, 02/04/2024</Text>
              <View style={styles.time}>
                <Text style={styles.content}>Giờ đặt:</Text>
                <View style={{ width: "100%" }}>
                  <ChipList
                    dataList={timeSlots1}
                    isHorizontal={false}
                    fontSize={SIZE.size_10}
                    textColor={COLORS.orangeText}
                    backgroundColor={COLORS.orangeBackground}
                    borderRadius={10}
                    textFamily={"quicksand-semibold"}
                    borderColor={COLORS.white}
                  />
                </View>
              </View>
            </View>
          </View>
          <View style={[styles.court]}>
            <View style={styles.courtImage}>
              <Image style={styles.image} source={courtImage} />
            </View>
            <View style={styles.bookingInfo}>
              <Text style={styles.content_SemiBold}>Sân 2</Text>
              <Text style={styles.content}>Thứ 3, 02/04/2024</Text>
              <View style={styles.time}>
                <Text style={styles.content}>Giờ đặt:</Text>
                <View style={{ width: "100%" }}>
                  <ChipList
                    dataList={timeSlots1}
                    isHorizontal={false}
                    fontSize={SIZE.size_10}
                    textColor={COLORS.orangeText}
                    backgroundColor={COLORS.orangeBackground}
                    borderRadius={10}
                    textFamily={"quicksand-semibold"}
                    borderColor={COLORS.white}
                  />
                </View>
              </View>
            </View>
          </View> */}
        </View>
        <View style={styles.voucher}>
          <Text style={styles.title}>Mã khuyến mãi</Text>
          <View style={styles.voucherCode}>
            <Text style={styles.content_SemiBold}>
              Nhập mã "NGUOICHOIMOI" để giảm 50% cho lần đầu đặt sân
            </Text>
            <View style={styles.voucherInput}>
              <TextInput placeholder="NGUOICHOIMOI" />
              <View style={styles.voucherButton}>
                <TouchableOpacity style={styles.voucherBtn}>
                  <Text
                    style={[styles.voucherButton_Text, styles.content_SemiBold]}
                  >
                    Xem thêm mã khác
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={styles.bottom}>
        <View style={styles.total}>
          <Text style={styles.title}>Tổng tiền</Text>
          <Text
            style={{
              color: COLORS.darkGreenText,
              fontFamily: "quicksand-bold",
              fontSize: SIZE.size_18,
            }}
          >
            {formatNumber(booking.priceTotal)}đ
          </Text>
        </View>
        <TouchableOpacity
          style={styles.confirmPayment}
          disabled={user.balance < booking.priceTotal}
          onPress={(e) => {
            handleBooking(e);
          }}
        >
          <Text style={styles.confirmPayment_Text}>
            {user.balance < booking.priceTotal
              ? "Hiện không đủ tiền trong ví"
              : "Xác nhận thanh toán"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    height: "100%",
  },
  title: {
    fontFamily: "quicksand-bold",
    fontSize: SIZE.size_16,
  },
  content: {
    fontFamily: "quicksand-regular",
    fontSize: SIZE.size_12,
  },
  content_SemiBold: {
    fontFamily: "quicksand-semibold",
    fontSize: SIZE.size_12,
  },
  payment: {
    backgroundColor: COLORS.white,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 3,
  },
  paymentMethods: {
    width: "100%",
    aspectRatio: 6,
    backgroundColor: COLORS.white,
    paddingVertical: 10,
  },
  paymentMethod: {
    flexDirection: "row",
    alignItems: "center",
    height: "100%",
    gap: 10,
    marginRight: 10,
    backgroundColor: COLORS.white,
    borderRadius: 10,
    borderColor: COLORS.lightGreyBorder,
    borderWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  paymentImage: {
    height: "100%",
    aspectRatio: 1,
    borderRadius: 10,
  },
  image: {
    borderRadius: 10,
    width: "100%",
    height: "100%",
    backgroundColor: COLORS.white,
  },
  courtAddress: {
    paddingHorizontal: 12,
    backgroundColor: COLORS.white,
    gap: 10,
    paddingVertical: 10,
    marginBottom: 3,
  },
  bookingCourt: {
    width: "100%",
    backgroundColor: COLORS.white,
    paddingHorizontal: 12,
    gap: 10,
    paddingVertical: 10,
    marginBottom: 3,
  },

  court: {
    flexDirection: "row",
    width: "100%",
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    borderColor: COLORS.lightGreyBorder,
  },
  courtImage: {
    width: "20%",
    aspectRatio: 1,
  },
  bookingInfo: {
    paddingHorizontal: 12,
    width: "80%",
    gap: 10,
  },
  time: {
    width: "100%",
  },
  voucher: {
    backgroundColor: COLORS.white,
    paddingHorizontal: 12,
    gap: 20,
    paddingVertical: 10,
    height: "30%",
    paddingBottom: 150,
  },
  voucherCode: {
    borderColor: COLORS.lightGreyBorder,
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    gap: 10,
  },
  voucherInput: {
    backgroundColor: "#F7F9FA",
    padding: 10,
    borderRadius: 10,
    position: "relative",
    justifyContent: "center",
  },
  voucherButton: {
    position: "absolute",
    right: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  voucherBtn: {
    backgroundColor: COLORS.darkGreenText,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
  },
  voucherButton_Text: {
    color: COLORS.white,
  },

  bottom: {
    backgroundColor: COLORS.white,
    width: "100%",
    position: "absolute",
    bottom: 0,
    paddingHorizontal: 12,
    paddingVertical: 15,
    gap: 20,
    elevation: 10,
  },
  total: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  confirmPayment: {
    backgroundColor: COLORS.orangeText,
    paddingHorizontal: 10,
    paddingVertical: 12,
    alignContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  confirmPayment_Text: {
    alignContent: "center",
    fontFamily: "quicksand-bold",
    color: COLORS.white,
    fontSize: SIZE.size_16,
  },
});

export default Payment;
