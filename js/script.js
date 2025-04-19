document.addEventListener('DOMContentLoaded', () => {
  // Highlight current navigation link
  const navLinks = document.querySelectorAll('nav a');
  const path = window.location.pathname.split('/').pop() || 'index.html';
  navLinks.forEach(link => {
    if (link.getAttribute('href') === path) {
      link.classList.add('active');
    }
  });
  // Removed AOS library; using custom IntersectionObserver for fade-in animations

  // Smooth scrolling for in-page anchors
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
  // Fade-in on scroll for sections with class 'fade-in-section'
  const fadeInSections = document.querySelectorAll('.fade-in-section');
  const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      }
    });
  }, observerOptions);
  fadeInSections.forEach(section => observer.observe(section));
});
