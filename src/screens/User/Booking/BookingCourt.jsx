import React, { useContext, useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import HeaderBar from "../../../components/Atoms/HeaderBar";
import DatePickerSlider from "../../../components/Organisms/DatePicker";
import CourtCodeCard from "../../../components/Organisms/CourtCodeCard";
import SlotChip from "../../../components/Molecules/SlotChip";
import VectorIcon from "../../../components/Atoms/VectorIcon";
import { SIZE } from "../../../theme/fonts";
import { COLORS } from "../../../theme/colors";
import moment from "moment";
import "moment/locale/vi"; // Import moment locale for Vietnamese
import Chip from "../../../components/Atoms/Chip";
import Divider from "../../../components/Atoms/Divider";
import { METRICS } from "../../../theme/metrics";
import StepDot from "../../../components/Molecules/StepDot";
import CourtInfo from "../../../components/Organisms/CourtInfo";
import {
  useIsFocused,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import CourtService from "../../../services/court.service";
import { AuthContext } from "../../../context/AuthContext";
import { formatNumber } from "../../../utils";
import { toZonedTime, format } from "date-fns-tz";
import Loading from "../../../components/Molecules/Loading";

export default function BookingCourt() {
  const navigation = useNavigation();
  const route = useRoute();
  const isFocused = useIsFocused();

  const { token } = useContext(AuthContext);
  const badmintonCourtId = Number(route.params.badmintonCourtId);

  const [court, setCourt] = useState({});
  const [courtSlot, setCourtSlot] = useState([]);
  const [isShowDetail, setIsShowDetail] = useState(false);
  const [chosenCourt, setChosenCourt] = useState(0);
  const [chosenSlot, setChosenSlot] = useState([]);
  const [chosenDate, setChosenDate] = useState(new Date());
  const [currentCourt, setCurrentCourt] = useState(1);
  const [bookingSlotList, setBookingSlotList] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isSlotLoading, setIsSlotLoading] = useState(false);

  // const formatDate = (date) => {
  //   const formattedDate = moment(date)
  //     .locale("vi")
  //     .format("YYYY-MM-DDTHH:mm:ss.SSSZ");
  //   const capitalizedDate =
  //     formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
  //   return capitalizedDate;
  // };

  const formatDate = (date) => {
    return moment(date).utcOffset(7).format("YYYY-MM-DDTHH:mm:ss.SSSZ");
  };

  const vietnamTimeZone = "Asia/Ho_Chi_Minh";

  const getCurrentDateTimeInVietnam = (chosenDate) => {
    const zonedDate = toZonedTime(chosenDate, vietnamTimeZone);
    return format(zonedDate, "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'", {
      timeZone: "UTC",
    });
  };

  const splitDateTime = (datetime) => {
    const splitDateTime = datetime.split(T);
    const splitDate = splitDateTime[0].split("-");
  };

  const currentDateTime = getCurrentDateTimeInVietnam(chosenDate);
  console.log("Current ", currentDateTime);

  const [booking, setBooking] = useState({
    badmintonCourtId: badmintonCourtId,
    createBookingSlotRequests: bookingSlotList,
    priceTotal: 0,
    date: formatDate(currentDateTime), // Initial date formatting
  });
  const numberOfCourt = [1, 2, 3, 4];

  useEffect(() => {
    const fetchCourt = async () => {
      const res = await CourtService.getCourtById(token, badmintonCourtId);
      if (res) {
        setCourt(res);
      }
    };

    console.log("Chosen Date: ", chosenDate);

    const fetchGenerateSlot = async () => {
      const res = await CourtService.generateSlotByDate(
        badmintonCourtId,
        currentDateTime,
        token
      );

      if (res) {
        setCourtSlot(res.generateSlotResponses);
        setIsSlotLoading(false);
      }
      setIsLoading(false);
    };

    fetchCourt();
    fetchGenerateSlot();
  }, [isFocused, token, badmintonCourtId, currentDateTime]);

  const calculateTotalPrice = (pricePerHour, bookingSlotList) => {
    if (pricePerHour && bookingSlotList.length > 0) {
      const total = (pricePerHour / 2) * countChosenSlot(bookingSlotList);
      return total;
    } else {
      return 0;
    }
  };

  useEffect(() => {
    const total = calculateTotalPrice(court.pricePerHour, bookingSlotList);
    setTotalPrice(total);
    setBooking((prevBooking) => ({
      ...prevBooking,
      createBookingSlotRequests: bookingSlotList,
      priceTotal: total,
      date: formatDate(currentDateTime), // Update the date with formatted date
    }));
  }, [bookingSlotList, court.pricePerHour, currentDateTime]);

  const countChosenSlot = (bookingSlotList) => {
    let totalCount = 0;
    bookingSlotList?.forEach((item) => {
      totalCount += item.timeFrames.length;
    });
    return totalCount;
  };

  const filterByCourtCode = (courtSlot, currentCourt) => {
    const slotList = courtSlot.filter((item) => {
      return item.courtCode === currentCourt.toString();
    });
    if (slotList.length > 0) return slotList[0];
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.white }}>
      <HeaderBar
        text={"Thông tin đặt sân"}
        isGoBack={true}
        goBack={() => navigation.goBack()}
      />
      <ScrollView style={{ flex: 1, marginBottom: 135 }}>
        <View style={{ paddingHorizontal: 15, marginTop: 20 }}>
          <CourtInfo courtName={court.courtName} address={court.address} />
        </View>

        <View style={{ marginTop: 20, marginBottom: 20 }}>
          <DatePickerSlider
            chosenDate={chosenDate}
            setChosenDate={setChosenDate}
            // action={setIsSlotLoading}
          />
        </View>
        <View style={styles.container}>
          <View style={{ width: "100%" }}>
            <ScrollView
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              onScroll={(e) => {
                const x = e.nativeEvent.contentOffset.x;
                setCurrentCourt(
                  Number((x / METRICS.screenWidth).toFixed(0)) + 1
                );
              }}
              style={{}}
            >
              {courtSlot.map((item, index) => {
                return (
                  <View key={index} style={{ width: METRICS.screenWidth - 30 }}>
                    <CourtCodeCard
                      name={index + 1}
                      pricePerHour={court.pricePerHour}
                      courtCode={currentCourt}
                    />
                  </View>
                );
              })}
            </ScrollView>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                marginTop: 20,
              }}
            >
              <StepDot currentStep={currentCourt} quantity={courtSlot.length} />
            </View>
          </View>

          {isSlotLoading ? (
            <View style={{ marginTop: 90 }}>
              <Loading />
            </View>
          ) : (
            <SlotChip
              chosenSlot={chosenSlot}
              isCourtOwner={false}
              setChosenSlot={setChosenSlot}
              slotList={filterByCourtCode(courtSlot, currentCourt)}
              chosenDate={currentDateTime}
              courtId={filterByCourtCode(courtSlot, currentCourt)?.id}
              setBookingSlotList={setBookingSlotList}
            />
          )}
        </View>
      </ScrollView>

      <View style={[styles.noteSections]}>
        <View style={styles.noteSection}>
          <View style={styles.noteItem}>
            <View
              style={[
                styles.noteIcon,
                {
                  backgroundColor: "rgba(117, 117, 117, 0.10)",
                },
              ]}
            >
              <VectorIcon.AntDesign name="clockcircleo" size={12} />
            </View>
            <Text style={styles.noteText}>Đã đặt</Text>
          </View>

          <View style={styles.noteItem}>
            <View
              style={[
                styles.noteIcon,
                {
                  backgroundColor: "rgba(42, 144, 131, 0.1)",
                },
              ]}
            >
              <VectorIcon.AntDesign
                name="clockcircleo"
                size={12}
                color={COLORS.darkGreenText}
              />
            </View>
            <Text style={styles.noteText}>Còn trống</Text>
          </View>

          <View style={styles.noteItem}>
            <View
              style={[
                styles.noteIcon,
                {
                  backgroundColor: COLORS.orangeBackground,
                },
              ]}
            >
              <VectorIcon.AntDesign
                name="clockcircleo"
                size={12}
                color={COLORS.orangeText}
              />
            </View>
            <Text style={styles.noteText}>Đang chọn</Text>
          </View>
        </View>

        <View
          style={[
            styles.noteSection,
            { justifyContent: "space-between", paddingHorizontal: 10 },
          ]}
        >
          <View>
            <View
              style={{ alignItems: "center", flexDirection: "row", gap: 15 }}
            >
              <Text style={styles.noteText}>Tạm tính:</Text>
              <Text style={styles.totalPrice}>
                {formatNumber(totalPrice)} đ
              </Text>
            </View>
            {totalPrice !== 0 && (
              <View
                style={{ alignItems: "center", flexDirection: "row", gap: 15 }}
              >
                <View style={{ alignItems: "center", flexDirection: "row" }}>
                  <VectorIcon.Entypo
                    name="dot-single"
                    size={20}
                    color={COLORS.darkGreenText}
                  />
                  <Text>{bookingSlotList.length} sân</Text>
                </View>
                <View style={{ alignItems: "center", flexDirection: "row" }}>
                  <VectorIcon.Entypo
                    name="dot-single"
                    size={20}
                    color={COLORS.darkGreenText}
                  />
                  <Text>{countChosenSlot(bookingSlotList)} khung giờ</Text>
                </View>
              </View>
            )}
          </View>

          <View>
            <TouchableOpacity
              disabled={totalPrice === 0}
              onPress={() => {
                console.log(booking);
                navigation.navigate("Payment", {
                  booking: booking,
                  badmintonCourt: court,
                });
              }}
              style={[
                {
                  borderColor: "none",
                  paddingHorizontal: 30,
                  paddingVertical: 10,
                  borderRadius: 6,
                  backgroundColor:
                    totalPrice === 0
                      ? COLORS.greyBackground
                      : COLORS.orangeText,
                },
              ]}
            >
              <Text
                style={{
                  color: totalPrice === 0 ? COLORS.greyText : COLORS.white,
                }}
              >
                Tiếp tục
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    marginTop: 20,
    paddingHorizontal: 15,
    gap: 30,
    position: "relative",
  },

  noteSections: {
    width: "100%",
    bottom: 0,
    position: "absolute",
    backgroundColor: COLORS.white,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  noteSection: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 12,
  },
  noteItem: {
    gap: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  noteText: {
    fontSize: SIZE.size_12,
    fontFamily: "quicksand-semibold",
    justifyContent: "center",
    color: COLORS.greyText,
  },
  totalPrice: {
    fontFamily: "quicksand-bold",
    fontSize: SIZE.size_18,
    color: COLORS.darkGreenText,
  },

  noteIcon: {
    padding: 8,
    borderRadius: 8,
  },

  slotInformation: {
    backgroundColor: COLORS.white,
    paddingVertical: 20,
    borderTopColor: "#E8E8E8",
    borderTopWidth: 2,
    borderRadius: 6,
  },

  dateTimeSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
  },

  dateText: {
    fontSize: SIZE.size_12,
    fontFamily: "quicksand-semibold",
  },

  slot: {
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  slotText: {
    fontSize: SIZE.size_10,
    fontFamily: "quicksand-medium",
  },

  customerInforSection: {
    gap: 24,
    paddingHorizontal: 20,
    marginTop: 20,
  },

  title: {
    fontSize: SIZE.size_14,
    fontFamily: "quicksand-medium",
  },

  inforContainer: {
    gap: 20,
    marginBottom: 15,
  },

  inforItem: {
    gap: 15,
  },

  inforItemContent: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  primaryText: {
    fontSize: SIZE.size_14,
    fontFamily: "quicksand-medium",
  },

  secondaryText: {
    fontSize: SIZE.size_12,
    fontFamily: "quicksand-regular",
  },

  buttonSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
  },

  button: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },

  buttonText: {
    fontFamily: "quicksand-bold",
    fontSize: SIZE.size_14,
  },

  notBookedSection: {
    marginBottom: 15,
    alignItems: "center",
  },

  notBookedItem: {
    flexDirection: "row",
    gap: 8,
    paddingVertical: 40,
  },

  notBookedText: {
    fontSize: SIZE.size_14,
    fontFamily: "quicksand-regular",
    color: "#757575",
  },
});
