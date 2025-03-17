const express = require("express");
const router = express.Router();
const questionService = require("../services/questionService");


// POST – הוספת שאלה חדשה
router.post("/", async (req, res) => {
  try {
    const newQuestion = await questionService.createQuestion(req.body);
    res.status(200).json(newQuestion);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// PUT – עדכון שאלה קיימת
router.put("/:id", async (req, res) => {
  try {
    const updatedQuestion = await questionService.updatedQuestion(req.body);
    res.json(updatedQuestion);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE – מחיקת שאלה
router.delete("/:id", async (req, res) => {
  try {
    await questionService.deleteQuestion(req.body);
    res.json({ message: "Question deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;