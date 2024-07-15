import axios from "axios";
import { getRequest } from ".";
// import { baseURL } from "../constants/constants";
import API_URL_ENV from "../configs/api";

const API_URL = API_URL_ENV + "/api/Bank";

class BankService {
  static async getBankList(token) {
    try {
      const response = await getRequest(`${API_URL}/get-all-banks`, token);

      if (response.statusCode === 200) {
        return response.data;
      } else {
        console.error("Get Data List fail", response.data);
      }
    } catch (error) {
      console.error("Error fetching banks list", error);
    }
  }
}

export default BankService;
