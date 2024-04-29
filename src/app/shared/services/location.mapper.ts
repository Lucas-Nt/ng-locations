import { LocationModel, LocationViewModel } from '../models/location.model';

export class LocationMapper {
  static toViewModel(location: LocationModel): LocationViewModel {
    return {
      id: crypto.randomUUID(),
      name: location?.name,
      address: location?.address,
      lat: parseFloat(`${location?.coordinates[0]}`),
      lng: parseFloat(`${location?.coordinates[1]}`),
      creationDate: location?.creationDate,
    };
  }
}
