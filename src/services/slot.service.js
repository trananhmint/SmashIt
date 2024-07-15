import { getRequest } from ".";
import API_URL_ENV from "../configs/api";

const API_URL = API_URL_ENV + "/api/Slot";

class SlotService {
  static async getSlotListByCourtCodeId(courtCodeId, token) {
    console.log(courtCodeId);
    try {
      const response = await getRequest(
        `${API_URL}/get-all-slots-of-court?courtId=${courtCodeId}`,
        token
      );

      if (response.statusCode === 200) {
        return response.data;
      } else {
        console.error("Get Slot List By Court Code fail", response);
      }
    } catch (error) {
      console.error("Error fetching Slot List By Court Code", error);
    }
  }
}

export default SlotService;
