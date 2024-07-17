import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
  } from "react-native";
  import React, { useState } from "react";
  import { getIconFamily } from "../../utils";
  import { SIZE } from "../../theme/fonts";
  
  export default function InputIcon({
    inputType,
    placeholder,
    backgroundColor,
    iconFamily,
    iconName,
    iconSize,
    iconColor,
    text,
    action,
    inputData,
    setInputData,
  }) {
    console.log(typeof inputData);
    return (
      <View style={[styles.outline]}>
        {inputType === "number" && (
          <TextInput
            inputMode="numeric"
            style={[styles.input, { fontSize: SIZE.size_16 }]}
            placeholder={placeholder}
            value={inputData?.toString()}
            onChangeText={(value) =>
              isNaN(parseInt(value))
                ? setInputData(0)
                : setInputData(parseInt(value))
            }
          />
        )}
  
        {inputType !== "number" && (
          <TextInput
            style={[styles.input, { fontSize: SIZE.size_16 }]}
            placeholder={placeholder}
            value={inputData}
            onChangeText={(value) => setInputData(value)}
          />
        )}
  
        <TouchableOpacity
          onPress={action}
          style={[styles.icon, { backgroundColor: backgroundColor }]}
        >
          {text ? (
            <Text style={styles.text}>{text}</Text>
          ) : (
            getIconFamily(iconFamily, iconName, iconSize, iconColor)
          )}
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
    },
  
    icon: {
      width: undefined,
      aspectRatio: 54 / 50,
      height: "100%",
      alignItems: "center",
      justifyContent: "center",
      position: "absolute",
      right: 0,
    },
  
    text: {
      fontSize: SIZE.size_16,
      fontFamily: "quicksand-semibold",
    },
  
    input: {
      width: "85%",
      paddingVertical: 16,
      height: "100%",
      paddingLeft: 12,
      overflow: "hidden",
      fontFamily: "quicksand-regular",
    },
  });