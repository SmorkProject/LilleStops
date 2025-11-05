import { registerRootComponent } from 'expo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import App from './App';
import { Appearance } from 'react-native';

async function initSettings() {
  let theme = await AsyncStorage.getItem('theme');

  if (!theme) {
    let systemTheme   = Appearance.getColorScheme();
    let defaultTheme  = systemTheme === 'dark' ? 'black' : 'white';

    await AsyncStorage.setItem("theme", defaultTheme);
    await AsyncStorage.setItem("lang", "fr");
    await AsyncStorage.setItem("trajets", JSON.stringify([{
      id: "blue",
      name: "Nouveau trajet",
      emoji: "🔵",
      color: "#3b82f6"
    }]));
    await AsyncStorage.setItem("trajetsDatas", "{}");
  };
};

initSettings();
registerRootComponent(App);