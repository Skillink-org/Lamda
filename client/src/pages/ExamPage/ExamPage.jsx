import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import styles from './ExamPage.module.scss';
import Question from './Question';
import ProgressBar from './ProgressBar';
import { useUser } from '../../context/UserContext';
import api from '../../services/api';

export const ExamPage = () => {
    const { testCode } = useParams();
    const navigate = useNavigate();
    const { user, isLoggedIn } = useUser();

    const [test, setTest] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState({});
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedAnswer, setSelectedAnswer] = useState(null);

    useEffect(() => {
        // בדיקת התחברות משתמש
        if (!isLoggedIn || !user?._id) {
            alert('נדרשת התחברות למערכת');
            navigate('/');
            return;
        }
    }, [navigate, isLoggedIn, user]);

    useEffect(() => {
        const fetchTest = async () => {
            if (!testCode) {
                setError("לא צוין קוד מבחן.");
                setLoading(false);
                return;
            }
            try {
                setLoading(true);
                const response = await api.get(`/tests/${testCode}`);
                const testData = response.data;
                setTest(testData);
                // Assuming questions are nested inside categories
                const allQuestions = testData.categories.flatMap(category => category.questions);
                setQuestions(allQuestions);
                setError(null);
            } catch (err) {
                setError("שגיאה בטעינת המבחן. נסה שוב מאוחר יותר.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchTest();
    }, [testCode]);

    // פונקציה לשמירת תשובה
    const handleAnswerChange = (answer) => {
        setSelectedAnswer(answer);
        setAnswers(prevAnswers => ({
            ...prevAnswers,
            [currentQuestionIndex]: answer
        }));
    };

    const onPrev = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
            setSelectedAnswer(answers[currentQuestionIndex - 1] || null);
        }
    };

    const findFirstUnansweredQuestion = () => {
        for (let i = 0; i < questions.length; i++) {
            if (!answers[i] || answers[i].value === undefined) {
                return i;
            }
        }
        return -1;
    };

    const onNext = async () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setSelectedAnswer(answers[currentQuestionIndex + 1] || null);
        } else {
            // בדיקה שכל השאלות נענו
            const firstUnanswered = findFirstUnansweredQuestion();
            if (firstUnanswered !== -1) {
                alert('נותרו שאלות שלא נענו. עברת לשאלה הראשונה שטרם נענתה');
                setCurrentQuestionIndex(firstUnanswered);
                setSelectedAnswer(answers[firstUnanswered] || null);
                return;
            }

            setLoading(true);
            try {
                // בניית נתוני התשובות לשליחה
                const categories = [];
                
                test.categories.forEach(category => {
                    const categoryAnswers = category.questions.map(question => {
                        const questionIndex = questions.findIndex(q => q._id === question._id);
                        const answer = answers[questionIndex];
                        return {
                            questionId: question._id,
                            value: answer ? answer.value : 0
                        };
                    });
                    
                    categories.push({
                        categoryId: category._id,
                        answers: categoryAnswers
                    });
                });

                const payload = {
                    userId: user._id,
                    testId: test._id,
                    categories: categories
                };

                console.log("Sending payload:", payload);
                const response = await api.post('/results/saveResult', payload);
                
                if (response.status === 201) {
                    navigate('/results');
                } else {
                    alert('הייתה בעיה בשמירת התשובות, אנא נסה שוב.');
                }
            } catch (error) {
                console.error('Error saving answers:', error);
                alert('שגיאה בשמירת התשובות. נסה שוב.');
            } finally {
                setLoading(false);
            }
        }
    };

    // עדכון התשובה הנבחרת כשעוברים לשאלה אחרת
    useEffect(() => {
        setSelectedAnswer(answers[currentQuestionIndex] || null);
    }, [currentQuestionIndex, answers]);

    if (loading) {
        return <div>טוען מבחן...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }
    
    if (!test || questions.length === 0) {
        return <div>לא נמצא מבחן.</div>;
    }

    const answeredCount = Object.keys(answers).filter(key => answers[key] && answers[key].value !== undefined).length;

    return (
        <div className={styles.examPage}>
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
                         `סיום מבחן (${answeredCount}/${questions.length})`}
                        <ChevronLeft className={styles.chevronIcon} />
                    </button>
                </div>
                
                <ProgressBar 
                    currentQuestion={currentQuestionIndex + 1} 
                    totalQuestions={questions.length}
                    answeredCount={answeredCount}
                />
            </main>
        </div>
    );
};
