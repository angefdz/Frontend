import { Feather } from '@expo/vector-icons';
import { Text, TouchableOpacity, View } from 'react-native';
import { pictogramas } from '../../data/pictogramas';
import { useFrase } from '../../hooks/frase/useFrase';
import { styles } from '../../styles/InicioScreen.styles';

export default function PantallaPrincipal() {
  const {
    frase,
    sugerencia,
    añadirPictograma,
    borrarUltimo,
    resetearFrase,
    reproducirFrase,
    usarSugerencia,
  } = useFrase();

  return (
    <View style={styles.container}>
      {/* Frase construida */}
      <View style={styles.fraseContainer}>
        {frase.map((palabra, index) => (
          <Text key={index} style={styles.pictogramaFrase}>
            {palabra}
          </Text>
        ))}
      </View>

      {/* Botones de acción */}
      <View style={styles.botonesFrase}>
        <TouchableOpacity onPress={borrarUltimo} style={styles.botonIcono}>
          <Feather name="delete" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={resetearFrase} style={styles.botonIcono}>
          <Feather name="rotate-ccw" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={reproducirFrase} style={styles.botonIcono}>
          <Feather name="volume-2" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Pictograma sugerido */}
      {sugerencia && (
        <TouchableOpacity
          onPress={usarSugerencia}
          style={[styles.pictograma, { alignSelf: 'center', marginBottom: 20 }]}
        >
          <Text style={styles.pictogramaEmoji}>
  {typeof sugerencia === 'string'
    ? pictogramas.find(p => p.palabra === sugerencia)?.imagen ?? ''
    : ''}
</Text>

        </TouchableOpacity>
      )}

      {/* Teclado de pictogramas */}
      <View style={styles.grid}>
        {pictogramas.map((p) => (
          <TouchableOpacity
            key={p.id}
            style={styles.pictograma}
            onPress={() => añadirPictograma(p.palabra)}
          >
            <Text style={styles.pictogramaEmoji}>{p.imagen}</Text>
            <Text style={styles.pictogramaTexto}>{p.palabra}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
