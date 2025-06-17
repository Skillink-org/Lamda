import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import axios from 'axios';
import styles from './ExamPage.module.scss';
import ProgressBar from './ProgressBar';
import Question from './Question';
import { fetchExamData, mapAnswersToResult } from './examHelpers';
import { useUser } from '../../context/UserContext';

export const ExamPage = () => {
    const [loading, setLoading] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [questions, setQuestions] = useState([]);
    const [answersList, setAnswersList] = useState([]);
    const [testId, setTestId] = useState(null);
    const navigate = useNavigate();
    const { user, isLoggedIn } = useUser();
    
    useEffect(() => {
        // בדיקת התחברות משתמש
        if (!isLoggedIn || !user?._id) {
            alert('נדרשת התחברות למערכת');
            navigate('/');
            return;
        }
    }, [navigate, isLoggedIn, user]);
    
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
            const unansweredQuestionIndex = questions.findIndex((_, index) => !answersList[index]);
            if (unansweredQuestionIndex !== -1) {
                alert(`נא למלא את כל השאלות לפני שליחה. עובר לשאלה ${unansweredQuestionIndex + 1} שלא נענתה.`);
                setCurrentQuestionIndex(unansweredQuestionIndex);
                setSelectedAnswer(answersList[unansweredQuestionIndex] || null);
                return;
            }
            setLoading(true); // הפעלת מצב טעינה
            try {
                console.log("answersList:");
                console.log(answersList);
                const payload = mapAnswersToResult(user._id, testId, questions, answersList); // בניית האובייקט לשליחה
                console.log("האובייקט שיישלח לשרת:");
                console.log(payload);
                console.log("Categories in detail:");
                payload.categories.forEach((cat, index) => {
                    console.log(`Category ${index}:`, cat);
                    console.log(`  categoryId: ${cat.categoryId}`);
                    console.log(`  answers:`, cat.answers);
                });
                // שליחת התשובות לשרת
                const response = await axios.post('http://localhost:8080/api/results/saveResult', payload);
                console.log(response);
                if (response.status === 201) {
                    navigate('/results');// אם הבקשה הצליחה, נווט לעמוד תוצאות
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
        <div className={styles.examPage}>
            {loading && <div className={styles.loading}>טוען...</div>} {/* תצוגת טעינה */}
            
            <main className={styles.mainContent}>
                <Question
                    question={questions[currentQuestionIndex]}
                    selectedAnswer={selectedAnswer}
                    onAnswerChange={handleAnswerChange}
                />
                
                {/* Navigation Buttons */}
                <div className={styles.navigationButtons}>
                    <button 
                        onClick={onPrev} 
                        className={styles.prevButton} 
                        disabled={currentQuestionIndex === 0}
                    >
                        <ChevronRight className={styles.chevronIcon} />
                        שאלה קודמת
                    </button>
                    <button onClick={onNext} className={styles.nextButton}>
                        {currentQuestionIndex < questions.length - 1 ? "שאלה הבאה" : 
                         `סיום מבחן (${answersList.filter(answer => answer !== undefined && answer !== null).length}/${questions.length})`}
                        <ChevronLeft className={styles.chevronIcon} />
                    </button>
                </div>
                
                <ProgressBar 
                    currentQuestion={currentQuestionIndex + 1} 
                    totalQuestions={questions.length}
                    answeredCount={answersList.filter(answer => answer !== undefined && answer !== null).length}
                />
            </main>
        </div>
    );
};
