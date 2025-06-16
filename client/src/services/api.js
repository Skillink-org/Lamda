//Handles API requests and interactions with backend services.
import axios from 'axios';

const API_URL = "http://localhost:8080/api";

// Register a new user
export const registerUser = async (firstName, lastName, email, password) => {
    try {
        const response = await axios.post(`${API_URL}/users/register`, { firstName, lastName, email, password });
        if (response.status === 201) {
            // Save userId to localStorage after successful registration
            if (response.data.userId) {
                localStorage.setItem('userId', response.data.userId);
            }
            // שמירת נתוני המשתמש החדש (ללא סיסמה)
            if (response.data.user) {
                const { password, ...userWithoutPassword } = response.data.user;
                localStorage.setItem('user', JSON.stringify(userWithoutPassword));
            } else {
                // אם לא הוחזרו נתוני משתמש, שמור את הנתונים הבסיסיים
                localStorage.setItem('user', JSON.stringify({ firstName, lastName, email }));
            }
            return true;
        }
        return false;
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
            // Save token and userId to localStorage
            localStorage.setItem('token', response.data.token);
            if (response.data.userId) {
                localStorage.setItem('userId', response.data.userId);
            }
            // שמירת נתוני המשתמש (ללא סיסמה)
            if (response.data.user) {
                const { password, ...userWithoutPassword } = response.data.user;
                localStorage.setItem('user', JSON.stringify(userWithoutPassword));
            }
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
  const userId = localStorage.getItem('userId'); // קבלת userId מ-localStorage
  if (!userId) {
    throw new Error('משתמש לא מחובר למערכת');
  }
  
  try {
    const response = await axios.put(`${API_URL}/users/updateUser/${userId}`, {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: user.password,
    });

    // עדכון נתוני המשתמש ב-localStorage אחרי עדכון מוצלח
    if (response.data.user) {
      const { password, ...userWithoutPassword } = response.data.user;
      localStorage.setItem('user', JSON.stringify(userWithoutPassword));
    }

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

// Get user test results
export const getUserTestResults = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/results/getUserResults/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user test results:', error);
    throw error;
  }
};

// Logout user
export const logoutUser = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('user');
    // Remove authorization header
    delete axios.defaults.headers.common['Authorization'];
};

// Get current user from localStorage
export const getCurrentUser = () => {
    const userData = localStorage.getItem('user');
    return userData ? JSON.parse(userData) : null;
};

// Check if user is logged in
export const isUserLoggedIn = () => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    return !!(token && userId);
};