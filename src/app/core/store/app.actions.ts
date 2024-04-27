import { ListOptionsModel } from './app.state';

export class GetAllLocations {
  static readonly type = '[App] Get All Locations';
}

export class SetLocationListOptions {
  static readonly type = '[App] Set Options For List Locations';
  constructor(public options: ListOptionsModel) {}
}
