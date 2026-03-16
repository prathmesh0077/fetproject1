require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Google Generative AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// System prompt for WCE Assistant
const SYSTEM_PROMPT = `You are an AI assistant for Walchand College of Engineering (WCE), Sangli. 
You're friendly, professional, and helpful. Provide accurate information about:
- Admissions: WCE admits UG students via JOSAA/JEE and PG students via GATE/CCMT
- Departments: CS, Mechanical, Civil, Electronics, Electrical, Chemical, Production, IT, and more
- Placements: 92% placement rate, average package ₹8.2L, highest ₹40L+
- Contact: +91 233 230 0383, wce@walchandsangli.ac.in, Vishrambag, Sangli – 416 415
- Campus: Modern facilities, research opportunities, vibrant student life

Keep responses concise, helpful, and conversational.`;

// Chat endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;
    
    if (!message || !message.trim()) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    
    const result = await model.generateContent(
      SYSTEM_PROMPT + "\n\nUser: " + message
    );
    
    const reply = result.response.text();
    
    res.json({ reply });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ 
      error: 'Failed to get response',
      details: error.message 
    });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'Server running on port ' + PORT });
});

app.listen(PORT, () => {
  console.log(`🚀 WCE Chatbot server running on http://localhost:${PORT}`);
  console.log(`📋 Chatbot API available at http://localhost:${PORT}/api/chat`);
  if (!process.env.GEMINI_API_KEY) {
    console.warn('⚠️  WARNING: GEMINI_API_KEY not found in .env file');
  }
});
