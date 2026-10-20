import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreloaderComponent } from './components/preloader/preloader.component';
import { MusicPlayerComponent } from './components/music-player/music-player.component';
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
    CommonModule,
    PreloaderComponent,
    MusicPlayerComponent,
    HeroComponent,
    TimelineComponent,
    GalleryComponent,
    LoveLetterComponent,
    PromisesComponent,
    BibleVersesComponent,
    FooterComponent,
  ],
  template: `
    <app-preloader (done)="preloaderDone = true"></app-preloader>
    <app-music-player></app-music-player>
    <main [class.visible]="preloaderDone">
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
      background-color: #0c0b10;
      min-height: 100vh;
      overflow-x: hidden;
      opacity: 0;
      transition: opacity 0.8s ease;
    }
    main.visible { opacity: 1; }
  `]
})
export class AppComponent {
  preloaderDone = false;
}
