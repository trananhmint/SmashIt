import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { VStack, Radio, Text, Divider } from "native-base";
import HeaderBar from "../../../components/Atoms/HeaderBar";

const languages = [
  "Tiếng Anh (English)",
  "Tiếng Việt (Vietnamese)",
  "Tiếng Nhật (日本語)",
];

const Languages = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  return (
    <View>
      <HeaderBar text={"Cài đặt ngôn ngữ"} isGoBack={true} />
      <VStack space={4} alignItems="flex-start" p={4}>
        <Radio.Group
          name="languageGroup"
          value={selectedLanguage}
          onChange={(nextValue) => setSelectedLanguage(nextValue)}
        >
          <Radio value="en" my={1}>
            <Text>Tiếng Anh (English)</Text>
          </Radio>
          <Divider my={2} />
          <Radio value="vi" my={1}>
            <Text>Tiếng Việt (Vietnamese)</Text>
          </Radio>
          <Divider my={2} />
          <Radio value="jp" my={1}>
            <Text>Tiếng Nhật (日本語)</Text>
          </Radio>
        </Radio.Group>
      </VStack>
    </View>
  );
};

export default Languages;

// const styles = StyleSheet.create({
//   languageContainer: { paddingHorizontal: 12 },
//   bottomDivider: {
//     height: 1,
//     backgroundColor: "#E5E5E5",
//     marginVertical: 20,
//   },
// });
