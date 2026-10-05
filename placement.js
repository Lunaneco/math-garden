/* Local, low-pressure placement. Diagnostic evidence is separate from ordinary play. */
(function (global) {
  'use strict';
  const DOMAINS = [
    { id: 'number', name: 'かずのおみせ', icon: '🧺', parent: '数と計算', probes: [ ['w0-count-3','w0-compare-3'], ['w1-count100-3','w1-add-3'], ['w2-place-value','w2-multiplication'], ['w2-division','w3-decimal'], ['w4-decimal-calc','w4-fraction-calc'], ['w5-fraction-common','w5-percent'], ['w6-fraction-muldiv','w6-ratio'] ] },
    { id: 'space', name: 'かたちのこうぼう', icon: '🎀', parent: '図形', probes: [ ['w0-shape-2','w0-shape-3'], ['w1-shape-3','w1-solid-shadow'], ['w2-rectangle','w2-rectangle'], ['w3-circle','w3-circle'], ['w4-angle','w4-parallel'], ['w5-congruence','w5-shape-area'], ['w6-symmetry','w6-scale'] ] },
    { id: 'measure', name: 'ぴったりのアトリエ', icon: '🧵', parent: '量と測定', probes: [ ['w0-size-2','w0-order-2'], ['w1-clock-2','w1-capacity-potion'], ['w2-money','w2-units'], ['w3-time','w3-time'], ['w4-area','w4-area'], ['w4-volume','w5-circle'], ['w6-prism','w6-prism'] ] },
    { id: 'data', name: 'シールのギャラリー', icon: '🌷', parent: 'データ', probes: [ ['w0-compare-2','w1-picture-graph'], ['w1-picture-graph','w1-picture-graph'], ['w2-data','w2-data'], ['w3-bargraph','w3-bargraph'], ['w4-linegraph','w4-linegraph'], ['w5-average','w5-average'], ['w6-data','w6-probability'] ] }
  ];
  const PREREQUISITES = {
    'w2-multiplication':['w1-add-3','w1-count100-3'], 'w2-division':['w2-multiplication'],
    'w3-division-remainder':['w2-division'], 'w3-decimal':['w1-count100-3'], 'w3-fraction':['w2-fraction'],
    'w4-decimal-calc':['w3-decimal'], 'w4-fraction-calc':['w3-fraction'], 'w4-area':['w2-rectangle','w2-multiplication'],
    'w5-fraction-common':['w4-fraction-calc','w2-multiplication'], 'w5-percent':['w3-decimal','w2-division'],
    'w5-unit-rate':['w2-division'], 'w5-shape-area':['w4-area'], 'w4-volume':['w4-area'], 'w5-circle':['w3-circle'],
    'w6-fraction-muldiv':['w5-fraction-common','w2-division'], 'w6-ratio':['w5-unit-rate'],
    'w6-proportion':['w6-ratio'], 'w6-scale':['w6-ratio','w5-congruence'], 'w6-prism':['w4-volume'],
    'w5-average':['w3-bargraph','w2-division'], 'w6-data':['w5-average']
  };
  const PHASES = {
    foundation: ['material-hunt','picture-read','equation-console','compare-cards','build-station'],
    practice: ['repair-lab','route-choice','reverse-puzzle','reason-clue','story-mission'],
    challenge: ['challenge-lab','remix-studio','skill-check','estimate-check','garden-finale']
  };
  let deps = null;
  let generating = false;
  const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const integer = (v, fallback, min, max) => Number.isFinite(Number(v)) ? Math.max(min,Math.min(max,Math.floor(Number(v)))) : fallback;
  const clone = (v) => { try { return JSON.parse(JSON.stringify(v)); } catch (_) { return null; } };
  function questionFingerprint(question) {
    const body={...question};delete body.placementFingerprint;
    const text=JSON.stringify(body);let hash=2166136261;
    for(let i=0;i<text.length;i++){hash^=text.charCodeAt(i);hash=Math.imul(hash,16777619);}
    return (hash>>>0).toString(16);
  }
  const validStage = (id) => typeof id === 'string' && /^w[0-6]-[a-z0-9-]+$/.test(id) && (!deps || deps.ALL_STAGES.some((s) => s.id === id));
  const sampleIndependent = (x) => x.correct === true && x.independent === true && x.hintUsed !== true && x.skipped !== true;
  const probeStage = (domain,band,id) => DOMAINS.find(d=>d.id===domain)?.probes[band]?.includes(id)===true;
  function normaliseDomains(raw) {
    const domains = {};
    for (const d of DOMAINS) {
      const original = raw?.[d.id] || {}, seen = new Set();
      const samples = (Array.isArray(original.samples) ? original.samples : []).filter((x) => {
        if (!x || typeof x !== 'object' || !validStage(x.stageId) || !probeStage(d.id,x.band,x.stageId)) return false;
        const probe = integer(x.probe,0,0,6); if (seen.has(probe)) return false; seen.add(probe); return true;
      }).slice(0,7).map((x) => ({
        band: integer(x.band,0,0,6), stageId:x.stageId, probe:integer(x.probe,0,0,6), variant:integer(x.variant,0,0,1), correct:x.correct===true && x.skipped!==true,
        independent:sampleIndependent(x), skipped:x.skipped===true, hintUsed:x.hintUsed===true
      }));
      domains[d.id] = { samples, confirmedBand:confirmedBand(samples), complete:original.complete===true && samples.length>=2, recommendation:validStage(original.recommendation) ? original.recommendation : null };
    }
    return domains;
  }
  function normalise(raw) {
    const s = raw && typeof raw === 'object' && !Array.isArray(raw) ? raw : {};
    const age = s.age === null || s.age === undefined ? null : integer(s.age, null, 5, 12);
    const domains = normaliseDomains(s.domains);
    const skills = {};
    for (const [id,original] of Object.entries(s.skills && typeof s.skills === 'object' ? s.skills : {})) {
      if (!validStage(id) || !original || typeof original !== 'object') continue;
      const recent = (Array.isArray(original.recent) ? original.recent : []).slice(-5).map((x) => ({ correct:x?.correct===true, independent:sampleIndependent(x||{}), hintUsed:x?.hintUsed===true }));
      skills[id] = { recent, phase:phaseFor(recent), completed:integer(original.completed,0,0,100000), recommendation:validStage(original.recommendation) ? original.recommendation : null, lastSessionKey:typeof original.lastSessionKey==='string'?original.lastSessionKey.slice(0,4096):'' };
    }
    const currentMatches = s.current && probeStage(s.current.domain,s.current.band,s.current.stageId)&&validStage(s.current.stageId);
    const current = s.current && DOMAINS.some((d) => d.id === s.current.domain) ? {
      domain:s.current.domain, band:integer(s.current.band,0,0,6), probe:integer(s.current.probe,0,0,6), variant:integer(s.current.variant,0,0,1),
      stageId:currentMatches ? s.current.stageId : DOMAINS.find(d=>d.id===s.current.domain).probes[integer(s.current.band,0,0,6)][integer(s.current.variant,0,0,1)], seed:integer(s.current.seed,1,0,999999),
      hintUsed:s.current.hintUsed === true, answered:s.current.answered === true,
      outcome:['correct','supported','unknown'].includes(s.current.outcome) ? s.current.outcome : null,
      question:currentMatches&&safeQuestion(s.current.question) ? clone(s.current.question) : null
    } : null;
    const phase = ['idle','testing','paused','complete'].includes(s.phase) ? s.phase : 'idle';
    if(current?.question&&deps?.refreshQuestionHints){
      current.question=deps.refreshQuestionHints(current.question);
      current.question.placementFingerprint=questionFingerprint(current.question);
    }
    return { version:1, age, run:integer(s.run,0,0,100000), phase:phase==='complete'&&!DOMAINS.every(d=>domains[d.id].complete)?'idle':phase,
      domains, skills, current, domainIndex:integer(s.domainIndex,0,0,4), previousResult:s.previousResult&&typeof s.previousResult==='object'?{domains:normaliseDomains(s.previousResult.domains),completedAt:typeof s.previousResult.completedAt==='string'?s.previousResult.completedAt:''}:null,
      completedAt:typeof s.completedAt === 'string' ? s.completedAt : '', preferredDomain:DOMAINS.some(d=>d.id===s.preferredDomain) ? s.preferredDomain : 'number' };
  }
  function confirmedBand(samples) {
    // A success in fractions is not evidence for a different, lower-band unit.
    // Only repeated independent evidence at the same representative boundary counts.
    const counts = new Map();
    for (const x of samples.filter(sampleIndependent)) counts.set(x.band,(counts.get(x.band)||0)+1);
    const bands=[...counts].filter(([,n])=>n>=2).map(([band])=>band);
    return bands.length?Math.max(...bands):null;
  }
  function safeQuestion(q) {
    if (!q || q.isPlacement!==true || typeof q.prompt!=='string' || q.answer===undefined) return false;
    if(typeof q.placementFingerprint!=='string'||q.placementFingerprint!==questionFingerprint(q))return false;
    if (q.mode==='compare') return Number.isFinite(q.groups?.left)&&Number.isFinite(q.groups?.right);
    if (q.mode==='order') return Number.isInteger(q.total)&&q.total>0&&q.total<=16;
    return ['curriculum','count','shape','size','pattern','number','add','subtract','clock','length'].includes(q.mode)&&Array.isArray(q.options)&&q.options.length>=2&&q.options.length<=32;
  }
  function phaseFor(recent) {
    if (recent.length < 4) return 'foundation';
    const score=recent.filter(x=>x.independent).length;
    return score>=4 ? 'challenge' : score<=2 ? 'foundation' : 'practice';
  }
  const get = () => normalise(deps?.getState()?.placement);
  function put(s, redraw=true) {
    if (!deps) return;
    deps.getState().placement=normalise(s); deps.saveState(); if(redraw)deps.render();
  }
  function install(adapter) { deps=adapter; deps.getState().placement=normalise(deps.getState().placement); return api; }
  const bandForAge = (age) => Math.max(0,Math.min(6,Number(age)-6));
  function stageFor(domain,band,probe=0) {
    const d=DOMAINS.find(x=>x.id===domain)||DOMAINS[0];
    const wanted=d.probes[integer(band,0,0,6)];
    return deps?.ALL_STAGES.find(s=>s.id===wanted[probe%wanted.length]) || deps?.ALL_STAGES.find(s=>s.id===wanted[0]);
  }
  function makeQuestion(descriptor) {
    const stage=deps.ALL_STAGES.find(s=>s.id===descriptor.stageId)||stageFor(descriptor.domain,descriptor.band,descriptor.variant);
    const templates=deps.BANK_TEMPLATE_META||[];
    const template=templates.find(t=>t.id===(descriptor.variant ? 'picture-read':'material-hunt'));
    let q; const learning=clone(deps.getState().learning);
    generating=true;
    try {
      // Ordinary effectiveStage() lazily creates a skill profile. Keep that
      // diagnostic read isolated, and assess the stated stage without an old offset.
      const profile=deps.getState().learning?.bySkill?.[stage.areaId];if(profile)profile.levelOffset=0;
      q=clone(deps.generateQuestion(stage,descriptor.variant,descriptor.seed,template ? {template,questionSeed:descriptor.seed,cpaPhase:0,cpaPhaseId:'concrete'} : null));
    } finally { if(learning)deps.getState().learning=learning;generating=false; }
    if (!q) throw new Error('おためし問題をつくれませんでした。');
    q.solved=false;q.lastAnswer=null;q.isPlacement=true;delete q.soundLayer;delete q.soundGame;
    if (q.mode==='curriculum') { q.inputPattern='direct-choice';q.inputMethod='direct-choice';q.answerInstruction='ぴったりのカードをえらぼう。'; }
    else {
      delete q.responseType;
      if (q.mode==='count') {
        q.responseType='number-choice';q.total=Number(q.answer);q.visual=q.sceneVisual||q.visual;
        const answer=Number(q.answer), candidates=[answer,Math.max(0,answer-1),answer+1,answer+2,answer+3];
        q.options=[...new Set(candidates)].slice(0,4);
        const offset=descriptor.seed%q.options.length;q.options=q.options.slice(offset).concat(q.options.slice(0,offset));
        q.prompt=`${q.visual.name}は いくつ？`;q.subPrompt='ひとつずつかぞえて、カードをえらぼう。';
      }
      if (q.mode==='compare') {
        q.answer=q.groups.left===q.groups.right?'same':q.groups.left>q.groups.right?'left':'right';
        q.allowSame=q.groups.left===q.groups.right;
        q.prompt=`${q.sceneVisual?.name||q.visual?.name||'もの'}が おおいのは どっち？`;
        q.subPrompt='ひだりと みぎをくらべて、カードをえらぼう。おなじときは「おなじ」。';
        q.hints=['ひとつずつペアにして、のこる方をみつけよう。'];
        delete q.answerKey;
      }
      if (q.mode==='pattern' && Array.isArray(q.answer)) q.answer=q.answer[0];
      if (q.mode==='size' && Array.isArray(q.answer)) {q.answer=q.options.reduce((best,x,i)=>x.scale>q.options[best].scale?i:best,0);q.prompt=`いちばん おおきい ${q.sceneVisual?.name||'もの'}はどれ？`;}
      if (q.mode==='clock') {q.prompt='とけいは なんじ？';q.subPrompt='ながいはりと、みじかいはりをみよう。';}
    }
    q.audioScript=`${q.prompt} ${q.subPrompt||''}`;
    q.placementFingerprint=questionFingerprint(q);
    return q;
  }
  function prepare(s,domain,band,probe) {
    const variant=s.domains[domain].samples.filter(x=>x.band===band).length%2;
    const stage=stageFor(domain,band,variant);
    if(!stage)throw new Error(`おためしの入口が見つかりません: ${domain}/${band}`);
    s.current={domain,band,probe,variant,stageId:stage.id,seed:(s.run*137+DOMAINS.findIndex(d=>d.id===domain)*47+probe*31+band*13)%999983,hintUsed:false,answered:false,outcome:null,question:null};
    s.current.question=makeQuestion(s.current);s.phase='testing';
  }
  function begin() {
    const s=get();if(s.age===null)return;
    s.previousResult=s.phase==='complete'?{domains:clone(s.domains),completedAt:s.completedAt}:s.previousResult;
    s.run+=1;s.domainIndex=0;s.domains=normalise({}).domains;s.completedAt='';prepare(s,DOMAINS[0].id,bandForAge(s.age),0);put(s);
  }
  function submit(value,skipped=false) {
    const s=get(), c=s.current;if(s.phase!=='testing'||!c||c.answered)return;
    if (!c.question) c.question=makeQuestion(c);
    const correct=!skipped&&deps.isCorrect(c.question,value);
    const sample={band:c.band,stageId:c.stageId,probe:c.probe,variant:c.variant,correct,independent:correct&&!c.hintUsed,skipped,hintUsed:c.hintUsed};
    s.domains[c.domain].samples.push(sample);s.domains[c.domain].confirmedBand=confirmedBand(s.domains[c.domain].samples);
    c.answered=true;c.outcome=!correct?'unknown':sample.independent?'correct':'supported';put(s);
  }
  function advance() {
    const s=get(),c=s.current;if(!c?.answered)return;
    const d=s.domains[c.domain],samples=d.samples;
    const failed=samples.filter(x=>!x.independent), ceiling=failed.length?Math.min(...failed.map(x=>x.band))-1:6;
    const passed=samples.filter(x=>x.independent&&x.band<=ceiling), floor=passed.length?Math.max(...passed.map(x=>x.band)):-1;
    let nextBand=null;
    if(samples.length<2) nextBand=ceiling<0?0:floor<ceiling?Math.floor((floor+1+ceiling)/2):floor;
    else if(samples.length<7&&ceiling>=0) {
      if(floor<ceiling) nextBand=Math.floor((floor+1+ceiling)/2);
      else if(floor>=0&&samples.filter(x=>x.independent&&x.band===floor).length<2) nextBand=floor;
    }
    if(nextBand!==null){prepare(s,c.domain,nextBand,samples.length);put(s);return;}
    d.complete=true;d.confirmedBand=confirmedBand(samples);d.recommendation=stageFor(c.domain,d.confirmedBand??0,0).id;
    s.domainIndex+=1;
    if(s.domainIndex>=DOMAINS.length) {s.phase='complete';s.current=null;s.completedAt=new Date().toISOString();put(s);return;}
    prepare(s,DOMAINS[s.domainIndex].id,bandForAge(s.age),0);put(s);
  }
  function open() { if(!deps)return; deps.setScreen('placement'); }
  function resume() {const s=get();if(s.current){s.phase='testing';if(!s.current.question)s.current.question=makeQuestion(s.current);put(s,false);}open();}
  function handleAction(action,target) {
    if(!deps)return false;
    const data=target?.dataset||target||{};
    if(action==='placement-open'){open();return true;}
    if(action==='placement-age'){const s=get();s.age=integer(data.age,6,5,12);put(s);return true;}
    if(action==='placement-begin'){begin();return true;}
    if(action==='placement-resume'){resume();return true;}
    if(action==='placement-exit'){const s=get();if(s.phase==='testing')s.phase='paused';put(s,false);deps.stopSpeech?.();deps.setScreen('island');return true;}
    if(action==='placement-answer'&&isOpen()){submit(data.value);return true;}
    if(action==='placement-skip'&&isOpen()){submit(null,true);return true;}
    if(action==='placement-next'){advance();return true;}
    if(action==='placement-hint'){const s=get();if(s.current&&!s.current.answered){s.current.hintUsed=true;put(s);deps.speak?.(s.current.question?.hints?.[0]||'図の手がかりを、ひとつずつみてみよう。');}return true;}
    if(action==='placement-speak'){const c=get().current;deps.speak?.(c?.question?.audioScript||'おともと、おためしのおてがみをみてみよう。');return true;}
    if(action==='placement-play'){const s=get();s.preferredDomain=data.domain||'number';put(s,false);const stage=deps.ALL_STAGES.find(x=>x.id===data.stageId);if(stage)deps.startStage(stage.id);return true;}
    if(action==='placement-retest'){const s=get();if(s.phase==='complete')s.previousResult={domains:clone(s.domains),completedAt:s.completedAt};s.phase='idle';s.current=null;put(s,false);open();return true;}
    return false;
  }
  function isOpen(){return deps?.getView()?.screen==='placement';}
  function domainForStage(stage) {
    if(!stage)return 'number';
    const tested=DOMAINS.find(d=>d.probes.some(ids=>ids.includes(stage.id)));if(tested)return tested.id;
    const mode=stage.mode,renderer=stage.curriculum?.renderer;
    if(stage.curriculum?.strand==='データ')return 'data';
    if(['shape','pattern'].includes(mode)||['geometry','proof'].includes(renderer))return 'space';
    if(['size','order','clock','length'].includes(mode)||['measure','area'].includes(renderer))return 'measure';
    if(renderer==='chart')return 'data';return 'number';
  }
  const stageBand=(stage)=>integer(String(stage?.worldId||'w0').replace('w',''),0,0,6);
  function observeAttempt(stage,question,correct,firstAttempt,hintUsed=false) {
    if(!deps||generating||isOpen()||question?.isPlacement||!stage||!firstAttempt)return;
    const s=get(),id=stage.id,r=s.skills[id]||{recent:[],completed:0,recommendation:null};
    r.recent=[...r.recent,{correct:Boolean(correct),independent:Boolean(correct)&&!hintUsed&&!question?.placementHintUsed,hintUsed:Boolean(hintUsed||question?.placementHintUsed)}].slice(-5);r.phase=phaseFor(r.recent);s.skills[id]=r;put(s,false);
  }
  function observeHint(stage,question){if(question&&!question.isPlacement)question.placementHintUsed=true;}
  function verified(s,id) {
    const r=s.skills[id];return Boolean(r&&r.recent.length>=4&&r.recent.filter(x=>x.independent).length>=4);
  }
  function normalRecommendation(s,stage,score) {
    const sameArea=deps.ALL_STAGES.filter(x=>x.worldId===stage.worldId&&x.areaId===stage.areaId).sort((a,b)=>(a.level||0)-(b.level||0));
    if(stage.mode!=='curriculum') {
      const nextLevel=score>=4?stage.level+1:score<=2?Math.max(1,stage.level-1):stage.level;
      return sameArea.find(x=>x.level===nextLevel)?.id||stage.id;
    }
    const prerequisites=(PREREQUISITES[stage.id]||[]).filter(validStage);
    const weak=prerequisites.find(id=>s.skills[id]?.recent.length>=2&&s.skills[id].recent.filter(x=>x.independent).length/s.skills[id].recent.length<=.5);
    if(weak)return weak;
    if(score<=2)return prerequisites.find(id=>!verified(s,id))||prerequisites[0]||stage.id;
    if(score<4)return stage.id;
    const missing=prerequisites.find(id=>!verified(s,id));if(missing)return missing;
    const domain=domainForStage(stage), band=stageBand(stage);
    const peers=deps.ALL_STAGES.filter(x=>x.mode==='curriculum'&&x.worldId===stage.worldId&&domainForStage(x)===domain&&x.id!==stage.id);
    const peer=peers.find(x=>!verified(s,x.id));if(peer)return peer.id;
    const next=deps.ALL_STAGES.find(x=>x.mode==='curriculum'&&stageBand(x)===Math.min(6,band+1)&&domainForStage(x)===domain&&!verified(s,x.id));
    return next?.id||stage.id;
  }
  function observeCompletion(stage,questions=[],sessionKey='') {
    if(!deps||isOpen()||!stage)return;
    const s=get(),r=s.skills[stage.id];if(!r)return;
    const key=sessionKey||questions.map((q,i)=>`${i}:${q.missionId||q.templateId||''}:${q.questionSeed??''}:${String(q.answer)}`).join('|');
    if(key&&r.lastSessionKey===key)return;r.lastSessionKey=key;
    r.completed+=1;const domain=domainForStage(stage),score=r.recent.filter(x=>x.independent).length;
    if(r.recent.length>=5) {
      r.recommendation=normalRecommendation(s,stage,score);
      s.domains[domain].recommendation=r.recommendation;s.preferredDomain=domain;
      if(s.phase!=='complete'&&s.previousResult)s.previousResult.domains[domain].recommendation=r.recommendation;
    }
    put(s,false);
  }
  function recommendStage(domainId=null) {
    if(!deps)return null;
    const s=get();if(s.phase!=='complete'&&!s.previousResult&&!Object.values(s.skills).some(x=>x.recommendation))return null;
    const source=s.phase==='complete'||!s.previousResult?s.domains:s.previousResult.domains;
    const requested=DOMAINS.some(d=>d.id===domainId)?domainId:s.preferredDomain;
    const d=source[requested]||source.number;
    if(domainId&&s.phase!=='complete'&&!s.previousResult&&!d.recommendation)return null;
    const stage=deps.ALL_STAGES.find(x=>x.id===d.recommendation)||stageFor(requested,d.confirmedBand??0,0);
    return stage?{stage,title:'ぴったりのおてつだい',message:'おためしのおてがみと、最近のおてつだいからえらんだよ。',placement:true}:null;
  }
  function decoratePlan(plan,stage) {
    if(!deps||generating||stage?.mode!=='curriculum')return plan;
    const s=get(),record=s.skills[stage.id];if(!record||record.recent.length<4)return plan;
    const phase=record.phase,flow=PHASES[phase];
    return plan.map((entry,i)=>({...entry,template:(deps.BANK_TEMPLATE_META||[]).find(t=>t.id===flow[i%5])||entry.template}));
  }
  function decorateQuestion(question,stage) {
    if(generating||question?.isPlacement)return question;
    const s=deps?get():null,phase=s?.skills[stage?.id]?.phase||'foundation';
    return {...question,placementSupport:phase==='foundation',placementPhase:phase};
  }
  const companion = () => deps?.renderPetCompanion&&deps?.activePet ? deps.renderPetCompanion(deps.activePet(),{compact:true,showName:false}) : '<span aria-hidden="true">🐱</span>';
  const activityTitle = (stage) => deps.stageActivityContract?.(stage)?.title||stage.game?.title||stage.name;
  function renderEntry() {
    if(!deps)return '';
    const s=get(),paused=s.current&&(s.phase==='testing'||s.phase==='paused');
    return `<section class="placement-entry"><div class="placement-entry-pet">${companion()}</div><div><span class="atelier-kicker">おともと おためし</span><h3>${paused?'おてがみの つづき、みよう':s.phase==='complete'?'ぴったりのお店が みつかったよ':'ぴったりの おてつだいを みつけよう'}</h3><p>${s.phase==='complete'?'遊びながら、ぴったりも少しずつかわるよ。':'４つのお店から、小さなおてがみ。わからないときも だいじょうぶ。'}</p><button class="soft-button" data-action="${paused?'placement-resume':'placement-open'}">${paused?'つづきから':s.phase==='complete'?'ぴったりのお店を みる':'おともと ためしてみる'}</button></div></section>`;
  }
  function renderScreen() {
    const s=get();if(s.phase==='complete')return renderResult(s);
    if((s.phase==='testing'||s.phase==='paused')&&s.current){
      const c=s.current,d=DOMAINS.find(x=>x.id===c.domain);
      if(c.answered)return `<section class="placement-screen placement-thanks"><div class="placement-companion">${companion()}</div><h2>${c.outcome==='correct'?'ぴったり、ありがとう！':'みせてくれて、ありがとう！'}</h2><p>${c.outcome==='correct'?'おともも にこにこ。つぎのおてがみも みてみよう。':'まだあそんでいないことも、だいじょうぶ。ぴったりのところを さがそう。'}</p><button class="primary-button" data-action="placement-next">つぎの おてがみ</button><button class="text-button" data-action="placement-exit">おうちで ひとやすみ</button></section>`;
      if(!c.question){c.question=makeQuestion(c);put(s,false);}
      const q=c.question;
      let body=deps.renderQuestion(q).replace(/data-action="(?:choose-answer|curriculum-pick|sound-answer)"/g,'data-action="placement-answer"');
      return `<section class="placement-screen"><div class="placement-hud"><button class="soft-button" data-action="placement-exit">おうちで ひとやすみ</button><span>${d.icon} ${d.name}</span><button class="soft-button" data-action="placement-speak" aria-label="おてがみをきく">♪ きく</button></div><div class="placement-stops" aria-label="４つのお店">${DOMAINS.map((x,i)=>`<span class="${i<s.domainIndex?'is-done':i===s.domainIndex?'is-current':''}">${x.icon}<b>${x.name}</b>${i<s.domainIndex?'<i aria-label="みたよ">✓</i>':''}</span>`).join('')}</div><div class="placement-request"><div class="placement-companion">${companion()}</div><h2>${esc(q.prompt)}</h2></div><p class="placement-instruction">${esc(q.subPrompt||'ぴったりのカードをえらぼう。')}</p><div class="placement-question">${body}</div>${c.hintUsed?`<p class="placement-hint" role="status">${esc(q.hints?.[0]||'図の手がかりを、ひとつずつみてみよう。')}</p>`:''}<div class="placement-help"><button class="soft-button" data-action="placement-hint" ${c.hintUsed?'disabled':''}>てがかりを きく</button><button class="soft-button" data-action="placement-skip">まだ わからない</button></div></section>`;
    }
    return `<section class="placement-screen placement-welcome"><div class="placement-companion">${companion()}</div><span class="atelier-kicker">おともと おためしのおてがみ</span><h2>ぴったりのお店を<br>いっしょに みつけよう</h2><p>４つのお店から、小さなおてがみ。<br>急がなくて だいじょうぶ。「まだ わからない」もえらべるよ。</p><div class="placement-age"><h3>いま、いくつ？</h3><div role="group" aria-label="年齢。最初のおてがみをえらぶ目安">${Array.from({length:8},(_,i)=>i+5).map(age=>`<button class="${s.age===age?'is-selected':''}" data-action="placement-age" data-age="${age}" aria-pressed="${s.age===age}">${age}<span>さい</span></button>`).join('')}</div></div><p class="placement-age-note">年齢は、最初のおてがみの目安。できることは、ひとりずつちがって だいじょうぶ。</p><div class="action-row"><button class="primary-button" data-action="placement-begin" ${s.age===null?'disabled':''}>おてがみを ひらく</button><button class="soft-button" data-action="placement-exit">おうちへ</button></div></section>`;
  }
  function renderResult(s) {
    return `<section class="placement-screen placement-result"><div class="placement-request"><div class="placement-companion">${companion()}</div><div><span class="atelier-kicker">おてがみ、ありがとう</span><h2>ここから あそんでみよう</h2><p>お店ごとに、ぴったりの入口をみつけたよ。<br>あそびながら、また えらびなおせるよ。</p></div></div><div class="placement-results">${DOMAINS.map(d=>{const r=s.domains[d.id],stage=deps.ALL_STAGES.find(x=>x.id===r.recommendation)||stageFor(d.id,r.confirmedBand??0,0);return `<article><span aria-hidden="true">${d.icon}</span><h3>${d.name}</h3><p>${r.confirmedBand===null?'小さなおてつだいから、いっしょにみよう。':'ちょうどいいおてつだいから、はじめよう。'}</p><strong>${esc(activityTitle(stage))}</strong><button class="primary-button" data-action="placement-play" data-domain="${d.id}" data-stage-id="${stage.id}">ここから あそぶ</button></article>`;}).join('')}</div><div class="action-row"><button class="soft-button" data-action="placement-exit">おうちへ</button><button class="text-button" data-action="placement-retest">もういちど おためし</button></div></section>`;
  }
  function renderParent() {
    if(!deps)return '';
    const s=get(),complete=s.phase==='complete';
    return `<section class="placement-parent"><h3>開始地点のおためしと適応</h3><p>年齢${s.age===null?'：未選択':`：${s.age}歳`}。年齢は初問の目安だけです。通常の学習記録やクリア数を変更せず、分野ごとに同じ段階の異なる代表題で２回以上の自力成功を確かめ、入口を提案します。</p>${complete?`<table><thead><tr><th>分野</th><th>確認した入口</th><th>証拠</th></tr></thead><tbody>${DOMAINS.map(d=>{const r=s.domains[d.id];return `<tr><th>${d.parent}</th><td>${r.confirmedBand===null?'未確認・基礎を提案':r.confirmedBand===0?'具体物の入口':`小${r.confirmedBand}相当の代表題`}</td><td>${r.samples.filter(x=>x.independent&&x.band===r.confirmedBand).length}回の入口確認 / ${r.samples.length}題</td></tr>`;}).join('')}</tbody></table>`:'<p>まだ判定結果はありません。途中の回答は保存され、続きから再開できます。</p>'}<p>通常８〜24題、境界の確認が必要な場合は少し延長します。代表題による暫定的な入口選びで、全単元の習得を確認した結果ではありません。未確認の前提は遊びながら確かめ、直近５題の初回成功・ヒント利用に応じて、具体物や図からの支援、式や活用への挑戦、復習する入口を変えます。時間の速さは評価しません。</p><button class="soft-button" data-action="placement-retest">おためしを やりなおす</button></section>`;
  }
  const api={install,normalise,renderEntry,renderScreen,renderParent,handleAction,recommendStage,domainForStage,observeAttempt,observeHint,observeCompletion,decoratePlan,decorateQuestion,isOpen,getSnapshot:()=>get(),currentQuestion:()=>get().current?.question||null,DOMAINS,PREREQUISITES};
  global.MathGardenPlacement=api;
})(typeof window!=='undefined'?window:globalThis);
