//test service

const { getTestByCode, getAllTests } = require("./testRepo");

const getTest = async (code) => {
  const test = await getTestByCode(code);
  return test;
};

const getAll = async () => {
    const tests = await getAllTests();
    return tests;
}

module.exports = { getTest, getAll };
