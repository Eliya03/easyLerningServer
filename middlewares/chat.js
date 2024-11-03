// const express = require('express');
// const router = express.Router();
// const textToSpeech = require('@google-cloud/text-to-speech');
// const fs = require('fs');
// const util = require('util');
// const path = require('path');
// require('dotenv').config();

// const client = new textToSpeech.TextToSpeechClient({
//   key:  // שימוש במפתח API ישירות
// });

// const convertTextToSpeech = async (req, res) => {
//   try {
//     const text = req.body.text;
//     if (!text) {
//       return res.status(400).json({ msg_error: "Missing 'text' in request body" });
//     }

//     const request = {
//       input: { text: text },
//       voice: { languageCode: 'en-US', ssmlGender: 'NEUTRAL' },
//       audioConfig: { audioEncoding: 'MP3' },
//     };

//     const [response] = await client.synthesizeSpeech(request);

//     const fileName = `output_${Date.now()}.mp3`;
//     const filePath = path.join(__dirname, '..', 'public', 'audio', fileName);
//     const writeFile = util.promisify(fs.writeFile);
//     await writeFile(filePath, response.audioContent, 'binary');

//     res.json({ audioUrl: `/audio/${fileName}` });
//   } catch (error) {
//     console.error("Error in text-to-speech conversion:", error);
//     res.status(500).json({ msg_error: "Failed to convert text to speech" });
//   }
// };

// router.post('/textToSpeech', convertTextToSpeech);

// module.exports = router;
