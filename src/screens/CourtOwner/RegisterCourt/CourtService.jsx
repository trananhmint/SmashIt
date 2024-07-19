import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { SIZE } from "../../../theme/fonts";
import InputField from "../../../components/Molecules/InputField";
import Chip from "../../../components/Atoms/Chip";
import { COLORS } from "../../../theme/colors";

export default function CourtService({
  courtServiceList,
  setCourtServiceList,
}) {
  const serviceList = [
    "Wi-fi",
    "Tổ chức giải đấu",
    "Giữ xe miễn phí",
    "Quầy giữ đồ",
    "Chăm sóc y tế",
    "Canteen",
  ];

  const [inputText, setInputText] = useState("");

  const handleAddService = () => {
    if (inputText) {
      setCourtServiceList((prev) => [...prev, { serviceName: inputText }]);
    } else {
      console.log("Input First");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.descriptionText}>
        Hãy chọn những dịch vụ hiện đang có ở địa điểm sân của bạn.
      </Text>

      <View style={{ gap: 20 }}>
        <InputField
          inputType={"icon"}
          primaryText={"Thêm dịch vụ tiện ích"}
          placeholderText={"Dịch vụ"}
          iconBackgroundColor={COLORS.orangeText}
          iconFamily={"AntDesign"}
          iconName={"plus"}
          iconColor={COLORS.white}
          iconSize={20}
          action={handleAddService}
          inputData={inputText}
          setInputData={setInputText}
        />
        <View>
          <InputField primaryText={"Gợi ý dịch vụ"} />

          <ScrollView
            contentContainerStyle={{
              flexDirection: "row",
              flexWrap: "wrap",
              columnGap: 5,
              rowGap: 10,
            }}
          >
            {serviceList.map((item, index) => (
              <View key={index}>
                <Chip
                  borderColor={"rgba(217, 217, 217, 0.5)"}
                  text={item}
                  backgroundColor={COLORS.white}
                  textFamily={"quicksand-regular"}
                />
              </View>
            ))}
          </ScrollView>

          <Text
            style={{
              fontSize: SIZE.size_12,
              fontFamily: "quicksand-semibold",
              color: "#737373",
              marginTop: 10,
            }}
          >
            Lưu ý: Chủ sân chỉ có thể chọn giới hạn 10 dịch vụ tiện ích tại sân
          </Text>
        </View>

        <View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 15,
              marginBottom: 15,
            }}
          >
            <Text style={styles.titleText}>Dịch vụ được thêm</Text>
            <Text style={styles.titleText}>
              {courtServiceList.length} / 10{" "}
            </Text>
          </View>

          <ScrollView
            contentContainerStyle={{
              flexDirection: "row",
              flexWrap: "wrap",
              columnGap: 5,
              rowGap: 10,
            }}
          >
            {courtServiceList.map((item, index) => (
              <View key={index}>
                <Chip
                  borderColor={COLORS.orangeText}
                  text={item.serviceName}
                  backgroundColor={COLORS.orangeText}
                  textFamily={"quicksand-medium"}
                  textColor={"white"}
                  action={() =>
                    setCourtServiceList((prev) =>
                      prev.filter((data) => data.serviceName !== item)
                    )
                  }
                />
              </View>
            ))}
          </ScrollView>
        </View>
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

  titleText: {
    fontSize: SIZE.size_14,
    fontFamily: "quicksand-semibold",
  },
});
