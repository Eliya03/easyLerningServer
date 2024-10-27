var express = require("express");
const { TestsModel } = require("../models/testModel");
const { auth } = require("../middlewares/auth");
var router = express.Router();
const jwt = require("jsonwebtoken");

/* GET home page. */
router.get("/", (req, res, next) => {
  res.json({ msg: "Work from tests easy larning" });
});


router.get("/allMyTest", auth, async (req, res, next) => {
  let token = req.header("x-api-key");
  let decodeToken = jwt.verify(token, process.env.JWT_SECRET);
  let token_id = decodeToken._id;
  console.log(token_id);
  let allTest = await TestsModel.find({user_id : token_id});
 console.log(allTest);
  res.json(allTest);
});


// add test1
router.post("/test1", auth, async (req, res) => {
  let token = req.header("x-api-key");
  let decodeToken = jwt.verify(token, process.env.JWT_SECRET);
  let token_id = decodeToken._id;
  let _Body = req.body;
  _Body.user_id = token_id
  console.log(_Body);
  try {
    let newTest = new TestsModel(_Body);
    console.log(newTest);
    await newTest.save();
    return res.status(201).json(newTest);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});


// add test2
router.put("/test2", auth, async (req, res) => {
  let _Body = req.body;
  let test_id = req.body.test_id
  let TestScore2 = req.body.TestScore
  console.log(_Body);
  try {
    let test = await TestsModel.findOne({ _id: test_id });
    test.TestScore2 = TestScore2;
    let updateData = await TestsModel.updateOne({ _id: test_id }, test);
    res.status(200).json(updateData);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
})

// add test3
router.put("/test3", auth, async (req, res) => {
  let _Body = req.body;
  let test_id = req.body.test_id
  let TestScore3 = req.body.TestScore
  console.log(_Body);
  try {
    let test = await TestsModel.findOne({ _id: test_id });
    test.TestScore3 = TestScore3;
    console.log(test.TestScore1);
    console.log(test.TestScore2);
    console.log(TestScore3);
    let FinalGrade = (test.TestScore1 + test.TestScore2 + TestScore3);
    console.log(TestScore3);
    test.FinalGrade = FinalGrade;
    let updateData = await TestsModel.updateOne({ _id: test_id }, test);
    res.status(200).json(updateData);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
})


module.exports = router;