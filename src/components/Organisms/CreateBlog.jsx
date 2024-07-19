import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useEffect, useRef, useState } from "react";
import icons from "../../constants/icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { SIZE } from "../../theme/fonts";
import images from "../../constants/images";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../../context/AuthContext";

const CreateBlog = ({}) => {
  const { user } = useContext(AuthContext);

  const navigation = useNavigation();
  return (
    <>
      <TouchableOpacity
        style={styles.feedContainer}
        onPress={() => navigation.navigate("CreatePost")}
      >
        <View style={styles.feedContent}>
          <View style={styles.postHeader}>
            <View style={styles.userInfo}>
              <Image source={images.avatar} style={styles.avatar} />
              <Text style={styles.username}>{user?.fullName}</Text>
            </View>
          </View>
          <Text style={styles.write}>Hãy viết cảm nghĩ của bạn...</Text>
        </View>
      </TouchableOpacity>
      <View style={styles.divider}></View>
    </>
  );
};

export default CreateBlog;

const styles = StyleSheet.create({
  feedContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    // marginLeft: 12,
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
  write: {
    fontSize: SIZE.size_14,
    fontFamily: "quicksand-medium",
  },

  divider: {
    width: "calc(100% - 12)",
    height: 1,
    backgroundColor: "#E5E5E5",
    marginRight: 12,
    marginVertical: 20,
  },
});
