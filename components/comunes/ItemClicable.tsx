// components/biblioteca/shared/ItemClicable.tsx

import { Image, StyleSheet, Text, TextStyle, TouchableOpacity, ViewStyle } from 'react-native';

type Props = {
  nombre: string;
  imagen: string;
  onPress?: () => void;
  itemStyle?: ViewStyle;
  textStyle?: TextStyle;
};

export default function ItemClicable({
  nombre,
  imagen,
  onPress,
  itemStyle,
  textStyle,
}: Props) {
  return (
    <TouchableOpacity style={[styles.item, itemStyle]} onPress={onPress} accessible
    accessibilityRole="button"
    accessibilityLabel={`Elemento ${nombre}`}>
      <Image
        source={{ uri: imagen }}
        style={styles.imagen}
        resizeMode="contain"
      />
      <Text style={[styles.texto, textStyle]} 
      numberOfLines={2}             // ← permite una línea extra si el texto crece
      allowFontScaling={true}       // ← asegura que respete el ajuste del sistema
      adjustsFontSizeToFit={false}>
        {nombre}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  item: {
    width: 80,
    aspectRatio: 1,      // Para que la altura sea igual al ancho y sea cuadrado
    marginRight: 8,      // Añadido margen derecho para separar items horizontalmente
    marginBottom: 8,     // Añadido margen inferior para separar verticalmente
    alignItems: 'center',
    justifyContent: 'center',
  },
  imagen: {
    width: 60,
    height: 60,
    borderRadius: 10,
  },
  texto: {
    fontSize: 12,
    textAlign: 'center',
    marginTop: 4,
  },
});

