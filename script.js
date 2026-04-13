// DOM Elements
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinksContainer = document.getElementById('nav-links');
const navLinks = document.querySelectorAll('.nav-link');
const contactForm = document.getElementById('contact-form');

// Sticky Navbar Background on Scroll
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    updateActiveNavLink();
});

// Mobile Menu Toggle
hamburger.addEventListener('click', () => {
    navLinksContainer.classList.toggle('nav-active');
    // Toggle hamburger icon
    const icon = hamburger.querySelector('i');
    if (navLinksContainer.classList.contains('nav-active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Close mobile menu when a link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navLinksContainer.classList.remove('nav-active');
        const icon = hamburger.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    });
});

// Highlight active section link on scroll
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section, header');
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// Intersection Observer for Scroll Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
            observer.unobserve(entry.target); // Run animation only once
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
    const hiddenElements = document.querySelectorAll('.hidden');
    hiddenElements.forEach((el) => observer.observe(el));
    
    // Check initial scroll position for active link
    updateActiveNavLink();
});

// Form Submission handling via FormSubmit.co AJAX API
if(contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Grab values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        const submitBtn = contactForm.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;
        
        // Simulating sending state
        submitBtn.innerHTML = '<span>Sending...</span> <i class="fas fa-spinner fa-spin"></i>';
        submitBtn.style.opacity = '0.8';
        submitBtn.disabled = true;
        
        // Execute AJAX POST to FormSubmit.co
        fetch("https://formsubmit.co/ajax/anirudhknarayanan611@gmail.com", {
            method: "POST",
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                email: email,
                message: message
            })
        })
        .then(response => response.json())
        .then(data => {
            submitBtn.innerHTML = '<span>Message Sent!</span> <i class="fas fa-check"></i>';
            submitBtn.style.background = '#10b981'; // Success green
            
            // Reset form
            contactForm.reset();
            
            // Reset button after 3 seconds
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.style.background = ''; // Revert to original
                submitBtn.style.opacity = '1';
                submitBtn.disabled = false;
            }, 3000);
        })
        .catch(error => {
            console.log("Form submission error:", error);
            submitBtn.innerHTML = '<span>Error Sending</span> <i class="fas fa-times"></i>';
            submitBtn.style.background = '#ef4444'; // Error red
            
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.style.background = ''; 
                submitBtn.style.opacity = '1';
                submitBtn.disabled = false;
            }, 3000);
        });
    });
}
