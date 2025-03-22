
// import React, { useState } from 'react';
// import { FaDownload, FaCalendarAlt } from 'react-icons/fa';
// import styles from './TestHistory.module.scss';

// const TestHistory = () => {
//   const [showAll, setShowAll] = useState(false);

//   const tests = [
//     {
//       id: 1,
//       title: 'מבחן MBTI - טופס מפורט אנליטי',
//       date: 'ג׳ בטבת תשפ״ד',
//       score: 85
//     },
//     {
//       id: 2,
//       title: 'מבחן MBTI - טופס שיטתי מסודר',
//       date: 'כ׳ בטבת תשפ״ד',
//       score: 72
//     },
//     {
//       id: 3,
//       title: 'מבחן MBTI - טופס שיטתי מסודר',
//       date: 'כא׳ בטבת תשפ״ד',
//       score: 80
//     }
//   ];

//   const displayedTests = showAll ? tests : tests.slice(0, 1);

//   const toggleShowAll = () => setShowAll(prev => !prev);

//   return (
//     <div className={styles.card}>
//       <div className={styles.cardHeader}>
//         <h2 className={styles.cardTitle}>היסטוריית מבחנים</h2>
//         <button className={styles.secondaryButton} onClick={toggleShowAll}>
//           {showAll ? 'הצג פחות' : 'הצג הכל'}
//         </button>
//       </div>

//       <div className={styles.testHistory}>
//         {displayedTests.map(test => (
//           <div className={styles.testItem} key={test.id}>
//             <div className={styles.testDetails}>
//               <div className={styles.testIcon}>
//                 <FaCalendarAlt />
//                 <span>{test.date}</span>
//               </div>
//               <div className={styles.testInfo}>
//                 <h3 className={styles.testTitle}>{test.title}</h3>
//                 <div className={styles.testProgress}>

//                 </div>
//               </div>
//             </div>
//             <button className={styles.downloadButton}>
//               <FaDownload />
//               <span>הורד תעודה</span>
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default TestHistory;
import React, { useState } from 'react';
import { FaDownload, FaCalendarAlt } from 'react-icons/fa';
import styles from './TestHistory.module.scss';

const TestHistory = () => {
  const [showAll, setShowAll] = useState(false);

  const tests = [
    { id: 1, title: 'מבחן MBTI - טופס מפורט אנליטי', date: 'ג׳ בטבת תשפ״ד' },
    { id: 2, title: 'מבחן MBTI - טופס שיטתי מסודר', date: 'כ׳ בטבת תשפ״ד' },
    { id: 3, title: 'מבחן MBTI - טופס שיטתי מסודר', date: 'כא׳ בטבת תשפ״ד' },
  ];

  const displayedTests = showAll ? tests : tests.slice(0, 1);

  const toggleShowAll = () => setShowAll(prev => !prev);

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <h2 className={styles.cardTitle}>היסטוריית מבחנים</h2>
        <button className={styles.secondaryButton} onClick={toggleShowAll}>
          {showAll ? 'הצג פחות' : 'הצג הכל'}
        </button>
      </div>

      <div className={styles.testHistory}>
        {displayedTests.map(test => (
          <div className={styles.testItem} key={test.id}>
            <div className={styles.testInfo}>
              <span className={styles.testTitle}>{test.title}</span>
            </div>

            <div className={styles.testActions}>
              <div className={styles.testDate}>
                <FaCalendarAlt />
                <span>{test.date}</span>
              </div>
              <button className={styles.downloadButton}>
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
