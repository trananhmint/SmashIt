import {
    Image,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
  } from "react-native";
  import React, { useState } from "react";
  import icons from "../../constants/icons";
  import { SIZE } from "../../theme/fonts";
  
  const FormInput = ({
    label,
    placeholder,
    value,
    handleChangeText,
    marginTop,
    width,
  }) => {
    const [showPassword, setShowPassword] = useState(false);
  
    return (
      <View style={[styles.container, { marginTop: marginTop }]}>
        <Text style={styles.label}>{label}</Text>
        <View style={[styles.inputContainer, { width: width ? width : "100%" }]}>
          <TextInput
            value={value}
            placeholder={placeholder}
            placeholderTextColor="#BCBCBC"
            onChangeText={handleChangeText}
            secureTextEntry={label.includes("khẩu") && !showPassword}
            style={styles.input}
          />
          {label.includes("khẩu") && (
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              style={styles.toggleInvis}
            >
              <Image
                source={!showPassword ? icons.eye : icons.eye_hide}
                resizeMode="contain"
                style={styles.icon}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  };
  
  export default FormInput;
  
  const styles = StyleSheet.create({
    container: {},
    label: {
      color: "#000000",
      fontSize: SIZE.size_14,
      fontFamily: "quicksand-semibold",
      marginBottom: 2,
    },
    inputContainer: {
      flexDirection: "row",
      alignItems: "center",
      // width: "100%",
      borderRadius: 8,
      borderWidth: 1,
      borderColor: "#D1D1D1",
      paddingHorizontal: 12,
      paddingVertical: 16,
      justifyContent: "space-between",
    },
    input: {
      fontSize: SIZE.size_16,
      fontFamily: "quicksand-regular",
      flex: 1,
    },
  
    icon: {
      width: 24,
      height: 24,
    },
  });