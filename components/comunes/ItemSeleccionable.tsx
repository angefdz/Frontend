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
      accessible={true}
      accessibilityRole="checkbox"
      accessibilityState={{ checked: seleccionado }}
      accessibilityLabel={nombre}
      accessibilityHint={`Presiona para ${seleccionado ? 'deseleccionar' : 'seleccionar'} este pictograma`}
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
          itemStyle,
          {
            backgroundColor: seleccionado ? '#007AFF' : '#eee',
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
          accessibilityElementsHidden={true}
          importantForAccessibility="no"
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
          allowFontScaling={true}
        >
          {nombre}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

export default React.memo(ItemSeleccionable);
