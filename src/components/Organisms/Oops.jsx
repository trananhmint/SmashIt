import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import images from "../../constants/images";
import { SIZE } from "../../theme/fonts";

export default function Oops({ text }) {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        gap: 10,
        justifyContent: "center",
      }}
    >
      <Image source={images.embarrassed} style={{ width: 120, height: 120 }} />
      <Text style={{ fontFamily: "quicksand-medium", fontSize: SIZE.size_16 }}>
        {text}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({});
