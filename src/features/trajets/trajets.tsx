import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { TrajetInfo, VLilleStation, Language } from '@types';
import { translations } from '@constants';
import { fetchBusData } from '@services/busService';
import { fetchVlilleData } from '@services/vlilleService';
import { getLineStyle } from '@utils/transport';
import { Countdown } from '@/components/shared/Countdown';
import { WaveIcon } from '@components/ui/WaveIcon';
import Svg, { Path } from 'react-native-svg';

import style from "../../../styles/trajets";

const Trajets: React.FC<{ lang: Language; trajets: TrajetInfo[]; trajetsDatas: any; deleteTrajets: (index: number, id: any) => any, themeFile: any; }> = ({
  lang,
  trajets,
  trajetsDatas,
  deleteTrajets,
  themeFile
}) => {
  const [trajetIndex, setTrajetIndex]             = useState<number>(0);
  const [allDeparturesData, setAllDeparturesData] = useState<any[]>([]);
  const [vlilleStations, setVlilleStations]       = useState<VLilleStation[]>([]);
  const [visibleStates, setVisibleStates] = useState<Record<number, boolean>>({});

  const currentTrajet = trajets[trajetIndex];
  const translate = translations[lang];
  
  /**
   * get alls infos in apis
   */
  useEffect(() => {
    const loadBusData = async () => {
      let data = await fetchBusData();
      setAllDeparturesData(data.AllDeparturesData)
    };
    const loadVlilleData = async () => {
      let data = await fetchVlilleData();
      setVlilleStations(data);
    };

    loadBusData();
    loadVlilleData();
  }, []);

  /**
   * search by id in a list json [{id:"..."...}...]
   * @param list the list
   * @param targetId the id in the list
   * @returns return the object content de id
   */
  function getById<T extends { id: string }>(list: T[], targetId: string): T | undefined {
    return list.find(item => item.id === targetId);
  };

  /**
   * get the number of bikes dispo
   * @param itemId the id for search the number of bikes dispo
   * @returns the number of bikes
   */
  const BikesCount: React.FC<{ itemId: string }> = ({ itemId }) => {
    const station = getById<any>(vlilleStations, itemId);

    if (!station) {
      return <Text style={[style.statContentText, themeFile.text]}>...</Text>;
    }

    return <Text style={[style.statContentText, themeFile.text]}>{station.bikes}</Text>;
  };

  /**
   * get the number of docks dispo
   * @param itemId the id for search the number of docks dispo
   * @returns the number of docks
   */
  const DocksCount: React.FC<{ itemId: string }> = ({ itemId }) => {
    const station = getById<any>(vlilleStations, itemId);

    if (!station) {
      return <Text style={[style.statContentText, themeFile.text]}>...</Text>;
    }

    return <Text style={[style.statContentText, themeFile.text]}>{station.docks}</Text>;
  };

  /**
   * get the time for the Bus and tram
   * @param itemId the id for search the time for bus and tram
   * @returns the time for bus and tram
   */
  const BusTramCount: React.FC<{ itemId: string }> = ({ itemId }) => {
    let datas = allDeparturesData.find(item => item.identifiant_station === itemId);
    if (!datas) return <Text style={[style.resultBoxContentInText, themeFile.text]}>...</Text>;
    let time = new Date(datas.cle_tri?.match(/(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}\+\d{2}:\d{2})/)?.[1] || datas.heure_estimee_depart);


    return <Countdown style2={[style.resultBoxContentInText, themeFile.text]} key={time.toISOString()} targetDate={time} txt={translate.search.imminent} />;
  };


  // Function to toggle visibility for a specific item
  const toggleView = (id: number) => {
    setVisibleStates((prev) => ({
      ...prev,
      [id]: !prev[id], // Toggle the state for the specific item
    }));
  };

  return (
    <View style={[style.background, themeFile.color1]}>
      <View style={style.box}>
        <Text style={[style.title, themeFile.text]}>✍️ {translate.trajets.title}</Text>
        <TouchableOpacity onPress={() => {
          let TrajetsLenght = trajets.length - 1;
          if (TrajetsLenght !== 0) {
            if (trajetIndex === TrajetsLenght) {
              setTrajetIndex(0);
            } else {
              setTrajetIndex(trajetIndex + 1);
            };
          };
        }}
          style={[style.buttonChange, themeFile.color3]}
        >
          <Text style={[style.buttonChangeText, themeFile.text]}>{currentTrajet.emoji}</Text>
          <Text style={[style.buttonChangeText, themeFile.text]}>{currentTrajet.name}</Text>
          <Text style={[{ backgroundColor: currentTrajet.color }, style.buttonChangeText, style.buttonChangeNumber, themeFile.text]}>
            {(trajetsDatas[currentTrajet.id] ?? []).length}
          </Text>
        </TouchableOpacity>
        <View id="boxtrajets">
          {Array.isArray(trajetsDatas?.[currentTrajet?.id]) && trajetsDatas[currentTrajet.id].length > 0 ? (
            trajetsDatas[currentTrajet.id].map((item: any, index: number) =>
              item && item.type !== "vlille" ? (
                <View style={[style.resultBox, themeFile.color2]} key={`${currentTrajet?.id}-${item?.id}-${index}`}>
                  <View style={[style.resultLine, { backgroundColor: getLineStyle(item?.city?.split(" → ")[0]).bg }]}>
                    <Text style={[{ color: getLineStyle(item?.city?.split(" → ")[0]).text }, style.resultLineText]}>
                      {item?.city?.split(" → ")[0]}
                    </Text>
                  </View>
                  <View style={style.resultBoxContentIn}>
                    <Text style={[style.resultBoxContentInText, style.resultBoxcontentInTextTop, themeFile.text]}>
                      {translate?.search?.direction} {item?.city?.split(" → ")[1]}
                    </Text>
                    <TouchableOpacity onPress={() => toggleView(item.type + index)} style={[style.resultBoxContentInButton, themeFile.color3]}>
                      <Svg width={20} height={20} fill={themeFile.text} viewBox="0 0 20 20">
                        <Path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                      </Svg>
                    </TouchableOpacity>
                    {visibleStates[item.type + index] && (
                      <View style={[style.deleteButtonBox, themeFile.color4]}>
                        <TouchableOpacity onPress={() => {deleteTrajets(index, currentTrajet?.id)}} >
                          <Text style={{color: "#e2001a"}}>{translate?.trajets?.delete}</Text>
                        </TouchableOpacity>
                      </View>
                    )}
                  </View>
                  <View style={style.resultBoxContentIn2}>
                    <View>
                      <BusTramCount itemId={item?.id} />
                    </View>
                    <WaveIcon />
                  </View>
                </View>
              ) : item ? (
                <View style={[style.resultBox, themeFile.color2]} key={`${currentTrajet?.id}-${item?.id}-${index}`}>
                  <View style={style.resultBoxContent1}>
                    <View>
                      <Text style={[style.stationName, themeFile.text]}>{item?.name}</Text>
                      <Text style={style.stationCity}>{item?.city}</Text>
                    </View>

                    <TouchableOpacity onPress={() => toggleView(item.type + index)} style={[style.resultBoxContentInButton, themeFile.color3]}>
                      <Svg width={20} height={20} fill="#fff" viewBox="0 0 20 20">
                        <Path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                      </Svg>
                    </TouchableOpacity>

                    {visibleStates[item.type + index] && (
                      <View style={[style.deleteButtonBox, themeFile.color4]}>
                        <TouchableOpacity onPress={() => {deleteTrajets(index, currentTrajet?.id)}}>
                          <Text style={{color: "#e2001a"}}>{translate?.trajets?.delete}</Text>
                        </TouchableOpacity>
                      </View>
                    )}
                  </View>

                  <View style={style.stats}>
                    <View style={[style.statContent, themeFile.color4]}>
                      <View style={style.statContentTop}>
                        <Text style={[style.statContentText, themeFile.text]}>🚲</Text>
                          <BikesCount itemId={item?.id} />
                        <WaveIcon />
                      </View>
                      <Text style={[style.statContentText, themeFile.text]}>{translate.search.vlille_bikes_available}</Text>
                    </View>
                    <View style={[style.statContent, themeFile.color4]}>
                      <View style={style.statContentTop}>
                        <Text style={[style.statContentText, themeFile.text]}>🅿️</Text>
                          <DocksCount itemId={item?.id} />
                        <WaveIcon />
                      </View>
                      <Text style={[style.statContentText, themeFile.text]}>{translate.search.vlille_docks_available}</Text>
                    </View>
                  </View>
                </View>
              ) : null
            )
          ) : (
            <Text style={[style.noData, themeFile.text, themeFile.color2]}>{translate?.trajets?.noDatas}</Text>
          )}
        </View>
      </View>
    </View>
  );
};

export default Trajets;