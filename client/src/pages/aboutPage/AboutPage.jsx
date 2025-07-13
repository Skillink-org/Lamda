import React from 'react';
import { Target, Book, Users, Star } from 'lucide-react';
import styles from './AboutPage.module.scss';

const AboutPage = () => {
  return (
    <div className={styles.aboutPage}>
      <main className={styles.mainContent}>
        {/* About Card */}
        <div className={styles.aboutCard}>
          <div className={styles.pageHeader}>
            <h2 className={styles.pageTitle}>
              אודות המיזם
            </h2>
            <div className={styles.titleUnderline}></div>
          </div>

          <div className={styles.aboutText}>
            <p>
              מיזם "מבחן התאמה תורני" נוסד מתוך הבנה עמוקה כי כל אדם הוא עולם מלא, וכי דרך הלימוד המתאימה לאחד אינה מתאימה לאחר. מטרתנו היא לסייע לכל לומד למצוא את הדרך המיטבית עבורו בלימוד התורה.
            </p>
          </div>
        </div>

        {/* Mission and Vision */}
        <div className={styles.missionVisionGrid}>
          <div className={styles.infoCard}>
            <div className={styles.iconContainer}>
              <Target className={styles.cardIcon} />
            </div>
            <h3 className={styles.cardTitle}>
              המטרה שלנו
            </h3>
            <p className={styles.cardText}>
              לסייע לכל לומד למצוא את דרך הלימוד המתאימה לו ביותר, תוך התחשבות במאפייניו האישיים וסגנון הלמידה הטבעי שלו.
            </p>
          </div>

          <div className={styles.infoCard}>
            <div className={styles.iconContainer}>
              <Star className={styles.cardIcon} />
            </div>
            <h3 className={styles.cardTitle}>
              החזון שלנו
            </h3>
            <p className={styles.cardText}>
              ליצור עולם תורני בו כל לומד מממש את הפוטנציאל המלא שלו בלימוד, מתוך הבנה והתאמה אישית.
            </p>
          </div>
        </div>

        {/* Development Process */}
        <div className={styles.processCard}>
          <h3 className={styles.sectionTitle}>
            תהליך הפיתוח
          </h3>
          <div className={styles.timelineContainer}>
            <div className={styles.timelineItems}>
              <div className={styles.timelineItem}>
                <div className={`${styles.timelineContent} ${styles.left}`}>
                  <div className={styles.timelineBox}>
                    <h4 className={styles.timelineTitle}>מחקר מקיף</h4>
                    <p className={styles.timelineText}>
                      ניתוח מעמיק של שיטות לימוד מסורתיות ומודרניות
                    </p>
                  </div>
                </div>
                <div className={styles.timelineSpacer}></div>
              </div>
              
              <div className={styles.timelineItem}>
                <div className={styles.timelineSpacer}></div>
                <div className={`${styles.timelineContent} ${styles.right}`}>
                  <div className={styles.timelineBox}>
                    <h4 className={styles.timelineTitle}>פיתוח המודל</h4>
                    <p className={styles.timelineText}>
                      יצירת מודל ייחודי המשלב ידע תורני עם כלים פסיכומטריים
                    </p>
                  </div>
                </div>
              </div>

              <div className={styles.timelineItem}>
                <div className={`${styles.timelineContent} ${styles.left}`}>
                  <div className={styles.timelineBox}>
                    <h4 className={styles.timelineTitle}>בדיקות והתאמות</h4>
                    <p className={styles.timelineText}>
                      ביצוע מחקרי תיקוף ושיפור מתמיד של המערכת
                    </p>
                  </div>
                </div>
                <div className={styles.timelineSpacer}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Benefits */}
        <div className={styles.benefitsCard}>
          <h3 className={styles.sectionTitle}>
            היתרונות של המבחן
          </h3>
          <div className={styles.benefitsGrid}>
            <div className={styles.benefitItem}>
              <div className={styles.iconContainer}>
                <Target className={styles.benefitIcon} />
              </div>
              <h4 className={styles.benefitTitle}>דיוק מרבי</h4>
              <p className={styles.benefitText}>
                תוצאות מדויקות ומותאמות אישית
              </p>
            </div>
            <div className={styles.benefitItem}>
              <div className={styles.iconContainer}>
                <Book className={styles.benefitIcon} />
              </div>
              <h4 className={styles.benefitTitle}>המלצות מעשיות</h4>
              <p className={styles.benefitText}>
                כלים פרקטיים לשיפור הלמידה
              </p>
            </div>
            <div className={styles.benefitItem}>
              <div className={styles.iconContainer}>
                <Users className={styles.benefitIcon} />
              </div>
              <h4 className={styles.benefitTitle}>ליווי מתמשך</h4>
              <p className={styles.benefitText}>
                תמיכה והכוונה לאורך כל הדרך
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AboutPage;
