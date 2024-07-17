import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { SIZE } from "../../../theme/fonts";
import InputField from "../../../components/Molecules/InputField";
import StepDot from "../../../components/Molecules/StepDot";
import { COLORS } from "../../../theme/colors";
import FormInput from "../../../components/Atoms/FormInput";

export default function Prepresentative({
  name,
  setName,
  phone,
  setPhone,
  email,
  setEmail,
  password,
  setPassword,
  rePassword,
  setRePassword,
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.descriptionText}>
        Để đảm bảo tính minh bạch về thông tin của chủ sân, hãy cung cấp thông
        tin cá nhân nhé
      </Text>

      <View style={{ gap: 20 }}>
        <InputField
          inputType={"normal"}
          primaryText={"Họ và tên chủ sân"}
          placeholderText={"Họ và tên"}
          inputData={name}
          setInputData={setName}
        />
        <InputField
          inputType={"normal"}
          primaryText={"Số điện thoại chủ sân"}
          placeholderText={"Số điện thoại"}
          inputData={phone}
          setInputData={setPhone}
          valueType={"phone"}
        />
        <InputField
          inputType={"normal"}
          primaryText={"Địa chỉ email"}
          secondaryText={"không bắt buộc"}
          placeholderText={"Địa chỉ email"}
          inputData={email}
          setInputData={setEmail}
        />

        <FormInput
          label="Mật khẩu"
          placeholder="Nhập mật khẩu"
          value={password}
          handleChangeText={(e) => setPassword(e)}
        />

        <FormInput
          label="Xác Nhận Mật khẩu"
          placeholder="Xác Nhận Mật khẩu"
          value={rePassword}
          handleChangeText={(e) => setRePassword(e)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  descriptionText: {
    fontSize: SIZE.size_14,
    fontFamily: "quicksand-medium",
    marginBottom: 30,
  },
});
