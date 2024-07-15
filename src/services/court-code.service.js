import axios from "axios";
import { getRequest } from ".";
// import { baseURL } from "../constants/constants";
import API_URL_ENV from "../configs/api";

const API_URL = API_URL_ENV + "/api/Court";

class CourtCodeService {
  static async getCourtCodeByBadmintonCourt(badmintonCourtId, token) {
    try {
      const response = await getRequest(
        `${API_URL}/get-with-badminton-court?badmintonCourtId=${badmintonCourtId}`,
        token
      );

      if (response.statusCode === 200) {
        return response.data;
      } else {
        console.error("Get Court Code List fail", response.data);
      }
    } catch (error) {
      console.error("Error fetching Court Code list", error);
    }
  }
}

export default CourtCodeService;
