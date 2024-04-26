import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TopToolbarComponent } from './core/top-toolbar/top-toolbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TopToolbarComponent, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'ng-locations';
}
