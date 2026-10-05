import {
  Component,
  AfterViewInit,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-love-letter',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './love-letter.component.html',
  styles: [`
    :host { display: block; }

    .letter-section {
      background: linear-gradient(180deg, #080508 0%, #12091a 30%, #1a0a12 60%, #0e0812 85%, #080508 100%);
      padding: 6rem 1.5rem;
      position: relative;
      overflow: hidden;
    }

    .letter-section::after {
      content: '';
      position: absolute;
      inset: 0;
      background:
        radial-gradient(ellipse 60% 50% at 30% 40%, #4a207018 0%, transparent 60%),
        radial-gradient(ellipse 50% 40% at 75% 65%, #7a153520 0%, transparent 60%);
      pointer-events: none;
    }

    @media (min-width: 768px) {
      .letter-section { padding: 8rem 2rem; }
    }

    /* Ambient stars */
    .stars-bg {
      position: absolute;
      inset: 0;
      background-image:
        radial-gradient(1px 1px at 20% 30%, #c9a96e55 0%, transparent 100%),
        radial-gradient(1px 1px at 60% 15%, #e8b4b844 0%, transparent 100%),
        radial-gradient(1px 1px at 80% 70%, #c9a96e33 0%, transparent 100%),
        radial-gradient(1px 1px at 10% 80%, #e8b4b822 0%, transparent 100%),
        radial-gradient(1px 1px at 45% 55%, #c9a96e44 0%, transparent 100%),
        radial-gradient(2px 2px at 75% 40%, #c9a96e22 0%, transparent 100%);
      pointer-events: none;
    }

    .section-header {
      text-align: center;
      margin-bottom: 3.5rem;
      position: relative;
      z-index: 1;
    }

    .section-eyebrow {
      font-family: 'Great Vibes', cursive;
      font-size: clamp(1.6rem, 3.5vw, 2.6rem);
      color: #c9a96e;
      display: block;
      margin-bottom: 0.5rem;
    }

    .section-title {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: clamp(2rem, 5vw, 3.5rem);
      font-weight: 700;
      background: linear-gradient(135deg, #e2c99a 0%, #c9a96e 60%, #e8b4b8 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      line-height: 1.2;
      text-wrap: balance;
    }

    /* ─── Letter card (parchment) ─── */
    .letter-card {
      position: relative;
      z-index: 1;
      max-width: 740px;
      margin: 0 auto;
      background: linear-gradient(145deg, #1e0d2a 0%, #180c18 35%, #1a0a14 65%, #1c0f10 100%);
      border: 1px solid #d4a84340;
      border-radius: 24px;
      padding: 3.5rem 3rem;
      box-shadow:
        0 0 0 1px #d4a84310,
        0 8px 60px #00000070,
        0 0 80px #4a207015,
        inset 0 0 60px #d4a84308,
        inset 0 1px 0 #d4a84320;
      opacity: 0;
    }

    @media (max-width: 600px) {
      .letter-card { padding: 2.5rem 1.75rem; }
    }

    /* Corner ornaments */
    .letter-card::before,
    .letter-card::after {
      content: '';
      position: absolute;
      width: 60px;
      height: 60px;
      border-color: #c9a96e33;
      border-style: solid;
    }
    .letter-card::before {
      top: 1.2rem;
      left: 1.2rem;
      border-width: 1px 0 0 1px;
      border-radius: 6px 0 0 0;
    }
    .letter-card::after {
      bottom: 1.2rem;
      right: 1.2rem;
      border-width: 0 1px 1px 0;
      border-radius: 0 0 6px 0;
    }

    /* ─── Letter content ─── */
    .letter-salutation {
      font-family: 'Great Vibes', cursive;
      font-size: clamp(2.2rem, 5vw, 3.5rem);
      color: #d4a843;
      margin-bottom: 2rem;
      display: block;
      line-height: 1.2;
      text-shadow: 0 0 30px #d4a84340;
    }

    .letter-body {
      font-family: 'Cormorant Garamond', Georgia, serif;
      font-size: clamp(1.08rem, 2vw, 1.25rem);
      line-height: 2;
      color: #d8d0c8;
    }

    .letter-body p {
      margin-bottom: 1.4rem;
    }

    .letter-body p:last-of-type { margin-bottom: 0; }

    .letter-body em {
      color: #f0c0c8;
      font-style: italic;
    }

    .letter-body strong {
      color: #faf5ef;
      font-weight: 600;
    }

    .letter-separator {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin: 2rem 0;
      color: #d4a84366;
    }

    .letter-separator::before,
    .letter-separator::after {
      content: '';
      flex: 1;
      height: 1px;
      background: linear-gradient(to right, transparent, #d4a84330);
    }
    .letter-separator::after {
      background: linear-gradient(to left, transparent, #d4a84330);
    }

    .letter-closing {
      font-family: 'Cormorant Garamond', Georgia, serif;
      font-size: 1.08rem;
      color: #c8c0b8;
      font-style: italic;
      margin-top: 1.8rem;
    }

    .letter-signature {
      font-family: 'Great Vibes', cursive;
      font-size: clamp(2.2rem, 4vw, 3rem);
      color: #d4a843;
      margin-top: 0.4rem;
      display: block;
      text-shadow: 0 0 24px #d4a84344;
    }

    /* Heart seal */
    .letter-seal {
      display: flex;
      justify-content: center;
      margin-top: 2rem;
    }

    .seal-heart {
      width: 52px;
      height: 52px;
      background: linear-gradient(135deg, #c9a96e, #e8b4b8);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem;
      box-shadow: 0 0 24px #c9a96e44;
      animation: heartbeat 2s ease-in-out infinite;
    }

    @keyframes heartbeat {
      0%, 100% { transform: scale(1); }
      14%       { transform: scale(1.15); }
      28%       { transform: scale(1); }
      42%       { transform: scale(1.1); }
      70%       { transform: scale(1); }
    }
  `]
})
export class LoveLetterComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    gsap.to('.letter-card', {
      opacity: 1,
      y: 0,
      duration: 1.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.letter-card',
        start: 'top 75%',
        toggleActions: 'play none none none',
      },
    });

    gsap.from('.letter-card', {
      y: 60,
      scrollTrigger: {
        trigger: '.letter-card',
        start: 'top 75%',
        toggleActions: 'play none none none',
      },
      duration: 1.2,
      ease: 'power3.out',
    });

    gsap.from('.section-header', {
      opacity: 0,
      y: 40,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.letter-section',
        start: 'top 80%',
      },
    });
  }
}
