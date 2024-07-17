import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SIZE } from "../../../theme/fonts";
import InputField from "../../../components/Molecules/InputField";
import { Actionsheet } from "native-base";
import BankService from "../../../services/bank.service";
import { ErrorText } from "../../../constants/errors";
import { COLORS } from "../../../theme/colors";

export default function PaymentMethod({
  bank,
  setBank,
  cardNumber,
  setCardNumber,
}) {
  const [isOpenDropDown, setIsOpenDropDown] = useState(false);

  const [bankList, setBankList] = useState([]);

  const [errorText, setErrorText] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const res = await BankService.getBankList();
      if (res) {
        setBankList(res);
      } else {
        setErrorText(ErrorText.getBankList);
      }
    };

    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.descriptionText}>
        Để thuận tiện hơn trong việc giao dịch đặt sân của người chơi và chủ
        sân. Hãy thiết lập phương thức giao dịch
      </Text>

      <View style={{ gap: 20 }}>
        <InputField
          inputType={"dropdown"}
          primaryText={"Chọn ngân hàng"}
          placeholderText={"Ngân hàng"}
          inputData={bank}
          setInputData={setBank}
          setIsOpenDropDown={setIsOpenDropDown}
        />

        <InputField
          inputType={"normal"}
          primaryText={"Số tài khoản ngân hàng"}
          placeholderText={"Số tài khoản"}
          inputData={cardNumber}
          setInputData={setCardNumber}
        />
      </View>

      <Actionsheet
        isOpen={isOpenDropDown}
        onClose={() => setIsOpenDropDown(false)}
      >
        <Actionsheet.Content>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              gap: 15,
            }}
          >
            {bankList.length > 0 &&
              bankList.map((item) => (
                <TouchableOpacity
                  onPress={() => {
                    setBank(item.bankName);
                    setIsOpenDropDown(false);
                  }}
                  style={{
                    borderBottomWidth: 1,
                    borderBottomColor: COLORS.darkGreyBorder,
                    paddingBottom: 15,
                  }}
                >
                  <Text style={styles.bankText}>{item?.bankName}</Text>
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
  },

  bankText: {
    fontSize: SIZE.size_16,
    fontFamily: "quicksand-medium",
  },

  descriptionText: {
    fontSize: SIZE.size_14,
    fontFamily: "quicksand-medium",
    marginBottom: 30,
  },
});
