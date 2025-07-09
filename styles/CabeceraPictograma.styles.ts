import { Dimensions, StyleSheet } from 'react-native';

const { width } = Dimensions.get('window');
const fontSizeResponsive = width * 0.05;
const paddingResponsive = width * 0.025;
export const styles = StyleSheet.create({
  container: {
    marginTop: width * 0.05,
    marginBottom: width * 0.04,
    paddingHorizontal: width * 0.04,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titulo: {
    fontSize: fontSizeResponsive,
    fontWeight: 'bold',
    color: '#1A1A1A',
    flex: 1,
    flexWrap: 'wrap',
  },
  iconos: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  botonIcono: {
    padding: paddingResponsive,
    minWidth: width * 0.12,
    minHeight: width * 0.12,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: width * 0.02, 
  },
});
