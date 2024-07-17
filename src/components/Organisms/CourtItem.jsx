import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import { SIZE, WEIGHT } from "../../theme/fonts";
import { COLORS } from "../../theme/colors";
import { formatNumber } from "../../utils";

const CourtItem = ({
  navigation,
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
}) => {
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("CourtDetail", { badmintonCourtId: id });
      }}
      style={styles.outline}
    >
      <View style={styles.courtImage}>
        <View style={styles.court}>
          <Image
            style={styles.courtImage}
            source={{
              uri: "https://klgccwebsecurestoreprd01.blob.core.windows.net/klgccweb-prod/node/club-facility/images/2021-08/Badminton%20Court.jpg",
            }}
          />
        </View>
        <View style={styles.courtNo}>
          <Text style={styles.courtNo_Text}>{numberOfCourt} sân trống</Text>
        </View>
      </View>
      <View style={styles.courtInfo}>
        <View style={styles.courtTitle}>
          <View>
            <Text style={styles.courtName}>Sân cầu lông {courtName}</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text
              style={[
                styles.courtName,
                { fontSize: SIZE.size_12, fontFamily: "quicksand-bold" },
              ]}
            >
              <Icon name="star" size={16} color={COLORS.orangeText} /> 4.9
            </Text>
          </View>
        </View>
        <View>
          <Text style={styles.courtAddress}>{address}</Text>
        </View>
        <View style={styles.courtDetails}>
          <Text style={styles.courtDetails_Text}>6.0 km</Text>
          <View style={styles.hr} />
          <Text style={styles.courtDetails_Text}>
            {formatNumber(numberOfCourt)} sân
          </Text>
          <View style={styles.hr} />
          <Text style={styles.courtDetails_Text}>
            {formatNumber(pricePerHour)}đ/giờ
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  outline: {
    width: "100%",
    aspectRatio: 3 / 1.1,
    display: "flex",
    flexDirection: "row",
  },
  courtImage: {
    height: "100%",
    aspectRatio: 116 / 111,
    backgroundColor: "cyan",
    borderRadius: 10,
  },
  court: {
    position: "relative",
  },
  courtNo: {
    backgroundColor: COLORS.orangeText,
    position: "absolute",
    paddingBottom: 3,
    paddingHorizontal: 5,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
    borderRadius: 10,
  },
  courtNo_Text: {
    fontFamily: "quicksand-bold",
    fontSize: SIZE.size_10,
    color: COLORS.white,
    alignItems: "center",
    justifyContent: "center",
  },
  courtInfo: {
    width: "63%",
    height: "100%",
    paddingHorizontal: 8,
    display: "flex",
    flexDirection: "column",
    paddingVertical: 4,
    gap: 10,
  },
  courtTitle: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
    alignItems: "center",
  },
  courtName: {
    display: "flex",
    fontSize: SIZE.size_14,
    fontFamily: "quicksand-semibold",
  },
  courtAddress: {
    fontSize: SIZE.size_12,
    fontFamily: "quicksand-regular",
    lineHeight: 22,
  },
  courtDetails: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  courtDetails_Text: {
    color: COLORS.darkGreenText,
    fontSize: SIZE.size_16,
    fontFamily: "quicksand-semibold",
  },
  hr: {
    borderWidth: 1,
    height: "100%",
    width: 1,
    borderColor: COLORS.greyBackground,
  },
});

export default CourtItem;
