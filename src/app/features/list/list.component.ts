import { AsyncPipe, DatePipe, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSortModule, Sort } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { TranslocoModule } from '@ngneat/transloco';
import { Store } from '@ngxs/store';
import { Observable, filter, take, tap } from 'rxjs';
import {
  CreateLocation,
  GetAllLocations,
  SetLocationListOptions,
  UpdateLocation,
} from '../../core/store/app.actions';
import { AppSelectors } from '../../core/store/app.selectors';
import { LocationViewModel } from '../../shared/models/location.model';
import { FormatValuePipe } from '../../shared/pipes/format-value.pipe';
import { LocationPopupFormComponent } from './location-popup-form/location-popup-form.component';

@Component({
  selector: 'app-list',
  standalone: true,
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
  imports: [
    AsyncPipe,
    NgIf,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule,
    MatSortModule,
    DatePipe,
    FormatValuePipe,
    TranslocoModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent implements OnInit {
  sortOptions!: Sort;
  currentPage: number = 0;
  pageSize = 10;
  displayedColumns!: string[];
  allLocations$!: Observable<LocationViewModel[]>;
  locationsBasedOnOptions$!: Observable<LocationViewModel[]>;

  readonly pageSizes = [10, 25, 50, 100];
  private readonly store = inject(Store);
  private readonly dialog = inject(MatDialog);

  ngOnInit(): void {
    this.store.dispatch(new GetAllLocations());
    this.allLocations$ = this.store.select(AppSelectors.locations);
    this.locationsBasedOnOptions$ = this.store.select(
      AppSelectors.locationsBasedOnOptions
    );
    this.setDisplayedColumns();
    this.setLocationListOptions();
  }

  pageChanged(event: PageEvent): void {
    const { pageSize, pageIndex } = event;
    this.currentPage = pageIndex;
    this.pageSize = pageSize;
    this.setLocationListOptions();
  }

  sortingChanged(sortOptions: Sort) {
    this.sortOptions = sortOptions;
    this.setLocationListOptions();
  }

  openDialog(location?: LocationViewModel) {
    const dialogRef = this.dialog.open(LocationPopupFormComponent, {
      data: location ?? {},
      width: '40%',
    });

    dialogRef
      .afterClosed()
      .pipe(
        take(1),
        filter(Boolean),
        tap((data) => {
          if (data.id) {
            this.store.dispatch(new UpdateLocation(data));
          } else {
            this.store.dispatch(new CreateLocation(data));
          }
        })
      )
      .subscribe();
  }

  private setLocationListOptions() {
    this.store.dispatch(
      new SetLocationListOptions({
        currentPage: this.currentPage,
        pageSize: this.pageSize,
        sortOptions: this.sortOptions,
      })
    );
  }

  private setDisplayedColumns() {
    this.displayedColumns = [
      'name',
      'address',
      'lat',
      'lng',
      'creationDate',
      'actions',
    ];
  }
}
