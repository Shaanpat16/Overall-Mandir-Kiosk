@echo off
title BAPS Mandir Kiosk - Portable Server

echo.
echo ================================================
echo   BAPS Mandir Kiosk - Portable Server
echo ================================================
echo.

REM Check if Python is available
python --version >nul 2>&1
if %errorlevel% == 0 (
    echo ✅ Python found, starting server...
    goto :start_server
) else (
    echo ❌ Python not found!
    echo.
    echo Please install Python 3.x:
    echo • Download from: https://python.org
    echo • Make sure to check "Add Python to PATH" during installation
    echo.
    echo After installing Python, run this script again.
    echo.
    pause
    exit /b 1
)

:start_server
echo 📁 Working directory: %CD%
echo 🌐 Starting server on port 8008...
echo.
echo 🌍 Access URLs:
echo    • This computer: http://localhost:8008
echo    • Other devices: http://[YOUR_IP]:8008
echo.
echo 💡 To find your IP address, open Command Prompt and run: ipconfig
echo 💡 Press Ctrl+C to stop the server
echo.

REM Start the server
python -m http.server 8008 --bind 0.0.0.0

echo.
echo 🛑 Server stopped.
pause



