import {
  Component,
  AfterViewInit,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface BibleVerse {
  text: string;
  ref: string;
  tag: string;
  featured?: boolean;
}

@Component({
  selector: 'app-bible-verses',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './bible-verses.component.html',
  styles: [`
    :host { display: block; }

    /* ─── Section ─── */
    .verses-section {
      position: relative;
      background: linear-gradient(180deg, #080508 0%, #0e0a18 25%, #12091f 50%, #0e0a18 75%, #080508 100%);
      padding: 7rem 1.5rem;
      overflow: hidden;
    }

    .ambient-top {
      position: absolute;
      top: 0; left: 50%;
      transform: translateX(-50%);
      width: 600px; height: 300px;
      background: radial-gradient(ellipse at center top, #4a207025 0%, transparent 70%);
      pointer-events: none;
    }

    .ambient-bottom {
      position: absolute;
      bottom: 0; left: 50%;
      transform: translateX(-50%);
      width: 500px; height: 250px;
      background: radial-gradient(ellipse at center bottom, #7a153520 0%, transparent 70%);
      pointer-events: none;
    }

    /* ─── Header ─── */
    .section-header {
      text-align: center;
      margin-bottom: 5rem;
      position: relative;
      z-index: 1;
    }

    .section-eyebrow {
      font-family: 'Cinzel', Georgia, serif;
      font-size: clamp(0.7rem, 1.5vw, 0.85rem);
      color: #d4a843;
      text-transform: uppercase;
      letter-spacing: 0.3em;
      display: block;
      margin-bottom: 1.2rem;
    }

    .section-title {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: clamp(2rem, 5vw, 3.8rem);
      font-weight: 700;
      line-height: 1.15;
      background: linear-gradient(135deg, #f0cc7a 0%, #d4a843 40%, #f0c0c8 80%, #e090a0 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      text-wrap: balance;
      margin-bottom: 1.8rem;
    }

    /* Cross divider */
    .divider-cross {
      display: flex;
      align-items: center;
      gap: 1rem;
      max-width: 280px;
      margin: 0 auto 1.8rem;
    }

    .divider-cross .line {
      flex: 1;
      height: 1px;
      background: linear-gradient(to right, transparent, #d4a84355);
    }
    .divider-cross .line:last-child {
      background: linear-gradient(to left, transparent, #d4a84355);
    }

    .cross-icon {
      font-size: 1.2rem;
      color: #d4a843;
      text-shadow: 0 0 20px #d4a84366;
    }

    .header-intro {
      font-family: 'Cormorant Garamond', Georgia, serif;
      font-size: clamp(1.05rem, 2vw, 1.25rem);
      color: #a89888;
      font-style: italic;
      line-height: 1.75;
      max-width: 580px;
      margin: 0 auto;
    }

    /* ─── Grid ─── */
    .verses-grid {
      position: relative;
      z-index: 1;
      display: grid;
      grid-template-columns: 1fr;
      gap: 1.5rem;
      max-width: 960px;
      margin: 0 auto 4rem;
    }

    @media (min-width: 640px) {
      .verses-grid { grid-template-columns: repeat(2, 1fr); }
    }

    @media (min-width: 900px) {
      .verses-grid { grid-template-columns: repeat(3, 1fr); }
      .verse-card.featured {
        grid-column: span 2;
      }
    }

    /* ─── Verse card ─── */
    .verse-card {
      position: relative;
      background: linear-gradient(145deg, #1a0e2888 0%, #160a1a80 50%, #1e0e1488 100%);
      border: 1px solid #d4a84328;
      border-radius: 20px;
      padding: 2.2rem 1.8rem 1.8rem;
      backdrop-filter: blur(10px);
      box-shadow:
        0 8px 32px #00000040,
        inset 0 1px 0 #d4a84318;
      opacity: 0;
      transition: border-color 0.4s ease, transform 0.4s ease, box-shadow 0.4s ease;
      overflow: hidden;
    }

    .verse-card:hover {
      border-color: #d4a84355;
      transform: translateY(-5px);
      box-shadow: 0 20px 50px #00000055, 0 0 30px #d4a84312, inset 0 1px 0 #d4a84330;
    }

    /* Glow corner accent */
    .verse-card::after {
      content: '';
      position: absolute;
      top: 0; right: 0;
      width: 80px; height: 80px;
      background: radial-gradient(circle at top right, #d4a84312 0%, transparent 70%);
      border-radius: 0 20px 0 0;
      pointer-events: none;
    }

    /* Featured card extra glow */
    .verse-card.featured {
      border-color: #d4a84345;
      box-shadow:
        0 12px 48px #00000050,
        0 0 40px #d4a84318,
        inset 0 1px 0 #d4a84330;
    }

    /* ─── Quote mark ─── */
    .quote-mark {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 5rem;
      line-height: 0.5;
      color: #d4a84325;
      display: block;
      margin-bottom: 0.8rem;
      font-weight: 900;
    }

    /* ─── Verse text ─── */
    .verse-text {
      font-family: 'Cormorant Garamond', Georgia, serif;
      font-size: clamp(1.05rem, 1.8vw, 1.22rem);
      line-height: 1.9;
      color: #d8d0c8;
      font-style: italic;
      margin: 0 0 1.4rem;
    }

    .verse-card.featured .verse-text {
      font-size: clamp(1.1rem, 2vw, 1.32rem);
    }

    /* ─── Reference ─── */
    .verse-ref-block {
      display: flex;
      align-items: center;
      gap: 0.8rem;
      margin-bottom: 1rem;
    }

    .ref-line {
      display: block;
      width: 32px;
      height: 1px;
      background: linear-gradient(to right, #d4a843, transparent);
      flex-shrink: 0;
    }

    .verse-ref {
      font-family: 'Cinzel', Georgia, serif;
      font-size: 0.75rem;
      color: #d4a843;
      letter-spacing: 0.12em;
      font-style: normal;
    }

    /* ─── Tag ─── */
    .verse-tag {
      display: inline-block;
      padding: 0.25rem 0.9rem;
      border: 1px solid #d4a84325;
      border-radius: 999px;
      font-family: 'Cormorant Garamond', Georgia, serif;
      font-size: 0.8rem;
      color: #a07830;
      letter-spacing: 0.05em;
    }

    /* ─── Closing declaration ─── */
    .closing-declaration {
      position: relative;
      z-index: 1;
      text-align: center;
      margin-top: 2rem;
    }

    .decl-cross {
      font-size: 2rem;
      color: #d4a843;
      text-shadow: 0 0 30px #d4a84355;
      margin-bottom: 1rem;
      animation: pulse-glow 3s ease-in-out infinite;
    }

    .decl-text {
      font-family: 'Cormorant Garamond', Georgia, serif;
      font-size: clamp(1.2rem, 2.5vw, 1.6rem);
      color: #c8c0b8;
      line-height: 1.8;
    }

    .decl-text em {
      font-family: 'Cinzel', Georgia, serif;
      font-size: 0.9em;
      color: #d4a843;
      font-style: normal;
      letter-spacing: 0.08em;
    }

    @keyframes pulse-glow {
      0%, 100% { text-shadow: 0 0 20px #d4a84333; opacity: 0.8; }
      50%       { text-shadow: 0 0 40px #d4a84388; opacity: 1; }
    }
  `]
})
export class BibleVersesComponent implements AfterViewInit {

  verses: BibleVerse[] = [
    {
      text: 'Car j\'en ai la certitude : ni la mort ni la vie, ni les anges ni les dominations, ni le présent ni l\'avenir, ni les puissances, ni la hauteur ni la profondeur, ni aucune autre créature ne pourra nous séparer de l\'amour de Dieu manifesté en Jésus-Christ notre Seigneur.',
      ref: 'Romains 8 : 38-39',
      tag: 'Inséparables en Dieu',
      featured: true,
    },
    {
      text: 'L\'amour est patient, il est plein de bonté ; l\'amour n\'est point envieux ; l\'amour ne se vante point, il ne s\'enfle point d\'orgueil. Il supporte tout, il croit tout, il espère tout, il endure tout. L\'amour ne périt jamais.',
      ref: '1 Corinthiens 13 : 4, 7-8',
      tag: 'La nature de l\'amour',
      featured: false,
    },
    {
      text: 'Celui qui est deux vaut mieux qu\'un, parce qu\'ils retirent un bon salaire de leur travail. Car s\'ils tombent, l\'un relève l\'autre. Un lien à trois fils ne se rompt pas facilement.',
      ref: 'Ecclésiaste 4 : 9-10, 12',
      tag: 'Unis à trois — vous deux et Dieu',
      featured: false,
    },
    {
      text: 'Que l\'homme ne sépare pas ce que Dieu a uni.',
      ref: 'Marc 10 : 9',
      tag: 'Scellés par Dieu',
      featured: false,
    },
    {
      text: 'Pardessus toutes ces choses, revêtez-vous de la charité, qui est le lien de la perfection. Et que la paix de Christ, à laquelle vous avez été appelés en un seul corps, règne dans vos cœurs.',
      ref: 'Colossiens 3 : 14-15',
      tag: 'L\'amour, lien parfait',
      featured: false,
    },
    {
      text: 'Les grandes eaux ne peuvent éteindre l\'amour, et les fleuves ne le submergeraient pas. Quand un homme offrirait tous les biens de sa maison pour l\'amour, il ne s\'en soucierait que pour les mépriser.',
      ref: 'Cantique des Cantiques 8 : 7',
      tag: 'Amour inextinguible',
      featured: false,
    },
    {
      text: 'Là où tu iras, j\'irai ; et là où tu t\'arrêteras, je m\'arrêterai. Là où tu mourras, je mourrai, et j\'y serai enterrée. Que l\'Éternel me traite dans toute sa rigueur, si autre chose que la mort me sépare de toi.',
      ref: 'Ruth 1 : 16-17',
      tag: 'Fidélité sans condition',
      featured: true,
    },
  ];

  ngAfterViewInit(): void {
    const cards = document.querySelectorAll('.verse-card');
    cards.forEach((card, i) => {
      gsap.fromTo(card,
        { opacity: 0, y: 50, scale: 0.96 },
        {
          opacity: 1, y: 0, scale: 1,
          duration: 0.9,
          ease: 'power3.out',
          delay: (i % 3) * 0.12,
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    });

    gsap.fromTo('.section-header',
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.verses-section',
          start: 'top 80%',
        },
      }
    );

    gsap.fromTo('.closing-declaration',
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.closing-declaration',
          start: 'top 85%',
        },
      }
    );
  }
}
