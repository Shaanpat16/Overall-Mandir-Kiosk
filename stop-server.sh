#!/bin/bash

echo "🛑 Stopping BAPS Mandir Kiosk Server..."

# Find and kill the server process
pkill -f "python3 -m http.server 8008"

if [ $? -eq 0 ]; then
    echo "✅ Server stopped successfully!"
else
    echo "ℹ️  No server was running on port 8008"
fi

echo "💡 To start the server again, run: ./start-server.sh"


