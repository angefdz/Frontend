import { Feather } from '@expo/vector-icons';
import React from 'react';
import {
    Dimensions,
    StyleSheet,
    TouchableWithoutFeedback,
    View,
} from 'react-native';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';

const { width } = Dimensions.get('window');
const TAB_WIDTH = width / 3;

const tabs = [
  { name: 'pantalla-principal', icon: 'home', route: '/pantalla-principal' },
  { name: 'biblioteca', icon: 'book', route: '/biblioteca' },
  { name: 'usuario', icon: 'user', route: '/usuario' },
];

interface Props {
  currentTab: string;
  onTabPress: (ruta: string) => void;
}

export default function AnimatedTabBar({ currentTab, onTabPress }: Props) {
  const activeIndex = tabs.findIndex((t) => t.name === currentTab);
  const translateX = useSharedValue(activeIndex * TAB_WIDTH);

  React.useEffect(() => {
    const newIndex = tabs.findIndex((t) => t.name === currentTab);
    translateX.value = withTiming(newIndex * TAB_WIDTH, { duration: 300 });
  }, [currentTab]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.indicator, animatedStyle]} />
      {tabs.map((tab) => {
        const focused = tab.name === currentTab;
        return (
          <TouchableWithoutFeedback
            key={tab.name}
            onPress={() => onTabPress(tab.route)}
          >
            <View style={styles.tab}>
              <Feather
                name={tab.icon as any}
                size={24}
                color={focused ? '#007AFF' : '#999'}
              />
            </View>
          </TouchableWithoutFeedback>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 8,
    height: 60,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  indicator: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: TAB_WIDTH,
    height: 4,
    backgroundColor: '#007AFF',
    borderRadius: 2,
  },
});
