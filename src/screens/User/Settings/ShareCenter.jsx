import { StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import HeaderBar from "../../../components/Atoms/HeaderBar";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../../../components/Atoms/CustomButton";

const ShareCenter = () => {
  const navigate = useNavigation();
  const [feedback, setFeedback] = useState("");
  return (
    <SafeAreaView style={styles.container}>
      <HeaderBar
        text={"Chia sẻ phản hồi"}
        isGoBack={true}
        goBack={() => navigate.goBack()}
      />
      <Text style={styles.title}>
        Trải nghiệm của bạn về ứng dụng đặt sân như thế nào? Hãy để lại nhận xét
        của bạn
      </Text>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Lời nhận xét</Text>
        <TextInput
          placeholder="Hãy viết nhận xét của bạn ở đây"
          value={feedback}
          style={styles.input}
          multiline
          onChange={(e) => setFeedback(e)}
        />
      </View>
      <View style={{ paddingHorizontal: 25 }}>
        <CustomButton
          title={"Xác nhận"}
          py={12}
          px={123}
          backgroundColor={"#F37148"}
          color={"white"}
        />
      </View>
    </SafeAreaView>
  );
};

export default ShareCenter;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  title: {
    paddingHorizontal: 25,
    fontSize: 16,
    fontFamily: "quicksand-semibold",
    marginTop: 20,
    textAlign: "center",
  },
  inputContainer: {
    paddingHorizontal: 25,
    marginTop: 40,
    marginBottom: 30,
  },
  label: {
    fontSize: 14,
    fontFamily: "quicksand-semibold",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#D1D1D1",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 16,
    height: 150,
    textAlignVertical: "top",
    fontFamily: "quicksand-regular",
    fontSize: 16,
  },
}); 