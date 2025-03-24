//Handles API requests and interactions with backend services.
import axios from 'axios';
const API_URL = 'http://localhost:8080/api';

// Example
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
      const response = await fetch("http://localhost:5000/api/contact", {  // שלח לשרת
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
  
      const result = await response.json();
      if (response.ok) {
      console.log("status----: " + response.status);
      
      } else {
        throw new Error(result.message || "שגיאה בשליחת הטופס");
      }
    } catch (error) {
      console.log(error);
  
    }
  };