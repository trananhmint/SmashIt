import { Modal, ScrollView, TouchableOpacity } from "react-native";
import { Image, StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderBar from "../../../components/Atoms/HeaderBar";
import icons from "../../../constants/icons";
import { SIZE } from "../../../theme/fonts";
import { add } from "date-fns";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "../../../theme/colors";
import InputField from "../../../components/Molecules/InputField";
import TransactionService from "../../../services/transaction.service";
import { AuthContext } from "../../../context/AuthContext";
import Oops from "../../../components/Organisms/Oops";
import { formatNumber } from "../../../utils";
import VectorIcon from "../../../components/Atoms/VectorIcon";
import UserService from "../../../services/user.service";
import "moment/locale/vi";
import moment from "moment";
import Loading from "../../../components/Molecules/Loading";

const transactionLog = [
  {
    id: 1,
    logTitle: "Lượt đặt sân",
    action: "withdrawn",
    amount: "100.000",
    timeStamp: "Thứ 3, 5 Th06, 2024, 15:00",
  },
  {
    id: 2,
    logTitle: "Lượt đặt sân",
    action: "withdrawn",
    amount: "100.000",
    timeStamp: "Thứ 3, 5 Th06, 2024, 15:00",
  },
  {
    id: 2,
    logTitle: "Lượt đặt sân",
    action: "withdrawn",
    amount: "100.000",
    timeStamp: "Thứ 3, 5 Th06, 2024, 15:00",
  },
  {
    id: 2,
    logTitle: "Lượt đặt sân",
    action: "withdrawn",
    amount: "100.000",
    timeStamp: "Thứ 3, 5 Th06, 2024, 15:00",
  },
  {
    id: 2,
    logTitle: "Lượt đặt sân",
    action: "withdrawn",
    amount: "100.000",
    timeStamp: "Thứ 3, 5 Th06, 2024, 15:00",
  },
];

const MyWallet = () => {
  const navigate = useNavigation();

  const [isShowAddModal, setIsShowAddModal] = useState(false);
  const [isShowCashOutModal, setIsShowCashOutModal] = useState(false);

  const [history, setHistory] = useState([]);

  const [latestHistory, setLatestHistory] = useState();

  const [addMoney, setAddMoney] = useState(null);

  const [cashOut, setCashOut] = useState(null);

  const [balance, setBalance] = useState(null);

  const { user, token } = useContext(AuthContext);

  const [isLoading, setIsLoading] = useState(false);

  const handleGetIcon = (status) => {
    switch (status) {
      case 1:
        return "clockcircleo";
      case 2:
        return "check";
      case 3:
        return "close";

      default:
        break;
    }
  };

  const handleAddMoney = async () => {
    const body = {
      transactionTypeId: 1,
      amount: addMoney,
    };

    setIsLoading(true);

    const res = await TransactionService.addMoney(body, token);

    if (res >= 200 && res < 300) {
      setIsShowAddModal(false);
      setIsLoading(false);

      navigate.navigate("QRCode", { amount: addMoney });
    }
  };

  const handleCashOut = async () => {
    setIsLoading(true);

    const res = await TransactionService.cashOut(cashOut, token);

    if (res >= 200 && res < 300) {
      setIsShowCashOutModal(false);
      setIsLoading(false);

      navigate.navigate("PaymentInvoice", {
        status: 3,
        condition: 3,
        amount: cashOut,
      });
      console.log("Success");
    }
  };

  const handleGetTitle = (status) => {
    switch (status) {
      case 1:
        return "Nạp tiền vào ví";
      case 2:
        return "Rút tiền khỏi ví";
      case 3:
        return "Đặt sân cầu lông";

      default:
        break;
    }
  };

  const fetchUserWallet = async () => {
    const res = await UserService.getProfile(token);

    if (res) {
      setBalance(res.balance);
    }
  };

  console.log("Balanceeeeeee", balance);

  useEffect(() => {
    const fetchData = async () => {
      const res = await TransactionService.getTransactionById(user?.id, token);

      console.log("res", res);

      if (res) {
        setLatestHistory(res[res.length - 1]);
        setHistory(res.slice().reverse());
      }
    };

    fetchData();
    fetchUserWallet();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <HeaderBar
        text={"Ví của tôi"}
        isGoBack={true}
        goBack={() => navigate.goBack()}
      />
      <View style={styles.walletContainer}>
        <Text style={styles.myBalance}>Số dư của bạn</Text>
        <Text style={styles.balance}>VNĐ {formatNumber(balance)}</Text>
        <View style={styles.historyBalance}>
          {latestHistory &&
          latestHistory?.transactionStatus?.status !== "Verifying" ? (
            <>
              <Text style={styles.amount}>
                {handleGetTitle(latestHistory?.transactionType.id)}
              </Text>
              <Text style={styles.amount}>
                {formatNumber(latestHistory?.amount)}đ
              </Text>
              <Text style={styles.timeStamp}>
                {moment(latestHistory?.timestamp).fromNow()}
              </Text>
            </>
          ) : (
            <Text style={[styles.myBalance, { color: "black" }]}>
              Hiện chưa có giao dịch
            </Text>
          )}
        </View>
      </View>
      <View style={styles.btnGroup}>
        <TouchableOpacity
          onPress={() => setIsShowCashOutModal(true)}
          style={[styles.add, { backgroundColor: "#094978" }]}
        >
          <Image source={icons.ruttien} />
          <Text style={styles.btnText}>Rút tiền</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setIsShowAddModal(true)}
          style={[
            styles.add,
            { backgroundColor: "#299083", paddingVertical: 25 },
          ]}
        >
          <Image source={icons.naptien} style={{ marginBottom: 10 }} />
          <Text style={styles.btnText}>Nạp tiền</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>Lịch sử giao dịch</Text>

      {history.length <= 0 ? (
        <Oops text={"Oops, bạn vẫn chưa tạo giao dịch nào !"} />
      ) : (
        <ScrollView
          style={{ marginBottom: 30 }}
          contentContainerStyle={{ gap: 20 }}
        >
          {history?.map((item, index) => (
            <View key={index} style={[styles.transactionContainer]}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 15,
                }}
              >
                {/* <Image source={icons.translog} /> */}
                <View
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 15,
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor:
                      item.transactionStatus.id === 1
                        ? COLORS.orangeBackground
                        : item.transactionStatus.id === 2
                        ? COLORS.lightGreenBackground
                        : "#FFA27F",
                  }}
                >
                  <VectorIcon.AntDesign
                    size={18}
                    name={handleGetIcon(item.transactionStatus.id)}
                    color={
                      item.transactionStatus.id === 1
                        ? COLORS.orangeText
                        : item.transactionStatus.id === 2
                        ? COLORS.darkGreenText
                        : COLORS.red
                    }
                  />
                </View>
                <View style={styles.transactionDetail}>
                  <Text style={styles.tTile}>
                    {item.transactionStatus.id === 1
                      ? "Đang xử lí giao dịch"
                      : `${handleGetTitle(item.transactionTypeId)}`}
                  </Text>
                  {/* <Text style={styles.tTime}>{item.timeStamp}</Text> */}
                </View>
              </View>
              <Text
                style={[
                  styles.amount,
                  {
                    color: item.transactionTypeId === 1 ? "#2A9083" : "#FF0854",
                  },
                ]}
              >
                {item.transactionTypeId === 1 ? "+" : "-"}{" "}
                {formatNumber(item.amount)}đ
              </Text>
            </View>
          ))}
        </ScrollView>
      )}

      <Modal
        animationType="slide"
        transparent={true}
        visible={isShowAddModal}
        statusBarTranslucent={true}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setIsShowAddModal(!isShowAddModal);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text
              style={[
                styles.myBalance,
                { color: COLORS.black, alignSelf: "center", fontSize: 22 },
              ]}
            >
              Nạp tiền
            </Text>

            <InputField
              inputType={"normal"}
              placeholderText={"Nhập số tiền cần nạp..."}
              inputData={addMoney}
              setInputData={setAddMoney}
            />
            <TouchableOpacity
              style={[styles.button, { marginBottom: 10, marginTop: 20 }]}
              onPress={() => handleAddMoney()}
            >
              <Text style={styles.myBalance}>Xác nhận</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button2, {}]}
              onPress={() => setIsShowAddModal(false)}
            >
              <Text style={[styles.myBalance, { color: COLORS.orangeText }]}>
                Hủy
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isShowCashOutModal}
        statusBarTranslucent={true}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setIsShowCashOutModal(!isShowCashOutModal);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text
              style={[
                styles.myBalance,
                { color: COLORS.black, alignSelf: "center", fontSize: 22 },
              ]}
            >
              Rút tiền
            </Text>

            <InputField
              inputType={"normal"}
              placeholderText={"Nhập số tiền cần nạp..."}
              inputData={cashOut}
              setInputData={setCashOut}
            />
            <TouchableOpacity
              style={[styles.button, { marginBottom: 10, marginTop: 20 }]}
              onPress={() => handleCashOut()}
            >
              <Text style={styles.myBalance}>Xác nhận</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button2, {}]}
              onPress={() => setIsShowCashOutModal(false)}
            >
              <Text style={[styles.myBalance, { color: COLORS.orangeText }]}>
                Hủy
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default MyWallet;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },

  button: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.orangeText,
    paddingVertical: 15,
    borderRadius: 10,
  },
  button2: {
    alignItems: "center",
    justifyContent: "center",
    borderColor: COLORS.orangeText,
    borderWidth: 1,
    paddingVertical: 15,
    borderRadius: 10,
  },
  walletContainer: {
    marginTop: 25,
    paddingHorizontal: 30,
    paddingVertical: 30,
    borderRadius: 20,
    backgroundColor: "#F37148",
    marginHorizontal: 15,
  },
  myBalance: {
    fontSize: SIZE.size_16,
    fontFamily: "quicksand-semibold",
    color: "white",
  },
  balance: {
    fontSize: 24,
    fontFamily: "quicksand-bold",
    color: "white",
    marginTop: 10,
    marginBottom: 20,
  },
  historyBalance: {
    borderRadius: 10,
    backgroundColor: "white",
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  amount: {
    fontSize: SIZE.size_16,
    fontFamily: "quicksand-bold",
    color: "#2A9083",
  },
  timeStamp: {
    fontSize: SIZE.size_12,
    fontFamily: "quicksand-semibold",
    color: "#939393",
  },
  btnGroup: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 40,
    marginTop: 30,
  },
  add: {
    borderRadius: 10,
    paddingVertical: 20,
    paddingHorizontal: 12,
    width: 170,
    alignItems: "center",
  },
  btnText: {
    marginTop: 15,
    fontSize: SIZE.size_16,
    fontFamily: "quicksand-semibold",
    color: "white",
  },
  title: {
    fontSize: SIZE.size_16,
    fontFamily: "quicksand-semibold",
    marginLeft: 15,
    marginTop: 20,
    marginBottom: 20,
  },
  transactionContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
  },
  tTile: {
    fontSize: SIZE.size_14,
    fontFamily: "quicksand-medium",
    marginBottom: 5,
  },
  tTime: {
    fontSize: SIZE.size_12,
    fontFamily: "quicksand-medium",
    color: "#A1A1A1",
  },
  amount: {
    fontSize: SIZE.size_14,
    fontFamily: "quicksand-semibold",
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
    paddingBottom: 45,
    paddingHorizontal: 25,
    borderColor: COLORS.darkGreyBorder,
    borderWidth: 1,
    width: "90%",
    paddingTop: 10,
  },

  modalText: {
    fontSize: SIZE.size_16,
    fontFamily: "quicksand-medium",
    marginBottom: 3,
  },
});
