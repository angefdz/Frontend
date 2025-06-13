import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSequence,
  Easing,
} from 'react-native-reanimated';
import { Feather } from '@expo/vector-icons';

interface Props {
  iconName: keyof typeof Feather.glyphMap;
  focused: boolean;
  size: number;
  color: string;
  label: string;
  animateKey?: number; // opcional si quieres dispararlo manualmente
}

export default function IconoAnimadoConTexto({
  iconName,
  focused,
  size,
  color,
  label,
  animateKey,
}: Props) {
  const rotate = useSharedValue(0);
  const scale = useSharedValue(1);
  const translateY = useSharedValue(0);

  useEffect(() => {
    if (focused) {
      rotate.value = withSequence(
        withTiming(360, { duration: 400, easing: Easing.out(Easing.ease) }),
        withTiming(0, { duration: 0 }) // resetea
      );
      scale.value = withTiming(1.2, { duration: 300 });
      translateY.value = withTiming(-8, { duration: 300 });
    } else {
      scale.value = withTiming(1, { duration: 300 });
      translateY.value = withTiming(0, { duration: 300 });
    }
  }, [focused, animateKey]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { rotate: `${rotate.value}deg` },
      { scale: scale.value },
      { translateY: translateY.value },
    ],
  }));

  return (
    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
      <Animated.View style={animatedStyle}>
        <Feather name={iconName} size={size} color={color} />
      </Animated.View>
      <Text style={{ fontSize: 11, color }}>{label}</Text>
    </View>
  );
}
