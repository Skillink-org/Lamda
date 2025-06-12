//home page component
import React, { useState } from "react";
import { TextField, Button, Tabs, Tab } from "@mui/material";
import { MailOutline, LockOutlined, PersonAddAlt1 } from "@mui/icons-material";
import AuthForm from "../../components/AuthForm/AuthForm";

const HomePage = () => {
  const [tabIndex, setTabIndex] = useState(0);
  
  return (
   <>
    <div className="content-wrapper">
        <h1>גלו את סגנון הלימוד המתאים לכם</h1>
        <div className="yellow-line"></div>
        <p>באמצעות כלים מקצועיים ומדויקים, נסייע לכם למצוא את דרך הלימוד האידיאלית עבורכם בעולם התורני</p>
      </div>
      <AuthForm></AuthForm>
      {/* This footer section would typically be in a layout component */}
      <div className="footer-section">
        <div className="footer-column">
          <h3>מדויק ומקצועי</h3>
          <p>מבוסס על מתודולוגיות מוכחות לאבחון סגנונות למידה</p>
        </div>
        <div className="footer-column">
          <h3>מותאם אישית</h3>
          <p>המלצות מותאמות לסגנון הלימוד האישי שלכם</p>
        </div>
        <div className="footer-column">
          <h3>קל לשימוש</h3>
          <p>ממשק ידידותי ונוח להתאמה מלאה עבור כל משתמש</p>
        </div>
      </div>
   </>
  );
};

export default HomePage;
