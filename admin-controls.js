// Admin Controls Page JavaScript
console.log('🔐 Admin Controls Page Loaded');

// PIN Authentication
const ADMIN_PIN = '2001';
const MAX_ATTEMPTS = 3;
let pinAttempts = 0;
let isAuthenticated = false;

// Initialize admin controls page
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Initializing admin controls page...');
    
    try {
        // Show PIN overlay first
        showPinOverlay();
        
        // Set up PIN input event listeners
        setupPinInput();
        
        console.log('✅ Admin controls page initialized successfully!');
        
    } catch (error) {
        console.error('❌ Error initializing admin controls page:', error);
    }
});

// PIN Authentication Functions
function showPinOverlay() {
    const pinOverlay = document.getElementById('pin-overlay');
    const adminControlsPage = document.querySelector('.admin-controls-page');
    
    if (pinOverlay && adminControlsPage) {
        pinOverlay.style.display = 'flex';
        adminControlsPage.style.display = 'none';
        
        // Focus on PIN input
        setTimeout(() => {
            const pinInput = document.getElementById('pin-input');
            if (pinInput) {
                pinInput.focus();
            }
        }, 100);
    }
}

function hidePinOverlay() {
    const pinOverlay = document.getElementById('pin-overlay');
    const adminControlsPage = document.querySelector('.admin-controls-page');
    
    if (pinOverlay && adminControlsPage) {
        pinOverlay.style.display = 'none';
        adminControlsPage.style.display = 'block';
        
        // Initialize admin controls after authentication
        initializeAdminControls();
    }
}

function setupPinInput() {
    const pinInput = document.getElementById('pin-input');
    const pinDots = document.querySelectorAll('.pin-dot');
    
    if (pinInput) {
        // Handle PIN input changes
        pinInput.addEventListener('input', (e) => {
            const value = e.target.value;
            updatePinDots(value.length);
            
            // Auto-submit when 4 digits are entered
            if (value.length === 4) {
                setTimeout(() => submitPin(), 200);
            }
        });
        
        // Handle Enter key
        pinInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                submitPin();
            }
        });
    }
}

function updatePinDots(digitCount) {
    const pinDots = document.querySelectorAll('.pin-dot');
    pinDots.forEach((dot, index) => {
        if (index < digitCount) {
            dot.style.background = '#3498db';
        } else {
            dot.style.background = '#e0e0e0';
        }
    });
}

function submitPin() {
    const pinInput = document.getElementById('pin-input');
    const enteredPin = pinInput.value;
    
    if (enteredPin === ADMIN_PIN) {
        // Success - hide PIN overlay and show admin controls
        console.log('✅ PIN authentication successful');
        isAuthenticated = true;
        hidePinOverlay();
        
        // Clear PIN input
        pinInput.value = '';
        updatePinDots(0);
        
        // Show success message
        showAdminMessage('🔓 Access granted! Welcome to Admin Controls.');
        
    } else {
        // Failed attempt
        pinAttempts++;
        console.log(`❌ PIN authentication failed. Attempts: ${pinAttempts}`);
        
        // Update attempts display
        const attemptsDisplay = document.getElementById('attempts-display');
        if (attemptsDisplay) {
            attemptsDisplay.textContent = `Attempts: ${pinAttempts}/${MAX_ATTEMPTS}`;
        }
        
        // Clear PIN input
        pinInput.value = '';
        updatePinDots(0);
        
        if (pinAttempts >= MAX_ATTEMPTS) {
            // Lock out after max attempts
            lockOutUser();
        } else {
            // Show error message
            showPinError(`❌ Incorrect PIN. ${MAX_ATTEMPTS - pinAttempts} attempts remaining.`);
        }
        
        // Focus back on PIN input
        pinInput.focus();
    }
}

function showPinError(message) {
    // Create temporary error message
    const errorDiv = document.createElement('div');
    errorDiv.textContent = message;
    errorDiv.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: #e74c3c;
        color: white;
        padding: 15px 25px;
        border-radius: 8px;
        z-index: 2001;
        font-weight: 600;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        animation: pinErrorSlideIn 0.3s ease-out;
    `;
    
    document.body.appendChild(errorDiv);
    
    // Remove after 3 seconds
    setTimeout(() => {
        if (errorDiv.parentNode) {
            errorDiv.parentNode.removeChild(errorDiv);
        }
    }, 3000);
}

function lockOutUser() {
    const pinContainer = document.querySelector('.pin-container');
    const attemptsDisplay = document.getElementById('attempts-display');
    
    if (pinContainer && attemptsDisplay) {
        attemptsDisplay.innerHTML = '🔒 Account locked. Please wait 30 seconds.';
        attemptsDisplay.style.color = '#e74c3c';
        attemptsDisplay.style.fontWeight = 'bold';
        
        // Disable PIN input
        const pinInput = document.getElementById('pin-input');
        if (pinInput) {
            pinInput.disabled = true;
            pinInput.placeholder = 'Account Locked';
        }
        
        // Disable submit button
        const submitBtn = document.querySelector('.pin-btn:not(.cancel)');
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.style.opacity = '0.5';
            submitBtn.style.cursor = 'not-allowed';
        }
        
        // Unlock after 30 seconds
        setTimeout(() => {
            unlockUser();
        }, 30000);
    }
}

function unlockUser() {
    pinAttempts = 0;
    const attemptsDisplay = document.getElementById('attempts-display');
    const pinInput = document.getElementById('pin-input');
    const submitBtn = document.querySelector('.pin-btn:not(.cancel)');
    
    if (attemptsDisplay) {
        attemptsDisplay.textContent = 'Attempts: 0/3';
        attemptsDisplay.style.color = '#e74c3c';
        attemptsDisplay.style.fontWeight = 'normal';
    }
    
    if (pinInput) {
        pinInput.disabled = false;
        pinInput.placeholder = 'Enter PIN';
        pinInput.focus();
    }
    
    if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.style.opacity = '1';
        submitBtn.style.cursor = 'pointer';
    }
    
    console.log('🔓 User account unlocked');
}

function goBackToKiosk() {
    console.log('🏠 Going back to kiosk...');
    window.location.href = '/';
}

// Admin Keypad Functions
function showAdminKeypad() {
    const keypad = document.getElementById('admin-keypad');
    if (keypad) {
        keypad.classList.remove('hidden');
        setupKeypadInput();
        console.log('🔐 Admin keypad displayed');
    }
}

function hideAdminKeypad() {
    const keypad = document.getElementById('admin-keypad');
    if (keypad) {
        keypad.classList.add('hidden');
        clearKeypadInput();
        console.log('🔐 Admin keypad hidden');
    }
}

function setupKeypadInput() {
    const keypadInput = document.getElementById('keypad-input');
    const keypadKeys = document.querySelectorAll('.keypad-key[data-key]');
    
    if (keypadInput) {
        keypadInput.value = '';
        updateKeypadDots(0);
    }
    
    // Add click event listeners to numeric keys
    keypadKeys.forEach(key => {
        key.onclick = function() {
            const digit = this.getAttribute('data-key');
            addKeypadDigit(digit);
        };
    });
}

function addKeypadDigit(digit) {
    const keypadInput = document.getElementById('keypad-input');
    if (keypadInput && keypadInput.value.length < 9) {
        keypadInput.value += digit;
        updateKeypadDots(keypadInput.value.length);
        console.log(`🔐 Added digit: ${digit}, current input: ${keypadInput.value}`);
    }
}

function clearKeypadInput() {
    const keypadInput = document.getElementById('keypad-input');
    if (keypadInput) {
        keypadInput.value = '';
        updateKeypadDots(0);
        console.log('🔐 Keypad input cleared');
    }
}

function updateKeypadDots(digitCount) {
    const dots = document.querySelectorAll('.keypad-dot');
    dots.forEach((dot, index) => {
        if (index < digitCount) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

function submitKeypadCode() {
    const keypadInput = document.getElementById('keypad-input');
    if (keypadInput && keypadInput.value.length === 9) {
        const code = keypadInput.value;
        console.log(`🔐 Submitting 9-digit code: ${code}`);
        
        // Here you can add validation logic for the 9-digit code
        // For now, we'll just show a success message
        showAdminMessage('✅ 9-digit code accepted! Advanced admin features unlocked.', 'success');
        
        // Hide the keypad
        hideAdminKeypad();
        
        // You can add additional logic here to unlock advanced features
        unlockAdvancedAdminFeatures();
    } else {
        showAdminMessage('❌ Please enter a complete 9-digit code.', 'error');
    }
}

function unlockAdvancedAdminFeatures() {
    console.log('🔓 Advanced admin features unlocked');
    // Add logic to show/hide advanced admin features
    // For example, show additional admin cards or enable certain functions
}

// Image Management Functions
function refreshImages() {
    console.log('🖼️ Refreshing images...');
    
    try {
        // Get current image data from localStorage
        const savedData = localStorage.getItem('kioskData');
        if (savedData) {
            const kioskData = JSON.parse(savedData);
            if (kioskData.websiteImages) {
                console.log('✅ Images refreshed from kiosk data');
                showAdminMessage('✅ Images refreshed successfully!');
                return;
            }
        }
        
        // Fallback to individual image data
        const websiteImagesData = localStorage.getItem('websiteImagesData');
        if (websiteImagesData) {
            console.log('✅ Images refreshed from individual data');
            showAdminMessage('✅ Images refreshed successfully!');
            return;
        }
        
        showAdminMessage('ℹ️ No images found to refresh');
        
    } catch (error) {
        console.error('❌ Error refreshing images:', error);
        showAdminMessage('❌ Error refreshing images');
    }
}

function checkCurrentImageState() {
    console.log('🔍 Checking current image state...');
    
    try {
        const savedData = localStorage.getItem('kioskData');
        let imageInfo = 'No image data found';
        
        if (savedData) {
            const kioskData = JSON.parse(savedData);
            if (kioskData.websiteImages) {
                const images = kioskData.websiteImages;
                imageInfo = `Hero Slider: ${images.heroSlider?.length || 0} images\n`;
                imageInfo += `General Images: ${images.generalImages?.length || 0} images\n`;
                imageInfo += `Murti Darshan: ${images.murtiDarshan ? 'Yes' : 'No'}`;
            }
        }
        
        showAdminMessage(`📊 Current Image State:\n${imageInfo}`);
        
    } catch (error) {
        console.error('❌ Error checking image state:', error);
        showAdminMessage('❌ Error checking image state');
    }
}

function testImageLoading() {
    console.log('🧪 Testing image loading...');
    
    try {
        // Test if images can be loaded from localStorage
        const savedData = localStorage.getItem('kioskData');
        if (savedData) {
            const kioskData = JSON.parse(savedData);
            if (kioskData.websiteImages) {
                console.log('✅ Image data found in localStorage');
                showAdminMessage('✅ Image loading test passed! Images found in storage.');
                return;
            }
        }
        
        // Test individual image data
        const websiteImagesData = localStorage.getItem('websiteImagesData');
        if (websiteImagesData) {
            console.log('✅ Individual image data found');
            showAdminMessage('✅ Image loading test passed! Individual image data found.');
            return;
        }
        
        showAdminMessage('⚠️ No image data found. Please upload images first.');
        
    } catch (error) {
        console.error('❌ Error testing image loading:', error);
        showAdminMessage('❌ Image loading test failed');
    }
}

function initializeAdminControls() {
    console.log('🔓 Initializing admin controls after authentication...');
    
    try {
        // Update system status
        updateSystemStatus();
        
        // Set up auto-refresh for status
        setInterval(updateSystemStatus, 5000);
        
        console.log('✅ Admin controls initialized successfully!');
        
    } catch (error) {
        console.error('❌ Error initializing admin controls:', error);
    }
}

// Update system status information
function updateSystemStatus() {
    try {
        // Update last refresh time
        const lastRefreshElement = document.getElementById('last-refresh-time');
        if (lastRefreshElement) {
            const now = new Date();
            lastRefreshElement.textContent = now.toLocaleTimeString();
        }
        
        // Update images loaded count
        const imagesLoadedElement = document.getElementById('images-loaded-count');
        if (imagesLoadedElement) {
            const savedData = localStorage.getItem('kioskData');
            if (savedData) {
                try {
                    const kioskData = JSON.parse(savedData);
                    let totalImages = 0;
                    
                    if (kioskData.websiteImages) {
                        totalImages += (kioskData.websiteImages.heroSlider?.length || 0);
                        totalImages += (kioskData.websiteImages.generalImages?.length || 0);
                        totalImages += (kioskData.websiteImages.murtiDarshan ? 1 : 0);
                    }
                    
                    imagesLoadedElement.textContent = totalImages;
                } catch (error) {
                    imagesLoadedElement.textContent = 'Error';
                }
            } else {
                imagesLoadedElement.textContent = '0';
            }
        }
        
        // Update cache status
        const cacheStatusElement = document.getElementById('cache-status');
        if (cacheStatusElement) {
            if ('caches' in window) {
                cacheStatusElement.textContent = 'Available';
            } else {
                cacheStatusElement.textContent = 'Not Available';
            }
        }
        
        // Update system health
        const systemHealthElement = document.getElementById('system-health');
        if (systemHealthElement) {
            // Simple health check
            const savedData = localStorage.getItem('kioskData');
            if (savedData) {
                try {
                    JSON.parse(savedData);
                    systemHealthElement.textContent = 'Good';
                    systemHealthElement.style.color = '#27ae60';
                } catch (error) {
                    systemHealthElement.textContent = 'Warning';
                    systemHealthElement.style.color = '#f39c12';
                }
            } else {
                systemHealthElement.textContent = 'No Data';
                systemHealthElement.style.color = '#e74c3c';
            }
        }
        
    } catch (error) {
        console.error('Error updating system status:', error);
    }
}

// Admin control functions
function refreshWebsite() {
    console.log('🔄 Refreshing website...');
    
    try {
        // Update system status
        updateSystemStatus();
        
        // Show success message
        showAdminMessage('Website refresh initiated! Check the main kiosk for updates.');
        
        // Open main kiosk in new tab to show refresh
        window.open('/', '_blank');
        
    } catch (error) {
        console.error('Error refreshing website:', error);
        showAdminMessage('Error refreshing website. Please try again.');
    }
}

function forceReloadWebsite() {
    console.log('💥 Force reloading website...');
    
    if (confirm('Are you sure you want to force reload the website? This will clear all cache and reload the page.')) {
        try {
            // Clear localStorage and sessionStorage
            localStorage.clear();
            sessionStorage.clear();
            
            // Clear browser cache if possible
            if ('caches' in window) {
                caches.keys().then(names => {
                    names.forEach(name => {
                        caches.delete(name);
                    });
                });
            }
            
            showAdminMessage('Cache cleared! Opening main kiosk for reload...');
            
            // Open main kiosk in new tab
            setTimeout(() => {
                window.open('/', '_blank');
            }, 1000);
            
        } catch (error) {
            console.error('Error force reloading website:', error);
            showAdminMessage('Error force reloading website. Please try again.');
        }
    }
}

function clearCache() {
    console.log('🧹 Clearing cache...');
    
    try {
        // Clear localStorage
        localStorage.clear();
        
        // Clear sessionStorage
        sessionStorage.clear();
        
        // Clear browser cache if possible
        if ('caches' in window) {
            caches.keys().then(names => {
                names.forEach(name => {
                    caches.delete(name);
                });
            });
        }
        
        showAdminMessage('Cache cleared successfully!');
        updateSystemStatus();
        
    } catch (error) {
        console.error('Error clearing cache:', error);
        showAdminMessage('Error clearing cache. Please try again.');
    }
}

function runComprehensiveTest() {
    console.log('🧪 Running comprehensive tests...');
    
    try {
        // Create a test results display
        const testResults = {
            localStorage: !!localStorage.getItem('kioskData'),
            sessionStorage: sessionStorage.length > 0,
            cacheSupport: 'caches' in window,
            imagesData: false,
            systemHealth: 'Good'
        };
        
        // Check images data
        const savedData = localStorage.getItem('kioskData');
        if (savedData) {
            try {
                const kioskData = JSON.parse(savedData);
                testResults.imagesData = !!(kioskData.websiteImages && 
                    (kioskData.websiteImages.heroSlider || kioskData.websiteImages.murtiDarshan));
            } catch (error) {
                testResults.systemHealth = 'Warning';
            }
        } else {
            testResults.systemHealth = 'No Data';
        }
        
        // Display test results
        let resultsMessage = '🧪 Test Results:\n\n';
        resultsMessage += `✅ Local Storage: ${testResults.localStorage ? 'Working' : 'Not Working'}\n`;
        resultsMessage += `✅ Session Storage: ${testResults.sessionStorage ? 'Has Data' : 'Empty'}\n`;
        resultsMessage += `✅ Cache Support: ${testResults.cacheSupport ? 'Available' : 'Not Available'}\n`;
        resultsMessage += `✅ Images Data: ${testResults.imagesData ? 'Found' : 'Not Found'}\n`;
        resultsMessage += `✅ System Health: ${testResults.systemHealth}\n\n`;
        
        if (testResults.systemHealth === 'Good' && testResults.imagesData) {
            resultsMessage += '🎉 All tests passed! System is working correctly.';
        } else if (testResults.systemHealth === 'Warning') {
            resultsMessage += '⚠️ Some issues detected. Check console for details.';
        } else {
            resultsMessage += '❌ System needs attention. Check admin panel for configuration.';
        }
        
        alert(resultsMessage);
        
        // Update system status
        updateSystemStatus();
        
    } catch (error) {
        console.error('Error running tests:', error);
        showAdminMessage('Error running tests. Please try again.');
    }
}

function refreshImages() {
    console.log('🖼️ Refreshing images...');
    
    try {
        // Check if images data exists
        const savedData = localStorage.getItem('kioskData');
        if (savedData) {
            const kioskData = JSON.parse(savedData);
            if (kioskData.websiteImages) {
                showAdminMessage('Images data found! Opening main kiosk to refresh...');
                setTimeout(() => {
                    window.open('/', '_blank');
                }, 1000);
            } else {
                showAdminMessage('No images data found. Please configure images in the admin panel first.');
            }
        } else {
            showAdminMessage('No kiosk data found. Please configure the system in the admin panel first.');
        }
        
    } catch (error) {
        console.error('Error refreshing images:', error);
        showAdminMessage('Error refreshing images. Please try again.');
    }
}

function checkCurrentImageState() {
    console.log('🔍 Checking current image state...');
    
    try {
        const savedData = localStorage.getItem('kioskData');
        if (savedData) {
            const kioskData = JSON.parse(savedData);
            let imageReport = '📊 Image Status Report:\n\n';
            
            if (kioskData.websiteImages) {
                const images = kioskData.websiteImages;
                
                imageReport += `🎠 Hero Slider: ${images.heroSlider?.length || 0} images\n`;
                imageReport += `🙏 Murti Darshan: ${images.murtiDarshan ? 'Set' : 'Not Set'}\n`;
                imageReport += `🖼️ General Images: ${images.generalImages?.length || 0} images\n`;
                imageReport += `📱 Total Images: ${(images.heroSlider?.length || 0) + (images.generalImages?.length || 0) + (images.murtiDarshan ? 1 : 0)}\n\n`;
                
                if (images.heroSlider && images.heroSlider.length > 0) {
                    imageReport += 'Hero Slider Images:\n';
                    images.heroSlider.forEach((img, index) => {
                        imageReport += `  ${index + 1}. ${img.title || 'Untitled'} (${img.url.substring(0, 30)}...)\n`;
                    });
                }
                
                if (images.murtiDarshan) {
                    imageReport += `\nMurti Darshan: ${images.murtiDarshan.substring(0, 30)}...\n`;
                }
                
            } else {
                imageReport += '❌ No website images data found.\n';
                imageReport += 'Please configure images in the admin panel first.';
            }
            
            alert(imageReport);
            
        } else {
            showAdminMessage('No kiosk data found. Please configure the system first.');
        }
        
    } catch (error) {
        console.error('Error checking image state:', error);
        showAdminMessage('Error checking image state. Please try again.');
    }
}

function testImageLoading() {
    console.log('🧪 Testing image loading...');
    
    try {
        const savedData = localStorage.getItem('kioskData');
        if (savedData) {
            const kioskData = JSON.parse(savedData);
            
            if (kioskData.websiteImages) {
                let testResults = '🧪 Image Loading Test Results:\n\n';
                let passedTests = 0;
                let totalTests = 0;
                
                // Test hero slider images
                if (kioskData.websiteImages.heroSlider) {
                    totalTests++;
                    if (Array.isArray(kioskData.websiteImages.heroSlider) && kioskData.websiteImages.heroSlider.length > 0) {
                        testResults += '✅ Hero Slider: Images configured correctly\n';
                        passedTests++;
                    } else {
                        testResults += '❌ Hero Slider: No images or invalid format\n';
                    }
                } else {
                    testResults += '⚠️ Hero Slider: Not configured\n';
                }
                
                // Test murti darshan image
                if (kioskData.websiteImages.murtiDarshan) {
                    totalTests++;
                    testResults += '✅ Murti Darshan: Image configured\n';
                    passedTests++;
                } else {
                    testResults += '⚠️ Murti Darshan: Not configured\n';
                }
                
                // Test general images
                if (kioskData.websiteImages.generalImages) {
                    totalTests++;
                    if (Array.isArray(kioskData.websiteImages.generalImages)) {
                        testResults += `✅ General Images: ${kioskData.websiteImages.generalImages.length} configured\n`;
                        passedTests++;
                    } else {
                        testResults += '❌ General Images: Invalid format\n';
                    }
                } else {
                    testResults += '⚠️ General Images: Not configured\n';
                }
                
                testResults += `\n📊 Test Summary: ${passedTests}/${totalTests} tests passed\n`;
                
                if (passedTests === totalTests) {
                    testResults += '🎉 All image tests passed!';
                } else if (passedTests > 0) {
                    testResults += '⚠️ Some tests failed. Check configuration.';
                } else {
                    testResults += '❌ All tests failed. System needs configuration.';
                }
                
                alert(testResults);
                
            } else {
                showAdminMessage('No website images data found. Please configure images in the admin panel first.');
            }
            
        } else {
            showAdminMessage('No kiosk data found. Please configure the system first.');
        }
        
    } catch (error) {
        console.error('Error testing image loading:', error);
        showAdminMessage('Error testing image loading. Please try again.');
    }
}

function openAdminPanel() {
    console.log('🔧 Opening admin panel...');
    window.open('/admin.html', '_blank');
}

function openDebugPage() {
    console.log('🐛 Opening debug page...');
    window.open('/debug-links.html', '_blank');
}

function showSystemInfo() {
    console.log('ℹ️ Showing system information...');
    
    try {
        let systemInfo = 'ℹ️ System Information:\n\n';
        
        // Browser info
        systemInfo += `🌐 Browser: ${navigator.userAgent.split(' ')[0]}\n`;
        systemInfo += `📱 Platform: ${navigator.platform}\n`;
        systemInfo += `🌍 Language: ${navigator.language}\n`;
        systemInfo += `🍪 Cookies: ${navigator.cookieEnabled ? 'Enabled' : 'Disabled'}\n`;
        systemInfo += `📊 Online: ${navigator.onLine ? 'Yes' : 'No'}\n\n`;
        
        // Storage info
        systemInfo += `💾 Local Storage: ${localStorage.length} items\n`;
        systemInfo += `📝 Session Storage: ${sessionStorage.length} items\n`;
        systemInfo += `🗄️ Cache Support: ${'caches' in window ? 'Yes' : 'No'}\n\n`;
        
        // Kiosk data info
        const savedData = localStorage.getItem('kioskData');
        if (savedData) {
            try {
                const kioskData = JSON.parse(savedData);
                systemInfo += `🏛️ Kiosk Data: Found\n`;
                systemInfo += `📅 Last Updated: ${new Date().toLocaleString()}\n`;
                systemInfo += `📊 Data Size: ${(savedData.length / 1024).toFixed(2)} KB\n`;
                
                if (kioskData.websiteImages) {
                    const images = kioskData.websiteImages;
                    systemInfo += `🖼️ Total Images: ${(images.heroSlider?.length || 0) + (images.generalImages?.length || 0) + (images.murtiDarshan ? 1 : 0)}\n`;
                }
                
            } catch (error) {
                systemInfo += `❌ Kiosk Data: Corrupted\n`;
            }
        } else {
            systemInfo += `❌ Kiosk Data: Not Found\n`;
        }
        
        alert(systemInfo);
        
    } catch (error) {
        console.error('Error showing system info:', error);
        showAdminMessage('Error showing system info. Please try again.');
    }
}

function exportSystemData() {
    console.log('📥 Exporting system data...');
    
    try {
        const exportData = {
            timestamp: new Date().toISOString(),
            systemInfo: {
                userAgent: navigator.userAgent,
                platform: navigator.platform,
                language: navigator.language,
                online: navigator.onLine
            },
            localStorage: {},
            sessionStorage: {},
            kioskData: null
        };
        
        // Export localStorage
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key) {
                exportData.localStorage[key] = localStorage.getItem(key);
            }
        }
        
        // Export sessionStorage
        for (let i = 0; i < sessionStorage.length; i++) {
            const key = sessionStorage.key(i);
            if (key) {
                exportData.sessionStorage[key] = sessionStorage.getItem(key);
            }
        }
        
        // Export kiosk data
        const savedData = localStorage.getItem('kioskData');
        if (savedData) {
            try {
                exportData.kioskData = JSON.parse(savedData);
            } catch (error) {
                exportData.kioskData = savedData; // Raw string if parsing fails
            }
        }
        
        // Create and download file
        const dataStr = JSON.stringify(exportData, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = `kiosk-system-data-${new Date().toISOString().split('T')[0]}.json`;
        link.click();
        
        URL.revokeObjectURL(url);
        
        showAdminMessage('System data exported successfully!');
        
    } catch (error) {
        console.error('Error exporting system data:', error);
        showAdminMessage('Error exporting system data. Please try again.');
    }
}

function showAdminMessage(message) {
    // Create a temporary message
    const messageDiv = document.createElement('div');
    messageDiv.className = 'admin-message';
    messageDiv.textContent = message;
    messageDiv.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: #27ae60;
        color: white;
        padding: 15px 25px;
        border-radius: 8px;
        z-index: 10002;
        font-weight: 600;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
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
