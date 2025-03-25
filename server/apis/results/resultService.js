const { saveUserTestResult, getPersonalityTypeByString } = require("./resultRepo");

const calculateAndSaveResult = async ({ userId, testId, categories }) => {
    if (!userId || !testId || !Array.isArray(categories)) {
        throw new Error("Missing or invalid input data");
    }

    // חישוב תוצאות לכל קטגוריה
    const categoryResults = categories.map(category => {
        const { categoryId, answers } = category;
        if (!categoryId || !Array.isArray(answers) || answers.length === 0) {
            throw new Error("Invalid category data");
        }

        // חישוב ממוצע האחוזים של התשובות בקטגוריה
        const totalPercentage = answers.reduce((sum, answer) => sum + answer, 0);
        const averagePercentage = totalPercentage / answers.length;

        return { categoryId, percentage: averagePercentage };
    });

    const personalityTypeId = calculatePersonalityType(categoryResults);
    const personalityTypeMatch = calculatePersonalityMatch(categoryResults);

    // יצירת אובייקט לתוצאה
    const result = {
        userId,
        testId,
        categoryResults: categoryResults,
        personalityTypeId,
        personalityTypeMatch,
        isComplete: true,
        createdAt: new Date(),
    };

    // שמירה בבסיס הנתונים
    await saveUserTestResult(result);
    return result;
}

const calculatePersonalityType = async (categoryResults) => {
    if (!Array.isArray(categoryResults) || categoryResults.length !== 4) {
        throw new Error("Invalid category results data");
    }

    // מיפוי קטגוריות לאותיות
    const categoryMap = {
        [categoryResults[0].categoryId]: ["E", "I"],
        [categoryResults[1].categoryId]: ["S", "N"],
        [categoryResults[2].categoryId]: ["T", "F"],
        [categoryResults[3].categoryId]: ["J", "P"]
    };

    let personalityString = "";

    categoryResults.forEach(category => {
        const { categoryId, percentage } = category;
        if (!categoryMap[categoryId]) {
            throw new Error(`Unknown category ID: ${categoryId}`);
        }

        // אם האחוז נמוך מ-50 בוחרים את האות הראשונה, אחרת את השנייה
        personalityString += percentage < 50 ? categoryMap[categoryId][0] : categoryMap[categoryId][1];
    });

    // חיפוש המזהה המתאים מה-DB
    const personalityType = await getPersonalityTypeByString(personalityString);

    if (!personalityType) {
        throw new Error(`No personality type found for string: ${personalityString}`);
    }

    return personalityType.id;
};

// פונקציה לחישוב מידת ההתאמה
const calculatePersonalityMatch = (categoryResults) => {
    if (!Array.isArray(categoryResults) || categoryResults.length !== 4) {
        throw new Error("Invalid category results data");
    }

    // חישוב ההתאמה לכל קטגוריה
    const totalMatch = categoryResults.reduce((sum, category) => {
        return sum + (category.percentage >= 50 ? category.percentage : (100 - category.percentage));
    }, 0);

    return totalMatch / 4;
};

module.exports = { calculateAndSaveResult };
