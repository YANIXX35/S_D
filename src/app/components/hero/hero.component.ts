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
  x: number; y: number;
  vx: number; vy: number;
  radius: number;
  alpha: number; alphaSpeed: number;
  color: string;
  shape: 'circle' | 'petal' | 'star';
  rotation: number; rotSpeed: number;
}

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './hero.component.html',
  styles: [`
    :host { display: block; }

    /* ─── Base section ─── */
    .hero-section {
      position: relative;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      background: #080508;
    }

    /* ─── Background photo ─── */
    .hero-bg-photo {
      position: absolute;
      inset: 0;
      background: url('assets/media/photo2.jpeg') center center / cover no-repeat;
      filter: blur(18px) brightness(0.25) saturate(1.4);
      transform: scale(1.08);
      pointer-events: none;
    }

    /* ─── Gradient overlay ─── */
    .hero-overlay {
      position: absolute;
      inset: 0;
      background:
        linear-gradient(135deg, #080508ee 0%, #12091a99 40%, #1a0a1288 70%, #080508dd 100%);
      pointer-events: none;
    }

    /* ─── Ambient color glows ─── */
    .glow {
      position: absolute;
      border-radius: 50%;
      filter: blur(80px);
      pointer-events: none;
      animation: shimmer 6s ease-in-out infinite;
    }
    .glow-left {
      width: 500px; height: 500px;
      left: -150px; top: 10%;
      background: radial-gradient(circle, #4a207055 0%, transparent 70%);
    }
    .glow-right {
      width: 400px; height: 400px;
      right: -100px; bottom: 15%;
      background: radial-gradient(circle, #c0607044 0%, transparent 70%);
      animation-delay: 3s;
    }

    /* ─── Canvas ─── */
    canvas {
      position: absolute;
      inset: 0;
      pointer-events: none;
      opacity: 0.65;
    }

    /* ─── Hero layout (2 cols) ─── */
    .hero-layout {
      position: relative;
      z-index: 10;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 4rem;
      padding: 2rem 2rem;
      max-width: 1100px;
      width: 100%;
      flex-wrap: wrap;
    }

    /* ─── Text content ─── */
    .hero-content {
      flex: 1;
      min-width: 280px;
      text-align: left;
    }

    @media (max-width: 700px) {
      .hero-content { text-align: center; }
      .hero-layout { gap: 2.5rem; }
    }

    .eyebrow {
      font-family: 'Great Vibes', cursive;
      font-size: clamp(2rem, 4vw, 3.2rem);
      color: #d4a843;
      opacity: 0;
      animation: fadeSlideDown 1.2s ease-out 0.3s forwards;
      line-height: 1;
    }

    .main-title {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: clamp(3.5rem, 9vw, 8rem);
      font-weight: 900;
      line-height: 0.95;
      margin: 0.2rem 0 0.6rem;
      opacity: 0;
      animation: fadeSlideUp 1.2s ease-out 0.7s forwards;
      color: #faf5ef;
      text-shadow: 0 0 60px #d4a84322;
    }

    .title-accent {
      background: linear-gradient(135deg, #f0cc7a 0%, #d4a843 40%, #f0c0c8 80%, #e090a0 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .subtitle {
      font-family: 'Cormorant Garamond', Georgia, serif;
      font-size: clamp(1.1rem, 2.2vw, 1.45rem);
      color: #c8c0b8;
      font-style: italic;
      line-height: 1.6;
      opacity: 0;
      animation: fadeSlideUp 1.2s ease-out 1.1s forwards;
    }

    .date-badge {
      display: inline-flex;
      align-items: center;
      gap: 0.7rem;
      margin-top: 1.8rem;
      padding: 0.6rem 1.5rem;
      border: 1px solid #d4a84355;
      border-radius: 999px;
      background: #d4a84310;
      backdrop-filter: blur(8px);
      font-family: 'Cormorant Garamond', Georgia, serif;
      font-size: 0.95rem;
      color: #d4a843;
      letter-spacing: 0.07em;
      opacity: 0;
      animation: fadeSlideUp 1.2s ease-out 1.4s forwards;
    }

    .date-badge .dot {
      width: 7px; height: 7px;
      background: radial-gradient(circle, #f0cc7a, #d4a843);
      border-radius: 50%;
      box-shadow: 0 0 6px #d4a84388;
      animation: pulse 2s ease-in-out infinite;
    }

    .hero-cta {
      display: inline-flex;
      align-items: center;
      gap: 0.8rem;
      margin-top: 2.2rem;
      font-family: 'Cinzel', Georgia, serif;
      font-size: 0.82rem;
      letter-spacing: 0.16em;
      text-transform: uppercase;
      color: #f0cc7a;
      opacity: 0;
      animation: fadeSlideUp 1.2s ease-out 1.7s forwards;
      transition: color 0.3s;
    }
    .hero-cta:hover { color: #faf5ef; }

    .cta-arrow {
      width: 36px; height: 36px;
      border-radius: 50%;
      border: 1px solid #d4a84355;
      display: flex; align-items: center; justify-content: center;
      font-size: 1.1rem;
      animation: bounce 2s ease-in-out infinite;
    }

    /* ─── Portrait ─── */
    .portrait-wrap {
      position: relative;
      flex-shrink: 0;
      width: 280px;
      height: 280px;
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      animation: fadeSlideUp 1.4s ease-out 0.9s forwards;
    }

    @media (min-width: 900px) {
      .portrait-wrap { width: 340px; height: 340px; }
    }

    .portrait-ring {
      position: absolute;
      border-radius: 50%;
      border: 1px solid;
      animation: spin-slow linear infinite;
    }
    .ring-1 {
      inset: 0;
      border-color: #d4a84344;
      animation-duration: 20s;
    }
    .ring-2 {
      inset: -12px;
      border-color: #f0c0c822;
      animation-duration: 30s;
      animation-direction: reverse;
    }
    .ring-3 {
      inset: -24px;
      border-color: #d4a84315;
      animation-duration: 45s;
    }

    .portrait-frame {
      width: 220px;
      height: 220px;
      border-radius: 50%;
      overflow: hidden;
      border: 3px solid;
      border-color: #d4a843;
      box-shadow:
        0 0 0 6px #d4a84315,
        0 0 40px #d4a84330,
        0 0 80px #c0607020,
        inset 0 0 30px #00000040;
      animation: float 6s ease-in-out infinite;
      position: relative;
      z-index: 2;
    }

    @media (min-width: 900px) {
      .portrait-frame { width: 260px; height: 260px; }
    }

    .portrait-frame img {
      width: 100%; height: 100%;
      object-fit: cover;
      object-position: center top;
      transition: transform 0.6s ease;
    }
    .portrait-frame:hover img { transform: scale(1.06); }

    .portrait-label {
      position: absolute;
      bottom: -1.5rem;
      left: 50%;
      transform: translateX(-50%);
      font-family: 'Great Vibes', cursive;
      font-size: 1.6rem;
      color: #d4a843;
      white-space: nowrap;
      text-shadow: 0 0 20px #d4a84366;
      z-index: 3;
    }

    /* ─── Scroll hint ─── */
    .scroll-hint {
      position: absolute;
      bottom: 2rem;
      left: 50%;
      transform: translateX(-50%);
      opacity: 0;
      animation: fadeSlideUp 1s ease-out 2.2s forwards;
    }

    .scroll-arrow {
      width: 1px;
      height: 52px;
      background: linear-gradient(to bottom, #d4a843, transparent);
      animation: scrollPulse 2s ease-in-out infinite;
    }

    /* ─── Keyframes ─── */
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
      50%       { transform: scale(1.6); opacity: 0.5; }
    }
    @keyframes bounce {
      0%, 100% { transform: translateY(0); }
      50%       { transform: translateY(5px); }
    }
    @keyframes scrollPulse {
      0%, 100% { opacity: 0.5; transform: scaleY(1); }
      50%       { opacity: 1;   transform: scaleY(1.3); }
    }
    @keyframes shimmer {
      0%, 100% { opacity: 0.5; }
      50%       { opacity: 1; }
    }
    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50%       { transform: translateY(-14px); }
    }
    @keyframes spin-slow {
      from { transform: rotate(0deg); }
      to   { transform: rotate(360deg); }
    }
  `]
})
export class HeroComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('particleCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;

  private particles: Particle[] = [];
  private animationId = 0;
  private ctx!: CanvasRenderingContext2D;
  private colors = ['#d4a843', '#f0cc7a', '#f0c0c8', '#e090a0', '#9b5e8a', '#faf5ef'];

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
    for (let i = 0; i < 70; i++) {
      this.particles.push(this.createParticle(
        Math.random() * canvas.width,
        Math.random() * canvas.height
      ));
    }
  }

  private createParticle(x: number, y: number): Particle {
    return {
      x, y,
      vx: (Math.random() - 0.5) * 0.5,
      vy: -(Math.random() * 0.6 + 0.15),
      radius: Math.random() * 3.5 + 0.8,
      alpha: Math.random() * 0.7 + 0.1,
      alphaSpeed: Math.random() * 0.004 + 0.002,
      color: this.colors[Math.floor(Math.random() * this.colors.length)],
      shape: ['circle', 'petal', 'star'][Math.floor(Math.random() * 3)] as any,
      rotation: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.025,
    };
  }

  private drawStar(ctx: CanvasRenderingContext2D, p: Particle): void {
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rotation);
    ctx.globalAlpha = p.alpha;
    ctx.fillStyle = p.color;
    ctx.shadowBlur = p.radius * 6;
    ctx.shadowColor = p.color;
    const r = p.radius;
    ctx.beginPath();
    for (let i = 0; i < 4; i++) {
      const angle = (i * Math.PI) / 2;
      ctx.lineTo(Math.cos(angle) * r * 3, Math.sin(angle) * r * 3);
      ctx.lineTo(Math.cos(angle + Math.PI / 4) * r, Math.sin(angle + Math.PI / 4) * r);
    }
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  private drawPetal(ctx: CanvasRenderingContext2D, p: Particle): void {
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rotation);
    ctx.globalAlpha = p.alpha;
    ctx.fillStyle = p.color;
    ctx.beginPath();
    ctx.ellipse(0, 0, p.radius * 3, p.radius, 0, 0, Math.PI * 2);
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
      p.alpha = Math.max(0.04, Math.min(0.85, p.alpha));

      if (p.y < -20 || p.x < -20 || p.x > canvas.width + 20) {
        this.particles.splice(i, 1);
        this.particles.push(this.createParticle(Math.random() * canvas.width, canvas.height + 10));
        continue;
      }

      if (p.shape === 'star') {
        this.drawStar(this.ctx, p);
      } else if (p.shape === 'petal') {
        this.drawPetal(this.ctx, p);
      } else {
        this.ctx.save();
        this.ctx.globalAlpha = p.alpha;
        this.ctx.fillStyle = p.color;
        this.ctx.shadowBlur = p.radius * 5;
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
    document.querySelector('app-timeline')?.scrollIntoView({ behavior: 'smooth' });
  }
}
