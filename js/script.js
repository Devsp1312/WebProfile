document.addEventListener('DOMContentLoaded', () => {
  // Highlight current navigation link
  const navLinks = document.querySelectorAll('nav a');
  const path = window.location.pathname.split('/').pop() || 'index.html';
  navLinks.forEach(link => {
    if (link.getAttribute('href') === path) {
      link.classList.add('active');
    }
  });
  AOS.init({ duration: 800, once: true });

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
});
