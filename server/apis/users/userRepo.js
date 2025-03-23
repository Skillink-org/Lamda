//user repository

const { User } = require("../../models/userModel");

const findUserByEmail = async (email) => {
  return await User.findOne({ email });
};

const createUser = async (userData) => {
  const user = new User(userData);
  return await user.save();
};


const updateUserById = async (userId, updateData) => {
    const user = await User.findByIdAndUpdate(userId, updateData, { new: true });

    if (!user) {
        throw new Error("User not found");
    }

    return user;
};

  const findAllUsers = async () => {
    return await User.find({});
};
module.exports = { findAllUsers,updateUserById,findUserByEmail, createUser };