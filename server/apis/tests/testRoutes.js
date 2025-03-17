const express = require("express");
const router = express.Router();
const testService = require("../services/testService");

// GET – שליפת כל המבחנים
router.get("/", async (req, res) => {
  try {
    const tests = await testService.getAllTests();
    res.json(tests);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET – שליפת מבחן לפי ID
router.get("/:id", async (req, res) => {
  try {
    const test = await testService.getTestById(req.params.id);
    if (!test) return res.status(404).json({ error: "Test not found" });
    res.json(test);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST – יצירת מבחן חדש
router.post("/", async (req, res) => {
  try {
    const newTest = await testService.createTest(req.body);
    res.status(200).json(newTest);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT – עדכון מבחן קיים
router.put("/:id", async (req, res) => {
  try {
    const updatedTest = await testService.updateTest( req.body);  //to do 
    res.json(updatedTest);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE – מחיקת מבחן
router.delete("/:id", async (req, res) => {
  try {
    await testService.deleteTest(req.params.id);
    res.json({ message: "Test deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

