const ts = require('typescript');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const { test } = require('node:test');
const source = fs.readFileSync(path.join(__dirname, '../../utils/pictogramOrder.ts'), 'utf8');
const exportsObject = {};
vm.runInNewContext(ts.transpile(source, { esModuleInterop: false, module: ts.ModuleKind.CommonJS }), { exports: exportsObject, Map, Set });
const { ordered, mergeVisible, move } = exportsObject;
const plain = x => JSON.parse(JSON.stringify(x));
test('saved ID order survives reload and a new custom pictogram appends', () => {
  const saved = JSON.parse('[3,1,2]');
  assert.deepEqual(plain(ordered([{id:1},{id:4},{id:2},{id:3}], saved)).map(p=>p.id), [3,1,2,4]);
});
test('hidden and other category slots stay fixed when visible items move', () => {
  assert.deepEqual(plain(mergeVisible([1,2,3,4,5], [5,1,3])), [5,2,1,4,3]);
});
test('unhidden pictograms return to persisted slots', () => {
  const order = mergeVisible([1,2,3], [3,1]);
  assert.deepEqual(plain(ordered([{id:1},{id:2},{id:3}],order)).map(p=>p.id), [3,2,1]);
});
test('deletion leaves remaining order unchanged', () => {
  assert.deepEqual(plain(ordered([{id:1},{id:3}], [3,2,1])).map(p=>p.id), [3,1]);
});
test('movement is immutable and supports both directions and page boundaries', () => {
  const original = [1,2,3,4];
  assert.deepEqual(plain(move(original,0,3)), [2,3,4,1]);
  assert.deepEqual(plain(move(original,3,0)), [4,1,2,3]);
  assert.deepEqual(original,[1,2,3,4]);
});
