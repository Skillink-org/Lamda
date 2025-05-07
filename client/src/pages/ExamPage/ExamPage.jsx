import React, { useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import styles from './ExamPage.module.scss';

const ProgressBar = ({ currentQuestion, totalQuestions }) => {
    return (
        <div className={styles.progress}>
            <div className={styles['progress-fill']} style={{ width: `${(currentQuestion / totalQuestions) * 100}%` }}></div>
        </div>
    );
};
const q1 = "באיזו מידה אתה מעדיף ללמוד סוגיה בצורה מעמיקה על פני לימוד מהיר של דף גמרא?";
const options = [
    { text: "במידה רבה מאד", value: 50 },
    { text: "במידה רבה", value: 25 },
    { text: "ניטרלי", value: 0 },
    { text: "במידה מועטה", value: -25 },
    { text: "בכלל לא", value: -50 }
];
export const ExamPage = () => {
    const [loading, setLoading] = useState(false); // מצב טעינה

    const [selectedAnswer, setSelectedAnswer] = useState(null);

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

    const [questions, setQuestions] = useState([]);

    const [answersList, setAnswersList] = useState([]); // רשימה לשמור את התשובות

    const navigate = useNavigate();

    const fetchExam = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:8080/api/tests/getTest');
            const data = response.data;
            console.log(data);
            // מיפוי השאלות מתוך האובייקט
            const allQuestions = data.categories.flatMap(category => category.questions);
            setQuestions(allQuestions);
        } catch (error) {
            console.error('Error fetching exam:', error);
            alert('שגיאה בטעינת השאלות, אנא נסה שוב מאוחר יותר.');
        }
        finally {
            setLoading(false); // לוודא שהמצב חוזר ל-false
        }
    };
    useEffect(() => {
        fetchExam(); // טען את המבחן כאשר העמוד נטען
    }, []);

    // פונקציה לשמירת תשובה
    const handleAnswerChange = (answer) => {
        setSelectedAnswer(answer);
        setAnswersList(prevAnswers => {
            const updatedAnswers = [...prevAnswers];
            updatedAnswers[currentQuestionIndex] = answer;// עדכון התשובה הנוכחית
            return updatedAnswers;
        });
    };

    const onPrev = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
            setSelectedAnswer(answersList[currentQuestionIndex - 1] || null); // לאפס את התשובה הנבחרת כשעוברים לשאלה קודמת
        }
    };

    const onNext = async () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setSelectedAnswer(answersList[currentQuestionIndex + 1] || null); // לאפס את התשובה הנבחרת כשעוברים לשאלה הבאה
        } else {
            // ווידוא שכל השאלות מולאו
            if (answersList.length < questions.length) {
                alert('נא למלא את כל השאלות לפני שליחה.');
                return;
            }

            setLoading(true); // הפעלת מצב טעינה
            try {
                // שליחת התשובות לשרת
                const response = await axios.post('http://localhost:8080/api/results/saveResult', {
                    answers: answersList // שליחת התשובות
                });
                if (response.status === 200) {
                    navigate('/resultsPage'/*, { state: { answers: answersList } }*/);// אם הבקשה הצליחה, נווט לעמוד תוצאות
                } else {
                    alert('הייתה בעיה בשמירת התשובות, אנא נסה שוב.');
                }
            } catch (error) {
                console.error('Error saving answers:', error);
            }finally {
                setLoading(false); // לוודא שהמצב חוזר ל-false
            }
        }
    };

    return (
        <>
            {loading && <div>טוען...</div>} {/* תצוגת טעינה */}

            <div>
                <div className={styles.examCard}>
                    <h1 className={styles.h1}>{q1} {questions[currentQuestionIndex]?.text}</h1>
                    <form>
                        {options.map((option, index) => (
                            <label
                                className={`${styles.answerCard} ${selectedAnswer === option ? styles.selected : ''}`}
                                key={index}
                                htmlFor={`option${index}`}
                            //onClick={() => handleAnswerChange(option)}// עדכון התשובה הנבחרת
                            >
                                <input className={styles.option}
                                    type="radio"
                                    id={`option${index}`}
                                    name="quiz"
                                    value={option.text}
                                    checked={selectedAnswer === option.text}
                                    onChange={() => handleAnswerChange(option)}
                                    aria-label={`בחר תשובה: ${option.text}`} // הוספת נגישות
                                />
                                <span className={styles.radioCustom}></span>
                                {option.text}
                            </label>
                        ))}
                    </form>

                </div>
                <div className='buttonBar' style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '30px' }}>
                    <button onClick={onPrev} className={styles.prevButton} disabled={currentQuestionIndex === 0} >{"< שאלה קודמת"} </button>
                    <button onClick={onNext} className={styles.nextButton}>{currentQuestionIndex < questions.length - 1 ? "שאלה הבאה >" : "סיום מבחן"}</button>
                </div>
                <ProgressBar currentQuestion={currentQuestionIndex + 1} totalQuestions={questions.length} />
            </div>
        </>)
};
