import React, { useState, useEffect } from 'react';
import { Text } from 'react-native';
import { CountdownProps } from '../../types';

/**
 * Countdown component that displays time until a target date
 */
export const Countdown: React.FC<CountdownProps> = ({ targetDate, txt, style2 }) => {
  const [countdown, setCountdown] = useState('');

  useEffect(() => {
    const calculateCountdown = () => {
      const diff = (targetDate.getTime() - new Date().getTime()) / 60000;
      const roundedDiff = Math.round(diff);

      if (roundedDiff <= 0) return txt;
      if (diff > 60) return '> 1h';
      return `${roundedDiff} min`;
    };

    setCountdown(calculateCountdown());
    const interval = setInterval(() => {
      setCountdown(calculateCountdown());
    }, 15000);

    return () => clearInterval(interval);
  }, [targetDate, txt]);

  return <Text style={style2}>{countdown}</Text>;
};
