import axios from "axios";
import API_URL_ENV from "../configs/api";
import { getRequest } from ".";

const API_URL = API_URL_ENV + "/api/BadmintonCourt";

class CourtService {
  static async getAllCourts(token) {
    try {
      const response = await axios.get(`${API_URL}/get-all-badminton-courts`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.statusCode === 200) {
        return response.data.data;
      } else {
        console.error("Error fetching get all courts:", error);
      }
    } catch (error) {
      console.error("Error fetching courts: ", error);
    }
  }

  static async getCourtById(token, courtId) {
    try {
      const response = await axios.get(
        `${API_URL}/get-by-id?badmintonCourtId=${courtId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.statusCode === 200) {
        return response.data.data;
      }
    } catch (error) {
      console.error("Error fetching get court by ID: ", error);
    }
  }

  static async searchCourt(token, searchText) {
    try {
      const response = await axios.get(
        `${API_URL}/search?search=${searchText}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.statusCode === 200) {
        return response.data.data;
      } else {
        console.error("Error fetching search court: ", error);
      }
    } catch (error) {
      console.error("Error fetching search court: ", error);
    }
  }
  static async generateSlotByDate(badmintonCourtId, date, token) {
    try {
      const response = await axios.get(
        `${API_URL}/generate-slot-by-date?badmintonCourtId=${badmintonCourtId}&date=${date}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.statusCode === 200) {
        return response.data.data;
      } else {
        console.error("Error fetching generate slot by date: ", error);
      }
    } catch (error) {
      console.error("Error fetching generate slot by date: ", error);
    }
  }

  static async getCourtByOwner(ownerId, token) {
    try {
      const response = await getRequest(
        `${API_URL}/get-with-owner?ownerId=${ownerId}`,
        token
      );

      if (response.statusCode === 200) {
        return response.data;
      } else {
        console.error("fetching court by owner fail:", response);
      }
    } catch (error) {
      console.log("Error fetching court by owner", error);
    }
  }

  static async generateSlotByDate(badmintonCourtId, date, token) {
    try {
      const response = await getRequest(
        `${API_URL}/generate-slot-by-date?badmintonCourtId=${badmintonCourtId}&date=${date}`,
        token
      );

      console.log(response);

      if (response.statusCode === 200) {
        return response.data;
      } else {
        console.error("Get Slot List By Court Code fail", response);
      }
    } catch (error) {
      console.error("Error fetching Slot List By Court Code", error);
    }
  }

  static async generateSlotByDateAndCourtCode(
    badmintonCourtId,
    date,
    courtCodeId,
    token
  ) {
    try {
      const response = await getRequest(
        `${API_URL}/generate-slot-by-date-and-court?badmintonCourtId=${badmintonCourtId}&courtId=${courtCodeId}&date=${date}`,
        token
      );

      console.log("response", response);

      if (response.statusCode === 200) {
        return response.data;
      } else {
        console.error("Get Slot List By Court Code fail", response);
      }
    } catch (error) {
      console.error("Error fetching Slot List By Court Code", error);
    }
  }

  static async generateSlotForOwner(
    badmintonCourtId,
    date,
    courtCodeId,
    token
  ) {
    try {
      const response = await getRequest(
        `${API_URL}/generate-slot-by-date-and-court-for-owner?badmintonCourtId=${badmintonCourtId}&courtId=${courtCodeId}&date=${date}`,
        token
      );

      console.log("response", response);

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

export default CourtService;
