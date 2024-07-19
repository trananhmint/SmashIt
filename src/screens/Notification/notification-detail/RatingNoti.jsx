import { TouchableOpacity } from "react-native";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import NotificationInfo from "../../../components/Organisms/NotificationInfo";
import { SafeAreaView } from "react-native-safe-area-context";
import { SIZE } from "../../../theme/fonts";
import icons from "../../../constants/icons";
import Oops from "../../../components/Organisms/Oops";

const ratings = [
  // {
  //   title: "Trải nghiệm chơi của bạn như thế nào?",
  //   desc: "Do Dang ơi! Hãy đánh giá Sân cầu lông Sơn Tạ sau trải nghiệm chơi để chủ sân có thể hiểu rõ nhu cầu của người chơi hơn",
  //   timeStamp: "02 Th4, 16:10",
  //   id: 1,
  // },
  // {
  //   title: "Trải nghiệm chơi của bạn như thế nào?",
  //   desc: "Do Dang ơi! Hãy đánh giá Sân cầu lông Sơn Tạ sau trải nghiệm chơi để chủ sân có thể hiểu rõ nhu cầu của người chơi hơn",
  //   timeStamp: "02 Th4, 16:10",
  //   id: 2,
  // },
  // {
  //   title: "Trải nghiệm chơi của bạn như thế nào?",
  //   desc: "Do Dang ơi! Hãy đánh giá Sân cầu lông Sơn Tạ sau trải nghiệm chơi để chủ sân có thể hiểu rõ nhu cầu của người chơi hơn",
  //   timeStamp: "02 Th4, 16:10",
  //   id: 3,
  // },
  // {
  //   title: "Trải nghiệm chơi của bạn như thế nào?",
  //   desc: "Do Dang ơi! Hãy đánh giá Sân cầu lông Sơn Tạ sau trải nghiệm chơi để chủ sân có thể hiểu rõ nhu cầu của người chơi hơn",
  //   timeStamp: "02 Th4, 16:10",
  //   id: 4,
  // },
  // {
  //   title: "Trải nghiệm chơi của bạn như thế nào?",
  //   desc: "Do Dang ơi! Hãy đánh giá Sân cầu lông Sơn Tạ sau trải nghiệm chơi để chủ sân có thể hiểu rõ nhu cầu của người chơi hơn",
  //   timeStamp: "02 Th4, 16:10",
  //   id: 5,
  // },
  // {
  //   title: "Trải nghiệm chơi của bạn như thế nào?",
  //   desc: "Do Dang ơi! Hãy đánh giá Sân cầu lông Sơn Tạ sau trải nghiệm chơi để chủ sân có thể hiểu rõ nhu cầu của người chơi hơn",
  //   timeStamp: "02 Th4, 16:10",
  //   id: 6,
  // },
  // {
  //   title: "Trải nghiệm chơi của bạn như thế nào?",
  //   desc: "Do Dang ơi! Hãy đánh giá Sân cầu lông Sơn Tạ sau trải nghiệm chơi để chủ sân có thể hiểu rõ nhu cầu của người chơi hơn",
  //   timeStamp: "02 Th4, 16:10",
  //   id: 7,
  // },
  // {
  //   title: "Trải nghiệm chơi của bạn như thế nào?",
  //   desc: "Do Dang ơi! Hãy đánh giá Sân cầu lông Sơn Tạ sau trải nghiệm chơi để chủ sân có thể hiểu rõ nhu cầu của người chơi hơn",
  //   timeStamp: "02 Th4, 16:10",
  //   id: 8,
  // },
];

const RatingNoti = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <Image source={icons.goback} style={styles.goback} />
        </TouchableOpacity>
        <Text style={styles.title}>Đánh giá</Text>
      </View>

      {ratings?.length <= 0 ? (
        <Oops text={"Oops, hãy đặt sân và đánh giá để tích điêm nhé !"} />
      ) : (
        <NotificationInfo
          list={ratings}
          icon={icons.rating}
          navigateTo={"CourtRating"}
        />
      )}
    </View>
  );
};

export default RatingNoti;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: SIZE.size_20,
    fontFamily: "quicksand-bold",
  },
  header: {
    alignItems: "center",
    flexDirection: "row",
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 20,
    gap: 10,
  },
  goback: {
    width: 28,
    height: 28,
  },
});