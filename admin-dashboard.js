// BAPS Mandir Admin Dashboard JavaScript

// Initialize dashboard when page loads
document.addEventListener('DOMContentLoaded', function() {
    loadAllContent();
    setupEventListeners();
});

// Setup event listeners for forms
function setupEventListeners() {
    // News form
    document.getElementById('add-news-form').addEventListener('submit', function(e) {
        e.preventDefault();
        addNewsItem();
    });

    // Date form
    document.getElementById('add-date-form').addEventListener('submit', function(e) {
        e.preventDefault();
        addDateItem();
    });

    // Image form
    document.getElementById('add-image-form').addEventListener('submit', function(e) {
        e.preventDefault();
        addImageItem();
    });
}

// Load all content from localStorage
function loadAllContent() {
    loadNews();
    loadDates();
    loadImages();
}

// ===== NEWS MANAGEMENT =====

function loadNews() {
    const newsList = document.getElementById('news-list');
    const news = JSON.parse(localStorage.getItem('mandirNews') || '[]');
    
    if (news.length === 0) {
        newsList.innerHTML = '<p style="color: #666; font-style: italic;">No news items yet. Add your first news item above!</p>';
        return;
    }

    newsList.innerHTML = news.map((item, index) => `
        <div class="news-item">
            <h4>${item.title}</h4>
            <div class="news-date">${formatDate(item.date)}</div>
            <div class="news-content">${item.content}</div>
            <div class="news-actions">
                <button class="btn btn-edit" onclick="editNews(${index})">
                    <i class="fas fa-edit"></i> Edit
                </button>
                <button class="btn btn-delete" onclick="deleteNews(${index})">
                    <i class="fas fa-trash"></i> Delete
                </button>
            </div>
        </div>
    `).join('');
}

function addNewsItem() {
    const title = document.getElementById('news-title').value;
    const content = document.getElementById('news-content').value;
    const date = document.getElementById('news-date').value;

    if (!title || !content || !date) {
        showStatus('Please fill in all fields', 'error');
        return;
    }

    const news = JSON.parse(localStorage.getItem('mandirNews') || '[]');
    news.push({ title, content, date });
    localStorage.setItem('mandirNews', JSON.stringify(news));

    // Clear form and close modal
    document.getElementById('add-news-form').reset();
    closeModal('add-news-modal');
    
    // Reload news and show success
    loadNews();
    showStatus('News item added successfully!', 'success');
}

function editNews(index) {
    const news = JSON.parse(localStorage.getItem('mandirNews') || '[]');
    const item = news[index];
    
    // Populate form for editing
    document.getElementById('news-title').value = item.title;
    document.getElementById('news-content').value = item.content;
    document.getElementById('news-date').value = item.date;
    
    // Show modal
    showModal('add-news-modal');
    
    // Change form to edit mode
    const form = document.getElementById('add-news-form');
    form.dataset.editIndex = index;
    form.querySelector('button[type="submit"]').textContent = 'Update News';
}

function deleteNews(index) {
    if (confirm('Are you sure you want to delete this news item?')) {
        const news = JSON.parse(localStorage.getItem('mandirNews') || '[]');
        news.splice(index, 1);
        localStorage.setItem('mandirNews', JSON.stringify(news));
        
        loadNews();
        showStatus('News item deleted successfully!', 'success');
    }
}

// ===== DATES MANAGEMENT =====

function loadDates() {
    const datesList = document.getElementById('dates-list');
    const dates = JSON.parse(localStorage.getItem('mandirDates') || '[]');
    
    if (dates.length === 0) {
        datesList.innerHTML = '<p style="color: #666; font-style: italic;">No events yet. Add your first event above!</p>';
        return;
    }

    datesList.innerHTML = dates.map((item, index) => `
        <div class="date-item">
            <div class="date-title">${item.title}</div>
            <div class="date-description">${item.description}</div>
            <div class="date-time">${formatDate(item.date)} at ${item.time}</div>
            <div class="news-actions">
                <button class="btn btn-edit" onclick="editDate(${index})">
                    <i class="fas fa-edit"></i> Edit
                </button>
                <button class="btn btn-delete" onclick="deleteDate(${index})">
                    <i class="fas fa-trash"></i> Delete
                </button>
            </div>
        </div>
    `).join('');
}

function addDateItem() {
    const title = document.getElementById('date-title').value;
    const description = document.getElementById('date-description').value;
    const date = document.getElementById('date-date').value;
    const time = document.getElementById('date-time').value;

    if (!title || !description || !date || !time) {
        showStatus('Please fill in all fields', 'error');
        return;
    }

    const dates = JSON.parse(localStorage.getItem('mandirDates') || '[]');
    dates.push({ title, description, date, time });
    localStorage.setItem('mandirDates', JSON.stringify(dates));

    // Clear form and close modal
    document.getElementById('add-date-form').reset();
    closeModal('add-date-modal');
    
    // Reload dates and show success
    loadDates();
    showStatus('Event added successfully!', 'success');
}

function editDate(index) {
    const dates = JSON.parse(localStorage.getItem('mandirDates') || '[]');
    const item = dates[index];
    
    // Populate form for editing
    document.getElementById('date-title').value = item.title;
    document.getElementById('date-description').value = item.description;
    document.getElementById('date-date').value = item.date;
    document.getElementById('date-time').value = item.time;
    
    // Show modal
    showModal('add-date-modal');
    
    // Change form to edit mode
    const form = document.getElementById('add-date-form');
    form.dataset.editIndex = index;
    form.querySelector('button[type="submit"]').textContent = 'Update Event';
}

function deleteDate(index) {
    if (confirm('Are you sure you want to delete this event?')) {
        const dates = JSON.parse(localStorage.getItem('mandirDates') || '[]');
        dates.splice(index, 1);
        localStorage.setItem('mandirDates', JSON.stringify(dates));
        
        loadDates();
        showStatus('Event deleted successfully!', 'success');
    }
}

// ===== IMAGE MANAGEMENT =====

function loadImages() {
    const imagesList = document.getElementById('images-list');
    const images = JSON.parse(localStorage.getItem('mandirImages') || '[]');
    
    if (images.length === 0) {
        imagesList.innerHTML = '<p style="color: #666; font-style: italic;">No images yet. Add your first image above!</p>';
        return;
    }

    imagesList.innerHTML = `
        <div class="image-grid">
            ${images.map((item, index) => `
                <div class="image-item">
                    <img src="${item.url}" alt="${item.alt || 'Mandir Image'}" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDE1MCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxNTAiIGhlaWdodD0iMTAwIiBmaWxsPSIjRjVGNUY1Ii8+Cjx0ZXh0IHg9Ijc1IiB5PSI1MCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjEyIiBmaWxsPSIjOTk5IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5JbWFnZTwvdGV4dD4KPC9zdmc+'">
                    <div class="image-url">${item.url}</div>
                    <div class="image-actions">
                        <button class="btn btn-edit btn-small" onclick="editImage(${index})">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn btn-delete btn-small" onclick="deleteImage(${index})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

function addImageItem() {
    const url = document.getElementById('image-url').value;
    const alt = document.getElementById('image-alt').value;

    if (!url) {
        showStatus('Please enter an image URL', 'error');
        return;
    }

    const images = JSON.parse(localStorage.getItem('mandirImages') || '[]');
    images.push({ url, alt });
    localStorage.setItem('mandirImages', JSON.stringify(images));

    // Clear form and close modal
    document.getElementById('add-image-form').reset();
    closeModal('add-image-modal');
    
    // Reload images and show success
    loadImages();
    showStatus('Image added successfully!', 'success');
}

function editImage(index) {
    const images = JSON.parse(localStorage.getItem('mandirImages') || '[]');
    const item = images[index];
    
    // Populate form for editing
    document.getElementById('image-url').value = item.url;
    document.getElementById('image-alt').value = item.alt || '';
    
    // Show modal
    showModal('add-image-modal');
    
    // Change form to edit mode
    const form = document.getElementById('add-image-form');
    form.dataset.editIndex = index;
    form.querySelector('button[type="submit"]').textContent = 'Update Image';
}

function deleteImage(index) {
    if (confirm('Are you sure you want to delete this image?')) {
        const images = JSON.parse(localStorage.getItem('mandirImages') || '[]');
        images.splice(index, 1);
        localStorage.setItem('mandirImages', JSON.stringify(images));
        
        loadImages();
        showStatus('Image deleted successfully!', 'success');
    }
}

// ===== MODAL FUNCTIONS =====

function showModal(modalId) {
    document.getElementById(modalId).style.display = 'flex';
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
    
    // Reset forms
    const form = document.querySelector(`#${modalId} form`);
    if (form) {
        form.reset();
        form.dataset.editIndex = '';
        form.querySelector('button[type="submit"]').textContent = form.querySelector('button[type="submit"]').textContent.replace('Update', 'Add');
    }
}

function showAddNewsForm() {
    showModal('add-news-modal');
}

function showAddDateForm() {
    showModal('add-date-modal');
}

function showAddImageForm() {
    showModal('add-image-modal');
}

// ===== UTILITY FUNCTIONS =====

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

function showStatus(message, type) {
    const statusDiv = document.getElementById('status-message');
    statusDiv.textContent = message;
    statusDiv.className = `status-message status-${type}`;
    statusDiv.style.display = 'block';
    
    // Auto-hide after 3 seconds
    setTimeout(() => {
        statusDiv.style.display = 'none';
    }, 3000);
}

function openKioskPreview() {
    // Open the main kiosk in a new tab
    window.open('index.html', '_blank');
}

// Close modals when clicking outside
window.addEventListener('click', function(e) {
    if (e.target.classList.contains('modal-overlay')) {
        e.target.style.display = 'none';
    }
});
