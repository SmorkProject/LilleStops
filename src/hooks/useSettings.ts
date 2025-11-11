import { useState, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Language, Theme } from '../types';

/**
 * Hook to manage app settings (language and theme)
 */
export const useSettings = () => {
  const [lang, setLang] = useState<Language>('fr');
  const [theme, setTheme] = useState<Theme>('white');

  /**
   * Load settings from AsyncStorage
   */
  const loadSettings = useCallback(async () => {
    try {
      const storedLang = await AsyncStorage.getItem('lang');
      const storedTheme = await AsyncStorage.getItem('theme');

      if (storedLang) {
        setLang(storedLang as Language);
      }

      if (storedTheme) {
        setTheme(storedTheme as Theme);
      }
    } catch (error) {
      console.error('Error loading settings:', error);
    }
  }, []);

  /**
   * Update language
   */
  const updateLang = useCallback(async (newLang: Language) => {
    try {
      await AsyncStorage.setItem('lang', newLang);
      setLang(newLang);
    } catch (error) {
      console.error('Error updating language:', error);
    }
  }, []);

  /**
   * Update theme
   */
  const updateTheme = useCallback(async (newTheme: Theme) => {
    try {
      await AsyncStorage.setItem('theme', newTheme);
      setTheme(newTheme);
    } catch (error) {
      console.error('Error updating theme:', error);
    }
  }, []);

  return {
    lang,
    theme,
    loadSettings,
    updateLang,
    updateTheme,
    setLang,
    setTheme,
  };
};
