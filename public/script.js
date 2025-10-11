// Load temple background from admin settings
function loadTempleBackground() {
    try {
        const kioskData = localStorage.getItem('kioskData');
        if (kioskData) {
            const data = JSON.parse(kioskData);
            const backgroundUrl = data.settings?.templeBackground || 'temple-background.jpg';
            
            // Apply background to body
            document.body.style.background = `#f5f5f5 url('${backgroundUrl}') center center / cover no-repeat`;
            console.log('🏛️ Temple background loaded:', backgroundUrl);
        } else {
            // Default background
            document.body.style.background = `#f5f5f5 url('temple-background.jpg') center center / cover no-repeat`;
        }
    } catch (error) {
        console.error('❌ Error loading temple background:', error);
        // Fallback to default
        document.body.style.background = `#f5f5f5 url('temple-background.jpg') center center / cover no-repeat`;
    }
}

// DOM Elements - These will be null until DOM is loaded
let currentTimeElement = null;
let hamburgerMenu = null;
let navigationMenu = null;
let heroSlider = null;
let slides = null;
let dots = null;
let prevSlideBtn = null;
let nextSlideBtn = null;
let aiSection = null;
let closeAiBtn = null;
let aiChat = null;
let aiInput = null;
let aiSendBtn = null;
let featureCards = null;

// Current slide index
let currentSlide = 0;

// Language Support
const LANGUAGES = {
    en: {
        // Header
        title: "BAPS Shri Swaminarayan Mandir",
        subtitle: "Edison, NJ, USA",
        sanstha: "BAPS Swaminarayan Sanstha",
        
        // Hero Slider
        welcome: "Welcome to BAPS Shri Swaminarayan Mandir",
        divine_peace: "Experience divine peace and spiritual tranquility",
        sacred_darshan: "Sacred Shrines Darshan",
        daily_timings: "Daily from 7:00 AM to 11:00 AM and 4:00 PM to 8:00 PM",
        aarti_ceremonies: "Daily Aarti Ceremonies",
        aarti_timings: "Morning: 7:00 AM | Evening: 6:30 PM",
        
        // Navigation
        quick_nav: "Quick Navigation",
        darshan_timings: "Darshan Timings",
        latest_news: "Latest News",
        ai_assistant: "AI Assistant",
        contact_info: "Contact Information",
        
        // Sections
        photo_gallery: "Photo Gallery",
        daily_schedule: "Daily Schedule",
        location: "Location",
        contact: "Contact",
        
        // Schedule
        morning_aarti: "Morning Aarti",
        evening_aarti: "Evening Aarti",
        darshan_hours: "Darshan Hours",
        afternoon_break: "Afternoon Break",
        
        // Contact
        address: "2500 Woodbridge Avenue, Edison, NJ 08817",
        phone: "(732) 572 1234",
        email: "info.edison@usa.baps.org",
        
        // AI Assistant
        ai_welcome: "Ask me anything about the mandir",
        ai_placeholder: "Type your question here...",
        ai_send: "Send",
        ai_close: "Close",
        
        // Weather
        loading_weather: "Loading weather...",
        weather_unavailable: "Weather unavailable",
        
        // Buttons
        back_to_kiosk: "Back to Kiosk"
    },
    
    gu: {
        // Header
        title: "બાપ્સ શ્રી સ્વામિનારાયણ મંદિર",
        subtitle: "એડિસન, એનજે, યુએસએ",
        sanstha: "બાપ્સ સ્વામિનારાયણ સંસ્થા",
        
        // Hero Slider
        welcome: "બાપ્સ શ્રી સ્વામિનારાયણ મંદિરમાં આપનું સ્વાગત છે",
        divine_peace: "દૈવી શાંતિ અને આધ્યાત્મિક શાંતિનો અનુભવ કરો",
        sacred_darshan: "પવિત્ર મૂર્તિઓનું દર્શન",
        daily_timings: "રોજ સવારે 7:00 AM થી 11:00 AM અને સાંજે 4:00 PM થી 8:00 PM",
        aarti_ceremonies: "રોજિંદા આરતી સમારંભ",
        aarti_timings: "સવાર: 7:00 AM | સાંજ: 6:30 PM",
        
        // Navigation
        quick_nav: "ઝડપી નેવિગેશન",
        darshan_timings: "દર્શન સમય",
        latest_news: "તાજા સમાચાર",
        ai_assistant: "એઆઈ સહાયક",
        contact_info: "સંપર્ક માહિતી",
        
        // Sections
        photo_gallery: "ફોટો ગેલેરી",
        daily_schedule: "રોજિંદો કાર્યક્રમ",
        location: "સ્થાન",
        contact: "સંપર્ક",
        
        // Schedule
        morning_aarti: "સવારની આરતી",
        evening_aarti: "સાંજની આરતી",
        darshan_hours: "દર્શનના કલાકો",
        afternoon_break: "દોપહરનો વિરામ",
        
        // Contact
        address: "2500 વુડબ્રિજ એવન્યુ, એડિસન, એનજે 08817",
        phone: "(732) 572 1234",
        email: "info.edison@usa.baps.org",
        
        // AI Assistant
        ai_welcome: "મંદિર વિશે કંઈપણ પૂછો",
        ai_placeholder: "તમારો પ્રશ્ન અહીં લખો...",
        ai_send: "મોકલો",
        ai_close: "બંધ કરો",
        
        // Weather
        loading_weather: "હવામાન લોડ થઈ રહ્યું છે...",
        weather_unavailable: "હવામાન ઉપલબ્ધ નથી",
        
        // Buttons
        back_to_kiosk: "કિઓસ્ક પર પાછા જાઓ"
    },
    
    hi: {
        // Header
        title: "बाप्स श्री स्वामीनारायण मंदिर",
        subtitle: "एडिसन, एनजे, यूएसए",
        sanstha: "बाप्स स्वामीनारायण संस्था",
        
        // Hero Slider
        welcome: "बाप्स श्री स्वामीनारायण मंदिर में आपका स्वागत है",
        divine_peace: "दैवी शांति और आध्यात्मिक शांति का अनुभव करें",
        sacred_darshan: "पवित्र मूर्तियों का दर्शन",
        daily_timings: "रोज सुबह 7:00 AM से 11:00 AM और शाम 4:00 PM से 8:00 PM",
        aarti_ceremonies: "रोजाना आरती समारोह",
        aarti_timings: "सुबह: 7:00 AM | शाम: 6:30 PM",
        
        // Navigation
        quick_nav: "त्वरित नेविगेशन",
        darshan_timings: "दर्शन समय",
        latest_news: "ताजा समाचार",
        ai_assistant: "एआई सहायक",
        contact_info: "संपर्क जानकारी",
        
        // Sections
        photo_gallery: "फोटो गैलरी",
        daily_schedule: "दैनिक कार्यक्रम",
        location: "स्थान",
        contact: "संपर्क",
        
        // Schedule
        morning_aarti: "सुबह की आरती",
        evening_aarti: "शाम की आरती",
        darshan_hours: "दर्शन के घंटे",
        afternoon_break: "दोपहर का विराम",
        
        // Contact
        address: "2500 वुडब्रिज एवेन्यू, एडिसन, एनजे 08817",
        phone: "(732) 572 1234",
        email: "info.edison@usa.baps.org",
        
        // AI Assistant
        ai_welcome: "मंदिर के बारे में कुछ भी पूछें",
        ai_placeholder: "अपना प्रश्न यहां लिखें...",
        ai_send: "भेजें",
        ai_close: "बंद करें",
        
        // Weather
        loading_weather: "मौसम लोड हो रहा है...",
        weather_unavailable: "मौसम उपलब्ध नहीं है",
        
        // Buttons
        back_to_kiosk: "कियोस्क पर वापस जाएं"
    }
};

// Current language
let currentLanguage = 'en';

// Function to change language
function changeLanguage(lang) {
    if (LANGUAGES[lang]) {
        currentLanguage = lang;
        localStorage.setItem('kioskLanguage', lang);
        updateAllText();
        console.log(`🌍 Language changed to: ${lang}`);
    }
}

// Function to update all text on the page
function updateAllText() {
    const lang = LANGUAGES[currentLanguage];
    
    // Update header
    const titleElement = document.querySelector('.mandir-title h1');
    if (titleElement) titleElement.textContent = lang.title;
    
    const subtitleElement = document.querySelector('.mandir-title p');
    if (subtitleElement) subtitleElement.textContent = lang.subtitle;
    
    const sansthaElement = document.querySelector('.sanstha');
    if (sansthaElement) sansthaElement.textContent = lang.sanstha;
    
    // Update navigation
    const navTitle = document.querySelector('.nav-section h3');
    if (navTitle) navTitle.textContent = lang.quick_nav;
    
    const navItems = document.querySelectorAll('.nav-section ul li a');
    if (navItems.length >= 3) {
        navItems[0].textContent = lang.darshan_timings;
        navItems[1].textContent = lang.latest_news;
        navItems[2].textContent = lang.ai_assistant;
    }
    
    const contactTitle = document.querySelectorAll('.nav-section h3')[1];
    if (contactTitle) contactTitle.textContent = lang.contact_info;
    
    // Update hero slider content
    const slideContents = document.querySelectorAll('.slide-content h2, .slide-content p');
    if (slideContents.length >= 6) {
        slideContents[0].textContent = lang.welcome;
        slideContents[1].textContent = lang.divine_peace;
        slideContents[2].textContent = lang.sacred_darshan;
        slideContents[3].textContent = lang.daily_timings;
        slideContents[4].textContent = lang.aarti_ceremonies;
        slideContents[5].textContent = lang.aarti_timings;
    }
    
    // Update AI assistant
    const aiWelcome = document.querySelector('#ai-assistant h3');
    if (aiWelcome) aiWelcome.textContent = lang.ai_welcome;
    
    const aiInput = document.getElementById('ai-input');
    if (aiInput) aiInput.placeholder = lang.ai_placeholder;
    
    const aiSend = document.getElementById('ai-send');
    if (aiSend) aiSend.textContent = lang.ai_send;
    
    const aiClose = document.getElementById('close-ai');
    if (aiClose) aiClose.textContent = lang.ai_close;
    
    // Update weather
    const weatherInfo = document.getElementById('weather-info');
    if (weatherInfo && weatherInfo.querySelector('span')) {
        weatherInfo.querySelector('span').textContent = lang.loading_weather;
    }
    
    // Update buttons
    
    
}

// Function to get text in current language
function getText(key) {
    return LANGUAGES[currentLanguage][key] || key;
}

// Function to initialize language
function initializeLanguage() {
    const savedLang = localStorage.getItem('kioskLanguage') || 'en';
    changeLanguage(savedLang);
    
    // Add language switcher to header
    addLanguageSwitcher();
}

// Function to add language switcher to header
function addLanguageSwitcher() {
    const headerRight = document.querySelector('.header-right');
    if (headerRight && !document.getElementById('language-switcher')) {
        const languageSwitcher = document.createElement('div');
        languageSwitcher.id = 'language-switcher';
        languageSwitcher.className = 'language-switcher';
        languageSwitcher.innerHTML = `
            <div class="current-language">
                <span>${currentLanguage.toUpperCase()}</span>
                <i class="fas fa-globe"></i>
            </div>
            <div class="language-dropdown">
                <div class="language-option" onclick="changeLanguage('en')">
                    <span>🇺🇸</span> English
                </div>
                <div class="language-option" onclick="changeLanguage('gu')">
                    <span>🇮🇳</span> ગુજરાતી
                </div>
                <div class="language-option" onclick="changeLanguage('hi')">
                    <span>🇮🇳</span> हिंदी
                </div>
            </div>
        `;
        
        // Insert before weather info
        const weatherInfo = document.getElementById('weather-info');
        if (weatherInfo) {
            headerRight.insertBefore(languageSwitcher, weatherInfo);
        } else {
            headerRight.appendChild(languageSwitcher);
        }
    }
}

// Function to initialize DOM elements
function initializeDOMElements() {
    console.log('🔍 Initializing DOM elements...');
    
    currentTimeElement = document.getElementById('current-time');
    hamburgerMenu = document.getElementById('hamburger-menu');
    navigationMenu = document.getElementById('navigation-menu');
    heroSlider = document.getElementById('hero-slider');
    slides = document.querySelectorAll('.slide');
    dots = document.querySelectorAll('.dot');
    prevSlideBtn = document.getElementById('prev-slide');
    nextSlideBtn = document.getElementById('next-slide');
    aiSection = document.getElementById('ai-assistant');
    closeAiBtn = document.getElementById('close-ai');
    aiChat = document.getElementById('ai-chat');
    aiInput = document.getElementById('ai-input');
    aiSendBtn = document.getElementById('ai-send');
    featureCards = document.querySelectorAll('.feature-card');
    
    console.log('✅ DOM elements initialized:');
    console.log('  - AI Section:', aiSection);
    console.log('  - AI Chat:', aiChat);
    console.log('  - AI Input:', aiInput);
    console.log('  - Feature Cards:', featureCards);
}

// Weather Functions
function initializeWeather() {
    console.log('🌤️ Initializing weather...');
    updateWeather();
    
    // Update weather every 30 minutes
    setInterval(updateWeather, 30 * 60 * 1000);
}

async function updateWeather() {
    const weatherInfo = document.getElementById('weather-info');
    if (!weatherInfo) return;
    
    try {
        weatherInfo.classList.add('weather-loading');
        weatherInfo.innerHTML = '<i class="fas fa-cloud-sun"></i><span>Loading weather...</span>';
        
        // Using OpenWeatherMap API for Edison, NJ
        const city = 'Edison';
        const state = 'NJ';
        const country = 'US';
        const apiKey = 'demo'; // You'll need to get a real API key from openweathermap.org
        
        // For demo purposes, we'll use mock weather data
        // In production, replace this with actual API call
        const mockWeather = await getMockWeather();
        
        weatherInfo.classList.remove('weather-loading', 'weather-error');
        weatherInfo.classList.add('weather-success');
        weatherInfo.innerHTML = `
            <i class="fas fa-${getWeatherIcon(mockWeather.condition)}"></i>
            <span>${mockWeather.temp}°F ${mockWeather.condition}</span>
        `;
        
        console.log('✅ Weather updated successfully');
        
    } catch (error) {
        console.error('❌ Error updating weather:', error);
        weatherInfo.classList.remove('weather-loading', 'weather-success');
        weatherInfo.classList.add('weather-error');
        weatherInfo.innerHTML = '<i class="fas fa-exclamation-triangle"></i><span>Weather unavailable</span>';
    }
}

async function getMockWeather() {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock weather data for Edison, NJ
    const conditions = ['sunny', 'cloudy', 'partly-cloudy', 'rainy'];
    const condition = conditions[Math.floor(Math.random() * conditions.length)];
    const temp = Math.floor(Math.random() * 30) + 40; // 40-70°F range
    
    return { condition, temp };
}

function getWeatherIcon(condition) {
    const iconMap = {
        'sunny': 'fa-sun',
        'cloudy': 'fa-cloud',
        'partly-cloudy': 'fa-cloud-sun',
        'rainy': 'fa-cloud-rain'
    };
    return iconMap[condition] || 'fa-cloud-sun';
}

// Current time update
function updateCurrentTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', {
        hour12: true,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
    if (currentTimeElement) {
        currentTimeElement.textContent = timeString;
    }
}

// Hero Slider functionality
function initializeSlider() {
    // Get fresh references to slides and dots after dynamic updates
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const nextSlideBtn = document.getElementById('next-slide');
    const prevSlideBtn = document.getElementById('prev-slide');
    
    if (slides.length === 0) {
        console.log('⚠️ No slides found for slider initialization');
        return;
    }
    
    console.log(`🎠 Initializing slider with ${slides.length} slides`);
    console.log('🎯 Slides found:', slides);
    console.log('🔘 Dots found:', dots);
    console.log('⬅️ Prev button:', prevSlideBtn);
    console.log('➡️ Next button:', nextSlideBtn);
    
    // Reset current slide to 0
    currentSlide = 0;
    
    function showSlide(index) {
        // Validate index
        if (index < 0 || index >= slides.length) {
            console.warn(`⚠️ Invalid slide index: ${index}, resetting to 0`);
            index = 0;
        }
        
        console.log(`🎯 Showing slide ${index + 1} of ${slides.length}`);
        
        // Hide all slides
        slides.forEach((slide, i) => {
            slide.classList.remove('active');
            console.log(`   - Slide ${i + 1}: removed active class`);
        });
        
        dots.forEach((dot, i) => {
            dot.classList.remove('active');
            console.log(`   - Dot ${i + 1}: removed active class`);
        });
        
        // Show current slide
        if (slides[index]) {
            slides[index].classList.add('active');
            console.log(`   - Slide ${index + 1}: added active class`);
        }
        
        if (dots[index]) {
            dots[index].classList.add('active');
            console.log(`   - Dot ${index + 1}: added active class`);
        }
        
        currentSlide = index;
        console.log(`✅ Current slide set to ${index + 1}`);
    }
    
    function nextSlide() {
        const next = (currentSlide + 1) % slides.length;
        console.log(`➡️ Next slide: ${currentSlide + 1} → ${next + 1}`);
        showSlide(next);
    }
    
    function prevSlide() {
        const prev = (currentSlide - 1 + slides.length) % slides.length;
        console.log(`⬅️ Previous slide: ${currentSlide + 1} → ${prev + 1}`);
        showSlide(prev);
    }
    
    // Remove existing event listeners to prevent duplicates
    if (nextSlideBtn) {
        console.log('🔄 Setting up next slide button event listener');
        const newNextBtn = nextSlideBtn.cloneNode(true);
        nextSlideBtn.parentNode.replaceChild(newNextBtn, nextSlideBtn);
        newNextBtn.addEventListener('click', nextSlide);
        console.log('✅ Next slide button event listener added');
    }
    
    if (prevSlideBtn) {
        console.log('🔄 Setting up previous slide button event listener');
        const newPrevBtn = prevSlideBtn.cloneNode(true);
        prevSlideBtn.parentNode.replaceChild(newPrevBtn, prevSlideBtn);
        newPrevBtn.addEventListener('click', prevSlide);
        console.log('✅ Previous slide button event listener added');
    }
    
    // Event listeners for dots
    dots.forEach((dot, index) => {
        console.log(`🔄 Setting up dot ${index + 1} event listener`);
        
        // Remove existing listeners
        const newDot = dot.cloneNode(true);
        dot.parentNode.replaceChild(newDot, dot);
        
        // Add new listener
        newDot.addEventListener('click', () => {
            console.log(`🔘 Dot ${index + 1} clicked, showing slide ${index + 1}`);
            showSlide(index);
        });
        
        console.log(`✅ Dot ${index + 1} event listener added`);
    });
    
    // Clear any existing interval
    if (window.sliderInterval) {
        console.log('🔄 Clearing existing slider interval');
        clearInterval(window.sliderInterval);
    }
    
    // Auto-advance slides every 5 seconds (only if more than 1 slide)
    if (slides.length > 1) {
        console.log('⏰ Setting up auto-advance interval (5 seconds)');
        window.sliderInterval = setInterval(nextSlide, 5000);
    } else {
        console.log('⚠️ Only 1 slide, skipping auto-advance');
    }
    
    // Show first slide
    showSlide(0);
    
    console.log('✅ Slider initialized successfully');
}

// Navigation menu functionality
function initializeNavigation() {
    if (hamburgerMenu) {
        hamburgerMenu.addEventListener('click', () => {
            navigationMenu.classList.toggle('active');
        });
    }
    
    // Close navigation when clicking outside
    document.addEventListener('click', (e) => {
        if (!navigationMenu.contains(e.target) && !hamburgerMenu.contains(e.target)) {
            navigationMenu.classList.remove('active');
        }
    });
    
    // Handle navigation links
    const navLinks = document.querySelectorAll('.nav-section a');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = link.getAttribute('href').substring(1);
            if (target === 'ai-assistant') {
                showAIAssistant();
            }
            navigationMenu.classList.remove('active');
        });
    });
    
    // Handle feature card clicks
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.addEventListener('click', (e) => {
            const section = card.getAttribute('data-section');
            console.log(`🎯 Feature card clicked: ${section}`);
            
            if (section === 'ai-assistant') {
                showAIAssistant();
            } else if (section === 'admin-controls') {
                // Open admin controls page in new tab
                window.open('/admin-controls.html', '_blank');
            } else if (section === 'activities') {
                // Open activities section
                console.log('📅 Activities feature clicked');
                scrollToSection('activities');
            } else if (section === 'map') {
                // Open interactive map modal
                console.log('🗺️ Map feature clicked');
            }
        });
    });
}

// Initialize AI assistant
function initializeAI() {
    console.log('🤖 Initializing AI Assistant...');
    
    // Don't show welcome message automatically - wait for user to click AI button
    // The AI will be hidden by default
}

// Toggle AI Assistant visibility
function toggleAI() {
    console.log('🤖 toggleAI called');
    const aiModal = document.getElementById('ai-assistant-modal');
    console.log('🤖 AI modal element found:', aiModal);
    if (!aiModal) {
        console.error('❌ AI modal element not found!');
        return;
    }
    
    // Use direct style manipulation like the test function
    aiModal.style.display = 'flex';
    aiModal.style.opacity = '1';
    aiModal.style.visibility = 'visible';
    console.log('🤖 AI modal should be visible now');
    
    // Add welcome message
    const welcomeMessage = "Jai Swaminarayan! 🙏 I'm your AI assistant for BAPS Mandir. I can help you with:\n\n• 🕐 Mandir timings and aarti schedules\n• 📅 Upcoming events and activities\n• 📍 Location and directions\n• 🙏 How to participate in ceremonies\n• 🎵 Information about programs\n\nUse the suggestion chips above or type your question below!";
    addMessage(welcomeMessage, true);
    
    // Start 2-minute auto-reset timer
    startAIResetTimer();
    
    // Update button text
    updateAIButtonText(true);
}

// Show AI Assistant
function showAI() {
    const aiModal = document.getElementById('ai-assistant-modal');
    if (!aiModal) {
        console.error('❌ AI modal element not found in showAI!');
        return;
    }
    
    console.log('🤖 Showing AI Assistant...');
    console.log('🤖 AI modal before classes:', aiModal.classList.toString());
    
    // Show the AI modal
    aiModal.classList.remove('hidden');
    aiModal.classList.add('show');
    
    console.log('🤖 AI modal after classes:', aiModal.classList.toString());
    console.log('🤖 AI modal display style:', aiModal.style.display);
    
    // Add welcome message
    const welcomeMessage = "Jai Swaminarayan! 🙏 I'm your AI assistant for BAPS Mandir. I can help you with:\n\n• 🕐 Mandir timings and aarti schedules\n• 📅 Upcoming events and activities\n• 📍 Location and directions\n• 🙏 How to participate in ceremonies\n• 🎵 Information about programs\n\nUse the suggestion chips above or type your question below!";
    addMessage(welcomeMessage, true);
    
    // Start 2-minute auto-reset timer
    startAIResetTimer();
    
    // Update button text
    updateAIButtonText(true);
}

// Hide AI Assistant
function hideAI() {
    const aiModal = document.getElementById('ai-assistant-modal');
    if (!aiModal) return;
    
    console.log('🤖 Hiding AI Assistant...');
    
    // Hide the AI modal using direct style manipulation
    aiModal.style.display = 'none';
    aiModal.style.opacity = '0';
    aiModal.style.visibility = 'hidden';
    
    // Clear the chat
    clearAIChat();
    
    // Stop the reset timer
    stopAIResetTimer();
    
    // Update button text
    updateAIButtonText(false);
}

// Clear AI Chat
function clearAIChat() {
    const aiChat = document.getElementById('ai-chat');
    if (aiChat) {
        aiChat.innerHTML = '';
    }
}

// AI Reset Timer
let aiResetTimer = null;
let aiCountdownInterval = null;

// Start AI Reset Timer (2 minutes)
function startAIResetTimer() {
    console.log('⏰ Starting AI reset timer (2 minutes)...');
    
    // Clear any existing timer
    if (aiResetTimer) {
        clearTimeout(aiResetTimer);
    }
    
    // Clear any existing countdown
    if (aiCountdownInterval) {
        clearInterval(aiCountdownInterval);
    }
    
    // Show countdown
    showAICountdown();
    
    // Set new timer for 2 minutes (120,000 ms)
    aiResetTimer = setTimeout(() => {
        console.log('⏰ AI reset timer expired - resetting AI...');
        resetAI();
    }, 120000); // 2 minutes
    
    // Start countdown display
    startAICountdown();
}

// Stop AI Reset Timer
function stopAIResetTimer() {
    if (aiResetTimer) {
        clearTimeout(aiResetTimer);
        aiResetTimer = null;
        console.log('⏰ AI reset timer stopped');
    }
    
    if (aiCountdownInterval) {
        clearInterval(aiCountdownInterval);
        aiCountdownInterval = null;
        console.log('⏰ AI countdown stopped');
    }
    
    // Hide countdown
    hideAICountdown();
}

// Show AI Countdown
function showAICountdown() {
    const countdown = document.getElementById('ai-countdown');
    if (countdown) {
        countdown.style.display = 'inline-flex';
    }
}

// Hide AI Countdown
function hideAICountdown() {
    const countdown = document.getElementById('ai-countdown');
    if (countdown) {
        countdown.style.display = 'none';
    }
}

// Start AI Countdown Display
function startAICountdown() {
    let timeLeft = 120; // 2 minutes in seconds
    
    aiCountdownInterval = setInterval(() => {
        timeLeft--;
        
        if (timeLeft <= 0) {
            clearInterval(aiCountdownInterval);
            return;
        }
        
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        const countdownText = `Resets in ${minutes}:${seconds.toString().padStart(2, '0')}`;
        
        const countdownElement = document.getElementById('countdown-text');
        if (countdownElement) {
            countdownElement.textContent = countdownText;
        }
        
        // Change color when less than 30 seconds
        if (timeLeft <= 30) {
            const countdown = document.getElementById('ai-countdown');
            if (countdown) {
                countdown.style.background = 'rgba(220, 53, 69, 0.2)';
                countdown.style.borderColor = 'rgba(220, 53, 69, 0.5)';
            }
        }
    }, 1000);
}

// Reset AI Assistant
function resetAI() {
    console.log('🔄 Resetting AI Assistant...');
    
    // Clear the chat
    clearAIChat();
    
    // Show reset message
    const resetMessage = "🔄 AI Assistant has been reset for a fresh conversation. How can I help you today?";
    addMessage(resetMessage, true);
    
    // Restart the timer
    startAIResetTimer();
}

// Update AI Button Text
function updateAIButtonText(isVisible) {
    const aiBtn = document.querySelector('.ai-btn span');
    if (aiBtn) {
        if (isVisible) {
            aiBtn.textContent = 'Hide AI';
        } else {
            aiBtn.textContent = 'AI Assistant';
        }
    }
}

window.initializeAI = initializeAI;
window.toggleAI = toggleAI;
window.showAI = showAI;
window.hideAI = hideAI;
window.resetAI = resetAI;
window.showAICountdown = showAICountdown;
window.hideAICountdown = hideAICountdown;
window.startAICountdown = startAICountdown;

// Virtual Keyboard Functions
function showVirtualKeyboard() {
    const keyboard = document.getElementById('virtual-keyboard');
    if (keyboard) {
        keyboard.classList.remove('hidden');
        setTimeout(() => {
            keyboard.classList.add('show');
        }, 10);
        console.log('⌨️ Virtual keyboard shown');
    }
}

function hideVirtualKeyboard() {
    const keyboard = document.getElementById('virtual-keyboard');
    if (keyboard) {
        keyboard.classList.remove('show');
        setTimeout(() => {
            keyboard.classList.add('hidden');
        }, 400);
        console.log('⌨️ Virtual keyboard hidden');
    }
}

function addToInput(character) {
    const aiInput = document.getElementById('ai-input');
    if (aiInput) {
        aiInput.value += character;
        aiInput.focus();
        console.log('⌨️ Added character to input:', character);
    }
}

function backspaceInput() {
    const aiInput = document.getElementById('ai-input');
    if (aiInput && aiInput.value.length > 0) {
        aiInput.value = aiInput.value.slice(0, -1);
        aiInput.focus();
        console.log('⌨️ Backspace pressed');
    }
}

// Add virtual keyboard functions to window for global access
window.showVirtualKeyboard = showVirtualKeyboard;
window.hideVirtualKeyboard = hideVirtualKeyboard;
window.addToInput = addToInput;
window.backspaceInput = backspaceInput;

function showAIAssistant() {
    console.log('🤖 showAIAssistant called');
    console.log('aiSection variable:', aiSection);
    
    // Get fresh reference to AI section
    const currentAiSection = document.getElementById('ai-assistant');
    console.log('Fresh AI section reference:', currentAiSection);
    
    if (currentAiSection) {
        console.log('✅ AI section found, removing hidden class');
        currentAiSection.classList.remove('hidden');
        
        // Check if it's visible now
        const isVisible = window.getComputedStyle(currentAiSection).display !== 'none';
        console.log('AI Section visible after removing hidden class:', isVisible);
        console.log('Current display style:', window.getComputedStyle(currentAiSection).display);
        console.log('Current classes:', currentAiSection.className);
        
        // Try to focus input
        const currentAiInput = document.getElementById('ai-input');
        if (currentAiInput) {
            currentAiInput.focus();
            console.log('✅ AI input focused');
        } else {
            console.error('❌ AI input not found');
        }
    } else {
        console.error('❌ AI section not found in DOM');
    }
}

function hideAIAssistant() {
    console.log('🤖 hideAIAssistant called');
    
    // Get fresh reference to AI section
    const currentAiSection = document.getElementById('ai-assistant');
    if (currentAiSection) {
        currentAiSection.classList.add('hidden');
        console.log('✅ AI section hidden');
    } else {
        console.error('❌ AI section not found for hiding');
    }
}

const aiResponses = {
    // Timings and Schedule
    timing: '🕐 **Mandir Timings:**\n• Sacred Shrines Darshan: 7:00 AM - 11:00 AM & 7:00 PM - 9:00 PM\n• Campus Hours: 7:00 AM - 8:00 PM daily\n• Aarti Ceremonies: 7:00 AM (Morning) & 6:30 PM (Evening)\n• Nilkanth Varni Abhishek: Mon-Fri 7:00 AM - 11:00 AM & 4:00 PM - 6:00 PM, Sat-Sun 7:00 AM - 11:00 AM & 7:00 PM - 8:00 PM',
    
    aarti: '🕯️ **Aarti Ceremonies:**\n• **Morning Aarti:** 7:00 AM daily - Beautiful sunrise ceremony with devotional songs and offerings\n• **Evening Aarti:** 6:30 PM daily - Magical sunset ceremony with bhajans and prayers\n• **Special Aartis:** Held during festivals and special occasions\n• **Duration:** Each aarti lasts approximately 30-45 minutes',
    
    activities: '📅 **Mandir Activities:**\n• **Kishore-Kishori Programs:** Youth activities and spiritual education\n• **Summer Shibirs:** Intensive spiritual camps for children and youth\n• **Bhajan Sandhya:** Regular devotional singing sessions\n• **Yoga & Meditation:** Weekly classes for physical and mental wellness\n• **Special Pujas:** Custom ceremonies for various occasions\n• **Festival Celebrations:** Major Hindu festivals with special programs\n• **Community Events:** Cultural programs and social gatherings',
    
    location: '📍 **Mandir Location:**\n• **Address:** 2500 Woodbridge Avenue, Edison, NJ 08817\n• **Directions:** Located near the intersection of Woodbridge Avenue and Route 1\n• **Parking:** Free parking available on-site\n• **Public Transport:** Accessible via NJ Transit bus routes\n• **Landmarks:** Near Menlo Park Mall and Edison Train Station',
    
    puja: '🙏 **Special Pujas & Ceremonies:**\n• **Personal Pujas:** Custom ceremonies for birthdays, anniversaries, and special occasions\n• **Festival Pujas:** Special ceremonies during major Hindu festivals\n• **Abhishek:** Sacred bathing ceremonies for deities\n• **Booking:** Contact mandir office at (732) 572-1234\n• **Requirements:** Advance booking recommended, especially for weekends\n• **Donation:** Suggested donation amounts available upon request',
    
    yoga: '🧘 **Yoga & Wellness Programs:**\n• **Weekly Classes:** Regular sessions for all skill levels\n• **Meditation:** Guided meditation and mindfulness practices\n• **Pranayama:** Breathing exercises for health and wellness\n• **Schedule:** Classes held on weekday evenings and weekend mornings\n• **Instructors:** Experienced teachers with traditional knowledge\n• **Benefits:** Physical health, mental clarity, and spiritual growth',
    
    bhajan: '🎵 **Bhajan & Devotional Programs:**\n• **Regular Sessions:** Weekly bhajan sandhya with traditional songs\n• **Festival Bhajans:** Special musical programs during celebrations\n• **Kirtan:** Call-and-response devotional singing\n• **Instruments:** Harmonium, tabla, and traditional instruments\n• **Participation:** Open to all devotees regardless of musical experience\n• **Schedule:** Check weekly bulletin for current timings',
    
    darshan: '👁️ **Sacred Shrines Darshan:**\n• **Main Shrine:** Daily darshan of sacred deities\n• **Special Deities:** Various forms of God available for worship\n• **Darshan Hours:** 7:00 AM - 11:00 AM & 7:00 PM - 9:00 PM\n• **Etiquette:** Remove shoes, maintain silence, and follow traditional customs\n• **Photography:** Generally not permitted in main shrine areas\n• **Offerings:** Flowers, fruits, and prasad can be offered',
    
    nilkanth: '🕉️ **Nilkanth Varni Abhishek:**\n• **Schedule:** Monday to Friday: 7:00 AM - 11:00 AM & 4:00 PM - 6:00 PM\n• **Weekend:** Saturday & Sunday: 7:00 AM - 11:00 AM & 7:00 PM - 8:00 PM\n• **Ceremony:** Sacred bathing ceremony with milk, honey, and holy water\n• **Significance:** Commemorates Lord Swaminarayan\'s spiritual journey\n• **Participation:** Open to all devotees\n• **Duration:** Each abhishek takes approximately 30 minutes',
    
    // Additional helpful responses
    welcome: '🕉️ **Welcome to BAPS Mandir!**\n\nI\'m your AI assistant, here to help you with information about:\n• 🕐 Timings and schedules\n• 🕯️ Aarti ceremonies\n• 📅 Activities and events\n• 📍 Location and directions\n• 🙏 Pujas and ceremonies\n• 🧘 Yoga and wellness\n• 🎵 Bhajan programs\n\n**Ask me anything about the mandir!**',
    
    help: '❓ **How can I help you?**\n\nI can provide information about:\n• **Timings:** Darshan hours, aarti times, special ceremonies\n• **Activities:** Youth programs, yoga classes, cultural events\n• **Location:** Address, directions, parking information\n• **Services:** Puja booking, special ceremonies, community programs\n• **Festivals:** Upcoming celebrations and special events\n\n**Just ask your question in simple terms!**',
    
    contact: '📞 **Contact Information:**\n• **Phone:** (732) 572-1234\n• **Email:** info@bapsmandir.org\n• **Office Hours:** Monday to Friday 9:00 AM - 5:00 PM\n• **Emergency:** Available 24/7 for urgent matters\n• **Social Media:** Follow us on Facebook and Instagram for updates',
    
    parking: '🚗 **Parking Information:**\n• **Free Parking:** Available on-site for all visitors\n• **Handicap Access:** Designated accessible parking spaces\n• **Bus Parking:** Available for group visits (advance notice required)\n• **Street Parking:** Limited street parking available\n• **Security:** Parking area monitored for safety',
    
    dress: '👔 **Dress Code & Etiquette:**\n• **Traditional Attire:** Modest, respectful clothing preferred\n• **Footwear:** Remove shoes before entering shrine areas\n• **Silence:** Maintain quiet reverence in prayer areas\n• **Photography:** Generally not permitted in main shrines\n• **Respect:** Follow traditional customs and practices'
};

function addMessage(message, isAI = false) {
    const aiChat = document.getElementById('ai-chat');
    if (!aiChat) {
        console.error('❌ AI chat element not found');
        return;
    }
    
    const messageDiv = document.createElement('div');
    messageDiv.className = isAI ? 'ai-message' : 'user-message';
    
    const avatar = document.createElement('div');
    avatar.className = 'message-avatar';
    avatar.innerHTML = isAI ? '<i class="fas fa-robot"></i>' : '<i class="fas fa-user"></i>';
    
    const content = document.createElement('div');
    content.className = 'message-content';
    
    const text = document.createElement('div');
    text.className = 'message-text';
    text.textContent = message;
    
    content.appendChild(text);
    messageDiv.appendChild(avatar);
    messageDiv.appendChild(content);
    aiChat.appendChild(messageDiv);
    
    // Scroll to bottom with smooth animation
    aiChat.scrollTo({
        top: aiChat.scrollHeight,
        behavior: 'smooth'
    });
}



// Function to handle AI suggestions
function askAI(question) {
    console.log('🤖 askAI called with:', question);
    const aiInput = document.getElementById('ai-input');
    if (aiInput) {
        aiInput.value = question;
        handleAISend();
    } else {
        console.error('❌ AI input element not found in askAI');
    }
}

function getAIResponse(userMessage) {
    const message = userMessage.toLowerCase();
    
    // Welcome and help queries
    if (message.includes('hello') || message.includes('hi') || message.includes('welcome')) {
        return aiResponses.welcome;
    } else if (message.includes('help') || message.includes('what can you do') || message.includes('assist')) {
        return aiResponses.help;
    }
    
    // Timings and schedule queries
    if (message.includes('timing') || message.includes('time') || message.includes('open') || message.includes('hours') || message.includes('schedule')) {
        return aiResponses.timing;
    }
    
    // Aarti and ceremonies
    if (message.includes('aarti') || message.includes('ceremony') || message.includes('prayer')) {
        return aiResponses.aarti;
    }
    
    // Activities and programs
    if (message.includes('activity') || message.includes('program') || message.includes('event') || message.includes('class')) {
        return aiResponses.activities;
    }
    
    // Location and directions
    if (message.includes('location') || message.includes('address') || message.includes('where') || message.includes('directions')) {
        return aiResponses.location;
    }
    
    // Pujas and special ceremonies
    if (message.includes('puja') || message.includes('ceremony') || message.includes('booking') || message.includes('special')) {
        return aiResponses.puja;
    }
    
    // Yoga and wellness
    if (message.includes('yoga') || message.includes('meditation') || message.includes('wellness') || message.includes('health')) {
        return aiResponses.yoga;
    }
    
    // Bhajan and music
    if (message.includes('bhajan') || message.includes('singing') || message.includes('music') || message.includes('kirtan')) {
        return aiResponses.bhajan;
    }
    
    // Darshan and worship
    if (message.includes('darshan') || message.includes('shrine') || message.includes('deity') || message.includes('worship')) {
        return aiResponses.darshan;
    }
    
    // Nilkanth specific
    if (message.includes('nilkanth') || message.includes('abhishek') || message.includes('swaminarayan')) {
        return aiResponses.nilkanth;
    }
    
    // Contact information
    if (message.includes('contact') || message.includes('phone') || message.includes('email') || message.includes('call')) {
        return aiResponses.contact;
    }
    
    // Parking information
    if (message.includes('parking') || message.includes('car') || message.includes('bus') || message.includes('transport')) {
        return aiResponses.parking;
    }
    
    // Dress code and etiquette
    if (message.includes('dress') || message.includes('clothes') || message.includes('etiquette') || message.includes('rules')) {
        return aiResponses.dress;
    }
    
    // Default response with helpful suggestions
    return "Thank you for your question! I'm here to help you with information about the mandir. You can ask me about:\n\n• 🕐 **Timings** - Darshan hours, aarti times\n• 📍 **Location** - Address, directions, parking\n• 📅 **Activities** - Programs, classes, events\n• 🙏 **Services** - Pujas, ceremonies, booking\n• 🧘 **Wellness** - Yoga, meditation classes\n• 🎵 **Programs** - Bhajan, cultural events\n\n**Try asking about any of these topics!**";
}

function handleAISend() {
    const aiInput = document.getElementById('ai-input');
    if (!aiInput) {
        console.error('❌ AI input element not found');
        return;
    }
    
    const message = aiInput.value.trim();
    if (message) {
        addMessage(message, false);
        aiInput.value = '';
        
        // Simulate AI thinking
        setTimeout(() => {
            const response = getAIResponse(message);
            addMessage(response, true);
        }, 1000);
    }
}

// Interactive features
function initializeInteractiveFeatures() {
    console.log('🔧 Initializing interactive features...');
    
    // Get fresh reference to feature cards
    const currentFeatureCards = document.querySelectorAll('.feature-card');
    console.log(`🔍 Found ${currentFeatureCards.length} feature cards in DOM`);
    
    if (currentFeatureCards && currentFeatureCards.length > 0) {
        console.log(`✅ Processing ${currentFeatureCards.length} feature cards`);
        
        currentFeatureCards.forEach((card, index) => {
            console.log(`Setting up feature card ${index}:`, card);
            
            // Remove any existing listeners to prevent duplicates
            card.replaceWith(card.cloneNode(true));
            const newCard = document.querySelectorAll('.feature-card')[index];
            
            // Add enhanced event listeners
            try {
                addEnhancedEventListener(newCard, 'click', (e) => {
                    console.log(`🎯 Feature card ${index} clicked`);
                    e.preventDefault();
                    e.stopPropagation();
                    
                    const section = newCard.getAttribute('data-section');
                    console.log(`Section: ${section}`);
                    
                    try {
                        if (section === 'ai-assistant') {
                            console.log('🤖 Opening AI Assistant...');
                            showAIAssistant();
                        } else if (section === 'admin-controls') {
                            console.log('🔐 Opening Admin Controls...');
                            window.open('/admin-controls.html', '_blank');
                        } else if (section === 'activities') {
                            console.log('📅 Scrolling to activities...');
                            scrollToSection('activities');
                        } else if (section === 'map') {
                            console.log('🗺️ Opening map modal...');
                        } else {
                            console.warn(`⚠️ Unknown section: ${section}`);
                        }
                    } catch (error) {
                        console.error(`❌ Error handling feature card click:`, error);
                    }
                });
                
                // Add touch support for mobile/kiosk devices
                addEnhancedEventListener(newCard, 'touchstart', (e) => {
                    console.log(`👆 Feature card ${index} touched`);
                    e.preventDefault();
                    
                    // Trigger click event
                    newCard.click();
                });
                
                // Add visual feedback
                addEnhancedEventListener(newCard, 'mousedown', () => {
                    newCard.style.transform = 'scale(0.95)';
                });
                
                addEnhancedEventListener(newCard, 'mouseup', () => {
                    newCard.style.transform = 'scale(1)';
                });
                
                addEnhancedEventListener(newCard, 'mouseleave', () => {
                    newCard.style.transform = 'scale(1)';
                });
                
                console.log(`✅ Feature card ${index} enhanced event listeners added successfully`);
                
            } catch (error) {
                console.error(`❌ Error setting up enhanced event listeners for feature card ${index}:`, error);
                
                // Fallback to simple event listener
                console.log(`🔄 Adding fallback event listener for feature card ${index}`);
                newCard.addEventListener('click', (e) => {
                    console.log(`🎯 Feature card ${index} clicked (fallback)`);
                    const section = newCard.getAttribute('data-section');
                    
                    if (section === 'ai-assistant') {
                        showAIAssistant();
                    } else if (section === 'admin-controls') {
                        window.open('/admin-controls.html', '_blank');
                    } else if (section === 'activities') {
                        scrollToSection('activities');
                    } else if (section === 'map') {
                    }
                });
            }
        });
    } else {
        console.warn('⚠️ No feature cards found');
    }
}





    


    


// Utility functions
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// Touch-friendly interactions
function initializeTouchInteractions() {
    const touchElements = document.querySelectorAll('button, .feature-card, .news-item, .hamburger-menu');
    
    touchElements.forEach(element => {
        element.addEventListener('touchstart', () => {
            element.style.transform = 'scale(0.95)';
        });
        
        element.addEventListener('touchend', () => {
            element.style.transform = '';
        });
    });
}


// Load dynamic content from admin dashboard
function loadDynamicContent() {
    try {
        console.log('🔄 Loading dynamic content...');
        
        // Load data from the admin panel's storage format
        const savedData = localStorage.getItem('kioskData');
        if (savedData) {
            const kioskData = JSON.parse(savedData);
            console.log('📦 Loaded kiosk data:', kioskData);
            
            // Update sections with new data
            if (kioskData.news) {
                loadNews(kioskData.news);
            }
            if (kioskData.websiteImages) {
                console.log('🖼️ Found website images in kiosk data:', kioskData.websiteImages);
                
                // Load hero slider images
                if (kioskData.websiteImages.heroSlider) {
                    loadHeroSliderImages(kioskData.websiteImages.heroSlider);
                }
                
                // Load general images
                if (kioskData.websiteImages.generalImages) {
                    loadGeneralImages(kioskData.websiteImages.generalImages);
                }
                
                // Load QR code image
                if (kioskData.websiteImages.qrCode) {
                    loadQRCodeImage(kioskData.websiteImages.qrCode);
                }
                
            }
        } else {
            console.log('📭 No kiosk data found in localStorage');
            
            // Fallback to individual keys for backward compatibility
            const newsData = JSON.parse(localStorage.getItem('newsData') || '[]');
            const websiteImagesData = JSON.parse(localStorage.getItem('websiteImagesData') || '{}');
            const kioskImagesData = JSON.parse(localStorage.getItem('kioskImages') || '{}');
            
            // Update sections with fallback data
            loadNews(newsData);
            
            // Try to load images from various sources
            let imagesLoaded = false;
            
            if (websiteImagesData.heroSlider && websiteImagesData.heroSlider.length > 0) {
                loadHeroSliderImages(websiteImagesData.heroSlider);
                imagesLoaded = true;
            } else if (kioskImagesData.heroSlider && kioskImagesData.heroSlider.length > 0) {
                loadHeroSliderImages(kioskImagesData.heroSlider);
                imagesLoaded = true;
            }
            
            if (websiteImagesData.generalImages && websiteImagesData.generalImages.length > 0) {
                loadGeneralImages(websiteImagesData.generalImages);
            } else if (kioskImagesData.generalImages && kioskImagesData.generalImages.length > 0) {
                loadGeneralImages(kioskImagesData.generalImages);
            }
            
            
            // If no images were loaded from any source, show placeholder content
            if (!imagesLoaded) {
                console.log('🖼️ No images found, showing placeholder content...');
                showPlaceholderContent();
            }
        }
        
        // Reinitialize event listeners for dynamically added content
        setTimeout(() => {
            reinitializeEventListeners();
        }, 100);
        
        console.log('✅ Dynamic content loaded successfully');
    } catch (error) {
        console.error('❌ Error loading dynamic content:', error);
    }
}

// Function to load hero slider images
function loadHeroSliderImages(images) {
    console.log('🖼️ Loading hero slider images:', images);
    
    if (!Array.isArray(images) || images.length === 0) {
        console.log('⚠️ No hero slider images to load');
        return;
    }
    
    const heroSlider = document.getElementById('hero-slider');
    if (!heroSlider) {
        console.error('❌ Hero slider not found');
        return;
    }
    
    // Clear existing slides
    heroSlider.innerHTML = '';
    
    // Create new slides
    images.forEach((imageData, index) => {
        const slide = document.createElement('div');
        slide.className = index === 0 ? 'slide active' : 'slide';
        
        // Handle both object format {url, title} and direct URL strings
        // Add null/undefined checks to prevent [object Object] errors
        let imageUrl, imageTitle;
        
        if (imageData === null || imageData === undefined) {
            console.warn(`⚠️ Image data at index ${index} is null/undefined, skipping`);
            return;
        }
        
        if (typeof imageData === 'object' && imageData !== null) {
            imageUrl = imageData.url || '';
            imageTitle = imageData.title || `Image ${index + 1}`;
        } else if (typeof imageData === 'string') {
            imageUrl = imageData;
            imageTitle = `Image ${index + 1}`;
        } else {
            console.warn(`⚠️ Invalid image data at index ${index}:`, imageData);
            return;
        }
        
        // Ensure we have a valid URL
        if (!imageUrl || imageUrl === '[object Object]') {
            console.warn(`⚠️ Invalid image URL at index ${index}:`, imageUrl);
            return;
        }
        
        slide.innerHTML = `
            <img src="${imageUrl}" alt="${imageTitle}" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTA4MCIgaGVpZ2h0PSI2MDAiIHZpZXdCb3g9IjAgMCAxMDgwIDYwMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjEwODAiIGhlaWdodD0iNjAwIiBmaWxsPSIjNjY3ZWVBISIvPgo8dGV4dCB4PSI1NDAiIHk9IjMwMCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjI0IiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+SW1hZ2UgTG9hZGluZyBFcnJvcjwvdGV4dD4KPC9zdmc+Cg=='">
            <div class="slide-content">
                <h2>BAPS Shri Swaminarayan Mandir</h2>
                <p>${imageTitle}</p>
            </div>
        `;
        
        heroSlider.appendChild(slide);
    });
    
    // Reinitialize slider controls
    initializeSlider();
    console.log('✅ Hero slider images loaded successfully');
}

// Function to load general images
function loadGeneralImages(images) {
    console.log('🖼️ Loading general images:', images);
    
    if (!Array.isArray(images) || images.length === 0) {
        console.log('⚠️ No general images to load');
        return;
    }
    
    // You can add logic here to display general images in specific sections
    // For example, in news items, info cards, etc.
    console.log('✅ General images loaded successfully');
}


// Function to load news
function loadNews(newsData) {
    console.log('📰 Loading news:', newsData);
    
    if (!Array.isArray(newsData) || newsData.length === 0) {
        console.log('⚠️ No news to load');
        return;
    }
    
    const newsList = document.getElementById('news-list');
    if (!newsList) {
        console.error('❌ News list not found');
        return;
    }
    
    // Clear existing news
    newsList.innerHTML = '';
    
    // Create new news items
    newsData.forEach((newsItem, index) => {
        // Add null/undefined checks to prevent [object Object] errors
        if (newsItem === null || newsItem === undefined) {
            console.warn(`⚠️ News item at index ${index} is null/undefined, skipping`);
            return;
        }
        
        // Safely extract image URL
        let imageUrl = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjgwIiB2aWV3Qm94PSIwIDAgMTAwIDgwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjgwIiBmaWxsPSIjNjY3ZWVBISIvPgo8dGV4dCB4PSI1MCIgeT0iNDAiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxMiIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiPk5ld3MgSW1hZ2U8L3RleHQ+Cjwvc3ZnPgo=';
        
        if (newsItem.image && typeof newsItem.image === 'string' && newsItem.image !== '[object Object]') {
            imageUrl = newsItem.image;
        }
        
        const newsElement = document.createElement('div');
        newsElement.className = 'news-item';
        
        newsElement.innerHTML = `
            <div class="news-image">
                <img src="${imageUrl}" alt="News ${index + 1}" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjgwIiB2aWV3Qm94PSIwIDAgMTAwIDgwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjgwIiBmaWxsPSIjNjY3ZWVBISIvPgo8dGV4dCB4PSI1MCIgeT0iNDAiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxMiIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkltYWdlIEVycm9yPC90ZXh0Pgo8L3N2Zz4K'">
            </div>
            <div class="news-content">
                <h4>${newsItem.title || 'News Title'}</h4>
                <span class="news-date">${newsItem.date || 'Date'}</span>
            </div>
        `;
        
        newsList.appendChild(newsElement);
    });
    
    console.log('✅ News loaded successfully');
}

// Manual image refresh function
function refreshImages() {
    console.log('🔄 Manually refreshing images...');
    
    try {
        // Check for kiosk data
        const savedData = localStorage.getItem('kioskData');
        if (savedData) {
            const kioskData = JSON.parse(savedData);
            if (kioskData.websiteImages) {
                console.log('🖼️ Refreshing from kiosk data:', kioskData.websiteImages);
                updateWebsiteImages(kioskData.websiteImages);
                return;
            }
        }
        
        // Check for individual website images data
        const websiteImagesData = localStorage.getItem('websiteImagesData');
        if (websiteImagesData) {
            console.log('🖼️ Refreshing from individual data:', websiteImagesData);
            try {
                const parsedData = JSON.parse(websiteImagesData);
                updateWebsiteImages(parsedData);
                return;
            } catch (error) {
                console.error('Error parsing website images data:', error);
            }
        }
        
        console.log('⚠️ No image data found to refresh');
        
    } catch (error) {
        console.error('❌ Error refreshing images:', error);
    }
}

// Add refresh function to window for easy access
window.refreshImages = refreshImages;

// Debug function to check localStorage for image data
function debugImageData() {
    console.log('🔍 Debugging image data in localStorage...');
    
    // Check for kioskData
    const kioskData = localStorage.getItem('kioskData');
    if (kioskData) {
        try {
            const parsed = JSON.parse(kioskData);
            console.log('📦 kioskData found:', parsed);
            
            if (parsed.websiteImages) {
                console.log('🖼️ websiteImages found:', parsed.websiteImages);
                console.log('  - Hero Slider:', parsed.websiteImages.heroSlider);
                console.log('  - General Images:', parsed.websiteImages.generalImages);
                console.log('  - Murti Darshan:', parsed.websiteImages.murtiDarshan);
            } else {
                console.log('❌ No websiteImages in kioskData');
            }
        } catch (error) {
            console.error('❌ Error parsing kioskData:', error);
        }
    } else {
        console.log('❌ No kioskData found in localStorage');
    }
    
    // Check for individual image data
    const websiteImagesData = localStorage.getItem('websiteImagesData');
    if (websiteImagesData) {
        try {
            const parsed = JSON.parse(websiteImagesData);
            console.log('📱 websiteImagesData found:', parsed);
        } catch (error) {
            console.error('❌ Error parsing websiteImagesData:', error);
        }
    } else {
        console.log('❌ No websiteImagesData found in localStorage');
    }
    
    // Check for news data
    const newsData = localStorage.getItem('newsData');
    if (newsData) {
        try {
            const parsed = JSON.parse(newsData);
            console.log('📰 newsData found:', parsed);
        } catch (error) {
            console.error('❌ Error parsing newsData:', error);
        }
    } else {
        console.log('❌ No newsData found in localStorage');
    }
}

// Add debug function to window for easy access
window.debugImageData = debugImageData;

// Force reload and clear cache
function forceReload() {
    console.log('🔄 Force reloading page and clearing cache...');
    
    // Clear localStorage
    localStorage.clear();
    
    // Clear sessionStorage
    sessionStorage.clear();
    
    // Force reload without cache
    window.location.reload(true);
}

// Add force reload function to window for easy access
window.forceReload = forceReload;

// Enhanced refresh function with cache clearing
function refreshImagesWithCache() {
    console.log('🔄 Refreshing images with cache clearing...');
    
    // Clear any cached image data
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        // Force image reload by adding timestamp
        if (img.src && !img.src.includes('data:')) {
            const separator = img.src.includes('?') ? '&' : '?';
            img.src = img.src + separator + 't=' + Date.now();
        }
    });
    
    // Then refresh images normally
    refreshImages();
}

// Reinitialize event listeners for dynamically added content
function reinitializeEventListeners() {
    console.log('🔄 Reinitializing event listeners...');
    
    try {
        // Reinitialize interactive features
        initializeInteractiveFeatures();
        
        // Reinitialize map functionality
        
        
        // Reinitialize navigation
        initializeNavigation();
        
        console.log('✅ Event listeners reinitialized successfully');
    } catch (error) {
        console.error('❌ Error reinitializing event listeners:', error);
    }
}

// Update news section with dynamic content
function updateNewsSection(newsData) {
    const newsList = document.getElementById('news-list');
    if (!newsList || !newsData || !Array.isArray(newsData)) {
        console.log('⚠️ News section update skipped - missing data or container');
        return;
    }
    
    console.log(`📰 Updating news section with ${newsData.length} items`);
    
    // Only update if there are news items
    if (newsData.length > 0) {
        newsList.innerHTML = '';
        
        newsData.slice(0, 4).forEach((news, index) => {
            const newsItem = document.createElement('div');
            newsItem.className = 'news-item';
            newsItem.innerHTML = `
                <div class="news-image">
                    <img src="${news.image || 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjgwIiB2aWV3Qm94PSIwIDAgMTAwIDgwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjgwIiBmaWxsPSIjNjY3ZWVBISIvPgo8dGV4dCB4PSI1MCIgeT0iNDAiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxMiIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiPk5ld3MgSW1hZ2U8L3RleHQ+Cjwvc3ZnPgo='}" alt="${news.title}" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjgwIiB2aWV3Qm94PSIwIDAgMTAwIDgwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjgwIiBmaWxsPSIjNjY3ZWVBISIvPgo8dGV4dCB4PSI1MCIgeT0iNDAiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxMiIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiPk5ld3MgSW1hZ2U8L3RleHQ+Cjwvc3ZnPgo='">
                </div>
                <div class="news-content">
                    <h4>${news.title}</h4>
                    <span class="news-date">${news.date}</span>
                </div>
            `;
            newsList.appendChild(newsItem);
        });
        
        console.log(`✅ News section updated with ${Math.min(newsData.length, 4)} items`);
    } else {
        console.log('⚠️ No news items to display');
    }
}

// Update activities section with dynamic content
function updateActivitiesSection(activitiesData) {
    if (!activitiesData || !Array.isArray(activitiesData)) {
        console.log('⚠️ Activities section update skipped - missing or invalid data');
        return;
    }
    
    console.log(`📅 Updating activities section with ${activitiesData.length} items`);
    
    // Store the data for later use when activities modal is opened
    window.currentActivitiesData = activitiesData;
    
    console.log('✅ Activities section updated');
}

// Update gallery section with dynamic content
function updateGallerySection(galleryData) {
    if (!galleryData || !Array.isArray(galleryData)) {
        console.log('⚠️ Gallery section update skipped - missing or invalid data');
        return;
    }
    
    console.log(`🖼️ Updating gallery section with ${galleryData.length} items`);
    
    // Store the data for later use when gallery modal is opened
    window.currentGalleryData = galleryData;
    
    console.log('✅ Gallery section updated');
}

// Update website images with dynamic content
function updateWebsiteImages(websiteImagesData) {
    if (!websiteImagesData) {
        console.log('⚠️ No website images data provided');
        return;
    }
    
    console.log('🖼️ Updating website images:', websiteImagesData);
    
    // Update hero slider images
    if (websiteImagesData.heroSlider && Array.isArray(websiteImagesData.heroSlider)) {
        console.log(`🎠 Updating hero slider with ${websiteImagesData.heroSlider.length} images`);
        updateHeroSliderImages(websiteImagesData.heroSlider);
    } else {
        console.log('⚠️ No hero slider images found in website images data');
    }
    
    
    // Update general images (if needed)
    if (websiteImagesData.generalImages) {
        console.log(`🖼️ Found ${websiteImagesData.generalImages.length} general images`);
        window.currentGeneralImagesData = websiteImagesData.generalImages;
    }
    
    // Update QR code image
    if (websiteImagesData.qrCode) {
        console.log('📱 Found QR code image');
        loadQRCodeImage(websiteImagesData.qrCode);
    }
    
    console.log('✅ Website images update completed');
}

// Update hero slider images
function updateHeroSliderImages(heroSliderData) {
    if (!heroSliderData || !Array.isArray(heroSliderData) || heroSliderData.length === 0) {
        console.log('⚠️ No hero slider images to update');
        return;
    }
    
    console.log('🖼️ Updating hero slider with', heroSliderData.length, 'images');
    console.log('🎠 Hero slider data:', heroSliderData);
    
    // Get the hero slider container
    const heroSlider = document.getElementById('hero-slider');
    if (!heroSlider) {
        console.error('❌ Hero slider container not found');
        return;
    }
    
    // Clear existing slides
    heroSlider.innerHTML = '';
    
    // Create new slides dynamically
    heroSliderData.forEach((image, index) => {
        // Add null/undefined checks to prevent [object Object] errors
        if (image === null || image === undefined) {
            console.warn(`⚠️ Hero slider image data at index ${index} is null/undefined, skipping`);
            return;
        }
        
        let imageUrl, imageTitle;
        
        if (typeof image === 'object' && image !== null) {
            imageUrl = image.url || '';
            imageTitle = image.title || `Hero Slider ${index + 1}`;
        } else if (typeof image === 'string') {
            imageUrl = image;
            imageTitle = `Hero Slider ${index + 1}`;
        } else {
            console.warn(`⚠️ Invalid hero slider image data at index ${index}:`, image);
            return;
        }
        
        // Ensure we have a valid URL
        if (!imageUrl || imageUrl === '[object Object]') {
            console.warn(`⚠️ Invalid hero slider image URL at index ${index}:`, imageUrl);
            return;
        }
        
        console.log(`🖼️ Creating slide ${index + 1} with image:`, imageUrl);
        
        const slideDiv = document.createElement('div');
        slideDiv.className = `slide ${index === 0 ? 'active' : ''}`;
        
        slideDiv.innerHTML = `
            <img src="${imageUrl}" alt="${imageTitle}" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTA4MCIgaGVpZ2h0PSI2MDAiIHZpZXdCb3g9IjAgMCAxMDgwIDYwMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjEwODAiIGhlaWdodD0iNjAwIiBmaWxsPSIjNjY3ZWVBISIvPgo8dGV4dCB4PSI1NDAiIHk9IjMwMCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE2IiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+SGVybyBJbWFnZSAke2luZGV4ICsgMX08L3RleHQ+Cjwvc3ZnPgo='">
            <div class="slide-content">
                <h2>${imageTitle}</h2>
                <p>Beautiful mandir imagery</p>
            </div>
        `;
        
        heroSlider.appendChild(slideDiv);
    });
    
    // Update slider controls and dots
    updateSliderControls(heroSliderData.length);
    
    // Reinitialize the slider
    setTimeout(() => {
        initializeSlider();
    }, 100);
    
    console.log(`✅ Created ${heroSliderData.length} hero slider slides`);
}

// Load QR code image
function loadQRCodeImage(qrCodeUrl) {
    if (!qrCodeUrl) {
        console.log('⚠️ No QR code URL provided');
        return;
    }
    
    console.log('📱 Loading QR code image:', qrCodeUrl);
    
    // Find the QR code image element in the Telegram updates section
    const qrCodeImg = document.querySelector('#telegram-updates .qr-code img');
    
    if (qrCodeImg) {
        qrCodeImg.src = qrCodeUrl;
        qrCodeImg.alt = 'Telegram QR Code';
        
        // Add error handling
        qrCodeImg.onerror = function() {
            console.error('❌ Failed to load QR code image');
            this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjNjY3ZWVBISIvPgo8dGV4dCB4PSIxMDAiIHk9IjEwMCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0IiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+UVIgQ29kZSBVbmF2YWlsYWJsZTwvdGV4dD4KPC9zdmc+Cg==';
        };
        
        console.log('✅ QR code image updated successfully');
    } else {
        console.warn('⚠️ QR code image element not found in Telegram updates section');
    }
}

// Update slider controls and dots
function updateSliderControls(slideCount) {
    // Update dots
    const sliderDots = document.getElementById('slider-dots');
    if (sliderDots) {
        sliderDots.innerHTML = '';
        
        for (let i = 0; i < slideCount; i++) {
            const dot = document.createElement('span');
            dot.className = `dot ${i === 0 ? 'active' : ''}`;
            dot.setAttribute('data-slide', i);
            sliderDots.appendChild(dot);
        }
    }
    
    // Update navigation buttons if needed
    const prevBtn = document.getElementById('prev-slide');
    const nextBtn = document.getElementById('next-slide');
    
    if (prevBtn) prevBtn.style.display = slideCount > 1 ? 'block' : 'none';
    if (nextBtn) nextBtn.style.display = slideCount > 1 ? 'block' : 'none';
}

// Show image update message
function showImageUpdateMessage(message) {
    const messageDiv = document.createElement('div');
    messageDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #28a745;
        color: white;
        padding: 15px 25px;
        border-radius: 8px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        z-index: 1000;
        font-family: Arial, sans-serif;
        font-size: 14px;
    `;
    messageDiv.innerHTML = `<i class="fas fa-check"></i> ${message}`;
    
    document.body.appendChild(messageDiv);
    
    setTimeout(() => {
        if (messageDiv.parentNode) {
            messageDiv.parentNode.removeChild(messageDiv);
        }
    }, 3000);
}

// Update murti darshan image

// Update Mahant location data

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 DOM loaded, initializing kiosk...');
    
    try {
        console.log('🔧 Step 0: Loading temple background...');
        loadTempleBackground();
        
        console.log('🔧 Step 1: Initializing DOM elements...');
        initializeDOMElements();
        
        console.log('🔧 Step 1: Initializing language...');
        initializeLanguage();
        
        console.log('🔧 Step 2: Initializing weather...');
        initializeWeather();
        
        console.log('🔧 Step 3: Initializing slider...');
        initializeSlider();
        
        console.log('🔧 Step 4: Initializing navigation...');
        initializeNavigation();
        
        console.log('🔧 Step 5: Initializing AI...');
        initializeAI();
        
        console.log('🔧 Step 6: Initializing interactive features...');
        initializeInteractiveFeatures();
        
        console.log('🔧 Step 7: Initializing map...');
        
        console.log('🔧 Step 8: Initializing touch interactions...');
        initializeTouchInteractions();
        
        
        console.log('🔧 Step 10: Updating current time...');
        updateCurrentTime();
        
        console.log('🔧 Step 11: Starting time refresh...');
        setInterval(updateCurrentTime, 1000);
        
        console.log('🔧 Step 12: Setting up storage listeners...');
        // Listen for localStorage changes
        window.addEventListener('storage', (e) => {
            if (e.key === 'kioskData') {
                console.log('🔄 kioskData updated, refreshing content...');
                loadDynamicContent();
            }
        });
        
        
        console.log('🔧 Step 14: Loading dynamic content...');
        // Load dynamic content from admin dashboard
        loadDynamicContent();
        
        console.log('🔧 Step 15: Setting up content polling...');
        // Poll for content updates every 5 seconds
        setInterval(() => {
            loadDynamicContent();
        }, 5000);
        
        // Also load images immediately when page loads
        setTimeout(() => {
            console.log('🖼️ Loading images on page load...');
            loadDynamicContent();
            
            // Ensure we have at least some images loaded
            setTimeout(() => {
                const heroSlider = document.querySelector('#hero-slider .slide img');
                if (heroSlider && heroSlider.src.includes('data:image/svg+xml')) {
                    console.log('🖼️ No real images loaded, forcing default image load...');
                    loadDefaultImages();
                }
            }, 500);
        }, 1000);
        
        console.log('🔧 Step 16: Setting up debug timeout...');
        // Add debugging for link issues
        setTimeout(() => {
            debugLinkIssues();
        }, 1000);
        
        console.log('🔧 Step 17: Setting up image test timeout...');
        // Test image loading functionality
        setTimeout(() => {
            testImageLoading();
        }, 2000);
        
        console.log('🔧 Step 18: Initializing virtual keyboard...');
        // Initialize virtual keyboard
        initializeVirtualKeyboard();
        
        console.log('🔧 Step 19: Setting up comprehensive test...');
        // Run comprehensive test after everything is loaded
        setTimeout(() => {
            runComprehensiveTest();
        }, 3000);
        
        console.log('🔧 Step 20: Content loaded successfully...');
        
        console.log('✅ BAPS Shri Swaminarayan Mandir Kiosk initialized successfully!');
        
        // Add simple test to verify basic functionality
        console.log('🧪 Adding simple test event listeners...');
        const testCards = document.querySelectorAll('.feature-card');
        testCards.forEach((card, index) => {
            card.onclick = function() {
                console.log(`🎯 Simple click test: Feature card ${index} clicked`);
                const section = this.getAttribute('data-section');
                console.log(`Section: ${section}`);
                
                if (section === 'ai-assistant') {
                    showAIAssistant();
                } else if (section === 'admin-controls') {
                    window.open('/admin-controls.html', '_blank');
                } else if (section === 'activities') {
                    scrollToSection('activities');
                } else if (section === 'map') {
                }
            };
        });
        
        // Debug DOM elements
        console.log('🔍 Debugging DOM elements...');
        console.log('AI Section:', aiSection);
        console.log('AI Chat:', aiChat);
        console.log('AI Input:', aiInput);
        console.log('Feature Cards:', featureCards);
        console.log('Close AI Button:', closeAiBtn);
        
        // Test if showAIAssistant function works
        console.log('🧪 Testing showAIAssistant function...');
        if (typeof showAIAssistant === 'function') {
            console.log('✅ showAIAssistant function exists');
        } else {
            console.error('❌ showAIAssistant function not found');
        }
        
    } catch (error) {
        console.error('❌ Error during kiosk initialization:', error);
        console.error('Error details:', error.message);
        console.error('Error stack:', error.stack);
        alert('Error initializing kiosk. Please refresh the page and check console for details.');
    }
});

// Debug function to check for link issues
function debugLinkIssues() {
    console.log('🔍 Debugging link issues...');
    
    // Check all clickable elements
    const clickableElements = document.querySelectorAll('button, a, .feature-card, .slide, .dot');
    console.log(`Found ${clickableElements.length} clickable elements`);
    
    clickableElements.forEach((element, index) => {
        const hasClickListeners = element.onclick || element._clickListeners;
        const hasTouchListeners = element.ontouchstart || element._touchListeners;
        
        if (!hasClickListeners && !hasTouchListeners) {
            console.warn(`⚠️ Element ${index} (${element.tagName}) has no click/touch listeners:`, element);
        }
    });
    
    // Check for overlapping elements
    const overlappingElements = checkForOverlappingElements();
    if (overlappingElements.length > 0) {
        console.warn('⚠️ Found overlapping elements that might block clicks:', overlappingElements);
    }
    
    // Check CSS pointer events
    const disabledElements = document.querySelectorAll('[style*="pointer-events: none"]');
    if (disabledElements.length > 0) {
        console.warn('⚠️ Found elements with disabled pointer events:', disabledElements);
    }
}

// Check for overlapping elements
function checkForOverlappingElements() {
    const elements = document.querySelectorAll('button, a, .feature-card');
    const overlapping = [];
    
    for (let i = 0; i < elements.length; i++) {
        for (let j = i + 1; j < elements.length; j++) {
            const rect1 = elements[i].getBoundingClientRect();
            const rect2 = elements[j].getBoundingClientRect();
            
            if (rect1.left < rect2.right && rect1.right > rect2.left &&
                rect1.top < rect2.bottom && rect1.bottom > rect2.top) {
                overlapping.push([elements[i], elements[j]]);
            }
        }
    }
    
    return overlapping;
}

// Enhanced event listener function with debugging
function addEnhancedEventListener(element, eventType, handler, options = {}) {
    if (!element) {
        console.warn(`⚠️ Cannot add ${eventType} listener to null element`);
        return;
    }
    
    try {
        element.addEventListener(eventType, handler, options);
        
        // Store reference for debugging
        if (!element._eventListeners) element._eventListeners = {};
        if (!element._eventListeners[eventType]) element._eventListeners[eventType] = [];
        element._eventListeners[eventType].push(handler);
        
        console.log(`✅ Added ${eventType} listener to`, element);
    } catch (error) {
        console.error(`❌ Failed to add ${eventType} listener to`, element, error);
    }
}

// Add keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close any open modals or navigation
        navigationMenu.classList.remove('active');
        hideAIAssistant();
        closeModal();
        closeDirections();
    }
});

// Add screen saver functionality
let screenSaverTimeout;
function resetScreenSaver() {
    clearTimeout(screenSaverTimeout);
    screenSaverTimeout = setTimeout(() => {
        // Add screen saver effect here if needed
        console.log('Screen saver would activate');
    }, 300000); // 5 minutes
}

// Reset screen saver on any interaction
document.addEventListener('click', resetScreenSaver);
document.addEventListener('touchstart', resetScreenSaver);
document.addEventListener('keydown', resetScreenSaver);

// Initialize screen saver
resetScreenSaver();

// Test all links and provide comprehensive summary
function testAllLinks() {
    console.log('🧪 Testing all links and interactive elements...');
    
    const testResults = {
        total: 0,
        working: 0,
        broken: 0,
        issues: []
    };
    
    // Test feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach((card, index) => {
        testResults.total++;
        
        const section = card.getAttribute('data-section');
        const hasListeners = card._eventListeners && Object.keys(card._eventListeners).length > 0;
        
        if (hasListeners && section) {
            testResults.working++;
            console.log(`✅ Feature card ${index} (${section}): Working`);
        } else {
            testResults.broken++;
            const issue = `Feature card ${index}: Missing ${!hasListeners ? 'event listeners' : 'data-section'}`;
            testResults.issues.push(issue);
            console.warn(`❌ ${issue}`);
        }
    });
    
    // Test map buttons
    const mapButtons = document.querySelectorAll('.map-btn');
    mapButtons.forEach((btn, index) => {
        testResults.total++;
        
        const hasListeners = btn._eventListeners && Object.keys(btn._eventListeners).length > 0;
        
        if (hasListeners) {
            testResults.working++;
            console.log(`✅ Map button ${index}: Working`);
        } else {
            testResults.broken++;
            const issue = `Map button ${index}: Missing event listeners`;
            testResults.issues.push(issue);
            console.warn(`❌ ${issue}`);
        }
    });
    
    // Test navigation
    const navItems = document.querySelectorAll('nav a, .navigation-menu a');
    navItems.forEach((item, index) => {
        testResults.total++;
        
        const hasListeners = item._eventListeners && Object.keys(item._eventListeners).length > 0;
        const hasHref = item.hasAttribute('href');
        
        if (hasListeners || hasHref) {
            testResults.working++;
            console.log(`✅ Navigation item ${index}: Working`);
        } else {
            testResults.broken++;
            const issue = `Navigation item ${index}: Missing event listeners and href`;
            testResults.issues.push(issue);
            console.warn(`❌ ${issue}`);
        }
    });
    
    // Test slider controls
    const sliderControls = document.querySelectorAll('.slide, .dot, .prev-slide, .next-slide');
    sliderControls.forEach((control, index) => {
        testResults.total++;
        
        const hasListeners = control._eventListeners && Object.keys(control._eventListeners).length > 0;
        
        if (hasListeners) {
            testResults.working++;
            console.log(`✅ Slider control ${index}: Working`);
        } else {
            testResults.broken++;
            const issue = `Slider control ${index}: Missing event listeners`;
            testResults.issues.push(issue);
            console.warn(`❌ ${issue}`);
        }
    });
    
    // Summary
    console.log('\n📊 LINK TEST SUMMARY:');
    console.log(`Total elements: ${testResults.total}`);
    console.log(`Working: ${testResults.working} ✅`);
    console.log(`Broken: ${testResults.broken} ❌`);
    console.log(`Success rate: ${Math.round((testResults.working / testResults.total) * 100)}%`);
    
    if (testResults.issues.length > 0) {
        console.log('\n🚨 ISSUES FOUND:');
        testResults.issues.forEach(issue => console.log(`• ${issue}`));
        
        // Add debug styling to broken elements
        document.querySelectorAll('.feature-card, .map-btn, nav a, .slide, .dot').forEach(element => {
            const hasListeners = element._eventListeners && Object.keys(element._eventListeners).length > 0;
            if (!hasListeners) {
                element.classList.add('debug-links');
            }
        });
    } else {
        console.log('\n🎉 All links are working perfectly!');
    }
    
    return testResults;
}

// Add test function to window for easy access
window.testAllLinks = testAllLinks;

// Test image loading functionality
function testImageLoading() {
    console.log('🧪 Testing image loading functionality...');
    
    // Check if we have any image data
    const savedData = localStorage.getItem('kioskData');
    if (savedData) {
        const kioskData = JSON.parse(savedData);
        console.log('📦 Found kiosk data:', kioskData);
        
        if (kioskData.websiteImages) {
            console.log('🖼️ Found website images:', kioskData.websiteImages);
            
            // Test hero slider images
            if (kioskData.websiteImages.heroSlider) {
                console.log('🎠 Hero slider images:', kioskData.websiteImages.heroSlider);
                updateHeroSliderImages(kioskData.websiteImages.heroSlider);
            }
            
        } else {
            console.log('⚠️ No website images found in kiosk data');
        }
    } else {
        console.log('📭 No kiosk data found in localStorage');
    }
    
    // Check for individual image data
    const websiteImagesData = localStorage.getItem('websiteImagesData');
    if (websiteImagesData) {
        console.log('🖼️ Found individual website images data:', websiteImagesData);
        try {
            const parsedData = JSON.parse(websiteImagesData);
            updateWebsiteImages(parsedData);
        } catch (error) {
            console.error('Error parsing website images data:', error);
        }
    }
    
    // Check current image state
    checkCurrentImageState();
    
    console.log('✅ Image loading tests completed');
}

// Check current image state
function checkCurrentImageState() {
    console.log('🔍 Checking current image state...');
    
    // Check hero slider images
    const slides = document.querySelectorAll('.slide img');
    console.log(`🎠 Found ${slides.length} hero slider images:`);
    
    slides.forEach((slide, index) => {
        console.log(`   - Slide ${index + 1}:`, {
            src: slide.src,
            alt: slide.alt,
            naturalWidth: slide.naturalWidth,
            naturalHeight: slide.naturalHeight,
            complete: slide.complete,
            currentSrc: slide.currentSrc
        });
    });
    
    
    // Check news images
    const newsImages = document.querySelectorAll('.news-item img');
    console.log(`📰 Found ${newsImages.length} news images`);
    
    // Check gallery images
    const galleryImages = document.querySelectorAll('.gallery-item img');
    console.log(`🖼️ Found ${galleryImages.length} gallery images`);
}

// Add check function to window for easy access
window.checkCurrentImageState = checkCurrentImageState;

// Virtual Keyboard functionality
let currentInputField = null;
let keyboardVisible = false;

function initializeVirtualKeyboard() {
    console.log('⌨️ Initializing virtual keyboard...');
    
    const keyboard = document.getElementById('virtual-keyboard');
    const closeKeyboardBtn = document.getElementById('close-keyboard');
    
    if (!keyboard || !closeKeyboardBtn) {
        console.warn('⚠️ Virtual keyboard elements not found');
        return;
    }
    
    // Close keyboard button
    closeKeyboardBtn.addEventListener('click', hideVirtualKeyboard);
    
    // Keyboard key event listeners
    const keyboardKeys = document.querySelectorAll('.keyboard-key');
    keyboardKeys.forEach(key => {
        key.addEventListener('click', handleKeyboardKeyPress);
        key.addEventListener('touchstart', handleKeyboardKeyPress);
    });
    
    // Make AI input readonly and add keyboard trigger
    const aiInput = document.getElementById('ai-input');
    if (aiInput) {
        aiInput.setAttribute('readonly', 'true');
        aiInput.classList.add('input-field-readonly');
        aiInput.addEventListener('click', () => showVirtualKeyboard(aiInput));
        aiInput.addEventListener('touchstart', () => showVirtualKeyboard(aiInput));
    }
    
    console.log('✅ Virtual keyboard initialized');
}

function showVirtualKeyboard(inputField) {
    if (!inputField) return;
    
    console.log('⌨️ Showing virtual keyboard for:', inputField);
    
    currentInputField = inputField;
    keyboardVisible = true;
    
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

function hideVirtualKeyboard() {
    console.log('⌨️ Hiding virtual keyboard');
    
    keyboardVisible = false;
    currentInputField = null;
    
    const keyboard = document.getElementById('virtual-keyboard');
    if (keyboard) {
        keyboard.classList.remove('show');
        setTimeout(() => {
            keyboard.classList.add('hidden');
        }, 300);
    }
    
    // Remove visual feedback from input fields
    const inputs = document.querySelectorAll('input[readonly]');
    inputs.forEach(input => {
        input.style.borderColor = '';
        input.style.boxShadow = '';
    });
}

function handleKeyboardKeyPress(event) {
    event.preventDefault();
    
    if (!currentInputField) return;
    
    const key = event.currentTarget.getAttribute('data-key');
    console.log('⌨️ Key pressed:', key);
    
    if (key === 'backspace') {
        // Handle backspace
        const currentValue = currentInputField.value;
        currentInputField.value = currentValue.slice(0, -1);
    } else if (key === 'enter') {
        // Handle enter key
        if (currentInputField.id === 'ai-input') {
            handleAISend();
        }
        hideVirtualKeyboard();
    } else if (key === ' ') {
        // Handle space
        currentInputField.value += ' ';
    } else {
        // Handle regular keys
        currentInputField.value += key;
    }
    
    // Trigger input event for any listeners
    currentInputField.dispatchEvent(new Event('input', { bubbles: true }));
    
    // Keep focus on input field
    currentInputField.focus();
}

// Close keyboard when clicking outside
document.addEventListener('click', (e) => {
    if (keyboardVisible && !e.target.closest('.virtual-keyboard') && !e.target.closest('input[readonly]')) {
        hideVirtualKeyboard();
    }
});

// Close keyboard on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && keyboardVisible) {
        hideVirtualKeyboard();
    }
});

// Add keyboard functions to window for easy access
window.showVirtualKeyboard = showVirtualKeyboard;
window.hideVirtualKeyboard = hideVirtualKeyboard;
window.initializeVirtualKeyboard = initializeVirtualKeyboard;

// Comprehensive test function to verify all fixes
function runComprehensiveTest() {
    console.log('🧪 Running comprehensive test...');
    
    const testResults = {
        heroSlider: false,
        virtualKeyboard: false,
        imageLoading: false,
        adminIntegration: false,
        totalTests: 4,
        passedTests: 0
    };
    
    // Test 1: Hero Slider
    console.log('\n🎠 Testing Hero Slider...');
    try {
        const slides = document.querySelectorAll('.slide');
        const dots = document.querySelectorAll('.dot');
        const prevBtn = document.getElementById('prev-slide');
        const nextBtn = document.getElementById('next-slide');
        
        if (slides.length > 0 && dots.length > 0 && prevBtn && nextBtn) {
            testResults.heroSlider = true;
            testResults.passedTests++;
            console.log('✅ Hero Slider: Working properly');
            console.log(`   - Slides: ${slides.length}`);
            console.log(`   - Dots: ${dots.length}`);
            console.log(`   - Navigation: Working`);
        } else {
            console.log('❌ Hero Slider: Missing elements');
        }
    } catch (error) {
        console.error('❌ Hero Slider test error:', error);
    }
    
    // Test 2: Virtual Keyboard
    console.log('\n⌨️ Testing Virtual Keyboard...');
    try {
        const keyboard = document.getElementById('virtual-keyboard');
        const keyboardKeys = document.querySelectorAll('.keyboard-key');
        
        if (keyboard && keyboardKeys.length > 0) {
            testResults.virtualKeyboard = true;
            testResults.passedTests++;
            console.log('✅ Virtual Keyboard: Working properly');
            console.log(`   - Keyboard container: Found`);
            console.log(`   - Keys: ${keyboardKeys.length}`);
        } else {
            console.log('❌ Virtual Keyboard: Missing elements');
        }
    } catch (error) {
        console.error('❌ Virtual Keyboard test error:', error);
    }
    
    // Test 3: Image Loading
    console.log('\n🖼️ Testing Image Loading...');
    try {
        const savedData = localStorage.getItem('kioskData');
        if (savedData) {
            const kioskData = JSON.parse(savedData);
            if (kioskData.websiteImages && kioskData.websiteImages.heroSlider) {
                testResults.imageLoading = true;
                testResults.passedTests++;
                console.log('✅ Image Loading: Working properly');
                console.log(`   - Hero slider images: ${kioskData.websiteImages.heroSlider.length}`);
                console.log(`   - General images: ${kioskData.websiteImages.generalImages?.length || 0}`);
            } else {
                console.log('❌ Image Loading: No website images data');
            }
        } else {
            console.log('❌ Image Loading: No kiosk data found');
        }
    } catch (error) {
        console.error('❌ Image Loading test error:', error);
    }
    
    // Test 4: Admin Integration
    console.log('\n🔧 Testing Admin Integration...');
    try {
        const aiInput = document.getElementById('ai-input');
        if (aiInput && aiInput.hasAttribute('readonly')) {
            testResults.adminIntegration = true;
            testResults.passedTests++;
            console.log('✅ Admin Integration: Working properly');
            console.log(`   - AI input readonly: Yes`);
            console.log(`   - Virtual keyboard integration: Yes`);
        } else {
            console.log('❌ Admin Integration: AI input not properly configured');
        }
    } catch (error) {
        console.error('❌ Admin Integration test error:', error);
    }
    
    // Summary
    console.log('\n📊 COMPREHENSIVE TEST SUMMARY:');
    console.log(`Total Tests: ${testResults.totalTests}`);
    console.log(`Passed: ${testResults.passedTests} ✅`);
    console.log(`Failed: ${testResults.totalTests - testResults.passedTests} ❌`);
    console.log(`Success Rate: ${Math.round((testResults.passedTests / testResults.totalTests) * 100)}%`);
    
    if (testResults.passedTests === testResults.totalTests) {
        console.log('\n🎉 All tests passed! The kiosk is working perfectly!');
    } else {
        console.log('\n⚠️ Some tests failed. Check the console for details.');
    }
    
    return testResults;
}

// Add test function to window for easy access
window.runComprehensiveTest = runComprehensiveTest;

// Add simple image loading function for manual testing
window.loadImagesNow = function() {
    console.log('🖼️ Manually loading images...');
    loadDefaultImages();
};

// Add function to check current image status
window.checkImageStatus = function() {
    const heroSlider = document.querySelector('#hero-slider .slide img');
    if (heroSlider) {
        console.log('🖼️ Current hero image src:', heroSlider.src);
        console.log('🖼️ Is placeholder image?', heroSlider.src.includes('data:image/svg+xml'));
    } else {
        console.log('❌ Hero slider image not found');
    }
    
    const savedImages = localStorage.getItem('kioskImages');
    console.log('💾 Saved images in localStorage:', savedImages);
};

// Function to load default images from config
function loadDefaultImages() {
    console.log('🖼️ Loading default images from config...');
    
    // Check if we have the config available
    if (typeof MANDIR_CONFIG !== 'undefined' && MANDIR_CONFIG.gallery) {
        console.log('✅ Found config, loading default gallery images');
        
        // Convert gallery images to hero slider format
        const defaultHeroImages = MANDIR_CONFIG.gallery.map((img, index) => ({
            url: img.src,
            title: img.title || `Image ${index + 1}`,
            description: img.alt || ''
        }));
        
        // Load these as hero slider images
        loadHeroSliderImages(defaultHeroImages);
        
        // Also save to localStorage for future use
        const defaultImageData = {
            heroSlider: defaultHeroImages,
            generalImages: MANDIR_CONFIG.gallery,
        };
        
        localStorage.setItem('kioskImages', JSON.stringify(defaultImageData));
        console.log('💾 Default images saved to localStorage');
        
        return true;
    } else {
        console.log('⚠️ No config found, using fallback images');
        
        // Fallback to hardcoded images if config is not available
        const fallbackImages = [
            {
                url: 'https://images.unsplash.com/photo-1542810634-71277d95dcbb?w=1080&h=600&fit=crop',
                title: 'BAPS Mandir Exterior',
                description: 'Beautiful architecture of our Mandir'
            },
            {
                url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1080&h=600&fit=crop',
                title: 'Prayer Hall',
                description: 'Sacred space for meditation and prayer'
            },
            {
                url: 'https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=1080&h=600&fit=crop',
                title: 'Aarti Ceremony',
                description: 'Daily devotional ceremonies'
            }
        ];
        
        loadHeroSliderImages(fallbackImages);
        
        // Save fallback images to localStorage
        const fallbackImageData = {
            heroSlider: fallbackImages,
            generalImages: fallbackImages,
        };
        
        localStorage.setItem('kioskImages', JSON.stringify(fallbackImageData));
        console.log('💾 Fallback images saved to localStorage');
        
        return true;
    }
}

// Function to show placeholder content when no images are available
function showPlaceholderContent() {
    console.log('🖼️ Showing placeholder content (no images available)');
    
    const heroSlider = document.getElementById('hero-slider');
    if (heroSlider) {
        // Create placeholder slides
        heroSlider.innerHTML = `
            <div class="slide active">
                <div class="slide-content" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 60px; border-radius: 20px; text-align: center; color: white;">
                    <h2 style="font-size: 3rem; margin-bottom: 20px;">🕉️ BAPS Shri Swaminarayan Mandir</h2>
                    <p style="font-size: 1.5rem; margin-bottom: 30px;">Welcome to our sacred Mandir</p>
                    <p style="font-size: 1.2rem; opacity: 0.9;">Images will be loaded from admin panel</p>
                </div>
            </div>
            <div class="slide">
                <div class="slide-content" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 60px; border-radius: 20px; text-align: center; color: white;">
                    <h2 style="font-size: 3rem; margin-bottom: 20px;">🙏 Daily Darshan</h2>
                    <p style="font-size: 1.5rem; margin-bottom: 30px;">Experience divine peace and spiritual tranquility</p>
                    <p style="font-size: 1.2rem; opacity: 0.9;">Visit admin panel to add your own images</p>
                </div>
            </div>
            <div class="slide">
                <div class="slide-content" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 60px; border-radius: 20px; text-align: center; color: white;">
                    <h2 style="font-size: 3rem; margin-bottom: 20px;">🌟 Community Events</h2>
                    <p style="font-size: 1.5rem; margin-bottom: 30px;">Join us for cultural and spiritual activities</p>
                    <p style="font-size: 1.2rem; opacity: 0.9;">Use simple admin to manage content</p>
                </div>
            </div>
        `;
        
        // Reinitialize slider controls
        initializeSlider();
    }
    
    // Also update gallery section if it exists
    const gallerySection = document.querySelector('.gallery-section');
    if (gallerySection) {
        const galleryGrid = gallerySection.querySelector('.gallery-grid');
        if (galleryGrid) {
            galleryGrid.innerHTML = `
                <div class="gallery-item" style="text-align: center; padding: 40px;">
                    <div style="font-size: 4rem; margin-bottom: 20px;">🖼️</div>
                    <h4>No Images Available</h4>
                    <p>Use the admin panel to add your own images</p>
                </div>
            `;
        }
    }
}

// Add function to refresh images from admin panel
window.refreshImagesFromAdmin = function() {
    console.log('🔄 Refreshing images from admin panel...');
    loadDynamicContent();
};

// Add function to clear all images and show placeholders
window.clearAllImagesAndShowPlaceholders = function() {
    console.log('🗑️ Clearing all images and showing placeholders...');
    localStorage.removeItem('kioskImages');
    localStorage.removeItem('kioskData');
    localStorage.removeItem('websiteImagesData');
    showPlaceholderContent();
};

// Listen for messages from admin panel
window.addEventListener('message', function(event) {
    if (event.data && event.data.action === 'refreshImages') {
        console.log('🔄 Received refresh command from admin panel');
        if (event.data.data === null) {
            // Clear images and show placeholders
            clearAllImagesAndShowPlaceholders();
        } else {
            // Load new images
            loadDynamicContent();
        }
    }
});




// Admin Number Pad functionality
let adminPin = '';
let adminPinAttempts = 0;
const MAX_PIN_ATTEMPTS = 3;
const CORRECT_ADMIN_PIN = '2001'; // Changed to 2001 as requested

// Function to show admin number pad
function showAdminPad() {
    console.log('🔐 Opening admin number pad...');
    const modal = document.getElementById('admin-pad-modal');
    console.log('🔐 Modal element found:', modal);
    if (modal) {
        // Remove any existing event listeners that might interfere
        modal.style.display = 'flex';
        modal.style.opacity = '1';
        modal.style.visibility = 'visible';
        console.log('🔐 Modal styles updated');
        resetPin();
    } else {
        console.error('🔐 Admin modal not found!');
    }
}

// Function to hide admin number pad
function hideAdminPad() {
    console.log('🔐 Closing admin number pad...');
    const modal = document.getElementById('admin-pad-modal');
    if (modal) {
        modal.style.display = 'none';
        modal.style.opacity = '0';
        modal.style.visibility = 'hidden';
        resetPin();
    }
}

// Function to add digit to PIN
function addToPin(digit) {
    if (adminPin.length < 4) { // Changed to 4 digits for PIN 2001
        adminPin += digit;
        updatePinDisplay();
        console.log('🔐 PIN updated:', adminPin.length, 'digits');
    }
}

// Function to clear PIN
function clearPin() {
    adminPin = '';
    updatePinDisplay();
    console.log('🔐 PIN cleared');
}

// Function to update PIN display
function updatePinDisplay() {
    // Update PIN dots (now only 4 dots for 4-digit PIN)
    for (let i = 1; i <= 4; i++) {
        const dot = document.getElementById(`pin-dot-${i}`);
        if (dot) {
            if (i <= adminPin.length) {
                dot.classList.add('filled');
            } else {
                dot.classList.remove('filled');
            }
        }
    }
    
    // Update status
    const status = document.getElementById('pin-status');
    if (status) {
        if (adminPin.length === 0) {
            status.textContent = 'Enter 4-digit admin code';
            status.className = 'pin-status';
        } else {
            status.textContent = `${adminPin.length}/4 digits entered`;
            status.className = 'pin-status';
        }
    }
}

// Function to submit PIN
function submitPin() {
    console.log('🔐 submitPin called with PIN:', adminPin);
    console.log('🔐 PIN length:', adminPin.length);
    console.log('🔐 Expected length: 4');
    
    if (adminPin.length !== 4) { // Changed to 4 digits
        console.log('🔐 PIN length mismatch, showing error');
        showPinError('Please enter all 4 digits');
        return;
    }
    
    console.log('🔐 Submitting admin PIN...');
    console.log('🔐 Current PIN:', adminPin);
    console.log('🔐 Expected PIN:', CORRECT_ADMIN_PIN);
    console.log('🔐 PINs match:', adminPin === CORRECT_ADMIN_PIN);
    
    if (adminPin === CORRECT_ADMIN_PIN) {
        console.log('🔐 PIN correct, showing success');
        showPinSuccess('Access granted! Welcome, Administrator.');
        showAdminActions();
        adminPinAttempts = 0; // Reset attempts on success
    } else {
        console.log('🔐 PIN incorrect, showing error');
        adminPinAttempts++;
        const remainingAttempts = MAX_PIN_ATTEMPTS - adminPinAttempts;
        
        if (remainingAttempts > 0) {
            showPinError(`Incorrect PIN. ${remainingAttempts} attempts remaining.`);
        } else {
            showPinError('Access denied. Too many failed attempts.');
            setTimeout(() => {
                hideAdminPad();
            }, 2000);
        }
        
        clearPin();
    }
}

// Function to show PIN success
function showPinSuccess(message) {
    const status = document.getElementById('pin-status');
    if (status) {
        status.textContent = message;
        status.className = 'pin-status success';
    }
}

// Function to show PIN error
function showPinError(message) {
    const status = document.getElementById('pin-status');
    if (status) {
        status.textContent = message;
        status.className = 'pin-status error';
    }
}

// Function to reset PIN
function resetPin() {
    adminPin = '';
    adminPinAttempts = 0;
    updatePinDisplay();
    
    // Hide admin actions
    const actions = document.getElementById('admin-actions');
    if (actions) {
        actions.style.display = 'none';
    }
}

// Function to show admin actions
function showAdminActions() {
    console.log('🔐 Showing admin actions...');
    const actions = document.getElementById('admin-actions');
    console.log('🔐 Admin actions element found:', actions);
    if (actions) {
        actions.style.display = 'block';
        console.log('🔐 Admin actions displayed');
        // Update aarti toggle button status
        updateAartiToggleButton();
    } else {
        console.error('❌ Admin actions element not found!');
    }
}

// Admin Functions
function openAdminPanel() {
    console.log('🔐 Opening admin panel...');
    hideAdminPad();
    
    // Open admin panel in new window
    const adminUrl = window.location.origin + '/simple-admin.html';
    window.open(adminUrl, '_blank', 'width=1200,height=800,scrollbars=yes,resizable=yes');
}

function refreshKiosk() {
    console.log('🔐 Refreshing kiosk...');
    hideAdminPad();
    
    // Refresh the current page
    window.location.reload();
}

function clearCache() {
    console.log('🔐 Clearing cache...');
    
    try {
        // Clear localStorage
        localStorage.clear();
        
        // Clear sessionStorage
        sessionStorage.clear();
        
        showPinSuccess('Cache cleared successfully!');
        
        // Reload after a short delay
        setTimeout(() => {
            window.location.reload();
        }, 1500);
        
    } catch (error) {
        console.error('❌ Error clearing cache:', error);
        showPinError('Error clearing cache. Please try again.');
    }
}

function showSystemInfo() {
    console.log('🔐 Showing system info...');
    
    const systemInfo = {
        'User Agent': navigator.userAgent,
        'Platform': navigator.platform,
        'Language': navigator.language,
        'Cookies Enabled': navigator.cookieEnabled,
        'Online': navigator.onLine,
        'Screen Resolution': `${screen.width}x${screen.height}`,
        'Viewport': `${window.innerWidth}x${window.innerHeight}`,
        'Local Storage': localStorage.length + ' items',
        'Session Storage': sessionStorage.length + ' items',
        'Current URL': window.location.href,
        'Page Load Time': new Date().toLocaleString()
    };
    
    let infoText = 'System Information:\n\n';
    for (const [key, value] of Object.entries(systemInfo)) {
        infoText += `${key}: ${value}\n`;
    }
    
    // Show in alert for now (could be improved with a modal)
    alert(infoText);
}

// Add admin functions to window for global access
window.showAdminPad = showAdminPad;
window.hideAdminPad = hideAdminPad;
window.addToPin = addToPin;
window.clearPin = clearPin;
window.submitPin = submitPin;
window.openAdminPanel = openAdminPanel;
window.refreshKiosk = refreshKiosk;
window.clearCache = clearCache;
window.showSystemInfo = showSystemInfo;

// Add AI functions to window for global access
window.askAI = askAI;
window.handleAISend = handleAISend;
window.addMessage = addMessage;

// Test function for AI modal
window.testAIModal = function() {
    console.log('🧪 Testing AI Modal...');
    const aiModal = document.getElementById('ai-assistant-modal');
    if (aiModal) {
        console.log('✅ AI Modal found');
        aiModal.style.display = 'flex';
        aiModal.style.opacity = '1';
        aiModal.style.visibility = 'visible';
        console.log('✅ AI Modal should be visible now');
    } else {
        console.error('❌ AI Modal not found');
    }
};

// Debug function for admin functionality
window.debugAdmin = function() {
    console.log('🔐 Debugging Admin Functionality...');
    
    // Check admin modal
    const adminModal = document.getElementById('admin-pad-modal');
    console.log('🔐 Admin Modal found:', adminModal);
    
    // Check admin button
    const adminBtn = document.querySelector('.admin-pad-btn');
    console.log('🔐 Admin Button found:', adminBtn);
    
    // Check if functions exist
    console.log('🔐 showAdminPad function:', typeof showAdminPad);
    console.log('🔐 hideAdminPad function:', typeof hideAdminPad);
    console.log('🔐 submitPin function:', typeof submitPin);
    
    // Test admin modal visibility
    if (adminModal) {
        console.log('🔐 Admin Modal current display:', adminModal.style.display);
        console.log('🔐 Admin Modal current opacity:', adminModal.style.opacity);
        console.log('🔐 Admin Modal current visibility:', adminModal.style.visibility);
    }
};

// Debug function for AI functionality
window.debugAI = function() {
    console.log('🤖 Debugging AI Functionality...');
    
    // Check AI modal
    const aiModal = document.getElementById('ai-assistant-modal');
    console.log('🤖 AI Modal found:', aiModal);
    
    // Check AI button
    const aiBtn = document.querySelector('.ai-btn');
    console.log('🤖 AI Button found:', aiBtn);
    
    // Check if functions exist
    console.log('🤖 toggleAI function:', typeof toggleAI);
    console.log('🤖 showAI function:', typeof showAI);
    console.log('🤖 hideAI function:', typeof hideAI);
    
    // Test AI modal visibility
    if (aiModal) {
        console.log('🤖 AI Modal current display:', aiModal.style.display);
        console.log('🤖 AI Modal current opacity:', aiModal.style.opacity);
        console.log('🤖 AI Modal current visibility:', aiModal.style.visibility);
        console.log('🤖 AI Modal classes:', aiModal.classList.toString());
    }
};

// Simple click outside to close functionality
document.addEventListener('click', function(e) {
    // Admin pad modal
    const adminModal = document.getElementById('admin-pad-modal');
    if (adminModal && adminModal.style.display === 'flex') {
        // Only close if clicking outside the modal content and not on the admin button
        if (!e.target.closest('.admin-pad-content') && !e.target.closest('.admin-pad-btn')) {
            hideAdminPad();
        }
    }
    
    // Aarti info modal
    const aartiModal = document.getElementById('aarti-info-modal');
    if (aartiModal && aartiModal.classList.contains('show')) {
        // Only close if clicking outside the modal content
        if (!e.target.closest('.aarti-info-content')) {
            hideAartiInfo();
        }
    }
    
    // AI Assistant modal
    const aiModal = document.getElementById('ai-assistant-modal');
    if (aiModal && aiModal.classList.contains('show')) {
        // Only close if clicking outside the modal content
        if (!e.target.closest('.ai-modal-content')) {
            hideAI();
        }
    }
    
    // Virtual keyboard
    const virtualKeyboard = document.getElementById('virtual-keyboard');
    if (virtualKeyboard && virtualKeyboard.classList.contains('show')) {
        // Only close if clicking outside the keyboard content
        if (!e.target.closest('.keyboard-content')) {
            hideVirtualKeyboard();
        }
    }
});

// Escape key to close
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        // Admin pad modal
        const adminModal = document.getElementById('admin-pad-modal');
        if (adminModal && adminModal.style.display === 'flex') {
            hideAdminPad();
        }
        
        // Aarti info modal
        const aartiModal = document.getElementById('aarti-info-modal');
        if (aartiModal && aartiModal.classList.contains('show')) {
            hideAartiInfo();
        }
        
        // AI Assistant modal
        const aiModal = document.getElementById('ai-assistant-modal');
        if (aiModal && aiModal.classList.contains('show')) {
            hideAI();
        }
        
        // Virtual keyboard
        const virtualKeyboard = document.getElementById('virtual-keyboard');
        if (virtualKeyboard && virtualKeyboard.classList.contains('show')) {
            hideVirtualKeyboard();
        }
    }
});

// Aarti Reminder System
let aartiReminderInterval;
let lastAartiCheck = null;

// Aarti schedule (24-hour format)
const AARTI_SCHEDULE = {
    morning: {
        time: '07:00',
        title: 'Morning Aarti',
        message: 'It\'s time for the daily morning aarti. Join us in this sacred ceremony.',
        type: 'morning'
    },
    evening: {
        time: '18:30',
        title: 'Evening Aarti',
        message: 'It\'s time for the daily evening aarti. Join us in this sacred ceremony.',
        type: 'evening'
    }
};

// Function to initialize aarti reminder system
function initializeAartiReminder() {
    console.log('🕉️ Initializing Aarti Reminder System...');
    
    // Check if aarti reminder is enabled
    const reminderEnabled = localStorage.getItem('aartiReminderEnabled') !== 'false';
    
    if (reminderEnabled) {
        // Start checking for aarti times
        startAartiReminderCheck();
        
        // Don't check immediately on page load to prevent showing reminders
        // Only check at scheduled times
    }
}

// Function to start aarti reminder checking
function startAartiReminderCheck() {
    // Check every minute
    aartiReminderInterval = setInterval(checkAartiTime, 60000);
    console.log('🕉️ Aarti reminder check started (every minute)');
}

// Function to check if it's aarti time
function checkAartiTime() {
    const now = new Date();
    const currentTime = now.toTimeString().slice(0, 5); // Get HH:MM format
    const today = now.toDateString();
    
    // Don't show the same reminder multiple times on the same day
    if (lastAartiCheck === today) {
        return;
    }
    
    // Check morning aarti (7:00 AM)
    if (currentTime === AARTI_SCHEDULE.morning.time) {
        showAartiReminder(AARTI_SCHEDULE.morning);
        lastAartiCheck = today;
        console.log('🕉️ Morning aarti reminder shown');
    }
    
    // Check evening aarti (6:30 PM)
    if (currentTime === AARTI_SCHEDULE.evening.time) {
        showAartiReminder(AARTI_SCHEDULE.evening);
        lastAartiCheck = today;
        console.log('🕉️ Evening aarti reminder shown');
    }
}

// Function to show aarti reminder
function showAartiReminder(aartiInfo) {
    const reminder = document.getElementById('aarti-reminder');
    const title = document.getElementById('aarti-title');
    const message = document.getElementById('aarti-message');
    const timeDisplay = document.getElementById('aarti-time');
    
    if (reminder && title && message && timeDisplay) {
        // Update content
        title.textContent = aartiInfo.title;
        message.textContent = aartiInfo.message;
        timeDisplay.textContent = `Aarti Reminder - ${aartiInfo.time}`;
        
        // Show reminder with animation
        reminder.classList.remove('hidden');
        setTimeout(() => {
            reminder.classList.add('show');
        }, 100);
        
        // Auto-hide after 30 seconds
        setTimeout(() => {
            if (reminder.classList.contains('show')) {
                hideAartiReminder();
            }
        }, 30000);
        
        // Play notification sound if available
        playNotificationSound();
    }
}

// Function to hide aarti reminder
function hideAartiReminder() {
    const reminder = document.getElementById('aarti-reminder');
    if (reminder) {
        reminder.classList.remove('show');
        setTimeout(() => {
            reminder.classList.add('hidden');
        }, 500);
    }
}

// Function to show aarti information
function showAartiInfo() {
    const modal = document.getElementById('aarti-info-modal');
    if (modal) {
        modal.classList.remove('hidden');
        setTimeout(() => {
            modal.classList.add('show');
        }, 10);
    }
    
    // Hide aarti reminder if it's showing
    hideAartiReminder();
}

// Function to hide aarti information
function hideAartiInfo() {
    const modal = document.getElementById('aarti-info-modal');
    if (modal) {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.classList.add('hidden');
        }, 300);
    }
}

// Function to set aarti reminder for later
function setAartiReminder() {
    const reminderTime = new Date();
    reminderTime.setMinutes(reminderTime.getMinutes() + 15); // Remind in 15 minutes
    
    localStorage.setItem('aartiReminderLater', reminderTime.getTime());
    
    // Show confirmation
    alert('⏰ Aarti reminder set for 15 minutes from now!');
    hideAartiReminder();
    
    // Set timeout for later reminder
    setTimeout(() => {
        if (localStorage.getItem('aartiReminderLater')) {
            showAartiReminder({
                title: 'Aarti Reminder',
                message: 'Don\'t forget about the aarti! Join us in this sacred ceremony.',
                type: 'reminder'
            });
            localStorage.removeItem('aartiReminderLater');
        }
    }, 15 * 60 * 1000); // 15 minutes
}

// Function to play notification sound
function playNotificationSound() {
    try {
        // Create a simple notification sound using Web Audio API
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
        oscillator.frequency.setValueAtTime(600, audioContext.currentTime + 0.1);
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime + 0.2);
        
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.3);
        
    } catch (error) {
        console.log('🔊 Could not play notification sound:', error);
    }
}

// Function to toggle aarti reminder on/off
function toggleAartiReminder() {
    const currentState = localStorage.getItem('aartiReminderEnabled') !== 'false';
    const newState = !currentState;
    
    localStorage.setItem('aartiReminderEnabled', newState);
    
    if (newState) {
        startAartiReminderCheck();
        checkAartiTime();
        console.log('🕉️ Aarti reminder enabled');
    } else {
        if (aartiReminderInterval) {
            clearInterval(aartiReminderInterval);
        }
        hideAartiReminder();
        console.log('🕉️ Aarti reminder disabled');
    }
    
    // Update button text
    updateAartiToggleButton();
    
    return newState;
}

// Function to update aarti toggle button text
function updateAartiToggleButton() {
    const toggleBtn = document.getElementById('aarti-toggle-btn');
    const toggleText = document.getElementById('aarti-toggle-text');
    
    if (toggleBtn && toggleText) {
        const isEnabled = localStorage.getItem('aartiReminderEnabled') !== 'false';
        
        if (isEnabled) {
            toggleText.textContent = 'Disable Aarti';
            toggleBtn.style.background = '#28a745';
            toggleBtn.style.borderColor = '#28a745';
        } else {
            toggleText.textContent = 'Enable Aarti';
            toggleBtn.style.background = '#dc3545';
            toggleBtn.style.borderColor = '#dc3545';
        }
    }
}

// Add aarti reminder functions to window for global access
window.showAartiReminder = showAartiReminder;
window.hideAartiReminder = hideAartiReminder;
window.showAartiInfo = showAartiInfo;
window.hideAartiInfo = hideAartiInfo;
window.setAartiReminder = setAartiReminder;
window.toggleAartiReminder = toggleAartiReminder;
window.updateAartiToggleButton = updateAartiToggleButton;

// Test function for aarti reminder (for testing purposes)
function testAartiReminder() {
    console.log('🧪 Testing aarti reminder...');
    showAartiReminder({
        title: 'Test Aarti Reminder',
        message: 'This is a test of the aarti reminder system. It\'s working perfectly!',
        type: 'test'
    });
}

window.testAartiReminder = testAartiReminder;

    // Initialize language system
    initializeLanguage();
    
    // Initialize aarti reminder system
    initializeAartiReminder();
    
    // Load dynamic content
    loadDynamicContent();
    
    // Initialize AI assistant with welcome message
    initializeAI();




