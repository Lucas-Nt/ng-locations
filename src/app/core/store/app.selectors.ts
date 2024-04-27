import { Sort } from '@angular/material/sort';
import { Selector } from '@ngxs/store';
import { AppState, AppStateModel } from './app.state';

export class AppSelectors {
  @Selector([AppState])
  static locations(state: AppStateModel) {
    return state.locations;
  }

  @Selector([AppState])
  static locationsBasedOnOptions(state: AppStateModel) {
    const { currentPage, pageSize, sortOptions } = state.listOptions;
    const startIndex = currentPage * pageSize;
    const endIndex = startIndex + pageSize;
    const locations = sortOptions
      ? getSortedLocations(state.locations, sortOptions)
      : state.locations;

    return locations.slice(startIndex, endIndex);
  }
}

/**
 * Since the is no back-end service to sort the list of locations, this function
 * was created in order to sort the locations based on the sort options.
 */
function getSortedLocations(locations: any[], sortOptions: Sort) {
  const locationsToSort = [...locations];
  const { active, direction } = sortOptions;

  if (direction === 'desc') {
    locationsToSort
      .sort((a, b) => compareFields(a[active], b[active]))
      .reverse();
  } else {
    locationsToSort.sort((a, b) => compareFields(a[active], b[active]));
  }

  return locationsToSort;
}

function compareFields(a: string, b: string): number {
  if (a < b) {
    return -1;
  }
  if (a > b) {
    return 1;
  }
  return 0;
}
