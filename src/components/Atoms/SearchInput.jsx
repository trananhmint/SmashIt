import React from "react";
import {
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { COLORS } from "../../theme/colors";
import Icon from "react-native-vector-icons/AntDesign";
import { SIZE } from "../../theme/fonts";

const SearchInput = () => {
  return (
    <View style={styles.outline}>
      <View style={styles.inputOutline}>
        <TextInput style={styles.input} placeholder="Tìm sân gần đây..." />
      </View>

      <TouchableOpacity style={styles.search}>
        <Icon name="search1" size={24} color={COLORS.white} />
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  outline: {
    width: "100%",
    aspectRatio: 7,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.orangeText,
    display: "flex",
    flexDirection: "row",
    // alignItems: 'center',
  },
  inputOutline: {
    height: "100%",
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    aspectRatio: 6,
    justifyContent: "center",
    paddingHorizontal: 12,
  },
  input: {
    fontFamily: "quicksand-bold",
    fontSize: SIZE.size_14,
  },
  search: {
    height: "100%",
    aspectRatio: 1.21,
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.orangeText,
  },
});

export default SearchInput;
