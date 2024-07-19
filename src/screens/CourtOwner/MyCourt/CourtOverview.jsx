import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { SIZE } from "../../../theme/fonts";
import Divider from "../../../components/Atoms/Divider";
// import ChipList from "../../../components/Organisms/ChipList";
import ChipList from "../../../components/Molecules/ChipList";
import { COLORS } from "../../../theme/colors";
import { formatNumber } from "../../../utils";
import VectorIcon from "../../../components/Atoms/VectorIcon";
import { useIsFocused } from "@react-navigation/native";
import { useRef } from "react";
import ServiceCourtService from "../../../services/court-service.service";
import { CourtOwnerContext } from "../../../context/CourtOwnerContext";
import { AuthContext } from "../../../context/AuthContext";
import Loading from "../../../components/Molecules/Loading";

export default function CourtOverview() {
  const { courtInfo, courtService, setCourtService } =
    useContext(CourtOwnerContext);

  const { token } = useContext(AuthContext);

  const [isLoadingService, setIsLoadingService] = useState(true);

  const conditionList = [
    "Đặt sân theo giờ cố định và thông báo trước để tránh xung đột về thời gian.",
    "Tuân theo giờ đã đặt và không sử dụng sân lâu hơn thời gian đã định",
    "Mặc trang phục thích hợp và giày thể thao không làm hỏng bề mặt sân.",
    "Giữ sân sạch sẽ và không làm hỏng hạng mục cầu lông hoặc cơ sở vật chất.",
  ];

  const fetchServiceList = async () => {
    const res = await ServiceCourtService.getCourtServiceByCourtId(
      courtInfo?.id,
      token
    );

    if (res) {
      setCourtService(res.services);
      setIsLoadingService(false);
    }
  };

  const isFocus = useIsFocused();
  const scrollViewRef = useRef(null);

  useEffect(() => {
    if (isFocus) {
      if (scrollViewRef.current) {
        scrollViewRef.current.scrollTo({ y: 0, animated: true });
      }
    }
  }, [isFocus]);

  useEffect(() => {
    fetchServiceList();
  }, []);

  return (
    <ScrollView
      ref={scrollViewRef}
      style={{ flex: 1 }}
      scrollsToTop={isFocus}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      <View style={styles.section}>
        <Text style={[styles.title, { marginBottom: 10 }]}>
          Sân cầu lông {courtInfo?.courtName}
        </Text>

        <Text style={styles.address}>{courtInfo?.address}</Text>
      </View>

      <Divider color={"#E8E8E8"} orientation={"horizontal"} />

      <View
        style={[
          styles.section,
          {
            flexDirection: "row",
            justifyContent: "space-between",
          },
        ]}
      >
        <View style={styles.courtInfoItem}>
          <Text style={styles.itemSecondaryText}>Ngày thường</Text>
          <Text style={styles.itemPrimaryText}>
            {formatNumber(courtInfo?.pricePerHour)}đ{" "}
            <Text style={{ color: "#5B5B5B" }}>/ giờ</Text>
          </Text>
        </View>
        <View style={styles.courtInfoItem}>
          <Text style={styles.itemSecondaryText}>Cuối tuần</Text>
          <Text style={styles.itemPrimaryText}>
            {formatNumber(courtInfo.priceAtWeekend)}đ{" "}
            <Text style={{ color: "#5B5B5B" }}>/ giờ</Text>
          </Text>
        </View>
        <View style={styles.courtInfoItem}>
          <Text style={styles.itemSecondaryText}>Ngày lễ</Text>
          <Text style={styles.itemPrimaryText}>
            {formatNumber(courtInfo.priceAtHoliday)}đ{" "}
            <Text style={{ color: "#5B5B5B" }}>/ giờ</Text>
          </Text>
        </View>
        {/* <View style={styles.courtInfoItem}>
          <Text style={styles.itemSecondaryText}>Lượt đánh giá</Text>
          <View style={styles.ratingSection}>
            <VectorIcon.AntDesign name="star" color={"#F49831"} size={16} />
            <Text style={[styles.itemPrimaryText, { color: COLORS.black }]}>
              5.0 <Text style={{ color: "#5B5B5B" }}>(1711)</Text>
            </Text>
          </View>
        </View> */}
      </View>

      <Divider color={"#E8E8E8"} orientation={"horizontal"} />

      <View style={styles.section}>
        <Text style={[styles.title, { marginBottom: 15 }]}>Cơ sở vật chất</Text>

        {isLoadingService ? (
          <Loading />
        ) : (
          <ChipList
            dataList={courtService}
            borderColor={"rgba(217, 217, 217, 0.5)"}
            backgroundColor={COLORS.white}
            textFamily={"quicksand-regular"}
            chipStyle={{ paddingVertical: 10, paddingHorizontal: 12 }}
          />
        )}
      </View>

      <Divider color={"#E8E8E8"} orientation={"horizontal"} />

      <View style={styles.section}>
        <Text style={[styles.title, { marginBottom: 15 }]}>
          Quy định sử dụng sân
        </Text>
        <View style={{ flex: 1, gap: 5, paddingHorizontal: 5 }}>
          {conditionList.map((data, index) => {
            return (
              <View key={index} style={{ flexDirection: "row", gap: 8 }}>
                <Text>{"\u2022"}</Text>

                <Text style={styles.conditionText}>{data}</Text>
              </View>
            );
          })}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 20,
  },

  section: {
    flex: 1,
  },

  title: {
    fontSize: SIZE.size_16,
    fontFamily: "quicksand-semibold",
  },

  address: {
    fontSize: SIZE.size_14,
    color: "#5B5B5B",
    fontFamily: "quicksand-medium",
  },

  conditionText: {
    fontSize: SIZE.size_14,
    fontFamily: "quicksand-regular",
    flex: 1,
  },

  courtInfoItem: {
    gap: 5,
  },

  itemPrimaryText: {
    fontSize: SIZE.size_14,
    fontFamily: "quicksand-semibold",
    color: COLORS.darkGreenText,
  },

  itemSecondaryText: {
    fontSize: SIZE.size_10,
    fontFamily: "quicksand-medium",
  },

  ratingSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
});