import VectorIcon from "../components/Atoms/VectorIcon";
import moment from "moment";
import "moment/locale/vi";
import * as Device from "expo-device";
import { Platform } from "react-native";
import * as FileSystem from "expo-file-system";
import { baseURL } from "../constants/constants";
import API_URL_ENV from "../configs/api";

export const getIconFamily = (family, name, size, color) => {
  switch (family) {
    case "AntDesign":
      return <VectorIcon.AntDesign name={name} size={size} color={color} />;
    case "Entypo":
      return <VectorIcon.Entypo name={name} size={size} color={color} />;
    case "Feather":
      return <VectorIcon.Feather name={name} size={size} color={color} />;
    case "FontAwesome":
      return <VectorIcon.FontAwesome name={name} size={size} color={color} />;
    case "FontAwesome5":
      return <VectorIcon.FontAwesome5 name={name} size={size} color={color} />;
    case "Fontisto":
      return <VectorIcon.Fontisto name={name} size={size} color={color} />;

    case "Foundation":
      return <VectorIcon.Foundation name={name} size={size} color={color} />;

    case "Ionicons":
      return <VectorIcon.Ionicons name={name} size={size} color={color} />;

    case "MaterialCommunityIcons":
      return (
        <VectorIcon.MaterialCommunityIcons
          name={name}
          size={size}
          color={color}
        />
      );

    case "MaterialIcons":
      return <VectorIcon.MaterialIcons name={name} size={size} color={color} />;

    case "Octicons":
      return <VectorIcon.Octicons name={name} size={size} color={color} />;

    case "SimpleLineIcons":
      return (
        <VectorIcon.SimpleLineIcons name={name} size={size} color={color} />
      );

    case "Zocial":
      return <VectorIcon.Zocial name={name} size={size} color={color} />;

    default:
      return <VectorIcon.AntDesign name={name} size={size} color={color} />;
  }
};

export const formatNumber = (number) => {
  return new Intl.NumberFormat("de-DE").format(number);
};

export const formatDate = (date) => {
  const formattedDate = moment(date).locale("vi").format("dddd, DD/MM/YYYY");

  const capitalizedDate =
    formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);

  return capitalizedDate;
};

export const getBaseURL = () => {
  if (Platform.OS === "android") {
    const isEmulator = !Device.isDevice;
    return isEmulator
      ? "http://10.0.2.2:5036/api"
      : "http://localhost:5036/api";
  } else {
    return "http://localhost:5036/api";
  }
};

export const convertRole = (roleID) => {
  switch (roleID) {
    case 1: {
      return "player";
    }
    case 2: {
      return "courtOwner";
    }
    case 3: {
      return "admin";
    }

    default:
      return "player";
  }
};

export const uploadImage = async (imageURI) => {
  try {
    console.log(imageURI);
    const result = await FileSystem.uploadAsync(
      `${API_URL_ENV}/api/Image/upload`,
      imageURI,
      {
        httpMethod: "POST",
        uploadType: FileSystem.FileSystemUploadType.MULTIPART,
        fieldName: "file",
      }
    );
    const image = JSON.parse(result.body);
    return image.data.link;
  } catch (error) {
    console.log("Error upload image", error);
  }
};

export const convertToTime = (hour, minute) => {
  let tempHour = hour;
  let tempMinute = minute;

  if (hour < 10) {
    tempHour = "0" + hour;
  }
  if (minute < 10) {
    tempMinute = "0" + minute;
  }

  return `${tempHour}:${tempMinute}`;
};
