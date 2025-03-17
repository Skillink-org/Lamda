const Test = require("../../models/testModel");

// שליפת כל המבחנים
const getAllTests = async () => {
  return await Test.find();
};

// שליפת מבחן לפי ID
const getTestById = async (id) => {
  return await Test.findById(id);
};

// יצירת מבחן חדש
const createTest = async (testData) => {
  const newTest = new Test(testData);
  return await newTest.save();
};

// עדכון מבחן קיים
const updateTest = async (id, updatedData) => {
  return await Test.findByIdAndUpdate(id, updatedData, { new: true });
};

// מחיקת מבחן
const deleteTest = async (id) => {
  return await Test.findByIdAndDelete(id);
};

module.exports = { getAllTests, getTestById, createTest, updateTest, deleteTest };
