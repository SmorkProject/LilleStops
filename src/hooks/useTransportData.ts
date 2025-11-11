import { useState, useEffect } from 'react';
import { fetchBusData, fetchVlilleData } from '../services';
import { VLilleStation } from '../types';

/**
 * Hook to fetch and manage transport data (bus and V'Lille)
 */
export const useTransportData = () => {
  const [allBusStop, setAllBusStop] = useState<string[]>([]);
  const [allDeparturesData, setAllDeparturesData] = useState<any[]>([]);
  const [vlilleStations, setVlilleStations] = useState<VLilleStation[]>([]);
  const [isVlilleLoading, setIsVlilleLoading] = useState<boolean>(true);
  const [isBusLoading, setIsBusLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadTransportData = async () => {
      try {
        // Fetch bus data
        const busData = await fetchBusData();
        setAllBusStop(busData.allStops);
        setAllDeparturesData(busData.AllDeparturesData);
        setIsBusLoading(false);

        // Fetch V'Lille data
        const vlilleData = await fetchVlilleData();
        setVlilleStations(vlilleData);
        setIsVlilleLoading(false);
      } catch (err) {
        setError(err as Error);
        setIsBusLoading(false);
        setIsVlilleLoading(false);
      }
    };

    loadTransportData();
  }, []);

  return {
    allBusStop,
    allDeparturesData,
    vlilleStations,
    isVlilleLoading,
    isBusLoading,
    error,
  };
};
