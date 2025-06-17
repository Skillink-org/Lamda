import React from 'react';
import styles from './ExamPage.module.scss';

const ProgressBar = ({ currentQuestion, totalQuestions, answeredCount }) => {
    const progressPercentage = (currentQuestion / totalQuestions) * 100;
    const answeredPercentage = (answeredCount / totalQuestions) * 100;
    
    return (
        <div className={styles.progressContainer}>
            <div className={styles.progressInfo}>
                <span>שאלה {currentQuestion} מתוך {totalQuestions}</span>
                <span>{answeredCount} תשובות נשמרו</span>
            </div>
            <div className={styles.progressBar}>
                <div className={styles.progressFill} style={{ width: `${progressPercentage}%` }}></div>
                <div className={styles.answeredFill} style={{ width: `${answeredPercentage}%` }}></div>
            </div>
        </div>
    );
};

export default ProgressBar;