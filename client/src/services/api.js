//Handles API requests and interactions with backend services.
import { useEffect, useState } from "react";

const TestList = () => {
  const [tests, setTests] = useState([]); // סטייט לשמירת הנתונים
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTests = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/tests");
        if (!response.ok) {
          throw new Error("Failed to fetch tests");
        }
        const data = await response.json();
        setTests(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTests();
  }, []);

  if (loading) return <p>טוען מבחנים...</p>;
  if (error) return <p>שגיאה: {error}</p>;

  return (
    <div>
      <h2>רשימת מבחנים</h2>
      <ul>
        {tests.map((test) => (
          <li key={test._id}>{test.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default TestList;
