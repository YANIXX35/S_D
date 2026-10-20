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
  selector: 'app-promises',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './promises.component.html',
  styles: [`
    :host { display: block; }

    .promises-section {
      position: relative;
      background: linear-gradient(180deg, #080508 0%, #0e0a14 40%, #12091a 60%, #080508 100%);
      padding: 7rem 1.5rem;
      overflow: hidden;
    }

    .ambient {
      position: absolute;
      inset: 0;
      background:
        radial-gradient(ellipse 70% 40% at 50% 20%, #4a207020 0%, transparent 60%),
        radial-gradient(ellipse 50% 30% at 50% 80%, #7a153518 0%, transparent 60%);
      pointer-events: none;
    }

    .section-header {
      text-align: center;
      margin-bottom: 4rem;
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
      margin-bottom: 1rem;
    }

    .section-title {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: clamp(2rem, 5vw, 3.5rem);
      font-weight: 700;
      line-height: 1.2;
      background: linear-gradient(135deg, #f0cc7a 0%, #d4a843 40%, #f0c0c8 80%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      text-wrap: balance;
    }

    .divider-gold {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin: 2rem auto 0;
      max-width: 320px;
    }
    .divider-gold::before,
    .divider-gold::after {
      content: '';
      flex: 1;
      height: 1px;
    }
    .divider-gold::before { background: linear-gradient(to right, transparent, #d4a843); }
    .divider-gold::after  { background: linear-gradient(to left, transparent, #d4a843); }

    /* Grid */
    .promises-grid {
      position: relative;
      z-index: 1;
      display: grid;
      grid-template-columns: 1fr;
      gap: 1.5rem;
      max-width: 900px;
      margin: 0 auto 4rem;
    }

    @media (min-width: 600px) {
      .promises-grid { grid-template-columns: repeat(2, 1fr); }
    }

    @media (min-width: 900px) {
      .promises-grid { grid-template-columns: repeat(3, 1fr); }
    }

    /* Card */
    .promise-card {
      background: linear-gradient(145deg, #1a0e2880 0%, #1a0a1480 100%);
      border: 1px solid #d4a84328;
      border-radius: 20px;
      padding: 2rem 1.6rem;
      text-align: center;
      opacity: 0;
      backdrop-filter: blur(10px);
      box-shadow: 0 8px 32px #00000040, inset 0 1px 0 #d4a84315;
      transition: border-color 0.4s, transform 0.4s, box-shadow 0.4s;
    }

    .promise-card:hover {
      border-color: #d4a84355;
      transform: translateY(-5px);
      box-shadow: 0 20px 48px #00000055, 0 0 28px #d4a84312;
    }

    .promise-icon {
      font-size: 2.4rem;
      margin-bottom: 1rem;
      filter: drop-shadow(0 0 12px #d4a84344);
    }

    .promise-title {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: clamp(1.1rem, 2vw, 1.35rem);
      font-weight: 700;
      color: #faf5ef;
      margin-bottom: 0.8rem;
      line-height: 1.3;
    }

    .promise-text {
      font-family: 'Cormorant Garamond', Georgia, serif;
      font-size: clamp(1rem, 1.8vw, 1.15rem);
      color: #c8c0b8;
      font-style: italic;
      line-height: 1.85;
    }

    /* Closing note */
    .closing-note {
      position: relative;
      z-index: 1;
      max-width: 620px;
      margin: 0 auto;
      text-align: center;
    }

    .closing-note p {
      font-family: 'Cormorant Garamond', Georgia, serif;
      font-size: clamp(1.1rem, 2vw, 1.3rem);
      color: #a89888;
      font-style: italic;
      line-height: 1.9;
    }

    .closing-note em {
      color: #d4a843;
      font-style: italic;
    }
  `]
})
export class PromisesComponent implements AfterViewInit {

  promises = [
    {
      icon: '🤍',
      title: 'Ne plus jamais te mentir',
      text: 'La vérité, même quand elle est difficile à dire. Même quand j\'ai peur de ta réaction. Tu mérites toujours la vérité.',
    },
    {
      icon: '🛡️',
      title: 'Protéger ta confiance',
      text: 'Ta confiance est quelque chose de sacré. Je la traiterai comme telle — pas comme acquise, mais comme un cadeau que tu me fais chaque jour.',
    },
    {
      icon: '👁️',
      title: 'Être transparent',
      text: 'Plus de secrets, plus de zones d\'ombre. Si quelque chose me traverse l\'esprit, je te le dis. La transparence avant tout.',
    },
    {
      icon: '🙏',
      title: 'Assumer mes erreurs',
      text: 'Quand je me trompe, je le dis clairement. Sans détour, sans rejeter la faute ailleurs. Je suis responsable de mes actes.',
    },
    {
      icon: '💪',
      title: 'Être l\'homme que tu mérites',
      text: 'Pas parfait — je ne le serai jamais. Mais quelqu\'un qui travaille chaque jour à être meilleur pour toi et pour nous.',
    },
    {
      icon: '✝️',
      title: 'Mettre Dieu au centre',
      text: 'Un amour fondé sur Lui résiste à tout. Je veux qu\'on construise quelque chose de solide — avec Dieu comme fondation.',
    },
  ];

  ngAfterViewInit(): void {
    const cards = document.querySelectorAll('.promise-card');
    cards.forEach((card, i) => {
      gsap.fromTo(card,
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0,
          duration: 0.8,
          ease: 'power3.out',
          delay: (i % 3) * 0.1,
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    });

    gsap.fromTo('.section-header, .closing-note',
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0,
        duration: 1,
        ease: 'power3.out',
        stagger: 0.2,
        scrollTrigger: {
          trigger: '.promises-section',
          start: 'top 80%',
        },
      }
    );
  }
}
