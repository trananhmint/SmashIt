import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { COLORS } from "../../theme/colors";
import { SIZE } from "../../theme/fonts";

const InputIcon = ({backgroundColor, placeholder, icon, iconColor, iconSize}) => {
  // const [input, setInput] = useState("as");
  return (
    <View style={[styles.outline, { backgroundColor: backgroundColor }]}>
      <View style={styles.search}>
        <Icon name={icon} size={28} color={iconColor} />
      </View>
      <View style={styles.input}>
        <Text style={[{fontSize: SIZE.size_14, color: COLORS.greyText}]}>Tìm sân ở đây</Text>
      </View>
      
      {/* <TextInput
        style={[styles.input, { fontSize: SIZE.size_14,  }]}
        placeholder={placeholder}
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  outline: {
    width: "100%",
    borderRadius: 10,
    display: "flex",
    flexDirection: "row",
    aspectRatio: 6.5,
    shadowColor: 'black',
    elevation: 10
    
  },
  search: {
    width: undefined,
    aspectRatio: 1,
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    // width: "90%",
    paddingVertical: 10,
    height: "100%",
    paddingRight: 10,
    fontFamily: 'quicksand-semibold',
    marginRight: 20,
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',

  },
});

export default InputIcon;
