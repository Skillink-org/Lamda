const mongoose = require('mongoose');
const { saveUserTestResult, getPersonalityTypeByString,getRecommendationsByPersonalityType,getResultByUserId } = require("./resultRepo");


const calculateAndSaveResult = async ({ userId, testId, categories }) => {
  console.log("calculateAndSaveResult received data:", { userId, testId, categories });
  
  if (!userId || !testId || !Array.isArray(categories)) {
    console.error("Missing or invalid input data:", { userId, testId, categories });
    throw new Error("Missing or invalid input data");
  }

  // חישוב תוצאות לכל קטגוריה
  const categoryResults = categories.map((category) => {
    console.log("Processing category:", category);
    const { categoryId, answers } = category;
    if (!categoryId || !Array.isArray(answers) || answers.length === 0) {
      console.error("Invalid category data:", category);
      throw new Error("Invalid category data");
    }

    console.log("Category answers:", answers);
    if (!answers.every(a => typeof a.value === 'number' && a.value >= -50 && a.value <= 50)) {
      console.error("Invalid answer values:", answers);
      throw new Error(`Invalid answer value in category ${categoryId}`);
    }

    // חישוב ממוצע האחוזים של התשובות בקטגוריה
    const totalPercentage = answers.reduce((sum, answer) => sum + answer.value + 50, 0);
    const averagePercentage = totalPercentage / answers.length;
    console.log(`Category ${categoryId}: totalPercentage=${totalPercentage}, averagePercentage=${averagePercentage}`);

    return { categoryId, percentage: averagePercentage };
  });

  console.log("Category results:", categoryResults);
  const personalityTypeId = await calculatePersonalityType(categoryResults);
  console.log("Calculated personality type ID:", personalityTypeId);
  const personalityTypeMatch = await calculatePersonalityMatch(categoryResults);
  console.log("Personality match score:", personalityTypeMatch);

  // יצירת אובייקט לתוצאה
  const result = {
    userId: new mongoose.Types.ObjectId(userId),
    testId: new mongoose.Types.ObjectId(testId),
    categoryResults: categoryResults,
    personalityTypeId,
    personalityTypeMatch,
    isComplete: true,
    createdAt: new Date(),
  };

  // שמירה בבסיס הנתונים
  console.log("Saving result to database:", result);
  await saveUserTestResult(result);
  console.log("Result saved successfully");
  return result;
}

const calculatePersonalityType = async (categoryResults) => {
  console.log("calculatePersonalityType called with:", categoryResults);
  
  if (!Array.isArray(categoryResults) || categoryResults.length !== 4) {
    console.error("Invalid category results data. Expected 4 categories, got:", categoryResults.length);
    throw new Error("Invalid category results data");
  }

  // מיפוי קטגוריות לאותיות
  const categoryMap = {
    [categoryResults[0].categoryId]: ["E", "I"],
    [categoryResults[1].categoryId]: ["S", "N"],
    [categoryResults[2].categoryId]: ["T", "F"],
    [categoryResults[3].categoryId]: ["J", "P"]
  };
  
  console.log("Category map:", categoryMap);

  let personalityString = "";

  categoryResults.forEach(category => {
    const { categoryId, percentage } = category;
    console.log(`Processing category ${categoryId} with percentage ${percentage}`);
    
    if (!categoryMap[categoryId]) {
      console.error(`Unknown category ID: ${categoryId}. Available IDs:`, Object.keys(categoryMap));
      throw new Error(`Unknown category ID: ${categoryId}`);
    }

    // אם הערך נמוך מ-50 בוחרים את האות הראשונה, אחרת את השנייה
    const letter = percentage < 50 ? categoryMap[categoryId][0] : categoryMap[categoryId][1];
    console.log(`Category ${categoryId}: percentage=${percentage} -> letter=${letter}`);
    personalityString += letter;
  });

  console.log("Final personality string:", personalityString);

  // המרה לאותיות גדולות כי ב-DB זה נשמר באותיות גדולות
  const personalityStringUpper = personalityString.toUpperCase();
  console.log("Personality string in uppercase:", personalityStringUpper);

  // חיפוש המזהה המתאים מה-DB
  const personalityType = await getPersonalityTypeByString(personalityStringUpper);
  console.log("Found personality type:", personalityType);

  if (!personalityType) {
    console.error(`No personality type found for string: ${personalityStringUpper}`);
    console.error("Available personality types in DB need to be checked!");
    
    // במקום לקרוס, נחזיר null ונטפל בזה אחר כך
    throw new Error(
      `Personality type ${personalityStringUpper} is not configured in the database. Please contact administrator to add missing personality types.`
    );
  }

  return personalityType._id;
};

// פונקציה לחישוב מידת ההתאמה
const calculatePersonalityMatch = (categoryResults) => {
  if (!Array.isArray(categoryResults) || categoryResults.length !== 4) {
    throw new Error("Invalid category results data");
  }

  // חישוב ההתאמה לכל קטגוריה
  const totalMatch = categoryResults.reduce((sum, category) => {
    return sum + (category.percentage >= 0 ? category.percentage + 50 : (100 - (50 + category.percentage)));
  }, 0);

  return totalMatch / 4;
};
// פונקציה לשליפת תוצאות והמלצות עבור משתמש

const getResultAndRecommendations = async (userId) => {
    try {
        const result = await getResultByUserId(userId);
        if (!result) {
            throw new Error('No results found for this user');
        }
console.log("resultReco:",result.personalityTypeId ,result.testId);

        const recommendations = await getRecommendationsByPersonalityType(result.personalityTypeId, result.testId);

        return  recommendations ;
    } catch (error) {
        console.error(error.message);
        throw new Error('Error retrieving results and recommendations');
    }
};


module.exports = { calculateAndSaveResult,getResultAndRecommendations };
