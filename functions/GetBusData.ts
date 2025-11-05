/**
 * Get BusDatas
 * @returns alls BusDatas
 */
export default async () => {
  let response = await fetch("https://data.lillemetropole.fr/data/ogcapi/collections/ilevia:prochains_passages/items?f=json&limit=-1", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  let data = await response.json();

  let stops = Array.from(new Set(data.records.map((r: any) => r.nom_station))).sort();
  return {
    allStops: stops,
    AllDeparturesData: data.records,
  };
};