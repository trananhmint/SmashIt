import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import Notification from "./Notification";
import { SafeAreaView } from "react-native-safe-area-context";
import NewsFeed from "./NewsFeed";
import { SIZE } from "../../theme/fonts";
import { COLORS } from "../../theme/colors";

// const tabs = [
//   {
//     name: "Bảng tin",
//     component: NewsFeed,
//   },
//   {
//     name: "Thông báo",
//     component: Notification,
//   },
// ];

const NotificationLayout = ({ navigation }) => {
  // const [activeTab, setActiveTab] = useState(tabs[1]);

  // const handleChangeTab = (name) => {
  //   const selectedTab = tabs.find((item) => item.name === name);
  //   setActiveTab(selectedTab);
  // };

  return (
    <View style={styles.container}>
      {/* <ScrollView> */}
      <View style={styles.container}>
        <Text style={styles.title}>Thông báo</Text>
        {/* <View style={styles.tabContainer}>
          {tabs.map((item) => (
            <TouchableOpacity
              style={
                activeTab.name === item.name ? styles.activeTab : styles.tab
              }
              key={item.name}
              onPress={() => handleChangeTab(item.name)}
              activeOpacity={0.7}
            >
              <Text
                style={
                  activeTab.name === item.name ? styles.activeText : styles.text
                }
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View> */}
        <View style={styles.contentContainer}>
          <Notification navigation={navigation} />
        </View>
      </View>
      {/* </ScrollView> */}
    </View>
  );
};

export default NotificationLayout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // paddingBottom: 40,
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
    marginBottom: 20,
  },
  tab: {
    alignItems: "center",
    justifyContent: "center",
    width: 160,
    borderRadius: 20,
    backgroundColor: COLORS.orangeBackground,
    paddingVertical: 7,
  },
  activeTab: {
    alignItems: "center",
    justifyContent: "center",
    width: 180,
    borderRadius: 20,
    backgroundColor: COLORS.orangeText,
    paddingVertical: 7,
  },
  text: {
    fontSize: SIZE.size_16,
    fontFamily: "quicksand-bold",
    color: COLORS.orangeText,
  },
  activeText: {
    fontSize: SIZE.size_16,
    fontFamily: "quicksand-bold",
    color: "white",
  },
  contentContainer: {
    flex: 1,
  },
  title: {
    fontSize: SIZE.size_20,
    fontFamily: "quicksand-bold",
    color: "black",
    marginLeft: 20,
    marginBottom: 30,
    marginTop: 20,
  },
});