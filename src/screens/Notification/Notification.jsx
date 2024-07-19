import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
// import NotificationTab from "./NotificationTab";
import NotificationInfo from "../../components/Organisms/NotificationInfo";
import icons from "../../constants/icons";
import HeaderBar from "../../components/Atoms/HeaderBar";
import { SIZE } from "../../theme/fonts";
import TabBar from "../../components/Molecules/TabBar";
import Oops from "../../components/Organisms/Oops";

const latestNews = [
  // {
  //   type: "feed",
  //   title: "anhddp đã thích bài viết của bạn",
  //   desc: "Nếu bạn thích cầu lông và muốn gặp gỡ những người đồng đội mới, hãy tham gia ngay!...",
  //   timeStamp: "02 Th4, 16:10",
  // },
  // {
  //   type: "book",
  //   title: "Đã đặt sân thành công!",
  //   desc: "Chúc mừng bạn đã đặt sân thành công tại Sân cầu lông Sơn Tạ, hãy kiểm tra lại thông tin trước khi check-in nhé! ",
  //   timeStamp: "02 Th4, 16:10",
  // },
  // {
  //   type: "rating",
  //   title: "Đã đặt sân thành công!",
  //   desc: "Chúc mừng bạn đã đặt sân thành công tại Sân cầu lông Sơn Tạ, hãy kiểm tra lại thông tin trước khi check-in nhé! ",
  //   timeStamp: "02 Th4, 16:10",
  // },
];

const notificationIcons = [
  {
    type: "feed",
    icon: icons.feed,
  },
  {
    type: "book",
    icon: icons.booking,
  },
  {
    type: "voucher",
    icon: icons.voucher,
  },
  {
    type: "rating",
    icon: icons.rating,
  },
];

const Notification = ({ navigation }) => {
  const getNotificationIcon = (type) => {
    const icon = notificationIcons.find((item) => item?.type === type);
    return icon ? icon.icon : null;
  };

  const handleNavigateToDetail = (route) => {
    navigation.navigate(route);
  };
  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity
        style={styles.notificationContainer}
        onPress={() => handleNavigateToDetail("OfferNoti")}
      >
        <Image source={icons.voucher} style={styles.icon} />
        <View style={styles.notiContent}>
          <Text style={styles.title}>Khuyến mãi</Text>
          {/* <Text style={styles.body} numberOfLines={1} ellipsizeMode="tail">
            Do Dang ơi! Nhớ điền đầy đủ thông tin để nhận hàng ngàn ưu đãii hàng
            ngàn ưu đãiihàng ngàn ưu đãiihàng ngàn ưu đãii
          </Text> */}
        </View>
        <Image source={icons.more} style={styles.more} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.notificationContainer}
        onPress={() => handleNavigateToDetail("BookingNoti")}
      >
        <Image source={icons.booking} style={styles.icon} />
        <View style={styles.notiContent}>
          <Text style={styles.title}>Thông tin đặt sân</Text>
          {/* <Text style={styles.body} numberOfLines={1} ellipsizeMode="tail">
            Bạn đã đặt sân thành công tại sân Quân Đội
          </Text> */}
        </View>
        <Image source={icons.more} style={styles.more} />
      </TouchableOpacity>
      {/* <TouchableOpacity
        style={styles.notificationContainer}
        onPress={() => handleNavigateToDetail("BlogNoti")}
      >
        <Image source={icons.feed} style={styles.icon} />
        <View style={styles.notiContent}>
          <Text style={styles.title}>Bảng tin</Text>
          <Text style={styles.body} numberOfLines={1} ellipsizeMode="tail">
            anhddp đã bày tỏ cảm xúc về bài viết của bạn
          </Text>
        </View>
        <Image source={icons.more} style={styles.more} />
      </TouchableOpacity> */}
      <TouchableOpacity
        style={styles.notificationContainer}
        onPress={() => handleNavigateToDetail("RatingNoti")}
      >
        <Image source={icons.rating} style={styles.icon} />
        <View style={styles.notiContent}>
          <Text style={styles.title}>Đánh giá</Text>
          {/* <Text style={styles.body} numberOfLines={1} ellipsizeMode="tail">
            Hãy đánh giá trải nghiệm của bạn tại sân Cầu lông Quân Đội
          </Text> */}
        </View>
        <Image source={icons.more} style={styles.more} />
      </TouchableOpacity>
      <View style={styles.latestNotification}>
        <Text style={styles.recent}>Thông báo gần đây</Text>

        {latestNews.length <= 0 ? (
          <View style={{ marginTop: 120 }}>
            <Oops text={"Oops, hiện tại chưa có thông báo !"} />
          </View>
        ) : (
          <View style={styles.recentContainer}>
            {latestNews.map((item, index) => (
              <View style={styles.recentView} key={index}>
                <Image
                  source={getNotificationIcon(item?.type)}
                  style={styles.icon}
                />
                <View style={styles.recentContent}>
                  <Text style={styles.recentTitle}>{item.title}</Text>
                  <Text
                    style={styles.recentBody}
                    numberOfLines={3}
                    ellipsizeMode="tail"
                  >
                    {item.desc}
                  </Text>
                  <Text style={styles.timeStamp}>{item.timeStamp}</Text>
                </View>
              </View>
            ))}
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default Notification;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    // paddingBottom: 30,
  },
  notificationContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    justifyContent: "space-between",
    marginBottom: 30,
  },
  notiContent: {
    flex: 1,
    marginLeft: 13,
    paddingRight: 3,
  },
  title: {
    fontSize: SIZE.size_14,
    fontFamily: "quicksand-bold",
  },
  body: {
    fontSize: SIZE.size_12,
    fontFamily: "quicksand-medium",
    marginTop: 2,
  },
  latestNotification: {
    flex: 1,
    marginTop: 10,
  },
  recentContainer: {
    paddingHorizontal: 12,
  },
  recent: {
    marginLeft: 12,
    fontSize: SIZE.size_16,
    fontFamily: "quicksand-bold",
    marginBottom: 25,
  },
  recentView: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 25,
    // justifyContent: "space-between",
  },
  recentContent: {
    flex: 1,
    marginLeft: 13,
    paddingRight: 12,
  },
  recentTitle: {
    fontSize: SIZE.size_14,
    fontFamily: "quicksand-semibold",
  },
  recentBody: {
    fontSize: SIZE.size_12,
    fontFamily: "quicksand-medium",
    marginTop: 2,
  },
  timeStamp: {
    marginTop: 8,
    fontSize: SIZE.size_12,
    fontFamily: "quicksand-semibold",
    color: "#8C8C8C",
  },
});