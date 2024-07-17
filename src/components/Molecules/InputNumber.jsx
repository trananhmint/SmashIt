import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
  } from "react-native";
  import React from "react";
  import { getIconFamily } from "../../utils";
  import { SIZE } from "../../theme/fonts";
  import VectorIcon from "../Atoms/VectorIcon";
  
  export default function InputNumber({
    placeholder,
    backgroundColor,
    inputData,
    setInputData,
  }) {
    const handlePress = (type) => {
      if (type === "plus") {
        setInputData(inputData + 1);
      } else {
        if (inputData > 0) {
          setInputData(inputData - 1);
        }
      }
    };
  
    return (
      <View style={[styles.outline]}>
        <TouchableOpacity
          onPress={() => handlePress("minus")}
          style={[styles.minus, { backgroundColor: backgroundColor }]}
        >
          <VectorIcon.AntDesign name="minus" size={18} />
        </TouchableOpacity>
  
        <TextInput
          inputMode="numeric"
          style={[styles.input, { fontSize: SIZE.size_16, textAlign: "center" }]}
          placeholder={placeholder}
          value={inputData !== null ? inputData.toString() : "0"}
          onChangeText={(value) =>
            isNaN(parseInt(value))
              ? setInputData(0)
              : setInputData(parseInt(value))
          }
        />
  
        <TouchableOpacity
          onPress={() => handlePress("plus")}
          style={[styles.plus, { backgroundColor: backgroundColor }]}
        >
          <VectorIcon.AntDesign name="plus" size={18} />
        </TouchableOpacity>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    outline: {
      width: "100%",
      borderRadius: 10,
      display: "flex",
      flexDirection: "row",
      borderColor: "#D1D1D1",
      borderWidth: 1,
      overflow: "hidden",
      position: "relative",
      alignItems: "center",
      justifyContent: "center",
    },
  
    plus: {
      width: undefined,
      aspectRatio: 54 / 50,
      height: "100%",
      alignItems: "center",
      justifyContent: "center",
      position: "absolute",
      right: 0,
    },
  
    minus: {
      width: undefined,
      aspectRatio: 54 / 50,
      height: "100%",
      alignItems: "center",
      justifyContent: "center",
      position: "absolute",
      left: 0,
    },
  
    input: {
      width: "50%",
      paddingVertical: 16,
      height: "100%",
      overflow: "hidden",
      fontFamily: "quicksand-regular",
    },
  });