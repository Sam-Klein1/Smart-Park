import React, { useState, useEffect } from 'react';
import { Text } from 'react-native';
import * as Font from 'expo-font';

export default function FText(props){
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    async function loadFont() {
      await Font.loadAsync({
        'custom-font': require('../../assets/fonts/Oswald-Regular.ttf'),
      });

      setFontLoaded(true);
    }

    loadFont();
  }, []);

  if (!fontLoaded) {
    return <Text>Loading...</Text>;
  }

  return (
    <Text className="text-center text-3xl" style={{ ...props.style, fontFamily: 'custom-font'}}>
      {props.children}
    </Text>
  );
};