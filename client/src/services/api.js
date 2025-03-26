import axios from 'axios';
const API_URL = 'http://localhost:8080/api';

 export const deleteUser = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/xxxx/${id}`);
        return response.status === 200;
    } catch (error) {
        console.error('Error deleting user:', error);
        throw error;
    }
};

export const sendDataOfContactPage = async (data) => {
  try {
    
    await axios.post(API_URL, data, {
      headers: { "Content-Type": "application/json" },
    });

    return { success: true, message: "הטופס נשלח בהצלחה!" };
  } catch (error) {
    console.error("שגיאה בשליחת הטופס:", error);
    
    const errorMessage =
      error.response?.data?.message || "שגיאה בשליחת הטופס";

    return { success: false, message: errorMessage };
  }
};