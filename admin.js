// Admin Panel JavaScript
const ADMIN_PASSWORD = 'EDISONKIOSK123!';

// DOM Elements
const loginScreen = document.getElementById('login-screen');
const adminPanel = document.getElementById('admin-panel');
const loginForm = document.getElementById('login-form');
const passwordInput = document.getElementById('password');
const loginError = document.getElementById('login-error');
const logoutBtn = document.getElementById('logout-btn');
const navBtns = document.querySelectorAll('.nav-btn');
const adminSections = document.querySelectorAll('.admin-section');
const saveBtns = document.querySelectorAll('.save-btn');

// Data storage
let kioskData = {
    timings: {
        darshanMorning: '7:00 am - 11:00 am',
        darshanEvening: '4:00 pm - 8:00 pm',
        aarti: '7:00 am & 6:30 pm daily',
        abhishekWeekdays: '7:00 am - 11:00 am, 4:00 pm - 6:00 pm',
        abhishekWeekends: '7:00 am - 11:00 am, 7:00 pm - 8:00 pm',
        campusHours: '7:00 am - 8:00 pm daily'
    },
    news: [
        {
            id: 1,
            title: 'Kishore-Kishori Adhiveshan & Summer Shibir 2025',
            date: 'Edison, 24 Jul 2025',
            image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjgwIiB2aWV3Qm94PSIwIDAgMTAwIDgwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjgwIiBmaWxsPSIjNjY3ZWVBISIvPgo8dGV4dCB4PSI1MCIgeT0iNDAiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxMiIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiPk5ld3MgSW1hZ2U8L3RleHQ+Cjwvc3ZnPgo='
        },
        {
            id: 2,
            title: 'Shri Swaminarayan Jayanti - Women\'s Celebration',
            date: 'Edison, 5 Apr 2025',
            image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjgwIiB2aWV3Qm94PSIwIDAgMTAwIDgwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjgwIiBmaWxsPSIjNjY3ZWVBISIvPgo8dGV4dCB4PSI1MCIgeT0iNDAiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxMiIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiPk5ld3MgSW1hZ2U8L3RleHQ+Cjwvc3ZnPgo='
        }
    ],
    activities: [
        {
            id: 1,
            name: 'Bhajan Sandhya',
            date: '15 Dec',
            time: '7:00 PM - 8:30 PM',
            description: 'Evening devotional singing session'
        },
        {
            id: 2,
            name: 'Yoga Classes',
            date: '20 Dec',
            time: '8:00 AM - 9:00 AM',
            description: 'Morning yoga and meditation session'
        }
    ],
    gallery: [
        {
            id: 1,
            title: 'Mandir Exterior',
            image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjNjY3ZWVBISIvPgo8dGV4dCB4PSIyMDAiIHk9IjE1MCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE2IiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+R2FsbGVyeSBJbWFnZTwvdGV4dD4KPC9zdmc+Cg=='
        },
        {
            id: 2,
            title: 'Prayer Hall',
            image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjNjY3ZWVBISIvPgo8dGV4dCB4PSIyMDAiIHk9IjE1MCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE2IiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+R2FsbGVyeSBJbWFnZTwvdGV4dD4KPC9zdmc+Cg=='
        }
    ],
    aiResponses: {
        timing: 'The mandir is open from 7:00 AM to 11:00 AM and 4:00 PM to 8:00 PM daily for Sacred Shrines Darshan. Aarti ceremonies are held at 7:00 AM and 6:30 PM daily.',
        aarti: 'Aarti ceremonies are held twice daily - morning at 7:00 AM and evening at 6:30 PM. These are beautiful devotional ceremonies with singing and offerings.',
        activities: 'We have various activities including Kishore-Kishori programs, summer shibirs, celebrations, and special pujas. Check the Latest News section for upcoming events.',
        location: 'The mandir is located at 2500 Woodbridge Avenue, Edison, NJ 08817. We welcome all devotees for darshan and prayers.'
    },
    settings: {
        mandirName: 'BAPS Shri Swaminarayan Mandir',
        address: '2500 Woodbridge Avenue, Edison, NJ 08817',
        phone: '(732) 572 1234',
        email: 'info.edison@usa.baps.org'
    },
    mahantLocation: {
        location: 'BAPS Shri Swaminarayan Mandir, Edison, NJ',
        address: 'Edison, NJ, USA',
        status: 'Available for Darshan',
        notes: ''
    }
};

// Initialize admin panel
document.addEventListener('DOMContentLoaded', () => {
    // Show loading state
    const loadingSpinner = showProcessingSpinner('Initializing Admin Panel...');
    
    try {
        loadData();
        initializeEventListeners();
        loadContent();
        setupFormHandlers();
        loadWebsiteImages(); // Load website images
        setupDragAndDrop(); // Setup drag and drop functionality
        
        // Test website images functionality
        testWebsiteImagesFunctionality();
        
        // Initialize virtual keyboard
        initializeAdminVirtualKeyboard();
        
        // Hide loading state
        hideProcessingSpinner(loadingSpinner);
        
        console.log('✅ Admin Panel initialized successfully!');
        
    } catch (error) {
        console.error('❌ Error initializing Admin Panel:', error);
        hideProcessingSpinner(loadingSpinner);
        alert('Error initializing Admin Panel. Please refresh the page.');
    }
});

// Test website images functionality
function testWebsiteImagesFunctionality() {
    console.log('🧪 Testing website images functionality...');
    
    try {
        // Check if website images data exists
        if (kioskData.websiteImages) {
            console.log('✅ Website images data found:', kioskData.websiteImages);
            
            // Check hero slider images
            if (kioskData.websiteImages.heroSlider && Array.isArray(kioskData.websiteImages.heroSlider)) {
                console.log(`🎠 Hero slider images: ${kioskData.websiteImages.heroSlider.length} found`);
                kioskData.websiteImages.heroSlider.forEach((image, index) => {
                    console.log(`   - Image ${index + 1}: ${image.title || 'Untitled'} (${image.url.substring(0, 50)}...)`);
                });
            } else {
                console.log('⚠️ No hero slider images found');
            }
            
            // Check murti darshan image
            if (kioskData.websiteImages.murtiDarshan) {
                console.log('🙏 Murti darshan image found');
            } else {
                console.log('⚠️ No murti darshan image found');
            }
            
            // Check general images
            if (kioskData.websiteImages.generalImages && Array.isArray(kioskData.websiteImages.generalImages)) {
                console.log(`🖼️ General images: ${kioskData.websiteImages.generalImages.length} found`);
            } else {
                console.log('⚠️ No general images found');
            }
            
            // Force update main kiosk
            updateMainKioskImages();
            
        } else {
            console.log('⚠️ No website images data found, initializing...');
            loadWebsiteImages();
        }
        
        console.log('✅ Website images functionality test completed');
        
    } catch (error) {
        console.error('❌ Error testing website images functionality:', error);
    }
}

// Load data from localStorage
function loadData() {
    const savedData = localStorage.getItem('kioskData');
    if (savedData) {
        kioskData = JSON.parse(savedData);
        console.log('✅ Loaded kiosk data from localStorage:', kioskData);
    } else {
        console.log('⚠️ No kiosk data found in localStorage, using default data');
    }
    
    // Also load individual website images data if it exists (for backward compatibility)
    const websiteImagesData = localStorage.getItem('websiteImagesData');
    if (websiteImagesData) {
        try {
            const parsedImages = JSON.parse(websiteImagesData);
            if (!kioskData.websiteImages) {
                kioskData.websiteImages = {};
            }
            // Merge the individual data with kiosk data
            kioskData.websiteImages = { ...kioskData.websiteImages, ...parsedImages };
            console.log('✅ Loaded website images data from localStorage:', parsedImages);
            console.log('🔄 Merged with kiosk data:', kioskData.websiteImages);
        } catch (error) {
            console.error('❌ Error parsing website images data:', error);
        }
    } else {
        console.log('⚠️ No individual website images data found in localStorage');
    }
}

// Setup form handlers for image uploads and form management
function setupFormHandlers() {
    // News form handlers
    const addNewsBtn = document.getElementById('add-news');
    const newsForm = document.getElementById('news-form');
    const saveNewsBtn = document.getElementById('save-news');
    const cancelNewsBtn = document.getElementById('cancel-news');
    
    if (addNewsBtn) {
        addNewsBtn.addEventListener('click', () => {
            showNewsForm();
        });
    }
    
    if (saveNewsBtn) {
        saveNewsBtn.addEventListener('click', () => {
            saveNewsItem();
        });
    }
    
    if (cancelNewsBtn) {
        cancelNewsBtn.addEventListener('click', () => {
            hideNewsForm();
        });
    }
    
    // Activities form handlers
    const addActivityBtn = document.getElementById('add-activity');
    const activitiesForm = document.getElementById('activities-form');
    const saveActivityBtn = document.getElementById('save-activity');
    const cancelActivityBtn = document.getElementById('cancel-activity');
    
    if (addActivityBtn) {
        addActivityBtn.addEventListener('click', () => {
            showActivitiesForm();
        });
    }
    
    if (saveActivityBtn) {
        saveActivityBtn.addEventListener('click', () => {
            saveActivityItem();
        });
    }
    
    if (cancelActivityBtn) {
        cancelActivityBtn.addEventListener('click', () => {
            hideActivitiesForm();
        });
    }
    
    // Gallery form handlers
    const addGalleryBtn = document.getElementById('add-gallery');
    const galleryForm = document.getElementById('gallery-form');
    const saveGalleryBtn = document.getElementById('save-gallery-photo');
    const cancelGalleryBtn = document.getElementById('cancel-gallery-photo');
    
    if (addGalleryBtn) {
        addGalleryBtn.addEventListener('click', () => {
            showGalleryForm();
        });
    }
    
    if (saveGalleryBtn) {
        saveGalleryBtn.addEventListener('click', () => {
            saveGalleryItem();
        });
    }
    
    if (cancelGalleryBtn) {
        cancelGalleryBtn.addEventListener('click', () => {
            hideGalleryForm();
        });
    }
}

// Form display functions
function showNewsForm() {
    const form = document.getElementById('news-form');
    if (form) {
        form.style.display = 'block';
        // Set today's date as default
        const dateInput = document.getElementById('news-date');
        if (dateInput) {
            dateInput.value = new Date().toISOString().split('T')[0];
        }
    }
}

function hideNewsForm() {
    const form = document.getElementById('news-form');
    if (form) {
        form.style.display = 'none';
        // Clear form fields
        document.getElementById('news-title').value = '';
        document.getElementById('news-content').value = '';
        document.getElementById('news-image-upload').value = '';
        document.getElementById('news-image-url').value = '';
    }
}

function showActivitiesForm() {
    const form = document.getElementById('activities-form');
    if (form) {
        form.style.display = 'block';
        // Set today's date as default
        const dateInput = document.getElementById('activity-date');
        if (dateInput) {
            dateInput.value = new Date().toISOString().split('T')[0];
        }
    }
}

function hideActivitiesForm() {
    const form = document.getElementById('activities-form');
    if (form) {
        form.style.display = 'none';
        // Clear form fields
        document.getElementById('activity-title').value = '';
        document.getElementById('activity-description').value = '';
        document.getElementById('activity-image-upload').value = '';
        document.getElementById('activity-image-url').value = '';
        document.getElementById('activity-time').value = '';
    }
}

function showGalleryForm() {
    const form = document.getElementById('gallery-form');
    if (form) {
        form.style.display = 'block';
    }
}

function hideGalleryForm() {
    const form = document.getElementById('gallery-form');
    if (form) {
        form.style.display = 'none';
        // Clear form fields
        document.getElementById('gallery-photo-title').value = '';
        document.getElementById('gallery-photo-description').value = '';
        document.getElementById('gallery-image-upload').value = '';
        document.getElementById('gallery-image-url').value = '';
        document.getElementById('gallery-photo-category').value = 'Events';
    }
}

// Image upload handling
async function handleImageUpload(fileInput, urlInput) {
    if (fileInput && fileInput.files && fileInput.files[0]) {
        const file = fileInput.files[0];
        
        try {
            // Validate file before processing
            validateFile(file);
            
            // Show upload progress
            showUploadProgress('Processing image...');
            
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = function(e) {
                    removeUploadProgress();
                    resolve(e.target.result);
                };
                reader.onerror = function() {
                    removeUploadProgress();
                    reject(new Error('Failed to read file'));
                };
                reader.readAsDataURL(file);
            });
        } catch (error) {
            removeUploadProgress();
            throw error;
        }
    } else if (urlInput && urlInput.value.trim()) {
        // Show upload progress for URL validation
        showUploadProgress('Validating image URL...');
        
        try {
            const url = urlInput.value.trim();
            await validateImageUrl(url);
            removeUploadProgress();
            return url;
        } catch (error) {
            removeUploadProgress();
            throw error;
        }
    } else {
        // Use default placeholder image
        return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjgwIiB2aWV3Qm94PSIwIDAgMTAwIDgwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjgwIiBmaWxsPSIjNjY3ZWVBISIvPgo8dGV4dCB4PSI1MCIgeT0iNDAiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxMiIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiPk5ld3MgSW1hZ2U8L3RleHQ+Cjwvc3ZnPgo=';
    }
}

// Save functions for new items
async function saveNewsItem() {
    const title = document.getElementById('news-title').value.trim();
    const content = document.getElementById('news-content').value.trim();
    const imageUpload = document.getElementById('news-image-upload');
    const imageUrl = document.getElementById('news-image-url');
    const date = document.getElementById('news-date').value;
    
    if (!title || !content) {
        alert('Please fill in all required fields');
        return;
    }
    
    const image = await handleImageUpload(imageUpload, imageUrl);
    
    const newNews = {
        id: Date.now(),
        title: title,
        content: content,
        image: image,
        date: date
    };
    
    kioskData.news.unshift(newNews);
    saveData();
    loadNews();
    hideNewsForm();
    showSaveMessage();
}

async function saveActivityItem() {
    const title = document.getElementById('activity-title').value.trim();
    const description = document.getElementById('activity-description').value.trim();
    const imageUpload = document.getElementById('activity-image-upload');
    const imageUrl = document.getElementById('activity-image-url');
    const date = document.getElementById('activity-date').value;
    const time = document.getElementById('activity-time').value;
    
    if (!title || !description) {
        alert('Please fill in all required fields');
        return;
    }
    
    const image = await handleImageUpload(imageUpload, imageUrl);
    
    const newActivity = {
        id: Date.now(),
        name: title,
        description: description,
        image: image,
        date: date,
        time: time
    };
    
    kioskData.activities.unshift(newActivity);
    saveData();
    loadActivities();
    hideActivitiesForm();
    showSaveMessage();
}

async function saveGalleryItem() {
    const title = document.getElementById('gallery-photo-title').value.trim();
    const description = document.getElementById('gallery-photo-description').value.trim();
    const imageUpload = document.getElementById('gallery-image-upload');
    const imageUrl = document.getElementById('gallery-image-url');
    const category = document.getElementById('gallery-photo-category').value;
    
    if (!title) {
        alert('Please fill in the title field');
        return;
    }
    
    const image = await handleImageUpload(imageUpload, imageUrl);
    
    const newGalleryItem = {
        id: Date.now(),
        title: title,
        description: description,
        image: image,
        category: category
    };
    
    kioskData.gallery.unshift(newGalleryItem);
    saveData();
    loadGallery();
    hideGalleryForm();
    showSaveMessage();
}

// Save data to localStorage
function saveData() {
    localStorage.setItem('kioskData', JSON.stringify(kioskData));
}

// Initialize event listeners
function initializeEventListeners() {
    // Login form
    loginForm.addEventListener('submit', handleLogin);
    
    // Logout
    logoutBtn.addEventListener('click', handleLogout);
    
    // Navigation
    navBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const section = btn.getAttribute('data-section');
            showSection(section);
        });
    });
    
    // Save buttons
    saveBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const section = btn.getAttribute('data-section');
            saveSection(section);
        });
    });
    
    // Add buttons
    document.getElementById('add-news').addEventListener('click', () => showAddModal('news'));
    document.getElementById('add-activity').addEventListener('click', () => showAddModal('activity'));
    document.getElementById('add-gallery').addEventListener('click', () => showAddModal('gallery'));
}

// Handle login
function handleLogin(e) {
    e.preventDefault();
    const password = passwordInput.value;
    
    if (password === ADMIN_PASSWORD) {
        loginScreen.classList.add('hidden');
        adminPanel.classList.remove('hidden');
        loginError.classList.add('hidden');
        passwordInput.value = '';
    } else {
        loginError.classList.remove('hidden');
        passwordInput.value = '';
    }
}

// Handle logout
function handleLogout() {
    loginScreen.classList.remove('hidden');
    adminPanel.classList.add('hidden');
    passwordInput.focus();
}

// Show section
function showSection(sectionId) {
    // Update navigation buttons
    navBtns.forEach(btn => btn.classList.remove('active'));
    document.querySelector(`[data-section="${sectionId}"]`).classList.add('active');
    
    // Update sections
    adminSections.forEach(section => section.classList.remove('active'));
    document.getElementById(sectionId).classList.add('active');
}

// Load content
function loadContent() {
    loadTimings();
    loadNews();
    loadActivities();
    loadGallery();
    loadAIResponses();
    loadSettings();
    loadMahantLocation();
}

// Load timings
function loadTimings() {
    document.getElementById('darshan-morning').value = kioskData.timings.darshanMorning;
    document.getElementById('darshan-evening').value = kioskData.timings.darshanEvening;
    document.getElementById('aarti-timing').value = kioskData.timings.aarti;
    document.getElementById('abhishek-weekdays').value = kioskData.timings.abhishekWeekdays;
    document.getElementById('abhishek-weekends').value = kioskData.timings.abhishekWeekends;
    document.getElementById('campus-hours').value = kioskData.timings.campusHours;
}

// Load news
function loadNews() {
    const newsList = document.getElementById('news-list');
    if (!newsList) return;
    
    newsList.innerHTML = '';
    
    kioskData.news.forEach(news => {
        const newsItem = document.createElement('div');
        newsItem.className = 'news-item';
        newsItem.innerHTML = `
            <div class="news-item-content">
                <div class="news-item-image">
                    <img src="${news.image}" alt="${news.title}" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjgwIiB2aWV3Qm94PSIwIDAgMTAwIDgwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjgwIiBmaWxsPSIjNjY3ZWVBISIvPgo8dGV4dCB4PSI1MCIgeT0iNDAiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxMiIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiPk5ld3MgSW1hZ2U8L3RleHQ+Cjwvc3ZnPgo='">
                </div>
                <div class="news-item-details">
                    <h4>${news.title}</h4>
                    <span class="news-date">${news.date}</span>
                    ${news.content ? `<p class="news-content-text">${news.content}</p>` : ''}
                </div>
            </div>
            <div class="news-item-actions">
                <button class="action-btn edit-btn" onclick="editNews(${news.id})">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="action-btn delete-btn" onclick="deleteNews(${news.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
        newsList.appendChild(newsItem);
    });
}

// Load activities
function loadActivities() {
    const activitiesList = document.getElementById('activities-list');
    if (!activitiesList) return;
    
    activitiesList.innerHTML = '';
    
    kioskData.activities.forEach(activity => {
        const activityItem = document.createElement('div');
        activityItem.className = 'activity-item';
        activityItem.innerHTML = `
            <div class="activity-item-content">
                <div class="activity-item-image">
                    <img src="${activity.image || 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjgwIiB2aWV3Qm94PSIwIDAgMTAwIDgwIiBmaWxsPSJub25lIiB4bWxucz0iaWR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjgwIiBmaWxsPSIjNjY3ZWVBISIvPgo8dGV4dCB4PSI1MCIgeT0iNDAiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxMiIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiPk5ld3MgSW1hZ2U8L3RleHQ+Cjwvc3ZnPgo='}" alt="${activity.name}" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjgwIiB2aWV3Qm94PSIwIDAgMTAwIDgwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjgwIiBmaWxsPSIjNjY3ZWVBISIvPgo8dGV4dCB4PSI1MCIgeT0iNDAiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxMiIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiPk5ld3MgSW1hZ2U8L3RleHQ+Cjwvc3ZnPgo='">
                </div>
                <div class="activity-item-details">
                    <h4>${activity.name}</h4>
                    <p>${activity.description}</p>
                    <span class="activity-date">${activity.date} - ${activity.time}</span>
                </div>
            </div>
            <div class="activity-item-actions">
                <button class="action-btn edit-btn" onclick="editActivity(${activity.id})">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="action-btn delete-btn" onclick="deleteActivity(${activity.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
        activitiesList.appendChild(activityItem);
    });
}

// Load gallery
function loadGallery() {
    const galleryList = document.getElementById('gallery-list');
    galleryList.innerHTML = '';
    
    kioskData.gallery.forEach(item => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        galleryItem.innerHTML = `
            <div class="gallery-item-content">
                <h4>${item.title}</h4>
                <img src="${item.image}" alt="${item.title}" style="width: 50px; height: 50px; object-fit: cover; border-radius: 4px;">
            </div>
            <div class="gallery-item-actions">
                <button class="action-btn edit-btn" onclick="editGallery(${item.id})">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="action-btn delete-btn" onclick="deleteGallery(${item.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
        galleryList.appendChild(galleryItem);
    });
}

// Load AI responses
function loadAIResponses() {
    document.getElementById('ai-timing').value = kioskData.aiResponses.timing;
    document.getElementById('ai-aarti').value = kioskData.aiResponses.aarti;
    document.getElementById('ai-activities').value = kioskData.aiResponses.activities;
    document.getElementById('ai-location').value = kioskData.aiResponses.location;
}

// Load settings
function loadSettings() {
    document.getElementById('mandir-name').value = kioskData.settings.mandirName;
    document.getElementById('mandir-address').value = kioskData.settings.address;
    document.getElementById('mandir-phone').value = kioskData.settings.phone;
    document.getElementById('mandir-email').value = kioskData.settings.email;
}

function loadMahantLocation() {
    // Check if there's updated data in localStorage from main kiosk
    const localStorageData = localStorage.getItem('mahantData');
    if (localStorageData) {
        const updatedData = JSON.parse(localStorageData);
        // Update kioskData with the latest data
        kioskData.mahantLocation = { ...kioskData.mahantLocation, ...updatedData };
    }
    
    document.getElementById('mahant-location-name').value = kioskData.mahantLocation.location;
    document.getElementById('mahant-location-address').value = kioskData.mahantLocation.address;
    document.getElementById('mahant-location-status').value = kioskData.mahantLocation.status;
    document.getElementById('mahant-location-notes').value = kioskData.mahantLocation.notes;
}

// Save section
function saveSection(section) {
    switch(section) {
        case 'timings':
            kioskData.timings = {
                darshanMorning: document.getElementById('darshan-morning').value,
                darshanEvening: document.getElementById('darshan-evening').value,
                aarti: document.getElementById('aarti-timing').value,
                abhishekWeekdays: document.getElementById('abhishek-weekdays').value,
                abhishekWeekends: document.getElementById('abhishek-weekends').value,
                campusHours: document.getElementById('campus-hours').value
            };
            break;
        case 'news':
            // News is handled separately through add/edit modals
            break;
        case 'activities':
            // Activities are handled separately through add/edit modals
            break;
        case 'gallery':
            // Gallery is handled separately through add/edit modals
            break;
        case 'ai-responses':
            kioskData.aiResponses = {
                timing: document.getElementById('ai-timing').value,
                aarti: document.getElementById('ai-aarti').value,
                activities: document.getElementById('ai-activities').value,
                location: document.getElementById('ai-location').value
            };
            break;
        case 'mahant-location':
            kioskData.mahantLocation = {
                location: document.getElementById('mahant-location-name').value,
                address: document.getElementById('mahant-location-address').value,
                status: document.getElementById('mahant-location-status').value,
                notes: document.getElementById('mahant-location-notes').value
            };
            // Also save to localStorage for main kiosk access
            localStorage.setItem('mahantData', JSON.stringify(kioskData.mahantLocation));
            break;
        case 'settings':
            kioskData.settings = {
                mandirName: document.getElementById('mandir-name').value,
                address: document.getElementById('mandir-address').value,
                phone: document.getElementById('mandir-phone').value,
                email: document.getElementById('mandir-email').value
            };
            break;
    }
    
    saveData();
    showSaveMessage();
}

// Show save message
function showSaveMessage() {
    const message = document.createElement('div');
    message.className = 'save-message';
    message.innerHTML = `
        <div style="position: fixed; top: 20px; right: 20px; background: #27ae60; color: white; padding: 15px 25px; border-radius: 8px; box-shadow: 0 4px 15px rgba(0,0,0,0.2); z-index: 1000;">
            <i class="fas fa-check"></i> Saved successfully!
        </div>
    `;
    document.body.appendChild(message);
    
    setTimeout(() => {
        message.remove();
    }, 3000);
}

// Show enhanced save message with image details
function showImageSaveMessage(imageUrl, title = 'Image') {
    const size = imageUrl.startsWith('data:') ? Math.round((imageUrl.length * 3) / 4 / 1024) : 'Unknown';
    const type = imageUrl.startsWith('data:') ? 'Base64' : 'External URL';
    
    const message = `${title} saved successfully! (${type}, ${size} KB) 🖼️✨🎯🎉🚀💫🌟🎯💫🌟✨💫🎯💫🌟✨🎯💫🌟✨🎯💫🌟✨🎯💫🌟✨🎯💫🌟✨🎯💫🌟✨🎯💫🌟✨🎯💫🌟✨🎯`;
    showSaveMessage(message);
}

// Show help tooltip for image management
function showImageHelp() {
    const helpModal = document.createElement('div');
    helpModal.className = 'help-modal';
    helpModal.innerHTML = `
        <div class="help-content">
            <div class="help-header">
                <h3><i class="fas fa-question-circle"></i> Image Management Help</h3>
                <button class="close-btn" onclick="this.closest('.help-modal').remove()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="help-body">
                <div class="help-section">
                    <h4><i class="fas fa-upload"></i> Uploading Images</h4>
                    <ul>
                        <li>Drag and drop images directly onto the upload area</li>
                        <li>Click the upload area to browse and select files</li>
                        <li>Supported formats: JPG, PNG, GIF, WebP</li>
                        <li>Maximum file size: 5MB</li>
                    </ul>
                </div>
                <div class="help-section">
                    <h4><i class="fas fa-link"></i> Using Image URLs</h4>
                    <ul>
                        <li>Enter direct image URLs from the web</li>
                        <li>URLs will be validated before saving</li>
                        <li>Ensure the URL points to a valid image file</li>
                    </ul>
                </div>
                <div class="help-section">
                    <h4><i class="fas fa-cog"></i> Image Optimization</h4>
                    <ul>
                        <li>Images are automatically compressed for better performance</li>
                        <li>Large images are optimized to reduce file size</li>
                        <li>Base64 encoding ensures offline functionality</li>
                    </ul>
                </div>
                <div class="help-section">
                    <h4><i class="fas fa-database"></i> Backup & Restore</h4>
                    <ul>
                        <li>Export your image data for backup</li>
                        <li>Import from previous backup files</li>
                        <li>All data is stored locally in your browser</li>
                    </ul>
                </div>
            </div>
            <div class="help-footer">
                <button class="help-close-btn" onclick="this.closest('.help-modal').remove()">
                    Got it!
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(helpModal);
    
    // Close modal when clicking outside
    helpModal.addEventListener('click', (e) => {
        if (e.target === helpModal) {
            helpModal.remove();
        }
    });
}

// Show add modal
function showAddModal(type) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>Add ${type.charAt(0).toUpperCase() + type.slice(1)}</h3>
                <button class="close-modal" onclick="closeModal()">&times;</button>
            </div>
            <form id="add-form">
                ${getModalFields(type)}
                <button type="submit" class="save-btn">
                    <i class="fas fa-plus"></i>
                    Add ${type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
            </form>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    document.getElementById('add-form').addEventListener('submit', (e) => {
        e.preventDefault();
        addItem(type);
    });
}

// Get modal fields
function getModalFields(type) {
    switch(type) {
        case 'news':
            return `
                <div class="form-group">
                    <label>Title</label>
                    <input type="text" id="modal-title" required>
                </div>
                <div class="form-group">
                    <label>Date</label>
                    <input type="text" id="modal-date" required>
                </div>
                <div class="form-group">
                    <label>Image URL (or leave blank for default)</label>
                    <input type="text" id="modal-image">
                </div>
            `;
        case 'activity':
            return `
                <div class="form-group">
                    <label>Name</label>
                    <input type="text" id="modal-name" required>
                </div>
                <div class="form-group">
                    <label>Date</label>
                    <input type="text" id="modal-date" required>
                </div>
                <div class="form-group">
                    <label>Time</label>
                    <input type="text" id="modal-time" required>
                </div>
                <div class="form-group">
                    <label>Description</label>
                    <textarea id="modal-description" required></textarea>
                </div>
            `;
        case 'gallery':
            return `
                <div class="form-group">
                    <label>Title</label>
                    <input type="text" id="modal-title" required>
                </div>
                <div class="form-group">
                    <label>Image URL (or leave blank for default)</label>
                    <input type="text" id="modal-image">
                </div>
            `;
    }
}

// Add item
function addItem(type) {
    const newItem = {};
    
    switch(type) {
        case 'news':
            newItem.id = Date.now();
            newItem.title = document.getElementById('modal-title').value;
            newItem.date = document.getElementById('modal-date').value;
            newItem.image = document.getElementById('modal-image').value || 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjgwIiB2aWV3Qm94PSIwIDAgMTAwIDgwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjgwIiBmaWxsPSIjNjY3ZWVBISIvPgo8dGV4dCB4PSI1MCIgeT0iNDAiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxMiIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiPk5ld3MgSW1hZ2U8L3RleHQ+Cjwvc3ZnPgo=';
            kioskData.news.push(newItem);
            break;
        case 'activity':
            newItem.id = Date.now();
            newItem.name = document.getElementById('modal-name').value;
            newItem.date = document.getElementById('modal-date').value;
            newItem.time = document.getElementById('modal-time').value;
            newItem.description = document.getElementById('modal-description').value;
            kioskData.activities.push(newItem);
            break;
        case 'gallery':
            newItem.id = Date.now();
            newItem.title = document.getElementById('modal-title').value;
            newItem.image = document.getElementById('modal-image').value || 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjNjY3ZWVBISIvPgo8dGV4dCB4PSIyMDAiIHk9IjE1MCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE2IiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+R2FsbGVyeSBJbWFnZTwvdGV4dD4KPC9zdmc+Cg==';
            kioskData.gallery.push(newItem);
            break;
    }
    
    saveData();
    loadContent();
    closeModal();
    showSaveMessage();
}

// Close modal
function closeModal() {
    const modal = document.querySelector('.modal');
    if (modal) {
        modal.remove();
    }
}

// Edit functions
function editNews(id) {
    const newsItem = kioskData.news.find(item => item.id === id);
    if (!newsItem) return;
    
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>Edit News</h3>
                <button class="close-modal" onclick="closeModal()">&times;</button>
            </div>
            <form id="edit-form">
                <div class="form-group">
                    <label>Title</label>
                    <input type="text" id="modal-title" value="${newsItem.title}" required>
                </div>
                <div class="form-group">
                    <label>Date</label>
                    <input type="text" id="modal-date" value="${newsItem.date}" required>
                </div>
                <div class="form-group">
                    <label>Image URL (or leave blank for default)</label>
                    <input type="text" id="modal-image" value="${newsItem.image}">
                </div>
                <button type="submit" class="save-btn">
                    <i class="fas fa-save"></i>
                    Update News
                </button>
            </form>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    document.getElementById('edit-form').addEventListener('submit', (e) => {
        e.preventDefault();
        updateNews(id);
    });
}

function editActivity(id) {
    const activityItem = kioskData.activities.find(item => item.id === id);
    if (!activityItem) return;
    
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>Edit Activity</h3>
                <button class="close-modal" onclick="closeModal()">&times;</button>
            </div>
            <form id="edit-form">
                <div class="form-group">
                    <label>Name</label>
                    <input type="text" id="modal-name" value="${activityItem.name}" required>
                </div>
                <div class="form-group">
                    <label>Date</label>
                    <input type="text" id="modal-date" value="${activityItem.date}" required>
                </div>
                <div class="form-group">
                    <label>Time</label>
                    <input type="text" id="modal-time" value="${activityItem.time}" required>
                </div>
                <div class="form-group">
                    <label>Description</label>
                    <textarea id="modal-description" required>${activityItem.description}</textarea>
                </div>
                <button type="submit" class="save-btn">
                    <i class="fas fa-save"></i>
                    Update Activity
                </button>
            </form>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    document.getElementById('edit-form').addEventListener('submit', (e) => {
        e.preventDefault();
        updateActivity(id);
    });
}

function editGallery(id) {
    const galleryItem = kioskData.gallery.find(item => item.id === id);
    if (!galleryItem) return;
    
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>Edit Gallery Item</h3>
                <button class="close-modal" onclick="closeModal()">&times;</button>
            </div>
            <form id="edit-form">
                <div class="form-group">
                    <label>Title</label>
                    <input type="text" id="modal-title" value="${galleryItem.title}" required>
                </div>
                <div class="form-group">
                    <label>Image URL (or leave blank for default)</label>
                    <input type="text" id="modal-image" value="${galleryItem.image}">
                </div>
                <button type="submit" class="save-btn">
                    <i class="fas fa-save"></i>
                    Update Gallery Item
                </button>
            </form>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    document.getElementById('edit-form').addEventListener('submit', (e) => {
        e.preventDefault();
        updateGallery(id);
    });
}

// Update functions
function updateNews(id) {
    const newsItem = kioskData.news.find(item => item.id === id);
    if (!newsItem) return;
    
    newsItem.title = document.getElementById('modal-title').value;
    newsItem.date = document.getElementById('modal-date').value;
    newsItem.image = document.getElementById('modal-image').value || 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjgwIiB2aWV3Qm94PSIwIDAgMTAwIDgwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjgwIiBmaWxsPSIjNjY3ZWVBISIvPgo8dGV4dCB4PSI1MCIgeT0iNDAiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxMiIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiPk5ld3MgSW1hZ2U8L3RleHQ+Cjwvc3ZnPgo=';
    
    saveData();
    loadContent();
    closeModal();
    showSaveMessage();
}

function updateActivity(id) {
    const activityItem = kioskData.activities.find(item => item.id === id);
    if (!activityItem) return;
    
    activityItem.name = document.getElementById('modal-name').value;
    activityItem.date = document.getElementById('modal-date').value;
    activityItem.time = document.getElementById('modal-time').value;
    activityItem.description = document.getElementById('modal-description').value;
    
    saveData();
    loadContent();
    closeModal();
    showSaveMessage();
}

function updateGallery(id) {
    const galleryItem = kioskData.gallery.find(item => item.id === id);
    if (!galleryItem) return;
    
    galleryItem.title = document.getElementById('modal-title').value;
    galleryItem.image = document.getElementById('modal-image').value || 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjNjY3ZWVBISIvPgo8dGV4dCB4PSIyMDAiIHk9IjE1MCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE2IiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+R2FsbGVyeSBJbWFnZTwvdGV4dD4KPC9zdmc+Cg==';
    
    saveData();
    loadContent();
    closeModal();
    showSaveMessage();
}

// Delete functions
function deleteNews(id) {
    if (confirm('Are you sure you want to delete this news item?')) {
        kioskData.news = kioskData.news.filter(item => item.id !== id);
        saveData();
        loadContent();
        showSaveMessage();
    }
}

function deleteActivity(id) {
    if (confirm('Are you sure you want to delete this activity?')) {
        kioskData.activities = kioskData.activities.filter(item => item.id !== id);
        saveData();
        loadContent();
        showSaveMessage();
    }
}

function deleteGallery(id) {
    if (confirm('Are you sure you want to delete this gallery item?')) {
        kioskData.gallery = kioskData.gallery.filter(item => item.id !== id);
        saveData();
        loadContent();
        showSaveMessage();
    }
}

// Close modal when clicking outside
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
        closeModal();
    }
});

// Website Images Management Functions
function loadWebsiteImages() {
    // Initialize website images data if it doesn't exist
    if (!kioskData.websiteImages) {
        kioskData.websiteImages = {
            heroSlider: [
                {
                    id: 1,
                    url: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTA4MCIgaGVpZ2h0PSI2MDAiIHZpZXdCb3g9IjAgMCAxMDgwIDYwMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjEwODAiIGhlaWdodD0iNjAwIiBmaWxsPSIjNjY3ZWVBISIvPgo8dGV4dCB4PSI1NDAiIHk9IjMwMCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE2IiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+QkFQUyBNYW5kaXIgRXh0ZXJpb3I8L3RleHQ+Cjwvc3ZnPgo=',
                    title: 'BAPS Mandir Exterior'
                },
                {
                    id: 2,
                    url: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTA4MCIgaGVpZ2h0PSI2MDAiIHZpZXdCb3g9IjAgMCAxMDgwIDYwMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjEwODAiIGhlaWdodD0iNjAwIiBmaWxsPSIjNjY3ZWVBISIvPgo8dGV4dCB4PSI1NDAiIHk9IjMwMCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE2IiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+TWFuZGlyIEludGVyaW9yPC90ZXh0Pgo8L3N2Zz4K',
                    title: 'Mandir Interior'
                },
                {
                    id: 3,
                    url: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTA4MCIgaGVpZ2h0PSI2MDAiIHZpZXdCb3g9IjAgMCAxMDgwIDYwMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjEwODAiIGhlaWdodD0iNjAwIiBmaWxsPSIjNjY3ZWVBISIvPgo8dGV4dCB4PSI1NDAiIHk9IjMwMCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE2IiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9IkFhcnRpIENlcmVtb255PC90ZXh0Pgo8L3N2Zz4K',
                    title: 'Aarti Ceremony'
                }
            ],
            murtiDarshan: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjNjY3ZWVBISIvPgo8dGV4dCB4PSIyMDAiIHk9IjE1MCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE2IiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+TXJ1dGkgRGFyc2hhbjwvdGV4dD4KPC9zdmc+Cg==',
            generalImages: []
        };
        saveData();
    }
    
    loadHeroSliderImages();
    loadMurtiDarshanImage();
    loadGeneralImages();
    showImageStats(); // Show image statistics
}

function loadHeroSliderImages() {
    const container = document.getElementById('hero-slider-images');
    if (!container) return;
    
    container.innerHTML = '';
    
    if (!kioskData.websiteImages.heroSlider || kioskData.websiteImages.heroSlider.length === 0) {
        container.innerHTML = '<p class="no-images">No hero slider images added yet.</p>';
        return;
    }
    
    console.log(`🖼️ Loading ${kioskData.websiteImages.heroSlider.length} hero slider images`);
    
    kioskData.websiteImages.heroSlider.forEach((image, index) => {
        const imageItem = document.createElement('div');
        imageItem.className = 'image-item';
        imageItem.innerHTML = `
            <img src="${image.url}" alt="Hero Slider ${index + 1}" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTA4MCIgaGVpZ2h0PSI2MDAiIHZpZXdCb3g9IjAgMCAxMDgwIDYwMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjEwODAiIGhlaWdodD0iNjAwIiBmaWxsPSIjNjY3ZWVBISIvPgo8dGV4dCB4PSI1NDQiIHk9IjMwMCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE2IiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+SGVybyBJbWFnZTwvdGV4dD4KPC9zdmc+Cg=='">
            <div class="image-title">${image.title || `Hero Slider ${index + 1}`}</div>
            <div class="image-actions">
                <button class="action-btn preview-btn" onclick="showImagePreview('${image.url}', '${image.title || `Hero Slider ${index + 1}`}')" title="Preview">
                    <i class="fas fa-eye"></i>
                </button>
                <button class="action-btn edit-btn" onclick="editHeroSliderImage(${index})" title="Edit">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="action-btn delete-btn" onclick="deleteHeroSliderImage(${index})" title="Delete">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
        container.appendChild(imageItem);
    });
    
    console.log(`✅ Loaded ${kioskData.websiteImages.heroSlider.length} hero slider images`);
}

function loadMurtiDarshanImage() {
    const murtiImage = kioskData.websiteImages.murtiDarshan;
    const murtiPreview = document.getElementById('murti-image-preview');
    
    if (!murtiPreview) {
        console.warn('⚠️ Murti image preview container not found');
        return;
    }
    
    if (murtiImage) {
        console.log('🖼️ Loading murti darshan image preview');
        
        murtiPreview.innerHTML = `
            <div class="current-image">
                <h4>Current Murti Darshan Image:</h4>
                <img src="${murtiImage}" alt="Current Murti Image" style="max-width: 200px; max-height: 150px; border-radius: 8px;" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjNjY3ZWVBISIvPgo8dGV4dCB4PSIyMDAiIHk9IjE1MCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE2IiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+TXJ1dGkgRGFyc2hhbjwvdGV4dD4KPC9zdmc+Cg=='">
                <p><small>Image type: ${murtiImage.startsWith('data:') ? 'Base64' : 'URL'}</small></p>
            </div>
        `;
        
        console.log('✅ Murti darshan image preview loaded');
    } else {
        console.log('⚠️ No murti darshan image found');
        
        murtiPreview.innerHTML = `
            <div class="no-image">
                <h4>No Murti Darshan Image Set</h4>
                <p>Upload an image or enter a URL to get started.</p>
            </div>
        `;
    }
}

function loadGeneralImages() {
    const container = document.getElementById('general-images');
    if (!container) return;
    
    container.innerHTML = '';
    
    if (!kioskData.websiteImages.generalImages || kioskData.websiteImages.generalImages.length === 0) {
        container.innerHTML = '<p class="no-images">No general images added yet.</p>';
        return;
    }
    
    console.log(`🖼️ Loading ${kioskData.websiteImages.generalImages.length} general images`);
    
    kioskData.websiteImages.generalImages.forEach((image, index) => {
        const imageItem = document.createElement('div');
        imageItem.className = 'image-item';
        imageItem.innerHTML = `
            <img src="${image.url}" alt="${image.title || 'General Image'}" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDIwMCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMTUwIiBmaWxsPSIjNjY3ZWVBISIvPgo8dGV4dCB4PSIxMDAiIHk9Ijc1IiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTIiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5HZW5lcmFsIEltYWdlPC90ZXh0Pgo8L3N2Zz4K'">
            <div class="image-title">${image.title || 'General Image'}</div>
            <div class="image-actions">
                <button class="action-btn preview-btn" onclick="showImagePreview('${image.url}', '${image.title || 'General Image'}')" title="Preview">
                    <i class="fas fa-eye"></i>
                </button>
                <button class="action-btn edit-btn" onclick="editGeneralImage(${index})" title="Edit">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="action-btn delete-btn" onclick="deleteGeneralImage(${index})" title="Delete">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
        container.appendChild(imageItem);
    });
    
    console.log(`✅ Loaded ${kioskData.websiteImages.generalImages.length} general images`);
}

async function addHeroSliderImage() {
    // Create a file input for image upload
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    
    fileInput.onchange = async (e) => {
        if (e.target.files && e.target.files[0]) {
            // Show loading state
            const loadingSpinner = showProcessingSpinner('Processing hero slider image...');
            
            try {
                const imageUrl = await handleImageUploadWithCompression(fileInput, null);
                
                if (imageUrl) {
                    if (!kioskData.websiteImages.heroSlider) {
                        kioskData.websiteImages.heroSlider = [];
                    }
                    
                    const newImage = {
                        id: Date.now(),
                        url: imageUrl,
                        title: `Hero Slider ${kioskData.websiteImages.heroSlider.length + 1}`
                    };
                    
                    kioskData.websiteImages.heroSlider.push(newImage);
                    
                    // Update the main kiosk website (this also saves to localStorage)
                    updateMainKioskImages();
                    
                    // Update the admin interface
                    loadHeroSliderImages();
                    showImageStats(); // Update statistics
                    showImageSaveMessage(imageUrl, 'Hero Slider Image');
                    
                    console.log(`✅ Added hero slider image. Total images: ${kioskData.websiteImages.heroSlider.length}`);
                    
                    // Show virtual keyboard for title editing
                    setTimeout(() => {
                        const titleInputs = document.querySelectorAll('.image-item input[type="text"]');
                        if (titleInputs.length > 0) {
                            const lastTitleInput = titleInputs[titleInputs.length - 1];
                            showAdminVirtualKeyboard(lastTitleInput);
                        }
                    }, 500);
                }
            } catch (error) {
                console.error('Error adding hero slider image:', error);
                alert(error.message || 'Error adding image. Please try again.');
            } finally {
                // Hide loading state
                hideProcessingSpinner(loadingSpinner);
            }
        }
    };
    
    fileInput.click();
}

async function addGeneralImage() {
    // Create a file input for image upload
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    
    fileInput.onchange = async (e) => {
        if (e.target.files && e.target.files[0]) {
            // Show loading state
            const loadingSpinner = showProcessingSpinner('Processing general image...');
            
            try {
                const imageUrl = await handleImageUploadWithCompression(fileInput, null);
                const imageTitle = prompt('Enter image title (optional):');
                
                if (imageUrl) {
                    if (!kioskData.websiteImages.generalImages) {
                        kioskData.websiteImages.generalImages = [];
                    }
                    
                    const newImage = {
                        id: Date.now(),
                        url: imageUrl,
                        title: imageTitle || 'General Image'
                    };
                    
                    kioskData.websiteImages.generalImages.push(newImage);
                    
                    // Update the main kiosk website (this also saves to localStorage)
                    updateMainKioskImages();
                    
                    // Update the admin interface
                    loadGeneralImages();
                    showImageStats(); // Update statistics
                    showImageSaveMessage(imageUrl, 'General Image');
                    
                    console.log(`✅ Added general image. Total images: ${kioskData.websiteImages.generalImages.length}`);
                    
                    // Show virtual keyboard for title editing if no title was provided
                    if (!imageTitle) {
                        setTimeout(() => {
                            const titleInputs = document.querySelectorAll('.image-item input[type="text"]');
                            if (titleInputs.length > 0) {
                                const lastTitleInput = titleInputs[titleInputs.length - 1];
                                showAdminVirtualKeyboard(lastTitleInput);
                            }
                        }, 500);
                    }
                }
            } catch (error) {
                console.error('Error adding general image:', error);
                alert(error.message || 'Error adding image. Please try again.');
            } finally {
                // Hide loading state
                hideProcessingSpinner(loadingSpinner);
            }
        }
    };
    
    fileInput.click();
}

async function saveMurtiImage() {
    const fileInput = document.getElementById('murti-image-upload');
    const urlInput = document.getElementById('murti-image-url');
    const saveBtn = document.querySelector('button[onclick="saveMurtiImage()"]');
    
    try {
        // Show loading state
        showLoading(saveBtn);
        
        let imageUrl = '';
        
        if (fileInput && fileInput.files && fileInput.files[0]) {
            console.log('📁 Processing uploaded file...');
            imageUrl = await handleImageUploadWithCompression(fileInput, null);
        } else if (urlInput && urlInput.value.trim()) {
            console.log('🔗 Processing URL input...');
            imageUrl = urlInput.value.trim();
        }
        
        if (imageUrl) {
            console.log('🖼️ Saving murti darshan image...');
            
            // Validate and optimize before saving
            const optimizedImage = await validateAndOptimizeImage(imageUrl);
            
            kioskData.websiteImages.murtiDarshan = optimizedImage;
            
            // Update the main kiosk website (this also saves to localStorage)
            updateMainKioskImages();
            
            // Show success message
            showImageSaveMessage(optimizedImage, 'Murti Darshan Image');
            
            // Clear form
            if (fileInput) fileInput.value = '';
            if (urlInput) urlInput.value = '';
            
            // Reload the preview
            loadMurtiDarshanImage();
            showImageStats(); // Update statistics
            
            console.log('✅ Murti darshan image saved successfully');
        } else {
            alert('Please provide an image file or URL');
        }
    } catch (error) {
        console.error('Error saving murti image:', error);
        alert(error.message || 'Error saving murti image. Please try again.');
    } finally {
        // Hide loading state
        hideLoading(saveBtn);
    }
}

function editHeroSliderImage(index) {
    const image = kioskData.websiteImages.heroSlider[index];
    if (!image) return;
    
    // Create a modal for editing
    const modal = document.createElement('div');
    modal.className = 'edit-modal';
    modal.innerHTML = `
        <div class="edit-modal-content">
            <h3>Edit Hero Slider Image</h3>
            <div class="edit-form">
                <label for="edit-title">Image Title:</label>
                <input type="text" id="edit-title" value="${image.title || `Hero Slider ${index + 1}`}" readonly>
                <label for="edit-url">Image URL:</label>
                <input type="text" id="edit-url" value="${image.url}" readonly>
            </div>
            <div class="edit-actions">
                <button id="save-edit" class="save-btn">Save Changes</button>
                <button id="cancel-edit" class="cancel-btn">Cancel</button>
            </button>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Show keyboard for title input
    const titleInput = modal.querySelector('#edit-title');
    const urlInput = modal.querySelector('#edit-url');
    
    // Show keyboard for title input
    setTimeout(() => {
        showAdminVirtualKeyboard(titleInput);
    }, 100);
    
    // Event listeners
    modal.querySelector('#save-edit').addEventListener('click', () => {
        const newTitle = titleInput.value.trim();
        const newUrl = urlInput.value.trim();
        
        if (newTitle && newUrl) {
            image.title = newTitle;
            image.url = newUrl;
            
            // Update the main kiosk website (this also saves to localStorage)
            updateMainKioskImages();
            
            // Update the admin interface
            loadHeroSliderImages();
            showImageStats();
            showSaveMessage();
            
            console.log(`✅ Updated hero slider image ${index + 1}`);
        }
        
        document.body.removeChild(modal);
        hideAdminVirtualKeyboard();
    });
    
    modal.querySelector('#cancel-edit').addEventListener('click', () => {
        document.body.removeChild(modal);
        hideAdminVirtualKeyboard();
    });
    
    // Close modal on escape
    modal.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            document.body.removeChild(modal);
            hideAdminVirtualKeyboard();
        }
    });
}

function editGeneralImage(index) {
    const image = kioskData.websiteImages.generalImages[index];
    if (!image) return;
    
    const newUrl = prompt('Enter new image URL:', image.url);
    const newTitle = prompt('Enter new image title:', image.title);
    
    if (newUrl && newUrl.trim() && (newUrl !== image.url || newTitle !== image.title)) {
        console.log(`✏️ Editing general image ${index + 1}`);
        
        image.url = newUrl.trim();
        image.title = newTitle || 'General Image';
        
        // Update the main kiosk website (this also saves to localStorage)
        updateMainKioskImages();
        
        // Update the admin interface
        loadGeneralImages();
        showImageStats(); // Update statistics
        showSaveMessage();
        
        console.log(`✅ Updated general image ${index + 1}`);
    }
}

function deleteHeroSliderImage(index) {
    if (confirm('Are you sure you want to delete this hero slider image?')) {
        console.log(`🗑️ Deleting hero slider image at index ${index}`);
        
        // Remove the image from the array
        kioskData.websiteImages.heroSlider.splice(index, 1);
        
        // Update titles for remaining images
        kioskData.websiteImages.heroSlider.forEach((image, newIndex) => {
            image.title = `Hero Slider ${newIndex + 1}`;
        });
        
        // Update the main kiosk website (this also saves to localStorage)
        updateMainKioskImages();
        
        // Update the admin interface
        loadHeroSliderImages();
        showImageStats(); // Update statistics
        showSaveMessage();
        
        console.log(`✅ Deleted hero slider image. Remaining images: ${kioskData.websiteImages.heroSlider.length}`);
    }
}

function deleteGeneralImage(index) {
    if (confirm('Are you sure you want to delete this general image?')) {
        console.log(`🗑️ Deleting general image at index ${index}`);
        
        // Remove the image from the array
        kioskData.websiteImages.generalImages.splice(index, 1);
        
        // Update the main kiosk website (this also saves to localStorage)
        updateMainKioskImages();
        
        // Update the admin interface
        loadGeneralImages();
        showImageStats(); // Update statistics
        showSaveMessage();
        
        console.log(`✅ Deleted general image. Remaining images: ${kioskData.websiteImages.generalImages.length}`);
    }
}

// Utility function to validate image URLs
function validateImageUrl(url) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(true);
        img.onerror = () => reject(new Error('Invalid image URL'));
        img.src = url;
    });
}

// Enhanced image upload with validation
async function handleImageUploadWithValidation(fileInput, urlInput) {
    try {
        const imageUrl = await handleImageUpload(fileInput, urlInput);
        
        if (imageUrl) {
            // Validate the image URL
            await validateImageUrl(imageUrl);
            return imageUrl;
        }
        return null;
    } catch (error) {
        console.error('Image validation error:', error);
        throw new Error('Invalid image. Please check the file or URL and try again.');
    }
}

// Show loading state
function showLoading(element) {
    if (element) {
        element.classList.add('loading');
        element.disabled = true;
    }
}

// Hide loading state
function hideLoading(element) {
    if (element) {
        element.classList.remove('loading');
        element.disabled = false;
    }
}

// Setup drag and drop functionality
function setupDragAndDrop() {
    const dragDropArea = document.getElementById('murti-drag-drop');
    if (!dragDropArea) return;

    dragDropArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        dragDropArea.classList.add('dragover');
    });

    dragDropArea.addEventListener('dragleave', (e) => {
        e.preventDefault();
        dragDropArea.classList.remove('dragover');
    });

    dragDropArea.addEventListener('drop', (e) => {
        e.preventDefault();
        dragDropArea.classList.remove('dragover');
        
        const files = e.dataTransfer.files;
        if (files.length > 0 && files[0].type.startsWith('image/')) {
            const fileInput = document.getElementById('murti-image-upload');
            fileInput.files = files;
            // Trigger change event
            const event = new Event('change', { bubbles: true });
            fileInput.dispatchEvent(event);
        }
    });

    // Click to browse functionality
    dragDropArea.addEventListener('click', () => {
        const fileInput = document.getElementById('murti-image-upload');
        fileInput.click();
    });
}

// Show upload progress
function showUploadProgress(message) {
    const progressDiv = document.createElement('div');
    progressDiv.className = 'upload-progress';
    progressDiv.innerHTML = `
        <div class="progress-content">
            <i class="fas fa-spinner fa-spin"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add to the page
    const adminPanel = document.getElementById('admin-panel');
    if (adminPanel) {
        adminPanel.appendChild(progressDiv);
        
        // Remove after 3 seconds
        setTimeout(() => {
            if (progressDiv.parentNode) {
                progressDiv.parentNode.removeChild(progressDiv);
            }
        }, 3000);
    }
}

// Show processing spinner for image operations
function showProcessingSpinner(message = 'Processing...') {
    const spinnerDiv = document.createElement('div');
    spinnerDiv.className = 'processing-spinner';
    spinnerDiv.innerHTML = `
        <div class="spinner-content">
            <div class="spinner"></div>
            <p>${message}</p>
        </div>
    `;
    
    document.body.appendChild(spinnerDiv);
    return spinnerDiv;
}

// Hide processing spinner
function hideProcessingSpinner(spinnerDiv) {
    if (spinnerDiv && spinnerDiv.parentNode) {
        spinnerDiv.parentNode.removeChild(spinnerDiv);
    }
}

// Remove upload progress
function removeUploadProgress() {
    const progressDiv = document.querySelector('.upload-progress');
    if (progressDiv && progressDiv.parentNode) {
        progressDiv.parentNode.removeChild(progressDiv);
    }
}

// Export image data for backup
function exportImageData() {
    const imageData = {
        heroSlider: kioskData.websiteImages?.heroSlider || [],
        murtiDarshan: kioskData.websiteImages?.murtiDarshan || '',
        generalImages: kioskData.websiteImages?.generalImages || [],
        exportDate: new Date().toISOString()
    };
    
    const dataStr = JSON.stringify(imageData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = `mandir-images-backup-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    
    showSaveMessage('Image data exported successfully!');
}

// Import image data from backup
function importImageData() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    
    input.onchange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const importedData = JSON.parse(e.target.result);
                    
                    if (importedData.heroSlider || importedData.murtiDarshan || importedData.generalImages) {
                        if (confirm('This will replace all current image data. Are you sure?')) {
                            kioskData.websiteImages = {
                                heroSlider: importedData.heroSlider || [],
                                murtiDarshan: importedData.murtiDarshan || '',
                                generalImages: importedData.generalImages || []
                            };
                            
                            saveData();
                            loadWebsiteImages();
                            showSaveMessage('Image data imported successfully!');
                        }
                    } else {
                        alert('Invalid backup file format');
                    }
                } catch (error) {
                    alert('Error reading backup file: ' + error.message);
                }
            };
            reader.readAsText(file);
        }
    };
    
    input.click();
}

// Show image preview before saving
function showImagePreview(imageUrl, title = 'Image Preview') {
    const modal = document.createElement('div');
    modal.className = 'image-preview-modal';
    modal.innerHTML = `
        <div class="image-preview-content">
            <div class="image-preview-header">
                <h3>${title}</h3>
                <button class="close-btn" onclick="this.closest('.image-preview-modal').remove()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="image-preview-body">
                <img src="${imageUrl}" alt="${title}" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjNjY3ZWVBISIvPgo8dGV4dCB4PSIyMDAiIHk9IjE1MCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE2IiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+SW1hZ2UgUHJldmlldzwvdGV4dD4KPC9zdmc+Cg=='">
            </div>
            <div class="image-preview-footer">
                <div class="image-info">
                    <p><strong>Type:</strong> ${imageUrl.startsWith('data:') ? 'Base64 Image' : 'External URL'}</p>
                    ${imageUrl.startsWith('data:') ? `<p><strong>Size:</strong> ${Math.round((imageUrl.length * 3) / 4 / 1024)} KB</p>` : ''}
                </div>
                <button class="preview-close-btn" onclick="this.closest('.image-preview-modal').remove()">
                    Close Preview
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

// Show image statistics
function showImageStats() {
    const stats = {
        heroSlider: kioskData.websiteImages?.heroSlider?.length || 0,
        generalImages: kioskData.websiteImages?.generalImages?.length || 0,
        hasMurtiImage: !!kioskData.websiteImages?.murtiDarshan,
        totalImages: (kioskData.websiteImages?.heroSlider?.length || 0) + 
                    (kioskData.websiteImages?.generalImages?.length || 0) + 
                    (kioskData.websiteImages?.murtiDarshan ? 1 : 0)
    };
    
    console.log('📊 Image statistics:', stats);
    
    const statsDiv = document.createElement('div');
    statsDiv.className = 'image-stats';
    statsDiv.innerHTML = `
        <div class="stats-content">
            <h4>Image Statistics</h4>
            <div class="stats-grid">
                <div class="stat-item">
                    <span class="stat-number">${stats.heroSlider}</span>
                    <span class="stat-label">Hero Slider Images</span>
                </div>
                <div class="stat-item">
                    <span class="stat-number">${stats.generalImages}</span>
                    <span class="stat-label">General Images</span>
                </div>
                <div class="stat-item">
                    <span class="stat-number">${stats.hasMurtiImage ? '1' : '0'}</span>
                    <span class="stat-label">Murti Darshan Image</span>
                </div>
                <div class="stat-item total">
                    <span class="stat-number">${stats.totalImages}</span>
                    <span class="stat-label">Total Images</span>
                </div>
            </div>
        </div>
    `;
    
    // Add to the website images section
    const websiteImagesSection = document.getElementById('website-images');
    if (websiteImagesSection) {
        const existingStats = websiteImagesSection.querySelector('.image-stats');
        if (existingStats) {
            existingStats.remove();
        }
        websiteImagesSection.insertBefore(statsDiv, websiteImagesSection.firstChild);
        
        console.log('✅ Image statistics displayed');
    } else {
        console.warn('⚠️ Website images section not found for stats display');
    }
}

// Validate file size (max 5MB)
function validateFileSize(file) {
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
        throw new Error('File size must be less than 5MB');
    }
    return true;
}

// Validate file type
function validateFileType(file) {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
        throw new Error('Only JPG, PNG, GIF, and WebP images are allowed');
    }
    return true;
}

// Enhanced file validation
function validateFile(file) {
    validateFileSize(file);
    validateFileType(file);
    return true;
}

// Compress image for better performance
function compressImage(base64String, maxWidth = 800, quality = 0.8) {
    return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            
            // Calculate new dimensions
            let { width, height } = img;
            if (width > maxWidth) {
                height = (height * maxWidth) / width;
                width = maxWidth;
            }
            
            canvas.width = width;
            canvas.height = height;
            
            // Draw and compress
            ctx.drawImage(img, 0, 0, width, height);
            const compressedBase64 = canvas.toDataURL('image/jpeg', quality);
            
            resolve(compressedBase64);
        };
        img.src = base64String;
    });
}

// Enhanced image upload with compression
async function handleImageUploadWithCompression(fileInput, urlInput) {
    try {
        const imageUrl = await handleImageUpload(fileInput, urlInput);
        
        if (imageUrl && imageUrl.startsWith('data:image/')) {
            // Compress uploaded images
            showUploadProgress('Compressing image...');
            const compressedImage = await compressImage(imageUrl);
            removeUploadProgress();
            return compressedImage;
        }
        
        return imageUrl;
    } catch (error) {
        removeUploadProgress();
        throw error;
    }
}

// Validate and optimize image before saving
async function validateAndOptimizeImage(imageUrl, maxSize = 1024 * 1024) { // 1MB max
    if (!imageUrl) return null;
    
    try {
        // If it's a base64 image, check size
        if (imageUrl.startsWith('data:image/')) {
            const base64Size = Math.ceil((imageUrl.length * 3) / 4);
            if (base64Size > maxSize) {
                // Recompress with higher compression
                showUploadProgress('Optimizing large image...');
                const optimizedImage = await compressImage(imageUrl, 600, 0.6);
                removeUploadProgress();
                return optimizedImage;
            }
        }
        
        return imageUrl;
    } catch (error) {
        removeUploadProgress();
        console.error('Image optimization error:', error);
        return imageUrl; // Return original if optimization fails
    }
}

// Function to force update main kiosk website images
function updateMainKioskImages() {
    try {
        console.log('🔄 Starting to update main kiosk images...');
        console.log('📦 Current kiosk data:', kioskData);
        console.log('🖼️ Current website images:', kioskData.websiteImages);
        
        // Check if websiteImages exists
        if (!kioskData.websiteImages) {
            console.warn('⚠️ No websiteImages object found, creating it...');
            kioskData.websiteImages = {
                heroSlider: [],
                murtiDarshan: '',
                generalImages: []
            };
        }
        
        // Store the updated image data in a way the main kiosk can access
        const kioskDataString = JSON.stringify(kioskData);
        localStorage.setItem('kioskData', kioskDataString);
        console.log('✅ Stored kiosk data to localStorage, length:', kioskDataString.length);
        
        // Also store individual image data for backward compatibility
        if (kioskData.websiteImages) {
            const websiteImagesString = JSON.stringify(kioskData.websiteImages);
            localStorage.setItem('websiteImagesData', websiteImagesString);
            console.log('✅ Stored website images data to localStorage, length:', websiteImagesString.length);
        } else {
            console.warn('⚠️ No website images data to store');
        }
        
        // Verify the data was actually stored
        const verifyKiosk = localStorage.getItem('kioskData');
        const verifyImages = localStorage.getItem('websiteImagesData');
        console.log('🔍 Verification - kioskData stored:', !!verifyKiosk, 'length:', verifyKiosk ? verifyKiosk.length : 0);
        console.log('🔍 Verification - websiteImagesData stored:', !!verifyImages, 'length:', verifyImages ? verifyImages.length : 0);
        
        console.log('🔄 Main kiosk images updated successfully');
        
        // Show a message that the main kiosk will be updated
        showSaveMessage('Images updated! The main kiosk website will refresh automatically.');
        
        // Test the data storage
        testDataStorage();
        
    } catch (error) {
        console.error('❌ Error updating main kiosk images:', error);
        showSaveMessage('Error updating images. Please try again.');
    }
}

// Test data storage
function testDataStorage() {
    console.log('🧪 Testing data storage...');
    
    try {
        // Check if data was stored
        const storedKioskData = localStorage.getItem('kioskData');
        const storedWebsiteImages = localStorage.getItem('websiteImagesData');
        
        console.log('📦 Stored kiosk data:', storedKioskData ? 'Found' : 'Not found');
        console.log('🖼️ Stored website images:', storedWebsiteImages ? 'Found' : 'Not found');
        
        if (storedKioskData) {
            const parsedData = JSON.parse(storedKioskData);
            console.log('✅ Parsed kiosk data successfully');
            console.log('   - Has websiteImages:', !!parsedData.websiteImages);
            if (parsedData.websiteImages) {
                console.log('   - Hero slider images:', parsedData.websiteImages.heroSlider?.length || 0);
                console.log('   - Murti darshan image:', !!parsedData.websiteImages.murtiDarshan);
                console.log('   - General images:', parsedData.websiteImages.generalImages?.length || 0);
            }
        }
        
        if (storedWebsiteImages) {
            const parsedImages = JSON.parse(storedWebsiteImages);
            console.log('✅ Parsed website images successfully');
            console.log('   - Hero slider images:', parsedImages.heroSlider?.length || 0);
            console.log('   - Murti darshan image:', !!parsedImages.murtiDarshan);
            console.log('   - General images:', parsedImages.generalImages?.length || 0);
        }
        
    } catch (error) {
        console.error('❌ Error testing data storage:', error);
    }
}

// Add test function to window for easy access
window.testDataStorage = testDataStorage;

// Force save to localStorage function
function forceSaveToLocalStorage() {
    console.log('🔧 Force saving to localStorage...');
    
    try {
        // Store the current kiosk data
        localStorage.setItem('kioskData', JSON.stringify(kioskData));
        console.log('✅ Forced save of kiosk data');
        
        // Store individual image data
        if (kioskData.websiteImages) {
            localStorage.setItem('websiteImagesData', JSON.stringify(kioskData.websiteImages));
            console.log('✅ Forced save of website images data');
        }
        
        // Test the storage
        testDataStorage();
        
        showSaveMessage('Data forcefully saved to localStorage!');
        
    } catch (error) {
        console.error('❌ Error force saving:', error);
        showSaveMessage('Error force saving data!');
    }
}

// Clear all data function
function clearAllData() {
    if (confirm('Are you sure you want to clear ALL data? This cannot be undone!')) {
        console.log('🗑️ Clearing all data...');
        
        try {
            // Clear localStorage
            localStorage.removeItem('kioskData');
            localStorage.removeItem('websiteImagesData');
            localStorage.removeItem('newsData');
            localStorage.removeItem('mahantData');
            
            // Reset kioskData to defaults
            kioskData = {
                timings: {
                    darshanMorning: '7:00 am - 11:00 am',
                    darshanEvening: '4:00 pm - 8:00 pm',
                    aarti: '7:00 am & 6:30 pm daily',
                    abhishekWeekdays: '7:00 am - 11:00 am, 4:00 pm - 6:00 pm',
                    abhishekWeekends: '7:00 am - 11:00 am, 7:00 pm - 8:00 pm',
                    campusHours: '7:00 am - 8:00 pm daily'
                },
                news: [],
                activities: [],
                gallery: [],
                aiResponses: {
                    timing: 'The mandir is open from 7:00 AM to 11:00 AM and 4:00 PM to 8:00 PM daily for Sacred Shrines Darshan. Aarti ceremonies are held at 7:00 AM and 6:30 PM daily.',
                    aarti: 'Aarti ceremonies are held twice daily - morning at 7:00 AM and evening at 6:30 PM. These are beautiful devotional ceremonies with singing and offerings.',
                    activities: 'We have various activities including Kishore-Kishori programs, summer shibirs, celebrations, and special pujas. Check the Latest News section for upcoming events.',
                    location: 'The mandir is located at 2500 Woodbridge Avenue, Edison, NJ 08817. We welcome all devotees for darshan and prayers.'
                },
                settings: {
                    mandirName: 'BAPS Shri Swaminarayan Mandir',
                    address: '2500 Woodbridge Avenue, Edison, NJ 08817',
                    phone: '(732) 572 1234',
                    email: 'info.edison@usa.baps.org'
                },
                mahantLocation: {
                    location: 'BAPS Shri Swaminarayan Mandir, Edison, NJ',
                    address: 'Edison, NJ, USA',
                    status: 'Available for Darshan',
                    notes: ''
                },
                websiteImages: {
                    heroSlider: [],
                    murtiDarshan: '',
                    generalImages: []
                }
            };
            
            console.log('✅ All data cleared and reset to defaults');
            showSaveMessage('All data cleared and reset to defaults!');
            
            // Reload the interface
            loadContent();
            loadWebsiteImages();
            
        } catch (error) {
            console.error('❌ Error clearing data:', error);
            showSaveMessage('Error clearing data!');
        }
    }
}

// Add debug functions to window for easy access
window.forceSaveToLocalStorage = forceSaveToLocalStorage;
window.clearAllData = clearAllData;

// Comprehensive debug function to check everything
function comprehensiveDebug() {
    console.log('🔍 === COMPREHENSIVE DEBUG ===');
    
    // Check current kioskData in memory
    console.log('📦 Current kioskData in memory:', kioskData);
    console.log('🖼️ Current websiteImages in memory:', kioskData.websiteImages);
    
    // Check localStorage
    console.log('💾 === localStorage CHECK ===');
    const allKeys = Object.keys(localStorage);
    console.log('🔑 All localStorage keys:', allKeys);
    
    // Check specific keys
    const kioskDataStored = localStorage.getItem('kioskData');
    const websiteImagesStored = localStorage.getItem('websiteImagesData');
    
    console.log('📦 kioskData in localStorage:', kioskDataStored ? 'FOUND' : 'NOT FOUND');
    console.log('🖼️ websiteImagesData in localStorage:', websiteImagesStored ? 'FOUND' : 'NOT FOUND');
    
    if (kioskDataStored) {
        try {
            const parsed = JSON.parse(kioskDataStored);
            console.log('✅ Parsed kioskData:', parsed);
            console.log('🖼️ Has websiteImages:', !!parsed.websiteImages);
            if (parsed.websiteImages) {
                console.log('   - Hero slider:', parsed.websiteImages.heroSlider?.length || 0, 'images');
                console.log('   - Murti darshan:', !!parsed.websiteImages.murtiDarshan);
                console.log('   - General images:', parsed.websiteImages.generalImages?.length || 0, 'images');
            }
        } catch (error) {
            console.error('❌ Error parsing kioskData:', error);
        }
    }
    
    if (websiteImagesStored) {
        try {
            const parsed = JSON.parse(websiteImagesStored);
            console.log('✅ Parsed websiteImagesData:', parsed);
            console.log('   - Hero slider:', parsed.heroSlider?.length || 0, 'images');
            console.log('   - Murti darshan:', !!parsed.murtiDarshan);
            console.log('   - General images:', parsed.generalImages?.length || 0, 'images');
        } catch (error) {
            console.error('❌ Error parsing websiteImagesData:', error);
        }
    }
    
    // Check if data is actually being saved
    console.log('💾 === SAVE TEST ===');
    try {
        // Try to save current data
        localStorage.setItem('kioskData', JSON.stringify(kioskData));
        if (kioskData.websiteImages) {
            localStorage.setItem('websiteImagesData', JSON.stringify(kioskData.websiteImages));
        }
        console.log('✅ Save test completed');
        
        // Verify it was saved
        const verifyKiosk = localStorage.getItem('kioskData');
        const verifyImages = localStorage.getItem('websiteImagesData');
        console.log('🔍 Verification - kioskData saved:', !!verifyKiosk);
        console.log('🔍 Verification - websiteImagesData saved:', !!verifyImages);
        
    } catch (error) {
        console.error('❌ Save test failed:', error);
    }
    
    console.log('🔍 === END DEBUG ===');
}

// Add to window
window.comprehensiveDebug = comprehensiveDebug;

// Virtual Keyboard functionality for Admin Panel
let adminCurrentInputField = null;
let adminKeyboardVisible = false;

function initializeAdminVirtualKeyboard() {
    console.log('⌨️ Initializing admin virtual keyboard...');
    
    const keyboard = document.getElementById('virtual-keyboard');
    const closeKeyboardBtn = document.getElementById('close-keyboard');
    
    if (!keyboard || !closeKeyboardBtn) {
        console.warn('⚠️ Admin virtual keyboard elements not found');
        return;
    }
    
    // Close keyboard button
    closeKeyboardBtn.addEventListener('click', hideAdminVirtualKeyboard);
    
    // Keyboard key event listeners
    const keyboardKeys = document.querySelectorAll('.keyboard-key');
    keyboardKeys.forEach(key => {
        key.addEventListener('click', handleAdminKeyboardKeyPress);
        key.addEventListener('touchstart', handleAdminKeyboardKeyPress);
    });
    
    // Make all input fields readonly and add keyboard trigger
    const inputFields = document.querySelectorAll('input[type="text"], input[type="email"], input[type="url"], textarea');
    inputFields.forEach(input => {
        input.setAttribute('readonly', 'true');
        input.classList.add('input-field-readonly');
        input.addEventListener('click', () => showAdminVirtualKeyboard(input));
        input.addEventListener('touchstart', () => showAdminVirtualKeyboard(input));
        
        // Add visual indicator that field is keyboard-enabled
        input.style.cursor = 'pointer';
        input.title = 'Click to open virtual keyboard';
    });
    
    // Special handling for image URL inputs
    const imageUrlInputs = document.querySelectorAll('input[placeholder*="URL"], input[placeholder*="url"], input[id*="url"], input[name*="url"]');
    imageUrlInputs.forEach(input => {
        input.addEventListener('focus', () => {
            if (!adminKeyboardVisible) {
                showAdminVirtualKeyboard(input);
            }
        });
    });
    
    console.log('✅ Admin virtual keyboard initialized');
}

function showAdminVirtualKeyboard(inputField) {
    if (!inputField) return;
    
    console.log('⌨️ Showing admin virtual keyboard for:', inputField);
    
    adminCurrentInputField = inputField;
    adminKeyboardVisible = true;
    
    const keyboard = document.getElementById('virtual-keyboard');
    if (keyboard) {
        keyboard.classList.remove('hidden');
        // Use setTimeout to ensure the element is visible before animating
        setTimeout(() => {
            keyboard.classList.add('show');
        }, 10);
    }
    
    // Focus the input field
    inputField.focus();
    
    // Add visual feedback
    inputField.style.borderColor = '#3498db';
    inputField.style.boxShadow = '0 0 0 2px rgba(52, 152, 219, 0.2)';
}

function hideAdminVirtualKeyboard() {
    console.log('⌨️ Hiding admin virtual keyboard');
    
    adminKeyboardVisible = false;
    adminCurrentInputField = null;
    
    const keyboard = document.getElementById('virtual-keyboard');
    if (keyboard) {
        keyboard.classList.remove('show');
        setTimeout(() => {
            keyboard.classList.add('hidden');
        }, 300);
    }
    
    // Remove visual feedback from input fields
    const inputs = document.querySelectorAll('input[readonly], textarea[readonly]');
    inputs.forEach(input => {
        input.style.borderColor = '';
        input.style.boxShadow = '';
    });
}

function handleAdminKeyboardKeyPress(event) {
    event.preventDefault();
    
    if (!adminCurrentInputField) return;
    
    const key = event.currentTarget.getAttribute('data-key');
    console.log('⌨️ Admin key pressed:', key);
    
    if (key === 'backspace') {
        // Handle backspace
        const currentValue = adminCurrentInputField.value;
        adminCurrentInputField.value = currentValue.slice(0, -1);
    } else if (key === 'enter') {
        // Handle enter key - close keyboard
        hideAdminVirtualKeyboard();
    } else if (key === ' ') {
        // Handle space
        adminCurrentInputField.value += ' ';
    } else {
        // Handle regular keys
        adminCurrentInputField.value += key;
    }
    
    // Trigger input event for any listeners
    adminCurrentInputField.dispatchEvent(new Event('input', { bubbles: true }));
    
    // Keep focus on input field
    adminCurrentInputField.focus();
}

// Close admin keyboard when clicking outside
document.addEventListener('click', (e) => {
    if (adminKeyboardVisible && !e.target.closest('.virtual-keyboard') && !e.target.closest('input[readonly]') && !e.target.closest('textarea[readonly]')) {
        hideAdminVirtualKeyboard();
    }
});

// Close admin keyboard on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && adminKeyboardVisible) {
        hideAdminVirtualKeyboard();
    }
});

// Add admin keyboard functions to window for easy access
window.showAdminVirtualKeyboard = showAdminVirtualKeyboard;
window.hideAdminVirtualKeyboard = hideAdminVirtualKeyboard;
window.initializeAdminVirtualKeyboard = initializeAdminVirtualKeyboard;

// Simple localStorage test function
function testLocalStorage() {
    console.log('🧪 === SIMPLE LOCALSTORAGE TEST ===');
    
    try {
        // Test 1: Basic localStorage functionality
        const testKey = 'testKey_' + Date.now();
        const testValue = 'testValue_' + Date.now();
        
        localStorage.setItem(testKey, testValue);
        const retrieved = localStorage.getItem(testKey);
        
        console.log('✅ Basic localStorage test:', testValue === retrieved ? 'PASSED' : 'FAILED');
        console.log('   - Stored:', testValue);
        console.log('   - Retrieved:', retrieved);
        
        // Clean up test
        localStorage.removeItem(testKey);
        
        // Test 2: JSON storage
        const testObject = { test: true, number: 42, string: 'hello' };
        const testObjectString = JSON.stringify(testObject);
        
        localStorage.setItem('testObject', testObjectString);
        const retrievedObject = localStorage.getItem('testObject');
        const parsedObject = JSON.parse(retrievedObject);
        
        console.log('✅ JSON localStorage test:', JSON.stringify(testObject) === retrievedObject ? 'PASSED' : 'FAILED');
        console.log('   - Stored object:', testObject);
        console.log('   - Retrieved object:', parsedObject);
        
        // Clean up test
        localStorage.removeItem('testObject');
        
        console.log('🧪 === LOCALSTORAGE TEST COMPLETE ===');
        
    } catch (error) {
        console.error('❌ localStorage test failed:', error);
    }
}

// Add to window
window.testLocalStorage = testLocalStorage;
