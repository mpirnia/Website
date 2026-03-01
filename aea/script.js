// Mobile Navigation Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});


// Navbar scroll effect
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
    
    lastScroll = currentScroll;
});

// Smooth scroll for same-page anchor links only
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            const offsetTop = target.offsetTop - 70;
            window.scrollTo({ top: offsetTop, behavior: 'smooth' });
        }
    });
});

// Active navigation link: highlight current page (and Research when on a research sub-page)
function setActiveNavLink() {
    const navItems = document.querySelectorAll('.nav-menu > li > .nav-link');
    const path = window.location.pathname;
    const currentPage = path.split('/').pop() || 'index.html';
    const researchSubPages = ['electric-plane-studies.html', 'regional-integration.html', 'airport-infrastructure.html'];
    const disseminationSubPages = ['journal-publications.html', 'wisa-blogs.html', 'media.html', 'conference-publications.html'];

    navItems.forEach(item => {
        item.classList.remove('active');
        const linkPath = item.getAttribute('href') || '';
        const linkPage = linkPath.split('/').pop() || 'index.html';
        if (linkPage === currentPage) {
            item.classList.add('active');
        }
        if (linkPage === 'research.html' && researchSubPages.indexOf(currentPage) !== -1) {
            item.classList.add('active');
        }
        if (linkPage === 'publications.html' && disseminationSubPages.indexOf(currentPage) !== -1) {
            item.classList.add('active');
        }
    });
}
setActiveNavLink();

// Contact form handling
const contactForm = document.getElementById('contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            subject: formData.get('subject'),
            message: formData.get('message')
        };
        
        // Placeholder for form submission
        // In a real implementation, you would send this data to a server
        console.log('Form submitted:', data);
        
        // Show success message (placeholder)
        alert('Thank you for your message! This is a placeholder form. Please configure a backend service to handle form submissions.');
        
        // Reset form
        contactForm.reset();
    });
}

// Set current year in footer
const currentYearElement = document.getElementById('current-year');
if (currentYearElement) {
    currentYearElement.textContent = new Date().getFullYear();
}

// Fade in animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for fade-in animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.project-card, .publication-item, .tool-card, .team-card, .research-overview-card');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    const isClickInsideNav = navMenu.contains(e.target) || hamburger.contains(e.target);
    
    if (!isClickInsideNav && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// Media popup (home page)
const mediaPopup = document.getElementById('media-popup');
const mediaPopupTrigger = document.getElementById('media-popup-trigger');
const mediaPopupClose = document.getElementById('media-popup-close');

if (mediaPopup && mediaPopupTrigger) {
    mediaPopupTrigger.addEventListener('click', () => {
        mediaPopup.classList.add('is-open');
        mediaPopup.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    });
}

function closeMediaPopup() {
    if (mediaPopup) {
        mediaPopup.classList.remove('is-open');
        mediaPopup.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }
}

if (mediaPopupClose) {
    mediaPopupClose.addEventListener('click', closeMediaPopup);
}

if (mediaPopup) {
    mediaPopup.addEventListener('click', (e) => {
        if (e.target === mediaPopup) closeMediaPopup();
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mediaPopup.classList.contains('is-open')) {
            closeMediaPopup();
        }
    });
}
