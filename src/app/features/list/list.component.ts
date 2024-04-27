import { AsyncPipe, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSortModule, Sort } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import {
  GetAllLocations,
  SetLocationListOptions,
} from '../../core/store/app.actions';
import { AppSelectors } from '../../core/store/app.selectors';

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
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent implements OnInit {
  sortOptions!: Sort;
  currentPage: number = 0;
  pageSize = 10;
  pageSizes = [10, 25, 50, 100];
  displayedColumns: string[] = [
    'name',
    'address',
    'lat',
    'lng',
    'creationDate',
    'actions',
  ];

  // TODO: add types
  allLocations$!: Observable<any[]>;
  locationsBasedOnOptions$!: Observable<any[]>;

  private readonly store = inject(Store);

  ngOnInit(): void {
    this.store.dispatch(new GetAllLocations());
    this.allLocations$ = this.store.select(AppSelectors.locations);
    this.locationsBasedOnOptions$ = this.store.select(
      AppSelectors.locationsBasedOnOptions
    );
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

  editLocation(location: any) {
    console.log('Edit location', location);
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
}
