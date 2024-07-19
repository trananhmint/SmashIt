import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { COLORS } from "../../theme/colors";

export default function TabBar({
  tabItem,
  setTab,
  currentTab,
  fontSize,
  tabBarStyle,
}) {
  const handleChangeTab = (value) => {
    if (currentTab === value) {
      console.log("NNN");
      return;
    } else {
      setTab(value);
    }
  };

  return (
    <View style={[styles.tabBar, tabBarStyle]}>
      {tabItem.map((item) => {
        const isActive = item.id === currentTab;
        return (
          <TouchableOpacity
            style={[styles.tabItem, isActive && styles.tabItemActive]}
            key={item.id}
            onPress={() => handleChangeTab(item.id)}
          >
            <Text
              style={[
                { fontSize: fontSize },
                styles.tabText,
                isActive && styles.tabTextActive,
              ]}
            >
              {item.name}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    paddingHorizontal: 20,
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  tabItem: {
    paddingVertical: 15,
    paddingHorizontal: 10,
  },

  tabItemActive: {
    borderBottomColor: COLORS.orangeText,
    borderBottomWidth: 1,
  },

  tabText: {
    fontFamily: "quicksand-semibold",
  },

  tabTextActive: {
    fontFamily: "quicksand-bold",
    color: COLORS.orangeText,
  },
});
