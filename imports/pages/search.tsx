import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { View, Text, Pressable, TextInput, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import WaveIcon from '../svg/waveIcon';

import { SearchViewProps, VLilleViewProps, Trajet, VLilleStation, SearchProps, translations } from "../../functions/types";
import GetBusData from '../../functions/GetBusData';
import GetVlille from '../../functions/GetVlille';
import Countdown from '../countdown';
import getLineStyle from '../../functions/getLineStyle';

import style from "../../styles/search";

const Search: React.FC<SearchViewProps> = ({
  lang,
  setBoxCity,
  setBoxDisplay,
  setBoxId,
  setBoxType,
  setBoxname,
  themeFile
}) => {
  const translate = translations[lang];

  const [allBusStop, setAllBusStop]                 = useState<string[]>([]);
  const [departures, setDepartures]                 = useState<any[]>([]);
  const [allDeparturesData, setAllDeparturesData]   = useState<any[]>([]);
  const [searchMode, setSearchMode]                 = useState<'bus' | 'vlille'>('bus');
  const [vlilleStations, setVlilleStations]         = useState<VLilleStation[]>([]);
  const [isVlilleLoading, setIsVlilleLoading]       = useState<boolean>(true);

  /**
   * get alls infos in apis
   */
  useEffect(() => {
    const fetchBusData = async () => {
      let data = await GetBusData();

      setAllBusStop(data.allStops as any);
      setAllDeparturesData(data.AllDeparturesData)
    };
    const fetchVlilleData = async () => {
      let data = await GetVlille();

      setVlilleStations(data);
      setIsVlilleLoading(false);
    };

    fetchBusData();
    fetchVlilleData();
  }, []);

  /**
   * Search Bus and Trams
   * @param allStops is the json returned by the api for get all stops datas
   * @param onSearch is the systeme for search stops 
   * @returns a search bard
   */
  const Search: React.FC<SearchProps> = ({ allStops, onSearch }) => {
    const [query, setQuery] = useState<string>("");
    const [suggestions, setSuggestions] = useState<string[]>([]);

    const handleInputChange = (text: string) => {
      setQuery(text);

      if (text.trim().length > 1) {
        const filtered = allStops
          .filter((stop) => stop.toLowerCase().includes(text.toLowerCase()))
          .slice(0, 6);
        setSuggestions(filtered);
      } else {
        setSuggestions([]);
      }
    };

    const handleSuggestionClick = (stop: string) => {
      setQuery(stop);
      setSuggestions([]);
      onSearch(stop);
    };

    return (
      <View style={style.searchBox}>
        <TextInput
          id='inputQuery'
          value={query}
          onChangeText={handleInputChange}
          placeholder={translate.search.title}
          style={[style.search, themeFile.color3, themeFile.text]}
          placeholderTextColor={themeFile.text.color}
        />
        <>
          {suggestions.length > 0 && (
            <View style={[style.searchResultBox, themeFile.color2]}>
              <>
                {suggestions.map((stop) => (
                  <TouchableOpacity
                    key={stop}
                    onPress={() => handleSuggestionClick(stop)}
                    style={style.searchResultButton}
                  >
                    <Text style={[style.searchResultButtonText, themeFile.text]}>{stop}</Text>
                  </TouchableOpacity>
                ))}
              </>
            </View>
          )}
        </>
      </View>
    );
  };

  /**
   * systeme for search a stops
   */
  const filterDeparturesForStop = useCallback((stopName: string) => {
    setDepartures([]);

    const now = new Date();
    const filtered = allDeparturesData
      .filter((r: any) => r.nom_station.toUpperCase() === stopName.toUpperCase())
      .map((r: any): any => {
        const timeStr = r.cle_tri?.match(/(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}\+\d{2}:\d{2})/)?.[1] || r.heure_estimee_depart;
        return {
          station: r.nom_station,
          line: r.code_ligne,
          direction: r.sens_ligne,
          time: new Date(timeStr),
          id: r.identifiant_station
        };
      })
      .filter((d: any) => d.time.getTime() - now.getTime() >= 0)
      .sort((a: any, b: any) => a.time.getTime() - b.time.getTime())
      .filter((item: any, index: number, arr: any[]) =>
        arr.findIndex(i => i.direction === item.direction) === index
      );


    setDepartures(filtered);
  }, [allDeparturesData]);

  const handleSearch = (stopName: string) => {
    if (stopName) {
      filterDeparturesForStop(stopName);
    };
  };

  /**
   * set data for the box for save vlille in the trajets list and show the box with datas
   */
  const handleOpenAddToTrajetModalForVLille = useCallback((station: VLilleStation) => {
    setBoxType("vlille");
    setBoxId(station.id);
    setBoxname(station.name);
    setBoxCity(station.city);
    setBoxDisplay(true);
  }, []);

  /**
   * interface for show all vlilles
   */
  const VLilleView: React.FC<VLilleViewProps> = ({ stations, isLoading, onStartAddToTrajet }) => {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState<VLilleStation[]>([]);

    // Memoize the sorted list of all stations to avoid re-sorting on every render
    const sortedStations = useMemo(() => {
      return [...stations].sort((a, b) => a.name.localeCompare(b.name));
    }, [stations]);

    const handleInputChange = (text: string) => {
      setQuery(text);

      if (text.trim().length > 1) {
        const filtered = sortedStations
          .filter(
            (station) =>
              station.name.toLowerCase().includes(text.toLowerCase()) ||
              station.city.toLowerCase().includes(text.toLowerCase())
          )
          .slice(0, 6);
        setSuggestions(filtered);
      } else {
        setSuggestions([]);
      }
    };


    const handleSuggestionClick = (station: VLilleStation) => {
      setQuery(station.name);
      setSuggestions([]);
    };

    // The list of stations displayed to the user, filtered by the query
    const filteredStations = useMemo(() => {
      if (!query) return sortedStations;
      return sortedStations.filter(station =>
        station.name.toLowerCase().includes(query.toLowerCase()) ||
        station.city.toLowerCase().includes(query.toLowerCase())
      );
    }, [query, sortedStations]);

    if (isLoading) {
      return <Text>{translate.search.loading}</Text>;
    };

    return (
      <>
        <View>
          <View style={style.vlilleBoxSearch}>
            <TextInput
              value={query}
              onChangeText={handleInputChange}
              placeholder={translate.search.vlilleSearch}
              aria-label={translate.search.vlilleSearch}
              style={[style.search, themeFile.color3, themeFile.text]}
              placeholderTextColor={themeFile.text.color}
            />
            <>
              {suggestions.length > 0 && (
                <View style={[style.searchResultBox, themeFile.color2]}>
                  <>
                    {suggestions.map(station => (
                      <TouchableOpacity
                        key={station.id}
                        onPress={() => handleSuggestionClick(station)}
                        style={style.searchResultButton}
                      >
                        <Text style={[style.searchResultButtonText, themeFile.text]}>{station.name} ({station.city})</Text>
                      </TouchableOpacity>
                    ))}
                  </>
                </View>
              )}
            </>
          </View>
          
          <View style={style.vlilleList}>
            {filteredStations.length === 0 && !isLoading && (
              <Text style={[style.noData, themeFile.text, themeFile.color2]}>{translate.search.noresult}</Text>
            )}
          </View>

          <View style={style.vlilleList}>
            {filteredStations.slice(0, 10).map(station => (
              <View key={station.id} style={[style.resultBox, themeFile.color2]}>
                <View style={style.resultBoxContent1}>
                  <View>
                    <Text style={[style.stationName, themeFile.text]}>{station.name}</Text>
                    <Text style={style.stationCity}>{station.city}</Text>
                  </View>
                  <Pressable
                    onPress={() => onStartAddToTrajet(station)}
                    aria-label={`Add to a trajet`}
                    style={[style.resultBoxContentInButton, themeFile.color3]}
                  >
                    <Text style={[style.resultBoxContentInButtonText, themeFile.text]}>+</Text>
                  </Pressable>
                </View>
                <View style={style.stats}>
                  <View style={[style.statContent, themeFile.color4]}>
                    <View style={style.statContentTop}>
                      <Text style={[style.statContentText, themeFile.text]}>🚲</Text>
                      <Text style={[style.statContentText, themeFile.text]}>{station.bikes}</Text>
                      <WaveIcon />
                    </View>
                    <Text style={[style.statContentText, themeFile.text]}>{translate.search.vlille_bikes_available}</Text>
                  </View>
                  <View style={[style.statContent, themeFile.color4]}>
                    <View style={style.statContentTop}>
                      <Text style={[style.statContentText, themeFile.text]}>🅿️</Text>
                      <Text style={[style.statContentText, themeFile.text]}>{station.docks}</Text>
                      <WaveIcon />
                    </View>
                    <Text style={[style.statContentText, themeFile.text]}>{translate.search.vlille_docks_available}</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>
      </>
    );
  };

  return (
    <View style={[style.background, themeFile.color1]}>
      <View style={style.navigatorBox}>
        <View style={[style.navigator, themeFile.color2]}>
          <TouchableOpacity style={[style.navigatorButton, themeFile.color3, searchMode === "bus" && style.selected]} onPress={() => setSearchMode("bus")} >
            <Text style={themeFile.text}>{translate.search.bus}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[style.navigatorButton, themeFile.color3, searchMode === "vlille" && style.selected]} onPress={() => setSearchMode("vlille")} >
            <Text style={themeFile.text}>{translate.search.vlille}</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View>
        <>
          {searchMode === 'bus' ? (
            <>
              <Search allStops={allBusStop} onSearch={handleSearch} />
              <View id="boxBusQuery" style={style.boxBusQuery}>
                <>
                  {departures.length > 0 && (
                    <>
                      {departures.map(item => (
                        <View key={item.time} style={[style.resultBox, themeFile.color2]}>
                          <View style={[style.resultLine, { backgroundColor: getLineStyle(item.line).bg }]}>
                            <Text style={[{ color: getLineStyle(item.line).text }, style.resultLineText]}>
                              {item.line}
                            </Text>
                          </View>
                          <View style={style.resultBoxContent}>
                            <View style={style.resultBoxContentIn}>
                              <Text style={[style.resultBoxContentInText, themeFile.text]}>{translate.search.direction} {item.direction}</Text>
                              <TouchableOpacity onPress={() => {
                                setBoxType("Bus and trams");
                                setBoxname(item.station)
                                setBoxId(item.id);
                                setBoxCity(item.line + " → " + item.direction);
                                setBoxDisplay(true);
                              }}
                                style={[style.resultBoxContentInButton, themeFile.color3]}
                              >
                                <Text style={[style.resultBoxContentInButtonText, themeFile.text]}>+</Text>
                              </TouchableOpacity>
                            </View>
                            <View>
                              <View style={style.resultBoxContentIn2}>
                                <View>
                                  <Countdown style2={[style.resultBoxContentInText, themeFile.text]} key={item.time.toISOString()} targetDate={item.time} txt={translate.search.imminent} />
                                </View>
                                <WaveIcon />
                              </View>
                            </View>
                          </View>
                        </View>
                      ))}
                    </>
                  )}
                </>
              </View>
            </>
          ) : (
            <>
              <VLilleView
                stations={vlilleStations}
                isLoading={isVlilleLoading}
                onStartAddToTrajet={handleOpenAddToTrajetModalForVLille}
              />
            </>
          )}
        </>
      </View>
    </View>
  );
};

export default Search;