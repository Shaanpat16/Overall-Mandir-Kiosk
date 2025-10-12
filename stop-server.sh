#!/bin/bash

echo "🛑 Stopping BAPS Mandir Kiosk Server..."

if lsof -Pi :8008 -sTCP:LISTEN -t >/dev/null ; then
    echo "🔄 Found server running on port 8008, stopping..."
    kill $(lsof -Pi :8008 -sTCP:LISTEN -t)
    sleep 2
    
    if lsof -Pi :8008 -sTCP:LISTEN -t >/dev/null ; then
        echo "⚠️  Server still running, force stopping..."
        kill -9 $(lsof -Pi :8008 -sTCP:LISTEN -t)
    fi
    
    echo "✅ Server stopped successfully!"
else
    echo "ℹ️  No server was running on port 8008"
fi

echo "💡 To start the server again, run: ./start-server.sh"
