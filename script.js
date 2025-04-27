// DOM Elements
const header = document.querySelector('.header');
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const menuIcon = document.querySelector('.menu-icon');
const closeIcon = document.querySelector('.close-icon');
const mobileNav = document.querySelector('.mobile-nav');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
const bookButtons = document.querySelectorAll('.book-btn');
const viewAllServicesBtn = document.getElementById('view-all-services-btn');
const bookingModal = document.getElementById('booking-modal');
const allServicesModal = document.getElementById('all-services-modal');
const modalCloseButtons = document.querySelectorAll('.modal-close');
const serviceDetails = document.getElementById('service-details');
const paymentOptions = document.querySelectorAll('.payment-option');
const bookingContent = document.querySelector('.booking-content');
const thankYouContent = document.querySelector('.thank-you-content');
const closeThankYouBtn = document.querySelector('.close-thank-you');
const closeServicesBtn = document.querySelector('.close-services');
const contactForm = document.getElementById('contact-form');
const formSuccessMessage = document.querySelector('.form-success-message');
const currentYearElements = document.querySelectorAll('#current-year');
const reviewsTrack = document.querySelector('.reviews-track');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const dots = document.querySelectorAll('.dot');
const galleryItems = document.querySelectorAll('.gallery-item');
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.querySelector('.lightbox-image');
const lightboxCaption = document.querySelector('.lightbox-caption');
const lightboxClose = document.querySelector('.lightbox-close');

// Set current year in footer
currentYearElements.forEach(el => {
    el.textContent = new Date().getFullYear();
});

// Header scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Mobile menu toggle
if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileNav.classList.toggle('hidden');
        menuIcon.classList.toggle('hidden');
        closeIcon.classList.toggle('hidden');
    });
}

// Close mobile menu when a link is clicked
mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileNav.classList.add('hidden');
        menuIcon.classList.remove('hidden');
        closeIcon.classList.add('hidden');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Book appointment buttons
bookButtons.forEach(button => {
    button.addEventListener('click', () => {
        const service = button.getAttribute('data-service');
        const price = button.getAttribute('data-price');
        
        serviceDetails.innerHTML = `
            <p class="font-medium text-gray-800">${service}</p>
            <p class="text-pink-600 font-bold">${price}</p>
        `;
        
        bookingContent.classList.remove('hidden');
        thankYouContent.classList.add('hidden');
        bookingModal.classList.remove('hidden');
    });
});

// View all services button
if (viewAllServicesBtn) {
    viewAllServicesBtn.addEventListener('click', () => {
        allServicesModal.classList.remove('hidden');
    });
}

// Close modals
modalCloseButtons.forEach(button => {
    button.addEventListener('click', () => {
        bookingModal.classList.add('hidden');
        allServicesModal.classList.add('hidden');
    });
});

// Payment options
paymentOptions.forEach(option => {
    option.addEventListener('click', () => {
        const paymentMethod = option.getAttribute('data-payment');
        
        if (paymentMethod === 'cash') {
            bookingContent.classList.add('hidden');
            thankYouContent.classList.remove('hidden');
        } else if (paymentMethod === 'googlePay') {
            window.open('https://pay.google.com', '_blank');
            bookingModal.classList.add('hidden');
        } else if (paymentMethod === 'paytm') {
            window.open('https://paytm.com', '_blank');
            bookingModal.classList.add('hidden');
        }
    });
});

// Close thank you message
if (closeThankYouBtn) {
    closeThankYouBtn.addEventListener('click', () => {
        bookingModal.classList.add('hidden');
    });
}

// Close services modal
if (closeServicesBtn) {
    closeServicesBtn.addEventListener('click', () => {
        allServicesModal.classList.add('hidden');
    });
}

// Contact form submission
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // In a real application, you would send the form data to your server
        // For demo purposes, we'll just show the success message
        
        contactForm.classList.add('hidden');
        formSuccessMessage.classList.remove('hidden');
        
        // Reset form
        contactForm.reset();
    });
}

// Reviews carousel
let activeIndex = 0;
let autoplayInterval;

function updateCarousel() {
    if (!reviewsTrack) return;
    
    reviewsTrack.style.transform = `translateX(-${activeIndex * 100}%)`;
    
    dots.forEach((dot, index) => {
        if (index === activeIndex) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

function startAutoplay() {
    autoplayInterval = setInterval(() => {
        activeIndex = (activeIndex + 1) % dots.length;
        updateCarousel();
    }, 5000);
}

function stopAutoplay() {
    clearInterval(autoplayInterval);
}

if (reviewsTrack) {
    // Initialize carousel
    updateCarousel();
    startAutoplay();
    
    // Previous button
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            stopAutoplay();
            activeIndex = (activeIndex - 1 + dots.length) % dots.length;
            updateCarousel();
        });
    }
    
    // Next button
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            stopAutoplay();
            activeIndex = (activeIndex + 1) % dots.length;
            updateCarousel();
        });
    }
    
    // Dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            stopAutoplay();
            activeIndex = index;
            updateCarousel();
        });
    });
}

// Gallery lightbox
galleryItems.forEach(item => {
    item.addEventListener('click', () => {
        const imgSrc = item.getAttribute('data-src');
        const imgAlt = item.getAttribute('data-alt');
        
        lightboxImage.src = imgSrc;
        lightboxImage.alt = imgAlt;
        lightboxCaption.textContent = imgAlt;
        
        lightbox.classList.remove('hidden');
    });
});

// Close lightbox
if (lightboxClose) {
    lightboxClose.addEventListener('click', () => {
        lightbox.classList.add('hidden');
    });
}

// Close lightbox on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !lightbox.classList.contains('hidden')) {
        lightbox.classList.add('hidden');
    }
});

// Close lightbox when clicking outside the image
if (lightbox) {
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.classList.add('hidden');
        }
    });
}
