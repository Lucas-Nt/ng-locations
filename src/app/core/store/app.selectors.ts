import { Selector } from '@ngxs/store';
import { AppState, AppStateModel } from './app.state';

export class AppSelectors {
  @Selector([AppState])
  static locations(state: AppStateModel) {
    return state.locations;
  }
}
