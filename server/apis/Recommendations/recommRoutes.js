const express = require("express");
const router = express.Router();
const recommService = require("../Recommendations/recommService");


// POST – הוספת המלצה חדשה
router.post("/", async (req, res) => {
  try {
    const newRecomm = await recommService.createRecomm(req.body);
    res.status(200).json(newRecomm);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
})

// PUT – עדכון המלצה קיימת
router.put("/:id", async (req, res) => {
  try {
    const updateRecomm = await recommService.updateRecomm(req.params.id, req.body);
    res.status(200).json(updateRecomm);
  } catch (error) {
    res.status(400).json({ error: error.message })
  }

})

// DELETE – מחיקת המלצה
router.delete("/:id", async (req, res) => {
  try {
    await recommService.deleteRecomm(req.params.id);
    res.status(200).json({ message: "Recomm deleted" })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

module.exports = router;