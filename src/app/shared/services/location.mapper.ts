import { LocationModel, LocationViewModel } from '../models/location.model';

export class LocationMapper {
  static toViewModel(location: LocationModel): LocationViewModel {
    return {
      id: crypto.randomUUID(),
      name: location?.name,
      address: location?.address,
      lat: location?.coordinates[0],
      lng: location?.coordinates[1],
      creationDate: location?.creationDate,
    };
  }
}
