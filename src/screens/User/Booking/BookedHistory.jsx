import React, { useContext, useEffect, useState } from "react";
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
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
import { formatDate } from "../../../utils";
import { AuthContext } from "../../../context/AuthContext";
import CourtService from "../../../services/court.service";
import BookingService from "../../../services/booking.service";
import Oops from "../../../components/Organisms/Oops";

const BookedHistory = () => {
  const [bookedHistory, setBookedHistory] = useState([]);
  const [reserveCourts, setReserveCourts] = useState([]);
  // const [badmintonCourt, setBadmintonCourt] = useState([]);
  const navigation = useNavigation();
  const [tab, setTab] = useState(1);
  const { token } = useContext(AuthContext);
  // const isFocused =

  const courts = {
    id: 1,
    name: "Sân cầu lông Quân Đội",
    numOfCourt: "1",
    numOfSlot: "2",
    bookingTime: "20 Th5 2024, 16:00",
    price: "100.000",
    paymentMethod: "Thanh toán tại sân",
  };

  useEffect(() => {
    // const fetchCourt = async () => {
    //   const res = await CourtService.getCourtById(token, badmintonCourtId);
    //   if (res) {
    //     // setBadmintonCourt(res);
    //   }
    // };
    const fetchBookedHistory = async () => {
      const res = await BookingService.getAllBookingsByUser(token);
      if (res) {
        setBookedHistory(res);
      }
      console.log("getAllBookingsByUser", res);
    };
    const fetchReserve = async () => {
      const res = await BookingService.getReserveBooking(token);
      if (res) {
        setReserveCourts(res);
        console.log("wqert", res);
      }
      console.log("getReserveBooking", res);
    };
    // fetchCourt();
    fetchBookedHistory();
    fetchReserve();
  }, [token]);

  const Reserve = () => {
    if (reserveCourts.length <= 0) {
      return (
        <View style={{ marginTop: 200 }}>
          <Oops text={"Oops, hiện tại chưa có sân được đặt trước"} />
        </View>
      );
    }

    // console.log(reserveCourts);
    return reserveCourts?.map((court, index) => {
      return (
        <View key={index}>
          <HistoryCourt
            name={"Sân cầu lông Vũ Trụ"}
            numOfCourt={court.numOfCourt}
            numOfSlot={court.numOfSlot}
            bookingTime={formatDate(court.dateTime)}
            price={court.price}
            paymentMethod={court.paymentMethod}
          />
          <View style={styles.hr} />
        </View>
      );
    });
  };

  const HistoryBooked = () => {
    console.log("his", bookedHistory);

    if (bookedHistory.length <= 0) {
      return (
        <View style={{ marginTop: 200 }}>
          <Oops text={"Hãy bắt đầu đặt sân đi nhé"} />{" "}
        </View>
      );
    }

    return bookedHistory?.map((court, index) => {
      return (
        <View key={index}>
          <HistoryCourt
            name={court.name}
            numOfCourt={court.numOfCourt}
            numOfSlot={court.numOfSlot}
            bookingTime={formatDate(court.dateTime)}
            price={court.price}
            paymentMethod={court.paymentMethod}
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
      <View style={{ backgroundColor: "white", marginVertical: 3 }}>
        <TabBar
          tabItem={tabItems}
          fontSize={SIZE.size_14}
          setTab={setTab}
          currentTab={tab}
          tabBarStyle={{ justifyContent: "space-around" }}
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