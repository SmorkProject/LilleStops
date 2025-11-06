import { Appearance } from 'react-native';
import * as Localization from 'expo-localization';
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * setup settings in the firsh launch
 */
export default async () => {
  let theme = await AsyncStorage.getItem('theme');

  if (!theme) {
    let systemTheme     = Appearance.getColorScheme();
    let defaultTheme    = systemTheme === 'dark' ? 'black' : 'white';

    let getInfosRegion  = Localization.getLocales();

    await AsyncStorage.setItem("theme", defaultTheme);
    await AsyncStorage.setItem("lang", getInfosRegion[0].languageTag.split("-")[0]);
    await AsyncStorage.setItem("trajets", JSON.stringify([{
      id: "blue",
      name: "Nouveau trajet",
      emoji: "🔵",
      color: "#3b82f6"
    }]));
    await AsyncStorage.setItem("trajetsDatas", "{}");
  };
};