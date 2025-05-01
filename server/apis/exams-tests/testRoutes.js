//test routes
const express = require("express");
const router = express.Router();
const { getTest } = require("./testService");

router.get("/getTest", async (req, res) => {
  try {
    const test = await getTest();
    res.status(200).json(test);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
module.exports = router;
