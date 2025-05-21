const TestResult = require("../../models/userTestResultsModel");
const PersonalityType = require("../../models/personalityTypeModel");

// שמירת תוצאה של מבחן משתמש
const saveUserTestResult = async (testResultData) => {
    const testResult = new TestResult(testResultData);
        return await testResult.save();
};

// שליפת סוג האישיות לפי מחרוזת האישיות
const getPersonalityTypeByString = async (personalityString) => {
    return await PersonalityType.findOne({ personalityString: personalityString });
};

module.exports = { saveUserTestResult, getPersonalityTypeByString };