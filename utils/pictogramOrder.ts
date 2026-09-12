export function ordered<T extends { id: number }>(items: T[], ids: number[]): T[] {
  const rank = new Map(ids.map((id, i) => [id, i]));
  return [...items].sort((a, b) => (rank.get(a.id) ?? Infinity) - (rank.get(b.id) ?? Infinity) || a.id - b.id);
}

// Replace only the visible slots: hidden items and other categories retain their slots.
export function mergeVisible(all: number[], visible: number[]): number[] {
  const selected = new Set(visible);
  let index = 0;
  return all.map(id => selected.has(id) ? visible[index++] : id);
}
export function move<T>(items: T[], from: number, to: number): T[] {
  const result = [...items];
  const [item] = result.splice(from, 1);
  result.splice(to, 0, item);
  return result;
}
