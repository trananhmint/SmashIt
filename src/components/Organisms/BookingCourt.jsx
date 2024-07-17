import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import { SIZE, WEIGHT } from "../../theme/fonts";
import { COLORS } from "../../theme/colors";

const BookingCourt = ({
  image,
  name,
  address,
  rating,
  numberOfBooking,
}) => {
  return (
    <View style={styles.outline}>
      <View style={styles.outlineImage}>
        <Image style={styles.image} source={image} />
      </View>
      <View style={styles.courtInfo}>
        <Text style={styles.courtName}>{name}</Text>

        <View style={styles.courtAddress}>
          <Text>{address}</Text>
        </View>
        <Text>
          <Icon name={"star"} size={20} color={"#F49831"} />    
            {rating} ({numberOfBooking} lượt đặt)
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  outline: {
    aspectRatio: 3,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  outlineImage: {
    // width: '30%',
    height: "100%",
    aspectRatio: 1,
    padding: 10,
    // backgroundColor: 'black',
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    objectFit: "cover",
    height: "100%",
    width: "100%",
    borderRadius: 10,
  },
  courtInfo: {
    // backgroundColor: 'pink',
    aspectRatio: 2,
    height: "100%",
    // width: '100%',
    display: "flex",
    // alignItems: 'stretch',
    flexDirection: "column",
    flexWrap: "wrap",
    gap: 15,
    justifyContent: "center",
  },
  courtName: {
    fontSize: SIZE.size_14,
    fontWeight: WEIGHT.weight_600,
  },
  courtAddress: {
    fontSize: SIZE.size_12,
    fontWeight: WEIGHT.weight_500,
  },
  courtDistance_Price: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  courtDistance_Text: {
    color: COLORS.darkGreenText,
    fontSize: SIZE.size_16,
    fontWeight: WEIGHT.weight_600,
  },
  hr: {
    borderWidth: 1,
    borderColor: COLORS.lightGreyBorder,
    height: "100%",
  },
});

export default BookingCourt;
