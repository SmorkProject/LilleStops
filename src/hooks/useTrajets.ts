import { useState, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TrajetInfo, TrajetsDataMap, TrajetData, Language } from '../types';
import { TRAJET_PRESETS, COLOR_NAMES, TRANSLATIONS } from '../constants';

/**
 * Hook to manage trajets (user journeys)
 */
export const useTrajets = (lang: Language) => {
  const [trajets, setTrajets] = useState<TrajetInfo[]>([]);
  const [trajetsDatas, setTrajetsDatas] = useState<TrajetsDataMap>({});
  
  const translate = TRANSLATIONS[lang];

  /**
   * Load trajets from AsyncStorage
   */
  const loadTrajets = useCallback(async () => {
    try {
      const storedTrajets = await AsyncStorage.getItem('trajets');
      const storedTrajetsDatas = await AsyncStorage.getItem('trajetsDatas');

      if (storedTrajets) {
        setTrajets(JSON.parse(storedTrajets));
      }

      if (storedTrajetsDatas) {
        setTrajetsDatas(JSON.parse(storedTrajetsDatas));
      }
    } catch (error) {
      console.error('Error loading trajets:', error);
    }
  }, []);

  /**
   * Add a new trajet
   */
  const addTrajet = useCallback(async (): Promise<void> => {
    setTrajets((prev) => {
      if (prev.length >= 6) return prev;

      let newTrajet: TrajetInfo | undefined;

      for (const preset of TRAJET_PRESETS) {
        const colorExists = prev.some((trajet) => trajet.color === preset.color);
        if (!colorExists) {
          newTrajet = {
            id: COLOR_NAMES[preset.color],
            name: translate.settings.trajets.new,
            ...preset,
          };
          break;
        }
      }

      if (!newTrajet) return prev;

      const updatedTrajets = [...prev, newTrajet];
      AsyncStorage.setItem('trajets', JSON.stringify(updatedTrajets));

      return updatedTrajets;
    });
  }, [translate]);

  /**
   * Delete a trajet
   */
  const deleteTrajet = useCallback(async (trajetId: string) => {
    setTrajets((prevTrajets) => {
      if (prevTrajets.length <= 1) return prevTrajets;

      const newTrajets = prevTrajets.filter((t) => t.id !== trajetId);
      AsyncStorage.setItem('trajets', JSON.stringify(newTrajets));

      return newTrajets;
    });
  }, []);

  /**
   * Update trajet name
   */
  const updateTrajetName = useCallback(
    async (trajetId: string, newName: string) => {
      setTrajets((prev) => {
        if (newName.length >= 16) return prev;

        const newTrajets = prev.map((t) =>
          t.id === trajetId ? { ...t, name: newName } : t
        );

        AsyncStorage.setItem('trajets', JSON.stringify(newTrajets));

        return newTrajets;
      });
    },
    []
  );

  /**
   * Delete a specific item from a trajet's data
   */
  const deleteTrajetData = useCallback(
    async (index: number, trajetId: string) => {
      const datasTrajets = trajetsDatas[trajetId];

      if (index >= 0 && index < datasTrajets.length) {
        datasTrajets.splice(index, 1);
        const updatedData = { ...trajetsDatas };
        await AsyncStorage.setItem('trajetsDatas', JSON.stringify(updatedData));
        setTrajetsDatas(updatedData);
      }
    },
    [trajetsDatas]
  );

  /**
   * Add data to a trajet
   */
  const addTrajetData = useCallback(
    async (trajetId: string, data: TrajetData) => {
      const updatedTrajetsDatas = { ...trajetsDatas };

      if (trajetId in updatedTrajetsDatas) {
        updatedTrajetsDatas[trajetId].push(data);
      } else {
        updatedTrajetsDatas[trajetId] = [data];
      }

      await AsyncStorage.setItem('trajetsDatas', JSON.stringify(updatedTrajetsDatas));
      setTrajetsDatas(updatedTrajetsDatas);
    },
    [trajetsDatas]
  );

  return {
    trajets,
    trajetsDatas,
    loadTrajets,
    addTrajet,
    deleteTrajet,
    updateTrajetName,
    deleteTrajetData,
    addTrajetData,
    setTrajets,
    setTrajetsDatas,
  };
};
