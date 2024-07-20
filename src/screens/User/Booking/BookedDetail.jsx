import React, { useContext, useState } from "react";
import HeaderBar from "../../../components/Atoms/HeaderBar";
import BookingService from "../../../services/booking.service";
import { AuthContext } from "../../../context/AuthContext";
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { COLORS } from "../../../theme/colors";
import CourtInfo from "../../../components/Organisms/CourtInfo";
import courtImage from "../../../assets/images/courtImages.jpg";
import { formatDate, formatNumber } from "../../../utils";
import ChipList from "../../../components/Molecules/ChipList";
import { SIZE } from "../../../theme/fonts";

const BookedDetail = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const token = useContext(AuthContext);
  const [booking, setBooking] = useState({});

  const bookingInfo = route.params.booking;

  const fetchBookedDetail = async () => {
    const res = await BookingService.getBookingDetail(
      token,
      bookingInfo.bookingId
    );
    if (res) {
      setBooking(res);
    } else {
      console.log("booking is not exited");
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchBookedDetail();
    }, [token, bookingInfo.bookingId])
  );
  console.log("booking", booking);
  console.log("bôkingInfo", bookingInfo);
  console.log(typeof booking.response);
  return (
    <View style={{ flex: 1 }}>
      <HeaderBar
        isGoBack={true}
        goBack={() => navigation.goBack()}
        text={"Thông tin đặt sân"}
      />
      <View style={[{ flex: 1 }, styles.container]}>
        <View style={styles.createdTime_status}>
          <Text style={[ styles.content_SemiBold, {color: COLORS.darkGreenText}]}>{bookingInfo.status}</Text>
          <View style={styles.hr} />
          <Text style={[ styles.content_SemiBold, {color: COLORS.darkGreenText}]}>{bookingInfo.bookingTime}</Text> 
        </View>
        <View
          style={[{ paddingHorizontal: 15, marginTop: 20 }, styles.bookingInfo]}
        >
          <View>
            <Text style={[{fontSize: SIZE.size_14, fontFamily: "quicksand-bold"}]}>Sân cầu lông {bookingInfo.name}</Text>
            <Text style={styles.content}>{bookingInfo.address}</Text>
          </View>
          <View style={styles.hrHorizontal} />
          <View style={styles.bookingInfo_container}>
            <View style={styles.bookingInfo_Item}>
              <Text style={ styles.content_SemiBold}>Mã đặt sân</Text>
              <Text>{bookingInfo.bookingId}</Text>
            </View>
            <View style={styles.bookingInfo_Item}>
              <Text style={ styles.content_SemiBold}>Tổng tiền</Text>
              <Text>{formatNumber(bookingInfo.price)} đ</Text>
            </View>
            <View style={styles.bookingInfo_Item}>
              <Text style={ styles.content_SemiBold}>Phương thức thanh toán</Text>
              <Text>{bookingInfo.paymentMethod}</Text>
            </View>
          </View>
        </View>
        <View style={styles.bookingCourt}>
          <Text style={styles.title}>Thông tin đặt sân</Text>
          <ScrollView>
          {booking.response?.map((court) => { 
            console.log("court", court);
            return (
              <View style={[styles.court]}>
                <View style={styles.courtImage}>
                  <Image style={styles.image} source={courtImage} />
                </View>
                <View style={styles.bookingInfo1}>
                  <Text style={styles.content_SemiBold}>
                    Sân {court.courtId}
                  </Text>
                  
                  <View style={styles.time}>
                    <Text style={styles.content}>Giờ đặt:</Text>
                    <View style={{ width: "100%" }}>
                      <ChipList
                        switchColor={true}
                        dataList={court.slots}
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
          </ScrollView>
        </View>
      </View>
      {/* <View style={{ height: "50px", width: "100%", backgroundColor: "red" }}>
        <Text>sdkuuhfsdf</Text>
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 3,
    paddingHorizontal: 12,
    backgroundColor: COLORS.white,
  },
  title: {
    fontFamily: "quicksand-bold",
    fontSize: SIZE.size_16,
  },
  content: {
    fontFamily: "quicksand-regular",
    fontSize: SIZE.size_14,
  },
  content_SemiBold: {
    fontFamily: "quicksand-semibold",
    fontSize: SIZE.size_14,
  },
  hr: {
    borderWidth: 1,
    borderColor: COLORS.chipGreenText,
    height: 14,
  },
  hrHorizontal: {
    borderWidth: 1,
    borderColor: COLORS.greyBackground,
    marginVertical: 20,
  },
  createdTime_status: {
    marginVertical: 20,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: COLORS.chipGreenBackGround,
    paddingBottom: 8,
    paddingTop: 6,
    borderRadius: 8,
  },
  bookingInfo: {
    padding: 20,
    borderWidth: 2,
    borderColor: COLORS.greyBackground,
    borderRadius: 10,
  },
  bookingInfo1: {
    paddingHorizontal: 12,
    width: "80%",
    gap: 10,
  },
  time: {
    width: "100%",
  },
  court: {
    flexDirection: "row",
    width: "100%",
    borderWidth: 2,
    padding: 10,
    borderRadius: 10,
    borderColor: COLORS.greyBackground,
  },
  courtImage: {
    width: "20%",
    aspectRatio: 1,
  },
  image: {
    borderRadius: 10,
    width: "100%",
    height: "100%",
    backgroundColor: COLORS.white,
  },
  bookingCourt: {
    width: "100%",
    backgroundColor: COLORS.white,
    // paddingHorizontal: 12,
    gap: 10,
    paddingVertical: 10,
    marginBottom: 3,
  },
  bookingInfo_container: {
    flexDirection: "column",
  },
  bookingInfo_Item: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default BookedDetail;
