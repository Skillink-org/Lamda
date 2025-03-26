//user service
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { findUserByEmail, createUser } = require("./repository.js");

const registerUser = async (firstName, lastName, email, password) => {
  const existingUser = await findUserByEmail(email);
  if (existingUser) throw new Error("Email already in use");

  const hashedPassword = await bcrypt.hash(password, 10);
  return await createUser({ firstName, lastName, email, password: hashedPassword });
};

module.exports = { registerUser };