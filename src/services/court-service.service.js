import axios from "axios";
import { getRequest } from ".";
import API_URL_ENV from "../configs/api";

const API_URL = API_URL_ENV + "/api/ServiceCourt";

class ServiceCourtService {
  static async getCourtServiceByCourtId(courtId, token) {
    try {
      const response = await getRequest(
        `${API_URL}/get-by-badminton-court?badmintonCourtId=${courtId}`,
        token
      );

      if (response.statusCode === 200) {
        return response.data;
      } else {
        console.error("fetching court service fail:", response);
      }
    } catch (error) {
      console.log("Error fetching court service", error);
    }
  }
}

export default ServiceCourtService;
