import {
  Keyboard,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { COLORS } from "../../../theme/colors";
import HeaderBar from "../../../components/Atoms/HeaderBar";
import Prepresentative from "./Prepresentative";
import CourtLocation from "./CourtLocation";
import CourtInformation from "./CourtInformation";
import CourtService from "./CourtService";
import PaymentMethod from "./PaymentMethod";
import StepDot from "../../../components/Molecules/StepDot";
import { SIZE } from "../../../theme/fonts";
import { AuthContext } from "../../../context/AuthContext";
import { postRequest } from "../../../services";
import { baseURL, emailRegex } from "../../../constants/constants";
import { ErrorText } from "../../../constants/errors";
import { uploadImage } from "../../../utils";

export default function RegisterCourt({ navigation, route }) {
  const [step, setStep] = useState(1);

  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  const { setIsLogin, setFirstRegister, signupOwner } = useContext(AuthContext);

  // Form Data Start

  const [name, setName] = useState("");

  const [phone, setPhone] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [rePassword, setRePassword] = useState("");

  const [courtAddress, setCourtAddress] = useState("");

  const [courtImage, setCourtImage] = useState("");

  const [courtName, setCourtName] = useState("");

  const [courtOpenTime, setCourtOpenTime] = useState(null);

  const [courtCloseTime, setCourtCloseTime] = useState(null);

  const [courtQuantity, setCourtQuantity] = useState(0);

  const [courtPrice, setCourtPrice] = useState(null);

  const [courtPriceWeekend, setCourtPriceWeekend] = useState(null);

  const [courtPriceHoliday, setCourtPriceHoliday] = useState(null);

  const [courtServiceList, setCourtServiceList] = useState([]);

  const [bank, setBank] = useState("");

  const [cardNumber, setCardNumber] = useState("");
  // Form Data End

  // Error Data Start

  const [errorText, setErrorText] = useState("");

  // Error Data End

  const handlePress = async () => {
    if (step < 5) {
      const isError = handleCheckError();

      if (!isError) {
        setErrorText("");
        setStep(step + 1);
      }
    } else {
      await handleRegister();
    }
  };

  const handleGoBack = () => {
    if (step === 1) {
      return navigation.goBack();
    } else {
      return setStep(step - 1);
    }
  };

  const handleCheckError = () => {
    switch (step) {
      case 1: {
        if (!name || !phone || !password || !rePassword || !email) {
          setErrorText(ErrorText.EMPTY_INPUT);
          return true;
        }

        if (!emailRegex.test(email)) {
          setErrorText(ErrorText.INVALID_EMAIL);
          return true;
        }

        if (phone.length < 9 || phone.length > 11) {
          setErrorText(ErrorText.INVALID_PHONENUMBER);
          return true;
        }

        if (password?.length < 8) {
          setErrorText(ErrorText.INVALID_PASSWORD);
          return true;
        }

        if (password !== rePassword) {
          setErrorText(ErrorText.INVALID_REPASSWORD);
          return true;
        }

        return false;
      }

      case 2: {
        if (!courtAddress) {
          setErrorText(ErrorText.EMPTY_INPUT);
          return true;
        }

        return false;
      }

      case 3: {
        if (
          !courtName ||
          !courtOpenTime ||
          !courtCloseTime ||
          courtQuantity === 0 ||
          !courtPrice ||
          courtImage?.length <= 0
        ) {
          setErrorText(ErrorText.EMPTY_INPUT);
          return true;
        }

        return false;
      }

      case 4: {
        if (courtServiceList.length <= 0) {
          setErrorText(ErrorText.EMPTY_INPUT);
          return true;
        }

        return false;
      }

      default:
        return false;
    }
  };

  const handleRegister = async () => {
    let body = {
      fullName: name.trim(),
      email: email.trim(),
      password: password,
      bank: bank,
      cardNumber: cardNumber.trim(),
      phoneNumber: phone,
      courtName: courtName.trim(),
      numberOfCourt: courtQuantity,
      hourStart: courtOpenTime?.split(":")[0],
      minuteStart: courtOpenTime?.split(":")[1],
      hourEnd: courtCloseTime?.split(":")[0],
      minuteEnd: courtCloseTime?.split(":")[1],
      pricePerHour: courtPrice,
      priceAtWeekend: courtPriceWeekend,
      address: courtAddress.trim(),
      services: courtServiceList,
    };

    try {
      const imageURL = await uploadImage(courtImage[0]);

      if (imageURL) {
        body.profileImage = imageURL;

        console.log(body);

        const res = await signupOwner(body);

        console.log(res);

        if (res) {
          setFirstRegister(true);
          setIsLogin(true);
        }
      } else {
        console.log("Upload Image Fail");
      }
    } catch (error) {
      console.error("Error while register court", error);
    }
  };

  const getHeaderText = () => {
    switch (step) {
      case 1: {
        return "Thông tin cá nhân";
      }

      case 2: {
        return "Địa điểm sân";
      }

      case 3: {
        return "Thông tin sân";
      }

      case 4: {
        return "Dịch vụ tại sân";
      }

      case 5: {
        return "Thiết lập thanh toán";
      }

      default: {
        return "Thông tin cá nhân";
      }
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.white }}>
      <HeaderBar text={getHeaderText()} goBack={handleGoBack} isGoBack={true} />
      <View style={styles.container}>
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
        >
          <View style={{ flex: 1, marginBottom: 100 }}>
            {step === 1 && (
              <Prepresentative
                name={name}
                setName={setName}
                email={email}
                setEmail={setEmail}
                phone={phone}
                setPhone={setPhone}
                password={password}
                setPassword={setPassword}
                rePassword={rePassword}
                setRePassword={setRePassword}
              />
            )}
            {step === 2 && (
              <CourtLocation
                courtAddress={courtAddress}
                setCourtAddress={setCourtAddress}
              />
            )}
            {step === 3 && (
              <CourtInformation
                courtImage={courtImage}
                setCourtImage={setCourtImage}
                courtName={courtName}
                setCourtName={setCourtName}
                courtPrice={courtPrice}
                setCourtPrice={setCourtPrice}
                courtPriceHoliday={courtPriceHoliday}
                setCourtPriceHoliday={setCourtPriceHoliday}
                courtPriceWeekend={courtPriceWeekend}
                setCourtPriceWeekend={setCourtPriceWeekend}
                courtQuantity={courtQuantity}
                setCourtQuantity={setCourtQuantity}
                courtOpenTime={courtOpenTime}
                setCourtOpenTime={setCourtOpenTime}
                courtCloseTime={courtCloseTime}
                setCourtCloseTime={setCourtCloseTime}
              />
            )}
            {step === 4 && (
              <CourtService
                courtServiceList={courtServiceList}
                setCourtServiceList={setCourtServiceList}
              />
            )}
            {step === 5 && (
              <PaymentMethod
                bank={bank}
                setBank={setBank}
                cardNumber={cardNumber}
                setCardNumber={setCardNumber}
              />
            )}

            {errorText && <Text style={styles.errorText}>{errorText}</Text>}
          </View>

          <View
            style={[
              styles.buttonSection,
              // isKeyboardVisible && { display: "none" },
            ]}
          >
            <StepDot quantity={5} currentStep={step} />
            <TouchableOpacity
              activeOpacity={0.5}
              style={[styles.button]}
              onPress={handlePress}
            >
              <Text style={styles.buttonText}>
                {step < 5 ? "Tiếp tục" : "Hoàn thành"}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingHorizontal: 20,
    marginTop: 20,
  },

  buttonSection: {
    position: "relative",
    bottom: 35,
    gap: 30,
    alignItems: "center",
  },

  button: {
    width: "100%",
    backgroundColor: COLORS.orangeText,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },

  buttonText: {
    paddingVertical: 16,
    color: "white",
    fontSize: SIZE.size_16,
    fontFamily: "quicksand-semibold",
  },

  errorText: {
    color: COLORS.red,
    fontFamily: "quicksand-medium",
    alignSelf: "center",
    marginTop: 10,
    fontSize: SIZE.size_16,
  },
});
