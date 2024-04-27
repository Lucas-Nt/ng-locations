import { AsyncPipe, NgFor } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { GoogleMapsModule, MapMarker } from '@angular/google-maps';
import { Observable, map } from 'rxjs';
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
  imports: [GoogleMapsModule, AsyncPipe, NgFor],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapComponent implements OnInit {
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

  // TODO: add types
  locations$!: Observable<any[]>;
  activeLocationIndex: number | null = null;

  readonly defaultMarkerIcon =
    'http://maps.google.com/mapfiles/ms/icons/orange-dot.png';
  readonly activeMarkerIcon =
    'http://maps.google.com/mapfiles/ms/icons/green-dot.png';
  readonly locationsResource = inject(LocationsResource);

  ngOnInit(): void {
    this.locations$ = this.locationsResource
      .getLocations()
      .pipe(map((locations) => locations.map(this.toLocationViewModel)));
  }

  markerClicked(marker: MapMarker, index: number) {
    this.activeLocationIndex = index;
  }

  // TODO: move this to a mapper
  private toLocationViewModel(location: any) {
    return {
      name: location.name,
      position: {
        lat: location.coordinates[0],
        lng: location.coordinates[1],
      },
    };
  }
}
