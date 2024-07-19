import { StyleSheet, Text, View } from "react-native";
import React from "react";
import BlogPost from "../../components/Organisms/BlogPost";
import CreateBlog from "../../components/Organisms/CreateBlog";

const NewsFeed = ({ navigation }) => {
  return (
    <View>
      <BlogPost navigation={navigation} />
    </View>
  );
};

export default NewsFeed;

const styles = StyleSheet.create({
  divider: {
    width: "calc(100% - 12)",
    height: 1,
    backgroundColor: "#E5E5E5",
    marginRight: 12,
    marginVertical: 20,
  },
});