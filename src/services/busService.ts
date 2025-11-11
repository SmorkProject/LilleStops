import { BusDataResponse } from '../types';

const BUS_API_URL = 'https://data.lillemetropole.fr/data/ogcapi/collections/ilevia:prochains_passages/items?f=json&limit=-1';

/**
 * Fetches bus and tram data from the API
 * @returns Promise with all bus stops and departure data
 */
export const fetchBusData = async (): Promise<BusDataResponse> => {
  try {
    const response = await fetch(BUS_API_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    const stops = Array.from(
      new Set(data.records.map((r: any) => r.nom_station))
    ).sort();

    return {
      allStops: stops as string[],
      AllDeparturesData: data.records,
    };
  } catch (error) {
    console.error('Error fetching bus data:', error);
    throw error;
  }
};
