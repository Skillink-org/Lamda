//Handles API requests and interactions with backend services.
import axios from 'axios';

const api = axios.create({
  baseURL: "http://localhost:8080/api"
});

// Add a request interceptor to include the token in headers
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});


// Register a new user
export const registerUser = async (firstName, lastName, email, password) => {
    try {
        const response = await api.post(`/users/register`, { firstName, lastName, email, password });
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
        const response = await api.post(`/users/login`, { email, password });
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
        const response = await api.get(`/status`, { withCredentials: true });
        return response.data; // { message, userId, role }
    } catch (error) {
        console.error('Error fetching user status:', error);
        throw error;
    }
} 

// Example
export const deleteUser = async (id) => {
  try {
    const response = await api.delete(`/xxxx/${id}`);
    return response.status === 200;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};

// function for user profile
export const fetchUsers = async () => {
  try {
    const response = await api.get(`/users/getAllUsers`);
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

// New function to get user profile statistics
export const getUserProfileStats = async (userId) => {
  try {
    const response = await api.get(`/users/profile/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user profile stats:", error);
    throw error;
  }
};

export const updateUser = async (user) => {
  const userId = localStorage.getItem('userId'); // קבלת userId מ-localStorage
  if (!userId) {
    throw new Error('משתמש לא מחובר למערכת');
  }
  
  try {
    const response = await api.put(`/users/updateUser/${userId}`, {
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
    const response = await api.post('/contact', data, {
      headers: { "Content-Type": "application/json" },
    });

    return { success: true, message: response.data.message || "הודעתך נשלחה בהצלחה!" };
  } catch (error) {
    console.error("Error on sending contact form:", error);
    
    const errorMessage =
      error.response?.data?.message || "שגיאה בשליחת ההודעה. נסה שוב מאוחר יותר.";

    return { success: false, message: errorMessage };
  }
};

// Get user test results
export const getUserTestResults = async (userId) => {
  try {
    const response = await api.get(`/results/getResult/${userId}`);
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

export default api;