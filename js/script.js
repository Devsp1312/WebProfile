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
  
  // ==========================================
  // PAGE LOAD OPTIMIZATION
  // ==========================================
  // Ensure smooth initial render
  document.body.style.visibility = 'visible';
  
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
  const staggerSections = document.querySelectorAll('.stagger-animation');
  
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -80px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        // Don't unobserve to allow re-animation if user scrolls back up (optional)
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  fadeInSections.forEach(section => {
    observer.observe(section);
  });
  
  staggerSections.forEach(section => {
    observer.observe(section);
  });

  // ==========================================
  // PARALLAX SCROLL EFFECT (Apple-style)
  // ==========================================
  const heroSection = document.querySelector('.hero');
  const parallaxElements = document.querySelectorAll('.parallax-scroll');
  
  function handleParallaxScroll() {
    const scrolled = window.pageYOffset;
    
    // Parallax effect on hero
    if (heroSection) {
      const heroContent = heroSection.querySelector('.container');
      if (heroContent && scrolled < window.innerHeight) {
        heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
        heroContent.style.opacity = 1 - (scrolled / window.innerHeight) * 0.8;
      }
    }
    
    // Parallax on specific elements
    parallaxElements.forEach(element => {
      const rect = element.getBoundingClientRect();
      const scrollPercent = (window.innerHeight - rect.top) / window.innerHeight;
      
      if (scrollPercent > 0 && scrollPercent < 1) {
        element.style.transform = `translateY(${scrollPercent * -20}px)`;
      }
    });
  }
  
  // Throttle parallax for performance
  let ticking = false;
  function requestParallaxUpdate() {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        handleParallaxScroll();
        ticking = false;
      });
      ticking = true;
    }
  }
  
  window.addEventListener('scroll', requestParallaxUpdate, { passive: true });
  
  // ==========================================
  // SHOWCASE CARDS - CURSOR GLOW EFFECT
  // ==========================================
  const showcaseCards = document.querySelectorAll('.showcase-card');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  showcaseCards.forEach(card => {
    let rafId = null;
    let targetX = 50;
    let targetY = 50;
    let currentX = 50;
    let currentY = 50;
    
    const lerp = (start, end, factor) => start + (end - start) * factor;
    
    const animateGlow = () => {
      currentX = lerp(currentX, targetX, 0.1);
      currentY = lerp(currentY, targetY, 0.1);
      
      card.style.setProperty('--glow-x', `${currentX}%`);
      card.style.setProperty('--glow-y', `${currentY}%`);
      
      if (Math.abs(currentX - targetX) > 0.1 || Math.abs(currentY - targetY) > 0.1) {
        rafId = requestAnimationFrame(animateGlow);
      } else {
        rafId = null;
      }
    };

    card.addEventListener('pointermove', (e) => {
      if (prefersReducedMotion) return;
      const rect = card.getBoundingClientRect();
      targetX = ((e.clientX - rect.left) / rect.width) * 100;
      targetY = ((e.clientY - rect.top) / rect.height) * 100;
      
      if (!rafId) {
        rafId = requestAnimationFrame(animateGlow);
      }
    }, { passive: true });

    card.addEventListener('pointerleave', () => {
      targetX = 50;
      targetY = 50;
      if (!rafId) {
        rafId = requestAnimationFrame(animateGlow);
      }
    }, { passive: true });
  });

  // ==========================================
  // STAGGERED ENTRANCE ANIMATION FOR CARDS
  // ==========================================
  const cardObserverOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, index * 100);
        cardObserver.unobserve(entry.target);
      }
    });
  }, cardObserverOptions);

  showcaseCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(40px)';
    card.style.transition = 'opacity 0.6s cubic-bezier(0.23, 1, 0.32, 1), transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)';
    card.style.transitionDelay = `${index * 0.1}s`;
    cardObserver.observe(card);
  });
  
  // ==========================================
  // SMOOTH CURSOR ANIMATIONS FOR LINKS
  // ==========================================
  const animatedLinks = document.querySelectorAll('a, button');
  
  animatedLinks.forEach(link => {
    link.addEventListener('mouseenter', function() {
      this.style.transition = 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    });
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
      nav.style.backgroundColor = 'rgba(12, 12, 12, 0.95)';
      nav.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.5)';
    } else {
      nav.style.backgroundColor = 'rgba(10, 10, 10, 0.7)';
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
  
  // ==========================================
  // RESUME VIEWER FUNCTIONALITY
  // ==========================================
  const toggleResumeBtn = document.getElementById('toggleResumeView');
  const closeResumeBtn = document.getElementById('closeResumeViewer');
  const resumeViewer = document.getElementById('resumeViewer');
  const resumeFrame = document.getElementById('resumeFrame');

  // Toggle resume viewer visibility
  if (toggleResumeBtn && resumeViewer) {
    toggleResumeBtn.addEventListener('click', () => {
      const isVisible = resumeViewer.style.display !== 'none';
      
      if (isVisible) {
        // Hide resume viewer
        resumeViewer.style.display = 'none';
        toggleResumeBtn.querySelector('span').textContent = 'View Resume';
      } else {
        // Show resume viewer
        resumeViewer.style.display = 'block';
        toggleResumeBtn.querySelector('span').textContent = 'Hide Resume';
        
        // Smooth scroll to resume viewer
        setTimeout(() => {
          resumeViewer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 100);
      }
    });
  }

  // Close button functionality
  if (closeResumeBtn && resumeViewer && toggleResumeBtn) {
    closeResumeBtn.addEventListener('click', () => {
      resumeViewer.style.display = 'none';
      toggleResumeBtn.querySelector('span').textContent = 'View Resume';
    });
  }

  // Close resume viewer when clicking outside
  if (resumeViewer) {
    resumeViewer.addEventListener('click', (e) => {
      if (e.target === resumeViewer) {
        resumeViewer.style.display = 'none';
        if (toggleResumeBtn) {
          toggleResumeBtn.querySelector('span').textContent = 'View Resume';
        }
      }
    });
  }
  
  // ==========================================
  // PERFORMANCE: Debounce resize events
  // ==========================================
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      // Recalculate positions after resize
      highlightActiveNav();
    }, 250);
  });
  
  // ==========================================
  // ANIMATED CURSOR TRAIL (OPTIONAL)
  // ==========================================
  const cursor = document.createElement('div');
  cursor.className = 'cursor-trail';
  document.body.appendChild(cursor);
  
  let mouseX = 0;
  let mouseY = 0;
  let cursorX = 0;
  let cursorY = 0;
  
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });
  
  function animateCursor() {
    const dx = mouseX - cursorX;
    const dy = mouseY - cursorY;
    
    cursorX += dx * 0.1;
    cursorY += dy * 0.1;
    
    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';
    
    requestAnimationFrame(animateCursor);
  }
  
  animateCursor();
  
  // ==========================================
  // SECTION NUMBER COUNTER ANIMATION
  // ==========================================
  const numberElements = document.querySelectorAll('.project-number, .work-item::before');
  
  const numberObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        numberObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  
  numberElements.forEach(el => numberObserver.observe(el));
  
  // ==========================================
  // TEXT REVEAL ANIMATION
  // ==========================================
  const textRevealElements = document.querySelectorAll('.section-title, .hero-title');
  
  textRevealElements.forEach(element => {
    const text = element.textContent;
    element.textContent = '';
    element.style.opacity = '1';
    
    const chars = text.split('');
    chars.forEach((char, index) => {
      const span = document.createElement('span');
      span.textContent = char === ' ' ? '\u00A0' : char;
      span.style.opacity = '0';
      span.style.display = 'inline-block';
      span.style.animation = `fadeInChar 0.5s ease forwards ${index * 0.03}s`;
      element.appendChild(span);
    });
  });
  
  // ==========================================
  // SCROLL PROGRESS INDICATOR
  // ==========================================
  const progressBar = document.createElement('div');
  progressBar.className = 'scroll-progress';
  document.body.appendChild(progressBar);
  
  window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    progressBar.style.width = scrolled + '%';
  }, { passive: true });
  
  // ==========================================
  // MAGNETIC BUTTONS
  // ==========================================
  const magneticButtons = document.querySelectorAll('.btn, .action-btn');
  
  magneticButtons.forEach(button => {
    button.addEventListener('mousemove', (e) => {
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      button.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px) scale(1.02)`;
    });
    
    button.addEventListener('mouseleave', () => {
      button.style.transform = '';
    });
  });
  
  // ==========================================
  // SECTION ENTRANCE ANIMATIONS
  // ==========================================
  const animatedSections = document.querySelectorAll('.section');
  
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, index * 100);
      }
    });
  }, { threshold: 0.15 });
  
  animatedSections.forEach(section => sectionObserver.observe(section));
  
  // ==========================================
  // WORK TIMELINE DOT ANIMATION
  // ==========================================
  const workItems = document.querySelectorAll('.work-item');
  
  const workObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.animation = `slideFromLeft 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards`;
        }, index * 150);
        workObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  
  workItems.forEach(item => workObserver.observe(item));
  
  // ==========================================
  // FLOATING ANIMATION FOR ICONS
  // ==========================================
  const floatingIcons = document.querySelectorAll('.panel-icon');
  
  floatingIcons.forEach((icon, index) => {
    icon.style.animation = `float 3s ease-in-out ${index * 0.2}s infinite`;
  });
  
  // ==========================================
  // PERFORMANCE MONITOR (DEV ONLY)
  // ==========================================
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    let frameCount = 0;
    let lastTime = performance.now();
    
    function monitorFPS() {
      frameCount++;
      const currentTime = performance.now();
      
      if (currentTime >= lastTime + 1000) {
        console.log(`FPS: ${frameCount}`);
        frameCount = 0;
        lastTime = currentTime;
      }
      
      requestAnimationFrame(monitorFPS);
    }
    
    monitorFPS();
  }
  
  console.log('✓ Portfolio loaded with advanced animations!');
});
