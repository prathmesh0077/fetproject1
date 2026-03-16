@echo off
REM WCE Chatbot Server Launcher for Windows
REM This file automatically starts the Node.js server

echo.
echo ========================================
echo   WCE Chatbot Server
echo ========================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %ErrorLevel% neq 0 (
    echo Error: Node.js is not installed or not in PATH
    echo Download from: https://nodejs.org/
    echo.
    pause
    exit /b 1
)

REM Check if node_modules exists
if not exist "node_modules\" (
    echo Installing npm dependencies...
    call npm install
    if %ErrorLevel% neq 0 (
        echo Error: npm install failed
        pause
        exit /b 1
    )
)

REM Check if .env file exists
if not exist ".env" (
    echo.
    echo WARNING: .env file not found!
    echo ========================================
    echo.
    echo 1. Visit: https://ai.google.dev/
    echo 2. Click "Get API Key"
    echo 3. Create a file named ".env" in this folder
    echo 4. Add: GEMINI_API_KEY=your_key_here
    echo 5. Save and run this script again
    echo.
    pause
    exit /b 1
)

REM Start the server
echo Starting WCE Chatbot Server...
echo.
echo Server will run on: http://localhost:3000
echo.
echo To stop the server, press Ctrl+C
echo.

timeout /t 2 >nul
node server.js

pause
