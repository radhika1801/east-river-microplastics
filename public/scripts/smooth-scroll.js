(() => {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSimpleScroll);
  } else {
    initSimpleScroll();
  }

  function initSimpleScroll() {
    // Simple reveal on scroll
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    // Observe elements
    document.querySelectorAll('.reveal, .enhanced-section').forEach(el => {
      el.classList.add('reveal');
      observer.observe(el);
    });

    // Scroll indicator click
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
      scrollIndicator.addEventListener('click', () => {
        const firstSection = document.querySelector('.enhanced-section');
        if (firstSection) {
          firstSection.scrollIntoView({ behavior: 'smooth' });
        }
      });
    }
  }
})();
