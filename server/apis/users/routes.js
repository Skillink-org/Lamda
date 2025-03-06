//user routes
const { Router } = require("express");
const { registerUser, loginUser, verifyToken } = require("./services.js");

const router = Router();

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
    const token = await loginUser(email, password);
    res.cookie("token", token, { httpOnly: true });
    res.json({ message: "Login successful" });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
});

router.get("/status", (req, res) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: "Not authenticated" });

  try {
    const decoded = verifyToken(token);
    res.json({ message: "Authenticated", userId: decoded.userId, role: decoded.role });
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
});

module.exports = router;
