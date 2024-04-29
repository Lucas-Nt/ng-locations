import { AsyncPipe, NgFor } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, ViewChild, inject } from '@angular/core';
import { GoogleMapsModule, MapInfoWindow, MapMarker } from '@angular/google-maps';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { GetAllLocations } from '../../core/store/app.actions';
import { AppSelectors } from '../../core/store/app.selectors';
import { LocationViewModel } from '../../shared/models/location.model';
import { MapSideContentComponent } from './map-side-content/map-side-content.component';
import { MapService } from './map.service';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [GoogleMapsModule, MatSidenavModule, AsyncPipe, NgFor, MapSideContentComponent],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss',
  providers: [MapService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapComponent implements OnInit {
  @ViewChild('drawer') drawer!: MatDrawer;
  @ViewChild(MapInfoWindow) infoWindow!: MapInfoWindow;

  activeLocationIndex!: number | null;
  locations$!: Observable<LocationViewModel[]>;
  defaultMarkerIcon!: string;
  activeMarkerIcon!: string;
  clusterImagePath!: string;
  mapZoom!: number;
  mapOptions!: google.maps.MapOptions;

  private readonly store = inject(Store);
  private readonly mapService = inject(MapService);

  ngOnInit(): void {
    this.setupMapOptions();
    this.store.dispatch(new GetAllLocations());
    this.locations$ = this.store.select(AppSelectors.locations);
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
