import { useState } from "react";
import Sidebar from "../Admin/Sidebar";
import TestManagement from "../Admin/TestManagement";
import UserManagement from "../Admin/UserManagement";

const AdminPage = () => {
  const [section, setSection] = useState("tests"); // כברירת מחדל ניהול מבחנים

  return (
    <div className="admin-container">
      <Sidebar setSection={setSection} />
      <div className="admin-content">
        <h1>דף ניהול</h1>
        {section === "tests" ? <TestManagement /> : <UserManagement />}
      </div>
    </div>
  );
};

export default AdminPage;
