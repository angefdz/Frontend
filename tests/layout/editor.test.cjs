const ts = require('typescript');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const { test } = require('node:test');
// Small hook harness: tests actual async hook behavior with network/native boundaries mocked.
function harness() {
  let state = [], cursor = 0, focus, confirmation;
  const api = { get: async () => ({data:[1,2,3]}), post: async () => ({data:{autorizacion:'grant'}}), put: async (_, body) => ({data:body.ids}) };
  const react = {
    useState(initial) { const i = cursor++; if (!(i in state)) state[i] = initial; return [state[i], v => { state[i] = typeof v === 'function' ? v(state[i]) : v; }]; },
    useRef(initial) { const i=cursor++; if (!(i in state)) state[i]={current:initial}; return state[i]; },
    useCallback: fn => fn,
  };
  const exports = {};
  const modules = {
    react,
    'react-native': { Alert: { alert: (...args) => { confirmation = args[2]; } }, AppState: { addEventListener: () => ({ remove() {} }) } },
    'expo-router/react-navigation': { useFocusEffect: fn => { focus=fn; } },
    axios: { default: api, isAxiosError: err => !!err.response },
    '@/context/AuthContext': { useAuth: () => ({token:'session'}) },
    '@/context/LanguageContext': { useLanguage: () => ({language:'en'}) },
    '@/utils/pictogramOrder': { mergeVisible(all, visible) { let i=0; return all.map(id => visible.includes(id) ? visible[i++] : id); } },
  };
  vm.runInNewContext(ts.transpile(fs.readFileSync(path.join(__dirname,'../../hooks/pantallaPrincipal/useOrdenPictogramas.ts'),'utf8'),{esModuleInterop:false,module:ts.ModuleKind.CommonJS}),{ exports, require: name => modules[name], process:{env:{}} });
  return { api, render() { cursor=0; return exports.useOrdenPictogramas(); }, focus:()=>focus(), confirm:()=>confirmation[1].onPress() };
}
const tick = () => new Promise(resolve => setImmediate(resolve));
async function ready() { const h=harness(); h.render(); h.focus(); await tick(); return h; }
async function authorize(h) { h.render().open(); h.render().setPassword('correct'); await h.render().authenticate(); }
test('normal is default, Edit opens dialog, cancellation and wrong password stay normal', async () => {
  const h=await ready(); assert.equal(h.render().editing,false);
  h.render().reorder([3,2,1]); assert.deepEqual(Array.from(h.render().ids),[1,2,3]);
  h.render().open(); assert.equal(h.render().dialog,true);
  h.render().cancelDialog(); assert.equal(h.render().editing,false);
  h.api.post=async()=>{throw Error('wrong')}; await authorize(h);
  assert.equal(h.render().editing,false); assert.ok(h.render().error);
});
test('successful authentication enables editing and Done persists before restoring normal', async () => {
  const h=await ready(); await authorize(h); assert.equal(h.render().editing,true);
  h.render().reorder([3,1]); assert.deepEqual(Array.from(h.render().ids),[3,2,1]);
  let sent; h.api.put=async(_,body)=>{sent=body;return {data:body.ids}};
  await h.render().done(); assert.equal(h.render().editing,false); assert.equal(sent.autorizacion,'grant');
  assert.deepEqual(Array.from(sent.ids),[3,2,1]); assert.equal(h.render().password,'');
});
test('a late successful authentication cannot reopen a cancelled editor', async () => {
  const h=await ready(); let resolve; h.api.post=()=>new Promise(r=>resolve=r);
  h.render().open(); h.render().setPassword('correct'); const pending=h.render().authenticate();
  h.render().cancelDialog(); resolve({data:{autorizacion:'grant'}}); await pending;
  assert.equal(h.render().editing,false);
});
test('failed save keeps edit mode and draft; expired authorization restores saved layout', async () => {
  const h=await ready(); await authorize(h); h.render().reorder([3,2,1]);
  h.api.put=async()=>{throw Error('offline')}; await h.render().done();
  assert.equal(h.render().editing,true); assert.deepEqual(Array.from(h.render().ids),[3,2,1]);
  h.api.put=async()=>{throw {response:{status:403}}}; await h.render().done();
  assert.equal(h.render().editing,false); assert.equal(h.render().dialog,true);
  assert.deepEqual(Array.from(h.render().ids),[1,2,3]);
});
test('reset is admin only and changes only draft order after explicit confirmation', async () => {
  const h=await ready(); h.render().reset(); await authorize(h); h.render().reorder([3,2,1]);
  h.render().reset(); assert.deepEqual(Array.from(h.render().ids),[3,2,1]);
  h.confirm(); assert.deepEqual(Array.from(h.render().ids),[1,2,3]);
});
