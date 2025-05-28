import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './ExamPage.module.scss';
import ProgressBar from './ProgressBar';
import Question from './Question';
import { fetchExamData, mapAnswersToResult } from './examHelpers';

// const ProgressBar = ({ currentQuestion, totalQuestions }) => {
//     return (
//         <div className={styles.progress}>
//             <div className={styles['progress-fill']} style={{ width: `${(currentQuestion / totalQuestions) * 100}%` }}></div>
//         </div>
//     );
// };
// const q1 = "באיזו מידה אתה מעדיף ללמוד סוגיה בצורה מעמיקה על פני לימוד מהיר של דף גמרא?";
// const options = [
//     { text: "במידה רבה מאד", value: 50 },
//     { text: "במידה רבה", value: 25 },
//     { text: "ניטרלי", value: 0 },
//     { text: "במידה מועטה", value: -25 },
//     { text: "בכלל לא", value: -50 }
// ];
export const ExamPage = () => {
    const [loading, setLoading] = useState(false); // מצב טעינה

    const [selectedAnswer, setSelectedAnswer] = useState(null);

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

    const [questions, setQuestions] = useState([]);

    const [answersList, setAnswersList] = useState([]); // רשימה לשמור את התשובות
    const [userId, setUserId] = useState("67e2c74109abcb517b28a627");
    const [testId, setTestId] = useState(null);

    const navigate = useNavigate();

    // const fetchExam = async () => {
    //     setLoading(true);
    //     try {
    //         const response = await axios.get('http://localhost:8080/api/tests/getTest');
    //         const data = response.data;
    //         console.log("data---");
    //         console.log(data);
    //         //setTestId(data.code);
    //         setTestId(data._id);
    //         // מיפוי השאלות מתוך האובייקט


    //         const allQuestions = data.categories.flatMap(category => category.questions);
    //         setQuestions(allQuestions);
    //         console.log("allQuestions**");
    //         console.log(allQuestions);
    //     } catch (error) {
    //         console.error('Error fetching exam:', error);
    //         console.log(error.response.data);

    //         alert('שגיאה בטעינת השאלות, אנא נסה שוב מאוחר יותר.');
    //     }
    //     finally {
    //         setLoading(false); // לוודא שהמצב חוזר ל-false
    //     }
    // };
    // useEffect(() => {
    //     fetchExam(); // טען את המבחן כאשר העמוד נטען
    // }, []);
    useEffect(() => {
        const fetchExam = async () => {
            setLoading(true);
            try {
                const data = await fetchExamData();
                setTestId(data._id);
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
    // const mapAnswersToResult = () => {
    //     const result = {
    //         userId: userId,
    //         testId: testId,
    //         categories: []
    //     };

    //     questions.forEach((question, index) => {
    //         const category = result.categories.find(cat => cat.categoryId === question.categoryId);
    //         if (category) {
    //             category.answers.push(answersList[index]); // הוספת התשובה שנבחרה
    //         } else {
    //             result.categories.push({
    //                 categoryId: question.categoryId,
    //                 answers: [answersList[index]] // הוספת תשובה חדשה
    //             });
    //         }
    //     });

    //     return result;
    // };

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
                    navigate('/resultsPage'/*, { state: { answers: answersList } }*/);// אם הבקשה הצליחה, נווט לעמוד תוצאות
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
                {/* <div className={styles.examCard}>
                    <h1 className={styles.h1}>{questions[currentQuestionIndex]?.text}</h1>
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

                </div> */}
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
