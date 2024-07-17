import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { SIZE } from "../../theme/fonts";
import icons from "../../constants/icons";
import images from "../../constants/images";

const paymentMethod = [
  {
    name: "Thanh toán tại sân",
    url: icons.cash,
    id: "cash",
  },
  {
    name: "Ví VNPAY",
    url: images.vnpay,
    id: "vnpay",
  },
  {
    name: "Ví momo",
    url: images.momo,
    id: "momo",
  },
];

const PaymentMethod = () => {
  const [method, setMethod] = useState("momo");
  const handleChangeMethod = (id) => {
    setMethod(id);
  };

  return (
    <View>
      <Text style={styles.title}>Phương thức thanh toán</Text>
      <FlatList
        data={paymentMethod}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.paymentType,
              {
                borderColor: item.id === method ? "#2A9083" : "#F1F1F1",
                backgroundColor:
                  item.id === method ? "rgba(42,144,131,0.1)" : "white",
              },
            ]}
            activeOpacity={0.7}
            onPress={() => handleChangeMethod(item.id)}
          >
            <Image source={item.url} style={styles.image} />
            <Text style={styles.paymentText}>{item.name}</Text>
          </TouchableOpacity>
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default PaymentMethod;

const styles = StyleSheet.create({
  title: {
    fontSize: SIZE.size_14,
    fontFamily: "quicksand-semibold",
    marginBottom: 15,
  },
  image: {
    width: 35,
    height: 35,
  },
  paymentType: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginRight: 10,
    borderWidth: 1,
  },
  paymentText: {
    fontSize: SIZE.size_12,
    fontFamily: "quicksand-medium",
    marginLeft: 8,
  },
});
