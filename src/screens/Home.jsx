import {
  Image,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { COLORS } from "../theme/colors";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderBar from "../components/Atoms/HeaderBar";
import backgroundHomeImage from "../assets/images/backgroundHome.png";
import InputIcon from "../components/Atoms/InputIcon";
import Icon from "react-native-vector-icons/FontAwesome6";
import { SIZE } from "../theme/fonts";
import Carousel from "../components/Organisms/Carousel";
import Title_MoreInfo from "../components/Atoms/Title_MoreInfo";
import CourtBackground from "../components/Organisms/CourtBackground";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import CourtService from "../services/court.service";
import { AuthContext } from "../context/AuthContext";

export default function Home() {
  const isFocus = useIsFocused();
  const { token, user } = useContext(AuthContext);

  console.log(user);

  const fullName = () => {
    let name = user.fullName.split(/\s/);

    return name[1] + " " + name[2];
  };

  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate("Search");
  };

  const [courtList, setCourtList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await CourtService.getAllCourts(token);

      if (res && res.length > 0) {
        setCourtList(res);
      }
    };

    fetchData();
  }, [isFocus]);

  return (
    <ScrollView style={styles.container}>
      {/* <HeaderBar text={"Trang Chu"} /> */}
      <View>
        <View style={styles.imageOutline}>
          <Image style={styles.image} source={backgroundHomeImage} />
        </View>
        <View style={[styles.header]}>
          <View style={styles.location}>
            <Icon name="location-arrow" size={14} color={COLORS.white} />
            <Text style={[styles.header_Text, { fontSize: SIZE.size_14 }]}>
              Thành phố Thủ Đức
            </Text>
          </View>
          <Text style={[styles.header_Text, { fontSize: SIZE.size_20 }]}>
            Xin chào {user?.fullName}, hãy tìm sân yêu thích của bạn
          </Text>

          <Pressable
            onPress={() => {
              handlePress();
            }}
            style={styles.searchInput}
          >
            <InputIcon
              icon={"search"}
              iconColor={COLORS.orangeText}
              placeholder={"Search here..."}
              backgroundColor={"white"}
            />
          </Pressable>
        </View>
      </View>
      {/* <View style={styles.discount}>
        <Text style={[styles.title, { marginTop: 50 }]}>Ưu đãi hấp dẫn</Text>
        <Carousel />
      </View> */}
      <View style={styles.suggest}>
        <Title_MoreInfo title={"Đề xuất dành cho bạn"} />
        <ScrollView>
          {courtList.map((court, index) => {
            return (
              <View key={index} style={styles.suggestCourts}>
                <CourtBackground
                  courtName={court.courtName}
                  numberOfCourt={court.numberOfCourt}
                  id={court.id}
                  key={court.id}
                  pricePerHour={court.pricePerHour}
                />
              </View>
            );
          })}
        </ScrollView>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    gap: 20,
  },
  header: {
    position: "absolute",
    top: "10%",
    padding: 12,
    height: "106%",
    display: "flex",
    justifyContent: "space-between",
  },
  imageOutline: {
    width: "100%",
    aspectRatio: 1.7,
    objectFit: "cover",
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  header_Text: {
    color: COLORS.white,
    fontSize: SIZE.size_14,
    fontFamily: "quicksand-bold",
  },
  location: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  text: {
    color: COLORS.black,
    fontSize: 18,
  },
  searchInput: {
    elevation: 10,
    shadowColor: "#000",
  },
  title: {
    fontFamily: "quicksand-bold",
    fontSize: SIZE.size_16,
  },
  discount: {
    marginTop: 10,
    paddingHorizontal: 12,
    marginBottom: 35,
  },
  carousel: {
    marginBottom: 35,
  },
  suggest: {
    marginTop: 35,
    paddingHorizontal: 12,
    marginBottom: 30,
  },
  suggestCourts: {
    gap: 20,
    marginTop: 10,
  },
});
