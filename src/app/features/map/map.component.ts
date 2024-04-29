import { AsyncPipe, NgFor } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild, inject } from '@angular/core';
import { GoogleMap, GoogleMapsModule, MapInfoWindow, MapMarker } from '@angular/google-maps';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { MarkerClusterer } from '@googlemaps/markerclusterer';
import { Store } from '@ngxs/store';
import { delay, of } from 'rxjs';
import { IsNumberPipe } from '../../shared/pipes/is-number.pipe';
import locationItems from '../../shared/services/data/locations_large_set.json';
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
export class MapComponent implements OnInit {
  @ViewChild('drawer') drawer!: MatDrawer;
  @ViewChild(MapInfoWindow) infoWindow!: MapInfoWindow;
  @ViewChild('map', { static: true }) map!: GoogleMap;

  activeLocationIndex!: number | null;
  locations: any[] = [];
  defaultMarkerIcon!: string;
  activeMarkerIcon!: string;
  clusterImagePath!: string;
  mapZoom!: number;
  mapOptions!: google.maps.MapOptions;
  clusterMarkers: any;

  private readonly store = inject(Store);
  private readonly mapService = inject(MapService);
  private readonly cdr = inject(ChangeDetectorRef);
  private labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  async ngOnInit() {
    const { AdvancedMarkerElement, PinElement } = (await google.maps.importLibrary('marker')) as google.maps.MarkerLibrary;

    this.setupMapOptions();
    // this.store.dispatch(new GetAllLocations());
    this.clusterMarkers = of(locationItems)
      .pipe(delay(1000))
      .subscribe((locations) => {
        const markers = locations.map((position, i) => {
          const label = this.labels[i % this.labels.length];
          const pinGlyph = new PinElement({
            glyph: label,
            glyphColor: 'white',
          });
          const marker = new AdvancedMarkerElement({
            position: { lat: position.coordinates[0], lng: position.coordinates[1] },
            content: pinGlyph.element,
          });

          return marker;
        });

        new MarkerClusterer({ markers, map: this.map.googleMap });
      });
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
