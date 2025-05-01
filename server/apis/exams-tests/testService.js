//test service

const { getTestByName } = require("./testRepo");

const getTest = async (name) => {
  console.log("Fetching data from database..."); // לוג לפני שליפת הנתונים
  const test = await getTestByName(name);
  console.log("Data fetched from database:", test); // לוג אחרי שליפת הנתונים

  return test;
};

module.exports = { getTest };
