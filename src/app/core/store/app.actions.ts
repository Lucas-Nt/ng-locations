import { ListOptionsModel } from './app.state';

export class GetAllLocations {
  static readonly type = '[App] Get All Locations';
}

export class SetLocationListOptions {
  static readonly type = '[App] Set Options For List Locations';
  constructor(public options: ListOptionsModel) {}
}

export class UpdateLocation {
  static readonly type = '[App] Update Location';
  constructor(public location: any) {}
}

export class CreateLocation {
  static readonly type = '[App] Create Location';
  constructor(public location: any) {}
}
