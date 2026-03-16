# WCE Chatbot Setup Guide

## Overview
This guide explains how to set up the AI-powered chatbot for the WCE website using Google Gemini API.

---

## Part 1: Get Your Gemini API Key

### Step 1: Visit Google AI Studio
1. Go to **https://ai.google.dev/**
2. Click **"Get API Key"** button
3. Click **"Create API key in new project"**

### Step 2: Enable Gemini API
- A new browser tab will open with Google Cloud Console
- You'll see a popup saying "API key created"
- Copy the API key shown in the popup

### Step 3: Create .env File
1. In your project folder (`c:\Users\prath\MyProgram\Web_Developement\projects\project04`)
2. Create a new file named `.env` (not `.env.example`)
3. Add this line:
   ```
   GEMINI_API_KEY=paste_your_api_key_here
   ```
   - Replace `paste_your_api_key_here` with your actual API key
4. **Save the file**

> ⚠️ **IMPORTANT**: Never share your API key! Never commit .env to GitHub.

---

## Part 2: Install Node.js Dependencies

### Step 1: Open PowerShell/Command Prompt
1. Open **PowerShell** (or CMD)
2. Navigate to your project folder:
   ```powershell
   cd c:\Users\prath\MyProgram\Web_Developement\projects\project04
   ```

### Step 2: Install npm Packages
Run this command:
```powershell
npm install
```

This will install:
- **express** - Web server framework
- **cors** - Enable cross-origin requests
- **@google/generative-ai** - Google Gemini API client
- **dotenv** - Load API key from .env file

Wait 2-3 minutes for everything to download.

---

## Part 3: Start the Server

### Step 1: Run the Server
In the same PowerShell window, run:
```powershell
node server.js
```

You should see:
```
🚀 WCE Chatbot server running on http://localhost:3000
📋 Chatbot API available at http://localhost:3000/api/chat
```

### Step 2: Keep Server Running
- Keep this PowerShell window open while using the chatbot
- The server runs on **port 3000**
- Don't close this window!

---

## Part 4: Use the Chatbot

### Open Your Website
1. Open `wce_homepage(2).html` in your web browser
2. Click the **🤖 chatbot button** (bottom-right corner)
3. Type a message and press **Enter**
4. The Gemini AI will respond!

### Example Queries
- "Tell me about WCE admissions"
- "What is the placement percentage?"
- "What departments are available?"
- "How do I contact WCE?"

---

## Troubleshooting

### Issue: "Unable to connect to server"
**Solution:**
1. Make sure `server.js` is running (check PowerShell window)
2. Server must be running on port 3000
3. Restart the server: Close PowerShell and run `node server.js` again

### Issue: "API key not found"
**Solution:**
1. Check if `.env` file exists in your project folder
2. Make sure the file is named exactly `.env` (not `.env.txt`)
3. Verify the format: `GEMINI_API_KEY=your_key_here`
4. Restart the server after creating/editing .env

### Issue: npm install fails
**Solution:**
1. Delete the `node_modules` folder
2. Delete `package-lock.json` file
3. Run `npm install` again

### Issue: Port 3000 already in use
**Solution:**
One process is using port 3000. Find and close it:
```powershell
netstat -ano | findstr :3000
taskkill /PID [PID_NUMBER] /F
```

---

## For Development (Optional: Use Nodemon)

Nodemon auto-restarts the server when you change `server.js`:

```powershell
npm run dev
```

Instead of `node server.js`

---

## Quick Start Checklist
- [ ] Visit https://ai.google.dev/ and get API key
- [ ] Create `.env` file with API key
- [ ] Run `npm install`
- [ ] Run `node server.js`
- [ ] Open `wce_homepage(2).html` in browser
- [ ] Click chatbot and test!

---

## Security Notes
- ✅ Keep `.env` file private (add to `.gitignore`)
- ✅ Never share your Gemini API key
- ✅ API key is loaded from environment, not hardcoded
- ✅ Server runs locally - no data leaves your computer

---

## File Structure
```
project04/
├── wce_homepage(2).html      (Website with chatbot)
├── server.js                 (Node.js server)
├── package.json              (Dependencies)
├── .env                      (API key - KEEP PRIVATE)
├── .env.example              (Template)
└── node_modules/             (Installed packages)
```

---

## What's Next?
- Customize chatbot responses in `server.js` (SYSTEM_PROMPT variable)
- Add more endpoints to the API
- Deploy to cloud (Vercel, Heroku, Railway)
- Integrate with database for conversation history

---

## Support
- Google Gemini Docs: https://ai.google.dev/docs
- Express.js Docs: https://expressjs.com
- Node.js Docs: https://nodejs.org/docs
