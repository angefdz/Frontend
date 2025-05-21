import { StyleSheet, Text, View } from 'react-native';

export default function Configuracion() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Pantalla de Configuración ⚙️</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    color: '#333',
  },
});
