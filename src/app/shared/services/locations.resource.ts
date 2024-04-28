import { Injectable } from '@angular/core';
import { of } from 'rxjs';

/* These two include smaller sets of locations */
// import locations from './locations_loukas.json';
// import locations from './locations_.json';

/* This includes set of 15000 locations */
import locations from './locations_extended.json';

@Injectable({
  providedIn: 'root',
})
export class LocationsResource {
  // TODO: add types
  getLocations() {
    return of(locations);
  }
}
