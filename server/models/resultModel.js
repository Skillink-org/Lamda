const mongoose = require("mongoose");

// הגדרת המודל של תוצאה
const resultSchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User",  // רפרנס למודל User
        required: true 
    },
    testCode: { 
        type: String, 
        required: true 
    },
    answers: [{
        questionId: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: "Question",  // רפרנס למודל Question
            required: true 
        },
        rawScore: { 
            type: Number, 
            min: -2, 
            max: 5  // ציון בין -2 ל-5 
        },
        finalScore: { 
            type: Number 
        }
    }],
    categoryResults: [{
        categoryCode: { 
            type: String, 
            required: true 
        },
        score: { 
            type: Number, 
            required: true 
        },
        percentage: { 
            type: Number, 
            min: 0, 
            max: 100  // אחוזים בין 0 ל-100 
        },
        selectedTrait: { 
            type: String, 
            required: true 
        }
    }],
    personalityString: { 
        type: String, 
        required: true 
    },
    isComplete: { 
        type: Boolean, 
        default: false 
    },
    completedAt: { 
        type: Date 
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    }
}, { timestamps: true });

const Result = mongoose.model("Result", resultSchema);
module.exports = Result;
