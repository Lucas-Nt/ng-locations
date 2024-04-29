import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { LocationModel } from '../models/location.model';
// import locations from './data/locations_small_set.json';
import locations from './data/locations_large_set.json';

@Injectable({
  providedIn: 'root',
})
export class LocationsResource {
  getLocations(): Observable<LocationModel[]> {
    return of(locations) as Observable<LocationModel[]>;
  }
}
