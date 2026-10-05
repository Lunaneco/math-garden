/** Isolated game runtime for garden progression QA. Never reads real saves. */
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import {fileURLToPath} from 'node:url';
export const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const frozenAppSource=fs.readFileSync(path.join(root,'app.js'),'utf8');
const placementPath=path.join(root,'placement.js');
const frozenPlacementSource=fs.existsSync(placementPath)?fs.readFileSync(placementPath,'utf8'):null;
export const clone=value=>JSON.parse(JSON.stringify(value));
export const same=(left,right)=>JSON.stringify(left)===JSON.stringify(right);
export const key='math-garden-prototype-state-v2-qa';

export function runtime(initial,extraNames=[]){
  const source=frozenAppSource;
  const elements=new Map(),storage=new Map(),listeners=new Map();
  if(initial)storage.set(key,JSON.stringify(initial));
  const element=()=>({innerHTML:'',textContent:'',className:'',value:'',disabled:false,dataset:{},
    style:{setProperty(){},removeProperty(){}},classList:{add(){},remove(){},toggle(){},contains(){return false;}},
    append(){},appendChild(){},remove(){},focus(){},scrollIntoView(){},scrollTo(){},setAttribute(){},getAttribute(){return null;},
    querySelector(){return null;},querySelectorAll(){return[];},getBoundingClientRect(){return{left:0,top:0,right:1180,bottom:820,width:1180,height:820};}});
  const window={location:{search:'?qa=1',protocol:'http:'},confirm(){return true;},setTimeout(){return 0;},clearTimeout(){},
    requestAnimationFrame(fn){fn();return 0;},cancelAnimationFrame(){},matchMedia(){return{matches:true};},
    innerWidth:1180,innerHeight:820,speechSynthesis:{cancel(){},speak(){}}};
  const document={querySelector(selector){if(!elements.has(selector))elements.set(selector,element());return elements.get(selector);},
    querySelectorAll(){return[];},createElement:element,addEventListener(event,listener){listeners.set(event,listener);}};
  const sandbox={console:{log(){},warn(){},error(){},debug(){}},document,window,
    localStorage:{getItem(k){return storage.get(k)||null;},setItem(k,v){storage.set(k,v);},removeItem(k){storage.delete(k);}},
    Date,Math,JSON,Object,Array,Map,Set,String,Number,Boolean,RegExp,Error,
    SpeechSynthesisUtterance:function(text){this.text=text;},setTimeout:window.setTimeout,clearTimeout:window.clearTimeout};
  sandbox.globalThis=sandbox;vm.createContext(sandbox);
  if(frozenPlacementSource)vm.runInContext(frozenPlacementSource,sandbox);
  const names=[...new Set(['ALL_STAGES','WORLDS','GARDEN_GROWTH_DEFS','GARDEN_DECOR_SHOP','GARDEN_FINAL_DECOR',
    'createInitialState','withDerivedState','normaliseCompletedStages','normaliseGardenState','completedStageCount','allStagesCleared','gardenMapSize',
    'islandObjects','tileSprite','renderIslandBoard','renderIsland','renderResult','collectTree','harvestGarden','visitIslandPlace',
    'buyGardenDecor','expandGardenMap','exchangeAtelierGarden','startStage','nextQuestion','finishStage','submitAnswer','unlockGardenGrowth',
    'saveState','loadState','setScreen','openHelpPicker',...extraNames])];
  for(const name of names)if(!/^[A-Za-z_][A-Za-z_0-9]*$/.test(name))throw Error(`Invalid export: ${name}`);
  const expose=names.map(name=>`${name}:typeof ${name}==='undefined'?undefined:${name}`).join(',');
  vm.runInContext(source+`\n;globalThis.__gardenAudit={${expose},getState:()=>state,getView:()=>view,replaceState:snapshot=>(state=withDerivedState(snapshot)),replaceRaw:snapshot=>(state=snapshot),replaceView:partial=>Object.assign(view,partial),reload:()=>(state=loadState())};`,sandbox,{filename:'app.js'});
  const qa=sandbox.__gardenAudit;
  qa.act=(action,data={})=>listeners.get('click')?.({target:{closest(){return{disabled:false,dataset:{action,...data},getAttribute(){return null;}};}}});
  qa.saved=()=>JSON.parse(storage.get(key)||'null');
  qa.html=()=>elements.get('#screen')?.innerHTML||'';
  qa.source=source;
  return qa;
}

export function completedRecords(stages,times=1){
  return Object.fromEntries(stages.map((stage,index)=>[stage.id,{stars:index%3+1,times,completedAt:'2026-10-05T00:00:00.000Z'}]));
}
