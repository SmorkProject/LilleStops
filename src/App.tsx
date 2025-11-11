import React, { useEffect } from 'react';
import { ScrollView, View, Text } from 'react-native';
import { useSettings, useTrajets, useTransportData } from '@hooks';
import { BottomNav } from '@components';
import { themes, TRANSLATIONS } from '@constants';
import { initSettings } from '@utils';
import { Tab } from '@types';

// Importation des pages (à migrer vers src/features/)
import Trajets from '@features/trajets/trajets';
import Settings from '@features/settings/settings';
import Search from '@features/search/search';

const AppRefactored: React.FC = () => {
  // Utilisation des hooks personnalisés
  const { lang, theme, updateLang, updateTheme, loadSettings } = useSettings();
  const {
    trajets,
    trajetsDatas,
    loadTrajets,
    addTrajet,
    deleteTrajet,
    updateTrajetName,
    deleteTrajetData,
  } = useTrajets(lang);
  const { allBusStop, allDeparturesData, vlilleStations, isVlilleLoading } =
    useTransportData();

  // État local pour la navigation
  const [activeTab, setActiveTab] = React.useState<Tab>('search');
  const [boxType, setBoxType] = React.useState<string>('');
  const [boxId, setBoxId] = React.useState<string>('');
  const [boxName, setBoxname] = React.useState<string>('');
  const [boxCity, setBoxCity] = React.useState<string>('');
  const [boxDisplay, setBoxDisplay] = React.useState<boolean>(false);

  // Chargement initial
  useEffect(() => {
    const initialize = async () => {
      await initSettings();
      await loadSettings();
      await loadTrajets();
    };
    initialize();
  }, [loadSettings, loadTrajets]);

  // Récupération du thème et des traductions
  const themeFile = themes[theme].default;
  const translate = TRANSLATIONS[lang];

  // Rendu du composant actif
  const renderActiveComponent = () => {
    switch (activeTab) {
      case 'trajets':
        return (
          <Trajets
            lang={lang}
            trajets={trajets}
            deleteTrajets={deleteTrajetData}
            trajetsDatas={trajetsDatas}
            themeFile={themeFile}
          />
        );
      case 'search':
        return (
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
      case 'settings':
        return (
          <Settings
            theme={theme}
            lang={lang}
            trajets={trajets}
            onChangeTheme={updateTheme}
            onAddTrajet={addTrajet}
            onDeleteTrajet={deleteTrajet}
            onUpdateTrajetName={updateTrajetName}
            onLangChange={updateLang}
            themeFile={themeFile}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        {renderActiveComponent()}
      </ScrollView>

      <BottomNav
        activeTab={activeTab}
        onTabChange={setActiveTab}
        themeFile={themeFile}
      />
    </>
  );
};

export default AppRefactored;
