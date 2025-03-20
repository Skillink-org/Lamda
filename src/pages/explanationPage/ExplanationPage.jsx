import styles from "../explanationPage/explanationPage.module.scss"
import React from 'react';
import { AlertTriangle, CheckSquare, Clock } from "lucide-react";
import InfoCard from "../../components/InfoCard/InfoCard";

const ExplanationPage = () => {
    return (

        <div className={styles["main-content"]}>
            <div className={styles["instructions-page"]}>
                <div className={styles["instructions-card"]}>
                    <div className={styles["page-header"]}>
                        <h2>לפני שמתחילים</h2>
                        <p>
                            כמה דברים חשובים שכדאי לדעת לפני תחילת המבחן
                        </p>
                    </div>
                    <div className={styles["key-points"]}>

                    </div>
                    <div className={styles["results-section"]}>

                    </div>
                    <div className={styles["start-section"]}>

                    </div>
                </div>
            </div>
        </div>
        // <div >    
        //   <div>
        //     <InfoCard
        //       title="שיטת הבחינה"
        //       items={["15-3 דקות בממוצע", "אין הגבלת זמן", "ניתן לחזור ולהשלים מאוחר יותר"]}
        //       icon={<Clock  />}

        //     />
        //     <InfoCard
        //       title="מבנה הבחינה"
        //       items={["40 שאלות קבועות", "סולם תשובות 1-5", "אפשרות לחזור לשאלות קודמות"]}
        //       icon={<CheckSquare />}

        //     />
        //   </div>

        //   <InfoCard
        //     title="דגשים חשובים"
        //     items={[
        //       "יש לענות על כל השאלות בצורה כנה",
        //       "אין תשובות נכונות או לא נכונות",
        //       "התשובות עוזרות למצוא את הדרך המתאימה ביותר עבורך"
        //     ]}
        //     icon={<AlertTriangle />}
        //   />
        //   </div>

    );
};

export default ExplanationPage;
