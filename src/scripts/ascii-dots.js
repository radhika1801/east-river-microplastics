// ASCII Dots Background Effect - Vanilla JS for 11ty
(function() {
    'use strict';
  
    class DelicateAsciiDots {
      constructor(containerId, options = {}) {
        this.container = document.getElementById(containerId);
        if (!this.container) {
          console.error(`Container with id "${containerId}" not found`);
          return;
        }
  
        // Configuration
        this.config = {
          backgroundColor: options.backgroundColor || '#1a2332',
          textColor: options.textColor || '212, 175, 55', // Gold accent
          gridSize: options.gridSize || 80,
          removeWaveLine: options.removeWaveLine !== false,
          animationSpeed: options.animationSpeed || 0.75,
        };
  
        // Character set
        this.CHARS = '⣧⣩⣪⣫⣬⣭⣮⣯⣱⣲⣳⣴⣵⣶⣷⣹⣺⣻⣼⣽⣾⣿⣧⣩⣪⣫⣬⣭⣮⣯⣱⣲⣳⣴⣵⣶⣷⣹⣺⣻⣼⣽⣾⣿⣧⣩⣪⣫⣬⣭⣮⣯⣱⣲⣳⣴⣵⣶⣷⣹⣺⣻⣼⣽⣾⣿⣧⣩⣪⣫⣬⣭⣮⣯⣱⣲⣳⣴⣵⣶⣷⣹⣺⣻⣼⣽⣾⣿⣧⣩⣪⣫⣬⣭⣮⣯⣱⣲⣳⣴⣵⣶⣷⣹⣺⣻⣼⣽⣾⣿⣧⣩⣪⣫⣬⣭⣮⣯⣱⣲⣳⣴⣵⣶⣷⣹⣺⣻⣼⣽⣾⣿⠁⠂⠄⠈⠐⠠⡀⢀⠃⠅⠘⠨⠊⠋⠌⠍⠎⠏⠑⠒⠓⠔⠕⠖⠗⠙⠚⠛⠜⠝⠞⠟⠡⠢⠣⠤⠥⠦⠧⠩⠪⠫⠬⠭⠮⠯⠱⠲⠳⠴⠵⠶⠷⠹⠺⠻⠼⠽⠾⠿⡁⡂⡃⡄⡅⡆⡇⡉⡊⡋⡌⡍⡎⡏⡑⡒⡓⡔⡕⡖⡗⡙⡚⡛⡜⡝⡞⡟⡡⡢⡣⡤⡥⡦⡧⡩⡪⡫⡬⡭⡮⡯⡱⡲⡳⡴⡵⡶⡷⡹⡺⡻⡼⡽⡾⡿⢁⢂⢃⢄⢅⢆⢇⢉⢊⢋⢌⢍⢎⢏⢑⢒⢓⢔⢕⢖⢗⢙⢚⢛⢜⢝⢞⢟⢡⢢⢣⢤⢥⢦⢧⢩⢪⢫⢬⢭⢮⢯⢱⢲⢳⢴⢵⢶⢷⢹⢺⢻⢼⢽⢾⢿⣀⣁⣂⣃⣄⣅⣆⣇⣉⣊⣋⣌⣍⣎⣏⣑⣒⣓⣔⣕⣖⣗⣙⣚⣛⣜⣝⣞⣟⣡⣢⣣⣤⣥⣦⣧⣩⣪⣫⣬⣭⣮⣯⣱⣲⣳⣴⣵⣶⣷⣹⣺⣻⣼⣽⣾⣿';
  
        // State
        this.mouse = { x: 0, y: 0, isDown: false };
        this.waves = [];
        this.time = 0;
        this.clickWaves = [];
        this.dimensions = { width: 0, height: 0 };
        this.animationFrameId = null;
  
        this.init();
      }
  
      init() {
        // Create canvas wrapper
        const wrapper = document.createElement('div');
        wrapper.className = 'ascii-dots-wrapper';
        wrapper.style.cssText = `
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 100%;
          max-width: 40rem;
          height: 100%;
          overflow: hidden;
          pointer-events: none;
        `;
  
        // Create canvas
        this.canvas = document.createElement('canvas');
        this.canvas.style.cssText = `
          display: block;
          width: 100%;
          height: 100%;
          pointer-events: auto;
        `;
        
        wrapper.appendChild(this.canvas);
        this.container.appendChild(wrapper);
        
        this.ctx = this.canvas.getContext('2d');
  
        // Initialize waves
        this.initWaves();
  
        // Set up event listeners
        this.setupEventListeners();
  
        // Initial resize and start animation
        this.resizeCanvas();
        this.animate();
      }
  
      initWaves() {
        const numWaves = 4;
        for (let i = 0; i < numWaves; i++) {
          this.waves.push({
            x: this.config.gridSize * (0.25 + Math.random() * 0.5),
            y: this.config.gridSize * (0.25 + Math.random() * 0.5),
            frequency: 0.2 + Math.random() * 0.3,
            amplitude: 0.5 + Math.random() * 0.5,
            phase: Math.random() * Math.PI * 2,
            speed: 0.5 + Math.random() * 0.5,
          });
        }
      }
  
      resizeCanvas() {
        const rect = this.container.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        
        this.dimensions = { width, height };
        
        const dpr = window.devicePixelRatio || 1;
        this.canvas.width = width * dpr;
        this.canvas.height = height * dpr;
        this.canvas.style.width = width + 'px';
        this.canvas.style.height = height + 'px';
        
        if (this.ctx) {
          this.ctx.scale(dpr, dpr);
        }
      }
  
      setupEventListeners() {
        this.handleMouseMove = (e) => {
          const rect = this.canvas.getBoundingClientRect();
          this.mouse.x = e.clientX - rect.left;
          this.mouse.y = e.clientY - rect.top;
        };
  
        this.handleMouseDown = (e) => {
          this.mouse.isDown = true;
          const rect = this.canvas.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          
          const cellWidth = this.dimensions.width / this.config.gridSize;
          const cellHeight = this.dimensions.height / this.config.gridSize;
          const gridX = x / cellWidth;
          const gridY = y / cellHeight;
          
          this.clickWaves.push({
            x: gridX,
            y: gridY,
            time: Date.now(),
            intensity: 2,
          });
          
          // Clean old waves
          const now = Date.now();
          this.clickWaves = this.clickWaves.filter(wave => now - wave.time < 4000);
        };
  
        this.handleMouseUp = () => {
          this.mouse.isDown = false;
        };
  
        this.handleResize = () => {
          this.resizeCanvas();
        };
  
        this.canvas.addEventListener('mousemove', this.handleMouseMove);
        this.canvas.addEventListener('mousedown', this.handleMouseDown);
        this.canvas.addEventListener('mouseup', this.handleMouseUp);
        window.addEventListener('resize', this.handleResize);
      }
  
      getClickWaveInfluence(x, y, currentTime) {
        let totalInfluence = 0;
        
        this.clickWaves.forEach(wave => {
          const age = currentTime - wave.time;
          const maxAge = 4000;
          
          if (age < maxAge) {
            const dx = x - wave.x;
            const dy = y - wave.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const waveRadius = (age / maxAge) * this.config.gridSize * 0.8;
            const waveWidth = this.config.gridSize * 0.15;
            
            if (Math.abs(distance - waveRadius) < waveWidth) {
              const waveStrength = (1 - age / maxAge) * wave.intensity;
              const proximityToWave = 1 - Math.abs(distance - waveRadius) / waveWidth;
              totalInfluence += waveStrength * proximityToWave * Math.sin((distance - waveRadius) * 0.5);
            }
          }
        });
        
        return totalInfluence;
      }
  
      animate() {
        if (!this.ctx) return;
  
        const currentTime = Date.now();
        this.time += this.config.animationSpeed * 0.016;
  
        const { width, height } = this.dimensions;
        if (width === 0 || height === 0) return;
  
        // Clear canvas
        this.ctx.fillStyle = this.config.backgroundColor;
        this.ctx.fillRect(0, 0, width, height);
  
        // Create grid
        const newGrid = Array(this.config.gridSize).fill(0).map(() => 
          Array(this.config.gridSize).fill(null)
        );
  
        const cellWidth = width / this.config.gridSize;
        const cellHeight = height / this.config.gridSize;
  
        const mouseGridX = this.mouse.x / cellWidth;
        const mouseGridY = this.mouse.y / cellHeight;
  
        const mouseWave = {
          x: mouseGridX,
          y: mouseGridY,
          frequency: 0.3,
          amplitude: 1,
          phase: this.time * 2,
          speed: 1,
        };
  
        // Calculate wave values for each grid point
        for (let y = 0; y < this.config.gridSize; y++) {
          for (let x = 0; x < this.config.gridSize; x++) {
            let totalWave = 0;
  
            const allWaves = [...this.waves, mouseWave];
            
            allWaves.forEach(wave => {
              const dx = x - wave.x;
              const dy = y - wave.y;
              const dist = Math.sqrt(dx * dx + dy * dy);
              const falloff = 1 / (1 + dist * 0.1);
              const value = Math.sin(dist * wave.frequency - this.time * wave.speed + wave.phase) * 
                           wave.amplitude * falloff;
              totalWave += value;
            });
  
            const clickInfluence = this.getClickWaveInfluence(x, y, currentTime);
            totalWave += clickInfluence;
  
            const mouseDistance = Math.sqrt((x - mouseGridX) ** 2 + (y - mouseGridY) ** 2);
            if (mouseDistance < this.config.gridSize * 0.3) {
              const mouseEffect = (1 - mouseDistance / (this.config.gridSize * 0.3)) * 0.8;
              totalWave += mouseEffect * Math.sin(this.time * 3);
            }
  
            const normalizedWave = (totalWave + 2) / 4;
            
            if (Math.abs(totalWave) > 0.2) {
              const charIndex = Math.min(
                this.CHARS.length - 1,
                Math.max(0, Math.floor(normalizedWave * (this.CHARS.length - 1)))
              );
              const opacity = Math.min(0.9, Math.max(0.4, 0.4 + normalizedWave * 0.5));
              
              newGrid[y][x] = {
                char: this.CHARS[charIndex] || this.CHARS[0],
                opacity: opacity,
              };
            }
          }
        }
  
        // Draw characters
        const fontSize = Math.min(cellWidth, cellHeight) * 0.8;
        this.ctx.font = `${fontSize}px monospace`;
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
  
        for (let y = 0; y < this.config.gridSize; y++) {
          for (let x = 0; x < this.config.gridSize; x++) {
            const cell = newGrid[y][x];
            if (cell && cell.char && this.CHARS.includes(cell.char)) {
              this.ctx.fillStyle = `rgba(${this.config.textColor}, ${cell.opacity})`;
              this.ctx.fillText(
                cell.char,
                x * cellWidth + cellWidth / 2,
                y * cellHeight + cellHeight / 2
              );
            }
          }
        }
  
        // Draw wave lines if enabled
        if (!this.config.removeWaveLine) {
          this.clickWaves.forEach(wave => {
            const age = currentTime - wave.time;
            const maxAge = 4000;
            
            if (age < maxAge) {
              const progress = age / maxAge;
              const radius = progress * Math.min(width, height) * 0.5;
              const alpha = (1 - progress) * 0.3 * wave.intensity;
              
              this.ctx.beginPath();
              this.ctx.strokeStyle = `rgba(${this.config.textColor}, ${alpha})`;
              this.ctx.lineWidth = 1;
              this.ctx.arc(
                wave.x * cellWidth,
                wave.y * cellHeight,
                radius,
                0,
                2 * Math.PI
              );
              this.ctx.stroke();
            }
          });
        }
  
        this.animationFrameId = requestAnimationFrame(() => this.animate());
      }
  
      destroy() {
        if (this.animationFrameId) {
          cancelAnimationFrame(this.animationFrameId);
        }
        
        if (this.canvas) {
          this.canvas.removeEventListener('mousemove', this.handleMouseMove);
          this.canvas.removeEventListener('mousedown', this.handleMouseDown);
          this.canvas.removeEventListener('mouseup', this.handleMouseUp);
        }
        
        window.removeEventListener('resize', this.handleResize);
        
        if (this.container) {
          this.container.innerHTML = '';
        }
      }
    }
  
    // Make it globally available
    window.DelicateAsciiDots = DelicateAsciiDots;
  })();