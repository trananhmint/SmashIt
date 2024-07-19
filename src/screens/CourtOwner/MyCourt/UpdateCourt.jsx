import {
    FlatList,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    View,
  } from "react-native";
  import React, { useContext, useEffect, useState } from "react";
  import { SIZE } from "../../../theme/fonts";
  import InputField from "../../../components/Molecules/InputField";
  import { COLORS } from "../../../theme/colors";
  import HeaderBar from "../../../components/Atoms/HeaderBar";
  import images from "../../../constants/images";
  import InputImage from "../../../components/Molecules/InputImage";
  import { CourtOwnerContext } from "../../../context/CourtOwnerContext";
  import { convertToTime } from "../../../utils";
  
  export default function UpdateCourt({ navigation }) {
    const { courtInfo } = useContext(CourtOwnerContext);
  
    console.log(courtInfo);
  
    const [courtPriceHoliday, setCourtPriceHoliday] = useState(
      courtInfo?.priceAtHoliday ?? ""
    );
    const [courtPriceWeekend, setCourtPriceWeekend] = useState(
      courtInfo?.priceAtWeekend ?? ""
    );
    const [courtPrice, setCourtPrice] = useState(courtInfo?.pricePerHour ?? "");
    const [courtQuantity, setCourtQuantity] = useState(
      courtInfo?.numberOfCourt ?? 0
    );
    const [courtName, setCourtName] = useState(courtInfo?.courtName ?? "");
    const [courtImage, setCourtImage] = useState(
      courtInfo?.profileImage ? [courtInfo?.profileImage] : []
    );
    const [courtCloseTime, setCourtCloseTime] = useState(
      convertToTime(courtInfo.hourEnd, courtInfo.minuteEnd)
    );
    const [courtOpenTime, setCourtOpenTime] = useState(
      convertToTime(courtInfo.hourStart, courtInfo.minuteStart)
    );
  
    const modifiedImageList = [...courtImage, { type: "input" }];
  
    const handleSave = () => {
      navigation.navigate("BookingManagement");
    };
  
    return (
      <View style={{ flex: 1, backgroundColor: COLORS.white }}>
        <HeaderBar
          text={"Cập nhật thông tin sân"}
          isGoBack={true}
          goBack={() => navigation.goBack()}
          actionText={"Lưu"}
          actionStyle={{
            fontFamily: "quicksand-bold",
            fontSize: SIZE.size_16,
            color: COLORS.darkGreenText,
          }}
          action={handleSave}
        />
        <ScrollView style={styles.container}>
          <Text style={styles.descriptionText}>
            Để đảm bảo sự và thuận tiện cho việc truy cập và đặt sân cho người
            chơi, hãy cung cấp thêm chi tiết về vị trí sân của bạn.
          </Text>
  
          <View style={{ gap: 20 }}>
            <View>
              <View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text
                    style={{
                      fontSize: SIZE.size_14,
                      fontFamily: "quicksand-semibold",
                      marginBottom: 7,
                    }}
                  >
                    Ảnh đại diện sân
                  </Text>
  
                  <Text
                    style={{
                      fontSize: SIZE.size_14,
                      fontFamily: "quicksand-semibold",
                    }}
                  >
                    {courtImage.length} / 10
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    gap: 10,
                  }}
                >
                  <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ gap: 10 }}
                    data={modifiedImageList}
                    renderItem={({ item }) => {
                      if (item?.type === "input" && courtImage.length < 10) {
                        return (
                          <View>
                            <InputImage
                              allowMultiple={true}
                              data={courtImage}
                              setData={setCourtImage}
                              style={{
                                width: 128,
                                height: undefined,
                                aspectRatio: 128 / 192,
                              }}
                            />
                          </View>
                        );
                      }
  
                      if (!item?.type) {
                        return (
                          <View>
                            <Image source={{ uri: item }} style={styles.image} />
                          </View>
                        );
                      }
                    }}
                  />
                </View>
              </View>
            </View>
            <InputField
              inputType={"normal"}
              primaryText={"Tên sân"}
              placeholderText={"Tên sân"}
              inputData={courtName}
              setInputData={setCourtName}
            />
            <InputField
              inputType={"number"}
              primaryText={"Số lượng sân"}
              inputData={courtQuantity}
              setInputData={setCourtQuantity}
            />
            <View>
              <View style={{ flexDirection: "row", gap: 10 }}>
                <View style={{ flex: 1 }}>
                  <InputField
                    inputType={"datetime"}
                    primaryText={"Giờ mở lượt chơi"}
                    iconFamily={"AntDesign"}
                    placeholderText={"Giờ"}
                    inputData={courtOpenTime}
                    setInputData={setCourtOpenTime}
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <InputField
                    inputType={"datetime"}
                    primaryText={"Giờ đóng lượt chơi"}
                    placeholderText={"Giờ"}
                    inputData={courtCloseTime}
                    setInputData={setCourtCloseTime}
                  />
                </View>
              </View>
  
              <Text
                style={{
                  fontSize: SIZE.size_12,
                  fontFamily: "quicksand-semibold",
                  color: "#737373",
                  marginTop: 20,
                }}
              >
                Lưu ý: Nếu chủ sân có nhu cầu điều chỉnh giá sân vào các dịp lễ
                hoặc cuối tuần (thứ 7 và chủ nhật)
              </Text>
            </View>
  
            <InputField
              inputType={"icon"}
              iconBackgroundColor={COLORS.white}
              iconText={"đ"}
              primaryText={"Giá thuê sân theo ngày thường"}
              placeholderText={"Giá sân"}
              inputData={courtPrice}
              setInputData={setCourtPrice}
              valueType={"number"}
            />
            <InputField
              inputType={"icon"}
              iconBackgroundColor={COLORS.white}
              iconText={"đ"}
              primaryText={"Giá thuê sân theo cuối tuần"}
              placeholderText={"Giá sân"}
              secondaryText={"nếu có"}
              noteText={
                "Lưu ý: Nếu chủ sân có nhu cầu điều chỉnh giá sân vào các dịp lễ hoặc cuối tuần (thứ 7 và chủ nhật)"
              }
              inputData={courtPriceWeekend}
              setInputData={setCourtPriceWeekend}
              valueType={"number"}
            />
            <InputField
              inputType={"icon"}
              iconBackgroundColor={COLORS.white}
              iconText={"đ"}
              primaryText={"Giá thuê sân theo ngày lễ"}
              placeholderText={"Giá sân"}
              secondaryText={"nếu có"}
              noteText={
                "Lưu ý: Nếu chủ sân có nhu cầu điều chỉnh giá sân vào các dịp lễ"
              }
              inputData={courtPriceHoliday}
              setInputData={setCourtPriceHoliday}
              valueType={"number"}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 15,
      marginBottom: 20,
    },
  
    descriptionText: {
      fontSize: SIZE.size_14,
      fontFamily: "quicksand-medium",
      marginBottom: 30,
    },
  
    additionText: {
      fontFamily: "quicksand-semibold",
      fontSize: SIZE.size_12,
      color: "#737373",
      marginTop: 45,
    },
  
    image: {
      width: 190,
      height: undefined,
      aspectRatio: 190 / 192,
      borderRadius: 6,
    },
  });