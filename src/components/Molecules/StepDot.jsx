import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { COLORS } from "../../theme/colors";

export default function StepDot({
  quantity,
  currentStep,
  isRemarkable,
  setStep,
}) {
  const dots = Array.from({ length: quantity }, (item, index) => index);
  return (
    <View style={styles.container}>
      {dots.map((item, index) => {
        return (
          <TouchableOpacity
            onPress={() => setStep(index + 1)}
            key={index}
            style={[
              styles.dot,
              currentStep === index + 1 && {
                backgroundColor: COLORS.orangeText,
              },

              currentStep === index + 1 &&
                isRemarkable && {
                  width: 10,
                  height: 10,
                },
            ]}
          ></TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },

  dot: {
    width: 8,
    height: 8,
    backgroundColor: "grey",
    borderRadius: 10,
  },
});