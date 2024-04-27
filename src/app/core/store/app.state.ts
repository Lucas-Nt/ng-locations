import { Injectable } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { Action, State, StateContext } from '@ngxs/store';
import { Observable, iif, map, of, tap } from 'rxjs';
import { LocationsResource } from './../../shared/services/locations.resource';
import { GetAllLocations, SetLocationListOptions } from './app.actions';

export interface ListOptionsModel {
  currentPage: number;
  pageSize: number;
  sortOptions: Sort;
}
export interface AppStateModel {
  locations: any[];
  listOptions: ListOptionsModel;
}

@State<AppStateModel>({
  name: 'AppState',
  defaults: {
    locations: [],
    listOptions: {
      currentPage: 0,
      pageSize: 0,
      sortOptions: {
        active: '',
        direction: '',
      },
    },
  },
})
@Injectable()
export class AppState {
  constructor(private readonly locationsResource: LocationsResource) {}

  // TODO: add types
  @Action(GetAllLocations)
  getAllActions(ctx: StateContext<AppStateModel>) {
    const state = ctx.getState();
    const hasLocationsFromState = state.locations.length > 0;
    const locationsFromService = this.locationsResource
      .getLocations()
      .pipe(map((response) => response.map(this.toLocationViewModel)));

    // TODO: fix type
    const dataFormServiceOrState$ = iif(
      () => hasLocationsFromState,
      of(state.locations),
      locationsFromService
    ) as Observable<any[]>;

    return dataFormServiceOrState$.pipe(
      tap((response) => {
        ctx.patchState({
          ...state,
          locations: response,
        });
      })
    );
  }

  @Action(SetLocationListOptions)
  setLocationListOptions(
    ctx: StateContext<AppStateModel>,
    action: { options: ListOptionsModel }
  ) {
    const state = ctx.getState();
    const { currentPage, pageSize, sortOptions } = action.options;

    ctx.patchState({
      ...state,
      listOptions: {
        currentPage,
        pageSize,
        sortOptions,
      },
    });
  }

  private toLocationViewModel(location: any) {
    return {
      name: location.name,
      address: location.address,
      lat: location.coordinates[0],
      lng: location.coordinates[1],
      creationDate: location.creationDate,
    };
  }
}
