//user service
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {findAllUsers,updateUserById, findUserByEmail, createUser } = require("./userRepo");


// const updateUser = async (userId, updateData) => {
//     const user = updateUserById(userId, updateData);
//       const hashedPassword = await bcrypt.hash(password, 10);

//     return user;
//   };

const updateUser = async (userId, { firstName, lastName,email ,password }) => {
    const updateData = { firstName, lastName,email ,password  };

    const existingUser = await findUserByEmail(email);
  if (existingUser) throw new Error("Email already in use");
    // אם הסיסמה נשלחה, מבצעים hashing
    if (password) {
        updateData.password = await bcrypt.hash(password, 10);
    }

    const user = await updateUserById(userId, updateData);
    return user;
};



const registerUser = async (firstName, lastName, email, password) => {
  const existingUser = await findUserByEmail(email);
  if (existingUser) throw new Error("Email already in use");

  const hashedPassword = await bcrypt.hash(password, 10);
  return await createUser({ firstName, lastName, email, password: hashedPassword });
};

const loginUser = async (email, password) => {
    const user = await findUserByEmail(email);
    if (!user) {
        throw new Error("User not found");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new Error("Invalid password");
    }

    const token = jwt.sign(
        { userId: user._id, email: user.email },
        process.env.JWT_SECRET || 'your-secret-key',
        { expiresIn: '24h' }
    );

    return { token, user };
};

const getAllUsers = async () => {
    return await findAllUsers();
};

module.exports = {
 updateUser,
 registerUser ,
 getAllUsers,
 loginUser
};
