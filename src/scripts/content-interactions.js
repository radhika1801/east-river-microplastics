(() => {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initContentInteractions);
    } else {
      initContentInteractions();
    }
  
    function initContentInteractions() {
      // Cursor tracking
      let mouseX = 0, mouseY = 0;
      const cursor = document.getElementById('custom-cursor');
  
      document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
      });
  
      function updateCursor() {
        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';
        requestAnimationFrame(updateCursor);
      }
      updateCursor();
  
      // Hover states
      const hoverElements = document.querySelectorAll('.data-minimal, .image-card, .instruction-card, .nav-button');
      
      hoverElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
          document.body.setAttribute('data-cursor', 'hover');
        });
        
        element.addEventListener('mouseleave', () => {
          document.body.removeAttribute('data-cursor');
        });
      });
  
      // Scroll reveal
      const observerOptions = {
        rootMargin: '0px 0px -20% 0px',
        threshold: 0.1
      };
  
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
          }
        });
      }, observerOptions);
  
      document.querySelectorAll('.reveal').forEach(el => {
        observer.observe(el);
      });
  
      // Image hover effects
      const imageCards = document.querySelectorAll('.image-card');
      
      imageCards.forEach(card => {
        card.addEventListener('click', () => {
          const img = card.querySelector('img');
          createImageRipple(img);
        });
      });
  
      function createImageRipple(img) {
        const rect = img.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const ripple = document.createElement('div');
        ripple.style.cssText = `
          position: fixed;
          left: ${centerX}px;
          top: ${centerY}px;
          width: 4px;
          height: 4px;
          background: var(--accent);
          border-radius: 50%;
          pointer-events: none;
          z-index: 1000;
          opacity: 0.8;
        `;
        
        document.body.appendChild(ripple);
        
        ripple.animate([
          { width: '4px', height: '4px', opacity: 0.8 },
          { width: '100px', height: '100px', opacity: 0 }
        ], {
          duration: 800,
          easing: 'ease-out'
        }).addEventListener('finish', () => {
          ripple.remove();
        });
      }
    }
  })();
  