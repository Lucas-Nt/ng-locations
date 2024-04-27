import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { TranslocoModule } from '@ngneat/transloco';

@Component({
  selector: 'app-top-toolbar',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    RouterModule,
    MatIcon,
    MatMenuModule,
    TranslocoModule,
  ],
  templateUrl: './top-toolbar.component.html',
  styleUrl: './top-toolbar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopToolbarComponent {
  @Input() availableLanguages!: string[];
  @Input() activeLanguage!: string;

  @Output() languageChanged = new EventEmitter<string>();

  languageSelected(lang: string) {
    this.languageChanged.emit(lang);
  }
}
