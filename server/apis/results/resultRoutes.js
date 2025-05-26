const express = require("express");
const router = express.Router();

const { calculateAndSaveResult, getResultAndRecommendations } = require("./resultService");

router.post("/saveResult", async (req, res) => {
    try {
        const result = await calculateAndSaveResult(req.body);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
    
});
router.get("/getResult/:userId", async (req, res) => {
    const userId = req.params.userId;
    try {

        const data = await getResultAndRecommendations(userId);
        res.status(200).json(data);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }

})

module.exports = router;