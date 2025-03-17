const recommRepo = require("../Recommendations/recommRepo");


// הוספת מסקנה חדשה
const createRecomm = async (recommData) => {
  if (!recommData.testCode || !recommData.personalityString) {
    throw new Error("Missing required fields");
  }
  return await recommRepo.createRecomm(recommData);
};

// עדכון מסקנה
const updateRecomm = async (id, updatedData) => {
  return await recommRepo.updateRecomm(id, updatedData);
};

// מחיקת מסקנה
const deleteRecomm = async (id) => {
  return await recommRepo.deleteRecomm(id);
};

module.exports = { createRecomm, updateRecomm, deleteRecomm};
