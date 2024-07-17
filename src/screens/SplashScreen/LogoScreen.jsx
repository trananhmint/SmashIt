import {
  Animated,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useContext, useEffect, useRef } from "react";
import images from "../../constants/images";
import { AuthContext } from "../../context/AuthContext";

export default function LogoScreen({ navigation }) {
  const { setIsShowLogo, setIsLogin, loadUser } = useContext(AuthContext);

  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: true,
    }).start(async () => {
      const user = await loadUser();
      if (user) {
        setIsShowLogo(false);
        setIsLogin(true);
      } else {
        setIsShowLogo(false);
      }
    });
  }, [fadeAnim, navigation]);

  return (
    <ImageBackground source={images.courtLogo} style={styles.container}>
      <Animated.View style={{ ...styles.logoContainer, opacity: fadeAnim }}>
        <Image source={images.logo1} style={{ width: 500, height: 500 }} />
      </Animated.View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 138, 0, 0.2)",
  },
  logoContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    fontSize: 48,
    fontWeight: "bold",
  },
});
