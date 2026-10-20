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
      <div class="pre-content">
        <div class="pre-hearts">
          <span class="h1">🤍</span>
          <span class="h2">💜</span>
          <span class="h3">🤍</span>
        </div>
        <p class="pre-for">Pour toi,</p>
        <h1 class="pre-name">Sarah</h1>
        <p class="pre-sub">Un message du fond du cœur...</p>
        <div class="pre-bar"><div class="pre-fill"></div></div>
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
      transition: opacity 1s ease, visibility 1s ease;
      opacity: 1;
      visibility: visible;
    }

    .preloader.hide {
      opacity: 0;
      visibility: hidden;
      pointer-events: none;
    }

    .pre-content {
      text-align: center;
      animation: fadeIn 0.8s ease forwards;
    }

    .pre-hearts {
      display: flex;
      justify-content: center;
      gap: 1rem;
      margin-bottom: 1.5rem;
    }

    .pre-hearts span {
      font-size: 1.8rem;
      animation: heartPop 1.5s ease-in-out infinite;
    }
    .pre-hearts .h2 { animation-delay: 0.3s; font-size: 2.2rem; }
    .pre-hearts .h3 { animation-delay: 0.6s; }

    .pre-for {
      font-family: 'Great Vibes', cursive;
      font-size: 2rem;
      color: #cdc8f0;
      margin-bottom: 0.3rem;
    }

    .pre-name {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: clamp(3.5rem, 10vw, 6rem);
      font-weight: 900;
      background: linear-gradient(135deg, #cdc8f0 0%, #a89fd4 40%, #e8c4d0 80%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      line-height: 1;
      margin-bottom: 1rem;
    }

    .pre-sub {
      font-family: 'Cormorant Garamond', Georgia, serif;
      font-size: 1.2rem;
      color: #8884b8;
      font-style: italic;
      margin-bottom: 2.5rem;
    }

    .pre-bar {
      width: 180px;
      height: 2px;
      background: #a89fd422;
      border-radius: 2px;
      margin: 0 auto;
      overflow: hidden;
    }

    .pre-fill {
      height: 100%;
      width: 0%;
      background: linear-gradient(to right, #a89fd4, #cdc8f0, #e8c4d0);
      border-radius: 2px;
      animation: fillBar 2.5s ease-out forwards;
    }

    @keyframes fillBar {
      from { width: 0%; }
      to   { width: 100%; }
    }

    @keyframes heartPop {
      0%, 100% { transform: scale(1); }
      50%       { transform: scale(1.3); }
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(20px); }
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
