import React, { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Tab, Language, Theme, TrajetInfo, TRAJET_PRESETS, colorNames, translations, themes } from "./functions/types";
import { BottomNav } from './imports/navigator';
import { ScrollView } from 'react-native';
import Trajets from './imports/pages/trajets';
import Settings from './imports/pages/settings';
import Search from './imports/pages/search';
import initSettings from './functions/initSettings';
import BoxaddInTrajets from './imports/boxAddInTrajets';

const App: React.FC = () => {
  const [activeTab, setActiveTab]               = useState<Tab>('search');
  const [theme, setTheme]                       = useState<Theme>('white');
  const [lang, setLang]                         = useState<Language>('fr');
  const [trajets, setTrajets]                   = useState<TrajetInfo[]>([]);
  const [trajetsDatas, setTrajetsDatas]         = useState<any>({});
  const [currentComponent, setCurrentComponent] = useState<React.ReactNode>(null);
  const [boxtype, setBoxType]                   = useState<String>("");
  const [boxId, setBoxId]                       = useState<String>("");
  const [boxName, setBoxname]                   = useState<String>("");
  const [boxCity, setBoxCity]                   = useState<String>("");
  const [boxDisplay, setBoxDisplay]             = useState<Boolean>(false);
  const [hasLoadedLang, setHasLoadedLang]       = useState(false);
  const [hasLoadedtheme, setHasLoadedTheme]     = useState(false);
  const [hasLoadedTrajets, setHasLoadedTrajets] = useState(false);

  const themeFile = themes[theme].default
  const translate = translations[lang];

  /**
   * set settings in variable useState ans set the default settings
   */
  useEffect(() => {
    const loadSettings = () => {
      initSettings().finally(async () => {
        const storedTheme = (await AsyncStorage.getItem("theme")) as Theme;
        const storedLang = (await AsyncStorage.getItem("lang")) as Language;
        const storedTrajets = JSON.parse((await AsyncStorage.getItem("trajets")) || "[]");
        const storedTrajetsDatas = JSON.parse((await AsyncStorage.getItem("trajetsDatas")) || "{}");

        if (storedTheme) await setTheme(storedTheme);
        if (storedLang) await setLang(storedLang);
        await setTrajets(storedTrajets);
        await setTrajetsDatas(storedTrajetsDatas);

        await setHasLoadedTheme(true);
        await setHasLoadedLang(true);
        await setHasLoadedTrajets(true);

        await setCurrentComponent(
          <Search
            lang={lang}
            setBoxType={setBoxType}
            setBoxname={setBoxname}
            setBoxId={setBoxId}
            setBoxCity={setBoxCity}
            setBoxDisplay={setBoxDisplay}
            themeFile={themeFile}
          />
        );
      });
    };

    loadSettings();
  }, []);

  /**
   * add trajet list with settings
   */
  const handleAddTrajet = useCallback(async (): Promise<void> => {
    setTrajets(prev => {
      if (prev.length >= 6) return prev;

      let newTrajet: TrajetInfo | undefined;

      for (const preset of TRAJET_PRESETS) {
        const colorExists: boolean = prev.some(trajet => trajet.color === preset.color);
        if (!colorExists) {
          newTrajet = {
            id: colorNames[preset.color],
            name: translate.settings.trajets.new,
            ...preset,
          };
          break;
        }
      }

      if (!newTrajet) return prev;

      const updatedTrajets: TrajetInfo[] = [...prev, newTrajet];
      AsyncStorage.setItem("trajets", JSON.stringify(updatedTrajets));

      return updatedTrajets;
    });
  }, [translate]);

  /**
   * delete a trajet list with settings
   */
  const handleDeleteTrajet = useCallback(
    async (trajetId: string) => {
      setTrajets(prevTrajets => {
        if (prevTrajets.length <= 1) return prevTrajets;

        let newTrajets = prevTrajets.filter(
          t => t.id.toString() !== trajetId
        );

        AsyncStorage.setItem("trajets", JSON.stringify(newTrajets));

        return newTrajets;
      });
    },
    []
  );

  /**
   * update a trajets list name with settings
   */
  const handleUpdateTrajetName = useCallback(async (trajetId: string, newName: string) => {
    setTrajets(prev => {
      if ((newName.length >= 16)) return prev;
      let newTrajets = prev.map(t =>
        t.id === trajetId ? { ...t, name: newName } : t
      );

      AsyncStorage.setItem("trajets", JSON.stringify(newTrajets));

      return newTrajets;
    });
  }, []);

  /**
   * update the language with settings
   */
  const handleUpdateLang = useCallback(async (newLang: Language) => {
    setLang(prev => {
      if (prev === newLang) return prev;

      AsyncStorage.setItem("lang", newLang);
      return newLang;
    });
  }, []);

  //! here to "//! to here"
  // create a "bug" in the launch the first page by default is search but with this code
  // the "first" page is settings because lang, theme and trajets is refresh and UseEffect redirect in settings page

  /**
   * refresh auto settings for show the new language
   */
  useEffect(() => {
    if (hasLoadedLang) {
      handleTabChange("settings");
    };
  }, [lang]);

  /**
   * refresh auto settings for show the new theme
   */
  useEffect(() => {
    if (hasLoadedtheme) {
      handleTabChange("settings");
    };
  }, [theme]);

  /**
   * refresh auto settings for show the new tips
   */
  useEffect(() => {
    if (hasLoadedTrajets) {
      handleTabChange("settings");
    };
  }, [trajets]);

  //! to here

  /**
   * delete a object in tips list
   * @param index is the index of object in table
   * @param id id of data in table
   */
  const deleteTrajets = async (index: number, id: any) => {
    let datasTrajets = trajetsDatas[id];

    if (index >= 0 && index < datasTrajets.length) {
      datasTrajets.splice(index, 1);
      AsyncStorage.setItem("trajetsDatas", JSON.stringify(trajetsDatas));

      handleTabChange("trajets");
    };
  };

  /**
   * add object in trajetsdatas in Strorage
   * @param trajet JSON data of trajet
   */
  const AddInTrajets = async (trajet: any) => {
    if (trajet.id in trajetsDatas) {
      trajetsDatas[trajet.id].push({
        type: boxtype,
        name: boxName,
        city: boxCity,
        id: boxId
      });
    } else {
      trajetsDatas[trajet.id] = [{
        type: boxtype,
        name: boxName,
        city: boxCity,
        id: boxId
      }];
    }
    await AsyncStorage.setItem("trajetsDatas", JSON.stringify(trajetsDatas));
    setTrajetsDatas(trajetsDatas);
    setBoxDisplay(false);
  };

  /**
   * change the page with button in nav
   * @param tab page name
   */
  const handleTabChange = (tab: Tab) => {
    setActiveTab(tab);

    switch (tab) {
      case 'trajets':
        setCurrentComponent(<Trajets
          lang={lang}
          trajets={trajets}
          deleteTrajets={deleteTrajets}
          trajetsDatas={trajetsDatas}
          themeFile={themeFile}
        />);
        break;
      case 'search':
        setCurrentComponent(<Search
          lang={lang}
          setBoxType={setBoxType}
          setBoxname={setBoxname}
          setBoxId={setBoxId}
          setBoxCity={setBoxCity}
          setBoxDisplay={setBoxDisplay}
          themeFile={themeFile}
        />);
        break;
      case 'settings':
        setCurrentComponent(<Settings
          theme={theme}
          lang={lang}
          trajets={trajets}
          onChangeTheme={setTheme}
          onAddTrajet={handleAddTrajet}
          onDeleteTrajet={handleDeleteTrajet}
          onUpdateTrajetName={handleUpdateTrajetName}
          onLangChange={handleUpdateLang}
          themeFile={themeFile}
        />);
    }
  };

  return (
    <>
      <>
        {boxDisplay && (
          <BoxaddInTrajets
            setBoxDisplay={setBoxDisplay}
            translate={translate}
            themeFile={themeFile}
            AddInTrajets={AddInTrajets}
            boxCity={boxCity}
            boxName={boxName}
            boxtype={boxtype}
            trajets={trajets}
          />
        )}
      </>
      
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        {currentComponent}
      </ScrollView>

      <BottomNav
        activeTab={activeTab}
        onTabChange={handleTabChange}
        themeFile={themeFile}
      />
    </>
  );
};

export default App;