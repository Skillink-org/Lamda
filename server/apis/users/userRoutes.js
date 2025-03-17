const express = require("express");
const User = require("../../models/userModel"); // ייבוא מודל המשתמש
const userService = require("../users/userService");
const jwt = require("jsonwebtoken"); // ✅ ייבוא של jsonwebtoken
const bcrypt = require("bcryptjs"); // הצפנת סיסמאות
const nodemailer = require("nodemailer"); // לשליחת מיילים
require("dotenv").config(); // קריאה למשתני סביבה

const router = express.Router();


//שליפת כל המשתמשים
router.get("/", async (req, res) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) throw new Error("Unauthorized");

        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET);
        } catch (err) {
            throw new Error("Invalid or expired token");
        }

        const admin = await User.findById(decoded.id);
        if (!admin || admin.role !== "admin") throw new Error("Access denied");

        const users = await userService.getAllUsers(admin._id);
        res.json(users);
    } catch (error) {
        res.status(403).json({ error: error.message });
    }
});

// שליחת קישור לאיפוס סיסמה
router.post("/forgot-password", async (req, res) => {
    const { email } = req.body;
    try {
        const response = await userService.sendPasswordResetEmail(email);
        res.json(response);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// איפוס סיסמה בפועל
router.post("/reset-password/:token", async (req, res) => {
    const { token } = req.params;
    const { newPassword } = req.body;
    try {
        const response = await userService.resetPassword(token, newPassword);
        res.json(response);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;

