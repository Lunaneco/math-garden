import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { runtime, root } from './garden-growth-audit-runtime.mjs';

// Check actual adjacent floor vertices, so asset or coordinate changes cannot
// silently reintroduce gaps. The fixtures never read a player's real save.
const near = (a, b) => assert.ok(Math.abs(a - b) < 1e-7, `${a} != ${b}`);
for (const floor of ['grass', 'peach', 'lavender', 'wood', 'check', 'stars']) {
  const svg = fs.readFileSync(path.join(root, `assets/garden-floors/${floor}.svg`), 'utf8');
  assert.match(svg, /viewBox="0 0 216 126"/);
  assert.match(svg, /M108 0 216 54 108 108 0 54Z/);
}
const css = fs.readFileSync(path.join(root, 'garden-builder.css'), 'utf8');
assert.match(css, /\.iso-floor[^}]*background-size:100% 100%/);
let joinedEdges = 0;
for (const [level, size] of [6, 8, 10, 12, 14].entries()) {
  const qa = runtime(undefined, ['renderGardenGrowthStrip']);
  const save = qa.createInitialState();
  save.garden.expansionLevel = level;
  save.completedStages = { [qa.ALL_STAGES[0].id]: { stars:3, times:100, completedAt:'2026-10-05T00:00:00.000Z' } };
  qa.replaceState(save);
  assert.equal(qa.getState().stats.landSize, size);
  assert.ok(qa.renderGardenGrowthStrip().includes(`${size - 2} × ${size - 2}`), 'Displayed size counts usable floor cells');
  for (const zoom of [false, true]) {
    qa.replaceView({ gardenZoom: zoom });
    const html = qa.renderIslandBoard();
    assert.ok(!html.includes('/terrain/06.png'), 'No outer water tiles');
    const ratio = html.match(/aspect-ratio:([\d.]+) \/ ([\d.]+)/);
    const [boardW, boardH] = ratio.slice(1).map(Number);
    const tiles = new Map();
    const pattern = /class="iso-tile" style="left:([\d.]+)%;top:([\d.]+)%;width:([\d.]+)%;height:([\d.]+)%;[^\"]*" data-garden-x="(\d+)" data-garden-y="(\d+)"/g;
    for (const match of html.matchAll(pattern)) {
      const [left, top, width, height, x, y] = match.slice(1).map(Number);
      const l = left * boardW / 100, t = top * boardH / 100;
      const w = width * boardW / 100, h = height * boardH / 100;
      assert.ok(x > 0 && y > 0 && x < size - 1 && y < size - 1);
      assert.ok(l >= 0 && t >= 0 && l + w <= boardW + 1e-7 && t + h <= boardH + 1e-7);
      tiles.set(`${x},${y}`, [[l + w / 2, t], [l + w, t + h * 54 / 126], [l + w / 2, t + h * 108 / 126], [l, t + h * 54 / 126]]);
    }
    assert.equal(tiles.size, (size - 2) ** 2);
    for (const [key, corners] of tiles) {
      const [x, y] = key.split(',').map(Number);
      for (const [neighbour, edges] of [[tiles.get(`${x + 1},${y}`), [[1, 0], [2, 3]]], [tiles.get(`${x},${y + 1}`), [[3, 0], [2, 1]]]]) {
        if (!neighbour) continue;
        for (const [a, b] of edges) for (const axis of [0, 1]) near(corners[a][axis], neighbour[b][axis]);
        joinedEdges++;
      }
    }
    assert.match(html, /class="iso-object obj-home[^\"]*"[^>]*width:/);
    assert.ok(!html.includes('undefined') && !html.includes('NaN'));
  }
}
console.log(`Garden floor geometry passes: 6 materials, 5 sizes, 2 zoom modes, ${joinedEdges} shared edges.`);
