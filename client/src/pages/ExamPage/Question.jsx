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
        <div className={styles.examCard}>
            <h1 className={styles.h1}>{question.text}</h1>
            <form>
                {options.map((option, index) => (
                    <label
                        className={`${styles.answerCard} ${selectedAnswer === option ? styles.selected : ''}`}
                        key={index}
                        htmlFor={`option${index}`}
                    >
                        <input className={styles.option}
                            type="radio"
                            id={`option${index}`}
                            name="quiz"
                            value={option.text}
                            checked={selectedAnswer === option.text}
                            onChange={() => onAnswerChange(option)}
                            aria-label={`בחר תשובה: ${option.text}`}
                        />
                        <span className={styles.radioCustom}></span>
                        {option.text}
                    </label>
                ))}
            </form>
        </div>
    );
};

export default Question;
