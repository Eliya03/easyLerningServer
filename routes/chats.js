var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", (req, res, next) => {
    res.json({ msg: "Work from chats.js easy larning" });
});

router.post("/", async (req, res) => {
    try {


        return res.json(data);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.get("/test1", async (req, res) => {
    try {

        return res.json(data);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;