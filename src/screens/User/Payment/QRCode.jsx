import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import images from "../../../constants/images";
import { COLORS } from "../../../theme/colors";
import { SIZE } from "../../../theme/fonts";

export default function QRCode({ navigation, route }) {
  const { amount } = route.params;

  return (
    <ImageBackground source={images.courtLogo} style={styles.container}>
      <View
        style={{
          width: "80%",
          alignItems: "center",
          backgroundColor: COLORS.white,
          paddingVertical: 20,
          paddingHorizontal: 15,
          borderRadius: 10,
        }}
      >
        <Image source={images.qr} style={{ width: "90%", height: "75%" }} />

        <TouchableOpacity
          style={[styles.button, { marginTop: 30 }]}
          // onPress={handleAddMoney}
          onPress={() =>
            navigation.navigate("PaymentInvoice", {
              status: 2,
              condition: 3,
              amount: amount,
            })
          }
        >
          <Text style={styles.myBalance}>Xác nhận</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button2, {}]}
          onPress={() => navigation.goBack()}
        >
          <Text style={[styles.myBalance, { color: COLORS.orangeText }]}>
            Hủy
          </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  button: {
    width: "90%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.orangeText,
    paddingVertical: 15,
    borderRadius: 10,
  },

  button2: {
    alignItems: "center",
    justifyContent: "center",
    borderColor: COLORS.orangeText,
    borderWidth: 1,
    paddingVertical: 15,
    borderRadius: 10,
    width: "90%",
    marginTop: 20,
  },

  myBalance: {
    fontSize: SIZE.size_16,
    fontFamily: "quicksand-semibold",
    color: "white",
  },
});
