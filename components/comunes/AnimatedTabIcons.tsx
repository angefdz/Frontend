import { Feather } from '@expo/vector-icons';
import React, { useEffect } from 'react';
import { LayoutAnimation, View } from 'react-native';

interface Props {
  iconName: keyof typeof Feather.glyphMap;
  focused: boolean;
  size: number;
  color: string;
}

export default function AnimatedTabIcon({ iconName, focused, size, color }: Props) {
  useEffect(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  }, [focused]);

  return (
    <View style={{ alignItems: 'center', justifyContent: 'center', top: focused ? -8 : 0 }}>
      <Feather
        name={iconName}
        size={focused ? size + 6 : size}
        color={color}
      />
    </View>
  );
}
