import { useEffect, useState } from "react";
import axios from "axios";

const TestManagement = () => {
    const [tests, setTests] = useState([]);
    const [newTest, setNewTest] = useState({ name: '', code: '', status: true }); // נוסיף מצב לנתוני המבחן החדש

    useEffect(() => {
        axios.get("/api/tests")
            .then(response => {
                console.log(response.data); // הדפסת התגובה
                setTests(response.data);
            })
            .catch(error => console.error("Error fetching tests", error));
    }, []);

    // פונקציה לטיפול בהוספת מבחן חדש
    const handleAddTest = () => {
        axios.post("http://localhost:8080/api/tests", newTest) // תיקון ה-URL
            .then(response => {
                console.log("Test added:", response.data);
                setTests([...tests, response.data]);
            })
            .catch(error => console.error("Error adding test", error));
    };

    return (
        <div>
            <h2>ניהול מבחנים</h2>
            <button onClick={handleAddTest}>➕ הוספת מבחן חדש</button>
            <ul>
                {Array.isArray(tests) && tests.map((test) => (
                    <li key={test.id}>
                        {test.name} | {test.code} | {test.status ? "🟢 פעיל" : "🔴 לא פעיל"}
                        <button>✏️ עריכה</button>
                        <button>🗑️ מחיקה</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TestManagement;
