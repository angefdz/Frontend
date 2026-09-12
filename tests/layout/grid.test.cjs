const ts=require('typescript'), fs=require('node:fs'), path=require('node:path'), vm=require('node:vm');
const assert=require('node:assert/strict'); const {test}=require('node:test');
const exportsObject={};
const modules={
  react:{default:{memo:fn=>fn,createElement:(type,props)=>({type,props})},useCallback:fn=>fn},
  'react-native':{useWindowDimensions:()=>({height:800})},
  '@/context/LanguageContext':{useLanguage:()=>({localize:p=>p.nombre})},
  '@/components/pantallaPrincipal/GridItem':{default:'item'},
  '@/components/pantallaPrincipal/GridPaginaHorizontal':{default:'normal-grid'},
  './ReorderablePagedGrid':{default:'edit-grid'},
};
vm.runInNewContext(ts.transpile(fs.readFileSync(path.join(__dirname,'../../components/pantallaPrincipal/GridPictogramas.tsx'),'utf8'),{esModuleInterop:false,module:ts.ModuleKind.CommonJS,jsx:ts.JsxEmit.React}),{exports:exportsObject,require:name=>modules[name]});
const Grid=exportsObject.default;
const picto={id:1,nombre:'water',imagen:'image'};
test('normal grid has no reorder gesture and tap retains communication action',()=>{
  let selected; const grid=Grid({pictogramas:[picto],itemsPerPage:9,onSeleccionar:p=>selected=p});
  assert.equal(grid.type,'normal-grid'); assert.equal(grid.props.onReorder,undefined);
  grid.props.renderItem(picto,100).props.onPress(); assert.equal(selected,picto);
});
test('edit grid enables reorder but cannot activate communication even through accessibility',()=>{
  let selected=false, order; const grid=Grid({pictogramas:[picto],itemsPerPage:9,onSeleccionar:()=>selected=true,editing:true,onReorder:ids=>order=ids,onDragging:()=>{}});
  assert.equal(grid.type,'edit-grid');
  grid.props.renderItem(picto,100).props.onPress(); assert.equal(selected,false);
  grid.props.onReorder([{id:2},picto]); assert.deepEqual(Array.from(order),[2,1]);
});
