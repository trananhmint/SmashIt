import React, { useContext, useEffect, useState } from "react";
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import TopContent from "../../../components/Atoms/TopContent";
import HeaderBar from "../../../components/Atoms/HeaderBar";
import HistoryCourt from "../../../components/Organisms/HistoryCourt";
import { COLORS } from "../../../theme/colors";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import TabBar from "../../../components/Molecules/TabBar";
import { SIZE } from "../../../theme/fonts";
import images from "../../../constants/images";
import BookingService from "../../../services/booking.service";
import { AuthContext } from "../../../context/AuthContext";
import { formatDate } from "../../../utils";

const BookedHistory = () => {
  const [bookedHistory, setBookedHistory] = useState([]);
  const [reserveCourts, setReserveCourts] = useState([]);
  const [badmintonCourtId, setBadmintonCourt] = useState(0);
  const [booking, setBooking] = useState({
    badmintonCourtId: badmintonCourtId,
    booking: {},
  });
  // const [badmintonCourt, setBadmintonCourt] = useState([]);
  const navigation = useNavigation();
  const [tab, setTab] = useState(1);
  const { token } = useContext(AuthContext);

  const courts = {
    id: 1,
    name: "Sân cầu lông Quân Đội",
    numOfCourt: "1",
    numOfSlot: "2",
    bookingTime: "20 Th5 2024, 16:00",
    price: "100.000",
    paymentMethod: "Thanh toán tại sân",
  };

  const fetchBookedHistory = async () => {
    const res = await BookingService.getAllBookingsByUser(token);
    if (res) {
      setBookedHistory(res);
    }

    // console.log("getAllBookingsByUser", res);
  };
  const fetchReserve = async () => {
    const res = await BookingService.getReserveBooking(token);
    if (res) {
      setReserveCourts(res);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchBookedHistory();
      fetchReserve();
    }, [token])
  );



  const Reserve = () => {
    return reserveCourts?.map((court, index) => {
      return (
          <View key={index}>
            <HistoryCourt
              id={court.id}
              name={court.badmintonCourtName}
              numOfCourt={court.numberOfCourt}
              numOfSlot={court.numOfSlot}
              bookingTime={formatDate(court.dateTime)}
              price={court.price}
              paymentMethod={"Ví Smash It"}
              address={court.badmintonCourtLocation}
              status={court.status}
            />
            <View style={styles.hr} />
          </View>
      );
    });
  };

  const HistoryBooked = () => {
    return bookedHistory?.map((court, index) => {
      return (
        <View key={index}>
          <HistoryCourt
            id={court.id}
            name={court.badmintonCourtName}
            address={court.badmintonCourtLocation}
            numOfCourt={court.numberOfCourt}
            numOfSlot={court.numOfSlot}
            bookingTime={formatDate(court.dateTime)}
            price={court.price}
            paymentMethod={"Ví Smash It"}
            status={court.status}
          />
          <View style={styles.hr} />
        </View>
      );
    });
  };
  const tabItems = [
    {
      id: 1,
      name: "Đã đặt trước",
      component: <Reserve />,
    },
    {
      id: 2,
      name: "Lịch sử đặt sân",
      component: <HistoryBooked />,
    },
  ];
  return (
    <View style={{ flex: 1 }}>
      <HeaderBar
        isGoBack={true}
        goBack={() => navigation.goBack()}
        text={"Lịch sử đặt sân"}
      />
      <View style={{ backgroundColor: COLORS.white, marginVertical: 3 }}>
        <TabBar
          tabItem={tabItems}
          fontSize={SIZE.size_14}
          setTab={setTab}
          currentTab={tab}
        />
      </View>
      <ScrollView style={styles.bookedCourt}>
        {tabItems.map(
          (item, index) =>
            item.id === tab && (
              <View key={item.id} style={{ flex: 1, width: "100%" }}>
                {item.component}
              </View>
            )
        )}
      </ScrollView>
      <View></View>
    </View>
  );
};

const styles = StyleSheet.create({
  bookedCourt: {
    height: "100%",
    width: "100%",
    backgroundColor: COLORS.white,
    paddingHorizontal: 12,
    paddingVertical: 20,
    flex: 1,
  },
  hr: {
    borderWidth: 1,
    borderColor: COLORS.greyBackground,
    marginVertical: 20,
  },
});

export default BookedHistory;
