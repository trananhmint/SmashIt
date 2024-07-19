import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import Comment from "../../../components/Organisms/Comment";
import { SIZE } from "../../../theme/fonts";
import Oops from "../../../components/Organisms/Oops";

export default function CourtFeedback() {
  const commentList = [
    // {
    //   id: 1,
    //   name: "NNN",
    //   comment:
    //     "App tuyệt nhất chưa từng thấy, nó giúp tôi đặt sân nhanh chóng và dễ dàng",
    //   starRating: 2,
    //   date: "20111031",
    // },
    // {
    //   id: 2,
    //   name: "NNN",
    //   comment:
    //     "App tuyệt nhất chưa từng thấy, nó giúp tôi đặt sân nhanh chóng và dễ dàng",
    //   starRating: 3,
    //   date: "20111031",
    // },
  ];

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { marginBottom: 15 }]}>
        Đánh giá ({commentList.length})
      </Text>

      {commentList?.length <= 0 ? (
        <Oops text={"Oops, hiện tại sân chưa có đánh giá"} />
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ gap: 25 }}
          data={commentList}
          renderItem={({ item }) => {
            return (
              <Comment
                key={item.id}
                comment={item.comment}
                date={item.date}
                name={item.name}
                starRating={item.starRating}
              />
            );
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 20,
  },

  title: {
    fontSize: SIZE.size_16,
    fontFamily: "quicksand-semibold",
  },
});