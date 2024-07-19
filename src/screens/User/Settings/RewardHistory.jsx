import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderBar from "../../../components/Atoms/HeaderBar";
import icons from "../../../constants/icons";
import { render } from "react-native-web";
import images from "../../../constants/images";
import { SIZE } from "../../../theme/fonts";
import { useNavigation } from "@react-navigation/native";
// import { useNavigation } from "expo-router";

const history = [
  {
    type: "booking",
    title: "Lượt đặt sân",
    desc: "Điểm được nhận từ đặt sân thành công tại Sân cầu lông Sơn Tạ",
    timeStamp: "02 Th4, 16:10",
    points: 10,
    id: 1,
  },
  {
    type: "rating",
    title: "Lượt đánh giá",
    desc: "Điểm được nhận từ đánh giá tại Sân cầu lông Sơn Tạ",
    timeStamp: "02 Th4, 16:10",
    points: 10,
    id: 2,
  },
  {
    type: "rating",
    title: "Lượt đánh giá",
    desc: "Điểm được nhận từ đánh giá tại Sân cầu lông Sơn Tạ",
    timeStamp: "02 Th4, 16:10",
    points: 10,
    id: 2,
  },
  {
    type: "rating",
    title: "Lượt đánh giá",
    desc: "Điểm được nhận từ đánh giá tại Sân cầu lông Sơn Tạ",
    timeStamp: "02 Th4, 16:10",
    points: 10,
    id: 2,
  },
  {
    type: "rating",
    title: "Lượt đánh giá",
    desc: "Điểm được nhận từ đánh giá tại Sân cầu lông Sơn Tạ",
    timeStamp: "02 Th4, 16:10",
    points: 10,
    id: 2,
  },
  {
    type: "rating",
    title: "Lượt đánh giá",
    desc: "Điểm được nhận từ đánh giá tại Sân cầu lông Sơn Tạ",
    timeStamp: "02 Th4, 16:10",
    points: 10,
    id: 2,
  },
  {
    type: "rating",
    title: "Lượt đánh giá",
    desc: "Điểm được nhận từ đánh giá tại Sân cầu lông Sơn Tạ",
    timeStamp: "02 Th4, 16:10",
    points: 10,
    id: 2,
  },
];

const pointIcons = {
  booking: icons.book,
  rating: icons.rates,
};

const RewardHistory = () => {
  const navigation = useNavigation();
  const getIcon = (type) => {
    return pointIcons[type] || null;
  };
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <HeaderBar
        isGoBack={true}
        text={"Lịch sử tích điểm"}
        goBack={() => navigation.goBack()}
      />
      <ScrollView contentContainerStyle={styles.historyContainer}>
        {history.map((item, index) => (
          <>
            <View key={item.id} style={styles.historyItem}>
              <Image source={getIcon(item?.type)} style={styles.icon} />
              <View style={styles.textContainer}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.desc}>{item.desc}</Text>
                <Text style={styles.timeStamp}>{item.timeStamp}</Text>
              </View>
              <View style={styles.iconContainer}>
                <Text
                  style={{
                    color: "#2A9083",
                    fontSize: SIZE.size_14,
                    fontFamily: "quicksand-semibold",
                  }}
                >
                  +
                </Text>
                <View style={styles.iconSmall}>
                  <Image
                    source={icons.bad_white}
                    style={{ width: 12, height: 12 }}
                    resizeMode="contain"
                  />
                </View>
                <Text style={styles.points}>{item.points}</Text>
              </View>
            </View>
            {index !== history.length - 1 && (
              <View style={styles.bottomDivider} />
            )}
          </>
        ))}
      </ScrollView>
    </View>
  );
};

export default RewardHistory;

const styles = StyleSheet.create({
  historyContainer: {
    paddingHorizontal: 15,
    paddingTop: 20,
    paddingBottom: 40,
  },
  historyItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 15,
  },
  icon: {
    width: 44,
    height: 44,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: SIZE.size_14,
    fontFamily: "quicksand-semibold",
    marginBottom: 5,
  },
  desc: {
    fontSize: SIZE.size_12,
    fontFamily: "quicksand-medium",
    marginBottom: 8,
  },
  timeStamp: {
    fontSize: SIZE.size_12,
    fontFamily: "quicksand-semibold",
    color: "#8C8C8C",
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  coin: {
    width: 16,
    height: 16,
  },
  points: {
    fontSize: SIZE.size_14,
    fontFamily: "quicksand-semibold",
    color: "#2A9083",
  },
  bottomDivider: {
    height: 1,
    backgroundColor: "#E5E5E5",
    marginVertical: 20,
  },
  iconSmall: {
    borderRadius: 100,
    backgroundColor: "#2A9083",
    padding: 3,
    alignItems: "center",
    justifyContent: "center",
  },
});
