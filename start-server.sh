#!/bin/bash

echo "🚀 Starting BAPS Mandir Kiosk Server..."
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
