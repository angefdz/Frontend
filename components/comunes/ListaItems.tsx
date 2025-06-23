import React from 'react';
import { ScrollView, View, ViewStyle } from 'react-native';

interface Item {
   id: number;
   [key: string]: any;
}

interface Props<T extends Item> {
  readonly items: T[];
  readonly renderItem: (item: T) => React.ReactNode;
  readonly gap?: number;
  readonly containerStyle?: ViewStyle;
}

export default function ListaItems<T extends Item>({
  items,
  renderItem,
  gap = 10,
  containerStyle,
}: Props<T>) {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View
        style={[
          {
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'flex-start', // Alineación a la izquierda
            rowGap: gap,
            columnGap: gap,
            paddingBottom: 24,
          },
          containerStyle,
        ]}
      >
        {items.map((item) => renderItem(item))}
      </View>
    </ScrollView>
  );
}
