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
  
  export default function SelectField({
    placeholder,
    backgroundColor,
    iconFamily,
    iconName,
    iconSize,
    iconColor,
    text,
    action,
    inputValue,
    setInputValue,
  }) {
    return (
      <TouchableOpacity style={[styles.outline]} onPress={action}>
        <TextInput
          style={[styles.input, { fontSize: SIZE.size_16 }]}
          placeholder={placeholder}
          editable={false}
          value={inputValue && inputValue.toString()}
        />
  
        <View style={[styles.icon, { backgroundColor: backgroundColor }]}>
          {text ? (
            <Text style={styles.text}>{text}</Text>
          ) : (
            getIconFamily(iconFamily, iconName, iconSize, iconColor)
          )}
        </View>
      </TouchableOpacity>
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
      right: -5,
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
      color: "black",
    },
  });