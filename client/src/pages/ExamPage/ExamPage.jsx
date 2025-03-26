import React, { useState } from 'react';
import styles from './ExamPage.module.scss';

const ProgressBar = ({ currentQuestion, totalQuestions }) => {
    return (
        <div className={styles.progress}>
            <div className={styles['progress-fill']} style={{ width: `${(currentQuestion / totalQuestions) * 100}%` }}></div>
        </div>
    );
};
export const ExamPage = () => {
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const question = "באיזו מידה אתה מעדיף ללמוד סוגיה בצורה מעמיקה על פני לימוד מהיר של דף גמרא?";
    const answers = ["במידה רבה מאד", "במידה רבה", "במידה בינונית", "במידה מועטה", "כלל לא"];
    //const isLastQuestion = false;
    const [currentQuestion] = useState(1);
    const totalQuestions = 10;

    const handleAnswerChange = (answer) => {
        setSelectedAnswer(answer);
    };


    return (
        <>
            <div>
                <div className={styles.examCard}>
                    <h1 className={styles.h1}>{question}</h1>
                    <form>
                        {answers.map((answer, index) =>
                            <label
                                className={`${styles.answerCard} ${selectedAnswer === answer ? styles.selected : ''}`}
                                key={index}
                                htmlFor={`answer${index}`}
                                onClick={() => handleAnswerChange(answer)}// עדכון התשובה הנבחרת
                            >
                                <input className={styles.answers}
                                    type="radio"
                                    id={`answer${index}`}
                                    name="quiz"
                                    value={answer}
                                    checked={selectedAnswer === answer}
                                    onChange={handleAnswerChange}
                                    aria-label={`בחר תשובה: ${answer}`} // הוספת נגישות
                                />
                                <span className={styles.radioCustom}></span>
                                {answer}
                            </label>
                        )}
                    </form>

                </div>
                <div className='buttonBar' style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '30px' }}>
                    <button className={styles.secondaryButton} >{"< שאלה קודמת"} </button>
                    <button className={styles.primaryButton}>{currentQuestion < 10 ? "שאלה הבאה >" : "סיום מבחן"}</button>
                </div>
                <ProgressBar currentQuestion={currentQuestion} totalQuestions={totalQuestions} />
            </div>
        </>);
}