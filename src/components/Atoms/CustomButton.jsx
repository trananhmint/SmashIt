import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { SIZE } from "../../theme/fonts";
import { COLORS } from "../../theme/colors";

const CustomButton = ({
  title,
  width,
  backgroundColor,
  height,
  color,
  icon,
  borderColor,
  handlePress,
  fontFamily,
  action,
  px,
  py,
  isDisable,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={handlePress}
      style={[
        styles.buttonContainer,
        {
          width: width,
          backgroundColor: backgroundColor,
          height: height,
          borderColor: borderColor,
          borderWidth: borderColor ? 1 : 0,
          paddingHorizontal: px,
          paddingVertical: py,
        },
      ]}
    >
      {icon && <Image source={icon} resizeMode="contain" style={styles.icon} />}
      <Text
        style={[
          styles.textButton,
          {
            color: color ? color : "#1F1F1F",
            fontFamily: fontFamily ? fontFamily : "quicksand-semibold",
          },
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  buttonContainer: {
    // width: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    flexDirection: "row",
  },
  textButton: {
    fontSize: SIZE.size_16,
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
});
