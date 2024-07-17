import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native";
import HeaderBar from "../../../components/Atoms/HeaderBar";
import { useNavigation } from "@react-navigation/native";
import FavoriteCourt from "../../../components/Organisms/FavoriteCourt";
import courtImage from "../../../assets/images/courtImages.jpg";
import images from "../../../constants/images";
import { SIZE } from "../../../theme/fonts";
import Oops from "../../../components/Organisms/Oops";

const FavoriteCourts = () => {
  const navigation = useNavigation();

  const court = {
    name: "Sân cầu lông Nhật Thiện",
    image: courtImage,
    address:
      "606/16 Nguyễn Xiển, Long Thạnh Mỹ, Thủ Đức, Thành phố Hồ Chí Minh",
    distance: "1.1",
    price: "89.000",
  };
  const favoriteList = [];
  return (
    <View style={styles.container}>
      <HeaderBar
        text={"Địa điểm yêu thích"}
        goBack={() => {
          navigation.goBack();
        }}
        isGoBack={true}
      />

      {favoriteList?.length <= 0 ? (
        <Oops text={"Oops, hãy đặt sân ngay nhé !"} />
      ) : (
        <ScrollView style={styles.favoriteList}>
          {favoriteList.map((court, index) => {
            return (
              <View key={index}>
                <FavoriteCourt
                  courtName={court.name}
                  courtImage={court.image}
                  courtAddress={court.address}
                  courtDistance={court.distance}
                  courtPrice={court.price}
                  isFavorite={true}
                />
              </View>
            );
          })}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
  },
  favoriteList: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
  },
});

export default FavoriteCourts;
