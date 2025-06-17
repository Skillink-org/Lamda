import React from 'react';
import styles from './ExamPage.module.scss';

const options = [
    { text: "במידה רבה מאד", value: 50 },
    { text: "במידה רבה", value: 25 },
    { text: "ניטרלי", value: 0 },
    { text: "במידה מועטה", value: -25 },
    { text: "בכלל לא", value: -50 }
];

const Question = ({ question, selectedAnswer, onAnswerChange }) => {
    if (!question) return null;

    return (
        <div className={styles.questionCard}>
            <div className={styles.questionHeader}>
                <h2 className={styles.questionTitle}>{question.text}</h2>
                <div className={styles.titleUnderline}></div>
            </div>

            {/* Answer Options */}
            <div className={styles.optionsContainer}>
                {options.map((option, index) => (
                    <div
                        key={index}
                        onClick={() => onAnswerChange(option)}
                        className={`${styles.optionBox} ${selectedAnswer?.value === option.value ? styles.selected : ''}`}
                    >
                        <div className={styles.optionContent}>
                            <span className={styles.optionLabel}>{option.text}</span>
                            <div className={styles.optionCircle}>
                                {selectedAnswer?.value === option.value && (
                                    <div className={styles.optionCircleInner}></div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Question;
