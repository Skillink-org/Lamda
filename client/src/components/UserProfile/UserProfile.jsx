import React, { useState, useEffect } from 'react';
import styles from './UserProfile.module.scss';
import TestHistory from '../TestHistory/TestHistory';
import Recommendations from '../Recommendations/Recommendations';
import EditModal from "../EditModal/EditModal";
import AvatarIcon from '../AvatarIcon/AvatarIcon';
import { FaCog } from "react-icons/fa";



const UserProfile = () => {

  const [user, setUser] = useState({ "firstName": "ישראל", "lastName": "ישראלי" });
  const [isModalOpen, setModalOpen] = useState(false);
  const [userFields, setUserFields] = useState([]);
  const API_URL = "http://localhost:8080/api/users/"

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch(`${API_URL}getAllUsers`);
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
      const data = await response.json();

      if (data.length > 0) {
        // translate
        const fieldLabels = {
          firstName: "שם פרטי",
          lastName: "שם משפחה",
          email: "אימייל",
          password: "סיסמה",
          role: "תפקיד",
        };
        // filter fields
        const fields = Object.keys(data[0])
          .filter((key) => key !== "_id" && key !== "__v" && key !== "role")
          .map((key) => ({
            name: key,
            label: fieldLabels[key] || key,
            type: key === "password" ? "password" : "text",
          }));

        setUserFields(fields);
        console.log("User fields:", fields);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const updateUser = async (user) => {
    // need to take value from session/localStorage
    const userId = "67df16491e7ac476ed611179";
    try {
      const response = await fetch(`${API_URL}updateUser/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          password: user.password,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update user");
      }

      const result = await response.json();
      console.log("User updated:", result);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleSave = (data) => {
    updateUser(data);
    console.log("שמירת נתוני משתמש:", data);
  };

  return (
    <div className={styles.userProfileContainer}>
      <div className={styles.userProfileContent}>
        <div className={styles.mainSection}>
          <TestHistory />
          <Recommendations />
        </div>
        <div className={styles.sideSection}>
          <div className={styles.userProfile}>
            <div className={styles.avatarUser}>
              <AvatarIcon firstName={user.firstName} lastName={user.lastName} size={90} ></AvatarIcon>
            </div>
            <h3>{user.firstName + " " + user.lastName} </h3>
            <p>{user.created_at + " :הצטרף בתאריך"} </p>
            <button className={styles.editButton} onClick={() => setModalOpen(true)}>הגדרות פרופיל  <FaCog size={16} /> </button>
          </div>
        </div>
      </div>
      <EditModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        title="עריכת משתמש"
        fields={userFields}
        onSave={handleSave}
      />
    </div>
  );
};

export default UserProfile;