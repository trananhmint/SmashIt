import axios from "axios";
import { getRequest, postRequest } from ".";
// import { baseURL } from "../constants/constants";
import API_URL_ENV from "../configs/api";

const API_URL = API_URL_ENV + "/api/Expenditure";

class FinancialService {
  static async addNewActivity(body, token) {
    try {
      const response = await postRequest(
        `${API_URL}/add-new-expenditure-record`,
        body,
        token
      );
      console.log(body);
      console.log("ressss", response);

      if (response.statusCode >= 200 || response.statusCode < 300) {
        return response.data;
      } else {
        console.error("Add new activity fail", response.data);
      }
    } catch (error) {
      console.error("Error add new activity", error);
    }
  }

  static async getActivitesList(token) {
    try {
      const response = await getRequest(
        `${API_URL}/get-expenditure-records`,
        token
      );
      console.log("ressss", response);

      if (response.statusCode >= 200 || response.statusCode < 300) {
        return response.data;
      } else {
        console.error("get activity fail", response.data);
      }
    } catch (error) {
      console.error("Error get activity", error);
    }
  }
}

export default FinancialService;
