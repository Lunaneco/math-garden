import assert from 'node:assert/strict';
import { runtime, clone } from './garden-growth-audit-runtime.mjs';

const exports = ['GARDEN_FACILITIES', 'gardenItemFootprint', 'gardenItemFits', 'gardenItemAt',
  'openGardenEditor', 'closeGardenEditor', 'placeGardenItem', 'selectGardenItem',
  'stowGardenItem', 'undoGardenEdit', 'moveGardenCursor', 'renderGardenEditor'];
const buildings = new Set(['home', 'school', 'boutique']);
const sideOf = id => buildings.has(id) ? 2 : 1;
let checkedCells = 0, moves = 0;

function verify(layout, size) {
  const occupied = new Set();
  for (const [id, position] of Object.entries(layout)) {
    if (!position) { assert.ok(!['home', 'avatar'].includes(id)); continue; }
    for (let dx = 0; dx < sideOf(id); dx++) for (let dy = 0; dy < sideOf(id); dy++) {
      const x = position.x + dx, y = position.y + dy, key = `${x},${y}`;
      assert.ok(Number.isInteger(x) && Number.isInteger(y) && x >= 1 && y >= 1 && x <= size - 2 && y <= size - 2, `${id} outside land: ${key}`);
      assert.ok(!occupied.has(key), `Overlapping footprint: ${id} at ${key}`);
      occupied.add(key); checkedCells++;
    }
  }
  assert.ok(layout.home && layout.avatar, 'Home and companions are retained');
}

function fixture(level = 0, layout = { home:{x:1,y:1}, avatar:{x:4,y:4} }) {
  const qa = runtime(undefined, exports), save = qa.createInitialState();
  save.completedStages = { [qa.ALL_STAGES[0].id]: { stars:3, times:22, completedAt:'2026-10-05T00:00:00.000Z' } };
  save.garden.expansionLevel = level;
  save.garden.layout = clone(layout);
  save.garden.ownedFloors = ['grass', 'peach'];
  save.garden.baseFloor = 'peach';
  save.garden.floorTiles = { '2,2':'grass' };
  qa.replaceState(save);
  return qa;
}

const fresh = runtime(undefined, exports);
verify(fresh.getState().garden.layout, 6);
for (const id of ['home', 'school', 'boutique', 'tree', 'garden', 'avatar', 'garden-shop-bed', 'monument']) assert.equal(fresh.gardenItemFootprint(id), sideOf(id));

for (const [level, size] of [6, 8, 10, 12, 14].entries()) {
  // Old saves placed every object in one cell. Repair both inner collisions and
  // right/bottom overflow without altering earned items, paint or currency.
  const old = fixture(level, { home:{x:size-2,y:size-2}, avatar:{x:size-2,y:size-2}, school:{x:1,y:1}, boutique:{x:1,y:1}, tree:{x:1,y:1}, garden:{x:1,y:1} });
  verify(old.getState().garden.layout, size);
  assert.equal(old.getState().garden.baseFloor, 'peach');
  assert.equal(old.getState().garden.floorTiles['2,2'], 'grass');
  for (const id of buildings) assert.ok(old.getState().garden.decorations.includes(id), 'Migration retains ownership even when storage is needed');
  old.saveState();
  assert.deepEqual(clone(runtime(old.saved(), exports).getState()), clone(old.getState()), 'Migration is stable after reload');

  for (let n = 0; n < 40; n++) {
    const broken = { home:{x:n%size,y:(n*3)%size}, avatar:{x:2,y:2}, school:{x:2,y:2}, boutique:{x:size-2,y:size-2}, tree:{x:2,y:2}, garden:{x:2,y:2} };
    const qa = fixture(level, broken);
    verify(qa.getState().garden.layout, size);
    assert.deepEqual(clone(qa.withDerivedState(clone(qa.getState()))), clone(qa.getState()));
  }

  const qa = fixture(level);
  qa.openGardenEditor();
  const saved = clone(qa.getState()), initial = clone(qa.getView().gardenDraft);
  for (const id of ['home', 'school', 'boutique', 'tree', 'garden', 'avatar']) {
    for (let x = 1; x <= size - 2; x++) for (let y = 1; y <= size - 2; y++) {
      const before = clone(qa.getView().gardenDraft), history = qa.getView().gardenHistory.length;
      const changed = qa.placeGardenItem(id, x, y); moves++;
      verify(qa.getView().gardenDraft.layout, size);
      assert.deepEqual(clone(qa.getState()), saved, 'Tentative moves never alter the saved economy or garden');
      if (!changed) {
        assert.deepEqual(clone(qa.getView().gardenDraft), before, 'Denied/no-op move is atomic');
        assert.equal(qa.getView().gardenHistory.length, history);
      } else {
        qa.undoGardenEdit();
        assert.deepEqual(clone(qa.getView().gardenDraft), before, 'Undo restores every occupied tile and floor');
      }
      if (buildings.has(id) && (x === size - 2 || y === size - 2)) assert.equal(changed, false, 'A 2×2 building cannot straddle the edge');
    }
  }
  qa.closeGardenEditor(false);
  assert.deepEqual(clone(qa.getState()), saved);
  qa.openGardenEditor();
  assert.deepEqual(clone(qa.getView().gardenDraft), initial);
  assert.equal(qa.placeGardenItem('home', 2, 1), true, 'Moving one tile across the building’s own footprint works');
  qa.closeGardenEditor(true);
  const roundtrip = runtime(qa.saved(), exports);
  assert.deepEqual(clone(roundtrip.getState()), clone(qa.getState()));
  const html = qa.renderIslandBoard();
  assert.match(html, /obj-home[^>]*data-footprint="2"/);
  assert.match(html, /obj-avatar[^>]*data-footprint="1"/);
}

const qa = fixture(0, {home:{x:1,y:1}, school:{x:3,y:1}, avatar:{x:4,y:4}, tree:{x:1,y:4}});
qa.openGardenEditor();
let before = clone(qa.getView().gardenDraft);
assert.equal(qa.placeGardenItem('garden', 2, 2), false, 'A small delivery cannot occupy any of the home’s four cells');
assert.deepEqual(clone(qa.getView().gardenDraft), before);
assert.equal(qa.placeGardenItem('home', 1, 3), false, 'A building cannot cover a small object on a non-anchor tile');
assert.deepEqual(clone(qa.getView().gardenDraft), before);
assert.equal(qa.placeGardenItem('home', 3, 1), true, 'Equal-size buildings can exchange complete footprints');
assert.deepEqual(clone(qa.getView().gardenDraft.layout.school), {x:1,y:1});
verify(qa.getView().gardenDraft.layout, 6);
qa.undoGardenEdit();
assert.deepEqual(clone(qa.getView().gardenDraft), before);
qa.selectGardenItem('home');
let html = qa.renderGardenEditor();
assert.equal((html.match(/data-occupant="home"/g) || []).length, 4, 'The editor reserves all four building cells');
assert.equal((html.match(/is-placement-preview/g) || []).length, 4, 'Keyboard/tap placement previews four cells');
assert.ok(html.includes('2×2マス') && html.includes('1マス'));
qa.selectGardenItem('tree');
html = qa.renderGardenEditor();
assert.equal((html.match(/data-occupant="tree"/g) || []).length, 1);
qa.selectGardenItem('home');
for (let n = 0; n < 10; n++) qa.moveGardenCursor(1, 0);
assert.equal(qa.getView().gardenCursor.x, 3, 'Keyboard movement respects the complete building footprint');
console.log(`Garden footprints pass: 3 buildings at 2×2, small items at 1×1; ${moves} attempted moves, ${checkedCells} occupied-cell checks, migration/save/undo and editor coverage.`);
