const axios = require('axios');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const fetch = require('node-fetch');


const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

// Career Suggestion Logic
app.post('/get-career', (req, res) => {
    const { userMessage } = req.body;
    let reply = "Mujhe samajh nahi aaya. Kya aap thoda aur explain kar sakte hain?";
    
    const webDevKeywords = ["web developer", "website development", "full stack"];
    if (webDevKeywords.some(term => userMessage.toLowerCase().includes(term))) {
        reply = "Web Developer banna ek achha career hai! 🎯 Aapko HTML, CSS, JavaScript, React, aur Node.js seekhna chahiye.";
    }

    const hal = ["hi", "hello", "hey"];
    if (hal.some(term => userMessage.toLowerCase().includes(term))) {
        reply = "mai aapki kaise madad kar sakta hoon?";
    }

    const naam = ["your name","aapka name", "tumhara naam", "aapka naam","what is your name"];
    if (naam.some(term => userMessage.toLowerCase().includes(term))) {
        reply = "Mera name hai NextU-Ai mai ek Ai assistance hu ";
    }

    const ok = ["ok","okey","thank you", "thak h", "thik hai"];
    if (ok.some(term => userMessage.toLowerCase().includes(term))) {
        reply = "👍";
    }

    else if (userMessage.toLowerCase().includes('data scientist')) {
        reply = "Data Scientist banna hai? 📊 Phir Python, Machine Learning, aur Data Analysis seekhna zaroori hai!";
    }
    else if (userMessage.toLowerCase().includes('ui ux designer')) {
        reply = "UI/UX Designer ke liye aapko Figma, Adobe XD aur Design Thinking seekhna chahiye. 🎨";
    }
    else if (userMessage.toLowerCase().includes('software engineer')) {
        reply = "Software Engineer banne ke liye DSA, OOPS, aur Competitive Programming seekho. 🚀";
    }
    else if (userMessage.toLowerCase().includes('hero')) {
        reply = "Software Engineer banne ke liye DSA, OOPS, aur Competitive Programming seekho. 🚀";
    }
    else if (userMessage.toLowerCase().includes('zero')) {
        reply = "App kaise hai mai thik hu";
    }
    else if (userMessage.toLowerCase().includes('hello')) {
        reply = "mai thik hu yar tum batao";
    }
    else if (userMessage.toLowerCase().includes('h1')) {
        reply = "mai";
    }

    res.json({ reply });
});

// Study Suggestion Logic (OpenAI API)
const OPENAI_API_KEY = "AIzaSyBpZLfq5CVhxsBKbGNf-YkIAZ4HBHs26oI"; // ⚠️ अपनी API Key यहां डालो

app.post("/study-suggestion", async (req, res) => {

    const { userMessage } = req.body;
    console.log("user input",userMessage);
    try {
        const response = await axios.post(
            "https://api.openai.com/v1/chat/completions",
            {
                model: "gpt-4",
                messages: [{ role: "user", content: userMessage }]
            },
            {
                headers: {
                    "Authorization": `Bearer ${OPENAI_API_KEY}`,
                    "Content-Type": "application/json"
                }
            }
        );
    
        console.log("API Response:", response.data);
        res.json({ reply: response.data.choices[0].message.content });
    } catch (error) {
        console.error("Error fetching OpenAI response:", error);
        res.status(500).json({ reply: "Koi error aayi, dobara try karein!" });
    }
});

// ✅ Agar koi unknown route aaye, to ye index.html serve karega
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
