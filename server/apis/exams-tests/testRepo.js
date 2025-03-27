// test repository

const Test = require("../../models/testModel");
const Category = require("../../models/categoryModel");
const Quetion = require("../../models/questionModel");

const getTestByName = async(name= 'MBTI')=>{

    try {
        // שליפת המבחן לפי השם
        const test = await Test.findOne({ name });
    
        if (!test) {
          throw new Error('Test not found');
        }
    
        // שליפת הקטגוריות עבור המבחן
        const categories = await Category.find({ testId: test._id }).populate('questions');
    
        // החזרת המבחן עם הקטגוריות והשאלות
        return {
          ...test.toObject(), // המרת המבחן לאובייקט רגיל
          categories, // הוספת הקטגוריות
        };
      } catch (error) {
        console.error("Error fetching test:", error);
        throw error; // ניתן לנהל את השגיאה לפי הצורך
      }

}
module.exports ={ getTestByName}