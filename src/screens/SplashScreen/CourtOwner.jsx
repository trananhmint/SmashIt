import React, { useContext, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/Entypo";
import splash1 from "../../assets/images/splashImg1.png";
import splash2 from "../../assets/images/splashImg2.png";
import splash3 from "../../assets/images/splashImg3.png";
import splash4 from "../../assets/images/splashImg4.png";
import { COLORS } from "../../theme/colors";
import { METRICS } from "../../theme/metrics";
import { SIZE } from "../../theme/fonts";
import { useNavigation } from "@react-navigation/native";
import images from "../../constants/images";
import { LinearGradient } from "expo-linear-gradient";
import StepDot from "../../components/Molecules/StepDot";
import { AuthContext } from "../../context/AuthContext";

const CourtOwner = ({ navigation }) => {
  const { isLogin, setIsLogin, setFirstRegister, firstRegister } =
    useContext(AuthContext);

  const [step, setStep] = useState(1);
  // const navigate = useNavigation();

  const steps = (step) => {
    switch (step) {
      case 1:
        return {
          images: splash1,
          title: "Quản lý sân và lượt đặt tự động",
          content:
            "Công cụ quản lý sân, lượt đặt và thông tin khách hàng hoàn toàn tự động ngay trong tầm tay",
        };
      case 2:
        return {
          images: splash2,
          title: "Thống kê và tối ưu doanh thu",
          content:
            "Chúng tôi tích hợp bảng thống kê và biểu đồ giúp bạn theo dõi doanh thu hàng tháng",
        };
      case 3:
        return {
          images: splash3,
          title: "Tiếp cận hàng ngàn khách hàng mới",
          content:
            "Lợi nhuận tăng lên nhờ tiếp cận đến vô vàn tệp khách hàng mới, tại sao không?",
        };
      case 4:
        return {
          images: splash4,
          title: "Quản lý giải đấu và        thu hút người chơi",
          content:
            "Công cụ hỗ trợ tổ chức và quản lý giải đấu lần đầu được ra mắt!",
        };
      default:
        break;
    }
  };

  const handlePress = (step) => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      setFirstRegister(false);
      setIsLogin(true);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.outline}>
        <View style={styles.imageOutline}>
          <Image style={styles.image} source={steps(step).images} />
        </View>

        <View
          style={{
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
            paddingVertical: 40,
          }}
        >
          <StepDot
            currentStep={step}
            isRemarkable={true}
            quantity={4}
            setStep={setStep}
          />
        </View>

        <View style={{ gap: 20 }}>
          <Text style={styles.title}>{steps(step).title}</Text>
          <Text style={styles.content}>{steps(step).content}</Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.btn}
        onPress={() => {
          handlePress(step);
        }}
      >
        <LinearGradient
          colors={["#FF8A00", "#E0BC3C"]}
          start={{ x: 0.01, y: 0.01 }}
          end={{ x: 1, y: 0.965 }}
          style={styles.gradient}
        >
          <Text
            style={[
              {
                color: COLORS.white,
                fontSize: SIZE.size_18,
                fontFamily: "quicksand-bold",
              },
            ]}
          >
            Tiếp tục
          </Text>
          <Icon
            name="chevron-right"
            size={15}
            color={"white"}
            style={{ position: "absolute", right: 10 }}
          />
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  outline: {
    width: METRICS.screenWidth,
    height: METRICS.screenHeight,
    display: "flex",
    alignItems: "center",
    gap: 20,
    backgroundColor: "white",
  },
  imageOutline: {
    width: "100%",
    aspectRatio: 1,
    marginTop: 30,
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  title: {
    fontFamily: "quicksand-bold",
    textAlign: "center",
    fontSize: 32,
    paddingHorizontal: 15,
    letterSpacing: -0.3,
  },
  content: {
    fontFamily: "quicksand-medium",
    textAlign: "center",
    fontSize: SIZE.size_14,
    paddingHorizontal: 35,
    lineHeight: 21,
  },
  btn: {
    width: "80%",
    alignSelf: "center",
    aspectRatio: 5.2,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "pink",
    borderRadius: 10,
    gap: 10,
    overflow: "hidden",
    position: "absolute",
    bottom: 20,
  },

  gradient: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  dot: {
    width: 10,
    height: 10,
    backgroundColor: COLORS.darkGreenText,
  },
});

export default CourtOwner;
