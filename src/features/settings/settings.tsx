import React, { useState } from 'react';
import { Image, View, Text, TextInput, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Svg, { Path } from 'react-native-svg';
import { SettingsViewProps } from '@types';
import { langs, flags, translations } from '@constants';

import style from "../../../styles/settings";

const Settings: React.FC<SettingsViewProps> = ({ themeFile, theme, lang, trajets, onLangChange, onChangeTheme, onAddTrajet, onDeleteTrajet, onUpdateTrajetName }) => {
  const [realTheme, setRealTheme] = useState<string>(theme);

  const translate = translations[lang];
  const isMaxTrajets = trajets.length >= 6;

  return (
    <View style={themeFile.color1}>
      <View style={style.box}>
        <Text style={[style.title, themeFile.text]}>⚙️ {translate.settings.title}</Text>

        <View style={[style.themeBox, themeFile.color2]}>
          <Text style={[style.title2, themeFile.text]}>{`🎨 ${translate.settings.theme.title}`}</Text>
          <View style={style.buttonList}>
            <TouchableOpacity
              onPress={async () => {
                await AsyncStorage.setItem("theme", "white")
                onChangeTheme("white")
                setRealTheme("white")
              }}
              style={[style.button, realTheme === "white" && style.buttonSelected, themeFile.color3]}
            >
              <Text style={style.buttonText}>☀️</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={async () => {
                await AsyncStorage.setItem("theme", "black")
                onChangeTheme("black")
                setRealTheme("black")
              }}
              style={[style.button, realTheme === "black" && style.buttonSelected, themeFile.color3]}
            >
              <Text style={style.buttonText}>🌙</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={[style.themeBox, themeFile.color2]}>
          <Text style={[style.title2, themeFile.text]}>{`✍️ ${translate.settings.trajets.title}`}</Text>
          <View style={style.trajetsList}>
            {trajets.map(trajet => (
              <View key={trajet.id} style={style.trajets}>
                <Text style={style.trajetsEmoji}>{trajet.emoji}</Text>
                <TextInput
                  value={trajet.name}
                  onChangeText={(text) => onUpdateTrajetName(trajet.id, text)}
                  style={[style.trajetsInput, themeFile.text, themeFile.color3]}
                />
                <TouchableOpacity
                  onPress={() => {
                    onDeleteTrajet(trajet.id)
                  }}
                  disabled={trajets.length <= 1}
                  style={[style.trajetsButtonDelete, themeFile.color3]}
                >
                  <View>
                    <Svg viewBox="0 0 20 20" fill="#e2001a" width={20} height={20}>
                      <Path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z"
                      />
                    </Svg>
                  </View>
                </TouchableOpacity>
              </View>
            ))}
          </View>
          <View style={style.trajetsButton}>
            <TouchableOpacity
              onPress={onAddTrajet}
              disabled={isMaxTrajets}
              style={[style.trajetsAdd, themeFile.color3]}
            >
              <Svg viewBox="0 0 20 20" fill={themeFile.text.color} width={20} height={20}>
                <Path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                />
              </Svg>
              <Text style={[style.trajetsAddText, themeFile.text]}>{translate.settings.trajets.add}</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={[style.themeBox, themeFile.color2]}>
          <Text style={[style.title2, themeFile.text]}>{`🌐 ${translate.settings.lang.title}`}</Text>
          <View style={style.buttonLangList}>
            {langs.map(l => (
              <TouchableOpacity
                key={l}
                onPress={() => onLangChange(l)}
                style={[style.buttonLang, lang === l && style.buttonSelected, themeFile.color3]}
              >
                <View>
                  <Image source={flags[l]} />
                </View>
                <Text style={[style.langText, themeFile.text]}>{l.toUpperCase()}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

      </View>
    </View >
  );
};

export default Settings;