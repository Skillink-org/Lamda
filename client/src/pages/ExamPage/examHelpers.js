import axios from 'axios';

export const fetchExamData = async () => {
    const response = await axios.get('http://localhost:8080/api/tests/getTest');
    return response.data;
};

export const mapAnswersToResult = (userId, testId, questions, answersList) => {
    const result = {
        userId: userId,
        testId: testId,
        categories: []
    };

    questions.forEach((question, index) => {
        const category = result.categories.find(cat => cat.categoryId === question.categoryId);
        if (category) {
            category.answers.push(answersList[index]);// הוספת התשובה שנבחרה
        } else {
            result.categories.push({
                categoryId: question.categoryId,
                answers: [answersList[index]]// הוספת תשובה חדשה
            });
        }
    });

    return result;
};
