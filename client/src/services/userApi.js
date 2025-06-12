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