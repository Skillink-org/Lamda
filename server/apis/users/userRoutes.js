//user routes
const express = require('express');
const router = express.Router();
const {registerUser,updateUser,getAllUsers, loginUser} = require('./userService');


// router.put("/updateUser/:id", async (req, res) => {
//     try {
//         const userId = req.params.id;
//         const { firstName, lastName } = req.body;

//         // בדיקה אם כל השדות החיוניים קיימים
//         if (!firstName || !lastName ) {
//             return res.status(400).json({ message: "Send all required fields" });
//         }

//         const updatedUser = await updateUser(userId, {firstName,lastName});
//         res.status(200).json({ message: "User updated successfully", user: updatedUser });
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// });
router.put("/updateUser/:id", async (req, res) => {
    try {
        const userId = req.params.id;
        const { firstName, lastName, email,password } = req.body;

        if (!firstName || !lastName) {
            return res.status(400).json({ message: "First name and last name are required" });
        }

        const updatedUser = await updateUser(userId, { firstName, lastName,email, password });
        res.status(200).json({ message: "User updated successfully", user: updatedUser });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});



router.post("/register", async (req, res) => {
    try {
      const { firstName, lastName, email, password } = req.body;
      await registerUser(firstName, lastName, email, password);
      res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }
        const token = await loginUser(email, password);
        res.status(200).json({ message: "Login successful", token });
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
});

router.get("/getAllUsers", async (req, res) => {
    try {
        const users = await getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
module.exports = router