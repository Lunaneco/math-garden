// デイリー・クエストと「できることの地図」を、既存セーブとは別に扱う小さな拡張。
//
// 設計上の約束
// - 1日に求める学習は「5問ほどの1ステージ」だけ（目安5〜10分）。
// - 連続ログイン、連続日数、ランキング、通貨、ランダム報酬は一切持たない。
// - 地図は正答率ではなく「始めた・別の日に戻った・おさらいした」という経験を花の
//   成長として見せる。休んだ日には何も失われない。
// - app.js の state や document 全体には触れない。ホストアプリは明示的にイベントを
//   渡し、このモジュールは固有の localStorage キーだけを使う。

export const DAILY_GROWTH_VERSION = 1;
export const DAILY_GROWTH_STORAGE_KEY = "math-garden-daily-growth-v1";
const MAX_DAYS = 42;
const MAX_AREA_DAYS = 16;

const VISITORS = Object.freeze([
  { id: "bunny", icon: "🐰", name: "るる", line: "おはなの みずやりを みにきたよ。" },
  { id: "cat", icon: "🐱", name: "もも", line: "きょうの ひらめきを ききにきたよ。" },
  { id: "fox", icon: "🦊", name: "そら", line: "ひみつの みちを いっしょに さがそう。" },
  { id: "puppy", icon: "🐶", name: "みんと", line: "できたら ハイタッチしようね。" },
  { id: "bird", icon: "🐦", name: "ぴぴ", line: "にわの おたよりを とどけにきたよ。" }
]);

const QUEST_COPY = Object.freeze({
  new: {
    eyebrow: "きょうの小さなぼうけん",
    title: "あたらしい芽を ひとつ",
    body: "5もんだけ、あたらしいあそびをのぞいてみよう。",
    done: "あたらしい芽が、地図にうまれたよ。"
  },
  review: {
    eyebrow: "きょうの小さなぼうけん",
    title: "ちがう場面で もういちど",
    body: "前に見つけたコツを、ちがう気分でためしてみよう。",
    done: "思い出したコツが、花のつぼみになったよ。"
  },
  revisit: {
    eyebrow: "きょうの小さなぼうけん",
    title: "すきな場所を そだてよう",
    body: "見覚えのあるあそびを、ゆっくりもう一度。",
    done: "なじみの場所に、新しい葉っぱがふえたよ。"
  }
});

const GROWTH_STAGES = Object.freeze([
  { id: "seed", icon: "•", label: "たね", detail: "これから見つけよう" },
  { id: "sprout", icon: "🌱", label: "めがでた", detail: "はじめの一歩をあそんだ" },
  { id: "leaf", icon: "🌿", label: "はっぱ", detail: "べつの日にも会いにきた" },
  { id: "bud", icon: "🌷", label: "つぼみ", detail: "いろいろな場面でためした" },
  { id: "bloom", icon: "🌸", label: "おはな", detail: "前のコツを思い出した" }
]);

function isRecord(value) {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function stringList(value, limit) {
  return Array.isArray(value)
    ? [...new Set(value.filter((item) => typeof item === "string" && item.length > 0))].slice(-limit)
    : [];
}

function finiteNumber(value, fallback = 0) {
  const numeric = Number(value);
  return Number.isFinite(numeric) ? numeric : fallback;
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function hashText(value) {
  let hash = 2166136261;
  for (const character of String(value)) {
    hash ^= character.charCodeAt(0);
    hash = Math.imul(hash, 16777619);
  }
  return Math.abs(hash >>> 0);
}

function stageOrder(stage) {
  return finiteNumber(stage?.order, finiteNumber(stage?.level, 0));
}

function snapshotStages(snapshot) {
  return Array.isArray(snapshot?.stages)
    ? snapshot.stages.filter((stage) => typeof stage?.id === "string" && typeof stage?.areaId === "string")
    : [];
}

function snapshotAreas(snapshot, stages = snapshotStages(snapshot)) {
  const explicit = Array.isArray(snapshot?.areas)
    ? snapshot.areas.filter((area) => typeof area?.id === "string")
    : [];
  if (explicit.length) return explicit;
  return [...new Map(stages.map((stage) => [stage.areaId, {
    id: stage.areaId,
    name: stage.areaName || stage.shortName || stage.areaId,
    shortName: stage.shortName || stage.areaName || stage.areaId,
    worldId: stage.worldId || ""
  }])).values()];
}

function completionRecord(snapshot, stageId) {
  const record = snapshot?.completedStages?.[stageId];
  return isRecord(record) ? record : null;
}

function dateFromCompletion(record) {
  const time = Date.parse(String(record?.completedAt || ""));
  return Number.isFinite(time) ? time : 0;
}

function chooseDeterministic(values, seed) {
  if (!values.length) return null;
  return values[hashText(seed) % values.length];
}

function orderedStages(stages) {
  return [...stages].sort((left, right) => stageOrder(left) - stageOrder(right) || String(left.id).localeCompare(String(right.id), "ja"));
}

function firstUncompletedStage(stages, snapshot) {
  return orderedStages(stages).find((stage) => !completionRecord(snapshot, stage.id)) || null;
}

function latestCompletedStage(stages, snapshot) {
  return orderedStages(stages)
    .filter((stage) => completionRecord(snapshot, stage.id))
    .sort((left, right) => dateFromCompletion(completionRecord(snapshot, left.id)) - dateFromCompletion(completionRecord(snapshot, right.id)) || stageOrder(left) - stageOrder(right))[0] || null;
}

function historyForArea(state, areaId) {
  const source = state?.areas?.[areaId];
  return isRecord(source)
    ? {
        days: stringList(source.days, MAX_AREA_DAYS),
        stageIds: stringList(source.stageIds, MAX_AREA_DAYS),
        kinds: stringList(source.kinds, MAX_AREA_DAYS),
        lastCompletedAt: Math.max(0, finiteNumber(source.lastCompletedAt))
      }
    : { days: [], stageIds: [], kinds: [], lastCompletedAt: 0 };
}

/** A date key based on the child device's local calendar, not UTC. */
export function localDayKey(date = new Date()) {
  const source = date instanceof Date ? date : new Date(date);
  if (Number.isNaN(source.getTime())) throw new TypeError("A valid date is required.");
  const year = source.getFullYear();
  const month = String(source.getMonth() + 1).padStart(2, "0");
  const day = String(source.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function createDailyGrowthState() {
  return {
    version: DAILY_GROWTH_VERSION,
    plans: {},
    areas: {}
  };
}

/**
 * Removes malformed or outdated extension-only records.  It deliberately does
 * not inspect or mutate the main game's save format.
 */
export function normaliseDailyGrowthState(value) {
  const source = isRecord(value) ? value : {};
  const result = createDailyGrowthState();
  const plans = isRecord(source.plans) ? source.plans : {};
  const recentDays = Object.keys(plans).filter((day) => /^\d{4}-\d{2}-\d{2}$/.test(day)).sort().slice(-MAX_DAYS);
  for (const day of recentDays) {
    const plan = plans[day];
    if (!isRecord(plan) || typeof plan.id !== "string" || typeof plan.stageId !== "string" || typeof plan.areaId !== "string") continue;
    result.plans[day] = {
      id: plan.id,
      stageId: plan.stageId,
      areaId: plan.areaId,
      kind: ["new", "review", "revisit"].includes(plan.kind) ? plan.kind : "new",
      startedAt: Math.max(0, finiteNumber(plan.startedAt)),
      completedAt: Math.max(0, finiteNumber(plan.completedAt)),
      visitorId: typeof plan.visitorId === "string" ? plan.visitorId : "",
      restSeen: Boolean(plan.restSeen)
    };
  }
  const areas = isRecord(source.areas) ? source.areas : {};
  for (const [areaId, record] of Object.entries(areas)) {
    if (!areaId || !isRecord(record)) continue;
    result.areas[areaId] = historyForArea({ areas }, areaId);
  }
  return result;
}

function chooseQuestKind(snapshot, state, date) {
  const stages = snapshotStages(snapshot);
  const areas = snapshotAreas(snapshot, stages);
  const now = date.getTime();
  const profiles = snapshot?.learning?.bySkill || {};

  const due = areas
    .map((area) => ({ area, profile: profiles?.[area.id] || {}, stages: stages.filter((stage) => stage.areaId === area.id) }))
    .filter((entry) => finiteNumber(entry.profile.reviewDue) > 0 && finiteNumber(entry.profile.reviewDue) <= now)
    .map((entry) => ({ ...entry, stage: latestCompletedStage(entry.stages, snapshot) }))
    .filter((entry) => entry.stage)
    .sort((left, right) => finiteNumber(left.profile.reviewDue) - finiteNumber(right.profile.reviewDue));
  if (due.length) return { kind: "review", ...due[0] };

  const newCandidates = areas
    .map((area) => {
      const areaStages = stages.filter((stage) => stage.areaId === area.id);
      return { area, stage: firstUncompletedStage(areaStages, snapshot), history: historyForArea(state, area.id) };
    })
    .filter((entry) => entry.stage)
    .sort((left, right) => left.history.days.length - right.history.days.length || stageOrder(left.stage) - stageOrder(right.stage));
  if (newCandidates.length) {
    const leastSeen = newCandidates.filter((entry) => entry.history.days.length === newCandidates[0].history.days.length);
    return { kind: "new", ...chooseDeterministic(leastSeen, `${localDayKey(date)}:new`) };
  }

  const revisitCandidates = areas
    .map((area) => {
      const areaStages = stages.filter((stage) => stage.areaId === area.id);
      return { area, stage: latestCompletedStage(areaStages, snapshot), history: historyForArea(state, area.id) };
    })
    .filter((entry) => entry.stage)
    .sort((left, right) => left.history.lastCompletedAt - right.history.lastCompletedAt || stageOrder(left.stage) - stageOrder(right.stage));
  if (revisitCandidates.length) return { kind: "revisit", ...revisitCandidates[0] };
  return null;
}

function visitorFor(day, areaId) {
  return chooseDeterministic(VISITORS, `${day}:${areaId}`) || VISITORS[0];
}

/**
 * Gets one stable, low-pressure quest for the calendar day.  The returned
 * plan only references a stage already supplied by the host; it never creates
 * questions or alters the main game's curriculum.
 */
export function buildDailyQuest(snapshot, state, { date = new Date() } = {}) {
  const day = localDayKey(date);
  const normalised = normaliseDailyGrowthState(state);
  const stored = normalised.plans[day];
  const stages = snapshotStages(snapshot);
  if (stored) {
    const stage = stages.find((candidate) => candidate.id === stored.stageId);
    if (stage) return materialisePlan(stored, stage, snapshot, day);
  }

  const candidate = chooseQuestKind(snapshot, normalised, date);
  if (!candidate?.stage) return null;
  const visitor = visitorFor(day, candidate.area.id);
  const record = {
    id: `daily:${day}:${candidate.kind}:${candidate.stage.id}`,
    stageId: candidate.stage.id,
    areaId: candidate.area.id,
    kind: candidate.kind,
    startedAt: 0,
    completedAt: 0,
    visitorId: visitor.id,
    restSeen: false
  };
  return materialisePlan(record, candidate.stage, snapshot, day);
}

function materialisePlan(record, stage, snapshot, day) {
  const copy = QUEST_COPY[record.kind] || QUEST_COPY.new;
  const areas = snapshotAreas(snapshot);
  const area = areas.find((candidate) => candidate.id === record.areaId) || {
    id: record.areaId,
    name: stage.areaName || stage.shortName || record.areaId,
    shortName: stage.shortName || stage.areaName || record.areaId
  };
  const visitor = VISITORS.find((candidate) => candidate.id === record.visitorId) || visitorFor(day, record.areaId);
  return {
    ...record,
    day,
    stage: { id: stage.id, name: stage.name || stage.shortName || stage.id, mode: stage.mode || "" },
    area: { id: area.id, name: area.name || area.shortName || area.id, shortName: area.shortName || area.name || area.id },
    visitor,
    estimatedMinutes: 5,
    copy,
    isComplete: record.completedAt > 0
  };
}

function writePlan(state, plan) {
  const next = normaliseDailyGrowthState(state);
  next.plans[plan.day] = {
    id: plan.id,
    stageId: plan.stageId,
    areaId: plan.areaId,
    kind: plan.kind,
    startedAt: Math.max(0, finiteNumber(plan.startedAt)),
    completedAt: Math.max(0, finiteNumber(plan.completedAt)),
    visitorId: plan.visitor?.id || plan.visitorId || "",
    restSeen: Boolean(plan.restSeen)
  };
  return normaliseDailyGrowthState(next);
}

/** Creates today's plan in extension storage, without changing its progress. */
export function ensureDailyPlan(state, snapshot, options = {}) {
  const plan = buildDailyQuest(snapshot, state, options);
  if (!plan) return { state: normaliseDailyGrowthState(state), plan: null };
  return { state: writePlan(state, plan), plan };
}

/** Marks a deliberate tap on the daily card.  It has no reward or penalty. */
export function startDailyQuest(state, snapshot, { date = new Date(), now = Date.now() } = {}) {
  const ensured = ensureDailyPlan(state, snapshot, { date });
  if (!ensured.plan || ensured.plan.isComplete || ensured.plan.startedAt > 0) return ensured;
  const plan = { ...ensured.plan, startedAt: Math.max(1, finiteNumber(now, Date.now())) };
  return { state: writePlan(ensured.state, plan), plan: { ...plan, isComplete: false } };
}

/**
 * Completes only the currently planned stage, once.  Calling it for a normal
 * stage or calling it twice is intentionally a no-op, which makes it safe at
 * the existing finishStage boundary.
 */
export function completeDailyQuestForStage(state, snapshot, stageId, { date = new Date(), now = Date.now() } = {}) {
  const ensured = ensureDailyPlan(state, snapshot, { date });
  const plan = ensured.plan;
  if (!plan || plan.stageId !== String(stageId) || plan.isComplete) return ensured;

  const completedAt = Math.max(1, finiteNumber(now, Date.now()));
  const completedPlan = { ...plan, startedAt: plan.startedAt || completedAt, completedAt };
  const next = writePlan(ensured.state, completedPlan);
  const history = historyForArea(next, plan.areaId);
  next.areas[plan.areaId] = {
    days: stringList([...history.days, plan.day], MAX_AREA_DAYS),
    stageIds: stringList([...history.stageIds, plan.stageId], MAX_AREA_DAYS),
    kinds: stringList([...history.kinds, plan.kind], MAX_AREA_DAYS),
    lastCompletedAt: completedAt
  };
  return { state: normaliseDailyGrowthState(next), plan: { ...completedPlan, isComplete: true }, completed: true };
}

/** Notes that the player chose the garden view today; it does not block or reduce anything. */
export function markDailyRestSeen(state, snapshot, { date = new Date() } = {}) {
  const ensured = ensureDailyPlan(state, snapshot, { date });
  if (!ensured.plan || ensured.plan.restSeen) return ensured;
  const plan = { ...ensured.plan, restSeen: true };
  return { state: writePlan(ensured.state, plan), plan };
}

/**
 * Gives each learning area a named growth state.  No numeric score, ranking,
 * streak, or missed-day calculation is exposed.
 */
export function growthForArea(state, areaId) {
  const history = historyForArea(normaliseDailyGrowthState(state), areaId);
  let index = 0;
  if (history.stageIds.length >= 1) index = 1;
  if (history.days.length >= 2) index = 2;
  if (history.stageIds.length >= 2 || new Set(history.kinds).size >= 2) index = 3;
  if (history.kinds.includes("review")) index = 4;
  return { ...GROWTH_STAGES[index], areaId, days: history.days, stageIds: history.stageIds, kinds: history.kinds };
}

export function buildGrowthMap(state, snapshot) {
  const areas = snapshotAreas(snapshot);
  return areas.map((area) => ({
    area: { id: area.id, name: area.name || area.shortName || area.id, shortName: area.shortName || area.name || area.id },
    growth: growthForArea(state, area.id)
  }));
}

function createStorageAdapter(storage, storageKey) {
  return {
    read() {
      try {
        return normaliseDailyGrowthState(JSON.parse(storage?.getItem?.(storageKey) || "null"));
      } catch {
        return createDailyGrowthState();
      }
    },
    write(state) {
      const normalised = normaliseDailyGrowthState(state);
      try {
        storage?.setItem?.(storageKey, JSON.stringify(normalised));
      } catch {
        // Private browsing or full storage must never stop a learning session.
      }
      return normalised;
    }
  };
}

/**
 * Framework-free controller.  The host owns the actual stage start and calls
 * completeForStage at its existing stage-completion point.
 */
export function createDailyGrowthController({
  getSnapshot,
  storage = typeof window !== "undefined" ? window.localStorage : null,
  storageKey = DAILY_GROWTH_STORAGE_KEY,
  now = () => new Date(),
  onStateChange = () => {}
} = {}) {
  if (typeof getSnapshot !== "function") throw new TypeError("getSnapshot must be a function.");
  const adapter = createStorageAdapter(storage, storageKey);
  let state = adapter.read();

  const context = () => {
    const date = now();
    const snapshot = getSnapshot() || {};
    const ensured = ensureDailyPlan(state, snapshot, { date });
    if (JSON.stringify(ensured.state) !== JSON.stringify(state)) state = adapter.write(ensured.state);
    return { date, snapshot, plan: ensured.plan };
  };
  const persist = (next) => {
    state = adapter.write(next);
    onStateChange(state);
    return state;
  };

  return {
    getState: () => normaliseDailyGrowthState(state),
    getPlan() { return context().plan; },
    getGrowthMap() {
      const { snapshot } = context();
      return buildGrowthMap(state, snapshot);
    },
    begin() {
      const { date, snapshot } = context();
      const result = startDailyQuest(state, snapshot, { date, now: date.getTime() });
      persist(result.state);
      return result.plan;
    },
    completeForStage(stageId, completedAt = now()) {
      const { date, snapshot } = context();
      const result = completeDailyQuestForStage(state, snapshot, stageId, { date, now: completedAt.getTime() });
      if (result.completed) persist(result.state);
      return result;
    },
    rest() {
      const { date, snapshot } = context();
      const result = markDailyRestSeen(state, snapshot, { date });
      persist(result.state);
      return result.plan;
    },
    /** Clears all daily history, including a completed plan for today. */
    reset() { return persist(createDailyGrowthState()); },
    refresh() { return context().plan; }
  };
}

function renderGrowthMap(map) {
  if (!map.length) return "<p class=\"daily-growth__empty\">あそぶと、ここにできることのお花がふえるよ。</p>";
  return `<ul class="daily-growth__map" aria-label="できることの地図">${map.map(({ area, growth }) => `
    <li class="daily-growth__map-item" data-growth="${escapeHtml(growth.id)}">
      <span class="daily-growth__map-flower" aria-hidden="true">${growth.icon}</span>
      <span><b>${escapeHtml(area.shortName)}</b><small>${escapeHtml(growth.label)}</small></span>
    </li>`).join("")}</ul>`;
}

function renderDailyGrowth(controller) {
  const plan = controller.getPlan();
  const map = controller.getGrowthMap();
  if (!plan) {
    return `<section class="daily-growth" aria-label="きょうの小さなぼうけん"><p class="daily-growth__empty">きょうのぼうけんは、ステージがふえると届くよ。</p></section>`;
  }
  const status = plan.isComplete
    ? `<div class="daily-growth__complete" role="status"><span aria-hidden="true">🌸</span><p><b>きょうは ここまでで だいじょうぶ。</b><small>${escapeHtml(plan.copy.done)}</small></p></div>`
    : `<div class="daily-growth__visitor"><span aria-hidden="true">${plan.visitor.icon}</span><p><b>${escapeHtml(plan.visitor.name)}からの おたより</b><small>${escapeHtml(plan.visitor.line)}</small></p></div>`;
  return `
    <section class="daily-growth" aria-label="きょうの小さなぼうけん" data-daily-growth-root>
      <div class="daily-growth__heading">
        <div><span>${escapeHtml(plan.copy.eyebrow)}</span><h3>${escapeHtml(plan.copy.title)}</h3></div>
        <b class="daily-growth__time">約 ${plan.estimatedMinutes}分</b>
      </div>
      ${status}
      <p class="daily-growth__body">${escapeHtml(plan.copy.body)}</p>
      <div class="daily-growth__quest">
        <span class="daily-growth__quest-dot" aria-hidden="true"></span>
        <span><small>${escapeHtml(plan.area.shortName)}</small><b>${escapeHtml(plan.stage.name)}</b></span>
      </div>
      <div class="daily-growth__actions">
        ${plan.isComplete
          ? `<button type="button" class="daily-growth__button daily-growth__button--soft" data-daily-growth-action="map">できることの地図</button>`
          : `<button type="button" class="daily-growth__button" data-daily-growth-action="start">この1つで あそぶ</button>
             <button type="button" class="daily-growth__button daily-growth__button--soft" data-daily-growth-action="rest">きょうは おさんぽだけ</button>`}
      </div>
      <section class="daily-growth__map-panel" data-daily-growth-map hidden>
        <div><b>できることの地図</b><button type="button" data-daily-growth-action="close-map" aria-label="できることの地図をとじる">×</button></div>
        <p>点数ではなく、会いにきた学びが花になって残るよ。</p>
        ${renderGrowthMap(map)}
      </section>
      ${!plan.isComplete && plan.restSeen ? `<p class="daily-growth__rest-note" role="status">おさんぽ、いいね。やりたくなったときに、いつでも戻ってこよう。</p>` : ""}
    </section>`;
}

/**
 * Renders only inside `host`, with scoped data attributes and a local click
 * handler. It is intentionally opt-in so existing views remain unchanged until
 * the host adds a single placeholder.
 */
export function mountDailyGrowth({ host, onStartQuest = () => {}, onRest = () => {}, onOpenMap = () => {}, ...options } = {}) {
  const target = typeof host === "string" ? document.querySelector(host) : host;
  if (!target || typeof target.addEventListener !== "function") throw new TypeError("A host element is required.");
  const controller = createDailyGrowthController(options);
  const render = () => { target.innerHTML = renderDailyGrowth(controller); };
  const onClick = (event) => {
    const button = event.target?.closest?.("[data-daily-growth-action]");
    if (!button || !target.contains(button)) return;
    const action = button.dataset.dailyGrowthAction;
    if (action === "start") {
      const plan = controller.begin();
      render();
      if (plan) onStartQuest(plan);
    } else if (action === "rest") {
      const plan = controller.rest();
      render();
      onRest(plan);
    } else if (action === "map") {
      const panel = target.querySelector("[data-daily-growth-map]");
      if (panel) panel.hidden = false;
      onOpenMap(controller.getGrowthMap());
    } else if (action === "close-map") {
      const panel = target.querySelector("[data-daily-growth-map]");
      if (panel) panel.hidden = true;
    }
  };
  target.addEventListener("click", onClick);
  render();
  return {
    controller,
    refresh: render,
    reset() {
      controller.reset();
      render();
      return controller.getState();
    },
    completeForStage(stageId, completedAt = options.now?.() || new Date()) {
      const result = controller.completeForStage(stageId, completedAt);
      render();
      return result;
    },
    destroy() {
      target.removeEventListener("click", onClick);
      target.innerHTML = "";
    }
  };
}
