export type Tense = 'preterite' | 'present' | 'future';

const irregularPast: Record<string, string> = {
  be: 'was', eat: 'ate', drink: 'drank', do: 'did', go: 'went', have: 'had',
  make: 'made', see: 'saw', say: 'said', want: 'wanted', can: 'could', come: 'came',
};

export function conjugateEnglish(verb: string, tense: Tense, personIndex: number) {
  const base = verb.trim().toLowerCase();
  if (tense === 'future') return `will ${base}`;
  if (tense === 'preterite') {
    if (base === 'be') return personIndex === 0 || personIndex === 2 ? 'was' : 'were';
    return irregularPast[base] || (base.endsWith('e') ? `${base}d` : `${base}ed`);
  }
  if (base === 'be') return ['am', 'are', 'is', 'are', 'are', 'are'][personIndex];
  if (base === 'have' && personIndex === 2) return 'has';
  if (personIndex !== 2) return base;
  if (/(s|sh|ch|x|z|o)$/.test(base)) return `${base}es`;
  if (/[^aeiou]y$/.test(base)) return `${base.slice(0, -1)}ies`;
  return `${base}s`;
}
