//test service

const { getTestByName } = require("./testRepo");

const getTest = async (name) => {
  const test = await getTestByName(name);
  return test;
};

module.exports = { getTest };
