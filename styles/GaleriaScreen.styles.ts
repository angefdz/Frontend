import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    paddingTop: 40,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    alignSelf: 'center',
  },
  item: {
    width: '30%',
    aspectRatio: 1,
    backgroundColor: '#f2f2f2',
    marginRight: 10,
    marginBottom: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    padding: 10,
  },
  itemEmoji: {
    fontSize: 40,
  },
  itemText: {
    fontSize: 14,
    marginTop: 5,
    color: '#333',
  },
});
