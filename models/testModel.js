const mongoose = require("mongoose");

const testSchema = new mongoose.Schema({
    user_id: String,
    level: String,
    Time:String,
    FinalGrade: Number,
    TestScore1: Number,
    TestScore2: Number,
    TestScore3: Number,
    date_created: { type: Date, default: Date.now() },
});

exports.TestsModel = mongoose.model("tests", testSchema);