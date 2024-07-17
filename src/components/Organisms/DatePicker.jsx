import {
  addDays,
  eachDayOfInterval,
  eachWeekOfInterval,
  format,
  formatDate,
  subDays,
} from "date-fns";
import React from "react";
import {
  View,
  Text,
  Button,
  Modal,
  StyleSheet,
  ScrollView,
  Dimensions,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { SIZE, WEIGHT } from "../../theme/fonts";
import { COLORS } from "../../theme/colors";
const { width, height } = Dimensions.get("window");

export default function DatePickerSlider({
  action,
  setChosenDate,
  chosenDate,
}) {
  const [currentIndex, setCurrentIndex] = React.useState(
    `${format(chosenDate, "d")}/${format(chosenDate, "M")}`
  );

  console.log("Data Picker", currentIndex);

  const checkIsToday = (day) => {
    if (
      format(day, "d") === format(new Date(), "d") &&
      format(day, "M") === format(new Date(), "M")
    ) {
      return "H.nay";
    } else {
      return formatDayOfWeek(format(day, "E"));
    }
  };

  const formatDayOfWeek = (dayOfWeek) => {
    switch (dayOfWeek) {
      case "Mon":
        return "Thứ 2";
      case "Tue":
        return "Thứ 3";
      case "Wed":
        return "Thứ 4";
      case "Thu":
        return "Thứ 5";
      case "Fri":
        return "Thứ 6";
      case "Sat":
        return "Thứ 7";
      case "Sun":
        return "C.Nhật";
      default:
        return "";
    }
  };

  const dates = eachWeekOfInterval(
    {
      start: subDays(new Date(), 0),
      end: addDays(new Date(), 30),
    },
    {
      weekStartsOn: 1,
    }
  ).reduce((acc, cur) => {
    const allDays = eachDayOfInterval({
      start: cur,
      end: addDays(cur, 6),
    });
    acc.push(allDays);
    return acc;
  }, []);

  function getIndex(index) {
    setCurrentIndex(index);
  }

  let x = 0;
  const renderItem = ({ item, index }) => {
    return (
      <View key={index} style={{ width: width }}>
        <View
          style={{
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-around",
          }}
        >
          {item.map((day, j) => {
            const txt = formatDayOfWeek(format(day, "E"));

            return (
              <TouchableOpacity
                key={format(day, "d")}
                onPress={() => {
                  action && action(true);
                  getIndex(`${format(day, "d")}/${format(day, "M")}`);
                  // action(day.toISOString());
                  setChosenDate(day.toISOString());
                }}
                style={{
                  width: 42,
                  height: 75,
                  borderWidth: 1,
                  borderColor:
                    currentIndex === `${format(day, "d")}/${format(day, "M")}`
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
                    height: 22.5,
                    alignContent: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{
                      fontSize: SIZE.size_10,
                      fontFamily: "quicksand-medium",
                      color:
                        format(day, "E") === "Sat" ||
                        format(day, "E") === "Sun" ||
                        format(day, "d") === format(new Date(), "d")
                          ? COLORS.orangeText
                          : COLORS.black,
                    }}
                  >
                    {checkIsToday(day)}
                  </Text>
                </View>
                <View
                  style={{
                    // display: "flex",
                    // flexDirection: 'column',
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor:
                      currentIndex === `${format(day, "d")}/${format(day, "M")}`
                        ? COLORS.orangeText
                        : format(day, "E") === "Sat" ||
                          format(day, "E") === "Sun"
                        ? COLORS.orangeBackground
                        : "#F1F1F1",
                    width: "100%",
                    height: 52.5,
                  }}
                >
                  <Text
                    style={{
                      fontSize: SIZE.size_14,
                      fontFamily: "quicksand-semibold",
                      alignItems: "baseline",
                      // backgroundColor: 'pink',
                      justifyContent: "center",
                      color:
                        currentIndex ===
                        `${format(day, "d")}/${format(day, "M")}`
                          ? COLORS.white
                          : format(day, "E") === "Sat" ||
                            format(day, "E") === "Sun"
                          ? COLORS.orangeText
                          : COLORS.black,
                    }}
                  >
                    {format(day, "d")}
                  </Text>
                  <Text
                    style={{
                      fontSize: SIZE.size_10,
                      fontFamily: "quicksand-medium",
                      color:
                        currentIndex ===
                        `${format(day, "d")}/${format(day, "M")}`
                          ? COLORS.white
                          : format(day, "E") === "Sat" ||
                            format(day, "E") === "Sun"
                          ? COLORS.orangeText
                          : COLORS.black,
                    }}
                  >
                    Th{format(item[0], "M")}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    );
  };

  return (
    <View>
      <View>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          data={dates}
          renderItem={renderItem}
        />
      </View>
    </View>
  );
}
