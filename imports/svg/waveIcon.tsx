import React, { useEffect, useRef } from 'react';
import { Animated, Easing } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const AnimatedPath = Animated.createAnimatedComponent(Path);

export default function WaveIcon() {
  const opacityOuter = useRef(new Animated.Value(0)).current;
  const opacityInner = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacityOuter, {
          toValue: 1,
          duration: 2000,
          easing: Easing.linear,
          useNativeDriver: false,
        }),
        Animated.timing(opacityOuter, {
          toValue: 0,
          duration: 1000,
          easing: Easing.linear,
          useNativeDriver: false,
        }),
      ])
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(opacityInner, {
          toValue: 1,
          duration: 1500,
          easing: Easing.linear,
          useNativeDriver: false,
        }),
        Animated.timing(opacityInner, {
          toValue: 0,
          duration: 500,
          easing: Easing.linear,
          useNativeDriver: false,
        }),
      ])
    ).start();
  }, [opacityOuter, opacityInner]);

  return (
    <Svg width={12} height={14} viewBox="0 0 12 14" fill="none">
      <AnimatedPath
        d="M8 2C10.5 4.5 10.5 9.5 8 12"
        stroke="green"
        strokeWidth={2}
        strokeLinecap="round"
        opacity={opacityOuter}
      />
      <AnimatedPath
        d="M5 4.5C6.5 6 6.5 8 5 9.5"
        stroke="green"
        strokeWidth={2}
        strokeLinecap="round"
        opacity={opacityInner}
      />
    </Svg>
  );
}
