//user repository
const User = require("../../models/userModel");
const bcrypt = require("bcrypt");


// שליפת כל המשתמשים
const getAllUsers = async () => {
  try {
    return User.find(); 
  } catch (error) {
    throw new Error(`Failed to fetch users: ${error.message}`);
  }
};



// שינוי תפקיד משתמש
const updateRole = async (email, updatedRole) => {
  return await User.findOneAndUpdate({ email: email },
    { $set: { role: updatedRole } },
    { new: true });
};

// מחיקת משתמש
const deleteUser = async (email) => {
  try {
    const user = await User.findOne({ email });
    if (!user) throw new Error("User not found");

    return await User.findOneAndDelete({ email });
  } catch (error) {
    throw new Error(`Failed to delete user: ${error.message}`);
  }
};


//איפוס סיסמא 
const resetPassword = async (userId, newPass) => {
  try {
    const hashPassword = await bcrypt.hash(newPass, 10);
    return await User.findByIdAndUpdate(userId, { password: hashPassword }, { new: true });
  } catch (error) {
    throw new Error(`Failed to reset password: ${error.message}`);
  }
};


module.exports = { getAllUsers, updateRole, deleteUser, resetPassword };
