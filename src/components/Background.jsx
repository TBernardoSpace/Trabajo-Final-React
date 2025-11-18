import React, { useEffect, useRef } from 'react';
import '../styles/background-standalone.css';

const Background = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let timeoutId;

    
    const gridSize = 30; 
    const snakeSize = 22; 
    const offset = (gridSize - snakeSize) / 2; 
    
    const snakeCount = 4; 
    const fps = 15; 
    
    
    let width, height;
    let cols, rows;
    let colors = [];

    class Snake {
      constructor() {
        this.init();
      }

      init() {
        
        this.x = Math.floor(Math.random() * cols) * gridSize;
        this.y = Math.floor(Math.random() * rows) * gridSize;
        
        this.dx = gridSize; 
        this.dy = 0;
        
        this.tail = [];
        this.maxTail = Math.floor(Math.random() * 10) + 6; 
        this.life = 0;
        this.maxLife = Math.floor(Math.random() * 300) + 100;
        
        this.color = colors.length > 0 ? colors[Math.floor(Math.random() * colors.length)] : '#00f3ff';
        
        
        const dirs = [
          { dx: gridSize, dy: 0 },
          { dx: -gridSize, dy: 0 },
          { dx: 0, dy: gridSize },
          { dx: 0, dy: -gridSize }
        ];
        const dir = dirs[Math.floor(Math.random() * dirs.length)];
        this.dx = dir.dx;
        this.dy = dir.dy;
      }

      update() {
        this.life++;

        if (this.life > this.maxLife) {
          this.init();
          return;
        }

        this.tail.push({ x: this.x, y: this.y });
        if (this.tail.length > this.maxTail) {
          this.tail.shift();
        }

        this.x += this.dx;
        this.y += this.dy;

        
        if (Math.random() < 0.05) {
          this.changeDirection();
        }

        
        if (this.x >= width) this.x = 0;
        if (this.x < 0) this.x = (cols - 1) * gridSize;
        if (this.y >= height) this.y = 0;
        if (this.y < 0) this.y = (rows - 1) * gridSize;
      }

      changeDirection() {
        if (this.dx !== 0) {
          this.dx = 0;
          this.dy = (Math.random() > 0.5 ? 1 : -1) * gridSize;
        } else {
          this.dy = 0;
          this.dx = (Math.random() > 0.5 ? 1 : -1) * gridSize;
        }
      }

      draw() {
        
        ctx.shadowBlur = 20;
        ctx.shadowColor = this.color;
        ctx.fillStyle = this.color;

        
        for (let i = 0; i < this.tail.length; i++) {
          const alpha = (i / this.tail.length) * 0.5; 
          ctx.globalAlpha = alpha;
          
          
          ctx.fillRect(
            this.tail[i].x + offset, 
            this.tail[i].y + offset, 
            snakeSize, 
            snakeSize
          );
        }

        
        ctx.globalAlpha = 0.8;
        ctx.fillRect(
          this.x + offset, 
          this.y + offset, 
          snakeSize, 
          snakeSize
        );
        
        
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1;
      }
    }

    let snakes = [];

    const updateColors = () => {
      const styles = getComputedStyle(document.body);
      colors = [
        styles.getPropertyValue('--accent-primary').trim(),
        styles.getPropertyValue('--accent-secondary').trim(),
        styles.getPropertyValue('--accent-success').trim(),
      ].filter(c => c);
    };

    const init = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      
      
      
      canvas.width = width;
      canvas.height = height;
      
      cols = Math.ceil(width / gridSize);
      rows = Math.ceil(height / gridSize);

      updateColors();
      snakes = Array.from({ length: snakeCount }, () => new Snake());
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      snakes.forEach(snake => {
        snake.update();
        snake.draw();
      });

      
      timeoutId = setTimeout(() => {
        animationFrameId = requestAnimationFrame(animate);
      }, 1000 / fps); 
    };

    init();
    animate();

    window.addEventListener('resize', init);

    const observer = new MutationObserver(() => {
      updateColors();
      
      snakes.forEach(s => {
        s.color = colors[Math.floor(Math.random() * colors.length)];
      });
    });
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });

    return () => {
      window.removeEventListener('resize', init);
      cancelAnimationFrame(animationFrameId);
      clearTimeout(timeoutId);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="background-container">
      <canvas ref={canvasRef} className="snakes-canvas" />
      <div className="grid-layer"></div>
    </div>
  );
};

export default Background;