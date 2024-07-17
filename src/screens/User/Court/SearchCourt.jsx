import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import SearchInput from "../../../components/Atoms/SearchInput";
import Icon from "react-native-vector-icons/FontAwesome6";
import { COLORS } from "../../../theme/colors";
import { SIZE } from "../../../theme/fonts";
import ChipList from "../../../components/Molecules/ChipList";
import CourtItem from "../../../components/Organisms/CourtItem";
import { useIsFocused } from "@react-navigation/native";
import CourtService from "../../../services/court.service";
import { AuthContext } from "../../../context/AuthContext";
import VectorIcon from "../../../components/Atoms/VectorIcon";
import Loading from "../../../components/Molecules/Loading";

export default function SearchCourt({ navigation }) {
  const isFocus = useIsFocused();

  const { token } = useContext(AuthContext);

  const [isLoading, setIsLoading] = useState(true);

  const dataAddress = [
    "Long Thạnh Mỹ",
    "Long Phước",
    "Linh Đông",
    "An Khánh",
    "Bình Trưng Đông",
    "Tăng Nhơn",
  ];

  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [chosenData, setChosenData] = useState(null);

  const [courtList, setCourtList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res =
        search === ""
          ? await CourtService.getAllCourts(token)
          : await CourtService.searchCourt(token, search);

      if (res && res.length > 0) {
        setCourtList(res);
      }

      setIsLoading(false);
    };

    fetchData();
  }, [isFocus, token, search]);

  const handleInput = (e) => {
    setSearchInput(e.nativeEvent.text);
  };

  const handlePress = (e) => {
    e.preventDefault();
    setSearch(searchInput);
  };

  return (
    <View style={styles.container}>
      <View style={styles.search}>
        <View
          style={{
            width: "100%",
            aspectRatio: 7,
            borderRadius: 12,
            borderWidth: 1,
            borderColor: COLORS.orangeText,
            display: "flex",
            flexDirection: "row",
          }}
        >
          <View
            style={{
              height: "100%",
              borderTopLeftRadius: 10,
              borderBottomLeftRadius: 10,
              aspectRatio: 6,
              justifyContent: "center",
              paddingHorizontal: 12,
            }}
          >
            <TextInput
              style={{ fontFamily: "quicksand-bold", fontSize: SIZE.size_14 }}
              placeholder="Tìm sân gần đây..."
              onChange={handleInput}
              value={searchInput}
            />
          </View>

          <TouchableOpacity
            onPress={handlePress}
            style={{
              height: "100%",
              aspectRatio: 1.21,
              borderTopRightRadius: 12,
              borderBottomRightRadius: 12,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: COLORS.orangeText,
            }}
          >
            <VectorIcon.AntDesign
              name="search1"
              size={24}
              color={COLORS.white}
            />
          </TouchableOpacity>
        </View>
      </View>
      {/* <View style={styles.suggestLocation}>
        <View style={styles.suggestLocation_Title}>
          <Text style={[styles.title, { fontSize: SIZE.size_16 }]}>
            Gợi ý vị trí gần bạn
          </Text>
          <View style={styles.location}>
            <VectorIcon.FontAwesome
              name="location-arrow"
              size={13}
              color={COLORS.darkGreenText}
            />
            <Text
              style={[
                { fontSize: SIZE.size_14, color: COLORS.darkGreenText },
                styles.title,
              ]}
            >
              Thành phố Thủ Đức
            </Text>
          </View>
        </View>
        <View style={styles.suggestLocation_List}>
          <ChipList
            isHorizontal={true}
            dataList={dataAddress}
            borderColor={"#D9D9D9"}
            chipType={"button"}
            chosenData={chosenData}
            setChosenData={setChosenData}
            textFamily={"quicksand-regular"}
            switchColor={false}
          />
        </View>
      </View> */}

      {isLoading ? (
        <Loading />
      ) : (
        <View style={styles.searchCourt}>
          <Text style={[styles.title, { fontSize: SIZE.size_16 }]}>
            Gợi ý kết quả tìm kiếm
          </Text>
          <ScrollView
            // contentContainerStyle={{gap: 20}}
            style={styles.result}
            showsVerticalScrollIndicator={false}
          >
            {courtList.map((court, index) => {
              return (
                <View key={index} style={styles.court}>
                  <CourtItem
                    id={court.id}
                    courtName={court.courtName}
                    numberOfCourt={court.numberOfCourt}
                    address={court.address}
                    pricePerHour={court.pricePerHour}
                    priceAtWeekend={court.priceAtWeekend}
                    priceAtHoliday={court.priceAtHoliday}
                    navigation={navigation}
                  />
                  <View style={styles.hr} />
                </View>
              );
            })}
          </ScrollView>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  search: {
    paddingHorizontal: 12,
    backgroundColor: COLORS.white,
    paddingBottom: 15,
    marginTop: 20,
  },
  suggestLocation: {
    marginTop: 3,
    paddingHorizontal: 12,
    backgroundColor: COLORS.white,
    paddingBottom: 15,
  },
  suggestLocation_Title: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontFamily: "quicksand-bold",
  },
  location: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },
  suggestLocation_List: {
    marginTop: 20,
  },
  searchCourt: {
    flex: 1,
    marginTop: 5,
    paddingVertical: 10,
    backgroundColor: COLORS.white,
    paddingHorizontal: 12,
  },
  result: {
    marginTop: 20,
    height: 400,
    flex: 1,
  },
  court: {
    flex: 1,
  },
  hr: {
    borderWidth: 1,
    borderColor: COLORS.greyBackground,
    marginVertical: 20,
  },
});
