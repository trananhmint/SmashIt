import {
    FlatList,
    Image,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
  } from "react-native";
  import React, { useContext, useEffect, useState } from "react";
  import HeaderBar from "../../../components/Atoms/HeaderBar";
  import { COLORS } from "../../../theme/colors";
  import { SIZE } from "../../../theme/fonts";
  import CourtOverview from "./CourtOverview";
  import CourtsManagement from "./CourtsManagement";
  import CourtFeedback from "./CourtFeedback";
  import { ScrollView } from "react-native";
  import { useIsFocused } from "@react-navigation/native";
  import TabBar from "../../../components/Molecules/TabBar";
  import { CourtOwnerContext } from "../../../context/CourtOwnerContext";
  
  export default function MyCourt({ navigation, route }) {
    const isFocus = useIsFocused();
  
    const [tab, setTab] = useState(1);
  
    const { courtCodeList } = useContext(CourtOwnerContext);
  
    const tabItem = [
      { id: 1, name: "Tổng quan", component: <CourtOverview /> },
      {
        id: 2,
        name: "Các sân",
        component: (
          <CourtsManagement
            navigation={navigation}
            courtCodeList={courtCodeList}
          />
        ),
      },
      { id: 3, name: "Đánh giá", component: <CourtFeedback /> },
    ];
  
    useEffect(() => {
      setTab(1);
    }, [isFocus]);
  
    return (
      <View style={{ flex: 1 }}>
        <HeaderBar
          text={"Địa điểm của tôi"}
          actionText={"Chỉnh sửa"}
          actionStyle={{
            fontFamily: "quicksand-bold",
            fontSize: SIZE.size_16,
            color: "#9A9A9A",
          }}
          isGoBack={true}
          goBack={() => navigation.goBack()}
          action={() => navigation.navigate("EditCourt")}
        />
        <View style={styles.container}>
          <Image
            style={styles.image}
            source={require("../../../assets/images/background.png")}
          />
  
          {/* <View style={styles.tabBar}>
            {tabItem.map((item) => {
              return (
                <TouchableOpacity
                  style={styles.tabItem}
                  key={item.id}
                  onPress={() => handleChangeTab(item.id)}
                >
                  <Text
                    style={[
                      styles.tabText,
                      item.id === tab ? styles.tabItemActive : styles.tabItem,
                    ]}
                  >
                    {item.name}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View> */}
  
          <TabBar
            tabItem={tabItem}
            currentTab={tab}
            setTab={setTab}
            fontSize={SIZE.size_14}
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
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 20,
      backgroundColor: COLORS.white,
      paddingHorizontal: 15,
    },
  
    image: {
      width: "100%",
      height: undefined,
      aspectRatio: 336 / 156,
      borderRadius: 6,
    },
  
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
      fontFamily: "quicksand-semibold",
    },
  
    tabItemActive: {
      paddingVertical: 15,
      borderBottomColor: COLORS.darkGreenText,
      borderBottomWidth: 1,
      paddingHorizontal: 10,
      fontFamily: "quicksand-bold",
      color: COLORS.darkGreenText,
    },
  
    tabText: {
      fontSize: SIZE.size_14,
    },
  });