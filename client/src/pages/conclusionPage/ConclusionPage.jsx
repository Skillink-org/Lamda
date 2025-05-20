
import styles from "../conclusionPage/conclusionPage.module.scss"
import React from 'react';
import IconAndTitle from "../../components/IconAndTitle/IconAndTitle";
import { ExternalLink, Download } from 'lucide-react';

const Conclusion = (props) => {





  return (
    <div className={styles["main-content"]}>
      <div className={styles["conclusion-page"]}>
        <div className={styles["conclusion-card"]}>
          <div className={styles["text-center"]}>
            <h2>סגנון הלימוד המומלץ עבורך</h2>
            <h3 className={styles["type-title"]}>לומד מעמיק - אנליטי</h3>
            <p className={styles["type-description"]}>סגנון לימוד המתאפיין בהעמקה, ניתוח מדוקדק וחתירה להבנה יסודית</p>
            <div className={styles["key-points"]}>
              <div className={styles["strengths"]}>
                <h4 className={styles["point-title"]}>חוזקות מרכזיות</h4>
                <ul className={styles["point-list"]}>
                  <li> יכולת ניתוח מעמיקה של סוגיות</li>
                  <li> סבלנות רבה לפרטים</li>
                  <li>חשיבה ביקורתית מפותחת</li>
                </ul>
              </div>
              <div className={styles["recommendations"]}>
                <h4 className={styles["point-title"]}>המלצות ללימוד</h4>
                <ul className={styles["point-list"]}>
                  <li> התמקדות בספרי עיון מעמיקים</li>
                  <li> לימוד בקצב מדוד ויסודי</li>
                  <li> שימוש במפרשים מורחבים</li>
                </ul>
              </div>
            </div>
          </div>
          <div className={styles["action-buttons"]}>
            <button className={styles["download-button"]}> 
                            <Download  size={18} />

              <span>הורד תעודת סיכום</span>
                           
              </button>
            <button className={styles["read-more-button"]}>  
              <ExternalLink  size={18} />
              <span>קרא עוד על סגנון זה</span>
              </button>
          </div>
        </div>


      </div>
    </div>
  );
};

export default Conclusion;
