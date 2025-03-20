import styles from "../aboutPage/AboutPage.module.scss";
import React from 'react';
import IconAndTitle from "../../components/IconAndTitle/IconAndTitle";
import { Target, Star, Book, Users, CheckCircle } from "lucide-react";


const About = () => {
  return (
    <div className={styles["main-content"]}>
      <div className={styles["about-page"]}>
      <div className={styles["about-card"]}>
        <h2>אודות המיזם</h2>
        <p>
          מיזם "מבחן התאמה תורני" נוסד מתוך הבנה עמוקה כי כל אדם הוא עולם מלא, וכי דרך הלימוד המתאימה לאחד אינה מתאימה לאחר.
          מטרתנו היא לסייע לכל לומד למצוא את הדרך המיטבית עבורו בלימוד התורה.
        </p>
      </div>
      <div className={styles["mission-vision-grid"]}>
        <div className={styles["card"]}>
          <IconAndTitle icon={<Target />} title="המטרה שלנו" />
          <p>לסייע לכל לומד למצוא את דרך הלימוד המתאימה לו ביותר, תוך התחשבות במאפייניו האישיים וסגנון הלמידה הטבעי שלו.
          </p>
        </div>
        <div className={styles["card"]}>
          <IconAndTitle icon={<Star />} title="החזון שלנו" />
          <p>ליצור עולם תורני בו כל לומד מממש את הפוטנציאל המלא שלו בלימוד, מתוך הבנה והתאמה אישית.
          </p>
        </div>
      </div>
      <div className={styles["about-card"]}>
        <h3> תהליך המבחן</h3>
        <div className={styles["timeline-container"]}>
          <div className={styles["timeline-items"]}>


            <div className={styles["timeline-item"]}>
              <div className={`${styles["timeline-content"]} ${styles["left"]}`} >
                <div className={styles["timeline-box"]}>
                  <h4> התחלת המבחן</h4>
                </div>
              </div>
              <div class={styles["timeline-spacer"]}></div>
            </div>
            <div className={styles["timeline-item"]}>
              <div className={styles["timeline-spacer"]}>
              </div>
              <div className={`${styles["timeline-content"]} ${styles["right"]}`} >
                <div className={styles["timeline-box"]}>
                  <h4 className={styles["timeline-title"]}>מענה על השאלות</h4>
                </div>
              </div>
            </div>
            <div className={styles["timeline-item"]}>
              <div className={`${styles["timeline-content"]} ${styles["left"]}`} >
                <div className={styles["timeline-box"]}>
                  <h4> עיבוד התוצאות</h4>
                </div>
              </div>
              <div className={styles["timeline-spacer"]}></div>
              </div>
            <div className={styles["timeline-item"]}>
              <div className={styles["timeline-spacer"]}>
              </div>
              <div className={`${styles["timeline-content"]} ${styles["right"]}`} >
                <div className={styles["timeline-box"]}>
                  <h4 className={styles["timeline-title"]}>קבלת מסקנות והמלצות מותאמות אישית</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles["card-advantages"]}>
        <IconAndTitle icon={<Target />} title="דיוק מרבי" description="תוצאות מדויקות ומותאמות אישית" />
        <IconAndTitle icon={<Book />} title="המלצות מעשיות" description="כלים פרקטיים לשיפור הלמידה" />
        <IconAndTitle icon={<Users />} title="ליווי מתמשך" description="תמיכה והכוונה לאורך כל הדרך" />
      </div>
      </div>
    </div>
  );
}

export default About;
