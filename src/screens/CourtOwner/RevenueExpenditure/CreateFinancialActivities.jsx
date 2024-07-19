import {
  FlatList,
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useState } from "react";
import { COLORS } from "../../../theme/colors";
import HeaderBar from "../../../components/Atoms/HeaderBar";
import icons from "../../../constants/icons";
import { SIZE } from "../../../theme/fonts";
import TabBar from "../../../components/Molecules/TabBar";
import InputField from "../../../components/Molecules/InputField";
import * as SecureStore from "expo-secure-store";
import { LoadingContext } from "../../../context/LoadingContext";
import FinancialService from "../../../services/financial.service";
import { AuthContext } from "../../../context/AuthContext";
import SelectField from "../../../components/Molecules/SelectField";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
import Loading from "../../../components/Molecules/Loading";

export default function CreateFinancialActivities({ navigation }) {
  const [tab, setTab] = useState(1);

  const { token } = useContext(AuthContext);

  const [chosenService, setChosenService] = useState(null);

  const [isOpenSheet, setIsOpenSheet] = useState(false);

  const [isOpenDatePicker, setIsOpenDatePicker] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const [note, setNote] = useState("");
  const [date, setDate] = useState(new Date());
  const [tempDate, setTempDate] = useState("");
  const [total, setTotal] = useState("");

  const handlePickTime = (date) => {
    console.log(date);

    const updatedTime = moment.utc(date).add(7, "hours").toDate();

    setDate(updatedTime);

    setTempDate(formatDate(updatedTime));
  };

  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getUTCDate();
    const month = date.getUTCMonth() + 1; // Months are zero-based, so add 1
    const year = date.getUTCFullYear();

    const monthString = `Th${month}`;

    return `${day} ${monthString}, ${year}`;
  }

  const handleGetTotal = (amount) => {
    if (tab === 1) {
      return amount;
    } else {
      return -amount;
    }
  };

  const handleCreate = async () => {
    const body = {
      transactionTypeId: chosenService?.id,
      amount: handleGetTotal(total),
      dateTime: date.toISOString(),
    };

    try {
      setIsLoading(true);

      const res = await FinancialService.addNewActivity(body, token);

      console.log(body);
    } catch (error) {
      console.error(error);
    } finally {
      navigation.navigate("FinancialBook");
    }
  };

  const actvitiyList = [
    {
      id: 4,
      name: "Sân cầu",
      image: icons.court,
    },
    {
      id: 5,
      name: "Quảng cáo",
      image: icons.ads2,
    },
    {
      id: 6,
      name: "Giải đấu",
      image: icons.tournament,
    },
    {
      id: 7,
      name: "Điện nước",
      image: icons.water,
    },
  ];

  const tabItem = [
    { id: 1, name: "Thu nhập" },
    {
      id: 2,
      name: "Chi phí",
    },
  ];

  if (isLoading) {
    return <Loading />;
  }

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.white }}>
      <HeaderBar
        text={"Sổ thu chi"}
        isGoBack={true}
        goBack={() => navigation.goBack()}
      />

      <TabBar
        tabItem={tabItem}
        currentTab={tab}
        setTab={setTab}
        tabBarStyle={{ justifyContent: "space-around", marginTop: 0 }}
        fontSize={16}
      />

      <KeyboardAvoidingView style={styles.container}>
        <FlatList
          data={actvitiyList}
          numColumns={4}
          columnWrapperStyle={{ justifyContent: "space-between" }}
          renderItem={({ item }) => {
            return (
              <View style={{ alignItems: "center", gap: 8 }}>
                <TouchableOpacity
                  style={[
                    styles.imageContainer,
                    chosenService?.name === item.name && {
                      backgroundColor: COLORS.orangeBackground,
                    },
                  ]}
                  activeOpacity={0.5}
                  onPress={() => {
                    setChosenService({ name: item.name, id: item.id });
                    setDate("");
                    setTempDate("");
                    setTotal("");
                  }}
                >
                  <Image
                    source={item.image}
                    style={[
                      chosenService?.name === item.name
                        ? {
                            tintColor: COLORS.orangeText,
                          }
                        : {
                            tintColor: COLORS.lightGreenText,
                          },

                      item.name === "Quảng cáo" && { width: 32, height: 32 },
                    ]}
                  />
                </TouchableOpacity>

                <Text style={styles.semiboldText}>{item.name}</Text>
              </View>
            );
          }}
        />
      </KeyboardAvoidingView>

      {chosenService && (
        <View style={styles.sheet}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={[styles.semiboldText, { fontSize: SIZE.size_16 }]}>
              Loại hình {tab === 1 ? "thu nhập" : "chi phí"}:{" "}
            </Text>
            <Text style={[styles.semiboldText, { fontSize: SIZE.size_16 }]}>
              {chosenService.name}
            </Text>
          </View>

          <View style={{ gap: 20, marginTop: 20, marginBottom: 30 }}>
            {/* <InputField
              inputType={"normal"}
              primaryText={"Ghi chú"}
              placeholderText={"Nhập ghi chú"}
              inputData={note}
              setInputData={setNote}
            /> */}
            <View>
              <Text style={styles.primaryText}>Ngày tạo</Text>
              <SelectField
                iconFamily={"AntDesign"}
                iconName={"caretdown"}
                iconSize={18}
                primaryText={"Ngày tạo"}
                placeholder={"Nhập ngày tạo"}
                action={() => setIsOpenDatePicker(true)}
                inputValue={tempDate}
              />
            </View>

            <DateTimePickerModal
              locale="vi"
              isVisible={isOpenDatePicker}
              mode="date"
              onConfirm={(value) => handlePickTime(value)}
              onCancel={() => setIsOpenDatePicker(false)}
              cancelTextIOS="Hủy"
              confirmTextIOS="Xác nhận"
            />

            <InputField
              inputType={"icon"}
              iconBackgroundColor={COLORS.white}
              iconText={"đ"}
              primaryText={"Tổng chi phí"}
              placeholderText={"Nhập tổng chi phí"}
              inputData={total}
              setInputData={setTotal}
              valueType={"number"}
            />
          </View>

          <TouchableOpacity style={styles.button} onPress={handleCreate}>
            <Text
              style={[
                styles.semiboldText,
                { fontSize: SIZE.size_16, color: COLORS.white },
              ]}
            >
              Thêm mục mới
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setChosenService(null);
              setDate("");
              setTotal("");
            }}
            style={[
              styles.button,
              {
                backgroundColor: "transparent",
                marginTop: 15,
                borderColor: COLORS.orangeText,
                borderWidth: 1,
              },
            ]}
          >
            <Text
              style={[
                styles.semiboldText,
                { fontSize: SIZE.size_16, color: COLORS.orangeText },
              ]}
            >
              Đóng
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    flex: 1,
    position: "relative",
  },

  primaryText: {
    fontSize: SIZE.size_14,
    fontFamily: "quicksand-semibold",
  },

  imageContainer: {
    padding: 5,
    backgroundColor: COLORS.lightGreenBackground,
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },

  semiboldText: {
    fontFamily: "quicksand-semibold",
    fontSize: SIZE.size_12,
  },

  sheet: {
    paddingHorizontal: 15,
    // gap: 20,
    position: "relative",
    bottom: 20,
    borderTopWidth: 0.5,
    paddingTop: 10,
    borderRadius: 8,
    zIndex: 100,
    backgroundColor: COLORS.white,
  },

  button: {
    backgroundColor: COLORS.orangeText,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15,
    borderRadius: 8,
  },
});
