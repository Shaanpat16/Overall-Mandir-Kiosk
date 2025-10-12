// Admin Panel JavaScript
console.log('🔧 Admin Panel Loaded');

// Global variables
let currentTab = 'images';
let uploadedImages = [];
let newsItems = [];

// Initialize admin panel
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Initializing admin panel...');
    
    try {
        // Set up tab navigation
        setupTabNavigation();
        
        // Load existing data
        loadExistingData();
        
        // Set up event listeners
        setupEventListeners();
        
        console.log('✅ Admin panel initialized successfully!');
        
    } catch (error) {
        console.error('❌ Error initializing admin panel:', error);
    }
});

// Tab Navigation
function setupTabNavigation() {
    const navTabs = document.querySelectorAll('.nav-tab');
    const tabContents = document.querySelectorAll('.tab-content');
    
    navTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetTab = tab.getAttribute('data-tab');
            switchTab(targetTab);
        });
    });
}

function switchTab(tabName) {
    console.log(`🔄 Switching to tab: ${tabName}`);
    
    // Update active tab
    document.querySelectorAll('.nav-tab').forEach(tab => {
        tab.classList.remove('active');
        if (tab.getAttribute('data-tab') === tabName) {
            tab.classList.add('active');
        }
    });
    
    // Update active content
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
        if (content.id === `${tabName}-tab`) {
            content.classList.add('active');
        }
    });
    
    currentTab = tabName;
    
    // Load tab-specific content
    loadTabContent(tabName);
}

function loadTabContent(tabName) {
    switch (tabName) {
        case 'images':
            loadImageContent();
            break;
        case 'news':
            loadNewsContent();
            break;
        case 'content':
            loadContentSettings();
            break;
        case 'settings':
            loadSystemSettings();
            break;
    }
}

// Image Management
function loadImageContent() {
    console.log('🖼️ Loading image content...');
    
    // Load existing images from localStorage
    const savedImages = JSON.parse(localStorage.getItem('kioskImages') || '{}');
    
    // Update hero slider grid
    updateImageGrid('hero-slider-grid', savedImages.heroSlider || []);
    
    // Update murti darshan grid
    updateImageGrid('murti-darshan-grid', savedImages.murtiDarshan || []);
    
    // Update news images grid
    updateImageGrid('news-images-grid', savedImages.newsImages || []);
}

function updateImageGrid(gridId, images) {
    const grid = document.getElementById(gridId);
    if (!grid) return;
    
    grid.innerHTML = '';
    
    if (images.length === 0) {
        // Add placeholder
        const placeholder = document.createElement('div');
        placeholder.className = 'image-placeholder';
        placeholder.innerHTML = `
            <i class="fas fa-plus"></i>
            <span>Add Image</span>
        `;
        placeholder.onclick = () => showImageUpload();
        grid.appendChild(placeholder);
    } else {
        // Add existing images
        images.forEach((image, index) => {
            const imageItem = createImageItem(image, index, gridId);
            grid.appendChild(imageItem);
        });
        
        // Add add button
        const addButton = document.createElement('div');
        addButton.className = 'image-placeholder';
        addButton.innerHTML = `
            <i class="fas fa-plus"></i>
            <span>Add More</span>
        `;
        addButton.onclick = () => showImageUpload();
        grid.appendChild(addButton);
    }
}

function createImageItem(image, index, gridId) {
    const item = document.createElement('div');
    item.className = 'image-item';
    item.innerHTML = `
        <img src="${image.url}" alt="${image.title || 'Image'}" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDIwMCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMTUwIiBmaWxsPSIjZjhmOWZhIi8+Cjx0ZXh0IHg9IjEwMCIgeT0iNzUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzY2NiIgdGV4dC1hbmNob3I9Im1pZGRsZSI+SW1hZ2U8L3RleHQ+Cjwvc3ZnPgo='">
        <div class="image-info">
            <h4>${image.title || 'Untitled'}</h4>
            <p>${image.description || 'No description'}</p>
        </div>
        <div class="image-actions">
            <button class="action-btn edit-btn" onclick="editImage('${gridId}', ${index})">
                <i class="fas fa-edit"></i>
            </button>
            <button class="action-btn delete-btn" onclick="deleteImage('${gridId}', ${index})">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `;
    
    // Add styles
    item.style.cssText = `
        background: white;
        border: 1px solid #e2e8f0;
        border-radius: 8px;
        padding: 15px;
        text-align: center;
        position: relative;
    `;
    
    item.querySelector('img').style.cssText = `
        width: 100%;
        height: 120px;
        object-fit: cover;
        border-radius: 6px;
        margin-bottom: 10px;
    `;
    
    item.querySelector('.image-info').style.cssText = `
        margin-bottom: 15px;
    `;
    
    item.querySelector('.image-info h4').style.cssText = `
        margin: 0 0 5px 0;
        font-size: 14px;
        color: #2c3e50;
    `;
    
    item.querySelector('.image-info p').style.cssText = `
        margin: 0;
        font-size: 12px;
        color: #666;
    `;
    
    item.querySelector('.image-actions').style.cssText = `
        display: flex;
        gap: 8px;
        justify-content: center;
    `;
    
    item.querySelectorAll('.action-btn').forEach(btn => {
        btn.style.cssText = `
            background: none;
            border: none;
            padding: 8px;
            cursor: pointer;
            border-radius: 4px;
            transition: background 0.3s;
        `;
        
        if (btn.classList.contains('edit-btn')) {
            btn.style.color = '#3498db';
        } else if (btn.classList.contains('delete-btn')) {
            btn.style.color = '#e74c3c';
        }
        
        btn.addEventListener('mouseenter', () => {
            btn.style.background = '#f1f5f9';
        });
        
        btn.addEventListener('mouseleave', () => {
            btn.style.background = 'none';
        });
    });
    
    return item;
}

// Image Upload Modal
function showImageUpload() {
    console.log('📤 Showing image upload modal...');
    const modal = document.getElementById('image-upload-modal');
    modal.classList.remove('hidden');
    
    // Set up file input
    const fileInput = document.getElementById('image-file-input');
    fileInput.onchange = handleFileSelect;
}

function hideImageUpload() {
    console.log('📤 Hiding image upload modal...');
    const modal = document.getElementById('image-upload-modal');
    modal.classList.add('hidden');
    
    // Clear file input
    const fileInput = document.getElementById('image-file-input');
    fileInput.value = '';
    
    // Clear preview
    const preview = document.getElementById('upload-preview');
    preview.innerHTML = '';
}

function handleFileSelect(event) {
    const files = event.target.files;
    console.log(`📁 Selected ${files.length} files`);
    
    const preview = document.getElementById('upload-preview');
    preview.innerHTML = '';
    
    Array.from(files).forEach((file, index) => {
        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const previewItem = createPreviewItem(e.target.result, file, index);
                preview.appendChild(previewItem);
            };
            reader.readAsDataURL(file);
        }
    });
}

function createPreviewItem(src, file, index) {
    const item = document.createElement('div');
    item.className = 'preview-item';
    item.innerHTML = `
        <img src="${src}" alt="Preview">
        <div class="preview-info">
            <span>${file.name}</span>
            <span>${(file.size / 1024 / 1024).toFixed(2)} MB</span>
        </div>
        <button class="remove-preview" onclick="removePreview(${index})">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Add styles
    item.style.cssText = `
        background: white;
        border: 1px solid #e2e8f0;
        border-radius: 8px;
        padding: 10px;
        position: relative;
    `;
    
    item.querySelector('img').style.cssText = `
        width: 100%;
        height: 80px;
        object-fit: cover;
        border-radius: 4px;
        margin-bottom: 8px;
    `;
    
    item.querySelector('.preview-info').style.cssText = `
        display: flex;
        flex-direction: column;
        gap: 2px;
        margin-bottom: 8px;
    `;
    
    item.querySelectorAll('.preview-info span').forEach(span => {
        span.style.cssText = `
            font-size: 12px;
            color: #666;
        `;
    });
    
    item.querySelector('.remove-preview').style.cssText = `
        position: absolute;
        top: 5px;
        right: 5px;
        background: #e74c3c;
        color: white;
        border: none;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        cursor: pointer;
        font-size: 10px;
    `;
    
    return item;
}

function removePreview(index) {
    const preview = document.getElementById('upload-preview');
    const items = preview.querySelectorAll('.preview-item');
    if (items[index]) {
        items[index].remove();
    }
}

function processImageUpload() {
    console.log('📤 Processing image upload...');
    
    const fileInput = document.getElementById('image-file-input');
    const files = fileInput.files;
    
    if (files.length === 0) {
        showMessage('Please select images to upload', 'warning');
        return;
    }
    
    // Process each file
    Array.from(files).forEach(file => {
        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const imageData = {
                    url: e.target.result,
                    title: file.name.replace(/\.[^/.]+$/, ''),
                    description: `Uploaded on ${new Date().toLocaleDateString()}`,
                    size: file.size,
                    type: file.type,
                    uploadedAt: new Date().toISOString()
                };
                
                // Add to appropriate grid based on current tab
                addImageToGrid(imageData);
            };
            reader.readAsDataURL(file);
        }
    });
    
    hideImageUpload();
    showMessage('Images uploaded successfully!', 'success');
}

function addImageToGrid(imageData) {
    // Determine which grid to add to based on current tab
    let gridId = 'hero-slider-grid';
    
    switch (currentTab) {
        case 'images':
            // Add to hero slider by default
            gridId = 'hero-slider-grid';
            break;
        case 'news':
            gridId = 'news-images-grid';
            break;
    }
    
    // Get existing images
    const savedImages = JSON.parse(localStorage.getItem('kioskImages') || '{}');
    
    // Initialize arrays if they don't exist
    if (!savedImages.heroSlider) savedImages.heroSlider = [];
    if (!savedImages.murtiDarshan) savedImages.murtiDarshan = [];
    if (!savedImages.newsImages) savedImages.newsImages = [];
    
    // Add image to appropriate array
    if (gridId === 'hero-slider-grid') {
        savedImages.heroSlider.push(imageData);
    } else if (gridId === 'murti-darshan-grid') {
        savedImages.murtiDarshan = [imageData]; // Replace existing
    } else if (gridId === 'news-images-grid') {
        savedImages.newsImages.push(imageData);
    }
    
    // Save to localStorage
    localStorage.setItem('kioskImages', JSON.stringify(savedImages));
    
    // Update the grid
    updateImageGrid(gridId, savedImages[gridId.replace('-grid', '')] || []);
    
    // Send message to main kiosk to refresh images
    if (window.opener) {
        window.opener.postMessage({ action: 'refreshImages' }, '*');
    }
}

// News Management
function loadNewsContent() {
    console.log('📰 Loading news content...');
    
    // Load existing news from localStorage
    const savedNews = JSON.parse(localStorage.getItem('kioskNews') || '[]');
    newsItems = savedNews;
    
    updateNewsList();
}

function updateNewsList() {
    const newsList = document.getElementById('admin-news-list');
    if (!newsList) return;
    
    newsList.innerHTML = '';
    
    if (newsItems.length === 0) {
        newsList.innerHTML = `
            <div class="no-news">
                <i class="fas fa-newspaper"></i>
                <p>No news items yet. Add your first news item!</p>
            </div>
        `;
        
        // Add styles
        newsList.querySelector('.no-news').style.cssText = `
            text-align: center;
            padding: 40px;
            color: #666;
        `;
        
        newsList.querySelector('.no-news i').style.cssText = `
            font-size: 48px;
            color: #cbd5e0;
            margin-bottom: 15px;
            display: block;
        `;
        
        newsList.querySelector('.no-news p').style.cssText = `
            font-size: 16px;
            margin: 0;
        `;
    } else {
        newsItems.forEach((news, index) => {
            const newsItem = createNewsItem(news, index);
            newsList.appendChild(newsItem);
        });
    }
}

function createNewsItem(news, index) {
    const item = document.createElement('div');
    item.className = 'news-item';
    item.innerHTML = `
        <div class="news-content">
            <div class="news-image">
                <img src="${news.image || 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjgwIiB2aWV3Qm94PSIwIDAgMTAwIDgwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjgwIiBmaWxsPSIjNjY3ZWVBISIvPgo8dGV4dCB4PSI1MCIgeT0iNDAiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxMiIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiPk5ld3MgSW1hZ2U8L3RleHQ+Cjwvc3ZnPgo='}" alt="News">
            </div>
            <div class="news-details">
                <h4>${news.title}</h4>
                <span class="news-date">${news.date}</span>
                <p>${news.description || 'No description'}</p>
            </div>
        </div>
        <div class="news-actions">
            <button class="action-btn edit-btn" onclick="editNews(${index})">
                <i class="fas fa-edit"></i>
            </button>
            <button class="action-btn delete-btn" onclick="deleteNews(${index})">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `;
    
    // Add styles
    item.style.cssText = `
        background: white;
        border: 1px solid #e2e8f0;
        border-radius: 8px;
        padding: 20px;
        margin-bottom: 15px;
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        gap: 20px;
    `;
    
    item.querySelector('.news-content').style.cssText = `
        display: flex;
        gap: 15px;
        flex: 1;
    `;
    
    item.querySelector('.news-image').style.cssText = `
        flex-shrink: 0;
    `;
    
    item.querySelector('.news-image img').style.cssText = `
        width: 80px;
        height: 80px;
        object-fit: cover;
        border-radius: 6px;
    `;
    
    item.querySelector('.news-details').style.cssText = `
        flex: 1;
    `;
    
    item.querySelector('.news-details h4').style.cssText = `
        margin: 0 0 8px 0;
        font-size: 16px;
        color: #2c3e50;
    `;
    
    item.querySelector('.news-date').style.cssText = `
        color: #666;
        font-size: 14px;
        display: block;
        margin-bottom: 8px;
    `;
    
    item.querySelector('.news-details p').style.cssText = `
        margin: 0;
        color: #4a5568;
        font-size: 14px;
        line-height: 1.4;
    `;
    
    item.querySelector('.news-actions').style.cssText = `
        display: flex;
        gap: 8px;
        flex-shrink: 0;
    `;
    
    item.querySelectorAll('.action-btn').forEach(btn => {
        btn.style.cssText = `
            background: none;
            border: none;
            padding: 8px;
            cursor: pointer;
            border-radius: 4px;
            transition: background 0.3s;
        `;
        
        if (btn.classList.contains('edit-btn')) {
            btn.style.color = '#3498db';
        } else if (btn.classList.contains('delete-btn')) {
            btn.style.color = '#e74c3c';
        }
        
        btn.addEventListener('mouseenter', () => {
            btn.style.background = '#f1f5f9';
        });
        
        btn.addEventListener('mouseleave', () => {
            btn.style.background = 'none';
        });
    });
    
    return item;
}

// News Form Modal
function showNewsForm() {
    console.log('📝 Showing news form...');
    const modal = document.getElementById('news-form-modal');
    modal.classList.remove('hidden');
    
    // Set current date
    const dateInput = document.getElementById('news-date');
    dateInput.value = new Date().toISOString().split('T')[0];
}

function hideNewsForm() {
    console.log('📝 Hiding news form...');
    const modal = document.getElementById('news-form-modal');
    modal.classList.add('hidden');
    
    // Clear form
    document.getElementById('news-title').value = '';
    document.getElementById('news-date').value = '';
    document.getElementById('news-image-input').value = '';
    document.getElementById('news-description').value = '';
}

function saveNews() {
    console.log('💾 Saving news...');
    
    const title = document.getElementById('news-title').value.trim();
    const date = document.getElementById('news-date').value;
    const description = document.getElementById('news-description').value.trim();
    
    if (!title || !date) {
        showMessage('Please fill in all required fields', 'warning');
        return;
    }
    
    // Handle image upload
    const imageInput = document.getElementById('news-image-input');
    let imageUrl = '';
    
    if (imageInput.files.length > 0) {
        const file = imageInput.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
            imageUrl = e.target.result;
            createNewsItem(title, date, description, imageUrl);
        };
        reader.readAsDataURL(file);
    } else {
        createNewsItem(title, date, description, imageUrl);
    }
}

function createNewsItem(title, date, description, imageUrl) {
    const newsItem = {
        title,
        date,
        description,
        image: imageUrl,
        createdAt: new Date().toISOString()
    };
    
    newsItems.push(newsItem);
    
    // Save to localStorage
    localStorage.setItem('kioskNews', JSON.stringify(newsItems));
    
    // Update display
    updateNewsList();
    
    // Hide modal
    hideNewsForm();
    
    // Show success message
    showMessage('News item saved successfully!', 'success');
    
    // Send message to main kiosk to refresh news
    if (window.opener) {
        window.opener.postMessage({ action: 'refreshNews' }, '*');
    }
}

// Content Management
function loadContentSettings() {
    console.log('📝 Loading content settings...');
    
    // Load existing content from localStorage
    const savedContent = JSON.parse(localStorage.getItem('kioskContent') || '{}');
    
    // Populate form fields
    if (savedContent.mandirName) document.getElementById('mandir-name').value = savedContent.mandirName;
    if (savedContent.mandirAddress) document.getElementById('mandir-address').value = savedContent.mandirAddress;
    if (savedContent.mandirPhone) document.getElementById('mandir-phone').value = savedContent.mandirPhone;
    if (savedContent.mandirEmail) document.getElementById('mandir-email').value = savedContent.mandirEmail;
    if (savedContent.darshanHours) document.getElementById('darshan-hours').value = savedContent.darshanHours;
    if (savedContent.aartiTimes) document.getElementById('aarti-times').value = savedContent.aartiTimes;
}

function saveAllContent() {
    console.log('💾 Saving all content...');
    
    const content = {
        mandirName: document.getElementById('mandir-name').value,
        mandirAddress: document.getElementById('mandir-address').value,
        mandirPhone: document.getElementById('mandir-phone').value,
        mandirEmail: document.getElementById('mandir-email').value,
        darshanHours: document.getElementById('darshan-hours').value,
        aartiTimes: document.getElementById('aarti-times').value,
        lastUpdated: new Date().toISOString()
    };
    
    // Save to localStorage
    localStorage.setItem('kioskContent', JSON.stringify(content));
    
    // Show success message
    showMessage('Content saved successfully!', 'success');
    
    // Send message to main kiosk to refresh content
    if (window.opener) {
        window.opener.postMessage({ action: 'refreshContent' }, '*');
    }
}

// System Settings
function loadSystemSettings() {
    console.log('⚙️ Loading system settings...');
    
    // Load existing settings from localStorage
    const savedSettings = JSON.parse(localStorage.getItem('kioskSettings') || '{}');
    
    // Populate form fields
    if (savedSettings.refreshInterval) document.getElementById('refresh-interval').value = savedSettings.refreshInterval;
    if (savedSettings.sliderInterval) document.getElementById('slider-interval').value = savedSettings.sliderInterval;
    if (savedSettings.debugMode !== undefined) document.getElementById('debug-mode').checked = savedSettings.debugMode;
    if (savedSettings.autoSave !== undefined) document.getElementById('auto-save').checked = savedSettings.autoSave;
}

function resetSettings() {
    console.log('🔄 Resetting settings...');
    
    // Reset to defaults
    document.getElementById('refresh-interval').value = 5;
    document.getElementById('slider-interval').value = 5;
    document.getElementById('debug-mode').checked = false;
    document.getElementById('auto-save').checked = true;
    
    // Save default settings
    const defaultSettings = {
        refreshInterval: 5,
        sliderInterval: 5,
        debugMode: false,
        autoSave: true,
        lastUpdated: new Date().toISOString()
    };
    
    localStorage.setItem('kioskSettings', JSON.stringify(defaultSettings));
    
    showMessage('Settings reset to defaults!', 'success');
}

// Utility Functions
function showMessage(message, type = 'info') {
    console.log(`📢 ${type.toUpperCase()}: ${message}`);
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `admin-message admin-message-${type}`;
    
    // Set background color based on type
    const bgColor = type === 'success' ? '#27ae60' : 
                   type === 'error' ? '#e74c3c' : 
                   type === 'warning' ? '#f39c12' : '#3498db';
    
    messageDiv.textContent = message;
    messageDiv.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: ${bgColor};
        color: white;
        padding: 15px 25px;
        border-radius: 8px;
        z-index: 10002;
        font-weight: 600;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        animation: adminMessageSlideIn 0.3s ease-out;
        max-width: 80%;
        text-align: center;
    `;
    
    document.body.appendChild(messageDiv);
    
    // Remove after 4 seconds
    setTimeout(() => {
        if (messageDiv.parentNode) {
            messageDiv.parentNode.removeChild(messageDiv);
        }
    }, 4000);
}

function loadExistingData() {
    console.log('📂 Loading existing data...');
    
    // Load images
    loadImageContent();
    
    // Load news
    loadNewsContent();
    
    // Load content settings
    loadContentSettings();
    
    // Load system settings
    loadSystemSettings();
}

function setupEventListeners() {
    console.log('🔧 Setting up event listeners...');
    
    // Auto-save content changes
    const contentInputs = document.querySelectorAll('#content-tab input, #content-tab textarea');
    contentInputs.forEach(input => {
        input.addEventListener('change', () => {
            if (document.getElementById('auto-save').checked) {
                saveAllContent();
            }
        });
    });
    
    // Auto-save settings changes
    const settingsInputs = document.querySelectorAll('#settings-tab input');
    settingsInputs.forEach(input => {
        input.addEventListener('change', () => {
            const settings = {
                refreshInterval: parseInt(document.getElementById('refresh-interval').value),
                sliderInterval: parseInt(document.getElementById('slider-interval').value),
                debugMode: document.getElementById('debug-mode').checked,
                autoSave: document.getElementById('auto-save').checked,
                lastUpdated: new Date().toISOString()
            };
            
            localStorage.setItem('kioskSettings', JSON.stringify(settings));
        });
    });
}

function goBack() {
    console.log('🏠 Going back...');
    window.history.back();
}

// Add admin message animation
const style = document.createElement('style');
style.textContent = `
    @keyframes adminMessageSlideIn {
        from {
            opacity: 0;
            transform: translateX(-50%) translateY(-20px);
        }
        to {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
        }
    }
`;
document.head.appendChild(style);

// Add functions to window for easy access
window.showImageUpload = showImageUpload;
window.hideImageUpload = hideImageUpload;
window.processImageUpload = processImageUpload;
window.showNewsForm = showNewsForm;
window.hideNewsForm = hideNewsForm;
window.saveNews = saveNews;
window.saveAllContent = saveAllContent;
window.resetSettings = resetSettings;
window.goBack = goBack;
