import {
  Component,
  OnInit,
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  HostListener,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export interface MediaItem {
  type: 'photo' | 'video';
  src: string;
  thumbnail?: string;
  caption: string;
  moment: string;
}

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './gallery.component.html',
  styles: [`
    :host { display: block; }

    .gallery-section {
      background: linear-gradient(180deg, #080508 0%, #0e0812 50%, #080508 100%);
      padding: 6rem 1.5rem;
      position: relative;
    }

    .gallery-section::before {
      content: '';
      position: absolute;
      inset: 0;
      background: radial-gradient(ellipse 80% 50% at 50% 50%, #4a207012 0%, transparent 70%);
      pointer-events: none;
    }

    @media (min-width: 768px) {
      .gallery-section { padding: 8rem 2rem; }
    }

    .section-header {
      text-align: center;
      margin-bottom: 4rem;
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

    /* ─── Grid ─── */
    .media-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1rem;
      max-width: 960px;
      margin: 0 auto;
    }

    @media (min-width: 640px) {
      .media-grid { grid-template-columns: repeat(3, 1fr); gap: 1.25rem; }
    }

    @media (min-width: 900px) {
      .media-grid { grid-template-columns: repeat(4, 1fr); gap: 1.5rem; }
    }

    /* ─── Media card ─── */
    .media-card {
      position: relative;
      border-radius: 16px;
      overflow: hidden;
      aspect-ratio: 3 / 4;
      cursor: pointer;
      opacity: 0;
      background: #1a0d14;
      border: 1px solid #d4a84320;
      transition: border-color 0.4s ease, transform 0.4s ease, box-shadow 0.4s ease;
      box-shadow: 0 4px 24px #00000050;
    }

    .media-card:hover {
      border-color: #d4a84355;
      transform: translateY(-6px) scale(1.01);
      box-shadow: 0 16px 48px #00000060, 0 0 24px #d4a84318;
    }

    .media-card img,
    .media-card video {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.5s ease;
      display: block;
    }

    .media-card:hover img,
    .media-card:hover video {
      transform: scale(1.06);
    }

    /* ─── Overlay on hover ─── */
    .media-overlay {
      position: absolute;
      inset: 0;
      background: linear-gradient(to top, #08050899 0%, #12091a55 50%, transparent 100%);
      opacity: 0;
      transition: opacity 0.4s ease;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      padding: 1.2rem;
    }

    .media-card:hover .media-overlay { opacity: 1; }

    .overlay-caption {
      font-family: 'Cormorant Garamond', Georgia, serif;
      font-size: 0.92rem;
      font-style: italic;
      color: #faf5ef;
      line-height: 1.4;
    }

    .overlay-moment {
      font-family: 'Great Vibes', cursive;
      font-size: 1.25rem;
      color: #d4a843;
      text-shadow: 0 0 16px #d4a84355;
    }

    /* Video badge */
    .video-badge {
      position: absolute;
      top: 0.6rem;
      right: 0.6rem;
      width: 32px;
      height: 32px;
      background: #c9a96ecc;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .video-badge svg {
      fill: #0d0a0b;
      width: 12px;
      height: 12px;
      margin-left: 2px;
    }

    /* ─── Lightbox overlay ─── */
    .lightbox-overlay {
      position: fixed;
      inset: 0;
      background: rgba(13, 10, 11, 0.95);
      z-index: 1000;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1rem;
      backdrop-filter: blur(8px);
      animation: fadeIn 0.3s ease;
    }

    .lightbox-inner {
      position: relative;
      max-width: 880px;
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1.2rem;
    }

    .lightbox-inner img,
    .lightbox-inner video {
      max-width: 100%;
      max-height: 75vh;
      border-radius: 12px;
      object-fit: contain;
      border: 1px solid #c9a96e33;
      box-shadow: 0 0 60px #00000088;
    }

    .lightbox-caption-block {
      text-align: center;
    }

    .lightbox-moment {
      font-family: 'Great Vibes', cursive;
      font-size: 1.4rem;
      color: #c9a96e;
    }

    .lightbox-caption {
      font-family: 'Cormorant Garamond', Georgia, serif;
      font-size: 1rem;
      color: #b8b0a8;
      font-style: italic;
    }

    .lightbox-close {
      position: fixed;
      top: 1.5rem;
      right: 1.5rem;
      width: 44px;
      height: 44px;
      background: #1a0d14;
      border: 1px solid #c9a96e44;
      border-radius: 50%;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #c9a96e;
      font-size: 1.3rem;
      transition: background 0.2s ease;
      z-index: 1001;
    }

    .lightbox-close:hover { background: #2a1220; }

    /* Prev / Next navigation */
    .lightbox-nav {
      position: fixed;
      top: 50%;
      transform: translateY(-50%);
      background: #1a0d1499;
      border: 1px solid #c9a96e33;
      border-radius: 50%;
      width: 44px;
      height: 44px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      color: #c9a96e;
      font-size: 1.1rem;
      transition: background 0.2s ease;
      z-index: 1001;
    }

    .lightbox-nav:hover { background: #2a1220; }
    .lightbox-nav.prev { left: 1rem; }
    .lightbox-nav.next { right: 1rem; }

    @keyframes fadeIn {
      from { opacity: 0; }
      to   { opacity: 1; }
    }
  `]
})
export class GalleryComponent implements OnInit, AfterViewInit {
  lightboxItem = signal<MediaItem | null>(null);
  lightboxIndex = signal<number>(-1);

  media: MediaItem[] = [
    // ── Photos ───────────────────────────────────────────────────────
    {
      type: 'photo',
      src: 'assets/media/photo1.jpeg',
      caption: 'Un moment suspendu dans le temps',
      moment: 'Toi & moi',
    },
    {
      type: 'photo',
      src: 'assets/media/photo2.jpeg',
      caption: 'Ta façon de sourire qui illumine tout',
      moment: 'Ton sourire',
    },
    {
      type: 'photo',
      src: 'assets/media/photo3.jpeg',
      caption: 'Ces yeux que j\'aime regarder',
      moment: 'La beauté',
    },
    {
      type: 'photo',
      src: 'assets/media/photo4.jpeg',
      caption: 'Ensemble, tout devient plus beau',
      moment: 'Nous',
    },
    // ── Vidéos ───────────────────────────────────────────────────────
    {
      type: 'video',
      src: 'assets/media/video1.mp4',
      caption: 'Ce moment en mouvement que je garde précieusement',
      moment: 'Notre souvenir',
    },
    {
      type: 'video',
      src: 'assets/media/video2.mp4',
      caption: 'Ta voix, ton rire — ma mélodie préférée',
      moment: 'Ta voix',
    },
    {
      type: 'video',
      src: 'assets/media/video3.mp4',
      caption: 'Des secondes infinies à tes côtés',
      moment: 'L\'instant',
    },
    {
      type: 'video',
      src: 'assets/media/video4.mp4',
      caption: 'Ce que les photos seules ne peuvent pas capturer',
      moment: 'La vie',
    },
  ];

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    const cards = document.querySelectorAll('.media-card');
    cards.forEach((card, i) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 40, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          ease: 'power3.out',
          delay: (i % 4) * 0.1,
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    });
  }

  openLightbox(item: MediaItem, index: number): void {
    this.lightboxItem.set(item);
    this.lightboxIndex.set(index);
    document.body.style.overflow = 'hidden';
    this.cdr.markForCheck();
  }

  closeLightbox(): void {
    this.lightboxItem.set(null);
    this.lightboxIndex.set(-1);
    document.body.style.overflow = '';
    this.cdr.markForCheck();
  }

  prev(): void {
    const idx = this.lightboxIndex();
    if (idx > 0) {
      this.lightboxItem.set(this.media[idx - 1]);
      this.lightboxIndex.set(idx - 1);
      this.cdr.markForCheck();
    }
  }

  next(): void {
    const idx = this.lightboxIndex();
    if (idx < this.media.length - 1) {
      this.lightboxItem.set(this.media[idx + 1]);
      this.lightboxIndex.set(idx + 1);
      this.cdr.markForCheck();
    }
  }

  @HostListener('document:keydown', ['$event'])
  onKeydown(e: KeyboardEvent): void {
    if (!this.lightboxItem()) return;
    if (e.key === 'Escape')      this.closeLightbox();
    else if (e.key === 'ArrowLeft')  this.prev();
    else if (e.key === 'ArrowRight') this.next();
  }

  onOverlayClick(e: MouseEvent): void {
    if ((e.target as HTMLElement).classList.contains('lightbox-overlay')) {
      this.closeLightbox();
    }
  }
}
