import axios from "axios";
import { getRequest, postRequest } from ".";
// import { baseURL } from "../constants/constants";
import API_URL_ENV from "../configs/api";

const API_URL = API_URL_ENV + "/api/Transaction";

class TransactionService {
  static async addMoney(body, token) {
    try {
      const response = await postRequest(
        `${API_URL}/add-new-transaction`,
        body,
        token
      );

      console.log(response);

      if (response.statusCode >= 200 && response.statusCode < 300) {
        return response.statusCode;
      } else {
        console.error("add money fail", response.data);
      }
    } catch (error) {
      console.error("Error add money", error);
    }
  }

  static async cashOut(amount, token) {
    try {
      const response = await postRequest(
        `${API_URL}/cash-out-request?money=${amount}`,
        null,
        token
      );

      console.log(response);

      if (response.statusCode >= 200 && response.statusCode < 300) {
        return response.statusCode;
      } else {
        console.error("cash out money fail", response.data);
      }
    } catch (error) {
      console.error("Error cash out money", error);
    }
  }

  static async getTransactionById(accountId, token) {
    try {
      const response = await getRequest(
        `${API_URL}/get-all-with-account?accountId=${accountId}`,
        token
      );

      console.log(response);

      if (response.statusCode >= 200 && response.statusCode < 300) {
        return response.data;
      } else {
        console.error("get money fail", response.data);
      }
    } catch (error) {
      console.error("Error get money", error);
    }
  }
}

export default TransactionService;
