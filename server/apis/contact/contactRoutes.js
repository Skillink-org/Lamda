//user routes
const { Router } = require("express");
const { registerUser} = require("./services.js");

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

module.exports = router;