//Handles API requests and interactions with backend services.
import axios from 'axios';

const API_URL = 'http://localhost:8080/api/users';

// Register a new user
export const registerUser = async (firstName, lastName, email, password) => {
    try {
        const response = await axios.post(`${API_URL}/register`, { firstName, lastName, email, password });
        return response.status === 201;
    } catch (error) {
        console.error('Error registering user:', error);
        throw error;
    }
};

// Login a user
export const loginUser = async (email, password) => {
    try {
        const response = await axios.post(`${API_URL}/login`, { email, password });
        return response.status === 200;
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
};