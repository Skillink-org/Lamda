//Handles API requests and interactions with backend services.
import axios from "axios";
const API_URL = "http://localhost:8080/api";

// Example
export const deleteUser = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/xxxx/${id}`);
    return response.status === 200;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};

// function for user profile
export const fetchUsers = async () => {
  try {
    const response = await axios.get(`${API_URL}/users/getAllUsers`);
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

export const updateUser = async (user) => {
  const userId = "67df16491e7ac476ed611179"; //  localStorage / sessionStorage
  try {
    const response = await axios.put(`${API_URL}/users/updateUser/${userId}`, {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: user.password,
    });

    return response.data;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};
