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

interface FallingHeart {
  x: number;
  y: number;
  size: number;
  speed: number;
  alpha: number;
  swing: number;
  swingSpeed: number;
  offset: number;
  color: string;
}

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './footer.component.html',
  styles: [`
    :host { display: block; }

    .footer-section {
      position: relative;
      background: linear-gradient(180deg, #0d0a0b 0%, #0a0608 100%);
      padding: 6rem 1.5rem 4rem;
      overflow: hidden;
      text-align: center;
      border-top: 1px solid #c9a96e15;
    }

    canvas {
      position: absolute;
      inset: 0;
      pointer-events: none;
      opacity: 0.5;
    }

    .footer-inner {
      position: relative;
      z-index: 2;
      max-width: 600px;
      margin: 0 auto;
    }

    .footer-script {
      font-family: 'Great Vibes', cursive;
      font-size: clamp(2.5rem, 6vw, 4.5rem);
      background: linear-gradient(135deg, #e2c99a 0%, #c9a96e 50%, #e8b4b8 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      line-height: 1.2;
      margin-bottom: 1.5rem;
      display: block;
    }

    .footer-tagline {
      font-family: 'Cormorant Garamond', Georgia, serif;
      font-size: clamp(1.1rem, 2.5vw, 1.4rem);
      color: #b8b0a8;
      font-style: italic;
      line-height: 1.7;
      margin-bottom: 2.5rem;
    }

    .footer-divider {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin: 2rem auto;
      max-width: 280px;
    }
    .footer-divider::before,
    .footer-divider::after {
      content: '';
      flex: 1;
      height: 1px;
      background: linear-gradient(to right, transparent, #c9a96e66);
    }
    .footer-divider::after {
      background: linear-gradient(to left, transparent, #c9a96e66);
    }

    .footer-heart-icon {
      font-size: 1.6rem;
      animation: heartbeat 2.2s ease-in-out infinite;
    }

    .footer-meta {
      font-family: 'Cormorant Garamond', Georgia, serif;
      font-size: 0.9rem;
      color: #6b6360;
      letter-spacing: 0.06em;
      margin-top: 3rem;
    }

    .nav-links {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 1rem 2rem;
      margin-bottom: 1.5rem;
      list-style: none;
      padding: 0;
    }

    .nav-links a {
      font-family: 'Cormorant Garamond', Georgia, serif;
      font-size: 0.95rem;
      color: #c9a96e;
      text-decoration: none;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      transition: color 0.2s ease;
      opacity: 0.75;
    }

    .nav-links a:hover { opacity: 1; }

    @keyframes heartbeat {
      0%, 100% { transform: scale(1); }
      14%       { transform: scale(1.25); }
      28%       { transform: scale(1); }
      42%       { transform: scale(1.15); }
    }
  `]
})
export class FooterComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('heartCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;

  private hearts: FallingHeart[] = [];
  private animationId = 0;
  private ctx!: CanvasRenderingContext2D;
  private colors = ['#c9a96e', '#e8b4b8', '#e2c99a', '#c4838a'];

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    const canvas = this.canvasRef.nativeElement;
    this.ctx = canvas.getContext('2d')!;
    this.resizeCanvas();
    window.addEventListener('resize', () => this.resizeCanvas());
    this.spawnHearts();
    this.animate();
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.animationId);
  }

  private resizeCanvas(): void {
    const canvas = this.canvasRef.nativeElement;
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }

  private spawnHearts(): void {
    const canvas = this.canvasRef.nativeElement;
    for (let i = 0; i < 20; i++) {
      this.hearts.push(this.createHeart(
        Math.random() * canvas.width,
        Math.random() * canvas.height
      ));
    }
  }

  private createHeart(x: number, y: number): FallingHeart {
    return {
      x,
      y,
      size: Math.random() * 14 + 6,
      speed: Math.random() * 0.8 + 0.3,
      alpha: Math.random() * 0.5 + 0.1,
      swing: 0,
      swingSpeed: Math.random() * 0.02 + 0.008,
      offset: Math.random() * Math.PI * 2,
      color: this.colors[Math.floor(Math.random() * this.colors.length)],
    };
  }

  private drawHeart(ctx: CanvasRenderingContext2D, h: FallingHeart): void {
    const s = h.size;
    ctx.save();
    ctx.translate(h.x, h.y);
    ctx.globalAlpha = h.alpha;
    ctx.fillStyle = h.color;
    ctx.beginPath();
    ctx.moveTo(0, s * 0.3);
    ctx.bezierCurveTo(-s * 0.05, 0, -s * 0.5, 0, -s * 0.5, s * 0.3);
    ctx.bezierCurveTo(-s * 0.5, s * 0.6, 0, s * 0.9, 0, s * 1.0);
    ctx.bezierCurveTo(0, s * 0.9, s * 0.5, s * 0.6, s * 0.5, s * 0.3);
    ctx.bezierCurveTo(s * 0.5, 0, s * 0.05, 0, 0, s * 0.3);
    ctx.fill();
    ctx.restore();
  }

  private animate(): void {
    const canvas = this.canvasRef.nativeElement;
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (const h of this.hearts) {
      h.y -= h.speed;
      h.swing += h.swingSpeed;
      h.x += Math.sin(h.swing + h.offset) * 0.6;
      h.alpha = 0.15 + Math.abs(Math.sin(h.swing * 0.5)) * 0.4;

      if (h.y < -h.size * 2) {
        h.y = canvas.height + h.size;
        h.x = Math.random() * canvas.width;
        h.alpha = Math.random() * 0.3 + 0.1;
      }

      this.drawHeart(this.ctx, h);
    }

    this.animationId = requestAnimationFrame(() => this.animate());
  }

  scrollTo(selector: string): void {
    document.querySelector(selector)?.scrollIntoView({ behavior: 'smooth' });
  }
}
