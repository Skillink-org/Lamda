// import React, { useState } from "react";
// import EditModal from "../EditModal/EditModal";

// const UserProfile = () => {
//   const [isModalOpen, setModalOpen] = useState(false);

//   const userFields = [
//     { name: "firstName", label: "שם פרטי" },
//     { name: "lastName", label: "שם משפחה" },
//     { name: "password", label: "סיסמה", type: "password" }
//   ];

//   const handleSave = (data) => {
//     console.log("שמירת נתוני משתמש:", data);
//     // api
//   };

//   return (
//     <div>
//       <h2>פרופיל משתמש</h2>
//       <button onClick={() => setModalOpen(true)}>עריכת פרופיל</button>

//       <EditModal
//         isOpen={isModalOpen}
//         onClose={() => setModalOpen(false)}
//         title="עריכת משתמש"
//         fields={userFields}
//         onSave={handleSave}
//       />
//     </div>


//   );
// };

// export default UserProfile;
// UserProfile.jsx
import React from 'react';
import styles from './UserProfile.module.scss';
import TestHistory from '../TestHistory/TestHistory';
import Recommendations from '../Recommendations/Recommendations';

const UserProfile = () => {
  return (
    <div className={styles.userProfileContainer}>
      <div className={styles.userProfileContent}>
        <div className={styles.mainSection}>
          <TestHistory />
          <Recommendations />
        </div>
        <div className={styles.sideSection}>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;