(() => {
    // Intersection Observer for scroll animations
    const observerOptions = {
      rootMargin: '0px 0px -10% 0px',
      threshold: 0.15
    };
  
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);
  
    // Observe all reveal and stagger elements
    const animatedElements = document.querySelectorAll('.reveal, .stagger');
    animatedElements.forEach((el) => observer.observe(el));
  
    // Parallax scrolling for background layers
    const layers = document.querySelectorAll('#parallax-layers .layer');
    let ticking = false;
  
    function updateParallax() {
      const scrollY = window.pageYOffset;
      
      layers.forEach((layer, index) => {
        const depth = (index + 1) * 0.03;
        const yPos = scrollY * depth * -1;
        layer.style.transform = `translate3d(0, ${yPos}px, 0)`;
      });
      
      ticking = false;
    }
  
    function requestTick() {
      if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
      }
    }
  
    window.addEventListener('scroll', requestTick, { passive: true });
  })();
  