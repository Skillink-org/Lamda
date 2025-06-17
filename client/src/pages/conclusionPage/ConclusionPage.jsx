
import styles from "../conclusionPage/conclusionPage.module.scss"
import IconAndTitle from "../../components/IconAndTitle/IconAndTitle";
import { ExternalLink, Download } from 'lucide-react';
import { getUserTestResults } from '../../services/api.js';
import { useUser } from '../../context/UserContext';
import React, { useEffect, useState } from 'react';

const Conclusion = () => {
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
        console.log('תוצאות מהשרת:', data);
        setResult(data);
        setError(null);
      } catch (error) {
        console.error('שגיאה בקריאת תוצאות:', error);
        setError('שגיאה בטעינת תוצאות המבחן');
      } finally {
        setLoading(false);
      }
    };

    fetchResult();
  }, [user, isLoggedIn]);

  return (
    <div className={styles["main-content"]}>
      <div className={styles["conclusion-page"]}>
        <div className={styles["conclusion-card"]}>
          {loading ? (
            <div className={styles["text-center"]}>
              <p>טוען תוצאות מבחן...</p>
            </div>
          ) : error ? (
            <div className={styles["text-center"]}>
              <p style={{ color: 'red' }}>{error}</p>
            </div>
          ) : result ? (
            <div className={styles["text-center"]}>
              <h2>סגנון הלימוד המומלץ עבורך</h2>
              <h3 className={styles["type-title"]}>
                {result.title}
              </h3>
              <p className={styles["type-description"]}>
                {result.description}
              </p>
              <div className={styles["key-points"]}>
                <div className={styles["strengths"]}>
                  <h4 className={styles["point-title"]}>חוזקות מרכזיות</h4>
                  <ul className={styles["point-list"]}>
                    {result.conclusions && result.conclusions.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div className={styles["recommendations"]}>
                  <h4 className={styles["point-title"]}>המלצות ללימוד</h4>
                  <ul className={styles["point-list"]}>
                   {result.recommendations && result.recommendations.map((item,index)=>(
                      <li key={index}>{item}</li>
                   ))}
                  </ul>
                </div>
              </div>
            </div>
          ) : (
            <div className={styles["text-center"]}>
              <p>לא נמצאו תוצאות מבחן</p>
            </div>
          )}

          <div className={styles["action-buttons"]}>
            <button className={styles["download-button"]}>
              <Download size={18} />
              <span>הורד תעודת סיכום</span>
            </button>
            <button className={styles["read-more-button"]}>
              <ExternalLink size={18} />
              <span>קרא עוד על סגנון זה</span>
            </button>
          </div>
        </div>
      </div>
    </div>

  );
};

export default Conclusion;
