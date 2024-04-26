import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-top-toolbar',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule],
  templateUrl: './top-toolbar.component.html',
  styleUrl: './top-toolbar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopToolbarComponent {}
