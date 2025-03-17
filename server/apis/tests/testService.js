const testRepo = require("../repository/testRepo");

// שליפת כל המבחנים
const getAllTests = async () => {
  return await testRepo.getAllTests();
};

// שליפת מבחן לפי ID
const getTestById = async (id) => {
  return await testRepo.getTestById(id);
};

// יצירת מבחן חדש
const createTest = async (testData) => {
  if (!testData.name || !testData.code) {
    throw new Error("Missing required fields");
  }
  return await testRepo.createTest(testData);
};

// עדכון מבחן
const updateTest = async (id, updatedData) => {
  return await testRepo.updateTest(id, updatedData);
};

// מחיקת מבחן
const deleteTest = async (id) => {
  return await testRepo.deleteTest(id);
};

module.exports = { getAllTests, getTestById, createTest, updateTest, deleteTest };
