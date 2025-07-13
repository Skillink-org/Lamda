//test routes
const express = require("express");
const router = express.Router();
const { getTest, getAll } = require("./testService");

// GET all available tests for the selection page
router.get("/", async (req, res) => {
  try {
    const tests = await getAll();
    res.status(200).json(tests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET a specific test by its code
router.get("/:code", async (req, res) => {
  try {
    const { code } = req.params;
    if (!code) {
      return res.status(400).json({ message: "Test code is required" });
    }
    const test = await getTest(code);
    res.status(200).json(test);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
