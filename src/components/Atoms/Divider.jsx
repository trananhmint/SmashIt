import { StyleSheet, Text, View } from "react-native";
import React from "react";

export default function Divider({ orientation, color, dividerStyle }) {
  const dividerStyles = [
    orientation === "horizontal" ? styles.horizontal : styles.vertical,

    { backgroundColor: color ? color : "#E8E8E8" },
    dividerStyle,
  ];

  return <View style={dividerStyles} />;
}

const styles = StyleSheet.create({
  horizontal: {
    width: "100%",
    height: 1,
  },
  vertical: {
    width: 1,
    alignSelf: "stretch",
  },
});
