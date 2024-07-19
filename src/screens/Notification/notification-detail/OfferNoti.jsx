import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { SIZE } from "../../../theme/fonts";
import icons from "../../../constants/icons";
import NotificationInfo from "../../../components/Organisms/NotificationInfo";
import Oops from "../../../components/Organisms/Oops";

const offers = [];

const OfferNoti = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <Image source={icons.goback} style={styles.goback} />
        </TouchableOpacity>
        <Text style={styles.title}>Khuyến mãi</Text>
      </View>

      {offers?.length <= 0 ? (
        <Oops text={"Oops, chờ chúng mình ra khuyến mãi xíu nhé !"} />
      ) : (
        <NotificationInfo list={offers} icon={icons.voucher} />
      )}
    </View>
  );
};

export default OfferNoti;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: SIZE.size_20,
    fontFamily: "quicksand-bold",
  },
  header: {
    alignItems: "center",
    flexDirection: "row",
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 20,
    gap: 10,
  },
  goback: {
    width: 28,
    height: 28,
  },
});