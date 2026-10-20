import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-preloader',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="preloader" [class.hide]="hidden">
      <!-- Ambient glow orbs -->
      <div class="orb orb1" aria-hidden="true"></div>
      <div class="orb orb2" aria-hidden="true"></div>

      <div class="pre-content">
        <div class="pre-hearts">
          <span class="h1">🤍</span>
          <span class="h2">💜</span>
          <span class="h3">🤍</span>
        </div>
        <p class="pre-for">Pour toi,</p>
        <h1 class="pre-name">Sarah</h1>
        <p class="pre-sub">Un message du fond du cœur...</p>
        <div class="pre-bar-wrap">
          <div class="pre-bar"><div class="pre-fill"></div></div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host { display: block; }

    .preloader {
      position: fixed;
      inset: 0;
      z-index: 9999;
      background: #0c0b10;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: opacity 1.2s ease, visibility 1.2s ease;
      opacity: 1;
      visibility: visible;
      overflow: hidden;
    }

    .preloader.hide {
      opacity: 0;
      visibility: hidden;
      pointer-events: none;
    }

    /* Ambient glow orbs */
    .orb {
      position: absolute;
      border-radius: 50%;
      filter: blur(80px);
      pointer-events: none;
      animation: orbPulse 4s ease-in-out infinite;
    }
    .orb1 {
      width: 400px; height: 400px;
      background: radial-gradient(circle, #4a207028 0%, transparent 70%);
      top: -100px; left: -100px;
    }
    .orb2 {
      width: 350px; height: 350px;
      background: radial-gradient(circle, #7a153520 0%, transparent 70%);
      bottom: -80px; right: -80px;
      animation-delay: 2s;
    }

    @keyframes orbPulse {
      0%, 100% { opacity: 0.5; transform: scale(1); }
      50%       { opacity: 1;   transform: scale(1.15); }
    }

    .pre-content {
      text-align: center;
      animation: fadeInUp 0.9s ease forwards;
      position: relative;
      z-index: 1;
    }

    .pre-hearts {
      display: flex;
      justify-content: center;
      gap: 1.2rem;
      margin-bottom: 1.8rem;
    }

    .pre-hearts span {
      font-size: 1.8rem;
      animation: heartPop 1.8s ease-in-out infinite;
      display: inline-block;
    }
    .pre-hearts .h2 { animation-delay: 0.3s; font-size: 2.4rem; }
    .pre-hearts .h3 { animation-delay: 0.6s; }

    .pre-for {
      font-family: 'Great Vibes', cursive;
      font-size: 2.2rem;
      color: #cdc8f0;
      margin-bottom: 0.2rem;
      opacity: 0;
      animation: fadeInUp 0.8s ease 0.4s forwards;
    }

    .pre-name {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: clamp(4rem, 12vw, 7rem);
      font-weight: 900;
      background: linear-gradient(135deg, #ffffff 0%, #cdc8f0 30%, #a89fd4 55%, #e8c4d0 80%, #ffffff 100%);
      background-size: 200% 100%;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      line-height: 1;
      margin-bottom: 1rem;
      opacity: 0;
      animation: fadeInUp 0.8s ease 0.7s forwards, shimmer 3s linear 1.5s infinite;
      letter-spacing: -0.02em;
      filter: drop-shadow(0 0 40px #a89fd450);
    }

    .pre-sub {
      font-family: 'Cormorant Garamond', Georgia, serif;
      font-size: 1.15rem;
      color: #8884b8;
      font-style: italic;
      margin-bottom: 3rem;
      opacity: 0;
      animation: fadeInUp 0.8s ease 1s forwards;
      letter-spacing: 0.02em;
    }

    .pre-bar-wrap {
      opacity: 0;
      animation: fadeInUp 0.6s ease 1.3s forwards;
    }

    .pre-bar {
      width: 220px;
      height: 2px;
      background: #a89fd420;
      border-radius: 2px;
      margin: 0 auto;
      overflow: hidden;
      position: relative;
    }

    .pre-bar::before {
      content: '';
      position: absolute;
      inset: 0;
      background: #a89fd415;
      border-radius: 2px;
    }

    .pre-fill {
      height: 100%;
      width: 0%;
      background: linear-gradient(to right, #a89fd4, #cdc8f0, #e8c4d0, #a89fd4);
      background-size: 200% 100%;
      border-radius: 2px;
      animation: fillBar 2.8s cubic-bezier(0.4, 0, 0.2, 1) 1.3s forwards,
                 barShimmer 1.5s linear 1.3s infinite;
      box-shadow: 0 0 12px #a89fd466;
    }

    @keyframes fillBar {
      0%   { width: 0%; }
      100% { width: 100%; }
    }

    @keyframes barShimmer {
      0%   { background-position: 200% 0; }
      100% { background-position: -200% 0; }
    }

    @keyframes shimmer {
      0%   { background-position: 200% 0; }
      100% { background-position: -200% 0; }
    }

    @keyframes heartPop {
      0%, 100% { transform: scale(1); }
      40%       { transform: scale(1.35); }
      60%       { transform: scale(1.2); }
    }

    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(16px); }
      to   { opacity: 1; transform: translateY(0); }
    }
  `]
})
export class PreloaderComponent implements OnInit {
  @Output() done = new EventEmitter<void>();
  hidden = false;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.hidden = true;
      this.cdr.markForCheck();
      setTimeout(() => this.done.emit(), 1000);
    }, 3200);
  }
}
