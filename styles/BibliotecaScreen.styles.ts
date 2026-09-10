
import { Dimensions, StyleSheet } from 'react-native';
import { palette, radius, shadow } from '../constants/Theme';

const { width } = Dimensions.get('window');
const itemSize = (width - 20 * 2 - 10 * 3) / 4;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: width * 0.05,
    paddingTop: width * 0.08,
    backgroundColor: palette.background,
  },

sectionTitle: {
  fontSize: width * 0.055,
  fontWeight: 'bold',
  color: palette.text,
  marginBottom: width * 0.03,
},
sectionHeader: {
  flexDirection: 'row',
  alignItems: 'center', 
  justifyContent: 'space-between',
  paddingTop: 20,
  paddingBottom: 10,
},

addButton: {
  fontSize: width * 0.07,            
  color: palette.primary,
  fontWeight: 'bold',
  marginLeft: 10,
  minHeight: width * 0.12,           
  minWidth: width * 0.12,      
  textAlign: 'center',
  textAlignVertical: 'center',
},
  horizontalRow: {
    flexDirection: 'row',
    marginBottom: 10,
    gap: 10,
  },
  item: {
    width: itemSize,
    height: itemSize,
    backgroundColor: palette.surface,
    borderRadius: radius.medium,
    borderWidth: 1,
    borderColor: palette.border,
    ...shadow.card,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 48,
    minWidth: 48,
  },
  itemEmoji: {
    fontSize: itemSize * 0.4,
    marginBottom: 5,
    textAlign: 'center',
  },
  itemText: {
    fontSize: itemSize * 0.14, 
    color: palette.text,
    fontWeight: '600',
    textAlign: 'center',
  },
  
  verMasButton: {
    marginTop: 10,
    marginBottom: 10,
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: palette.primary,
    borderRadius: radius.pill,
    alignSelf: 'flex-start',
    minHeight: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  verMasText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: width * 0.04, 

  },
  input: {
    borderWidth: 1,
    borderColor: palette.border,
    borderRadius: radius.medium,
    padding: 12,
    fontSize: width * 0.04, 

    marginBottom: 15,
    backgroundColor: palette.surface,
    minHeight: 48,
    color: palette.text,
  },
  dropdown: {
    borderColor: palette.border,
    borderRadius: radius.medium,
    paddingHorizontal: 12,
    backgroundColor: palette.surface,
    marginBottom: 15,
    zIndex: 10,
  },
  dropdownContainer: {
    borderColor: palette.border,
    borderRadius: radius.medium,
    zIndex: 1000,
  },
  dropdownText: {
    fontSize: 16,
    color: palette.text,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    gap: 10,
  },
  flat: {
    paddingHorizontal: width * 0.05,
    paddingBottom: width * 0.06,
    gap: 10,
  },
  
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: width * 0.025,
    marginHorizontal: width * 0.05,
  },
  
});
