import React, { useContext, useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native";
import HeaderBar from "../../../components/Atoms/HeaderBar";
import { useNavigation } from "@react-navigation/native";
import FavoriteCourt from "../../../components/Organisms/FavoriteCourt";
import courtImage from "../../../assets/images/courtImages.jpg";
import images from "../../../constants/images";
import { SIZE } from "../../../theme/fonts";
import Oops from "../../../components/Organisms/Oops";
import * as SecureStore from "expo-secure-store";
import { AuthContext } from "../../../context/AuthContext";

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
  const [favoriteList, setFavoriteList] = useState([]);

  const { user } = useContext(AuthContext);

  const removeFromFavList = async (courtId) => {
    let list = await SecureStore.getItem("favList");

    list = list ? JSON.parse(list) : null;

    if (list) {
      const userIndex = list.findIndex((item) => item.userId === user.id);

      if (userIndex !== -1) {
        list[userIndex].favCourts = list[userIndex].favCourts.filter((item) => {
          return item.id !== courtId;
        });

        await SecureStore.setItem("favList", JSON.stringify(list));

        setFavorite(false);
      }
    }
  };

  useEffect(() => {
    const getFavList = async () => {
      let list = await SecureStore.getItem("favList");

      list = list ? JSON.parse(list) : null;

      if (list) {
        const userFav = list.find((item) => item.userId === user?.id);

        if (userFav) {
          setFavoriteList(userFav.favCourts);
        }
      }

      return false;
    };

    getFavList();
  }, [removeFromFavList]);

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
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("CourtDetail", {
                    badmintonCourtId: court.id,
                  });
                }}
                key={index}
              >
                <FavoriteCourt
                  courtName={court.courtName}
                  courtImage={courtImage}
                  courtAddress={court.address}
                  courtDistance={court.distance}
                  courtPrice={court.pricePerHour}
                  isFavorite={true}
                  action={() => removeFromFavList(court?.id)}
                />
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  favoriteList: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    marginTop: 30,
  },
});

export default FavoriteCourts;
