(() => {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initComicStats);
  } else {
    initComicStats();
  }

  function initComicStats() {
    const statElements = document.querySelectorAll('[data-count]');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const element = entry.target;
          const target = element.getAttribute('data-count');
          
          // Simple count up
          let current = 0;
          const increment = target / 50;
          
          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              element.textContent = target;
              clearInterval(timer);
            } else {
              element.textContent = Math.floor(current);
            }
          }, 50);
          
          observer.unobserve(element);
        }
      });
    }, { threshold: 0.5 });

    statElements.forEach(el => observer.observe(el));
  }
})();
