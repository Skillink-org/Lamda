import axios from 'axios';
const API_URL = 'http://localhost:8080/api';


export const sendDataOfContactPage = async (data) => {
  try {
    
    await axios.post(API_URL, data, {
      headers: { "Content-Type": "application/json" },
    });

    return { success: true, message:"Recieved Successfully" };
  } catch (error) {
    console.error("Error on sending page:", error);
    
    const errorMessage =
      error.response?.data?.message || "Error on sending page";

    return { success: false, message: errorMessage };
  }
};