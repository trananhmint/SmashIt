import { getBaseURL } from "../utils";
import icons from "./icons";
import images from "./images";

export const baseURL = getBaseURL();

export const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export default {
  icons,
  images,
};
