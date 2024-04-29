import { Injectable } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { Action, State, StateContext } from '@ngxs/store';
import { iif, map, of, tap } from 'rxjs';
import { LocationViewModel } from '../../shared/models/location.model';
import { LocationMapper } from '../../shared/services/location.mapper';
import { LocationsResource } from './../../shared/services/locations.resource';
import { CreateLocation, GetAllLocations, SetLocationListOptions, UpdateLocation } from './app.actions';

export interface ListOptionsModel {
  currentPage: number;
  pageSize: number;
  sortOptions: Sort;
}
export interface AppStateModel {
  locations: LocationViewModel[];
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

  @Action(GetAllLocations)
  getAllActions(ctx: StateContext<AppStateModel>) {
    const state = ctx.getState();
    const hasLocationsFromState = state.locations.length > 0;
    const locationsFromService = this.locationsResource.getLocations().pipe(map((response) => response.map(LocationMapper.toViewModel)));
    const dataFormServiceOrState$ = iif(() => hasLocationsFromState, of(state.locations), locationsFromService);

    return dataFormServiceOrState$.pipe(
      tap((data) => {
        ctx.patchState({
          ...state,
          locations: data,
        });
      })
    );
  }

  @Action(SetLocationListOptions)
  setLocationListOptions(ctx: StateContext<AppStateModel>, action: { options: ListOptionsModel }) {
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

  @Action(CreateLocation)
  createLocation(ctx: StateContext<AppStateModel>, action: { location: LocationViewModel }) {
    const state = ctx.getState();
    const newLocation = {
      ...action.location,
      creationDate: new Date(),
      id: crypto.randomUUID(),
    };

    ctx.patchState({
      ...state,
      locations: [...state.locations, newLocation],
    });
  }

  @Action(UpdateLocation)
  updateLocation(ctx: StateContext<AppStateModel>, action: { location: LocationViewModel }) {
    const state = ctx.getState();
    const updatedLocation = {
      ...action.location,
    };

    const updatedLocations = state.locations.map((location) => (location.id === updatedLocation.id ? updatedLocation : location));

    ctx.patchState({
      ...state,
      locations: updatedLocations,
    });
  }
}
