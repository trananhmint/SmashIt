import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export const METRICS = {
  screenWidth: width < height ? width : height,
  screenHeight: width < height ? height : width,
};
