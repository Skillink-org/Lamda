const Question = require("../../models/questionModel");
const questionRepo = require("../repository/questionRepo");
const Test = require("../../models/testModel");

// הוספת שאלה חדשה
const createQuestion = async (questionData) => {
  if (!questionData.testCode || !questionData.category || questionData.isPositive === undefined || !questionData.score) {
    throw new Error("Missing required fields");
  }

  isExist(questionData);

  // בדיקת כפילות בתוך המבחן בלבד
  const existQuestion = existTest.questions?.find(q => q.text === questionData.text);
  if (existQuestion) {
    throw new Error("Question already exists in this test");
  }

  return await questionRepo.createQuestion(questionData);
};

// עדכון שאלה
const updateQuestion = async ( updatedData) => {
  isExist(updatedData);
  return await questionRepo.updateQuestion( updatedData);
};

// מחיקת שאלה
const deleteQuestion = async (questionData) => {
  isExist();
  return await questionRepo.deleteQuestion(questionData.testCode);
};

const isExist = async (questionData) => {
  // חיפוש מבחן לפי קוד
  const existTest = await Test.findOne({ code: questionData.testCode });
  if (!existTest) {
    throw new Error("Test not found");
  }
  else return;
}

module.exports = { createQuestion, updateQuestion, deleteQuestion };
