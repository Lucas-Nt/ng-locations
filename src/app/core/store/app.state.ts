import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { map, tap } from 'rxjs';
import { LocationsResource } from './../../shared/services/locations.resource';
import { GetAllLocations } from './app.actions';

export interface AppStateModel {
  locations: any[];
  activeLocationIndex: number | null;
}

@State<AppStateModel>({
  name: 'AppState',
  defaults: {
    locations: [],
    activeLocationIndex: null,
  },
})
@Injectable()
export class AppState {
  constructor(private readonly locationsResource: LocationsResource) {}

  // TODO: add types
  @Action(GetAllLocations)
  getAllActions(ctx: StateContext<AppStateModel>) {
    return this.locationsResource.getLocations().pipe(
      map((response) => response.map(this.toLocationViewModel)),
      tap((response) => {
        const state = ctx.getState();
        ctx.patchState({
          ...state,
          locations: [...state.locations, ...response],
        });
      })
    );
  }

  // TODO: move this to a mapper
  private toLocationViewModel(location: any) {
    return {
      name: location.name,
      address: location.address,
      position: {
        lat: location.coordinates[0],
        lng: location.coordinates[1],
      },
      creationDate: location.creationDate,
    };
  }
}
