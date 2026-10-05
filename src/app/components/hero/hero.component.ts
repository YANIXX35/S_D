import {
  Component,
  OnInit,
  OnDestroy,
  AfterViewInit,
  ElementRef,
  ViewChild,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule } from '@angular/common';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  alphaSpeed: number;
  color: string;
  shape: 'circle' | 'petal';
  rotation: number;
  rotSpeed: number;
}

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './hero.component.html',
  styles: [`
    :host { display: block; }

    .hero-section {
      position: relative;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      background: linear-gradient(180deg, #0d0a0b 0%, #1a0a12 45%, #130d0a 100%);
    }

    canvas {
      position: absolute;
      inset: 0;
      pointer-events: none;
      opacity: 0.7;
    }

    .hero-content {
      position: relative;
      z-index: 10;
      text-align: center;
      padding: 2rem 1.5rem;
    }

    .eyebrow {
      font-family: 'Great Vibes', cursive;
      font-size: clamp(1.8rem, 4vw, 3rem);
      color: #c9a96e;
      opacity: 0;
      animation: fadeSlideDown 1.2s ease-out 0.3s forwards;
    }

    .main-title {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: clamp(3rem, 8vw, 7rem);
      font-weight: 900;
      line-height: 1.05;
      background: linear-gradient(135deg, #e2c99a 0%, #c9a96e 40%, #e8b4b8 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      opacity: 0;
      animation: fadeSlideUp 1.2s ease-out 0.7s forwards;
      text-wrap: balance;
    }

    .subtitle {
      font-family: 'Cormorant Garamond', Georgia, serif;
      font-size: clamp(1.1rem, 2.5vw, 1.5rem);
      color: #b8b0a8;
      font-style: italic;
      margin-top: 1rem;
      opacity: 0;
      animation: fadeSlideUp 1.2s ease-out 1.1s forwards;
    }

    .date-badge {
      display: inline-flex;
      align-items: center;
      gap: 0.6rem;
      margin-top: 2rem;
      padding: 0.55rem 1.4rem;
      border: 1px solid #c9a96e44;
      border-radius: 999px;
      font-family: 'Cormorant Garamond', Georgia, serif;
      font-size: 1rem;
      color: #c9a96e;
      letter-spacing: 0.06em;
      opacity: 0;
      animation: fadeSlideUp 1.2s ease-out 1.4s forwards;
    }

    .date-badge .dot {
      width: 6px;
      height: 6px;
      background: #c9a96e;
      border-radius: 50%;
      animation: pulse 2s ease-in-out infinite;
    }

    .scroll-hint {
      position: absolute;
      bottom: 2.5rem;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.5rem;
      opacity: 0;
      animation: fadeSlideUp 1s ease-out 2s forwards;
    }

    .scroll-hint span {
      font-family: 'Cormorant Garamond', Georgia, serif;
      font-size: 0.85rem;
      color: #b8b0a8;
      letter-spacing: 0.15em;
      text-transform: uppercase;
    }

    .scroll-arrow {
      width: 1px;
      height: 48px;
      background: linear-gradient(to bottom, #c9a96e, transparent);
      animation: scrollPulse 2s ease-in-out infinite;
    }

    .radial-glow {
      position: absolute;
      inset: 0;
      background: radial-gradient(ellipse 60% 60% at 50% 50%, #6b163018 0%, transparent 70%);
      pointer-events: none;
    }

    @keyframes fadeSlideDown {
      from { opacity: 0; transform: translateY(-20px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes fadeSlideUp {
      from { opacity: 0; transform: translateY(30px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes pulse {
      0%, 100% { transform: scale(1); opacity: 1; }
      50%       { transform: scale(1.5); opacity: 0.5; }
    }
    @keyframes scrollPulse {
      0%, 100% { opacity: 0.5; transform: scaleY(1); }
      50%       { opacity: 1;   transform: scaleY(1.2); }
    }
  `]
})
export class HeroComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('particleCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;

  private particles: Particle[] = [];
  private animationId = 0;
  private ctx!: CanvasRenderingContext2D;
  private colors = ['#c9a96e', '#e8b4b8', '#e2c99a', '#c4838a', '#f5f0eb'];

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.initCanvas();
    this.spawnParticles();
    this.animate();
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.animationId);
  }

  private initCanvas(): void {
    const canvas = this.canvasRef.nativeElement;
    this.ctx = canvas.getContext('2d')!;
    this.resizeCanvas();
    window.addEventListener('resize', () => this.resizeCanvas());
  }

  private resizeCanvas(): void {
    const canvas = this.canvasRef.nativeElement;
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  private spawnParticles(): void {
    const canvas = this.canvasRef.nativeElement;
    for (let i = 0; i < 60; i++) {
      this.particles.push(this.createParticle(
        Math.random() * canvas.width,
        Math.random() * canvas.height
      ));
    }
  }

  private createParticle(x: number, y: number): Particle {
    const canvas = this.canvasRef.nativeElement;
    return {
      x,
      y,
      vx: (Math.random() - 0.5) * 0.6,
      vy: -(Math.random() * 0.5 + 0.2),
      radius: Math.random() * 3 + 1,
      alpha: Math.random() * 0.7 + 0.1,
      alphaSpeed: Math.random() * 0.005 + 0.002,
      color: this.colors[Math.floor(Math.random() * this.colors.length)],
      shape: Math.random() > 0.6 ? 'petal' : 'circle',
      rotation: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.02,
    };
  }

  private drawPetal(ctx: CanvasRenderingContext2D, p: Particle): void {
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rotation);
    ctx.globalAlpha = p.alpha;
    ctx.fillStyle = p.color;
    ctx.beginPath();
    // Simple ellipse as petal shape
    ctx.ellipse(0, 0, p.radius * 2.5, p.radius, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  private animate(): void {
    const canvas = this.canvasRef.nativeElement;
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.rotation += p.rotSpeed;
      p.alpha += Math.sin(Date.now() * p.alphaSpeed) * 0.003;
      p.alpha = Math.max(0.05, Math.min(0.85, p.alpha));

      if (p.y < -20 || p.x < -20 || p.x > canvas.width + 20) {
        this.particles.splice(i, 1);
        this.particles.push(this.createParticle(
          Math.random() * canvas.width,
          canvas.height + 10
        ));
        continue;
      }

      if (p.shape === 'petal') {
        this.drawPetal(this.ctx, p);
      } else {
        this.ctx.save();
        this.ctx.globalAlpha = p.alpha;
        this.ctx.fillStyle = p.color;
        this.ctx.shadowBlur = p.radius * 4;
        this.ctx.shadowColor = p.color;
        this.ctx.beginPath();
        this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.restore();
      }
    }

    this.animationId = requestAnimationFrame(() => this.animate());
  }

  scrollToNext(): void {
    const next = document.querySelector('app-timeline');
    next?.scrollIntoView({ behavior: 'smooth' });
  }
}
