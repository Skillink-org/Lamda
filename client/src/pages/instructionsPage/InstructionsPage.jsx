import React from 'react';
import styles from './InstructionsPage.module.scss';

const InstructionsPage = () => {
  return (
    <div className={styles['instructions-page']}>
      <div className={styles.container}>
        <h1 className={styles.title}>הוראות למבחן</h1>
        
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>כללי</h2>
          <ul className={styles.list}>
            <li>המבחן מורכב מ-20 שאלות אמריקאיות</li>
            <li>זמן המבחן: 45 דקות</li>
            <li>יש לענות על כל השאלות</li>
            <li>לא ניתן לחזור לשאלות קודמות</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>הנחיות טכניות</h2>
          <ul className={styles.list}>
            <li>יש לוודא חיבור יציב לאינטרנט</li>
            <li>מומלץ להשתמש בדפדפן Chrome או Firefox</li>
            <li>יש לסגור את כל החלונות והטאבים המיותרים</li>
            <li>אין לצאת מהמבחן עד לסיומו</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>חשוב לדעת</h2>
          <ul className={styles.list}>
            <li>המבחן מתחיל ברגע הלחיצה על כפתור "התחל מבחן"</li>
            <li>לא ניתן להשהות את המבחן</li>
            <li>בסיום המבחן תוצג התוצאה מיד</li>
            <li>במקרה של בעיה טכנית, יש ליצור קשר עם התמיכה</li>
          </ul>
        </section>

        <div className={styles.actions}>
          <button className={styles.startButton}>התחל מבחן</button>
        </div>
      </div>
    </div>
  );
};

export default InstructionsPage; 