import React from "react";
import HeaderBar from "../../../components/Atoms/HeaderBar";
import { useNavigation } from "@react-navigation/native";
import DatePickerSlider from "../../../components/Organisms/DatePicker";
import { View } from "react-native";

const BookedCourt = () => {
  const navigation = useNavigation();
  return (
    <View>
      <HeaderBar
        isGoBack={true}
        goBack={() => navigation.goBack()}
        text={"Đã đặt trước"}
      />
      <DatePickerSlider />
    </View>
  );
};

export default BookedCourt;
