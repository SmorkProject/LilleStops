import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Initialize default settings in AsyncStorage if they don't exist
 */
export const initSettings = async (): Promise<void> => {
  try {
    const theme = await AsyncStorage.getItem('theme');
    const lang = await AsyncStorage.getItem('lang');
    const trajets = await AsyncStorage.getItem('trajets');
    const trajetsDatas = await AsyncStorage.getItem('trajetsDatas');

    if (!theme) {
      await AsyncStorage.setItem('theme', 'white');
    }

    if (!lang) {
      await AsyncStorage.setItem('lang', 'fr');
    }

    if (!trajets) {
      await AsyncStorage.setItem(
        'trajets',
        JSON.stringify([
          {
            id: 'red',
            name: 'Domicile ⇄ Travail',
            emoji: '🔴',
            color: '#e2001a',
          },
        ])
      );
    }

    if (!trajetsDatas) {
      await AsyncStorage.setItem('trajetsDatas', JSON.stringify({}));
    }
  } catch (error) {
    console.error('Error initializing settings:', error);
  }
};
