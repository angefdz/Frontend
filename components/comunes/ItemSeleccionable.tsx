import React from 'react';
import {
  Dimensions,
  Image,
  StyleProp,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

const { width } = Dimensions.get('window');
const itemSize = width * 0.22;
const imageSize = itemSize * 0.6;
const fontSize = width * 0.04;

type Props = {
  readonly nombre: string;
  readonly imagen: string;
  readonly seleccionado: boolean;
  readonly onPress: () => void;
  readonly itemStyle?: StyleProp<ViewStyle>;
  readonly textStyle?: StyleProp<TextStyle>;
};

function ItemSeleccionable({
  nombre,
  imagen,
  seleccionado,
  onPress,
  itemStyle,
  textStyle,
}: Props) {
  return (
    <TouchableOpacity
      onPress={onPress}
      accessibilityLabel={`${seleccionado ? 'Seleccionado' : 'No seleccionado'}: ${nombre}`}
      accessibilityRole="checkbox"
      accessible
    >
      <View
        style={[
          {
            width: itemSize,
            height: itemSize,
            borderRadius: itemSize * 0.25,
            margin: width * 0.015,
            justifyContent: 'center',
            alignItems: 'center',
          },
          itemStyle, // estilos externos (si hay)
          {
            backgroundColor: seleccionado ? '#007AFF' : '#eee', // se aplica al final para que NO se sobrescriba
          },
        ]}
      >
        <Image
          source={{ uri: imagen }}
          style={{
            width: imageSize,
            height: imageSize,
            marginBottom: itemSize * 0.1,
          }}
          resizeMode="contain"
        />
        <Text
          style={[
            {
              fontSize,
              textAlign: 'center',
              color: seleccionado ? 'white' : '#1A1A1A',
            },
            textStyle,
          ]}
        >
          {nombre}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

export default React.memo(ItemSeleccionable);
