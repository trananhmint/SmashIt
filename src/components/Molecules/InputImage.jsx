import {
    Image,
    Modal,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
  } from "react-native";
  import React, { useState } from "react";
  import { SIZE } from "../../theme/fonts";
  import VectorIcon from "../Atoms/VectorIcon";
  import * as ImagePicker from "expo-image-picker";
  import { METRICS } from "../../theme/metrics";
  import { COLORS } from "../../theme/colors";
  
  export default function InputImage({ style, data, setData, allowMultiple }) {
    const [image, setImage] = useState("");
  
    const [isModalOpen, setIsModalOpen] = useState(false);
  
    const uploadImage = async (mode) => {
      let result = {};
      setIsModalOpen(false);
  
      try {
        if (mode === "camera") {
          await ImagePicker.requestCameraPermissionsAsync();
          result = await ImagePicker.launchCameraAsync({
            cameraType: ImagePicker.CameraType.back,
            allowsEditing: true,
            aspect: [330, 192],
            quality: 1,
          });
        } else {
          await ImagePicker.requestMediaLibraryPermissionsAsync();
          result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: allowMultiple ? false : true,
            aspect: [330, 192],
            quality: 1,
            allowsMultipleSelection: allowMultiple ? true : false,
          });
        }
  
        if (!result.canceled) {
          setData((prevData) => [
            ...prevData,
            ...result.assets.map((item) => item.uri),
          ]);
        }
      } catch (error) {
        console.log(error);
      }
    };
  
    return (
      <>
        <TouchableOpacity
          style={[styles.imagePicker, style]}
          onPress={() => {
            setIsModalOpen(true);
          }}
        >
          {data && !allowMultiple && data.length > 0 ? (
            <Image source={{ uri: data[0] }} style={styles.image} />
          ) : (
            <View style={{ alignItems: "center", gap: 7 }}>
              <VectorIcon.Entypo name="images" size={20} />
              <Text
                style={[styles.primaryText, { fontFamily: "quicksand-regular" }]}
              >
                Thêm ảnh
              </Text>
            </View>
          )}
        </TouchableOpacity>
  
        <Modal
          animationType="slide"
          transparent={true}
          visible={isModalOpen}
          statusBarTranslucent={true}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setIsModalOpen(!isModalOpen);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <TouchableOpacity
                style={styles.modalItem}
                onPress={() => uploadImage("gallery")}
              >
                <VectorIcon.FontAwesome
                  name="photo"
                  size={20}
                  color={COLORS.darkGreenText}
                />
                <Text style={styles.modalText}>Chọn trong thư viện</Text>
              </TouchableOpacity>
  
              <View
                style={{
                  width: "100%",
                  height: 1,
                  backgroundColor: COLORS.darkGreenText,
                }}
              ></View>
  
              <TouchableOpacity
                style={styles.modalItem}
                onPress={() => uploadImage("camera")}
              >
                <VectorIcon.FontAwesome
                  name="camera"
                  size={20}
                  color={COLORS.darkGreenText}
                />
                <Text style={styles.modalText}>Chụp ảnh</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button]}
                onPress={() => setIsModalOpen(!isModalOpen)}
              >
                <Text style={styles.buttonText}>Hủy</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </>
    );
  }
  
  const styles = StyleSheet.create({
    primaryText: {
      fontSize: SIZE.size_14,
      fontFamily: "quicksand-semibold",
      marginBottom: 7,
    },
  
    image: {
      width: "100%",
      height: "100%",
    },
  
    imagePicker: {
      width: "100%",
      height: undefined,
      aspectRatio: 330 / 192,
      borderColor: "#D1D1D1",
      borderWidth: 1,
      borderRadius: 6,
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden",
    },
  
    modalText: {
      fontSize: SIZE.size_16,
      fontFamily: "quicksand-medium",
      marginBottom: 3,
    },
  
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalView: {
      backgroundColor: "white",
      borderRadius: 8,
      paddingTop: 30,
      paddingBottom: 45,
      paddingHorizontal: 25,
      gap: 20,
      borderColor: COLORS.darkGreyBorder,
      borderWidth: 1,
      width: "70%",
    },
  
    modalItem: {
      flexDirection: "row",
      gap: 15,
      alignItems: "center",
    },
  
    button: {
      position: "absolute",
      bottom: 10,
      right: 20,
    },
  
    buttonText: {
      fontFamily: "quicksand-bold",
      color: COLORS.darkGreenText,
      fontSize: SIZE.size_18,
    },
  });