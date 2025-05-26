
import styles from "../conclusionPage/conclusionPage.module.scss"
import IconAndTitle from "../../components/IconAndTitle/IconAndTitle";
import { ExternalLink, Download } from 'lucide-react';
import { getUserTestResults } from '../../services/api.js';
import React, { useEffect, useState } from 'react';

const Conclusion = () => {
  const [result, setResult] = useState(null);


  useEffect(() => {
    const userId = localStorage.getItem('userId');
    console.log(userId);
    if (!userId) return;



    const fetchResult = async () => {
      try {
        const data = await getUserTestResults(userId);
        console.log(data);
        setResult(data);


      } catch (error) {
        console.error('שגיאה בקריאת תוצאות:', error);
      }
    };

    fetchResult();
  }, []);

  return (
    <div className={styles["main-content"]}>
      <div className={styles["conclusion-page"]}>
        <div className={styles["conclusion-card"]}>
          {result ? (
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
                    {result.conclusions.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div className={styles["recommendations"]}>
                  <h4 className={styles["point-title"]}>המלצות ללימוד</h4>
                  <ul className={styles["point-list"]}>
                   {result.recommendations.map((item,index)=>(
                      <li key={index}>{item}</li>
                   ))}
                  </ul>
                </div>
              </div>
            </div>
          ) : (
            <p>טוען נתונים...</p>
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
