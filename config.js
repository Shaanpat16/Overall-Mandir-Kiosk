// Edison Mandir Kiosk Configuration
// Modify these settings to customize the kiosk content

const MANDIR_CONFIG = {
    // Mandir Information
    name: "Edison Mandir",
    location: "Edison, New Jersey",
    phone: "+1 (555) 123-4567",
    email: "info@edisonmandir.com",
    
    // Timings Configuration
    timings: {
        morningAarti: "6:00 AM - 7:00 AM",
        darshanHours: "7:00 AM - 12:00 PM",
        afternoonBreak: "12:00 PM - 4:00 PM",
        eveningAarti: "6:00 PM - 7:00 PM",
        eveningDarshan: "7:00 PM - 9:00 PM"
    },
    
    // Weekly Schedule
    weeklySchedule: {
        monday: {
            morningAarti: "6:00 AM - 7:00 AM",
            darshan: "7:00 AM - 12:00 PM, 7:00 PM - 9:00 PM",
            eveningAarti: "6:00 PM - 7:00 PM"
        },
        tuesday: {
            morningAarti: "6:00 AM - 7:00 AM",
            darshan: "7:00 AM - 12:00 PM, 7:00 PM - 9:00 PM",
            eveningAarti: "6:00 PM - 7:00 PM"
        },
        wednesday: {
            morningAarti: "6:00 AM - 7:00 AM",
            darshan: "7:00 AM - 12:00 PM, 7:00 PM - 9:00 PM",
            eveningAarti: "6:00 PM - 7:00 PM"
        },
        thursday: {
            morningAarti: "6:00 AM - 7:00 AM",
            darshan: "7:00 AM - 12:00 PM, 7:00 PM - 9:00 PM",
            eveningAarti: "6:00 PM - 7:00 PM"
        },
        friday: {
            morningAarti: "6:00 AM - 7:00 AM",
            darshan: "7:00 AM - 12:00 PM, 7:00 PM - 9:00 PM",
            eveningAarti: "6:00 PM - 7:00 PM"
        },
        saturday: {
            morningAarti: "6:00 AM - 7:00 AM",
            darshan: "7:00 AM - 12:00 PM, 7:00 PM - 9:00 PM",
            eveningAarti: "6:00 PM - 7:00 PM"
        },
        sunday: {
            morningAarti: "6:00 AM - 7:00 AM",
            darshan: "7:00 AM - 12:00 PM, 7:00 PM - 9:00 PM",
            eveningAarti: "6:00 PM - 7:00 PM",
            yogaClasses: "8:00 AM - 9:00 AM"
        }
    },
    
    // Upcoming Activities
    activities: [
        {
            name: "Bhajan Sandhya",
            date: "15 Dec",
            time: "7:00 PM - 8:30 PM",
            description: "Evening devotional singing session",
            category: "Spiritual"
        },
        {
            name: "Yoga Classes",
            date: "20 Dec",
            time: "8:00 AM - 9:00 AM",
            description: "Morning yoga and meditation session",
            category: "Wellness"
        },
        {
            name: "Special Puja",
            date: "25 Dec",
            time: "10:00 AM - 12:00 PM",
            description: "Special puja for peace and prosperity",
            category: "Spiritual"
        },
        {
            name: "Bhagavad Gita Class",
            date: "30 Dec",
            time: "6:00 PM - 7:30 PM",
            description: "Weekly Bhagavad Gita study session",
            category: "Education"
        }
    ],
    
    // AI Assistant Responses
    aiResponses: {
        timing: "The mandir is open from 7:00 AM to 12:00 PM and 7:00 PM to 9:00 PM daily. Morning aarti is from 6:00-7:00 AM and evening aarti is from 6:00-7:00 PM.",
        aarti: "Aarti ceremonies are held twice daily - morning at 6:00 AM and evening at 6:00 PM. These are beautiful devotional ceremonies with singing and offerings.",
        activities: "We have various activities including Bhajan Sandhya (devotional singing), Yoga classes, and special pujas. Check the Activities section for upcoming events.",
        location: "The mandir is located in Edison, New Jersey. We welcome all devotees for darshan and prayers.",
        puja: "Special pujas can be arranged for various occasions. Please contact the mandir office for scheduling and more information.",
        yoga: "Yoga classes are held every Sunday morning from 8:00 AM to 9:00 AM. All levels are welcome.",
        bhajan: "Bhajan Sandhya (devotional singing) sessions are held regularly. Check our activities calendar for the next session.",
        darshan: "Darshan hours are 7:00 AM to 12:00 PM and 7:00 PM to 9:00 PM daily. The mandir is closed from 12:00 PM to 4:00 PM."
    },
    
    // Gallery Images
    gallery: [
        {
            src: "https://images.unsplash.com/photo-1542810634-71277d95dcbb?w=400&h=300&fit=crop",
            alt: "Mandir Exterior",
            title: "Mandir Exterior"
        },
        {
            src: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
            alt: "Prayer Hall",
            title: "Prayer Hall"
        },
        {
            src: "https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=400&h=300&fit=crop",
            alt: "Aarti Ceremony",
            title: "Aarti Ceremony"
        },
        {
            src: "https://images.unsplash.com/photo-1542810634-71277d95dcbb?w=400&h=300&fit=crop",
            alt: "Festival Celebration",
            title: "Festival Celebration"
        }
    ],
    
    // Display Settings
    display: {
        refreshInterval: 60000, // 1 minute
        screenSaverTimeout: 300000, // 5 minutes
        autoScroll: true,
        touchFeedback: true
    },
    
    // Contact Information
    contact: {
        address: "123 Main Street, Edison, NJ 08820",
        phone: "+1 (555) 123-4567",
        email: "info@edisonmandir.com",
        website: "www.edisonmandir.com"
    }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MANDIR_CONFIG;
} else {
    window.MANDIR_CONFIG = MANDIR_CONFIG;
}
