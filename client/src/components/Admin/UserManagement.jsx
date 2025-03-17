import { useEffect, useState } from "react";
import axios from "axios";

const UserManagement = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get("/api/users")
      .then(response => setUsers(response.data))
      .catch(error => console.error("Error fetching users", error));
  }, []);

  return (
    <div>
      <h2>ניהול משתמשים</h2>
      <table border="1">
        <thead>
          <tr>
            <th>שם משתמש</th>
            <th>אימייל</th>
            <th>מספר מבחנים</th>
            <th>תפקיד</th>
            <th>פעולות</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.testsTaken}</td>
              <td>{user.role === "admin" ? "🛠️ מנהל" : "👤 משתמש"}</td>
              <td>
                <button>👑 הפוך למנהל</button>
                <button>🗑️ מחק</button>
                <button>🔑 איפוס סיסמה</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;
