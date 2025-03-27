const express = require("express");
const router = express.Router();
const resultsService = require("./resultService");

// ראוט לחישוב ושמירת תוצאה
router.post("/saveResult", async (req, res) => {
    try {
        const result = await resultsService.calculateAndSaveResult(req.body);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;