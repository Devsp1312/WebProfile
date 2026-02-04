// ============================================
// PORTFOLIO INTERACTIVE FEATURES
// ============================================

// ==========================================
// EMAILJS CONFIGURATION
// ==========================================
// TO SET UP EMAIL RECEIVING:
// 1. Go to https://www.emailjs.com/ and create a free account
// 2. Add an email service (Gmail, Outlook, etc.)
// 3. Create an email template with variables: {{from_name}}, {{from_email}}, {{message}}
// 4. Get your Public Key from Account > API Keys
// 5. Replace the values below:

const EMAILJS_CONFIG = {
  SERVICE_ID: 'service_wfckjcx',      // Replace with your EmailJS service ID
  TEMPLATE_ID: 'template_bsnj9z9',    // Replace with your EmailJS template ID
  PUBLIC_KEY: '3M-5gDorGtP9tLiOq'       // Replace with your EmailJS public key
};

document.addEventListener('DOMContentLoaded', () => {
  
  // Initialize EmailJS
  if (typeof emailjs !== 'undefined' && EMAILJS_CONFIG.PUBLIC_KEY !== 'YOUR_PUBLIC_KEY') {
    emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
  }
  // ==========================================
  // MOBILE NAVIGATION TOGGLE
  // ==========================================
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  // Toggle mobile menu
  if (navToggle) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      
      // Animate hamburger icon
      const spans = navToggle.querySelectorAll('span');
      if (navMenu.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(6px, 6px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(6px, -6px)';
      } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      }
    });
  }

  // Close mobile menu when clicking on a link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        const spans = navToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      }
    });
  });

  // ==========================================
  // SMOOTH SCROLLING FOR ANCHOR LINKS
  // ==========================================
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  
  anchorLinks.forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      
      if (targetId === '#' || !targetId) return;
      
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        const navHeight = document.querySelector('.nav').offsetHeight;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // ==========================================
  // ACTIVE NAVIGATION HIGHLIGHTING
  // ==========================================
  const sections = document.querySelectorAll('section[id]');
  
  function highlightActiveNav() {
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
      
      if (navLink) {
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          navLinks.forEach(link => link.classList.remove('active'));
          navLink.classList.add('active');
        }
      }
    });
  }

  // Initial call and scroll listener
  window.addEventListener('scroll', highlightActiveNav);
  highlightActiveNav();

  // ==========================================
  // FADE-IN ANIMATIONS ON SCROLL
  // ==========================================
  const fadeInSections = document.querySelectorAll('.fade-in-section');
  
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  fadeInSections.forEach(section => {
    observer.observe(section);
  });

  // ==========================================
  // CONTACT FORM VALIDATION & HANDLING
  // ==========================================
  const contactForm = document.querySelector('.contact-form');
  
  if (contactForm) {
    const nameInput = contactForm.querySelector('#name');
    const emailInput = contactForm.querySelector('#email');
    const messageInput = contactForm.querySelector('#message');
    const successMessage = contactForm.querySelector('.form-success');
    
    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    // Clear error on input
    [nameInput, emailInput, messageInput].forEach(input => {
      input.addEventListener('input', function() {
        const errorElement = this.parentElement.querySelector('.error-message');
        errorElement.textContent = '';
        this.style.borderColor = '';
      });
    });
    
    // Form submission
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Clear previous messages
      successMessage.textContent = '';
      const errorMessages = contactForm.querySelectorAll('.error-message');
      errorMessages.forEach(msg => msg.textContent = '');
      
      let isValid = true;
      
      // Validate name
      if (nameInput.value.trim().length < 2) {
        showError(nameInput, 'Please enter a valid name (at least 2 characters)');
        isValid = false;
      }
      
      // Validate email
      if (!emailRegex.test(emailInput.value.trim())) {
        showError(emailInput, 'Please enter a valid email address');
        isValid = false;
      }
      
      // Validate message
      if (messageInput.value.trim().length < 10) {
        showError(messageInput, 'Please enter a message (at least 10 characters)');
        isValid = false;
      }
      
      // If valid, send email
      if (isValid) {
        // Check if EmailJS is configured
        if (typeof emailjs === 'undefined' || EMAILJS_CONFIG.PUBLIC_KEY === 'YOUR_PUBLIC_KEY') {
          successMessage.textContent = '⚠️ Email service not configured yet. See setup instructions in script.js';
          successMessage.style.color = '#ff9500';
          successMessage.style.display = 'block';
          return;
        }
        
        // Show sending state
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.textContent;
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;
        
        // Prepare email parameters
        const templateParams = {
          from_name: nameInput.value.trim(),
          from_email: emailInput.value.trim(),
          message: messageInput.value.trim(),
          to_email: 'devpatel0276@gmail.com' // Your email address
        };
        
        // Send email using EmailJS
        emailjs.send(EMAILJS_CONFIG.SERVICE_ID, EMAILJS_CONFIG.TEMPLATE_ID, templateParams)
          .then(() => {
            // Success
            successMessage.textContent = '✓ Message sent successfully! I\'ll get back to you soon.';
            successMessage.style.color = '#34c759';
            successMessage.style.display = 'block';
            
            // Clear form
            contactForm.reset();
            
            // Scroll to success message
            successMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            
            // Reset button
            submitButton.textContent = originalButtonText;
            submitButton.disabled = false;
            
            // Hide success message after 5 seconds
            setTimeout(() => {
              successMessage.textContent = '';
            }, 5000);
          })
          .catch((error) => {
            // Error
            console.error('EmailJS Error:', error);
            successMessage.textContent = '✗ Failed to send message. Please try again or email me directly.';
            successMessage.style.color = '#ff3b30';
            successMessage.style.display = 'block';
            
            // Reset button
            submitButton.textContent = originalButtonText;
            submitButton.disabled = false;
            
            // Hide error message after 7 seconds
            setTimeout(() => {
              successMessage.textContent = '';
            }, 7000);
          });
      }
    });
    
    function showError(input, message) {
      const errorElement = input.parentElement.querySelector('.error-message');
      errorElement.textContent = message;
      input.style.borderColor = '#ff3b30';
      
      // Focus on first error
      if (input.parentElement === contactForm.querySelector('.form-group')) {
        input.focus();
      }
    }
  }

  // ==========================================
  // NAVIGATION BACKGROUND ON SCROLL
  // ==========================================
  const nav = document.querySelector('.nav');
  
  function handleNavScroll() {
    if (window.scrollY > 50) {
      nav.style.backgroundColor = 'rgba(250, 250, 250, 0.95)';
      nav.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
    } else {
      nav.style.backgroundColor = 'rgba(250, 250, 250, 0.8)';
      nav.style.boxShadow = 'none';
    }
  }
  
  window.addEventListener('scroll', handleNavScroll);
  handleNavScroll();

  // ==========================================
  // PREVENT CONSOLE ERRORS FOR PLACEHOLDER LINKS
  // ==========================================
  const placeholderLinks = document.querySelectorAll('a[href="#"]');
  placeholderLinks.forEach(link => {
    // Only add handler if it's not already handled by smooth scroll
    if (!link.getAttribute('href').startsWith('#') || link.getAttribute('href') === '#') {
      link.addEventListener('click', (e) => {
        if (link.getAttribute('href') === '#') {
          e.preventDefault();
        }
      });
    }
  });

  // ==========================================
  // PRELOAD OPTIMIZATION
  // ==========================================
  // Add preload hints for critical resources
  const addPreloadHints = () => {
    // This is a placeholder for any preloading logic
    // Currently handled by browser defaults
  };
  
  addPreloadHints();
  
  console.log('✓ Portfolio loaded successfully!');
});
