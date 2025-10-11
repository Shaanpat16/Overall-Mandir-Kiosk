@echo off
title BAPS Mandir Kiosk - Universal Setup

echo.
echo ================================================
echo   BAPS Mandir Kiosk - Universal Setup
echo ================================================
echo.

REM Function to check if command exists
where python >nul 2>&1
if %errorlevel% == 0 (
    set PYTHON_AVAILABLE=1
    echo ✅ Python available
) else (
    set PYTHON_AVAILABLE=0
)

where node >nul 2>&1
if %errorlevel% == 0 (
    where npm >nul 2>&1
    if %errorlevel% == 0 (
        set NODE_AVAILABLE=1
        echo ✅ Node.js available
    ) else (
        set NODE_AVAILABLE=0
    )
) else (
    set NODE_AVAILABLE=0
)

where docker >nul 2>&1
if %errorlevel% == 0 (
    set DOCKER_AVAILABLE=1
    echo ✅ Docker available
) else (
    set DOCKER_AVAILABLE=0
)

echo.

REM If nothing is available, show installation instructions
if %PYTHON_AVAILABLE% == 0 if %NODE_AVAILABLE% == 0 if %DOCKER_AVAILABLE% == 0 (
    echo ❌ No suitable runtime found!
    echo.
    echo Please install one of the following:
    echo.
    echo 🐍 Python 3.x:
    echo    • Download from: https://python.org
    echo    • Make sure to check "Add Python to PATH"
    echo.
    echo 📦 Node.js:
    echo    • Download from: https://nodejs.org
    echo    • Includes npm automatically
    echo.
    echo 🐳 Docker:
    echo    • Download from: https://docker.com/get-started
    echo.
    pause
    exit /b 1
)

REM Show available options
echo 🚀 Available deployment options:
echo.

if %PYTHON_AVAILABLE% == 1 (
    echo 1) Python HTTP Server (Recommended)
)

if %NODE_AVAILABLE% == 1 (
    echo 2) Node.js HTTP Server
)

if %DOCKER_AVAILABLE% == 1 (
    echo 3) Docker Container
)

echo.

REM Get user choice
if "%1" == "--auto" (
    REM Auto-select best option
    if %PYTHON_AVAILABLE% == 1 (
        set CHOICE=1
    ) else if %NODE_AVAILABLE% == 1 (
        set CHOICE=2
    ) else if %DOCKER_AVAILABLE% == 1 (
        set CHOICE=3
    )
    echo 🤖 Auto-selecting option %CHOICE%
) else (
    REM Manual selection
    set /p CHOICE="Choose an option (1-3): "
)

echo.

REM Get local IP for display
for /f "tokens=2 delims=:" %%a in ('ipconfig ^| findstr /c:"IPv4"') do (
    set LOCAL_IP=%%a
    goto :ip_found
)
:ip_found

REM Start the selected server
if "%CHOICE%" == "1" (
    if %PYTHON_AVAILABLE% == 1 (
        echo 🌐 Starting Python server...
        echo 📍 Access URLs:
        echo    • This computer: http://localhost:8008
        if defined LOCAL_IP (
            echo    • Other devices: http://%LOCAL_IP%:8008
        )
        echo.
        echo 💡 Press Ctrl+C to stop the server
        echo.
        python -m http.server 8008 --bind 0.0.0.0
    ) else (
        echo ❌ Python not available!
        pause
        exit /b 1
    )
) else if "%CHOICE%" == "2" (
    if %NODE_AVAILABLE% == 1 (
        echo 🌐 Starting Node.js server...
        echo 📍 Access URLs:
        echo    • This computer: http://localhost:8008
        if defined LOCAL_IP (
            echo    • Other devices: http://%LOCAL_IP%:8008
        )
        echo.
        echo 💡 Press Ctrl+C to stop the server
        echo.
        npx http-server -p 8008 -a 0.0.0.0 -c-1 --cors
    ) else (
        echo ❌ Node.js not available!
        pause
        exit /b 1
    )
) else if "%CHOICE%" == "3" (
    if %DOCKER_AVAILABLE% == 1 (
        echo 🌐 Starting Docker container...
        echo 📍 Access URLs:
        echo    • This computer: http://localhost:8008
        if defined LOCAL_IP (
            echo    • Other devices: http://%LOCAL_IP%:8008
        )
        echo.
        echo 💡 Press Ctrl+C to stop the container
        echo.
        docker build -t mandir-kiosk .
        docker run -p 8008:8008 --name baps-mandir-kiosk mandir-kiosk
    ) else (
        echo ❌ Docker not available!
        pause
        exit /b 1
    )
) else (
    echo ❌ Invalid option!
    pause
    exit /b 1
)

echo.
echo 🛑 Server stopped.
pause



