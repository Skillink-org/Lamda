import styles from "../explanationPage/explanationPage.module.scss";
import React from 'react';
import { AlertTriangle, CheckSquare, Clock, BookOpenCheck, ChevronLeft } from "lucide-react";
import InfoCard from "../../components/InfoCard/InfoCard";
import IconAndTitle from "../../components/IconAndTitle/IconAndTitle";
import { useNavigate } from "react-router-dom";


const infoCards = [
    {
        title: "שיטת הבחינה",
        items: ["15-3 דקות בממוצע", "אין הגבלת זמן", "ניתן לחזור ולהשלים מאוחר יותר"],
        icon: <Clock />
    },
    {
        title: "מבנה הבחינה",
        items: ["40 שאלות קבועות", "סולם תשובות 1-5", "אפשרות לחזור לשאלות קודמות"],
        icon: <CheckSquare />
    },
    {
        title: "דגשים חשובים",
        items: [
            "יש לענות על כל השאלות בצורה כנה",
            "אין תשובות נכונות או לא נכונות",
            "התשובות עוזרות למצוא את הדרך המתאימה ביותר עבורך"
        ],
        icon: <AlertTriangle />
    }
];

const results = [
    { title: "פרופיל מפורט", description: "ניתוח מעמיק של סגנון הלמידה שלכם" },
    { title: "המלצות מעשיות", description: "כלים ושיטות מותאמים אישית " },
    { title: "תעודת סיכום", description: "מסמך רשמי עם התוצאות וההמלצות " }
];

const ExplanationPage = () => {
    const navigate = useNavigate();
    const handleStartClick = () => {
        navigate("/exam"); 
    };
    return (
        <div className={styles["main-content"]}>
            <div className={styles["instructions-page"]}>
                <div className={styles["instructions-card"]}>
                    <div className={styles["page-header"]}>
                        <h2>לפני שמתחילים</h2>
                        <p>כמה דברים חשובים שכדאי לדעת לפני תחילת המבחן</p>
                    </div>
                    <div className={styles["key-points"]}>
                        {infoCards.slice(0, 2).map((card, index) => (
                            <div key={index} className={styles["info-box"]}>
                                <InfoCard title={card.title} items={card.items} icon={card.icon} />
                            </div>
                        ))}
                    </div>
                    <div className={styles["notes-section"]}>
                        <InfoCard 
                            title={infoCards[2].title} 
                            items={infoCards[2].items} 
                            icon={infoCards[2].icon} 
                        />
                    </div>
                    <div className={styles["results-section"]}>
                        <div className={styles["results-header"]}>
                            <IconAndTitle icon={<BookOpenCheck size={40} />} title={"מה תקבלו בסיום?"} />
                        </div>
                        <div className={styles["results-grid"]}>
                            {results.map((result, index) => (
                                <IconAndTitle key={index} title={result.title} description={result.description} />
                            ))}
                        </div>
                    </div>
                    <div className={styles["start-section"]}>
                        <button className={styles["start-button"]} onClick={handleStartClick}>
                            <span>התחל את המבחן</span>
                            <ChevronLeft className={styles["arrow-icon"]} size={18} />
                        </button>
                        <p className={styles["note-text"]}>* ניתן לעצור ולהמשיך בכל שלב</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExplanationPage;
