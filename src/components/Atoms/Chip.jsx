import React, { useState } from "react";
import { StyleSheet, Touchable, TouchableOpacity, View } from "react-native";
import { Text } from "react-native";
import { COLORS } from "../../theme/colors";
import { SIZE } from "../../theme/fonts";
import VectorIcon from "./VectorIcon";

const Chip = ({
  backgroundColor,
  borderColor,
  text,
  textColor,
  textFamily,
  action,
  chipType,
  borderRadius,
  chosenData,
  setChosenData,
  chipStyle,
  fontSize,
}) => {
  const [status, setStatus] = useState(false);
  // const isChosenBg =
  //   status === false
  //     ? {
  //         backgroundColor: COLORS.white,
  //         borderColor: COLORS.darkGreyBorder,
  //       }
  //     : {
  //         backgroundColor: COLORS.darkGreenText,
  //         borderColor: COLORS.white,
  //       };
  // const isChosen = status === false ? COLORS.black : COLORS.white;
  return (
    <View style={[styles.outline]}>
      {chipType === "button" ? (
        <TouchableOpacity
          onPress={() => setChosenData(text)}
          style={[
            styles.chip,
            {
              backgroundColor:
                chosenData === text ? COLORS.darkGreenText : backgroundColor,
              borderColor: borderColor,
              borderRadius: borderRadius ? borderRadius : 20,
            },
            chipStyle,
          ]}
          // onPress={() => setStatus(!status)}
        >
          <Text
            style={{
              color: chosenData === text ? COLORS.white : textColor,
              fontFamily:
                chosenData === text ? "quicksand-semibold" : textFamily,
            }}
          >
            {text}
          </Text>

          {action && (
            <TouchableOpacity style={styles.close} onPress={action}>
              <VectorIcon.AntDesign name="close" size={10} />
            </TouchableOpacity>
          )}
        </TouchableOpacity>
      ) : (
        <View
          style={[
            styles.chip,
            {
              backgroundColor: backgroundColor,
              borderColor: borderColor,
              borderRadius: borderRadius ? borderRadius : 20,
            },
            chipStyle,
          ]}
        >
          <Text
            style={{
              color: textColor,
              fontFamily: textFamily,
              fontSize: fontSize,
            }}
          >
            {text}
          </Text>

          {action && (
            <TouchableOpacity style={styles.close} onPress={action}>
              <VectorIcon.AntDesign name="close" size={10} />
            </TouchableOpacity>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  outline: {
    display: "flex",
    alignItems: "baseline",
    position: "relative",
    marginTop: 5,
  },
  chip: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    fontSize: SIZE.size_14,
    borderWidth: 1,
  },

  close: {
    width: 17,
    height: 17,
    borderRadius: 8,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#DFE1E7",
    right: -3,
    top: -5,
  },
});

export default Chip;