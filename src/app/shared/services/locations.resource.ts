import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import locations from './locations_loukas.json';

@Injectable({
  providedIn: 'root',
})
export class LocationsResource {
  // TODO: add types
  getLocations() {
    return of(locations);
  }
}