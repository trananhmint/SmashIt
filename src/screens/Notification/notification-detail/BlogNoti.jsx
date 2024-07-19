import { TouchableOpacity } from "react-native";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import NotificationInfo from "../../../components/Organisms/NotificationInfo";
import { SafeAreaView } from "react-native-safe-area-context";
import { SIZE } from "../../../theme/fonts";
import icons from "../../../constants/icons";

const blogs = [
  {
    title: "anhddp đã thích bài viết của bạn",
    desc: "Nếu bạn thích cầu lông và muốn gặp gỡ những người đồng đội mới, hãy tham gia ngay!...",
    timeStamp: "02 Th4, 16:10",
    id: 1,
  },
  {
    title: "anhddp đã thích bài viết của bạn",
    desc: "Nếu bạn thích cầu lông và muốn gặp gỡ những người đồng đội mới, hãy tham gia ngay!...",
    timeStamp: "02 Th4, 16:10",
    id: 2,
  },
  {
    title: "anhddp đã thích bài viết của bạn",
    desc: "Nếu bạn thích cầu lông và muốn gặp gỡ những người đồng đội mới, hãy tham gia ngay!...",
    timeStamp: "02 Th4, 16:10",
    id: 3,
  },
  {
    title: "anhddp đã thích bài viết của bạn",
    desc: "Nếu bạn thích cầu lông và muốn gặp gỡ những người đồng đội mới, hãy tham gia ngay!...",
    timeStamp: "02 Th4, 16:10",
    id: 4,
  },
  {
    title: "anhddp đã thích bài viết của bạn",
    desc: "Nếu bạn thích cầu lông và muốn gặp gỡ những người đồng đội mới, hãy tham gia ngay!...",
    timeStamp: "02 Th4, 16:10",
    id: 5,
  },
  {
    title: "anhddp đã thích bài viết của bạn",
    desc: "Nếu bạn thích cầu lông và muốn gặp gỡ những người đồng đội mới, hãy tham gia ngay!...",
    timeStamp: "02 Th4, 16:10",
    id: 6,
  },
  {
    title: "anhddp đã thích bài viết của bạn",
    desc: "Nếu bạn thích cầu lông và muốn gặp gỡ những người đồng đội mới, hãy tham gia ngay!...",
    timeStamp: "02 Th4, 16:10",
    id: 7,
  },
  {
    title: "anhddp đã thích bài viết của bạn",
    desc: "Nếu bạn thích cầu lông và muốn gặp gỡ những người đồng đội mới, hãy tham gia ngay!...",
    timeStamp: "02 Th4, 16:10",
    id: 8,
  },
];

const BlogNoti = ({ notificationList, icon, navigation, title }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <Image source={icons.goback} style={styles.goback} />
        </TouchableOpacity>
        <Text style={styles.title}>Bảng tin</Text>
      </View>
      <NotificationInfo list={blogs} icon={icons.feed} />
    </View>
  );
};

export default BlogNoti;

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