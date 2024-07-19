import {
    Keyboard,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
  } from "react-native";
  import React, { useContext, useEffect, useState } from "react";
  import HeaderBar from "../../../components/Atoms/HeaderBar";
  import { COLORS } from "../../../theme/colors";
  import InputField from "../../../components/Molecules/InputField";
  import { SIZE } from "../../../theme/fonts";
  import SlotChip from "../../../components/Molecules/SlotChip";
  import VectorIcon from "../../../components/Atoms/VectorIcon";
  import { SafeAreaView } from "react-native-safe-area-context";
  import { CourtOwnerContext } from "../../../context/CourtOwnerContext";
  import { Actionsheet } from "native-base";
  import CourtService from "../../../services/court.service";
  
  export default function CreateBooking({ navigation, route }) {
    const { chosenDate, courtCodeId, courtCodeNum } = route.params;
  
    console.log(chosenDate);
  
    const { courtCodeList, courtInfo } = useContext(CourtOwnerContext);
  
    const [chosenSlot, setChosenSlot] = useState(null);
  
    const [slotList, setSlotList] = useState([]);
  
    const [courtCode, setCourtCode] = useState(`Sân ${courtCodeNum}`);
  
    const [courtCodeTemp, setCourtCodeTemp] = useState(null);
  
    const [paymentMethod, setPaymentMethod] = useState(null);
  
    const [isOpenPaymentMethod, setIsOpenMethod] = useState(false);
  
    const [isOpenCourtCode, setIsOpenCourtCode] = useState(false);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const res = await CourtService.generateSlotByDateAndCourtCode(
            courtInfo?.id,
            chosenDate,
            courtCodeId,
            token
          );
          if (res) {
            setSlotList(res.generateSlotResponse.slotWithStatusResponses);
          }
        } catch (error) {
        } finally {
        }
      };
  
      fetchData();
    }, [chosenDate]);
  
    return (
      <View style={{ flex: 1, backgroundColor: COLORS.white }}>
        <HeaderBar
          text={"Tạo lịch đặt sân"}
          isGoBack={true}
          goBack={() => navigation.goBack()}
        />
  
        <View style={styles.container}>
          <InputField
            inputType={"normal"}
            placeholderText={"Họ và tên"}
            primaryText={"Họ và tên khách hàng"}
          />
          <InputField
            inputType={"normal"}
            placeholderText={"Số điện thoại"}
            primaryText={"Số điện thoại khách hàng"}
          />
          <InputField
            inputType={"dropdown"}
            placeholderText={"Hình thức thanh toán"}
            primaryText={"Hình thức thanh toán"}
          />
          <InputField
            inputType={"dropdown"}
            placeholderText={"Vị trí sân"}
            primaryText={"Vị trí sân"}
            inputData={courtCodeTemp}
            setInputData={setCourtCodeTemp}
            setIsOpenDropDown={setIsOpenCourtCode}
          />
  
          <View style={{ flex: 1 }}>
            <Text
              style={{
                fontSize: SIZE.size_14,
                fontFamily: "quicksand-semibold",
                marginBottom: 7,
              }}
            >
              Chọn khung giờ đặt
            </Text>
            <SlotChip
              slotList={slotList}
              chosenSlot={chosenSlot}
              setChosenSlot={setChosenSlot}
            />
          </View>
  
          <View style={[styles.buttonSection]}>
            <View style={styles.noteSection}>
              <View style={styles.noteItem}>
                <View
                  style={[
                    styles.noteIcon,
                    {
                      backgroundColor: "rgba(42,144,131,0.1)",
                    },
                  ]}
                >
                  <VectorIcon.AntDesign
                    name="clockcircleo"
                    size={12}
                    color={COLORS.darkGreenText}
                  />
                </View>
                <Text style={styles.noteText}>Khung giờ còn trống</Text>
              </View>
  
              <View style={styles.noteItem}>
                <View
                  style={[
                    styles.noteIcon,
                    {
                      backgroundColor: COLORS.orangeBackground,
                    },
                  ]}
                >
                  <VectorIcon.AntDesign
                    name="clockcircleo"
                    size={12}
                    color={COLORS.orangeText}
                  />
                </View>
                <Text style={styles.noteText}>Đang đặt</Text>
              </View>
            </View>
  
            <TouchableOpacity style={styles.button} activeOpacity={0.5}>
              <Text style={styles.buttonText}>Tạo lịch</Text>
            </TouchableOpacity>
          </View>
        </View>
  
        <Actionsheet
          isOpen={isOpenCourtCode}
          onClose={() => setIsOpenCourtCode(false)}
        >
          <Actionsheet.Content>
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                gap: 15,
                alignItems: "flex-start",
              }}
            >
              {courtCodeList.length > 0 &&
                courtCodeList.map((item) => (
                  <TouchableOpacity
                    onPress={() => {
                      setCourtCode(item.id);
                      setCourtCodeTemp(`Sân ${item.courtCode}`);
                      setIsOpenCourtCode(false);
                    }}
                    style={{
                      borderBottomColor: COLORS.darkGreyBorder,
                      paddingBottom: 15,
                    }}
                  >
                    <Text style={styles.bankText}>Sân {item?.courtCode}</Text>
                  </TouchableOpacity>
                ))}
            </ScrollView>
          </Actionsheet.Content>
        </Actionsheet>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: 20,
      paddingHorizontal: 15,
      gap: 15,
      marginBottom: 60,
    },
  
    buttonSection: {
      bottom: -30,
      paddingHorizontal: 25,
    },
  
    bankText: {
      fontSize: SIZE.size_16,
      fontFamily: "quicksand-medium",
      textAlign: "left",
    },
  
    button: {
      width: "100%",
      paddingVertical: 15,
      backgroundColor: COLORS.orangeText,
      borderRadius: 10,
      justifyContent: "center",
      alignItems: "center",
    },
  
    buttonText: {
      fontSize: SIZE.size_16,
      fontFamily: "quicksand-semibold",
      color: "white",
    },
  
    noteSection: {
      width: "100%",
      flexDirection: "row",
      justifyContent: "center",
      gap: 40,
      position: "relative",
      bottom: 20,
    },
  
    noteItem: {
      gap: 10,
      flexDirection: "row",
      alignItems: "center",
    },
  
    noteText: {
      fontSize: SIZE.size_12,
      fontFamily: "quicksand-regular",
    },
  
    noteIcon: {
      padding: 8,
      borderRadius: 8,
    },
  });