import React from 'react';
import { ScrollView, View } from 'react-native';

interface Item {
  id: number;
  [key: string]: any;
}

interface Props<T extends Item> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
}

export default function ListaGenerica<T extends Item>({
  items,
  renderItem,
}: Props<T>) {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: 10,
          justifyContent: 'center',  // <-- Aquí el cambio para centrar
        }}
      >
        {items.map(item => (
          <View key={item.id}>
            {renderItem(item)}
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
