import {
    Dimensions,
    Image,
    ImageBackground,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
  } from "react-native";
  import React, { useContext, useRef, useState } from "react";
  import images from "../../constants/images";
  import { SIZE } from "../../theme/fonts";
  import FormInput from "../../components/Atoms/FormInput";
  import CustomButton from "../../components/Atoms/CustomButton";
  import { Checkbox } from "native-base";
  import { AuthContext } from "../../context/AuthContext";
  import { COLORS } from "../../theme/colors";
  import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
  import { ErrorText } from "../../constants/errors";
  import { emailRegex } from "../../constants/constants";
  
  const Signup = ({ navigation }) => {
    const [form, setForm] = useState({
      email: "",
      password: "",
      rePassword: "",
      lastName: "",
      firstName: "",
      phoneNumber: "",
    });
    const [toggleRemember, setToggleRemember] = useState(false);
  
    const [isAgree, setIsAgree] = useState(false);
  
    const { setIsLogin, signup, setFirstRegister } = useContext(AuthContext);
  
    const [errorText, setErrorText] = useState("");
  
    const handleSignUp = async () => {
      const body = {
        fullName: `${form.lastName.trim()} ${form.firstName.trim()}`,
        phoneNumber: form.phoneNumber.trim(),
        email: form.email.trim(),
        password: form.password,
      };
  
      if (
        !form.email ||
        !form.firstName ||
        !form.lastName ||
        !form.phoneNumber ||
        !form.password ||
        !form.rePassword
      ) {
        setErrorText(ErrorText.EMPTY_INPUT);
        return;
      }
  
      if (!emailRegex.test(form.email)) {
        setErrorText(ErrorText.INVALID_EMAIL);
        return;
      }
  
      if (form.phoneNumber.length < 9 || form.phoneNumber.length > 11) {
        setErrorText(ErrorText.INVALID_PHONENUMBER);
        return;
      }
  
      if (form.password?.length < 8) {
        setErrorText(ErrorText.INVALID_PASSWORD);
        return;
      }
  
      if (form.password !== form.rePassword) {
        setErrorText(ErrorText.INVALID_REPASSWORD);
        return;
      }
  
      const res = await signup(body);
  
      console.log(res);
  
      if (res) {
        setFirstRegister(true);
        setIsLogin(true);
      } else {
        setError(ErrorText.VALID_ACCOUNT);
      }
    };
  
    return (
      <ImageBackground source={images.courtLogo} style={styles.container}>
        {/* Uncomment if you want to show images */}
        {/* <View style={styles.imageContainer}>
          <Image source={images.loginbg} style={styles.image} />
        </View> */}
        {/* <Image source={images.applogo} style={styles.logo} /> */}
        <KeyboardAwareScrollView
          contentContainerStyle={styles.scrollContentContainer}
          extraHeight={100}
          enableOnAndroid={true}
        >
          <View style={styles.loginContainer}>
            <View style={styles.welcomeText}>
              <Text>
                <Text style={styles.welcome}>Đăng kí </Text>
                <Text style={styles.welcomeDesc}>
                  để khám phá nhiều tiện ích ưu đãi từ hệ sinh thái cầu lông
                </Text>
              </Text>
            </View>
            <View style={styles.loginForm}>
              <View style={styles.fullName}>
                <FormInput
                  label="Họ"
                  placeholder="Nhập Họ"
                  value={form.firstName}
                  handleChangeText={(e) => setForm({ ...form, firstName: e })}
                  width={175}
                />
                <FormInput
                  label="Tên"
                  placeholder="Nhập Tên"
                  value={form.lastName}
                  handleChangeText={(e) => setForm({ ...form, lastName: e })}
                  width={175}
                />
              </View>
              <View style={styles.inputSpacing}>
                <FormInput
                  label="Địa chỉ email"
                  placeholder="Nhập email"
                  value={form.email}
                  handleChangeText={(e) => setForm({ ...form, email: e })}
                />
              </View>
              <View style={styles.inputSpacing}>
                <FormInput
                  label="Số điện thoại"
                  placeholder="Nhập số điện thoại"
                  value={form.phoneNumber}
                  handleChangeText={(e) => setForm({ ...form, phoneNumber: e })}
                />
              </View>
              <View style={styles.inputSpacing}>
                <FormInput
                  label="Mật khẩu"
                  placeholder="Nhập mật khẩu"
                  value={form.password}
                  handleChangeText={(e) => setForm({ ...form, password: e })}
                />
              </View>
              <View style={styles.inputSpacing}>
                <FormInput
                  label="Xác nhận mật khẩu"
                  placeholder="Xác nhận mật khẩu"
                  value={form.rePassword}
                  handleChangeText={(e) => setForm({ ...form, rePassword: e })}
                />
  
                {errorText && <Text style={styles.errorText}>{errorText}</Text>}
              </View>
  
              <View style={styles.buttonSpacing}>
                <CustomButton
                  title={"Đăng kí"}
                  backgroundColor={COLORS.orangeText}
                  height={52}
                  width={"100%"}
                  color="white"
                  handlePress={handleSignUp}
                />
              </View>
  
              <View style={{ marginTop: 20 }}>
                <Checkbox
                  value="rememberMe"
                  aria-label="Remember me"
                  onChange={() => setIsAgree(!isAgree)}
                >
                  <Text style={styles.checkboxLabel}>
                    Bằng cách chọn ô này, bạn đã đồng ý với mọi điều khoản của
                    Smash It
                  </Text>
                </Checkbox>
              </View>
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
              <Text style={styles.notHave}>Đã có tài khoản?</Text>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => navigation.navigate("Login")}
              >
                <Text style={styles.regNow}>Đăng nhập ngay</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </ImageBackground>
    );
  };
  
  export default Signup;
  
  const styles = StyleSheet.create({
    errorText: {
      color: COLORS.red,
      fontFamily: "quicksand-medium",
      alignSelf: "center",
      marginTop: 10,
      fontSize: SIZE.size_16,
    },
  
    checkboxLabel: {
      fontSize: SIZE.size_14,
      fontFamily: "quicksand-semibold",
    },
  
    container: {
      flex: 1,
      backgroundColor: "rgba(255, 138, 0, 0.2)",
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
      top: 50,
      width: 98,
      height: 52,
    },
    scrollContentContainer: {
      flexGrow: 1,
      justifyContent: "flex-end",
    },
    loginContainer: {
      backgroundColor: "white",
      width: "100%",
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      paddingHorizontal: 20,
      paddingVertical: 30,
      height: "auto",
    },
    welcomeText: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
    },
    welcome: {
      fontSize: 16,
      fontFamily: "quicksand-semibold",
      color: COLORS.orangeText,
    },
    welcomeDesc: {
      fontSize: 16,
      fontFamily: "quicksand-semibold",
    },
    loginForm: {
      marginTop: 30,
    },
    fullName: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    inputSpacing: {
      marginTop: 15,
    },
    buttonSpacing: {
      marginTop: 15,
    },
    divider: {
      width: "100%",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
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
      fontSize: 12,
      fontFamily: "quicksand-regular",
    },
    registerLink: {
      flexDirection: "row",
      alignSelf: "center",
      justifyContent: "center",
      marginVertical: 20,
    },
    notHave: {
      marginRight: 10,
      fontSize: 14,
      fontFamily: "quicksand-regular",
    },
    regNow: {
      fontSize: 14,
      fontFamily: "quicksand-semibold",
      color: COLORS.orangeText,
      textDecorationLine: "underline",
    },
  });