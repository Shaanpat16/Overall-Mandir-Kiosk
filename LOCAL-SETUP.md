# 🏠 Local Server Setup Guide

## 🚀 Quick Start

### **Start the Server:**
```bash
./start-server.sh
```

### **Stop the Server:**
```bash
./stop-server.sh
```

### **Access Your Kiosk:**
🌐 **http://localhost:8008**

## 📋 What These Scripts Do

### **start-server.sh:**
- ✅ Kills any existing servers on port 8008
- ✅ Starts a new background server
- ✅ Shows you the access URL
- ✅ Server keeps running even if you close terminal

### **stop-server.sh:**
- ✅ Safely stops the server
- ✅ Cleans up processes

## 🔧 Manual Commands

### **Start Server Manually:**
```bash
nohup python3 -m http.server 8008 > server.log 2>&1 &
```

### **Stop Server Manually:**
```bash
pkill -f "python3 -m http.server 8008"
```

### **Check Server Status:**
```bash
ps aux | grep "python3 -m http.server 8008"
```

### **View Server Logs:**
```bash
tail -f server.log
```

## 💡 Why This Won't Shut Down Randomly

1. **Background Process**: Server runs independently of terminal
2. **No Hangup Signal**: `nohup` prevents server from stopping
3. **Log File**: Output goes to file, not terminal
4. **Process ID**: You can always find and manage the server

## 🎯 Your Kiosk is Now Accessible At:
**http://localhost:8008**

The server will keep running until you manually stop it! 🎉


