import { AsyncPipe, NgFor } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild, inject } from '@angular/core';
import { GoogleMapsModule, MapInfoWindow, MapMarker } from '@angular/google-maps';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { Store } from '@ngxs/store';
import { BehaviorSubject, Observable, Subject, bufferCount, concatMap, delay, from, of, scan, switchMap, takeUntil } from 'rxjs';
import { GetAllLocations } from '../../core/store/app.actions';
import { AppSelectors } from '../../core/store/app.selectors';
import { IsNumberPipe } from '../../shared/pipes/is-number.pipe';
import { MapSideContentComponent } from './map-side-content/map-side-content.component';
import { MapService } from './map.service';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [GoogleMapsModule, MatSidenavModule, AsyncPipe, IsNumberPipe, NgFor, MapSideContentComponent],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss',
  providers: [MapService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapComponent implements OnInit, OnDestroy {
  @ViewChild('drawer') drawer!: MatDrawer;
  @ViewChild(MapInfoWindow) infoWindow!: MapInfoWindow;

  activeLocationIndex!: number | null;
  locations$!: Observable<any[]>;
  defaultMarkerIcon!: string;
  activeMarkerIcon!: string;
  clusterImagePath!: string;
  mapZoom!: number;
  mapOptions!: google.maps.MapOptions;
  markers: any[] = [];
  markers$ = new BehaviorSubject<any[]>([]);

  private destroy$ = new Subject<void>();

  private readonly store = inject(Store);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly mapService = inject(MapService);

  ngOnInit(): void {
    this.setupMapOptions();
    this.store.dispatch(new GetAllLocations());
    this.store
      .select(AppSelectors.locations)
      .pipe(
        switchMap((values) => {
          return from([...values]).pipe(bufferCount(500));
        }),
        concatMap((chunk) => of(chunk).pipe(delay(1500))),
        scan((acc, value: any) => acc.concat(value), []),
        takeUntil(this.destroy$)
      )
      .subscribe((locations) => {
        console.log(locations);
        this.markers$.next(locations);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  markerClicked(marker: MapMarker, index: number) {
    this.activeLocationIndex = index;
    this.drawer.open();
    this.infoWindow?.open(marker);
  }

  closeDrawerAndTooltip() {
    this.activeLocationIndex = null;
    this.drawer.close();
    this.infoWindow?.close();
  }

  private setupMapOptions() {
    const { mapZoom, defaultMarkerIcon, activeMarkerIcon, clusterImagePath, mapOptions } = this.mapService;

    this.mapZoom = mapZoom;
    this.mapOptions = mapOptions;

    this.defaultMarkerIcon = defaultMarkerIcon;
    this.activeMarkerIcon = activeMarkerIcon;
    this.clusterImagePath = clusterImagePath;
  }
}
