
import React, { useState, useEffect } from 'react';
import { FaDownload, FaCalendarAlt } from 'react-icons/fa';
import styles from './TestHistory.module.scss';
import { getUserProfileStats } from '../../services/api';
import { useUser } from '../../context/UserContext';

const TestHistory = () => {
  const [showAll, setShowAll] = useState(false);
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user, isLoggedIn } = useUser();

  useEffect(() => {
    if (!isLoggedIn || !user?._id) {
      setError('משתמש לא מחובר למערכת');
      setLoading(false);
      return;
    }

    const fetchTestHistory = async () => {
      try {
        setLoading(true);
        const profileData = await getUserProfileStats(user._id);
        setTests(profileData.allTests || []);
        setError(null);
      } catch (error) {
        console.error('שגיאה בקריאת היסטוריית מבחנים:', error);
        setError('לא ניתן לטעון היסטוריית מבחנים');
      } finally {
        setLoading(false);
      }
    };

    fetchTestHistory();
  }, [user, isLoggedIn]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('he-IL', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const displayedTests = showAll ? tests : tests.slice(0, 1);

  const toggleShowAll = () => setShowAll(prev => !prev);

  const handleDownload = (testId) => {
    // TODO: Implement certificate download functionality
    console.log('Downloading certificate for test:', testId);
  };

  if (loading) {
    return (
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <h2 className={styles.cardTitle}>היסטוריית מבחנים</h2>
        </div>
        <p>טוען היסטוריית מבחנים...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <h2 className={styles.cardTitle}>היסטוריית מבחנים</h2>
        </div>
        <p className={styles.error}>{error}</p>
      </div>
    );
  }

  if (tests.length === 0) {
    return (
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <h2 className={styles.cardTitle}>היסטוריית מבחנים</h2>
        </div>
        <p className={styles.noTests}>עדיין לא ביצעת מבחנים</p>
      </div>
    );
  }

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <h2 className={styles.cardTitle}>היסטוריית מבחנים</h2>
        {tests.length > 1 && (
          <button className={styles.secondaryButton} onClick={toggleShowAll}>
            {showAll ? 'הצג פחות' : 'הצג הכל'}
          </button>
        )}
      </div>

      <div className={styles.testHistory}>
        {displayedTests.map(test => (
          <div className={styles.testItem} key={test.id}>
            <div className={styles.testInfo}>
              <div className={styles.testDetails}>
                <span className={styles.testTitle}>{test.testName}</span>
                <div className={styles.testMeta}>
                  <span className={styles.personalityType}>
                    {test.personalityType} ({test.personalityString})
                  </span>
                  <span className={styles.matchScore}>
                    התאמה: {Math.round(test.personalityTypeMatch)}%
                  </span>
                </div>
              </div>
            </div>

            <div className={styles.testActions}>
              <div className={styles.testDate}>
                <FaCalendarAlt />
                <span>{formatDate(test.completedAt)}</span>
              </div>
              <button 
                className={styles.downloadButton}
                onClick={() => handleDownload(test.id)}
              >
                <FaDownload />
                <span>הורד תעודה</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestHistory;
