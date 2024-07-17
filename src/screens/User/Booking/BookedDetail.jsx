import React, { useContext, useState } from "react";
import HeaderBar from "../../../components/Atoms/HeaderBar";
import BookingService from "../../../services/booking.service";
import { AuthContext } from "../../../context/AuthContext";
import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import { StyleSheet, Text, View } from "react-native";
import { COLORS } from "../../../theme/colors";
import CourtInfo from "../../../components/Organisms/CourtInfo";
import { formatDate, formatNumber } from "../../../utils";

const BookedDetail = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const token = useContext(AuthContext);
  const [booking, setBooking] = useState({});

  const bookingInfo = route.params.booking;

  const fetchBookedDetail = async () => {
    const res = await BookingService.getBookingDetail( token, bookingInfo.bookingId );
    if (res) {
      setBooking(res);
    }
    else {console.log("booking is not exited");}
  };
 
  useFocusEffect(
    React.useCallback(() => {
      fetchBookedDetail();
    }, [token, bookingInfo.bookingId])
  );
 console.log("booking", booking);
 console.log(typeof booking.response);
  return (
    <View style={{ flex: 1 }}>
      <HeaderBar
        isGoBack={true}
        goBack={() => navigation.goBack()}
        text={"Thông tin đặt sân"}
      />
      <View style={[{flex: 1}, styles.container]}>
        <View style={styles.createdTime_status}>
            <Text>{bookingInfo.status}</Text>
            <View style={styles.hr}/>
            <Text>{formatDate(bookingInfo.bookingTime)}</Text>
        </View>
        <View style={[{ paddingHorizontal: 15, marginTop: 20 }, styles.bookingInfo]}>
          {/* <CourtInfo courtName={""} address={""} />
           */}
           <View>
            <Text>Sân cầu lông {bookingInfo.name}</Text>
            <Text>{bookingInfo.address}</Text>
           </View>
          <View style={styles.hrHorizontal} />
          <View style={styles.bookingInfo_container}>
            <View style={styles.bookingInfo_Item}>
                <Text>Mã đặt sân</Text>
                <Text>{bookingInfo.bookingId}</Text>
            </View>
            <View style={styles.bookingInfo_Item}>
                <Text>Tổng tiền</Text>
                <Text>{formatNumber(bookingInfo.price)} đ</Text>
            </View>
            <View style={styles.bookingInfo_Item}>
                <Text>Phương thức thanh toán</Text>
                <Text>{bookingInfo.paymentMethod}</Text>
            </View>
          </View>
        </View>
        
      </View>
      <View
        style={{height: "50px", width: "100%", backgroundColor: "red" }}
      >
        <Text>sdkuuhfsdf</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 3,
        paddingHorizontal: 12, 
        backgroundColor: COLORS.white,
    },
    hr: {
        borderWidth: 1,
        borderColor: COLORS.chipGreenText,
        height: 14,
    },
    hrHorizontal : {
        borderWidth: 1,
        borderColor: COLORS.greyBackground,
        marginVertical: 20,
    },
    createdTime_status: {
        marginVertical: 20,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: COLORS.chipGreenBackGround,
        paddingVertical: 8,
        borderRadius: 8,
    },
    bookingInfo: {
        padding: 20,
        borderWidth: 1,
        borderColor: COLORS.darkGreyBorder,
        borderRadius: 10,
    },
    bookingInfo_container: {
        flexDirection: 'column',
    },
    bookingInfo_Item: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
})

export default BookedDetail;
