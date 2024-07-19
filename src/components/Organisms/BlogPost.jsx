import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import icons from "../../constants/icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { SIZE } from "../../theme/fonts";
import images from "../../constants/images";
import CreateBlog from "./CreateBlog";

const feeds = [
  {
    avatar: images.avatar,
    userName: "anhddp",
    desc: "Nếu bạn thích cầu lông và muốn gặp gỡ những người đồng đội mới, hãy tham gia ngay! \n\nThời Gian: Mỗi cuối tuần, từ 9:00 sáng đến 12:00 trưa.\n\nĐịa Điểm: Sân cầu lông Sơn Hà, 123 Đường Cầu Lông, Quận ABC.\n\nHãy chuẩn bị cho những trận đấu sôi động và những kỷ niệm cầu lông đáng nhớ!",
    timeStamp: "15 phút trước",
    image: images.postImage,
    likes: 200,
    id: 1,
  },
  {
    avatar: images.avatar,
    userName: "anhddp",
    desc: "Nếu bạn thích cầu lông và muốn gặp gỡ những người đồng đội mới, hãy tham gia ngay! \n\nThời Gian: Mỗi cuối tuần, từ 9:00 sáng đến 12:00 trưa.\n\nĐịa Điểm: Sân cầu lông Sơn Hà, 123 Đường Cầu Lông, Quận ABC.\n\nHãy chuẩn bị cho những trận đấu sôi động và những kỷ niệm cầu lông đáng nhớ!",
    timeStamp: "15 phút trước",
    image: images.postImage,
    likes: 200,
    id: 2,
  },
  {
    avatar: images.avatar,
    userName: "anhddp",
    desc: "Nếu bạn thích cầu lông và muốn gặp gỡ những người đồng đội mới, hãy tham gia ngay! \n\nThời Gian: Mỗi cuối tuần, từ 9:00 sáng đến 12:00 trưa.\n\nĐịa Điểm: Sân cầu lông Sơn Hà, 123 Đường Cầu Lông, Quận ABC.\n\nHãy chuẩn bị cho những trận đấu sôi động và những kỷ niệm cầu lông đáng nhớ!",
    timeStamp: "15 phút trước",
    image: images.postImage,
    likes: 200,
    id: 3,
  },
];

const BlogPost = ({ navigation }) => {
  return (
    <FlatList
      data={feeds}
      renderItem={({ item, index }) => (
        <>
          <View style={styles.feedContainer}>
            <View style={styles.feedContent}>
              <View style={styles.postHeader}>
                <View style={styles.userInfo}>
                  <Image source={item.avatar} style={styles.avatar} />
                  <Text style={styles.username}>{item.userName}</Text>
                </View>
                <Text style={styles.timeStamp}>{item.timeStamp}</Text>
              </View>
              <Text style={styles.feedDesc}>{item.desc}</Text>
              <Image source={item.image} style={styles.postImage} />
              <View style={styles.likeContainer}>
                <Image source={icons.like} resizeMode="contain" />
                <Text style={styles.likeCount}>{item.likes} Likes</Text>
              </View>
            </View>
          </View>
          {index !== feeds.length - 1 && <View style={styles.bottomDivider} />}
        </>
      )}
      contentContainerStyle={{ marginLeft: 12, paddingBottom: 40 }}
      ListHeaderComponent={<CreateBlog navigation={navigation} />}
    />
  );
};

export default BlogPost;

const styles = StyleSheet.create({
  feedContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  postHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 5,
  },
  avatar: {
    width: 28,
    height: 28,
  },
  feedContent: {
    flex: 1,
    // marginLeft: 13,
    // width: "100%",
  },
  username: {
    fontSize: SIZE.size_14,
    fontFamily: "quicksand-bold",
    marginBottom: 5,
  },
  feedDesc: {
    fontFamily: "quicksand-medium",
    fontSize: SIZE.size_12,
    marginBottom: 5,
  },
  postImage: {
    width: "calc(100% -12)",
    height: 200,
    marginBottom: 10,
    marginRight: 12,
    borderRadius: 8,
  },
  timeStamp: {
    marginRight: 20,
    fontSize: SIZE.size_12,
    fontFamily: "quicksand-semibold",
    color: "#696969",
  },
  bottomDivider: {
    width: "calc(100% - 12)",
    height: 1,
    backgroundColor: "#E5E5E5",
    marginRight: 12,
    marginVertical: 20,
  },
  likeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  likeCount: {
    fontFamily: "quicksand-regular",
    fontSize: SIZE.size_12,
    marginLeft: 17,
  },
  postLine: {
    width: 2,
    // height: "100%",
    backgroundColor: "#EAEAEA",
    marginTop: 10,
  },
  left: {
    flexDirection: "column",
    alignItems: "center",
  },
});