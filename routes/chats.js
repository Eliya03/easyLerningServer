var express = require("express");
var router = express.Router();
const OpenAI = require("openai");

// הגדרת ה-API Key שלך
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

// נתיב GET לדף הבית
router.get("/", (req, res, next) => {
    res.json({ msg: "ChatGPT API Integration!" });
});

// נתיב GET עבור רמות שונות (test1)
router.get("/test1/:level", async (req, res) => {
    try {
        const level = req.params.level; // מקבל את רמת המשתמש כפרמטר ב-path
        let userMessage;

        // הכנת ההודעה המבוקשת לפי הרמה
        if (level === 'beginner') {
            userMessage = "Generate a simple sentence using basic English. The sentence should be 15-20 words long and easy to understand for beginner learners.";
        } else if (level === 'intermediate') {
            userMessage = "Generate a sentence using intermediate English vocabulary. The sentence should be 15-20 words long and include some complexity.";
        } else if (level === 'advanced') {
            userMessage = "Generate a sentence that reflects complex ideas but uses clear and accessible vocabulary. The sentence should be 15-20 words long and suitable for advanced English learners.";
        } else {
            return res.status(400).json({ error: "Invalid level specified. Use 'beginner', 'intermediate', or 'advanced'." });
        }

        // שליחת ההודעה ל-GPT
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: userMessage }],
        });

        const chatResponse = response.choices[0].message.content;
        return res.json({ response: chatResponse });
    } catch (error) {
        res.status(500).send(error.message); // טיפול בשגיאה
    }
});

// נתיב GET עבור שאלות הבנה (test2)
router.get("/test2/:level", async (req, res) => {
    try {
        const level = req.params.level; // מקבל את רמת המשתמש כפרמטר ב-path
        let userMessage;

        // הכנת ההודעה המבוקשת לפי הרמה
        if (level === 'beginner') {
            userMessage = `Create a reading comprehension question for beginner English learners. 
                Include a simple text of 2-3 sentences and one question with three answer options (only one correct). 
                Use basic vocabulary and format the response in JSON with the following structure: 
                { "text": "text here", "question": "question here", "answers": [ 
                    { "option": "answer option 1", "isCorrect": true/false }, 
                    { "option": "answer option 2", "isCorrect": true/false }, 
                    { "option": "answer option 3", "isCorrect": true/false } 
                ] }`;
        } else if (level === 'intermediate') {
            userMessage = `Create a reading comprehension question for intermediate English learners. 
                Include a clear and concise text of 2-3 sentences that presents straightforward ideas without excessive complexity. 
                Include one question with three answer options (only one correct). 
                Use vocabulary that challenges learners but is still understandable, and format the response in JSON with the following structure: 
                { "text": "text here", "question": "question here", "answers": [ 
                    { "option": "answer option 1", "isCorrect": true/false }, 
                    { "option": "answer option 2", "isCorrect": true/false }, 
                    { "option": "answer option 3", "isCorrect": true/false } 
                ] }`;
        } else if (level === 'advanced') {
            userMessage = `Create a reading comprehension question for advanced English learners. 
                Include a clear text of 2-3 sentences that communicates complex ideas in an accessible manner. 
                Include one question with three answer options (only one correct). 
                Use vocabulary that challenges learners but is still understandable, and format the response in JSON with the following structure:
                { "text": "text here", "question": "question here", "answers": [ 
                    { "option": "answer option 1", "isCorrect": true/false }, 
                    { "option": "answer option 2", "isCorrect": true/false }, 
                    { "option": "answer option 3", "isCorrect": true/false } 
                ] }`;
        } else {
            return res.status(400).json({ error: "Invalid level specified. Use 'beginner', 'intermediate', or 'advanced'." });
        }

        // שליחת ההודעה ל-GPT
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: userMessage }],
        });

        const chatResponse = response.choices[0].message.content;

        // ניסיון לפרסר את התגובה בפורמט JSON
        const structuredResponse = JSON.parse(chatResponse); // ודא שהתגובה בפורמט JSON הנכון

        return res.json(structuredResponse); // שליחת התגובה המובנית חזרה ללקוח
    } catch (error) {
        res.status(500).send(error.message); // טיפול בשגיאה
    }
});

// סיום המודול
module.exports = router;