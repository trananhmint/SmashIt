import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import { COLORS } from "../../theme/colors";
import { SIZE, WEIGHT } from "../../theme/fonts";

const Title_MoreInfo = ({ title, navigation }) => {
  return (
    <View style={styles.outline}>
      <Text style={[{ fontSize: SIZE.size_16 }, styles.text]}>{title}</Text>
      {navigation && (
        <TouchableOpacity style={styles.directionRow} onPress={navigation}>
          <Text
            style={[
              styles.text,
              { color: COLORS.orangeText, fontSize: SIZE.size_12 },
            ]}
          >
            Xem thêm
          </Text>
          <View style={styles.arrow}>
            <Icon name="arrowright" color={COLORS.orangeText} size={14} />
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  outline: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    padding: 4,
    marginBottom: 15,
  },
  text: {
    // fontFamily: TYPE.quicksand,
    // fontWeight: WEIGHT.weight_600,
    fontFamily: "quicksand-semibold",
  },
  directionRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  arrow: {
    width: 20,
    height: 20,
    borderRadius: 15,
    backgroundColor: COLORS.orangeBackground,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Title_MoreInfo;
