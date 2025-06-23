import React from 'react';
import { ScrollView, Text, TextStyle, View, ViewStyle } from 'react-native';
import ItemClicable from './ItemClicable';

type Item = {
     id: string | number;
     nombre: string;
     imagen: string;
};

type Props = {
  readonly items: Item[];
  readonly gridStyle?: ViewStyle;
  readonly itemStyle?: ViewStyle;
  readonly itemTextStyle?: TextStyle;
  readonly onItemPress: (item: Item) => void;
  readonly error?: string | null;
};

export default function ListaFiltrada({
  items,
  gridStyle,
  itemStyle,
  itemTextStyle,
  onItemPress,
  error,
}: Props) {
  if (error) {
    return <Text style={{ color: 'red', marginTop: 20 }}>{error}</Text>;
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={{ alignItems: 'flex-start' }}>
        <View style={gridStyle}>
          {items.map((item) => (
            <ItemClicable
              key={item.id}
              nombre={item.nombre}
              imagen={item.imagen}
              itemStyle={itemStyle}
              textStyle={itemTextStyle}
              onPress={() => onItemPress(item)}
            />
          ))}
        </View>
      </View>
    </ScrollView>
  );
}
