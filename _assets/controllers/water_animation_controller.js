import { Controller } from '@hotwired/stimulus';

/**
 * Water Animation Controller
 * Renders an interactive water-like canvas animation for the hero section
 */
export default class extends Controller {
  static targets = ['canvas'];
  
  connect() {
    this.initCanvas();
    this.animate();
    
    // Handle resize events
    window.addEventListener('resize', this.handleResize.bind(this));
  }
  
  disconnect() {
    window.removeEventListener('resize', this.handleResize.bind(this));
    cancelAnimationFrame(this.animationFrame);
  }
  
  initCanvas() {
    this.canvas = document.getElementById('waterCanvas');
    if (!this.canvas) return;
    
    this.ctx = this.canvas.getContext('2d');
    this.resizeCanvas();
    
    // Water ripple properties
    this.points = [];
    this.numPoints = 10;
    this.rippleStrength = 5;
    this.rippleSpeed = 0.02;
    this.colorPrimary = '#c2910c'; // Amber-like color
    this.colorSecondary = '#78350f'; // Amber-brown color
    
    // Initialize water ripple points
    for (let i = 0; i < this.numPoints; i++) {
      this.points.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        radius: 30 + Math.random() * 100,
        angle: Math.random() * Math.PI * 2,
        angleSpeed: 0.004 + Math.random() * 0.008,
        amplitude: 0.5 + Math.random() * 1.5
      });
    }
  }
  
  resizeCanvas() {
    if (!this.canvas) return;
    
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }
  
  handleResize() {
    this.resizeCanvas();
  }
  
  animate() {
    if (!this.canvas || !this.ctx) {
      this.animationFrame = requestAnimationFrame(this.animate.bind(this));
      return;
    }
    
    // Clear canvas
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Draw background gradient
    const gradient = this.ctx.createLinearGradient(0, 0, 0, this.canvas.height);
    gradient.addColorStop(0, 'rgba(20, 20, 20, 1)');
    gradient.addColorStop(0.5, 'rgba(30, 30, 30, 0.9)');
    gradient.addColorStop(1, 'rgba(40, 30, 20, 0.8)');
    this.ctx.fillStyle = gradient;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Update and draw water ripples
    this.ctx.globalCompositeOperation = 'lighter';
    this.drawWaterRipples();
    this.ctx.globalCompositeOperation = 'source-over';
    
    // Continue animation
    this.animationFrame = requestAnimationFrame(this.animate.bind(this));
  }
  
  drawWaterRipples() {
    // Update each point's position
    for (let i = 0; i < this.numPoints; i++) {
      const point = this.points[i];
      point.angle += point.angleSpeed;
    }
    
    // Draw ripple effect
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0)';
    this.ctx.strokeStyle = this.colorPrimary;
    this.ctx.lineWidth = 0.5;
    
    // First ripple layer
    for (let i = 0; i < this.numPoints; i++) {
      const point = this.points[i];
      
      const x = point.x + Math.cos(point.angle) * point.radius;
      const y = point.y + Math.sin(point.angle) * point.radius * point.amplitude;
      
      this.ctx.beginPath();
      this.ctx.arc(x, y, 40 + 20 * Math.sin(point.angle * 3), 0, Math.PI * 2);
      this.ctx.strokeStyle = `rgba(194, 145, 12, ${0.05 + 0.1 * Math.sin(point.angle)})`;
      this.ctx.stroke();
      
      this.ctx.beginPath();
      this.ctx.arc(x, y, 20 + 10 * Math.cos(point.angle * 5), 0, Math.PI * 2);
      this.ctx.strokeStyle = `rgba(120, 53, 15, ${0.05 + 0.08 * Math.sin(point.angle)})`;
      this.ctx.stroke();
    }
    
    // Second ripple layer
    this.ctx.globalAlpha = 0.3;
    for (let i = 0; i < this.numPoints; i++) {
      const point = this.points[i];
      
      const x = point.x - Math.sin(point.angle * 0.8) * point.radius * 0.8;
      const y = point.y - Math.cos(point.angle * 0.8) * point.radius * 0.6 * point.amplitude;
      
      this.ctx.beginPath();
      this.ctx.arc(x, y, 30 + 15 * Math.sin(point.angle * 2), 0, Math.PI * 2);
      this.ctx.strokeStyle = `rgba(194, 145, 12, ${0.03 + 0.05 * Math.sin(point.angle)})`;
      this.ctx.stroke();
    }
    this.ctx.globalAlpha = 1;
  }
}