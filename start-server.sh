#!/bin/bash

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PUBLIC_DIR="$SCRIPT_DIR/public"

if [ ! -d "$PUBLIC_DIR" ]; then
    echo "❌ Missing directory: $PUBLIC_DIR"
    exit 1
fi

echo "🚀 Starting BAPS Mandir Kiosk Server..."
echo "📡 Serving from: $PUBLIC_DIR"
echo ""

# Kill any existing server on port 8008
echo "🔄 Checking for existing server..."
if lsof -Pi :8008 -sTCP:LISTEN -t >/dev/null 2>&1; then
    echo "🛑 Stopping existing server on port 8008..."
    kill "$(lsof -Pi :8008 -sTCP:LISTEN -t)"
    sleep 2
fi

# Start the server (document root = public/, so / is the kiosk)
echo "🌟 Starting Python HTTP server on port 8008..."
echo "📱 Open the kiosk at:"
echo "   - Local:   http://localhost:8008/"
echo "   - Network: http://$(ifconfig 2>/dev/null | grep 'inet ' | grep -v 127.0.0.1 | head -1 | awk '{print $2}'):8008/"
echo ""
echo "💡 To stop the server, run: ./stop-server.sh"
echo ""

cd "$PUBLIC_DIR" || exit 1
nohup python3 -m http.server 8008 --bind 0.0.0.0 >"$SCRIPT_DIR/server.log" 2>&1 &

sleep 2

if lsof -Pi :8008 -sTCP:LISTEN -t >/dev/null 2>&1; then
    echo "✅ Server started successfully!"
    echo "🌐 Kiosk: http://localhost:8008/"
    echo "📝 Server logs: $SCRIPT_DIR/server.log"
else
    echo "❌ Failed to start server. Check server.log for details."
    exit 1
fi
