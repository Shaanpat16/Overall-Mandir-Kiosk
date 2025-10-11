#!/bin/bash

echo "🚀 Starting BAPS Mandir Kiosk Server..."

# Kill any existing servers on port 8008
echo "🔄 Checking for existing servers..."
pkill -f "python3 -m http.server 8008" 2>/dev/null

# Start new server (accessible from network)
echo "🌟 Starting server on port 8008 (accessible from network)..."
nohup python3 -m http.server 8008 --bind 0.0.0.0 > server.log 2>&1 &

# Get the process ID
SERVER_PID=$!
echo "✅ Server started successfully!"
echo "🌐 Access your kiosk at: http://localhost:8008"
echo "📝 Server logs: server.log"
echo "🆔 Process ID: $SERVER_PID"
echo ""
echo "🌍 Network Access:"
echo "   - Find your IP: ifconfig | grep 'inet ' | grep -v 127.0.0.1"
echo "   - Access from other devices: http://[YOUR_IP]:8008"
echo ""
echo "💡 To stop the server later, run: pkill -f 'python3 -m http.server 8008'"
echo "💡 To view logs: tail -f server.log"


