import axios from 'axios';

export const fetchExamData = async () => {
    const response = await axios.get('http://localhost:8080/api/tests/getTest');
    return response.data;
};

export const mapAnswersToResult = (userId, testId, questions, answersList) => {
    console.log("mapAnswersToResult called with:");
    console.log("userId:", userId);
    console.log("testId:", testId);
    console.log("questions count:", questions.length);
    console.log("answersList:", answersList);
    
    const result = {
        userId: userId,
        testId: testId,
        categories: []
    };

    questions.forEach((question, index) => {
        const answer = answersList[index];
        console.log(`Question ${index}: categoryId=${question.categoryId}, answer=`, answer);
        
        if (!answer) {
            console.warn(`Missing answer for question ${index}`);
            return;
        }
        
        const category = result.categories.find(cat => cat.categoryId === question.categoryId);
        if (category) {
            category.answers.push(answer);// הוספת התשובה שנבחרה
        } else {
            result.categories.push({
                categoryId: question.categoryId,
                answers: [answer]// הוספת תשובה חדשה
            });
        }
    });

    console.log("Final result:", result);
    return result;
};
