const Recomm = require("../../models/recommendationModel");


// הוספת המלצה חדשה
const createRecomm = async (RecommData) => {
  const newRecomm = new Recomm(RecommData);
  return await newRecomm.save();
};

// עדכון המלצה קיימת
const updateRecomm = async (id, updatedData) => {
  return await Recomm.findByIdAndUpdate(id, updatedData, { new: true });
};

// מחיקת המלצה
const deleteRecomm = async (id) => {
  return await Recomm.findByIdAndDelete(id);
};

module.exports = { createRecomm, updateRecomm, deleteRecomm };
