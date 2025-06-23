import React from 'react';
import { ScrollView, View, ViewStyle } from 'react-native';

interface Item {
  readonly id: number;
  readonly [key: string]: any;
}

interface Props<T extends Item> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  gap?: number;
  containerStyle?: ViewStyle;
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
