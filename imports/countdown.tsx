import React, { useState, useEffect } from 'react';
import { Text } from 'react-native';
import { CountDownViewPop } from "../functions/types";

const Countdown: React.FC<CountDownViewPop> = ({
  targetDate,
  txt,
  style2
}) => {
  const [countdown, setCountdown] = useState('');

  useEffect(() => {
    const calculateCountdown = () => {
      const diff = (targetDate.getTime() - new Date().getTime()) / 60000;
      const roundedDiff = Math.round(diff);

      if (roundedDiff <= 0) return txt;
      if (diff > 60) return "> 1h";
      return `${roundedDiff} min`;
    };

    setCountdown(calculateCountdown());
    const interval = setInterval(() => {
      setCountdown(calculateCountdown());
    }, 15000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <Text style={style2}>{countdown}</Text>
  );
};

export default Countdown;