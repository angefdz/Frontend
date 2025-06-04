import React from 'react';
import { Dimensions, ScrollView, View, ViewStyle } from 'react-native';

interface Item {
  id: number;
  [key: string]: any;
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
  const screenWidth = Dimensions.get('window').width;

  const itemSize = 90 + gap; // asumimos 90px + gap
  const itemsPerRow = Math.floor((screenWidth + gap) / itemSize);
  const totalUsedWidth = itemsPerRow * itemSize - gap;
  const sidePadding = Math.max((screenWidth - totalUsedWidth) / 2, 0);

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View
        style={[
          {
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'flex-start', // ítems alineados a la izquierda
            paddingLeft: sidePadding,     // centrado total del grid
            paddingRight: sidePadding,
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
