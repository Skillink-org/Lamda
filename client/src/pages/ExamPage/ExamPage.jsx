import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './ExamPage.module.scss';
import ProgressBar from './ProgressBar';
import Question from './Question';
import { fetchExamData, mapAnswersToResult } from './examHelpers';

export const ExamPage = () => {
    const [loading, setLoading] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [questions, setQuestions] = useState([]);
    const [answersList, setAnswersList] = useState([]);
    const [userId, setUserId] = useState("67e2c74109abcb517b28a627");//local storage משתנה זמני עד שיתעדכן מה 
    const [testId, setTestId] = useState(null);
    const navigate = useNavigate();
    
    useEffect(() => {
        const fetchExam = async () => {
            setLoading(true);
            try {
                const data = await fetchExamData();
                setTestId(data._id);
                 // מיפוי השאלות מתוך האובייקט
                const allQuestions = data.categories.flatMap(category => category.questions);
                setQuestions(allQuestions);
            } catch (error) {
                alert('שגיאה בטעינת השאלות, אנא נסה שוב מאוחר יותר.');
            } finally {
                setLoading(false);
            }
        };
        fetchExam();
    }, []);

    // פונקציה לשמירת תשובה
    const handleAnswerChange = (answer) => {
        setSelectedAnswer(answer);
        console.log("התשובה שנבחרה");
        console.log(answer);
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
                console.log("answersList");
                console.log(answersList);
                const payload = mapAnswersToResult(userId, testId, questions, answersList); // בניית האובייקט לשליחה
                console.log("האובייקט שיישלח לשרת:");
                console.log(payload);
                // שליחת התשובות לשרת
                const response = await axios.post('http://localhost:8080/api/results/saveResult', payload);
                console.log(response);
                if (response.status === 200) {
                    navigate('/resultsPage');// אם הבקשה הצליחה, נווט לעמוד תוצאות
                } else {
                    alert('הייתה בעיה בשמירת התשובות, אנא נסה שוב.');
                }
            } catch (error) {
                console.error('Error saving answers:', error);
            } finally {
                setLoading(false); // לוודא שהמצב חוזר ל-false
            }
        }
    };

    return (
        <>
            {loading && <div>טוען...</div>} {/* תצוגת טעינה */}
            <div>
                <Question
                    question={questions[currentQuestionIndex]}
                    selectedAnswer={selectedAnswer}
                    onAnswerChange={handleAnswerChange}
                />
                <div className='buttonBar' style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '30px' }}>
                    <button onClick={onPrev} className={styles.prevButton} disabled={currentQuestionIndex === 0} >{"< שאלה קודמת"} </button>
                    <button onClick={onNext} className={styles.nextButton}>{currentQuestionIndex < questions.length - 1 ? "שאלה הבאה >" : "סיום מבחן"}</button>
                </div>
                <ProgressBar currentQuestion={currentQuestionIndex + 1} totalQuestions={questions.length} />
            </div>
        </>)
};
