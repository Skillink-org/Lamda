const Question = require("../../models/questionModel");


// הוספת שאלה חדשה
const createQuestion = async (QuestionData) => {
  const newQuestion = new Question(QuestionData);
  return await newQuestion.save();
};

// עדכון שאלה קיימת
const updateQuestion = async ( updatedData) => {
  return await Question.findByIdAndUpdate(updatedData.code, updatedData, { new: true });
};

// מחיקת שאלה
const deleteQuestion = async (id) => {
  return await Question.findByIdAndDelete(id);
};

module.exports = { createQuestion, updateQuestion, deleteQuestion };
