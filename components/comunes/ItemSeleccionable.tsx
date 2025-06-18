import React from 'react';
import {
  Image,
  StyleProp,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

type Props = {
  nombre: string;
  imagen: string;
  seleccionado: boolean;
  onPress: () => void;
  itemStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
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
    <TouchableOpacity onPress={onPress}>
      <View
        style={[
          {
            width: 80,
            height: 80,
            borderRadius: 16,
            margin: 5,
            justifyContent: 'center',
            alignItems: 'center',
          },
          itemStyle,
          {
            backgroundColor: seleccionado ? '#007AFF' : '#eee',
          },
        ]}
      >
        <Image
          source={{ uri: imagen }}
          style={{ width: 40, height: 40, marginBottom: 5 }}
          resizeMode="contain"
        />
        <Text style={[{ fontSize: 12, textAlign: 'center' }, textStyle]}>
          {nombre}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

export default React.memo(ItemSeleccionable);
