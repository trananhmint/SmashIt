import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React from "react";
import { COLORS } from "../../theme/colors";

export default function Loading() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: COLORS.white,
      }}
    >
      <ActivityIndicator color={COLORS.orangeText} size={"large"} />
    </View>
  );
}

const styles = StyleSheet.create({});