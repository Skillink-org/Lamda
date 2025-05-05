import styles from "../aboutPage/AboutPage.module.scss";
import React from 'react';
import IconAndTitle from "../../components/IconAndTitle/IconAndTitle";
import { Target, Star, Book, Users } from "lucide-react";

const missionVisionData = [
  { icon: <Target />, title: "המטרה שלנו", description: "לסייע לכל לומד למצוא את דרך הלימוד המתאימה לו ביותר, תוך התחשבות במאפייניו האישיים וסגנון הלמידה הטבעי שלו." },
  { icon: <Star />, title: "החזון שלנו", description: "ליצור עולם תורני בו כל לומד מממש את הפוטנציאל המלא שלו בלימוד, מתוך הבנה והתאמה אישית." }

];

const testProcessSteps = [
  { title: "התחלת המבחן", position: "left" },
  { title: "מענה על השאלות", position: "right" },
  { title: "עיבוד התוצאות", position: "left" },
  { title: "קבלת מסקנות והמלצות מותאמות אישית", position: "right" }
];

const advantagesData = [
  { icon: <Target />, title: "דיוק מרבי", description: "תוצאות מדויקות ומותאמות אישית" },
  { icon: <Book />, title: "המלצות מעשיות", description: "כלים פרקטיים לשיפור הלמידה" },
  { icon: <Users />, title: "ליווי מתמשך", description: "תמיכה והכוונה לאורך כל הדרך" }
];


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
          {missionVisionData.map((item, index) => (
            <div key={index} className={styles["card"]}>
              <IconAndTitle icon={item.icon} title={item.title} />
              <p>{item.description}</p>
            </div>
          ))}
        </div>

        <div className={styles["about-card"]}>
          <h3> תהליך המבחן</h3>
          <div className={styles["timeline-container"]}>
            <div className={styles["timeline-items"]}>
              {testProcessSteps.map((step, index) => (
                <div key={index} className={styles["timeline-item"]}>
                  {step.position === "left" && (
                    <>
                      <div className={`${styles["timeline-content"]} ${styles["left"]}`}>
                        <div className={styles["timeline-box"]}>
                          <h4>{step.title}</h4>
                        </div>
                      </div>
                      <div className={styles["timeline-spacer"]}></div>
                    </>
                  )}
                  {step.position === "right" && (
                    <>
                      <div className={styles["timeline-spacer"]}></div>
                      <div className={`${styles["timeline-content"]} ${styles["right"]}`}>
                        <div className={styles["timeline-box"]}>
                          <h4>{step.title}</h4>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={styles["card-advantages"]}>
          {advantagesData.map((item, index) => (
            <IconAndTitle key={index} icon={item.icon} title={item.title} description={item.description} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
