import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect } from "react";
import icons from "../../constants/icons";
import { SIZE } from "../../theme/fonts";
import { useState } from "react";
import { COLORS } from "../../theme/colors";
import Divider from "../Atoms/Divider";
import { METRICS } from "../../theme/metrics";
import { eachYearOfInterval, getDaysInMonth } from "date-fns";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
import VectorIcon from "../Atoms/VectorIcon";

export default function TimeFilter({ chosenFilter, setChosenFilter }) {
  const [isChosen, setIsChosen] = useState("Năm");

  const [startDate, setStartDate] = useState(null);

  const [endDate, setEndDate] = useState(null);

  const [isOpenStart, setIsOpenStart] = useState(false);

  const [isOpenEnd, setIsOpenEnd] = useState(false);

  const [chosenYear, setChosenYear] = useState(new Date().getFullYear());
  const [chosenQuarter, setChosenQuarter] = useState(null);
  const [chosenMonth, setChosenMonth] = useState(null);
  const [chosenDay, setChosenDay] = useState(null);

  const quarters = ["Tất cả", 1, 2, 3, 4];

  const filterList = [
    {
      title: "Năm",
      data: chosenYear,
    },
    {
      title: "Quý",
      data: chosenQuarter,
    },
    {
      title: "Tháng",
      data: chosenMonth,
    },
    {
      title: "Ngày",
      data: chosenDay,
    },
  ];

  const handleChooseFilter = () => {
    if (chosenFilter === 0) {
      setChosenFilter(1);
    } else {
      setChosenFilter(0);
    }
  };

  const handlePickTime = (date, isStart) => {
    if (isStart) {
      setIsOpenStart(false);
    } else {
      setIsOpenEnd(false);
    }

    const updatedTime = moment.utc(date).add(7, "hours").toDate();

    if (isStart) {
      setStartDate(updatedTime);
    } else {
      setEndDate(updatedTime);
    }
  };

  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getUTCDate();
    const month = date.getUTCMonth() + 1; // Months are zero-based, so add 1
    const year = date.getUTCFullYear();

    const monthString = `Th${month}`;

    return `${day} ${monthString}, ${year}`;
  }

  const getYearRange = () => {
    const years = ["Tất cả"];

    const result = eachYearOfInterval({
      start: new Date(2024, 0, 1),
      end: new Date(),
    });

    const formattedResult = result.map((date) => date.getFullYear());

    const yearList = years.concat(formattedResult);

    return yearList;
  };

  const getMonthRange = () => {
    const months = ["Tất cả"];

    let monthList = null;

    switch (chosenQuarter) {
      case "Tất cả":
        monthList = months.concat([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
        break;
      case 1:
        monthList = months.concat([1, 2, 3]);
        break;
      case 2:
        monthList = months.concat([4, 5, 6]);
        break;
      case 3:
        monthList = months.concat([7, 8, 9]);
        break;
      case 4:
        monthList = months.concat([10, 11, 12]);
        break;

      default:
        monthList = months.concat([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
        break;
    }

    return monthList;
  };

  const getDayRange = () => {
    const days = ["Tất cả"];

    if (!chosenMonth) {
      return [];
    }

    const result = getDaysInMonth(new Date(chosenYear, chosenMonth - 1));

    const daysArray = Array.from({ length: result }, (_, index) => index + 1);

    const dayList = days.concat(daysArray);

    return dayList;
  };

  const getFilter = () => {
    switch (isChosen) {
      case "Năm":
        return <YearList />;

      case "Quý":
        return <QuarterList />;

      case "Tháng":
        return <MonthList />;

      case "Ngày":
        return <DayList />;

      default:
        break;
    }
  };

  const QuarterList = () => {
    return (
      <ScrollView
        showsHorizontalScrollIndicator={false}
        horizontal
        contentContainerStyle={{ gap: 10 }}
      >
        {quarters.map((item, index) => {
          return (
            <TouchableOpacity
              key={index}
              onPress={() => {
                if (chosenQuarter !== item) {
                  setChosenQuarter(item);
                  setChosenMonth(null);
                } else {
                  setChosenQuarter(null);
                }
              }}
              style={{
                width: (METRICS.screenWidth - 30) * 0.23,
                height: 65,
                borderWidth: 1,
                borderColor:
                  chosenQuarter === item
                    ? COLORS.orangeText
                    : COLORS.greyBackground,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 10,
                overflow: "hidden",
              }}
            >
              <View
                style={{
                  height: "39%",
                  alignContent: "center",
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: SIZE.size_10,
                    fontFamily: "quicksand-medium",
                    color:
                      chosenQuarter === item ? COLORS.orangeText : COLORS.black,
                  }}
                >
                  Quý
                </Text>
              </View>
              <View
                style={{
                  // display: "flex",
                  // flexDirection: 'column',
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor:
                    chosenQuarter === item ? COLORS.orangeText : "#F1F1F1",
                  width: "100%",
                  height: "61%",
                }}
              >
                <Text
                  style={{
                    fontSize: SIZE.size_14,
                    fontFamily: "quicksand-semibold",
                    justifyContent: "center",
                    color: chosenQuarter === item ? COLORS.white : COLORS.black,
                  }}
                >
                  {item}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    );
  };

  const YearList = () => {
    return (
      <ScrollView
        showsHorizontalScrollIndicator={false}
        horizontal
        contentContainerStyle={{ gap: 10 }}
      >
        {getYearRange().map((item, index) => {
          return (
            <TouchableOpacity
              key={index}
              onPress={() => {
                setChosenYear(item);
              }}
              style={{
                width: (METRICS.screenWidth - 30) * 0.23,
                height: 65,
                borderWidth: 1,
                borderColor:
                  chosenYear === item
                    ? COLORS.orangeText
                    : COLORS.greyBackground,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 10,
                overflow: "hidden",
              }}
            >
              <View
                style={{
                  height: "39%",
                  alignContent: "center",
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: SIZE.size_10,
                    fontFamily: "quicksand-medium",
                    color:
                      chosenYear === item ? COLORS.orangeText : COLORS.black,
                  }}
                >
                  Năm
                </Text>
              </View>
              <View
                style={{
                  // display: "flex",
                  // flexDirection: 'column',
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor:
                    chosenYear === item ? COLORS.orangeText : "#F1F1F1",
                  width: "100%",
                  height: "61%",
                }}
              >
                <Text
                  style={{
                    fontSize: SIZE.size_14,
                    fontFamily: "quicksand-semibold",
                    justifyContent: "center",
                    color: chosenYear === item ? COLORS.white : COLORS.black,
                  }}
                >
                  {item}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    );
  };

  const DayList = () => {
    return (
      <ScrollView
        showsHorizontalScrollIndicator={false}
        horizontal
        contentContainerStyle={{ gap: 10 }}
      >
        {getDayRange().map((item, index) => {
          return (
            <TouchableOpacity
              key={index}
              onPress={() => {
                if (chosenDay !== item) {
                  setChosenDay(item);
                } else {
                  setChosenDay(null);
                }
              }}
              style={{
                width:
                  item === "Tất cả"
                    ? (METRICS.screenWidth - 30) * 0.23
                    : (METRICS.screenWidth - 30) * 0.13,
                height: 65,
                borderWidth: 1,
                borderColor:
                  chosenDay === item
                    ? COLORS.orangeText
                    : COLORS.greyBackground,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 10,
                overflow: "hidden",
              }}
            >
              <View
                style={{
                  height: "39%",
                  alignContent: "center",
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: SIZE.size_10,
                    fontFamily: "quicksand-medium",
                    color:
                      chosenDay === item ? COLORS.orangeText : COLORS.black,
                  }}
                >
                  Ngày
                </Text>
              </View>
              <View
                style={{
                  // display: "flex",
                  // flexDirection: 'column',
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor:
                    chosenDay === item ? COLORS.orangeText : "#F1F1F1",
                  width: "100%",
                  height: "61%",
                }}
              >
                <Text
                  style={{
                    fontSize: SIZE.size_14,
                    fontFamily: "quicksand-semibold",
                    justifyContent: "center",
                    color: chosenDay === item ? COLORS.white : COLORS.black,
                  }}
                >
                  {item}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    );
  };

  const MonthList = () => {
    return (
      <ScrollView
        showsHorizontalScrollIndicator={false}
        horizontal
        contentContainerStyle={{ gap: 10 }}
      >
        {getMonthRange()?.map((item, index) => {
          return (
            <TouchableOpacity
              key={index}
              onPress={() => {
                if (chosenMonth !== item) {
                  setChosenMonth(item);
                } else {
                  setChosenMonth(null);
                  setChosenDay(null);
                }
              }}
              style={{
                width:
                  item === "Tất cả"
                    ? (METRICS.screenWidth - 30) * 0.23
                    : (METRICS.screenWidth - 30) * 0.13,
                height: 65,
                borderWidth: 1,
                borderColor:
                  chosenMonth === item
                    ? COLORS.orangeText
                    : COLORS.greyBackground,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 10,
                overflow: "hidden",
              }}
            >
              <View
                style={{
                  height: "39%",
                  alignContent: "center",
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: SIZE.size_10,
                    fontFamily: "quicksand-medium",
                    color:
                      chosenMonth === item ? COLORS.orangeText : COLORS.black,
                  }}
                >
                  Tháng
                </Text>
              </View>
              <View
                style={{
                  // display: "flex",
                  // flexDirection: 'column',
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor:
                    chosenMonth === item ? COLORS.orangeText : "#F1F1F1",
                  width: "100%",
                  height: "61%",
                }}
              >
                <Text
                  style={{
                    fontSize: SIZE.size_14,
                    fontFamily: "quicksand-semibold",
                    justifyContent: "center",
                    color: chosenMonth === item ? COLORS.white : COLORS.black,
                  }}
                >
                  {item}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    );
  };

  console.log(startDate, isOpenEnd);

  return (
    <View style={styles.container}>
      <View style={styles.titleSection}>
        <Text style={styles.title}>Bộ lọc thời gian</Text>
        <TouchableOpacity activeOpacity={0.7} onPress={handleChooseFilter}>
          <Image source={icons.menu} />
        </TouchableOpacity>
      </View>

      {chosenFilter === 0 && (
        <>
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            {filterList.map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  setIsChosen(item.title);
                }}
                style={{
                  width: (METRICS.screenWidth - 30) * 0.23,
                  height: 65,
                  borderWidth: 1,
                  borderColor:
                    isChosen === item.title
                      ? COLORS.orangeBackground
                      : COLORS.greyBackground,
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 10,
                  overflow: "hidden",
                }}
              >
                <View
                  style={{
                    height: "39%",
                    alignContent: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{
                      fontSize: SIZE.size_10,
                      fontFamily: "quicksand-medium",
                      color:
                        isChosen === item.title
                          ? COLORS.orangeText
                          : COLORS.black,
                    }}
                  >
                    {item.title}
                  </Text>
                </View>
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor:
                      isChosen === item.title
                        ? COLORS.orangeBackground
                        : "#F1F1F1",
                    width: "100%",
                    height: "61%",
                  }}
                >
                  <Text
                    style={{
                      fontSize: SIZE.size_14,
                      fontFamily: "quicksand-semibold",
                      justifyContent: "center",
                      color:
                        isChosen === item.title
                          ? COLORS.orangeText
                          : COLORS.black,
                    }}
                  >
                    {item.data ? item.data : "--"}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          <Divider color={"#E8E8E8"} orientation={"horizontal"} />
          <View>{getFilter()}</View>
        </>
      )}

      {chosenFilter === 1 && (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <TouchableOpacity
            style={[
              styles.pickDate,
              startDate && { backgroundColor: COLORS.orangeBackground },
            ]}
            onPress={() => setIsOpenStart(true)}
          >
            <Text
              style={[
                styles.title,
                { color: startDate ? COLORS.orangeText : COLORS.black },
              ]}
            >
              {startDate ? formatDate(startDate) : "Từ"}
            </Text>
            <VectorIcon.FontAwesome
              name="calendar-minus-o"
              size={18}
              color={startDate ? COLORS.orangeText : COLORS.black}
            />
          </TouchableOpacity>

          <VectorIcon.AntDesign name="arrowright" color={"8C8C8C"} size={14} />

          <TouchableOpacity
            style={[
              styles.pickDate,
              endDate && { backgroundColor: COLORS.orangeBackground },
            ]}
            onPress={() => {
              if (startDate) {
                console.log("abcd");
                setIsOpenEnd(true);
              }
            }}
          >
            <Text
              style={[
                styles.title,
                { color: endDate ? COLORS.orangeText : COLORS.black },
              ]}
            >
              {endDate ? formatDate(endDate) : "Đến"}
            </Text>
            <VectorIcon.FontAwesome
              name="calendar-minus-o"
              size={18}
              color={endDate ? COLORS.orangeText : COLORS.black}
            />
          </TouchableOpacity>

          <DateTimePickerModal
            locale="vi"
            isVisible={isOpenStart}
            mode="date"
            onConfirm={(value) => handlePickTime(value, true)}
            onCancel={() => setIsOpenStart(false)}
            cancelTextIOS="Hủy"
            confirmTextIOS="Xác nhận"
          />

          <DateTimePickerModal
            locale="vi"
            minimumDate={startDate}
            isVisible={isOpenEnd}
            mode="date"
            onConfirm={(value) => handlePickTime(value, false)}
            onCancel={() => setIsOpenEnd(false)}
            cancelTextIOS="Hủy"
            confirmTextIOS="Xác nhận"
          />
        </View>
      )}

      {chosenFilter === 0 && (
        <View style={{ alignItems: "center", marginTop: 15 }}>
          <Text style={styles.title}>
            Thống kê{" "}
            {chosenQuarter &&
              chosenQuarter !== "Tất cả" &&
              `Quý ${chosenQuarter}, `}
            {chosenDay && chosenDay !== "Tất cả" && `ngày ${chosenDay} `}
            {chosenMonth && chosenMonth !== "Tất cả" && `tháng ${chosenMonth} `}
            {chosenYear && chosenYear !== "Tất cả" && `năm ${chosenYear}`}
          </Text>
        </View>
      )}

      {chosenFilter === 1 && (
        <View style={{ alignItems: "center", marginTop: 15 }}>
          <Text style={styles.title}>
            Thống kê {startDate ? `từ ngày ${formatDate(startDate)} ` : ""}
            {endDate ? `đến ngày ${formatDate(endDate)}` : ""}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 15,
  },

  titleSection: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  title: {
    fontFamily: "quicksand-semibold",
    fontSize: SIZE.size_14,
  },

  pickDate: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 17,
    paddingVertical: 13,
    gap: 10,
    backgroundColor: "#F1F1F1",
    width: "45%",
    justifyContent: "center",
    borderRadius: 8,
  },
});