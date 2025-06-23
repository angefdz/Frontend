import React, { useMemo } from 'react';
import {
  FlatList,
  StyleSheet,
  View,
  useWindowDimensions,
} from 'react-native';

type Props<T extends { id?: string | number }> = {
  items: T[];
  itemsPerPage: number;
  renderItem: (item: T | null, size: number) => React.ReactNode;
  spacing?: number;
  availableHeight?: number; // NUEVO
};

function GridPaginadoHorizontalInner<T extends { id?: string | number }>({
  items,
  itemsPerPage,
  renderItem,
  spacing = 10,
  availableHeight,
}: Props<T>) {
  const { width, height: screenHeight } = useWindowDimensions();

  const numCols = Math.ceil(Math.sqrt(itemsPerPage));
  const numRows = Math.ceil(itemsPerPage / numCols);

  const usableHeight = availableHeight ?? screenHeight * 0.6; // ← por defecto usa 60%
  const totalSpacing = spacing * (numCols + 1);
  const itemWidth = (width - totalSpacing) / numCols;
  const itemHeight = usableHeight / numRows;
  const itemSize = Math.min(itemWidth, itemHeight);

  const pages = useMemo(() => chunkArray<T>(items, itemsPerPage), [items, itemsPerPage]);

  return (
    <FlatList
      horizontal
      pagingEnabled
      data={pages}
      keyExtractor={(_, index) => `page-${index}`}
      showsHorizontalScrollIndicator={false}
      extraData={items}
      renderItem={({ item: pageItems }) => (
        <View style={[styles.page, { width }]}>
          {pageItems.map((item, index) => (
            <View
              key={item?.id ?? `empty-${index}`}
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
      )}
    />
  );
}

function chunkArray<T>(array: T[], size: number): (T | null)[][] {
  const chunks: (T | null)[][] = [];
  for (let i = 0; i < array.length; i += size) {
    const chunk: (T | null)[] = array.slice(i, i + size);
    while (chunk.length < size) {
      chunk.push(null);
    }
    chunks.push(chunk);
  }
  return chunks;
}

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignContent: 'center',
  },
});

const GridPaginadoHorizontal = React.memo(GridPaginadoHorizontalInner) as typeof GridPaginadoHorizontalInner;

export default GridPaginadoHorizontal;
