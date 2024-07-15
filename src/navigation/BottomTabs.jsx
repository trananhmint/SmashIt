import { View, Text, StyleSheet } from "react-native";
import React, { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import AntDesign from "react-native-vector-icons/AntDesign";
import Feather from "react-native-vector-icons/Feather";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons";
import { SIZE } from "../theme/fonts";
import MyCourt from "../screens/CourtOwner/MyCourt/MyCourt";
import CourtOwnerProfile from "../screens/CourtOwner/Settings/CourtOwnerProfile";
import MyProfile from "../screens/User/Settings/MyProfile";
// import NotificationManagement from "../screens/Notification/NotificationManagement";
import SearchCourt from "../screens/User/Court/SearchCourt";
import Trading from "../screens/Trading/Trading";
import BookedHistory from "../screens/User/Booking/BookedHistory";
import NotificationLayout from "../screens/Notification/NotificationLayout";
import { AuthContext } from "../context/AuthContext";
import Settings from "../screens/User/Settings/Settings";
import BookingCourt from "../screens/User/Booking/BookingCourt";
import Home_CourtOwner from "../screens/CourtOwner/Home_CourtOwner";
import { COLORS } from "../theme/colors";

export default function BottomTabs() {
  const Tab = createBottomTabNavigator();

  const { firstRegister, chosenRole } = useContext(AuthContext);

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: { width: "100%", height: undefined, aspectRatio: 5.5 },
      }}
    >
      <Tab.Screen
        name="Home"
        component={chosenRole === "player" ? Home : Home_CourtOwner}
        options={{
          headerShown: false,
          tabBarLabel: () => null,
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <Feather
                name="home"
                size={22}
                color={focused ? COLORS.orangeText : "#676767"}
              />
              <Text
                style={[
                  styles.text,
                  focused ? { color: COLORS.orangeText } : { color: "#676767" },
                ]}
              >
                Trang chủ
              </Text>
            </View>
          ),
        }}
      />
      {/* <Tab.Screen
        name="Trade"
        component={Trading}
        options={{
          headerShown: false,
          tabBarLabel: () => null,
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <Ionicons
                name="storefront-outline"
                size={22}
                color={focused ?  COLORS.orangeText : "#676767"}
              />
              <Text
                style={[
                  styles.text,
                  focused ? { color:  COLORS.orangeText } : { color: "#676767" },
                ]}
              >
                Trao đổi
              </Text>
            </View>
          ),
        }}
      /> */}

      {chosenRole === "player" && (
        <Tab.Screen
          name="Search"
          component={SearchCourt}
          options={{
            headerShown: false,
            tabBarLabel: () => null,
            tabBarIcon: ({ focused }) => (
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <FontAwesome
                  name="calendar-minus-o"
                  size={22}
                  color={focused ? COLORS.orangeText : "#676767"}
                />
                <Text
                  style={[
                    styles.text,
                    focused
                      ? { color: COLORS.orangeText }
                      : { color: "#676767" },
                  ]}
                >
                  Đặt sân
                </Text>
              </View>
            ),
          }}
        />
      )}

      {chosenRole === "courtOwner" && (
        <Tab.Screen
          name="BookingManagement"
          component={MyCourt}
          options={{
            headerShown: false,
            tabBarLabel: () => null,
            tabBarIcon: ({ focused }) => (
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <FontAwesome
                  name="calendar-minus-o"
                  size={22}
                  color={focused ? COLORS.orangeText : "#676767"}
                />
                <Text
                  style={[
                    styles.text,
                    focused
                      ? { color: COLORS.orangeText }
                      : { color: "#676767" },
                  ]}
                >
                  Quản lí sân
                </Text>
              </View>
            ),
          }}
        />
      )}

      <Tab.Screen
        name="Thông báo"
        component={NotificationLayout}
        options={{
          headerShown: false,
          tabBarLabel: () => null,
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <Ionicons
                name="notifications-outline"
                size={22}
                color={focused ? COLORS.orangeText : "#676767"}
              />
              <Text
                style={[
                  styles.text,
                  focused ? { color: COLORS.orangeText } : { color: "#676767" },
                ]}
              >
                Thông báo
              </Text>
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="Setting"
        component={Settings}
        options={{
          headerShown: false,
          tabBarLabel: () => null,
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <FontAwesome
                name="user-o"
                size={22}
                color={focused ? COLORS.orangeText : "#676767"}
              />
              <Text
                style={[
                  styles.text,
                  focused ? { color: COLORS.orangeText } : { color: "#676767" },
                ]}
              >
                Tài khoản
              </Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: SIZE.size_10,
    fontFamily: "quicksand-bold",
    marginTop: 4,
  },
});
