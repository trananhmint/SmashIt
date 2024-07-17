import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import icons from "../../constants/icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { SIZE } from "../../theme/fonts";
import VectorIcon from "../Atoms/VectorIcon";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";

const NotificationInfo = ({ list, icon, navigateTo }) => {
  const navigation = useNavigation();
  const route = useRoute();
  return (
    <FlatList
      data={list}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item, index }) => (
        <>
          <View style={styles.feedContainer}>
            <Image
              source={icon}
              resizeMode="contain"
              style={{ marginTop: 8 }}
            />
            <View style={styles.feedContent}>
              <Text style={styles.feedTitle}>{item.title}</Text>
              <Text style={styles.feedDesc}>{item.desc}</Text>
              <View style={styles.notiFooter}>
                <Text style={styles.timeStamp}>{item.timeStamp}</Text>
                <TouchableOpacity
                  style={styles.footerMore}
                  activeOpacity={0.7}
                  onPress={() => navigation.navigate(navigateTo)}
                >
                  <Text style={styles.moreText}>
                    {route.name === "RatingNoti" ? "Đánh giá" : "Xem"}
                  </Text>
                  <MaterialCommunityIcons
                    name="chevron-right"
                    size={18}
                    style={{ marginTop: 4 }}
                    color={"#8C8C8C"}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          {index !== list.length - 1 && <View style={styles.bottomDivider} />}
        </>
      )}
      contentContainerStyle={styles.flatListContentContainer}
    />
  );
};

export default NotificationInfo;

const styles = StyleSheet.create({
  title: {
    fontSize: SIZE.size_20,
    fontFamily: "quicksand-semibold",
    marginBottom: 20,
    marginLeft: 20,
    marginTop: 20,
  },
  feedContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingHorizontal: 15, // Add horizontal padding to ensure content isn't cut off
    paddingVertical: 10, // Add vertical padding
  },
  feedContent: {
    flex: 1,
    marginLeft: 13,
  },
  feedTitle: {
    fontFamily: "quicksand-semibold",
    fontSize: SIZE.size_14,
    marginBottom: 5,
  },
  feedDesc: {
    fontFamily: "quicksand-medium",
    fontSize: SIZE.size_12,
    marginBottom: 8,
  },
  timeStamp: {
    fontFamily: "quicksand-semibold",
    fontSize: SIZE.size_12,
    color: "#8C8C8C",
  },
  bottomDivider: {
    height: 1,
    backgroundColor: "#E5E5E5",
    marginVertical: 10,
  },
  flatListContentContainer: {
    paddingBottom: 20, // Add bottom padding to ensure last item is not cut off
  },
  notiFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  footerMore: {
    flexDirection: "row",
    alignItems: "center",
  },
  moreText: {
    fontFamily: "quicksand-semibold",
    fontSize: SIZE.size_12,
    color: "#8C8C8C",
  },
});
