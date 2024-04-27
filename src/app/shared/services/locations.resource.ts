import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import locations from './locations_.json';

@Injectable({
  providedIn: 'root',
})
export class LocationsResource {
  // TODO: add types
  getLocations() {
    return of(locations);
  }
}
