# BAPS Shri Swaminarayan Mandir - Digital Kiosk

A comprehensive digital kiosk system for the BAPS Shri Swaminarayan Mandir in Edison, NJ, featuring an interactive interface, admin panel for content management, and real-time updates.

## 🚀 Features

### Main Kiosk Interface
- **Interactive Hero Slider** - Rotating images with captions
- **Real-time Information** - Darshan timings, news, and activities
- **AI Assistant** - Interactive chatbot for visitor questions
- **Photo Gallery** - Beautiful mandir photographs
- **Interactive Map** - Location and directions
- **Mahant Swami Location** - Real-time updates on spiritual leader's whereabouts
- **Responsive Design** - Works on all devices and screen sizes

### Admin Panel
- **Content Management** - Update news, activities, and gallery
- **Image Management** - Upload and manage website images
- **Timing Updates** - Modify darshan and aarti schedules
- **AI Response Customization** - Tailor AI assistant responses
- **Real-time Updates** - Changes appear instantly on the main kiosk

## 🖥️ System Requirements

- Modern web browser (Chrome, Firefox, Safari, Edge)
- Local web server (Python HTTP server included)
- Touch screen support for kiosk mode
- Internet connection for external images (optional)

## 🚀 Quick Start

### 1. Start the Server
```bash
cd /path/to/Overall-Mandir-Kiosk
python3 -m http.server 8000
```

### 2. Access the System
- **Main Kiosk**: http://localhost:8000/
- **Admin Panel**: http://localhost:8000/admin.html
- **Debug Tools**: http://localhost:8000/debug-links.html

### 3. Admin Access
- **Password**: `EDISONKIOSK123!`
- **Access URL**: http://localhost:8000/admin.html

## 🖼️ Image Management Guide

### Adding Hero Slider Images
1. **Login to Admin Panel** with password `EDISONKIOSK123!`
2. **Navigate to "Website Images"** section
3. **Click "Add Hero Slider Image"**
4. **Upload Image File** or enter image URL
5. **Save** - Image appears instantly on main kiosk

### Managing Murti Darshan Image
1. **Go to "Website Images"** → "Murti Darshan Image"
2. **Drag & Drop** image or click to browse
3. **Alternative**: Enter image URL
4. **Click "Save Murti Image"**

### Image Requirements
- **Formats**: JPG, PNG, GIF, WebP
- **Max Size**: 5MB per image
- **Recommended**: 1080x600 for hero slider, 400x300 for murti
- **Auto-optimization**: Images are automatically compressed

## 🔧 Troubleshooting

### Images Not Showing on Main Kiosk

#### Check Admin Panel
1. **Verify images are saved** in admin panel
2. **Check console** for error messages
3. **Ensure images are in correct format**

#### Check Main Kiosk
1. **Open browser console** (F12)
2. **Look for image loading errors**
3. **Check localStorage** for image data

#### Common Solutions
```javascript
// Force refresh image data
localStorage.clear();
location.reload();

// Check image data in console
console.log(JSON.parse(localStorage.getItem('kioskData')));
```

### Admin Panel Issues

#### Login Problems
- **Clear browser cache** and cookies
- **Use correct password**: `EDISONKIOSK123!`
- **Check browser console** for errors

#### Image Upload Failures
- **Verify file format** (JPG, PNG, GIF, WebP)
- **Check file size** (max 5MB)
- **Ensure stable internet** connection

### Main Kiosk Issues

#### Interactive Elements Not Working
1. **Check console** for JavaScript errors
2. **Verify event listeners** are attached
3. **Test touch/click** functionality

#### Content Not Updating
1. **Check localStorage** synchronization
2. **Verify admin panel** changes are saved
3. **Refresh main kiosk** page

## 🧪 Debug Tools

### Debug Panel
Access `debug-links.html` for comprehensive testing:
- **Image Loading Tests** - Verify image functionality
- **Link Tests** - Check interactive elements
- **System Information** - Browser and device details
- **LocalStorage Analysis** - Data storage verification

### Console Commands
```javascript
// Test image loading
testImageLoading();

// Test all links
testAllLinks();

// Check kiosk data
console.log(JSON.parse(localStorage.getItem('kioskData')));

// Force content refresh
loadDynamicContent();
```

## 📁 File Structure

```
Overall-Mandir-Kiosk/
├── index.html              # Main kiosk interface
├── admin.html              # Admin panel
├── admin-access.html       # Admin access page
├── debug-links.html        # Debug tools
├── script.js               # Main kiosk functionality
├── admin.js                # Admin panel functionality
├── styles.css              # Main kiosk styles
├── admin-styles.css        # Admin panel styles
├── config.js               # Configuration file
├── launch.html             # Launch page
└── README.md               # This file
```

## 🔄 Data Flow

### Image Update Process
1. **Admin uploads** image through admin panel
2. **Image processed** and optimized
3. **Data saved** to localStorage
4. **Main kiosk detects** changes automatically
5. **Images update** in real-time

### Content Synchronization
- **Real-time updates** via localStorage events
- **Automatic polling** every 5 seconds
- **Fallback data** for offline functionality
- **Error handling** with placeholder images

## 🎯 Best Practices

### Image Management
- **Use descriptive titles** for better organization
- **Optimize images** before upload (recommended: 800px max width)
- **Regular backups** using export/import functionality
- **Test images** on main kiosk after upload

### Content Updates
- **Update regularly** to keep information current
- **Test changes** on main kiosk interface
- **Backup data** before major changes
- **Use debug tools** to verify functionality

### Performance
- **Monitor image sizes** to maintain fast loading
- **Use appropriate formats** (WebP for photos, PNG for graphics)
- **Regular maintenance** of old/unused images
- **Test on target devices** for optimal performance

## 🆘 Support

### Common Issues & Solutions

#### Q: Images not appearing after upload
**A**: Check browser console for errors, verify image format, clear cache

#### Q: Admin panel not saving changes
**A**: Ensure stable internet connection, check file permissions, verify browser support

#### Q: Main kiosk not updating
**A**: Check localStorage synchronization, refresh page, verify admin changes are saved

#### Q: Touch/click not working
**A**: Check event listeners, verify CSS pointer events, test on different devices

### Getting Help
1. **Check console** for error messages
2. **Use debug tools** to identify issues
3. **Verify system requirements** are met
4. **Test on different browsers** and devices

## 🔒 Security Notes

- **Admin password** should be changed in production
- **Local storage** is used for data persistence
- **No external APIs** are called without user consent
- **All functionality** runs locally for privacy

## 📈 Future Enhancements

- **Cloud storage** integration for images
- **Multi-language** support
- **Advanced analytics** and reporting
- **Mobile app** companion
- **Integration** with mandir management systems

---

**BAPS Shri Swaminarayan Mandir - Edison, NJ**  
*Digital Kiosk System v1.0*  
*For support and questions, contact the mandir office*
