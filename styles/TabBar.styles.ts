import { Platform, StyleSheet } from 'react-native';
import { palette, radius, shadow } from '../constants/Theme';

export const tabBarStyles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: palette.surface,
    borderRadius: radius.large,
    height: 70,
    paddingBottom: Platform.OS === 'android' ? 10 : 20,
    paddingTop: 10,
    borderTopWidth: 0,
    ...shadow.card,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
