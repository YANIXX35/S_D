import {
  Component,
  OnInit,
  AfterViewInit,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export interface TimelineEvent {
  date: string;
  title: string;
  subtitle: string;
  description: string;
  emoji: string;
  side: 'left' | 'right';
}

@Component({
  selector: 'app-timeline',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './timeline.component.html',
  styles: [`
    :host { display: block; }

    .timeline-section {
      background: linear-gradient(180deg, #0d0a0b 0%, #130a10 50%, #0d0a0b 100%);
      padding: 6rem 1.5rem;
      position: relative;
      overflow: hidden;
    }

    @media (min-width: 768px) {
      .timeline-section { padding: 8rem 2rem; }
    }

    .section-header {
      text-align: center;
      margin-bottom: 5rem;
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

    /* ─── Timeline vertical line ─── */
    .timeline-track {
      position: relative;
      max-width: 900px;
      margin: 0 auto;
    }

    .timeline-track::before {
      content: '';
      position: absolute;
      left: 50%;
      top: 0;
      bottom: 0;
      width: 1px;
      background: linear-gradient(to bottom, transparent, #c9a96e66, #e8b4b844, #c9a96e66, transparent);
      transform: translateX(-50%);
    }

    @media (max-width: 767px) {
      .timeline-track::before {
        left: 28px;
      }
    }

    /* ─── Individual event ─── */
    .timeline-event {
      display: flex;
      align-items: flex-start;
      gap: 2rem;
      margin-bottom: 4rem;
      opacity: 0;
    }

    .timeline-event.from-left  { flex-direction: row; }
    .timeline-event.from-right { flex-direction: row-reverse; }

    @media (max-width: 767px) {
      .timeline-event.from-left,
      .timeline-event.from-right {
        flex-direction: row;
        padding-left: 60px;
      }
    }

    /* ─── The card ─── */
    .event-card {
      flex: 1;
      background: linear-gradient(135deg, #1a0d1466, #130a1066);
      border: 1px solid #c9a96e22;
      border-radius: 16px;
      padding: 1.6rem 1.8rem;
      position: relative;
      backdrop-filter: blur(8px);
      transition: border-color 0.3s ease, transform 0.3s ease;
      max-width: calc(50% - 2rem);
    }

    .event-card:hover {
      border-color: #c9a96e55;
      transform: translateY(-4px);
    }

    @media (max-width: 767px) {
      .event-card {
        max-width: 100%;
      }
    }

    /* ─── The center dot ─── */
    .timeline-dot {
      flex-shrink: 0;
      width: 48px;
      height: 48px;
      border-radius: 50%;
      background: linear-gradient(135deg, #c9a96e, #e8b4b8);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.4rem;
      box-shadow: 0 0 20px #c9a96e44;
      position: relative;
      z-index: 2;
      margin-top: 1rem;
    }

    @media (max-width: 767px) {
      .timeline-dot {
        position: absolute;
        left: 4px;
        margin-top: 1.2rem;
      }
    }

    /* ─── Spacer for alternate sides ─── */
    .event-spacer {
      flex: 1;
      max-width: calc(50% - 2rem);
    }

    @media (max-width: 767px) {
      .event-spacer { display: none; }
    }

    /* ─── Card internals ─── */
    .event-date {
      font-family: 'Cormorant Garamond', Georgia, serif;
      font-size: 0.85rem;
      color: #c9a96e;
      text-transform: uppercase;
      letter-spacing: 0.12em;
      margin-bottom: 0.4rem;
    }

    .event-title {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: clamp(1.2rem, 2.5vw, 1.6rem);
      font-weight: 700;
      color: #f5f0eb;
      margin-bottom: 0.3rem;
      line-height: 1.3;
    }

    .event-subtitle {
      font-family: 'Great Vibes', cursive;
      font-size: 1.15rem;
      color: #e8b4b8;
      margin-bottom: 0.75rem;
    }

    .event-description {
      font-family: 'Cormorant Garamond', Georgia, serif;
      font-size: 1.05rem;
      color: #b8b0a8;
      line-height: 1.75;
      font-style: italic;
    }

    /* Corner accent */
    .event-card::after {
      content: '';
      position: absolute;
      top: 1rem;
      right: 1rem;
      width: 24px;
      height: 24px;
      border-top: 1px solid #c9a96e33;
      border-right: 1px solid #c9a96e33;
      border-radius: 0 4px 0 0;
    }
  `]
})
export class TimelineComponent implements OnInit, AfterViewInit {
  events: TimelineEvent[] = [
    {
      date: 'Août 2026 — La première semaine',
      title: 'La rencontre',
      subtitle: 'Le jour où tout a changé',
      description: 'Un regard suffit parfois à changer le cours des choses. Le tien m\'a arrêté net. Il y avait quelque chose dans ta façon d\'être — une lumière que je n\'avais pas vue depuis longtemps.',
      emoji: '✨',
      side: 'right',
    },
    {
      date: 'Août 2026 — Deuxième semaine',
      title: 'Le premier rendez-vous',
      subtitle: 'Le temps s\'est arrêté',
      description: 'On a parlé pendant des heures. Je ne savais pas qu\'une conversation pouvait ressembler à ça — légère, profonde, pleine de rires et de silences qui ne pèsent pas.',
      emoji: '🌸',
      side: 'left',
    },
    {
      date: 'Fin août 2026',
      title: 'Nos fous rires',
      subtitle: 'Ces moments où tout devient simple',
      description: 'Ces instants où tu ris pour rien, où le monde rétrécit jusqu\'à n\'être plus que toi et moi — et une blague que personne d\'autre ne comprendrait.',
      emoji: '💫',
      side: 'right',
    },
    {
      date: 'Début septembre 2026',
      title: 'Notre escapade',
      subtitle: 'Une sortie que je n\'oublierai pas',
      description: 'Tu étais radieuse. Cette journée avec toi reste gravée dans ma mémoire comme une de ces images qu\'on garde pour les jours difficiles — pour se souvenir que le bonheur existe.',
      emoji: '🌅',
      side: 'left',
    },
    {
      date: 'Mi-septembre 2026',
      title: 'Le soir des étoiles',
      subtitle: 'Sous le ciel de Côte d\'Ivoire',
      description: 'Ce soir-là, j\'ai réalisé quelque chose. Ce que je ressens pour toi n\'est pas ordinaire. C\'est doux, puissant, et entier.',
      emoji: '🌙',
      side: 'right',
    },
    {
      date: 'Octobre 2026 — Aujourd\'hui',
      title: 'Deux mois',
      subtitle: 'Et l\'impression que ça ne fait que commencer',
      description: 'Deux mois. Une vie entière de petits bonheurs accumulés. Et l\'envie profonde de continuer à écrire cette histoire avec toi — page après page.',
      emoji: '❤️',
      side: 'left',
    },
  ];

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    // Animate each event card on scroll
    const eventEls = document.querySelectorAll('.timeline-event');

    eventEls.forEach((el, i) => {
      const isLeft = el.classList.contains('from-left');
      gsap.fromTo(
        el,
        {
          opacity: 0,
          x: isLeft ? -60 : 60,
          y: 20,
        },
        {
          opacity: 1,
          x: 0,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
          delay: i * 0.05,
        }
      );
    });

    // Section header animation
    gsap.from('.section-header', {
      opacity: 0,
      y: 40,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.section-header',
        start: 'top 80%',
      },
    });
  }
}
