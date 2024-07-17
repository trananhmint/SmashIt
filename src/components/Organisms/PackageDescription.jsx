import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/AntDesign";
import { COLORS } from "../../theme/colors";
import { SIZE } from "../../theme/fonts";

export default function PackageDescription({ packageTitle, packageText }) {
  return (
    <View style={styles.container}>
      <View style={styles.iconSection}>
        <Icon
          name="tago"
          style={{
            transform: "rotate(135deg)",
            padding: 10,
          }}
          color={COLORS.orangeText}
          size={18}
        />
      </View>
      <View style={styles.textSection}>
        <Text style={styles.title}>{packageTitle}</Text>
        <Text style={styles.description}>{packageText}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },

  iconSection: {
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: COLORS.orangeBackground,
    alignItems: "center",
    justifyContent: "center",
  },

  textSection: {
    flex: 1,
  },

  title: {
    fontSize: SIZE.size_14,
    fontFamily: "quicksand-semibold",
    letterSpacing: 0.21,
    marginBottom: 5,
  },

  description: {
    fontSize: SIZE.size_12,
    fontFamily: "quicksand-regular",
    letterSpacing: 0.18,
  },
});
