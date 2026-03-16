# WCE Chatbot - Gemini AI Integration

A fully functional AI chatbot for the Walchand College of Engineering website powered by Google Gemini API.

## What's New?

✅ **AI-Powered Responses** - Uses Google Gemini for intelligent, context-aware answers
✅ **Local Server** - Runs on your laptop (localhost:3000)
✅ **Secure API Key** - API key stored safely in `.env` file
✅ **Real-time Chat** - Instant responses with typing indicator
✅ **Production Ready** - Professional error handling and logging

## Files Included

| File | Purpose |
|------|---------|
| `wce_homepage(2).html` | Updated website with working API chatbot |
| `server.js` | Node.js backend server with Gemini API |
| `package.json` | Project dependencies |
| `.env.example` | Template for your API key |
| `SETUP_GUIDE.md` | Detailed installation instructions |
| `QUICKSTART.md` | Fast 5-minute setup guide |
| `.gitignore` | Protect sensitive files |

## Quick Setup

### 1. Get Gemini API Key
```
Visit: https://ai.google.dev/ → Get API Key → Copy Key
```

### 2. Configure Environment
```
Create .env file in project folder:
GEMINI_API_KEY=your_key_here
```

### 3. Install Dependencies
```powershell
npm install
```

### 4. Start Server
```powershell
node server.js
```

### 5. Use Chatbot
Open `wce_homepage(2).html` in browser and click the 🤖 button!

---

## Complete Instructions

👉 **Read [QUICKSTART.md](QUICKSTART.md)** for 5-minute setup
👉 **Read [SETUP_GUIDE.md](SETUP_GUIDE.md)** for detailed guide with troubleshooting

---

## How It Works

1. **User types message** in chatbot → HTML sends to server
2. **Server receives** message at `/api/chat` endpoint
3. **Gemini API** processes message using WCE context
4. **Response returned** to HTML and displayed in chat

## API Endpoint

```
POST http://localhost:3000/api/chat

Request:
{
  "message": "Tell me about admissions"
}

Response:
{
  "reply": "WCE admits UG students via JOSAA/JEE..."
}
```

## System Requirements

- **Node.js** v14+ (Download: https://nodejs.org/)
- **Windows/Mac/Linux** - Works on all platforms
- **Free Gemini API Key** from Google AI Studio

## Customization

Edit `server.js` line 15-22 to customize:
- Welcome message
- College information
- Chatbot personality
- Response style

---

## Troubleshooting

**Q: "Unable to connect to server"**
A: Make sure `node server.js` is running in PowerShell

**Q: "API key not found"**
A: Create `.env` file with `GEMINI_API_KEY=your_key`

**Q: "npm install fails"**
A: Delete `node_modules` folder and `package-lock.json`, then run `npm install` again

See **SETUP_GUIDE.md** for more troubleshooting.

---

## Security

🔒 API key stored in `.env` (not in code)
🔒 `.env` added to `.gitignore` (won't be uploaded)
🔒 All data stays on your local computer
🔒 Use HTTPS when deploying to production

---

## Next Steps

1. ✅ Complete the setup
2. 🧪 Test the chatbot
3. 🎨 Customize responses
4. 📱 Deploy to cloud (optional)
5. 📊 Add analytics (optional)

---

## Support Links

- Google Gemini: https://ai.google.dev/
- Express.js: https://expressjs.com/
- Node.js: https://nodejs.org/

---

**Ready to start?** → Open [QUICKSTART.md](QUICKSTART.md) now!
