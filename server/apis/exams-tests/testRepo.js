// test repository

const Test = require("../../models/testModel");
const Category = require("../../models/categoryModel");
const Question = require("../../models/questionModel");

const getTestByName = async (name = "MBTI להתאמת סגנון לימוד תורני") => {
  try {
    // Fetching the exam by name
    const test = await Test.findOne({ name });

    if (!test) {
      throw new Error("Test not found");
    }

    // Fetching the categories for the exam
    const categories = await Category.find({ testId: test._id });

    //  Fetching the questions for each category
    const categoriesWithQuestions = await Promise.all(
      categories.map(async (category) => {
        try {
          const questions = await Question.find({ categoryId: category._id });
          return {
            ...category.toObject(),
            questions, // Adding the questions to the category
          };
        } catch (error) {
          console.error(
            `Error fetching questions for category ${category._id}:`,
            error
          );
          return {
            ...category.toObject(),
            questions: [], // In case of an error, return an empty array for questions
          };
        }
      })
    );

    // Returning the exam with categories and questions
    return {
      ...test.toObject(), // Converting the exam to a regular object
      categories: categoriesWithQuestions, // Adding the categories with questions
    };
  } catch (error) {
    console.error("Error fetching test:", error);
    throw error;
  }
};

module.exports = { getTestByName };
