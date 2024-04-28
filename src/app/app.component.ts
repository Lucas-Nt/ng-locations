import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { TopToolbarComponent } from './core/top-toolbar/top-toolbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TopToolbarComponent, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'LocationXplorer';
  activeLanguage!: string;
  availableLanguages!: string[];

  private readonly translocoService = inject(TranslocoService);

  ngOnInit(): void {
    this.activeLanguage = this.translocoService.getActiveLang();
    this.availableLanguages =
      this.translocoService.getAvailableLangs() as string[];
  }

  setActiveLanguage(lang: string) {
    this.translocoService.setActiveLang(lang);
  }
}
