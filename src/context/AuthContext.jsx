import React, { createContext, useState, useEffect } from "react";
import * as SecureStore from "expo-secure-store";
import { baseURL } from "../constants/constants";
import { getRequest, postRequest } from "../services";
import API_URL_ENV from "../configs/api";
import { convertRole, uploadImage } from "../utils";
import { AppState } from "react-native";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isShowLogo, setIsShowLogo] = useState(true);

  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLogin, setIsLogin] = useState(false);
  const [firstRegister, setFirstRegister] = useState(false);
  const [chosenRole, setChosenRole] = useState("");
  const [isRemember, setIsRemember] = useState(false);

  const [appState, setAppState] = useState(AppState.currentState);
  const [backgroundTime, setBackgroundTime] = useState(null);

  const loadUser = async () => {
    try {
      const storedIsRemember = await SecureStore.getItem("isRemember");

      console.log(storedIsRemember);

      setIsRemember(storedIsRemember === "true" ? true : false);

      if (storedIsRemember === "true") {
        const storedToken = await SecureStore.getItem("token");

        if (storedToken) {
          const userData = await getUserProfile(storedToken);

          if (userData) {
            setChosenRole(convertRole(userData.roleId));
            setToken(storedToken);
            setUser(userData);
            return userData;
          }

          return null;
        } else {
          console.log("Token Not Valid");
          return null;
        }
      }

      return null;
    } catch (error) {
      console.error("Failed to load user", error);
      return null;
    }
  };

  const getUserProfile = async (accessToken) => {
    try {
      const res = await getRequest(
        `${API_URL_ENV}/api/User/get-profile`,
        accessToken
      );

      if (res?.statusCode >= 200 && res?.statusCode < 300) {
        let isValidRole = true;

        if (chosenRole) {
          isValidRole = checkUserRole(convertRole(res?.data?.roleId));
        }

        if (isValidRole) {
          setUser(res.data);
          await SecureStore.setItem("user", JSON.stringify(res.data));
          return res.data;
        } else {
          return null;
        }
      } else {
        console.log("Get User Fail", res);
      }

      return null;
    } catch (error) {
      console.error("Error when get user profile: ", error);
    }
  };

  const login = async (body) => {
    try {
      const res = await postRequest(
        `${API_URL_ENV}/api/Authentication/login`,
        body,
        null
      );

      if (res?.statusCode >= 200 && res?.statusCode < 300) {
        const userData = await getUserProfile(res.data);

        if (userData) {
          setToken(res.data);
          await SecureStore.setItem("token", res.data);
          await SecureStore.setItem("isRemember", isRemember.toString());

          return res.data;
        } else {
          return null;
        }
      } else {
        console.log("Login Fail", res);
      }
    } catch (error) {
      console.error("error login", error);
    }
  };

  const signup = async (body) => {
    try {
      const res = await postRequest(
        `${API_URL_ENV}/api/Authentication/player-register`,
        body,
        null
      );

      console.log(body);

      if (res?.statusCode >= 200 && res?.statusCode < 300) {
        const userData = await getUserProfile(res.data);

        if (userData) {
          setToken(res.data);
          await SecureStore.setItem("token", res.data);
          return res.data;
        } else {
          return null;
        }
      } else {
        console.log("Register Fail", res);
      }
    } catch (error) {
      console.error("error register", error);
    }
  };

  const signupOwner = async (body) => {
    try {
      const res = await postRequest(
        `${API_URL_ENV}/api/Authentication/owner-register`,
        body,
        null
      );

      if (res?.statusCode >= 200 && res.statusCode < 300) {
        console.log("Success", res.data);
        const userData = await getUserProfile(res.data);

        if (userData) {
          setToken(res.data);
          await SecureStore.setItem("token", res.data);
          return res.data;
        } else {
          return null;
        }
      } else {
        console.log("Register Fail", res);
      }
    } catch (error) {
      console.error("error register", error);
    }
  };

  const checkUserRole = (userRole) => {
    if (userRole !== chosenRole) {
      return false;
    }

    return true;
  };

  const signOut = async () => {
    setIsShowLogo(true);
    setUser(null);
    setToken(null);
    setIsLogin(false);
    setFirstRegister(false);
    setChosenRole("");
    setIsRemember(false);
    await SecureStore.deleteItemAsync("user");
    await SecureStore.deleteItemAsync("token");
    await SecureStore.deleteItemAsync("isRemember");
  };

  useEffect(() => {
    const handleAppStateChange = async (nextAppState) => {
      if (appState.match(/inactive|background/) && nextAppState === "active") {
        console.log("App has come to the foreground!");
        if (backgroundTime) {
          const timeInBackground = (Date.now() - backgroundTime) / 1000;

          if (timeInBackground >= 300 && !isRemember) {
            await signOut();
          } else if (timeInBackground >= 300 && isRemember) {
            setIsShowLogo(true);
            setUser(null);
            setToken(null);
            setIsLogin(false);
            setChosenRole("");
          }

          console.log(
            `App was in the background for ${timeInBackground} seconds.`
          );
        }
        setBackgroundTime(null);
      }

      if (nextAppState === "background") {
        console.log("App has gone to the background!");
        setBackgroundTime(Date.now());
      }

      setAppState(nextAppState);
    };

    const subscription = AppState.addEventListener(
      "change",
      handleAppStateChange
    );

    return () => {
      subscription.remove();
    };
  }, [appState, backgroundTime]);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login,
        signup,
        signupOwner,
        signOut,
        isLogin,
        setIsLogin,
        firstRegister,
        setFirstRegister,
        chosenRole,
        setChosenRole,
        token,
        setToken,
        isShowLogo,
        setIsShowLogo,
        isRemember,
        setIsRemember,
        loadUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
