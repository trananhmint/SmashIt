import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import HeaderBar from "../../../components/Atoms/HeaderBar";
import TabBar from "../../../components/Molecules/TabBar";
import PackageList from "./PackageList";
import MyPackage from "./MyPackage";
import { SIZE } from "../../../theme/fonts";
import PackageItem from "../../../components/Organisms/PackageItem";
import { FlatList } from "react-native";
import { COLORS } from "../../../theme/colors";

export default function Pakage({ navigation, router }) {
  const [tab, setTab] = useState(1);

  const tabItem = [
    {
      id: 1,
      name: "Khám phá ưu đãi",
      component: <PackageList navigation={navigation} />,
    },
    {
      id: 2,
      name: "Ưu đãi của tôi",
      component: <MyPackage navigation={navigation} />,
    },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.white }}>
      <HeaderBar
        text={"Gói ưu đãi"}
        isGoBack={true}
        goBack={() => navigation.goBack()}
      />
      <TabBar
        tabItem={tabItem}
        currentTab={tab}
        setTab={setTab}
        fontSize={SIZE.size_16}
        tabBarStyle={{ justifyContent: "space-around" }}
      />
      {tabItem.map(
        (item) =>
          item.id === tab && (
            <View style={{ flex: 1, marginBottom: 20 }} key={item.id}>
              {item.component}
            </View>
          )
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    gap: 30,
  },

  section: {
    flex: 1,
    gap: 20,
  },

  image: {
    width: "100%",
    height: undefined,
    aspectRatio: 330 / 167,
    borderRadius: 6,
  },
});
