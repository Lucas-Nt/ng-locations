export interface LocationModel {
  name: string;
  address: string;
  coordinates: [number, number];
  creationDate: string;
}

export interface LocationViewModel {
  id: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
  creationDate: Date | string;
}
