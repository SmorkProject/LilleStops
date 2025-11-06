import React, { useState, useEffect } from 'react';
import { Text, View, TouchableWithoutFeedback, Pressable } from 'react-native';

import { BoxAddInTrajetshViewProps, Trajet } from "../functions/types";

import style from "../styles/boxaddInTrajets";

const boxaddInTrajets: React.FC<BoxAddInTrajetshViewProps> = ({
  setBoxDisplay,
  AddInTrajets,
  themeFile,
  translate,
  boxName,
  boxtype,
  boxCity,
  trajets,
}) => {
  return (
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
                  onPress={() => AddInTrajets(trajet)}
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
  );
};

export default boxaddInTrajets;