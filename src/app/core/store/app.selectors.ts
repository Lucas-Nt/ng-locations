import { Sort } from '@angular/material/sort';
import { Selector } from '@ngxs/store';
import { LocationViewModel } from '../../shared/models/location.model';
import { compareFields } from '../../shared/utilities';
import { AppState, AppStateModel } from './app.state';

export class AppSelectors {
  @Selector([AppState])
  static locations(state: AppStateModel): LocationViewModel[] {
    return state.locations;
  }

  @Selector([AppState])
  static locationsBasedOnOptions(state: AppStateModel): LocationViewModel[] {
    const { currentPage, pageSize, sortOptions } = state.listOptions;
    const startIndex = currentPage * pageSize;
    const endIndex = startIndex + pageSize;
    const currentLocations = this.locations(state);
    const locations = sortOptions ? getSortedLocations(currentLocations, sortOptions) : currentLocations;

    return locations.slice(startIndex, endIndex);
  }
}

/**
 * Since the is no back-end to sort the list of locations, this function
 * was created to handle this functionality based on sort options.
 */
function getSortedLocations(locations: LocationViewModel[], sortOptions: Sort): LocationViewModel[] {
  const locationsToSort = [...locations];
  const { active, direction } = sortOptions;
  const propertyToSort = active as keyof LocationViewModel;

  if (direction === 'desc') {
    locationsToSort.sort((a, b) => compareFields(a[propertyToSort], b[propertyToSort])).reverse();
  } else {
    locationsToSort.sort((a, b) => compareFields(a[propertyToSort], b[propertyToSort]));
  }

  return locationsToSort;
}
