import { VLilleStation } from '../types';

const VLILLE_API_URL = 'https://data.lillemetropole.fr/data/ogcapi/collections/ilevia:vlille_temps_reel/items?f=json&limit=-1';

/**
 * Fetches V'Lille (bike sharing) station data from the API
 * @returns Promise with array of V'Lille stations
 */
export const fetchVlilleData = async (): Promise<VLilleStation[]> => {
  try {
    const response = await fetch(VLILLE_API_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    const stations: VLilleStation[] = data.records
      .filter((r: any) => r.etat === 'EN SERVICE')
      .map((r: any): VLilleStation => ({
        id: r['@id'],
        name: r.nom,
        city: r.commune,
        status: r.etat,
        bikes: r.nb_velos_dispo,
        docks: r.nb_places_dispo,
      }));

    return stations;
  } catch (error) {
    console.error('Error fetching V\'lille data:', error);
    throw error;
  }
};
