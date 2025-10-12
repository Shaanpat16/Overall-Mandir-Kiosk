#!/bin/bash

echo "🌐 BAPS Mandir Kiosk - Universal Setup"
echo "======================================"
echo ""

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Function to get local IP address
get_local_ip() {
    if command_exists ip; then
        ip route get 1.1.1.1 | awk '{print $7; exit}' 2>/dev/null
    elif command_exists ifconfig; then
        ifconfig | grep "inet " | grep -v 127.0.0.1 | head -1 | awk '{print $2}'
    else
        echo "Unable to determine IP address"
    fi
}

# Function to start Python server
start_python_server() {
    echo "🐍 Starting Python HTTP server..."
    if command_exists python3; then
        python3 -m http.server 8008 --bind 0.0.0.0
    elif command_exists python; then
        python -m http.server 8008 --bind 0.0.0.0
    else
        echo "❌ Python not found!"
        return 1
    fi
}

# Function to start Node.js server
start_node_server() {
    echo "📦 Starting Node.js HTTP server..."
    if command_exists node; then
        if command_exists npx; then
            npx http-server -p 8008 -a 0.0.0.0 -c-1 --cors
        else
            echo "❌ npx not found! Please install Node.js properly."
            return 1
        fi
    else
        echo "❌ Node.js not found!"
        return 1
    fi
}

# Function to start Docker container
start_docker_server() {
    echo "🐳 Starting Docker container..."
    if command_exists docker; then
        if [ -f "Dockerfile" ]; then
            docker build -t mandir-kiosk .
            docker run -p 8008:8008 --name baps-mandir-kiosk mandir-kiosk
        else
            echo "❌ Dockerfile not found!"
            return 1
        fi
    else
        echo "❌ Docker not found!"
        return 1
    fi
}

# Main setup logic
echo "🔍 Detecting available options..."

# Check what's available
PYTHON_AVAILABLE=false
NODE_AVAILABLE=false
DOCKER_AVAILABLE=false

if command_exists python3 || command_exists python; then
    PYTHON_AVAILABLE=true
    echo "✅ Python available"
fi

if command_exists node && command_exists npm; then
    NODE_AVAILABLE=true
    echo "✅ Node.js available"
fi

if command_exists docker; then
    DOCKER_AVAILABLE=true
    echo "✅ Docker available"
fi

echo ""

# If nothing is available, show installation instructions
if [ "$PYTHON_AVAILABLE" = false ] && [ "$NODE_AVAILABLE" = false ] && [ "$DOCKER_AVAILABLE" = false ]; then
    echo "❌ No suitable runtime found!"
    echo ""
    echo "Please install one of the following:"
    echo ""
    echo "🐍 Python 3.x:"
    echo "   • Mac: brew install python3"
    echo "   • Ubuntu: sudo apt install python3"
    echo "   • Windows: Download from https://python.org"
    echo ""
    echo "📦 Node.js:"
    echo "   • Mac: brew install node"
    echo "   • Ubuntu: sudo apt install nodejs npm"
    echo "   • Windows: Download from https://nodejs.org"
    echo ""
    echo "🐳 Docker:"
    echo "   • All platforms: https://docker.com/get-started"
    echo ""
    exit 1
fi

# Show available options
echo "🚀 Available deployment options:"
echo ""

if [ "$PYTHON_AVAILABLE" = true ]; then
    echo "1) Python HTTP Server (Recommended)"
fi

if [ "$NODE_AVAILABLE" = true ]; then
    echo "2) Node.js HTTP Server"
fi

if [ "$DOCKER_AVAILABLE" = true ]; then
    echo "3) Docker Container"
fi

echo ""

# Get user choice
if [ "$1" = "--auto" ]; then
    # Auto-select best option
    if [ "$PYTHON_AVAILABLE" = true ]; then
        CHOICE=1
    elif [ "$NODE_AVAILABLE" = true ]; then
        CHOICE=2
    elif [ "$DOCKER_AVAILABLE" = true ]; then
        CHOICE=3
    fi
    echo "🤖 Auto-selecting option $CHOICE"
else
    # Manual selection
    read -p "Choose an option (1-3): " CHOICE
fi

echo ""

# Get local IP for display
LOCAL_IP=$(get_local_ip)

# Start the selected server
case $CHOICE in
    1)
        if [ "$PYTHON_AVAILABLE" = true ]; then
            echo "🌐 Starting Python server..."
            echo "📍 Access URLs:"
            echo "   • This computer: http://localhost:8008"
            if [ "$LOCAL_IP" != "Unable to determine IP address" ]; then
                echo "   • Other devices: http://$LOCAL_IP:8008"
            fi
            echo ""
            echo "💡 Press Ctrl+C to stop the server"
            echo ""
            start_python_server
        else
            echo "❌ Python not available!"
            exit 1
        fi
        ;;
    2)
        if [ "$NODE_AVAILABLE" = true ]; then
            echo "🌐 Starting Node.js server..."
            echo "📍 Access URLs:"
            echo "   • This computer: http://localhost:8008"
            if [ "$LOCAL_IP" != "Unable to determine IP address" ]; then
                echo "   • Other devices: http://$LOCAL_IP:8008"
            fi
            echo ""
            echo "💡 Press Ctrl+C to stop the server"
            echo ""
            start_node_server
        else
            echo "❌ Node.js not available!"
            exit 1
        fi
        ;;
    3)
        if [ "$DOCKER_AVAILABLE" = true ]; then
            echo "🌐 Starting Docker container..."
            echo "📍 Access URLs:"
            echo "   • This computer: http://localhost:8008"
            if [ "$LOCAL_IP" != "Unable to determine IP address" ]; then
                echo "   • Other devices: http://$LOCAL_IP:8008"
            fi
            echo ""
            echo "💡 Press Ctrl+C to stop the container"
            echo ""
            start_docker_server
        else
            echo "❌ Docker not available!"
            exit 1
        fi
        ;;
    *)
        echo "❌ Invalid option!"
        exit 1
        ;;
esac

echo ""
echo "🛑 Server stopped."



