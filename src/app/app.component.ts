import { Component } from '@angular/core';
import { HeroComponent } from './components/hero/hero.component';
import { TimelineComponent } from './components/timeline/timeline.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { LoveLetterComponent } from './components/love-letter/love-letter.component';
import { PromisesComponent } from './components/promises/promises.component';
import { BibleVersesComponent } from './components/bible-verses/bible-verses.component';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HeroComponent,
    TimelineComponent,
    GalleryComponent,
    LoveLetterComponent,
    PromisesComponent,
    BibleVersesComponent,
    FooterComponent,
  ],
  template: `
    <main>
      <app-hero></app-hero>
      <app-timeline></app-timeline>
      <app-gallery></app-gallery>
      <app-love-letter></app-love-letter>
      <app-promises></app-promises>
      <app-bible-verses></app-bible-verses>
      <app-footer></app-footer>
    </main>
  `,
  styles: [`
    main {
      background-color: #0d0a0b;
      min-height: 100vh;
      overflow-x: hidden;
    }
  `]
})
export class AppComponent {}
