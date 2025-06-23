import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface Props {
  readonly titulo: string;
  readonly onAddPress: () => void;
}

export default function CabeceraSeccion({ titulo, onAddPress }: Props) {
  return (
    <View style={styles.sectionHeader}>
      <Text
        style={styles.sectionTitle}
        numberOfLines={2}
        adjustsFontSizeToFit
        allowFontScaling
      >
        {titulo}
      </Text>
      <TouchableOpacity
        onPress={onAddPress}
        accessible
        accessibilityRole="button"
        accessibilityLabel={`Añadir nuevo elemento a ${titulo.toLowerCase()}`}
        style={styles.addButtonContainer}
      >
        <Text style={styles.addButton}>＋</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 10,
    paddingHorizontal: 16,
    gap: 8,
    flexWrap: 'wrap',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1A1A1A',
    flexShrink: 1,
    flex: 1,
  },
  addButtonContainer: {
    padding: 8,
    minHeight: 48,
    minWidth: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButton: {
    fontSize: 28,
    color: '#007AFF',
    fontWeight: 'bold',
  },
});
