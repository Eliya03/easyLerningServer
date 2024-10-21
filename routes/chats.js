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

// נתיב GET נוסף
router.get("/test1", async (req, res) => {
    try {
        // הכנת ההודעה המבוקשת
        const userMessage = "החזר לי משפט שעוד לא אמרת באנגלית שמורכב בדיוק מ-15 עד 20 מילים, ברמת קושי קלה שמתאימה למתחילים באנגלית. ודא שהמשפט קל להקריא, עם מילים נפוצות ומוכרות. אל תוסיף שום טקסט נוסף או הסבר.";

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
