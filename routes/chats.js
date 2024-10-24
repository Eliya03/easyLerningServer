var express = require("express");
var router = express.Router();
const OpenAI = require("openai");

// הגדרת ה-API Key שלך ישירות
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

// נתיב GET לדף הבית
router.get("/", (req, res, next) => {
    res.json({ msg: "ChatGPT API Integration!" });
});

// נתיב GET עבור רמות שונות
router.get("/test1/:level", async (req, res) => {
    try {
        const level = req.params.level; // מקבל את רמת המשתמש כפרמטר ב-path
        let userMessage;

        // הכנת ההודעה המבוקשת לפי הרמה
        if (level === 'beginner' || level === 'intermediate' || level === 'advanced') {
            userMessage = `Please generate a very simple sentence using only basic English vocabulary. The sentence should be 15-20 words long, easy to understand for ${level} English learners, and contain no difficult words.`;
        } else {
            return res.status(400).json({ error: "Invalid level specified. Use 'beginner', 'intermediate', or 'advanced'." });
        }

        // שליחת ההודעה ל-GPT
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo", // מודל השימוש
            messages: [{ role: "user", content: userMessage }], // הכנסת ההודעה המבוקשת
        });

        const chatResponse = response.choices[0].message.content; // קבלת התגובה מ-ChatGPT
        return res.json({ response: chatResponse }); // שליחת התגובה חזרה ללקוח
    } catch (error) {
        res.status(500).send(error.message); // טיפול בשגיאה
    }
});

// סיום המודול
module.exports = router;
