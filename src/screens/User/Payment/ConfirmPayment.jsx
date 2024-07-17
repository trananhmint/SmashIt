import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { COLORS } from "../../../theme/colors";
import HeaderBar from "../../../components/Atoms/HeaderBar";
import images from "../../../constants/images";
import icons from "../../../constants/icons";
import { formatNumber } from "../../../utils";
import Divider from "../../../components/Atoms/Divider";

export default function ConfirmPayment({ navigation }) {
  const status = 1;

  const getContent = () => {
    switch (status) {
      case 1:
        return "Đặt sân";
      case 2:
        return "Nạp tiền vào ví";
      case 3:
        return "Rút tiền";

      default:
        break;
    }
  };

  return (
    <ImageBackground source={images.courtLogo} style={styles.container}>
      {/* <HeaderBar
          text={"Chi tiết giao dịch"}
          isGoBack={true}
          goBack={() => navigation.goBack()}
        /> */}

      <View style={{ flex: 1, justifyContent: "center" }}>
        <View style={styles.paymentContainer}>
          <View style={styles.topContent}>
            {/* <View
              style={[
                styles.imageContainer,
                {
                  backgroundColor:
                    status === 1 ? COLORS.blue : COLORS.darkGreenText,
                },
              ]}
            >
              <Image
                source={status === 1 ? icons.ruttien : icons.naptien}
                style={
                  status === 1
                    ? { width: 30, height: 30 }
                    : { width: 20, height: 20 }
                }
              />
            </View> */}

            <Text style={{ fontFamily: "quicksand-semibold", fontSize: 16 }}>
              Xác nhận {getContent()}
            </Text>

            <Text style={{ fontFamily: "quicksand-semibold", fontSize: 20 }}>
              Tổng tiền: {formatNumber(5000)}đ
            </Text>
          </View>

          <View
            style={{
              justifyContent: "space-between",
              flexDirection: "row",
              marginTop: 15,
              marginBottom: 30,
            }}
          >
            <View style={{ gap: 25 }}>
              <Text style={styles.text}>Trạng thái: </Text>
              <Text style={styles.text}>Thời gian</Text>
              <Text style={styles.text}>Tài khoản</Text>
            </View>
            <View style={{ gap: 17 }}>
              <View style={styles.pending}>
                <Text
                  style={[
                    styles.text,
                    {
                      fontFamily: "quicksand-semibold",
                      color: "#FFDC2E",
                    },
                  ]}
                >
                  Chờ xử lí
                </Text>
              </View>

              <Text
                style={[
                  styles.text,
                  { fontFamily: "quicksand-semibold", textAlign: "right" },
                ]}
              >
                22/6/2024
              </Text>
              <Text
                style={[
                  styles.text,
                  { fontFamily: "quicksand-semibold", textAlign: "right" },
                ]}
              >
                Ví Smash It
              </Text>
            </View>
          </View>

          <Divider color={COLORS.darkGreyBorder} orientation={"horizontal"} />

          <View style={{ marginTop: 30 }}>
            <TouchableOpacity
              activeOpacity={0.5}
              style={styles.button}
              onPress={() => navigation.navigate("PaymentInvoice")}
            >
              <Text
                style={[
                  styles.text,
                  {
                    fontSize: 16,
                    fontFamily: "quicksand-bold",
                    color: COLORS.white,
                  },
                ]}
              >
                Xác nhận thanh toán
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },

  paymentContainer: {
    padding: 15,
    paddingVertical: 20,
    backgroundColor: COLORS.white,
    borderColor: COLORS.darkGreyBorder,
    borderWidth: 1,
    width: "80%",
    alignSelf: "center",
    borderRadius: 8,
  },

  imageContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },

  topContent: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderColor: COLORS.darkGreyBorder,
    borderWidth: 1,
    padding: 10,
    alignSelf: "center",
    borderRadius: 8,
    gap: 8,
  },

  text: {
    fontFamily: "quicksand-regular",
    fontSize: 14,
  },

  success: {
    backgroundColor: COLORS.chipGreenBackGround,
    borderColor: COLORS.chipGreenBackGround,
    padding: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
  },

  fail: {
    backgroundColor: COLORS.chipGreenBackGround,
    borderColor: COLORS.chipGreenBackGround,
    padding: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
  },

  pending: {
    backgroundColor: "#FFF9E2",
    borderColor: COLORS.chipGreenBackGround,
    padding: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
  },

  button: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.orangeText,
    paddingVertical: 15,
    borderRadius: 10,
  },
});
