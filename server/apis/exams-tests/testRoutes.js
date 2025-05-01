//test routes
const express = require("express");
const router = express.Router();
const { getTest } = require("./testService");

router.get("/getTest", async (req, res) => {
//   try {
//     const test = await getTest();
//     res.status(200).json(test);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });
try {
  console.log("Attempting to fetch test data..."); // לוג לפני הקריאה
  const test = await getTest();
  console.log("Test data fetched successfully:", test); // לוג אחרי הקריאה
  res.status(200).json(test);
} catch (error) {
  console.error("Error fetching test data:", error); // לוג במקרה של שגיאה
  res.status(500).json({ message: error.message });
}
});
module.exports = router;
