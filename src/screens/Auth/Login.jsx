import {
    Dimensions,
    Image,
    ImageBackground,
    KeyboardAvoidingView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
  } from "react-native";
  import React, { useContext, useState } from "react";
  import images from "../../constants/images";
  import { SIZE } from "../../theme/fonts";
  import FormInput from "../../components/Atoms/FormInput";
  import CustomButton from "../../components/Atoms/CustomButton";
  import { Checkbox } from "native-base";
  import { AuthContext } from "../../context/AuthContext";
  import { COLORS } from "../../theme/colors";
  import axios from "axios";
  import { postRequest } from "../../services";
  
  import API_URL_ENV from "../../configs/api";
  const API_URL = API_URL_ENV + "/api/Authentication";
  import { ErrorText } from "../../constants/errors";
  import { LoadingContext } from "../../context/LoadingContext";
  import Loading from "../../components/Molecules/Loading";
  
  const Login = ({ navigation }) => {
    const [form, setForm] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
  
    // const { setIsLoading } = useContext(LoadingContext);
  
    const [isLoading, setIsLoading] = useState(false);
  
    const { chosenRole, login, setIsLogin, isRemember, setIsRemember } =
      useContext(AuthContext);
  
    const handleLogin = async () => {
      const body = {
        email: form.email.trim(),
        password: form.password,
      };
  
      setIsLoading(true);
  
      const res = await login(body);
  
      if (res) {
        setIsLogin(true);
      } else {
        setError(ErrorText.VALID_ACCOUNT);
      }
  
      setIsLoading(false);
    };
  
    if (isLoading) {
      return <Loading />;
    }
  
    return (
      <KeyboardAvoidingView
        behavior={"height"}
        enabled={false}
        style={{ flex: 1 }}
      >
        <ImageBackground style={styles.container}>
          {/* <View style={styles.imageContainer}>
          <Image source={images.loginbg} style={styles.image} />
        </View> */}
          {/* <Image source={images.logo1} style={styles.logo} /> */}
          <View style={styles.loginContainer}>
            <View style={styles.welcomeText}>
              <Text style={styles.welcome}>Chào mừng!</Text>
              <Text style={styles.welcomeDesc}>Hãy đăng nhập để tiếp tục</Text>
            </View>
            <View style={styles.loginForm}>
              <FormInput
                label="Địa chỉ email"
                placeholder="Nhập email"
                value={form.email}
                handleChangeText={(e) => setForm({ ...form, email: e })}
              />
              <View style={styles.inputSpacing}>
                <FormInput
                  label="Mật khẩu"
                  placeholder="Nhập mật khẩu"
                  value={form.password}
                  handleChangeText={(e) => setForm({ ...form, password: e })}
                />
                {error && <Text style={styles.errorText}>{error}</Text>}
              </View>
              <View style={styles.buttonSpacing}>
                <CustomButton
                  title={"Đăng nhập"}
                  backgroundColor={COLORS.orangeText}
                  height={52}
                  width={"100%"}
                  color="white"
                  handlePress={() => {
                    handleLogin();
                  }}
                />
              </View>
            </View>
  
            <View style={styles.savingData}>
              <Checkbox
                value="rememberMe"
                aria-label="Remember me"
                onChange={() => setIsRemember(!isRemember)}
              >
                <Text style={styles.checkboxLabel}>Ghi nhớ mật khẩu</Text>
              </Checkbox>
              <Text style={styles.forgotPass}>Quên mật khẩu?</Text>
            </View>
            <View style={styles.divider}>
              <View style={styles.leftDiv}></View>
              <Text style={styles.otherOption}>hoặc tiếp tục với</Text>
              <View style={styles.rightDiv}></View>
            </View>
            <CustomButton
              title={"Google"}
              backgroundColor={"#F5F5F5"}
              height={52}
              width={"100%"}
              icon={images.google}
            />
  
            <View style={styles.registerLink}>
              <Text style={styles.notHave}>Chưa có tài khoản?</Text>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                  if (chosenRole === "player") {
                    navigation.navigate("Signup");
                  } else {
                    navigation.navigate("RegisterCourt");
                  }
                  // navigation.navigate("Signup");
                }}
              >
                <Text style={styles.regNow}>Đăng kí ngay</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </KeyboardAvoidingView>
    );
  };
  
  export default Login;
  
  const styles = StyleSheet.create({
    errorText: {
      color: COLORS.red,
      fontFamily: "quicksand-medium",
      alignSelf: "center",
      marginTop: 10,
      fontSize: SIZE.size_16,
    },
  
    container: {
      position: "relative",
      flex: 1,
      backgroundColor: COLORS.lightGreenText,
      alignItems: "center",
    },
    imageContainer: {
      position: "absolute",
      width: "100%",
    },
    image: {
      width: "100%",
    },
    logo: {
      position: "absolute",
      width: 200,
      height: 200,
    },
  
    loginContainer: {
      backgroundColor: "white",
      width: "100%",
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      paddingHorizontal: 20,
      paddingVertical: 30,
      position: "absolute",
      bottom: 0,
      height: 620,
    },
    welcomeText: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
    },
    welcome: {
      fontSize: SIZE.size_16,
      fontFamily: "quicksand-semibold",
      color: COLORS.orangeText,
    },
    welcomeDesc: {
      fontSize: SIZE.size_16,
      fontFamily: "quicksand-semibold",
      marginLeft: 8,
    },
    loginForm: {
      marginTop: 30,
    },
    inputSpacing: {
      marginTop: 15,
    },
    buttonSpacing: {
      marginTop: 25,
    },
    checkboxLabel: {
      fontSize: SIZE.size_14,
      fontFamily: "quicksand-semibold",
    },
    savingData: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginTop: 28,
    },
    forgotPass: {
      fontSize: SIZE.size_14,
      fontFamily: "quicksand-semibold",
      color: COLORS.orangeText,
    },
    divider: {
      width: "100%",
  
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      // borderWidth: 1,
      // borderColor: "red",
      marginVertical: 30,
    },
    leftDiv: {
      width: 120,
      borderBottomColor: "#878787",
      borderBottomWidth: 1,
    },
    rightDiv: {
      width: 120,
      borderBottomColor: "#878787",
      borderBottomWidth: 1,
    },
    otherOption: {
      textAlign: "center",
      paddingHorizontal: 10,
      fontSize: SIZE.size_12,
      fontFamily: "quicksand-regular",
    },
    registerLink: {
      flexDirection: "row",
      alignSelf: "center",
      justifyContent: "center",
      position: "absolute",
      bottom: 20,
    },
    notHave: {
      marginRight: 10,
      fontSize: SIZE.size_14,
      fontFamily: "quicksand-regular",
    },
    regNow: {
      fontSize: SIZE.size_14,
      fontFamily: "quicksand-semibold",
      color: COLORS.orangeText,
      textDecorationLine: "underline",
    },
  });