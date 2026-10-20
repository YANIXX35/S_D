import {
  Component,
  OnDestroy,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-music-player',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="music-btn" (click)="toggleMusic()" [class.playing]="isPlaying" [attr.aria-label]="isPlaying ? 'Couper la musique' : 'Lancer la musique'">
      <div class="music-icon">
        @if (isPlaying) {
          <div class="bars">
            <span></span><span></span><span></span><span></span>
          </div>
        } @else {
          <svg viewBox="0 0 24 24"><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/></svg>
        }
      </div>
      <audio #audioEl src="assets/media/music.mp3" loop></audio>
    </div>
  `,
  styles: [`
    :host { display: block; }

    .music-btn {
      position: fixed;
      bottom: 2rem;
      right: 2rem;
      z-index: 500;
      width: 52px;
      height: 52px;
      border-radius: 50%;
      background: #131220ee;
      border: 1px solid #a89fd444;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      backdrop-filter: blur(12px);
      transition: border-color 0.3s, box-shadow 0.3s, transform 0.2s;
      box-shadow: 0 4px 20px #00000060;
    }

    .music-btn:hover {
      transform: scale(1.08);
      border-color: #a89fd488;
      box-shadow: 0 8px 28px #00000070, 0 0 20px #a89fd420;
    }

    .music-btn.playing {
      border-color: #a89fd4aa;
      box-shadow: 0 0 0 3px #a89fd420, 0 8px 28px #00000060;
    }

    .music-icon svg {
      width: 22px; height: 22px;
      fill: #a89fd4;
    }

    /* Animated bars when playing */
    .bars {
      display: flex;
      align-items: flex-end;
      gap: 3px;
      height: 22px;
    }

    .bars span {
      display: block;
      width: 4px;
      border-radius: 2px;
      background: #a89fd4;
      animation: bar-dance 1s ease-in-out infinite;
    }
    .bars span:nth-child(1) { height: 8px;  animation-delay: 0s; }
    .bars span:nth-child(2) { height: 16px; animation-delay: 0.2s; }
    .bars span:nth-child(3) { height: 12px; animation-delay: 0.4s; }
    .bars span:nth-child(4) { height: 6px;  animation-delay: 0.1s; }

    @keyframes bar-dance {
      0%, 100% { transform: scaleY(0.5); opacity: 0.7; }
      50%       { transform: scaleY(1.3); opacity: 1; }
    }
  `]
})
export class MusicPlayerComponent implements OnDestroy {
  isPlaying = false;
  private audio: HTMLAudioElement | null = null;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnDestroy(): void {
    this.audio?.pause();
  }

  toggleMusic(): void {
    if (!this.audio) {
      this.audio = document.querySelector('audio') as HTMLAudioElement;
    }
    if (!this.audio) return;

    if (this.isPlaying) {
      this.audio.pause();
      this.isPlaying = false;
    } else {
      this.audio.volume = 0.4;
      this.audio.play().catch(() => {});
      this.isPlaying = true;
    }
    this.cdr.markForCheck();
  }
}
