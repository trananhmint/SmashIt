import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { COLORS } from "../../../theme/colors";
import HeaderBar from "../../../components/Atoms/HeaderBar";
import VectorIcon from "../../../components/Atoms/VectorIcon";
import DatePickerSlider from "../../../components/Organisms/DatePicker";
import { formatDate, formatNumber } from "../../../utils";
import { SIZE } from "../../../theme/fonts";
import ChipList from "../../../components/Molecules/ChipList";
import Divider from "../../../components/Atoms/Divider";
import TimeFilter from "../../../components/Organisms/TimeFilter";
import Oops from "../../../components/Organisms/Oops";

export default function Revenue({ navigation }) {
  const [chosenMonth, setChosenMonth] = useState("Tháng 3, 2024");

  const [chosenDate, setChosenDate] = useState(new Date());

  const [chosenFilter, setChosenFilter] = useState(0);

  const bookedList = [
    // {
    //   name: "Ngọc Nghi",
    //   time: "17 Th11, 20:03",
    //   total: 171100,
    //   paymentMethod: "MoMo",
    //   slotDetail: [
    //     {
    //       courtCode: "Sân 1",
    //       slotList: [
    //         "11:00-11:30",
    //         "11:00-11:30",
    //         "11:00-11:30",
    //         "11:00-11:30",
    //         "11:00-11:30",
    //         "11:00-11:30",
    //       ],
    //     },
    //     {
    //       courtCode: "Sân 2",
    //       slotList: [
    //         "11:00-11:30",
    //         "11:00-11:30",
    //         "11:00-11:30",
    //         "11:00-11:30",
    //         "11:00-11:30",
    //         "11:00-11:30",
    //       ],
    //     },
    //   ],
    // },
    // {
    //   name: "Ngọc Nghi",
    //   time: "17 Th11, 20:03",
    //   total: 171100,
    //   paymentMethod: "MoMo",
    //   slotDetail: [
    //     {
    //       courtCode: "Sân 1",
    //       slotList: [
    //         "11:00-11:30",
    //         "11:00-11:30",
    //         "11:00-11:30",
    //         "11:00-11:30",
    //         "11:00-11:30",
    //         "11:00-11:30",
    //       ],
    //     },
    //     {
    //       courtCode: "Sân 2",
    //       slotList: [
    //         "11:00-11:30",
    //         "11:00-11:30",
    //         "11:00-11:30",
    //         "11:00-11:30",
    //         "11:00-11:30",
    //         "11:00-11:30",
    //       ],
    //     },
    //   ],
    // },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.white }}>
      <HeaderBar
        goBack={() => navigation.goBack()}
        isGoBack={true}
        text={"Doanh thu sân"}
      />
      <View style={styles.container}>
        <View style={styles.revenueMonth}>
          <TimeFilter
            chosenFilter={chosenFilter}
            setChosenFilter={setChosenFilter}
          />
        </View>

        <View
          style={{
            flex: 1,
            paddingHorizontal: 15,
            marginVertical: 30,
            gap: 15,
          }}
        >
          <View style={styles.textItem}>
            <Text style={styles.boldText}>Tổng doanh thu</Text>
            <Text style={[styles.boldText, { color: COLORS.darkGreenText }]}>
              {formatNumber(0)}đ
            </Text>
          </View>

          {bookedList?.length <= 0 ? (
            <View style={{ flex: 1, paddingBottom: 30 }}>
              <Oops text={"Oops, chưa có thống kê !"} />
            </View>
          ) : (
            <FlatList
              showsVerticalScrollIndicator={false}
              data={bookedList}
              style={{ flex: 1, marginTop: 30 }}
              contentContainerStyle={{ gap: 20, marginBottom: 20 }}
              renderItem={({ item, index }) => {
                return (
                  <View style={styles.item}>
                    <View
                      style={{
                        gap: 10,
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <View style={styles.bookedInfo}>
                        <Text styles={[styles.mediumText, { lineHeight: 22 }]}>
                          Tên KH:
                        </Text>
                        <Text styles={[styles.mediumText, { lineHeight: 22 }]}>
                          Thời gian:
                        </Text>
                      </View>

                      <View style={styles.bookedInfo}>
                        <Text
                          style={[
                            styles.semiboldText,
                            { fontSize: SIZE.size_14 },
                          ]}
                        >
                          Nguyễn Ngọc Nghi
                        </Text>
                        <Text
                          style={[
                            styles.semiboldText,
                            { fontSize: SIZE.size_14 },
                          ]}
                        >
                          17 Th11, 20:03
                        </Text>
                      </View>
                    </View>

                    {item.slotDetail.map((court, index) => {
                      return (
                        <View key={index} style={styles.bookedSlot}>
                          <View style={styles.courtCode}>
                            <Text
                              style={[
                                styles.semiboldText,
                                { color: COLORS.white, fontSize: SIZE.size_14 },
                              ]}
                            >
                              {court.courtCode}
                            </Text>
                          </View>

                          <View
                            style={{
                              flexDirection: "row",
                              gap: 10,
                              marginTop: 10,
                              paddingLeft: 10,
                              alignItems: "center",
                            }}
                          >
                            <Divider
                              orientation={"vertical"}
                              color={"#CECECE"}
                            />
                            <ChipList
                              isHorizontal={false}
                              backgroundColor={COLORS.orangeBackground}
                              textColor={COLORS.orangeText}
                              borderRadius={8}
                              borderColor={COLORS.orangeBackground}
                              textFamily={"quicksand-semibold"}
                              dataList={court.slotList}
                              chipStyle={{
                                paddingHorizontal: 13,
                                paddingVertical: 3,
                              }}
                              listStyle={{ columnGap: 10 }}
                            />
                          </View>
                        </View>
                      );
                    })}

                    <View
                      style={{
                        gap: 10,
                        flexDirection: "row",
                        alignItems: "center",
                        marginTop: 13,
                        marginBottom: 20,
                      }}
                    >
                      <View style={styles.bookedInfo}>
                        <Text styles={[styles.mediumText]}>
                          Tổng thanh toán:
                        </Text>
                        <Text styles={[styles.mediumText]}>Hình thức:</Text>
                      </View>

                      <View style={styles.bookedInfo}>
                        <Text
                          style={[
                            styles.semiboldText,
                            {
                              fontSize: SIZE.size_14,
                              color: COLORS.darkGreenText,
                            },
                          ]}
                        >
                          {formatNumber(item.total)}đ
                        </Text>
                        <Text
                          style={[
                            styles.semiboldText,
                            { fontSize: SIZE.size_14 },
                          ]}
                        >
                          {item.paymentMethod}
                        </Text>
                      </View>
                    </View>

                    {index < bookedList.length - 1 && (
                      <Divider orientation={"horizontal"} color={"#C8C8C8"} />
                    )}
                  </View>
                );
              }}
            />
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  text: {
    fontSize: SIZE.size_16,
    fontFamily: "quicksand-bold",
  },

  dot: {
    height: 6,
    width: 6,
    borderRadius: 8,
    backgroundColor: COLORS.darkGreenText,
  },

  revenueMonth: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    alignSelf: "center",
    paddingVertical: 20,
    paddingHorizontal: 15,
  },

  textItem: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  boldText: {
    fontFamily: "quicksand-bold",
    fontSize: SIZE.size_14,
  },

  semiboldText: {
    fontFamily: "quicksand-semibold",
    fontSize: SIZE.size_12,
  },

  mediumText: {
    fontFamily: "quicksand-medium",
    fontSize: SIZE.size_14,
  },

  item: {},

  bookedInfo: {
    gap: 10,
  },

  bookedSlot: {
    marginTop: 13,
  },

  courtCode: {
    backgroundColor: COLORS.orangeText,
    paddingVertical: 3,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    width: 56,
  },

  paymentMethod: {},
});
