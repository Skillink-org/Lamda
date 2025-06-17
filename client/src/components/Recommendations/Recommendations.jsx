import React, { useState, useEffect } from 'react';
import styles from './Recommendations.module.scss';
import { getUserTestResults } from '../../services/api.js';
import { useUser } from '../../context/UserContext';

const Recommendations = () => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user, isLoggedIn } = useUser();

  useEffect(() => {
    if (!isLoggedIn || !user?._id) {
      setError('משתמש לא מחובר למערכת');
      setLoading(false);
      return;
    }

    const fetchResult = async () => {
      try {
        setLoading(true);
        const data = await getUserTestResults(user._id);
        setResult(data);
        setError(null);
      } catch (error) {
        console.error('שגיאה בקריאת תוצאות:', error);
        setError('לא נמצאו תוצאות מבחן');
      } finally {
        setLoading(false);
      }
    };

    fetchResult();
  }, [user, isLoggedIn]);

  if (loading) {
    return (
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <h2 className={styles.cardTitle}>המלצות אישיות</h2>
        </div>
        <p>טוען המלצות...</p>
      </div>
    );
  }

  if (error || !result) {
    return (
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <h2 className={styles.cardTitle}>המלצות אישיות</h2>
        </div>
        <p>{error || 'לא נמצאו המלצות זמינות'}</p>
      </div>
    );
  }

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <h2 className={styles.cardTitle}>המלצות אישיות</h2>
      </div>
      
      <div className={styles.personalityInfo}>
        <h3 className={styles.personalityTitle}>{result.title}</h3>
        <p className={styles.personalityDescription}>{result.description}</p>
      </div>

      <div className={styles.recommendationsGrid}>
        <div className={styles.recommendationCard}>
          <h3 className={styles.recommendationTitle}>המלצות ללימוד</h3>
          <ul className={styles.recommendationList}>
            {result.recommendations && result.recommendations.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
        
        <div className={styles.recommendationCard}>
          <h3 className={styles.recommendationTitle}>חוזקות מרכזיות</h3>
          <ul className={styles.recommendationList}>
            {result.conclusions && result.conclusions.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Recommendations;