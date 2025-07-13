import React, { useState, useEffect } from 'react';
import styles from './UserProfile.module.scss';
import TestHistory from '../TestHistory/TestHistory';
import Recommendations from '../Recommendations/Recommendations';
import EditModal from "../EditModal/EditModal";
import AvatarIcon from '../AvatarIcon/AvatarIcon';
import { FaCog, FaCalendarAlt, FaChartBar, FaTrophy } from "react-icons/fa";
import { updateUser, getUserProfileStats } from '../../services/api';
import { useUser } from '../../context/UserContext';

const UserProfile = () => {
  const { user, updateUser: updateUserContext } = useUser();
  const [isModalOpen, setModalOpen] = useState(false);
  const [userFields, setUserFields] = useState([]);
  const [profileStats, setProfileStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user?._id) {
      fetchProfileStats();
    }
  }, [user]);

  const fetchProfileStats = async () => {
    try {
      setLoading(true);
      const data = await getUserProfileStats(user._id);
      setProfileStats(data);
      
      // Set up user fields for editing
      const fieldLabels = {
        firstName: "שם פרטי",
        lastName: "שם משפחה",
        email: "אימייל",
        password: "סיסמה",
      };

      const fields = Object.keys(data.user)
        .filter((key) => key !== "_id" && key !== "role" && key !== "joinDate")
        .map((key) => ({
          name: key,
          label: fieldLabels[key] || key,
          type: key === "password" ? "password" : "text",
        }));

      setUserFields(fields);
      setError(null);
    } catch (error) {
      console.error("Failed to fetch profile stats:", error);
      setError("לא ניתן לטעון את נתוני הפרופיל");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateUser = async (userData) => {
    try {
      const updatedUser = await updateUser(userData);
      updateUserContext(updatedUser.user);
      // Refresh profile stats after update
      await fetchProfileStats();
      console.log("User updated successfully:", updatedUser);
    } catch (error) {
      console.error("Failed to update user:", error);
    }
  };

  const handleSave = (data) => {
    handleUpdateUser(data);
    console.log("שמירת נתוני משתמש:", data);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('he-IL', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className={styles.userProfileContainer}>
        <div className={styles.userProfileContent}>
          <div className={styles.loadingMessage}>טוען נתוני פרופיל...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.userProfileContainer}>
        <div className={styles.userProfileContent}>
          <div className={styles.errorMessage}>{error}</div>
        </div>
      </div>
    );
  }

  const userData = profileStats?.user || user;
  const stats = profileStats?.statistics || {};

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
              <AvatarIcon 
                firstName={userData?.firstName || ''} 
                lastName={userData?.lastName || ''} 
                size={90} 
              />
            </div>
            <h3 className={styles.userName}>
              {(userData?.firstName || '') + " " + (userData?.lastName || '')}
            </h3>
            
            <div className={styles.userStats}>
              <div className={styles.statItem}>
                <FaCalendarAlt className={styles.statIcon} />
                <div className={styles.statInfo}>
                  <span className={styles.statLabel}>הצטרף בתאריך</span>
                  <span className={styles.statValue}>
                    {userData?.joinDate ? formatDate(userData.joinDate) : 'לא זמין'}
                  </span>
                </div>
              </div>
              
              <div className={styles.statItem}>
                <FaChartBar className={styles.statIcon} />
                <div className={styles.statInfo}>
                  <span className={styles.statLabel}>מספר מבחנים</span>
                  <span className={styles.statValue}>{stats.testCount || 0}</span>
                </div>
              </div>
              
              {stats.latestTest && (
                <div className={styles.statItem}>
                  <FaTrophy className={styles.statIcon} />
                  <div className={styles.statInfo}>
                    <span className={styles.statLabel}>מבחן אחרון</span>
                    <span className={styles.statValue}>{stats.latestTest.personalityType}</span>
                    <span className={styles.statSubValue}>
                      {formatDate(stats.latestTest.completedAt)}
                    </span>
                  </div>
                </div>
              )}
            </div>
            
            <button className={styles.editButton} onClick={() => setModalOpen(true)}>
              הגדרות פרופיל <FaCog size={16} />
            </button>
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