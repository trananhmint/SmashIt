import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/FontAwesome5";
import AntDesign from "react-native-vector-icons/AntDesign";
import { SIZE } from "../../theme/fonts";
import { COLORS } from "../../theme/colors";
import { useNavigation } from "@react-navigation/native";
import { formatNumber } from "../../utils";

export default function CourtBackground({
  // navigation,
  id,
  profileImage,
  courtName,
  numberOfCourt,
  hourStart,
  minuteStart,
  hourEnd,
  minuteEnd,
  pricePerHour,
  priceAtWeekend,
  priceAtHoliday,
  address,
  accountId,
}) {
  const navigation = useNavigation();
  const handlePress = () => {
    navigation.navigate("CourtDetail", { badmintonCourtId: id });
  };
  return (
    <TouchableOpacity onPress={handlePress} style={styles.container}>
      <View style={styles.imageSection}>
        <ImageBackground
          style={styles.image}
          source={require("../../assets/images/background.png")}
        />
        <View style={styles.overlay}></View>

        <View style={styles.addressSection}>
          <Icon name="location-arrow" size={8} color={"white"} />
          <Text style={styles.secondaryText}>Phường Long Thạnh Mỹ</Text>
        </View>

        <View style={styles.courtSection}>
          <View style={styles.topSection}>
            <Text style={styles.primaryText}>Sân Cầu lông {courtName}</Text>
            <View style={styles.rating}>
              <AntDesign
                name="star"
                color={"#F49831"}
                size={14}
                style={{ marginTop: 1 }}
              />
              <Text style={styles.secondaryText}>4.9</Text>
            </View>
          </View>

          <View style={styles.bottomSection}>
            <View style={styles.ribbon}>
              <Text style={styles.primaryText}>{numberOfCourt} sân trống</Text>
            </View>
            <Text
              style={[
                styles.secondaryText,
                { marginRight: 70, marginLeft: 10 },
              ]}
            >
              Cách 5.0km
            </Text>
            <Text style={styles.primaryText}>
              {formatNumber(pricePerHour)}đ/giờ
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {},

  primaryText: {
    fontSize: SIZE.size_14,
    fontFamily: "quicksand-bold",
    color: COLORS.white,
  },

  secondaryText: {
    fontSize: SIZE.size_12,
    fontFamily: "quicksand-bold",
    color: COLORS.white,
  },

  imageSection: {
    width: "100%",
    position: "relative",
    borderRadius: 6,
    overflow: "hidden",
  },

  image: {
    width: "100%",
    height: undefined,
    aspectRatio: 28 / 13,
  },

  overlay: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.28)",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 10,
  },

  addressSection: {
    position: "absolute",
    top: 10,
    left: 10,
    zIndex: 11,
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },

  courtSection: {
    position: "absolute",
    bottom: 20,
    left: 10,
    zIndex: 11,
  },

  topSection: {
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
  },

  rating: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },

  bottomSection: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
  },

  ribbon: {
    backgroundColor: COLORS.orangeText,
    alignItems: "center",
    justifyContent: "center",
    width: 107,
    height: 30,
    borderRadius: 16,
  },
});
