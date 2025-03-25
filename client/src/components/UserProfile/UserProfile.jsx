import React, { useState, useEffect } from 'react';
import styles from './UserProfile.module.scss';
import TestHistory from '../TestHistory/TestHistory';
import Recommendations from '../Recommendations/Recommendations';
import EditModal from "../EditModal/EditModal";
import AvatarIcon from '../AvatarIcon/AvatarIcon';
import { FaCog } from "react-icons/fa";
import { fetchUsers, updateUser } from '../../services/api';


const UserProfile = () => {

  const [user, setUser] = useState({ "firstName": "ישראל", "lastName": "ישראלי" });
  const [isModalOpen, setModalOpen] = useState(false);
  const [userFields, setUserFields] = useState([]);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const data = await fetchUsers();

      if (data.length > 0) {
        const fieldLabels = {
          firstName: "שם פרטי",
          lastName: "שם משפחה",
          email: "אימייל",
          password: "סיסמה",
          role: "תפקיד",
        };

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
      console.error("Failed to fetch users data:", error);
    }
  };

  const handleUpdateUser = async (user) => {
    try {
      const updatedUser = await updateUser(user);
      console.log("User updated successfully:", updatedUser);
    } catch (error) {
      console.error("Failed to update user:", error);
    }
  };

  const handleSave = (data) => {
    handleUpdateUser(data);
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