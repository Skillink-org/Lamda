const Result = require("../../models/userTestResultsModel");
const PersonalityType = require("../../models/personalityTypeModel");
const mongoose = require("mongoose"); // ודאי שזה קיים בראש הקובץ

// שמירת תוצאה של מבחן משתמש
const saveUserTestResult = async (testResultData) => {
    const testResult = new Result(testResultData);
    return await testResult.save();
};

// שליפת סוג האישיות לפי מחרוזת האישיות
const getPersonalityTypeByString = async (personalityString) => {
    return await PersonalityType.findOne({ personalityString: personalityString });
};
// שליפת תוצאות  לפי משתמש
const getResultByUserId = async (userId) => {
    try {
    
        const result = await Result.findOne({ userId,isComplete: true });

        console.log("finde one:",result);

        return result;  
    } catch (error){
        console.log(error.message);
        throw new Error('No results found for this user.');
    }
}

// פונקציה לשליפת המלצות לפי סוג אישיות
const getRecommendationsByPersonalityType = async (personalityTypeId,testId) => {
    try {
        console.log(personalityTypeId,testId);
        
        const result = await PersonalityType.findOne({ _id: personalityTypeId, testId });
        console.log(result);
        
        return result;
    } catch (error){
        throw new Error('Error retrieving results and recommendations');
    }

}

module.exports = { saveUserTestResult, getPersonalityTypeByString,getResultByUserId ,getRecommendationsByPersonalityType};