import { VLilleStation } from "./types";

/**
 * Get Vlille Datas
 * @returns all info of Vlille
 */
export default async () => {
  let response = await fetch("https://data.lillemetropole.fr/data/ogcapi/collections/ilevia:vlille_temps_reel/items?f=json&limit=-1", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  let data = await response.json();

  let stations: VLilleStation[] = data.records
    .filter((r: any) => r.etat === 'EN SERVICE')
    .map((r: any): VLilleStation => ({
      id: r["@id"],
      name: r.nom,
      city: r.commune,
      status: r.etat,
      bikes: r.nb_velos_dispo,
      docks: r.nb_places_dispo,
    }));

  return stations;
};