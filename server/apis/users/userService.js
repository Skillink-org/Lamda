//user service
const UserRepo = require('../users/userRepo');
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const User = require("../../models/userModel")


// פונקציה לבדיקת הרשאות
const checkAdminPermission = async (userId) => {
    const user = await User.findById(userId);
    if (!user) throw new Error("User not found");
    if (user.role !== "admin") throw new Error("You do not have permission.");
    return user; 
};

//שליפת כל המשתמשים
const getAllUsers = async (adminId) => {
    await checkAdminPermission(adminId);
    const users = await UserRepo.getAllUsers();
    if (!users || users.length === 0) throw new Error("Users not exist.");
    return users;
}

//עדכון תפקיד

const updateRole = async (adminId, email, updateData) => {
    await checkAdminPermission(adminId);
    return await UserRepo.updateRole(email, updateData);
}

//מחיקת משתמש

const deleteUser = async (adminId, email) => {
    await checkAdminPermission(adminId);
    return await UserRepo.deleteUser(email);
}


// שליחת אימייל לאיפוס סיסמה
const sendPasswordResetEmail = async (email) => {
    const user = await User.findOne({ email });
    if (!user) throw new Error("User not found");

    // יצירת טוקן לאיפוס סיסמה
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    // יצירת לינק לאיפוס סיסמה
    const resetLink = `https://yourdomain.com/reset-password/${token}`;

    // שליחת האימייל
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Password Reset",
        html: `<p>Click <a href="${resetLink}">here</a> to reset your password. This link is valid for 1 hour.</p>`
    };

    await transporter.sendMail(mailOptions);
    return { message: "Password reset link sent to your email" };
};

// איפוס סיסמה (עדכון הסיסמה החדשה במסד נתונים)
const resetPassword = async (token, newPassword) => {
    let decoded;
    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
        throw new Error("Invalid or expired token");
    }
    return await UserRepo.resetPassword(decoded.id, newPassword);
};
module.exports = { getAllUsers, updateRole, deleteUser, sendPasswordResetEmail, resetPassword };