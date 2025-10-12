#!/bin/bash

echo "🚀 Starting BAPS Mandir Kiosk Server..."
<<<<<<< HEAD
echo "📡 Server will be accessible on your WiFi network"
echo ""

# Kill any existing server on port 8008
echo "🔄 Checking for existing server..."
if lsof -Pi :8008 -sTCP:LISTEN -t >/dev/null ; then
    echo "🛑 Stopping existing server on port 8008..."
    kill $(lsof -Pi :8008 -sTCP:LISTEN -t)
    sleep 2
fi

# Start the server
echo "🌟 Starting Python HTTP server on port 8008..."
echo "📱 Server will be accessible at:"
echo "   - Local: http://localhost:8008"
echo "   - Network: http://$(ifconfig | grep 'inet ' | grep -v 127.0.0.1 | head -1 | awk '{print $2}'):8008"
echo ""
echo "💡 To stop the server, run: ./stop-server.sh"
echo ""

# Start server in background
nohup python3 -m http.server 8008 --bind 0.0.0.0 > server.log 2>&1 &

# Wait a moment for server to start
sleep 2

# Check if server started successfully
if lsof -Pi :8008 -sTCP:LISTEN -t >/dev/null ; then
    echo "✅ Server started successfully!"
    echo "🌐 Access your kiosk at: http://$(ifconfig | grep 'inet ' | grep -v 127.0.0.1 | head -1 | awk '{print $2}'):8008"
    echo "📝 Server logs: server.log"
else
    echo "❌ Failed to start server. Check server.log for details."
fi
=======

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


>>>>>>> 4d65946c76acfffa3b01bd10e752b07d02c9d11d
