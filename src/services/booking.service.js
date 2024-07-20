import axios from "axios";
import API_URL_ENV from "../configs/api";
import { getRequest } from ".";
import { Alert } from "react-native";

const API_URL = API_URL_ENV + "/api/Booking";

class BookingService {
  static async createBooking(token, booking, setUser) {
    try {
      const response = await axios.post(`${API_URL}/create-booking`, booking, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("responseeeeeeeeeeeeeeeeeee", response);
      if (response.data.statusCode === 200) {
        // setUser((prevUser) => ({
        //   ...prevUser,
        //   balance: prevUser.balance - response.data.data.price,
        // }));

        // Alert.alert('Success', 'Booking created successfully.');
        return response.data.data;
      } else {
        console.error(
          "Error fetching create booking:",
          response.data.statusCode
        );
      }
    } catch (error) {
      console.error("Error fetching  create booking:: ", error);
    }
  }
  static async getAllBookings(token) {
    try {
      const response = await axios.post(`${API_URL}/get-all-bookings`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.statusCode === 200) {
        // Alert.alert("Success", "Booking created successfully.");
        return response.message;
      } else {
        console.error("Error fetching create booking:");
      }
    } catch (error) {
      console.error("Error fetching  create booking:: ", error);
    }
  }
  static async getAllBookingsByUser(token) {
    try {
      const response = await axios.get(`${API_URL}/get-all-by-user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      console.log(response.data);
      if (response.data.statusCode === 200) {
        // Alert.alert("Success", "Booking created successfully.");
        return response.data.data;
      } else {
        console.error("Error fetching get all booking by user:");
      }
    } catch (error) {
      console.error("Error fetching get all booking by user", error);
    }
  }
  static async getBookingDetail(token, bookingId) {
    try {
      const response = await axios.get(`${API_URL}/get-booking-detail?bookingId=${bookingId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      
      if (response.data.statusCode === 200) {
        return response.data.data;
      } else {
        console.error("Error fetching get-booking-detail:");
      }
    } catch (error) {
      console.error("Error fetching get-booking-detail", error);
    }
  }
  static async getReserveBooking(token) {
    try {
      const response = await axios.get(`${API_URL}/get-booking-after-now`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      if (response.data.statusCode === 200) {
        // Alert.alert("Success", "Booking created successfully.");
        console.log(response);
        return response.data.data;
      } else {
        console.error("Error fetching get reserve:");
      }
    } catch (error) {
      console.error("Error fetching get reserve", error);
    }
  }
}

export default BookingService;
