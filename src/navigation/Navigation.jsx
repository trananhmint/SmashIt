import { View, Text } from "react-native";
import React, { useContext, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Login from "../screens/Auth/Login";
import Signup from "../screens/Auth/Signup";
import Home from "../screens/Home";
import BottomTabs from "./BottomTabs";
import SplashScreen_User from "../screens/SplashScreen/SplashScreen_User";
import SearchCourt from "../screens/User/Court/SearchCourt";
import BookedHistory from "../screens/User/Booking/BookedHistory";
import CourtDetail from "../screens/User/Court/CourtDetail";
import PackageDetail from "../screens/CourtOwner/Packages/PackageDetail";
import Pakage from "../screens/CourtOwner/Packages/Pakage";
import CourtCodeManagement from "../screens/CourtOwner/MyCourt/CourtCodeManagement";
import CreateBooking from "../screens/CourtOwner/MyCourt/CreateBooking";

import RolePick from "../screens/SplashScreen/RolePick";
import { AuthContext } from "../context/AuthContext";
import RegisterCourt from "../screens/CourtOwner/RegisterCourt/RegisterCourt";
import FinancialBook from "../screens/CourtOwner/RevenueExpenditure/FinancialBook";
import FavoriteCourts from "../screens/User/Court/FavoriteCourts";
import BookingCourt from "../screens/User/Booking/BookingCourt";
import Payment from "../screens/User/Payment/Payment";
import BlogNoti from "../screens/Notification/notification-detail/BlogNoti";
import BookingNoti from "../screens/Notification/notification-detail/BookingNoti";
import OfferNoti from "../screens/Notification/notification-detail/OfferNoti";
import { StarRatingDisplay } from "react-native-star-rating-widget";
import RatingNoti from "../screens/Notification/notification-detail/RatingNoti";
import CreatePost from "../screens/Notification/news-feed/CreatePost";
import CourtOwner from "../screens/SplashScreen/CourtOwner";
import Revenue from "../screens/CourtOwner/RevenueExpenditure/Revenue";
import UpdateCourt from "../screens/CourtOwner/MyCourt/UpdateCourt";
import Rewards from "../screens/User/Settings/Rewards";
import MyProfile from "../screens/User/Settings/MyProfile";
import Welcome from "../screens/SplashScreen/Welcome";
import Home_CourtOwner from "../screens/CourtOwner/Home_CourtOwner";

import RewardDetail from "../screens/User/Settings/RewardDetail";
import RewardHistory from "../screens/User/Settings/RewardHistory";
import MyVoucherDetail from "../screens/User/Settings/MyVoucherDetail";
import CourtRating from "../screens/Notification/notification-detail/CourtRating";
import CreateFinancialActivities from "../screens/CourtOwner/RevenueExpenditure/CreateFinancialActivities";
import LogoScreen from "../screens/SplashScreen/LogoScreen";
import PaymentInvoice from "../screens/User/Payment/PaymentInvoice";
import ConfirmPayment from "../screens/User/Payment/ConfirmPayment";
import MyWallet from "../screens/User/Settings/MyWallet";
import QRCode from "../screens/User/Payment/QRCode";
import ShareCenter from "../screens/User/Settings/ShareCenter";
import BookedDetail from "../screens/User/Booking/BookedDetail";
export default function Navigation() {
  const Stack = createNativeStackNavigator();

  // const isLogin = false;

  const { isLogin, firstRegister, chosenRole, isShowLogo } =
    useContext(AuthContext);

  return (
    // NOT LOGIN SCREEN

    <NavigationContainer>
      {isShowLogo && (
        <Stack.Navigator
          initialRouteName="Logo"
          screenOptions={{
            animation: "default",
          }}
        >
          <Stack.Screen
            name="Logo"
            component={LogoScreen}
            headerBackTitleVisible={true}
            options={{
              headerShown: false,
              title: "",
              animation: "slide_from_right",
            }}
          />
        </Stack.Navigator>
      )}

      {!isLogin && !firstRegister && !isShowLogo && (
        <Stack.Navigator
          initialRouteName="Welcome"
          screenOptions={{
            animation: "default",
          }}
        >
          <Stack.Screen
            name="Login"
            component={Login}
            headerBackTitleVisible={true}
            options={{
              headerShown: false,
              title: "",
              animation: "slide_from_right",
            }}
          />

          <Stack.Screen
            name="Signup"
            component={Signup}
            options={{
              title: "",
              animation: "slide_from_right",
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="RolePick"
            component={RolePick}
            options={{
              title: "",
              animation: "slide_from_right",
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="RegisterCourt"
            component={RegisterCourt}
            options={{
              title: "",
              animation: "slide_from_right",
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="Welcome"
            component={Welcome}
            options={{
              title: "",
              animation: "slide_from_right",
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      )}

      {/* ALREADY LOGIN SCREEN */}

      {isLogin && !firstRegister && !isShowLogo && (
        <Stack.Navigator
          initialRouteName="BottomTab"
          screenOptions={{
            animation: "default",
          }}
        >
          <Stack.Screen
            name="BottomTab"
            component={BottomTabs}
            options={{
              title: "",
              animation: "slide_from_right",
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              title: "",
              animation: "slide_from_right",
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="Home_CourtOwner"
            component={Home_CourtOwner}
            options={{
              title: "",
              animation: "slide_from_right",
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="Pakage"
            component={Pakage}
            options={{
              title: "",
              animation: "slide_from_right",
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="PackageDetail"
            component={PackageDetail}
            options={{
              title: "",
              animation: "slide_from_right",
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="CourtCodeManagement"
            component={CourtCodeManagement}
            options={{
              title: "",
              animation: "slide_from_right",
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="CreateBooking"
            component={CreateBooking}
            options={{
              title: "",
              animation: "slide_from_right",
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="ShareCenter"
            component={ShareCenter}
            options={{
              title: "",
              animation: "slide_from_right",
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Search"
            component={SearchCourt}
            options={{
              title: "",
              animation: "slide_from_right",
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="BookedHistory"
            component={BookedHistory}
            options={{
              title: "",
              animation: "slide_from_right",
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="BookedDetail"
            component={BookedDetail}
            options={{
              title: "",
              animation: "slide_from_right",
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="CourtDetail"
            component={CourtDetail}
            options={{
              title: "",
              animation: "slide_from_right",
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Payment"
            component={Payment}
            options={{
              title: "",
              animation: "slide_from_right",
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="PaymentInvoice"
            component={PaymentInvoice}
            options={{
              title: "",
              animation: "slide_from_right",
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="QRCode"
            component={QRCode}
            options={{
              title: "",
              animation: "slide_from_right",
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="BlogNoti"
            component={BlogNoti}
            options={{
              title: "",
              animation: "slide_from_right",
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="BookingNoti"
            component={BookingNoti}
            options={{
              title: "",
              animation: "slide_from_right",
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="OfferNoti"
            component={OfferNoti}
            options={{
              title: "",
              animation: "slide_from_right",
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="RatingNoti"
            component={RatingNoti}
            options={{
              title: "",
              animation: "slide_from_right",
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="CreatePost"
            component={CreatePost}
            options={{
              title: "",
              animation: "slide_from_right",
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="CourtOwner"
            component={CourtOwner}
            options={{
              title: "",
              animation: "slide_from_right",
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="FavoriteCourt"
            component={FavoriteCourts}
            options={{
              title: "",
              animation: "slide_from_right",
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="BookingCourt"
            component={BookingCourt}
            options={{
              title: "",
              animation: "slide_from_right",
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="FinancialBook"
            component={FinancialBook}
            options={{
              title: "",
              animation: "slide_from_right",
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="CreateFinancialActivities"
            component={CreateFinancialActivities}
            options={{
              title: "",
              animation: "slide_from_right",
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="MyProfile"
            component={MyProfile}
            options={{
              title: "",
              animation: "slide_from_right",
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Rewards"
            component={Rewards}
            options={{
              title: "",
              animation: "slide_from_right",
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="RewardHistory"
            component={RewardHistory}
            options={{
              title: "",
              animation: "slide_from_right",
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="RewardDetail"
            component={RewardDetail}
            options={{
              title: "",
              animation: "slide_from_right",
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="MyVoucherDetail"
            component={MyVoucherDetail}
            options={{
              title: "",
              animation: "slide_from_right",
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="MyWallet"
            component={MyWallet}
            options={{
              title: "",
              animation: "slide_from_right",
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="ConfirmPayment"
            component={ConfirmPayment}
            options={{
              title: "",
              animation: "slide_from_right",
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="CourtRating"
            component={CourtRating}
            options={{
              title: "",
              animation: "slide_from_right",
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="EditCourt"
            component={UpdateCourt}
            options={{
              title: "",
              animation: "slide_from_right",
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="CourtRevenue"
            component={Revenue}
            options={{
              title: "",
              animation: "slide_from_right",
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      )}

      {firstRegister && !isShowLogo && (
        <Stack.Navigator
          initialRouteName={
            chosenRole === "player"
              ? "SplashScreen_User"
              : "SplashScreen_CourtOwner"
          }
          screenOptions={{
            animation: "default",
          }}
        >
          <Stack.Screen
            name="SplashScreen_User"
            component={SplashScreen_User}
            options={{
              title: "",
              animation: "slide_from_right",
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="SplashScreen_CourtOwner"
            component={CourtOwner}
            options={{
              title: "",
              animation: "slide_from_right",
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}
