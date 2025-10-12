#!/bin/bash

echo "🛑 Stopping BAPS Mandir Kiosk Server..."

<<<<<<< HEAD
if lsof -Pi :8008 -sTCP:LISTEN -t >/dev/null ; then
    echo "🔄 Found server running on port 8008, stopping..."
    kill $(lsof -Pi :8008 -sTCP:LISTEN -t)
    sleep 2
    
    if lsof -Pi :8008 -sTCP:LISTEN -t >/dev/null ; then
        echo "⚠️  Server still running, force stopping..."
        kill -9 $(lsof -Pi :8008 -sTCP:LISTEN -t)
    fi
    
=======
# Find and kill the server process
pkill -f "python3 -m http.server 8008"

if [ $? -eq 0 ]; then
>>>>>>> 4d65946c76acfffa3b01bd10e752b07d02c9d11d
    echo "✅ Server stopped successfully!"
else
    echo "ℹ️  No server was running on port 8008"
fi

echo "💡 To start the server again, run: ./start-server.sh"
<<<<<<< HEAD
=======


>>>>>>> 4d65946c76acfffa3b01bd10e752b07d02c9d11d
