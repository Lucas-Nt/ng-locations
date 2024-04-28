import { AsyncPipe, KeyValuePipe, NgFor, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import {
  GoogleMapsModule,
  MapInfoWindow,
  MapMarker,
} from '@angular/google-maps';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { GetAllLocations } from '../../core/store/app.actions';
import { AppSelectors } from '../../core/store/app.selectors';
import { FormatValuePipe } from '../../shared/pipes/format-value.pipe';
import { LocationsResource } from '../../shared/services/locations.resource';

// TODO: move constants to service
/* Cyprus coordinates */
const CYPRUS_COORDINATES = {
  lat: 35.1264,
  lng: 33.4299,
};
const DEFAULT_MAP_CENTER = { ...CYPRUS_COORDINATES };

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [
    GoogleMapsModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    AsyncPipe,
    NgFor,
    NgIf,
    KeyValuePipe,
    FormatValuePipe,
  ],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapComponent implements OnInit {
  @ViewChild('drawer') drawer!: MatDrawer;
  @ViewChild(MapInfoWindow) infoWindow!: MapInfoWindow;

  readonly clusterImagePath =
    'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m';
  // TODO: move options to service
  readonly mapOptions: google.maps.MapOptions = {
    center: { ...DEFAULT_MAP_CENTER },
    maxZoom: 15,
    minZoom: 3,
    styles: [
      {
        elementType: 'geometry',
        stylers: [
          {
            color: '#f5f5f5',
          },
        ],
      },
      {
        elementType: 'labels.icon',
        stylers: [
          {
            visibility: 'off',
          },
        ],
      },
      {
        elementType: 'labels.text.fill',
        stylers: [
          {
            color: '#616161',
          },
        ],
      },
      {
        elementType: 'labels.text.stroke',
        stylers: [
          {
            color: '#f5f5f5',
          },
        ],
      },
      {
        featureType: 'administrative.land_parcel',
        elementType: 'labels.text.fill',
        stylers: [
          {
            color: '#bdbdbd',
          },
        ],
      },
      {
        featureType: 'poi',
        elementType: 'geometry',
        stylers: [
          {
            color: '#eeeeee',
          },
        ],
      },
      {
        featureType: 'poi',
        elementType: 'labels.text.fill',
        stylers: [
          {
            color: '#757575',
          },
        ],
      },
      {
        featureType: 'poi.park',
        elementType: 'geometry',
        stylers: [
          {
            color: '#e5e5e5',
          },
        ],
      },
      {
        featureType: 'poi.park',
        elementType: 'labels.text.fill',
        stylers: [
          {
            color: '#9e9e9e',
          },
        ],
      },
      {
        featureType: 'road',
        elementType: 'geometry',
        stylers: [
          {
            color: '#ffffff',
          },
        ],
      },
      {
        featureType: 'road.arterial',
        elementType: 'labels.text.fill',
        stylers: [
          {
            color: '#757575',
          },
        ],
      },
      {
        featureType: 'road.highway',
        elementType: 'geometry',
        stylers: [
          {
            color: '#dadada',
          },
        ],
      },
      {
        featureType: 'road.highway',
        elementType: 'labels.text.fill',
        stylers: [
          {
            color: '#616161',
          },
        ],
      },
      {
        featureType: 'road.local',
        elementType: 'labels.text.fill',
        stylers: [
          {
            color: '#9e9e9e',
          },
        ],
      },
      {
        featureType: 'transit.line',
        elementType: 'geometry',
        stylers: [
          {
            color: '#e5e5e5',
          },
        ],
      },
      {
        featureType: 'transit.station',
        elementType: 'geometry',
        stylers: [
          {
            color: '#eeeeee',
          },
        ],
      },
      {
        featureType: 'water',
        elementType: 'geometry',
        stylers: [
          {
            color: '#c9c9c9',
          },
        ],
      },
      {
        featureType: 'water',
        elementType: 'labels.text.fill',
        stylers: [
          {
            color: '#9e9e9e',
          },
        ],
      },
    ],
  };
  readonly originalOrder = (): number => 0;
  activeLocationIndex!: number | null;
  // TODO: add types
  locations$!: Observable<any[]>;

  readonly defaultMarkerIcon =
    'http://maps.google.com/mapfiles/ms/icons/purple-dot.png';
  readonly activeMarkerIcon =
    'http://maps.google.com/mapfiles/ms/icons/green-dot.png';
  readonly locationsResource = inject(LocationsResource);

  private readonly store = inject(Store);

  ngOnInit(): void {
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
}
