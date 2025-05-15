import React from 'react';
import styles from './Recommendations.module.scss';

const Recommendations = () => {
  // תמונת מצב של נתוני המלצות - במציאות זה יגיע מפרופס או API
  const recommendations = [
    {
      id: 1,
      title: 'קורסים והרצאות',
      items: [
        'דרכי לימוד למופת ובינה',
        'ציון בתואר אקדמאי',
        'מתודולוגיה ללמידה'
      ]
    },
    {
      id: 2,
      title: 'בתי מדרש מתאימים',
      items: [
        'ישיבת מיר',
        'ישיבת פוניבז׳',
        'ישיבת חברון'
      ]
    },
    {
      id: 3,
      title: 'ספרי עיון מומלצים',
      items: [
        'בינות חושן',
        'נתיבות המשפט',
        'שב שמעתתא'
      ]
    }
  ];

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <h2 className={styles.cardTitle}>המלצות אישיות</h2>
      </div>
      
      <div className={styles.recommendationsGrid}>
        {recommendations.map(category => (
          <div className={styles.recommendationCard} key={category.id}>
            <h3 className={styles.recommendationTitle}>{category.title}</h3>
            <ul className={styles.recommendationList}>
              {category.items.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recommendations;