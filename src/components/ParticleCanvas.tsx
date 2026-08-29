import React, { useEffect, useRef } from 'react';

// Màu Champagne Gold & Amber palette
const COLORS = [
  '#f59e0b',   // Champagne Gold
  '#fbbf24',   // Warm Gold
  '#d97706',   // Deep Amber
  '#fef3c7',   // Light Champagne
  '#fcd34d',   // Sun Glow
];

class Particle {
  x: number = 0;
  y: number = 0;
  vx: number = 0;
  vy: number = 0;
  color: string = COLORS[0];
  w: number = 2;
  h: number = 6;
  angle: number = 0;
  spin: number = 0;
  alpha: number = 0.3;
  maxY: number = -20;

  constructor(w: number, h: number) {
    this.init(w, h, true);
  }

  init(w: number, h: number, randomY = false) {
    this.x = Math.random() * w;
    this.y = randomY ? Math.random() * h : h + Math.random() * 40;
    this.vx = (Math.random() - 0.5) * 0.25;
    this.vy = -(Math.random() * 0.45 + 0.15); // Float upward (Antigravity lift)
    this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
    this.w = Math.random() * 2.2 + 1.2;
    this.h = Math.random() * 7 + 3.5;
    this.angle = Math.random() * Math.PI * 2;
    this.spin = (Math.random() - 0.5) * 0.025;
    this.alpha = Math.random() * 0.35 + 0.12;
    this.maxY = -20;
  }

  update(w: number, h: number) {
    this.x += this.vx;
    this.y += this.vy;
    this.angle += this.spin;
    if (this.y < this.maxY) this.init(w, h, false);
    if (this.x < -20) this.x = w + 10;
    if (this.x > w + 20) this.x = -10;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);
    ctx.globalAlpha = this.alpha;
    ctx.fillStyle = this.color;
    ctx.beginPath();
    const r = this.w / 2;
    // Pill shape particle
    ctx.moveTo(-r, -this.h / 2 + r);
    ctx.arcTo(-r, -this.h / 2, 0, -this.h / 2, r);
    ctx.arcTo(r, -this.h / 2, r, 0, r);
    ctx.arcTo(r, this.h / 2, 0, this.h / 2, r);
    ctx.arcTo(-r, this.h / 2, -r, 0, r);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }
}

const PARTICLE_COUNT = 35; // Optimized count for 60fps viewport rendering

interface ParticleCanvasProps {
  className?: string;
  style?: React.CSSProperties;
}

export function ParticleCanvas({ className = '', style }: ParticleCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const stateRef = useRef<{
    particles: Particle[];
    rafId: number | null;
    w: number;
    h: number;
  }>({
    particles: [],
    rafId: null,
    w: 0,
    h: 0,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const state = stateRef.current;

    const resize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2); // Cap dpr to 2 for 4K screen efficiency
      state.w = canvas.width = w * dpr;
      state.h = canvas.height = h * dpr;
      canvas.style.width = w + 'px';
      canvas.style.height = h + 'px';
      ctx.scale(dpr, dpr);
    };

    resize();
    state.particles = Array.from(
      { length: PARTICLE_COUNT },
      () => new Particle(window.innerWidth, window.innerHeight)
    );

    const tick = () => {
      const W = window.innerWidth;
      const H = window.innerHeight;
      ctx.clearRect(0, 0, W, H);
      state.particles.forEach((p) => {
        p.update(W, H);
        p.draw(ctx);
      });
      state.rafId = requestAnimationFrame(tick);
    };

    state.rafId = requestAnimationFrame(tick);

    window.addEventListener('resize', resize, { passive: true });

    return () => {
      if (state.rafId) cancelAnimationFrame(state.rafId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`particle-canvas ${className}`}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 0,
        willChange: 'transform',
        ...style,
      }}
      aria-hidden="true"
    />
  );
}

export default ParticleCanvas;
