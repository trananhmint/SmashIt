import axios from "axios";
import { getRequest, postRequest } from ".";
// import { baseURL } from "../constants/constants";
import API_URL_ENV from "../configs/api";

const API_URL = API_URL_ENV + "/api/User";

class UserService {
  static async getProfile(token) {
    try {
      const response = await getRequest(`${API_URL}/get-profile`, token);

      console.log(response);

      if (response.statusCode >= 200 && response.statusCode < 300) {
        return response.data;
      } else {
        console.error("Edit User fail", response.data);
      }
    } catch (error) {
      console.error("Error Edit User", error);
    }
  }

  static async editUserProfile(body, token) {
    try {
      const response = await postRequest(
        `${API_URL}/edit-user-profile`,
        body,
        token
      );

      console.log(response);

      if (response.statusCode >= 200 && response.statusCode < 300) {
        return response.statusCode;
      } else {
        console.error("Edit User fail", response.data);
      }
    } catch (error) {
      console.error("Error Edit User", error);
    }
  }
}

export default UserService;
