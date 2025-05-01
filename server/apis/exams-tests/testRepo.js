// test repository

const Test = require("../../models/testModel");
const Category = require("../../models/categoryModel");
const Question = require("../../models/questionModel");

const getTestByName = async (name = "MBTI להתאמת סגנון לימוד תורני") => {
  try {
    // שליפת המבחן לפי השם
    const test = await Test.findOne({ name });

    if (!test) {
      throw new Error("Test not found");
    }

    // שליפת הקטגוריות עבור המבחן
    const categories = await Category.find({ testId: test._id });

    // שליפת השאלות עבור כל קטגוריה
    const categoriesWithQuestions = await Promise.all(
      categories.map(async (category) => {
        const questions = await Question.find({ categoryId: category._id });
        return {
          ...category.toObject(),
          questions, // הוספת השאלות לקטגוריה
        };
      })
    );

    // לוג של הקטגוריות והשאלות
    console.log("Categories found:", categoriesWithQuestions);
    categoriesWithQuestions.forEach((category) => {
      console.log(
        `Category: ${category.name}, Questions:${category.questions}`
      );
    });

    // החזרת המבחן עם הקטגוריות והשאלות
    return {
      ...test.toObject(), // המרת המבחן לאובייקט רגיל
      categories: categoriesWithQuestions, // הוספת הקטגוריות עם השאלות
    };
  } catch (error) {
    console.error("Error fetching test:", error);
    throw error; // ניתן לנהל את השגיאה לפי הצורך
  }
};

module.exports = { getTestByName };
