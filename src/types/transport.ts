export interface VLilleStation {
  id: string;
  name: string;
  city: string;
  status: string;
  bikes: number;
  docks: number;
}

export interface BusDeparture {
  station: string;
  line: string;
  direction: string;
  time: Date;
  id: string;
}

export interface BusDataResponse {
  allStops: string[];
  AllDeparturesData: any[];
}
