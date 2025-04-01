import axios from 'axios';
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
<<<<<<< Updated upstream
    const question = "באיזו מידה אתה מעדיף ללמוד סוגיה בצורה מעמיקה על פני לימוד מהיר של דף גמרא?";
    const answers = ["במידה רבה מאד", "במידה רבה", "במידה בינונית", "במידה מועטה", "כלל לא"];
    //const isLastQuestion = false;
=======
    //const question = "באיזו מידה אתה מעדיף ללמוד סוגיה בצורה מעמיקה על פני לימוד מהיר של דף גמרא?";
    const [question, setQuestion] = useState("");
    const answers = ["במידה רבה מאד", "במידה רבה", "במידה בינונית", "במידה מועטה", "כלל לא"];
    //const [answers, setAnswers] = useState([]);
    const [questions, setQuestions] = useState([]);
>>>>>>> Stashed changes
    const [currentQuestion, setCurrentQuestion] = useState(1);
    const totalQuestions = 10;

    // פונקציה לטעינת המבחן מהשרת
    const fetchExam = async () => {
        try {
            const response = await axios('http://localhost:8080/api/getExam');
            const data = await response.json();
            // מיפוי השאלות מתוך האובייקט
            const allQuestions = data.categories.flatMap(category => category.questions);
            setQuestions(allQuestions);
            setQuestion(allQuestions[currentQuestionIndex].text);
        } catch (error) {
            console.log('Error fetching exam:', error);
        }
    };
    const submitResults = async () => {
        try {
            const results = {
                question: question,
                selectedAnswer: selectedAnswer,
            };

            const response = await fetch('http://localhost:8080/api/saveResult', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(results),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();
            console.log('Results saved:', result);
        } catch (error) {
            console.error('Error saving results:', error);
        }
    };
    useEffect(() => {
        fetchExam(); // טען את המבחן כאשר העמוד נטען
    }, []);

    const handleAnswerChange = (answer) => {
        setSelectedAnswer(answer);
    };

    const handleSubmit = () => {
        submitResults(); // שלח את התוצאות כאשר המבחן מסתיים
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