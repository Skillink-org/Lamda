import React from 'react';
import styles from './ExamPage.module.scss';

const ProgressBar = ({ currentQuestion, totalQuestions }) => {
    return (
        <div className={styles.progress}>
            <div className={styles['progress-fill']} style={{ width: `${(currentQuestion / totalQuestions) * 100}%` }}></div>
        </div>
    );
};

export default ProgressBar;