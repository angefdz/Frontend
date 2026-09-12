import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Animated, FlatList, LayoutAnimation, StyleSheet, View, useWindowDimensions } from 'react-native';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import { move } from '@/utils/pictogramOrder';
import { palette } from '@/constants/Theme';

type Props<T extends { id: number }> = {
  items: T[];
  itemsPerPage: number;
  renderItem: (item: T, size: number) => React.ReactNode;
  onReorder: (items: T[]) => void;
  onDragging: (dragging: boolean) => void;
};

// Used only in authenticated edit mode. Normal communication keeps its original grid.
export default function ReorderablePagedGrid<T extends { id: number }>(props: Props<T>) {
  const { width, height } = useWindowDimensions();
  const { itemsPerPage } = props;
  const cols = Math.ceil(Math.sqrt(itemsPerPage));
  const rows = Math.ceil(itemsPerPage / cols);
  const size = Math.min((width - 10 * (cols + 1)) / cols, height * 0.6 / rows);
  const cell = size + 10;
  const left = (width - cols * cell) / 2;
  const list = useRef<FlatList<T[]>>(null);
  const page = useRef(0);
  const active = useRef<T | null>(null);
  const [dragging, setDragging] = useState<T | null>(null);
  const point = useRef({ x: 0, y: 0 });
  const offset = useRef(new Animated.ValueXY()).current;
  const latest = useRef(props); latest.current = props;
  const edgeAt = useRef(0);
  const pages = useMemo(() => {
    const result: T[][] = [];
    for (let i = 0; i < props.items.length; i += itemsPerPage) result.push(props.items.slice(i, i + itemsPerPage));
    return result;
  }, [props.items, itemsPerPage]);
  function slot(x: number, y: number) {
    const col = Math.max(0, Math.min(cols - 1, Math.floor((x - left) / cell)));
    const row = Math.max(0, Math.min(rows - 1, Math.floor(y / cell)));
    return Math.min(latest.current.items.length - 1, page.current * itemsPerPage + Math.min(itemsPerPage - 1, row * cols + col));
  }
  function preview(x: number, y: number) {
    if (!active.current) return;
    const items = latest.current.items;
    const from = items.findIndex(item => item.id === active.current!.id);
    const to = slot(x, y);
    if (from >= 0 && to >= 0 && from !== to) {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      const reordered = move(items, from, to);
      latest.current = { ...latest.current, items: reordered };
      latest.current.onReorder(reordered);
    }
  }
  const handlers = useRef({ slot, preview }); handlers.current = { slot, preview };
  useEffect(() => {
    if (!dragging) return;
    const timer = setInterval(() => {
      const { x, y } = point.current;
      const direction = x < 32 ? -1 : x > width - 32 ? 1 : 0;
      const maxPage = Math.ceil(latest.current.items.length / itemsPerPage) - 1;
      if (direction && Date.now() - edgeAt.current > 700) {
        const next = Math.max(0, Math.min(maxPage, page.current + direction));
        if (next !== page.current) {
          page.current = next; edgeAt.current = Date.now();
          list.current?.scrollToOffset({ offset: next * width, animated: true });
          handlers.current.preview(x, y);
        }
      }
    }, 100);
    return () => clearInterval(timer);
  }, [dragging, width, itemsPerPage]);
  useEffect(() => () => latest.current.onDragging(false), []);
  const gesture = useMemo(() => Gesture.Pan().activateAfterLongPress(350).runOnJS(true)
    .onStart(event => {
      if (event.x < left || event.x > left + cols * cell || event.y < 0 || event.y >= rows * cell) return;
      const rawSlot = Math.floor(event.y / cell) * cols + Math.floor((event.x - left) / cell);
      if (rawSlot >= itemsPerPage || page.current * itemsPerPage + rawSlot >= latest.current.items.length) return;
      const item = latest.current.items[handlers.current.slot(event.x, event.y)];
      if (!item) return;
      active.current = item; setDragging(item); latest.current.onDragging(true);
      point.current = { x: event.x, y: event.y }; edgeAt.current = Date.now();
      offset.setValue({ x: event.x - size / 2, y: event.y - size / 2 });
    })
    .onUpdate(event => {
      if (!active.current) return;
      point.current = { x: event.x, y: event.y };
      offset.setValue({ x: event.x - size / 2, y: event.y - size / 2 });
      handlers.current.preview(event.x, event.y);
    })
    .onFinalize(() => { active.current = null; setDragging(null); latest.current.onDragging(false); }),
  [left, cols, cell, rows, itemsPerPage, size, offset]);
  return <GestureHandlerRootView style={{ height: rows * cell }}>
    <GestureDetector gesture={gesture}>
      <View collapsable={false} style={{ flex: 1 }}>
        <FlatList ref={list} horizontal pagingEnabled data={pages} scrollEnabled={!dragging}
          keyExtractor={(_, index) => `page-${index}`} showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={event => { page.current = Math.round(event.nativeEvent.contentOffset.x / width); }}
          getItemLayout={(_, index) => ({ length: width, offset: width * index, index })}
          renderItem={({ item: items }) => <View style={[styles.page, { width, height: rows * cell }]}>
            {Array.from({ length: itemsPerPage }, (_, index) => {
              const item = items[index];
              return <View key={item?.id ?? `empty-${index}`} style={{ width: size, height: size, margin: 5, opacity: item?.id === dragging?.id ? 0.2 : 1 }}>
                {item && <View pointerEvents="none">{props.renderItem(item, size)}</View>}
                {item && <View pointerEvents="none" style={styles.handle} />}
              </View>;
            })}
          </View>} />
        {dragging && <Animated.View pointerEvents="none" style={[styles.ghost, { width: size, height: size, transform: offset.getTranslateTransform() }]}>
          {props.renderItem(dragging, size)}
        </Animated.View>}
      </View>
    </GestureDetector>
  </GestureHandlerRootView>;
}
const styles = StyleSheet.create({
  page: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', alignContent: 'center' },
  handle: { position: 'absolute', top: 6, right: 6, width: 14, height: 5, borderTopWidth: 2, borderBottomWidth: 2, borderColor: palette.primary },
  ghost: { position: 'absolute', left: 0, top: 0, zIndex: 10, opacity: 0.9, elevation: 10, shadowOpacity: 0.3, shadowRadius: 8 },
});
