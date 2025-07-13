//user repository

const { User } = require("../../models/userModel");
const UserTestResults = require("../../models/userTestResultsModel");

const findUserByEmail = async (email) => {
  return await User.findOne({ email });
};

const createUser = async (userData) => {
  const user = new User(userData);
  return await user.save();
};

const updateUserById = async (userId, updateData) => {
    const user = await User.findByIdAndUpdate(userId, updateData, { new: true });

    if (!user) {
        throw new Error("User not found");
    }

    return user;
};

const findAllUsers = async () => {
    return await User.find({});
};

// New function to get user profile statistics
const getUserProfileStats = async (userId) => {
    try {
        // Get user basic info
        const user = await User.findById(userId);
        if (!user) {
            throw new Error("User not found");
        }

        // Get user test results count and latest test
        const testResults = await UserTestResults.find({ userId, isComplete: true })
            .sort({ createdAt: -1 })
            .populate('testId', 'name code')
            .populate('personalityTypeId', 'title personalityString');

        const testCount = testResults.length;
        const latestTest = testResults.length > 0 ? testResults[0] : null;

        return {
            user: {
                _id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                role: user.role,
                joinDate: user.createdAt || user.updatedAt
            },
            statistics: {
                testCount,
                latestTest: latestTest ? {
                    id: latestTest._id,
                    testName: latestTest.testId?.name || 'מבחן לא מוכר',
                    testCode: latestTest.testId?.code || '',
                    completedAt: latestTest.completedAt || latestTest.createdAt,
                    personalityType: latestTest.personalityTypeId?.title || 'לא זוהה',
                    personalityString: latestTest.personalityTypeId?.personalityString || '',
                    personalityTypeMatch: latestTest.personalityTypeMatch || 0
                } : null
            },
            allTests: testResults.map(test => ({
                id: test._id,
                testName: test.testId?.name || 'מבחן לא מוכר',
                testCode: test.testId?.code || '',
                completedAt: test.completedAt || test.createdAt,
                personalityType: test.personalityTypeId?.title || 'לא זוהה',
                personalityString: test.personalityTypeId?.personalityString || '',
                personalityTypeMatch: test.personalityTypeMatch || 0
            }))
        };
    } catch (error) {
        throw new Error(`Error getting user profile stats: ${error.message}`);
    }
};

module.exports = { findAllUsers, updateUserById, findUserByEmail, createUser, getUserProfileStats };