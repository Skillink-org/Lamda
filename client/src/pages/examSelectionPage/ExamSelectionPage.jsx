import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api'; // Corrected import path
import styles from './ExamSelectionPage.module.scss';

const ExamSelectionPage = () => {
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTests = async () => {
      try {
        setLoading(true);
        const response = await api.get('/tests');
        setTests(response.data);
        setError(null);
      } catch (err) {
        setError('שגיאה בטעינת המבחנים. נסה לרענן את העמוד.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTests();
  }, []);

  const handleTestSelection = (testCode) => {
    navigate(`/exam/${testCode}`);
  };

  if (loading) {
    return <div className={styles.loading}>טוען מבחנים...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  return (
    <div className={styles.selectionContainer}>
      <h1 className={styles.title}>בחר מבחן</h1>
      <p className={styles.subtitle}>בחר את המבחן אותו תרצה לבצע מבין האפשרויות הבאות:</p>
      <div className={styles.testList}>
        {tests.map((test) => (
          <div
            key={test.code || test._id}
            className={`${styles.testCard} ${!test.isActive ? styles.disabled : ''}`}
            onClick={() => test.isActive && handleTestSelection(test.code)}
          >
            <h2 className={styles.testName}>{test.name}</h2>
            <p className={styles.testDescription}>{test.description}</p>
            {!test.isActive && <div className={styles.disabledOverlay}>בקרוב...</div>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExamSelectionPage; 