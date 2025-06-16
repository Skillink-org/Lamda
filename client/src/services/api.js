//Handles API requests and interactions with backend services.
import axios from 'axios';

const API_URL = "http://localhost:8080/api";

// Register a new user
export const registerUser = async (firstName, lastName, email, password) => {
    try {
        const response = await axios.post(`${API_URL}/users/register`, { firstName, lastName, email, password });
        return response.status === 201;
    } catch (error) {
        console.error('Error registering user:', error);
        throw error;
    }
};

// Login a user
export const loginUser = async (email, password) => {
    try {
        const response = await axios.post(`${API_URL}/users/login`, { email, password });
        if (response.status === 200 && response.data.token) {
            // Save token to localStorage
            localStorage.setItem('token', response.data.token);
            // Set default authorization header for all future requests
            axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
            return true;
        }
        return false;
    } catch (error) {
        console.error('Error logging in user:', error);
        throw error;
    }
};

// Get user authentication status
export const getUserStatus = async () => {
    try {
        const response = await axios.get(`${API_URL}/status`, { withCredentials: true });
        return response.data; // { message, userId, role }
    } catch (error) {
        console.error('Error fetching user status:', error);
        throw error;
    }
} 

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