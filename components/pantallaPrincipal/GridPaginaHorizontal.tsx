import React from 'react';
import { ScrollView, StyleSheet, useWindowDimensions, View } from 'react-native';

type Props<T> = {
  items: (T | null)[]; // acepta elementos nulos
  itemsPerPage: number;
  renderItem: (item: T | null, size: number) => React.ReactNode;
  spacing?: number; // espaciado opcional entre pictogramas
};

export default function GridPaginadoHorizontal<T>({
  items,
  itemsPerPage,
  renderItem,
  spacing = 10,
}: Props<T>) {
  const { width, height } = useWindowDimensions();

  const numCols = Math.ceil(Math.sqrt(itemsPerPage));
  const numRows = Math.ceil(itemsPerPage / numCols);

  const itemWidth = width / numCols;
  const itemHeight = height / numRows;

  const itemSize = Math.min(itemWidth, itemHeight) - spacing;

  return (
    <ScrollView
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      style={{ flex: 1 }}
      contentContainerStyle={styles.scrollContainer}
    >
      {chunkArray(items, itemsPerPage).map((pageItems, pageIndex) => (
        <View key={pageIndex} style={[styles.page, { width }]}>
          {pageItems.map((item, index) => (
            <View
              key={index}
              style={{
                width: itemSize,
                height: itemSize,
                margin: spacing / 2,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              {renderItem(item, itemSize)}
            </View>
          ))}
        </View>
      ))}
    </ScrollView>
  );
}

// Divide el array y rellena con nulls para mantener cuadrículas completas
function chunkArray<T>(array: (T | null)[], size: number): (T | null)[][] {
  const chunks: (T | null)[][] = [];
  for (let i = 0; i < array.length; i += size) {
    const chunk = array.slice(i, i + size);
    while (chunk.length < size) {
      chunk.push(null);
    }
    chunks.push(chunk);
  }
  return chunks;
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  page: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignContent: 'center',
  },
});
