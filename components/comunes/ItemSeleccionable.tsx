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
    <TouchableOpacity onPress={onPress} accessibilityLabel={`${seleccionado ? 'Seleccionado' : 'No seleccionado'}: ${nombre}`
    
   }
   
    accessibilityRole="checkbox"
    accessible>
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
