import { DatePipe, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TranslocoModule } from '@ngneat/transloco';
import { LocationViewModel } from '../../../shared/models/location.model';
import { FormatValuePipe } from '../../../shared/pipes/format-value.pipe';

@Component({
  selector: 'app-map-side-content',
  standalone: true,
  imports: [
    MatIconModule,
    NgIf,
    DatePipe,
    MatButtonModule,
    FormatValuePipe,
    TranslocoModule,
  ],
  templateUrl: './map-side-content.component.html',
  styleUrls: ['./map-side-content.component.scss'],
})
export class MapSideContentComponent {
  @Input() location!: LocationViewModel;

  @Output() closeButtonClick = new EventEmitter<void>();
}
