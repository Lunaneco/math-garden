/*
 * ひっさんキッチン — 筆算を、少しずつ・順番に身につけるミニゲーム。
 *
 * 1. エンジン（この前半）: 問題づくり、盤面（マス目）と「書く順番」の生成。DOMに依存しない。
 * 2. 画面と操作（後半）: install() で app.js とつながる。
 *
 * 筆算のやり方を「おうち（くらい）」「ひっこし（くり上がり）」「かしてもらう（くり下がり）」
 * の物語にして、書いたとおりにいちごが動く。みほん → いっしょ → ひとりで と
 * 手助けを少しずつ減らす。
 */
(function (global) {
  'use strict';

  // ------------------------------------------------------------------
  // 小さな道具
  // ------------------------------------------------------------------
  function rng(seed) {
    let t = (Number(seed) || 0) >>> 0;
    return function next() {
      t += 0x6D2B79F5;
      let r = Math.imul(t ^ (t >>> 15), 1 | t);
      r ^= r + Math.imul(r ^ (r >>> 7), 61 | r);
      return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
    };
  }
  const randInt = (rand, lo, hi) => lo + Math.floor(rand() * (hi - lo + 1));
  const digitAt = (n, p) => Math.floor(n / 10 ** p) % 10;
  const lenOf = (n) => String(n).length;
  const hashText = (text) => {
    let h = 2166136261;
    for (let i = 0; i < text.length; i += 1) { h ^= text.charCodeAt(i); h = Math.imul(h, 16777619); }
    return h >>> 0;
  };
  const key = (r, c) => `${r},${c}`;
  const PLACE_NAMES = ['いち', 'じゅう', 'ひゃく', 'せん'];
  const placeName = (p) => PLACE_NAMES[p] || `${10 ** p}`;

  // くり上がりの回数（たし算）
  function countCarries(a, b) {
    let carry = 0; let count = 0;
    for (let p = 0; p < Math.max(lenOf(a), lenOf(b)); p += 1) {
      const total = digitAt(a, p) + digitAt(b, p) + carry;
      carry = total >= 10 ? 1 : 0;
      count += carry;
    }
    return count;
  }

  // くり下がりの回数と、0をまたぐか（ひき算）
  function analyseBorrow(a, b) {
    const top = String(a).split('').reverse().map(Number);
    let events = 0; let chain = false;
    for (let p = 0; p < top.length; p += 1) {
      const bd = digitAt(b, p);
      if (top[p] >= bd) continue;
      let k = p + 1;
      while (k < top.length && top[k] === 0) k += 1;
      if (k >= top.length) return { events: -1, chain: false };
      events += 1;
      if (k > p + 1) chain = true;
      top[k] -= 1;
      for (let q = k - 1; q > p; q -= 1) top[q] = 9;
      top[p] += 10;
    }
    return { events, chain };
  }

  // かけ算で、くり上がりがいくつあるか
  function countMulCarries(a, b) {
    let carry = 0; let count = 0;
    for (let p = 0; p < lenOf(a); p += 1) {
      const total = digitAt(a, p) * b + carry;
      carry = Math.floor(total / 10);
      if (carry > 0) count += 1;
    }
    return count;
  }

  // ------------------------------------------------------------------
  // レッスン（16こ）。ならびは学習の順番。
  // ------------------------------------------------------------------
  function sample(rand, ok, make, fallback) {
    for (let i = 0; i < 600; i += 1) {
      const candidate = make(rand);
      if (ok(candidate)) return candidate;
    }
    return fallback;
  }

  const LESSONS = Object.freeze([
    {
      id: 'add-align', op: 'add', section: 'add', title: 'おうちに ならべよう', point: 'くらいを そろえて ならべるよ',
      dish: { name: 'いちごのパック', art: 'berry' }, setup: true,
      gen: (r) => sample(r, ([a, b]) => countCarries(a, b) === 0, (x) => [randInt(x, 11, 68), randInt(x, 0, 1) ? randInt(x, 1, 9) : randInt(x, 11, 59)], [23, 4])
    },
    {
      id: 'add-plain', op: 'add', section: 'add', title: 'いちのくらいから', point: '1のくらい → 10のくらい の じゅんばん',
      dish: { name: 'ショートケーキ', art: 'cake' },
      gen: (r) => sample(r, ([a, b]) => countCarries(a, b) === 0 && a + b < 100, (x) => [randInt(x, 12, 77), randInt(x, 11, 77)], [34, 25])
    },
    {
      id: 'add-carry', op: 'add', section: 'add', title: 'ひっこし！ くり上がり', point: '10こに なったら となりの おうちへ ひっこし',
      dish: { name: 'マカロン', art: 'stickerMacaron' },
      gen: (r) => sample(r, ([a, b]) => countCarries(a, b) === 1 && a + b < 100, (x) => [randInt(x, 12, 78), randInt(x, 5, 68)], [27, 15])
    },
    {
      id: 'add-carry2', op: 'add', section: 'add', title: 'ひっこし ふたつ', point: '10のくらいも 10こに なったら また ひっこし',
      dish: { name: 'クリームパン', art: 'questBakeryBread' },
      gen: (r) => sample(r, ([a, b]) => countCarries(a, b) === 2 && a + b >= 100 && a + b < 200, (x) => [randInt(x, 35, 95), randInt(x, 25, 95)], [68, 57])
    },
    {
      id: 'add-3digit', op: 'add', section: 'add', title: '3けたの たし算', point: '100のくらいまで おなじ やりかた',
      dish: { name: 'ピザ', art: 'pizza' },
      gen: (r) => sample(r, ([a, b]) => { const c = countCarries(a, b); return c >= 1 && c <= 3 && a + b < 1000; }, (x) => [randInt(x, 120, 880), randInt(x, 110, 790)], [358, 247])
    },
    {
      id: 'sub-align', op: 'sub', section: 'sub', title: 'ひき算の おうち', point: 'うえから したを ひくよ。くらいを そろえてね',
      dish: { name: 'ハートクッキー', art: 'stickerHeart' }, setup: true,
      gen: (r) => sample(r, ([a, b]) => a > b && analyseBorrow(a, b).events === 0, (x) => [randInt(x, 21, 89), randInt(x, 0, 1) ? randInt(x, 1, 9) : randInt(x, 11, 69)], [57, 24])
    },
    {
      id: 'sub-borrow', op: 'sub', section: 'sub', title: 'かして もらう！ くり下がり', point: 'ひけないときは となりの おうちから 10こ かりるよ',
      dish: { name: 'キャンディ', art: 'stickerCandy' },
      gen: (r) => sample(r, ([a, b]) => a > b && analyseBorrow(a, b).events === 1 && a < 100, (x) => [randInt(x, 21, 94), randInt(x, 12, 78)], [52, 27])
    },
    {
      id: 'sub-3digit', op: 'sub', section: 'sub', title: '3けたの ひき算', point: 'かりる ところが ふたつでも だいじょうぶ',
      dish: { name: 'ほしクッキー', art: 'stickerStar' },
      gen: (r) => sample(r, ([a, b]) => a > b && analyseBorrow(a, b).events >= 1 && !analyseBorrow(a, b).chain && a >= 100 && a < 1000 && b >= 100, (x) => [randInt(x, 200, 950), randInt(x, 110, 780)], [425, 189])
    },
    {
      id: 'sub-zero', op: 'sub', section: 'sub', title: '0の おうち', point: '0の となりは ひとつ とおくから かりてくるよ',
      dish: { name: 'おはなケーキ', art: 'stickerFlower' },
      gen: (r) => sample(r, ([a, b]) => a > b && analyseBorrow(a, b).chain, (x) => { const a = randInt(x, 1, 9) * 100 + randInt(x, 0, 9); return [a, randInt(x, 11, a - 1)]; }, [402, 158])
    },
    {
      id: 'mul-plain', op: 'mul', section: 'mul', title: 'かけ算の ひっさん', point: '1のくらいから、ひとつずつ かけるよ',
      dish: { name: 'リボンパイ', art: 'stickerBow' },
      gen: (r) => sample(r, ([a, b]) => countMulCarries(a, b) === 0 && a % 10 !== 0, (x) => [randInt(x, 11, 44), randInt(x, 2, 4)], [31, 3])
    },
    {
      id: 'mul-carry', op: 'mul', section: 'mul', title: 'かけ算で ひっこし', point: 'かけて 10こを こえたら となりへ ひっこし',
      dish: { name: 'くものパフェ', art: 'stickerCloud' },
      gen: (r) => sample(r, ([a, b]) => countMulCarries(a, b) >= 1 && a * b < 1000 && a % 10 !== 0, (x) => [randInt(x, 12, 68), randInt(x, 3, 9)], [27, 3])
    },
    {
      id: 'mul-3digit', op: 'mul', section: 'mul', title: '3けた × 1けた', point: '100のくらいまで つづけて かけよう',
      dish: { name: 'ほうせきゼリー', art: 'stickerCrystal' },
      gen: (r) => sample(r, ([a, b]) => countMulCarries(a, b) >= 1 && a % 10 !== 0 && a < 500, (x) => [randInt(x, 112, 498), randInt(x, 2, 8)], [143, 4])
    },
    {
      id: 'mul-2x2', op: 'mul2', section: 'mul', title: '2けた × 2けた', point: '2だんに わけて かけて、さいごに たすよ',
      dish: { name: 'おおきなケーキ', art: 'cake' },
      gen: (r) => sample(r, ([a, b]) => b % 10 !== 0 && a % 10 !== 0 && a * b < 2000, (x) => [randInt(x, 12, 48), randInt(x, 12, 42)], [23, 14])
    },
    {
      id: 'div-exact', op: 'div', section: 'div', title: 'わり算の ひっさん', point: 'たてる → かける → ひく → おろす',
      dish: { name: 'ピクニックパン', art: 'questBakeryBread' },
      gen: (r) => sample(r, ([a, b]) => a % b === 0 && a >= 20 && !String(a / b).includes('0'), (x) => { const d = randInt(x, 2, 9); const q = randInt(x, 11, 49); return [d * q, d]; }, [84, 4])
    },
    {
      id: 'div-rest', op: 'div', section: 'div', title: 'あまりの ある わり算', point: 'さいごに のこったのが あまり',
      dish: { name: 'マカロンタワー', art: 'stickerMacaron' },
      gen: (r) => sample(r, ([a, b]) => a % b !== 0 && a >= 20 && a < 100 && !String(Math.floor(a / b)).includes('0'), (x) => { const d = randInt(x, 2, 9); return [randInt(x, 20, 99), d]; }, [86, 4])
    },
    {
      id: 'div-3digit', op: 'div', section: 'div', title: '3けたの わり算', point: 'おなじ やりかたを もういっかい くりかえすだけ',
      dish: { name: 'レインボーケーキ', art: 'cake' },
      gen: (r) => sample(r, ([a, b]) => a >= 100 && a < 1000 && Math.floor(a / b) >= 10, (x) => { const d = randInt(x, 2, 9); return [randInt(x, 120, 980), d]; }, [756, 3])
    }
  ]);

  const SECTIONS = Object.freeze([
    { id: 'add', name: 'たし算', mark: '＋' },
    { id: 'sub', name: 'ひき算', mark: '−' },
    { id: 'mul', name: 'かけ算', mark: '×' },
    { id: 'div', name: 'わり算', mark: '÷' }
  ]);

  const lessonById = (id) => LESSONS.find((lesson) => lesson.id === id) || null;

  // 1レッスン = 5もん。手助けを少しずつ減らす。
  const ROUND_MODES = Object.freeze(['demo', 'guided', 'guided', 'solo', 'solo']);
  const ROUND_LABELS = Object.freeze({ demo: 'みほん', guided: 'いっしょに', solo: 'ひとりで' });

  function makeProblem(lessonId, seed) {
    const lesson = lessonById(lessonId);
    if (!lesson) throw new Error(`unknown lesson ${lessonId}`);
    const rand = rng(hashText(lessonId) ^ Math.imul(Number(seed) || 0, 2654435761));
    const [a, b] = lesson.gen(rand);
    const problem = { lessonId, op: lesson.op, a, b, setup: Boolean(lesson.setup) };
    if (lesson.op === 'add') problem.answer = a + b;
    else if (lesson.op === 'sub') problem.answer = a - b;
    else if (lesson.op === 'mul' || lesson.op === 'mul2') problem.answer = a * b;
    else { problem.answer = Math.floor(a / b); problem.remainder = a % b; }
    return problem;
  }

  // ------------------------------------------------------------------
  // 盤面と手順
  //   cells: { 'r,c': { r, c, span, given, slot, kind } }
  //   steps: [{ kind, phase, cell, expect, say, hint, effect }]
  // ------------------------------------------------------------------
  function newBoard(rows, cols) {
    return { rows, cols, cells: {}, rules: [], steps: [], heads: [], note: null };
  }
  function addGiven(board, r, c, text, extra) {
    board.cells[key(r, c)] = Object.assign({ r, c, span: 1, given: String(text), slot: false }, extra || {});
  }
  function addSlot(board, r, c, kind, span) {
    const k = key(r, c);
    if (!board.cells[k]) board.cells[k] = { r, c, span: span || 1, given: null, slot: true, kind: kind || 'digit' };
    return k;
  }
  function pushStep(board, step) { step.index = board.steps.length; board.steps.push(step); return step; }

  function addHeads(board, L) {
    // くらいの おうち（ひゃく・じゅう・いち）
    for (let p = 0; p < L; p += 1) board.heads.push({ c: L - p, p, name: placeName(p) });
  }

  function buildAdd(problem, notes, decoys) {
    const { a, b } = problem;
    const sum = a + b;
    const L = lenOf(sum);
    const board = newBoard(5, L + 1);
    board.L = L;
    addHeads(board, L);
    for (let p = 0; p < lenOf(a); p += 1) addGiven(board, 1, L - p, digitAt(a, p), { who: 'a', p });
    addGiven(board, 2, 0, '＋', { sign: true });
    board.rules.push({ row: 3, from: 0, to: L });
    const placeIdx = {};
    if (problem.setup) {
      for (let p = 0; p < L; p += 1) {
        if (p < lenOf(b)) {
          const k = addSlot(board, 2, L - p, 'place');
          board.cells[k].who = 'b';
          board.cells[k].p = p;
          placeIdx[p] = board.steps.length;
          pushStep(board, {
            kind: 'place', phase: 'ならべる', cell: k, expect: String(digitAt(b, p)), deps: [],
            say: p === 0 ? `${b} の 「いち」の くらいを、いちの おうちの したに 書こう` : `${b} の 「${placeName(p)}」の くらいを、${placeName(p)}の おうちの したに`,
            hint: `${placeName(p)}の おうちの まっすぐ したに ${digitAt(b, p)} を おこう`
          });
        } else if (decoys) {
          // ならべる数が ない くらいにも ますを おいて、そろえ方を えらばせる
          const k = addSlot(board, 2, L - p, 'decoy');
          board.cells[k].who = 'b';
          board.cells[k].p = p;
        }
      }
    } else {
      for (let p = 0; p < lenOf(b); p += 1) addGiven(board, 2, L - p, digitAt(b, p), { who: 'b', p });
    }
    let carry = 0;
    let carryIdx = null; // となりの くらいから ひっこしてきた 1 を 書いた手順
    for (let p = 0; p < L; p += 1) {
      const c = L - p;
      const da = p < lenOf(a) ? digitAt(a, p) : null;
      const db = p < lenOf(b) ? digitAt(b, p) : null;
      const phase = `${placeName(p)}の くらい`;
      if (da === null && db === null) {
        const k = addSlot(board, 4, c, 'digit');
        pushStep(board, {
          kind: 'carryout', phase, cell: k, expect: String(carry), deps: carryIdx === null ? [] : [carryIdx],
          say: `のこった ${carry} を そのまま おろそう`,
          hint: `ひっこして きた ${carry} を、したに おろすよ`, effect: { type: 'bundle-in', place: p }
        });
        continue;
      }
      const total = (da || 0) + (db || 0) + carry;
      const terms = [da, db].filter((x) => x !== null).join(' + ') + (carry ? ' + 1' : '');
      let noteIdx = null;
      if (notes && total >= 10) {
        noteIdx = board.steps.length;
        pushStep(board, {
          kind: 'note', phase, cell: 'note', expect: String(total), eq: `${terms} =`,
          say: `まず ${placeName(p)}の くらいを たしてみよう。${terms} は いくつ？`,
          hint: `${terms} を ゆびで かぞえてもいいよ`
        });
      }
      const k = addSlot(board, 4, c, 'digit');
      const ones = total % 10;
      const sumDeps = [noteIdx, placeIdx[p], carryIdx].filter((x) => x !== null && x !== undefined);
      const sumIdx = board.steps.length;
      const alone = (da === null) !== (db === null) && !carry; // うえか したの どちらかしか 数が ない くらい
      const only = da !== null ? da : db;
      pushStep(board, {
        kind: 'sum', phase, cell: k, expect: String(ones), eq: `${terms} =`, total, deps: sumDeps,
        say: alone
          ? `${placeName(p)}の くらいは ${only} だけ。そのまま したに 書こう`
          : total === 10
            ? `${terms} は ちょうど 10！ 10こは となりへ ひっこすから、${placeName(p)}の おうちには 0 を 書こう`
            : total >= 10
              ? `${terms} は ${total}。10こと ${ones}こ だから、${placeName(p)}の おうちには ${ones} だけ 書こう`
              : `${terms} は ${total}。${placeName(p)}の おうちに 書こう`,
        hint: alone
          ? `うえの ${only} を そのまま したに うつすよ`
          : total >= 10 ? `${total} から 10を とると のこりは ${ones}` : `${terms} は ${total} だよ`
      });
      if (total >= 10) {
        const target = L - (p + 1);
        const ck = addSlot(board, 0, target, 'carry');
        board.cells[ck].carry = true;
        carryIdx = board.steps.length;
        pushStep(board, {
          kind: 'carry', phase, cell: ck, expect: '1', deps: [sumIdx],
          say: `10こ あつまったから、1パックに して ${placeName(p + 1)}の おうちへ ひっこし！`,
          hint: `10こで 1つ うえの くらいの 1に なるよ`, effect: { type: 'bundle', from: p, to: p + 1 }
        });
      } else {
        carryIdx = null;
      }
      carry = total >= 10 ? 1 : 0;
    }
    return board;
  }

  function buildSub(problem, notes, decoys) {
    const { a, b } = problem;
    const diff = a - b;
    const L = lenOf(a);
    const R = lenOf(diff);
    const board = newBoard(5, L + 1);
    board.L = L;
    addHeads(board, L);
    for (let p = 0; p < L; p += 1) addGiven(board, 1, L - p, digitAt(a, p), { who: 'a', p });
    addGiven(board, 2, 0, '−', { sign: true });
    board.rules.push({ row: 3, from: 0, to: L });
    const placeIdx = {};
    if (problem.setup) {
      for (let p = 0; p < L; p += 1) {
        if (p < lenOf(b)) {
          const k = addSlot(board, 2, L - p, 'place');
          board.cells[k].who = 'b';
          board.cells[k].p = p;
          placeIdx[p] = board.steps.length;
          pushStep(board, {
            kind: 'place', phase: 'ならべる', cell: k, expect: String(digitAt(b, p)), deps: [],
            say: `${b} の 「${placeName(p)}」の くらいを、${placeName(p)}の おうちの したに 書こう`,
            hint: `${placeName(p)}の おうちの まっすぐ したに ${digitAt(b, p)} を おこう`
          });
        } else if (decoys) {
          const k = addSlot(board, 2, L - p, 'decoy');
          board.cells[k].who = 'b';
          board.cells[k].p = p;
        }
      }
    } else {
      for (let p = 0; p < lenOf(b); p += 1) addGiven(board, 2, L - p, digitAt(b, p), { who: 'b', p });
    }
    const top = String(a).split('').reverse().map(Number);
    const borrowSteps = []; // かりた あとの数を 書いた手順（ぜんぶ）
    const borrowByColumn = {};
    for (let p = 0; p < L; p += 1) {
      const bd = p < lenOf(b) ? digitAt(b, p) : 0;
      const phase = `${placeName(p)}の くらい`;
      if (top[p] < bd) {
        let k = p + 1;
        while (k < L && top[k] === 0) k += 1;
        const before = top.slice();
        top[k] -= 1;
        for (let q = k - 1; q > p; q -= 1) top[q] = 9;
        top[p] += 10;
        for (let q = k; q >= p; q -= 1) {
          const kk = addSlot(board, 0, L - q, 'borrow');
          board.cells[kk].borrow = true;
          const lender = q > p;
          const myIdx = board.steps.length;
          const earlier = borrowSteps.slice();
          borrowSteps.push(myIdx);
          (borrowByColumn[q] = borrowByColumn[q] || []).push(myIdx);
          pushStep(board, {
            kind: 'borrow', phase, cell: kk, expect: String(top[q]), column: q, deps: earlier,
            say: q === k
              ? (k === p + 1
                ? `${placeName(p)}の くらいは ${before[p]} から ${bd} が ひけないよ。となりの おうちから 1つ かりよう！ ${placeName(q)}の ${before[q]} は ${top[q]} に なるよ`
                : `${placeName(p)}の くらいは ${before[p]} から ${bd} が ひけないよ。となりは 0 だから かせないね。${placeName(q)}の おうちから かりよう！ ${before[q]} は ${top[q]} に なるよ`)
              : lender
                ? `0の おうちは かせないから、さらに となりから もらって ${placeName(q)}の くらいは ${top[q]} に なるよ`
                : `${placeName(p)}の くらいは 10こ もらって ${top[q]} に なるよ`,
            hint: lender ? `${before[q]} から 1 かすと ${top[q]}` : `${before[q]} と 10で ${top[q]}`,
            effect: { type: 'borrow', place: q, value: top[q] }
          });
        }
      }
      if (p < R) {
        const k = addSlot(board, 4, L - p, 'digit');
        const value = top[p] - bd;
        const nothing = p >= lenOf(b) || bd === 0; // ひく数が ない くらい
        pushStep(board, {
          kind: 'diff', phase, cell: k, expect: String(value), eq: `${top[p]} − ${bd} =`,
          deps: [placeIdx[p], ...(borrowByColumn[p] || [])].filter((x) => x !== undefined),
          say: nothing
            ? `${placeName(p)}の くらいは ひく数が ないよ。${top[p]} を そのまま 書こう`
            : `${top[p]} − ${bd} は いくつ？ ${placeName(p)}の おうちに 書こう`,
          hint: nothing ? `ひかないから ${top[p]} の まま だよ` : `${top[p]} から ${bd} を ひくよ`,
          effect: { type: 'take', place: p, count: bd }
        });
      }
    }
    return board;
  }

  function buildMul(problem, notes) {
    const { a, b } = problem;
    const P = a * b;
    const L = lenOf(P);
    const board = newBoard(5, L + 1);
    board.L = L;
    addHeads(board, L);
    for (let p = 0; p < lenOf(a); p += 1) addGiven(board, 1, L - p, digitAt(a, p), { who: 'a', p });
    addGiven(board, 2, 0, '×', { sign: true });
    addGiven(board, 2, L, b, { who: 'b', p: 0 });
    board.rules.push({ row: 3, from: 0, to: L });
    let carry = 0;
    let mulCarryIdx = null;
    for (let p = 0; p < lenOf(a); p += 1) {
      const c = L - p;
      const da = digitAt(a, p);
      const total = da * b + carry;
      const terms = `${da} × ${b}${carry ? ` + ${carry}` : ''}`;
      const phase = `${placeName(p)}の くらい`;
      let mulNoteIdx = null;
      if (notes && total >= 10) {
        mulNoteIdx = board.steps.length;
        pushStep(board, {
          kind: 'note', phase, cell: 'note', expect: String(total), eq: `${terms} =`,
          say: `まず ${terms} を けいさんしよう。いくつかな？`, hint: `${da} × ${b} は ${da * b}${carry ? `。それに ${carry} を たすよ` : ''}`
        });
      }
      const k = addSlot(board, 4, c, 'digit');
      const prodIdx = board.steps.length;
      pushStep(board, {
        kind: 'prod', phase, cell: k, expect: String(total % 10), eq: `${terms} =`, total,
        deps: [mulNoteIdx, mulCarryIdx].filter((x) => x !== null),
        say: total === 10
          ? `${terms} は ちょうど 10！ 10は となりへ ひっこすから、${placeName(p)}の おうちには 0 を 書こう`
          : total >= 10
            ? `${terms} は ${total}。10が ${Math.floor(total / 10)}こと ${total % 10}こ だから、${placeName(p)}の おうちには ${total % 10} だけ 書こう`
            : `${terms} は ${total}。${placeName(p)}の おうちに 書こう`,
        hint: `${terms} は ${total}${total >= 10 ? ` → のこりの ${total % 10}` : ''}`
      });
      carry = Math.floor(total / 10);
      mulCarryIdx = null;
      if (carry > 0) {
        if (p + 1 < lenOf(a)) {
          const ck = addSlot(board, 0, L - (p + 1), 'carry');
          board.cells[ck].carry = true;
          mulCarryIdx = board.steps.length;
          pushStep(board, {
            kind: 'carry', phase, cell: ck, expect: String(carry), deps: [prodIdx],
            say: `10が ${carry}こ だから、${placeName(p + 1)}の おうちに ${carry} を ひっこし！`,
            hint: `${total} の 10の くらいの ${carry} を ちいさく 書くよ`, effect: { type: 'bundle', from: p, to: p + 1 }
          });
        } else {
          const k2 = addSlot(board, 4, L - (p + 1), 'digit');
          pushStep(board, {
            kind: 'carryout', phase, cell: k2, expect: String(carry), deps: [prodIdx],
            say: `のこった ${carry} を そのまま おろそう`, hint: `${carry} を したに おろすよ`
          });
        }
      }
    }
    return board;
  }

  function buildMul2(problem, notes) {
    const { a, b } = problem;
    const b0 = digitAt(b, 0);
    const b1 = digitAt(b, 1);
    const P1 = a * b0;
    const P2 = a * b1;
    const total = a * b;
    const W = lenOf(total);
    const board = newBoard(9, W + 1);
    board.L = W;
    addHeads(board, W);
    for (let p = 0; p < lenOf(a); p += 1) addGiven(board, 1, W - p, digitAt(a, p), { who: 'a', p });
    addGiven(board, 2, 0, '×', { sign: true });
    addGiven(board, 2, W, b0, { who: 'b', p: 0 });
    addGiven(board, 2, W - 1, b1, { who: 'b', p: 1 });
    board.rules.push({ row: 3, from: 0, to: W });
    board.rules.push({ row: 7, from: 0, to: W });

    function multiplyRow(digit, shift, rowIndex, label) {
      let carry = 0;
      for (let p = 0; p < lenOf(a); p += 1) {
        const da = digitAt(a, p);
        const t = da * digit + carry;
        const terms = `${da} × ${digit}${carry ? ` + ${carry}` : ''}`;
        const phase = `${label}・${placeName(p)}の くらい`;
        if (notes && t >= 10) {
          pushStep(board, { kind: 'note', phase, cell: 'note', expect: String(t), eq: `${terms} =`, say: `${terms} は いくつ？`, hint: `${da} × ${digit} は ${da * digit}` });
        }
        const k = addSlot(board, rowIndex, W - (p + shift), 'digit');
        pushStep(board, {
          kind: 'prod', phase, cell: k, expect: String(t % 10), eq: `${terms} =`, total: t,
          say: t >= 10 ? `${t} の 1の くらいの ${t % 10} を 書こう` : `${terms} は ${t}`, hint: `${terms} は ${t}`
        });
        carry = Math.floor(t / 10);
        if (carry > 0) {
          if (p + 1 < lenOf(a)) {
            const ck = addSlot(board, 0, W - (p + 1), 'carry');
            board.cells[ck].carry = true;
            pushStep(board, { kind: 'carry', phase, cell: ck, expect: String(carry), say: `${carry} を ちいさく ひっこし`, hint: `${t} の 10の くらいの ${carry}` });
          } else {
            const k2 = addSlot(board, rowIndex, W - (p + 1 + shift), 'digit');
            pushStep(board, { kind: 'carryout', phase, cell: k2, expect: String(carry), say: `のこった ${carry} を おろそう`, hint: `${carry} を おろすよ` });
          }
        }
      }
    }
    multiplyRow(b0, 0, 4, `${b0}を かける`);
    // 10のくらいの かけ算は、1のくらいに 0 を おく
    const zk = addSlot(board, 5, W, 'digit');
    pushStep(board, { kind: 'zero', phase: `${b1}0を かける`, cell: zk, expect: '0', say: `つぎは ${b1}0 を かけるよ。1の くらいには 0 を おいておこう`, hint: '10の くらいの かけ算だから 1の くらいは 0' });
    multiplyRow(b1, 1, 5, `${b1}0を かける`);
    // たす
    const rowA = String(P1).split('').reverse().map(Number);
    const rowB = String(P2 * 10).split('').reverse().map(Number);
    let carry = 0;
    for (let p = 0; p < W; p += 1) {
      const da = p < rowA.length ? rowA[p] : null;
      const db = p < rowB.length ? rowB[p] : null;
      const phase = `たす・${placeName(p)}の くらい`;
      if (da === null && db === null) {
        const k = addSlot(board, 8, W - p, 'digit');
        pushStep(board, { kind: 'carryout', phase, cell: k, expect: String(carry), say: `のこった ${carry} を おろそう`, hint: `${carry} を おろすよ` });
        continue;
      }
      const t = (da || 0) + (db || 0) + carry;
      const terms = [da, db].filter((x) => x !== null).join(' + ') + (carry ? ' + 1' : '');
      if (notes && t >= 10) {
        pushStep(board, { kind: 'note', phase, cell: 'note', expect: String(t), eq: `${terms} =`, say: `${terms} は いくつ？`, hint: `${terms} を かぞえよう` });
      }
      const k = addSlot(board, 8, W - p, 'digit');
      const alone2 = (da === null) !== (db === null) && !carry;
      const only2 = da !== null ? da : db;
      pushStep(board, {
        kind: 'sum', phase, cell: k, expect: String(t % 10), eq: `${terms} =`, total: t,
        say: alone2 ? `${only2} は そのまま したに おろそう` : t >= 10 ? `${terms} は ${t}。1の くらいの ${t % 10} を 書こう` : `${terms} は ${t}`,
        hint: alone2 ? `うえの ${only2} を そのまま うつすよ` : `${terms} は ${t}`
      });
      if (t >= 10) {
        const ck = addSlot(board, 6, W - (p + 1), 'carry');
        board.cells[ck].carry = true;
        pushStep(board, { kind: 'carry', phase, cell: ck, expect: '1', say: '10こ あつまったから 1を ひっこし', hint: '1を ちいさく 書くよ' });
      }
      carry = t >= 10 ? 1 : 0;
    }
    // ふたつの だんの数を、盤面に あらかじめ印だけ出す（ラベル）
    board.rowLabels = { 4: `${a} × ${b0}`, 5: `${a} × ${b1}0` };
    return board;
  }

  function buildDiv(problem) {
    const { a: dividend, b: divisor } = problem;
    const x = String(dividend).split('').map(Number);
    const n = x.length;
    let s = 1;
    let pv = x[0];
    if (pv < divisor) { s = 2; pv = x[0] * 10 + x[1]; }
    const rounds = n - s + 1;
    const board = newBoard(2 + rounds * 2, n + 4);
    board.L = n;
    board.kind = 'div';
    const col = (i) => 2 + i;
    addGiven(board, 1, 0, divisor, { who: 'divisor' });
    addGiven(board, 1, 1, '）', { bracket: true });
    for (let i = 0; i < n; i += 1) addGiven(board, 1, col(i), x[i], { who: 'dividend', p: n - 1 - i });
    board.rules.push({ row: 1, from: 2, to: n + 1, over: true });
    let i = s - 1;
    let rem = 0;
    let first = true;
    for (let round = 0; round < rounds; round += 1, i += 1) {
      const current = first ? pv : rem * 10 + x[i];
      first = false;
      const q = Math.floor(current / divisor);
      const prod = q * divisor;
      rem = current - prod;
      const pr = 2 + round * 2;
      const dr = pr + 1;
      const label = `${current} ÷ ${divisor}`;
      const qk = addSlot(board, 0, col(i), 'quotient');
      pushStep(board, {
        kind: 'q', phase: 'たてる', cell: qk, expect: String(q), eq: `${label} =`,
        say: current < divisor
          ? `${current} は ${divisor} より ちいさいね。${divisor} は はいるかな？ はいらないときは 0 を 「たてる」よ`
          : `${current} の なかに ${divisor} は なんこ はいる？ うえに 「たてる」よ`,
        hint: current < divisor
          ? `${current} の なかに ${divisor} は 1つも はいらないから 0`
          : `${divisor} の だん で ${current} に ちかい ところを さがそう`
      });
      const prodText = String(prod);
      const pk = addSlot(board, pr, col(i) - prodText.length + 1, 'product', prodText.length);
      addGiven(board, pr, 1, '−', { sign: true });
      pushStep(board, {
        kind: 'prod', phase: 'かける', cell: pk, expect: prodText, eq: `${divisor} × ${q} =`,
        say: q === 0 ? `${divisor} × 0 は 0。0 を したに 書こう` : `${divisor} × ${q} を けいさんして、した に 書こう`,
        hint: `${divisor} × ${q} は ${prod}`
      });
      const remText = String(rem);
      const dk = addSlot(board, dr, col(i) - remText.length + 1, 'remainder', remText.length);
      board.rules.push({ row: dr, from: col(i) - prodText.length + 1, to: col(i), over: true });
      pushStep(board, {
        kind: 'diff', phase: 'ひく', cell: dk, expect: remText, eq: `${current} − ${prod} =`,
        say: prod === 0 ? `0 を ひくから ${current} の まま。そのまま 書こう` : `${current} − ${prod} は いくつ？`,
        hint: prod === 0 ? `なにも ひかないから ${current} の まま` : `${current} から ${prod} を ひくよ`
      });
      if (i < n - 1) {
        const bk = addSlot(board, dr, col(i + 1), 'bring');
        pushStep(board, {
          kind: 'down', phase: 'おろす', cell: bk, expect: String(x[i + 1]), eq: 'おろす',
          say: `つぎの ${x[i + 1]} を したに おろそう`, hint: `うえの ${x[i + 1]} を すぐ したに コピーするよ`
        });
      } else if (rem > 0) {
        board.restCol = n + 3;
        addGiven(board, 0, n + 2, 'あまり', { who: 'rest-label', wide: true });
        const rk = addSlot(board, 0, n + 3, 'rest');
        pushStep(board, {
          kind: 'rest', phase: 'あまり', cell: rk, expect: String(rem),
          say: `もう おろす 数が ないよ。のこった ${rem} が あまり！`, hint: `さいごに のこった ${rem} が あまりだよ`
        });
      }
    }
    return board;
  }

  function buildBoard(problem, options) {
    const notes = !options || options.notes !== false;
    const decoys = Boolean(options && options.decoys);
    let board;
    if (problem.op === 'add') board = buildAdd(problem, notes, decoys);
    else if (problem.op === 'sub') board = buildSub(problem, notes, decoys);
    else if (problem.op === 'mul') board = buildMul(problem, notes);
    else if (problem.op === 'mul2') board = buildMul2(problem, notes);
    else board = buildDiv(problem);
    board.problem = problem;
    board.phases = [];
    for (const step of board.steps) if (!board.phases.includes(step.phase)) board.phases.push(step.phase);
    return board;
  }

  // 書いていく順に、盤面の状態を作る（テスト・描画の共通の土台）
  // 書き終えた手順の番号（さきに 書いた ぶんも ふくむ）を じゅんに ならべる
  function doneList(board, count, early) {
    const list = [];
    for (let i = 0; i < count && i < board.steps.length; i += 1) list.push(i);
    for (const j of Array.from(early || []).sort((x, y) => x - y)) if (j >= count && j < board.steps.length) list.push(j);
    return list;
  }

  // その手順を いま 書いてよいか（まえに 書くべき手順が 終わっているか）
  function isReady(board, index, isDone) {
    const step = board.steps[index];
    if (!step) return false;
    if (step.deps === undefined) {
      for (let i = 0; i < index; i += 1) if (!isDone(i)) return false;
      return true;
    }
    return step.deps.every((i) => isDone(i));
  }

  function applySteps(board, count, early) {
    const filled = {};
    for (const i of doneList(board, count, early)) {
      const step = board.steps[i];
      if (step.cell === 'note') { filled.note = { value: step.expect, history: [] }; continue; }
      const prev = filled[step.cell];
      filled[step.cell] = { value: step.expect, history: prev ? prev.history.concat(prev.value) : [] };
    }
    return filled;
  }

  // 答え（数字）を、盤面の書かれた形から読みとる（検算用）
  function readAnswer(board, filled) {
    const p = board.problem;
    const get = (r, c) => (filled[key(r, c)] ? filled[key(r, c)].value : (board.cells[key(r, c)] && board.cells[key(r, c)].given) || '');
    if (board.kind === 'div') {
      let q = '';
      for (let c = 2; c < board.cols; c += 1) {
        const cell = board.cells[key(0, c)];
        if (cell && cell.slot && cell.kind === 'quotient') q += get(0, c);
      }
      const rest = board.restCol ? get(0, board.restCol) : '';
      return { quotient: Number(q), remainder: rest === '' ? 0 : Number(rest) };
    }
    const rowIndex = p.op === 'mul2' ? 8 : 4;
    let text = '';
    for (let c = 1; c <= board.L; c += 1) text += get(rowIndex, c);
    return { value: Number(text) };
  }

  // ひっこし／かしてもらう の いちごの数（ひゃく・じゅう・いち の おうちごと）
  function tokenCounts(board, doneCount, early) {
    const p = board.problem;
    if (p.op !== 'add' && p.op !== 'sub') return null;
    const L = board.L;
    const counts = new Array(L).fill(0);
    const removed = new Array(L).fill(0);
    const bPart = new Array(L).fill(0); // たし算: あとから くわわる ほう（いろを かえて 見せる）
    if (p.op === 'add') {
      for (let q = 0; q < L; q += 1) { bPart[q] = digitAt(p.b, q); counts[q] = digitAt(p.a, q) + bPart[q]; }
    } else {
      for (let q = 0; q < L; q += 1) counts[q] = digitAt(p.a, q);
    }
    for (const i of doneList(board, doneCount, early)) {
      const step = board.steps[i];
      if (!step.effect) continue;
      if (step.effect.type === 'bundle') {
        const from = step.effect.from;
        counts[from] -= 10; counts[step.effect.to] += 1;
        // まとめる ときは A の いちごから つかい、のこった ぶんが B
        bPart[from] = Math.min(bPart[from], Math.max(0, counts[from]));
      }
      if (step.effect.type === 'borrow') counts[step.effect.place] = step.effect.value;
      if (step.effect.type === 'take') removed[step.effect.place] = step.effect.count;
    }
    return { counts, removed, bPart };
  }

  const engine = Object.freeze({
    LESSONS, SECTIONS, ROUND_MODES, ROUND_LABELS, lessonById, makeProblem, buildBoard, applySteps, readAnswer, tokenCounts, isReady,
    rng, hashText, placeName, countCarries, analyseBorrow, countMulCarries
  });

  global.MathGardenHissanEngine = engine;
  if (typeof module !== 'undefined' && module.exports) module.exports = engine;
}(typeof window !== 'undefined' ? window : globalThis));

/*
 * ここから: 画面と操作。app.js から install() で つなぐ。
 */
(function (global) {
  'use strict';
  const E = global.MathGardenHissanEngine;
  if (!E) return;

  const esc = (value) => String(value ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const ROUNDS = E.ROUND_MODES.length;
  let deps = null;
  let session = null; // いま あそんでいる レッスン（画面を作り直しても残す）
  let keyListenerBound = false;

  // ------------------------------------------------------------------
  // 保存するデータ
  // ------------------------------------------------------------------
  function clampInt(value, lo, hi) {
    const n = Math.floor(Number(value));
    return Number.isFinite(n) ? Math.max(lo, Math.min(hi, n)) : lo;
  }
  function normalise(raw) {
    const source = raw && typeof raw === 'object' && !Array.isArray(raw) ? raw : {};
    const lessons = {};
    const given = source.lessons && typeof source.lessons === 'object' ? source.lessons : {};
    for (const lesson of E.LESSONS) {
      const entry = given[lesson.id];
      if (!entry || typeof entry !== 'object') continue;
      lessons[lesson.id] = {
        cleared: entry.cleared === true,
        stars: clampInt(entry.stars, 0, 3),
        plays: clampInt(entry.plays, 0, 9999)
      };
    }
    return { version: 1, lessons, solved: clampInt(source.solved, 0, 99999) };
  }
  const hs = () => {
    const state = deps.getState();
    state.hissan = normalise(state.hissan);
    return state.hissan;
  };

  // 同じ レッスンの 最初の1もん目は、はじめて 見る前提で ていねいに。
  function isUnlocked(lesson) {
    const index = E.LESSONS.indexOf(lesson);
    const sameSection = E.LESSONS.filter((item) => item.section === lesson.section);
    const first = sameSection[0] === lesson;
    if (first) return true;
    const prev = sameSection[sameSection.indexOf(lesson) - 1];
    return Boolean(hs().lessons[prev.id]?.cleared) || index < 0;
  }
  const nextLessonAfter = (lesson) => {
    const sameSection = E.LESSONS.filter((item) => item.section === lesson.section);
    return sameSection[sameSection.indexOf(lesson) + 1] || null;
  };
  const totalStars = () => E.LESSONS.reduce((sum, lesson) => sum + (hs().lessons[lesson.id]?.stars || 0), 0);

  // ------------------------------------------------------------------
  // あそびの流れ
  // ------------------------------------------------------------------
  function startRound(round) {
    const lesson = session.lesson;
    const mode = E.ROUND_MODES[round];
    const plays = hs().lessons[lesson.id]?.plays || 0;
    session.round = round;
    session.mode = mode;
    session.problem = E.makeProblem(lesson.id, plays * 11 + round * 3 + (session.seedShift || 0));
    session.board = E.buildBoard(session.problem, { notes: mode !== 'solo', decoys: mode === 'solo' });
    session.step = 0;
    session.early = new Set(); // じゅんばんを とばして さきに 書いた手順
    session.typed = '';
    session.selected = null;
    session.showHint = false;
    session.wrongKey = null;
    session.stray = 0;
    session.tries = 0;
    session.reveal = false;
    session.solved = false;
    session.say = '';
    session.roundMistakes = 0;
    session.effectId = 0;
    session.lastEffect = null;
  }

  function openLesson(lessonId) {
    const lesson = E.lessonById(lessonId);
    if (!lesson || !isUnlocked(lesson)) return false;
    const record = hs().lessons[lesson.id] || { cleared: false, stars: 0, plays: 0 };
    session = { lesson, mistakes: 0, hints: 0, soloMistakes: 0, rewards: 0, seedShift: 0, finished: false, lessonDone: false, stars: 0 };
    hs().lessons[lesson.id] = { ...record };
    startRound(0);
    deps.render();
    return true;
  }

  const currentStep = () => (session && session.board.steps[session.step]) || null;

  function clearTyped() { session.typed = ''; }

  function afterCorrect(step) {
    const board = session.board;
    deps.playSfx?.('bloom', 'hissan');
    session.wrongKey = null;
    session.tries = 0;
    session.reveal = false;
    session.showHint = false;
    session.stray = 0;
    session.effectId += 1;
    session.lastEffect = step.effect ? { id: session.effectId, ...step.effect } : null;
    session.step += 1;
    // さきに 書いてあった 手順は とばす
    while (session.early.has(session.step)) session.step += 1;
    clearTyped();
    session.selected = null;
    session.say = '';
    if (session.step >= board.steps.length) completeProblem();
  }

  const isDone = (i) => i < session.step || session.early.has(i);

  // ひとりでの とき、いま 目の前の手順ではない ますに 書いたとき。
  // 書いてよい ますなら（まえの手順に よらない 数なら）さきに 書ける。
  function writeOnOtherCell(digit) {
    const board = session.board;
    const cell = board.cells[session.selected];
    if (!cell || cell.kind === 'decoy') {
      session.say = cell && cell.who === 'b'
        ? `ここは ${E.placeName(cell.p)}の おうち。ならべる 数が ないよ。${session.problem.b} の 1のくらいは いちの おうちだよ`
        : 'ここには なにも 書かないよ';
      return strayTap(session.selected, true);
    }
    let j = -1;
    for (let i = session.step + 1; i < board.steps.length; i += 1) {
      if (board.steps[i].cell === session.selected && !session.early.has(i)) { j = i; break; }
    }
    if (j < 0) {
      session.say = 'ここは もう 書いたよ。ひかっている ますに すすもう';
      return strayTap(session.selected, true);
    }
    if (!E.isReady(board, j, isDone)) {
      session.say = 'ここは まだ あと！ 1のくらいから じゅんばんに 書こうね';
      return strayTap(session.selected, true);
    }
    const step = board.steps[j];
    session.typed += String(digit);
    if (session.typed.length < step.expect.length) { deps.playSfx?.('tap', 'hissan'); deps.render(); return undefined; }
    if (session.typed === step.expect) {
      session.early.add(j);
      deps.playSfx?.('bloom', 'hissan');
      session.effectId += 1;
      session.lastEffect = step.effect ? { id: session.effectId, ...step.effect } : null;
      clearTyped();
      session.selected = null;
      session.wrongKey = null;
      session.say = 'いいね！ そこから 書いたんだね。つぎは どこかな？';
      deps.render();
      return undefined;
    }
    session.mistakes += 1;
    session.roundMistakes += 1;
    session.soloMistakes += 1;
    session.wrongKey = session.selected;
    session.say = 'おしい！ もういちど やってみよう';
    clearTyped();
    deps.playSfx?.('try', 'hissan');
    deps.render();
    return undefined;
  }

  function completeProblem() {
    session.solved = true;
    const result = deps.onProblemSolved?.(session.problem, session.lesson) || {};
    session.rewards += 1;
    session.lastReward = result;
    hs().solved += 1;
    deps.saveState?.();
    deps.triggerMoment?.('correct', 'hissan', null);
  }

  function pressKey(digit) {
    if (!session || session.solved || session.lessonDone) return;
    const step = currentStep();
    if (!step) return;
    if (session.mode === 'demo') return;
    if (session.mode === 'solo' && step.cell !== 'note') {
      if (!session.selected) {
        session.say = 'どこに 書くのかな？ まず ますを タップしてね';
        deps.render();
        return;
      }
      if (session.selected !== step.cell) {
        return writeOnOtherCell(digit);
      }
    }
    session.typed += String(digit);
    if (session.typed.length < step.expect.length) { deps.playSfx?.('tap', 'hissan'); deps.render(); return; }
    if (session.typed === step.expect) { afterCorrect(step); deps.render(); return; }
    // ちがったとき: しかったり ✕を 出さない。ふるえて、ヒントが ふえる。
    session.tries += 1;
    session.mistakes += 1;
    session.roundMistakes += 1;
    if (session.mode === 'solo') session.soloMistakes += 1;
    session.wrongKey = step.cell;
    clearTyped();
    if (session.tries >= 2) { session.showHint = true; session.hints += session.tries === 2 ? 1 : 0; }
    if (session.tries >= 3) session.reveal = true;
    deps.playSfx?.('try', 'hissan');
    deps.render();
  }

  function strayTap(cellKey, keepSay) {
    session.stray += 1;
    if (!keepSay) {
      session.say = session.stray >= 2
        ? 'つぎは きいろく ひかっている ますに 書こう！'
        : 'ひっさんは 1のくらいから じゅんばんに 書くよ';
    } else if (session.stray >= 3) {
      session.say = 'つぎは きいろく ひかっている ますに 書こう！';
    }
    session.wrongKey = cellKey;
    clearTyped();
    deps.playSfx?.('tap', 'hissan');
    deps.render();
  }

  function selectCell(cellKey) {
    if (!session || session.solved || session.mode !== 'solo') return;
    const step = currentStep();
    if (!step) return;
    clearTyped();
    session.wrongKey = null;
    session.selected = cellKey;
    session.say = '';
    deps.playSfx?.('tap', 'hissan');
    deps.render();
  }

  function erase() {
    if (!session || session.solved) return;
    session.typed = session.typed.slice(0, -1);
    deps.render();
  }

  function demoNext() {
    if (!session || session.mode !== 'demo' || session.solved) return;
    const step = currentStep();
    if (step) afterCorrect(step);
    deps.render();
  }

  function giveHint() {
    if (!session || session.solved || session.mode === 'demo') return;
    if (!session.showHint) session.hints += 1;
    session.showHint = !session.showHint;
    deps.render();
  }

  function nextProblem() {
    if (!session || !session.solved) return;
    if (session.round + 1 < ROUNDS) { startRound(session.round + 1); deps.render(); return; }
    finishLesson();
    deps.render();
  }

  function finishLesson() {
    const lesson = session.lesson;
    const record = hs().lessons[lesson.id] || { cleared: false, stars: 0, plays: 0 };
    const soloMistakes = session.soloMistakes;
    const stars = soloMistakes === 0 && session.hints <= 1 ? 3 : soloMistakes <= 3 ? 2 : 1;
    session.stars = stars;
    session.lessonDone = true;
    const first = !record.cleared;
    hs().lessons[lesson.id] = { cleared: true, stars: Math.max(record.stars, stars), plays: record.plays + 1 };
    session.firstClear = first;
    deps.saveState?.();
    deps.triggerMoment?.('correct', 'hissan', { tier: 3, solved: ROUNDS, complete: true });
    deps.onLessonCleared?.(lesson, stars, first);
  }

  function replayLesson() {
    if (!session) return;
    const lesson = session.lesson;
    session = { lesson, mistakes: 0, hints: 0, soloMistakes: 0, rewards: 0, seedShift: 5, finished: false, lessonDone: false, stars: 0 };
    startRound(0);
    deps.render();
  }

  function leave() {
    session = null;
    deps.render();
  }

  // ------------------------------------------------------------------
  // かたち（HTML）
  // ------------------------------------------------------------------
  const art = (id, cls = '') => {
    const src = id === 'berry' ? deps.spriteFile('math/03.png') : deps.spriteUrl(id);
    return `<span class="hissan-art ${cls}" role="img" aria-hidden="true" style="--src:url('${esc(src)}')"></span>`;
  };

  function petVoice() {
    const pet = deps.activePet?.();
    const species = pet?.speciesId || 'cat';
    return { cat: 'にゃ', bunny: 'ぴょん', rabbit: 'ぴょん', puppy: 'わん', fox: 'こん' }[species] || 'にゃ';
  }

  function renderMap() {
    const data = hs();
    const stops = (sec) => E.LESSONS.filter((l) => l.section === sec.id).map((lesson) => {
      const rec = data.lessons[lesson.id];
      const open = isUnlocked(lesson);
      const nextUp = open && !rec?.cleared;
      const stars = rec?.stars || 0;
      return `<button class="hissan-stop ${rec?.cleared ? 'is-cleared' : ''} ${open ? '' : 'is-locked'} ${nextUp ? 'is-next' : ''}" data-action="hissan-open" data-lesson="${lesson.id}" ${open ? '' : 'disabled'} aria-label="${esc(lesson.title)}${rec?.cleared ? `、ほし${stars}` : open ? '' : '、まだ あかないよ'}">
        <span class="hissan-stop-art">${art(lesson.dish.art)}${open ? '' : '<i class="hissan-lock" aria-hidden="true">🔒</i>'}</span>
        <strong>${esc(lesson.title)}</strong>
        <span class="hissan-stop-stars" aria-hidden="true">${[1, 2, 3].map((n) => `<i class="${n <= stars ? 'on' : ''}">★</i>`).join('')}</span>
        ${nextUp ? '<em class="hissan-here">ここから！</em>' : ''}
      </button>`;
    }).join('');
    return `<section class="hissan-screen hissan-map" aria-label="ひっさんキッチン">
      <header class="hissan-head">
        <div><h2>ひっさんキッチン</h2><p>くらいの おうちで、ひっさんを すこしずつ おぼえよう</p></div>
        <span class="hissan-total" aria-label="ほし ${totalStars()}こ">★ ${totalStars()} / ${E.LESSONS.length * 3}</span>
      </header>
      <div class="hissan-path">
        ${E.SECTIONS.map((sec) => `<div class="hissan-row hissan-row--${sec.id}">
          <div class="hissan-row-label"><b>${sec.mark}</b><span>${sec.name}</span></div>
          <div class="hissan-stops">${stops(sec)}</div>
        </div>`).join('')}
      </div>
    </section>`;
  }

  // いちごの おうち（くらいごとの いちご）
  function berries(count, removed, unit, fresh, bPart) {
    const items = [];
    for (let i = 0; i < Math.max(0, count); i += 1) {
      const gone = i >= count - removed;
      const endOfOld = count - (fresh || 0);
      const isB = bPart > 0 && i >= endOfOld - bPart && i < endOfOld;
      items.push(`<i class="hissan-token hissan-token--u${unit} ${gone ? 'is-gone' : ''} ${isB ? 'is-b' : ''} ${fresh && i >= count - fresh ? 'is-new' : ''}">${unit === 0 ? '' : `<b>${unit === 1 ? '10' : unit === 2 ? '100' : '1000'}</b>`}</i>`);
    }
    return items.join('');
  }

  function renderHouses() {
    const b = session.board;
    const info = E.tokenCounts(b, session.step, session.early);
    if (!info) return '';
    const effect = session.lastEffect;
    const houses = [];
    for (let p = b.L - 1; p >= 0; p -= 1) {
      let fresh = 0;
      if (effect?.type === 'bundle' && effect.to === p) fresh = 1;
      if (effect?.type === 'borrow' && effect.place === p) fresh = effect.value >= 10 ? 10 : 0;
      houses.push(`<div class="hissan-house ${fresh ? 'is-moved' : ''}">
        <div class="hissan-roof" aria-hidden="true"></div>
        <b>${esc(E.placeName(p))}の おうち</b>
        <div class="hissan-stuff">${berries(info.counts[p], info.removed[p], p, fresh, info.bPart[p])}</div>
        <small>${info.counts[p] - info.removed[p]}</small>
      </div>`);
    }
    return `<div class="hissan-houses" aria-hidden="true">${houses.join('')}</div>`;
  }

  function renderRibbon() {
    const b = session.board;
    const step = currentStep();
    const phases = b.problem.op === 'div' ? ['たてる', 'かける', 'ひく', 'おろす'] : b.phases.slice(0, 6);
    return `<ol class="hissan-ribbon" aria-label="すすみぐあい">${phases.map((phase) => {
      const active = step && (step.phase === phase || (b.problem.op !== 'div' && step.phase.startsWith(phase.split('・')[0]) && step.phase === phase));
      return `<li class="${active ? 'is-now' : ''}">${esc(phase)}</li>`;
    }).join('')}</ol>`;
  }

  function stepNoteHtml() {
    const b = session.board;
    const step = currentStep();
    // いま 見せる ふせん
    let note = null; let typedValue = '';
    if (step && step.kind === 'note') { note = step; typedValue = session.typed; }
    else if (step) {
      for (let i = session.step - 1; i >= 0 && i >= session.step - 3; i -= 1) {
        const prev = b.steps[i];
        if (prev.kind === 'note' && prev.phase === step.phase) { note = prev; typedValue = prev.expect; break; }
        if (prev.phase !== step.phase) break;
      }
    }
    if (!note) return '';
    const active = step && step.kind === 'note';
    const ghost = active && session.reveal && !typedValue ? note.expect : '';
    return `<div class="hissan-note ${active ? 'is-active' : ''}"><span>${esc(note.eq)}</span><b class="${ghost ? 'is-ghost' : ''}">${esc(typedValue || ghost || '　')}${active && typedValue.length < note.expect.length && !ghost ? '<u></u>' : ''}</b></div>`;
  }

  function rowKind(b, r, hasHeads) {
    const cells = Object.values(b.cells).filter((cell) => cell.r === r);
    const hasRule = b.rules.some((rule) => rule.row === r && !rule.over);
    if (!cells.length && hasRule) return 'rule';
    if (!cells.length) return 'gap';
    if (cells.every((cell) => cell.kind === 'carry' || cell.kind === 'borrow' || cell.slot === false && cell.who === 'rest-label' && false)) return 'small';
    return 'big';
  }

  function renderBoard() {
    const b = session.board;
    const step = currentStep();
    const filled = E.applySteps(b, session.step, session.early);
    const heads = b.problem.op !== 'div';
    const ro = heads ? 1 : 0;
    const rowSizes = [];
    if (heads) rowSizes.push('var(--hc-head)');
    for (let r = 0; r < b.rows; r += 1) {
      const kind = rowKind(b, r, heads);
      rowSizes.push(kind === 'rule' ? '10px' : kind === 'gap' ? '14px' : kind === 'small' ? 'var(--hc-small)' : 'var(--hc-big)');
    }
    const struckCols = new Set();
    const struckMarks = new Set();
    for (const [k, v] of Object.entries(filled)) {
      const cell = b.cells[k];
      if (cell && cell.borrow) struckCols.add(cell.c);
      if (cell && (cell.carry || cell.borrow) && v.history.length) struckMarks.add(k);
    }
    const parts = [];
    if (heads) {
      for (const head of b.heads) {
        parts.push(`<div class="hissan-head-cell" style="grid-row:1;grid-column:${head.c + 1}"><i class="hissan-roof" aria-hidden="true"></i><span>${esc(head.name)}</span></div>`);
      }
    }
    for (const rule of b.rules) {
      parts.push(`<i class="hissan-rule ${rule.over ? 'is-over' : ''}" style="grid-row:${rule.row + 1 + ro};grid-column:${rule.from + 1} / ${rule.to + 2}"></i>`);
    }
    const solo = session.mode === 'solo' && !session.solved;
    for (const cell of Object.values(b.cells)) {
      const area = `grid-row:${cell.r + 1 + ro};grid-column:${cell.c + 1} / span ${cell.span || 1}`;
      if (!cell.slot) {
        const cls = ['hissan-cell', 'is-given'];
        if (cell.sign) cls.push('is-sign');
        if (cell.bracket) cls.push('is-bracket');
        if (cell.who === 'rest-label') cls.push('is-label');
        if (cell.who === 'a' && struckCols.has(cell.c)) cls.push('is-struck');
        parts.push(`<div class="${cls.join(' ')}" style="${area}"><span>${esc(cell.given)}</span></div>`);
        continue;
      }
      const k = `${cell.r},${cell.c}`;
      const value = filled[k]?.value ?? '';
      const history = filled[k]?.history || [];
      const isTarget = step && step.cell === k;
      // ひとりで: どこに 書くかは じぶんで えらぶ。ひかるのは えらんだ ますだけ（まよったら ヒント）
      const isActive = isTarget && (session.mode !== 'solo' || session.selected === k);
      const typed = isActive ? session.typed : '';
      const reveal = isActive && session.reveal ? step.expect : '';
      const cls = ['hissan-cell', 'is-slot', `is-${cell.kind}`];
      if (value) cls.push('is-filled');
      if (isActive && !session.solved) cls.push('is-active');
      if (isTarget && !isActive && !session.solved && session.mode === 'solo' && (session.stray >= 2 || session.showHint)) cls.push('is-hintcell');
      if (session.wrongKey === k) cls.push('is-wrong');
      if (solo && session.selected === k) cls.push('is-picked');
      if (cell.kind === 'carry' || cell.kind === 'borrow') cls.push('is-mark');
      if (cell.kind === 'decoy') cls.push('is-decoy');
      const shown = typed || value || reveal;
      const old = history.length ? `<s>${esc(history[history.length - 1])}</s>` : '';
      const inner = `${old}<span class="${reveal && !typed && !value ? 'is-ghost' : ''}">${esc(shown)}</span>${isActive && !value && !typed && !reveal && session.mode !== 'demo' ? '<u class="hissan-caret"></u>' : ''}`;
      const aria = cell.kind === 'decoy' ? 'ならべる ますの ひとつ' : `${cell.kind === 'carry' ? 'ひっこしの ちいさい 数' : cell.kind === 'borrow' ? 'かりた あとの 数' : 'こたえを 書く ます'}`;
      if (solo) parts.push(`<button class="${cls.join(' ')}" style="${area}" data-action="hissan-cell" data-key="${k}" aria-label="${aria}">${inner}</button>`);
      else parts.push(`<div class="${cls.join(' ')}" style="${area}" aria-label="${aria}">${inner}</div>`);
    }
    return `<div class="hissan-board" data-op="${b.problem.op}" style="--cols:${b.cols};grid-template-columns:repeat(${b.cols}, var(--hc-w));grid-template-rows:${rowSizes.join(' ')}">${parts.join('')}</div>`;
  }

  function equationText(problem) {
    const sign = { add: '＋', sub: '−', mul: '×', mul2: '×', div: '÷' }[problem.op];
    return `${problem.a} ${sign} ${problem.b}`;
  }

  function sayText() {
    const step = currentStep();
    const tail = petVoice();
    if (session.solved) return session.round + 1 >= ROUNDS ? `ぜんぶ できたよ！ すごい${tail}！` : `できたね！ さいごまで 書けたよ`;
    if (session.say) return session.say;
    if (session.showHint && step) return step.hint;
    if (session.mode === 'solo') {
      if (session.wrongKey && session.tries) return 'おしい！ もういちど やってみよう';
      return session.step === 0 ? `ひとりで いけるかな？ 1のくらいから はじめよう` : 'つぎは どこかな？ ますを タップしてね';
    }
    if (session.wrongKey && session.tries) return session.tries >= 3 ? 'いっしょに やろう。うすい 数を なぞってね' : 'だいじょうぶ、もういちど！';
    return step ? step.say : '';
  }

  function renderPad() {
    if (session.mode === 'demo' && !session.solved) {
      return `<div class="hissan-pad hissan-pad--demo"><button class="hissan-next" data-action="hissan-demo-next"><span>つぎへ</span><i aria-hidden="true">▶</i></button><p>ボタンを おすたびに、おともが 1つずつ 書くよ</p></div>`;
    }
    if (session.solved) {
      const last = session.round + 1 >= ROUNDS;
      return `<div class="hissan-pad hissan-pad--done"><button class="hissan-next is-go" data-action="hissan-next"><span>${last ? 'レッスン おわり' : 'つぎの もんだい'}</span><i aria-hidden="true">▶</i></button></div>`;
    }
    const keys = ['7', '8', '9', '4', '5', '6', '1', '2', '3'];
    return `<div class="hissan-pad" role="group" aria-label="すうじ">
      ${keys.map((k) => `<button class="hissan-key" data-action="hissan-key" data-value="${k}">${k}</button>`).join('')}
      <button class="hissan-key hissan-key--erase" data-action="hissan-erase" aria-label="けす">けす</button>
      <button class="hissan-key" data-action="hissan-key" data-value="0">0</button>
      <button class="hissan-key hissan-key--hint ${session.showHint ? 'is-on' : ''}" data-action="hissan-hint" aria-pressed="${session.showHint}" ${session.mode === 'demo' ? 'disabled' : ''}>ヒント</button>
    </div>`;
  }

  function answerText() {
    const p = session.problem;
    return p.op === 'div' ? (p.remainder ? `${p.answer} あまり ${p.remainder}` : `${p.answer}`) : `${p.answer}`;
  }

  function renderLessonDone() {
    const lesson = session.lesson;
    const next = nextLessonAfter(lesson);
    return `<div class="hissan-finish" role="dialog" aria-modal="true" aria-label="レッスン おわり">
      <div class="hissan-finish-card">
        <div class="hissan-finish-art">${art(lesson.dish.art, 'is-big')}<i class="hissan-sparkle s1">✦</i><i class="hissan-sparkle s2">✧</i><i class="hissan-sparkle s3">✦</i></div>
        <h3>${esc(lesson.dish.name)}が できあがり！</h3>
        <p class="hissan-finish-stars" aria-label="ほし ${session.stars}こ">${[1, 2, 3].map((n) => `<i class="${n <= session.stars ? 'on' : ''}">★</i>`).join('')}</p>
        <p class="hissan-finish-note">${session.stars === 3 ? 'ひとりで ばっちり！ ひっさんの めいじん' : session.stars === 2 ? 'じょうず！ もういちどで ★3も ねらえるよ' : 'さいごまで できたね。もういちど やると もっと すらすら'}</p>
        <div class="hissan-finish-actions">
          ${next ? `<button class="primary-button" data-action="hissan-open" data-lesson="${next.id}">つぎの レッスン ▶</button>` : ''}
          <button class="soft-button" data-action="hissan-replay">もういちど</button>
          <button class="soft-button" data-action="hissan-map">ひっさんの みち</button>
        </div>
      </div>
    </div>`;
  }

  function renderPlay() {
    const lesson = session.lesson;
    const b = session.board;
    const p = session.problem;
    const modeLabel = E.ROUND_LABELS[session.mode];
    const dots = Array.from({ length: ROUNDS }, (_, i) => `<i class="${i < session.round || (i === session.round && session.solved) ? 'done' : i === session.round ? 'now' : ''}"></i>`).join('');
    const pet = deps.renderPetCompanion?.(deps.activePet?.(), { compact: true, showName: false }) || '';
    const showHouses = p.op === 'add' || p.op === 'sub';
    return `<section class="hissan-screen hissan-play" data-op="${p.op}" data-mode="${session.mode}" data-solved="${session.solved}" aria-label="${esc(lesson.title)}">
      <header class="hissan-bar">
        <button class="soft-button hissan-back" data-action="hissan-map"><span aria-hidden="true">◀</span> ひっさんの みち</button>
        <div class="hissan-title"><b>${esc(lesson.title)}</b><span class="hissan-mode hissan-mode--${session.mode}">${modeLabel}</span></div>
        <ol class="hissan-dots" aria-label="${session.round + 1}もんめ / ${ROUNDS}もん">${dots}</ol>
      </header>
      <div class="hissan-stage">
        <aside class="hissan-side">
          <div class="hissan-talk">
            <div class="hissan-pet">${pet}</div>
            <p class="hissan-say" aria-live="polite">${esc(sayText())}</p>
          </div>
          ${showHouses ? renderHouses() : ''}
          ${renderRibbon()}
          <p class="hissan-point"><i aria-hidden="true">💡</i><span>${esc(lesson.point)}</span></p>
        </aside>
        <div class="hissan-desk ${session.solved ? 'is-solved' : ''}">
          <div class="hissan-order"><span>${esc(equationText(p))}</span><i>＝</i><b class="${session.solved ? 'is-answer' : ''}">${session.solved ? esc(answerText()) : '?'}</b>${session.solved ? '<i class="hissan-sparkle s1">✦</i><i class="hissan-sparkle s2">✧</i><i class="hissan-sparkle s3">✦</i>' : ''}</div>
          ${stepNoteHtml()}
          <div class="hissan-paper">
            ${renderBoard()}
          </div>
        </div>
        ${renderPad()}
      </div>
      ${session.lessonDone ? renderLessonDone() : ''}
    </section>`;
  }

  function renderScreen() {
    return session ? renderPlay() : renderMap();
  }

  // ------------------------------------------------------------------
  // つなぎこみ
  // ------------------------------------------------------------------
  function handleAction(action, target) {
    switch (action) {
      case 'hissan-open': openLesson(target.dataset.lesson); return true;
      case 'hissan-key': pressKey(target.dataset.value); return true;
      case 'hissan-erase': erase(); return true;
      case 'hissan-cell': selectCell(target.dataset.key); return true;
      case 'hissan-hint': giveHint(); return true;
      case 'hissan-demo-next': demoNext(); return true;
      case 'hissan-next': nextProblem(); return true;
      case 'hissan-replay': replayLesson(); return true;
      case 'hissan-map': leave(); return true;
      default: return false;
    }
  }

  function bindKeys() {
    if (keyListenerBound || typeof document === 'undefined' || !document.addEventListener) return;
    keyListenerBound = true;
    document.addEventListener('keydown', (event) => {
      if (!session || deps.getView().screen !== 'hissan') return;
      if (event.target && /^(INPUT|TEXTAREA|SELECT)$/.test(event.target.tagName)) return;
      const half = String(event.key || '').replace(/[０-９]/g, (c) => String.fromCharCode(c.charCodeAt(0) - 0xFEE0));
      if (/^[0-9]$/.test(half)) { event.preventDefault(); pressKey(half); }
      else if (event.key === 'Backspace') { event.preventDefault(); erase(); }
      else if (event.key === 'Enter' || event.key === ' ') {
        if (session.solved) { event.preventDefault(); nextProblem(); }
        else if (session.mode === 'demo') { event.preventDefault(); demoNext(); }
      }
    });
  }

  function install(adapter) {
    deps = adapter;
    deps.getState().hissan = normalise(deps.getState().hissan);
    bindKeys();
    return api;
  }

  const LANDSCAPE = '(min-width: 900px) and (orientation: landscape)';
  // ノートが つくえに 入りきらないときだけ、ほんの少し ちいさくする
  function afterRender() {
    const paper = typeof document !== 'undefined' ? document.querySelector('.hissan-paper') : null;
    const desk = paper ? paper.closest('.hissan-desk') : null;
    if (!paper || !desk) return;
    paper.style.zoom = '';
    if (!global.matchMedia || !global.matchMedia(LANDSCAPE).matches) return;
    const order = desk.querySelector('.hissan-order');
    const availH = desk.clientHeight - (order ? order.offsetHeight + 10 : 0) - 14;
    const availW = desk.clientWidth - 6;
    if (!availH || !availW || !paper.offsetHeight) return;
    const ratio = Math.min(availH / paper.offsetHeight, availW / paper.offsetWidth);
    // 入りきらないときは ちぢめ、ひろい ときは すこし おおきく（さわりやすく）
    const zoom = Math.min(1.35, Math.max(0.55, ratio * 0.985));
    if (Math.abs(zoom - 1) > 0.02) paper.style.zoom = String(zoom);
  }

  const api = {
    install, normalise, renderScreen, handleAction, afterRender,
    isPlaying: () => Boolean(session),
    peek: () => {
      if (!session) return null;
      const ready = [];
      session.board.steps.forEach((step, i) => {
        if (i < session.step || session.early.has(i) || step.cell === 'note') return;
        if (E.isReady(session.board, i, (k) => k < session.step || session.early.has(k))) ready.push({ index: i, cell: step.cell, expect: step.expect });
      });
      return { mode: session.mode, round: session.round, step: currentStep(), solved: session.solved, lessonDone: session.lessonDone, problem: session.problem, ready, mistakes: session.mistakes, decoys: Object.values(session.board.cells).filter((c) => c.kind === 'decoy').map((c) => `${c.r},${c.c}`) };
    },
    summary: () => ({ stars: session ? 0 : totalStars(), cleared: E.LESSONS.filter((l) => hs().lessons[l.id]?.cleared).length })
  };
  global.MathGardenHissan = Object.freeze({ ...api, engine: E });
}(typeof window !== 'undefined' ? window : globalThis));
