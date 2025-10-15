class RippleCursor {
    constructor(options = {}) {
      this.maxSize = options.maxSize || 50;
      this.duration = options.duration || 1000;
      this.blur = options.blur !== undefined ? options.blur : true;
      this.maxRipples = 30;
      this.ripples = [];
      
      this.container = document.getElementById('ripple-container');
      this.init();
    }
  
    init() {
      window.addEventListener('mousemove', (e) => this.handleMouseMove(e));
    }
  
    handleMouseMove(e) {
      const ripple = this.createRipple(e.clientX, e.clientY);
      this.addRipple(ripple);
      
      setTimeout(() => {
        this.removeRipple(ripple);
      }, this.duration);
    }
  
    createRipple(x, y) {
      const ripple = document.createElement('div');
      ripple.className = 'ripple';
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;
      ripple.style.width = `${this.maxSize}px`;
      ripple.style.height = `${this.maxSize}px`;
      ripple.style.animationDuration = `${this.duration}ms`;
      
      if (!this.blur) {
        ripple.style.filter = 'none';
      }
      
      return ripple;
    }
  
    addRipple(ripple) {
      this.container.appendChild(ripple);
      this.ripples.push(ripple);
      
      if (this.ripples.length > this.maxRipples) {
        const oldRipple = this.ripples.shift();
        if (oldRipple.parentNode) {
          oldRipple.parentNode.removeChild(oldRipple);
        }
      }
    }
  
    removeRipple(ripple) {
      if (ripple.parentNode) {
        ripple.parentNode.removeChild(ripple);
      }
      this.ripples = this.ripples.filter(r => r !== ripple);
    }
  }
  
  new RippleCursor({ maxSize: 50, duration: 1000, blur: true });