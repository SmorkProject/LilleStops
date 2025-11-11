import React, { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Tab, Language, Theme, TrajetInfo, TRAJET_PRESETS, colorNames, translations, Trajet, themes } from "./functions/types";
import { BottomNav } from './imports/navigator';
import { ScrollView, Text, View, TouchableWithoutFeedback, Pressable, } from 'react-native';
import Trajets from './imports/pages/trajets';
import Settings from './imports/pages/settings';
import Search from './imports/pages/search';
import initSettings from './functions/initSettings';

import style from "../styles/boxaddInTrajets";

const App: React.FC = () => {
  const [activeTab, setActiveTab]                 = useState<Tab>('search');
  const [theme, setTheme]                         = useState<Theme>('white');
  const [lang, setLang]                           = useState<Language>('fr');
  const [trajets, setTrajets]                     = useState<TrajetInfo[]>([]);
  const [trajetsDatas, setTrajetsDatas]           = useState<any>({});
  const [currentComponent, setCurrentComponent]   = useState<React.ReactNode>(null);
  const [boxtype, setBoxType]                     = useState<String>("");
  const [boxId, setBoxId]                         = useState<String>("");
  const [boxName, setBoxname]                     = useState<String>("");
  const [boxCity, setBoxCity]                     = useState<String>("");
  const [boxDisplay, setBoxDisplay]               = useState<Boolean>(false);
  const [hasLoadedLang, setHasLoadedLang]         = useState(false);
  const [hasLoadedtheme, setHasLoadedTheme]       = useState(false);
  const [hasLoadedTrajets, setHasLoadedTrajets]   = useState(false);
  const [hasLoadedTrajets2, setHasLoadedTrajets2] = useState(false);

  const themeFile = themes[theme].default
  const translate = translations[lang];

  /**
   * set settings in variable useState ans set the default settings
   */
  useEffect(() => {
    initSettings();
    const loadSettings = async () => {
      const storedTheme = (await AsyncStorage.getItem("theme")) as Theme;
      const storedLang = (await AsyncStorage.getItem("lang")) as Language;
      const storedTrajets = JSON.parse((await AsyncStorage.getItem("trajets")) || "[]");
      const storedTrajetsDatas = JSON.parse((await AsyncStorage.getItem("trajetsDatas")) || "{}");

      if (storedTheme) setTheme(storedTheme);
      if (storedLang) setLang(storedLang);
      setTrajets(storedTrajets);
      setTrajetsDatas(storedTrajetsDatas);

      setCurrentComponent(
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
    };

    loadSettings();
  }, []);

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

  const handleUpdateLang = useCallback(async (newLang: Language) => {
    setLang(prev => {
      if (prev === newLang) return prev;

      AsyncStorage.setItem("lang", newLang);
      return newLang;
    });
  }, []);

  /**
   * refresh auto settings for show the new language
   */
  useEffect(() => {
    if (hasLoadedLang) {
      handleTabChange("settings");
    } else {
      setHasLoadedLang(true);
    };
  }, [lang]);

  /**
   * refresh auto settings for show the new theme
   */
  useEffect(() => {
    if (hasLoadedtheme) {
      handleTabChange("settings");
    } else {
      setHasLoadedTheme(true);
    };
  }, [theme]);

  /**
   * refresh auto settings for show the new tips
   */
  useEffect(() => {
    if (hasLoadedTrajets) {
      if (hasLoadedTrajets2) {
        handleTabChange("settings");
      } else {
        setHasLoadedTrajets2(true);
      };
    } else {
      setHasLoadedTrajets(true);
    };
  }, [trajets]);

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
          <TouchableWithoutFeedback onPress={() => setBoxDisplay(false)}>
            <View style={style.backgroundBoxAdd}>
              <TouchableWithoutFeedback onPress={() => { console.log("smork") }}>
                <View style={[style.blockBoxAdd, themeFile.color2]}>
                  <Text style={[style.blockBoxAddTitle, themeFile.text]}>{translate.search.add}</Text>
                  <View style={[style.blockBoxBlock, themeFile.color3]}>
                    <Text style={[style.blockBoxBlockText, themeFile.text]}>
                      <Text>{boxtype === "vlille" ? translate.search.addName : translate.search.addStop}: </Text>
                      {boxName}
                    </Text>
                    <Text style={[style.blockBoxBlockText, themeFile.text]}>
                      <Text>{boxtype === "vlille" ? translate.search.addCity : translate.search.addLine}: </Text>
                      {boxCity}
                    </Text>
                  </View>
                  <View>
                    {trajets.map((trajet: Trajet) => (
                      <Pressable
                        key={trajet.id}
                        onPress={async () => {
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
                        }}
                        style={style.blockBoxAddButton}
                      >
                        <Text style={[style.blockBoxAddButtonText, themeFile.text]}>{trajet.emoji}</Text>
                        <Text style={[style.blockBoxAddButtonText, themeFile.text]}>{trajet.name}</Text>
                      </Pressable>
                    ))}
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
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