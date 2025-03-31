const express = require("express");
const router = express.Router();
const { calculateAndSaveResult } = require("./resultService");

router.post("/saveResult", async (req, res) => {
    try {
        const result = await calculateAndSaveResult(req.body);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;