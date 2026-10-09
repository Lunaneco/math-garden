// 通常のセーブを触らずに、販売前の画面テストだけを行える隔離キー。
const QA_MODE = typeof window !== "undefined" && /(?:[?&])qa(?:=1|&|$)/.test(window.location?.search || "");
const STORAGE_KEY = QA_MODE ? "math-garden-prototype-state-v2-qa" : "math-garden-prototype-state-v2";

// 個別に切り出した透過PNGへのマッピング（各シートを丁寧にスライスした素材）。
const SPRITE_SRC = {
  // 建物
  home: "buildings/01.png",
  school: "./assets/generated/garden-help-plaza-20261005.png",
  tree: "buildings/14.png",
  boutique: "buildings/21.png",
  cafe: "buildings/23.png",
  bakery: "buildings/24.png",
  atelier: "buildings/28.png",
  observatory: "buildings/26.png",
  lab: "buildings/29.png",
  // 箱庭・家具
  garden: "furniture/16.png",
  bed: "furniture/05.png",
  monument: "vfx/23.png",
  chair: "furniture/01.png",
  flower: "terrain/25.png",
  // キャラクター
  fairy: "characters/05.png",
  avatar: "characters/01.png",
  teacher: "characters/23.png",
  petRabbit: "characters/27.png",
  petCat: "characters/28.png",
  // 着せ替え
  dress: "dressup/03.png",
  // 学習オブジェクト
  apple: "math/01.png",
  numbers: "math/24.png",
  shapes: "math/41.png",
  clock: "math/51.png",
  ruler: "math/50.png",
  bridge: "./assets/generated/semantic_tokens_2026_10/bridge.png",
  tenFrame: "./assets/sprites2/math2/48.png",
  blocks: "math/15.png",
  pizza: "math/53.png",
  cake: "./assets/generated/semantic_tokens_2026_10/cake.png",
  // 図形（かたち・おおきさ・もよう遊び用）
  shapeCircle: "math/40.png",
  shapeSquare: "math/48.png",
  shapeTriangle: "math/41.png",
  shapeStar: "math/42.png",
  shapeDiamond: "./assets/semantic/diamond.svg",
  // シール・VFX
  stickerHeart: "vfx/30.png",
  stickerStar: "vfx/31.png",
  stickerCloud: "./assets/generated/semantic_tokens_2026_10/cloud.png",
  stickerMacaron: "vfx/34.png",
  stickerFlower: "vfx/33.png",
  stickerBow: "./assets/generated/semantic_tokens_2026_10/bow.png",
  stickerCrystal: "vfx/36.png",
  stickerCandy: "vfx/38.png",
  emoteHappy: "vfx/49.png",
  emoteWave: "vfx/47.png",
  emoteCheer: "vfx/54.png",
  reward: "vfx/25.png",
  // UI
  uiOk: "ui/01.png",
  uiBack: "ui/02.png",
  coin: "ui/25.png",
  gemBlue: "ui/27.png",
  gemPurple: "ui/28.png",
  star: "ui/26.png",
  // ナビゲーション用アイコン（UIキット）
  navIsland: "ui/03.png",
  navLearn: "ui/05.png",
  navDress: "ui/06.png",
  navBoutique: "ui/07.png",
  navStickers: "ui/08.png",
  navNotebook: "ui/26.png",
  navOuting: "ui/04.png",
  navParent: "ui/10.png",
  // ボタン・アイコン
  iconBackArrow: "ui/12.png",
  iconSound: "ui/11.png",
  btnDone: "ui/13.png",
  btnOops: "ui/14.png",
  // フレーム・装飾
  frameWreath: "ui/31.png",
  frameBanner: "ui/35.png",
  cardTreasure: "ui/30.png",
  frameStitched: "ui/33.png",
  // 地形タイル
  tileGrass: "terrain/03.png",
  tileWater: "terrain/06.png",
  tileSand: "terrain/07.png",
  tileFlowerDeco: "terrain/25.png",
  // === v2 追加素材 ===
  lvBadge: "./assets/sprites2/ui2/37.png",
  clockFace: "./assets/sprites2/math2/37.png",
  clockHandMinute: "./assets/sprites2/math2/38.png",
  clockHandHour: "./assets/sprites2/math2/39.png",
  ribbonBar: "./assets/sprites2/math2/45.png",
  tenBlock: "./assets/sprites2/math2/47.png",
  oneBead: "./assets/sprites2/math2/49.png",
  tenFrame2: "./assets/sprites2/math2/48.png",
  opPlus: "./assets/sprites2/math2/31.png",
  opMinus: "./assets/sprites2/math2/32.png",
  opEquals: "./assets/sprites2/math2/33.png",
  opGreater: "./assets/sprites2/math2/35.png",
  opLess: "./assets/sprites2/math2/36.png",
  // 販売版のミッション文脈を増やすための透過トークン。
  // 数学的な表現は既存素材を使い、ここでは「何をしているか」を変える。
  questSeedPacket: "./assets/generated/learning_tokens_v1/final/seed_packet.png",
  questBakeryBread: "./assets/generated/learning_tokens_v1/final/bakery_bread.png",
  questPetBowl: "./assets/generated/learning_tokens_v1/final/pet_bowl.png",
  questYarn: "./assets/generated/learning_tokens_v1/final/yarn_ball_v2.png",
  // 音ミニゲームの主役になる、画像生成した4分割アトラス。
  audioGameAtlas: "./assets/generated/audio_minigames_v1/final/audio_minigame_atlas.png",
  // 小2〜中3の学びの世界。数式やグラフは正確なコード描画、ここは世界へ
  // 入る気分をつくるランドマークだけを imagegen で作っている。
  worldW2: "./assets/generated/curriculum_worlds_v1/final/w2_number_warehouse.png",
  worldW3: "./assets/generated/curriculum_worlds_v1/final/w3_fraction_bakery.png",
  worldW4: "./assets/generated/curriculum_worlds_v1/final/w4_geometry_observatory.png",
  worldW5: "./assets/generated/curriculum_worlds_v1/final/w5_ratio_harbor.png",
  worldW6: "./assets/generated/curriculum_worlds_v1/final/w6_ratio_greenhouse.png",
  worldW7: "./assets/generated/curriculum_worlds_v1/final/w7_integer_tower.png",
  worldW8: "./assets/generated/curriculum_worlds_v1/final/w8_function_skyrail.png",
  worldW9: "./assets/generated/curriculum_worlds_v1/final/w9_root_castle.png",
  gardenExpansionGate: "./assets/generated/garden_expansion_v1/final/garden_expansion_gate.png"
};

const spriteUrl = (id) => {
  const v = SPRITE_SRC[id] || SPRITE_SRC.reward;
  return v.startsWith("./") ? v : `./assets/sprites/${v}`;
};

const spriteFile = (path) => `./assets/sprites/${path}`;

const HELP_DOMAIN_OPTIONS = Object.freeze({
  number: { label: "かず", icon: "🧺" },
  space: { label: "かたち", icon: "🎀" },
  measure: { label: "ながさと じかん", icon: "🧵" },
  data: { label: "グラフ", icon: "🌷" }
});

// 問題ごとに小物の世界を切り替える。数だけが変わる問題ではなく、
// 「今日は何を数える？」の小さな楽しみも残すための素材セット。
const QUESTION_VISUALS = {
  count: [
    { id: "apple", name: "りんご", src: spriteUrl("apple"), tint: "#ff97a9" },
    { id: "strawberry", name: "いちご", src: spriteFile("math/03.png"), tint: "#ff6f8e" },
    { id: "orange", name: "みかん", src: spriteFile("math/08.png"), tint: "#ffc95c" },
    { id: "cherry", name: "さくらんぼ", src: "./assets/generated/semantic_tokens_2026_10/cherry.png", tint: "#e8738c" },
    { id: "blocks", name: "つみき", src: spriteFile("math/16.png"), tint: "#8fcaf4" }
  ],
  compare: [
    { id: "apple", name: "りんご", src: spriteUrl("apple"), tint: "#ff97a9" },
    { id: "strawberry", name: "いちご", src: spriteFile("math/03.png"), tint: "#ff6f8e" },
    { id: "orange", name: "みかん", src: spriteFile("math/08.png"), tint: "#ffc95c" },
    { id: "blocks", name: "つみき", src: spriteFile("math/16.png"), tint: "#8fcaf4" }
  ],
  size: [
    { id: "apple", name: "りんご", src: spriteUrl("apple"), tint: "#ff97a9" },
    { id: "macaron", name: "マカロン", src: spriteUrl("stickerMacaron"), tint: "#c9a4f4" },
    { id: "crystal", name: "きらきらストーン", src: spriteUrl("stickerCrystal"), tint: "#92cfff" },
    { id: "candy", name: "キャンディ", src: spriteUrl("stickerCandy"), tint: "#ffd278" }
  ],
  order: [
    { id: "flower-white", name: "しろいおはな", src: spriteFile("terrain/24.png"), tint: "#fff8e7" },
    { id: "flower-pink", name: "ピンクのおはな", src: spriteFile("terrain/25.png"), tint: "#ff9fbc" },
    { id: "flower-tulip", name: "チューリップ", src: spriteFile("terrain/26.png"), tint: "#ff9fbc" },
    { id: "flower-yellow", name: "きいろのおはな", src: spriteFile("terrain/27.png"), tint: "#ffdc73" }
  ],
  number: [
    { id: "ten-frame", name: "10のまとまり", src: spriteUrl("tenFrame2"), tint: "#8fcaf4" },
    { id: "beads", name: "かずのビーズ", src: spriteUrl("oneBead"), tint: "#ffb2c7" },
    { id: "blocks", name: "ブロック", src: spriteFile("math/16.png"), tint: "#9bcdfa" }
  ],
  add: [
    { id: "apple", name: "りんご", src: spriteUrl("apple"), tint: "#ff97a9" },
    { id: "orange", name: "みかん", src: spriteFile("math/08.png"), tint: "#ffc95c" },
    { id: "beads", name: "ビーズ", src: spriteUrl("oneBead"), tint: "#91d4e8" }
  ],
  subtract: [
    { id: "strawberry", name: "いちご", src: spriteFile("math/03.png"), tint: "#ff6f8e" },
    { id: "cherry", name: "さくらんぼ", src: "./assets/generated/semantic_tokens_2026_10/cherry.png", tint: "#e8738c" },
    { id: "blocks", name: "つみき", src: spriteFile("math/16.png"), tint: "#8fcaf4" }
  ],
  clock: [
    { id: "star", name: "おほしさま", src: spriteUrl("stickerStar"), tint: "#ffdc73" },
    { id: "cloud", name: "くも", src: spriteUrl("stickerCloud"), tint: "#b6dcf7" },
    { id: "crystal", name: "きらきらストーン", src: spriteUrl("stickerCrystal"), tint: "#c7b4f3" }
  ],
  length: [
    { id: "peach-ribbon", name: "ももリボン", tint: "#ff9fbe", hue: "0deg" },
    { id: "sky-ribbon", name: "そらリボン", tint: "#8fd4ff", hue: "130deg" },
    { id: "mint-ribbon", name: "みんとリボン", tint: "#8fdbbc", hue: "200deg" },
    { id: "lavender-ribbon", name: "すみれリボン", tint: "#c8b3ff", hue: "280deg" }
  ]
};

// 問題の数字だけでなく、物語・素材・手つきを変えるミッション設計図。
// 1セッションは各領域から5つを循環させるため、同じ場面を連続させない。
const QUEST_SCENES = Object.freeze({
  orchard: { id: "orchard", name: "くだものばたけ", visual: { id: "apple", name: "りんご", src: spriteUrl("apple"), tint: "#ff97a9" } },
  garden: { id: "garden", name: "たねまきにわ", visual: { id: "seed-packet", name: "たねぶくろ", src: spriteUrl("questSeedPacket"), tint: "#9ed9c4" } },
  bakery: { id: "bakery", name: "パンやさん", visual: { id: "bread", name: "パン", src: spriteUrl("questBakeryBread"), tint: "#ffc95c" } },
  petcare: { id: "petcare", name: "おせわルーム", visual: { id: "pet-bowl", name: "ごはんのおさら", src: spriteUrl("questPetBowl"), tint: "#ff9f9f" } },
  atelier: { id: "atelier", name: "リボンアトリエ", visual: { id: "yarn", name: "けいとのたま", src: spriteUrl("questYarn"), tint: "#c8b3ff" } },
  picnic: { id: "picnic", name: "ピクニック", visual: { id: "cake", name: "ケーキ", src: spriteUrl("cake"), tint: "#ffd278" } },
  ribbon: { id: "ribbon", name: "リボンやさん", visual: { id: "bow", name: "リボン", src: spriteUrl("stickerBow"), tint: "#c9a4f4" } },
  bridge: { id: "bridge", name: "にじのはし", visual: { id: "bridge", name: "はし", src: spriteUrl("bridge"), tint: "#8fcaf4" } },
  clockCafe: { id: "clock-cafe", name: "とけいカフェ", visual: { id: "clock", name: "とけい", src: spriteUrl("clock"), tint: "#bfe5ff" } },
  shapes: { id: "shapes", name: "かたちアトリエ", visual: { id: "shapes", name: "かたち", src: spriteUrl("shapes"), tint: "#bdeedb" } },
  market: { id: "market", name: "おかいものひろば", visual: { id: "coin", name: "コイン", src: spriteUrl("coin"), tint: "#ffdc73" } },
  flowers: { id: "flowers", name: "おはなこみち", visual: { id: "flower", name: "おはな", src: spriteUrl("flower"), tint: "#ff9fbc" } }
});

// 同じミッションを再訪したときも、昨日と同じ小物を連打しないための素材替え。
// 1セッションの場面IDは固定して物語を見失わせず、再プレイでは素材だけを輪番する。
const QUEST_SCENE_VARIANTS = Object.freeze({
  orchard: [
    { id: "apple", name: "りんご", src: spriteUrl("apple"), tint: "#ff97a9" },
    { id: "strawberry", name: "いちご", src: spriteFile("math/03.png"), tint: "#ff6f8e" },
    { id: "orange", name: "みかん", src: spriteFile("math/08.png"), tint: "#ffc95c" }
  ],
  garden: [
    { id: "seed-packet", name: "たねぶくろ", src: spriteUrl("questSeedPacket"), tint: "#9ed9c4" },
    { id: "garden-flower", name: "おはな", src: spriteUrl("flower"), tint: "#ff9fbc" },
    { id: "garden-white-flower", name: "しろいおはな", src: spriteFile("terrain/24.png"), tint: "#fff8e7" }
  ],
  bakery: [
    { id: "bread", name: "パン", src: spriteUrl("questBakeryBread"), tint: "#ffc95c" },
    { id: "cake", name: "ケーキ", src: spriteUrl("cake"), tint: "#ffd278" },
    { id: "macaron", name: "マカロン", src: spriteUrl("stickerMacaron"), tint: "#c9a4f4" }
  ],
  petcare: [
    { id: "pet-bowl", name: "ごはんのおさら", src: spriteUrl("questPetBowl"), tint: "#ff9f9f" },
    { id: "yarn", name: "けいとのたま", src: spriteUrl("questYarn"), tint: "#c8b3ff" },
    { id: "pet-treat", name: "おやつ", src: spriteUrl("stickerCandy"), tint: "#ffd278" }
  ],
  atelier: [
    { id: "yarn", name: "けいとのたま", src: spriteUrl("questYarn"), tint: "#c8b3ff" },
    { id: "atelier-bow", name: "リボン", src: spriteUrl("stickerBow"), tint: "#c9a4f4" },
    { id: "atelier-crystal", name: "きらきらストーン", src: spriteUrl("stickerCrystal"), tint: "#92cfff" }
  ],
  picnic: [
    { id: "cake", name: "ケーキ", src: spriteUrl("cake"), tint: "#ffd278" },
    { id: "pizza", name: "ピザのひときれ", src: spriteUrl("pizza"), tint: "#ffb27a" },
    { id: "picnic-apple", name: "りんご", src: spriteUrl("apple"), tint: "#ff97a9" }
  ],
  ribbon: [
    { id: "bow", name: "リボン", src: spriteUrl("stickerBow"), tint: "#c9a4f4" },
    { id: "ribbon-yarn", name: "けいとのたま", src: spriteUrl("questYarn"), tint: "#c8b3ff" },
    { id: "ribbon-candy", name: "キャンディ", src: spriteUrl("stickerCandy"), tint: "#ffd278" }
  ],
  bridge: [
    { id: "bridge", name: "はし", src: spriteUrl("bridge"), tint: "#8fcaf4" },
    { id: "bridge-block", name: "つみき", src: spriteFile("math/16.png"), tint: "#8fcaf4" },
    { id: "bridge-coin", name: "コイン", src: spriteUrl("coin"), tint: "#ffdc73" }
  ],
  "clock-cafe": [
    { id: "clock", name: "とけい", src: spriteUrl("clock"), tint: "#bfe5ff" },
    { id: "clock-star", name: "おほしさま", src: spriteUrl("stickerStar"), tint: "#ffdc73" },
    { id: "clock-cloud", name: "くも", src: spriteUrl("stickerCloud"), tint: "#b6dcf7" }
  ],
  shapes: [
    { id: "shapes", name: "かたち", src: spriteUrl("shapes"), tint: "#bdeedb" },
    { id: "shape-circle", name: "まる", src: spriteUrl("shapeCircle"), tint: "#8fcaf4" },
    { id: "shape-triangle", name: "さんかく", src: spriteUrl("shapeTriangle"), tint: "#ff9fbe" }
  ],
  market: [
    { id: "coin", name: "コイン", src: spriteUrl("coin"), tint: "#ffdc73" },
    { id: "market-bread", name: "パン", src: spriteUrl("questBakeryBread"), tint: "#ffc95c" },
    { id: "market-apple", name: "りんご", src: spriteUrl("apple"), tint: "#ff97a9" }
  ],
  flowers: [
    { id: "flower", name: "おはな", src: spriteUrl("flower"), tint: "#ff9fbc" },
    { id: "flower-tulip", name: "チューリップ", src: spriteFile("terrain/26.png"), tint: "#ff9fbc" },
    { id: "flower-yellow", name: "きいろのおはな", src: spriteFile("terrain/27.png"), tint: "#ffdc73" }
  ]
});

// 一つのステージは、一つのごっこ世界・一つの主役アイテムで通す。
// 問ごとに別の場所や果物へ替えると、数を学ぶ前に物語が途切れてしまうため、
// mission は「どう解くか」だけを変え、場面は stage から決める。
const STAGE_SCENE_BY_MODE = Object.freeze({
  count: "orchard",
  compare: "flowers",
  shape: "atelier",
  size: "bakery",
  order: "flowers",
  pattern: "ribbon",
  number: "market",
  add: "bakery",
  subtract: "petcare",
  clock: "clock-cafe",
  length: "ribbon"
});

const mission = (id, sceneId, interaction, kind, label) => Object.freeze({ id, sceneId, interaction, kind, label });
const QUESTION_MISSIONS = Object.freeze({
  count: [
    mission("harvest", "orchard", "しゅうかく", "collect", "くだものを あつめよう"),
    mission("plant", "garden", "たねまき", "collect", "たねを うえよう"),
    mission("bakery-count", "bakery", "かずカード", "count-card", "パンを かぞえよう"),
    mission("pet-feed", "petcare", "おせわ", "collect", "おさらに いれよう"),
    mission("craft-tally", "atelier", "しるし", "tally", "けいとを しるしにしよう")
  ],
  compare: [
    mission("flower-pairs", "flowers", "ひとりずつペア", "pair", "おはなを ペアにしよう"),
    mission("picnic-plates", "picnic", "おさらわけ", "pair", "おやつを わけよう"),
    mission("pet-share", "petcare", "おせわくらべ", "pair", "どちらが たりないかな？"),
    mission("bakery-balance", "bakery", "バランス", "balance", "パンの かずをくらべよう"),
    mission("market-more", "market", "おかいものくらべ", "quick-choice", "どちらが たくさん？")
  ],
  shape: [
    mission("atelier-find", "atelier", "かたちさがし", "shape-find", "アトリエで さがそう"),
    mission("garden-sort", "garden", "かたちしわけ", "shape-sort", "たねの かたちをしわけよう"),
    mission("picnic-shape", "picnic", "おさらにあわせる", "shape-find", "おさらのかたちを みつけよう"),
    mission("bridge-tiles", "bridge", "タイルしわけ", "shape-sort", "はしのタイルを えらぼう"),
    mission("market-tags", "market", "タグさがし", "shape-find", "おみせのタグを さがそう")
  ],
  size: [
    mission("bakery-shelf", "bakery", "パンのせいり", "size-sort", "パンを ならべよう"),
    mission("garden-pots", "garden", "はちならべ", "size-sort", "はちを ならべよう"),
    mission("atelier-spools", "atelier", "けいとくらべ", "size-choice", "けいとを くらべよう"),
    mission("picnic-baskets", "picnic", "かごくらべ", "size-choice", "かごを くらべよう"),
    mission("pet-bowls", "petcare", "おさらならべ", "size-sort", "おさらを ならべよう")
  ],
  order: [
    mission("flower-path", "flowers", "こみち", "order-path", "おはなのこみちを すすもう"),
    mission("bakery-line", "bakery", "ならびじゅん", "order-path", "パンやさんのれつを かぞえよう"),
    mission("pet-parade", "petcare", "ならびばんごう", "order-select", "おせわパレードを かぞえよう"),
    mission("ribbon-parade", "ribbon", "パレード", "order-path", "リボンのじゅんばんを みつけよう"),
    mission("garden-row", "garden", "はなだん", "order-select", "はなだんのばんごうを さがそう")
  ],
  pattern: [
    mission("ribbon-repair", "ribbon", "もようしゅうり", "repair", "リボンを なおそう"),
    mission("garden-repeat", "garden", "はなだんリズム", "pattern-compose", "はなだんのリズムを つなごう"),
    mission("bakery-tray", "bakery", "つぎのパン札", "pattern-choice", "つぎのパン札を えらぼう"),
    mission("atelier-stitch", "atelier", "ぬいめリズム", "pattern-compose", "ぬいめのリズムを つなごう"),
    mission("picnic-table", "picnic", "テーブルもよう", "repair", "テーブルを かざろう")
  ],
  number: [
    mission("bundle-build", "bridge", "10のたばづくり", "build", "10のたばを つくろう"),
    mission("market-numberline", "market", "すうじのこみち", "numberline", "すうじのこみちを すすもう"),
    mission("bakery-bundles", "bakery", "パンの数札", "number-card", "パンのかずの札をえらぼう"),
    mission("pet-numberline", "petcare", "おせわカード", "numberline", "おせわカードを えらぼう"),
    mission("garden-tens", "garden", "たねのたば", "build", "たねを10こずつ まとめよう")
  ],
  add: [
    mission("bakery-combine", "bakery", "パンのこたえカード", "result-card", "パンを あわせよう"),
    mission("garden-combine", "garden", "そだてる", "numberline", "たねを あわせよう"),
    mission("pet-meal", "petcare", "ごはんのこたえカード", "result-card", "ごはんを たそう"),
    mission("picnic-add", "picnic", "おやつじゅんび", "numberline", "おやつを そろえよう"),
    mission("bridge-hop", "bridge", "ジャンプ", "numberline", "はしを ジャンプしよう")
  ],
  subtract: [
    mission("pet-takeaway", "petcare", "ごはんのこたえカード", "result-card", "ごはんののこりを しらべよう"),
    mission("bakery-sold", "bakery", "うれたパン", "numberline", "のこりのパンを かぞえよう"),
    mission("garden-pick", "garden", "しゅうかく", "numberline", "のこりのたねを しらべよう"),
    mission("picnic-share", "picnic", "おやつのこたえカード", "result-card", "のこりのおやつを かぞえよう"),
    mission("atelier-use", "atelier", "けいとづかい", "numberline", "のこりのけいとを かぞえよう")
  ],
  clock: [
    mission("clock-cafe", "clockCafe", "カフェよみ", "clock-read", "とけいカフェのじかん"),
    mission("garden-time", "garden", "たねまきのはり", "clock-set", "たねまきのじかんにしよう"),
    mission("bakery-time", "bakery", "パンやのはり", "clock-set", "パンやさんのじかんにしよう"),
    mission("pet-time", "petcare", "おせわよみ", "clock-read", "おせわのじかんを よもう"),
    mission("picnic-time", "picnic", "ピクニックのはり", "clock-set", "ピクニックのじかんにしよう")
  ],
  length: [
    mission("ribbon-length", "ribbon", "リボンじゅん", "length-sort", "リボンを ならべよう"),
    mission("atelier-length", "atelier", "けいとじゅん", "length-sort", "けいとを ならべよう"),
    mission("bakery-measure", "bakery", "パンをはかる", "length-measure", "パンのながさを はかろう"),
    mission("garden-measure", "garden", "つるをはかる", "length-measure", "つるのながさを はかろう"),
    mission("picnic-length", "picnic", "ピクニックじゅん", "length-sort", "ピクニックリボンを ならべよう")
  ]
});

// 100 ステージは「同じ問題を少し難しくしたもの」ではなく、ひとつずつ小さな
// 遊びとして設計する。数値の範囲は既存の問題生成器に任せ、ここでは子どもが
// 見る目的・盤面・手つき・確かめ方・成功の因果を固定する。
const STAGE_ROUND_ORDERS = Object.freeze([
  [0, 1, 2, 3, 4],
  [1, 3, 0, 4, 2],
  [2, 4, 1, 0, 3],
  [3, 0, 4, 2, 1],
  [4, 2, 3, 1, 0],
  [2, 0, 3, 4, 1]
]);

const GAME_BEATS = Object.freeze({
  "count-select": ["みつける", "ゆびで かぞえる", "しるしを つける", "かずを たしかめる", "かんせい"],
  "slot-fill": ["おねがいを きく", "ひとつずつ はこぶ", "ならびを みる", "ぴったりを たしかめる", "かんせい"],
  "pair-link": ["ならべて みる", "ひとりずつ むすぶ", "あまりを みつける", "くらべる", "かんせい"],
  "compare-gate": ["ふたつを みる", "かずを くらべる", "しるしを えらぶ", "もういちど みる", "かんせい"],
  "place": ["おてほんを みる", "ぴったりを さがす", "はめて みる", "かたちを たしかめる", "かんせい"],
  "shape-choice": ["かたちを みる", "ちがいを みつける", "えらぶ", "もういちど みる", "かんせい"],
  "sequence": ["くらべる", "はじめを きめる", "じゅんに ならべる", "さいごを たしかめる", "かんせい"],
  "route-step": ["スタートを みる", "ひとマス すすむ", "あしあとを たどる", "ゴールを たしかめる", "かんせい"],
  "pattern-compose": ["くりかえしを みる", "まとまりを みつける", "あきマスを うめる", "つづきを たしかめる", "かんせい"],
  "builder": ["まとまりを みる", "10こを つくる", "ばらを そろえる", "すうじを たしかめる", "かんせい"],
  "ten-exchange": ["ばらを みる", "10こを まとめる", "たばと ばらを わける", "かずを たしかめる", "かんせい"],
  "clockset": ["じかんを きく", "ながいはりを みる", "はりを うごかす", "じかんを たしかめる", "かんせい"],
  "clock-read": ["ながいはりを みる", "みじかいはりを みる", "じかんを よむ", "くらべる", "かんせい"],
  "unit-ruler": ["0を そろえる", "ますを かぞえる", "めもりを えらぶ", "ながさを たしかめる", "かんせい"],
  "length-choice": ["はしを そろえる", "ますを みる", "くらべる", "えらぶ", "かんせい"],
  "number-choice": ["おてほんを みる", "かずを かぞえる", "すうじを さがす", "たしかめる", "かんせい"]
});

function authoredStageGame(id, title, goal, board, sprite, mechanic, rule, mathematicalInvariant, proofCue, successEffect, reward, effect, rotation = 0, slots = 1) {
  const roundOrder = STAGE_ROUND_ORDERS[Math.abs(rotation) % STAGE_ROUND_ORDERS.length];
  const beats = GAME_BEATS[mechanic] || GAME_BEATS["number-choice"];
  return Object.freeze({
    id,
    gameId: `game:${id}`,
    title,
    goal,
    board,
    scene: board,
    sprite,
    materialRole: sprite,
    mechanic,
    rule,
    mathematicalInvariant,
    proofCue,
    successEffect,
    reward,
    effect,
    slots,
    roundOrder: Object.freeze([...roundOrder]),
    rounds: Object.freeze(roundOrder.map((missionIndex, index) => Object.freeze({
      id: `${id}-round-${index + 1}`,
      missionIndex,
      action: beats[index],
      title: `${beats[index]}・${board}`,
      representation: ["みる", "うごかす", "ならべる", "たしかめる", "できあがり"][index],
      materialRole: `${sprite}-${missionIndex}`,
      finale: index === 4
    }))),
    signature: `${board}|${mechanic}|${rule}|${successEffect}`
  });
}

// 各行が販売版で遊べる一つのミニゲーム。連続するステージが同じ目的・盤面に
// ならないよう、主役のもの・選び方・成功の見え方を明示している。
const STAGE_GAME_CATALOG = Object.freeze({
  count: Object.freeze([
    authoredStageGame("w0-count-1", "ほたるびん", "光るほたるを、びんの丸い席へひとつずつ入れよう。", "ほたるびん", "stickerStar", "slot-fill", "ほたるを1匹ずつ席に入れよう。", "1対1対応と最後の数が全体の数になること", "席がうまるたびに、数えた印が残るよ。", "びんがやさしく発光する", "ほたるが ぴかっ！", "lantern", 0),
    authoredStageGame("w0-count-2", "たねポット", "たねをポットへ植えて、お水の数札を立てよう。", "たねポット", "questSeedPacket", "slot-fill", "ポットをひとつずつうめよう。", "散らばった物も一度ずつ数えること", "植えたポットを指で追うと、二度数えないよ。", "芽がぴょこんと出る", "めが でたよ！", "bloom", 1),
    authoredStageGame("w0-count-3", "しおり図書館", "絵本に星しおりを1枚ずつはさんで、本棚を整えよう。", "しおり図書館", "stickerStar", "slot-fill", "本としおりをひとつずつ組にしよう。", "物と記号を同じ数だけ対応させること", "しおりが入った本だけを数えるよ。", "本棚に星の背表紙が並ぶ", "ほんだなが にっこり！", "sparkle", 2),
    authoredStageGame("w0-count-4", "パンの5ますトレー", "ミニパンを5ますトレーに入れて、注文札に答えよう。", "パンの5ますトレー", "questBakeryBread", "slot-fill", "パンを空いているますへひとつずつ入れよう。", "5の構造を使った数え上げ", "空いているますも見ると、いくつか分かるよ。", "オーブンの扉が開く", "パンが こんがり！", "oven", 3),
    authoredStageGame("w0-count-5", "星のスタンプ帳", "流れ星を見つけて、スタンプ帳に数のしるしを付けよう。", "星のスタンプ帳", "stickerStar", "count-select", "見つけた星をひとつずつしるしにしよう。", "数唱と数の記号化", "星を選ぶたびに、しるしもひとつ増えるよ。", "星シールが貼られる", "きらきら シール！", "sparkle", 4),
    authoredStageGame("w0-count-6", "ふうせんチケット", "ふうせんひとつに入場券ひとつを渡そう。", "ふうせんチケット", "stickerCloud", "slot-fill", "券を渡したふうせんを順に見よう。", "1対1対応で抜けや重なりを見つけること", "券のないふうせんがないか、さいごに見るよ。", "ふうせんが空へふわりと上がる", "ふうせん ふわふわ！", "float", 5),
    authoredStageGame("w0-count-7", "ねこのおやつ皿", "ねこの数だけ、おやつ皿を並べてあげよう。", "ねこのおやつ皿", "petCat", "slot-fill", "ねことお皿をひとつずつ組にしよう。", "対象数を別の物で表すこと", "ねことお皿が同じだけなら、みんなに届くよ。", "ねこのしっぽがゆれる", "ねこが ごきげん！", "pet", 0),
    authoredStageGame("w0-count-8", "ランタンまつり", "道沿いのランタンを順に灯して、まつりの門を開けよう。", "ランタンまつり", "stickerStar", "slot-fill", "手前から順にひとつずつ灯そう。", "順序を保った数唱と総数の理解", "最後に灯った数が、ぜんぶのランタンの数だよ。", "門の上で星がはじける", "まつりの門が ひらいた！", "lantern", 1)
  ]),
  compare: Object.freeze([
    authoredStageGame("w0-compare-1", "おはなのペア", "左右のお花をくらべて、多い方・少ない方・同じを見つけよう。", "おはなのペア", "flower", "pair-link", "ひとりずつ組にしたり、しるしを置いたりして たしかめよう。", "1対1対応で量の大小を比較すること", "組になれなかったお花が多い方を教えてくれるよ。", "花びらがひらひら舞う", "おはなが ひらり！", "bloom", 2),
    authoredStageGame("w0-compare-2", "ピクニックのおさら", "左右のケーキをくらべて、多い方・少ない方・同じを見つけよう。", "ピクニックのおさら", "cake", "pair-link", "ひとりずつ組にしたり、しるしを置いたりして たしかめよう。", "余りから多い・少ないを判断すること", "組になれずに残った方が、たくさんある方だよ。", "テーブルクロスが広がる", "ピクニック かんせい！", "picnic", 3),
    authoredStageGame("w0-compare-3", "うさぎのごはん", "うさぎの2つのお皿のりんごをくらべて、多い方・少ない方・同じを見つけよう。", "うさぎのごはん", "petRabbit", "compare-gate", "ひとりずつ組にしたり、しるしを置いたりして たしかめよう。", "等量も比較の答えになること", "どちらにも余りがなければ、同じだよ。", "うさぎが前足をぱちぱちする", "うさぎが よろこんだ！", "pet", 4),
    authoredStageGame("w0-compare-4", "まほうのてんびん", "左右のいちごをくらべて、多い方・少ない方・同じを見つけよう。", "まほうのてんびん", "numbers", "compare-gate", "ひとりずつ組にしたり、しるしを置いたりして たしかめよう。", "量の比較を記号に表すこと", "しるしの大きい口は、たくさんの方を向くよ。", "てんびんがきらりと光る", "まほう石が ぴかり！", "crystal", 5),
    authoredStageGame("w0-compare-5", "お店の補充係", "左右の棚のパンをくらべて、多い方・少ない方・同じを見つけよう。", "お店の補充係", "questBakeryBread", "pair-link", "ひとりずつ組にしたり、しるしを置いたりして たしかめよう。", "少ない側の認識と比較の転移", "組になれずに残った棚が、パンの多い方だよ。", "お店の看板が点灯する", "おみせが オープン！", "oven", 0),
    authoredStageGame("w0-compare-6", "にじの門番", "左右のくもをくらべて、多い方・少ない方・同じを見つけよう。", "にじの門番", "bridge", "compare-gate", "ひとりずつ組にしたり、しるしを置いたりして たしかめよう。", "多い・少ない・同じを記号へ転移すること", "左右が同じなら、まっすぐな同じしるしだよ。", "にじの橋がのびる", "にじのはしが のびた！", "bridge", 1)
  ]),
  shape: Object.freeze([
    authoredStageGame("w0-shape-1", "かたち郵便", "封筒の穴と同じ形の荷物を郵便受けへ入れよう。", "かたち郵便", "shapes", "place", "色より輪郭を見て、ぴったりの穴へ入れよう。", "輪郭で円・三角・四角を同定すること", "角や丸いところが、かたちの手がかりだよ。", "ポストの旗が上がる", "おてがみ とどいた！", "sparkle", 2),
    authoredStageGame("w0-shape-2", "クッキー型ぬき", "注文カードと同じ抜き型を選んで、生地に押そう。", "クッキー型ぬき", "cake", "place", "色がちがっても、形が同じ型をえらぼう。", "表面属性ではなく形を比較すること", "見本と、かどの数や丸さをくらべるよ。", "クッキーがこんがり焼ける", "クッキー できた！", "oven", 3),
    authoredStageGame("w0-shape-3", "たこ修理", "破れたたこの穴へ、同じ輪郭の布パッチを当てよう。", "たこ修理", "stickerCloud", "place", "穴のふちに合う形を探そう。", "シルエットによる形の照合", "パッチの外側が穴のふちと重なるかな？", "たこが空へ飛び立つ", "たこが たかく とんだ！", "float", 4),
    authoredStageGame("w0-shape-4", "庭の道しるべ", "道の看板と同じ形の石タイルを置いて、小道をつなごう。", "庭の道しるべ", "garden", "place", "看板の形を見て、同じ石を選ぼう。", "混ざった形から対象を分類すること", "色ではなく、形のふちを見よう。", "お花の小道がつながる", "こみちが つながった！", "bloom", 5),
    authoredStageGame("w0-shape-5", "おせんたく仕分け", "丸・三角・四角のワッペンを、同じかごに入れよう。", "おせんたく仕分け", "stickerBow", "place", "ワッペンの形を見て、同じかごへ入れよう。", "属性による分類", "かごのマークと同じふちかを確かめよう。", "洗濯物が風になびく", "せんたくもの ふわり！", "ribbon", 0),
    authoredStageGame("w0-shape-6", "宝箱の鍵", "宝箱の鍵穴にぴったりの形の鍵を差し込もう。", "宝箱の鍵", "stickerCrystal", "place", "大きさや色より、鍵穴の形を見よう。", "大きさ・色が変わっても形は同じとみなすこと", "鍵のふちと鍵穴のふちを重ねて考えるよ。", "宝石がきらりと現れる", "たからもの 発見！", "crystal", 1)
  ]),
  size: Object.freeze([
    authoredStageGame("w0-size-1", "くまのベッド", "3匹のくまを、ぴったりの小中大ベッドへ寝かせよう。", "くまのベッド", "petCat", "sequence", "小さい順に見て、ぴったりのベッドを決めよう。", "同じ基準で大きさを対応させること", "体より小さすぎないベッドかを見よう。", "おやすみ星が灯る", "くまさん おやすみ！", "pet", 2),
    authoredStageGame("w0-size-2", "ケーキの三段さら", "小・中・大のケーキを順に積んで、三段ケーキを作ろう。", "ケーキの三段さら", "cake", "sequence", "小さいケーキから順に選ぼう。", "3段階の大きさの順序づけ", "となり同士をくらべると、順番が見つかるよ。", "ろうそくが灯る", "ケーキが きらきら！", "oven", 3),
    authoredStageGame("w0-size-3", "しゃぼん玉の窓", "窓を通れるいちばん小さいしゃぼん玉を選ぼう。", "しゃぼん玉の窓", "stickerCloud", "shape-choice", "窓の大きさと玉をくらべよう。", "基準を使った最小の選択", "ほかの玉より小さいか、はしを見てくらべよう。", "虹の泡がふわりと飛ぶ", "にじあわ ふわり！", "float", 4),
    authoredStageGame("w0-size-4", "お洋服の箱", "小・中・大のプレゼントを、同じ大きさの箱へしまおう。", "お洋服の箱", "stickerBow", "sequence", "箱とプレゼントの大きさを見くらべよう。", "大きさの対応づけ", "箱のふちに入る大きさかを確かめよう。", "リボンがきゅっと結ばれる", "りぼんを きゅっ！", "ribbon", 5),
    authoredStageGame("w0-size-5", "おはなの背くらべ", "足元をそろえた花から、一番高い鉢を表彰台へ置こう。", "おはなの背くらべ", "flower", "shape-choice", "足元の線から、てっぺんまでをくらべよう。", "始点をそろえた比較", "上の高さだけでなく、足元が同じ線かを見よう。", "花冠がふわりと乗る", "おはなの かんむり！", "bloom", 0),
    authoredStageGame("w0-size-6", "パンやの棚なおし", "大・中・小のパンを棚に並べて、お店を開こう。", "パンやの棚なおし", "questBakeryBread", "sequence", "大きい順を考えて棚へ並べよう。", "逆順を含む大きさの順序づけ", "一番大きいパンを先に見つけると並べやすいよ。", "棚札がすっきり並ぶ", "パンだなが すっきり！", "oven", 1)
  ]),
  order: Object.freeze([
    authoredStageGame("w0-order-1", "うさぎ列車", "切符の『左から○ばんめ』の席に、うさぎを乗せよう。", "うさぎ列車", "petRabbit", "route-step", "左の旗から1席ずつ進もう。", "左起点の序数", "スタートの旗を決めてから数えるよ。", "列車がしゅっぱつする", "しゅっぱつ しんこう！", "bridge", 2),
    authoredStageGame("w0-order-2", "おはなの飛び石", "矢印の出発点から飛び石を進み、指定の石で止まろう。", "おはなの飛び石", "flower", "route-step", "矢印の近くから1歩ずつ進もう。", "起点と順序の理解", "数え始める石を見失わないようにしよう。", "水面がきらめく", "みずべが きらきら！", "bloom", 3),
    authoredStageGame("w0-order-3", "ケーキろうそく", "右から○ばんめのケーキに、ろうそくを立てよう。", "ケーキろうそく", "cake", "route-step", "右のリボンから1つずつ数えよう。", "右起点の序数", "右のはしをスタートにするよ。", "ケーキが明るく光る", "ろうそく ぴかっ！", "oven", 4),
    authoredStageGame("w0-order-4", "パレード写真", "前から○ばんめの動物に、写真枠を当てよう。", "パレード写真", "petRabbit", "route-step", "先頭の旗から順にたどろう。", "対象が変わっても保たれる序数", "誰がいるかより、何番目かを数えるよ。", "写真が現像される", "しゃしん できた！", "sparkle", 5),
    authoredStageGame("w0-order-5", "図書館の本だな", "棚端のしおりから○ばんめの本を抜き出そう。", "図書館の本だな", "stickerStar", "route-step", "しおりのある端から本をたどろう。", "始点を固定した位置の理解", "しおりがスタートのしるしだよ。", "物語のページが開く", "ものがたりが ひらいた！", "sparkle", 0),
    authoredStageGame("w0-order-6", "迷子のこいぬ", "右から○ばんめのおうちへ、こいぬを届けよう。", "迷子のこいぬ", "petCat", "route-step", "右の旗から家をひとつずつたどろう。", "方向を反転した序数の転移", "右から数えるときも、1から始めるよ。", "こいぬがおうちへ帰る", "おうちに かえれた！", "pet", 1)
  ]),
  pattern: Object.freeze([
    authoredStageGame("w0-pattern-1", "ビーズのブレスレット", "空いたマスへ次の色ビーズを入れて、腕輪を直そう。", "ビーズのブレスレット", "oneBead", "pattern-compose", "同じまとまりがくり返す順を見よう。", "AB反復単位の発見", "2つずつ声に出すと、くり返しが見つかるよ。", "腕輪がきらりと光る", "ブレスレット きらり！", "ribbon", 2, 1),
    authoredStageGame("w0-pattern-2", "庭の石だたみ", "道のタイルを同じ順に置いて、庭の道をつなごう。", "庭の石だたみ", "garden", "pattern-compose", "色と形の順番をくり返そう。", "素材が変わっても保たれるAB規則", "最初の2枚が、次でも同じ順かを見よう。", "小道が花で縁取られる", "おにわの道が できた！", "bloom", 3, 1),
    authoredStageGame("w0-pattern-3", "パンのおぼん", "パンとマカロンの並びを見て、欠けた場所を補おう。", "パンのおぼん", "questBakeryBread", "pattern-compose", "おぼんの最初から同じまとまりを探そう。", "位置ではなく反復単位を使うこと", "前の1個だけでなく、2個のまとまりを見るよ。", "ベルがちりんと鳴る", "パンやさん ベル！", "oven", 4, 1),
    authoredStageGame("w0-pattern-4", "まほうダンス", "光る足あとと同じ順で、まほうのリズムを続けよう。", "まほうダンス", "stickerStar", "pattern-compose", "光る順番を声に出してから置こう。", "運動・視覚表象での反復", "同じ2つか3つの足あとがくり返しているよ。", "アバターがくるりと回る", "まほうダンス くるり！", "sparkle", 5, 2),
    authoredStageGame("w0-pattern-5", "リボン織り", "くり返す2枚を使って、織機の空欄を続けよう。", "リボン織り", "stickerBow", "pattern-compose", "同じ2枚の順を、もう一度置こう。", "反復単位を構成すること", "1枚ずつではなく、2枚でひとまとまりだよ。", "長いリボンができる", "りぼんが できた！", "ribbon", 0, 2),
    authoredStageGame("w0-pattern-6", "お茶会クロス", "テーブルクロスの模様を見て、くり返すまとまりを直そう。", "お茶会クロス", "cake", "pattern-compose", "同じ組を見つけて、空きを順に入れよう。", "完成した列から規則を診断すること", "左から2つや3つに区切ると見つけやすいよ。", "テーブルが華やかになる", "おちゃかい じゅんびOK！", "picnic", 1, 2),
    authoredStageGame("w0-pattern-7", "おまじないの石", "3種類のルーン石を読んで、魔法陣の空きを埋めよう。", "おまじないの石", "stickerCrystal", "pattern-compose", "3つの順番が戻る場所を見つけよう。", "ABC反復の予測", "同じ石が来るまでを数えると、まとまりが分かるよ。", "星が魔法陣から出る", "まほうの星 きらり！", "crystal", 2, 1),
    authoredStageGame("w0-pattern-8", "パッチワークの毛布", "2つ続いた空欄を、毛布の模様どおりに縫おう。", "パッチワークの毛布", "questYarn", "pattern-compose", "次の2枚を順番どおりに置こう。", "複数先を見通す反復", "空きの前のまとまりと同じ順を探そう。", "ぬいぐるみがすやすや眠る", "ふわふわ 毛布！", "ribbon", 3, 2)
  ]),
  "w1-count100": Object.freeze([
    authoredStageGame("w1-count100-1", "郵便局の10束", "手紙を10枚ずつ束ねて、住所札を貼ろう。", "郵便局の10束", "questSeedPacket", "ten-exchange", "10こそろったら、1つの束として見よう。", "十と一の合成", "束の数とばらの数を別々に数えるよ。", "配達スタンプが押される", "ゆうびん スタンプ！", "sparkle", 4),
    authoredStageGame("w1-count100-2", "くだもの木箱", "10個入り箱とばらの果物を見て、棚番号を合わせよう。", "くだもの木箱", "apple", "number-choice", "箱は10、ばらは1として読もう。", "十の位と一の位の読み取り", "10の箱が何こかを先に見ると早いよ。", "木箱がきれいに積まれる", "きばこが せいれつ！", "oven", 5),
    authoredStageGame("w1-count100-3", "ロボット電池", "10本パックと単電池を電池室に入れて、パワーを作ろう。", "ロボット電池", "blocks", "builder", "10本パックとばらを分けて選ぼう。", "位ごとの数の構成", "パックは10、単電池は1だよ。", "ロボットの目が点灯する", "ロボット きどう！", "sparkle", 0),
    authoredStageGame("w1-count100-4", "かずの列車", "駅番号の小道を一駅ずつ進んで、指定の駅へ行こう。", "かずの列車", "bridge", "route-step", "数字の並びを1つずつたどろう。", "数の順序と数直線上の位置", "となりの駅は、数が1だけ変わるよ。", "汽笛がぽっぽーと鳴る", "えきに とうちゃく！", "bridge", 1),
    authoredStageGame("w1-count100-5", "すいそうビーズ", "10フレームにビーズを入れて、満杯と残りを読もう。", "すいそうビーズ", "oneBead", "builder", "満杯の10ますと、残りのますを分けよう。", "10のまとまりの可視化", "10ますがいっぱいなら、10が1つだよ。", "魚がすいすい泳ぐ", "おさかな すいすい！", "float", 2),
    authoredStageGame("w1-count100-6", "コインポーチ", "10コイン袋とばらコインをポーチの仕切りへ入れよう。", "コインポーチ", "coin", "builder", "十の仕切りと一の仕切りを分けよう。", "十進位取り", "袋の数が十の位、ばらが一の位だよ。", "ポーチがきらりと閉じる", "コインが きらり！", "crystal", 3),
    authoredStageGame("w1-count100-7", "畑の10列", "一列10粒の苗床を見て、列とばらの数を入れよう。", "畑の10列", "garden", "builder", "10粒の列を先に数えてから、残りを見るよ。", "配列による十の理解", "横一列が10粒のまとまりだよ。", "畑に花が咲く", "はたけに おはな！", "bloom", 4),
    authoredStageGame("w1-count100-8", "宝の地図マス", "十と一のヒントを使って、宝マスへ進もう。", "宝の地図マス", "stickerCrystal", "route-step", "十の目印から、残りを1つずつ進もう。", "数の位置推定", "十の目印を使うと、遠い数も探しやすいよ。", "宝箱が開く", "たからばこ オープン！", "crystal", 5),
    authoredStageGame("w1-count100-9", "リサイクル工房", "ばら10個を束に替えて、100箱へ送ろう。", "リサイクル工房", "blocks", "ten-exchange", "ばらが10こで束1つになるよ。", "10×10=100の構造", "束が10こなら、100の箱に入れられるよ。", "虹の歯車が回る", "にじの はぐるま！", "bridge", 0),
    authoredStageGame("w1-count100-10", "まつりのカウンター", "10列×10のランタンを点検して、100の札を出そう。", "まつりのカウンター", "stickerStar", "number-choice", "10の列が10こあるかを見よう。", "100を全体量として捉えること", "10が10こで、100になるよ。", "会場に花火が上がる", "100まつり はじまり！", "lantern", 1)
  ]),
  "w1-add": Object.freeze([
    authoredStageGame("w1-add-1", "パンのふたつのトレー", "2枚のトレーを大皿へ合流させて、全部の数を作ろう。", "パンのふたつのトレー", "questBakeryBread", "slot-fill", "左右のパンを大皿へ集めよう。", "2群の合併としての加法", "どちらのトレーのパンも数に入るよ。", "オーブンから湯気が出る", "パンが そろった！", "oven", 2),
    authoredStageGame("w1-add-2", "たねののびる道", "芽から水滴の数だけ足あとを進めて、育つ場所へ行こう。", "たねののびる道", "questSeedPacket", "route-step", "今いる数から、前へ1歩ずつ進もう。", "増加としての加算", "進んだ分だけ、数が1ずつ大きくなるよ。", "つるがぐんぐん伸びる", "つるが のびた！", "bloom", 3),
    authoredStageGame("w1-add-3", "おせわごはん足し", "お皿へ追加のごはんを移して、全部の数を数えよう。", "おせわごはん足し", "questPetBowl", "slot-fill", "はじめの分と足す分を、同じお皿で見よう。", "開始量に追加量を合わせること", "あとから入れた分も、ぜんぶ数えるよ。", "ペットがぴょんと喜ぶ", "ごはん できた！", "pet", 4),
    authoredStageGame("w1-add-4", "ピクニックの席", "2つのグループの席を長机に並べて、全員分を数えよう。", "ピクニックの席", "cake", "slot-fill", "ふたつの組を1つの列にしよう。", "部分と全体の関係", "列をつなぐと、全体の人数が見えるよ。", "テーブルでかんぱいする", "かんぱい できた！", "picnic", 5),
    authoredStageGame("w1-add-5", "にじの橋ジャンプ", "スタート札から+の数だけ跳んで、にじの橋を渡ろう。", "にじの橋ジャンプ", "bridge", "route-step", "+の数だけ、前へ1マスずつ進もう。", "数直線での加法", "スタートから進んだ先が答えだよ。", "橋ににじがかかる", "にじを わたれた！", "bridge", 0),
    authoredStageGame("w1-add-6", "シールアルバム", "左右のページのシールを、ぜんぶポケットに集めよう。", "シールアルバム", "stickerHeart", "slot-fill", "左も右も、同じポケットへ集めよう。", "離れた群の合成", "ページが違っても、集めた数はぜんぶだよ。", "アルバムがぱたんと閉じる", "シールが いっぱい！", "sparkle", 1),
    authoredStageGame("w1-add-7", "乗客の乗る列車", "駅で乗った人の分だけ座席を埋めて、到着人数を出そう。", "乗客の乗る列車", "petRabbit", "slot-fill", "乗る前の人と、新しい人を合わせよう。", "乗車による増加", "新しく乗った人も、列車の中の人数だよ。", "発車ベルが鳴る", "しゅっぱつ ベル！", "bridge", 2),
    authoredStageGame("w1-add-8", "まほうのあわ", "色の違う泡を大きなびんに混ぜて、目盛りを上げよう。", "まほうのあわ", "stickerCloud", "route-step", "泡が増えるたび、目盛りを1つ進めよう。", "合流後の量としての加法", "色が違っても、泡は同じ1こずつだよ。", "びんの色が変わる", "まほうの色に なった！", "float", 3),
    authoredStageGame("w1-add-9", "ランタンの灯り", "点いている灯りに新しい灯りを足して、夜空の札を作ろう。", "ランタンの灯り", "stickerStar", "slot-fill", "前の灯りに、新しい灯りを足そう。", "加算で量が保存されること", "消えた灯りはないから、全部を数えるよ。", "夜空が明るくなる", "よぞらが ぴかぴか！", "lantern", 4),
    authoredStageGame("w1-add-10", "つみきの塔", "届いたブロックを塔へ連結して、高さカウンターを進めよう。", "つみきの塔", "blocks", "route-step", "今の高さから、届いた数だけ進もう。", "垂直配置でも変わらない加法", "上に積んでも、数は1つずつ増えるよ。", "塔に旗が立つ", "たかい塔 できた！", "bridge", 5),
    authoredStageGame("w1-add-11", "おとどけバッグ", "2つのバッグを空けて、全部の手紙に荷札をつけよう。", "おとどけバッグ", "stickerStar", "slot-fill", "バッグの順番に関係なく、全部を集めよう。", "順序を変えても和が同じこと", "先にどちらを数えても、全部なら同じだよ。", "配達車が出発する", "おとどけ しゅっぱつ！", "sparkle", 0),
    authoredStageGame("w1-add-12", "パーティーのなかまたち", "先に来た組と後から来た組を輪に集めて、クラッカーを鳴らそう。", "パーティーのなかまたち", "stickerCandy", "slot-fill", "ふたつの組を1つの輪にしよう。", "文脈が変わっても使える加法", "輪の中にいる人を全部数えるよ。", "クラッカーがやさしく開く", "パーティー はじまり！", "sparkle", 1)
  ]),
  "w1-subtract": Object.freeze([
    authoredStageGame("w1-subtract-1", "クッキーのおすそわけ", "トレーのクッキーをお土産袋へ移して、残りを数えよう。", "クッキーのおすそわけ", "cake", "slot-fill", "渡した分を別の袋へよけよう。", "全体から取り去る減法", "トレーに残っている分だけを数えるよ。", "お土産袋が結ばれる", "おすそわけ できた！", "picnic", 2),
    authoredStageGame("w1-subtract-2", "おはなのしゅうかく", "花壇から摘んだ花をかごへ入れて、残りを見よう。", "おはなのしゅうかく", "flower", "slot-fill", "摘んだ花と花壇の花を分けよう。", "取り去りによる減少", "かごに移った花は、花壇には残らないよ。", "花束ができる", "はなたば できた！", "bloom", 3),
    authoredStageGame("w1-subtract-3", "ねこのおやつタイム", "食べた分を食べた箱へ移して、お皿の残りを出そう。", "ねこのおやつタイム", "petCat", "slot-fill", "食べた分をよけて、残った分を見よう。", "開始量−食べた量", "お皿に残る数が答えだよ。", "ねこが満足そうに伸びる", "ねこが まんぞく！", "pet", 4),
    authoredStageGame("w1-subtract-4", "列車をおりる乗客", "車内から降り口へ人を移して、次の駅までの人数を出そう。", "列車をおりる乗客", "petRabbit", "slot-fill", "降りた人と車内の人を分けよう。", "減少としての減算", "降り口にいる人は、もう車内にはいないよ。", "ドアがしずかに閉じる", "つぎのえきへ！", "bridge", 5),
    authoredStageGame("w1-subtract-5", "ふうせんポン", "空のふうせんを雲の箱へ移して、残りで空を飾ろう。", "ふうせんポン", "stickerCloud", "slot-fill", "雲へ行った分を分けて、空の残りを見よう。", "物が減ることの視覚化", "雲の箱へ移ったふうせんは、空には残らないよ。", "残りのふうせんがゆれる", "そらが ふわふわ！", "float", 0),
    authoredStageGame("w1-subtract-6", "毛糸のつかいみち", "使った長さだけ目盛りを戻って、残る毛糸を見つけよう。", "毛糸のつかいみち", "questYarn", "route-step", "使った分だけ、後ろへ1マスずつ戻ろう。", "数直線での減法", "戻った先が、残りの数だよ。", "小さなリボンができる", "けいとの リボン！", "ribbon", 1),
    authoredStageGame("w1-subtract-7", "シールはがし帳", "使ったシールをカードへ移して、残りの札を置こう。", "シールはがし帳", "stickerHeart", "slot-fill", "使った分をページから別の場所へ移そう。", "別表象での残りの理解", "ページに残っているシールだけを数えるよ。", "カードが完成する", "カード かんせい！", "sparkle", 2),
    authoredStageGame("w1-subtract-8", "図書館のかしだし", "棚の本を貸出かごへ出して、棚に残る本を点検しよう。", "図書館のかしだし", "stickerStar", "slot-fill", "貸す本と棚に残る本を分けよう。", "全体・取り去り・残りの関係", "貸出かごの本は、棚の数には入れないよ。", "返却スタンプが押される", "かしだし OK！", "sparkle", 3),
    authoredStageGame("w1-subtract-9", "すいそうのおさんぽ", "魚の足あとを後ろへたどって、元の水槽の残りマスで止まろう。", "すいそうのおさんぽ", "oneBead", "route-step", "泳いで行った分だけ、後ろへ進もう。", "数直線での減少", "魚が出発した場所から、戻る数を数えるよ。", "泡がぽこぽこと出る", "あわが ぽこぽこ！", "float", 4),
    authoredStageGame("w1-subtract-10", "すなのおしろ貝がら", "飾り貝を箱へ集めて、お城に残る貝を数えよう。", "すなのおしろ貝がら", "stickerCrystal", "slot-fill", "箱へ移した貝と、お城の貝を分けよう。", "配置が変わっても残りが保たれること", "箱に入った貝は、残りの城にはいないよ。", "お城に旗が立つ", "おしろ かんせい！", "crystal", 5),
    authoredStageGame("w1-subtract-11", "ねがいのキャンドル", "消した灯りを月の箱へ送り、残った灯りを表示しよう。", "ねがいのキャンドル", "stickerStar", "slot-fill", "消した灯りを別の箱へ移そう。", "消去ではなく取り除きとしての減法", "月の箱へ行った灯りを引くと、残りが見えるよ。", "月がきらめく", "つきが きらり！", "lantern", 0),
    authoredStageGame("w1-subtract-12", "おやつののこり", "配ったおやつの数だけ道を戻り、残数カードを出そう。", "おやつののこり", "stickerCandy", "route-step", "配った数だけ、数の道を後ろへ進もう。", "物語から式へ移す減法", "戻った先の数が、おやつの残りだよ。", "みんなが手を振る", "おやつタイム おしまい！", "picnic", 1)
  ]),
  "w1-clock": Object.freeze([
    authoredStageGame("w1-clock-1", "とけいカフェ開店", "時計を読んで、開店の『○じ』看板を掛けよう。", "とけいカフェ開店", "clock", "clock-read", "長い針と短い針を順に見よう。", "長針12・短針時の読み取り", "長い針が12なら、ぴったりの時だよ。", "カフェのドアが開く", "カフェ オープン！", "oven", 2),
    authoredStageGame("w1-clock-2", "たねまきの時間", "じょうろが動く時刻に、時計の針を合わせよう。", "たねまきの時間", "questSeedPacket", "clockset", "まず長い針、次に短い針を合わせよう。", "正時を時計で構成すること", "長い針が12、短い針が時を指すよ。", "芽が出る", "めが ぴょこん！", "bloom", 3),
    authoredStageGame("w1-clock-3", "パンやのオーブン", "焼き上がり札を見て、オーブン時計を設定しよう。", "パンやのオーブン", "questBakeryBread", "clockset", "札の時刻に、2本の針を合わせよう。", "時刻表記から時計への転換", "半なら長い針は6の場所だよ。", "パンの香りが広がる", "パンが やけた！", "oven", 4),
    authoredStageGame("w1-clock-4", "ペットのおせわ予定", "ごはんの時間と同じ時計を選んで、部屋へ届けよう。", "ペットのおせわ予定", "petRabbit", "clock-read", "時計の2本の針を見くらべよう。", "複数時計の読み取り", "長い針を先に見ると、時と半が分かるよ。", "ペットがお出迎えする", "おせわ ばっちり！", "pet", 5),
    authoredStageGame("w1-clock-5", "列車の発車ベル", "切符の時刻に合う時計を選んで、ベルを鳴らそう。", "列車の発車ベル", "bridge", "clock-read", "切符の時刻と針を見比べよう。", "時計と記号的時刻の対応", "短い針の近くの数字が時を教えてくれるよ。", "列車が出発する", "ベルが ちりん！", "bridge", 0),
    authoredStageGame("w1-clock-6", "おやすみ月ランプ", "月の依頼どおり『○じはん』に針を設定しよう。", "おやすみ月ランプ", "stickerCloud", "clockset", "長い針を6にして、短い針を間へ動かそう。", "半時の構成", "半のとき短い針は、次の数字の手前だよ。", "月ランプがやさしく光る", "おやすみ ランプ！", "lantern", 1),
    authoredStageGame("w1-clock-7", "おとどけの時計道", "時計カードを早い順に読んで、指定の家へ届けよう。", "おとどけの時計道", "stickerStar", "clock-read", "朝から夜へ、時刻の順を考えよう。", "時刻の順序", "時計の数字が小さい時から順に並べてみよう。", "郵便旗が上がる", "おとどけ できた！", "sparkle", 2),
    authoredStageGame("w1-clock-8", "おたんじょうびアラーム", "招待状の時間どおりに、目覚まし時計を作ろう。", "おたんじょうびアラーム", "cake", "clockset", "招待状を見て、両方の針を合わせよう。", "読取りと設定の統合", "作った後に、札の時刻をもう一度読むよ。", "ケーキのろうそくが灯る", "おたんじょうび おめでとう！", "sparkle", 3)
  ]),
  "w1-shape": Object.freeze([
    authoredStageGame("w1-shape-1", "ステッカー郵便", "形シールを輪郭別の封筒へ仕分けよう。", "ステッカー郵便", "shapes", "place", "色や柄より、外側の形を見よう。", "多属性でも形で分類すること", "封筒のマークと同じふちかを見よう。", "配達鳥が飛ぶ", "シールを おとどけ！", "sparkle", 4),
    authoredStageGame("w1-shape-2", "おしゃれミラー", "服の飾りと同じ輪郭のアクセサリーを、鏡の枠へ入れよう。", "おしゃれミラー", "stickerHeart", "place", "向きや色が違っても、輪郭をくらべよう。", "回転・色の違いに左右されない形", "角と丸い場所の順を見よう。", "鏡がきらめく", "ミラー きらり！", "crystal", 5),
    authoredStageGame("w1-shape-3", "にじ橋タイル", "橋の穴と同じ形のタイルを選んで、橋を直そう。", "にじ橋タイル", "bridge", "place", "穴のふちにぴったり重なる形を選ぼう。", "空間的な輪郭照合", "タイルの向きより、外のふちを見るよ。", "にじ橋が完成する", "にじ橋 かんせい！", "bridge", 0),
    authoredStageGame("w1-shape-4", "クッキー工房注文", "注文票の形だけを選んで、クッキー箱へ入れよう。", "クッキー工房注文", "cake", "shape-choice", "同じ形をいくつも見つけよう。", "同形の集合抽出", "色が違っても、同じふちなら仲間だよ。", "クッキー箱が閉じる", "クッキー いっぱい！", "oven", 1),
    authoredStageGame("w1-shape-5", "たこの帆修理", "回った帆の穴へ、同じ形のパッチを当てよう。", "たこの帆修理", "stickerCloud", "place", "回っていても、角や辺の数を見よう。", "向きが変わっても形は同じこと", "くるっと回しても、形の仲間は同じだよ。", "たこが空へ飛ぶ", "たこが とんだ！", "float", 2),
    authoredStageGame("w1-shape-6", "アトリエ展示額", "角の数ヒントに合う作品を、展示額へ飾ろう。", "アトリエ展示額", "atelier", "place", "角の数と形の名前をつなげよう。", "辺・角の属性と言葉の接続", "丸には角がなく、三角には3つあるよ。", "ギャラリーが点灯する", "てんじ かんせい！", "crystal", 3),
    authoredStageGame("w1-shape-7", "お店の形看板", "看板の影と同じ屋根マークを探して、店を開こう。", "お店の形看板", "bakery", "shape-choice", "影の外側を見て、同じ形を探そう。", "実物文脈での形識別", "中の色が見えなくても、影のふちが手がかりだよ。", "お店の看板が点灯する", "おみせが ひらいた！", "oven", 4),
    authoredStageGame("w1-shape-8", "ステンドグラス窓", "指定の形を順番どおり窓へ置いて、絵を完成させよう。", "ステンドグラス窓", "stickerCrystal", "place", "形の名前と順番を両方見よう。", "複数形の識別と順序保持", "置く前に、次の形を声に出してみよう。", "窓から虹色の光が差す", "まどが にじいろ！", "crystal", 5)
  ]),
  "w1-length": Object.freeze([
    authoredStageGame("w1-length-1", "リボン背くらべ", "端を同じ線にそろえたリボンを、短い順に置こう。", "リボン背くらべ", "stickerBow", "sequence", "左の端をそろえてから、短い順にしよう。", "直接比較と端そろえ", "端が同じなら、右の先を見ると分かるよ。", "リボンが結ばれる", "りぼんを きゅっ！", "ribbon", 0),
    authoredStageGame("w1-length-2", "くつひもぴったり", "靴に合う長さのひもを選んで、穴を通そう。", "くつひもぴったり", "stickerBow", "length-choice", "靴の端まで届くひもをくらべよう。", "用途に必要な長さを比較すること", "短すぎず、長すぎないひもを見よう。", "靴がぴょんと跳ねる", "くつが ぴょん！", "ribbon", 1),
    authoredStageGame("w1-length-3", "つるのものさし", "定規の0をつるの始まりに合わせて、終わりの目盛りを読もう。", "つるのものさし", "ruler", "unit-ruler", "0の線から、同じますを数えよう。", "同じ単位で測り0を合わせること", "0から始めないと、長さがずれてしまうよ。", "つるに花が咲く", "つるに おはな！", "bloom", 2),
    authoredStageGame("w1-length-4", "パンやの長さ札", "パンをマス目に置いて、何ますかの札を掛けよう。", "パンやの長さ札", "questBakeryBread", "unit-ruler", "パンのはしを0にそろえて、ますを数えよう。", "等単位の数え上げ", "ますにすき間や重なりがないか見よう。", "パン袋に札が付く", "ながさ札 できた！", "oven", 3),
    authoredStageGame("w1-length-5", "おもちゃ列車レール", "長さの違うレールを短い順に接続して、駅まで伸ばそう。", "おもちゃ列車レール", "bridge", "sequence", "端をそろえて、短いレールから選ぼう。", "長さの順序づけ", "となりのレールと先端をくらべるよ。", "列車が通る", "れっしゃが とおった！", "bridge", 4),
    authoredStageGame("w1-length-6", "ピクニックシート", "ゼロ線にそろえたシートをくらべて、長い方を広げよう。", "ピクニックシート", "cake", "length-choice", "同じ始まりの線から、先端をくらべよう。", "直接比較の基準", "右の端が遠い方が、長いシートだよ。", "お弁当が広がる", "ピクニック じゅんび！", "picnic", 5),
    authoredStageGame("w1-length-7", "毛糸カット工房", "注文の『○ます』まで毛糸を測って、カッターで止めよう。", "毛糸カット工房", "questYarn", "unit-ruler", "0から注文のますまで数えよう。", "指定量を測って作ること", "注文札の数と、目盛りの数を同じにするよ。", "小さなポンポンができる", "ぽんぽん できた！", "ribbon", 0),
    authoredStageGame("w1-length-8", "橋板の安全点検", "橋の隙間を覆える、いちばん短い板を選ぼう。", "橋板の安全点検", "bridge", "length-choice", "隙間の長さに届く板をくらべよう。", "長さ比較を目的に適用すること", "届かない板は短すぎるから、渡れないよ。", "安全な橋ができる", "あんしん はし！", "bridge", 1),
    authoredStageGame("w1-length-9", "本だなの背表紙テープ", "本の高さに合うテープを測って、背表紙へ貼ろう。", "本だなの背表紙テープ", "stickerStar", "unit-ruler", "本の下を0にそろえて、上まで数えよう。", "測定の別場面への転移", "テープの始まりを本の下と同じにするよ。", "本棚が虹色になる", "ほんだなが にじいろ！", "ribbon", 2),
    authoredStageGame("w1-length-10", "まつりのガーランド", "測ったリボンを短い順に結んで、まつりの飾りを作ろう。", "まつりのガーランド", "stickerStar", "unit-ruler", "まず測ってから、長さの順に見よう。", "測定・比較・順序づけの統合", "測った数を使って、短い順を確かめよう。", "会場の飾りがゆれる", "まつりの かざり！", "lantern", 3)
  ])
});

// 音を「正解した時のおまけ」にせず、操作そのものにするためのゲーム設計。
// どのステージにも固有タイトルと、聞く・まねる・置く・進むという遊びの約束を
// 与える。特に最初の8面は、同じ収集ゲームの難度違いにならないよう固定している。
const AUDIO_GAME_FAMILIES = Object.freeze({
  "maraca-count": Object.freeze({
    title: "ポンポン木琴の森", asset: "maraca", palette: "marimba", interaction: "count",
    line: "1こ触ると1音。音の数が、そのまま数になるよ。 ",
    rule: "もう鳴らした実には小さな印が残るから、あわてなくて大丈夫。",
    rounds: ["きいてみる", "ひとつずつ鳴らす", "数札をみる", "音をそろえる", "森の合奏"]
  }),
  "bird-echo": Object.freeze({
    title: "ことり郵便のおとまね", asset: "lantern", palette: "bell", interaction: "echo",
    line: "ことりの短いメロディを、光る巣の太鼓でまねしよう。 ",
    rule: "何回でも『きく』を押せるよ。音が消えていても光の順で遊べるよ。",
    rounds: ["おとをきく", "ひとつまねる", "つづきをまねる", "おとをたしかめる", "おてがみ完成"]
  }),
  "bakery-beat": Object.freeze({
    title: "パンやさんの拍トレー", asset: "drum", palette: "drum", interaction: "pack",
    line: "パンを置くたびに手拍子。空いた拍をうめて注文を仕上げよう。 ",
    rule: "空いた席が淡く光るから、数え直しも楽しいよ。",
    rounds: ["注文をきく", "拍をうめる", "まとまりをみる", "ベルをならす", "焼き上がり"]
  }),
  "lantern-trace": Object.freeze({
    title: "ほたる合唱ランタン", asset: "lantern", palette: "bell", interaction: "trace",
    line: "順に灯りをなぞると、音がだんだん高くなるよ。 ",
    rule: "次の灯りだけがやさしく光るので、道をまちがえてもやり直せるよ。",
    rounds: ["灯りをみる", "はじめを鳴らす", "順になぞる", "最後の音をきく", "合唱完成"]
  }),
  "cat-ensemble": Object.freeze({
    title: "ねこカフェ・おやつ合奏", asset: "drum", palette: "pluck", interaction: "pair",
    line: "ねことお皿を1組にすると、やさしいリズムが1拍ずつ増えるよ。 ",
    rule: "線をほどいて組み直せるから、失敗の音は鳴らないよ。",
    rounds: ["なかまをみる", "1組つなぐ", "拍をふやす", "余りをみる", "みんなの合奏"]
  }),
  "balloon-harp": Object.freeze({
    title: "ふうせんハープ", asset: "maraca", palette: "harp", interaction: "pluck",
    line: "ふうせんの弦を弾くと、選んだ数だけ和音が育つよ。 ",
    rule: "ひとつだけ戻せるから、好きな順で音を重ねられるよ。",
    rounds: ["弦をきく", "ひとつ弾く", "和音を重ねる", "数をたしかめる", "空へふわり"]
  }),
  "seed-loop": Object.freeze({
    title: "たねのリズム畑", asset: "xylophone", palette: "xylophone", interaction: "loop",
    line: "色のたねで短いリズムを作り、くり返しを育てよう。 ",
    rule: "作ったループは何度でも聞き直せるから、じっくり試せるよ。",
    rounds: ["たねをきく", "順をみつける", "リズムを置く", "くり返す", "花のメロディ"]
  }),
  "star-dance": Object.freeze({
    title: "星のダンスマット", asset: "xylophone", palette: "marimba", interaction: "route",
    line: "1拍で1歩。星の足あとを進んで、音の道を完成させよう。 ",
    rule: "タイマーもライフもないよ。次の足あとを見てゆっくり進めるよ。",
    rounds: ["スタートをきく", "1歩すすむ", "拍をつなぐ", "ゴールをみる", "星ダンス"]
  }),
  "shape-chime": Object.freeze({
    title: "かたちチャイム工房", asset: "lantern", palette: "bell", interaction: "choice",
    line: "かたちごとのチャイムを鳴らして、ぴったりの音を探そう。 ",
    rule: "色だけでなく、角や丸さを見て選べるよ。",
    rounds: ["音をきく", "輪郭をみる", "チャイムを選ぶ", "ふちをたしかめる", "工房オープン"]
  }),
  "size-orchestra": Object.freeze({
    title: "おおきさオーケストラ", asset: "maraca", palette: "harp", interaction: "choice",
    line: "大きさごとに高さの違う音を鳴らして、主役を選ぼう。 ",
    rule: "音を消していても、土台の線と大きさで比べられるよ。",
    rounds: ["ならびをみる", "音をきく", "大きさをくらべる", "主役を選ぶ", "拍手タイム"]
  }),
  "chord-gate": Object.freeze({
    title: "にじのコード門", asset: "xylophone", palette: "xylophone", interaction: "pair",
    line: "左右の音を1組ずつそろえて、門を開くコードを作ろう。 ",
    rule: "余った音も見えるから、多い・少ない・同じが分かるよ。",
    rounds: ["左右をきく", "1組そろえる", "余りをみる", "門の音を選ぶ", "にじのコード"]
  }),
  "tens-band": Object.freeze({
    title: "10のまとまりバンド", asset: "xylophone", palette: "xylophone", interaction: "builder",
    line: "低い音は10の束、高い音は1こ。バンドを編成して数を作ろう。 ",
    rule: "10の束とばらの音を別々に置くと、遠い数も見失わないよ。",
    rounds: ["低い音をきく", "10の束を置く", "高い音を足す", "数札をみる", "バンド完成"]
  }),
  "clock-beat": Object.freeze({
    title: "とけいのチャイム散歩", asset: "lantern", palette: "bell", interaction: "clock",
    line: "時の花を鳴らして、ぴったり・はんぶんの拍を作ろう。 ",
    rule: "長い針と短い針を、音と光の両方で確かめられるよ。",
    rounds: ["チャイムをきく", "時の花を選ぶ", "半の拍を置く", "針をたしかめる", "おでかけ時刻"]
  }),
  "ruler-xylophone": Object.freeze({
    title: "ものさし木琴アトリエ", asset: "xylophone", palette: "xylophone", interaction: "measure",
    line: "0から1ますごとに音が上がる木琴で、長さを測ろう。 ",
    rule: "始まりを0にそろえると、音の数とますの数がそろうよ。",
    rounds: ["0をみつける", "1ます鳴らす", "先まで測る", "長さ札を選ぶ", "アトリエ完成"]
  })
});

const AUDIO_STAGE_FAMILY_ROTATIONS = Object.freeze({
  "w0-count": ["maraca-count", "bird-echo", "bakery-beat", "lantern-trace", "cat-ensemble", "balloon-harp", "seed-loop", "star-dance"],
  "w0-compare": ["cat-ensemble", "chord-gate", "bird-echo", "balloon-harp", "cat-ensemble", "chord-gate"],
  "w0-shape": ["shape-chime", "bird-echo", "seed-loop", "shape-chime", "bird-echo", "seed-loop"],
  "w0-size": ["size-orchestra", "balloon-harp", "size-orchestra", "bird-echo", "size-orchestra", "balloon-harp"],
  "w0-order": ["star-dance", "lantern-trace", "star-dance", "bird-echo", "lantern-trace", "star-dance"],
  "w0-pattern": ["seed-loop", "bird-echo", "seed-loop", "lantern-trace", "seed-loop", "bird-echo", "seed-loop", "lantern-trace"],
  "w1-count100": ["tens-band", "star-dance", "tens-band", "lantern-trace", "tens-band", "maraca-count", "tens-band", "star-dance", "tens-band", "chord-gate"],
  "w1-add": ["bakery-beat", "star-dance", "maraca-count", "cat-ensemble", "star-dance", "bakery-beat", "bird-echo", "lantern-trace", "bakery-beat", "star-dance", "cat-ensemble", "maraca-count"],
  "w1-subtract": ["lantern-trace", "bakery-beat", "cat-ensemble", "star-dance", "balloon-harp", "lantern-trace", "seed-loop", "bakery-beat", "star-dance", "cat-ensemble", "lantern-trace", "balloon-harp"],
  "w1-clock": ["clock-beat", "clock-beat", "clock-beat", "bird-echo", "clock-beat", "clock-beat", "star-dance", "clock-beat"],
  "w1-length": ["ruler-xylophone", "balloon-harp", "ruler-xylophone", "bakery-beat", "star-dance", "ruler-xylophone", "ruler-xylophone", "balloon-harp", "ruler-xylophone", "seed-loop"]
});

function audioFamilyForStageGame(game) {
  const match = /^(.*)-(\d+)$/.exec(game?.id || "");
  const areaId = match?.[1] || "";
  const ordinal = Math.max(1, Number(match?.[2]) || 1);
  const rotation = AUDIO_STAGE_FAMILY_ROTATIONS[areaId] || ["maraca-count"];
  const familyId = rotation[(ordinal - 1) % rotation.length];
  return { familyId, family: AUDIO_GAME_FAMILIES[familyId] || AUDIO_GAME_FAMILIES["maraca-count"] };
}

function withAudioStageIdentity(game) {
  const { familyId, family } = audioFamilyForStageGame(game);
  return Object.freeze({
    ...game,
    // 音は「聞くきっかけ」。お店・お世話などの主役素材を音用アトラスで
    // 上書きすると、画面が別の世界へ飛んでしまう。元のタイトル・ゴール・
    // スプライト・手つきは保存し、音の情報だけを横に添える。
    playMechanic: game.mechanic,
    audioFamily: familyId,
    audioAsset: family.asset,
    audioTitle: family.title,
    audioLine: family.line,
    audioRule: family.rule,
    soundPalette: family.palette,
    rounds: Object.freeze(game.rounds.map((round, index) => Object.freeze({
      ...round,
      audioCue: family.rounds[index] || round.action
    }))),
    signature: `${game.signature}|audio:${familyId}`
  });
}

const STAGE_BLUEPRINTS = Object.freeze(Object.fromEntries(
  Object.values(STAGE_GAME_CATALOG)
    .reduce((all, catalog) => all.concat(catalog), [])
    .map((game) => {
      const audioGame = withAudioStageIdentity(game);
      return [audioGame.id, audioGame];
    })
));

function stageBlueprintFor(stage) {
  const id = typeof stage === "string" ? stage : stage?.id;
  return STAGE_BLUEPRINTS[id] || CURRICULUM_STAGE_BLUEPRINTS?.[id] || null;
}

const PATTERN_SETS = [
  { name: "フルーツのならび", tokens: QUESTION_VISUALS.count.slice(0, 4) },
  { name: "おはなのならび", tokens: QUESTION_VISUALS.order },
  { name: "おまもりのならび", tokens: [
    { id: "heart", name: "ハート", src: spriteUrl("stickerHeart"), tint: "#ff9fbd" },
    { id: "star", name: "ほし", src: spriteUrl("stickerStar"), tint: "#ffdc73" },
    { id: "bow", name: "リボン", src: spriteUrl("stickerBow"), tint: "#c9a4f4" },
    { id: "crystal", name: "ストーン", src: spriteUrl("stickerCrystal"), tint: "#8fcaf4" }
  ] },
  { name: "かたちのならび", tokens: [
    { id: "circle", name: "まる", src: spriteUrl("shapeCircle"), tint: "#8fcaf4" },
    { id: "square", name: "しかく", src: spriteUrl("shapeSquare"), tint: "#8fdbbc" },
    { id: "triangle", name: "さんかく", src: spriteUrl("shapeTriangle"), tint: "#ff9fbe" },
    { id: "star-shape", name: "ほし", src: spriteUrl("shapeStar"), tint: "#ffdc73" }
  ] }
];

function questionVisual(mode, stage, seed, offset = 0) {
  const options = QUESTION_VISUALS[mode] || QUESTION_VISUALS.count;
  const index = Math.abs((stage?.order || 0) + seed + offset) % options.length;
  return { ...options[index] };
}

function missionFor(stage, index, sessionSeed = 0) {
  const options = QUESTION_MISSIONS[stage?.mode] || QUESTION_MISSIONS.pattern;
  const game = stage?.game || stageBlueprintFor(stage);
  const round = game?.rounds?.[index % options.length];
  // 各ステージが著者指定した5拍の順に、既存の数学ミッションを割り当てる。
  // 再プレイでは順番を変えず、小物だけを差し替えるので物語を見失わせない。
  const missionIndex = Number.isInteger(round?.missionIndex)
    ? round.missionIndex
    : Math.abs((stage?.order || 0) + sessionSeed + index) % options.length;
  const base = options[missionIndex % options.length];
  if (!game || !round) return { ...base };
  return {
    ...base,
    id: `${game.id}:${round.id}:${base.id}`,
    label: `${round.action}・${base.label}`,
    interaction: `${game.title}／${base.interaction}`,
    stageGameId: game.gameId,
    stageRound: index,
    roundTitle: round.title,
    roundAction: round.action
  };
}

function sceneForMission(mission, variantSeed = 0) {
  const scene = QUEST_SCENES[mission?.sceneId] || QUEST_SCENES.garden;
  const variants = QUEST_SCENE_VARIANTS[scene.id] || [scene.visual];
  const index = Math.abs(Number(variantSeed) || 0) % variants.length;
  const visual = { ...variants[index] };
  return { ...scene, visual, visualVariantId: `${scene.id}:${visual.id}` };
}

// くらべるステージは、ステージカードの物語（おやつ・りんご・パン・くも…）と
// 盤面の小物をそろえる。ここを揃えないと、カードは「パン」なのに図は「おはな」になる。
const COMPARE_STAGE_SCENES = Object.freeze({
  "w0-compare-1": ["flowers", "flower"],
  "w0-compare-2": ["picnic", "cake"],
  "w0-compare-3": ["orchard", "apple"],
  "w0-compare-4": ["orchard", "strawberry"],
  "w0-compare-5": ["bakery", "bread"],
  "w0-compare-6": ["bridge", "clock-cloud"]
});
function sceneForStage(stage, mission) {
  const composed = COMPARE_STAGE_SCENES[stage?.id];
  if (composed) {
    const [composedSceneId, visualId] = composed;
    const composedScene = QUEST_SCENES[composedSceneId];
    const visual = Object.values(QUEST_SCENE_VARIANTS).flat().find((candidate) => candidate.id === visualId);
    if (composedScene && visual) return { ...composedScene, visual: { ...visual }, visualVariantId: `${composedScene.id}:${visual.id}` };
  }
  const sceneId = STAGE_SCENE_BY_MODE[stage?.mode] || mission?.sceneId || "garden";
  const scene = QUEST_SCENES[sceneId] || QUEST_SCENES.garden;
  const variants = QUEST_SCENE_VARIANTS[scene.id] || [scene.visual];
  // stage id と順番だけで決めるため、同じステージを5問通して同じ小物で遊べる。
  const stableSeed = `${stage?.id || sceneId}:${stage?.order || 0}`.split("").reduce((sum, character) => sum + character.codePointAt(0), 0);
  const visual = { ...variants[stableSeed % variants.length] };
  return { ...scene, visual, visualVariantId: `${scene.id}:${visual.id}` };
}

function stageAgeBand(stage) {
  if (stage?.grade) return stage.grade;
  if (stage?.worldId === "w1") return "小1";
  return "5-6さい";
}

function stageDifficultyBand(stage, effectiveLevel = stage?.level || 1) {
  const area = ALL_AREAS.find((candidate) => candidate.id === stage?.areaId);
  const ratio = effectiveLevel / Math.max(1, area?.total || effectiveLevel);
  if (ratio <= 0.28) return "具体物であそぶ";
  if (ratio <= 0.56) return "ガイドつき";
  if (ratio <= 0.8) return "ひとりでためす";
  return "ちがう場面でつかう";
}

function effectiveStage(stage) {
  const area = ALL_AREAS.find((candidate) => candidate.id === stage?.areaId);
  const profile = skillProfile(stage?.areaId);
  const levelOffset = Math.max(-1, Math.min(1, Number(profile.levelOffset) || 0));
  return { ...stage, level: Math.max(1, Math.min(area?.total || stage.level, stage.level + levelOffset)) };
}

function numberLineStops(answer, max, span = 6, startValue = answer) {
  const safeMax = Math.max(0, Number(max) || 0);
  const safeAnswer = Math.max(0, Math.min(safeMax, Number(answer) || 0));
  const safeStart = Math.max(0, Math.min(safeMax, Number(startValue) || 0));
  const lower = Math.min(safeAnswer, safeStart);
  const upper = Math.max(safeAnswer, safeStart);
  const travel = upper - lower;
  const gaps = Math.min(safeMax, Math.max(span, travel + 2));
  if (safeMax <= gaps) return Array.from({ length: safeMax + 1 }, (_, value) => value);
  const start = Math.max(0, Math.min(safeMax - gaps, lower - Math.floor((gaps - travel) / 2)));
  return Array.from({ length: gaps + 1 }, (_, index) => start + index);
}

function decorateLegacyMissionStory(question, stage, mission, sceneVariantSeed) {
  // 「ほたる・りんご・みかん」のような別世界の名詞を、再プレイ用の装飾で
  // 足すのをやめる。問題・盤面・吹き出し・成功演出が同じ sceneVisual を参照
  // する小さな世界契約を、ここで一つに固定する。
  const item = question.sceneVisual || question.visual || {};
  const place = question.sceneName || "おみせ";
  const itemName = item.name || "おとどけもの";
  const actor = question.sceneId === "petcare" ? "るる" : question.sceneId === "bakery" ? "こむぎ" : "もも";
  const story = `${place}の${itemName}`;
  const dialogue = question.mode === "count"
    ? `${itemName}を おねがい` : question.mode === "compare"
      ? "どっちが たっぷり？" : question.mode === "add"
        ? "いっしょに そろえよう" : question.mode === "subtract"
          ? "のこりを みせてね" : "ぴったりを さがそう";
  return {
    ...question,
    replayStory: story,
    replayStoryVariant: `${question.sceneId || "scene"}:${item.id || itemName}`,
    world: Object.freeze({
      id: question.sceneId || "garden",
      place,
      actor,
      item: { id: item.id || "item", name: itemName, src: item.src || "", tint: item.tint || "#ffb6d0" },
      dialogue,
      successLine: `${actor}も にこにこ！`
    }),
    audioScript: `${question.prompt} ${question.subPrompt || ""}`
  };
}

function applyMissionToQuestion(question, stage, mission, effectiveLevel, sceneVariantSeed = 0) {
  const scene = sceneForStage(stage, mission);
  const decorated = {
    ...question,
    missionId: mission.id,
    missionLabel: mission.label,
    interaction: mission.interaction,
    interactionKind: mission.kind,
    sceneId: scene.id,
    sceneName: scene.name,
    sceneVisual: scene.visual,
    sceneVisualVariantId: scene.visualVariantId,
    skillId: stage.areaId,
    ageBand: stageAgeBand(stage),
    difficultyBand: stageDifficultyBand(stage, effectiveLevel),
    effectiveLevel,
    audioScript: `${question.prompt} ${question.subPrompt || ""}`
  };

  // 数える・くらべる・大きさ・順番は、ミッションの小物を実際に使う。
  // 計算は「絵を替えただけで式の意味が消える」ことを避け、下で橋の表現を作り直す。
  if (["count", "compare", "size", "order"].includes(decorated.mode)) {
    decorated.visual = { ...scene.visual };
    const materialName = scene.visual.name;
    if (decorated.mode === "count") {
      decorated.prompt = `${materialName}を ${decorated.answer}こ えらぼう`;
      decorated.hints = [
        "ひとつずつ、ゆびでさしながら かぞえてみよう。",
        `${decorated.answer}こで とまるよ。`,
        `${materialName}を ${decorated.answer}こ えらびます。`
      ];
      decorated.explanation = `${materialName}を ${decorated.answer}こ えらべたね。`;
    } else if (decorated.mode === "compare") {
      decorated.subPrompt = `${materialName}のかずをくらべよう。`;
      // 見出しの札も、盤面に出ている小物の名前でそろえる（「パンの かず」なのに図はお花、を防ぐ）。
      const compareLabel = mission.kind === "balance"
        ? `${materialName}の かずを くらべよう`
        : mission.kind === "pair" ? `${materialName}を ペアにしよう` : `${materialName}は どちらが おおい？`;
      decorated.missionLabel = mission.roundAction ? `${mission.roundAction}・${compareLabel}` : compareLabel;
    } else if (decorated.mode === "size") {
      const asksSmall = question.prompt.includes("ちいさい");
      decorated.prompt = `いちばん ${asksSmall ? "ちいさい" : "おおきい"} ${materialName}はどれ？`;
      decorated.explanation = `いちばん${asksSmall ? "ちいさい" : "おおきい"}${materialName}です。`;
    } else {
      decorated.prompt = `${decorated.fromRight ? "みぎ" : "ひだり"}から ${decorated.ordinal}ばんめの ${materialName}はどれ？`;
      decorated.explanation = `${decorated.ordinal}ばんめの${materialName}です。`;
    }
  }

  if (decorated.mode === "size") {
    decorated.options = decorated.options.map((option) => ({ ...option, visual: { ...scene.visual } }));
  }

  if (decorated.mode === "add" || decorated.mode === "subtract") {
    decorated.visual = renderBridgeVisual(
      decorated.left,
      decorated.right,
      decorated.mode === "add" ? "+" : "-",
      scene.visual
    );
  }

  if (mission.kind === "count-card") {
    decorated.responseType = "number-choice";
    decorated.total = decorated.answer;
    decorated.options = numberOptions(decorated.answer, 10, [decorated.answer - 1, decorated.answer + 1, decorated.answer + 2]);
    decorated.prompt = `${decorated.visual.name}は いくつ？`;
    decorated.subPrompt = "かぞえて、すうじカードをえらんでね。";
    decorated.explanation = `${decorated.visual.name}は ${decorated.answer}こです。`;
  }

  if (mission.kind === "tally") {
    decorated.presentation = "tally";
    decorated.subPrompt = "ひとつずつ しるしをつけながら あつめよう。";
  }

  if (["pair", "balance"].includes(mission.kind)) {
    decorated.presentation = mission.kind;
  }

  if (mission.kind === "quick-choice") {
    decorated.presentation = "quick-choice";
    decorated.subPrompt = "左右をくらべて、ぴったりのほうをえらぼう。";
  }

  if (mission.kind === "number-card") {
    decorated.presentation = "number-card";
    decorated.prompt = `${decorated.tens}この10のたばと ${decorated.ones}このばら。すうじカードをえらぼう`;
    decorated.subPrompt = "10のたばを先に数えてから、ばらを足してみよう。";
    decorated.explanation = `${decorated.tens}この10のたばと ${decorated.ones}このばらで、${decorated.answer}です。`;
  }

  if (mission.kind === "shape-sort") {
    const target = decorated.options.find((shape) => shape.id === decorated.answer) || decorated.options[0];
    decorated.responseType = "place";
    decorated.placeKind = "shape";
    // The visible choice value must be the same canonical identifier as the
    // authored answer.  Do not append a presentation-only ordinal here: doing
    // so used to make the scorer accept a prefix of the rendered value.
    decorated.placeChoices = decorated.options.map((shape) => ({ ...shape, value: shape.id }));
    decorated.placeTargetLabel = `${target.name}の かたちのばこ`;
    decorated.prompt = `${target.name}を かたちのばこに いれよう`;
    decorated.subPrompt = "えらんでから、「おく」を おしてね。";
    decorated.explanation = `${target.name}を かたちのばこに いれられました。`;
  }

  if (mission.kind === "repair") {
    decorated.responseType = "place";
    decorated.placeKind = "pattern";
    decorated.placeChoices = decorated.options.map((token) => ({ ...token, value: token.id }));
    decorated.prompt = "あいた ひとマスに、ぴったりのものを おこう";
    decorated.subPrompt = `${decorated.patternName}の くりかえしを つなげてね。`;
    decorated.explanation = `${decorated.patternName}の もようを なおせました。`;
  }

  if (mission.kind === "pattern-compose") {
    const patternLength = effectiveLevelForPattern(stage) >= 5 ? 3 : 2;
    const slotCount = effectiveLevelForPattern(stage) >= 4 ? 2 : 1;
    const answers = Array.from({ length: slotCount }, (_, offset) => {
      if (offset === 0) return String(decorated.answer);
      return String(decorated.sequence[(decorated.sequence.length + offset) % patternLength]?.id || decorated.answer);
    });
    decorated.responseType = "pattern-compose";
    decorated.patternSlots = answers;
    decorated.answer = answers;
    decorated.prompt = slotCount === 1 ? "あいた ひとマスに、リズムのたねを おこう" : "あいた ふたマスに、リズムのたねを じゅんに おこう";
    decorated.subPrompt = `${decorated.patternName}の くりかえす まとまりを つなげてね。`;
    decorated.explanation = `${decorated.patternName}の リズムをつなげられました。`;
  }

  if (mission.kind === "pattern-choice") {
    decorated.presentation = "pattern-choice";
    decorated.prompt = "つぎにくる リズムのカードを えらぼう";
    decorated.subPrompt = `${decorated.patternName}の くりかえしを見て、つづきをえらんでね。`;
  }

  if (mission.kind === "size-sort") {
    decorated.responseType = "sequence";
    decorated.sortItems = decorated.options.map((option, index) => ({ ...option, visual: { ...scene.visual }, index }));
    decorated.answer = decorated.sortItems.slice().sort((left, right) => left.scale - right.scale).map((option) => option.index);
    decorated.prompt = `${decorated.visual.name}を ちいさい じゅんに ならべよう`;
    decorated.subPrompt = "タップした じゅんに、おさらにのるよ。";
    decorated.explanation = "ちいさいものから、おおきいものへ ならべられました。";
  }

  if (mission.kind === "length-sort") {
    decorated.responseType = "sequence";
    decorated.sortItems = decorated.ribbons.map((ribbon, index) => ({ ...ribbon, index }));
    decorated.answer = decorated.sortItems.slice().sort((left, right) => left.units - right.units).map((ribbon) => ribbon.index);
    decorated.prompt = "みじかい じゅんに リボンを ならべよう";
    decorated.subPrompt = "ますの かずをみて、タップした じゅんに ならべよう。";
    decorated.explanation = "みじかいリボンから ならべられました。";
  }

  if (mission.kind === "build") {
    decorated.responseType = "builder";
    decorated.builder = { tens: decorated.tens, ones: decorated.ones, maxTens: Math.min(10, Math.max(2, decorated.tens + 2)) };
    decorated.prompt = "10のたばと ばらを つくろう";
    decorated.subPrompt = "10のたばと、ばらのかずを えらんでね。";
  }

  if (mission.kind === "numberline") {
    decorated.responseType = "numberline";
    const maximum = decorated.mode === "number" ? 100 : Math.max(10, decorated.left || 0, decorated.answer + 3);
    decorated.numberLineStart = ["add", "subtract"].includes(decorated.mode) ? decorated.left : decorated.answer;
    decorated.numberLine = numberLineStops(decorated.answer, maximum, decorated.mode === "number" ? 6 : 10, decorated.numberLineStart);
    decorated.subPrompt = ["add", "subtract"].includes(decorated.mode)
      ? `${decorated.left}から ${decorated.mode === "add" ? decorated.right : decorated.right} ${decorated.mode === "add" ? "すすんで" : "もどって"}、こたえのところで とまろう。`
      : "こたえのところで、とまろう。";
  }

  if (mission.kind === "clock-set") {
    decorated.responseType = "clockset";
    decorated.targetTime = { hour: decorated.hour, minute: decorated.half ? 30 : 0 };
    decorated.prompt = "とけいの はりを あわせよう";
    decorated.subPrompt = `${decorated.answer}に なるように、はりを うごかしてね。`;
  }

  if (mission.kind === "result-card") {
    decorated.presentation = "result-card";
    decorated.subPrompt = "2つのまとまりを見て、こたえカードをえらんでね。";
  }

  if (["repair", "pattern-choice", "shape-sort", "shape-find", "size-choice", "order-path", "order-select", "length-measure", "clock-read"].includes(mission.kind)) {
    decorated.presentation = mission.kind;
  }

  // 表示を組み替えたあとで、読み上げも必ず画面の指示と一致させる。
  decorated.audioScript = `${decorated.prompt} ${decorated.subPrompt || ""}`;
  return decorateLegacyMissionStory(
    synchroniseQuestionSemantics(applyAudioMiniGame(applyStageGameMechanic(decorated, stage, mission), stage, mission)),
    stage,
    mission,
    sceneVariantSeed
  );
}

// The final operation owns feedback. Presentation changes must also change
// hints and explanations; a correct picture with a stale noun is still wrong.
function synchroniseQuestionSemantics(question) {
  const q = { ...question };
  const name = q.sceneVisual?.name || (typeof q.visual === "object" ? q.visual.name : "もの");
  if (q.mode === "count") {
    const countCard = q.responseType === "number-choice";
    q.hints = ["ひとつずつ、ゆびでさしながら かぞえてみよう。", `${q.answer}こで とまるよ。`, countCard ? `${name}は ${q.answer}こです。` : `${name}を ${q.answer}こ そろえます。`];
    q.explanation = countCard ? `${name}は ${q.answer}こです。` : `${name}を ${q.answer}こ そろえられたね。`;
  } else if (q.mode === "size") {
    if (q.responseType === "sequence") {
      q.hints = ["となりのものと、大きさをくらべよう。", "ちいさいものから、ひとつずつ ならべよう。", `${name}を ちいさいじゅんに ならべます。`];
      q.explanation = `${name}を、ちいさいじゅんに ならべられました。`;
    } else q.explanation = `いちばん${q.prompt.includes("ちいさい") ? "ちいさい" : "おおきい"}${name}です。`;
  } else if (q.mode === "order") {
    q.explanation = `${q.fromRight ? "みぎ" : "ひだり"}から ${q.ordinal}ばんめの${name}です。`;
  } else if (q.mode === "pattern") {
    const tokens = [...(q.options || []), ...(q.sequence || [])];
    const answers = Array.isArray(q.answer) ? q.answer : [q.answer];
    const names = answers.map((id) => tokens.find((token) => token.id === id)?.name || "もよう");
    q.hints = ["まえから、ならびを声に出してみよう。", "くりかえす まとまりを見つけよう。", `このますは ${names.join("、")}のじゅんです。`];
    q.explanation = `${names.join("、")}で、もようが つながります。`;
  } else if (q.mode === "length" && q.responseType === "unit-ruler") {
    q.prompt = `${q.ruler.name}のリボンを ものさしで はかろう`;
    q.hints = ["リボンのはしを、0の線にそろえよう。", "同じ大きさのますを、ひとつずつ かぞえよう。", `${q.ruler.name}のリボンは ${q.ruler.units}ますです。`];
    q.explanation = `${q.ruler.name}のリボンは ${q.ruler.units}ますです。`;
  } else if (q.mode === "length" && q.responseType === "sequence") {
    q.hints = ["リボンのはしをそろえて見よう。", "ますの少ないリボンから ならべよう。", "みじかいもの、まんなか、ながいもののじゅんです。"];
    q.explanation = "リボンを みじかいじゅんに ならべられました。";
  }
  q.audioScript = `${q.prompt} ${q.subPrompt || ""}`;
  return q;
}

function stageActivityContract(stage) {
  const game = stage?.game || stageBlueprintFor(stage);
  if (stage?.mode === "curriculum") return game;
  const scene = sceneForStage(stage);
  const material = scene.visual;
  const activities = {
    count: ["くだもののおとどけ", `${material.name}を、注文の数だけ そろえよう。`],
    compare: ["おはなのペア", `${material.name}の数をくらべて、おおい・すくない・おなじを見つけよう。`],
    shape: ["かたちのアトリエ", "丸いところや角を見て、ぴったりの形をさがそう。"],
    size: ["おやつのおさら", `${material.name}の大きさをくらべて、おさらをそろえよう。`],
    order: ["おはなのならび", `${material.name}のならびを、右や左から たどろう。`],
    pattern: ["もようのリボン", "くりかえすまとまりを見つけて、もようをつなごう。"],
    number: ["まとまりのレジ", "10のまとまりと、ばらのビーズで 数をつくろう。"],
    add: ["おやつのじゅんび", `${material.name}のふたつのまとまりを、いっしょにそろえよう。`],
    subtract: ["おとものおせわ", `${material.name}をわけたあと、のこりをたしかめよう。`],
    clock: ["とけいカフェ", "長い針と短い針を見て、約束の時間をたしかめよう。"],
    length: ["リボンのおしたて", "はしをそろえて、リボンの長さをくらべたり はかったりしよう。"]
  };
  const [title, goal] = activities[stage.mode] || [scene.name, "ぴったりをさがそう。"];
  const firstMission = missionFor(stage, 0, 0);
  const waysToPlay = {
    collect: "おとどけトレー", "count-card": "かずの注文札", tally: "ひとつずつしるし",
    pair: "ペアでくらべよう", balance: "ぴったりのしるし", "quick-choice": "どっちかな",
    "shape-sort": "かたちの仕分け", "shape-find": "同じかたちさがし",
    "size-sort": "大きさのおさら", "size-choice": "大きい・小さいさがし",
    "order-path": "ならびの小道", "order-select": "なんばんめさがし",
    "pattern-compose": "もようをつなごう", repair: "あいたますのおしたて", "pattern-choice": "つづきのもよう",
    build: "まとまりをつくろう", "number-card": "数札のおとどけ", numberline: "数の小道",
    "result-card": "まとめてたしかめよう", "clock-set": "時計の約束", "clock-read": "何時にしよう",
    "length-sort": "リボンをならべよう", "length-measure": "リボンをはかろう"
  };
  // くらべるステージは、ペア・しるし・えらぶ…と遊びが入れ替わる。最初の1問の遊び名を
  // ステージ全体の題にすると、2問目以降の画面とずれるので、全部にあてはまる名前にする。
  const activity = stage.mode === "compare" ? "おおい・すくない" : waysToPlay[firstMission.kind] || title;
  const subject = ["count", "compare", "size", "order", "add", "subtract"].includes(stage.mode) ? `${material.name}・` : "";
  return { ...game, title: `${subject}${activity} ${stage.level}`, goal, material };
}

function applyStageGameMechanic(question, stage, mission) {
  const game = stage?.game || stageBlueprintFor(stage);
  if (!game) return question;
  const playMechanic = game.playMechanic || game.mechanic;
  const stageVisual = {
    id: `game-${game.id}`,
    name: game.board || game.title,
    src: spriteUrl(game.sprite),
    tint: {
      lantern: "#ffe07a",
      bloom: "#9edcaa",
      ribbon: "#d6b4f5",
      bridge: "#91cff5",
      pet: "#ffb9a6",
      oven: "#ffc76f",
      picnic: "#ffd58a",
      float: "#bde3ff",
      crystal: "#b9b5ff",
      sparkle: "#ffabc6"
    }[game.effect] || "#ffb6d0"
  };
  // 問題で触る物は、ステージの飾りではなく sceneVisual。ここを分けると、
  // 音ゲームのアトラスや島の看板がりんご・パンなどの代わりに出る事故を防げる。
  const gameVisual = question.sceneVisual?.src ? { ...question.sceneVisual } : stageVisual;

  const decorated = {
    ...question,
    stageGame: {
      gameId: game.gameId,
      title: stageActivityContract(stage).title,
      goal: stageActivityContract(stage).goal,
      board: question.sceneName,
      sprite: game.sprite,
      stageVisual,
      mechanic: game.mechanic,
      playMechanic,
      rule: game.rule,
      proofCue: game.proofCue,
      successEffect: game.successEffect,
      reward: game.reward,
      effect: game.effect,
      slots: game.slots,
      audioFamily: game.audioFamily,
      audioAsset: game.audioAsset,
      audioTitle: game.audioTitle,
      audioLine: game.audioLine,
      soundPalette: game.soundPalette
    },
    gameVisual,
    stageRound: Number.isInteger(mission?.stageRound) ? mission.stageRound : 0,
    stageRoundTitle: mission?.roundTitle || game.rounds[0]?.title || game.goal,
    stageRoundAction: mission?.roundAction || game.rounds[0]?.action || "あそぶ"
  };

  // 盤面の主役は mission の一貫した小物。ステージのスプライトは背景/HUDだけ
  // に置き、問題を解く物に混ぜない。
  if (decorated.mode === "number") {
    decorated.visual = renderPlaceValueVisual(decorated.tens, decorated.ones, gameVisual);
  }
  if (decorated.mode === "add" || decorated.mode === "subtract") {
    decorated.visual = renderBridgeVisual(decorated.left, decorated.right, decorated.mode === "add" ? "+" : "-", gameVisual);
  }

  // 「配る・合流する・残す」は、答え札を押すだけにせず、実物を席へ移す手つきにする。
  if (playMechanic === "slot-fill" && ["collect", "result-card"].includes(mission?.kind) && ["count", "add", "subtract"].includes(decorated.mode)) {
    const groupSizes = decorated.mode === "count"
      ? [Number(decorated.total) || 0]
      : decorated.mode === "add"
        ? [Number(decorated.left) || 0, Number(decorated.right) || 0]
        : [Number(decorated.left) || 0];
    decorated.responseType = "slot-fill";
    decorated.slotFill = {
      targetCount: Number(decorated.answer) || 0,
      groupSizes,
      sourceLabel: decorated.mode === "subtract" ? "のこるもの" : "はこぶもの",
      targetLabel: decorated.mode === "subtract" ? "のこりトレー" : "できあがりトレー",
      removedCount: decorated.mode === "subtract" ? Number(decorated.right) || 0 : 0
    };
    if (decorated.mode === "count") {
      decorated.prompt = `${decorated.sceneVisual?.name || "もの"}を ${decorated.answer}こ、トレーへ はこぼう`;
      decorated.subPrompt = "ひとつずつ席に入れてから、「できた」をおしてね。";
    } else if (decorated.mode === "add") {
      decorated.prompt = `${decorated.left}こと ${decorated.right}こを、ひとつのトレーへ あつめよう`;
      decorated.subPrompt = "2つのまとまりをぜんぶ入れて、数をたしかめよう。";
    } else {
      decorated.prompt = `${decorated.left}こから ${decorated.right}こをよけて、のこりをトレーへ入れよう`;
      decorated.subPrompt = "のこるものだけを、ひとつずつ席に入れよう。";
    }
  }

  // 比較は、左右どちらかを即答するUIではなく、1対1の対応を実際に作る。
  if (decorated.mode === "compare" && mission?.kind === "pair") {
    decorated.responseType = "pair-link";
    decorated.pairLink = { left: Number(decorated.groups?.left) || 0, right: Number(decorated.groups?.right) || 0 };
    decorated.subPrompt = "左をえらんでから、右のなかまとむすんでね。";
  }

  // 比較記号は量の関係を表す「門のタイル」として置く。大きい口の向きも画面で確認できる。
  if (decorated.mode === "compare" && mission?.kind === "balance") {
    const relation = decorated.groups.left > decorated.groups.right ? ">" : decorated.groups.left < decorated.groups.right ? "<" : "=";
    decorated.responseType = "compare-gate";
    decorated.compareRelation = relation;
    decorated.answer = relation;
    decorated.prompt = "まんなかに ぴったりの しるしを おこう";
    decorated.subPrompt = "大きい口は、たくさんあるほうをむくよ。";
    decorated.explanation = `${decorated.groups.left}こと${decorated.groups.right}こをくらべると「${relation}」です。`;
  }

  // 数直線は、終点カードを選ぶだけでなく、足あとを一歩ずつ進める。
  if (playMechanic === "route-step" && ["numberline", "order-path"].includes(mission?.kind) && ["order", "number", "add", "subtract"].includes(decorated.mode)) {
    let values;
    let start;
    let direction;
    let displayOffset = 0;
    if (decorated.mode === "order") {
      values = Array.from({ length: Number(decorated.total) || 0 }, (_, value) => value);
      direction = decorated.fromRight ? -1 : 1;
      start = decorated.fromRight ? values.length : -1;
      displayOffset = 1;
    } else {
      const isSubtract = decorated.mode === "subtract";
      const answer = Number(decorated.answer) || 0;
      start = decorated.mode === "number" ? Math.max(0, answer - 4) : Number(decorated.left) || 0;
      direction = isSubtract ? -1 : 1;
      const maximum = decorated.mode === "number" ? 100 : Math.max(20, start, answer + 4);
      values = numberLineStops(answer, maximum, decorated.mode === "number" ? 6 : 10, start);
    }
    decorated.responseType = "route-step";
    decorated.route = {
      values,
      start,
      direction,
      target: Number(decorated.answer),
      displayOffset,
      stepGoal: Math.abs((Number(decorated.answer) || 0) - start)
    };
    decorated.subPrompt = decorated.mode === "order"
      ? "スタートから、ひとつずつ足あとを進めよう。"
      : `${start}から、ひとつずつ ${direction < 0 ? "もどって" : "すすんで"} とまろう。`;
  }

  // もようは1択で終わらず、空いたマスを順に埋めて「まとまり」を作る。
  if (playMechanic === "pattern-compose" && decorated.mode === "pattern" && (decorated.stageRound % 2 === 0)) {
    const patternLength = effectiveLevelForPattern(stage) >= 5 ? 3 : 2;
    const slotCount = Math.max(1, Math.min(2, Number(game.slots) || 1));
    // すでにミッション側で複数マスの正答を作っている場合、answer は配列に
    // なっている。配列そのものを String() すると "A,B" という存在しない
    // 駒を求めてしまうため、各スロットの値をそのまま引き継ぐ。
    const authoredAnswers = Array.isArray(decorated.patternSlots)
      ? decorated.patternSlots
      : Array.isArray(decorated.answer)
        ? decorated.answer
        : [decorated.answer];
    const firstAnswer = String(authoredAnswers[0] ?? decorated.answer);
    const answers = Array.from({ length: slotCount }, (_, offset) => {
      if (authoredAnswers[offset] !== undefined) return String(authoredAnswers[offset]);
      return String(decorated.sequence[(decorated.sequence.length + offset) % patternLength]?.id || firstAnswer);
    });
    decorated.responseType = "pattern-compose";
    decorated.patternSlots = answers;
    decorated.answer = answers;
    decorated.prompt = slotCount === 1 ? "あいた ひとマスに、ぴったりのものを おこう" : "あいた ふたマスを、じゅんに うめよう";
    decorated.subPrompt = `${decorated.patternName}の くりかえす まとまりを つなげてね。`;
  }

  // 長さは目盛りを読む操作に切り替える。0合わせと等しいますを、画面の手がかりにする。
  if (playMechanic === "unit-ruler" && decorated.mode === "length" && mission?.kind === "length-measure") {
    const target = decorated.ribbons?.[Number(decorated.answer)] || decorated.ribbons?.[0];
    if (target) {
      const maximum = Math.max(...decorated.ribbons.map((ribbon) => Number(ribbon.units) || 0), Number(target.units) + 2);
      decorated.responseType = "unit-ruler";
      decorated.ruler = {
        units: Number(target.units),
        name: target.name,
        color: target.color,
        visual: target.visual,
        options: numberOptions(Number(target.units), maximum, [Number(target.units) - 1, Number(target.units) + 1])
      };
      decorated.answer = Number(target.units);
      decorated.prompt = `${target.name}のリボンを ものさしで はかろう`;
      decorated.subPrompt = "0の線にそろえて、同じますをかぞえてね。";
      decorated.explanation = `${target.name}は ${target.units}ますです。`;
    }
  }

  decorated.audioScript = `${decorated.prompt} ${decorated.subPrompt || ""}`;
  return decorated;
}

function soundSourceVisual(question, stage) {
  if (question?.sceneVisual?.src) return { ...question.sceneVisual };
  if (question?.visual && typeof question.visual === "object" && question.visual.src) return { ...question.visual };
  return questionVisual(question?.mode || "count", stage || {}, 0);
}

function soundQuantityFor(question) {
  if (!question) return 1;
  if (Array.isArray(question.answer)) return Math.max(1, question.answer.length);
  if (question.mode === "count") return Number(question.answer) || 1;
  if (question.mode === "compare") return Math.max(Number(question.groups?.left) || 1, Number(question.groups?.right) || 1);
  if (question.mode === "order") return Number(question.ordinal) || Number(question.answer) + 1 || 1;
  if (question.mode === "add" || question.mode === "subtract") return Number(question.right) || 1;
  if (question.mode === "number") return Math.max(1, (Number(question.tens) || 0) + (Number(question.ones) || 0));
  if (question.mode === "clock") return Number(question.hour) || 1;
  if (question.mode === "length") {
    const ribbon = question.ribbons?.[Number(question.answer)];
    return Number(question.ruler?.units || ribbon?.units) || 1;
  }
  if (question.mode === "pattern") return Math.max(1, Number(question.sequence?.length) || 1);
  if (question.mode === "shape") return Math.max(1, (question.options || []).findIndex((option) => option.id === question.answer) + 1);
  return Math.max(1, Number(question.answer) + 1 || 1);
}

function soundAnswerChoices(question) {
  if (question.mode === "compare") {
    if ([">", "<", "="].includes(question.answer)) {
      return [">", "=", "<"].map((value) => ({ value, label: value }));
    }
    return ["left", "right", ...(question.allowSame || question.groups?.left === question.groups?.right ? ["same"] : [])]
      .map((value) => ({ value, label: value === "left" ? "ひだり" : value === "right" ? "みぎ" : "おなじ" }));
  }
  if (question.mode === "shape") {
    return (question.options || []).map((option) => ({ value: option.id, label: option.name, token: option }));
  }
  if (question.mode === "size") {
    return (question.options || []).map((option, index) => ({ value: index, label: `${index + 1}ばん`, scale: option.scale, token: option.visual }));
  }
  if (Array.isArray(question.options)) {
    return question.options.map((value) => ({ value, label: String(value) }));
  }
  return [];
}

function soundCueFor(question, stage, count) {
  const length = Math.max(1, Math.min(6, Number(count) || 1));
  const offset = (Number(stage?.order) || 0) + (Number(question?.stageRound) || 0);
  return Array.from({ length }, (_, index) => (offset + index * 2) % 3);
}

// 音は、低年齢の問題で「数えたり比べたりする手つき」を支えるレイヤーにする。
// 既にある具体操作まで音まね画面へ上書きしないことで、音だけを再現して算数の
// 答えに到達してしまう抜け道を作らない。
const LEGACY_NATIVE_INPUT_METHODS = Object.freeze({
  "slot-fill": "tap-transfer",
  "pair-link": "pair-link",
  "compare-gate": "symbol-place",
  "route-step": "step-route",
  "pattern-compose": "pattern-build",
  "unit-ruler": "measure-select",
  "number-choice": "number-card",
  sequence: "sort-sequence",
  place: "shape-place",
  builder: "tens-builder",
  numberline: "numberline-stop",
  clockset: "clock-set"
});

const LEGACY_DIRECT_INPUT_METHODS = Object.freeze({
  count: "object-select",
  compare: "side-choice",
  shape: "shape-select",
  size: "size-choice",
  order: "ordinal-select",
  pattern: "pattern-select",
  number: "number-card",
  add: "result-card",
  subtract: "result-card",
  clock: "clock-read",
  length: "length-select"
});

function applyAudioMiniGame(question, stage, mission) {
  const game = stage?.game || stageBlueprintFor(stage);
  const familyId = game?.audioFamily || "maraca-count";
  const family = AUDIO_GAME_FAMILIES[familyId] || AUDIO_GAME_FAMILIES["maraca-count"];
  const sourceVisual = soundSourceVisual(question, stage);
  const rawTargetCount = Number(soundQuantityFor(question));
  const targetCount = Number.isFinite(rawTargetCount) ? Math.max(1, Math.min(12, rawTargetCount)) : 3;
  let interaction = family.interaction;
  if (question.mode === "compare" && !["pair", "choice"].includes(interaction)) interaction = "choice";
  if (question.mode === "shape" || question.mode === "size") interaction = "choice";
  if (question.mode === "pattern") interaction = "loop";
  if (question.mode === "number") interaction = "builder";
  if (question.mode === "clock") interaction = "clock";
  if (question.mode === "length") interaction = "measure";
  const isSortLoop = Array.isArray(question.answer) && Array.isArray(question.sortItems);
  if (isSortLoop) interaction = "loop";

  const loopOptions = isSortLoop
    ? question.sortItems.map((item) => ({
      id: String(item.index),
      label: item.name || `${item.index + 1}ばん`,
      token: item.visual || sourceVisual
    }))
    : question.mode === "pattern"
    ? (question.options || []).map((option) => ({ id: String(option.id), label: option.name, token: option }))
    : [
      { id: "seed-a", label: "もも", token: { id: "heart", name: "もも", src: spriteUrl("stickerHeart"), tint: "#ff9fbd" } },
      { id: "seed-b", label: "きいろ", token: { id: "star", name: "きいろ", src: spriteUrl("stickerStar"), tint: "#ffdc73" } },
      { id: "seed-c", label: "みんと", token: { id: "leaf", name: "みんと", src: spriteUrl("stickerFlower"), tint: "#8fdbbc" } }
    ];
  const loopExpected = isSortLoop
    ? question.answer.map(String)
    : question.mode === "pattern"
    ? (Array.isArray(question.answer) ? question.answer.map(String) : [String(question.answer)])
    : Array.from({ length: Math.max(2, Math.min(4, targetCount)) }, (_, index) => loopOptions[index % loopOptions.length].id);
  const targetRibbon = question.ribbons?.[Number(question.answer)] || null;
  const targetUnits = Number(question.ruler?.units || targetRibbon?.units) || Math.max(1, Number(question.answer) || 1);
  const measureOptions = numberOptions(targetUnits, Math.max(targetUnits + 3, 8), [targetUnits - 1, targetUnits + 1]);

  const soundGame = {
    family: familyId,
    title: family.title,
    asset: family.asset,
    palette: family.palette,
    interaction,
    sourceVisual,
    targetCount,
    cue: soundCueFor(question, stage, targetCount),
    answerChoices: soundAnswerChoices(question),
    loopOptions,
    loopExpected,
    pairLeft: Number(question.groups?.left) || targetCount,
    pairRight: Number(question.groups?.right) || targetCount,
    needsAnswerChoice: question.mode === "compare",
    targetTens: Number(question.tens) || 0,
    targetOnes: Number(question.ones) || 0,
    targetHour: Number(question.hour) || 12,
    targetHalf: Boolean(question.half),
    targetUnits,
    measureOptions,
    roundAction: mission?.roundAction || game?.rounds?.[Number(question.stageRound) || 0]?.action || "あそぶ",
    accessibleCue: "音を消しているときも、光る色と並びを見ながら同じように遊べます。"
  };

  const prompts = {
    count: `${sourceVisual.name}を、ポンポン鳴らしながら ${targetCount}こ選ぼう`,
    echo: "光るおとの順を、まねして鳴らそう",
    pack: `${sourceVisual.name}で、拍トレーを ${targetCount}こぶん仕上げよう`,
    trace: "光るランタンを、はじめから順になぞろう",
    pair: "なかまを1組ずつつないで、合奏を作ろう",
    pluck: "ハープの弦を、数えながら選ぼう",
    loop: question.mode === "pattern" ? "次のリズムのたねを選んで、ループをつなごう" : "たねのリズムを順に置いて、短いループを作ろう",
    route: "音の足あとを、1拍ずつ進もう",
    builder: "低い10の音と高い1の音で、数のバンドを作ろう",
    clock: "時の花と半分の拍を選んで、チャイムを合わせよう",
    measure: "0から木琴を鳴らして、長さの札を選ぼう",
    choice: question.prompt
  };

  const nativeMethod = LEGACY_NATIVE_INPUT_METHODS[question.responseType];
  if (nativeMethod) {
    return {
      ...question,
      // Keep the mathematical prompt and the concrete response mechanism.
      // The sound layer is optional feedback / replay support, not the answer.
      soundLayer: soundGame,
      inputMethod: nativeMethod,
      inputPattern: `legacy-${nativeMethod}`,
      audioScript: `${question.prompt} ${question.subPrompt || ""}`
    };
  }

  // 音は「聞く→まねする」の導入にとどめ、数学の条件そのものは必ず元の
  // 具体操作で確かめる。最終問だけ音ミニゲームに置き換えると、引き算や
  // 順番などの必要条件が画面から落ち、音の数だけで答えられてしまう。
  const directMethod = LEGACY_DIRECT_INPUT_METHODS[question.mode];
  if (directMethod) {
    return {
      ...question,
      soundLayer: soundGame,
      inputMethod: directMethod,
      inputPattern: `legacy-${directMethod}`,
      audioScript: `${question.prompt} ${question.subPrompt || ""}`
    };
  }

  return {
    ...question,
    responseType: "sound-mini-game",
    soundGame,
    inputMethod: `sound:${interaction}`,
    inputPattern: `legacy-sound-${interaction}`,
    prompt: prompts[interaction] || question.prompt,
    subPrompt: `${family.rule} ${soundGame.accessibleCue}`,
    audioScript: `${prompts[interaction] || question.prompt} ${family.rule} ${soundGame.accessibleCue}`
  };
}

function effectiveLevelForPattern(stage) {
  const area = ALL_AREAS.find((candidate) => candidate.id === stage?.areaId);
  const profile = skillProfile(stage?.areaId);
  const offset = Math.max(-1, Math.min(1, Number(profile.levelOffset) || 0));
  return Math.max(1, Math.min(area?.total || stage?.level || 1, Number(stage?.level) + offset));
}

// v2 追加素材（ui_refresh_missing_v1 を切り出したもの）
const S2 = (path) => `./assets/sprites2/${path}`;

// 数字カード（0〜20、30〜100）: math2 の該当スプライト
const NUMBER_CARD = (() => {
  const map = {};
  for (let v = 0; v <= 20; v += 1) map[v] = S2(`math2/${String(v + 1).padStart(2, "0")}.png`);
  [30, 40, 50, 60, 70, 80, 90, 100].forEach((v, i) => { map[v] = S2(`math2/${22 + i}.png`); });
  return map;
})();

const NAV_ITEMS = [
  { id: "island", label: "おうち", sprite: "navIsland" },
  { id: "learn", label: "おてつだい", sprite: "navLearn" },
  { id: "hissan", label: "ひっさん", sprite: "numbers" },
  { id: "pets", label: "ペット", sprite: "petCat" },
  { id: "dress", label: "きせかえ", sprite: "navDress" },
  { id: "boutique", label: "つくりたい", sprite: "navBoutique" },
  { id: "stickers", label: "シール", sprite: "navStickers" },
  { id: "notebook", label: "ノート", sprite: "navNotebook" },
  { id: "outing", label: "おでかけ", sprite: "navOuting" },
  { id: "parent", label: "ほごしゃ", sprite: "navParent" }
];

// Original atelier collection. Complete outfits are explicitly sets; independent
// brooches and bags remain genuine combinable layers, carried into every scene.
const ATELIER_LOOKS = Object.freeze([
  { id: "rose", name: "ローズのおさんぽ", color: "#d8a4ad", cost: 0 },
  { id: "mint", name: "ミントのそよかぜ", color: "#b7d5c3", cost: 0 },
  { id: "lavender", name: "すみれのおめかし", color: "#c7b1da", cost: 0 },
  { id: "sunflower", name: "ひまわりピクニック", color: "#f4d78d", cost: 1 },
  { id: "moon", name: "つきあかりパーティー", color: "#a8c4e7", cost: 6 },
  { id: "berry", name: "いちごのティータイム", color: "#c98699", cost: 9 }
]);
const ATELIER_PINS = Object.freeze([
  { id: "none", name: "つけない" }, { id: "flower", name: "おはな", color: "#f6d7a6" },
  { id: "heart", name: "ハート", color: "#d88d9f" }, { id: "star", name: "おほしさま", color: "#e5c576" }
]);
const ATELIER_BAGS = Object.freeze([
  { id: "none", name: "もたない" }, { id: "rose", name: "ローズ", color: "#d6a0ae" },
  { id: "mint", name: "ミント", color: "#9ebfaa" }, { id: "lilac", name: "すみれ", color: "#b3a1ce" }
]);
const ATELIER_FRAMES = Object.freeze([
  { id: "garden", name: "おはなのにわ" }, { id: "rose", name: "リボンのおへや" }, { id: "sky", name: "そらのおさんぽ" }
]);
const ATELIER_PLACES = Object.freeze({
  w0: { name: "こもれびのおみせ", line: "ならべて、えらんで、おとどけしよう。", icon: "🌷" },
  w1: { name: "おはなとリボンの村", line: "おはなやリボンを、ぴったりそろえよう。", icon: "🎀" },
  w2: { name: "おかしのキッチン", line: "おともと、おかしのじゅんびをしよう。", icon: "🍰" },
  w3: { name: "リボンのこうぼう", line: "くふうして、すてきなものをつくろう。", icon: "🧵" },
  w4: { name: "こもれびマルシェ", line: "おともと、お店のじゅんびをしよう。", icon: "🧺" },
  w5: { name: "ほしぞらアトリエ", line: "ひらめきを合わせて、かざりをつくろう。", icon: "🌙" },
  w6: { name: "ゆめいろフェスタ", line: "自分の作戦で、おまつりをひらこう。", icon: "🎪" }
});
const atelierLookById = (id) => ATELIER_LOOKS.find((look) => look.id === id);
const atelierLookSrc = (id) => `./assets/generated/atelier_2026_10_v1/${atelierLookById(id)?.id || "rose"}.png`;
const atelierPlace = (world) => ATELIER_PLACES[world?.worldId || world?.id] || ATELIER_PLACES.w0;

function normaliseAtelier(raw) {
  const source = isStateRecord(raw) ? raw : {};
  const starters = ATELIER_LOOKS.filter((look) => !look.cost).map((look) => look.id);
  const owned = [...new Set([...starters, ...(Array.isArray(source.owned) ? source.owned.filter((id) => atelierLookById(id)) : [])])];
  const progress = Object.fromEntries(ATELIER_LOOKS.filter((look) => look.cost).map((look) => [look.id, safeStateInteger(source.progress?.[look.id], 0, 0, look.cost)]));
  for (const look of ATELIER_LOOKS) if (look.cost && progress[look.id] === look.cost && !owned.includes(look.id)) owned.push(look.id);
  const validPart = (id, list) => list.some((part) => part.id === id) ? id : list[0].id;
  const photos = (Array.isArray(source.photos) ? source.photos : []).filter((photo) => isStateRecord(photo) && typeof photo.id === "string" && owned.includes(photo.lookId)).slice(-24).map((photo) => ({
    id: photo.id, lookId: photo.lookId, pinId: validPart(photo.pinId, ATELIER_PINS), bagId: validPart(photo.bagId, ATELIER_BAGS), frameId: validPart(photo.frameId, ATELIER_FRAMES)
  }));
  const initialWish = source.wishId === undefined ? "sunflower" : source.wishId;
  return {
    mode: source.mode === "legacy" ? "legacy" : "atelier",
    lookId: owned.includes(source.lookId) ? source.lookId : "rose",
    pinId: validPart(source.pinId, ATELIER_PINS), bagId: validPart(source.bagId, ATELIER_BAGS),
    frameId: validPart(source.frameId, ATELIER_FRAMES),
    wishId: atelierLookById(initialWish)?.cost && !owned.includes(initialWish) ? initialWish : null,
    owned, progress, photos, threadBank: safeStateInteger(source.threadBank, 0, 0, 9999),
    lastUnlocked: owned.includes(source.lastUnlocked) ? source.lastUnlocked : null
  };
}

function completeAtelierProject(look) {
  const atelier = state.atelier;
  if (!look || atelier.owned.includes(look.id)) return false;
  atelier.progress[look.id] = look.cost;
  atelier.owned.push(look.id);
  atelier.lastUnlocked = look.id;
  atelier.wishId = null;
  return true;
}

function grantAtelierThread() {
  const atelier = state.atelier;
  const look = atelierLookById(atelier.wishId);
  if (!look || atelier.owned.includes(look.id)) {
    atelier.threadBank = Math.min(9999, atelier.threadBank + 1);
    return { banked: true, amount: 1 };
  }
  atelier.progress[look.id] = Math.min(look.cost, (atelier.progress[look.id] || 0) + 1);
  const completed = atelier.progress[look.id] === look.cost && completeAtelierProject(look);
  return { lookId: look.id, progress: atelier.progress[look.id], cost: look.cost, completed, amount: 1 };
}

function chooseAtelierWish(id) {
  const look = atelierLookById(id);
  if (!look?.cost || state.atelier.owned.includes(id)) return;
  const atelier = state.atelier;
  atelier.wishId = id;
  const applied = Math.min(atelier.threadBank, look.cost - (atelier.progress[id] || 0));
  atelier.threadBank -= applied;
  atelier.progress[id] += applied;
  const completed = atelier.progress[id] === look.cost && completeAtelierProject(look);
  toast(completed ? `${look.name}が できあがったよ！` : `${look.name}を つくろう！`);
  saveState(); render();
}

function chooseAtelierLook(id) {
  if (!state.atelier.owned.includes(id)) return;
  state.atelier.lookId = id; state.atelier.mode = "atelier";
  view.atelierPreviewId = null;
  saveState(); render(); playSfx("equip");
}

function chooseAtelierPart(slot, id) {
  const list = slot === "pin" ? ATELIER_PINS : slot === "bag" ? ATELIER_BAGS : null;
  if (!list?.some((part) => part.id === id)) return;
  state.atelier[`${slot}Id`] = id; state.atelier.mode = "atelier";
  saveState(); render(); playSfx("equip");
}

function saveAtelierPhoto() {
  if (state.atelier.mode !== "atelier") return;
  const { lookId, pinId, bagId, frameId } = state.atelier;
  const same = state.atelier.photos.find((photo) => photo.lookId === lookId && photo.pinId === pinId && photo.bagId === bagId && photo.frameId === frameId);
  if (same) { toast("このコーデは しゃしんちょうに あるよ！"); return; }
  const id = `look-${Date.now()}-${state.atelier.photos.length}`;
  state.atelier.photos.push({ id, lookId, pinId, bagId, frameId });
  state.atelier.photos = state.atelier.photos.slice(-24);
  toast("しゃしんちょうに のこしたよ！"); saveState(); render();
}

function restoreAtelierPhoto(id) {
  const photo = state.atelier.photos.find((photo) => photo.id === id);
  if (!photo) return;
  for (const key of ["lookId", "pinId", "bagId", "frameId"]) state.atelier[key] = photo[key];
  state.atelier.mode = "atelier"; view.atelierPreviewId = null;
  saveState(); render();
}

function exchangeAtelierGarden(id) {
  const decor = GARDEN_DECOR_SHOP.find((decor) => decor.id === id);
  if (!decor || state.garden.purchased.includes(id) || state.atelier.threadBank < 5) return;
  state.atelier.threadBank -= 5; state.garden.purchased.push(id);
  state.garden.layout[decor.id] = null; toast(`${decor.name}が とどいたよ！`); saveState(); render();
}

function exchangeAtelierSticker(id) {
  const sticker = STICKER_DEFS.find((sticker) => sticker.id === id);
  if (!sticker || state.stickers.owned.includes(id) || state.atelier.threadBank < 3) return;
  state.atelier.threadBank -= 3;
  state.stickers.owned.push(id); state.stats.stickers = state.stickers.owned.length;
  toast(`${sticker.name}が とどいたよ！`); saveState(); render();
}

function renderAtelierKeepsakes() {
  const available = STICKER_DEFS.filter((sticker) => !state.stickers.owned.includes(sticker.id));
  if (!available.length) return `<section class="atelier-keepsakes"><h3>シールも ぜんぶ あつまったよ！</h3><p>しゃしんやシールで、すきなページを つくろう。</p><button class="soft-button" data-action="nav" data-screen="stickers">シールちょうへ</button></section>`;
  return `<section class="atelier-keepsakes"><h3>シールで ページも おめかし</h3><p>とってある糸 3こで、すきなシールをひとつ。ほしいシールを えらぼう。</p><div class="atelier-keepsake-grid">${available.slice(0, 6).map((sticker) => `<button data-action="atelier-sticker" data-sticker-id="${sticker.id}" ${state.atelier.threadBank < 3 ? "disabled" : ""}>${renderAssetSprite(sticker.sprite, sticker.name)}<strong>${sticker.name}</strong><span>糸 3こ</span></button>`).join("")}</div></section>`;
}

function renderAtelierPin(id, standalone = false) {
  const pin = ATELIER_PINS.find((part) => part.id === id);
  if (!pin || id === "none") return standalone ? '<span class="atelier-empty-part" aria-hidden="true">−</span>' : "";
  const flower = '<path d="M0-12C-12-30-25-17-16-5C-36-5-33 13-15 13C-20 32 0 34 4 15C20 31 32 13 16 4C36-10 17-26 7-12Z"/><circle r="7" fill="#bf9a62"/>';
  const heart = '<path d="M0 21C-50-12-12-39 0-17C12-39 50-12 0 21Z"/>';
  const star = '<path d="M0-27L8-9L28-7L13 7L17 27L0 17L-17 27L-13 7L-28-7L-8-9Z"/>';
  const shape = id === "flower" ? flower : id === "heart" ? heart : star;
  if (standalone) return `<svg viewBox="-40 -40 80 80" class="atelier-part-icon" aria-hidden="true"><g fill="${pin.color}" stroke="#856c68" stroke-width="2.5" stroke-linejoin="round">${shape}</g></svg>`;
  return `<svg class="atelier-part-layer" viewBox="0 0 1024 1536" aria-hidden="true"><g transform="translate(612 513)" fill="${pin.color}" stroke="#856c68" stroke-width="2.5" stroke-linejoin="round">${shape}</g></svg>`;
}

function renderAtelierBag(id, standalone = false) {
  const bag = ATELIER_BAGS.find((part) => part.id === id);
  if (!bag || id === "none") return standalone ? '<span class="atelier-empty-part" aria-hidden="true">−</span>' : "";
  const content = `<path d="M-49-32C-50-113 50-113 49-32" fill="none" stroke="#977b71" stroke-width="9"/><rect x="-76" y="-36" width="152" height="114" rx="25" fill="${bag.color}" stroke="#8c726d" stroke-width="4"/><path d="M-75-13Q0 34 75-13" fill="none" stroke="#f8ece1" stroke-width="3"/><circle cy="12" r="7" fill="#e6cf97"/><path d="M-52 53H-22M39 53H53" stroke="#f7e7df" stroke-width="3" stroke-linecap="round"/>`;
  if (standalone) return `<svg viewBox="-100 -115 200 220" class="atelier-part-icon" aria-hidden="true">${content}</svg>`;
  return `<svg class="atelier-part-layer" viewBox="0 0 1024 1536" aria-hidden="true"><g transform="translate(816 933)">${content}</g></svg>`;
}

function renderAtelierAvatar(snapshot = state.atelier, label = "わたしのコーデ") {
  const look = atelierLookById(snapshot?.lookId) || ATELIER_LOOKS[0];
  const source = atelierLookSrc(look.id);
  const canLoad = typeof window?.Image === "function";
  const loading = canLoad && !avatarImagesReady.has(source);
  const name = `${label}、${look.name}、${ATELIER_PINS.find((pin) => pin.id === snapshot.pinId)?.name || "つけない"}のブローチ、${ATELIER_BAGS.find((bag) => bag.id === snapshot.bagId)?.name || "もたない"}のバッグ`;
  return `<div class="avatar-doll atelier-avatar${loading ? " is-loading" : ""}" role="img" aria-label="${escapeHtml(name)}" data-look-id="${look.id}" data-pin-id="${snapshot.pinId || "none"}" data-bag-id="${snapshot.bagId || "none"}"${canLoad ? ` aria-busy="${loading}" data-avatar-sources="${escapeHtml(JSON.stringify([source]))}"` : ""}><span class="atelier-character" style="--src:url('${source}')"></span>${renderAtelierPin(snapshot.pinId)}${renderAtelierBag(snapshot.bagId)}</div>`;
}

function renderAtelierWish(compact = false) {
  const atelier = state.atelier;
  const look = atelierLookById(atelier.wishId);
  const allLooksMade = atelier.owned.length === ATELIER_LOOKS.length;
  const gardenNeeded = GARDEN_DECOR_SHOP.some((decor) => !state.garden.purchased.includes(decor.id));
  const stickerNeeded = STICKER_DEFS.some((sticker) => !state.stickers.owned.includes(sticker.id));
  const nextCreation = !allLooksMade ? "つくりたいコーデを えらぼう" : gardenNeeded ? "おにわも おめかししよう" : stickerNeeded ? "シールで ページも おめかし" : "わたしだけの ページをつくろう";
  if (!look) return `<section class="atelier-wish atelier-wish--idle"><span class="atelier-kicker">つぎは なにをつくる？</span><strong>${nextCreation}</strong><p>おてつだいの糸は とってあるよ。${atelier.threadBank ? `いま ${atelier.threadBank}こ。` : ""}</p><button class="soft-button" data-action="nav" data-screen="boutique">${allLooksMade ? gardenNeeded ? "おにわのかざりを えらぶ" : "シールを えらぶ" : "つくりたいを ひらく"}</button></section>`;
  const count = atelier.progress[look.id] || 0;
  return `<section class="atelier-wish ${compact ? "is-compact" : ""}" aria-label="${escapeHtml(look.name)}。あと${look.cost - count}こで完成"><div class="atelier-wish-image">${renderAtelierAvatar({ lookId: look.id, pinId: "none", bagId: "none" }, "つくっているコーデ")}</div><div><span class="atelier-kicker">いま つくっているコーデ</span><strong>${look.name}</strong><p>糸を あと <b>${look.cost - count}こ</b> あつめよう</p><div class="atelier-thread-track" aria-label="${count}/${look.cost}">${Array.from({ length: look.cost }, (_, index) => `<i class="${index < count ? "is-filled" : ""}">✿</i>`).join("")}</div><small>おてつだいが できたら、糸がひとつ。</small><button class="text-button" data-action="nav" data-screen="boutique">ほかのコーデも みる</button></div></section>`;
}

function renderAtelierPhotos() {
  const photos = [...state.atelier.photos].reverse();
  return `<section class="atelier-photos" aria-label="わたしのしゃしんちょう"><div class="section-heading"><div><span class="atelier-kicker">MY LOOKBOOK</span><h3>わたしの しゃしんちょう</h3></div><span>${photos.length}/24</span></div>${photos.length ? `<div class="atelier-photo-grid">${photos.map((photo) => `<button class="atelier-photo atelier-frame-${photo.frameId}" data-action="atelier-restore" data-photo-id="${escapeHtml(photo.id)}" aria-label="${escapeHtml(atelierLookById(photo.lookId).name)}のしゃしんのコーデを着る">${renderAtelierAvatar(photo, "しゃしんのコーデ")}<strong>${atelierLookById(photo.lookId).name}</strong><span>このコーデにする</span></button>`).join("")}</div>` : '<p class="atelier-empty-copy">すきなコーデをつくったら、しゃしんに のこそう。</p>'}</section>`;
}

function renderAtelierDress() {
  const atelier = state.atelier;
  const preview = atelierLookById(view.atelierPreviewId);
  const current = preview ? { ...atelier, lookId: preview.id } : atelier;
  const previewOwned = !preview || atelier.owned.includes(preview.id);
  const target = atelierLookById(atelier.wishId);
  return `<section class="wide-panel atelier-dress"><div class="section-heading"><div><span class="atelier-kicker">DRESSING ROOM</span><h2>わたしの おめかし</h2><p>ふくをえらんで、バッグやブローチをあわせよう。</p></div><button class="soft-button" data-action="nav" data-screen="boutique">つくりたいを みる</button></div><div class="atelier-dress-workbench"><aside class="atelier-fitting atelier-frame-${atelier.frameId}"><span class="atelier-kicker">${preview ? "しちゃくちゅう" : "きょうのコーデ"}</span>${preview ? renderAtelierAvatar(current, "しちゃく") : renderAvatarLayered()}<strong>${!preview && atelier.mode === "legacy" ? "まえのクローゼットのコーデ" : atelierLookById(current.lookId).name}</strong>${preview ? `<p>${previewOwned ? "できあがっているよ！" : `あと${preview.cost - (atelier.progress[preview.id] || 0)}この糸で できあがり`}</p><button class="primary-button" data-action="${previewOwned ? "atelier-look" : "atelier-wish"}" data-look-id="${preview.id}">${previewOwned ? "このコーデを 着る" : target?.id === preview.id ? "これを つくっているよ" : "これを つくりたい"}</button><button class="text-button" data-action="atelier-preview-clear">じぶんのコーデに もどる</button>` : `<button class="primary-button" data-action="${atelier.mode === "legacy" ? "atelier-look" : "atelier-photo"}" ${atelier.mode === "legacy" ? `data-look-id="${atelier.lookId}"` : ""}>${atelier.mode === "legacy" ? "新しいコーデにする" : "しゃしんに のこす"}</button>`}<div class="atelier-frame-picker" aria-label="しゃしんの背景">${ATELIER_FRAMES.map((frame) => `<button class="${frame.id === atelier.frameId ? "is-selected" : ""}" data-action="atelier-frame" data-frame-id="${frame.id}" aria-pressed="${frame.id === atelier.frameId}">${frame.name}</button>`).join("")}</div></aside><div class="atelier-closet"><section><h3>セットの ふくとかみ</h3><div class="atelier-look-grid">${ATELIER_LOOKS.filter((look) => atelier.owned.includes(look.id)).map((look) => { const owned = atelier.owned.includes(look.id); const selected = !preview && atelier.mode === "atelier" && atelier.lookId === look.id; return `<button class="atelier-look-card ${selected ? "is-selected" : ""} ${owned ? "" : "is-unmade"}" data-action="${owned ? "atelier-look" : "atelier-preview"}" data-look-id="${look.id}" aria-pressed="${selected}" aria-label="${look.name}を${owned ? "着る" : "試着する"}">${renderAtelierAvatar({ lookId: look.id, pinId: "none", bagId: "none" }, look.name)}<strong>${look.name}</strong><span>${selected ? "いま これ！" : owned ? "着てみる" : "しちゃくする"}</span></button>`; }).join("")}</div></section><section><h3>ブローチ</h3><div class="atelier-part-picker">${ATELIER_PINS.map((pin) => `<button data-action="atelier-pin" data-part-id="${pin.id}" aria-pressed="${atelier.mode === "atelier" && atelier.pinId === pin.id}" class="${atelier.mode === "atelier" && atelier.pinId === pin.id ? "is-selected" : ""}">${renderAtelierPin(pin.id, true)}<span>${pin.name}</span></button>`).join("")}</div></section><section><h3>バッグ</h3><div class="atelier-part-picker">${ATELIER_BAGS.map((bag) => `<button data-action="atelier-bag" data-part-id="${bag.id}" aria-pressed="${atelier.mode === "atelier" && atelier.bagId === bag.id}" class="${atelier.mode === "atelier" && atelier.bagId === bag.id ? "is-selected" : ""}">${renderAtelierBag(bag.id, true)}<span>${bag.name}</span></button>`).join("")}</div></section><p class="atelier-note">セットのふくとかみは いっしょにかわるよ。バッグとブローチは、どれでもあわせられるよ。</p></div></div>${renderAtelierPhotos()}<details class="atelier-legacy" ${view.legacyClosetOpen ? "open" : ""} data-legacy-closet><summary>まえのクローゼットを ひらく</summary><p>あつめた おしゃれも、そのまま着られるよ。</p><button class="soft-button" data-action="atelier-legacy">まえの おしゃれに きがえる</button>${view.legacyClosetOpen ? renderLegacyDress() : ""}</details></section>`;
}

function renderAtelierBoutique() {
  const atelier = state.atelier;
  const preview = atelierLookById(view.atelierPreviewId) || atelierLookById(atelier.wishId) || ATELIER_LOOKS[3];
  return `<section class="wide-panel atelier-boutique" data-boutique-tab="${view.boutiqueTab || "projects"}"><div class="section-heading"><div><span class="atelier-kicker">LITTLE ATELIER</span><h2>つぎは なにをつくる？</h2><p>お店のおてつだいで、すきなコーデをつくろう。</p></div><div><span class="atelier-thread-bank">とってある糸 ${atelier.threadBank}こ</span>${atelier.wishId ? '<button class="text-button" data-action="atelier-bank">糸を とっておく</button>' : ""}</div></div>${renderBoutiqueTabs()}<div class="atelier-project-workbench" data-boutique-section="projects"><aside class="atelier-project-preview atelier-frame-garden">${renderAtelierAvatar({ lookId: preview.id, pinId: atelier.pinId, bagId: atelier.bagId }, "しちゃくコーデ")}<h3>${preview.name}</h3><p>${atelier.owned.includes(preview.id) ? "できあがっているよ！" : `あと${preview.cost - (atelier.progress[preview.id] || 0)}この糸で できあがり`}</p>${atelier.owned.includes(preview.id) ? `<button class="primary-button" data-action="atelier-look" data-look-id="${preview.id}">このコーデを 着る</button>` : `<button class="primary-button" data-action="atelier-wish" data-look-id="${preview.id}" ${atelier.wishId === preview.id ? "disabled" : ""}>${atelier.wishId === preview.id ? "いま つくっているよ" : "これを つくりたい"}</button>`}<button class="soft-button" data-action="nav" data-screen="learn">お店を てつだいにいく</button></aside><div class="atelier-projects">${ATELIER_LOOKS.filter((look) => look.cost).map((look) => { const owned = atelier.owned.includes(look.id); return `<button class="atelier-project-card ${preview.id === look.id ? "is-selected" : ""}" data-action="atelier-preview" data-look-id="${look.id}" aria-pressed="${preview.id === look.id}">${renderAtelierAvatar({ lookId: look.id, pinId: "none", bagId: "none" }, look.name)}<div><strong>${look.name}</strong><p>${owned ? "できあがり ✿" : `糸 ${atelier.progress[look.id] || 0}/${look.cost}`}</p><span>${atelier.wishId === look.id ? "つくっているよ" : "おおきく しちゃく"}</span></div></button>`; }).join("")}<div class="atelier-story-note"><strong>おともを てつだうと、糸がとどくよ。</strong><p>ヒントも、えらびなおしも だいじょうぶ。できたら、糸はおなじだけもらえるよ。つくりかけは、あとでつづけられるよ。</p></div></div></div><section class="atelier-garden-projects" data-boutique-section="garden"><h3>おにわにも おめかし</h3><p>とってある糸 5こで、かざりをひとつ。服より先に庭をかざるときは「糸をとっておく」をえらんでね。</p><div class="garden-decor-choices">${GARDEN_DECOR_SHOP.map((decor) => `<button class="garden-decor-choice ${state.garden.purchased.includes(decor.id) ? "is-owned" : ""}" data-action="atelier-decor" data-item-id="${decor.id}" ${state.garden.purchased.includes(decor.id) || atelier.threadBank < 5 ? "disabled" : ""}>${renderAssetSprite(decor.sprite, decor.name)}<span>${decor.name}</span><small>${state.garden.purchased.includes(decor.id) ? "とどいているよ" : "糸 5こ"}</small></button>`).join("")}</div>${atelier.owned.length === ATELIER_LOOKS.length && GARDEN_DECOR_SHOP.every((decor) => state.garden.purchased.includes(decor.id)) ? '<p>ぜんぶできあがり！ おてつだいでは、おともがそだって、新しいシールやおにわの場所もふえるよ。</p><button class="soft-button" data-action="nav" data-screen="pets">おとものおうちへ</button>' : ""}</section><div class="boutique-section" data-boutique-section="keepsakes">${renderAtelierKeepsakes()}</div><details class="atelier-legacy" data-boutique-section="legacy"><summary>まえの おしゃれのお店</summary>${renderLegacyBoutique()}</details></section>`;
}

// ===== マイペット =====
// 成績の競争や課金ではなく、学習を終えたことを「おともが育つ」手触りに
// 変えるための小さな育成ループ。すべて端末内に保存されます。
const PET_ASSET_DIR = "./assets/generated/pets_v1/final";
const petAsset = (file) => `${PET_ASSET_DIR}/${file}.png`;
const PET_EVOLUTION_ASSET_DIR = "./assets/generated/pet_evolution_v2";
const petEvolutionAtlas = (species) => `${PET_EVOLUTION_ASSET_DIR}/${species.asset}-evolution.png`;
const PLAYFUL_REWARD_DIR = "./assets/generated/playful_rewards_v1/final";
const starterMagicGiftAsset = `${PLAYFUL_REWARD_DIR}/starter_magic_gift.png`;
const PET_XP = Object.freeze({ firstStage: 12, replayStage: 6 });
const PET_MAX_LEVEL = 10;
const PET_EVOLUTION_STAGES = Object.freeze([
  { level: 1, name: "ちいさな おとも", flair: "seed" },
  { level: 3, name: "ふわふわ おとも", flair: "fluffy" },
  { level: 6, name: "おしゃれ おとも", flair: "style" },
  { level: 10, name: "きらめき おとも", flair: "sparkle" }
]);
const PET_SPECIES = Object.freeze([
  { id: "cat", name: "こねこ", nickname: "もも", asset: "cat_momo", tone: "peach" },
  { id: "bunny", name: "うさぎ", nickname: "るる", asset: "bunny_lulu", tone: "lavender" },
  { id: "puppy", name: "こいぬ", nickname: "みんと", asset: "puppy_minto", tone: "mint" },
  { id: "fox", name: "こぎつね", nickname: "そら", asset: "fox_sora", tone: "sky" }
]);
const PET_TRICKS = Object.freeze([
  { id: "cat-hello", speciesId: "cat", name: "にゃんあいさつ", level: 1, motion: "wave", hint: "おててを ふるよ" },
  { id: "cat-tail-heart", speciesId: "cat", name: "しっぽハート", level: 2, motion: "tail-heart", hint: "しっぽで ハート" },
  { id: "cat-stretch", speciesId: "cat", name: "のびのび", level: 4, motion: "stretch", hint: "ぐーんと のびる" },
  { id: "cat-twirl", speciesId: "cat", name: "くるりジャンプ", level: 6, motion: "twirl", hint: "くるっと きめる" },
  { id: "bunny-hello", speciesId: "bunny", name: "ぴょんあいさつ", level: 1, motion: "hop", hint: "ちいさく ぴょん" },
  { id: "bunny-clap", speciesId: "bunny", name: "おててぱちぱち", level: 2, motion: "clap", hint: "おててを ぱちぱち" },
  { id: "bunny-spin", speciesId: "bunny", name: "くるりダンス", level: 4, motion: "twirl", hint: "くるっと まわる" },
  { id: "bunny-bow", speciesId: "bunny", name: "おじぎキラリ", level: 6, motion: "bow", hint: "ぺこりで きめる" },
  { id: "puppy-hello", speciesId: "puppy", name: "おてあいさつ", level: 1, motion: "wave", hint: "おてを ふるよ" },
  { id: "puppy-hop", speciesId: "puppy", name: "しっぽジャンプ", level: 2, motion: "hop", hint: "しっぽを ふって ぴょん" },
  { id: "puppy-turn", speciesId: "puppy", name: "わんくるり", level: 4, motion: "twirl", hint: "元気に まわる" },
  { id: "puppy-bow", speciesId: "puppy", name: "にこにこおじぎ", level: 6, motion: "bow", hint: "にっこり ぺこり" },
  { id: "fox-hello", speciesId: "fox", name: "こんあいさつ", level: 1, motion: "tail-wag", hint: "しっぽを ゆらゆら" },
  { id: "fox-spark", speciesId: "fox", name: "ほしきらり", level: 2, motion: "sparkle", hint: "ほしを きらり" },
  { id: "fox-twirl", speciesId: "fox", name: "しっぽくるり", level: 4, motion: "twirl", hint: "しっぽで くるり" },
  { id: "fox-dash", speciesId: "fox", name: "きらめきポーズ", level: 6, motion: "finale", hint: "きらっと きめる" }
]);

// 学習の成果が「自分の島が育つ」体験として残るようにする小さな節目。
// どれも既存の素材だけを使い、毎日戻ってこなければ損をする仕組みにはしない。
const GARDEN_GROWTH_DEFS = [
  {
    id: "garden-first-flower",
    name: "はじめての おはな",
    sprite: "flower",
    at: 1,
    scale: 0.5,
    position: (size) => ({ x: Math.floor(size / 2) - 1, y: Math.floor(size / 2) })
  },
  {
    id: "garden-picnic-chair",
    name: "ピクニックいす",
    sprite: "chair",
    at: 3,
    scale: 0.52,
    position: (size) => ({ x: Math.floor(size / 2) - 1, y: Math.floor(size / 2) - 1 })
  },
  {
    id: "garden-nap-bed",
    name: "おひるねベッド",
    sprite: "bed",
    at: 5,
    scale: 0.52,
    position: (size) => ({ x: Math.floor(size / 2), y: Math.floor(size / 2) })
  }
];

// コインは、学びの成果を競うためではなく、好きな庭にするための選択にだけ使う。
const GARDEN_DECOR_SHOP = [
  {
    id: "garden-shop-flower",
    name: "おはなばたけ",
    sprite: "flower",
    price: 24,
    scale: 0.46,
    position: (size) => ({ x: Math.floor(size / 2) + 1, y: Math.floor(size / 2) })
  },
  {
    id: "garden-shop-chair",
    name: "おちゃのいす",
    sprite: "chair",
    price: 36,
    scale: 0.48,
    position: (size) => ({ x: Math.floor(size / 2), y: Math.floor(size / 2) - 1 })
  },
  {
    id: "garden-shop-bed",
    name: "ふわふわベッド",
    sprite: "bed",
    price: 48,
    scale: 0.48,
    position: (size) => ({ x: Math.floor(size / 2) - 1, y: Math.floor(size / 2) + 1 })
  }
];

const GARDEN_FINAL_DECOR = Object.freeze({
  id: "garden-expansion-gate",
  name: "にじの ひろがりゲート",
  sprite: "gardenExpansionGate",
  scale: 0.9,
  position: (size) => ({ x: Math.floor(size / 2), y: 2 })
});

const GARDEN_FACILITIES = Object.freeze([
  { id: "home", name: "おうち", sprite: "home", footprint: 2, at: 0 },
  { id: "garden", name: "はたけ", sprite: "garden", at: 1 },
  { id: "tree", name: "ちえのき", sprite: "tree", at: 3 },
  { id: "school", name: "おてつだいひろば", sprite: "school", footprint: 2, at: 6 },
  { id: "boutique", name: "おしゃれのおみせ", sprite: "boutique", footprint: 2, at: 10 }
]);
const GARDEN_FLOORS = Object.freeze([
  { id: "grass", name: "こもれびの しばふ", at: 0 },
  { id: "peach", name: "ももいろの こみち", at: 1 },
  { id: "lavender", name: "すみれの タイル", at: 3 },
  { id: "wood", name: "ミルクの ウッド", at: 6 },
  { id: "check", name: "ミントの チェック", at: 10 },
  { id: "stars", name: "おほしさまの ゆか", at: 16 }
]);
const GARDEN_EXPANSIONS = Object.freeze([
  { size: 6, at: 0 }, { size: 8, at: 4 }, { size: 10, at: 8 },
  { size: 12, at: 14 }, { size: 14, at: 22 }
]);

const W0_AREAS = [
  {
    id: "count",
    name: "りんごあつめ",
    shortName: "かず",
    total: 8,
    mode: "count",
    theme: "1から10までのかず"
  },
  {
    id: "compare",
    name: "どっちがおおい",
    shortName: "おおい",
    total: 6,
    mode: "compare",
    theme: "おおい・すくない"
  },
  {
    id: "shape",
    name: "かたちさがし",
    shortName: "かたち",
    total: 6,
    mode: "shape",
    theme: "まる・さんかく・しかく"
  },
  {
    id: "size",
    name: "おおきさくらべ",
    shortName: "おおきさ",
    total: 6,
    mode: "size",
    theme: "おおきい・ちいさい"
  },
  {
    id: "order",
    name: "なんばんめのおはな",
    shortName: "じゅんばん",
    total: 6,
    mode: "order",
    theme: "ひだり・みぎ・なんばんめ"
  },
  {
    id: "pattern",
    name: "もようづくり",
    shortName: "もよう",
    total: 8,
    mode: "pattern",
    theme: "くりかえしのきまり"
  }
];

const W0_STAGES = buildW0Stages();

const W1_AREAS = [
  {
    id: "w1-count100",
    worldId: "w1",
    name: "100までのかず",
    shortName: "100",
    total: 10,
    mode: "number",
    theme: "10のまとまり・100までのかず"
  },
  {
    id: "w1-add",
    worldId: "w1",
    name: "はしわたし",
    shortName: "たしざん",
    total: 12,
    mode: "add",
    theme: "10まで・20までのたし算"
  },
  {
    id: "w1-subtract",
    worldId: "w1",
    name: "ひきざんのこみち",
    shortName: "ひきざん",
    total: 12,
    mode: "subtract",
    theme: "10まで・20までのひき算"
  },
  {
    id: "w1-clock",
    worldId: "w1",
    name: "とけいのまど",
    shortName: "とけい",
    total: 8,
    mode: "clock",
    theme: "なんじ・なんじはん"
  },
  {
    id: "w1-shape",
    worldId: "w1",
    name: "かたちアトリエ",
    shortName: "かたち",
    total: 8,
    mode: "shape",
    theme: "まる・さんかく・しかく・ほし"
  },
  {
    id: "w1-length",
    worldId: "w1",
    name: "リボンものさし",
    shortName: "ながさ",
    total: 10,
    mode: "length",
    theme: "ながさくらべ"
  }
];

const W1_STAGES = buildStages(W1_AREAS, 1);

// ===== カリキュラム原案。公開版は問題バンクを検証した小1〜小6 =====
// 各単元は5問の中で「具体物→図→式→確かめ→生活場面」と表し方を替える。
// 数だけ大きくした同一問題にしないため、mechanic と renderer を分離している。
const CURRICULUM_WORLD_INFO = Object.freeze({
  w1: { name: "W1 かずの村", target: "小1", sprite: "school" },
  w2: { name: "W2 かけ算マーケット", target: "小2", sprite: "worldW2" },
  w3: { name: "W3 分数ベーカリー", target: "小3", sprite: "worldW3" },
  w4: { name: "W4 図形観測所", target: "小4", sprite: "worldW4" },
  w5: { name: "W5 比のハーバー", target: "小5", sprite: "worldW5" },
  w6: { name: "W6 にじの温室", target: "小6", sprite: "worldW6" },
  w7: { name: "W7 月の数式塔", target: "中1", sprite: "worldW7" },
  w8: { name: "W8 関数スカイレール", target: "中2", sprite: "worldW8" },
  w9: { name: "W9 ルートの城", target: "中3", sprite: "worldW9" }
});

// 添付の年齢別の学びを、単元名の一覧ではなく「世界で何を助けるのか」に
// 翻訳する。公開中の小6までだけを表示し、未検証の中学範囲を遊べるように
// 見せない品質境界はそのまま守る。
const AGE_ADVENTURE_ARCS = Object.freeze({
  w0: { age: "5〜6歳ごろ", icon: "🐿️", title: "どうぶつおせわ隊", project: "森のなかまを おせわ", skills: "数えて配る・くらべる・順番に進む", promise: "ひとつずつ動かすと、なかまたちが元気になるよ。" },
  w1: { age: "6〜7歳ごろ", icon: "💎", title: "ジュエルみちびき隊", project: "きらきら道を つなぐ", skills: "10のまとまり・計算の入口・くらしの数", promise: "集め方を見つけるたび、ジュエルの道が光るよ。" },
  w2: { age: "7〜8歳ごろ", icon: "🛍️", title: "マーケット店長", project: "お店を ひらく", skills: "九九・分ける・お金・単位", promise: "同じまとまりや分け方で、売り場を完成させよう。" },
  w3: { age: "8〜9歳ごろ", icon: "🥐", title: "ベーカリー工房", project: "レシピを とどける", skills: "大きな数・わり算・小数・分数", promise: "図と数を行き来して、ぴったりのレシピを作ろう。" },
  w4: { age: "9〜10歳ごろ", icon: "🔭", title: "観測所ミッション", project: "まちの発見を 記録", skills: "概数・小数・面積・変化のグラフ", promise: "見通しを立てて確かめると、観測ノートが育つよ。" },
  w5: { age: "10〜11歳ごろ", icon: "⛵", title: "ハーバー作戦室", project: "おとどけ作戦を 立てる", skills: "割合・単位量・分数・図形", promise: "一つ分にそろえる作戦で、港のみんなを助けよう。" },
  w6: { age: "11〜12歳ごろ", icon: "🌈", title: "にじの温室チーム", project: "未来の庭を デザイン", skills: "比・比例・文字と式・確率・データ", promise: "表・図・式をつないで、温室の計画を完成させよう。" }
});

const curriculumUnit = (id, worldId, grade, shortName, name, strand, renderer, mechanic, theme, objective, misconception) => Object.freeze({
  id, worldId, grade, shortName, name, strand, renderer, mechanic, theme, objective, misconception,
  board: `${shortName}のアトリエ`,
  visualKit: CURRICULUM_WORLD_INFO[worldId]?.sprite || "numbers"
});

// 小学校・中学校の数と計算、測定、図形、変化と関係、データの活用を、
// 学年に応じた中心単元として網羅する。単元ごとに選び方・見せ方も別にする。
const CURRICULUM_UNITS = Object.freeze([
  curriculumUnit("w1-capacity-potion", "w1", "小1", "かさ", "ぽかぽかポーション", "量と測定", "measure", "capacity-potion-fill", "かさをくらべる", "入る量を、目盛りと具体物で比べる。", "背の高さだけで、入る量を決めない。"),
  curriculumUnit("w1-solid-shadow", "w1", "小1", "立体", "かげのひみつ箱", "図形", "geometry", "solid-shadow-box", "身の回りの立体", "箱・筒・玉の特徴を影と触り心地で捉える。", "見える面だけで立体の種類を決めない。"),
  curriculumUnit("w1-picture-graph", "w1", "小1", "グラフ", "シールおはなしボード", "データ", "chart", "picture-graph-sticker-wall", "絵グラフ", "一つ分の印を対応させて、人数や数を読む。", "絵の大きさではなく印の数を読む。"),

  curriculumUnit("w2-place-value", "w2", "小2", "1000", "1000のたから倉庫", "数と計算", "place", "place-value-crane", "1000までの数", "百・十・一のまとまりで数を構成する。", "数字の並びと位の意味を入れ替えない。"),
  curriculumUnit("w2-column-calculation", "w2", "小2", "くり上がり", "おとどけ計算コンベア", "数と計算", "calculation", "column-conveyor", "2けたの加減", "位をそろえ、くり上がり・くり下がりを扱う。", "一の位と十の位を混ぜない。"),
  curriculumUnit("w2-multiplication", "w2", "小2", "九九", "くるくる九九カルーセル", "数と計算", "array", "multiplication-carousel", "かけ算", "同じ数のまとまりを配列と式で結ぶ。", "足し算の回数と一組の数を取り違えない。"),
  curriculumUnit("w2-fraction", "w2", "小2", "分数", "クッキーわけわけ工房", "数と計算", "fraction", "fraction-cookie-cut", "分数の意味", "等しく分けた一つ分を分数で表す。", "分け方が等しいことを見落とさない。"),
  curriculumUnit("w2-money", "w2", "小2", "お金", "おかいものレジ", "量と測定", "measure", "money-change-register", "お金", "硬貨・紙幣の組合せと代金を考える。", "硬貨の枚数だけで値段を比べない。"),
  curriculumUnit("w2-units", "w2", "小2", "単位", "ものさしリレー", "量と測定", "measure", "unit-relay", "長さ・かさ・時刻", "長さ・かさ・時刻に合う単位を選び、同じ基準で測る。", "異なる単位をそのまま比べない。"),
  curriculumUnit("w2-rectangle", "w2", "小2", "四角形", "タイル修理隊", "図形", "geometry", "rectangle-tile-repair", "長方形・正方形・直角", "辺や直角の性質から形を見分ける。", "見た目の向きだけで形を決めない。"),
  curriculumUnit("w2-data", "w2", "小2", "表とグラフ", "まちのニュースボード", "データ", "chart", "table-bar-newsroom", "表・棒グラフ", "表と棒グラフを行き来して比較する。", "棒の高さではなく目盛りを読む。"),

  curriculumUnit("w3-number10000", "w3", "小3", "10000", "1万ジップライン", "数と計算", "place", "ten-thousand-zipline", "10000までの数", "万・千・百・十・一の位を読む。", "0がある位を飛ばさない。"),
  curriculumUnit("w3-multiplication", "w3", "小3", "かけ算", "二けたかけ算ワークショップ", "数と計算", "calculation", "two-digit-multiplication-workshop", "乗法", "分配して二けた×一けたを計算する。", "十のまとまりを一の位として扱わない。"),
  // ID は既存の学習記録を守るため保持し、公開先だけを小3へ移した。
  curriculumUnit("w2-division", "w3", "小3", "わり算", "ピクニックおわけ台", "数と計算", "calculation", "division-picnic-share", "等分除・包含除", "同じ数ずつ分ける意味を図と式で捉える。", "残りや一組の数を答えと混同しない。"),
  curriculumUnit("w3-division-remainder", "w3", "小3", "あまり", "レスキューわり算", "数と計算", "calculation", "remainder-rescue", "除法と余り", "余りは割る数より小さいことを確かめる。", "余りを商に足してしまわない。"),
  curriculumUnit("w3-decimal", "w3", "小3", "小数", "ジュース小数ミキサー", "数と計算", "decimal", "decimal-juice-mixer", "小数", "0.1のまとまりで小数を読む。", "小数点の位置を動かさない。"),
  curriculumUnit("w3-fraction", "w3", "小3", "分数", "レシピ分数テープ", "数と計算", "fraction", "fraction-recipe-strip", "分数の大小", "同じ大きさの全体で分数を比べる。", "分母だけで大小を決めない。"),
  curriculumUnit("w3-circle", "w3", "小3", "円", "コンパス花園", "図形", "geometry", "circle-compass-garden", "円と球", "中心から等しい距離という円の性質を使う。", "直径と半径の長さを同じにしない。"),
  curriculumUnit("w3-time", "w3", "小3", "時間", "時刻表トレイン", "量と測定", "measure", "elapsed-time-train", "時間", "時刻と経過時間を線でつないで考える。", "開始と終了の順を逆にしない。"),
  curriculumUnit("w3-bargraph", "w3", "小3", "棒グラフ", "グラフ探偵事務所", "データ", "chart", "bar-graph-detective", "棒グラフ", "目盛りと差を読んで根拠を説明する。", "棒の太さや色で値を決めない。"),

  curriculumUnit("w4-rounding", "w4", "小4", "概数", "概数テレスコープ", "数と計算", "place", "rounding-telescope", "大きな数と概数", "目的の位で四捨五入する。", "丸める位の一つ右を見落とさない。"),
  curriculumUnit("w4-division", "w4", "小4", "わり算", "大わり算ベーカリー", "数と計算", "calculation", "long-division-bakery", "わり算の筆算", "途中の商と余りを位ごとに確かめる。", "商を立てる位をずらさない。"),
  curriculumUnit("w4-decimal-calc", "w4", "小4", "小数計算", "小数アクアリウム", "数と計算", "decimal", "decimal-aquarium", "小数の加減", "小数点をそろえて計算する。", "小数点を右端にそろえない。"),
  curriculumUnit("w4-fraction-calc", "w4", "小4", "分数計算", "分数モザイク", "数と計算", "fraction", "same-denominator-mosaic", "同分母分数", "分母を保ち、分子を足したり引いたりする。", "分母どうしを足してしまわない。"),
  curriculumUnit("w4-angle", "w4", "小4", "角度", "角度カメラ", "図形", "geometry", "angle-camera", "角とその大きさ", "直角を基準に角度を読む。", "線の長さで角の大きさを決めない。"),
  curriculumUnit("w4-parallel", "w4", "小4", "平行", "レールビルダー", "図形", "geometry", "parallel-rail-builder", "垂直・平行", "同じ間隔や直角を使って線の関係を見分ける。", "交わらないだけで平行と決めない。"),
  curriculumUnit("w4-area", "w4", "小4", "面積", "花畑区画デザイナー", "図形", "area", "area-tile-planner", "面積", "一辺1のタイルで面積を構成する。", "周りの長さと面積を混同しない。"),
  curriculumUnit("w4-linegraph", "w4", "小4", "折れ線", "お天気ラインスタジオ", "データ", "chart", "line-graph-weather", "折れ線グラフ", "変化の大きさと時点を対応させる。", "線の傾きだけで正確な数を決めない。"),

  curriculumUnit("w5-factors", "w5", "小5", "約数", "約数ロックピッカー", "数と計算", "calculation", "factor-lockpicker", "整数の性質", "約数・倍数を積の組で確かめる。", "倍数と約数の向きを逆にしない。"),
  curriculumUnit("w5-decimal-muldiv", "w5", "小5", "小数×÷", "小数セイルレース", "数と計算", "decimal", "decimal-sail-race", "小数の乗除", "10倍・1/10倍の関係で小数点を捉える。", "小数点を感覚で移動しない。"),
  curriculumUnit("w5-fraction-common", "w5", "小5", "通分", "分数キッチン", "数と計算", "fraction", "common-denominator-kitchen", "異分母分数", "同じ分母にそろえて大小や和差を考える。", "分子と分母を別々に足さない。"),
  curriculumUnit("w5-unit-rate", "w5", "小5", "単位量", "おとどけプランナー", "変化と関係", "ratio", "unit-rate-delivery", "単位量あたり", "一つ分にそろえて比べる。", "合計だけで比べない。"),
  curriculumUnit("w5-percent", "w5", "小5", "割合", "きらきら割引ブティック", "変化と関係", "ratio", "percent-boutique", "割合・百分率", "基準量・比較量・割合の関係を使う。", "何を100%とするかを取り違えない。"),
  curriculumUnit("w5-shape-area", "w5", "小5", "図形面積", "多角形プロット", "図形", "area", "polygon-plot-designer", "三角形・平行四辺形の面積", "長方形へ変形して面積の公式を使う。", "底辺と高さが垂直か確認しない。"),
  // ID は既存の学習記録を守るため保持し、直方体の体積は小5の公開先へ移した。
  curriculumUnit("w4-volume", "w5", "小5", "体積", "ブロック水そう", "図形", "area", "volume-block-aquarium", "体積", "同じ立方体の個数で体積を表す。", "見えているブロックだけを数えない。"),
  curriculumUnit("w5-circle", "w5", "小5", "円周", "円周トラック", "図形", "geometry", "circle-circumference-track", "円周率", "直径と円周の比例関係を使う。", "半径をそのまま円周率に掛けない。"),
  curriculumUnit("w5-congruence", "w5", "小5", "合同", "鏡の図形工房", "図形", "proof", "congruence-mirror-workshop", "合同な図形", "対応する辺・角が等しいことを確かめる。", "向きが違うだけで別の図形にしない。"),
  curriculumUnit("w5-average", "w5", "小5", "平均", "ニュース平均スタジオ", "データ", "chart", "average-newsroom", "平均", "ならして一つ分にする考えを使う。", "最大値と最小値の真ん中を平均にしない。"),

  curriculumUnit("w6-fraction-muldiv", "w6", "小6", "分数×÷", "分数ポーションラボ", "数と計算", "fraction", "fraction-potion-ratio", "分数の乗除", "図と式を往復して分数の乗除を考える。", "割る数と掛ける逆数を取り違えない。"),
  curriculumUnit("w6-ratio", "w6", "小6", "比", "絵の具ミキサー", "変化と関係", "ratio", "ratio-paint-mixer", "比", "二つの量の組を同じ割合で扱う。", "差が同じなら比も同じと思わない。"),
  curriculumUnit("w6-proportion", "w6", "小6", "比例", "そだち温室", "変化と関係", "ratio", "proportional-greenhouse", "比例", "一方が何倍なら他方も何倍かを表で読む。", "足す関係と比例を混同しない。"),
  curriculumUnit("w6-formula", "w6", "小6", "文字式", "ロボット式コントローラー", "変化と関係", "algebra", "formula-robot-controller", "文字と式", "文字に数を入れて関係を簡潔に表す。", "文字を特別な記号として計算から外さない。"),
  curriculumUnit("w6-symmetry", "w6", "小6", "対称", "万華鏡アトリエ", "図形", "geometry", "symmetry-kaleidoscope", "線対称・点対称", "対応する点の位置から対称性を見つける。", "左右に見えるだけで線対称と決めない。"),
  curriculumUnit("w6-scale", "w6", "小6", "拡大縮小", "地図メーカー", "図形", "proof", "scale-map-maker", "拡大図・縮図", "対応する長さの倍率をそろえる。", "縦横で別の倍率を使わない。"),
  curriculumUnit("w6-prism", "w6", "小6", "柱体", "包み紙スタジオ", "図形", "area", "prism-cylinder-packaging", "角柱・円柱の体積", "底面積と高さで体積を考える。", "表面積を体積として使わない。"),
  curriculumUnit("w6-probability", "w6", "小6", "確率", "フェアネスカプセル", "データ", "ratio", "probability-gacha-lab", "場合の数・確率", "起こりやすさを全体に対する場合で比べる。", "好きな色だから出やすいと考えない。"),
  curriculumUnit("w6-data", "w6", "小6", "代表値", "データ調査隊", "データ", "chart", "data-comparison-investigator", "代表値・散らばり", "目的に合う代表値を選ぶ。", "平均だけをいつも使う。"),

  curriculumUnit("w7-integer", "w7", "中1", "正負", "月夜エレベーター", "数と式", "algebra", "integer-elevator", "正の数・負の数", "数直線の向きと距離で加減を考える。", "負の符号を計算記号と混同しない。"),
  curriculumUnit("w7-literal", "w7", "中1", "文字式", "コードタイル", "数と式", "algebra", "literal-code-tiles", "文字式", "数量の関係を文字式で表す。", "係数と文字を別の数として扱わない。"),
  curriculumUnit("w7-equation", "w7", "中1", "方程式", "方程式てんびん", "数と式", "algebra", "equation-balance-forge", "一次方程式", "両辺に同じ操作をする意味を使う。", "片方の辺だけを変形しない。"),
  curriculumUnit("w7-proportional", "w7", "中1", "比例", "スピードラボ", "関数", "ratio", "proportional-speed-lab", "比例・反比例", "表・式・グラフの関係をつなぐ。", "比例のグラフを途中から描かない。"),
  curriculumUnit("w7-coordinate", "w7", "中1", "座標", "座標トレジャー", "関数", "coordinate", "coordinate-treasure-plot", "座標", "xとyの順序で点を表す。", "横と縦の順を逆にしない。"),
  curriculumUnit("w7-geometry", "w7", "中1", "図形", "レーザー角度橋", "図形", "geometry", "angle-chord-laser", "平面図形", "角の性質を図の補助線と結ぶ。", "見た目の角度だけで決めない。"),
  curriculumUnit("w7-solid", "w7", "中1", "空間", "展開図エクスプローラー", "図形", "geometry", "solid-net-explorer", "空間図形", "展開図と立体の面のつながりを考える。", "見えていない面を忘れない。"),
  curriculumUnit("w7-histogram", "w7", "中1", "ヒストグラム", "度数カフェ", "データ", "chart", "histogram-cafe", "資料の活用", "階級と度数を読み、分布を比較する。", "棒の本数だけで人数を決めない。"),

  curriculumUnit("w8-expression", "w8", "中2", "式変形", "式の工房", "数と式", "algebra", "expression-factor-workshop", "式の計算", "共通因数や分配法則で式を整理する。", "項をまたいで係数だけを足さない。"),
  curriculumUnit("w8-system", "w8", "中2", "連立", "二つ道ディスパッチ", "数と式", "algebra", "simultaneous-route-dispatch", "連立方程式", "二つの条件を同時に満たす組を探す。", "片方の式だけの解で止めない。"),
  curriculumUnit("w8-linear", "w8", "中2", "一次関数", "光のレールショー", "関数", "coordinate", "linear-function-lightshow", "一次関数", "変化の割合と切片を表・式・グラフで結ぶ。", "傾きと切片を入れ替えない。"),
  curriculumUnit("w8-graph", "w8", "中2", "グラフ", "ルール作曲台", "関数", "coordinate", "graph-table-composer", "表・式・グラフ", "対応表から規則を見つける。", "一点だけで直線の規則を決めない。"),
  curriculumUnit("w8-proof", "w8", "中2", "証明", "合同カード図書館", "図形", "proof", "congruence-proof-chain", "合同の証明", "根拠を順に並べて結論へつなぐ。", "結論を根拠として使わない。"),
  curriculumUnit("w8-parallel", "w8", "中2", "平行線", "平行角度ブリッジ", "図形", "geometry", "parallel-angle-bridge", "平行線と角", "同位角・錯角を対応させる。", "隣り合う角と同位角を混同しない。"),
  curriculumUnit("w8-probability", "w8", "中2", "確率", "スピナートーナメント", "データ", "ratio", "probability-spinner", "確率", "同様に確からしい場合を数える。", "選んだ順序を重複して数えない。"),
  curriculumUnit("w8-distribution", "w8", "中2", "分布", "データ比較ラボ", "データ", "chart", "distribution-compare-lab", "箱ひげ・分布", "中心と散らばりを両方見て比較する。", "平均だけで分布を判断しない。"),

  curriculumUnit("w9-root", "w9", "中3", "平方根", "ルート音階", "数と式", "root", "square-root-staircase", "平方根", "平方数から平方根を選ぶ。", "正の平方根と負の数を混同しない。"),
  curriculumUnit("w9-quadratic-expression", "w9", "中3", "式", "二次タイル作曲", "数と式", "calculation", "quadratic-expression-tiles", "式の展開・因数分解", "面積図と式の形を対応させる。", "符号の組合せを落とさない。"),
  curriculumUnit("w9-quadratic-equation", "w9", "中3", "二次方程式", "二次ロックソルバー", "数と式", "root", "quadratic-equation-lock", "二次方程式", "積が0になる形や平方根を利用する。", "一方の解だけで終わらない。"),
  curriculumUnit("w9-quadratic-function", "w9", "中3", "二次関数", "放物線ファウンテン", "関数", "coordinate", "quadratic-fountain-trajectory", "y=ax²", "xの変化とyの変化を表・グラフで読む。", "直線の変化として扱わない。"),
  curriculumUnit("w9-similarity", "w9", "中3", "相似", "相似カメラ", "図形", "proof", "similarity-camera-zoom", "相似な図形", "対応する角と辺の比をそろえる。", "対応順をそろえずに比を作らない。"),
  curriculumUnit("w9-circle-angle", "w9", "中3", "円周角", "星座サークル", "図形", "geometry", "circle-angle-constellation", "円周角", "同じ弧に対する角の関係を使う。", "中心角と円周角を同じ大きさにしない。"),
  curriculumUnit("w9-pythagoras", "w9", "中3", "三平方", "レスキュー斜面", "図形", "area", "pythagoras-ramp", "三平方の定理", "直角三角形の三辺を平方で関係付ける。", "斜辺を直角の向かいに取らない。"),
  curriculumUnit("w9-survey", "w9", "中3", "標本", "地図サーベイ橋", "データ", "chart", "sample-survey-mystery", "標本調査", "全体を代表する標本を考える。", "集めやすい人だけを全体とみなさない。"),
  curriculumUnit("w9-inference", "w9", "中3", "推測", "統計ニュースルーム", "データ", "chart", "statistical-inference-newsroom", "統計的な推測", "データの傾向と不確かさを分けて述べる。", "少数の例だけで断定しない。")
]);

// 現在の販売品質として公開するのは、問題バンクで全問を検証できる小6まで。
// 中学範囲は専用エンジン（一次関数・証明・統計など）が完成するまで選択画面に
// 出さない。内容が薄いまま「ある」ように見せないための明示的な品質境界である。
const RELEASE_WORLD_IDS = Object.freeze(["w0", "w1", "w2", "w3", "w4", "w5", "w6"]);
const RELEASE_CURRICULUM_UNITS = Object.freeze(CURRICULUM_UNITS.filter((unit) => RELEASE_WORLD_IDS.includes(unit.worldId)));

// 学習量は「早く終えること」ではなく、その日に集中できる量を本人が選ぶためのもの。
// 小学校問題バンクだけに適用し、幼児向けの音ゲームは安心できる5問固定のままにする。
const STUDY_VOLUMES = Object.freeze({
  short: Object.freeze({ id: "short", count: 5, label: "ちょっと", detail: "5もん" }),
  standard: Object.freeze({ id: "standard", count: 10, label: "たっぷり", detail: "10もん" }),
  long: Object.freeze({ id: "long", count: 15, label: "チャレンジ", detail: "15もん" })
});

// 15問を選んでも同じカードを連打しないための、問題バンクの役割カード。
// 各単元はこの全カードに対して、別の数値・別の文脈を持つ問題を生成する。
const BANK_TEMPLATE_META = Object.freeze([
  { id: "material-hunt", label: "みつける", representation: "具体物", interaction: "素材を見つける", band: "土台" },
  { id: "build-station", label: "つくる", representation: "具体物", interaction: "組み立てる", band: "土台" },
  { id: "picture-read", label: "図をよむ", representation: "図", interaction: "図を読む", band: "土台" },
  { id: "compare-cards", label: "くらべる", representation: "図", interaction: "カードをくらべる", band: "土台" },
  { id: "equation-console", label: "式にする", representation: "式", interaction: "式をつなぐ", band: "土台" },
  { id: "repair-lab", label: "まちがい直し", representation: "式", interaction: "まちがいを直す", band: "定着" },
  { id: "route-choice", label: "道をえらぶ", representation: "表", interaction: "道をえらぶ", band: "定着" },
  { id: "reverse-puzzle", label: "逆から考える", representation: "表", interaction: "逆から考える", band: "定着" },
  { id: "reason-clue", label: "理由カード", representation: "ことば", interaction: "根拠を選ぶ", band: "定着" },
  { id: "story-mission", label: "おたすけ依頼", representation: "生活", interaction: "おたすけする", band: "定着" },
  { id: "estimate-check", label: "よそうと確認", representation: "生活", interaction: "よそうを確かめる", band: "活用" },
  { id: "challenge-lab", label: "ひらめき実験", representation: "図と式", interaction: "実験する", band: "活用" },
  { id: "remix-studio", label: "作戦チェンジ", representation: "図とことば", interaction: "作戦を変える", band: "活用" },
  { id: "skill-check", label: "スキルチェック", representation: "自分のことば", interaction: "答えを確かめる", band: "活用" },
  { id: "garden-finale", label: "フィナーレ", representation: "生活", interaction: "ガーデンに使う", band: "活用" }
]);

// 1回の学習は、答えを当てるカードの列ではなく、小さな仕事を完成させる
// 5拍子の冒険にする。長く遊ぶときも、この順序を繰り返すことで、今どの
// 見方を使っているかを子ども自身がつかみやすくする。
const CPA_PHASES = Object.freeze(["concrete", "visual", "abstract", "transfer", "apply"]);
const CPA_PHASE_LABELS = Object.freeze({
  concrete: "あつめて ためす",
  visual: "えやならびで みる",
  abstract: "しるしや式に する",
  transfer: "べつの作戦で たしかめる",
  apply: "だれかのために つかう"
});

// 同じ5拍でも、役割カードごとに子どもへ見せる行為名は変える。抽象的な
// 学習用語を押し付けず、「今なにをしているか」が一目で分かるようにする。
const CPA_TEMPLATE_STEP_LABELS = Object.freeze({
  "material-hunt": "素材を あつめる",
  "picture-read": "図から みつける",
  "equation-console": "式に つなぐ",
  "compare-cards": "ちがいを たしかめる",
  "build-station": "できあがりを つくる",
  "repair-lab": "まちがいを なおす",
  "route-choice": "道すじを えらぶ",
  "reverse-puzzle": "ゴールから もどる",
  "reason-clue": "手がかりを そろえる",
  "story-mission": "おたすけを とどける",
  "challenge-lab": "ひらめきを 実験する",
  "remix-studio": "作戦を かえながら試す",
  "skill-check": "自分の答えを 確かめる",
  "estimate-check": "予想を くらべる",
  "garden-finale": "ガーデンで 仕上げる"
});

const BANK_TEMPLATE_BY_ID = Object.freeze(Object.fromEntries(BANK_TEMPLATE_META.map((template) => [template.id, template])));

// 各列は5枚とも別の役割カード。土台・定着・活用の選択は残しつつ、同じ
// 学習量でも「具体→図→式→確かめ→生活」のゲーム上の拍が崩れないようにする。
const CPA_TEMPLATE_FLOWS = Object.freeze({
  foundation: Object.freeze(["material-hunt", "picture-read", "equation-console", "compare-cards", "build-station"]),
  practice: Object.freeze(["repair-lab", "route-choice", "reverse-puzzle", "reason-clue", "story-mission"]),
  challenge: Object.freeze(["challenge-lab", "remix-studio", "skill-check", "estimate-check", "garden-finale"])
});

// 15枚の役割カードは、文言だけを替えるためのラベルではなく、盤面の手触りと
// 選択の見せ方まで替える「遊びの型」。同じ算数の本質を、探す・組む・直す・
// 実験するなど別の認知的な入口から扱えるようにする。
const CURRICULUM_MISSION_PLAYS = Object.freeze({
  "material-hunt": Object.freeze({ style: "hunt", icon: "⌕", title: "おたから さがし", cue: "{prop}の中から手がかりを見つけよう。", props: ["きらきら箱", "花びら", "星のポケット", "リボン棚"] }),
  "build-station": Object.freeze({ style: "build", icon: "▦", title: "つくる ステーション", cue: "{prop}を組み立てる気もちで考えよう。", props: ["ブロック", "クッキー", "タイル", "色えんぴつ"] }),
  "picture-read": Object.freeze({ style: "picture", icon: "◉", title: "えを よむ アトリエ", cue: "{prop}をよく見て、数の合図をつかもう。", props: ["ひかる図", "シール帳", "まほうの地図", "おはなしカード"] }),
  "compare-cards": Object.freeze({ style: "compare", icon: "⇄", title: "くらべる カード", cue: "{prop}をならべて、ちがいを見つけよう。", props: ["ふたごカード", "色のビン", "ふうせん", "おやつ皿"] }),
  "equation-console": Object.freeze({ style: "console", icon: "⌁", title: "しきの コンソール", cue: "{prop}のボタンを押す前に、式を声に出してみよう。", props: ["ひらめきキー", "光るレバー", "数字パネル", "まほうのスイッチ"] }),
  "repair-lab": Object.freeze({ style: "repair", icon: "↺", title: "まちがい しゅうり", cue: "{prop}のまちがいを、正しい見方で直そう。", props: ["こわれたロボ", "ずれたラベル", "いたずらメモ", "迷子のピース"] }),
  "route-choice": Object.freeze({ style: "route", icon: "➜", title: "みちえらび", cue: "{prop}までの近道を、根拠といっしょにえらぼう。", props: ["虹のゲート", "お花畑", "おとどけ先", "小さな橋"] }),
  "reverse-puzzle": Object.freeze({ style: "reverse", icon: "↶", title: "ぎゃくから パズル", cue: "{prop}から逆向きにたどって、答えを見つけよう。", props: ["ゴール旗", "宝箱", "完成図", "おやつの箱"] }),
  "reason-clue": Object.freeze({ style: "clue", icon: "✦", title: "りゆうの てがかり", cue: "{prop}の手がかりを一つずつ確かめよう。", props: ["探偵メモ", "きらりの印", "ヒント封筒", "虫めがね"] }),
  "story-mission": Object.freeze({ style: "story", icon: "♥", title: "おたすけ いらい", cue: "{prop}のおねがいを、算数の力でかなえよう。", props: ["おとも", "お花やさん", "小鳥さん", "庭の妖精"] }),
  "estimate-check": Object.freeze({ style: "estimate", icon: "≈", title: "よそうと かくにん", cue: "{prop}で予想してから、ぴったりを確かめよう。", props: ["見通しメーター", "予想シール", "チェック望遠鏡", "くらべる定規"] }),
  "challenge-lab": Object.freeze({ style: "experiment", icon: "⚗", title: "ひらめき じっけん", cue: "{prop}を動かすつもりで、結果をたしかめよう。", props: ["実験ビン", "カラフル試験管", "観察ノート", "水そうモデル"] }),
  "remix-studio": Object.freeze({ style: "remix", icon: "♬", title: "さくせん チェンジ", cue: "{prop}を別の見方にかえて、答えを見つけよう。", props: ["リミックス台", "作戦カード", "色のパレット", "組みかえボード"] }),
  "skill-check": Object.freeze({ style: "check", icon: "✓", title: "スキル チェック", cue: "{prop}で自分の考えを確かめよう。", props: ["ひらめきバッジ", "チェック星", "できたスタンプ", "小さなトロフィー"] }),
  "garden-finale": Object.freeze({ style: "finale", icon: "✿", title: "ガーデン フィナーレ", cue: "{prop}を育てる最後のひと工夫だよ。", props: ["お花の芽", "虹のじょうろ", "木の実", "ガーデン灯"] })
});

// 役割カードごとの見た目だけを数えないため、回答の操作も明示する。
// `inputMethod` / `inputPattern` は実際に子どもが行う入力、
// `presentationRole` は物語上の役割カードとして別に記録する。
const CURRICULUM_INPUT_METHODS = Object.freeze({
  "material-hunt": { pattern: "direct-choice", action: "みつけた！" },
  "build-station": { pattern: "select-confirm", action: "組み立てる" },
  "picture-read": { pattern: "direct-choice", action: "ピンを立てる" },
  "compare-cards": { pattern: "direct-choice", action: "くらべる" },
  "equation-console": { pattern: "keypad", action: "計算する" },
  "repair-lab": { pattern: "select-confirm", action: "直す" },
  "route-choice": { pattern: "select-confirm", action: "この道を進む" },
  "reverse-puzzle": { pattern: "select-confirm", action: "一歩もどる" },
  "reason-clue": { pattern: "clue-confirm", action: "根拠で決める" },
  "story-mission": { pattern: "select-confirm", action: "届ける" },
  "estimate-check": { pattern: "estimate-confirm", action: "答えを確かめる" },
  "challenge-lab": { pattern: "keypad", action: "実験する" },
  "remix-studio": { pattern: "select-confirm", action: "組みかえる" },
  "skill-check": { pattern: "direct-choice", action: "チェックする" },
  "garden-finale": { pattern: "select-confirm", action: "花を咲かせる" }
});

function keypadAnswerText(answer) {
  return String(answer ?? "").replaceAll("−", "-").trim();
}

function canUseCurriculumKeypad(answer) {
  return /^-?\d+(?:\.\d+)?(?:[/:]\d+)?$/.test(keypadAnswerText(answer));
}

function curriculumInputForPlay(play, answer) {
  const configured = CURRICULUM_INPUT_METHODS[play?.id] || CURRICULUM_INPUT_METHODS["material-hunt"];
  // 数字として入力できない答えでも、コンソール役は「カード番号を入れる」
  // という別の手触りを保つ。選択→確定へ静かに落とさない。
  const pattern = configured.pattern === "keypad" && !canUseCurriculumKeypad(answer)
    ? "option-keypad"
    : configured.pattern;
  const answerText = keypadAnswerText(answer);
  const keys = pattern === "keypad"
    ? [...new Set([..."0123456789", ...[...answerText].filter((character) => ".:/-".includes(character))])]
    : pattern === "option-keypad"
      ? ["1", "2", "3", "4"]
    : [];
  return {
    inputMethod: pattern,
    inputPattern: pattern,
    presentationRole: play?.id || "material-hunt",
    inputActionLabel: configured.action,
    keypadKeys: keys
  };
}

const CURRICULUM_ROUND_ACTIONS = Object.freeze({
  place: ["位をみる", "まとまりを置く", "数札を選ぶ", "ちがいを直す", "くらしで使う"],
  calculation: ["材料を分ける", "式を組む", "答えを選ぶ", "途中を確かめる", "依頼をかなえる"],
  array: ["ならびを作る", "行と列をよむ", "式を選ぶ", "別の見方をする", "お店で使う"],
  fraction: ["等分する", "色をぬる", "式を選ぶ", "大きさをくらべる", "レシピに使う"],
  decimal: ["目盛りをよむ", "小数点をそろえる", "計算する", "答えを比べる", "ドリンクを作る"],
  measure: ["基準を選ぶ", "目盛りをよむ", "数をそろえる", "確かめる", "おでかけで使う"],
  geometry: ["形をみる", "手がかりを探す", "角や辺を選ぶ", "重ねて確かめる", "建物を直す"],
  area: ["タイルを置く", "たてよこをよむ", "式を選ぶ", "大きさを確かめる", "庭を作る"],
  chart: ["データを集める", "表をよむ", "グラフを比べる", "理由を選ぶ", "ニュースにする"],
  ratio: ["一組をみる", "そろえて比べる", "割合を選ぶ", "別の組を作る", "レシピに使う"],
  algebra: ["記号をよむ", "両側をそろえる", "値を選ぶ", "式で確かめる", "装置を動かす"],
  coordinate: ["座標をよむ", "点を探す", "表をつなぐ", "規則を選ぶ", "空の道を作る"],
  proof: ["条件を読む", "対応を探す", "根拠を並べる", "結論を選ぶ", "設計を完成"],
  root: ["正方形をみる", "平方根を選ぶ", "式を確かめる", "もう一つを探す", "扉を開く"]
});

function curriculumGameFor(unit) {
  const actions = CURRICULUM_ROUND_ACTIONS[unit.renderer] || CURRICULUM_ROUND_ACTIONS.calculation;
  return Object.freeze({
    id: unit.id,
    gameId: `curriculum:${unit.id}`,
    title: unit.name,
    goal: `${unit.theme}を、5つの見方で自分の道具にしよう。`,
    board: unit.board,
    scene: unit.board,
    sprite: unit.visualKit,
    materialRole: unit.visualKit,
    mechanic: unit.mechanic,
    playPattern: unit.mechanic,
    visualKit: unit.visualKit,
    boardTemplate: unit.renderer,
    rule: "急がなくて大丈夫。図・式・ことばを行き来して、もう一度たしかめられるよ。",
    mathematicalInvariant: unit.objective,
    proofCue: unit.misconception,
    successEffect: "見方がひとつ、ふえたよ！",
    reward: "ひらめきゲット！",
    effect: "crystal",
    rounds: Object.freeze(actions.map((action, index) => Object.freeze({
      id: `${unit.id}-round-${index + 1}`,
      missionIndex: index,
      action,
      title: `${action}・${unit.board}`,
      representation: ["具体物", "図", "式", "確かめ", "生活"][index],
      materialRole: `${unit.visualKit}-${index}`,
      finale: index === actions.length - 1
    }))),
    signature: `${unit.id}|${unit.mechanic}|${unit.renderer}|${unit.theme}`
  });
}

function buildCurriculumStages(units, startOrder) {
  return units.map((unit, index) => ({
    id: unit.id,
    worldId: unit.worldId,
    grade: unit.grade,
    order: startOrder + index,
    areaId: unit.id,
    areaName: unit.name,
    shortName: unit.shortName,
    mode: "curriculum",
    level: 1,
    name: unit.name,
    theme: unit.theme,
    curriculum: unit,
    game: curriculumGameFor(unit)
  }));
}

const CURRICULUM_STAGES = buildCurriculumStages(RELEASE_CURRICULUM_UNITS, W0_STAGES.length + W1_STAGES.length + 1);
const CURRICULUM_AREAS = RELEASE_CURRICULUM_UNITS.map((unit) => ({
  id: unit.id, worldId: unit.worldId, grade: unit.grade, name: unit.name, shortName: unit.shortName,
  total: 1, mode: "curriculum", theme: unit.theme, curriculum: unit
}));
const CURRICULUM_STAGE_BLUEPRINTS = Object.freeze(Object.fromEntries(CURRICULUM_STAGES.map((stage) => [stage.id, stage.game])));
const W1_ALL_STAGES = [...W1_STAGES, ...CURRICULUM_STAGES.filter((stage) => stage.worldId === "w1")];
const W1_ALL_AREAS = [...W1_AREAS, ...CURRICULUM_AREAS.filter((area) => area.worldId === "w1")];
const ALL_STAGES = [...W0_STAGES, ...W1_ALL_STAGES, ...CURRICULUM_STAGES.filter((stage) => stage.worldId !== "w1")];
const ALL_AREAS = [...W0_AREAS.map((area) => ({ ...area, worldId: "w0", grade: "5-6さい" })), ...W1_ALL_AREAS, ...CURRICULUM_AREAS.filter((area) => area.worldId !== "w1")];
const WORLDS = [
  { id: "w0", name: "W0 はじまりのにわ", target: "5-6さい", sprite: "tree", stages: W0_STAGES, areas: W0_AREAS.map((area) => ({ ...area, worldId: "w0", grade: "5-6さい" })), free: true },
  ...Object.entries(CURRICULUM_WORLD_INFO).filter(([id]) => RELEASE_WORLD_IDS.includes(id)).map(([id, info]) => ({
    id, name: info.name, target: info.target, sprite: info.sprite,
    stages: id === "w1" ? W1_ALL_STAGES : CURRICULUM_STAGES.filter((stage) => stage.worldId === id),
    areas: id === "w1" ? W1_ALL_AREAS : CURRICULUM_AREAS.filter((area) => area.worldId === id),
    free: true
  }))
];

const SHAPES = [
  { id: "circle", name: "まる", color: "#bfe5ff" },
  { id: "square", name: "しかく", color: "#bdeedb" },
  { id: "triangle", name: "さんかく", color: "#ffb6d0" },
  { id: "star", name: "ほし", color: "#d49a31" },
  { id: "diamond", name: "ひしがた", color: "#d9cbff" }
];

// avatar_parts_v3: 1024×2006 フルキャンバス整列レイヤー（素体に (0,0) 重ねで合う）
const AV_FACE_V3_DIR = "./assets/generated/avatar_parts_v3/final";
const avFaceV3 = (file) => `${AV_FACE_V3_DIR}/${file}.png`;
// 足元は必ず「素足 → 足に沿う短い靴下 → 前景だけの靴」の別レイヤー。
const AV_FOOTWEAR_V3_DIR = "./assets/generated/avatar_footwear_v3/final";
const avFootwearV3 = (file) => `${AV_FOOTWEAR_V3_DIR}/${file}.png`;
// 顔幅を髪の開口に合わせ、首・肩・足のアンカーを維持した素体。
const AV_BASE_DIR = "./assets/generated/avatar_base_facefit_v3/final";
const avBase = (file) => `${AV_BASE_DIR}/${file}.png`;

const AVATAR_V2_CATALOG = {
  hair: [
    { id: "hair_v2_bob_pink", file: "hair_bob_pink", name: "ピンクボブ", color: "#f4a0c8" },
    { id: "hair_v2_long", file: "hair_long", name: "ロングヘア", color: "#e8c07a" },
    { id: "hair_v2_twin", file: "hair_twin", name: "ツインテール", color: "#c9a0e8" },
    { id: "hair_v2_ponytail", file: "hair_ponytail", name: "ポニーテール", color: "#c48a5a" },
    { id: "hair_v2_buns", file: "hair_buns", name: "おだんごヘア", color: "#9ed9c4" },
    { id: "hair_v2_braids", file: "hair_braids", name: "みつあみ", color: "#f0b090" },
    { id: "hair_v2_wavy", file: "hair_wavy", name: "ウェーブヘア", color: "#a8b8f0" },
    { id: "hair_v2_short", file: "hair_short", name: "ショートヘア", color: "#6b4a8a" },
    { id: "hair_v2_hime", file: "hair_hime", name: "ひめカット", color: "#8a4a7a" },
    { id: "hair_v2_bobcut", file: "hair_bobcut", name: "ボブカット", color: "#d4a060" }
  ],
  eyes: [
    { id: "eyes_open", file: "face_eyes_open", name: "ぱっちりめ", color: "#5a3a28" },
    { id: "eyes_wink", file: "face_eyes_wink", name: "ウインク", color: "#5a3a28" },
    { id: "eyes_happy", file: "face_eyes_happy", name: "にっこりめ", color: "#5a3a28" },
    { id: "eyes_sparkle", file: "face_eyes_sparkle", name: "きらきらめ", color: "#5a3a28" },
    { id: "eyes_teary", file: "face_eyes_teary", name: "うるうるめ", color: "#5a3a28" },
    { id: "eyes_surprised", file: "face_eyes_surprised", name: "びっくりめ", color: "#5a3a28" },
    { id: "eyes_sleepy", file: "face_eyes_sleepy", name: "ねむいめ", color: "#5a3a28" }
  ],
  brows: [
    { id: "brows_normal", file: "face_brow_normal", name: "ふつうまゆ", color: "#4a3020" },
    { id: "brows_up", file: "face_brow_up", name: "びっくりまゆ", color: "#4a3020" },
    { id: "brows_worried", file: "face_brow_worried", name: "こまりまゆ", color: "#4a3020" },
    { id: "brows_soft", file: "face_brow_soft", name: "やさしいまゆ", color: "#4a3020" }
  ],
  mouth: [
    { id: "mouth_smile", file: "face_mouth_smile", name: "にぱっ口", color: "#d07080" },
    { id: "mouth_grin", file: "face_mouth_grin", name: "にこ口", color: "#d07080" },
    { id: "mouth_o", file: "face_mouth_o", name: "お口", color: "#d07080" },
    { id: "mouth_muhu", file: "face_mouth_muhu", name: "むふ口", color: "#d07080" },
    { id: "mouth_worried", file: "face_mouth_worried", name: "こまり口", color: "#d07080" },
    { id: "mouth_aah", file: "face_mouth_aah", name: "あーん口", color: "#d07080" }
  ],
  blush: [
    { id: "blush_normal", file: "face_blush_normal", name: "ふつうほっぺ", color: "#ffb0c0" },
    { id: "blush_lines", file: "face_blush_lines", name: "しゃくれほっぺ", color: "#ffb0c0" },
    { id: "blush_heart", file: "face_blush_heart", name: "ハートほっぺ", color: "#ff90a8" },
    { id: "blush_star", file: "face_blush_star", name: "ほしほっぺ", color: "#ffc070" }
  ],
  shoes: [
    { id: "shoes_v2_pink", sprite: avFootwearV3("shoes_pink_maryjane_v3"), name: "ピンクストラップ", color: "#f4a0c0" },
    { id: "shoes_v2_purple", sprite: avFootwearV3("shoes_purple_star_v3"), name: "ほしのむらさきくつ", color: "#b99af2" }
  ],
  socks: [
    { id: "socks_cream", sprite: avFootwearV3("socks_cream_ankle_v3"), name: "クリームのあんくるソックス", color: "#f4e8c8" },
    { id: "socks_heart", sprite: avFootwearV3("socks_heart_ankle_v3"), name: "ハートのあんくるソックス", color: "#ff9ab0" }
  ]
};

function buildAvatarV2Items() {
  const items = [];
  for (const [slot, list] of Object.entries(AVATAR_V2_CATALOG)) {
    for (const entry of list) {
      items.push({
        id: entry.id,
        slot,
        name: entry.name,
        color: entry.color,
        rarity: "きせかえ",
        source: "avatar_v2",
        sprite: entry.sprite || avFaceV3(entry.file),
        fullCanvas: true
      });
    }
  }
  return items;
}

const AVATAR_V2_ITEMS = buildAvatarV2Items();

// 最初の5分で「選んで、着て、また組み替える」が成立する量を渡す。
// 一択のきせかえは「もらえていない」感だけを残すため、顔・髪・服には
// 少なくとも3通りの入口を用意する。既存の実レイヤーだけを使う。
const STARTER_ITEMS = [
  { id: "hair_v2_bob_pink", slot: "hair", name: "ピンクボブ", color: "#f4a0c8", rarity: "はじめ", source: "start" },
  { id: "hair_v2_long", slot: "hair", name: "さらさらロング", color: "#e8c07a", rarity: "はじめ", source: "start" },
  { id: "hair_v2_twin", slot: "hair", name: "ふたつむすび", color: "#c9a0e8", rarity: "はじめ", source: "start" },
  { id: "eyes_open", slot: "eyes", name: "ぱっちりめ", color: "#5a3a28", rarity: "はじめ", source: "start" },
  { id: "eyes_wink", slot: "eyes", name: "ウインク", color: "#5a3a28", rarity: "はじめ", source: "start" },
  { id: "eyes_happy", slot: "eyes", name: "にっこりめ", color: "#5a3a28", rarity: "はじめ", source: "start" },
  { id: "brows_normal", slot: "brows", name: "ふつうまゆ", color: "#4a3020", rarity: "はじめ", source: "start" },
  { id: "brows_up", slot: "brows", name: "びっくりまゆ", color: "#4a3020", rarity: "はじめ", source: "start" },
  { id: "brows_soft", slot: "brows", name: "やさしいまゆ", color: "#4a3020", rarity: "はじめ", source: "start" },
  { id: "mouth_smile", slot: "mouth", name: "にぱっ口", color: "#d07080", rarity: "はじめ", source: "start" },
  { id: "mouth_grin", slot: "mouth", name: "にこ口", color: "#d07080", rarity: "はじめ", source: "start" },
  { id: "mouth_muhu", slot: "mouth", name: "むふ口", color: "#d07080", rarity: "はじめ", source: "start" },
  { id: "blush_normal", slot: "blush", name: "ふつうほっぺ", color: "#ffb0c0", rarity: "はじめ", source: "start" },
  { id: "blush_heart", slot: "blush", name: "ハートほっぺ", color: "#ff90a8", rarity: "はじめ", source: "start" },
  { id: "blush_star", slot: "blush", name: "ほしほっぺ", color: "#ffc070", rarity: "はじめ", source: "start" },
  { id: "socks_cream", slot: "socks", name: "クリームくつした", color: "#f4e8c8", rarity: "はじめ", source: "start" },
  { id: "socks_heart", slot: "socks", name: "ハートくつした", color: "#ff9ab0", rarity: "はじめ", source: "start" },
  { id: "shoes_v2_pink", slot: "shoes", name: "ピンクくつ", color: "#f4a0c0", rarity: "はじめ", source: "start" },
  { id: "shoes_v2_purple", slot: "shoes", name: "ほしのむらさきくつ", color: "#b99af2", rarity: "はじめ", source: "start" },
  { id: "head_ribbon_start", slot: "head", name: "はじめのリボン", color: "#ff8d81", rarity: "はじめ", source: "start" },
  { id: "head_count_crown", slot: "head", name: "かずのクラウン", color: "#ffe17c", rarity: "はじめ", source: "start" },
  { id: "head_more_ribbon", slot: "head", name: "おおいリボン", color: "#ffb6d0", rarity: "はじめ", source: "start" },
  { id: "top_cotton", slot: "top", name: "ふんわりブラウス", color: "#fff4df", rarity: "はじめ", source: "start" },
  { id: "top_number_cape", slot: "top", name: "すうじケープ", color: "#cfe7ff", rarity: "はじめ", source: "start" },
  { id: "top_big_small", slot: "top", name: "おおきさカーデ", color: "#bdeedb", rarity: "はじめ", source: "start" },
  { id: "bottom_mint", slot: "bottom", name: "ミントショートパンツ", color: "#87d5bd", rarity: "はじめ", source: "start" },
  { id: "bottom_balance_skirt", slot: "bottom", name: "くらべっこスカート", color: "#ffd2a7", rarity: "はじめ", source: "start" },
  { id: "bottom_scale_frill", slot: "bottom", name: "ものさしフリル", color: "#ffe9a9", rarity: "はじめ", source: "start" },
  { id: "accessory_seed", slot: "accessory", name: "ちいさなほしピン", color: "#d49a31", rarity: "はじめ", source: "start" },
  { id: "accessory_scale_pin", slot: "accessory", name: "くらべるピン", color: "#86c6a7", rarity: "はじめ", source: "start" },
  { id: "accessory_circle_charm", slot: "accessory", name: "まるチャーム", color: "#7fc8e8", rarity: "はじめ", source: "start" },
  { id: "bag_count_pouch", slot: "bag", name: "かずのポーチ", color: "#bfe5ff", rarity: "はじめ", source: "start" },
  { id: "bag_shape_case", slot: "bag", name: "さんかくバッグ", color: "#ffb6d0", rarity: "はじめ", source: "start" },
  { id: "bag_flower_basket", slot: "bag", name: "おはなバスケット", color: "#d9cbff", rarity: "はじめ", source: "start" }
];

const LEARN_REWARD_ITEMS = [
  { id: "head_count_crown", slot: "head", name: "かずのクラウン", color: "#ffe17c", rarity: "きらきら", source: "learn", area: "count" },
  { id: "dress_apple_apron", slot: "dress", name: "りんごエプロン", color: "#ff9a8f", rarity: "ふわふわ", source: "learn", area: "count" },
  { id: "bag_count_pouch", slot: "bag", name: "かずのポーチ", color: "#bfe5ff", rarity: "ふわふわ", source: "learn", area: "count" },
  { id: "top_number_cape", slot: "top", name: "すうじケープ", color: "#cfe7ff", rarity: "つやつや", source: "learn", area: "count" },
  { id: "head_more_ribbon", slot: "head", name: "おおいリボン", color: "#ffb6d0", rarity: "ふわふわ", source: "learn", area: "compare" },
  { id: "bottom_balance_skirt", slot: "bottom", name: "くらべっこスカート", color: "#ffd2a7", rarity: "つやつや", source: "learn", area: "compare" },
  { id: "accessory_scale_pin", slot: "accessory", name: "くらべるピン", color: "#86c6a7", rarity: "ふわふわ", source: "learn", area: "compare" },
  { id: "shoes_pair_step", slot: "shoes", name: "ならべるくつ", color: "#c6b7ff", rarity: "ふわふわ", source: "learn", area: "compare" },
  { id: "head_shape_clip", slot: "head", name: "かたちクリップ", color: "#8fd4ff", rarity: "ふわふわ", source: "learn", area: "shape" },
  { id: "dress_shape_pastel", slot: "dress", name: "かたちワンピ", color: "#d9cbff", rarity: "つやつや", source: "learn", area: "shape" },
  { id: "accessory_circle_charm", slot: "accessory", name: "まるチャーム", color: "#7fc8e8", rarity: "ふわふわ", source: "learn", area: "shape" },
  { id: "bag_shape_case", slot: "bag", name: "さんかくバッグ", color: "#ffb6d0", rarity: "つやつや", source: "learn", area: "shape" },
  { id: "top_big_small", slot: "top", name: "おおきさカーデ", color: "#bdeedb", rarity: "ふわふわ", source: "learn", area: "size" },
  { id: "bottom_scale_frill", slot: "bottom", name: "ものさしフリル", color: "#ffe9a9", rarity: "つやつや", source: "learn", area: "size" },
  { id: "head_cloud_barrette", slot: "head", name: "くもバレッタ", color: "#bfe5ff", rarity: "ふわふわ", source: "learn", area: "size" },
  { id: "shoes_size_spark", slot: "shoes", name: "ぴったりシューズ", color: "#ffcfde", rarity: "きらきら", source: "learn", area: "size" },
  { id: "head_order_flower", slot: "head", name: "じゅんばんのおはな", color: "#ff8d81", rarity: "ふわふわ", source: "learn", area: "order" },
  { id: "dress_order_lane", slot: "dress", name: "ならびみちドレス", color: "#bdeedb", rarity: "つやつや", source: "learn", area: "order" },
  { id: "accessory_first_medal", slot: "accessory", name: "いちばんメダル", color: "#d49a31", rarity: "きらきら", source: "learn", area: "order" },
  { id: "bag_flower_basket", slot: "bag", name: "おはなバスケット", color: "#d9cbff", rarity: "ふわふわ", source: "learn", area: "order" },
  { id: "head_pattern_bow", slot: "head", name: "もようリボン", color: "#c48de8", rarity: "つやつや", source: "learn", area: "pattern" },
  { id: "dress_pattern_party", slot: "dress", name: "くりかえしドレス", color: "#ffcf7c", rarity: "きらきら", source: "learn", area: "pattern" },
  { id: "accessory_pattern_gem", slot: "accessory", name: "もようジュエル", color: "#5fc3b0", rarity: "きらきら", source: "learn", area: "pattern" },
  { id: "shoes_pattern_step", slot: "shoes", name: "リズムステップ", color: "#bfe5ff", rarity: "つやつや", source: "learn", area: "pattern" }
];

const SHOP_ITEMS = [
  { id: "hair_v2_wavy", slot: "hair", name: "ウェーブヘア", color: "#a8b8f0", rarity: "ふわふわ", source: "shop", price: 6 },
  { id: "hair_v2_buns", slot: "hair", name: "おだんごヘア", color: "#9ed9c4", rarity: "ふわふわ", source: "shop", price: 9 },
  { id: "head_macaron_hat", slot: "head", name: "マカロンぼうし", color: "#f2b7d2", rarity: "つやつや", source: "shop", price: 9 },
  { id: "dress_cookie", slot: "dress", name: "クッキーワンピ", color: "#d8a66b", rarity: "つやつや", source: "shop", price: 12 },
  { id: "bag_star_satchel", slot: "bag", name: "ほしのバッグ", color: "#8fb9ff", rarity: "きらきら", source: "shop", price: 12 },
  { id: "eyes_sparkle", slot: "eyes", name: "きらきらめ", color: "#5a3a28", rarity: "つやつや", source: "shop", price: 9 },
  { id: "mouth_o", slot: "mouth", name: "びっくりおくち", color: "#d07080", rarity: "きらきら", source: "shop", price: 6 },
  { id: "blush_lines", slot: "blush", name: "てれほっぺ", color: "#ffb0c0", rarity: "きらきら", source: "shop", price: 6 }
];

// 初期コーデ以外は、ステージのごほうびで少しずつ増える。
// お店限定品はここから外し、欲しいものを選んで交換できる余白を残す。
const STARTER_ITEM_IDS = new Set(STARTER_ITEMS.map((item) => item.id));
const SHOP_ITEM_IDS = new Set(SHOP_ITEMS.map((item) => item.id));
const AVATAR_PROGRESS_ITEMS = AVATAR_V2_ITEMS.filter(
  (item) => !STARTER_ITEM_IDS.has(item.id) && !SHOP_ITEM_IDS.has(item.id)
);

// v2カタログ＋スターター／学習／ショップをマージ（同一 id は先勝ち）
const ITEM_DEFS = (() => {
  const map = new Map();
  for (const item of [...AVATAR_V2_ITEMS, ...STARTER_ITEMS, ...LEARN_REWARD_ITEMS, ...SHOP_ITEMS]) {
    if (!map.has(item.id)) map.set(item.id, { ...item });
    else Object.assign(map.get(item.id), item);
  }
  return [...map.values()];
})();

// 着せ替えレイヤー：顔に合う新素体・顔/髪/靴/靴下はフルキャンバス。
// 旧来の部分素材は「アイテム名 → 実際の絵」を明示する。配列順で流用すると、
// たとえば「ほしピン」が大きなステッキになるような誤配当が起きるため。
const AV_BODY = avBase("base_facefit_v3");
const s3 = (cat, n) => `./assets/sprites3/${cat}/${String(n).padStart(2, "0")}.png`;

const LEGACY_AVATAR_LAYERS = Object.freeze({
  head_ribbon_start: { sprite: s3("acc", 24), ratio: "166 / 109", width: "53%" },
  head_count_crown: { sprite: s3("acc", 26), ratio: "154 / 100", width: "49%" },
  head_more_ribbon: { sprite: s3("acc", 27), ratio: "126 / 110", width: "40%" },
  head_shape_clip: { sprite: s3("acc", 28), ratio: "152 / 108", width: "48%" },
  head_cloud_barrette: { sprite: s3("acc", 25), ratio: "152 / 133", width: "48%" },
  head_order_flower: { sprite: s3("acc", 28), ratio: "152 / 108", width: "48%" },
  head_pattern_bow: { sprite: s3("acc", 27), ratio: "126 / 110", width: "40%" },
  head_macaron_hat: { sprite: s3("acc", 25), ratio: "152 / 133", width: "48%" },
  top_cotton: { sprite: s3("cloth", 1), ratio: "235 / 145", width: "75%" },
  top_number_cape: { sprite: s3("cloth", 4), ratio: "227 / 149", width: "72%" },
  top_big_small: { sprite: s3("cloth", 5), ratio: "237 / 143", width: "75%" },
  bottom_mint: { sprite: s3("cloth", 13), ratio: "198 / 141", width: "63%" },
  bottom_balance_skirt: { sprite: s3("cloth", 8), ratio: "220 / 155", width: "70%" },
  bottom_scale_frill: { sprite: s3("cloth", 9), ratio: "218 / 150", width: "69%" },
  dress_apple_apron: { sprite: s3("cloth", 14), ratio: "239 / 245", width: "76%" },
  dress_shape_pastel: { sprite: s3("cloth", 15), ratio: "244 / 245", width: "78%" },
  dress_order_lane: { sprite: s3("cloth", 17), ratio: "243 / 246", width: "77%" },
  dress_pattern_party: { sprite: s3("cloth", 16), ratio: "236 / 244", width: "75%" },
  dress_cookie: { sprite: s3("cloth", 18), ratio: "250 / 248", width: "80%" },
  bag_count_pouch: { sprite: s3("acc", 19), ratio: "140 / 180" },
  bag_shape_case: { sprite: s3("acc", 20), ratio: "144 / 190" },
  bag_flower_basket: { sprite: s3("acc", 21), ratio: "162 / 178" },
  bag_star_satchel: { sprite: s3("acc", 22), ratio: "127 / 184" },
  shoes_pair_step: { sprite: avFootwearV3("shoes_purple_star_v3") },
  shoes_size_spark: { sprite: avFootwearV3("shoes_pink_maryjane_v3") },
  shoes_pattern_step: { sprite: avFootwearV3("shoes_purple_star_v3") }
});

// ピンは髪のそばに付ける小さな記号として描く。手持ちの杖やぬいぐるみを
// 胸元に縮めて置かないので、名称と見た目が一目で一致し、バッグとも重ならない。
const AVATAR_ACCESSORY_BADGES = Object.freeze({
  accessory_seed: { symbol: "★", tone: "sun", label: "ほしピン" },
  accessory_scale_pin: { symbol: "↔", tone: "mint", label: "くらべるピン" },
  accessory_circle_charm: { symbol: "●", tone: "sky", label: "まるチャーム" },
  accessory_first_medal: { symbol: "1", tone: "berry", label: "いちばんメダル" },
  accessory_pattern_gem: { symbol: "◆", tone: "violet", label: "もようジュエル" }
});

const ITEM_SPRITE = Object.fromEntries(
  ITEM_DEFS
    .map((item) => {
      const sprite = item.sprite || LEGACY_AVATAR_LAYERS[item.id]?.sprite;
      return sprite ? [item.id, sprite] : null;
    })
    .filter(Boolean)
);
// アバター合成もワードローブと同じ画像を使用
const ITEM_AVLAYER = ITEM_SPRITE;

const FACE_SLOTS = ["eyes", "brows", "mouth", "blush"];
const DRESS_SLOTS = ["hair", "eyes", "brows", "mouth", "blush", "head", "top", "bottom", "dress", "socks", "shoes", "accessory", "bag"];
const DRESS_TAB_GROUPS = [
  { id: "face", label: "かお", slots: ["eyes", "brows", "mouth", "blush"] },
  { id: "hair", label: "かみ", slots: ["hair", "head"] },
  { id: "clothes", label: "ふく", slots: ["top", "bottom", "dress"] },
  { id: "feet", label: "あし", slots: ["socks", "shoes"] },
  { id: "acc", label: "アクセ", slots: ["accessory", "bag"] }
];

const STICKER_DEFS = [
  { id: "stk_flower_count", name: "かずのおはな", sprite: "stickerFlower", area: "count" },
  { id: "stk_apple_smile", name: "りんごスマイル", sprite: "apple", area: "count" },
  { id: "stk_heart_compare", name: "くらべるハート", sprite: "stickerHeart", area: "compare" },
  { id: "stk_shape_cloud", name: "かたちくも", sprite: "stickerCloud", area: "shape" },
  { id: "stk_order_macaron", name: "じゅんばんマカロン", sprite: "stickerMacaron", area: "order" },
  { id: "stk_pattern_star", name: "もようスター", sprite: "stickerStar", area: "pattern" },
  { id: "stk_number_100", name: "100までカード", sprite: "tenFrame", area: "w1-count100" },
  { id: "stk_bridge_add", name: "はしわたし", sprite: "bridge", area: "w1-add" },
  { id: "stk_clock_half", name: "とけいのシール", sprite: "clock", area: "w1-clock" },
  { id: "stk_ribbon_length", name: "リボンものさし", sprite: "ruler", area: "w1-length" }
];

const VISIT_ISLANDS = [
  { id: "mint-ribbon-07", name: "みんとリボン07", theme: "おはなのにわ", hearts: 128 },
  { id: "peach-star-12", name: "ももいろスター12", theme: "クッキーのこみち", hearts: 96 },
  { id: "sky-candy-31", name: "そらキャンディ31", theme: "みずいろガーデン", hearts: 84 }
];

let state = loadState();
let view = {
  screen: "island",
  world: "w0",
  active: null,
  result: null,
  helpPickerOpen: false,
  pausedHelps: {},
  selected: new Set(),
  sequence: [],
  placement: null,
  pairLinks: [],
  pairFirst: null,
  routeCursor: null,
  routeNote: "",
  patternSlots: [],
  builder: { tens: null, ones: null },
  curriculumInput: { selectedValue: null, typed: "", clueOpen: false, estimate: null },
  clockDraft: { hour: 12, minute: 0 },
  soundGame: null,
  feedback: null,
  hintIndex: -1,
  fractionHintClosed: false,
  dressTab: "face",
  atelierPreviewId: null,
  legacyClosetOpen: false,
  shopPreviewItemId: null,
  decoSelectedId: null,
  petMotion: null,
  gardenEditing: false,
  gardenTool: "objects",
  gardenSelectedId: "home",
  gardenSelectedFloor: "grass",
  gardenCursor: { x: 1, y: 1 },
  gardenMessage: "",
  gardenZoom: false,
  gardenScrollPositions: {},
  parentVerified: false,
  parentChallenge: null,
  // 画面をまたぐ移動では先頭から見せ、同じ画面内の試着・回答では
  // いま見ている場所を保つための、一回だけ使うスクロール指示。
  resetScreenScroll: false
};

const NYANLUNA_VOICE = "nyanluna";
// Frozen identity from work/voices/voice-lock.json; the old English voice slot
// no longer exists. Keep the UI identity stable and synthesize from this WAV.
const NYANLUNA_REF_WAV = "/Users/yuki/ちびルナネコもち/work/voices/にゃんるな.wav";
const NYANLUNA_TTS_URL = "http://127.0.0.1:8765/tts";
const NYANLUNA_PREBAKED_WAVS = Object.freeze({
  "あいた ひとマスに、ぴったりのものを おこう おまもりのならびの くりかえす まとまりを つなげてね。": "assets/voice/nyanluna/ef4af63bc13bb3bc.wav",
  "あいた ふたマスを、じゅんに うめよう フルーツのならびの くりかえす まとまりを つなげてね。": "assets/voice/nyanluna/20c9bc586a1d5ffe.wav",
  "いちごは いくつ？ かぞえて、すうじカードをえらんでね。": "assets/voice/nyanluna/ffc259c36263543e.wav",
  "いちごを 1こ えらぼう ひとつずつ しるしをつけながら あつめよう。": "assets/voice/nyanluna/0db3063c89eda9e1.wav",
  "いちごを 2こ えらぼう ひとつずつ しるしをつけながら あつめよう。": "assets/voice/nyanluna/eff094a254867f39.wav",
  "いちごを 3こ えらぼう ひとつずつ しるしをつけながら あつめよう。": "assets/voice/nyanluna/f9c6f018612c6437.wav",
  "いちばん おおきい きらきらストーンはどれ？ おなじものの大きさをくらべてね。": "assets/voice/nyanluna/099b39a3f7b6e567.wav",
  "おおい ほうを えらぼう 左をえらんでから、右のなかまとむすんでね。": "assets/voice/nyanluna/cb971712d66b8772.wav",
  "おおい ほうを えらぼう 左右をくらべて、ぴったりのほうをえらぼう。": "assets/voice/nyanluna/08124025d30a2643.wav",
  "おなじなら「おなじ」をえらぼう 左をえらんでから、右のなかまとむすんでね。": "assets/voice/nyanluna/b7b1ae8f5492cf36.wav",
  "おなじなら「おなじ」をえらぼう 左右をくらべて、ぴったりのほうをえらぼう。": "assets/voice/nyanluna/e9ee5ba27be8b472.wav",
  "ケーキを ちいさい じゅんに ならべよう タップした じゅんに、おさらにのるよ。": "assets/voice/nyanluna/e48d551b24a01cec.wav",
  "さくらんぼを 1こ えらぼう ひとつずつ しるしをつけながら あつめよう。": "assets/voice/nyanluna/e6ea15126d8394de.wav",
  "しかくを さがそう おなじかたちをタップしてね。": "assets/voice/nyanluna/4efbb91a33b56a3f.wav",
  "すくない ほうを えらぼう 左をえらんでから、右のなかまとむすんでね。": "assets/voice/nyanluna/e49df4fb7aeb5ede.wav",
  "すくない ほうを えらぼう 左右をくらべて、ぴったりのほうをえらぼう。": "assets/voice/nyanluna/482061ffb73f5482.wav",
  "ひだりから 1ばんめの そらいろのおはなはどれ？ スタートから、ひとつずつ足あとを進めよう。": "assets/voice/nyanluna/b3611ecabedb357b.wav",
  "ひだりから 1ばんめの ピンクのおはなはどれ？ はじまりのほうから、ひとつずつかぞえよう。": "assets/voice/nyanluna/497dd69878384513.wav",
  "まんなかに ぴったりの しるしを おこう 大きい口は、たくさんあるほうをむくよ。": "assets/voice/nyanluna/60a649f47c70fc87.wav",
  "みかんを 3こ、トレーへ はこぼう ひとつずつ席に入れてから、「できた」をおしてね。": "assets/voice/nyanluna/634d382ca797e1a9.wav",
  "みかんを 9こ、トレーへ はこぼう ひとつずつ席に入れてから、「できた」をおしてね。": "assets/voice/nyanluna/6e5a792ce65e6cc5.wav",
  "みぎから 4ばんめの そらいろのおはなはどれ？ スタートから、ひとつずつ足あとを進めよう。": "assets/voice/nyanluna/7afb617d32537303.wav",
  "みぎから 5ばんめの そらいろのおはなはどれ？ はじまりのほうから、ひとつずつかぞえよう。": "assets/voice/nyanluna/9fe6efa9ac40834e.wav",
  "りんごを 2こ、トレーへ はこぼう ひとつずつ席に入れてから、「できた」をおしてね。": "assets/voice/nyanluna/b037704abb544fa4.wav",
  "りんごを 3こ えらぼう えらんだら「できた」をおしてね。": "assets/voice/nyanluna/f1398bb045510816.wav",
  "りんごを 5こ、トレーへ はこぼう ひとつずつ席に入れてから、「できた」をおしてね。": "assets/voice/nyanluna/fe3c191eed1d80ef.wav",
  "りんごを 8こ、トレーへ はこぼう ひとつずつ席に入れてから、「できた」をおしてね。": "assets/voice/nyanluna/c593034ddb28e273.wav"
});
const nyanlunaObjectUrls = new Map();
let questionSpeechAudio = null;
let questionSpeechToken = 0;

let audioContext = null;
// 日次カードは島を離れても、その日の約束を忘れない。画面のホストは
// 描き直されるため、コントローラーだけを残して島へ戻ったときに付け替える。
let dailyGrowth = null;
let dailyGrowthHost = null;
let activeDecoDrag = null;
let activePlayDrag = null;
let activeGardenDrag = null;
let gardenDragClickBlocked = false;
let calculationDragClickBlocked = false;
let petMotionSequence = 0;
// ブラウザ設定や容量不足で端末内保存が使えない場合も、表示や学習操作は止めない。
// 通知は一度だけにして、毎回の再描画で子どもの操作をさえぎらない。
let persistenceWarningShown = false;
const avatarImageLoads = new Map();
const avatarImagesReady = new Set();

const placementEngine = window?.MathGardenPlacement?.install?.({
  getState: () => state, getView: () => view, ALL_STAGES, BANK_TEMPLATE_META,
  generateQuestion, renderQuestion, isCorrect, render, saveState, setScreen,
  startStage: startHelp, renderPetCompanion, activePet, stageActivityContract,
  refreshQuestionHints: refreshFractionHints,
  speak: (text) => { stopQuestionSpeech(); return playNyanlunaSpeech(text); },
  stopSpeech: stopQuestionSpeech
}) || null;

// ひっさんキッチン（筆算を、くらいの おうちで すこしずつ おぼえるミニゲーム）
const hissanEngine = window?.MathGardenHissan?.install?.({
  getState: () => state, getView: () => view, render, saveState,
  spriteUrl, spriteFile, renderPetCompanion, activePet, playSfx, triggerMoment,
  // 1もん できるたびに、ほかの おてつだいと おなじ ごほうび（学習したときだけ）
  onProblemSolved: () => {
    const shards = grantQuestionReward();
    const atelier = grantAtelierThread();
    state.stats.totalAnswers += 1;
    if (atelier?.completed) toast("あたらしい コーデが できあがったよ！ きせかえで きてみてね");
    return { shards, atelier };
  },
  onLessonCleared: (lesson, stars, first) => {
    state.stats.shards += first ? 10 : 3;
    saveState();
    toast(first ? `${lesson.dish.name}が おみせに ならんだよ！` : "もういちど できたね！");
  }
}) || null;

render();

document.addEventListener("toggle", (event) => {
  const detail = event.target;
  if (!detail?.hasAttribute?.("data-legacy-closet") || !detail.isConnected) return;
  if (detail.open && !view.legacyClosetOpen) { view.legacyClosetOpen = true; render(); }
  else if (!detail.open) view.legacyClosetOpen = false;
}, true);

document.addEventListener("click", (event) => {
  const target = event.target?.closest?.("[data-action]");
  if (!target || target.disabled || target.getAttribute?.("aria-disabled") === "true") return;
  if (calculationDragClickBlocked && target.dataset.action === "calculation-beads-move") return;
  if (gardenDragClickBlocked && ["garden-cell", "garden-item-select"].includes(target.dataset.action)) return;
  if (target.dataset.dragged === "true") {
    delete target.dataset.dragged;
    return;
  }
  const { action } = target.dataset;
  if (placementEngine?.handleAction?.(action, target)) return;
  if (hissanEngine?.handleAction?.(action, target)) return;

 if (action === "atelier-menu") {
   view.utilityMenuOpen = !view.utilityMenuOpen; render();
 } else if (action === "atelier-look") {
   chooseAtelierLook(target.dataset.lookId);
 } else if (action === "atelier-pause") {
   stopQuestionSpeech(); setScreen("island");
 } else if (action === "atelier-bank") {
   state.atelier.wishId = null; saveState(); render(); toast("つくりかけは そのまま。つぎの糸は とっておくよ。");
 } else if (action === "atelier-wish") {
   chooseAtelierWish(target.dataset.lookId);
 } else if (action === "atelier-pin" || action === "atelier-bag") {
   chooseAtelierPart(action === "atelier-pin" ? "pin" : "bag", target.dataset.partId);
 } else if (action === "atelier-photo" || action === "atelier-result-photo") {
   saveAtelierPhoto();
   if (action === "atelier-result-photo") setScreen("dress");
 } else if (action === "atelier-restore") {
   restoreAtelierPhoto(target.dataset.photoId);
 } else if (action === "atelier-preview") {
   view.atelierPreviewId = target.dataset.lookId; render();
 } else if (action === "atelier-preview-clear") {
   view.atelierPreviewId = null; render();
 } else if (action === "atelier-frame") {
   if (ATELIER_FRAMES.some((frame) => frame.id === target.dataset.frameId)) {
     state.atelier.frameId = target.dataset.frameId; saveState(); render();
   }
 } else if (action === "atelier-legacy") {
   state.atelier.mode = "legacy"; saveState(); render();
 } else if (action === "atelier-sticker") {
   exchangeAtelierSticker(target.dataset.stickerId);
 } else if (action === "atelier-decor") {
   exchangeAtelierGarden(target.dataset.itemId);
 } else if (action === "atelier-wear-reward") {
   chooseAtelierLook(target.dataset.lookId);
   if (view.feedback) { view.feedback.atelier = null; view.feedback.title = "すてき！ このコーデで つづけよう"; render(); }
 } else if (action === "nav") {
   view.utilityMenuOpen = false;
   setScreen(target.dataset.screen);
 } else if (action === "set-study-volume") {
   setStudyVolume(target.dataset.volume);
 } else if (action === "help-mode" || action === "help-picker") {
   openHelpPicker(target.dataset.mode);
 } else if (action === "help-domain") {
   state.learning.helpSelection = normaliseHelpSelection({ ...state.learning.helpSelection, domain: target.dataset.domain });
   render();
 } else if (action === "help-auto-start") {
   state.learning.helpSelection = normaliseHelpSelection({ ...state.learning.helpSelection, mode: "auto" });
   startHelp(automaticHelpRecommendation().stage.id);
 } else if (action === "help-resume") {
   if (target.dataset.stageId) startHelp(target.dataset.stageId);
   else resumeHelp();
 } else if (action === "select-world") {
    if (worldIsAvailable(target.dataset.worldId)) {
      view.world = target.dataset.worldId;
      render();
    } else {
      toast("はじまりのにわを さいごまであそぶと、つぎの村がひらくよ。");
    }
 } else if (action === "start-stage") {
    startHelp(target.dataset.stageId);
 } else if (action === "toggle-pick") {
    togglePick(Number(target.dataset.index));
 } else if (action === "sound-cue") {
   replaySoundGameCue();
 } else if (action === "sound-token") {
   chooseSoundToken(Number(target.dataset.index));
 } else if (action === "sound-pad") {
   chooseSoundPad(target.dataset.value);
 } else if (action === "sound-submit") {
   submitSoundGame();
 } else if (action === "sound-undo") {
   undoSoundGameInput();
 } else if (action === "sound-reset") {
   resetSoundGameInput();
 } else if (action === "sound-pair") {
   chooseSoundPair(target.dataset.side, Number(target.dataset.index));
 } else if (action === "sound-answer") {
   chooseSoundAnswer(Number(target.dataset.index));
 } else if (action === "sound-builder") {
   setSoundBuilderPart(target.dataset.part, Number(target.dataset.value));
 } else if (action === "sound-clock-hour") {
   setSoundClockHour(Number(target.dataset.value));
 } else if (action === "sound-clock-half") {
   toggleSoundClockHalf();
 } else if (action === "sound-measure") {
   chooseSoundMeasure(Number(target.dataset.value));
 } else if (action === "submit-count") {
   submitCount();
 } else if (action === "pair-pick") {
   choosePairToken(target.dataset.side, Number(target.dataset.index));
 } else if (action === "pair-result") {
   submitPairResult(target.dataset.value);
 } else if (action === "route-step") {
   stepRoute(Number(target.dataset.value));
 } else if (action === "pattern-pick") {
   choosePatternToken(target.dataset.value);
 } else if (action === "submit-pattern") {
   submitPatternSlots();
 } else if (action === "choose-answer") {
   submitAnswer(target.dataset.value);
 } else if (action === "curriculum-pick") {
   chooseCurriculumOption(target.dataset.value);
 } else if (action === "calculation-answer-focus") {
   focusCalculationAnswer();
 } else if (action === "calculation-beads-toggle") {
   toggleCalculationBeads();
 } else if (action === "calculation-beads-move") {
   moveCalculationBead();
 } else if (action === "curriculum-submit") {
   submitCurriculumSelection();
 } else if (action === "curriculum-key") {
   appendCurriculumKey(target.dataset.value);
 } else if (action === "curriculum-key-erase") {
   eraseCurriculumKey();
 } else if (action === "curriculum-key-submit") {
   submitCurriculumKeypad();
 } else if (action === "curriculum-reveal-clue") {
   revealCurriculumClue();
 } else if (action === "curriculum-estimate") {
   setCurriculumEstimate(target.dataset.value);
 } else if (action === "sort-pick") {
   chooseSortItem(Number(target.dataset.index));
 } else if (action === "submit-sort") {
   submitSort();
 } else if (action === "place-pick") {
   choosePlacement(target.dataset.value);
 } else if (action === "submit-place") {
   submitPlacement();
 } else if (action === "builder-tens") {
   setBuilderPart("tens", Number(target.dataset.value));
 } else if (action === "builder-ones") {
   setBuilderPart("ones", Number(target.dataset.value));
 } else if (action === "submit-builder") {
   submitBuilder();
 } else if (action === "numberline-pick") {
   submitAnswer(Number(target.dataset.value));
 } else if (action === "clock-adjust") {
   adjustClockDraft(target.dataset.part, Number(target.dataset.delta));
 } else if (action === "submit-clock") {
   submitClockDraft();
 } else if (action === "next-question") {
    nextQuestion();
  } else if (action === "show-hint") {
    showHint();
  } else if (action === "fraction-hint-toggle") {
    toggleFractionHint();
 } else if (action === "back-to-stages") {
   openHelpPicker();
  } else if (action === "equip-item") {
    equipItem(target.dataset.itemId);
  } else if (action === "starter-look") {
    equipStarterLook(target.dataset.lookId);
  } else if (action === "dress-tab") {
    view.dressTab = target.dataset.tab;
    render();
  } else if (action === "unequip-slot") {
    unequipSlot(target.dataset.slot);
  } else if (action === "buy-item") {
    buyItem(target.dataset.itemId);
  } else if (action === "preview-item") {
    previewShopItem(target.dataset.itemId);
  } else if (action === "place-sticker") {
    placeSticker(target.dataset.stickerId);
  } else if (action === "select-sticker") {
    selectDecoSticker(target.dataset.stickerId);
  } else if (action === "deco-turn") {
    transformDecoSticker("rotation", Number(target.dataset.delta));
  } else if (action === "deco-scale") {
    transformDecoSticker("scale", Number(target.dataset.delta));
  } else if (action === "deco-move") {
    moveDecoSticker(Number(target.dataset.dx), Number(target.dataset.dy));
  } else if (action === "deco-remove") {
    removeDecoSticker();
  } else if (action === "exchange-stickers") {
    exchangeDuplicateStickers();
  } else if (action === "collect-tree") {
    collectTree();
  } else if (action === "harvest-garden") {
    harvestGarden();
  } else if (action === "visit-place") {
    visitIslandPlace(target.dataset.place);
  } else if (action === "buy-garden-decor") {
    buyGardenDecor(target.dataset.itemId);
  } else if (action === "expand-garden-map") {
    expandGardenMap();
  } else if (action === "garden-edit") {
    if (view.gardenEditing) closeGardenEditor(true); else openGardenEditor();
  } else if (action === "garden-zoom") {
    view.gardenZoom = !view.gardenZoom; render();
  } else if (action === "pet-tab") {
    view.petTab = ["home", "play", "look", "tricks"].includes(target.dataset.tab) ? target.dataset.tab : "home"; render();
  } else if (action === "boutique-tab") {
    view.boutiqueTab = ["projects", "garden", "keepsakes", "legacy"].includes(target.dataset.tab) ? target.dataset.tab : "projects"; render();
  } else if (action === "garden-shop-toggle") {
    // 横長の画面では、もようがえのお店は必要なときだけ開く。
    view.gardenShopOpen = !view.gardenShopOpen; render();
  } else if (action === "garden-visit") {
    visitIslandPlace(target.dataset.place);
  } else if (action === "garden-cancel") {
    closeGardenEditor(false);
  } else if (action === "garden-tool") {
    if (view.gardenEditing && ["objects", "floors"].includes(target.dataset.tool) && (target.dataset.tool !== "floors" || state.garden.ownedFloors.length > 1)) { view.gardenTool = target.dataset.tool; render(); }
  } else if (action === "garden-item-select") {
    selectGardenItem(target.dataset.itemId);
  } else if (action === "garden-floor-select") {
    selectGardenFloor(target.dataset.floorId);
  } else if (action === "garden-cell") {
    gardenEditCell(Number(target.dataset.x), Number(target.dataset.y));
  } else if (action === "garden-cursor") {
    moveGardenCursor(Number(target.dataset.dx), Number(target.dataset.dy));
  } else if (action === "garden-place-cursor") {
    gardenEditCell(view.gardenCursor.x, view.gardenCursor.y);
  } else if (action === "garden-paint-all") {
    paintGardenFloor(view.gardenSelectedFloor, null, null, true);
  } else if (action === "garden-stow") {
    stowGardenItem();
  } else if (action === "garden-undo") {
    undoGardenEdit();
  } else if (action === "garden-reward-open") {
    view.gardenSelectedId = view.result?.gardenGifts?.find(gift => gift.kind === "facility")?.id || "home";
    setScreen("island"); openGardenEditor();
  } else if (action === "start-treasure") {
    startTreasure(target.dataset.noteId);
  } else if (action === "finish-treasure") {
    finishTreasure();
  } else if (action === "like-island") {
    likeIsland(target.dataset.islandId);
  } else if (action === "co-learn") {
    startCoLearn();
  } else if (action === "pet-select") {
    selectPet(target.dataset.petId);
  } else if (action === "pet-evolve") {
    evolvePet(target.dataset.petId);
  } else if (action === "pet-appearance") {
    selectPetAppearance(target.dataset.petId, target.dataset.appearance);
  } else if (action === "pet-practice") {
    practicePetTrick(target.dataset.petId, target.dataset.trickId);
  } else if (action === "pet-pat") {
    patActivePet();
  } else if (action === "pet-command") {
    performPetCommand(target.dataset.petId, target.dataset.trickId);
  } else if (action === "speak") {
    speakCurrentQuestion();
  } else if (action === "toggle-sound") {
    toggleSound();
  } else if (action === "parent-check") {
    verifyParentGate();
  } else if (action === "parent-lock") {
    lockParentArea();
  } else if (action === "save-parent-pin") {
    saveParentPin();
 } else if (action === "try-reward") {
    tryRewardItem();
  } else if (action === "try-feedback-gift") {
    showFeedbackGift();
  } else if (action === "clear-parent-pin") {
    clearParentPin();
  } else if (action === "reset-game") {
    resetGame();
  }
});

// 数字キーボードを出している保護者確認/PIN設定では、Enterでも確定できるようにする。
// ボタンを探し直す必要がなく、キーボード利用・支援技術のどちらでも同じ結果になる。
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && view.utilityMenuOpen) {
    event.preventDefault(); view.utilityMenuOpen = false; render();
    document.querySelector('[data-action="atelier-menu"]')?.focus?.({ preventScroll: true }); return;
  }
  if (event.isComposing || event.target?.disabled) return;
  const rewardDialog = document.querySelector('[data-reward-dialog="true"]');
  if (rewardDialog?.getAttribute?.("aria-modal") === "true" && (event.key === "Tab" || event.key === "Escape")) {
    event.preventDefault?.();
    if (event.key === "Escape") return;
    const buttons = Array.from(rewardDialog.querySelectorAll("button:not(:disabled), [href], [tabindex='0']"))
      .filter((node) => node.getClientRects().length > 0);
    if (buttons.length) {
      const current = buttons.indexOf(document.activeElement);
      const next = current < 0 ? (event.shiftKey ? buttons.length - 1 : 0)
        : (current + (event.shiftKey ? -1 : 1) + buttons.length) % buttons.length;
      focusRewardControl(buttons[next], rewardDialog);
    }
    return;
  }
  const tab = event.target?.closest?.('[data-action="dress-tab"]');
  if (tab && ["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) {
    event.preventDefault?.();
    const current = DRESS_TAB_GROUPS.findIndex((group) => group.id === tab.dataset.tab);
    const index = event.key === "Home" ? 0 : event.key === "End" ? DRESS_TAB_GROUPS.length - 1
      : (current + (event.key === "ArrowRight" ? 1 : -1) + DRESS_TAB_GROUPS.length) % DRESS_TAB_GROUPS.length;
    view.dressTab = DRESS_TAB_GROUPS[index].id;
    render();
    const focusTab = () => document.querySelector(`#dress-tab-${view.dressTab}`)?.focus?.({ preventScroll: true });
    focusTab();
    return;
  }
  const sticker = event.target?.closest?.(".deco-sticker");
  if (sticker && ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(event.key)) {
    event.preventDefault?.();
    view.decoSelectedId = sticker.dataset.stickerId;
    const step = event.shiftKey ? 5 : 2;
    moveDecoSticker(event.key === "ArrowLeft" ? -step : event.key === "ArrowRight" ? step : 0,
      event.key === "ArrowUp" ? -step : event.key === "ArrowDown" ? step : 0);
    return;
  }
  if (event.key !== "Enter") return;
  const id = event.target?.id;
  if (id !== "parentGateInput" && id !== "parentPinInput") return;
  event.preventDefault?.();
  if (id === "parentGateInput") verifyParentGate();
  else saveParentPin();
});

// シールは「棚に並べる」だけでなく、紙の上を直接つまんで動かせる。
// pointer 操作を使うので、マウス・タッチ・ペンで同じ手つきになり、通常の
// button click はキーボード用の選択フォールバックとして残る。
document.addEventListener("pointerdown", (event) => {
  const sticker = event.target?.closest?.(".deco-sticker");
  const canvas = sticker?.closest?.("[data-deco-canvas]");
  if (!sticker || !canvas || (Number.isFinite(event.button) && event.button !== 0)) return;
  const rect = canvas.getBoundingClientRect?.();
  if (!rect?.width || !rect?.height) return;
  activeDecoDrag = {
    sticker,
    canvas,
    id: sticker.dataset.stickerId,
    rect,
    pointerId: event.pointerId,
    baseTransform: sticker.style.transform || ""
  };
  sticker.classList?.add?.("is-dragging");
  // 位置・回転・大きさは保存済みの inline transform で表している。
  // CSS の transform で上書きすると配置が消えるため、ドラッグ中だけその
  // 変形の末尾に拡大を足して、離したら描画で正規の姿へ戻す。
  sticker.style.transform = `${activeDecoDrag.baseTransform} scale(1.12)`;
  sticker.setPointerCapture?.(event.pointerId);
  event.preventDefault?.();
});

document.addEventListener("pointermove", (event) => {
  const drag = activeDecoDrag;
  if (!drag || (drag.pointerId !== undefined && event.pointerId !== undefined && drag.pointerId !== event.pointerId)) return;
  const x = Math.max(2, Math.min(88, (event.clientX - drag.rect.left) / drag.rect.width * 100));
  const y = Math.max(8, Math.min(82, (event.clientY - drag.rect.top) / drag.rect.height * 100));
  drag.sticker.style.left = `${x}%`;
  drag.sticker.style.top = `${y}%`;
  drag.x = x;
  drag.y = y;
  event.preventDefault?.();
});

function finishDecoDrag(event) {
  const drag = activeDecoDrag;
  if (!drag || (drag.pointerId !== undefined && event?.pointerId !== undefined && drag.pointerId !== event.pointerId)) return;
  drag.sticker.classList?.remove?.("is-dragging");
  drag.sticker.style.transform = drag.baseTransform || "";
  activeDecoDrag = null;
  if (!drag.id || !Number.isFinite(drag.x) || !Number.isFinite(drag.y)) return;
  setDecoStickerPosition(drag.id, drag.x, drag.y);
}

document.addEventListener("pointerup", finishDecoDrag);
document.addEventListener("pointercancel", finishDecoDrag);

// 運ぶ問題は、タップでも遊べるが「つかむ→トレーへ運ぶ」手つきを主役にする。
// drop したときだけ既存の厳密な togglePick を呼ぶため、採点経路は変えない。
document.addEventListener("pointerdown", (event) => {
  const item = event.target?.closest?.(".roleplay-draggable[data-action='toggle-pick'], [data-bead-drag]");
  if (!item || item.disabled || (Number.isFinite(event.button) && event.button !== 0)) return;
  const isBead = item.dataset.beadDrag === "true";
  activePlayDrag = {
    item,
    isBead,
    question: isBead ? currentQuestion() : null,
    pointerId: event.pointerId,
    index: Number(item.dataset.index),
    startX: event.clientX,
    startY: event.clientY,
    moved: false
  };
  item.classList?.add?.("is-dragging");
  item.setPointerCapture?.(event.pointerId);
});

document.addEventListener("pointermove", (event) => {
  const drag = activePlayDrag;
  if (!drag || (drag.pointerId !== undefined && event.pointerId !== undefined && drag.pointerId !== event.pointerId)) return;
  const dx = Number(event.clientX) - Number(drag.startX);
  const dy = Number(event.clientY) - Number(drag.startY);
  if (Math.hypot(dx, dy) > 8) drag.moved = true;
  if (!drag.moved) return;
  if (drag.isBead) {
    if (!drag.ghost) {
      drag.ghost = document.createElement("span");
      drag.ghost.className = "calculation-drag-bead";
      drag.ghost.textContent = "♥";
      drag.ghost.setAttribute("aria-hidden", "true");
      document.body.append(drag.ghost);
    }
    drag.ghost.style.left = `${event.clientX - 36}px`;
    drag.ghost.style.top = `${event.clientY - 36}px`;
    document.querySelectorAll("[data-bead-drop]").forEach((dish) => {
      const rect = dish.getBoundingClientRect();
      dish.classList.toggle("is-bead-over", event.clientX >= rect.left && event.clientX <= rect.right && event.clientY >= rect.top && event.clientY <= rect.bottom);
    });
    event.preventDefault?.();
    return;
  }
  drag.item.style.transform = `translate(${Math.max(-70, Math.min(70, dx))}px, ${Math.max(-70, Math.min(70, dy))}px) scale(1.08)`;
  const target = document.elementFromPoint?.(event.clientX, event.clientY)?.closest?.(".roleplay-basket");
  target?.classList?.add?.("is-over");
});

function finishPlayDrag(event) {
  const drag = activePlayDrag;
  if (!drag || (drag.pointerId !== undefined && event?.pointerId !== undefined && drag.pointerId !== event.pointerId)) return;
  activePlayDrag = null;
  drag.item.classList?.remove?.("is-dragging");
  drag.item.style.transform = "";
  if (drag.isBead) {
    drag.ghost?.remove();
    const target = [...document.querySelectorAll("[data-bead-drop]")].find((dish) => {
      const rect = dish.getBoundingClientRect();
      return event?.clientX >= rect.left && event?.clientX <= rect.right && event?.clientY >= rect.top && event?.clientY <= rect.bottom;
    });
    document.querySelectorAll(".is-bead-over").forEach(dish => dish.classList.remove("is-bead-over"));
    if (!drag.moved || event?.type === "pointercancel") return;
    // pointerupに続く合成clickで、もう1こ動かさない。次の実タップは通す。
    calculationDragClickBlocked = true;
    window.setTimeout(() => { calculationDragClickBlocked = false; }, 0);
    event?.preventDefault?.();
    if (target && currentQuestion() === drag.question) moveCalculationBead();
    return;
  }
  const target = document.elementFromPoint?.(event?.clientX, event?.clientY)?.closest?.(".roleplay-basket");
  document.querySelectorAll?.(".roleplay-basket.is-over").forEach?.((basket) => basket.classList.remove("is-over"));
  if (!drag.moved || event?.type === "pointercancel") return;
  // トレー外の drop はタップ回答に変換しない。pointer capture が発生させる
  // 後続 click を抑止して、運ぶ操作の成否と選択状態を一致させる。
  drag.item.dataset.dragged = "true";
  event?.preventDefault?.();
  if (!target || !Number.isInteger(drag.index)) return;
  if (!view.selected.has(drag.index)) togglePick(drag.index);
}

document.addEventListener("pointerup", finishPlayDrag);
document.addEventListener("pointercancel", finishPlayDrag);

document.addEventListener("keydown", (event) => {
  if (!view.gardenEditing || !event.target?.closest?.('[data-action="garden-cell"]')) return;
  const direction = { ArrowUp: [0, -1], ArrowDown: [0, 1], ArrowLeft: [-1, 0], ArrowRight: [1, 0] }[event.key];
  if (!direction) return;
  event.preventDefault(); moveGardenCursor(...direction, true);
});

document.addEventListener("pointerdown", (event) => {
  const item = event.target?.closest?.('[data-garden-drag]');
  if (!view.gardenEditing || view.gardenTool === "floors" || !item || (Number.isFinite(event.button) && event.button !== 0) || !gardenOwnedItems().some(candidate => candidate.id === item.dataset.gardenDrag)) return;
  const position = view.gardenDraft.layout[item.dataset.gardenDrag];
  activeGardenDrag = { item, id: item.dataset.gardenDrag, draft: view.gardenDraft, offsetX: item.dataset.x && position ? Number(item.dataset.x) - position.x : 0, offsetY: item.dataset.y && position ? Number(item.dataset.y) - position.y : 0, pointerId: event.pointerId, pointerType: event.pointerType, startX: event.clientX, startY: event.clientY, moved: false };
  item.setPointerCapture?.(event.pointerId);
});

document.addEventListener("pointermove", (event) => {
  const drag = activeGardenDrag;
  if (!drag || drag.pointerId !== event.pointerId) return;
  const dx = event.clientX - drag.startX, dy = event.clientY - drag.startY;
  if (!drag.moved && drag.pointerType === "touch" && drag.item.closest('.garden-shelf') && Math.abs(dx) > 8 && Math.abs(dx) > Math.abs(dy) * 1.3) { activeGardenDrag = null; return; }
  if (Math.hypot(dx, dy) > 8) drag.moved = true;
  if (!drag.moved) return;
  if (!drag.ghost) {
    drag.ghost = document.createElement("div"); drag.ghost.className = "garden-drag-ghost"; drag.ghost.setAttribute("aria-hidden", "true");
    drag.ghost.innerHTML = renderGardenItemArt(gardenOwnedItems().find(item => item.id === drag.id));
    document.body.append(drag.ghost); drag.item.classList.add('is-garden-dragging');
  }
  drag.ghost.style.left = `${event.clientX - 48}px`; drag.ghost.style.top = `${event.clientY - 60}px`;
  const target = document.elementFromPoint?.(event.clientX, event.clientY)?.closest?.('[data-action="garden-cell"]');
  const destination = target ? { x: Number(target.dataset.x) - drag.offsetX, y: Number(target.dataset.y) - drag.offsetY } : null;
  const cells = gardenItemCells(drag.id, destination);
  const valid = destination && gardenPlacementPlan(drag.id, destination.x, destination.y, drag.draft.layout).valid;
  document.querySelectorAll('[data-action="garden-cell"]').forEach(cell => {
    const covered = cells.some(point => point.x === Number(cell.dataset.x) && point.y === Number(cell.dataset.y));
    cell.classList.toggle('is-drop-target', covered);
    cell.classList.toggle('is-drop-blocked', covered && !valid);
  });
  event.preventDefault?.();
});

function finishGardenDrag(event) {
  const drag = activeGardenDrag;
  if (!drag || drag.pointerId !== event.pointerId) return;
  activeGardenDrag = null; drag.ghost?.remove(); drag.item.classList.remove('is-garden-dragging');
  const target = document.elementFromPoint?.(event.clientX, event.clientY)?.closest?.('[data-action="garden-cell"]');
  document.querySelectorAll('.is-drop-target').forEach(cell => cell.classList.remove('is-drop-target', 'is-drop-blocked'));
  if (!drag.moved) return;
  gardenDragClickBlocked = true; window.setTimeout(() => { gardenDragClickBlocked = false; }, 0);
  event.preventDefault?.();
  if (event.type !== "pointercancel" && target && view.gardenEditing && view.gardenDraft === drag.draft) placeGardenItem(drag.id, Number(target.dataset.x) - drag.offsetX, Number(target.dataset.y) - drag.offsetY);
}

document.addEventListener("pointerup", finishGardenDrag);
document.addEventListener("pointercancel", finishGardenDrag);

function buildW0Stages() {
  let order = 1;
  return W0_AREAS.flatMap((area) =>
    Array.from({ length: area.total }, (_, index) => {
      const id = `w0-${area.id}-${index + 1}`;
      const game = stageBlueprintFor(id);
      return {
        id,
        worldId: "w0",
        order: order++,
        areaId: area.id,
        areaName: area.name,
        shortName: area.shortName,
        mode: area.mode,
        level: index + 1,
        name: game?.title || `${area.name} ${index + 1}`,
        theme: area.theme,
        game
      };
    })
  );
}

function buildStages(areas, startOrder = 1) {
  let order = startOrder;
  return areas.flatMap((area) =>
    Array.from({ length: area.total }, (_, index) => {
      const id = `${area.id}-${index + 1}`;
      const game = stageBlueprintFor(id);
      return {
        id,
        worldId: area.worldId,
        order: order++,
        areaId: area.id,
        areaName: area.name,
        shortName: area.shortName,
        mode: area.mode,
        level: index + 1,
        name: game?.title || `${area.name} ${index + 1}`,
        theme: area.theme,
        game
      };
    })
  );
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed.version === 2) {
        return withDerivedState(parsed);
      }
    }
  } catch (error) {
    console.warn("Could not load save data", error);
  }
  return createInitialState();
}

function completedStageCount(snapshot = state) {
  return ALL_STAGES.filter((stage) => Boolean(snapshot?.completedStages?.[stage.id])).length;
}

function allStagesCleared(snapshot = state) {
  return ALL_STAGES.length > 0 && ALL_STAGES.every((stage) => Boolean(snapshot?.completedStages?.[stage.id]));
}

function gardenMapSize(snapshot = state) {
  return GARDEN_EXPANSIONS[safeStateInteger(snapshot?.garden?.expansionLevel, 0, 0, GARDEN_EXPANSIONS.length - 1)].size;
}

function gardenJourneyCount(snapshot = state) {
  return ALL_STAGES.reduce((count, stage) => count + (snapshot?.completedStages?.[stage.id] ? safeStateInteger(snapshot.completedStages[stage.id].times, 1, 1) : 0), 0);
}

function renderIsland() {
  const currentLook = atelierLookById(state.atelier.lookId);
  return `<div class="atelier-home"><section class="atelier-home-hero"><div class="atelier-home-copy"><span class="atelier-kicker">MY LITTLE ATELIER</span><h2>きょうは、<br>どんな わたし？</h2><p>すきなコーデで、おともとおでかけ。<br>お店をてつだって、おめかしをつくろう。</p><div class="action-row"><button class="primary-button" data-action="nav" data-screen="dress">コーデを えらぶ</button><button class="soft-button" ${view.active ? 'data-action="help-resume"' : 'data-action="help-picker"'}>${view.active ? "おてつだいの つづき" : "お店を てつだう"}</button></div><span class="atelier-home-tip">ヒントも、えらびなおしも だいじょうぶ。</span></div><div class="atelier-home-portrait atelier-frame-garden">${renderAvatarLayered()}<div class="atelier-home-pet">${renderPetCompanion(activePet(), { compact: true, showName: false })}</div><span class="atelier-outfit-label">${state.atelier.mode === "legacy" ? "まえのクローゼットのコーデ" : currentLook.name}</span></div></section>${placementEngine?.renderEntry?.() || ""}<div class="atelier-home-grid">${renderAtelierWish()}${renderHelpHome()}</div><section class="panel atelier-garden-home"><div class="section-heading"><div><span class="atelier-kicker">MY GARDEN</span><h3>わたしと おともの おにわ</h3><p>おてつだいで、少しずつ お店やおはながふえるよ。</p></div><button class="soft-button" data-action="nav" data-screen="pets">おともの おうち</button></div>${renderGardenGrowthStrip()}${renderIslandBoard()}${renderGardenGatherButtons()}${renderGardenDecorShop()}</section><div id="dailyGrowthHost" aria-live="polite"></div></div>`;
}

function renderLearn() {
  if (view.active && !view.helpPickerOpen) return renderActiveStage();
  if (view.result && !view.helpPickerOpen) return renderResult();
  const selection = normaliseHelpSelection(state.learning.helpSelection);
  const heading = `<div class="section-heading"><div><span class="atelier-kicker">おともと おみせやさん</span><h2>きょうは どうあそぶ？</h2><p>おまかせも、すきなお店も えらべるよ。</p></div><button class="soft-button" data-action="nav" data-screen="boutique">つくるコーデを みる</button></div>`;
  const modes = `<div class="help-mode-picker" role="group" aria-label="おてつだいのえらび方">${[ ["auto", "🌷", "おともに おまかせ", "ぴったりのおてつだいを えらぶよ"], ["free", "🗺️", "じぶんで えらぶ", "すきなお店へ おでかけしよう"] ].map(([mode, icon, label, line]) => `<button class="help-mode-choice ${selection.mode === mode ? "is-selected" : ""}" data-action="help-mode" data-mode="${mode}" aria-pressed="${selection.mode === mode}"><span aria-hidden="true">${icon}</span><strong>${label}</strong><small>${line}</small></button>`).join("")}</div>`;
  const resume = renderHelpResume();
  if (selection.mode === "auto") {
    const recommendation = automaticHelpRecommendation();
    const activity = stageActivityContract(recommendation.stage);
    const domainPicker = `<div class="help-domain-picker" role="group" aria-label="おまかせするおてつだいの種類">${[["all", { label: "ぜんぶ", icon: "✨" }], ...Object.entries(HELP_DOMAIN_OPTIONS)].map(([id, domain]) => `<button class="soft-button ${selection.domain === id ? "is-selected" : ""}" data-action="help-domain" data-domain="${id}" aria-pressed="${selection.domain === id}"><span aria-hidden="true">${domain.icon}</span>${domain.label}</button>`).join("")}</div>`;
    return `<section class="wide-panel atelier-orders">${heading}${modes}${resume}${domainPicker}<article class="help-auto-card" data-recommended-stage="${recommendation.stage.id}"><div class="help-auto-art">${renderStageActivityArt(recommendation.stage)}</div><div><span class="atelier-kicker">${recommendation.hasEvidence ? "いまの ぴったり" : "まずは ここから"}</span><h3>${escapeHtml(activity?.title || recommendation.stage.name)}</h3><p>${escapeHtml(activity?.goal || recommendation.stage.theme)}</p><p class="help-auto-note">${escapeHtml(recommendation.reason)}</p><button class="primary-button" data-action="help-auto-start">${view.active?.stage.id === recommendation.stage.id || view.pausedHelps?.[recommendation.stage.id] ? "つづきから てつだう" : "この おてつだいに いく"}</button><button class="text-button" data-action="help-mode" data-mode="free">すきなお店からも えらべるよ</button></div></article>${placementEngine?.renderEntry?.() || ""}<details class="atelier-volume-details"><summary>おてつだいの 長さをえらぶ</summary>${renderStudyVolumePicker(WORLDS.find((world) => world.id === recommendation.stage.worldId) || activeWorld())}</details></section>`;
  }
  const world = activeWorld();
  const place = atelierPlace(world);
  const remaining = world.stages.filter((stage) => !state.completedStages[stage.id]);
  const featured = [...remaining, ...world.stages.filter((stage) => state.completedStages[stage.id])].slice(0, 6);
  return `<section class="wide-panel atelier-orders">${heading}${modes}${resume}<div class="atelier-place-picker" aria-label="おでかけ先">${WORLDS.map((candidate) => { const shop = atelierPlace(candidate); return `<button class="${candidate.id === world.id ? "is-selected" : ""}" data-action="select-world" data-world-id="${candidate.id}" aria-pressed="${candidate.id === world.id}"><span aria-hidden="true">${shop.icon}</span><strong>${shop.name}</strong></button>`; }).join("")}</div><div class="atelier-order-heading"><div><h3>${place.name}</h3><p>${place.line}</p></div>${renderAtelierWish(true)}</div><div class="stage-grid atelier-order-grid">${featured.map(renderStageCard).join("")}</div><details class="atelier-more-orders"><summary>この場所の おてつだいを ぜんぶみる</summary><div class="stage-grid atelier-order-grid">${world.stages.filter((stage) => !featured.includes(stage)).map(renderStageCard).join("")}</div></details><details class="atelier-volume-details"><summary>おてつだいの 長さをえらぶ</summary>${renderStudyVolumePicker(world)}</details></section>`;
}

function renderHelpHome() {
  const recommendation = automaticHelpRecommendation();
  return `<section class="atelier-first-orders"><span class="atelier-kicker">おともが まっているよ</span><h3>きょうの おてつだい</h3><div class="atelier-order-preview">${renderStageActivityArt(recommendation.stage)}<p>${escapeHtml(stageActivityContract(recommendation.stage)?.title || recommendation.stage.name)}</p></div><p class="help-auto-note">${escapeHtml(recommendation.reason)}</p><div class="help-home-actions"><button class="primary-button" data-action="help-auto-start"><span aria-hidden="true">🌷</span>おともに おまかせ</button><button class="soft-button" data-action="help-picker" data-mode="free"><span aria-hidden="true">🗺️</span>じぶんで えらぶ</button></div>${view.active ? '<button class="text-button" data-action="help-resume">とちゅうの おてつだいにもどる</button>' : ""}</section>`;
}

function renderHelpResume() {
  const current = view.active ? [[helpSessionKey(view.active), { active: view.active }]] : [];
  const entries = [...current, ...Object.entries(view.pausedHelps || {})];
  if (!entries.length) return "";
  return `<section class="help-resume-list" aria-label="とちゅうのおてつだい"><h3>つづきも とってあるよ</h3>${entries.map(([key, { active }]) => `<div><span>${escapeHtml(active.isTreasure ? `ノート：${active.questions[0].prompt}` : stageActivityContract(active.stage)?.title || active.stage.name)}</span><button class="soft-button" data-action="help-resume" data-stage-id="${escapeHtml(key)}">つづきから</button></div>`).join("")}</section>`;
}

function renderStageActivityArt(stage) {
  const activity = stageActivityContract(stage);
  return activity?.material?.src ? renderQuestionToken(activity.material, "stage-material-token") : renderAssetSprite(stageSprite(stage), stage.theme);
}

function renderStageCard(stage) {
  const done = state.completedStages[stage.id];
  const inProgress = view.active?.stage.id === stage.id || Boolean(view.pausedHelps?.[stage.id]);
  const game = stageActivityContract(stage);
  return `<article class="stage-card atelier-order-card ${done ? "done" : ""}" data-stage-theme="${stage.mode}"><div class="stage-visual">${renderStageActivityArt(stage)}</div><div><span class="atelier-kicker">${inProgress ? "つづきも とってあるよ" : done ? "また あそべるよ" : "おともからの おねがい"}</span><strong>${escapeHtml(game?.title || stage.name)}</strong><p>${escapeHtml(game?.goal || stage.theme)}</p><small>${sessionQuestionCount(stage)}この おてつだい・糸がひとつずつ</small></div><button class="${done ? "soft-button" : "primary-button"}" data-action="start-stage" data-stage-id="${stage.id}">${inProgress ? "つづきから" : done ? "もういちど てつだう" : "てつだう"}</button></article>`;
}

function renderFeedback(isSolved) {
  if (!view.feedback) return "";
  const active = view.active;
  const feedback = view.feedback;
  if (feedback.kind !== "good") return renderLegacyFeedback(isSolved);
  const action = active.isTreasure && isSolved ? "finish-treasure" : "next-question";
  const label = active.isTreasure ? "ノートへ" : active.index === active.questions.length - 1 ? "おてつだい できあがり" : "つぎの おねがいへ";
  const event = feedback.atelier;
  const unlocked = event?.completed ? atelierLookById(event.lookId) : null;
  const project = event?.lookId ? atelierLookById(event.lookId) : null;
  const joy = playJoyFor(active);
  return `<section class="reward-celebration atelier-reward joy-reward is-visible" data-joy-tier="${joy.tier}" role="dialog" aria-modal="true" aria-label="${unlocked ? "新しいコーデができあがり" : joy.complete ? "おはなフィーバー" : "おともからのありがとう"}" data-reward-dialog="true"><div class="reward-celebration__card"><div class="reward-celebration__avatar joy-reward-cast ${unlocked ? "joy-reward-cast--outfit" : ""}">${unlocked ? renderAtelierAvatar({ ...state.atelier, lookId: unlocked.id }, "できあがったコーデ") : renderPetCompanion(activePet(), { showName: false })}${renderJoyBouquet(joy)}</div><div class="reward-celebration__copy"><span class="joy-combo-label">${joy.complete ? "おはな フィーバー！" : `おはなコンボ ${joy.solved}`}</span><strong>${unlocked ? `${unlocked.name}<br>できあがり！` : escapeHtml(feedback.title)}</strong><p class="joy-reward-line">${joy.complete ? "おともと 花束、できあがり！" : joy.tier >= 3 ? "わあ、もうすぐ 花束になるよ！" : joy.tier >= 2 ? "おともも うれしくて ぴょんっ！" : "ぽんっ！ お花が さいたよ。"}</p><p>${unlocked ? "すきなときに 着てみてね。" : event?.banked ? "糸をひとつ、とっておいたよ。" : project ? `${project.name}に 糸がひとつ。あと${project.cost - event.progress}こ！` : "おてつだい、ありがとう！"}</p><div class="action-row">${unlocked ? `<button class="soft-button" data-action="atelier-wear-reward" data-look-id="${unlocked.id}">着て つづける</button>` : ""}<button class="primary-button" data-action="${action}">${label}</button></div>${event?.banked ? '<button class="text-button" data-action="nav" data-screen="boutique">つぎに つくるものをえらぶ</button>' : ""}</div><div class="reward-celebration__pet">${renderPetCompanion(activePet(), { compact: true, showName: false })}</div></div></section>`;
}

function renderResult() {
  const result = view.result;
  const atelier = state.atelier;
  const nextHelp = automaticHelpRecommendation().stage;
  const unlocked = atelierLookById(result.atelierUnlocked);
  return `<section class="wide-panel atelier-result"><div class="section-heading"><div><span class="atelier-kicker">おみせの じゅんび、できあがり</span><h2>てつだってくれて、ありがとう！</h2><p>${escapeHtml(activePet()?.name || "おとも")}も、うれしそう。</p></div></div>${result.joy ? `<div class="joy-finale-keepsake"><div>${renderJoyBouquet(result.joy)}</div><p><strong>おともへの 花束</strong><span>${result.joy.solved}本のお花を さかせたよ！</span></p></div>` : ""}<div class="atelier-result-grid"><div class="atelier-result-portrait atelier-frame-${atelier.frameId}">${renderAvatarLayered()}${renderPetCompanion(activePet(), { compact: true, showName: false })}</div><div class="atelier-result-copy">${unlocked ? `<h3>${unlocked.name}が できたよ！</h3><button class="primary-button" data-action="atelier-wear-reward" data-look-id="${unlocked.id}">${atelier.lookId === unlocked.id && atelier.mode === "atelier" ? "このコーデを 着ているよ" : "できたコーデを 着る"}</button>` : '<h3>おともと、すてきにできたね。</h3>'}${renderAtelierWish(true)}<div class="action-row">${atelier.mode === "atelier" ? '<button class="primary-button" data-action="atelier-result-photo">コーデを しゃしんにのこす</button>' : '<button class="primary-button" data-action="nav" data-screen="dress">コーデを えらぶ</button>'}<button class="soft-button" data-action="nav" data-screen="dress">おめかしを あわせる</button>${nextHelp ? `<button class="primary-button" data-action="start-stage" data-stage-id="${nextHelp.id}">つぎの ぴったりのおてつだい</button>` : ""}<button class="soft-button" data-action="nav" data-screen="island">おうちへ</button></div>${result.sticker ? `<div class="atelier-result-sticker">${renderAssetSprite(result.sticker.sprite, result.sticker.name)}<span>${result.sticker.name}も とどいたよ！</span><button class="text-button" data-action="nav" data-screen="stickers">シールちょうに はる</button></div>` : ""}${renderGardenJourneyGifts(result.gardenGifts)}${result.gardenGift ? `<p>${escapeHtml(result.gardenGift.name)}が とどいたよ！</p>` : ""}${result.breakSuggestion ? '<div class="wellbeing-note">おみずをのんで、ひとやすみしよう。</div>' : ""}<details><summary>とどいた たからもの</summary><p>コイン ${result.coins}・かけら ${result.shards}</p><p>${result.drop ? `${escapeHtml(result.drop.name)}は、まえのクローゼットにあるよ。` : "かけらのプレゼントも とどいたよ。"}</p>${result.drop?.slot ? '<button class="soft-button" data-action="try-reward">まえのクローゼットで 着る</button>' : ""}</details><button class="text-button" data-action="back-to-stages">ほかの おてつだいも みる</button></div></div></section>`;
}

function renderDress() { return renderAtelierDress(); }
function renderBoutiqueTabs() {
  const tab = view.boutiqueTab || "projects";
  const tabs = [["projects", "コーデ"], ["garden", "おにわ"], ["keepsakes", "シール"], ["legacy", "まえのお店"]];
  return `<div class="boutique-tabs" role="tablist" aria-label="つくりたいの しゅるい">${tabs.map(([id, label]) => `<button class="soft-button ${tab === id ? "is-selected" : ""}" role="tab" aria-selected="${tab === id}" data-action="boutique-tab" data-tab="${id}">${label}</button>`).join("")}</div>`;
}

function renderBoutique() { return renderAtelierBoutique(); }

function createInitialState() {
  return withDerivedState({
    version: 2,
    stats: {
      level: 1,
      xp: 0,
      coins: 90,
      shards: 0,
      jewels: 0,
      stickers: 0,
      streak: 1,
      totalAnswers: 0,
      totalStages: 0,
      questionSeed: 0,
      landSize: 8
    },
    inventory: STARTER_ITEMS.map((item) => item.id),
    equipment: {
      hair: "hair_v2_bob_pink",
      eyes: "eyes_open",
      brows: "brows_normal",
      mouth: "mouth_smile",
      blush: "blush_normal",
      head: "head_ribbon_start",
      top: "top_cotton",
      bottom: "bottom_mint",
      dress: null,
      socks: "socks_cream",
      shoes: "shoes_v2_pink",
      accessory: "accessory_seed",
      bag: null
    },
    completedStages: {},
    mastery: Object.fromEntries(ALL_AREAS.map((area) => [area.id, 0])),
    notebook: [],
    likedIslands: {},
    stickers: {
      owned: ["stk_flower_count"],
      board: ["stk_flower_count"],
      layout: { stk_flower_count: { x: 48, y: 51, rotation: -7, scale: 1 } },
      duplicates: 0
    },
    onboarding: {
      firstGlowUpClaimed: false
    },
    pets: createPetState(),
    settings: {
      soundEnabled: true,
      parentPin: "",
      studyVolume: "short"
    },
    // 個人を特定しない、端末内だけの学習シグナル。外部送信はしない。
    learning: createLearningState(),
    garden: {
      schemaVersion: 2,
      treeReady: false,
      harvestReady: false,
      decorations: ["home"],
      purchased: [],
      mapExpanded: false,
      expansionLevel: 0,
      inheritedExpansion: 0,
      layout: { home: { x: 1, y: 1 }, avatar: { x: 3, y: 2 } },
      ownedFloors: ["grass"],
      baseFloor: "grass",
      floorTiles: {}
    }
  });
}

function isStateRecord(value) {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function safeStateInteger(value, fallback = 0, minimum = 0, maximum = 1000000000) {
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) return fallback;
  return Math.max(minimum, Math.min(maximum, Math.floor(numeric)));
}

function normaliseStickerLayout(rawLayout, board) {
  const source = isStateRecord(rawLayout) ? rawLayout : {};
  const safeBoard = Array.isArray(board) ? board : [];
  const layout = {};
  const candidates = [18, 50, 82].flatMap((x) => [18, 40, 62, 84].map((y) => ({ x, y })));
  const occupied = safeBoard.flatMap((id) => {
    const position = source[id];
    return Number.isFinite(Number(position?.x)) && Number.isFinite(Number(position?.y))
      ? [{ x: Number(position.x), y: Number(position.y) }] : [];
  });
  safeBoard.forEach((id, index) => {
    const sourceEntry = isStateRecord(source[id]) ? source[id] : {};
    // 初めて貼るシールも、ページの真ん中に重ならず自然に散らばる位置から始める。
    // New stickers start in the largest free gap. Existing authored positions
    // stay unchanged, including deliberately overlapping collage designs.
    const score = (point) => occupied.length ? Math.min(...occupied.map((other) => ((point.x - other.x) * .7) ** 2 + (point.y - other.y) ** 2)) : 0;
    const fallback = [...candidates].sort((left, right) => score(right) - score(left))[0];
    const fallbackX = fallback.x;
    const fallbackY = fallback.y;
    const numeric = (key, fallback, min, max) => {
      const value = Number(sourceEntry[key]);
      return Number.isFinite(value) ? Math.max(min, Math.min(max, value)) : fallback;
    };
    layout[id] = {
      x: numeric("x", fallbackX, 2, 88),
      y: numeric("y", fallbackY, 8, 82),
      rotation: numeric("rotation", ((index % 3) - 1) * 7, -30, 30),
      scale: numeric("scale", 1, 0.65, 1.38)
    };
    if (!Number.isFinite(Number(sourceEntry.x)) || !Number.isFinite(Number(sourceEntry.y))) occupied.push(layout[id]);
  });
  return layout;
}

function normaliseCompletedStages(rawCompletedStages) {
  const source = isStateRecord(rawCompletedStages) ? rawCompletedStages : {};
  const normalised = {};
  // 完了として数えるのは公開ステージだけ。未知IDを残すと、古い試作版や
  // 壊れた保存データで進捗・庭の解放数が水増しされてしまう。
  for (const stage of ALL_STAGES) {
    const rawRecord = source[stage.id];
    if (!rawRecord) continue;
    const record = isStateRecord(rawRecord) ? rawRecord : {};
    normalised[stage.id] = {
      stars: safeStateInteger(record.stars, 1, 1, 3),
      times: safeStateInteger(record.times, 1, 1),
      completedAt: typeof record.completedAt === "string" ? record.completedAt : ""
    };
  }
  return normalised;
}

function normaliseGardenState(rawGarden, completedCount, completedRuns = completedCount) {
  const source = isStateRecord(rawGarden) ? rawGarden : {};
  const fixedDecorations = ["home", "school", "tree", "boutique", "garden"];
  const allowedDecorations = new Set([
    ...fixedDecorations,
    ...GARDEN_GROWTH_DEFS.map((decor) => decor.id),
    GARDEN_FINAL_DECOR.id
  ]);
  const allowedPurchases = new Set(GARDEN_DECOR_SHOP.map((decor) => decor.id));
  const decorations = Array.isArray(source.decorations)
    ? source.decorations.filter((id) => typeof id === "string" && allowedDecorations.has(id))
    : [];
  const purchased = Array.isArray(source.purchased)
    ? source.purchased.filter((id) => typeof id === "string" && allowedPurchases.has(id))
    : [];
  const legacy = source.schemaVersion !== 2;
  const untouched = legacy && completedRuns === 0 && !purchased.length && !source.mapExpanded
    && source.treeReady !== false && source.harvestReady !== false
    && decorations.every(id => fixedDecorations.includes(id));
  const allCleared = ALL_STAGES.length > 0 && completedCount === ALL_STAGES.length;
  const inheritedExpansion = legacy ? untouched ? 0 : source.mapExpanded && allCleared ? 4 : 1
    : safeStateInteger(source.inheritedExpansion, 0, 0, 4);
  const available = Math.max(inheritedExpansion, GARDEN_EXPANSIONS.reduce((level, step, index) => completedRuns >= step.at ? index : level, 0));
  const expansionLevel = Math.max(inheritedExpansion, Math.min(available, safeStateInteger(source.expansionLevel, inheritedExpansion, 0, 4)));
  const mapExpanded = expansionLevel === 4;
  const mergedDecorations = [...new Set(["home", ...decorations.filter(id => !untouched || !fixedDecorations.includes(id))])];
  for (const facility of GARDEN_FACILITIES) {
    if (completedRuns >= facility.at && !mergedDecorations.includes(facility.id)) mergedDecorations.push(facility.id);
  }
  for (const decor of GARDEN_GROWTH_DEFS) {
    if (completedCount >= decor.at && !mergedDecorations.includes(decor.id)) mergedDecorations.push(decor.id);
  }
  if (mapExpanded && !mergedDecorations.includes(GARDEN_FINAL_DECOR.id)) mergedDecorations.push(GARDEN_FINAL_DECOR.id);
  const ownedFloors = [...new Set(["grass", ...(Array.isArray(source.ownedFloors) ? source.ownedFloors.filter(id => GARDEN_FLOORS.some(floor => floor.id === id)) : []), ...GARDEN_FLOORS.filter(floor => completedRuns >= floor.at).map(floor => floor.id)])];
  const size = GARDEN_EXPANSIONS[expansionLevel].size;
  const ownedIds = [...mergedDecorations.filter(id => mapExpanded || id !== GARDEN_FINAL_DECOR.id), ...purchased, "avatar", ...(allCleared ? ["monument"] : [])];
  const layout = normaliseGardenLayout(source.layout, [...new Set(ownedIds)], size, legacy && !untouched);
  const floorTiles = {};
  if (isStateRecord(source.floorTiles)) for (const [key, value] of Object.entries(source.floorTiles)) {
    const match = /^(\d+),(\d+)$/.exec(key);
    if (match && key === `${Number(match[1])},${Number(match[2])}` && gardenCellIsLand(Number(match[1]), Number(match[2]), size) && ownedFloors.includes(value)) floorTiles[key] = value;
  }
  return {
    schemaVersion: 2,
    treeReady: mergedDecorations.includes("tree") && (typeof source.treeReady === "boolean" ? source.treeReady : true),
    harvestReady: mergedDecorations.includes("garden") && (typeof source.harvestReady === "boolean" ? source.harvestReady : true),
    decorations: mergedDecorations.filter((id) => mapExpanded || id !== GARDEN_FINAL_DECOR.id),
    purchased: [...new Set(purchased)],
    mapExpanded, expansionLevel, inheritedExpansion, layout, ownedFloors,
    baseFloor: ownedFloors.includes(source.baseFloor) ? source.baseFloor : "grass",
    floorTiles
  };
}

function gardenCellIsLand(x, y, size = gardenMapSize()) {
  return Number.isInteger(x) && Number.isInteger(y) && x >= 1 && y >= 1 && x < size - 1 && y < size - 1;
}

function gardenItemFootprint(id) {
  return GARDEN_FACILITIES.find(item => item.id === id)?.footprint || 1;
}

function gardenItemCells(id, position) {
  if (!position || !Number.isInteger(position.x) || !Number.isInteger(position.y)) return [];
  const side = gardenItemFootprint(id);
  return Array.from({ length: side * side }, (_, index) => ({ x: position.x + index % side, y: position.y + Math.floor(index / side) }));
}

function gardenItemFits(id, x, y, size = gardenMapSize()) {
  const side = gardenItemFootprint(id);
  return gardenCellIsLand(x, y, size) && gardenCellIsLand(x + side - 1, y + side - 1, size);
}

function gardenItemAt(layout, x, y, exceptId) {
  return Object.keys(layout).find(id => id !== exceptId && gardenItemCells(id, layout[id]).some(cell => cell.x === x && cell.y === y));
}

// Swaps are safe only between equally sized, already placed items. A delivery
// never silently stores a neighbour, and all four building cells are reserved.
function gardenPlacementPlan(id, x, y, layout, size = gardenMapSize()) {
  if (!gardenItemFits(id, x, y, size)) return { valid: false, reason: "edge" };
  const blockers = [...new Set(gardenItemCells(id, { x, y }).map(cell => gardenItemAt(layout, cell.x, cell.y, id)).filter(Boolean))];
  if (!blockers.length) return { valid: true };
  const other = blockers[0], original = layout[id];
  if (blockers.length === 1 && original && gardenItemFootprint(id) === gardenItemFootprint(other)
      && layout[other].x === x && layout[other].y === y
      && gardenItemFits(other, original.x, original.y, size)
      && gardenItemCells(other, original).every(cell => !Object.keys(layout).some(candidate => candidate !== id && candidate !== other && gardenItemCells(candidate, layout[candidate]).some(point => point.x === cell.x && point.y === cell.y)))) {
    return { valid: true, swap: other };
  }
  return { valid: false, reason: "occupied" };
}

function gardenDefaultPosition(id, size) {
  const mid = Math.floor(size / 2);
  const fixed = { home: { x: 1, y: 1 }, avatar: { x: 3, y: 2 }, school: { x: size - 3, y: 1 }, tree: { x: 1, y: size - 2 }, boutique: { x: mid, y: size - 3 }, garden: { x: size - 2, y: mid } };
  const offsets = { "garden-first-flower": [-2, -1], "garden-picnic-chair": [-1, -2], "garden-nap-bed": [-2, 1], "garden-shop-flower": [1, -2], "garden-shop-chair": [0, -1], "garden-shop-bed": [-1, 0] };
  const offset = offsets[id], step = Math.max(1, Math.floor(size / 6));
  if (id === "monument") return { x: mid + step, y: mid + step };
  if (offset) return { x: mid + offset[0] * step, y: mid + offset[1] * step };
  return fixed[id] || [...GARDEN_GROWTH_DEFS, ...GARDEN_DECOR_SHOP, GARDEN_FINAL_DECOR].find(item => item.id === id)?.position(size) || { x: mid, y: mid };
}

function normaliseGardenLayout(raw, ids, size, legacy = false) {
  const source = isStateRecord(raw) ? raw : {};
  const result = {}, occupied = new Set();
  const ordered = [...new Set([...["home", "avatar"].filter(id => ids.includes(id)), ...ids])];
  for (const id of ordered) {
    const entry = source[id];
    if (entry === null && !["home", "avatar"].includes(id)) { result[id] = null; continue; }
    if (entry === undefined && !legacy && !["home", "avatar"].includes(id)) { result[id] = null; continue; }
    const fallback = gardenDefaultPosition(id, size);
    const max = size - 1 - gardenItemFootprint(id);
    let x = safeStateInteger(entry?.x, fallback.x, 1, max);
    let y = safeStateInteger(entry?.y, fallback.y, 1, max);
    const freeAt = point => gardenItemFits(id, point.x, point.y, size) && gardenItemCells(id, point).every(cell => !occupied.has(`${cell.x},${cell.y}`));
    if (!freeAt({ x, y })) {
      // Keep moved legacy items near their old spot, with deterministic ties.
      const free = Array.from({ length: max * max }, (_, index) => ({ x: index % max + 1, y: Math.floor(index / max) + 1 }))
        .sort((a, b) => (Math.abs(a.x - x) + Math.abs(a.y - y)) - (Math.abs(b.x - x) + Math.abs(b.y - y)))
        .find(freeAt);
      if (!free) { result[id] = null; continue; }
      ({ x, y } = free);
    }
    for (const cell of gardenItemCells(id, { x, y })) occupied.add(`${cell.x},${cell.y}`);
    result[id] = { x, y };
  }
  return result;
}

// 以前の「かたちしわけ」は表示順を value に混ぜていた（circle:0 の形式）。
// 今は表示・採点とも形IDそのものにそろえたため、端末に残っている
// たからものノートも開き直したときに解けるよう、保存済み問題だけを
// 互換形式へ移行する。ここは採点ではなく保存データの一回限りの正規化。
function normaliseSavedQuestion(question) {
  if (!isStateRecord(question)) return question;
  if (question.semanticVersion === 1) return refreshFractionHints(question.mode === "length" ? synchroniseQuestionSemantics(question) : question);
  const pool = [...Object.values(QUESTION_VISUALS).flat(), ...Object.values(QUEST_SCENE_VARIANTS).flat(), ...PATTERN_SETS.flatMap((set) => set.tokens)];
  const aliases = { "flower-blue": "flower-tulip", "flower-mint": "flower-yellow", sun: "star", night: "crystal", "garden-block": "garden-white-flower" };
  const canonicalId = (id) => typeof id === "string" && Object.hasOwn(aliases, id) ? aliases[id] : id;
  const token = (value) => {
    if (!isStateRecord(value) || !value.src) return value;
    const id = canonicalId(value.id);
    const canonical = pool.find((item) => item.id === id && item.src === value.src) || pool.find((item) => item.id === id);
    if (value.id === "diamond") return { ...value, name: "ひしがた", src: spriteUrl("shapeDiamond") };
    return canonical ? { ...value, ...canonical } : value;
  };
  let q = { ...question, semanticVersion: 1 };
  if (q.mode === "pattern") {
    q.answer = Array.isArray(q.answer) ? q.answer.map(canonicalId) : canonicalId(q.answer);
    if (Array.isArray(q.patternSlots)) q.patternSlots = q.patternSlots.map(canonicalId);
  }
  for (const field of ["visual", "sceneVisual", "gameVisual"]) q[field] = token(q[field]);
  for (const field of ["options", "sequence", "placeChoices", "sortItems"]) if (Array.isArray(q[field])) {
    q[field] = q[field].map((item) => isStateRecord(item) ? { ...token(item), ...(q.mode === "pattern" && typeof item.value === "string" ? { value: canonicalId(item.value) } : {}), ...(item.visual ? { visual: token(item.visual) } : {}) } : item);
  }
  if (q.world?.item) q.world = { ...q.world, item: token(q.world.item) };
  const material = q.world?.item?.src ? q.world.item : q.sceneVisual || (typeof q.visual === "object" ? q.visual : null);
  const name = material?.name || "もの";
  if (q.mode === "count") {
    q.prompt = q.responseType === "number-choice" ? `${name}は いくつ？` : q.responseType === "slot-fill" ? `${name}を ${q.answer}こ、トレーへ はこぼう` : `${name}を ${q.answer}こ えらぼう`;
  } else if (q.mode === "compare") q.subPrompt = `${name}のかずをくらべよう。`;
  else if (q.mode === "size") q.prompt = q.responseType === "sequence" ? `${name}を ちいさいじゅんに ならべよう` : `いちばん ${q.prompt.includes("ちいさい") ? "ちいさい" : "おおきい"} ${name}はどれ？`;
  else if (q.mode === "order") q.prompt = `${q.fromRight ? "みぎ" : "ひだり"}から ${q.ordinal}ばんめの ${name}はどれ？`;
  if (q.mode === "number") q.visual = renderPlaceValueVisual(q.tens, q.ones, material);
  if (["add", "subtract"].includes(q.mode)) q.visual = renderBridgeVisual(q.left, q.right, q.mode === "add" ? "+" : "-", material);
  if (q.mode === "shape" && q.responseType === "place" && q.placeKind === "shape" && Array.isArray(q.placeChoices)) {
    q.placeChoices = q.placeChoices.map((choice) => {
      if (!isStateRecord(choice) || typeof choice.id !== "string") return choice;
      return { ...choice, value: choice.id };
    });
  }
  return refreshFractionHints(synchroniseQuestionSemantics(q));
}

function withDerivedState(nextState) {
  if (!isStateRecord(nextState)) nextState = {};
  nextState.completedStages = normaliseCompletedStages(nextState.completedStages);
  const completedCount = completedStageCount(nextState);
  if (!isStateRecord(nextState.stats)) nextState.stats = {};
  const completionTimes = Object.values(nextState.completedStages)
    .reduce((total, record) => total + safeStateInteger(record?.times, 1, 1), 0);
  nextState.stats.level = safeStateInteger(nextState.stats.level, 1, 1);
  nextState.stats.xp = safeStateInteger(nextState.stats.xp);
  nextState.stats.coins = safeStateInteger(nextState.stats.coins);
  nextState.stats.shards = safeStateInteger(nextState.stats.shards);
  nextState.stats.jewels = safeStateInteger(nextState.stats.jewels);
  nextState.stats.stickers = safeStateInteger(nextState.stats.stickers);
  nextState.stats.streak = safeStateInteger(nextState.stats.streak, 1, 1);
  nextState.stats.totalAnswers = safeStateInteger(nextState.stats.totalAnswers);
  nextState.stats.totalStages = Math.max(safeStateInteger(nextState.stats.totalStages), completionTimes);
  if (!isStateRecord(nextState.mastery)) nextState.mastery = {};
  for (const area of ALL_AREAS) {
    nextState.mastery[area.id] = safeStateInteger(nextState.mastery[area.id], 0, 0, 100);
  }
  nextState.notebook = Array.isArray(nextState.notebook)
    ? nextState.notebook
      .filter((note) => isStateRecord(note) && typeof note.id === "string" && isStateRecord(note.question))
      .map((note) => ({ ...note, question: normaliseSavedQuestion(note.question) }))
    : [];
  if (!isStateRecord(nextState.settings)) nextState.settings = {};
  if (typeof nextState.settings.soundEnabled !== "boolean") nextState.settings.soundEnabled = true;
  if (typeof nextState.settings.parentPin !== "string" || !/^\d{4,8}$/.test(nextState.settings.parentPin)) nextState.settings.parentPin = "";
  if (!STUDY_VOLUMES[nextState.settings.studyVolume]) nextState.settings.studyVolume = "short";
  nextState.pets = normalisePets(nextState.pets);
  nextState.atelier = normaliseAtelier(nextState.atelier);
  nextState.stats.questionSeed = safeStateInteger(nextState.stats.questionSeed, 0, 0, 996);
  nextState.learning = normaliseLearningState(nextState.learning);
  if (window?.MathGardenPlacement?.normalise) nextState.placement = window.MathGardenPlacement.normalise(nextState.placement);
  if (window?.MathGardenHissan?.normalise) nextState.hissan = window.MathGardenHissan.normalise(nextState.hissan);
  if (!isStateRecord(nextState.likedIslands)) nextState.likedIslands = {};
  if (!isStateRecord(nextState.stickers)) nextState.stickers = { owned: ["stk_flower_count"], board: ["stk_flower_count"], layout: {}, duplicates: 0 };
  const knownStickerIds = new Set(STICKER_DEFS.map((sticker) => sticker.id));
  nextState.stickers.owned = Array.isArray(nextState.stickers.owned)
    ? [...new Set(nextState.stickers.owned.filter((id) => typeof id === "string" && knownStickerIds.has(id)))]
    : [];
  if (!nextState.stickers.owned.length) nextState.stickers.owned = ["stk_flower_count"];
  const emptyStickerBoard = Array.isArray(nextState.stickers.board) && nextState.stickers.board.length === 0;
  nextState.stickers.board = Array.isArray(nextState.stickers.board)
    ? [...new Set(nextState.stickers.board.filter((id) => nextState.stickers.owned.includes(id)))].slice(0, 12)
    : [];
  if (!nextState.stickers.board.length && !emptyStickerBoard) nextState.stickers.board = nextState.stickers.owned.slice(0, 6);
  nextState.stickers.duplicates = safeStateInteger(nextState.stickers.duplicates);
  nextState.stickers.layout = normaliseStickerLayout(nextState.stickers.layout, nextState.stickers.board);
  if (!isStateRecord(nextState.onboarding)) nextState.onboarding = {};
  nextState.onboarding.firstGlowUpClaimed = Boolean(nextState.onboarding.firstGlowUpClaimed);
  nextState.garden = normaliseGardenState(nextState.garden, completedCount, completionTimes);
  nextState.stats.stickers = nextState.stickers.owned.length;
  if (!isStateRecord(nextState.equipment)) nextState.equipment = {};
  if (!Array.isArray(nextState.inventory)) nextState.inventory = [];
  // 旧い長靴下・靴を保存していた子も、短丈の分離レイヤーへ安全に移行する。
  // 同じスロットで見た目が消えたり、旧素材が混ざったりしないよう inventory
  // と equipment の両方を先に置き換える。
  const footwearMigration = {
    shoes_cream: "shoes_v2_pink",
    shoes_lavender: "shoes_v2_purple",
    shoes_v2_yellow: "shoes_v2_pink",
    shoes_v2_sneaker: "shoes_v2_purple",
    shoes_v2_green: "shoes_v2_pink",
    shoes_v2_pink2: "shoes_v2_pink",
    socks_stripe: "socks_cream",
    socks_yellow: "socks_cream",
    socks_blue: "socks_cream",
    socks_green: "socks_cream"
  };
  nextState.inventory = [...new Set(nextState.inventory
    .filter((id) => typeof id === "string")
    .map((id) => footwearMigration[id] || id)
    .filter((id) => Boolean(itemById(id))))];
  for (const [slot, id] of Object.entries(nextState.equipment)) {
    if (footwearMigration[id]) nextState.equipment[slot] = footwearMigration[id];
  }
  // 旧 id からの移行は、スロット検証より先に行う。
  if (nextState.equipment.hair === "hair_berry") nextState.equipment.hair = "hair_v2_bob_pink";
  if (nextState.equipment.hair === "hair_mint_bob") nextState.equipment.hair = "hair_v2_wavy";
  // はじめに必要なコーデだけは、既存セーブにも安全に補う。
  // すでに持っている収集品は消さず、これからの新規セーブではごほうび解放にする。
  for (const item of STARTER_ITEMS) {
    if (!nextState.inventory.includes(item.id)) nextState.inventory.push(item.id);
  }
  const defaultEq = {
    hair: "hair_v2_bob_pink",
    eyes: "eyes_open",
    brows: "brows_normal",
    mouth: "mouth_smile",
    blush: "blush_normal",
    // 旧セーブでも素体の下着が見えないよう、常に安全な基本コーデを持たせる。
    top: "top_cotton",
    bottom: "bottom_mint",
    socks: "socks_cream",
    shoes: "shoes_v2_pink"
  };
  // 保存データのIDをそのまま重ねると、壊れた古い保存で「髪をワンピースに
  // 描く」ような別スロット混入が起きる。全装備をスロット単位で作り直し、
  // 必須枠は安全な初期コーデへ、任意枠は未装着へ戻す。
  const previousEquipment = nextState.equipment;
  nextState.equipment = Object.fromEntries(DRESS_SLOTS.map((slot) => {
    const candidate = previousEquipment[slot];
    const item = itemById(candidate);
    const safeId = item?.slot === slot ? item.id : (defaultEq[slot] || null);
    if (safeId && !nextState.inventory.includes(safeId)) nextState.inventory.push(safeId);
    return [slot, safeId];
  }));
  // レベルや古いIDでは広がらない。実在する全ステージを終え、本人がボタンを
  // 押したときだけ 8×8 から 14×14 へ庭を拡張する。
  nextState.stats.landSize = gardenMapSize(nextState);
  nextState.stats.freeProgress = completedCount;
  return nextState;
}

function createPetRecord(species) {
  const firstTrick = PET_TRICKS.find((trick) => trick.speciesId === species.id && trick.level === 1);
  return {
    id: `pet-${species.id}`,
    speciesId: species.id,
    name: species.nickname,
    level: 1,
    xp: 0,
    evolution: 0,
    appearance: 0,
    tricks: firstTrick ? [firstTrick.id] : [],
    awardKeys: []
  };
}

function createPetState() {
  const roster = PET_SPECIES.map(createPetRecord);
  return { activeId: roster[0].id, roster };
}

function petSpeciesById(speciesId) {
  return PET_SPECIES.find((species) => species.id === speciesId) || null;
}

function petTrickById(trickId) {
  return PET_TRICKS.find((trick) => trick.id === trickId) || null;
}

function normalisePets(rawPets) {
  const rawRoster = Array.isArray(rawPets?.roster) ? rawPets.roster : [];
  const roster = PET_SPECIES.map((species) => {
    const fallback = createPetRecord(species);
    const raw = rawRoster.find((pet) => pet?.speciesId === species.id) || fallback;
    const level = Math.max(1, Math.min(PET_MAX_LEVEL, Math.floor(Number(raw.level) || 1)));
    const validTricks = PET_TRICKS
      .filter((trick) => trick.speciesId === species.id)
      .map((trick) => trick.id);
    const unlockedTricks = new Set(PET_TRICKS
      .filter((trick) => trick.speciesId === species.id && trick.level <= level)
      .map((trick) => trick.id));
    const firstTrick = validTricks[0];
    const tricks = [...new Set((Array.isArray(raw.tricks) ? raw.tricks : [])
      .filter((id) => validTricks.includes(id) && unlockedTricks.has(id)))];
    if (firstTrick && !tricks.includes(firstTrick)) tricks.unshift(firstTrick);
    const maxEvolution = petEvolutionAvailableForLevel(level);
    const evolution = Math.max(0, Math.min(maxEvolution, Math.floor(Number(raw.evolution) || 0)));
    // Old saves displayed the highest form they had actually evolved to.
    // An explicitly selected baby form (0) is a preference, not missing data.
    const appearanceValue = raw.appearance === undefined || raw.appearance === null ? evolution : Number(raw.appearance);
    const appearance = Number.isInteger(appearanceValue) ? Math.max(0, Math.min(evolution, appearanceValue)) : evolution;
    const xp = level >= PET_MAX_LEVEL
      ? 0
      : Math.min(Math.max(0, Math.floor(Number(raw.xp) || 0)), Math.max(0, petXpToNext(level) - 1));
    return {
      id: `pet-${species.id}`,
      speciesId: species.id,
      // 名前は候補固定。個人情報を入力・保存しない。
      name: species.nickname,
      level,
      xp,
      evolution,
      appearance,
      tricks,
      awardKeys: [...new Set((Array.isArray(raw.awardKeys) ? raw.awardKeys : []).filter((key) => typeof key === "string"))].slice(-240)
    };
  });
  const activeId = roster.some((pet) => pet.id === rawPets?.activeId) ? rawPets.activeId : roster[0].id;
  // 旧セーブの廃止済みペット報酬履歴は、学習と進化の記録を壊さずにここで破棄する。
  return { activeId, roster };
}

function activePet() {
  return state.pets?.roster?.find((pet) => pet.id === state.pets.activeId) || state.pets?.roster?.[0] || null;
}

function speciesForPet(pet) {
  return pet ? petSpeciesById(pet.speciesId) : null;
}

function tricksForPet(pet) {
  return pet ? PET_TRICKS.filter((trick) => trick.speciesId === pet.speciesId) : [];
}

function petXpToNext(level) {
  return 18 + Math.max(1, Number(level) || 1) * 8;
}

function petEvolutionAvailableForLevel(level) {
  return PET_EVOLUTION_STAGES.reduce((available, stage, index) => Number(level) >= stage.level ? index : available, 0);
}

function petEvolutionName(pet) {
  return PET_EVOLUTION_STAGES[pet?.evolution || 0]?.name || PET_EVOLUTION_STAGES[0].name;
}

function petAppearanceFor(pet) {
  const appearance = Number(pet?.appearance ?? pet?.evolution ?? 0);
  return Number.isInteger(appearance) ? Math.max(0, Math.min(Number(pet?.evolution) || 0, appearance)) : Number(pet?.evolution) || 0;
}

function petAppearanceName(pet) {
  return PET_EVOLUTION_STAGES[petAppearanceFor(pet)]?.name || PET_EVOLUTION_STAGES[0].name;
}

function petXpPercent(pet) {
  if (!pet || pet.level >= PET_MAX_LEVEL) return 100;
  return Math.max(0, Math.min(100, Math.round((pet.xp / petXpToNext(pet.level)) * 100)));
}

function addPetXp(pet, amount) {
  if (!pet || amount <= 0 || pet.level >= PET_MAX_LEVEL) return { levels: 0, previousLevel: pet?.level || 1 };
  const previousLevel = pet.level;
  pet.xp += amount;
  let levels = 0;
  while (pet.level < PET_MAX_LEVEL && pet.xp >= petXpToNext(pet.level)) {
    pet.xp -= petXpToNext(pet.level);
    pet.level += 1;
    levels += 1;
  }
  return { levels, previousLevel };
}

function grantPetLearningXp(stage, { firstCompletion = false, awardId } = {}) {
  const pet = activePet();
  if (!pet) return null;
  const key = awardId || `${stage?.id || "study"}:${state.stats.totalStages + 1}`;
  if (pet.awardKeys.includes(key)) {
    return { petId: pet.id, petName: pet.name, amount: 0, level: pet.level, duplicate: true, newTricks: [] };
  }
  const atMax = pet.level >= PET_MAX_LEVEL;
  const amount = atMax ? 0 : (firstCompletion ? PET_XP.firstStage : PET_XP.replayStage);
  const before = pet.level;
  const outcome = addPetXp(pet, amount);
  pet.awardKeys.push(key);
  pet.awardKeys = pet.awardKeys.slice(-240);
  const newTricks = tricksForPet(pet).filter((trick) => trick.level > before && trick.level <= pet.level && !pet.tricks.includes(trick.id));
  return {
    petId: pet.id,
    petName: pet.name,
    amount,
    level: pet.level,
    levels: outcome.levels,
    atMax,
    canEvolve: petEvolutionAvailableForLevel(pet.level) > pet.evolution,
    newTricks
  };
}

function selectPet(petId) {
  if (!state.pets.roster.some((pet) => pet.id === petId)) return;
  state.pets.activeId = petId;
  view.petMotion = null;
  saveState();
  render();
  playSfx("tap", "pet");
}

function selectPetAppearance(petId, value) {
  const pet = state.pets.roster.find((candidate) => candidate.id === petId);
  if (!pet || value === null || value === undefined || String(value).trim() === "") return null;
  const appearance = Number(value);
  if (!Number.isInteger(appearance) || appearance < 0 || appearance > pet.evolution) return null;
  if (petAppearanceFor(pet) === appearance) return pet;
  pet.appearance = appearance;
  view.petMotion = { petId, motion: "idle", token: Date.now() };
  saveState();
  render();
  playSfx("tap", "pet");
  return pet;
}

function evolvePet(petId = state.pets.activeId) {
  const pet = state.pets.roster.find((candidate) => candidate.id === petId);
  if (!pet) return null;
  const available = petEvolutionAvailableForLevel(pet.level);
  if (pet.evolution >= available) {
    toast(`レベル ${PET_EVOLUTION_STAGES[Math.min(pet.evolution + 1, PET_EVOLUTION_STAGES.length - 1)].level} で、つぎのへんしんだよ。`);
    return null;
  }
  pet.evolution += 1;
  pet.appearance = pet.evolution;
  view.petMotion = { petId, motion: "sparkle", token: Date.now() };
  saveState();
  render();
  toast(`${pet.name}が ${petEvolutionName(pet)} に へんしん！`, { key: "pet-feedback" });
  playSfx("reward", "pet");
  triggerMoment("reward", "pet");
  return pet;
}

function practicePetTrick(petId, trickId) {
  const pet = state.pets.roster.find((candidate) => candidate.id === petId);
  const trick = petTrickById(trickId);
  if (!pet || !trick || trick.speciesId !== pet.speciesId) return null;
  if (pet.level < trick.level) {
    toast(`この芸は レベル ${trick.level} で おぼえられるよ。`);
    return null;
  }
  const newlyLearned = !pet.tricks.includes(trick.id);
  if (newlyLearned) pet.tricks.push(trick.id);
  saveState();
  startPetPlayMotion(pet, trick.motion, trick.id);
  toast(newlyLearned ? `${pet.name}は「${trick.name}」を おぼえた！` : `${pet.name}の「${trick.name}」！`, { key: "pet-feedback" });
  playSfx(newlyLearned ? "reward" : "tap", "pet");
  return { pet, trick, newlyLearned };
}

function patActivePet() {
  const pet = activePet();
  if (!pet) return;
  startPetPlayMotion(pet, "cuddle");
  toast(`${pet.name}「もっと なでなで！」`, { key: "pet-feedback" });
  playSfx("tap", "pet");
}

function learnedPetTricks(pet) {
  return tricksForPet(pet).filter(trick => pet.tricks.includes(trick.id) && pet.level >= trick.level);
}

function startPetPlayMotion(pet, motion, trickId = null) {
  const token = ++petMotionSequence;
  view.petMotion = { petId: pet.id, motion, trickId, token, origin: "play-zone" };
  render();
  window.setTimeout(() => {
    if (view.petMotion?.origin !== "play-zone" || view.petMotion.token !== token || view.petMotion.petId !== pet.id) return;
    view.petMotion = null;
    if (view.screen === "pets") render();
  }, 1400);
}

function performPetCommand(petId, trickId) {
  const pet = activePet();
  const trick = petTrickById(trickId);
  // 見せるコマンドは学習済みの技だけ。未学習の技を、再生で習得させない。
  if (!pet || pet.id !== petId || !trick || !learnedPetTricks(pet).some(candidate => candidate.id === trickId)) return null;
  startPetPlayMotion(pet, trick.motion, trick.id);
  playMiniTone("harp", learnedPetTricks(pet).findIndex(candidate => candidate.id === trickId), true);
  return { pet, trick };
}

function learningMetricDefaults() {
  return {
    attempts: 0,
    questions: 0,
    correct: 0,
    firstTryCorrect: 0,
    hints: 0,
    replays: 0,
    responseMs: 0
  };
}

function skillProfileDefaults() {
  return {
    levelOffset: 0,
    recent: [],
    misconceptionCounts: {},
    reviewDue: 0,
    recentMissionIds: [],
    // 問題バンクでは「前回と同じ見せ方」を避けるための、端末内だけの履歴。
    recentTemplateIds: [],
    recentAnswerKeys: [],
    exposures: 0
  };
}

function createLearningState() {
  return {
    byArea: Object.fromEntries(ALL_AREAS.map((area) => [area.id, learningMetricDefaults()])),
    bySkill: Object.fromEntries(ALL_AREAS.map((area) => [area.id, skillProfileDefaults()])),
    sessionsStarted: 0,
    sessionsCompleted: 0,
    reviewsStarted: 0,
    helpSelection: { mode: "auto", domain: "all" },
    daily: { day: "", completedStages: 0 }
  };
}

function safeLearningNumber(value) {
  return typeof value === "number" && Number.isFinite(value) && value >= 0 ? value : 0;
}

function normaliseHelpSelection(value) {
  const source = value && typeof value === "object" ? value : {};
  return { mode: source.mode === "free" ? "free" : "auto", domain: Object.keys(HELP_DOMAIN_OPTIONS).includes(source.domain) ? source.domain : "all" };
}

function helpDomainForStage(stage) {
  const tested = window?.MathGardenPlacement?.domainForStage?.(stage);
  if (tested) return tested;
  if (stage?.curriculum?.strand === "データ" || stage?.curriculum?.renderer === "chart") return "data";
  if (["shape", "pattern"].includes(stage?.mode) || ["geometry", "proof"].includes(stage?.curriculum?.renderer)) return "space";
  if (["size", "order", "clock", "length"].includes(stage?.mode) || ["measure", "area"].includes(stage?.curriculum?.renderer)) return "measure";
  return "number";
}

function automaticHelpRecommendation() {
  const selection = normaliseHelpSelection(state.learning.helpSelection);
  const snapshot = placementEngine?.getSnapshot?.();
  const records = Object.entries(snapshot?.skills || {}).map(([id, record]) => ({ stage: ALL_STAGES.find((stage) => stage.id === id), record })).filter((entry) => entry.stage);
  const hasEvidence = snapshot?.phase === "complete" || Boolean(snapshot?.previousResult) || records.some((entry) => entry.record.completed > 0) || Object.values(state.learning.byArea).some((metric) => metric.questions >= 3);
  if (selection.domain !== "all") {
    const picked = recommendStage(selection.domain);
    return { ...picked, hasEvidence, reason: picked.placement ? "おためしと 最近のおてつだいから、えらんだよ。" : hasEvidence ? "最近のおてつだいを見て、えらんだよ。" : "小さなおてつだいから、いっしょに あそぼう。" };
  }
  if (!snapshot || (!snapshot.previousResult && snapshot.phase !== "complete" && !records.some((entry) => entry.record.completed > 0))) {
    return { ...recommendStage(), hasEvidence, reason: hasEvidence ? "最近のおてつだいを見て、えらんだよ。" : "はじめてなら、ここから。おためしでも 入口をさがせるよ。" };
  }
  const candidates = Object.keys(HELP_DOMAIN_OPTIONS).map((domain) => {
    const domainRecords = records.filter((entry) => helpDomainForStage(entry.stage) === domain && entry.record.completed > 0);
    const sessionOrder = (entry) => Number(entry.record.lastSessionKey?.split(":").at(-1)) || 0;
    const latest = domainRecords.sort((a, b) => sessionOrder(b) - sessionOrder(a))[0];
    const recent = latest?.record.recent || [];
    const independent = recent.filter((attempt) => attempt.independent).length;
    return { domain, recommendation: recommendStage(domain), completed: domainRecords.reduce((sum, entry) => sum + entry.record.completed, 0), weak: recent.length >= 3 && independent / recent.length <= 0.5, score: recent.length ? independent / recent.length : 1 };
  });
  const needsSupport = candidates.filter((candidate) => candidate.weak).sort((a, b) => a.score - b.score)[0];
  const picked = needsSupport || candidates.sort((a, b) => a.completed - b.completed || Number(b.domain === snapshot.preferredDomain) - Number(a.domain === snapshot.preferredDomain))[0];
  return { ...picked.recommendation, hasEvidence, reason: needsSupport ? "ゆっくり、もうすこし いっしょに あそぼう。" : "お店ごとの ぴったりを見て、えらんだよ。" };
}

function openHelpPicker(mode) {
  stopQuestionSpeech();
  state.learning.helpSelection = normaliseHelpSelection({ ...state.learning.helpSelection, ...(mode ? { mode } : {}) });
  view.helpPickerOpen = true;
  const changed = view.screen !== "learn";
  if (changed || document.querySelector("#screen")?.dataset?.view === "play") view.resetScreenScroll = true;
  view.screen = "learn";
  render();
  if (changed) focusMainContent();
}

function resumeHelp() {
  if (!view.active) return;
  view.helpPickerOpen = false;
  view.screen = "learn";
  view.resetScreenScroll = true;
  render();
  focusMainContent();
}

function helpSessionKey(active) {
  return active?.isTreasure ? `treasure:${active.noteId}` : active?.stage.id;
}

function helpInteractionFields() {
  return ["active", "world", "sequence", "placement", "pairLinks", "pairFirst", "routeCursor", "routeNote", "patternSlots", "builder", "clockDraft", "soundGame", "curriculumInput", "feedback", "hintIndex", "fractionHintClosed"];
}

function parkCurrentHelp() {
  if (!view.active) return;
  view.pausedHelps ||= {};
  view.pausedHelps[helpSessionKey(view.active)] = { ...Object.fromEntries(helpInteractionFields().map((key) => [key, view[key]])), selected: [...view.selected] };
}

function startHelp(stageId, options = {}) {
  if (helpSessionKey(view.active) === stageId) {
    if (options.coop) view.active.coop = true;
    resumeHelp();
    return;
  }
  const saved = view.pausedHelps?.[stageId];
  if (!saved && !ALL_STAGES.some((stage) => stage.id === stageId)) return;
  stopQuestionSpeech();
  parkCurrentHelp();
  if (saved) {
    delete view.pausedHelps[stageId];
    for (const key of helpInteractionFields()) view[key] = saved[key];
    view.selected = new Set(saved.selected);
    view.world = view.active.stage.worldId || saved.world || "w0";
    view.result = null;
    if (options.coop) view.active.coop = true;
    resumeHelp();
  } else startStage(stageId, options);
}

function normaliseLearningState(candidate) {
  const source = candidate && typeof candidate === "object" ? candidate : {};
  const normalised = createLearningState();
  const sourceByArea = source.byArea && typeof source.byArea === "object" ? source.byArea : {};
  for (const area of ALL_AREAS) {
    const sourceMetric = sourceByArea[area.id] && typeof sourceByArea[area.id] === "object" ? sourceByArea[area.id] : {};
    const targetMetric = normalised.byArea[area.id];
    for (const key of Object.keys(targetMetric)) targetMetric[key] = safeLearningNumber(sourceMetric[key]);
  }
  const sourceBySkill = source.bySkill && typeof source.bySkill === "object" ? source.bySkill : {};
  for (const area of ALL_AREAS) {
    const sourceProfile = sourceBySkill[area.id] && typeof sourceBySkill[area.id] === "object" ? sourceBySkill[area.id] : {};
    const targetProfile = normalised.bySkill[area.id];
    targetProfile.levelOffset = Math.max(-1, Math.min(1, Math.round(Number(sourceProfile.levelOffset) || 0)));
    targetProfile.recent = Array.isArray(sourceProfile.recent)
      ? sourceProfile.recent.map((value) => value ? 1 : 0).slice(-5)
      : [];
    targetProfile.reviewDue = safeLearningNumber(sourceProfile.reviewDue);
    targetProfile.recentMissionIds = Array.isArray(sourceProfile.recentMissionIds)
      ? sourceProfile.recentMissionIds.filter((value) => typeof value === "string").slice(-8)
      : [];
    targetProfile.recentTemplateIds = Array.isArray(sourceProfile.recentTemplateIds)
      ? sourceProfile.recentTemplateIds.filter((value) => typeof value === "string").slice(-15)
      : [];
    targetProfile.recentAnswerKeys = Array.isArray(sourceProfile.recentAnswerKeys)
      ? sourceProfile.recentAnswerKeys.filter((value) => typeof value === "string").slice(-15)
      : [];
    targetProfile.exposures = safeLearningNumber(sourceProfile.exposures);
    const misconceptionSource = sourceProfile.misconceptionCounts && typeof sourceProfile.misconceptionCounts === "object"
      ? sourceProfile.misconceptionCounts
      : {};
    targetProfile.misconceptionCounts = Object.fromEntries(
      Object.entries(misconceptionSource)
        .filter(([key, value]) => typeof key === "string" && safeLearningNumber(value) > 0)
        .map(([key, value]) => [key, safeLearningNumber(value)])
    );
  }
  normalised.sessionsStarted = safeLearningNumber(source.sessionsStarted);
  normalised.sessionsCompleted = safeLearningNumber(source.sessionsCompleted);
  normalised.reviewsStarted = safeLearningNumber(source.reviewsStarted);
  normalised.helpSelection = normaliseHelpSelection(source.helpSelection);
  const daily = source.daily && typeof source.daily === "object" ? source.daily : {};
  normalised.daily.day = typeof daily.day === "string" ? daily.day : "";
  normalised.daily.completedStages = safeLearningNumber(daily.completedStages);
  return normalised;
}

function localDayKey() {
  return new Date().toISOString().slice(0, 10);
}

function reserveQuestionSeed() {
  const seed = state.stats.questionSeed || 0;
  state.stats.questionSeed = (seed + 17) % 997;
  return seed;
}

function learningMetric(areaId) {
  if (!state.learning.byArea[areaId]) state.learning.byArea[areaId] = learningMetricDefaults();
  return state.learning.byArea[areaId];
}

function skillProfile(areaId) {
  if (!state?.learning?.bySkill) state.learning.bySkill = {};
  if (!state.learning.bySkill[areaId]) state.learning.bySkill[areaId] = skillProfileDefaults();
  return state.learning.bySkill[areaId];
}

function recordStageStart(stage) {
  if (!stage || stage.id === "treasure") return;
  state.learning.sessionsStarted += 1;
  const metric = learningMetric(stage.areaId);
  if (state.completedStages[stage.id]) metric.replays += 1;
}

function recordLearningAttempt(stage, question, correct, firstAttempt) {
  if (!stage || !question) return;
  placementEngine?.observeAttempt?.(stage, question, correct, firstAttempt, Boolean(question.placementHintUsed));
  const metric = learningMetric(stage.areaId);
  const profile = skillProfile(stage.areaId);
  metric.attempts += 1;
  if (firstAttempt) metric.questions += 1;
  if (correct) metric.correct += 1;
  if (firstAttempt && correct) metric.firstTryCorrect += 1;
  const startedAt = Number(question.startedAt) || Date.now();
  metric.responseMs += Math.min(600000, Math.max(0, Date.now() - startedAt));
  if (firstAttempt) {
    profile.recent = [...profile.recent, correct ? 1 : 0].slice(-5);
    if (question.missionId) profile.recentMissionIds = [...profile.recentMissionIds, question.missionId].slice(-8);
    if (question.templateId) profile.recentTemplateIds = [...profile.recentTemplateIds, question.templateId].slice(-15);
    if (question.answerKey) profile.recentAnswerKeys = [...profile.recentAnswerKeys, String(question.answerKey)].slice(-15);
    profile.exposures += 1;
  }
  if (!correct) {
    const key = question.misconceptionId || question.interactionType || question.interaction || question.mode || "unknown";
    profile.misconceptionCounts[key] = safeLearningNumber(profile.misconceptionCounts[key]) + 1;
  }
  if (profile.recent.length >= 4) {
    const score = profile.recent.reduce((sum, value) => sum + value, 0);
    profile.levelOffset = score >= 4 ? 1 : score <= 2 ? -1 : 0;
  }
  if (correct && firstAttempt) {
    // 同じ形式を連打せず、翌日以降に別素材で確かめる候補として残す。
    profile.reviewDue = Date.now() + (profile.levelOffset > 0 ? 3 : 1) * 24 * 60 * 60 * 1000;
  }
}

function recordHint(stage) {
  if (!stage) return;
  placementEngine?.observeHint?.(stage, currentQuestion());
  learningMetric(stage.areaId).hints += 1;
}

function recordStageCompletion() {
  syncLearningDay();
  state.learning.sessionsCompleted += 1;
  state.learning.daily.completedStages += 1;
  return state.learning.daily.completedStages > 0 && state.learning.daily.completedStages % 3 === 0;
}

function syncLearningDay() {
  const today = localDayKey();
  if (state.learning.daily.day !== today) {
    state.learning.daily.day = today;
    state.learning.daily.completedStages = 0;
  }
}

function areaLearningSummary(areaId) {
  const metric = learningMetric(areaId);
  const accuracy = metric.attempts ? Math.round((metric.correct / metric.attempts) * 100) : null;
  const firstTry = metric.questions ? Math.round((metric.firstTryCorrect / metric.questions) * 100) : null;
  return { metric, accuracy, firstTry };
}

function learningOverview() {
  const metrics = Object.values(state.learning.byArea);
  const totals = metrics.reduce((result, metric) => ({
    attempts: result.attempts + metric.attempts,
    questions: result.questions + metric.questions,
    correct: result.correct + metric.correct,
    firstTryCorrect: result.firstTryCorrect + metric.firstTryCorrect,
    hints: result.hints + metric.hints
  }), { attempts: 0, questions: 0, correct: 0, firstTryCorrect: 0, hints: 0 });
  return {
    ...totals,
    accuracy: totals.attempts ? Math.round((totals.correct / totals.attempts) * 100) : null,
    firstTry: totals.questions ? Math.round((totals.firstTryCorrect / totals.questions) * 100) : null
  };
}

function recommendStage(domainId = null) {
  const placed = placementEngine?.recommendStage?.(domainId);
  if (placed?.stage) return placed;
  const eligibleStages = domainId ? ALL_STAGES.filter((stage) => helpDomainForStage(stage) === domainId) : ALL_STAGES;
  const eligibleAreas = ALL_AREAS.filter((area) => eligibleStages.some((stage) => stage.areaId === area.id));
  const now = Date.now();
  const dueCandidate = eligibleAreas
    .map((area) => ({ area, summary: areaLearningSummary(area.id), profile: skillProfile(area.id) }))
    .filter((entry) => entry.summary.metric.questions >= 3 && entry.profile.reviewDue > 0 && entry.profile.reviewDue <= now)
    .sort((left, right) => left.profile.reviewDue - right.profile.reviewDue)[0];
  if (dueCandidate) {
    const stage = eligibleStages.find((candidate) => candidate.areaId === dueCandidate.area.id && state.completedStages[candidate.id])
      || eligibleStages.find((candidate) => candidate.areaId === dueCandidate.area.id);
    if (stage) {
      return {
        stage,
        title: "ちがう場面でおさらい",
        message: `${dueCandidate.area.shortName}を、きのうとちがう小物でためしてみよう。`
      };
    }
  }
  const areaCandidates = eligibleAreas
    .map((area) => ({ area, summary: areaLearningSummary(area.id) }))
    .filter((entry) => entry.summary.metric.questions >= 3 && entry.summary.accuracy !== null && entry.summary.accuracy < 70)
    .sort((a, b) => (a.summary.accuracy - b.summary.accuracy) || (b.summary.metric.hints - a.summary.metric.hints));
  if (areaCandidates.length) {
    const target = areaCandidates[0].area;
    const stage = eligibleStages.find((candidate) => candidate.areaId === target.id && state.completedStages[candidate.id])
      || eligibleStages.find((candidate) => candidate.areaId === target.id);
    if (stage) {
      return {
        stage,
        title: "きょうのおさらい",
        message: target.shortName + "を、ちがうもんだいでもういちどあそぼう。"
      };
    }
  }
  const next = eligibleStages.find((stage) => !state.completedStages[stage.id]) || eligibleStages[0] || ALL_STAGES[0];
  return {
    stage: next,
    title: "きょうのおすすめ",
    message: "できたことをふやしながら、にわをそだてよう。"
  };
}

function isFirstJourney() {
  return state.stats.totalStages === 0 && Object.keys(state.completedStages).length === 0;
}

function worldIsAvailable(worldId) {
  // 学年は順番待ちの扉ではなく、今の気分・必要に合わせて選べる地図にする。
  return WORLDS.some((world) => world.id === worldId);
}

function isStageUnlocked(stage) {
  return Boolean(stage && worldIsAvailable(stage.worldId));
}

function nextPlayableStage(worldId = "w0") {
  const world = WORLDS.find((candidate) => candidate.id === worldId);
  if (!world || !worldIsAvailable(world.id)) return null;
  return world.stages.find((stage) => !state.completedStages[stage.id]) || world.stages[0] || null;
}

function notifyPersistenceProblem() {
  if (persistenceWarningShown) return;
  persistenceWarningShown = true;
  const notify = () => {
    try {
      toast("この端末では記録を保存できません。保護者とブラウザの設定を確認してね。");
    } catch (error) {
      // 保存に失敗している環境では、通知用DOMまで利用できない場合がある。
      // その場合も、問題を解く操作を止めない。
      console.warn("Could not show save warning", error);
    }
  };
  if (typeof window?.setTimeout === "function") window.setTimeout(notify, 0);
  else notify();
}

function saveState() {
  state = withDerivedState(state);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    persistenceWarningShown = false;
    return true;
  } catch (error) {
    console.warn("Could not save game data", error);
    notifyPersistenceProblem();
    return false;
  }
}

function setStudyVolume(volumeId) {
  if (!STUDY_VOLUMES[volumeId]) return;
  state.settings.studyVolume = volumeId;
  saveState();
  render();
  playSfx("tap", "study-volume");
}

function screenIsKnown(screen) {
  return (screen === "placement" && Boolean(placementEngine)) || NAV_ITEMS.some((item) => item.id === screen);
}

function focusMainContent() {
  const focus = () => document.querySelector("#screen")?.focus?.({ preventScroll: true });
  if (typeof window?.requestAnimationFrame === "function") window.requestAnimationFrame(focus);
  else focus();
}

function nyanlunaSpeechText(question) {
  return String(question?.audioScript || `${question?.prompt || ""} ${question?.subPrompt || ""}`).trim();
}

function nyanlunaTtsUrl() {
  if (window.MATHGARDEN_NYANLUNA_TTS_URL) return window.MATHGARDEN_NYANLUNA_TTS_URL;
  const location = window.location;
  return location?.protocol === "file:" || ["localhost", "127.0.0.1", "[::1]"].includes(location?.hostname)
    ? NYANLUNA_TTS_URL : "";
}

function questionSpeechIsAvailable(question) {
  return Boolean(NYANLUNA_PREBAKED_WAVS[nyanlunaSpeechText(question)] || nyanlunaTtsUrl());
}

function resolveNyanlunaAudioUrl(text) {
  const baked = NYANLUNA_PREBAKED_WAVS[text];
  if (baked) return Promise.resolve(baked);
  const cached = nyanlunaObjectUrls.get(text);
  if (cached) return Promise.resolve(cached);
  const endpoint = nyanlunaTtsUrl();
  if (!endpoint) return Promise.reject(new Error("nyanluna recording is not available"));
  if (typeof fetch !== "function") {
    return Promise.reject(new Error("nyanluna tts is unavailable"));
  }
  const request = { text, ref_wav: NYANLUNA_REF_WAV };
  return fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(request)
  }).then((response) => {
    if (!response?.ok) throw new Error("nyanluna tts request failed");
    return response.blob();
  }).then((blob) => {
    const urlFactory = window.URL || globalThis.URL;
    const objectUrl = urlFactory?.createObjectURL?.(blob);
    if (!objectUrl) throw new Error("nyanluna audio url missing");
    nyanlunaObjectUrls.set(text, objectUrl);
    return objectUrl;
  });
}

function ensureQuestionSpeechAudio(text) {
  const AudioCtor = window.Audio || globalThis.Audio;
  if (typeof AudioCtor !== "function") return null;
  if (!questionSpeechAudio) questionSpeechAudio = new AudioCtor();
  const audio = questionSpeechAudio;
  audio.setAttribute?.("data-voice", NYANLUNA_VOICE);
  audio.setAttribute?.("data-ref-wav", NYANLUNA_REF_WAV);
  audio.setAttribute?.("data-audio-script", text);
  if (audio.id !== "question-speech-audio") audio.id = "question-speech-audio";
  audio.setAttribute?.("aria-hidden", "true");
  if (audio.style) audio.style.display = "none";
  if (document.body?.appendChild && audio.parentNode !== document.body) {
    try { document.body.appendChild(audio); } catch (error) {
      console.debug("Could not attach nyanluna audio element", error);
    }
  }
  return audio;
}

function playNyanlunaSpeech(text) {
  const token = questionSpeechToken;
  const button = document.querySelector('[data-action="speak"]');
  button?.classList.add("is-speaking");
  const audio = ensureQuestionSpeechAudio(text);
  if (!audio) {
    button?.classList.remove("is-speaking");
    toast("このブラウザではよみあげを使えません。");
    return Promise.resolve();
  }
  audio.onended = () => {
    if (token === questionSpeechToken) button?.classList.remove("is-speaking");
  };
  audio.onerror = () => {
    if (token === questionSpeechToken) {
      button?.classList.remove("is-speaking");
      toast("にゃんるなのよみあげを さいせいできませんでした。");
    }
  };
  return resolveNyanlunaAudioUrl(text).then((url) => {
    if (token !== questionSpeechToken) return;
    audio.src = url;
    const playing = audio.play();
    if (playing && typeof playing.then === "function") {
      return playing.catch((error) => {
        if (token !== questionSpeechToken) return;
        button?.classList.remove("is-speaking");
        console.debug("Could not play nyanluna speech", error);
        toast("にゃんるなのよみあげを さいせいできませんでした。");
      });
    }
    return undefined;
  }).catch((error) => {
    if (token !== questionSpeechToken) return;
    button?.classList.remove("is-speaking");
    console.debug("Could not start nyanluna speech", error);
    toast("にゃんるなのよみあげを さいせいできませんでした。");
  });
}

function stopQuestionSpeech() {
  questionSpeechToken += 1;
  const audio = questionSpeechAudio;
  if (!audio) return;
  try {
    audio.pause();
    audio.currentTime = 0;
  } catch (error) {
    // 読み上げ非対応のブラウザでも画面遷移は常に行える。
    console.debug("Could not stop question speech", error);
  }
  document.querySelector('[data-action="speak"]')?.classList.remove("is-speaking");
}

function setScreen(screen) {
  if (!screenIsKnown(screen)) {
    console.warn("Ignored unknown screen", screen);
    return false;
  }
  const changed = view.screen !== screen;
  if (screen === "parent" && !view.parentVerified) prepareParentGate();
  if (screen !== "parent") view.parentVerified = false;
  if (screen !== "learn") stopQuestionSpeech();
  // 途中のステージは、ナビを見たりペットを見たりしても失わない。
  // 明示的な「ステージへもどる」操作だけがセッションを閉じる。
  if (changed) view.resetScreenScroll = true;
  view.screen = screen;
  render();
  if (changed) focusMainContent();
  return true;
}

function capturePlayScrollPositions() {
  const nodes = document.querySelectorAll?.("[data-play-scroll]") || [];
  const gardenPositions = view.gardenScrollPositions ||= {};
  const entries = Array.from(nodes)
    .map((node) => ({ key: node.dataset?.playScroll, top: Number(node.scrollTop) || 0, left: Number(node.scrollLeft) || 0 }))
    .filter((entry) => entry.key);
  // 棚の種類や画面を変えて戻っても、もようがえの続きを同じ場所から行う。
  for (const entry of entries) if (entry.key.startsWith("garden-")) gardenPositions[entry.key] = entry;
  return [...entries.filter(entry => !entry.key.startsWith("garden-")), ...Object.values(gardenPositions)]
    .filter(entry => entry.top || entry.left);
}

function restorePlayScrollPositions(entries) {
  if (!entries?.length) return;
  const restore = () => {
    for (const entry of entries) {
      const safeKey = String(entry.key).replace(/"/g, "\\\"");
      const node = document.querySelector?.(`[data-play-scroll="${safeKey}"]`);
      if (!node) continue;
      node.scrollTop = entry.top;
      node.scrollLeft = entry.left;
    }
  };
  if (typeof window?.requestAnimationFrame === "function") window.requestAnimationFrame(restore);
  else restore();
}

function captureScreenScrollPosition(screen) {
  return {
    top: Number(screen?.scrollTop) || 0,
    left: Number(screen?.scrollLeft) || 0
  };
}

function restoreScreenScrollPosition(position, shouldReset) {
  const restore = () => {
    const screen = document.querySelector?.("#screen");
    if (!screen) return;
    screen.scrollTop = shouldReset ? 0 : Number(position?.top) || 0;
    screen.scrollLeft = shouldReset ? 0 : Number(position?.left) || 0;
  };
  if (typeof window?.requestAnimationFrame === "function") window.requestAnimationFrame(restore);
  else restore();
}

// innerHTML による描き直しでも、回答・試着・数字入力の続きを同じ位置から操作できる。
// ラベルの変わるボタンは data 属性で照合し、正答で無効になった回答からは「つぎへ」へ進む。
function captureUiFocus() {
  const active = document.activeElement;
  const region = active?.closest?.("#screen, #navTabs, #statsBar");
  if (!region || active === region) return null;
  return {
    region: region.id,
    id: active.id || "",
    data: Object.entries(active.dataset || {}).filter(([key]) => key !== "dragged"),
    screen: view.screen,
    selectionStart: active.selectionStart,
    selectionEnd: active.selectionEnd
  };
}

function focusRewardControl(control, dialog = null) {
  control?.focus?.({ preventScroll: true });
  if (!dialog || !control) return;
  const card = dialog.querySelector?.(".reward-celebration__card");
  const bounds = card?.getBoundingClientRect?.();
  const target = control.getBoundingClientRect?.();
  if (!bounds || !target || bounds.height <= 0) return;
  // 小画面や文字拡大では、背景を動かさずカードの中だけをスクロールする。
  // pop演出のscale中もCSS座標へ換算して、操作ボタンを見える位置に置く。
  const scale = bounds.height / (card.offsetHeight || bounds.height);
  const delta = target.top < bounds.top + 12 ? target.top - bounds.top - 12
    : target.bottom > bounds.bottom - 12 ? target.bottom - bounds.bottom + 12 : 0;
  if (delta) card.scrollTop = (Number(card.scrollTop) || 0) + delta / scale;
}

function restoreUiFocus(previous, resetScreen = false) {
  if (!previous) return;
  const restore = () => {
    const dialog = document.querySelector('[data-reward-dialog="true"]');
    const modal = dialog?.getAttribute?.("aria-modal") === "true" ? dialog : null;
    if (resetScreen || previous.screen !== view.screen) {
      focusRewardControl(modal?.querySelector('[data-action="next-question"], [data-action="finish-treasure"]') || document.querySelector("#screen"), modal);
      return;
    }
    const region = modal || document.querySelector(`#${previous.region}`);
    const candidates = Array.from(region?.querySelectorAll?.("button, input, select, textarea, a[href], [tabindex]") || []);
    const available = (node) => !node.disabled && node.getAttribute?.("aria-disabled") !== "true" && !node.closest?.("[hidden]");
    let next = candidates.find((node) => available(node) && (previous.id ? node.id === previous.id
      : previous.data.length > 0 && previous.data.every(([key, value]) => node.dataset?.[key] === value)));
    if (!next && (modal || previous.region === "screen")) {
      next = document.querySelector('[data-action="next-question"], [data-action="finish-treasure"]');
      if (!next) {
        const action = previous.data.find(([key]) => key === "action")?.[1];
        next = candidates.find((node) => available(node) && action && node.dataset?.action === action);
        if (!next && action === "show-hint") {
          next = candidates.find((node) => available(node) && node.dataset?.action === "fraction-hint-toggle");
        }
        if (!next && action === "curriculum-key-erase") {
          next = candidates.find(node => available(node) && node.dataset?.action === "curriculum-key");
        }
        if (!next && ["garden-undo", "garden-stow"].includes(action)) {
          next = candidates.find(node => available(node) && node.dataset?.action === "garden-place-cursor");
        }
      }
      next ||= document.querySelector("#screen");
    }
    focusRewardControl(next, modal);
    if (!modal && ["curriculum-key", "curriculum-key-erase", "calculation-beads-move", "garden-place-cursor", "garden-cell"].includes(next?.dataset?.action)) {
      // 先に予約された盤面スクロールの復元が終わってから、見えない分だけ補う。
      window.requestAnimationFrame(() => {
        if (next?.isConnected === false) return;
        const rect = next.getBoundingClientRect?.();
        const header = document.querySelector(".topbar")?.getBoundingClientRect?.();
        const top = Math.max(0, header?.bottom || 0) + 8;
        if (rect && (rect.top < top || rect.bottom > window.innerHeight - 8)) next.scrollIntoView?.({ block: "nearest", behavior: "auto" });
      });
    }
    if (Number.isInteger(previous.selectionStart) && typeof next?.setSelectionRange === "function") {
      next.setSelectionRange(previous.selectionStart, previous.selectionEnd);
    }
  };
  restore();
}

function syncRewardDialog() {
  const previouslyInert = document.querySelectorAll?.("[data-reward-inert]") || [];
  for (const node of previouslyInert) {
    node.inert = false;
    node.removeAttribute("data-reward-inert");
  }
  const dialog = document.querySelector('[data-reward-dialog="true"]');
  if (!dialog?.parentElement) return;
  let child = dialog;
  while (child.parentElement && child.parentElement !== document.body) {
    for (const sibling of child.parentElement.children) {
      if (sibling === child || sibling.inert) continue;
      sibling.inert = true;
      sibling.setAttribute("data-reward-inert", "");
    }
    child = child.parentElement;
  }
  if (!dialog.contains(document.activeElement)) {
    focusRewardControl(dialog.querySelector('[data-action="next-question"], [data-action="finish-treasure"]'), dialog);
  }
}

function render() {
  const focusedControl = captureUiFocus();
  const playScrollPositions = capturePlayScrollPositions();
  const legacyDetails = document.querySelector("[data-legacy-closet]");
  if (legacyDetails) view.legacyClosetOpen = legacyDetails.open;
  const screen = document.querySelector("#screen");
  const screenScrollPosition = captureScreenScrollPosition(screen);
  const shouldResetScreenScroll = Boolean(view.resetScreenScroll);
  view.resetScreenScroll = false;
  saveState();
  renderStats();
  renderNav();

  screen.dataset.screen = view.screen;
  screen.dataset.view = view.screen === "learn" && view.active && !view.helpPickerOpen
    ? "play"
    : view.screen === "learn" && view.result && !view.helpPickerOpen
      ? "result"
      : "browse";
  const renderers = {
    island: renderIsland,
    learn: renderLearn,
    dress: renderDress,
    pets: renderPets,
    boutique: renderBoutique,
    stickers: renderStickers,
    notebook: renderNotebook,
    outing: renderOuting,
    parent: renderParent,
    hissan: () => hissanEngine?.renderScreen?.() || "",
    placement: () => placementEngine?.renderScreen?.() || ""
  };
  const openDetails = [...(screen.querySelectorAll?.("details[open]") || [])].map((detail) => detail.className);
  screen.innerHTML = renderers[view.screen]();
  if (!shouldResetScreenScroll) for (const detail of screen.querySelectorAll?.("details") || []) {
    if (openDetails.includes(detail.className)) detail.open = true;
  }
  revealReadyAvatars();
  syncRewardDialog();
  restoreScreenScrollPosition(screenScrollPosition, shouldResetScreenScroll);
  restorePlayScrollPositions(playScrollPositions);
  if (view.screen === "island") mountDailyGrowthIfAvailable();
  fitPlayBoard();
  if (view.screen === "hissan") hissanEngine?.afterRender?.();
  restoreUiFocus(focusedControl, shouldResetScreenScroll);
}

// 横長タブレットでは、あそぶ画面をスクロールなしで見せる。CSSで収まらない大きな盤面だけ、
// 枠に合わせてほんの少し縮める（下限あり。小さくなりすぎるときは枠内スクロールにまかせる）。
const FIT_LANDSCAPE_QUERY = "(min-width: 900px) and (orientation: landscape)";
const FIT_MIN_ZOOM = 0.72;
function fitPlayBoard() {
  const space = document.querySelector('#screen[data-view="play"] .roleplay-task .play-space');
  const content = space?.firstElementChild;
  if (!content) return;
  content.style.zoom = "";
  if (!window.matchMedia?.(FIT_LANDSCAPE_QUERY)?.matches) return;
  let zoom = 1;
  for (let pass = 0; pass < 4; pass += 1) {
    const frame = space.getBoundingClientRect();
    if (!frame.height) return;
    let bottom = frame.top;
    let right = frame.left;
    for (const child of content.querySelectorAll("*")) {
      const box = child.getBoundingClientRect();
      if (!box.width || !box.height) continue;
      bottom = Math.max(bottom, box.bottom);
      right = Math.max(right, box.right);
    }
    const heightRatio = (frame.height - 2) / Math.max(1, bottom - frame.top);
    const widthRatio = (frame.width - 2) / Math.max(1, right - frame.left);
    const ratio = Math.min(heightRatio, widthRatio);
    if (ratio >= 0.995) break;
    zoom = Math.max(FIT_MIN_ZOOM, zoom * ratio * 0.99);
    content.style.zoom = String(zoom);
    if (zoom <= FIT_MIN_ZOOM) break;
  }
}
window.addEventListener?.("resize", () => {
  if (view.screen === "learn") fitPlayBoard();
  else if (view.screen === "hissan") hissanEngine?.afterRender?.();
});

function dailyGrowthSnapshot() {
  return {
    stages: ALL_STAGES,
    areas: ALL_AREAS,
    completedStages: state.completedStages,
    learning: state.learning
  };
}

function mountDailyGrowthIfAvailable() {
  const host = document.querySelector("#dailyGrowthHost");
  const mount = window?.MathGardenDailyGrowth?.mountDailyGrowth;
  if (!host || typeof mount !== "function") return;
  if (dailyGrowth && dailyGrowthHost === host) {
    dailyGrowth.refresh();
    return;
  }
  dailyGrowth?.destroy?.();
  dailyGrowth = mount({
    host,
    getSnapshot: dailyGrowthSnapshot,
    onStartQuest: (plan) => startHelp(plan.stageId),
    onRest: () => toast("おさんぽ、いいね。あそびたくなったら、いつでも戻ってこよう。")
  });
  dailyGrowthHost = host;
}

function renderStats() {
  const stats = [{ text: "糸", label: "とってある糸", value: state.atelier.threadBank }];
  const statMarkup = stats
    .map((stat) => {
      const icon = stat.sprite
        ? `<span class="asset-sprite stat-sprite" role="img" aria-hidden="true" style="--src:url('${spriteUrl(stat.sprite)}')"></span>`
        : `<span class="stat-icon">${stat.text}</span>`;
      return `<div class="stat-pill" aria-label="${stat.label} ${stat.value}">${icon}${stat.value}</div>`;
    })
    .join("");
  const soundOn = state.settings?.soundEnabled !== false;
  document.querySelector("#statsBar").innerHTML = `${statMarkup}
    <button class="stat-pill sound-toggle ${soundOn ? "is-on" : "is-off"}" data-action="toggle-sound" aria-pressed="${soundOn}" aria-label="おとを${soundOn ? "オフ" : "オン"}にする">
      <span aria-hidden="true">${soundOn ? "♪" : "○"}</span><span>${soundOn ? "おと" : "しずか"}</span>
    </button>`;
}

function renderNav() {
  const hasResume = Boolean(view.active && !view.result);
  const markup = (item) => `<button class="tab-button ${view.screen === item.id ? "active" : ""}" data-action="nav" data-screen="${item.id}" ${view.screen === item.id ? 'aria-current="page"' : ""} aria-label="${item.label}${item.id === "learn" && hasResume ? "、おてつだいのつづき" : ""}"><span class="asset-sprite tab-sprite" aria-hidden="true" style="--src:url('${spriteUrl(item.sprite)}')"></span><span>${item.label}</span>${item.id === "learn" && hasResume ? '<span class="tab-resume-dot" aria-hidden="true"></span>' : ""}</button>`;
  const primary = ["island", "dress", "learn", "hissan", "boutique", "pets"].map((id) => NAV_ITEMS.find((item) => item.id === id));
  const utilities = NAV_ITEMS.filter((item) => !primary.includes(item));
  document.querySelector("#navTabs").innerHTML = primary.map(markup).join("") + `<button class="tab-button ${utilities.some((item) => item.id === view.screen) ? "active" : ""}" data-action="atelier-menu" aria-expanded="${Boolean(view.utilityMenuOpen)}" ${view.utilityMenuOpen ? 'aria-controls="atelier-utilities"' : ""}><span aria-hidden="true" style="font-size:24px">✿</span><span>もっと</span></button>${view.utilityMenuOpen ? `<div class="atelier-utility-menu" id="atelier-utilities">${utilities.map(markup).join("")}</div>` : ""}`;
}

function renderPetGesture(pet, motion) {
  if (motion === "idle") return "";
  const paw = (side) => `<svg class="pet-gesture-paw pet-gesture-paw--${side}" viewBox="0 0 80 90" aria-hidden="true" focusable="false"><path d="M22 82Q12 59 15 38Q8 17 19 15Q24 9 29 20Q27 1 39 5Q45 4 46 19Q52 0 61 10Q66 13 61 29Q76 14 78 29Q77 43 62 50L61 78Q41 91 22 82Z" fill="var(--gesture-fur)" stroke="var(--gesture-edge)" stroke-width="3" stroke-linejoin="round"/><ellipse cx="41" cy="53" rx="13" ry="11" fill="#e9afc5"/><ellipse cx="25" cy="34" rx="5" ry="6" fill="#e9afc5"/><ellipse cx="40" cy="26" rx="5" ry="6" fill="#e9afc5"/><ellipse cx="55" cy="32" rx="5" ry="6" fill="#e9afc5"/></svg>`;
  let tail = motion === "tail-heart"
    ? '<svg class="pet-gesture-tail pet-gesture-tail--heart" viewBox="0 0 100 110" aria-hidden="true" focusable="false"><path d="M15 95Q88 112 86 63Q103 25 78 22Q65 18 54 36Q35 4 16 27Q1 46 54 78" fill="none" stroke="var(--gesture-edge)" stroke-width="14" stroke-linecap="round"/><path d="M15 95Q88 112 86 63Q103 25 78 22Q65 18 54 36Q35 4 16 27Q1 46 54 78" fill="none" stroke="var(--gesture-fur)" stroke-width="10" stroke-linecap="round"/></svg>'
    : '<svg class="pet-gesture-tail" viewBox="0 0 90 110" aria-hidden="true" focusable="false"><path d="M15 96Q83 95 80 28Q60 36 45 57Q25 60 15 96" fill="var(--gesture-fur)" stroke="var(--gesture-edge)" stroke-width="3" stroke-linejoin="round"/><path d="M63 43Q71 34 80 28Q83 52 75 67Q64 62 56 57Z" fill="#fff9ef"/></svg>';
  let hands = ["wave", "clap", "stretch"].includes(motion) ? (motion === "wave" ? paw("right") : paw("left") + paw("right")) : "";
  const hasTail = ["tail-wag", "tail-heart"].includes(motion) || motion === "hop" && pet.speciesId === "puppy";
  if (hands) hands = `<span class="pet-gesture-sign">${hands}</span>`;
  if (hasTail) tail = `<span class="pet-gesture-sign pet-gesture-sign--tail">${tail}</span>`;
  const sparkle = ["sparkle", "finale", "clap", "cuddle"].includes(motion) ? `<span class="pet-gesture-sparks" aria-hidden="true"><i>${motion === "cuddle" ? "♥" : "✦"}</i><i>${motion === "cuddle" ? "♥" : "✧"}</i><i>${motion === "cuddle" ? "♥" : "✦"}</i></span>` : "";
  return `<span class="pet-gesture pet-gesture--${escapeHtml(motion)}" aria-hidden="true">${hands}${hasTail ? tail : ""}${sparkle}${motion === "hop" || motion === "twirl" ? '<span class="pet-gesture-floor"></span>' : ''}</span>`;
}

function renderPetCompanion(pet, { compact = false, showName = true, className = "", appearance = petAppearanceFor(pet), silhouette = false } = {}) {
  const species = speciesForPet(pet);
  if (!pet || !species) return "";
  const motion = !silhouette && view.petMotion?.petId === pet.id && (view.petMotion.origin !== "play-zone" || className.includes("pet-play-zone-art") || className.includes("pet-command-preview--playing")) ? view.petMotion.motion : "idle";
  const form = Math.max(0, Math.min(PET_EVOLUTION_STAGES.length - 1, Math.floor(Number(appearance) || 0)));
  const stage = PET_EVOLUTION_STAGES[form];
  return `
    <div class="pet-companion pet-tone-${species.tone} pet-species-${species.id} pet-evo-${form} pet-motion-${motion} ${compact ? "pet-compact" : ""} ${silhouette ? "is-silhouette" : ""} ${className}" data-pet-id="${pet.id}" data-pet-appearance="${form}" data-pet-silhouette="${silhouette}" data-motion-token="${motion !== "idle" ? view.petMotion?.token || "" : ""}">
      <div class="pet-portrait">
        <span class="pet-aura" aria-hidden="true"></span>
        <span class="pet-art-opacity"><span class="pet-art" role="img" aria-label="${silhouette ? 'まだ解放していないすがたのシルエット' : `${escapeHtml(pet.name)}、${escapeHtml(species.name)}、${escapeHtml(stage.name)}`}" style="background-image:url('${petEvolutionAtlas(species)}');--pet-atlas-x:${form % 2 ? 100 : 0}%;--pet-atlas-y:${form >= 2 ? 100 : 0}%"></span></span>
        ${renderPetGesture(pet, motion)}
      </div>
      ${showName ? `<span class="pet-nameplate"><b>${escapeHtml(pet.name)}</b><small>Lv.${pet.level}</small></span>` : ""}
    </div>
  `;
}

function renderPetAppearancePicker(pet) {
  const selected = petAppearanceFor(pet);
  return `<section class="pet-appearance-album" aria-label="${escapeHtml(pet.name)}のすがたをえらぶ">
    <div class="section-heading"><div><h3>すきな すがたで いっしょに</h3><p>まえの すがたにも、いつでも もどれるよ。<br>そだちと とくいわざは そのまま。</p></div></div>
    <div class="pet-appearance-grid">${PET_EVOLUTION_STAGES.map((stage, index) => {
      const unlocked = index <= pet.evolution;
      const choosing = unlocked && pet.evolution > 0;
      const tag = choosing ? "button" : "article";
      const status = unlocked ? selected === index ? "いまの すがた" : "この すがたにする" : pet.level >= stage.level ? "へんしんで ひらく" : `Lv.${stage.level}で へんしん`;
      return `<${tag} class="pet-appearance-card ${unlocked ? "is-unlocked" : "is-locked"} ${selected === index ? "is-selected" : ""}" data-appearance-preview="${index}" ${choosing ? `data-action="pet-appearance" data-pet-id="${pet.id}" data-appearance="${index}" aria-pressed="${selected === index}"` : ""}>
        ${renderPetCompanion(pet, { showName: false, appearance: index, silhouette: !unlocked, className: "pet-appearance-preview" })}
        <strong>${escapeHtml(stage.name)}</strong><small>${unlocked ? "" : "🔒 "}${escapeHtml(status)}</small>
      </${tag}>`;
    }).join("")}</div>
  </section>`;
}

function renderPetProgress(pet) {
  const next = pet.level >= PET_MAX_LEVEL ? "MAX" : `Lv.${pet.level + 1}`;
  const label = pet.level >= PET_MAX_LEVEL ? "たっぷり そだったよ" : `${pet.xp}/${petXpToNext(pet.level)} XP`;
  return `
    <div class="pet-xp-meter" aria-label="${escapeHtml(pet.name)}の経験値 ${label}">
      <div><span>おともXP</span><b>${next}</b></div>
      <span class="pet-xp-track"><i style="width:${petXpPercent(pet)}%"></i></span>
      <small>${label}</small>
    </div>
  `;
}

function renderPetTrickCard(pet, trick) {
  const learned = pet.tricks.includes(trick.id);
  const available = pet.level >= trick.level;
  return `
    <article class="pet-trick-card ${learned ? "is-learned" : ""} ${available ? "" : "is-locked"}">
      <span class="pet-trick-motion pet-motion-${trick.motion}" aria-hidden="true">${trick.motion === "hop" ? "↟" : trick.motion === "twirl" ? "↻" : trick.motion === "bow" ? "⌄" : trick.motion === "sparkle" || trick.motion === "finale" ? "✦" : "♥"}</span>
      <div><strong>${escapeHtml(trick.name)}</strong><small>${escapeHtml(trick.hint)}</small></div>
      <button class="${learned ? "soft-button" : "primary-button"} tiny" data-action="pet-practice" data-pet-id="${pet.id}" data-trick-id="${trick.id}" ${available ? "" : "disabled"}>
        ${learned ? "みせる" : `Lv.${trick.level}で おぼえる`}
      </button>
    </article>
  `;
}

function renderPetCommands(pet) {
  const tricks = learnedPetTricks(pet);
  if (!tricks.length) return "";
  const playing = view.petMotion?.petId === pet.id && view.petMotion.origin === "play-zone" ? view.petMotion.trickId : null;
  const active = tricks.find(trick => trick.id === playing);
  const motionIcon = { wave: "♧", hop: "↟", clap: "♥", twirl: "↻", bow: "⌄", stretch: "↥", "tail-heart": "♡", "tail-wag": "〰", sparkle: "✦", finale: "✧" };
  return `<section class="pet-commands" aria-label="${escapeHtml(pet.name)}の覚えたコマンド"><h4>おぼえた とくいわざ</h4><div class="pet-command-list" aria-label="覚えた技の一覧">${tricks.map(trick => `<button class="pet-command-button ${playing === trick.id ? 'is-playing' : ''}" data-action="pet-command" data-pet-id="${pet.id}" data-trick-id="${trick.id}" aria-label="${escapeHtml(trick.name)}、${escapeHtml(trick.hint)}" aria-pressed="${playing === trick.id}"><span class="pet-command-portrait" aria-hidden="true">${renderPetCompanion(pet, { compact: true, showName: false, className: `pet-command-preview ${playing === trick.id ? 'pet-command-preview--playing' : ''}` })}<i>${motionIcon[trick.motion] || "♥"}</i></span><strong>${escapeHtml(trick.name)}</strong><small>${escapeHtml(trick.hint)}</small></button>`).join("")}</div><p class="pet-command-status" role="status" aria-live="polite" aria-atomic="true">${active ? `${escapeHtml(pet.name)}「${escapeHtml(active.hint)}」` : view.petMotion?.petId === pet.id && view.petMotion.motion === "cuddle" ? `${escapeHtml(pet.name)}「もっと なでなで！」` : "すきな わざを おねがいしてね"}</p></section>`;
}

function renderPetTabs() {
  const tab = view.petTab || "home";
  const tabs = [["home", "おとも"], ["play", "なでなで"], ["look", "おしゃれ"], ["tricks", "とくいわざ"]];
  return `<div class="pet-tabs" role="tablist" aria-label="ペットのおうち">${tabs.map(([id, label]) => `<button class="soft-button ${tab === id ? "is-selected" : ""}" role="tab" aria-selected="${tab === id}" data-action="pet-tab" data-tab="${id}">${label}</button>`).join("")}</div>`;
}

function renderPets() {
  const pet = activePet();
  const species = speciesForPet(pet);
  const canEvolve = petEvolutionAvailableForLevel(pet.level) > pet.evolution;
  const nextStage = PET_EVOLUTION_STAGES[Math.min(pet.evolution + 1, PET_EVOLUTION_STAGES.length - 1)];
  return `
    <section class="wide-panel pet-home" data-pet-tab="${view.petTab || "home"}">
      <div class="section-heading">
        <div><h2>ペットのおうち</h2><p>学びをさいごまで終えると、今日のおともも すこしずつ育ちます。急がなくて大丈夫。</p></div>
        <span class="tag peach">おとも ${state.pets.roster.length}ひき</span>
      </div>
      ${renderPetTabs()}
      <div class="pet-home-layout" data-pet-section="home">
        <section class="pet-showcase pet-tone-${species?.tone || "peach"}">
          ${renderPetCompanion(pet, { className: "pet-showcase-art" })}
          <div class="pet-showcase-copy">
            <span class="tag mint">${escapeHtml(species?.name || "ペット")}</span>
            <h3>${escapeHtml(pet.name)}と いっしょ</h3>
            <p class="pet-current-appearance" role="status" aria-live="polite" aria-atomic="true">いまは ${escapeHtml(petAppearanceName(pet))}</p>
            <p class="question-sub">おてつだいをすると、新しい芸をおぼえていくよ。</p>
            ${renderPetProgress(pet)}
            <div class="pet-stage-row">${PET_EVOLUTION_STAGES.map((stage, index) => `<span class="${index <= pet.evolution ? "done" : ""}">${index + 1}<small>Lv.${stage.level}</small></span>`).join("")}</div>
            ${canEvolve ? `<button class="primary-button pet-evolve-button" data-action="pet-evolve" data-pet-id="${pet.id}">${escapeHtml(nextStage.name)}に へんしん</button>` : `<span class="tag sky">${pet.evolution === PET_EVOLUTION_STAGES.length - 1 ? "ぜんぶの すがたが えらべるよ！" : `つぎは Lv.${nextStage.level} で へんしん`}</span>`}
          </div>
        </section>
        <aside class="pet-roster" aria-label="おともをえらぶ">
          <h3>きょうの おとも</h3>
          ${state.pets.roster.map((candidate) => {
            const candidateSpecies = speciesForPet(candidate);
            const selected = candidate.id === pet.id;
            return `<button class="pet-roster-card ${selected ? "active" : ""}" data-action="pet-select" data-pet-id="${candidate.id}" aria-pressed="${selected}">${renderPetCompanion(candidate, { compact: true, showName: false })}<span><strong>${escapeHtml(candidate.name)}</strong><small>${escapeHtml(candidateSpecies?.name || "") }・Lv.${candidate.level}</small></span></button>`;
          }).join("")}
        </aside>
      </div>
      <div class="boutique-section" data-pet-section="look">${renderPetAppearancePicker(pet)}</div>
      <section data-pet-section="play" class="pet-play-zone ${view.petMotion?.petId === pet.id ? "is-patted" : ""}" aria-label="${escapeHtml(pet.name)}となかよくなる場所">
        ${renderPetCompanion(pet, { className: "pet-play-zone-art" })}
        <div class="pet-play-zone-copy">
          <span class="tag mint">${escapeHtml(pet.name)}と ひとやすみ</span>
          <h3>なでなで してみよう</h3>
          <p>「よくできたね」の気持ちは、学んだあとにも残るよ。</p>
          <button class="pet-pat-button" data-action="pet-pat" data-pet-id="${pet.id}">なでなで</button>
          ${renderPetCommands(pet)}
        </div>
      </section>
      <div class="pet-detail-grid" data-pet-section="tricks">
        <section class="pet-trick-section"><div class="section-heading"><div><h3>${escapeHtml(pet.name)}の とくいわざ</h3><p class="question-sub">レベルにとどいた芸は、タップしておぼえたり みせたりできます。</p></div></div><div class="pet-trick-grid">${tricksForPet(pet).map((trick) => renderPetTrickCard(pet, trick)).join("")}</div></section>
      </div>
    </section>
  `;
}

function gardenDecorById(id) {
  return [...GARDEN_FACILITIES, ...GARDEN_GROWTH_DEFS, ...GARDEN_DECOR_SHOP, GARDEN_FINAL_DECOR].find((decor) => decor.id === id)
    || { id, name: id, sprite: id };
}

function renderLegacyIsland() {
  const completedCount = completedStageCount();
  const progress = Math.round((completedCount / ALL_STAGES.length) * 100);
  const mapReady = allStagesCleared();
  const recommendation = recommendStage();
  const firstJourney = isFirstJourney();
  const nextStage = recommendation.stage || ALL_STAGES[0];
  const landMessage = `${state.stats.landSize - 2}×${state.stats.landSize - 2}のにわ`;

  return `
    <div class="island-wrap">
      <section class="panel island-panel">
        <div class="section-heading">
          <div>
            <h2>${firstJourney ? "ようこそ、マイガーデンへ" : "マイガーデン"}</h2>
            <p>${firstJourney ? "学年もステージも、好きなところから選べるよ。" : `${landMessage}。学ぶほど、おへや・シール・デコがふえます。`}</p>
            ${firstJourney ? "" : `<p class="question-sub">${recommendation.title}：${recommendation.message}</p>`}
          </div>
          <div class="action-row">
            ${firstJourney
              ? `<button class="primary-button" data-action="nav" data-screen="learn">ステージをえらぶ</button>`
              : `<button class="primary-button" data-action="start-stage" data-stage-id="${nextStage.id}">おすすめをあそぶ</button>`}
          </div>
        </div>
        ${firstJourney ? `
          <div class="first-quest-card">
            ${renderAssetSprite("fairy", "まほうようせい", "first-quest-fairy")}
            <div>
              <strong>ようせいの おねがい</strong>
              <p>「まなぶ」をタップして、好きなワールドをえらぼう。はじめは、どの学年からでも遊べるよ。</p>
            </div>
          </div>
        ` : ""}
        ${renderIslandBoard()}
      </section>

      <aside class="panel progress-stack">
        <div id="dailyGrowthHost" aria-live="polite"></div>
        <div class="companion-card avatar-home-card avatar-pet-home-card">
          <div class="avatar-pet-pair">
            <div class="avatar-home-preview">${renderAvatarLayered()}</div>
            <button class="pet-home-preview" data-action="nav" data-screen="pets" aria-label="${escapeHtml(activePet()?.name || "ペット")}のおうちをひらく">
              ${renderPetCompanion(activePet(), { compact: true, showName: false })}
              <span>ペットのおうち</span>
            </button>
          </div>
          <div>
            <strong>きょうのコーデ</strong>
            <p class="question-sub">${escapeHtml(activePet()?.name || "おとも")}と いっしょに、おにわをおさんぽしよう。</p>
            <div class="action-row"><button class="soft-button tiny" data-action="nav" data-screen="dress">きせかえへ</button><button class="soft-button tiny" data-action="nav" data-screen="pets">ペットへ</button></div>
          </div>
        </div>
        ${renderMeter("まなびの地図", progress)}
        <div class="summary-card garden-expansion-card ${mapReady ? "is-ready" : ""}">
          <strong>${state.garden.mapExpanded ? "にじのにわ ひろがった！" : "にじのにわを ひろげよう"}</strong>
          <p class="question-sub">${state.garden.mapExpanded ? "12×12のおにわで、もっとたくさん飾れるよ。" : mapReady ? "ぜんぶのステージをできた！ ゲートをひらこう。" : `あと ${Math.max(0, ALL_STAGES.length - completedCount)} ステージで ひろげられるよ。`}</p>
          ${mapReady && !state.garden.mapExpanded ? `<button class="primary-button tiny" data-action="expand-garden-map">にじのゲートをひらく</button>` : ""}
        </div>
        <div class="asset-ribbon">
          ${[...new Set([...state.garden.decorations, ...state.garden.purchased])].slice(0, 5).map((id) => { const decor = gardenDecorById(id); return renderAssetSprite(decor.sprite, decor.name); }).join("")}
        </div>
        <div class="action-row">
          <button class="soft-button" data-action="collect-tree" ${state.garden.treeReady ? "" : "disabled"}>ちえのき</button>
          <button class="soft-button" data-action="harvest-garden" ${state.garden.harvestReady ? "" : "disabled"}>はたけ</button>
        </div>
        ${firstJourney ? "" : renderGardenDecorShop()}
      </aside>
    </div>
  `;
}

function renderGardenDecorShop() {
  return `
    <section class="garden-decor-shop ${view.gardenShopOpen ? "is-open" : ""}">
      <div>
        <strong>にわの もようがえ</strong>
        <button class="soft-button garden-shop-close" data-action="garden-shop-toggle">とじる</button>
        <p class="question-sub">コイン ${state.stats.coins}こ。すきなものを ひとつえらぼう。</p>
      </div>
      <div class="garden-decor-choices">
        ${GARDEN_DECOR_SHOP.map((decor) => {
          const owned = state.garden.purchased.includes(decor.id);
          return `
            <button class="garden-decor-choice ${owned ? "is-owned" : ""}" data-action="buy-garden-decor" data-item-id="${decor.id}" ${owned ? "disabled" : ""}>
              ${renderAssetSprite(decor.sprite, decor.name)}
              <span>${decor.name}</span>
              <small>${owned ? "おいたよ" : `${decor.price} コイン`}</small>
            </button>
          `;
        }).join("")}
      </div>
    </section>
  `;
}

// マイガーデン：アイソメトリックのタイルマップ（地形タイルを継ぎ目なく敷き詰める）
function renderIslandBoard() {
  if (view.gardenEditing) return renderGardenEditor();
  const N = state.stats.landSize;
  const landSide = N - 2; // 保存座標の外周は予約領域。表示は置ける床だけ。
  const objects = islandObjects(N);
  const TW = view.gardenZoom ? 78 : Math.min(78, 540 / landSide);
  const TH = TW / 2; // すべての床素材は同じ2:1の菱形、厚みは18/216。
  const imgH = TW * (126 / 216);
  const originX = (landSide - 1) * (TW / 2);
  const boardW = landSide * TW;
  const boardH = (landSide - 1) * TH + imgH;

  // Keep the same isometric coordinates at every size. Pixel-sized children
  // inside a shrinking flex item previously put the school off-screen.
  let html = `<button class="soft-button garden-zoom-button" data-action="garden-zoom" aria-pressed="${view.gardenZoom}">${view.gardenZoom ? "おにわを ぜんぶみる" : "おにわを おおきくみる"}</button><div class="iso-scene ${view.gardenZoom ? "garden-zoomed" : ""}" style="--garden-headroom:${TW * 1.35}px" data-play-scroll="garden-overview"><div class="iso-board" style="width:${view.gardenZoom ? `${boardW}px` : `min(100%, ${boardW}px)`};aspect-ratio:${boardW} / ${boardH}">`;
  for (let sum = 2; sum <= 2 * (N - 2); sum += 1) {
    for (let x = 1; x < N - 1; x += 1) {
      const y = sum - x;
      if (!gardenCellIsLand(x, y, N)) continue;
      const left = originX + (x - y) * (TW / 2);
      const top = (x + y - 2) * (TH / 2);
      const z = x + y + 1;
      const object = objects[`${x},${y}`];
      const floor = gardenFloorAt(x, y);
      html += `<div class="iso-tile" style="left:${left / boardW * 100}%;top:${top / boardH * 100}%;width:${TW / boardW * 100}%;height:${imgH / boardH * 100}%;z-index:${z};" data-garden-x="${x}" data-garden-y="${y}"><span class="iso-floor" style="background-image:url('./assets/garden-floors/${floor}.svg?v=20261005-2')" aria-hidden="true"></span></div>`;
      if (object) {
        const side = gardenItemFootprint(object.id);
        const relativeWidth = { home:.86, school:.86, tree:.78, boutique:.86, garden:.76, avatar:.72 }[object.id] || .72;
        const objW = TW * side * relativeWidth;
        // A building stands at the centre of its four tiles; small items stay
        // within one tile. Artwork padding is separate from the name label.
        const objBottom = boardH - top - TH * side / 2 - objW * .03;
        const actionAttrs = object.place ? `data-action="visit-place" data-place="${object.place}" aria-label="${escapeHtml(object.label.replace(/<br>/g, ""))}をひらく"` : "";
        const objectTag = object.place ? "button" : "div";
        const typeAttr = object.place ? "type=\"button\"" : "";
        html += `<${objectTag} ${typeAttr} class="iso-object ${object.className || ""} ${object.place ? "is-tappable" : ""} ${object.place === "school" && isFirstJourney() ? "is-next-place" : ""}" ${actionAttrs} data-footprint="${side}" style="left:${(left + TW / 2) / boardW * 100}%;bottom:${objBottom / boardH * 100}%;width:${objW / boardW * 100}%;z-index:${z + side - 1 + 400};--object-scale:1">
          ${object.id === "avatar" ? `<span class="garden-map-companions">${renderAvatarLayered()}${renderPetCompanion(activePet(), { compact: true, showName: false })}</span>` : `<span class="iso-object-img" style="--src:url('${spriteUrl(object.sprite)}')"></span>`}
          <span class="iso-label">${object.label}</span>
        </${objectTag}>`;
      }
    }
  }
  html += "</div></div>" + renderGardenPlaceDock();
  return html;
}

// タイルの種類：外周＝水、中央十字＝砂の小道、その他＝草（一部にお花）
function tileSprite(x, y, N) {
  if (x === 0 || y === 0 || x === N - 1 || y === N - 1) return { sprite: "tileWater" };
  return { sprite: "tileGrass", flower: (x * 3 + y * 7) % 6 === 0 };
}

function islandObjects(size) {
  return Object.fromEntries(gardenOwnedItems().flatMap(item => {
    const position = state.garden.layout[item.id];
    if (!position || !gardenItemFits(item.id, position.x, position.y, size)) return [];
    const facility = GARDEN_FACILITIES.some(f => f.id === item.id);
    return [[`${position.x},${position.y}`, { ...item, ...position, label: item.name, className: `obj-${item.id}`, place: facility ? item.id : null, scale: facility || item.id === "avatar" ? 1 : .8 }]];
  }));
}

function gardenHasFacility(id) {
  return GARDEN_FACILITIES.some(item => item.id === id) && state.garden.decorations.includes(id);
}

function gardenFacilityIsPlaced(id) {
  const position = state.garden.layout[id];
  return gardenHasFacility(id) && gardenItemFits(id, position?.x, position?.y);
}

function gardenOwnedItems() {
  const ids = new Set([...state.garden.decorations, ...state.garden.purchased]);
  return [...GARDEN_FACILITIES, ...GARDEN_GROWTH_DEFS, ...GARDEN_DECOR_SHOP, GARDEN_FINAL_DECOR]
    .filter(item => ids.has(item.id))
    .concat([{ id: "avatar", name: "わたしと おとも", sprite: "avatar" }], allStagesCleared() ? [{ id: "monument", name: "ぼうけんの きねん", sprite: "monument" }] : []);
}

function gardenWorkingState() {
  return view.gardenEditing && view.gardenDraft ? { ...state.garden, ...view.gardenDraft } : state.garden;
}

function renderGardenPlaceDock() {
  const placed = GARDEN_FACILITIES.filter(item => gardenFacilityIsPlaced(item.id));
  if (placed.length < 2) return "";
  return `<section class="garden-place-dock" aria-label="おにわの施設をひらく"><h4>おにわで なにをする？</h4><div>${placed.map(item => `<button class="soft-button" data-action="garden-visit" data-place="${item.id}" aria-label="${escapeHtml(item.name)}へいく">${renderAssetSprite(item.sprite, item.name)}<strong>${escapeHtml(item.name)}</strong></button>`).join("")}</div></section>`;
}

function gardenFloorAt(x, y) {
  const garden = gardenWorkingState();
  return garden.floorTiles[`${x},${y}`] || garden.baseFloor;
}

function gardenExpansionAvailable() {
  const next = GARDEN_EXPANSIONS[state.garden.expansionLevel + 1];
  return Boolean(next && gardenJourneyCount() >= next.at);
}

function renderGardenShopToggle() {
  return view.gardenEditing ? "" : `<button class="soft-button garden-shop-toggle" data-action="garden-shop-toggle" aria-expanded="${Boolean(view.gardenShopOpen)}">にわの もようがえ</button>`;
}

function renderGardenGatherButtons() {
  if (view.gardenEditing) return "";
  const buttons = [gardenFacilityIsPlaced("tree") ? `<button class="soft-button" data-action="collect-tree" ${state.garden.treeReady ? "" : "disabled"}>木のプレゼント</button>` : "", gardenFacilityIsPlaced("garden") ? `<button class="soft-button" data-action="harvest-garden" ${state.garden.harvestReady ? "" : "disabled"}>おはなを あつめる</button>` : ""].join("");
  return `<div class="action-row garden-gather-actions">${buttons}${renderGardenShopToggle()}</div>`;
}

function renderGardenGrowthStrip() {
  const runs = gardenJourneyCount(), next = GARDEN_EXPANSIONS[state.garden.expansionLevel + 1];
  const gifts = [...GARDEN_FACILITIES.filter(item => !gardenHasFacility(item.id)), ...GARDEN_FLOORS.filter(item => !state.garden.ownedFloors.includes(item.id))].sort((a, b) => a.at - b.at);
  const gift = gifts[0];
  return `<section class="garden-growth-strip" aria-label="おにわのそだち"><div><strong>わたしだけの おにわ</strong><p>街のおてつだいで、おにわのプレゼントがとどくよ。</p><span class="garden-size-note">${gardenMapSize() - 2} × ${gardenMapSize() - 2}</span>${gift ? `<span>あと ${Math.max(0, gift.at - runs)}回で ${escapeHtml(gift.name)}</span>` : '<span>おにわのプレゼント、ぜんぶ とどいたね！</span>'}</div><div class="garden-main-actions"><button class="primary-button" data-action="garden-edit">${view.gardenEditing ? "できあがり" : "おにわを ならべる"}</button>${next ? `<button class="soft-button" data-action="expand-garden-map" ${gardenExpansionAvailable() && !view.gardenEditing ? "" : "disabled"}>${gardenExpansionAvailable() ? "おにわを ひろげる" : `あと ${Math.max(0, next.at - runs)}回で ひろがるよ`}</button>` : '<span class="garden-complete-note">おおきなおにわに なったね ✿</span>'}</div></section>`;
}

function renderGardenItemArt(item) {
  return item.id === "avatar" ? `<span class="garden-editor-companions">${renderAvatarLayered()}${renderPetCompanion(activePet(), { compact: true, showName: false })}</span>` : renderAssetSprite(item.sprite, item.name, "garden-item-sprite");
}

function renderGardenEditor() {
  const garden = gardenWorkingState(), items = gardenOwnedItems(), size = gardenMapSize();
  const selected = items.find(item => item.id === view.gardenSelectedId) || items[0];
  const floors = GARDEN_FLOORS.filter(floor => garden.ownedFloors.includes(floor.id));
  const paint = view.gardenTool === "floors" && floors.length > 1;
  const chosenFloor = floors.find(floor => floor.id === view.gardenSelectedFloor) || floors[0];
  const cursor = view.gardenCursor || { x: 1, y: 1 }, position = garden.layout[selected.id];
  const side = gardenItemFootprint(selected.id);
  const plan = gardenPlacementPlan(selected.id, cursor.x, cursor.y, garden.layout, size);
  const previewCells = gardenItemCells(paint ? "floor" : selected.id, cursor);
  const sizeLabel = id => gardenItemFootprint(id) === 2 ? "2×2マス" : "1マス";
  const rows = Array.from({ length: size - 2 }, (_, row) => `<div class="garden-edit-row" role="row">${Array.from({ length: size - 2 }, (_, column) => {
    const x = column + 1, y = row + 1;
    const item = items.find(item => item.id === gardenItemAt(garden.layout, x, y));
    const anchor = item && garden.layout[item.id].x === x && garden.layout[item.id].y === y;
    const current = x === cursor.x && y === cursor.y;
    const preview = previewCells.some(cell => cell.x === x && cell.y === y);
    const floor = gardenFloorAt(x, y), large = item && gardenItemFootprint(item.id) === 2;
    const art = anchor ? renderGardenItemArt(item) : item ? '<span class="garden-reserved-cell" aria-hidden="true">2 × 2</span>' : '<span class="garden-empty-cell" aria-hidden="true">＋</span>';
    return `<div role="gridcell"><button class="garden-edit-cell floor-${floor} ${current ? "is-cursor" : ""} ${item?.id === selected.id && !paint ? "is-selected-item" : ""} ${large ? "is-building-cell" : ""} ${preview && !paint ? plan.valid ? "is-placement-preview" : "is-placement-blocked" : ""}" data-action="garden-cell" data-x="${x}" data-y="${y}" ${item ? `data-occupant="${item.id}"` : ""} ${item && !paint ? `data-garden-drag="${item.id}"` : ""} tabindex="${current ? 0 : -1}" aria-label="${x}列 ${y}行、${item ? escapeHtml(item.name) + 'の場所、' + sizeLabel(item.id) : "あいている場所"}、${escapeHtml(GARDEN_FLOORS.find(f => f.id === floor)?.name || "しばふ")}。${paint ? "選んだ床をぬる" : side === 2 ? "ここを左上にして2×2マスに置く" : "選んだものを置く"}">${art}${item ? `<span class="garden-cell-name">${escapeHtml(item.name)}${anchor && large ? '<small>2×2マス</small>' : ""}</span>` : ""}</button></div>`;
  }).join("")}</div>`).join("");
  return `<section class="garden-editor" aria-label="おにわのもようがえ">
    <div class="garden-editor-heading"><h3>おにわの もようがえ</h3><p>${paint ? "すきな床を、すきな場所にぬろう。" : "建物は2×2マス。木や小物は1マスにおこう。"}</p>${floors.length > 1 ? `<div class="garden-editor-tabs"><button class="soft-button" data-action="garden-tool" data-tool="objects" aria-pressed="${!paint}">ものを おく</button><button class="soft-button" data-action="garden-tool" data-tool="floors" aria-pressed="${paint}">ゆかを ぬる</button></div>` : ""}</div>
    <div class="garden-shelf" data-play-scroll="${paint ? "garden-floor-shelf" : "garden-object-shelf"}" aria-label="${paint ? "手に入れた床" : "手に入れたもの"}">${paint ? floors.map(floor => `<button class="garden-shelf-card ${chosenFloor.id === floor.id ? "is-chosen" : ""}" data-action="garden-floor-select" data-floor-id="${floor.id}" aria-pressed="${chosenFloor.id === floor.id}"><span class="garden-floor-sample floor-${floor.id}" aria-hidden="true"></span><b>${escapeHtml(floor.name)}</b></button>`).join("") : items.map(item => `<button class="garden-shelf-card ${selected.id === item.id ? "is-chosen" : ""}" data-action="garden-item-select" data-item-id="${item.id}" data-garden-drag="${item.id}" aria-pressed="${selected.id === item.id}">${renderGardenItemArt(item)}<b>${escapeHtml(item.name)}</b><span class="garden-size-badge">${sizeLabel(item.id)}</span><small>${garden.layout[item.id] ? "おにわに あるよ" : "とどいたよ！ おいてみよう"}</small></button>`).join("")}</div>
    <div class="garden-edit-workspace"><div class="garden-edit-preview">${paint ? `<span class="garden-floor-sample floor-${chosenFloor.id}" aria-hidden="true"></span>` : renderGardenItemArt(selected)}<strong>${escapeHtml(paint ? chosenFloor.name : selected.name)}</strong>${paint ? "" : `<span class="garden-size-badge">${sizeLabel(selected.id)}</span>`}<p>${paint ? "マスをタップすると、ここだけぬれるよ。" : side === 2 ? "左上のマスをえらぶと、4マスにおけるよ。" : "ひっぱってはこぶか、マスをタップしてね。"}</p>${paint ? '<button class="soft-button" data-action="garden-paint-all">おにわ ぜんぶに ぬる</button><span>なんかいでも ぬれるよ</span>' : `<span class="garden-placement-note ${plan.valid ? "is-valid" : "is-invalid"}">${plan.valid ? plan.swap ? "同じ大きさのものと いれかえられるよ" : "みどりのわくに おけるよ" : plan.reason === "edge" ? "おにわの内側を えらんでね" : "あいた場所を えらんでね"}</span><button class="soft-button" data-action="garden-stow" ${position && !["home", "avatar"].includes(selected.id) ? "" : "disabled"}>いったん しまう</button>`}
    <div class="garden-cursor-pad" aria-label="置く場所を動かす"><button class="soft-button" data-action="garden-cursor" data-dx="0" data-dy="-1" aria-label="上の場所へ">↑</button><button class="soft-button" data-action="garden-cursor" data-dx="-1" data-dy="0" aria-label="左の場所へ">←</button><button class="soft-button" data-action="garden-cursor" data-dx="1" data-dy="0" aria-label="右の場所へ">→</button><button class="soft-button" data-action="garden-cursor" data-dx="0" data-dy="1" aria-label="下の場所へ">↓</button></div><button class="primary-button" data-action="garden-place-cursor" ${!paint && !plan.valid ? "disabled" : ""}>${paint ? "ここに ぬる" : "ここに おく"}</button></div>
    <div class="garden-edit-scroll" data-play-scroll="garden-editor" tabindex="0" aria-label="大きなおにわ。横と縦にスクロールできるよ"><div class="garden-edit-grid" role="grid" aria-label="おにわの配置マップ" style="--garden-columns:${size - 2}">${rows}</div></div></div>
    <p class="garden-edit-status" role="status">${escapeHtml(view.gardenMessage || "みどりのわくが、えらんでいる場所だよ。")}</p><div class="garden-editor-footer"><button class="soft-button" data-action="garden-undo" ${view.gardenHistory?.length ? "" : "disabled"}>ひとつ もどす</button><button class="primary-button" data-action="garden-edit">できあがり</button><button class="soft-button" data-action="garden-cancel">やめる</button></div></section>`;
}

function openGardenEditor() {
  if (view.gardenEditing && view.gardenDraft) {
    view.gardenMessage = "もようがえの つづきだよ。";
    render();
    return;
  }
  view.gardenEditing = true;
  view.gardenDraft = JSON.parse(JSON.stringify({ layout: state.garden.layout, baseFloor: state.garden.baseFloor, floorTiles: state.garden.floorTiles }));
  view.gardenHistory = [];
  view.gardenTool = "objects";
  view.gardenSelectedId = gardenOwnedItems().some(item => item.id === view.gardenSelectedId) ? view.gardenSelectedId : "home";
  view.gardenCursor = view.gardenDraft.layout[view.gardenSelectedId] || { x: 1, y: 1 };
  view.gardenMessage = "とどいたものを、すきな場所におこう。";
  render();
  window.requestAnimationFrame(() => {
    const control = document.querySelector(`[data-action="garden-item-select"][data-item-id="${view.gardenSelectedId}"]`);
    control?.focus?.({ preventScroll: true }); control?.scrollIntoView?.({ block: "nearest", behavior: "auto" });
  });
}

function closeGardenEditor(save) {
  if (!view.gardenEditing) return false;
  if (save) {
    state.garden.layout = view.gardenDraft.layout;
    state.garden.baseFloor = view.gardenDraft.baseFloor;
    state.garden.floorTiles = view.gardenDraft.floorTiles;
    saveState();
  }
  view.gardenEditing = false; view.gardenDraft = null; view.gardenHistory = [];
  render();
  window.requestAnimationFrame(() => {
    const control = document.querySelector('[data-action="garden-edit"]');
    control?.focus?.({ preventScroll: true }); control?.scrollIntoView?.({ block: "nearest", behavior: "auto" });
  });
  if (save) { playSfx("tap", "garden"); toast("すきなおにわに なったね！"); }
  return true;
}

function rememberGardenEdit() {
  view.gardenHistory ||= [];
  view.gardenHistory.push(JSON.parse(JSON.stringify(view.gardenDraft)));
  if (view.gardenHistory.length > 30) view.gardenHistory.shift();
}

function selectGardenItem(id) {
  if (!view.gardenEditing || !gardenOwnedItems().some(item => item.id === id)) return false;
  view.gardenTool = "objects"; view.gardenSelectedId = id;
  view.gardenCursor = view.gardenDraft.layout[id] || view.gardenCursor;
  view.gardenMessage = gardenItemFootprint(id) === 2 ? "2×2の あいた場所をえらぼう。左上のマスをタップしてね。" : "1マスの あいた場所におけるよ。";
  render(); focusGardenDestination(); return true;
}

function selectGardenFloor(id) {
  if (!view.gardenEditing || !state.garden.ownedFloors.includes(id) || !GARDEN_FLOORS.some(f => f.id === id)) return false;
  view.gardenSelectedFloor = id; view.gardenTool = "floors";
  view.gardenMessage = "1マスずつでも、ぜんぶでも ぬれるよ。";
  render(); focusGardenDestination(); return true;
}

function revealGardenDestination(cell, frame) {
  const side = view.gardenTool === "floors" ? 1 : gardenItemFootprint(view.gardenSelectedId);
  const lastX = Math.min(gardenMapSize() - 2, view.gardenCursor.x + side - 1);
  const lastY = Math.min(gardenMapSize() - 2, view.gardenCursor.y + side - 1);
  const last = document.querySelector(`[data-action="garden-cell"][data-x="${lastX}"][data-y="${lastY}"]`) || cell;
  const bounds = frame.getBoundingClientRect(), first = cell.getBoundingClientRect(), end = last.getBoundingClientRect();
  if (first.left < bounds.left) frame.scrollLeft -= bounds.left - first.left + 8;
  if (end.right > bounds.right) frame.scrollLeft += end.right - bounds.right + 8;
  if (first.top < bounds.top) frame.scrollTop -= bounds.top - first.top + 8;
  if (end.bottom > bounds.bottom) frame.scrollTop += end.bottom - bounds.bottom + 8;
}

function focusGardenDestination() {
  window.requestAnimationFrame(() => {
    if (!view.gardenEditing) return;
    const cell = document.querySelector(`[data-action="garden-cell"][data-x="${view.gardenCursor.x}"][data-y="${view.gardenCursor.y}"]`);
    const frame = document.querySelector('.garden-edit-scroll');
    if (!cell || !frame) return;
    revealGardenDestination(cell, frame);
    cell.focus({ preventScroll: true });
    frame.scrollIntoView({ block: "nearest", behavior: "auto" });
  });
}

function placeGardenItem(id, x, y) {
  if (!view.gardenEditing || !view.gardenDraft || !gardenOwnedItems().some(item => item.id === id)) return false;
  const layout = view.gardenDraft.layout, original = layout[id];
  if (gardenCellIsLand(x, y)) { view.gardenSelectedId = id; view.gardenCursor = { x, y }; }
  const plan = gardenPlacementPlan(id, x, y, layout);
  if (!plan.valid) {
    const area = gardenItemFootprint(id) === 2 ? "2×2の" : "1マスの";
    view.gardenMessage = plan.reason === "edge" ? `${area} 場所が、おにわから はみ出すよ。もう少し内側をえらんでね。` : `${area} あいた場所がいるよ。ここにあるものを、先にうごかしてね。`;
    render(); focusGardenDestination(); return false;
  }
  if (original?.x === x && original?.y === y) {
    view.gardenMessage = "ここに おいてあるよ。";
    render(); focusGardenDestination(); return false;
  }
  rememberGardenEdit();
  if (plan.swap) layout[plan.swap] = { ...original };
  layout[id] = { x, y };
  view.gardenSelectedId = id; view.gardenCursor = { x, y };
  view.gardenMessage = plan.swap ? "同じ大きさのものを いれかえたよ！" : "ここに おいたよ！";
  render(); focusGardenDestination(); playSfx("tap", "garden"); return true;
}

function paintGardenFloor(id, x, y, all = false) {
  if (!view.gardenEditing || !view.gardenDraft || !state.garden.ownedFloors.includes(id) || !GARDEN_FLOORS.some(f => f.id === id) || (!all && !gardenCellIsLand(x, y))) return false;
  if (all && view.gardenDraft.baseFloor === id && !Object.keys(view.gardenDraft.floorTiles).length) return false;
  if (!all && gardenFloorAt(x, y) === id) return false;
  rememberGardenEdit();
  if (all) { view.gardenDraft.baseFloor = id; view.gardenDraft.floorTiles = {}; }
  else { view.gardenCursor = { x, y }; view.gardenDraft.floorTiles[`${x},${y}`] = id; }
  view.gardenMessage = all ? "おにわの ゆかを ぬったよ！" : "ここを ぬったよ！";
  render(); playSfx("tap", "garden"); return true;
}

function gardenEditCell(x, y) {
  if (!view.gardenEditing || !gardenCellIsLand(x, y)) return false;
  view.gardenCursor = { x, y };
  return view.gardenTool === "floors" ? paintGardenFloor(view.gardenSelectedFloor, x, y) : placeGardenItem(view.gardenSelectedId, x, y);
}

function moveGardenCursor(dx, dy, focusCell = false) {
  if (!view.gardenEditing || !Number.isInteger(dx) || !Number.isInteger(dy) || Math.abs(dx) + Math.abs(dy) !== 1) return false;
  const size = gardenMapSize(), cursor = view.gardenCursor;
  const max = size - 1 - (view.gardenTool === "floors" ? 1 : gardenItemFootprint(view.gardenSelectedId));
  view.gardenCursor = { x: Math.max(1, Math.min(max, cursor.x + dx)), y: Math.max(1, Math.min(max, cursor.y + dy)) };
  render();
  window.requestAnimationFrame(() => {
    const cell = document.querySelector(`[data-action="garden-cell"][data-x="${view.gardenCursor.x}"][data-y="${view.gardenCursor.y}"]`);
    const frame = document.querySelector('.garden-edit-scroll');
    if (frame && cell) {
      revealGardenDestination(cell, frame);
      if (focusCell) cell.focus({ preventScroll: true });
    }
  });
  return true;
}

function stowGardenItem() {
  const id = view.gardenSelectedId;
  if (!view.gardenEditing || ["home", "avatar"].includes(id) || !gardenOwnedItems().some(item => item.id === id) || !view.gardenDraft.layout[id]) return false;
  rememberGardenEdit(); view.gardenDraft.layout[id] = null;
  view.gardenMessage = "しまったよ。いつでも またおけるよ。";
  render(); return true;
}

function undoGardenEdit() {
  if (!view.gardenEditing || !view.gardenHistory?.length) return false;
  view.gardenDraft = view.gardenHistory.pop(); view.gardenMessage = "ひとつ もどしたよ。";
  render(); return true;
}

function unlockGardenJourney() {
  const runs = gardenJourneyCount(), gifts = [];
  for (const item of GARDEN_FACILITIES) if (runs >= item.at && !state.garden.decorations.includes(item.id)) {
    state.garden.decorations.push(item.id); state.garden.layout[item.id] = null;
    if (item.id === "tree") state.garden.treeReady = true;
    if (item.id === "garden") state.garden.harvestReady = true;
    gifts.push({ ...item, kind: "facility" });
  }
  for (const floor of GARDEN_FLOORS) if (runs >= floor.at && !state.garden.ownedFloors.includes(floor.id)) {
    state.garden.ownedFloors.push(floor.id); gifts.push({ ...floor, kind: "floor" });
  }
  if (gardenExpansionAvailable() && runs === GARDEN_EXPANSIONS[state.garden.expansionLevel + 1].at) gifts.push({ id: "garden-more-space", name: "ひろがる おにわ", kind: "expansion" });
  return gifts;
}

function renderGardenJourneyGifts(gifts) {
  if (!gifts?.length) return "";
  return `<section class="garden-delivery"><h3>おにわの プレゼントが とどいたよ！</h3><div class="garden-delivery-list">${gifts.map(gift => `<div>${gift.kind === "floor" ? `<span class="garden-floor-sample floor-${gift.id}" aria-hidden="true"></span>` : gift.sprite ? renderAssetSprite(gift.sprite, gift.name) : '<span class="garden-gift-space" aria-hidden="true">✿</span>'}<strong>${escapeHtml(gift.name)}</strong></div>`).join("")}</div><button class="primary-button" data-action="garden-reward-open">おにわに ならべよう</button></section>`;
}

function renderLegacyLearn() {
  if (view.active) return renderActiveStage();
  if (view.result) return renderResult();

  const world = activeWorld();
  const completedCount = world.stages.filter((stage) => state.completedStages[stage.id]).length;
  const nextStage = world.stages.find((stage) => !state.completedStages[stage.id]) || world.stages[0];
  return `
    <section class="wide-panel learn-hero">
      <div class="section-heading">
        <div>
          <h2>${childWorldName(world)}</h2>
          <p>${world.target}のステージ。どこからでも選べて、ヒントを使ってもごほうびはへりません。</p>
        </div>
        <button class="primary-button" data-action="start-stage" data-stage-id="${nextStage.id}">つづきから</button>
      </div>
      <div class="world-switcher">
       ${WORLDS.map((candidate) => `
          <button class="world-chip ${candidate.id === world.id ? "active" : ""}" data-action="select-world" data-world-id="${candidate.id}">
           ${renderAssetSprite(candidate.sprite || (candidate.id === "w0" ? "tree" : "school"), childWorldName(candidate))}
            <span>${childWorldName(candidate)}</span>
         </button>
       `).join("")}
      </div>
      ${renderStudyVolumePicker(world)}
      ${renderWorldAdventureCard(world)}
      ${renderMeter(`${childWorldName(world)} ぜんたい`, Math.round((completedCount / world.stages.length) * 100))}
    </section>
    <div class="dashboard-grid" style="margin-top:18px">
      <section class="panel">
        <div class="section-heading">
          <h3>ステージ</h3>
          <span class="tag mint">${completedCount}/${world.stages.length}</span>
        </div>
        <div class="stage-grid stage-map" aria-label="おかしの小道の地図">
          ${world.stages.map(renderStageCard).join("")}
        </div>
      </section>
      <aside class="panel progress-stack">
        <h3>あそべること</h3>
        ${world.areas.map((area) => renderAreaSummary(area)).join("")}
      </aside>
    </div>
  `;
}

function adventureArcFor(stageOrWorld) {
  const worldId = typeof stageOrWorld === "string"
    ? stageOrWorld
    : stageOrWorld?.worldId || stageOrWorld?.id;
  return AGE_ADVENTURE_ARCS[worldId] || {
    age: "学びのぼうけん",
    icon: "✦",
    title: "ひらめきチーム",
    project: "今日のミッション",
    skills: "見つける・考える・たしかめる",
    promise: "自分の作戦で、次の一歩を見つけよう。"
  };
}

function renderWorldAdventureCard(world) {
  const arc = adventureArcFor(world);
  return `
    <section class="adventure-arc-card" aria-label="${escapeHtml(arc.age)}のぼうけん設計">
      <span class="adventure-arc-icon" aria-hidden="true">${arc.icon}</span>
      <div>
        <span>${escapeHtml(arc.age)}のぼうけん</span>
        <strong>${escapeHtml(arc.title)}：${escapeHtml(arc.project)}</strong>
        <p>${escapeHtml(arc.promise)}</p>
      </div>
      <small>${escapeHtml(arc.skills)}</small>
    </section>
  `;
}

function sessionQuestionCount(stage, snapshot = state) {
  if (stage?.mode !== "curriculum") return 5;
  return STUDY_VOLUMES[snapshot?.settings?.studyVolume]?.count || STUDY_VOLUMES.short.count;
}

function studyVolumeForStage(stage, snapshot = state) {
  if (stage?.mode !== "curriculum") return STUDY_VOLUMES.short;
  return STUDY_VOLUMES[snapshot?.settings?.studyVolume] || STUDY_VOLUMES.short;
}

function renderStudyVolumePicker(world) {
  const hasBankStage = world?.stages?.some((stage) => stage.mode === "curriculum");
  if (!hasBankStage) {
    return `<p class="study-volume-note">このワールドは、集中しやすい <b>5もん</b> の音あそびだよ。</p>`;
  }
  const active = studyVolumeForStage({ mode: "curriculum" });
  return `
    <section class="study-volume-picker" aria-label="きょうの問題の量">
      <div><strong>きょうの問題の量</strong><small>小学校問題バンクは、気分に合わせてえらべるよ。</small></div>
      <div class="study-volume-options">
        ${Object.values(STUDY_VOLUMES).map((volume) => `<button class="study-volume-option ${active.id === volume.id ? "active" : ""}" data-action="set-study-volume" data-volume="${volume.id}" aria-pressed="${active.id === volume.id}"><b>${volume.label}</b><span>${volume.detail}</span></button>`).join("")}
      </div>
    </section>
  `;
}

function renderLegacyStageCard(stage) {
  const done = state.completedStages[stage.id];
  const unlocked = true;
  const game = stage.game || stageBlueprintFor(stage);
  return `
    <article class="stage-card stage-theme-${stage.mode} ${done ? "done" : ""} ${unlocked ? "" : "locked"}" data-stage-theme="${stage.mode}">
      <div class="tag-row">
        <span class="tag mint">${stage.order}</span>
        <span class="tag peach">${stage.shortName}</span>
      </div>
      <div class="stage-visual">${renderAssetSprite(stageSprite(stage), stage.shortName)}</div>
      <div>
        <strong>${stage.name}</strong>
        <p class="question-sub">${escapeHtml(game?.goal || stage.theme)}</p>
      </div>
      <div class="tag-row">
        <span class="tag">${done ? `ほし ${done.stars}` : "えらべる"}</span>
        <span class="tag sky">${studyVolumeForStage(stage).detail}</span>
      </div>
      <button class="${done ? "soft-button" : "primary-button"}" data-action="start-stage" data-stage-id="${stage.id}">
        ${done ? "もういちど" : "あそぶ"}
      </button>
    </article>
  `;
}

function renderStageGameCard(stage, roundIndex = 0, questionCount = 5, solvedCount = 0) {
  const game = stage?.game || stageBlueprintFor(stage);
  if (!game) return "";
  const safeIndex = ((Math.max(0, Number(roundIndex) || 0)) % game.rounds.length + game.rounds.length) % game.rounds.length;
  const arc = adventureArcFor(stage);
  const safeQuestionCount = Math.max(1, Number(questionCount) || 5);
  const safeSolvedCount = Math.min(safeQuestionCount, Math.max(0, Number(solvedCount) || 0));
  return `
    <section class="stage-game-card game-effect-${escapeHtml(game.effect || "sparkle")}" aria-label="このステージのミニゲーム">
      <div class="stage-game-icon">${game.audioAsset ? renderAudioGameProp(game.audioAsset, game.title, "stage-audio-prop") : renderAssetSprite(game.sprite, game.title)}</div>
      <div class="stage-game-copy">
        <span class="stage-game-eyebrow">きょうのミニゲーム</span>
        <strong>${escapeHtml(game.title)}</strong>
        <p>${escapeHtml(game.goal)}</p>
        <small>${escapeHtml(game.rule)}</small>
      </div>
      <ol class="game-beat-track" aria-label="${game.rounds.length}つの見方。${questionCount}問のミッションでくり返すよ">
        ${game.rounds.map((round, index) => `<li class="${index < safeIndex ? "done" : index === safeIndex ? "current" : ""}" title="${escapeHtml(round.title)}"><span>${index < safeIndex ? "✓" : index + 1}</span><em>${escapeHtml(round.action)}</em></li>`).join("")}
      </ol>
      <div class="mission-build-strip" aria-label="${escapeHtml(arc.project)}の進み具合。${safeSolvedCount}/${safeQuestionCount}こ完成">
        <span>${arc.icon}</span><b>${escapeHtml(arc.project)}</b>
        <i>${Array.from({ length: safeQuestionCount }, (_, index) => `<em class="${index < safeSolvedCount ? "done" : index === safeSolvedCount ? "current" : ""}">${index < safeSolvedCount ? "✦" : "○"}</em>`).join("")}</i>
      </div>
    </section>
  `;
}

function renderAreaSummary(area) {
  const percent = areaProgress(area.id);
  return `
    <div class="summary-card">
      <strong>${area.name}</strong>
      <p class="question-sub">${area.theme}</p>
      ${renderMeter(area.shortName, percent)}
    </div>
  `;
}

function childWorldName(world) {
  // W0/W1 は開発・運用のID。子どもが見る地図には物語の場所だけを出す。
  return String(world?.childName || world?.name || "ぼうけん").replace(/^W\d+\s*/u, "");
}

function roleplayThemeFor(question) {
  if (question?.sceneId === "bakery") return "bakery";
  if (["garden", "orchard", "flowers", "petcare"].includes(question?.sceneId)) return "garden";
  if (question?.sceneId === "clock-cafe" || question?.mode === "clock") return "night";
  return "shop";
}

function roleplayRequestLine(question) {
  // The authored question carries essential conditions (units, order, values).
  // A generic role-play line must never replace the actual visible question.
  if (question?.prompt) {
    const prefix = `${question.playTitle}・${question.playProp}　`;
    if ((["keypad", "option-keypad"].includes(question.inputPattern) || question.lab?.type === "calculation") && question.prompt.startsWith(prefix)) return question.prompt.slice(prefix.length);
    return question.prompt;
  }
  const story = question?.world || {};
  const itemName = story.item?.name || question?.sceneVisual?.name || "おとどけもの";
  const count = Number(question?.slotFill?.targetCount ?? question?.total ?? question?.answer);
  if (question?.mode === "count" && Number.isFinite(count)) return `${itemName}を ${count}こ おねがい`;
  if (question?.mode === "compare") return "どっちが たっぷり？";
  if (question?.mode === "add") return "いっしょに そろえよう";
  if (question?.mode === "subtract") return "のこりを みせてね";
  if (question?.mode === "shape") return "ぴったりの かたち？";
  if (question?.mode === "size") return "ちいさいじゅんで おねがい";
  if (question?.mode === "order") return "どこに ならぶかな？";
  if (question?.mode === "pattern") return "つぎの もようは？";
  return story.dialogue || "ぴったりを さがそう";
}

function roleplayGuideLine(question) {
  if (question?.mode === "count" || question?.responseType === "slot-fill") return "ひとつずつ ぺたっ";
  if (question?.mode === "compare") return "となりに ならべてみよう";
  if (question?.mode === "add" || question?.mode === "subtract") return "うごかして みつけよう";
  return "ゆっくり みてみよう";
}

// 演出の花は解けた問題から導く。再描画・ヒント・再試行では増減しない。
// 報酬や習熟度とは独立し、中断して戻ってきたときも同じ花束になる。
function playJoyFor(active) {
  const questions = Array.isArray(active?.questions) ? active.questions : [];
  const total = questions.length;
  const solved = questions.filter((question) => Boolean(question.solved)).length;
  const complete = total > 0 && solved === total;
  const tier = complete ? 4 : solved ? Math.min(3, 1 + Math.floor((solved - 1) * 3 / Math.max(1, total - 1))) : 0;
  return { total, solved, complete, tier };
}

function renderJoyFlower(index, open = true) {
  const palette = ["#eea6ba", "#c8afe9", "#f2c66d", "#a3d4c3", "#edb4d8"];
  const color = open ? palette[index % palette.length] : "#e9e0df";
  return `<svg class="joy-flower ${open ? "is-bloomed" : "is-bud"}" viewBox="0 0 48 56" aria-hidden="true" focusable="false"><path d="M24 30V53M24 46Q9 33 11 46Q16 53 24 49M24 40Q39 28 37 41Q32 48 24 44" fill="${open ? "#95c2ad" : "#dedfd8"}" stroke="${open ? "#739e8b" : "#c7cec6"}" stroke-width="2" stroke-linecap="round"/>${open ? `<g fill="${color}">${[0,72,144,216,288].map(angle => `<ellipse cx="24" cy="12" rx="8" ry="10" transform="rotate(${angle} 24 24)"/>`).join("")}</g><circle cx="24" cy="24" r="8" fill="#fff5c8"/><path d="M21 25Q24 28 27 25" fill="none" stroke="#77555f" stroke-width="1.5" stroke-linecap="round"/><circle cx="21" cy="22" r="1" fill="#77555f"/><circle cx="27" cy="22" r="1" fill="#77555f"/>` : '<path d="M24 34Q8 19 20 16Q24 10 28 16Q40 19 24 34" fill="#e8dbdf" stroke="#d4c1ca" stroke-width="1.5"/>'}</svg>`;
}

function renderJoyBloomTrack(active) {
  const joy = playJoyFor(active);
  return `<section class="joy-bloom-track" data-joy-tier="${joy.tier}" aria-label="おともへの花束。${joy.solved}本さいた、ぜんぶで${joy.total}本"><div class="joy-bloom-copy"><strong>${joy.complete ? "花束、できあがり！" : joy.solved ? `おはなコンボ ${joy.solved}` : "おともに 花束をつくろう"}</strong><span>${joy.solved ? `${joy.solved} / ${joy.total} 本 さいたよ` : "てつだうたびに ぽんっと さくよ"}</span></div><div class="joy-flower-trail" aria-hidden="true">${Array.from({ length: joy.total }, (_, i) => `<span style="--bloom-delay:${i * 35}ms">${renderJoyFlower(i, i < joy.solved)}</span>`).join("")}</div></section>`;
}

function renderJoyBouquet(joy) {
  return `<div class="joy-bouquet ${joy.complete ? "is-complete" : ""}" aria-label="${joy.solved}本のお花"><div class="joy-bouquet-flowers" aria-hidden="true">${Array.from({ length: joy.solved }, (_, i) => renderJoyFlower(i)).join("")}</div><svg class="joy-bouquet-ribbon" viewBox="0 0 64 34" aria-hidden="true" focusable="false"><path d="M30 12Q6-5 6 13Q6 30 30 17L23 32L32 27L40 32L34 17Q58 30 58 13Q58-5 34 12" fill="#d795af" stroke="#a76583" stroke-width="2" stroke-linejoin="round"/><rect x="27" y="10" width="10" height="10" rx="4" fill="#eac1d0" stroke="#a76583" stroke-width="2"/></svg></div>`;
}

function joySoundPattern(joy) {
  const pitch = Math.pow(2, Math.min(7, Math.max(0, joy.solved - 1)) / 12);
  const notes = joy.complete ? [523.25,659.25,783.99,1046.5,987.77,1174.66,1567.98] : [523.25,659.25,783.99,1046.5].slice(0, 1 + joy.tier);
  const pattern = notes.map((hz, i) => [hz * pitch, i * 0.075, i === notes.length - 1 ? 0.2 : 0.11, "sine", 0.045]);
  if (joy.tier >= 2) pattern.push([261.63 * pitch, 0, 0.28, "triangle", 0.018]);
  if (joy.tier >= 3) pattern.push([392 * pitch, 0.075, 0.25, "sine", 0.016]);
  return pattern;
}

function renderRoleplayDots(active) {
  return active.questions.map((candidate, index) => `<i class="${candidate.solved ? "done" : index === active.index ? "current" : ""}" aria-hidden="true">${candidate.solved ? "✦" : "○"}</i>`).join("");
}

function renderRoleplayScene(question, active) {
  const story = question.world || {};
  const visual = question.sceneVisual?.src ? question.sceneVisual : question.gameVisual;
  const theme = roleplayThemeFor(question);
  const pet = activePet();
  const customerName = story.actor || pet?.name || "おきゃくさん";
  const progressLabel = active.isTreasure ? "もういちど" : `${active.index + 1}/${active.questions.length}`;
  return `
    <div class="roleplay-play-screen experience-refresh ${["keypad", "option-keypad"].includes(question.inputPattern) || question.lab?.type === "calculation" ? "calculation-input-scene" : ""}" data-play-scroll-key="${escapeHtml(active.stage.id)}:${active.index}">
      <div class="roleplay-hud" aria-label="あそびのメニュー">
        ${renderSpriteButton("atelier-pause", "uiBack", "おうちへ。おてつだいはつづけられるよ")}
        <span class="roleplay-progress-line" aria-label="${escapeHtml(progressLabel)}もんめ"><b>${escapeHtml(progressLabel)}</b><span class="roleplay-dot-row">${renderRoleplayDots(active)}</span></span>
        <span><span class="atelier-play-look">${renderAvatarLayered()}</span><button class="soft-button speak-button" data-action="speak" aria-label="${questionSpeechIsAvailable(question) ? "おねがいをきく" : "この問題の音声はまだありません"}" ${questionSpeechIsAvailable(question) ? "" : "disabled"}>♪ ${questionSpeechIsAvailable(question) ? "きく" : "音声なし"}</button></span>
      </div>
      ${renderJoyBloomTrack(active)}
      <section class="roleplay-stage roleplay-stage--${theme}" data-joy-tier="${playJoyFor(active).tier}" aria-label="${escapeHtml(story.place || "ごっこあそび")}">
        <div class="roleplay-scenery" aria-hidden="true">${visual?.src ? renderQuestionToken(visual, "scene-token") : ""}</div>
        <div class="roleplay-actor roleplay-actor--customer">${renderPetCompanion(pet, { compact: true, showName: false, className: "roleplay-customer-pet" })}</div>
        <p class="roleplay-speech roleplay-speech--customer"><b>${escapeHtml(customerName)}</b>「${escapeHtml(roleplayRequestLine(question))}」</p>
        <div class="roleplay-actor roleplay-actor--hero">${renderAvatarLayered()}</div>
        <div class="roleplay-actor roleplay-actor--pet">${renderAssetSprite("fairy", "ようせい", "roleplay-fairy")}</div>
        <p class="roleplay-speech roleplay-speech--guide">${escapeHtml(roleplayGuideLine(question))}</p>
        <section class="roleplay-task" aria-label="${escapeHtml(question.prompt)}">
          ${question.inputPattern === "keypad" && !question.solved ? '<button class="soft-button calculation-answer-shortcut" data-action="calculation-answer-focus">答えを いれる <span aria-hidden="true">↓</span></button>' : ""}
          <p class="roleplay-task-title">${escapeHtml(roleplayRequestLine(question))}</p>
          ${question.subPrompt ? `<p class="roleplay-instruction">${escapeHtml(question.subPrompt)}</p>` : ""}
          <div class="play-space" data-play-scroll="${escapeHtml(active.stage.id)}:${active.index}">
            <div class="roleplay-play-content ${question.responseType === "curriculum-lab" ? "roleplay-play-content--lab" : ""}">
              ${question.soundLayer ? renderLegacySoundLayer(question) : ""}
              ${renderQuestion(question)}
            </div>
          </div>
        </section>
      </section>
      ${view.hintIndex >= 0 && question.lab?.type !== "fraction" ? `<p class="roleplay-speech roleplay-speech--pet">${escapeHtml(question.hints[view.hintIndex] || roleplayGuideLine(question))}</p>` : ""}
      <span class="question-title" aria-hidden="true">${escapeHtml(question.prompt)}</span>
      <span class="question-sub" aria-hidden="true">${escapeHtml(question.subPrompt || "")}</span>
      ${renderFeedback(Boolean(question.solved))}
    </div>
  `;
}

function renderActiveStage() {
  const active = view.active;
  const question = active.questions[active.index];
  return renderRoleplayScene(question, active);
}

function renderQuestion(question) {
  if (question.responseType === "curriculum-lab") return renderCurriculumLabQuestion(question);
  if (question.responseType === "sound-mini-game") return renderSoundMiniGameQuestion(question);
  if (question.responseType === "slot-fill") return renderSlotFillQuestion(question);
  if (question.responseType === "pair-link") return renderPairLinkQuestion(question);
  if (question.responseType === "compare-gate") return renderCompareGateQuestion(question);
  if (question.responseType === "route-step") return renderRouteStepQuestion(question);
  if (question.responseType === "pattern-compose") return renderPatternComposeQuestion(question);
  if (question.responseType === "unit-ruler") return renderUnitRulerQuestion(question);
  if (question.responseType === "number-choice") return renderCountCardQuestion(question);
  if (question.responseType === "sequence") return renderSequenceQuestion(question);
  if (question.responseType === "place") return renderPlaceQuestion(question);
  if (question.responseType === "builder") return renderBuilderQuestion(question);
  if (question.responseType === "numberline") return renderNumberLineQuestion(question);
  if (question.responseType === "clockset") return renderClockSetterQuestion(question);
  if (question.mode === "count") return renderCountQuestion(question);
  if (question.mode === "compare") return renderCompareQuestion(question);
  if (question.mode === "shape") return renderShapeQuestion(question);
  if (question.mode === "size") return renderSizeQuestion(question);
  if (question.mode === "order") return renderOrderQuestion(question);
  if (question.mode === "pattern") return renderPatternQuestion(question);
  if (question.mode === "number" || question.mode === "add" || question.mode === "subtract") return renderNumberChoiceQuestion(question);
  if (question.mode === "clock") return renderClockQuestion(question);
  if (question.mode === "length") return renderLengthQuestion(question);
  return "";
}

function formatLabValue(value, fallback = "?") {
  if (value === undefined || value === null || value === "") return fallback;
  const raw = String(value).trim();
  // JavaScript の丸め誤差を子どもの問題面に出さない。採点に使う value 自体は
  // 変えず、ここでは表示だけを読みやすい十進表記に整える。
  if (/^-?(?:\d+\.?\d*|\.\d+)$/.test(raw)) {
    const numeric = Number(raw);
    if (Number.isFinite(numeric)) {
      const rounded = Math.round((numeric + Number.EPSILON) * 10000) / 10000;
      return String(rounded);
    }
  }
  return raw;
}

function curriculumToneFor(unit = {}) {
  const tones = ["sky", "peach", "mint", "violet", "sun", "rose"];
  const id = String(unit.id || unit.theme || unit.renderer || "curriculum");
  const hash = [...id].reduce((total, character) => (total + character.charCodeAt(0)) % tones.length, 0);
  return tones[hash];
}

function parseFractions(text) {
  return [...String(text || "").matchAll(/(\d+)\s*\/\s*(\d+)/g)]
    .map((match) => ({ numerator: Number(match[1]), denominator: Number(match[2]) }))
    .filter((fraction) => fraction.denominator > 0 && fraction.numerator >= 0);
}

function uniqueFractions(fractions) {
  const known = new Set();
  return fractions.filter((fraction) => {
    const key = `${fraction.numerator}/${fraction.denominator}`;
    if (known.has(key)) return false;
    known.add(key);
    return true;
  });
}

// Each line uses the numbers in this question. Pictures of all the answer
// choices and a unit's abstract objective are not steps towards a solution.
function fractionHintSteps(question) {
  if (question.lab?.type !== "fraction") return null;
  const lab = question.lab;
  const contract = question.contentContract || question.contract || "";
  const fractions = parseFractions(question.prompt);
  const first = fractions[0] || { numerator: Number(lab.numerator), denominator: Number(lab.denominator) };
  const second = fractions[1];
  const n = first.numerator, d = first.denominator;
  const step = (title, ...lines) => ({ title, lines });
  const f = (value) => `${value.numerator}/${value.denominator}`;
  const result = (numerator, denominator) => {
    const raw = `${numerator}/${denominator}`;
    const answer = String(question.answer);
    const divisor = gcd(numerator, denominator);
    if (raw === answer) return [raw];
    if (divisor > 1 && fractionText(numerator, denominator) === answer) {
      return [`${raw} = (${numerator} ÷ ${divisor})/(${denominator} ÷ ${divisor})`, `= ${answer}`];
    }
    return [`${raw} = ${answer}`];
  };
  const finalAnswer = step("答えを たしかめよう", `答え：${question.answer}`);
  switch (contract) {
    case "fraction-shaded":
      return [step("全部の数を 下に書こう", `分母 = ${d}`, `□/${d}`), step("ぬった数を 上に書こう", `分子 = ${n}`), step("上と下を あわせよう", `${n}/${d}`)];
    case "fraction-denominator":
      return [step("下の数が 分母だよ", `${n}/${d}`), step("下の数を 取り出そう", `${n}/${d} の分母 = □`), step("分母を たしかめよう", `分母 = ${d}`)];
    case "fraction-numerator":
      return [step("上の数が 分子だよ", `${n}/${d}`), step("上の数を 取り出そう", `${n}/${d} の分子 = □`), step("分子を たしかめよう", `分子 = ${n}`)];
    case "fraction-unit":
      return [step("分けた数を 下に書こう", `□/${Number(lab.denominator)}`), step("1つ分なら 上の数は1", `分子 = 1`), step("1つ分を たしかめよう", `1/${Number(lab.denominator)}`)];
    case "fraction-complement":
      return [step("全部から ぬった数を引こう", `${d} − ${n} = □`), step("分母は そのままだよ", `(${d} − ${n})/${d}`), step("のこりを たしかめよう", `${d} − ${n} = ${d - n}`, ...result(d - n, d))];
    case "fraction-same-denominator-compare":
    case "fraction-smallest": {
      const values = uniqueFractions((question.options || []).flatMap((option) => parseFractions(option.label)));
      const upper = values.map((value) => value.numerator).sort((a, b) => a - b);
      return [step("分母が同じなら 上の数を見よう", `分母 = ${d}`), step(contract === "fraction-smallest" ? "いちばん小さい 上の数は？" : "いちばん大きい 上の数は？", upper.join("、")), finalAnswer];
    }
    case "fraction-step":
      return [step("上の数に 1を足そう", `(${n} + 1)/${d}`), step("分母は そのままだよ", `${n} + 1 = □`, `□/${d}`), step("1つ分ふえたね", ...result(n + 1, d))];
    case "same-denominator-calc":
    case "same-denominator-inverse": {
      if (!second) break;
      const subtract = contract === "same-denominator-inverse" || lab.operation === "subtract";
      const op = subtract ? "−" : "+";
      const b = second.numerator;
      return [step("分母を残して 上の数を計算しよう", `(${n} ${op} ${b})/${d}`), step("上の計算を やってみよう", `${n} ${op} ${b} = □`, `□/${d}`), step("分母も たしかめよう", ...result(subtract ? n - b : n + b, d))];
    }
    case "same-denominator-rule":
      return [step("同じ分母は そのままだよ", `${n}/${d}`, second ? f(second) : `分母 = ${d}`), step("変えるのは 上の数だけ", second ? `(${n} + ${second.numerator})/${d}` : `□/${d}`), step("分母を たしかめよう", `分母 = ${d}`)];
    case "same-denominator-compare":
      if (second) return [step("分母が同じなら 上の数を見よう", `分母 = ${d}`), step("上の2つの数を くらべよう", `${n} と ${second.numerator}`), finalAnswer];
      break;
    case "same-denominator-step": {
      const match = question.prompt.match(/分子を(\d+)から(\d+)/);
      if (!match) break;
      const before = Number(match[1]), after = Number(match[2]);
      return [step("あとから まえの数を引こう", `${after} − ${before} = □`), step("ふえた数を 数えよう", `${before} + □ = ${after}`), step("ふえた数を たしかめよう", `${after} − ${before} = ${after - before}`)];
    }
    case "fraction-different-denominator-compare":
    case "common-denominator-compare":
    case "common-denominator-add":
    case "common-denominator-inverse": {
      if (!second) break;
      const bd = second.denominator, b = second.numerator;
      const common = d * bd / gcd(d, bd), leftFactor = common / d, rightFactor = common / bd;
      const left = n * leftFactor, right = b * rightFactor;
      const convert = (a, den, factor) => `${a}/${den} = (${a} × ${factor})/(${den} × ${factor})`;
      const prepare = step(`下の数を ${common}にそろえよう`, convert(n, d, leftFactor), convert(b, bd, rightFactor));
      if (contract.includes("compare")) return [prepare, step("そろえたら 上の数をくらべよう", `${n}/${d} = ${left}/${common}`, `${b}/${bd} = ${right}/${common}`, `${left} と ${right}`), finalAnswer];
      const subtract = contract === "common-denominator-inverse", op = subtract ? "−" : "+";
      return [prepare, step("分母はそのまま 上の数を計算しよう", `${left}/${common} ${op} ${right}/${common}`, `= (${left} ${op} ${right})/${common}`), step("計算して たしかめよう", ...result(subtract ? left - right : left + right, common))];
    }
    case "common-denominator-convert": {
      const target = Number(question.prompt.match(/分母(\d+)/)?.[1]);
      const factor = target / d;
      if (!Number.isInteger(factor) || factor < 1) break;
      return [step(`下の数を ${target}にしよう`, `${d} × ${factor} = ${target}`), step(`上にも 同じ${factor}を掛けよう`, `${n}/${d} = (${n} × ${factor})/(${d} × ${factor})`), step("指定の分母に なったね", `${n}/${d} = ${n * factor}/${target}`)];
    }
    case "common-denominator-rule":
      return [step("上と下に 同じ数を掛けよう", "たとえば 1/2"), step("上も下も 2倍してみよう", "1/2 = (1 × 2)/(2 × 2)", "= 2/4"), step("大きさを変えずに そろえられるよ", "分子と分母に 同じ数を掛ける")];
    case "fraction-multiply":
    case "fraction-divide": {
      if (!second) break;
      const divide = contract === "fraction-divide";
      const b = divide ? second.denominator : second.numerator;
      const bd = divide ? second.numerator : second.denominator;
      const prepare = divide
        ? step("割る分数を ひっくり返して掛けよう", `${n}/${d} ÷ ${f(second)}`, `= ${n}/${d} × ${b}/${bd}`)
        : step("上どうし 下どうしを掛けよう", `${n}/${d} × ${b}/${bd}`, `= (${n} × ${b})/(${d} × ${bd})`);
      return [prepare, step("上と下を 別々に計算しよう", `${n} × ${b} = □`, `${d} × ${bd} = □`), step("計算して 約分もたしかめよう", ...result(n * b, d * bd))];
    }
    case "fraction-divide-reciprocal":
      if (second) return [step("ひっくり返すのは 割る分数だよ", f(second)), step("上と下を 入れかえよう", `${f(second)} → ${second.denominator}/${second.numerator}`), step("割り算を 掛け算に変えよう", `${n}/${d} ÷ ${f(second)}`, `= ${n}/${d} × ${second.denominator}/${second.numerator}`)];
      break;
    case "fraction-multiply-numerator":
      if (second) return [step("分子は 上どうしの掛け算だよ", `${n} × ${second.numerator} = □`), step("分母の数字は 使わないよ", `(${n} × ${second.numerator})/(${d} × ${second.denominator})`), step("この式の分子を たしかめよう", `${n} × ${second.numerator} = ${n * second.numerator}`)];
      break;
    case "fraction-scale": {
      const times = Number(question.prompt.match(/を(\d+)倍/)?.[1]);
      if (!times) break;
      return [step("上の数を 倍にしよう", `(${n} × ${times})/${d}`), step("下の数は そのままだよ", `${n} × ${times} = □`, `□/${d}`), step("倍にした分を たしかめよう", ...result(n * times, d))];
    }
    case "fraction-result-size":
      return [step("1は 上と下が同じ数だよ", `1 = ${d}/${d}`), step("上の数を くらべよう", `${n} と ${d}`), step("1との大きさを たしかめよう", `${n}/${d} ${n < d ? "<" : n > d ? ">" : "="} 1`, question.answer === "同じ" ? "1と同じ" : `1より${question.answer}`)];
  }
  return [step("問題の 上と下の数を見よう", f(first)), step("この問題の 手順をたしかめよう", question.explanation || "同じ大きさの分数に そろえてみよう。"), finalAnswer];
}

function fractionHintText(step) {
  return `${step.title}。${step.lines.join("。")}`;
}

function refreshFractionHints(question) {
  if (question?.lab?.type !== "fraction") return question;
  const original = question.prompt;
  const prompt = String(original || "")
    .replace(/(\d+\/\d+)は1より(?:小さい|大きい)？/, "$1を1と比べると？")
    .replace(/(\d+\/\d+\s*×\s*\d+\/\d+)の分子は？/, "$1。約分する前の、答えの分子は？")
    .replace(/を足すと、分母は？/, "を足すと、約分する前の分母は？");
  const first = parseFractions(prompt)[0];
  const q = { ...question, prompt, fractionHintVersion: 1 };
  if (q.contentContract === "fraction-result-size" && first) q.lab = { ...q.lab, ...first };
  if (typeof q.audioScript === "string" && original !== prompt) q.audioScript = q.audioScript.replace(original, prompt);
  q.hints = fractionHintSteps(q).map(fractionHintText);
  return q;
}

function renderFractionMathLine(line) {
  const text = String(line);
  const pattern = /(\([^()]+\)|[\d□]+)\s*\/\s*(\([^()]+\)|[\d□]+)/g;
  let cursor = 0, html = "";
  for (const match of text.matchAll(pattern)) {
    if (match.index > cursor) html += `<span class="fraction-math-text">${escapeHtml(text.slice(cursor, match.index))}</span>`;
    const clean = (part) => part.startsWith("(") ? part.slice(1, -1) : part;
    html += `<span class="fraction-number"><span>${escapeHtml(clean(match[1]))}</span><span>${escapeHtml(clean(match[2]))}</span></span>`;
    cursor = match.index + match[0].length;
  }
  if (cursor < text.length) html += `<span class="fraction-math-text">${escapeHtml(text.slice(cursor))}</span>`;
  return `<div class="fraction-work-math" aria-label="${escapeHtml(text)}"><span class="fraction-math-layout" aria-hidden="true">${html}</span></div>`;
}

function renderFractionHelp(question) {
  if (question.isPlacement || question.solved) return "";
  const steps = fractionHintSteps(question);
  const opened = view.hintIndex >= 0 && !view.fractionHintClosed;
  return `<section class="fraction-help" aria-label="分数のヒント"><button class="soft-button fraction-hint-toggle" data-action="fraction-hint-toggle" aria-expanded="${opened}" aria-controls="fractionHintWork">${opened ? "ヒントを とじる" : view.hintIndex >= 0 ? "途中式を もう一度みる" : "途中式の ヒントをみる"}</button>${opened ? `<div id="fractionHintWork" class="fraction-hint-work" role="status">${steps.slice(0, view.hintIndex + 1).map((step, index) => `<section class="fraction-work-step" data-hint-step="${index}"><h4><span>${index + 1}</span>${escapeHtml(step.title)}</h4>${step.lines.map(renderFractionMathLine).join("")}</section>`).join("")}${view.hintIndex < 2 ? `<button class="soft-button fraction-hint-next" data-action="show-hint">${view.hintIndex === 0 ? "次の 途中式をみる" : "答えまで たしかめる"}</button>` : ""}</div>` : ""}</section>`;
}

function renderFractionProblemBoard(question) {
  const fractions = parseFractions(question.prompt);
  const contract = question.contentContract || "";
  const first = fractions[0] || { numerator: question.lab.numerator, denominator: question.lab.denominator };
  const f = (value) => `${value.numerator}/${value.denominator}`;
  let lines;
  if (/compare|smallest/.test(contract)) {
    const values = fractions.length >= 2 ? fractions : uniqueFractions((question.options || []).flatMap((option) => parseFractions(option.label)));
    lines = [values.map(f).join("　と　")];
  } else if (contract === "fraction-result-size") {
    lines = [`${f(first)} □ 1`];
  } else if (contract === "common-denominator-convert") {
    const target = question.prompt.match(/分母(\d+)/)?.[1];
    lines = [`${f(first)} = □/${target || "□"}`];
  } else if (contract === "same-denominator-step") {
    const match = question.prompt.match(/分子を(\d+)から(\d+)/);
    lines = match ? [`分子：${match[1]} → ${match[2]}`] : [f(first)];
  } else if (contract === "fraction-unit" || contract === "fraction-shaded") {
    lines = [`全部を ${question.lab.denominator}こに 等しく分けたよ`];
  } else if (contract === "common-denominator-rule") {
    lines = ["分子と分母を どう変える？"];
  } else if (contract === "fraction-complement") {
    lines = [`ぬった部分：${f(first)}`];
  } else if (fractions.length >= 2) {
    const op = { add: "+", subtract: "−", multiply: "×", divide: "÷" }[question.lab.operation];
    const actualOp = contract === "fraction-divide-reciprocal" ? "÷" : contract === "fraction-step" ? "+" : op;
    lines = [`${f(first)} ${actualOp || "と"} ${f(fractions[1])}`];
  } else if (contract === "fraction-scale") {
    lines = [`${f(first)} × ${question.prompt.match(/を(\d+)倍/)?.[1] || "□"}`];
  } else lines = [f(first)];
  const d = Number(question.lab.denominator), n = Number(question.lab.numerator);
  // Only a shaded-parts question needs a picture to read. Use visibly equal
  // pieces, rather than an unlabelled circle that clips improper fractions.
  const pieces = contract === "fraction-shaded" && Number.isInteger(d) && d >= 2 && d <= 12
    ? `<div class="fraction-given-parts" style="--parts:${d}" role="img" aria-label="${d}等分のうち${n}こに色がついている">${Array.from({ length: d }, (_, index) => `<span class="${index < n ? "is-shaded" : ""}"></span>`).join("")}</div>` : "";
  return `<div class="fraction-problem-board" data-fraction-contract="${escapeHtml(contract)}">${pieces}${lines.map(renderFractionMathLine).join("")}</div>`;
}

function renderFractionPiece(fraction, className = "") {
  const numerator = Math.max(0, Number(fraction?.numerator) || 0);
  const denominator = Math.max(1, Number(fraction?.denominator) || 1);
  const percent = Math.min(100, numerator / denominator * 100);
  // 数える前に分数記号を見せると、塗った部分を数える問いの答えを画面が
  // 先に言ってしまう。記号は支援技術・監査用に残し、子どもが見る盤面では
  // 色のついたピースそのものを手がかりにする。
  return `<figure class="lab-fraction-piece ${className}" aria-label="${numerator}/${denominator}"><span class="lab-fraction-pie" style="--fraction:${percent}%"></span><figcaption class="lab-answer-hidden">${numerator}/${denominator}</figcaption></figure>`;
}

function clockTextFromMatch(match) {
  if (!match) return "？";
  const hour = Number(match[1]);
  const minute = Number(match[2] || 0);
  return `${hour}:${String(minute).padStart(2, "0")}`;
}

function renderCurriculumLabQuestion(question) {
  const lab = question.lab || { type: "calculation" };
  const unit = question.curriculum || {};
  const tone = curriculumToneFor(unit);
  return `
    <section class="curriculum-lab curriculum-lab--${escapeHtml(lab.type || "calculation")} curriculum-tone-${tone}" data-mechanic="${escapeHtml(unit.mechanic || "math-lab")}" data-curriculum-id="${escapeHtml(unit.id || "curriculum")}" data-curriculum-world="${escapeHtml(unit.worldId || "")}" data-board-type="${escapeHtml(unit.renderer || lab.type || "calculation")}" data-interaction="${escapeHtml(question.interactionType || "lab")}" data-representation="${escapeHtml(question.representation || "図")}" aria-label="${escapeHtml(unit.name || "数学ミニゲーム")}">
      <div class="curriculum-lab-kicker"><span>${escapeHtml(question.representationLabel || unit.strand || "数学")}</span><b>${escapeHtml(question.interactionLabel || unit.theme || "まなび")}</b></div>
      <div class="curriculum-bank-meta"><span>${escapeHtml(question.templateLabel || "ミッション")}</span><span>${escapeHtml(question.difficultyBand || "土台")}</span></div>
      ${renderCurriculumMissionFrame(question)}
      ${renderCurriculumLabBoard(lab, question)}
      ${lab.type === "fraction" ? question.inputPattern === "keypad" ? "" : renderFractionHelp(question) : `<p class="mission-instruction">${escapeHtml(question.stageGame?.proofCue || "図と数を行き来して、ぴったりの答えを選ぼう。")}</p>`}
    </section>
    ${renderCurriculumAnswerControls(question, lab)}
    ${lab.type === "fraction" && question.inputPattern === "keypad" ? renderFractionHelp(question) : ""}
    ${renderCalculationBeads(question)}
  `;
}

function renderCurriculumMissionFrame(question) {
  const style = question.playStyle || "classic";
  const icon = question.playIcon || "✦";
  const title = question.playTitle || question.templateLabel || "ミッション";
  const cue = question.playCue || question.subPrompt || "手がかりを見つけよう。";
  const prop = question.playProp || "ひらめき";
  const phaseId = question.cpaPhaseId || CPA_PHASES[Number(question.cpaPhase) || 0] || "concrete";
  const phaseNumber = Math.max(0, CPA_PHASES.indexOf(phaseId)) + 1;
  const phaseLabel = question.cpaPhaseLabel || CPA_PHASE_LABELS[phaseId] || "やってみる";
  return `
    <div class="curriculum-mission-frame mission-play--${escapeHtml(style)}" data-play-style="${escapeHtml(style)}" aria-label="${escapeHtml(title)}">
      <span class="curriculum-mission-icon" aria-hidden="true">${escapeHtml(icon)}</span>
      <div><b>${escapeHtml(title)}</b><small>${escapeHtml(cue)}</small><span class="curriculum-cpa-phase">${phaseNumber}/5 ${escapeHtml(phaseLabel)}</span></div>
      <span class="curriculum-mission-prop">${escapeHtml(prop)}</span>
      <i class="curriculum-mission-spark" aria-hidden="true"></i>
    </div>
  `;
}

function renderCurriculumOptionButtons(question, inputStyle, playStyle, symbol, action, selectedValue = null) {
  return (question.options || []).map((option, index) => {
    const selected = selectedValue !== null && String(selectedValue) === String(option.value);
    return `<button class="curriculum-answer-option curriculum-answer-option--${inputStyle} mission-choice--${escapeHtml(playStyle)} ${selected ? "is-selected" : ""} ${answerChoiceClass(question, option.value)}" data-action="${action}" data-value="${escapeHtml(String(option.value))}" aria-pressed="${selected}" ${question.solved ? "disabled" : ""}><span aria-hidden="true">${escapeHtml(question.playIcon || symbol)}</span><b>${escapeHtml(formatLabValue(option.label))}</b><small>${index + 1}</small>${renderAnswerMark(question, option.value)}</button>`;
  }).join("");
}

// 編集の楽しさと採点を分ける。数字・小数点・分数線は入力した順を保ち、
// どの答えを入力しても同じチャームと音で応える。
function renderCalculationCharms(question, { cardNumber = false, value = null } = {}) {
  const typed = String(view.curriculumInput?.typed || "");
  const text = String(value !== null ? formatLabValue(value) : typed);
  const label = cardNumber ? (typed ? `${typed}ばんのカード` : "カードをえらぼう") : "こたえのリボン";
  const spoken = cardNumber ? (typed ? `${label}、選んだ答えは ${text}` : "まだカードをえらんでいません") : `入力した答えは ${text || "まだありません"}`;
  const charms = !text ? '<span class="calculation-charm-empty">？</span>' : text.length > 14 ? `<span class="calculation-card-charm">${escapeHtml(text)}</span>` : [...text].map((digit, index) => `<span class="calculation-digit-charm ${index === text.length - 1 ? "is-last" : ""} ${/\d/.test(digit) ? "" : "is-symbol"}" style="--charm-index:${index};--charm-color:${["#ffe1eb", "#eee4ff", "#dff3ea"][index % 3]}"><i>${escapeHtml(digit === "-" ? "−" : digit)}</i></span>`).join("");
  return `<div class="calculation-charms" data-charm-mode="${cardNumber ? "card" : "answer"}"><span class="calculation-charm-caption">${escapeHtml(label)}</span><div class="curriculum-keypad-display calculation-charm-tray" role="status" aria-label="${escapeHtml(spoken)}"><span class="calculation-charm-string" aria-hidden="true">${charms}</span></div></div>`;
}

function calculationBeadPlan(question) {
  // 同じ計算盤面でも、十の位・見積もり・逆算の穴などは別の問い。
  // 式の結果そのものを求める整数の加減算だけに、この途中式を使う。
  if (question?.responseType !== "curriculum-lab" || !["column-calc", "inverse-calc"].includes(question.contentContract) || question.lab?.type !== "calculation") return null;
  const a = Number(question.lab.left), b = Number(question.lab.right);
  const operation = question.lab.operator;
  if (![a, b].every(value => Number.isSafeInteger(value) && value >= 0 && value <= 9999) || !["+", "−", "-"].includes(operation)) return null;
  const addition = operation === "+";
  const result = addition ? a + b : a - b;
  if (result < 0 || !isCorrect(question, result)) return null;
  const onesA = a % 10, onesB = b % 10;
  if (addition ? onesA === 0 || onesA + onesB < 10 : onesA >= onesB) return null;
  return { a, b, addition, onesA, onesB, moves: addition ? 10 - onesA : onesB };
}

function renderCalculationBeadDots(count, { tenFrame = false, ribbon = false } = {}) {
  const slots = tenFrame ? 10 : count;
  return `<span class="calculation-bead-dots ${tenFrame ? "is-ten-frame" : ""} ${ribbon ? "is-ribbon" : ""}" aria-hidden="true">${Array.from({ length: slots }, (_, index) => `<i class="${index < count ? "is-filled" : ""}">${index < count ? "♥" : ""}</i>`).join("")}${ribbon ? '<svg class="calculation-bead-bow" viewBox="0 0 64 34" focusable="false"><path d="M30 12Q6-5 6 13Q6 30 30 17L23 32L32 27L40 32L34 17Q58 30 58 13Q58-5 34 12" fill="#d795af" stroke="#a76583" stroke-width="2" stroke-linejoin="round"/><rect x="27" y="10" width="10" height="10" rx="4" fill="#eac1d0" stroke="#a76583" stroke-width="2"/></svg>' : ''}</span>`;
}

function renderCalculationBeads(question) {
  const plan = calculationBeadPlan(question);
  if (!plan) return "";
  const draft = view.curriculumInput?.beadHelp || {};
  const open = Boolean(draft.open);
  const moves = Math.min(plan.moves, Math.max(0, Number(draft.moves) || 0));
  const unwrapped = Boolean(draft.unwrapped);
  const done = plan.addition ? moves === plan.moves : unwrapped && moves === plan.moves;
  const leftBase = plan.a - plan.onesA - (!plan.addition && unwrapped ? 10 : 0);
  const leftOnes = plan.addition ? plan.onesA + moves : plan.onesA + (unwrapped ? 10 : 0) - moves;
  const rightBase = plan.b - plan.onesB;
  const rightOnes = plan.onesB - moves;
  const equation = plan.addition
    ? `${plan.a + moves} + ${plan.b - moves} = ？`
    : `${leftBase} + ${leftOnes} − ${rightBase} − ${rightOnes} = ？`;
  const cue = plan.addition
    ? done ? "10こで、リボンになった！" : "右から 1こずつ、10こにしよう"
    : !unwrapped ? "10のリボンを、ばらにしよう" : done ? "ばらをひいたら、まとまりもひこう" : "ばらを 1こずつ ひこう";
  const button = done ? "答えに もどる" : plan.addition ? "ビーズを 1こ うつす" : !unwrapped ? "10のリボンを ほどく" : "ビーズを 1こ ひく";
  const status = plan.addition ? `${moves}こ うつしたよ` : !unwrapped ? "10こを ほどけるよ" : `${moves}こ ひいたよ`;
  const canDrag = !done && (plan.addition || unwrapped);
  const dish = (left) => {
    const source = (plan.addition ? !left : left) && (plan.addition || unwrapped);
    const target = canDrag && !source;
    const tag = source ? "button" : "div";
    const title = left ? plan.addition ? "あつめる おさら" : "のこす おさら" : plan.addition ? "うつす おさら" : "ひく ビーズ";
    const base = left ? leftBase : rightBase;
    const ones = left ? leftOnes : rightOnes;
    return `<${tag} class="calculation-bead-dish ${source ? "calculation-bead-pickup" : ""}" ${source ? `data-action="calculation-beads-move" data-bead-control="${left ? "left" : "right"}" ${done ? '' : 'data-bead-drag="true"'} aria-label="${done ? '答えに もどる' : `${plan.addition ? "ビーズをつまんで、左のおさらへ" : "ビーズをつまんで、右のおさらへ"}。タップでも1こ動かせるよ`}" ${question.solved ? "disabled" : ""}` : target ? 'data-bead-drop="true"' : ''}><span>${title}</span><b>${base} + ${ones}</b>${renderCalculationBeadDots(ones, { tenFrame: left && plan.addition, ribbon: left && plan.addition && done })}${source ? `<small>${done ? '答えに もどれるよ' : '1こ つまんで うつせるよ'}</small>` : ''}</${tag}>`;
  };
  return `<section class="calculation-bead-help" data-bead-operation="${plan.addition ? "add" : "subtract"}" aria-label="ビーズの途中式ヒント"><button class="soft-button calculation-bead-toggle" data-action="calculation-beads-toggle" aria-expanded="${open}" aria-controls="calculationBeadWork" ${question.solved ? "disabled" : ""}><span aria-hidden="true">♥</span>${open ? "ビーズを とじる" : "ビーズで考える（ヒント）"}</button>${open ? `<div id="calculationBeadWork" class="calculation-bead-work ${done ? "is-bundled" : ""}"><p>${cue}</p><div class="calculation-bead-trays">${dish(true)}${dish(false)}</div><p class="calculation-bead-equation" aria-label="途中式">${equation}</p><span class="calculation-bead-status" role="status">${status}</span>${done ? '<p class="calculation-bead-finish">この途中式で、答えを入れてみよう</p>' : ''}<button class="primary-button calculation-bead-move" data-action="calculation-beads-move" data-bead-control="bottom" ${question.solved ? "disabled" : ""}>${button}</button></div>` : ""}</section>`;
}

function renderCurriculumKeypad(question, inputStyle, playStyle, symbol, instruction) {
  const input = view.curriculumInput || { typed: "" };
  const typed = String(input.typed || "");
  const keys = question.keypadKeys || ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  return `
    <section class="curriculum-answer-board curriculum-answer-board--${inputStyle} curriculum-answer-board--keypad mission-play--${escapeHtml(playStyle)}" data-input-style="${inputStyle}" data-input-pattern="keypad" data-play-style="${escapeHtml(playStyle)}" aria-label="${escapeHtml(instruction)}">
      <p>${escapeHtml(instruction)}</p>
      ${renderCalculationCharms(question)}
      <div class="curriculum-keypad">
        ${keys.map((key, index) => `<button class="curriculum-key calculation-charm-key" style="--key-color:${["#ffe1eb", "#eee4ff", "#dff3ea"][index % 3]}" data-action="curriculum-key" data-value="${escapeHtml(key)}" ${question.solved ? "disabled" : ""}><span>${escapeHtml(key === "-" ? "−" : key)}</span><i aria-hidden="true">${["♥", "✿", "✦"][index % 3]}</i></button>`).join("")}
        <button class="curriculum-key curriculum-key--erase" data-action="curriculum-key-erase" ${question.solved || !typed ? "disabled" : ""}>ひとつ消す</button>
      </div>
      <div class="curriculum-interaction-row"><span>数字や分数を組み立ててね</span><button class="curriculum-commit-button" data-action="curriculum-key-submit" ${question.solved || !typed ? "disabled" : ""}>${escapeHtml(question.inputActionLabel || "計算する")}</button></div>
    </section>
  `;
}

function renderCurriculumOptionKeypad(question, inputStyle, playStyle, symbol, instruction) {
  const input = view.curriculumInput || { typed: "" };
  const typed = String(input.typed || "");
  const selectedIndex = Number(typed) - 1;
  const selectedOption = question.options?.[selectedIndex] || null;
  const keys = question.keypadKeys || ["1", "2", "3", "4"];
  return `
    <section class="curriculum-answer-board curriculum-answer-board--${inputStyle} curriculum-answer-board--option-keypad mission-play--${escapeHtml(playStyle)}" data-input-style="${inputStyle}" data-input-pattern="option-keypad" data-play-style="${escapeHtml(playStyle)}" aria-label="${escapeHtml(instruction)}">
      <p>${escapeHtml(instruction)}。答えカードの番号を1つ入れよう</p>
      <div class="curriculum-answer-options curriculum-option-keypad-cards" role="list" aria-label="答えカードは4枚">
        ${(question.options || []).map((option, index) => `<article class="curriculum-answer-option curriculum-answer-option--${inputStyle} curriculum-option-keypad-card mission-choice--${escapeHtml(playStyle)} ${index === selectedIndex ? "is-number-selected" : ""}" data-option-keypad-number="${index + 1}" role="listitem" aria-label="${index + 1}番、${escapeHtml(formatLabValue(option.label))}"><span class="curriculum-option-keypad-number" aria-hidden="true">${index + 1}</span><b>${escapeHtml(formatLabValue(option.label))}</b></article>`).join("")}
      </div>
      ${renderCalculationCharms(question, { cardNumber: true, value: selectedOption ? selectedOption.label : "" })}
      <div class="curriculum-keypad">
        ${keys.map((key, index) => `<button class="curriculum-key calculation-charm-key" style="--key-color:${["#ffe1eb", "#eee4ff", "#dff3ea"][index % 3]}" data-action="curriculum-key" data-value="${escapeHtml(key)}" ${question.solved ? "disabled" : ""}><span>${escapeHtml(key)}<small>ばん</small></span><i aria-hidden="true">${["♥", "✿", "✦"][index % 3]}</i></button>`).join("")}
        <button class="curriculum-key curriculum-key--erase" data-action="curriculum-key-erase" ${question.solved || !typed ? "disabled" : ""}>ひとつ消す</button>
      </div>
      <div class="curriculum-interaction-row"><span>${selectedOption ? `${escapeHtml(typed)}ばんのカードをえらんだよ` : "1〜4の番号を入れてね"}</span><button class="curriculum-commit-button" data-action="curriculum-key-submit" ${question.solved || !selectedOption ? "disabled" : ""}>${escapeHtml(question.inputActionLabel || "計算する")}</button></div>
    </section>
  `;
}

function renderCurriculumAnswerControls(question, lab) {
  const type = lab.type || "calculation";
  const playStyle = question.playStyle || "classic";
  const inputPattern = question.inputPattern || "direct-choice";
  const inputStyle = {
    place: "place-tray",
    calculation: "console",
    array: "tile-tray",
    fraction: "fraction-mix",
    decimal: "console",
    money: "ticket-rack",
    measure: "ticket-rack",
    geometry: "clue-board",
    area: "tile-tray",
    chart: "chart-pins",
    ratio: "fraction-mix",
    algebra: "balance-keys",
    coordinate: "chart-pins",
    proof: "clue-board",
    root: "console"
  }[type] || "console";
  const symbol = {
    "place-tray": "▣", console: "⌁", "tile-tray": "▦", "fraction-mix": "◒",
    "ticket-rack": "♬", "clue-board": "✦", "chart-pins": "●", "balance-keys": "⚖"
  }[inputStyle];
  const fallbackInstruction = {
    "place-tray": "ぴったりの位ブロックをえらぼう",
    console: "答えキーをタップしよう",
    "tile-tray": "できたタイルの数札を置こう",
    "fraction-mix": "同じ大きさになるカードをえらぼう",
    "ticket-rack": "使う札をえらぼう",
    "clue-board": "根拠のカードをつかまえよう",
    "chart-pins": "正しい場所にピンを立てよう",
    "balance-keys": "てんびんをそろえるキーをえらぼう"
  }[inputStyle];
  const instruction = question.answerInstruction || fallbackInstruction;
  if (inputPattern === "keypad") return renderCurriculumKeypad(question, inputStyle, playStyle, symbol, `${instruction}。見つけた答えを数字で組み立てよう`);
  if (inputPattern === "option-keypad") return renderCurriculumOptionKeypad(question, inputStyle, playStyle, symbol, instruction);
  const input = view.curriculumInput || { selectedValue: null, clueOpen: false, estimate: null };
  const directChoice = inputPattern === "direct-choice";
  const needsClue = inputPattern === "clue-confirm";
  const needsEstimate = inputPattern === "estimate-confirm";
  const canCommit = input.selectedValue !== null && (!needsClue || input.clueOpen) && (!needsEstimate || input.estimate);
  const selectionInstruction = directChoice ? instruction : `${instruction}。カードを選んでから「${question.inputActionLabel || "決める"}」を押そう`;
  return `
    <section class="curriculum-answer-board curriculum-answer-board--${inputStyle} curriculum-answer-board--${escapeHtml(inputPattern)} mission-play--${escapeHtml(playStyle)}" data-input-style="${inputStyle}" data-input-pattern="${escapeHtml(inputPattern)}" data-play-style="${escapeHtml(playStyle)}" aria-label="${escapeHtml(selectionInstruction)}">
      <p>${escapeHtml(selectionInstruction)}</p>
      <div class="curriculum-answer-options">
        ${renderCurriculumOptionButtons(question, inputStyle, playStyle, symbol, directChoice ? "choose-answer" : "curriculum-pick", directChoice ? null : input.selectedValue)}
      </div>
      ${needsClue ? `<button class="curriculum-clue-button" data-action="curriculum-reveal-clue" ${question.solved || input.clueOpen ? "disabled" : ""}>${input.clueOpen ? lab.type === "fraction" ? "手順を たしかめたよ" : `手がかり：${escapeHtml(question.hints?.[0] || "盤面をもう一度見よう")}` : "🔎 手がかりをひらく"}</button>` : ""}
      ${needsEstimate ? `<div class="curriculum-estimate-meter" aria-label="予想メーター"><span>まず予想</span>${["小さめ", "ぴったり", "大きめ"].map((label) => `<button class="${input.estimate === label ? "is-selected" : ""}" data-action="curriculum-estimate" data-value="${label}" ${question.solved ? "disabled" : ""}>${label}</button>`).join("")}</div>` : ""}
      ${directChoice ? "" : `<div class="curriculum-interaction-row"><span>${input.selectedValue === null ? "答えカードを選んでね" : `選んだカード：${escapeHtml(formatLabValue(input.selectedValue))}`}</span><button class="curriculum-commit-button" data-action="curriculum-submit" ${question.solved || !canCommit ? "disabled" : ""}>${escapeHtml(question.inputActionLabel || "決める")}</button></div>`}
    </section>
  `;
}

function angleSvgPoint(originX, originY, radius, degrees) {
  const radians = Number(degrees) * Math.PI / 180;
  return {
    x: Math.round((originX + Math.cos(radians) * radius) * 10) / 10,
    y: Math.round((originY - Math.sin(radians) * radius) * 10) / 10
  };
}

function renderAngleEvidence(lab) {
  const total = Math.max(1, Math.min(180, Number(lab.totalAngle) || Number(lab.angle) || 90));
  const known = Number(lab.knownAngle);
  const hasDivider = Number.isFinite(known) && known > 0 && known < total;
  if (!hasDivider) return "";
  const origin = { x: 42, y: 104 };
  const rayLength = 82;
  const outer = angleSvgPoint(origin.x, origin.y, rayLength, total);
  const divider = angleSvgPoint(origin.x, origin.y, rayLength, known);
  const firstLabel = angleSvgPoint(origin.x, origin.y, 48, known / 2);
  const secondLabel = angleSvgPoint(origin.x, origin.y, 51, known + (total - known) / 2);
  const equalParts = Boolean(lab.equalParts);
  const relation = String(lab.relation || "split");
  const knownText = equalParts ? "？°" : `${formatLabValue(known)}°`;
  const unknownText = "？°";
  const caption = equalParts
    ? `${formatLabValue(total)}°を同じ大きさの2つに分けた図`
    : `${formatLabValue(total)}°が${formatLabValue(known)}°と？°に分かれた図`;
  const aria = equalParts
    ? `${formatLabValue(total)}度の角が、同じ大きさの2つの角に分かれている図`
    : `${formatLabValue(total)}度の角が、${formatLabValue(known)}度の角と、まだ分からない角に分かれている図`;
  return `
    <div class="lab-geometry-board lab-geometry-board--evidence">
      <figure class="lab-angle-evidence" data-relation="${escapeHtml(relation)}">
        <svg class="lab-angle-svg" viewBox="0 0 170 125" role="img" aria-label="${escapeHtml(aria)}">
          <line class="lab-angle-ray" x1="${origin.x}" y1="${origin.y}" x2="145" y2="${origin.y}"></line>
          <line class="lab-angle-ray" x1="${origin.x}" y1="${origin.y}" x2="${outer.x}" y2="${outer.y}"></line>
          <line class="lab-angle-divider" x1="${origin.x}" y1="${origin.y}" x2="${divider.x}" y2="${divider.y}"></line>
          ${total === 90 ? `<path class="lab-angle-right-mark" d="M${origin.x} ${origin.y - 13} h13 v13"></path>` : ""}
          ${equalParts ? `<path class="lab-angle-equal-mark" d="M${divider.x - 5} ${divider.y - 2} l5 -5 m0 10 l5 -5"></path>` : ""}
          <text class="lab-angle-total-label" x="126" y="${origin.y + 16}">${escapeHtml(`${formatLabValue(total)}°`)}</text>
          <text class="lab-angle-known-label" x="${firstLabel.x}" y="${firstLabel.y}">${escapeHtml(knownText)}</text>
          <text class="lab-angle-unknown-label" x="${secondLabel.x}" y="${secondLabel.y}">${escapeHtml(unknownText)}</text>
        </svg>
        <figcaption>${escapeHtml(caption)}</figcaption>
      </figure>
      <strong>${escapeHtml(`${formatLabValue(total)}°`)}</strong>
    </div>
  `;
}

function renderParallelEvidence(lab) {
  const relationship = String(lab.relationship || "definition");
  const captions = {
    definition: "どこまでものばしても、2本は交わらない",
    distance: "2か所で間の長さが同じ",
    extend: "線をのばして、交わるか確かめよう",
    parallelogram: "向かい合う辺に同じ矢印のしるし"
  };
  const labels = {
    definition: "平行な2本の直線",
    distance: "間かくはどこでも同じ",
    extend: "のばした先まで見る",
    parallelogram: "向かい合う辺が2組平行"
  };
  const isParallelogram = relationship === "parallelogram";
  const lineSvg = isParallelogram
    ? `
      <polygon class="lab-parallel-parallelogram" points="50,92 158,92 183,30 75,30"></polygon>
      <path class="lab-parallel-arrow-mark" d="M92 25 l8 5 -8 5 m30 -10 l8 5 -8 5 M43 76 l5 -8 5 8 m105 0 l5 -8 5 8"></path>
    `
    : `
      <line class="lab-parallel-extension" x1="4" y1="38" x2="30" y2="38"></line>
      <line class="lab-parallel-line" x1="30" y1="38" x2="190" y2="38"></line>
      <line class="lab-parallel-extension" x1="190" y1="38" x2="216" y2="38"></line>
      <line class="lab-parallel-extension" x1="4" y1="84" x2="30" y2="84"></line>
      <line class="lab-parallel-line" x1="30" y1="84" x2="190" y2="84"></line>
      <line class="lab-parallel-extension" x1="190" y1="84" x2="216" y2="84"></line>
      ${relationship === "distance" ? `
        <line class="lab-parallel-gap" x1="75" y1="38" x2="75" y2="84"></line>
        <line class="lab-parallel-gap" x1="150" y1="38" x2="150" y2="84"></line>
        <path class="lab-parallel-tick" d="M69 43 l12 -10 M144 43 l12 -10"></path>
      ` : ""}
      ${relationship === "extend" ? `<text class="lab-parallel-extend-label" x="110" y="18">のばす</text>` : ""}
    `;
  const aria = relationship === "definition"
    ? "破線でどこまでも延びる、交わらない2本の直線"
    : captions[relationship] || captions.definition;
  return `
    <div class="lab-geometry-board lab-geometry-board--evidence">
      <figure class="lab-parallel-board" data-relationship="${escapeHtml(relationship)}">
        <svg class="lab-parallel-svg" viewBox="0 0 220 120" role="img" aria-label="${escapeHtml(aria)}">${lineSvg}</svg>
        <figcaption>${escapeHtml(captions[relationship] || captions.definition)}</figcaption>
        <small>4角形の向かい合う辺にも見つかるよ</small>
      </figure>
      <strong>${escapeHtml(labels[relationship] || labels.definition)}</strong>
    </div>
  `;
}

function renderRectangleEvidence(lab) {
  const shape = String(lab.shape || "rectangle");
  const width = Math.max(1, Number(lab.width) || 6);
  const height = Math.max(1, Number(lab.height) || 4);
  const square = shape === "square";
  const slanted = shape === "slanted";
  const drawWidth = square ? 92 : 126;
  const drawHeight = square ? 92 : 64;
  const x = Math.round((220 - drawWidth) / 2);
  const y = 20;
  const points = slanted
    ? `${x + 18},${y} ${x + drawWidth},${y + 10} ${x + drawWidth - 18},${y + drawHeight} ${x},${y + drawHeight - 10}`
    : `${x},${y} ${x + drawWidth},${y} ${x + drawWidth},${y + drawHeight} ${x},${y + drawHeight}`;
  const rightMarks = slanted
    ? `<path class="lab-rectangle-right-mark" d="M${x + 4} ${y + drawHeight - 24} h12 v12 M${x + drawWidth - 25} ${y + 13} h12 v12"></path>`
    : `<path class="lab-rectangle-right-mark" d="M${x + 5} ${y + 18} v-13 h13 M${x + drawWidth - 18} ${y + 5} h13 v13 M${x + drawWidth - 5} ${y + drawHeight - 18} v13 h-13 M${x + 18} ${y + drawHeight - 5} h-13 v-13"></path>`;
  const highlightedPair = String(lab.equalPair || "");
  const horizontalMark = highlightedPair === "horizontal" ? "★" : "＝";
  const verticalMark = highlightedPair === "vertical" ? "★" : "｜";
  const edgeMarks = square
    ? `<text class="lab-rectangle-edge-mark" x="${x + drawWidth / 2}" y="${y - 4}">＝</text><text class="lab-rectangle-edge-mark" x="${x + drawWidth + 9}" y="${y + drawHeight / 2}">＝</text><text class="lab-rectangle-edge-mark" x="${x + drawWidth / 2}" y="${y + drawHeight + 14}">＝</text><text class="lab-rectangle-edge-mark" x="${x - 15}" y="${y + drawHeight / 2}">＝</text>`
    : `<text class="lab-rectangle-edge-mark" x="${x + drawWidth / 2}" y="${y - 4}">${horizontalMark}</text><text class="lab-rectangle-edge-mark" x="${x + drawWidth / 2}" y="${y + drawHeight + 14}">${horizontalMark}</text><text class="lab-rectangle-edge-mark" x="${x - 15}" y="${y + drawHeight / 2}">${verticalMark}</text><text class="lab-rectangle-edge-mark" x="${x + drawWidth + 8}" y="${y + drawHeight / 2}">${verticalMark}</text>`;
  const captions = {
    rectangle: highlightedPair ? "★のしるしがついた向かい合う辺を見よう" : "4つの直角と、向かい合う辺の同じしるし",
    square: "4つの直角と、4辺の同じしるし",
    slanted: "直角が2つだけの四角形"
  };
  const aria = square
    ? "4つの辺に同じ印があり、4つの直角がある四角形"
    : slanted
      ? "直角が2つだけの四角形"
      : "4つの直角と、向かい合う辺が同じ長さの四角形";
  return `
    <div class="lab-geometry-board lab-geometry-board--evidence">
      <figure class="lab-rectangle-board" data-shape="${escapeHtml(shape)}">
        <svg class="lab-rectangle-svg" viewBox="0 0 220 142" role="img" aria-label="${escapeHtml(aria)}">
          <polygon class="lab-rectangle-shape" points="${points}"></polygon>
          ${rightMarks}
          ${edgeMarks}
          <text class="lab-rectangle-label" x="${x - 11}" y="${y - 6}">A</text>
          <text class="lab-rectangle-label" x="${x + drawWidth + 4}" y="${y - 6}">B</text>
          <text class="lab-rectangle-label" x="${x + drawWidth + 4}" y="${y + drawHeight + 14}">C</text>
          <text class="lab-rectangle-label" x="${x - 11}" y="${y + drawHeight + 14}">D</text>
        </svg>
        <figcaption>${escapeHtml(captions[shape] || captions.rectangle)}</figcaption>
      </figure>
      <strong>4角形</strong>
    </div>
  `;
}

function renderTriangleAreaEvidence(width, height, visibleCols, visibleRows, scaled) {
  const cell = 18;
  const x = 30;
  const y = 15;
  const drawWidth = visibleCols * cell;
  const drawHeight = visibleRows * cell;
  const baseY = y + drawHeight;
  const clipId = `lab-triangle-${visibleCols}-${visibleRows}-${width}-${height}`;
  const verticals = Array.from({ length: visibleCols + 1 }, (_, index) => `<line x1="${x + index * cell}" y1="${y}" x2="${x + index * cell}" y2="${baseY}"></line>`).join("");
  const horizontals = Array.from({ length: visibleRows + 1 }, (_, index) => `<line x1="${x}" y1="${y + index * cell}" x2="${x + drawWidth}" y2="${y + index * cell}"></line>`).join("");
  const viewWidth = x + drawWidth + 54;
  const viewHeight = baseY + 30;
  return `
    <figure class="lab-triangle-evidence">
      <svg class="lab-triangle-grid" viewBox="0 0 ${viewWidth} ${viewHeight}" role="img" aria-label="底辺${formatLabValue(width)}センチメートル、高さ${formatLabValue(height)}センチメートルの三角形。同じ底辺と高さの長方形の半分">
        <defs><clipPath id="${clipId}"><polygon points="${x},${baseY} ${x + drawWidth},${baseY} ${x},${y}"></polygon></clipPath></defs>
        <rect class="lab-triangle-reference" x="${x}" y="${y}" width="${drawWidth}" height="${drawHeight}"></rect>
        <g class="lab-triangle-cells" clip-path="url(#${clipId})">${verticals}${horizontals}</g>
        <polygon class="lab-triangle-fill" points="${x},${baseY} ${x + drawWidth},${baseY} ${x},${y}"></polygon>
        <path class="lab-triangle-outline" d="M${x} ${baseY} H${x + drawWidth} L${x} ${y} Z"></path>
        <line class="lab-triangle-height" x1="${x}" y1="${y}" x2="${x}" y2="${baseY}"></line>
        <path class="lab-triangle-right-mark" d="M${x + 8} ${baseY} v-8 h8"></path>
        <text class="lab-triangle-base-label" x="${x + drawWidth / 2}" y="${baseY + 18}">底辺 ${escapeHtml(formatLabValue(width))}cm</text>
        <text class="lab-triangle-height-label" x="${x - 10}" y="${y + drawHeight / 2}" transform="rotate(-90 ${x - 10} ${y + drawHeight / 2})">高さ ${escapeHtml(formatLabValue(height))}cm</text>
      </svg>
      <figcaption>${scaled ? "縮尺イメージ・同じ底辺と高さの長方形の半分" : "同じ底辺と高さの長方形の半分"}</figcaption>
    </figure>
  `;
}

function chartCategoryColor(label, index = 0) {
  const colors = { 赤: "#de5571", あか: "#de5571", 青: "#509fdf", あお: "#509fdf", 黄: "#efc34c", きいろ: "#efc34c", 緑: "#5cad7b", みどり: "#5cad7b" };
  const category = String(label || "").trim().replace(/(?:色|ぐみ|組)$/u, "");
  return colors[category] || ["#77b6d3", "#d990ad", "#90bd96", "#c2a2d4"][index % 4];
}

function renderCurriculumLabBoard(lab, question = {}) {
  const type = lab.type || "calculation";
  if (type === "place") {
    const digits = String(lab.digits || lab.value || "?");
    const roundingPlace = Number(lab.roundingPlace) || 0;
    const lookPlace = Number(lab.lookPlace) || 0;
    const roundingCue = roundingPlace ? `残す：${roundingPlace === 10 ? "十の位" : "百の位"}／見る：${lookPlace === 1 ? "一の位" : "十の位"}` : (lab.focus || "位");
    return `<div class="lab-place-board" ${roundingPlace ? `data-rounding-place="${roundingPlace}" data-look-place="${lookPlace}"` : ""}>${digits.split("").map((digit, index) => { const place = 10 ** (digits.length - index - 1); return `<span class="lab-digit ${index === lab.focusIndex ? "is-focus" : ""} ${place === roundingPlace ? "is-rounding" : ""} ${place === lookPlace ? "is-look" : ""}">${escapeHtml(digit)}</span>`; }).join("")}<small>${escapeHtml(roundingCue)}</small></div>`;
  }
  if (type === "calculation") {
    const divisionEvidence = Number.isFinite(Number(lab.quotient))
      ? `<small class="lab-calculation-evidence" data-quotient="${escapeHtml(formatLabValue(lab.quotient))}" data-remainder="${escapeHtml(formatLabValue(lab.remainder || 0))}">商と あまりを たしかめよう</small>`
      : "";
    const a = Number(lab.left), b = Number(lab.right);
    const operation = lab.operator || "+";
    const givenResult = question.contentContract === "place-after-calc" && Number.isFinite(a) && Number.isFinite(b)
      ? operation === "+" ? a + b : a - b
      : question.contentContract === "missing-addend" && lab.right === "?" && Number.isFinite(a) && Number.isFinite(Number(question.answer)) ? a + Number(question.answer) : null;
    const equals = question.contentContract === "estimate-calc" ? "≈" : "=";
    return `<div class="lab-calculation-board" aria-label="${escapeHtml(`${formatLabValue(lab.left)} ${operation} ${formatLabValue(lab.right)}`)}"><span>${escapeHtml(formatLabValue(lab.left))}</span><b>${escapeHtml(operation)}</b><span>${escapeHtml(formatLabValue(lab.right))}</span><i>${equals}</i><strong>${givenResult === null ? "?" : escapeHtml(formatLabValue(givenResult))}</strong>${divisionEvidence}</div>`;
  }
  if (type === "array") {
    const rows = Math.max(1, Number(lab.rows) || 1);
    const cols = Math.max(1, Number(lab.cols) || 1);
    const visibleRows = Math.min(rows, 6);
    const visibleCols = Math.min(cols, 8);
    const hiddenRows = Math.max(0, rows - visibleRows);
    const hiddenCols = Math.max(0, cols - visibleCols);
    return `
      <div class="lab-array-wrap" aria-label="${rows}行、${cols}列のならび">
        <div class="lab-array-board" style="--cols:${visibleCols}">${Array.from({ length: visibleRows * visibleCols }, () => `<span>${escapeHtml(lab.token || "●")}</span>`).join("")}</div>
        <div class="lab-array-caption"><b>${formatLabValue(rows)}行</b><span>×</span><b>${formatLabValue(cols)}列</b></div>
        ${hiddenRows || hiddenCols ? `<small class="lab-array-more">${hiddenRows ? `同じならびが あと${hiddenRows}行` : ""}${hiddenRows && hiddenCols ? "・" : ""}${hiddenCols ? `あと${hiddenCols}列` : ""}つづくよ</small>` : ""}
      </div>
    `;
  }
  if (type === "fraction") {
    return renderFractionProblemBoard({ ...question, lab });
  }
  if (type === "decimal") {
    return `<div class="lab-decimal-board"><span>${escapeHtml(formatLabValue(lab.a))}</span><b>${escapeHtml(lab.operation || "+")}</b><span>${escapeHtml(formatLabValue(lab.b))}</span><i>＝</i><strong>？</strong><small>小数点を まっすぐ そろえよう</small></div>`;
  }
  if (type === "money") {
    return `<div class="lab-money-board"><span class="lab-coin">${escapeHtml(formatLabValue(lab.paid))}円</span><b>−</b><span class="lab-ticket">${escapeHtml(formatLabValue(lab.price))}円</span><i>＝</i><strong>？</strong></div>`;
  }
  if (type === "measure") {
    const amount = Math.max(1, Number(lab.amount ?? lab.duration) || 1);
    if (lab.kind === "time") {
      const clocks = [...String(question.prompt || "").matchAll(/(\d+)時(?:(\d+)分)?/g)];
      const start = clockTextFromMatch(clocks[0]);
      const end = clocks[1] ? clockTextFromMatch(clocks[1]) : "？";
      const isDurationQuestion = /elapsed-duration/.test(String(question.contentContract || "")) || /何分[？?]/.test(String(question.prompt || ""));
      const direction = /前/.test(String(question.prompt || "")) ? "もどる" : "すすむ";
      return `
        <div class="lab-time-board" aria-label="時間の道">
          <div class="lab-time-card"><small>${direction === "もどる" ? "ゴール" : "スタート"}</small><b>${start}</b></div>
          <div class="lab-time-route"><span>●</span><i></i><span>★</span><small>${isDurationQuestion ? "何分かな？" : `${formatLabValue(amount)}分 ${direction}`}</small></div>
          <div class="lab-time-card ${end === "？" ? "is-unknown" : ""}"><small>${direction === "もどる" ? "スタート" : "ゴール"}</small><b>${end}</b></div>
        </div>
      `;
    }
    const markCount = Math.max(2, Math.min(7, Math.round(amount) + 1));
    const marks = Array.from({ length: markCount }, (_, index) => {
      const value = Math.round(amount * index / (markCount - 1) * 100) / 100;
      return `<span>${escapeHtml(formatLabValue(value))}</span>`;
    }).join("");
    return `<div class="lab-measure-board"><div class="lab-ruler-line" aria-label="0から${formatLabValue(amount)}までの目盛り">${marks}</div><strong>${escapeHtml(formatLabValue(amount))}${escapeHtml(lab.unit || "")}</strong><small>0から同じ単位で目盛りをよもう</small></div>`;
  }
  if (type === "geometry") {
    if (lab.kind === "angle") {
      const evidence = renderAngleEvidence(lab);
      if (evidence) return evidence;
      return `<div class="lab-geometry-board"><span class="lab-angle-shape" style="--angle:${Number(lab.angle) || 90}deg"></span><strong>${Number(lab.angle) || 90}°</strong></div>`;
    }
    if (lab.kind === "parallel") return renderParallelEvidence(lab);
    if (lab.kind === "rectangle") return renderRectangleEvidence(lab);
    if (lab.kind === "circle") return `<div class="lab-geometry-board"><span class="lab-circle-shape"><i class="lab-circle-radius" aria-hidden="true"></i></span><strong>半径 ${formatLabValue(lab.radius)}cm</strong></div>`;
    if (lab.kind === "solid") {
      const solid = String(lab.solid || "cuboid");
      const solidName = { sphere: "たま", cuboid: "はこ", cylinder: "つつ", prism: "三角のやね" }[solid] || "はこ";
      const shapeClass = { sphere: "lab-solid-sphere", cuboid: "lab-cube-shape", cylinder: "lab-solid-cylinder", prism: "lab-solid-prism" }[solid] || "lab-cube-shape";
      return `<div class="lab-geometry-board" data-solid="${escapeHtml(solid)}" aria-label="${escapeHtml(solidName)}の立体"><span class="${shapeClass}"></span><strong>${escapeHtml(solidName)}の立体</strong></div>`;
    }
    return `<div class="lab-geometry-board"><span class="lab-polygon-shape lab-polygon-${Number(lab.sides) || 4}"></span><strong>${Number(lab.sides) || 4}角形</strong></div>`;
  }
  if (type === "area") {
    const width = Math.max(1, Number(lab.width) || 3);
    const height = Math.max(1, Number(lab.height) || 2);
    const unitId = String(question.curriculum?.id || "");
    const isSolid = Boolean(lab.solid || lab.baseArea || /(?:volume|prism)/.test(unitId));
    if (isSolid) {
      const baseArea = Math.max(1, Number(lab.baseArea) || (lab.solid === "cuboid" ? width * height : width));
      const layers = Math.max(1, Number(lab.layers) || height);
      const visibleLayers = Math.min(4, layers);
      return `
        <div class="lab-volume-board" aria-label="底面積${formatLabValue(baseArea)}を${formatLabValue(layers)}段重ねる立体">
          <div class="lab-volume-stack">${Array.from({ length: visibleLayers }, (_, index) => `<span class="lab-volume-layer" style="--layer:${visibleLayers - index}"><i></i><i></i><i></i></span>`).join("")}${layers > visibleLayers ? "<small>…</small>" : ""}</div>
          <div class="lab-volume-caption"><b>底面 ${formatLabValue(baseArea)}cm²</b><span>×</span><b>${formatLabValue(layers)}だん</b></div>
        </div>
      `;
    }
    const visibleCols = Math.min(width, 8);
    const visibleRows = Math.min(height, 6);
    const scaled = visibleCols !== width || visibleRows !== height;
    const isTriangle = lab.shape === "triangle" || /三角形/.test(String(question.prompt || ""));
    const preview = isTriangle
      ? renderTriangleAreaEvidence(width, height, visibleCols, visibleRows, scaled)
      : `<div class="lab-area-preview"><div class="lab-area-grid" style="--cols:${visibleCols}">${Array.from({ length: visibleCols * visibleRows }, () => "<span></span>").join("")}</div><small>${scaled ? "縮尺イメージ" : "1ます = 1cm²"}</small></div>`;
    return `
      <div class="lab-area-board">
        ${preview}
        <div class="lab-area-copy"><strong>${lab.pythagoras ? "3² + 4² = ?²" : isTriangle ? `${formatLabValue(width)} × ${formatLabValue(height)} ÷ 2 = ?` : `${formatLabValue(width)} × ${formatLabValue(height)} = ?`}</strong><small>よこ ${formatLabValue(width)}cm ・ たて ${formatLabValue(height)}cm</small></div>
      </div>
    `;
  }
  if (type === "chart") {
    const labels = lab.labels || [];
    const values = (lab.values || []).map((value) => Number(value) || 0);
    const peak = Math.max(1, ...values);
    const unitId = String(question.curriculum?.id || "");
    const contract = String(question.contentContract || "");
    const chartKind = lab.chartKind || (/pictograph|picture/.test(`${unitId}:${contract}`) ? "pictograph" : /linegraph|line-/.test(`${unitId}:${contract}`) ? "line" : "bar");
    if (chartKind === "pictograph") {
      return `<div class="lab-pictograph-board" aria-label="絵グラフ。しるし1つで1こ">${values.map((value, index) => `<div class="lab-pictograph-column"><div style="color:${chartCategoryColor(labels[index], index)}">${Array.from({ length: Math.max(0, Math.round(value)) }, () => "<i>●</i>").join("")}</div><b>${escapeHtml(formatLabValue(value))}</b><small>${escapeHtml(labels[index] || "")}</small></div>`).join("")}</div>`;
    }
    if (chartKind === "line") {
      const chartWidth = Math.max(200, values.length * 58);
      const chartHeight = 132;
      const plotLeft = 24;
      const plotRight = chartWidth - 16;
      const plotTop = 16;
      const plotBottom = 102;
      const points = values.map((value, index) => {
        const x = values.length === 1 ? chartWidth / 2 : plotLeft + (plotRight - plotLeft) * index / (values.length - 1);
        const y = plotBottom - value / peak * (plotBottom - plotTop);
        return { x: Math.round(x * 10) / 10, y: Math.round(y * 10) / 10, value, label: labels[index] || "" };
      });
      return `<div class="lab-line-chart" aria-label="数値付きの折れ線グラフ"><svg viewBox="0 0 ${chartWidth} ${chartHeight}" role="img" aria-label="${escapeHtml(labels.map((label, index) => `${label}${formatLabValue(values[index])}`).join("、"))}"><line x1="${plotLeft}" y1="${plotBottom}" x2="${plotRight}" y2="${plotBottom}" class="lab-line-axis"></line>${[.25, .5, .75, 1].map((ratio) => `<line x1="${plotLeft}" y1="${Math.round(plotBottom - (plotBottom - plotTop) * ratio)}" x2="${plotRight}" y2="${Math.round(plotBottom - (plotBottom - plotTop) * ratio)}" class="lab-line-grid"></line>`).join("")}<polyline points="${points.map((point) => `${point.x},${point.y}`).join(" ")}" class="lab-line-path"></polyline>${points.map((point) => `<g><circle cx="${point.x}" cy="${point.y}" r="5" class="lab-line-dot"></circle><text x="${point.x}" y="${Math.max(12, point.y - 9)}" text-anchor="middle">${escapeHtml(formatLabValue(point.value))}</text><text x="${point.x}" y="${chartHeight - 10}" text-anchor="middle" class="lab-line-label">${escapeHtml(point.label)}</text></g>`).join("")}</svg></div>`;
    }
    return `<div class="lab-chart-board" aria-label="数値付き棒グラフ">${values.map((value, index) => `<span class="lab-bar-wrap"><b style="--height:${Math.max(0, value / peak * 100)}%;background:${chartCategoryColor(labels[index], index)}"><i>${escapeHtml(formatLabValue(value))}</i></b><small>${escapeHtml(labels[index] || "")}</small></span>`).join("")}${lab.survey ? "<em>みんなの声を集めよう</em>" : ""}</div>`;
  }
  if (type === "ratio") {
    const left = Math.max(0, Number(lab.left) || 0);
    const right = Math.max(0, Number(lab.right) || 0);
    const maximum = Math.max(1, left, right);
    const isProbability = /probability/.test(String(question.contentContract || "")) || lab.kind === "probability";
    const labels = lab.labels || (isProbability ? ["青", "ぜんぶ"] : ["左", "右"]);
    const probabilityUsesTotal = isProbability && labels.includes("ぜんぶ");
    const boardCue = isProbability
      ? (probabilityUsesTotal ? "全体と起こる場合を同じものさしで見よう" : "2色の数を同じものさしでくらべよう")
      : "二つの量を同じものさしでくらべよう";
    return `<div class="lab-ratio-board" aria-label="${escapeHtml(`${labels[0]}${formatLabValue(left)}、${labels[1]}${formatLabValue(right)}`)}"><div class="lab-ratio-vessel"><span class="lab-beaker lab-beaker--left" style="--fill:${Math.round(left / maximum * 100)}%"><b>${escapeHtml(formatLabValue(left))}</b></span><small>${escapeHtml(labels[0])}</small></div><b>:</b><div class="lab-ratio-vessel"><span class="lab-beaker lab-beaker--right" style="--fill:${Math.round(right / maximum * 100)}%"><b>${escapeHtml(formatLabValue(right))}</b></span><small>${escapeHtml(labels[1])}</small></div><small>${escapeHtml(boardCue)}</small></div>`;
  }
  if (type === "algebra") {
    return `<div class="lab-algebra-board"><span class="lab-balance-pan">${escapeHtml(String(lab.expression || "x + ?"))}</span><b>⚖</b><span class="lab-balance-pan">ぴったり</span><small>${lab.balance ? "両方へ同じことをしよう" : "数直線で確かめよう"}</small></div>`;
  }
  if (type === "coordinate") {
    const target = lab.target || [0, 0];
    return `<div class="lab-coordinate-board"><div class="lab-coordinate-grid">${Array.from({ length: 25 }, (_, index) => { const x = index % 5 - 2; const y = 2 - Math.floor(index / 5); return `<span class="${x === target[0] && y === target[1] ? "is-target" : ""}">${x === target[0] && y === target[1] ? "★" : ""}</span>`; }).join("")}</div><strong>${lab.quadratic ? "y = x²" : "横がx・縦がy"}</strong></div>`;
  }
  if (type === "proof") {
    return `<div class="lab-proof-board">${(lab.cards || ["条件", "根拠", "結論"]).map((card, index) => `<span class="lab-proof-card lab-proof-card--${index}">${escapeHtml(card)}</span>`).join("<b>→</b>")}</div>`;
  }
  if (type === "root") {
    return `<div class="lab-root-board"><span class="lab-root-square">${escapeHtml(String(lab.square || "?"))}</span><b>√</b><strong>？</strong><small>${lab.equation ? "正と負の二つを探そう" : "同じ数を二回掛けよう"}</small></div>`;
  }
  return `<div class="lab-calculation-board"><strong>？</strong></div>`;
}

function renderAudioGameProp(asset = "maraca", label = "おとのどうぐ", className = "") {
  return `<span class="audio-game-prop audio-game-prop--${escapeHtml(asset)} ${className}" role="img" aria-label="${escapeHtml(label)}" style="--src:url('${spriteUrl("audioGameAtlas")}')"></span>`;
}

function createSoundGameState({ heard = false, notice = "" } = {}) {
  return {
    selected: [], input: [], pairFirst: null, pairs: [], routePosition: 0,
    builder: { tens: null, ones: null }, clock: { hour: null, half: false }, heard, notice
  };
}

function currentSoundGameState() {
  return view.soundGame || createSoundGameState();
}

function playLegacyLayerTone(question, index = 0, accent = false) {
  const layer = question?.soundLayer;
  if (!layer?.palette) return;
  playMiniTone(layer.palette, Math.max(0, Number(index) || 0) % 6, accent);
}

function renderSoundCueButton(game, label = "おとを きく") {
  return `<button class="sound-cue-button" data-action="sound-cue" aria-label="${escapeHtml(label)}。何回でも聞けます">♪ ${escapeHtml(label)}</button>`;
}

function renderSoundProgress(items, current = []) {
  return `<div class="sound-progress" aria-label="できた拍">${items.map((item, index) => `<span class="sound-progress-dot cue-${String(item)} ${index < current.length ? "done" : ""}">${index < current.length ? "♪" : "○"}</span>`).join("")}</div>`;
}

function renderSoundMiniGameQuestion(question) {
  const game = question.soundGame;
  if (!game) return "";
  const state = currentSoundGameState();
  let board = "";
  if (["count", "pack", "pluck"].includes(game.interaction)) board = renderSoundCountGame(question, game, state);
  else if (game.interaction === "echo") board = renderSoundEchoGame(question, game, state);
  else if (["trace", "route"].includes(game.interaction)) board = renderSoundRouteGame(question, game, state);
  else if (game.interaction === "pair") board = renderSoundPairGame(question, game, state);
  else if (game.interaction === "loop") board = renderSoundLoopGame(question, game, state);
  else if (game.interaction === "builder") board = renderSoundBuilderGame(question, game, state);
  else if (game.interaction === "clock") board = renderSoundClockGame(question, game, state);
  else if (game.interaction === "measure") board = renderSoundMeasureGame(question, game, state);
  else board = renderSoundChoiceGame(question, game, state);

  return `
    <section class="sound-mini-game sound-mini-game--${escapeHtml(game.family)}" aria-label="${escapeHtml(game.title)}">
      <div class="sound-mini-header">
        ${renderAudioGameProp(game.asset, game.title, "sound-mini-hero")}
        <div>
          <span class="sound-mini-kicker">${escapeHtml(game.roundAction || "おとであそぶ")}</span>
          <strong>${escapeHtml(game.title)}</strong>
          <p>音を消していても、光と色を見て同じように遊べるよ。</p>
        </div>
        ${renderSoundCueButton(game)}
      </div>
      ${board}
      <p class="sound-status" aria-live="polite">${escapeHtml(state.notice || game.accessibleCue)}</p>
    </section>
  `;
}

function renderLegacySoundLayer(question) {
  const layer = question?.soundLayer;
  if (!layer) return "";
  const status = currentSoundGameState().notice || "音は何回でも聞けるよ。手で動かして、図もたしかめよう。";
  return `
    <section class="legacy-sound-layer" aria-label="${escapeHtml(layer.title)}の音の手がかり">
      ${renderAudioGameProp(layer.asset, layer.title, "legacy-sound-layer__prop")}
      <div><strong>${escapeHtml(layer.roundAction || "おとをきく")}</strong><small>音と光はヒント。答えは手でたしかめよう。</small></div>
      ${renderSoundCueButton(layer, "おとを きく")}
      <span class="legacy-sound-layer__status" aria-live="polite">${escapeHtml(status)}</span>
    </section>
  `;
}

function renderSoundCountGame(question, game, state) {
  const selected = state.selected || [];
  const token = game.sourceVisual || QUESTION_VISUALS.count[0];
  const total = Math.min(12, Math.max(Number(question.total) || 0, Number(game.targetCount) + 2, 4));
  const slots = game.interaction === "pack"
    ? `<div class="sound-seat-row">${Array.from({ length: game.targetCount }, (_, index) => `<span class="sound-seat ${selected[index] !== undefined ? "filled" : ""}">${selected[index] !== undefined ? "♪" : index + 1}</span>`).join("")}</div>`
    : "";
  return `
    <div class="sound-count-board sound-count-board--${escapeHtml(game.interaction)}">
      <div class="sound-count-heading"><span>${escapeHtml(token.name || "おと" )}</span><b>${selected.length}/${game.targetCount}</b><span>${game.interaction === "pluck" ? "ハープ" : game.interaction === "pack" ? "拍トレー" : "メロディ"}</span></div>
      <div class="sound-token-grid ${game.interaction === "pluck" ? "sound-token-grid--harp" : ""}">
        ${Array.from({ length: total }, (_, index) => `<button class="sound-token ${selected.includes(index) ? "selected" : ""}" data-action="sound-token" data-index="${index}" aria-label="${index + 1}こめを${selected.includes(index) ? "戻す" : "鳴らす"}" ${question.solved ? "disabled" : ""}>${game.interaction === "pluck" ? `<span class="sound-string"></span><b>${index + 1}</b>` : `${renderQuestionToken(token, "question-token--pick")}<span>♪</span>`}</button>`).join("")}
      </div>
      ${slots}
    </div>
    <div class="action-row sound-action-row">
      <button class="primary-button" data-action="sound-submit" ${question.solved ? "disabled" : ""}>音を そろえた</button>
      ${selected.length ? `<button class="soft-button" data-action="sound-undo" ${question.solved ? "disabled" : ""}>ひとつ もどす</button>` : ""}
      <span class="tag sky">${selected.length}おと</span>
    </div>
  `;
}

function renderSoundEchoGame(question, game, state) {
  const input = state.input || [];
  const labels = ["ぽん", "りん", "きら"];
  return `
    <div class="sound-echo-board">
      <div class="sound-cue-strip" aria-label="まねする光の順">${game.cue.map((note, index) => `<span class="sound-cue-light cue-${note} ${state.heard ? "shown" : ""}">${state.heard ? labels[note] : index + 1}</span>`).join("")}</div>
      ${renderSoundProgress(game.cue, input)}
      <p class="mission-instruction">「きく」を押してから、同じ色の太鼓を順に鳴らそう。</p>
      <div class="sound-pad-grid">
        ${labels.map((label, value) => `<button class="sound-pad cue-${value}" data-action="sound-pad" data-value="${value}" ${input.length >= game.cue.length || question.solved ? "disabled" : ""}>${label}<small>♪</small></button>`).join("")}
      </div>
    </div>
    <div class="action-row sound-action-row"><button class="primary-button" data-action="sound-submit" ${input.length !== game.cue.length || question.solved ? "disabled" : ""}>まねできた</button>${input.length ? `<button class="soft-button" data-action="sound-undo">ひとつ もどす</button><button class="soft-button" data-action="sound-reset">はじめから</button>` : ""}</div>
  `;
}

function renderSoundRouteGame(question, game, state) {
  const position = Number(state.routePosition) || 0;
  const direction = question.mode === "subtract" ? "もどる" : "すすむ";
  return `
    <div class="sound-route-board" aria-label="1拍ずつ進む音の道">
      <div class="sound-route-copy"><strong>${position}/${game.targetCount}拍</strong><span>${direction}足あとを、順にタップしよう。</span></div>
      <div class="sound-route-track">
        ${Array.from({ length: game.targetCount }, (_, index) => `<button class="sound-route-step ${index < position ? "done" : ""} ${index === position ? "next" : ""}" data-action="sound-token" data-index="${index}" aria-label="${index + 1}拍め" ${question.solved ? "disabled" : ""}><span>${index < position ? "♪" : index === position ? "★" : "○"}</span><b>${index + 1}</b></button>`).join("")}
      </div>
      <p class="mission-instruction">1拍は1歩。最後の星で、答えの場所に着くよ。</p>
    </div>
  `;
}

function renderSoundPairGame(question, game, state) {
  const pairs = state.pairs || [];
  const pairCount = Math.min(game.pairLeft, game.pairRight);
  const usedLeft = new Set(pairs.map((pair) => pair.left));
  const usedRight = new Set(pairs.map((pair) => pair.right));
  const column = (side, count, used) => Array.from({ length: count }, (_, index) => `<button class="sound-pair-token ${used.has(index) ? "paired" : ""} ${side === "left" && state.pairFirst === index ? "selected" : ""}" data-action="sound-pair" data-side="${side}" data-index="${index}" ${used.has(index) || question.solved ? "disabled" : ""}>${renderQuestionToken(game.sourceVisual, "question-token--pick")}<small>${used.has(index) ? "♪" : side === "left" ? "ひ" : "み"}</small></button>`).join("");
  const ready = pairs.length >= pairCount;
  return `
    <div class="sound-pair-board">
      <div class="sound-pair-column"><strong>ひだり</strong>${column("left", game.pairLeft, usedLeft)}</div>
      <div class="sound-pair-middle"><span>${pairs.length}/${pairCount} ペア</span><div>${pairs.map((_, index) => `<i>♪</i>`).join("") || "なかまをつなごう"}</div></div>
      <div class="sound-pair-column"><strong>みぎ</strong>${column("right", game.pairRight, usedRight)}</div>
    </div>
    <p class="mission-instruction">${game.needsAnswerChoice ? "音をつないでたしかめても、わかったらすぐ答えてもいいよ。" : "ひだりを選んでから、みぎのなかまと音をつなごう。"}</p>
    ${game.needsAnswerChoice ? renderSoundAnswerChoices(question, game) : ready ? `<div class="action-row"><button class="primary-button" data-action="sound-submit">合奏できた</button></div>` : ""}
  `;
}

function renderSoundLoopGame(question, game, state) {
  const input = state.input || [];
  const optionById = (id) => game.loopOptions.find((option) => option.id === id);
  return `
    <div class="sound-loop-board">
      ${question.mode === "pattern" && question.sequence ? `<div class="sound-loop-example">${question.sequence.map((token) => renderPatternToken(token, "pattern-token")).join("")}</div>` : ""}
      <div class="sound-loop-slots" aria-label="作ったリズム">${game.loopExpected.map((id, index) => { const option = input[index] ? optionById(input[index]) : null; return `<span class="sound-loop-slot ${option ? "filled" : ""}">${option ? renderPatternToken(option.token, "pattern-token") : "♪"}</span>`; }).join("")}</div>
      <p class="mission-instruction">種を順に置くと、短いリズムができるよ。</p>
      <div class="sound-loop-options">${game.loopOptions.map((option) => `<button class="sound-loop-option" data-action="sound-pad" data-value="${escapeHtml(option.id)}" ${input.length >= game.loopExpected.length || question.solved ? "disabled" : ""}>${renderPatternToken(option.token, "pattern-token")}<small>${escapeHtml(option.label)}</small></button>`).join("")}</div>
    </div>
    <div class="action-row sound-action-row"><button class="primary-button" data-action="sound-submit" ${input.length !== game.loopExpected.length || question.solved ? "disabled" : ""}>ループを ならす</button>${input.length ? `<button class="soft-button" data-action="sound-undo">ひとつ もどす</button><button class="soft-button" data-action="sound-reset">はじめから</button>` : ""}</div>
  `;
}

function renderSoundBuilderGame(question, game, state) {
  const builder = state.builder || { tens: null, ones: null };
  const tensMax = Math.min(10, Math.max(2, game.targetTens + 2));
  return `
    <div class="sound-builder-board">
      <div class="sound-builder-display"><span>低い音</span><b>${builder.tens === null ? "?" : builder.tens}</b><span>10の束</span><i>＋</i><span>高い音</span><b>${builder.ones === null ? "?" : builder.ones}</b><span>ばら</span></div>
      <div class="sound-builder-row"><strong>10の束</strong>${Array.from({ length: tensMax + 1 }, (_, value) => `<button class="sound-builder-key ${builder.tens === value ? "selected" : ""}" data-action="sound-builder" data-part="tens" data-value="${value}" ${question.solved ? "disabled" : ""}>${value}<small>♪</small></button>`).join("")}</div>
      <div class="sound-builder-row"><strong>ばら</strong>${Array.from({ length: 10 }, (_, value) => `<button class="sound-builder-key bright ${builder.ones === value ? "selected" : ""}" data-action="sound-builder" data-part="ones" data-value="${value}" ${question.solved ? "disabled" : ""}>${value}<small>♪</small></button>`).join("")}</div>
    </div>
    <div class="action-row"><button class="primary-button" data-action="sound-submit" ${builder.tens === null || builder.ones === null || question.solved ? "disabled" : ""}>バンドを そろえた</button></div>
  `;
}

function renderSoundClockGame(question, game, state) {
  const clock = state.clock || { hour: null, half: false };
  return `
    <div class="sound-clock-board">
      <div class="sound-clock-face">${Array.from({ length: 12 }, (_, index) => { const hour = index + 1; return `<button class="sound-clock-hour ${clock.hour === hour ? "selected" : ""}" data-action="sound-clock-hour" data-value="${hour}" ${question.solved ? "disabled" : ""}>${hour}<small>♪</small></button>`; }).join("")}</div>
      <div class="sound-clock-controls"><button class="sound-half-key ${clock.half ? "selected" : ""}" data-action="sound-clock-half" ${question.solved ? "disabled" : ""}>はんぶん の拍 ${clock.half ? "♪" : "○"}</button><span>${clock.hour === null ? "時の花をえらぼう" : `${clock.hour}じ${clock.half ? "はん" : ""}`}</span></div>
    </div>
    <div class="action-row"><button class="primary-button" data-action="sound-submit" ${clock.hour === null || question.solved ? "disabled" : ""}>チャイムを あわせた</button></div>
  `;
}

function renderSoundMeasureGame(question, game) {
  return `
    <div class="sound-measure-board">
      <div class="sound-measure-object"><span class="sound-measure-bar" style="--units:${game.targetUnits}"></span></div>
      <div class="sound-measure-scale"><span>0</span>${Array.from({ length: game.targetUnits }, (_, index) => `<span>${index + 1}<small>♪</small></span>`).join("")}</div>
      <p class="mission-instruction">0から鳴らして、最後に着いたますの札を選ぼう。</p>
      <div class="sound-measure-options">${game.measureOptions.map((value) => `<button class="sound-measure-option" data-action="sound-measure" data-value="${value}" ${question.solved ? "disabled" : ""}>${value}ます <small>♪</small></button>`).join("")}</div>
    </div>
  `;
}

function renderSoundChoiceContent(choice, question, game) {
  if (choice.token) return renderPatternToken(choice.token, "pattern-token");
  if (choice.scale) return `<span class="size-token-wrap" style="transform:scale(${choice.scale});display:inline-grid;">${renderQuestionToken(game.sourceVisual, "size-token")}</span>`;
  if (question.mode === "compare") return `<span class="sound-choice-compare">${escapeHtml(choice.label)}</span>`;
  return escapeHtml(choice.label);
}

function renderSoundAnswerChoices(question, game) {
  const choices = game.answerChoices || [];
  return `<div class="sound-answer-choices">${choices.map((choice, index) => `<button class="sound-answer-card ${answerChoiceClass(question, choice.value)}" data-action="sound-answer" data-index="${index}" ${question.solved ? "disabled" : ""}>${renderSoundChoiceContent(choice, question, game)}<small>♪</small>${renderAnswerMark(question, choice.value)}</button>`).join("")}</div>`;
}

function renderSoundChoiceGame(question, game) {
  return `
    <div class="sound-choice-board">
      ${question.mode === "compare" ? `<div class="sound-compare-preview"><span>${renderObjectRun(game.sourceVisual, Number(question.groups?.left) || 0, "mini-object")}</span><b>♪</b><span>${renderObjectRun(game.sourceVisual, Number(question.groups?.right) || 0, "mini-object")}</span></div>` : ""}
      <p class="mission-instruction">それぞれを鳴らしてから、ぴったりの答えを選ぼう。</p>
      ${renderSoundAnswerChoices(question, game)}
    </div>
  `;
}

function renderQuestionToken(token, className = "") {
  if (!token?.src) return "";
  return `<span class="question-token ${className}" role="img" aria-label="${escapeHtml(token.name || "アイテム")}" style="--src:url('${token.src}');--token-tint:${token.tint || "#ffb6d0"}"></span>`;
}

function renderObjectRun(token, count, className = "") {
  return Array.from({ length: count }, () => renderQuestionToken(token, `mini-object ${className}`)).join("");
}

function renderPatternToken(token, className = "") {
  return token?.src ? renderQuestionToken(token, className) : renderShape(token?.id, token?.color);
}

function questionMaterialVisual(question, fallback = null) {
  const storyItem = question?.world?.item;
  if (storyItem?.src) return storyItem;
  if (question?.sceneVisual?.src) return question.sceneVisual;
  if (question?.visual?.src) return question.visual;
  if (question?.gameVisual?.src && question.gameVisual.id !== "game-audioGameAtlas") return question.gameVisual;
  return fallback;
}

function renderQuestionArt(question, stage) {
  const soundGame = question.soundGame || question.soundLayer;
  const visual = questionMaterialVisual(question, question.patternSet?.tokens?.[0] || questionVisual(stage?.mode || "count", stage || {}, 0));
  const companion = question.sceneId === "petcare" ? "petRabbit" : question.mode === "clock" ? "emoteWave" : question.mode === "add" || question.mode === "subtract" ? "emoteCheer" : "fairy";
  return `
    <div class="question-scene-token">${renderQuestionToken(visual, "scene-token")}</div>
    ${soundGame ? `<div class="question-audio-prop">${renderAudioGameProp(soundGame.asset, soundGame.title, "audio-game-prop")}</div>` : ""}
    ${renderAssetSprite(companion, "まほうようせい", "question-sprite")}
    <div class="question-scene-copy">
      <span class="question-scene-label">${escapeHtml(question.stageGame?.board || question.sceneName || visual?.name || stage?.shortName || "まなび")}</span>
      ${question.stageRoundAction ? `<span class="stage-round-chip">${escapeHtml(question.stageRoundAction)}</span>` : ""}
      ${question.missionLabel ? `<span class="mission-chip">${escapeHtml(question.missionLabel)}</span>` : ""}
    </div>
  `;
}

function renderCountQuestion(question) {
  const visual = questionMaterialVisual(question, question.visual || QUESTION_VISUALS.count[0]);
  const objects = Array.from({ length: question.total }, (_, index) => {
    const selected = view.selected.has(index);
    const answerClass = selected ? (question.solved ? "answer-correct" : question.lastAnswer !== null && question.lastAnswer !== undefined ? "answer-wrong" : "") : "";
    return `
      <button class="pick-object roleplay-tap-item ${selected ? "selected is-picked" : ""} ${answerClass}" data-action="toggle-pick" data-index="${index}" aria-label="${index + 1}こめ" aria-pressed="${selected}" ${question.solved ? "disabled" : ""}>
        ${renderQuestionToken(visual, "question-token--pick")}
        ${selected && answerClass ? `<span class="answer-state-mark" aria-hidden="true">${answerClass === "answer-correct" ? "✓" : "ここ"}</span>` : ""}
      </button>
    `;
  }).join("");

  return `
    <div class="mission-board mission-board--${escapeHtml(question.interactionKind || "collect")}">
      ${question.presentation === "tally" ? `<p class="mission-instruction">えらぶたびに、しるしを ひとつ つけよう。</p>` : ""}
      <div class="count-zone">${objects}</div>
      ${question.presentation === "tally" ? `<div class="tally-strip" aria-live="polite" aria-label="えらんだかずのしるし">${Array.from({ length: view.selected.size }, () => "<span>｜</span>").join("") || "まだ しるしが ないよ"}</div>` : ""}
    </div>
    <div class="action-row">
      ${renderSpriteButton("submit-count", "btnDone", "できた", { disabled: Boolean(question.solved), className: "roleplay-submit" })}
      <span class="tag" aria-live="polite">${view.selected.size}こ えらんだよ</span>
    </div>
  `;
}

function renderSlotFillQuestion(question) {
  const selected = view.selected || new Set();
  const slotFill = question.slotFill || { targetCount: Number(question.answer) || 0, groupSizes: [Number(question.total) || 0] };
  const visual = questionMaterialVisual(question, questionVisual(question.mode, { order: 0 }, 0));
  let index = 0;
  const sourceGroups = (slotFill.groupSizes || []).map((size, groupIndex) => {
    const items = Array.from({ length: Math.max(0, Number(size) || 0) }, () => {
      const itemIndex = index++;
      const isSelected = selected.has(itemIndex);
      const answerClass = isSelected && question.solved ? "answer-correct" : isSelected && question.lastAnswer !== null && question.lastAnswer !== undefined ? "answer-wrong" : "";
      return `<button class="slot-source-token roleplay-draggable ${isSelected ? "selected is-picked" : ""} ${answerClass}" data-action="toggle-pick" data-index="${itemIndex}" aria-label="${itemIndex + 1}こめをトレーへ${isSelected ? "入れた" : "入れる"}" aria-pressed="${isSelected}" ${question.solved ? "disabled" : ""}>${renderQuestionToken(visual, "question-token--pick")}</button>`;
    }).join("");
    return `<div class="slot-source-group slot-source-group--${groupIndex}">${items}</div>`;
  }).join("");
  const selectedOrder = [...selected].sort((left, right) => left - right);
  const slots = Array.from({ length: Math.max(0, Number(slotFill.targetCount) || 0) }, (_, slot) => {
    const hasItem = selectedOrder[slot] !== undefined;
    return `<span class="slot-fill-seat ${hasItem ? "filled" : ""}">${hasItem ? renderQuestionToken(visual, "slot-fill-token") : ""}</span>`;
  }).join("");
  return `
    <div class="slot-fill-board mission-board" aria-label="${escapeHtml(slotFill.targetLabel || "トレー")}へ入れるゲーム">
      <div class="slot-fill-heading"><span>${escapeHtml(slotFill.sourceLabel || "はこぶもの")}</span><b>${selected.size}/${slotFill.targetCount}</b><span>${escapeHtml(slotFill.targetLabel || "トレー")}</span></div>
      ${slotFill.removedCount ? `<p class="mission-instruction">${slotFill.removedCount}こは、おでかけ箱へよけたよ。のこりだけを入れよう。</p>` : ""}
      <div class="slot-fill-layout">
        <div class="slot-fill-sources">${sourceGroups}</div>
        <span class="slot-fill-arrow" aria-hidden="true">→</span>
        <div class="slot-fill-target roleplay-basket" aria-live="polite">${slots}</div>
      </div>
    </div>
    <div class="action-row">
      ${renderSpriteButton("submit-count", "btnDone", "できた", { disabled: Boolean(question.solved), className: "roleplay-submit" })}
      <span class="tag" aria-live="polite">${selected.size}こ 入れたよ</span>
    </div>
  `;
}

// ペアむすびは「たしかめる道具」。ぜんぶ結ばなくても、見てわかったらすぐ答えられる。
function pairLinkInstruction(question, allPaired) {
  if (question.allowSame) {
    return allPaired
      ? "のこりが なければ「おなじ」。のこりが あれば、のこったほうを えらぼう。"
      : "むすんでたしかめてもいいし、わかったら すぐえらんでもいいよ。";
  }
  const word = question.asksLess ? "すくない" : "おおい";
  if (!allPaired) return `むすんでたしかめてもいいし、わかったら「${word}」ほうを すぐえらんでもいいよ。`;
  const rest = question.asksLess
    ? "のこったほうが おおいほう。ペアが ぜんぶできたほうが すくないほうだよ。"
    : "のこったほうが おおいほうだよ。";
  return `${rest}「${word}」ほうを えらぼう。`;
}

function renderPairLinkQuestion(question) {
  const visual = questionMaterialVisual(question, questionVisual("compare", { order: 0 }, 0));
  const pairLink = question.pairLink || question.groups || { left: 0, right: 0 };
  const links = Array.isArray(view.pairLinks) ? view.pairLinks : [];
  const pairedLeft = new Set(links.map((link) => link.left));
  const pairedRight = new Set(links.map((link) => link.right));
  const pairsNeeded = Math.min(Number(pairLink.left) || 0, Number(pairLink.right) || 0);
  const selectedLeft = Number.isInteger(view.pairFirst) ? view.pairFirst : null;
  const column = (side, count, paired) => Array.from({ length: count }, (_, index) => {
    const active = side === "left" && selectedLeft === index;
    const linked = paired.has(index);
    return `<button class="pair-link-token roleplay-tap-item ${active ? "selected" : ""} ${linked ? "linked is-picked" : ""}" data-action="pair-pick" data-side="${side}" data-index="${index}" aria-label="${side === "left" ? "ひだり" : "みぎ"}の${index + 1}こめ" ${linked || question.solved ? "disabled" : ""}>${renderQuestionToken(visual, "question-token--pick")}${linked ? "<span>✓</span>" : ""}</button>`;
  }).join("");
  const resultChoices = ["left", "right", ...(question.allowSame || question.groups?.left === question.groups?.right ? ["same"] : [])];
  return `
    <div class="pair-link-board" aria-label="ひとりずつペアにするくらべかた">
      <div class="pair-link-column"><strong>ひだり</strong>${column("left", Number(pairLink.left) || 0, pairedLeft)}</div>
      <div class="pair-link-middle"><span class="pair-link-count">${links.length}/${pairsNeeded} ペア</span><div class="pair-link-rungs">${links.map((link) => `<span>${link.left + 1} ↔ ${link.right + 1}</span>`).join("") || "ペアをつくろう"}</div></div>
      <div class="pair-link-column"><strong>みぎ</strong>${column("right", Number(pairLink.right) || 0, pairedRight)}</div>
    </div>
    <p class="mission-instruction">${pairLinkInstruction(question, links.length >= pairsNeeded)}</p>
    <div class="choice-grid pair-result-grid">
      ${resultChoices.map((side) => `<button class="choice-card ${answerChoiceClass(question, side)}" data-action="pair-result" data-value="${side}" ${question.solved ? "disabled" : ""}>${side === "same" ? "おなじ" : side === "left" ? "ひだり" : "みぎ"}${renderAnswerMark(question, side)}</button>`).join("")}
    </div>
  `;
}

function renderCompareGateQuestion(question) {
  const visual = questionMaterialVisual(question, questionVisual("compare", { order: 0 }, 0));
  const group = (side) => `<span class="compare-gate-group"><span class="group-preview">${renderObjectRun(visual, Number(question.groups?.[side]) || 0, "group-token")}</span><b>${question.groups?.[side] || 0}</b></span>`;
  const operators = [">", "=", "<"];
  return `
    <div class="compare-gate-board" aria-label="くらべるしるしを置く門">
      ${group("left")}
      <span class="compare-gate-slot">?</span>
      ${group("right")}
    </div>
    <div class="compare-gate-options">
      ${operators.map((operator) => `<button class="compare-gate-tile roleplay-tap-item ${answerChoiceClass(question, operator)}" data-action="choose-answer" data-value="${operator}" aria-label="${operator}" ${question.solved ? "disabled" : ""}>${operator}${renderAnswerMark(question, operator)}</button>`).join("")}
    </div>
    <p class="mission-instruction">大きい口は、たくさんあるほうを向けよう。</p>
  `;
}

function renderRouteStepQuestion(question) {
  const route = question.route || { values: [], start: 0, direction: 1, target: question.answer, displayOffset: 0, stepGoal: 0 };
  const cursor = Number.isFinite(view.routeCursor) ? view.routeCursor : route.start;
  const expected = cursor + route.direction;
  const steps = Math.abs(cursor - route.start);
  const startLabel = route.displayOffset ? (question.fromRight ? "みぎのはし" : "ひだりのはし") : `${route.start}`;
  return `
    <div class="route-step-board" aria-label="足あとを一歩ずつ進める数の道">
      <div class="route-step-status"><strong>${escapeHtml(startLabel)}からスタート</strong><span>${steps}/${route.stepGoal} あるいたよ</span></div>
      <div class="route-step-track">
        ${route.values.map((value) => {
          const label = Number(value) + Number(route.displayOffset || 0);
          const isCurrent = Number(value) === Number(cursor);
          const isNext = Number(value) === Number(expected);
          return `<button class="route-step-stop ${isCurrent ? "current" : ""} ${isNext ? "next" : ""} ${question.solved && Number(value) === Number(route.target) ? "answer-correct" : ""}" data-action="route-step" data-value="${value}" aria-label="${label}${isCurrent ? "、いまここ" : isNext ? "、つぎの一歩" : ""}" ${question.solved ? "disabled" : ""}><span>${isCurrent ? "●" : isNext ? "★" : "○"}</span><b>${label}</b></button>`;
        }).join("")}
      </div>
      <p class="mission-instruction" aria-live="polite">${escapeHtml(view.routeNote || question.stageGame?.proofCue || "つぎの一歩をえらぼう。")}</p>
    </div>
  `;
}

function renderPatternComposeQuestion(question) {
  const filled = Array.isArray(view.patternSlots) ? view.patternSlots : [];
  const answers = Array.isArray(question.patternSlots) ? question.patternSlots : [question.answer];
  const tokenFor = (id) => question.options.find((token) => token.id === id) || question.sequence.find((token) => token.id === id);
  const slots = answers.map((answer, index) => {
    const id = question.solved ? answer : filled[index];
    const token = tokenFor(id);
    const className = question.solved ? "answer-correct" : question.lastAnswer ? "answer-wrong" : "";
    return `<span class="pattern-compose-slot ${id ? "filled" : ""} ${className}">${token ? renderPatternToken(token, "pattern-token") : "?"}</span>`;
  }).join("");
  return `
    <div class="pattern-compose-board">
      <div class="pattern-row" aria-label="${escapeHtml(question.patternName || "もよう")}">${question.sequence.map((token) => renderPatternToken(token, "pattern-token")).join("")}${slots}</div>
      <p class="mission-instruction">空きマスを左から順にうめよう。</p>
      <div class="choice-grid">
        ${question.options.map((token) => `<button class="choice-card pattern-choice" data-action="pattern-pick" data-value="${token.id}" ${filled.length >= answers.length || question.solved ? "disabled" : ""}>${renderPatternToken(token, "pattern-token")}</button>`).join("")}
      </div>
    </div>
    <div class="action-row">${renderSpriteButton("submit-pattern", "btnDone", "つなげた", { disabled: filled.length !== answers.length || Boolean(question.solved) })}<span class="tag">${filled.length}/${answers.length}</span></div>
  `;
}

function renderUnitRulerQuestion(question) {
  const ruler = question.ruler || { units: 0, name: "リボン", color: "#ff9fbe", options: [] };
  const units = Math.max(1, Number(ruler.units) || 1);
  const maximum = Math.max(units + 2, ...(ruler.options || []).map((option) => Number(option) || 0));
  return `
    <div class="unit-ruler-board" aria-label="0から測るものさし" style="--ruler-max:${maximum};--ruler-target:${units}">
      <div class="unit-ruler-track">
        <div class="unit-ruler-object"><span class="ribbon-bar" style="--units:${units};--color:${ruler.color || "#ff9fbe"}"></span></div>
        <div class="unit-ruler-scale"><span class="unit-ruler-zero">0</span>${Array.from({ length: maximum }, (_, index) => `<span class="unit-ruler-cell" data-ruler-tick="${index + 1}"><b>${index + 1}</b></span>`).join("")}</div>
      </div>
      <p class="mission-instruction">0の線から、同じますをいくつ通ったかな？</p>
    </div>
    <div class="number-card-grid">
      ${(ruler.options || []).map((option) => `<button class="number-card ${answerChoiceClass(question, option)}" data-action="choose-answer" data-value="${option}" aria-label="${option}ます" ${question.solved ? "disabled" : ""}>${option}ます${renderAnswerMark(question, option)}</button>`).join("")}
    </div>
  `;
}

function renderCountCardQuestion(question) {
  const visual = question.visual || QUESTION_VISUALS.count[0];
  return `
    <div class="mission-board mission-board--count-card">
      <div class="count-zone count-zone--card" aria-label="かぞえるもの">
        ${Array.from({ length: question.total }, () => renderQuestionToken(visual, "question-token--pick count-card-token")).join("")}
      </div>
    </div>
    <div class="number-card-grid">
      ${question.options.map((option) => {
        const card = renderNumberCard(option);
        return `<button class="number-card ${card ? "has-card" : ""} ${answerChoiceClass(question, option)}" data-action="choose-answer" data-value="${option}" aria-label="${option}こ" ${question.solved ? "disabled" : ""}>${card || option}${renderAnswerMark(question, option)}</button>`;
      }).join("")}
    </div>
  `;
}

function renderSequencePiece(item, question) {
  if (question.mode === "length") {
    return `<span class="sequence-ribbon ribbon-bar" style="--units:${item.units};--color:${item.color};--ribbon-hue:${item.visual?.hue || "0deg"}"></span>`;
  }
  const visual = item.visual || question.visual;
  return `<span class="size-token-wrap sequence-token" style="transform:scale(${item.scale || 1}); display:inline-grid;">${renderQuestionToken(visual, "size-token")}</span>`;
}

function renderSequenceQuestion(question) {
  const chosen = view.sequence;
  const allChosen = chosen.length === question.sortItems.length;
  return `
    <div class="sequence-slots" aria-live="polite" aria-label="ならべたじゅんばん">
      ${question.sortItems.map((_, slot) => {
        const index = chosen[slot];
        const item = question.sortItems.find((candidate) => candidate.index === index);
        return `<span class="sequence-slot ${item ? "filled" : ""}">${item ? `<b>${slot + 1}</b>${renderSequencePiece(item, question)}` : `${slot + 1}`}</span>`;
      }).join("")}
    </div>
    <div class="sequence-picker">
      ${question.sortItems.map((item) => {
        const order = chosen.indexOf(item.index);
        return `<button class="sequence-choice ${order >= 0 ? "selected" : ""} ${answerChoiceClass(question, item.index)}" data-action="sort-pick" data-index="${item.index}" aria-label="${order >= 0 ? `${order + 1}ばんめに えらんだ` : "えらぶ"}" ${order >= 0 || question.solved ? "disabled" : ""}>${renderSequencePiece(item, question)}${order >= 0 ? `<span class="sequence-order">${order + 1}</span>` : ""}</button>`;
      }).join("")}
    </div>
    <div class="action-row">
      ${renderSpriteButton("submit-sort", "btnDone", "ならべた", { disabled: !allChosen || Boolean(question.solved) })}
      <span class="tag">${chosen.length}/${question.sortItems.length}</span>
    </div>
  `;
}

function renderPlaceChoice(choice, question) {
  if (question.placeKind === "shape") return renderShape(choice.id, choice.color);
  return renderPatternToken(choice, "pattern-token");
}

function renderPlacePreview(question) {
  const selected = question.placeChoices.find((choice) => String(choice.value) === String(view.placement));
  if (question.solved) return renderPlaceChoice(selected || question.placeChoices.find((choice) => isCorrect(question, choice.value)), question);
  if (selected) return renderPlaceChoice(selected, question);
  return "?";
}

function renderPlaceQuestion(question) {
  const isPattern = question.placeKind === "pattern";
  const selected = view.placement;
  const targetClass = question.solved ? "answer-correct" : question.lastAnswer ? "answer-wrong" : "";
  return `
    <div class="placement-board placement-board--${escapeHtml(question.placeKind || "sort")}">
      ${isPattern
        ? `<div class="pattern-row placement-pattern" aria-label="${escapeHtml(question.patternName || "もよう")}">${question.sequence.map((token) => renderPatternToken(token, "pattern-token")).join("")}<span class="placement-target placement-target--inline ${targetClass}" aria-live="polite">${renderPlacePreview(question)}</span></div>`
        : `<div class="placement-target-label">${escapeHtml(question.placeTargetLabel || "この かたちの ばこ")}</div><div class="placement-target ${targetClass}" aria-live="polite">${renderPlacePreview(question)}</div>`}
      <p class="mission-instruction">${isPattern ? "えらんでから「おく」を おしてね。" : "ぴったりの かたちを えらんで、ばこに いれよう。"}</p>
      <div class="placement-choices">
        ${question.placeChoices.map((choice) => `<button class="placement-choice ${String(selected) === String(choice.value) ? "selected" : ""} ${answerChoiceClass(question, choice.value)}" data-action="place-pick" data-value="${escapeHtml(choice.value)}" aria-pressed="${String(selected) === String(choice.value)}" ${question.solved ? "disabled" : ""}>${renderPlaceChoice(choice, question)}${renderAnswerMark(question, choice.value)}</button>`).join("")}
      </div>
    </div>
    <div class="action-row">${renderSpriteButton("submit-place", "btnDone", "おく", { disabled: selected === null || Boolean(question.solved) })}</div>
  `;
}

function renderBuilderQuestion(question) {
  const tens = view.builder.tens;
  const ones = view.builder.ones;
  const makePart = (label, action, values, selected) => `
    <div class="builder-part">
      <strong>${label}</strong>
      <div class="builder-picks">${values.map((value) => `<button class="builder-pick ${selected === value ? "selected" : ""}" data-action="${action}" data-value="${value}" aria-pressed="${selected === value}" ${question.solved ? "disabled" : ""}>${value}</button>`).join("")}</div>
    </div>`;
  return `
    <div class="mission-board mission-board--builder">
      <div class="number-visual">${question.visual || ""}</div>
      <div class="builder-preview" aria-live="polite"><b>${tens ?? "?"}</b> この10のたば と <b>${ones ?? "?"}</b> このばら</div>
      <div class="builder-grid">
        ${makePart("10のたば", "builder-tens", Array.from({ length: question.builder.maxTens + 1 }, (_, value) => value), tens)}
        ${makePart("ばら", "builder-ones", Array.from({ length: 10 }, (_, value) => value), ones)}
      </div>
    </div>
    <div class="action-row">
      ${renderSpriteButton("submit-builder", "btnDone", "できた", { disabled: tens === null || ones === null || Boolean(question.solved) })}
    </div>
  `;
}

function renderNumberLineQuestion(question) {
  const hasJourney = ["add", "subtract"].includes(question.mode);
  const direction = question.mode === "subtract" ? "もどる" : "すすむ";
  return `
    ${question.visual ? `<div class="number-visual">${question.visual}</div>` : ""}
    ${hasJourney ? `<div class="number-line-journey"><strong>${question.numberLineStart}から スタート</strong><span>${question.right}マス ${direction}</span><strong>${question.answer}で とまる</strong></div>` : ""}
    <div class="number-line" role="group" aria-label="かずのこみち">
      ${question.numberLine.map((value) => {
        const isStart = hasJourney && Number(value) === Number(question.numberLineStart);
        const isAnswer = Number(value) === Number(question.answer);
        const label = isStart ? `${value}、スタート` : isAnswer ? `${value}、とまるところ` : String(value);
        return `<button class="number-stop ${isStart ? "number-stop--start" : ""} ${isAnswer ? "number-stop--answer" : ""} ${answerChoiceClass(question, value)}" data-action="numberline-pick" data-value="${value}" aria-label="${label}" ${question.solved ? "disabled" : ""}><span></span><b>${value}</b>${isStart ? "<em>スタート</em>" : ""}${renderAnswerMark(question, value)}</button>`;
      }).join("")}
    </div>
  `;
}

function renderCompareQuestion(question) {
  const visual = question.visual || QUESTION_VISUALS.compare[0];
  const pairs = Math.min(question.groups.left, question.groups.right);
  const extraSide = question.groups.left === question.groups.right ? "" : question.groups.left > question.groups.right ? "left" : "right";
  return `
    <div class="pairing-board pairing-board--${question.presentation || "compare"}" aria-label="ひとりずつペアにしたくらべかた">
      <span class="pairing-label">ペア ${pairs}くみ</span>
      <span class="pairing-run">${Array.from({ length: pairs }, () => `<span class="pairing-pair">${renderQuestionToken(visual, "mini-object")}<span class="pair-link">↔</span>${renderQuestionToken(visual, "mini-object")}</span>`).join("")}</span>
      ${extraSide ? `<span class="pairing-extra">${extraSide === "left" ? "ひだり" : "みぎ"}に のこりがあるよ</span>` : `<span class="pairing-extra">のこりが ないね</span>`}
    </div>
    <div class="choice-grid">
      ${["left", "right"].map((side) => `
        <button class="choice-card ${answerChoiceClass(question, side)}" data-action="choose-answer" data-value="${side}" aria-label="${side === "left" ? "ひだり" : "みぎ"}、${question.groups[side]}こ" ${question.solved ? "disabled" : ""}>
          <span class="group-preview">${renderObjectRun(visual, question.groups[side], "group-token")}</span>
          <span>${side === "left" ? "ひだり" : "みぎ"}</span>
          ${renderAnswerMark(question, side)}
        </button>
      `).join("")}
      ${question.allowSame ? `
        <button class="choice-card ${answerChoiceClass(question, "same")}" data-action="choose-answer" data-value="same" aria-label="おなじ" ${question.solved ? "disabled" : ""}>おなじ${renderAnswerMark(question, "same")}</button>
      ` : ""}
    </div>
  `;
}

function renderShapeQuestion(question) {
  return `
    ${question.presentation === "shape-find" ? `<p class="mission-instruction">カードのかたちを よく見て、みつけよう。</p>` : ""}
    <div class="choice-grid">
      ${question.options.map((shape) => `
        <button class="choice-card shape-choice ${answerChoiceClass(question, shape.id)}" data-action="choose-answer" data-value="${shape.id}" aria-label="${shape.name}" ${question.solved ? "disabled" : ""}>
          ${renderShape(shape.id, shape.color)}
          ${renderAnswerMark(question, shape.id)}
        </button>
      `).join("")}
    </div>
  `;
}

function renderSizeQuestion(question) {
  return `
    <div class="choice-grid">
      ${question.options.map((option, index) => `
        <button class="choice-card size-choice ${answerChoiceClass(question, index)}" data-action="choose-answer" data-value="${index}" aria-label="${index + 1}ばんめの ${option.visual?.name || "もの"}" ${question.solved ? "disabled" : ""}>
          <span class="size-token-wrap" style="transform:scale(${option.scale}); display:inline-grid;">${option.visual ? renderQuestionToken(option.visual, "size-token") : renderShape(option.shape, option.color)}</span>
          ${renderAnswerMark(question, index)}
        </button>
      `).join("")}
    </div>
  `;
}

function renderOrderQuestion(question) {
  const visual = question.visual || null;
  return `
    ${question.presentation === "order-path" ? `<p class="mission-instruction">はしから、ひとつずつ すすんでみよう。</p>` : ""}
    <div class="order-row ${question.presentation === "order-path" ? "order-row--path" : ""}">
      ${Array.from({ length: question.total }, (_, index) => `
        <button class="choice-card order-choice ${answerChoiceClass(question, index)}" data-action="choose-answer" data-value="${index}" aria-label="${index + 1}ばんめ" ${question.solved ? "disabled" : ""}>
          ${visual ? renderQuestionToken(visual, "order-token") : '<span class="flower-head"></span>'}
          <span class="order-stem"></span>
          ${question.showGuideLabels ? `<span class="tag">${index + 1}</span>` : ""}
          ${renderAnswerMark(question, index)}
        </button>
      `).join("")}
    </div>
  `;
}

function renderPatternQuestion(question) {
  const lastToken = question.options?.find((token) => token.id === question.lastAnswer);
  return `
    ${question.presentation === "repair" ? `<p class="mission-instruction">あいた ひとマスに、ぴったりのものを おこう。</p>` : ""}
    <div class="pattern-row" aria-label="${escapeHtml(question.patternName || "もよう")}">
      ${question.sequence.map((token) => renderPatternToken(token, "pattern-token")).join("")}
      <span class="choice-card pattern-target ${question.solved ? "answer-correct" : question.lastAnswer ? "answer-wrong" : ""}" style="width:76px; min-height:76px;">${question.solved ? "✓" : question.lastAnswer ? (lastToken ? renderPatternToken(lastToken, "pattern-token") : "？") : "?"}</span>
    </div>
    <div class="choice-grid">
      ${question.options.map((token) => `
        <button class="choice-card pattern-choice ${answerChoiceClass(question, token.id)}" data-action="choose-answer" data-value="${token.id}" ${question.solved ? "disabled" : ""}>
          ${renderPatternToken(token, "pattern-token")}
          ${renderAnswerMark(question, token.id)}
        </button>
      `).join("")}
    </div>
  `;
}

function renderNumberChoiceQuestion(question) {
  return `
    ${question.presentation === "result-card" ? `<p class="mission-instruction">2つのまとまりを あわせて、こたえカードをえらぼう。</p>` : ""}
    ${question.visual ? `<div class="number-visual">${question.visual}</div>` : ""}
    <div class="number-card-grid">
      ${question.options.map((option) => {
        const card = renderNumberCard(option);
        return `
        <button class="number-card ${card ? "has-card" : ""} ${answerChoiceClass(question, option)}" data-action="choose-answer" data-value="${option}" aria-label="${option}" ${question.solved ? "disabled" : ""}>
          ${card || option}
          ${renderAnswerMark(question, option)}
        </button>`;
      }).join("")}
    </div>
  `;
}

function renderNumberCard(value) {
  const numeric = Number(value);
  const fullCard = NUMBER_CARD[numeric];
  if (fullCard) return `<span class="numcard-sprite" style="--src:url('${fullCard}')"></span>`;
  if (!Number.isInteger(numeric) || numeric < 0 || numeric > 99) return "";
  const digits = String(numeric).split("");
  return `<span class="digit-card-run">${digits.map((digit) => `<span class="numcard-sprite digit-card" style="--src:url('${NUMBER_CARD[Number(digit)]}')"></span>`).join("")}</span>`;
}

function renderClockFace(hourAngle, minuteAngle, extraClass = "") {
  return `<div class="clock-sprite ${extraClass}" style="--face:url('${spriteUrl("clockFace")}')">
    <span class="clock-hand hour" style="--src:url('${spriteUrl("clockHandHour")}');transform:translateX(-50%) rotate(${hourAngle}deg)"></span>
    <span class="clock-hand minute" style="--src:url('${spriteUrl("clockHandMinute")}');transform:translateX(-50%) rotate(${minuteAngle}deg)"></span>
  </div>`;
}

function clockTimeLabel(hour, minute) {
  return `${hour}じ${minute === 30 ? "はん" : ""}`;
}

function renderClockQuestion(question) {
  return `
    <div class="clock-zone">
      ${renderQuestionToken(question.visual, "clock-scene-token")}
      ${renderClockFace(question.hourAngle, question.minuteAngle)}
    </div>
    <div class="number-card-grid">
      ${question.options.map((option) => `
        <button class="number-card ${answerChoiceClass(question, option)}" data-action="choose-answer" data-value="${option}" aria-label="${option}" ${question.solved ? "disabled" : ""}>
          ${option}
          ${renderAnswerMark(question, option)}
        </button>
      `).join("")}
    </div>
  `;
}

function renderClockSetterQuestion(question) {
  const draft = view.clockDraft;
  const hourAngle = ((draft.hour % 12) * 30) + (draft.minute === 30 ? 15 : 0);
  const minuteAngle = draft.minute === 30 ? 180 : 0;
  return `
    <div class="clock-setter">
      ${renderClockFace(hourAngle, minuteAngle, "clock-sprite--settable")}
      <div class="clock-controls" aria-live="polite">
        <div class="clock-control-row"><strong>みじかい はり</strong><button class="icon-button" data-action="clock-adjust" data-part="hour" data-delta="-1" aria-label="じかんを ひとつ もどす">−</button><span>${draft.hour}じ</span><button class="icon-button" data-action="clock-adjust" data-part="hour" data-delta="1" aria-label="じかんを ひとつ すすめる">＋</button></div>
        <div class="clock-control-row"><strong>ながい はり</strong><button class="icon-button" data-action="clock-adjust" data-part="minute" data-delta="-1" aria-label="ふんを 30ぷん もどす">−</button><span>${draft.minute === 30 ? "30ぷん" : "00ぷん"}</span><button class="icon-button" data-action="clock-adjust" data-part="minute" data-delta="1" aria-label="ふんを 30ぷん すすめる">＋</button></div>
        <span class="tag mint">${clockTimeLabel(draft.hour, draft.minute)}</span>
      </div>
    </div>
    <div class="action-row">${renderSpriteButton("submit-clock", "btnDone", "これでいい", { disabled: Boolean(question.solved) })}</div>
  `;
}

function renderLengthQuestion(question) {
  return `
    ${question.presentation === "length-measure" ? `<p class="mission-instruction">ますの かずを くらべて、ながさを はかろう。</p>` : ""}
    <div class="length-zone ${question.presentation === "length-measure" ? "length-zone--measure" : ""}">
      ${question.ribbons.map((ribbon, index) => `
        <button class="length-choice ${question.presentation === "length-measure" ? "length-choice--measure" : ""} ${answerChoiceClass(question, index)}" data-action="choose-answer" data-value="${index}" aria-label="${ribbon.name}のリボン、${ribbon.units}ます" ${question.solved ? "disabled" : ""}>
          <span class="ribbon-bar" style="--units:${ribbon.units};--color:${ribbon.color};--ribbon-hue:${ribbon.visual?.hue || "0deg"}"></span>
          <span class="tag">${question.presentation === "length-measure" ? `${ribbon.units}ます` : ribbon.name}</span>
          ${renderAnswerMark(question, index)}
        </button>
      `).join("")}
    </div>
  `;
}

function renderLegacyFeedback(isSolved) {
  if (!view.feedback) return "";

  const active = view.active;
  const isLast = active.index === active.questions.length - 1;
  const action = active.isTreasure && isSolved ? "finish-treasure" : "next-question";
  const label = active.isTreasure && isSolved ? "ノートへ" : isLast ? "できあがり" : "つぎへ";
  const feedback = view.feedback;
  if (feedback.kind === "good") {
    return `
      <section class="reward-celebration is-visible" role="dialog" aria-modal="true" aria-label="ごほうび" data-reward-dialog="true">
        <div class="reward-celebration__card">
          <div class="reward-celebration__avatar">${renderAvatarLayered()}</div>
          <div class="reward-celebration__copy">
            <strong>${escapeHtml(feedback.title)}</strong>
            <p>${escapeHtml(feedback.text)}</p>
            <div class="action-row">
              ${feedback.gift ? `<button class="soft-button tiny" data-action="try-feedback-gift">おしゃれを みる</button>` : ""}
              <button class="primary-button" data-action="${action}">${label}</button>
            </div>
          </div>
          <div class="reward-celebration__pet">${renderPetCompanion(activePet(), { compact: true, showName: false })}</div>
          <span class="reward-chip">✦ +${feedback.reward || 0}</span>
          ${feedback.gift ? `<img class="reward-magic-gift" src="${starterMagicGiftAsset}" alt="${escapeHtml(feedback.gift.name)}がとどいた" />` : ""}
        </div>
      </section>
    `;
  }
  return `
    <div class="feedback try" data-roleplay-feedback="true" role="status">
      <span class="asset-sprite feedback-badge" aria-hidden="true" style="--src:url('${spriteUrl("btnOops")}')"></span>
      <div>
        <strong>${escapeHtml(feedback.title)}</strong>
        <span>${escapeHtml(feedback.text)}</span>
      </div>
      <div class="feedback-actions"><button class="soft-button" data-action="show-hint" ${view.hintIndex >= 2 ? "disabled" : ""}>${view.hintIndex >= 0 ? "もうひとつ きいてみる" : "ひとこと ヒント"}</button><span class="tag peach">えらびなおせるよ</span></div>
    </div>
  `;
}

function renderLegacyResult() {
  const result = view.result;
  return `
    <section class="wide-panel">
      <div class="section-heading">
        <div>
          <h2>さいごまで できたね</h2>
          <p>ほしはバッジです。ごほうびは、がんばったぶんだけもらえます。</p>
        </div>
        <div class="action-row">
          ${result.drop?.slot ? `<button class="primary-button" data-action="try-reward">いま 着てみる</button>` : ""}
          <button class="primary-button" data-action="back-to-stages">ステージへ</button>
          <button class="soft-button" data-action="nav" data-screen="island">しまへ</button>
        </div>
      </div>
      <div class="result-layout">
        <div class="gift-box">
          <div class="reward-frame" style="--frame:url('${spriteUrl("frameWreath")}')">
            ${renderAssetSprite(result.sticker?.sprite || "reward", "ごほうび", "reward-sprite")}
          </div>
          <div class="gift-label">${result.drop ? escapeHtml(result.drop.name) : "かけら"}</div>
        </div>
        <div class="progress-stack">
          <div class="summary-card">
            <strong>ほし ${result.stars}</strong>
            <p class="question-sub">${result.message}</p>
          </div>
          ${result.dailyQuestCompleted ? `<div class="daily-quest-result"><span aria-hidden="true">🌸</span><div><strong>きょうの小さなぼうけん、できた！</strong><p>できることの地図に、おはながひとつ咲いたよ。</p></div></div>` : ""}
          ${renderGardenJourneyGifts(result.gardenGifts)}${result.gardenGift ? `<div class="garden-growth-result">${renderAssetSprite(result.gardenGift.sprite, result.gardenGift.name)}<div><strong>${escapeHtml(result.gardenGift.name)} がとどいたよ！</strong><span>しまに みにいこう。</span></div></div>` : ""}
          ${result.breakSuggestion ? `<div class="wellbeing-note"><strong>ひとやすみのじかん</strong><span>おみずをのんで、のびのびしたら またあそぼう。</span></div>` : ""}
          <div class="item-grid">
            <div class="item-card"><strong>XP</strong><p>${result.xp}</p></div>
            ${result.petEvent ? `<div class="item-card pet-result-card"><strong>おともXP</strong><p>${result.petEvent.atMax ? `${escapeHtml(result.petEvent.petName)}は さいこうレベル！` : `${escapeHtml(result.petEvent.petName)} +${result.petEvent.amount}${result.petEvent.levels ? ` / Lv.${result.petEvent.level}` : ""}`}</p></div>` : ""}
            <div class="item-card"><strong>コイン</strong><p>${result.coins}</p></div>
            <div class="item-card"><strong>かけら</strong><p>${result.shards}</p></div>
            <div class="item-card"><strong>ドロップ</strong><p>${result.drop ? result.drop.name : "かけらボーナス"}</p></div>
            <div class="item-card"><strong>シール</strong><p>${result.sticker ? result.sticker.name : "だぶり交換ポイント"}</p></div>
          </div>
          ${result.petEvent?.newTricks?.length ? `<div class="pet-learning-unlock"><strong>${escapeHtml(result.petEvent.petName)}が 新しい芸を おぼえられるよ！</strong><button class="soft-button tiny" data-action="nav" data-screen="pets">ペットのおうちへ</button></div>` : ""}
        </div>
      </div>
    </section>
  `;
}

function renderLegacyDress() {
  const ownedItems = ITEM_DEFS.filter((item) => state.inventory.includes(item.id));
  const avatarOwned = AVATAR_V2_ITEMS.filter((item) => state.inventory.includes(item.id)).length;
  const tab = DRESS_TAB_GROUPS.find((g) => g.id === view.dressTab) || DRESS_TAB_GROUPS[0];
  const slots = tab.slots;
  return `
    <section class="wide-panel dress-panel">
      <div class="section-heading">
        <div>
          <h2>きせかえ</h2>
          <p>かお・かみ・ふく・くつしたをえらんで、すきなじぶんをつくろう。ステージをクリアすると新しいおしゃれも届くよ。</p>
        </div>
        <div class="tag-row">
          <span class="tag mint">おしゃれ ${avatarOwned}/${AVATAR_V2_ITEMS.length}</span>
          <span class="tag sky">つぎもプレゼント</span>
        </div>
      </div>
      ${renderStarterWardrobe()}
      <div class="avatar-layout">
        <div class="avatar-stage sticky-stage">
          ${renderLegacyAvatarLayered()}
          <p class="avatar-caption">タッチでリアルタイムへんこう</p>
        </div>
        <div class="progress-stack dress-stack">
          <div class="dress-tabs" role="tablist" aria-label="きせかえカテゴリ">
            ${DRESS_TAB_GROUPS.map((g) => `
              <button
                type="button"
                class="dress-tab ${view.dressTab === g.id ? "active" : ""}"
                data-action="dress-tab"
                data-tab="${g.id}"
                id="dress-tab-${g.id}"
                role="tab"
                aria-selected="${view.dressTab === g.id}"
                aria-controls="dress-tabpanel"
                tabindex="${view.dressTab === g.id ? "0" : "-1"}"
              >${g.label}</button>
            `).join("")}
          </div>
          <div id="dress-tabpanel" role="tabpanel" aria-labelledby="dress-tab-${tab.id}">
            ${slots.map((slot) => renderSlotItems(slot, ownedItems)).join("")}
          </div>
        </div>
      </div>
    </section>
  `;
}

function starterLooks() {
  return [
    { id: "peach", name: "ももいろおでかけ", equipment: { hair: "hair_v2_bob_pink", eyes: "eyes_open", head: "head_ribbon_start", top: "top_cotton", bottom: "bottom_mint", socks: "socks_cream", shoes: "shoes_v2_pink", accessory: "accessory_seed", bag: "bag_count_pouch", dress: null } },
    { id: "mint", name: "ミントおてつだい", equipment: { hair: "hair_v2_long", eyes: "eyes_happy", head: "head_count_crown", top: "top_big_small", bottom: "bottom_balance_skirt", socks: "socks_heart", shoes: "shoes_v2_purple", accessory: "accessory_scale_pin", bag: "bag_shape_case", dress: null } },
    { id: "lavender", name: "すみれパーティー", equipment: { hair: "hair_v2_twin", eyes: "eyes_wink", head: "head_more_ribbon", top: "top_number_cape", bottom: "bottom_scale_frill", socks: "socks_cream", shoes: "shoes_v2_pink", accessory: "accessory_circle_charm", bag: "bag_flower_basket", dress: null } }
  ];
}

function renderStarterWardrobe() {
  return `
    <section class="starter-wardrobe" aria-label="すぐにえらべる3つのコーデ">
      <h3 class="starter-wardrobe__title">きょうは どのコーデ？</h3>
      ${starterLooks().map((look) => {
        const selected = Object.entries(look.equipment).every(([slot, itemId]) => state.equipment?.[slot] === itemId);
        return `
        <button class="starter-look-card ${selected ? "is-selected" : ""}" data-action="starter-look" data-look-id="${look.id}" aria-label="${escapeHtml(look.name)}にきがえる" aria-pressed="${selected}">
          ${renderLegacyAvatarLayered({ ...state.equipment, ...look.equipment }, look.name)}
          <strong>${escapeHtml(look.name)}</strong>
          <span>${selected ? "いま これ！" : "これにする"}</span>
        </button>
      `;
      }).join("")}
    </section>
  `;
}

function renderSlotItems(slot, ownedItems) {
  const items = ownedItems.filter((item) => item.slot === slot);
  if (!items.length) return "";
  const optional = !FACE_SLOTS.includes(slot) && slot !== "hair" && slot !== "shoes" && slot !== "socks" && slot !== "top" && slot !== "bottom";
  const equipped = state.equipment[slot];
  return `
    <section class="dress-slot-section">
      <div class="section-heading">
        <h3>${slotName(slot)}</h3>
        ${optional && equipped ? `<button type="button" class="soft-button tiny" data-action="unequip-slot" data-slot="${slot}">はずす</button>` : ""}
      </div>
      <div class="item-grid dress-item-grid">
        ${items.map((item) => {
          const on = equipped === item.id;
          return `
          <article class="item-card dress-item-card ${on ? "is-equipped" : ""}">
            <button type="button" class="item-pick" data-action="equip-item" data-item-id="${item.id}" aria-pressed="${on}">
              ${renderItemSwatch(item)}
              <strong>${escapeHtml(item.name)}</strong>
              <div class="tag-row">
                <span class="tag">${escapeHtml(item.rarity)}</span>
                ${on ? `<span class="tag mint">いま</span>` : ""}
              </div>
            </button>
          </article>
        `;
        }).join("")}
      </div>
    </section>
  `;
}

function renderLegacyBoutique() {
  const previewId = view.shopPreviewItemId;
  return `
    <section class="wide-panel boutique-panel">
      <div class="section-heading">
        <div>
          <h2>おしゃれのおみせ</h2>
          <p>かけらで、すきなものをえらんでこうかんします。</p>
        </div>
        <span class="tag mint">かけら ${state.stats.shards}</span>
      </div>
      <div class="shop-tryon-grid">
        ${SHOP_ITEMS.map((item) => {
          const owned = state.inventory.includes(item.id);
          const preview = previewEquipmentForItem(item);
          const isPreview = previewId === item.id;
          return `
            <article class="shop-tryon-card ${isPreview ? "is-previewing" : ""}">
              <button class="shop-tryon-preview" data-action="preview-item" data-item-id="${item.id}" aria-label="${escapeHtml(item.name)}を試着する">
                ${renderLegacyAvatarLayered(preview, `${item.name}を試着中`)}
                <span class="item-swatch">${renderItemSwatch(item)}</span>
              </button>
              <strong>${item.name}</strong>
              <div class="tag-row">
                <span class="tag">${item.rarity}</span>
                <span class="tag peach">${item.price} かけら</span>
              </div>
              <button class="soft-button tiny" data-action="preview-item" data-item-id="${item.id}">${isPreview ? "ためし中" : "ためしてみる"}</button>
              <button class="${owned ? "soft-button" : "primary-button"}" data-action="buy-item" data-item-id="${item.id}" ${owned ? "disabled" : ""}>
                ${owned ? "もっている" : "こうかん"}
              </button>
            </article>
          `;
        }).join("")}
      </div>
    </section>
  `;
}

function previewEquipmentForItem(item) {
  const next = { ...state.equipment, [item.slot]: item.id };
  if (item.slot === "top" || item.slot === "bottom") next.dress = null;
  return next;
}

function renderStickers() {
  const owned = STICKER_DEFS.filter((sticker) => state.stickers.owned.includes(sticker.id));
  const board = state.stickers.board.map((id) => stickerById(id)).filter(Boolean);
  const selected = view.decoSelectedId && board.some((sticker) => sticker.id === view.decoSelectedId) ? view.decoSelectedId : board[0]?.id || null;
  view.decoSelectedId = selected;
  const selectedSticker = selected ? stickerById(selected) : null;
  return `
    <section class="wide-panel sticker-deco-panel">
      <div class="section-heading">
        <div>
          <h2>シール帳</h2>
          <p>おてつだいで とどいたシール。すきな場所に、ぺたっと はろう。だぶり3まいで、新しいシールにもかえられるよ。</p>
        </div>
        <div class="action-row">
          <span class="tag sky">だぶり ${state.stickers.duplicates}</span>
          <button class="soft-button" data-action="exchange-stickers" ${state.stickers.duplicates >= 3 ? "" : "disabled"}>だぶり交換</button>
        </div>
      </div>
      <div class="deco-workbench">
        <section class="deco-canvas ${board.length ? "" : "is-empty"}" data-deco-canvas aria-label="シールを自由に貼るページ">
          ${board.map((sticker) => {
            const position = state.stickers.layout?.[sticker.id] || { x: 50, y: 50, rotation: 0, scale: 1 };
            const style = `left:${position.x}%;top:${position.y}%;transform:translate(-50%,-50%) rotate(${position.rotation}deg) scale(${position.scale});`;
            return `<button class="deco-sticker ${selected === sticker.id ? "is-selected" : ""}" data-action="select-sticker" data-sticker-id="${sticker.id}" aria-pressed="${selected === sticker.id}" aria-label="${escapeHtml(sticker.name)}。ドラッグか矢印キーで動かす" style="${style}">${renderAssetSprite(sticker.sprite, sticker.name)}</button>`;
          }).join("")}
        </section>
        <aside class="deco-tool-tray">
          <h3>${selectedSticker ? `${escapeHtml(selectedSticker.name)}を デコる` : "シールをえらぼう"}</h3>
          <div class="action-row" role="group" aria-label="シールを動かす">
            <button class="soft-button" data-action="deco-move" data-dx="-3" data-dy="0" aria-label="シールを左へ" ${selected ? "" : "disabled"}>←</button>
            <button class="soft-button" data-action="deco-move" data-dx="0" data-dy="-3" aria-label="シールを上へ" ${selected ? "" : "disabled"}>↑</button>
            <button class="soft-button" data-action="deco-move" data-dx="0" data-dy="3" aria-label="シールを下へ" ${selected ? "" : "disabled"}>↓</button>
            <button class="soft-button" data-action="deco-move" data-dx="3" data-dy="0" aria-label="シールを右へ" ${selected ? "" : "disabled"}>→</button>
          </div>
          <div class="action-row" role="group" aria-label="シールを回す">
            <button class="soft-button" data-action="deco-turn" data-delta="-12" ${selected ? "" : "disabled"}>左にくるっ</button>
            <button class="soft-button" data-action="deco-turn" data-delta="12" ${selected ? "" : "disabled"}>右にくるっ</button>
          </div>
          <button class="soft-button" data-action="deco-scale" data-delta="0.12" ${selected ? "" : "disabled"}>おおきく</button>
          <button class="soft-button" data-action="deco-scale" data-delta="-0.12" ${selected ? "" : "disabled"}>ちいさく</button>
          <button class="dangerless-button" data-action="deco-remove" ${selected ? "" : "disabled"}>はがす</button>
          ${owned.map((sticker) => `
            <button class="deco-sticker-choice" data-action="place-sticker" data-sticker-id="${sticker.id}">
              ${renderAssetSprite(sticker.sprite, sticker.name)}<span>${sticker.name}</span>
            </button>
          `).join("")}
        </aside>
      </div>
    </section>
  `;
}

function renderNotebook() {
  const openNotes = state.notebook.filter((note) => !note.recovered);
  const recoveredNotes = state.notebook.filter((note) => note.recovered);
  return `
    <section class="wide-panel notebook-panel">
      <div class="section-heading">
        <div>
          <h2>たからものノート</h2>
          <p>おしい問題は、あとで宝ものにかわります。</p>
        </div>
        <span class="tag sky">ジュエル ${state.stats.jewels}</span>
      </div>
      ${openNotes.length ? `
        <div class="notebook-list">
          ${openNotes.map(renderNoteCard).join("")}
        </div>
      ` : `<div class="collection-empty">いまは、もういちどあそぶ問題はありません。</div>`}
      <div class="section-heading" style="margin-top:18px"><h3>できた問題</h3></div>
      ${recoveredNotes.length ? `<div class="notebook-list">${recoveredNotes.map(renderNoteCard).join("")}</div>` : `<div class="collection-empty">ここに、できた問題がならびます。</div>`}
    </section>
  `;
}

function renderNoteCard(note) {
  return `
    <article class="note-card">
      <div class="tag-row">
        <span class="tag peach">${note.areaName}</span>
        <span class="tag ${note.recovered ? "mint" : "sky"}">${note.recovered ? "できた" : "たからもの"}</span>
      </div>
      <strong>${escapeHtml(note.question.prompt)}</strong>
      <p class="question-sub">${escapeHtml(note.question.subPrompt || "")}</p>
      ${note.recovered ? `<p>ジュエルにかわりました。</p>` : `<button class="primary-button" data-action="start-treasure" data-note-id="${note.id}">もういちど</button>`}
    </article>
  `;
}

function renderOuting() {
  return `
    <section class="wide-panel outing-panel">
      <div class="section-heading">
        <div>
          <h2>おでかけ</h2>
          <p>じゆうなおしゃべりはなく、ハートといっしょに学習だけです。</p>
        </div>
      </div>
      <div class="outing-postcard-grid">
        ${VISIT_ISLANDS.map((island) => `
          <article class="outing-postcard">
            <div class="outing-postcard-art">${renderAvatarLayered(state.equipment, `${island.name}へおでかけするアバター`)}${renderAssetSprite(island.id.includes("mint") ? "flower" : island.id.includes("peach") ? "stickerMacaron" : "stickerCandy", island.theme)}</div>
            <div class="tag-row">
              <span class="tag mint">${island.theme}</span>
              <span class="tag peach">${island.hearts + (state.likedIslands[island.id] ? 1 : 0)} ハート</span>
            </div>
            <h3>${island.name}</h3>
            <p>「${island.theme}、みせてあげる！」</p>
            <div class="action-row">
              <button class="soft-button" data-action="like-island" data-island-id="${island.id}" ${state.likedIslands[island.id] ? "disabled" : ""}>ハート</button>
              <button class="primary-button" data-action="co-learn">いっしょに てつだう</button>
            </div>
          </article>
        `).join("")}
      </div>
    </section>
  `;
}

function prepareParentGate() {
  const left = 13 + Math.floor(Math.random() * 8);
  const right = 7 + Math.floor(Math.random() * 8);
  view.parentChallenge = { left, right, answer: left + right };
  return view.parentChallenge;
}

function renderParentGate() {
  const secured = Boolean(state.settings.parentPin);
  const challenge = view.parentChallenge || prepareParentGate();
  const prompt = secured ? "4〜8けたの あんしょうばんごうを いれてください。" : `${challenge.left} + ${challenge.right} は いくつ？`;
  const detail = secured ? "この端末に保存した保護者用PINで確認します。" : "最初の確認です。開いたあと、保護者用PINを設定できます。";
  return `
    <section class="wide-panel parent-gate">
      <div class="section-heading">
        <div>
          <h2>ほごしゃのかたへ</h2>
          <p>${detail}</p>
        </div>
        <button class="soft-button" data-action="nav" data-screen="island">おうちへもどる</button>
      </div>
      <div class="parent-gate-card">
        <strong>${prompt}</strong>
        <input id="parentGateInput" class="parent-pin-input" type="password" inputmode="numeric" enterkeyhint="done" autocomplete="off" maxlength="8" aria-label="保護者確認の答えまたはPIN" />
        <button class="primary-button" data-action="parent-check">かくにん</button>
        <p class="question-sub">この確認は、子ども画面から学習記録やリセットを開きにくくするための端末内ゲートです。</p>
      </div>
    </section>
  `;
}

function verifyParentGate() {
  const input = document.querySelector("#parentGateInput")?.value.trim() || "";
  const pin = state.settings.parentPin;
  const valid = pin ? input === pin : Number(input) === Number(view.parentChallenge?.answer);
  if (!valid) {
    toast("もういちど かくにんしてください。");
    return;
  }
  view.parentVerified = true;
  render();
}

function lockParentArea() {
  view.parentVerified = false;
  view.parentChallenge = null;
  view.screen = "island";
  view.resetScreenScroll = true;
  render();
}

function saveParentPin() {
  if (!view.parentVerified) return;
  const input = document.querySelector("#parentPinInput")?.value.trim() || "";
  if (!/^\d{4,8}$/.test(input)) {
    toast("PINは4〜8けたの すうじで いれてください。");
    return;
  }
  state.settings.parentPin = input;
  saveState();
  toast("この端末にPINを せっていしました。");
  render();
}

function clearParentPin() {
  if (!view.parentVerified) return;
  if (!window.confirm("この端末の保護者PINを消しますか？")) return;
  state.settings.parentPin = "";
  saveState();
  toast("保護者PINを消しました。");
  render();
}

function renderParent() {
  if (!view.parentVerified) return renderParentGate();
  syncLearningDay();
  const completedCount = Object.keys(state.completedStages).length;
  const notebookOpen = state.notebook.filter((note) => !note.recovered).length;
  const overview = learningOverview();
  return `
    <section class="wide-panel">
      <div class="section-heading">
        <div>
          <h2>ほごしゃダッシュボード</h2>
          <p>学習の記録はこの端末だけに保存され、外部には送信しません。</p>
        </div>
      </div>
      <div class="item-grid">
        <div class="item-card"><strong>無料範囲</strong><p>${completedCount}/${ALL_STAGES.length} ステージ</p></div>
        <div class="item-card"><strong>回答数</strong><p>${state.stats.totalAnswers} 回</p></div>
        <div class="item-card"><strong>ノート</strong><p>${notebookOpen} 問</p></div>
        <div class="item-card"><strong>シール</strong><p>${state.stickers.owned.length} 枚</p></div>
        <div class="item-card"><strong>島サイズ</strong><p>${state.stats.landSize - 2}×${state.stats.landSize - 2}</p></div>
        <div class="item-card"><strong>初回でできた</strong><p>${overview.firstTry === null ? "まだ記録なし" : `${overview.firstTry}%`}</p></div>
        <div class="item-card"><strong>答えた正しさ</strong><p>${overview.accuracy === null ? "まだ記録なし" : `${overview.accuracy}%`}</p></div>
        <div class="item-card"><strong>ヒント</strong><p>${overview.hints} 回</p></div>
        <div class="item-card"><strong>きょうのステージ</strong><p>${state.learning.daily.completedStages} 回</p></div>
      </div>
      ${placementEngine?.renderParent?.() || ""}<div class="section-heading" style="margin-top:18px"><h3>領域別</h3></div>
      <div class="progress-stack">
        ${ALL_AREAS.map((area) => renderMeter(area.name, areaProgress(area.id))).join("")}
      </div>
      <section class="summary-card privacy-card" style="margin-top:18px">
        <strong>まなびの見かた</strong>
        <p class="question-sub">正答だけでなく、ヒントのあとに考えきれたことや、もう一度あそべたことも大切にします。長く遊ぶことだけを目標にはしません。</p>
      </section>
      <section class="parent-pin-card" style="margin-top:18px">
        <div>
          <strong>保護者用PIN</strong>
          <p class="question-sub">4〜8けたの数字を設定すると、次回から学習記録を開く前に確認します。</p>
        </div>
        <div class="action-row">
          <input id="parentPinInput" class="parent-pin-input" type="password" inputmode="numeric" enterkeyhint="done" autocomplete="new-password" maxlength="8" aria-label="新しい保護者PIN" placeholder="4〜8けた" />
          <button class="soft-button" data-action="save-parent-pin">PINを保存</button>
          ${state.settings.parentPin ? `<button class="dangerless-button" data-action="clear-parent-pin">PINを消す</button>` : ""}
        </div>
      </section>
      <div class="action-row" style="margin-top:18px">
        <button class="dangerless-button" data-action="reset-game">はじめから</button>
        <button class="soft-button" data-action="parent-lock">とじる</button>
      </div>
    </section>
  `;
}

function startStage(stageId, options = {}) {
  const stage = ALL_STAGES.find((candidate) => candidate.id === stageId);
  if (!stage) return;
  view.helpPickerOpen = false;
  stopQuestionSpeech();
  const sessionSeed = reserveQuestionSeed();
  const basePlan = buildLearningSessionPlan(stage, sessionSeed);
  const sessionPlan = placementEngine?.decoratePlan?.(basePlan, stage) || basePlan;
  recordStageStart(stage);
  view.screen = "learn";
  view.resetScreenScroll = true;
  view.world = stage.worldId || view.world;
  view.result = null;
  view.active = {
    stage,
    sessionSeed,
    sessionPlan,
    questions: sessionPlan.map((planEntry, index) => stampQuestion(generateQuestion(stage, index, sessionSeed, planEntry))),
    index: 0,
    earnedShards: 0,
    firstTry: 0,
    submissions: 0,
    coop: Boolean(options.coop)
  };
  view.feedback = null;
  view.hintIndex = -1;
  resetQuestionInteractionState(view.active.questions[0]);
  render();
  focusMainContent();
}

function startTreasure(noteId) {
  const note = state.notebook.find((candidate) => candidate.id === noteId);
  if (!note || note.recovered) return;
  const key = `treasure:${noteId}`;
  if (helpSessionKey(view.active) === key || view.pausedHelps?.[key]) { startHelp(key); return; }
  stopQuestionSpeech();
  parkCurrentHelp();
  view.helpPickerOpen = false;
  state.learning.reviewsStarted += 1;
  view.screen = "learn";
  view.resetScreenScroll = true;
  view.result = null;
  view.active = {
    stage: { id: "treasure", name: "たからものノート", areaId: note.areaId, areaName: note.areaName },
    isTreasure: true,
    noteId,
    questions: [stampQuestion(cloneQuestion(note.question))],
    index: 0,
    earnedShards: 0,
    firstTry: 0,
    submissions: 0
  };
  view.feedback = null;
  view.hintIndex = -1;
  resetQuestionInteractionState(view.active.questions[0]);
  render();
  focusMainContent();
}

function stampQuestion(question) {
  return { ...question, rewarded: false, lastAnswer: null, startedAt: Date.now() };
}

function generateQuestion(stage, index, sessionSeed = 0, planEntry = null) {
  const adjustedStage = effectiveStage(stage);
  const seed = adjustedStage.level + index + sessionSeed;
  if (stage.mode === "curriculum") {
    const question = makeCurriculumQuestion(stage, index, seed, sessionSeed, planEntry);
    return placementEngine?.decorateQuestion?.(question, stage) || question;
  }
  const mission = missionFor(stage, index, sessionSeed);
  let question;
  if (stage.mode === "count") question = makeCountQuestion(adjustedStage, seed);
  else if (stage.mode === "compare") question = makeCompareQuestion(adjustedStage, seed);
  else if (stage.mode === "shape") question = makeShapeQuestion(adjustedStage, seed);
  else if (stage.mode === "size") question = makeSizeQuestion(adjustedStage, seed);
  else if (stage.mode === "order") question = makeOrderQuestion(adjustedStage, seed);
  else if (stage.mode === "number") question = makeNumberQuestion(adjustedStage, seed);
  else if (stage.mode === "add") question = makeAddQuestion(adjustedStage, seed);
  else if (stage.mode === "subtract") question = makeSubtractQuestion(adjustedStage, seed);
  else if (stage.mode === "clock") question = makeClockQuestion(adjustedStage, seed);
  else if (stage.mode === "length") question = makeLengthQuestion(adjustedStage, seed);
  else question = makePatternQuestion(adjustedStage, seed);
  const decorated = applyMissionToQuestion(question, stage, mission, adjustedStage.level, sessionSeed);
  return placementEngine?.decorateQuestion?.(decorated, stage) || decorated;
}

// ===== 小1〜小6の専用問題生成 =====
// 各 renderer ごとに盤面と答えの選び方を替える。小さな端末でも押しやすい
// 大きさを保ちながら、位取り・分数・グラフ・方程式・座標を別の手触りで扱う。
function curriculumOptions(answer, candidates) {
  const asKey = (value) => String(value);
  const values = [];
  for (const value of [answer, ...candidates]) {
    if (value === undefined || value === null || values.some((item) => asKey(item) === asKey(value))) continue;
    values.push(value);
  }
  return shuffle(values.slice(0, 4)).map((value) => ({ value, label: String(value) }));
}

function curriculumNumber(seed, min, max) {
  const span = Math.max(1, max - min + 1);
  return min + Math.abs(seed * 17 + seed * seed * 3) % span;
}

function curriculumMissionPlayFor(unit, template, seed) {
  const base = CURRICULUM_MISSION_PLAYS[template?.id] || CURRICULUM_MISSION_PLAYS["material-hunt"];
  const prop = bankPick(seed, `${unit.id}:${template?.id || "mission"}:play-prop`, base.props);
  return {
    ...base,
    id: template?.id || "material-hunt",
    prop,
    cue: base.cue.replace("{prop}", prop)
  };
}

function decorateCurriculumPayloadForPlay(payload, unit, template, seed) {
  const play = curriculumMissionPlayFor(unit, template, seed);
  // 役割カードごとに、同じ問題でも「何をする場面か」を変える。数や条件そのものは
  // 書き換えないので、学習上の正答性はそのまま保ち、長い学習量でも同じ見た目の
  // 四択を連続させない。
  return {
    ...payload,
    prompt: normalizeBankText(`${play.title}・${play.prop}　${payload.prompt}`),
    subPrompt: normalizeBankText(payload.subPrompt || play.cue),
    play,
    answerInstruction: payload.answerInstruction || `${play.title}の答えカードをえらぼう`
  };
}

function makeCurriculumQuestion(stage, index, seed, sessionSeed = 0, planEntry = null) {
  const unit = stage.curriculum;
  const game = stage.game;
  const template = planEntry?.template || BANK_TEMPLATE_META[(Math.abs(sessionSeed) + index) % BANK_TEMPLATE_META.length];
  const cpaPhase = Number.isInteger(planEntry?.cpaPhase)
    ? ((planEntry.cpaPhase % CPA_PHASES.length) + CPA_PHASES.length) % CPA_PHASES.length
    : index % CPA_PHASES.length;
  const cpaPhaseId = CPA_PHASES[cpaPhase];
  const questionSeed = Number.isFinite(planEntry?.questionSeed)
    ? planEntry.questionSeed
    : bankSeed(unit.id, template.id, seed + sessionSeed + index);
  const payload = decorateCurriculumPayloadForPlay(makeBankPayload(unit, template, questionSeed), unit, template, questionSeed);
  const input = curriculumInputForPlay(payload.play, payload.answer);
  const visual = { id: unit.id, name: unit.shortName, src: spriteUrl(unit.visualKit), tint: "#b8dff4" };
  const answerKey = canonicalAnswerKey(payload.answer);
  let options;
  try {
    options = bankOptions(payload.answer, payload.distractors, questionSeed);
  } catch (error) {
    error.message = `${error.message} (${unit.id}/${template.id}, ${payload.contract || "no-contract"}; distractors: ${(payload.distractors || []).join(" | ")})`;
    throw error;
  }
  return {
    mode: "curriculum",
    responseType: "curriculum-lab",
    bankSource: "question-bank",
    curriculum: unit,
    lab: payload.lab,
    prompt: payload.prompt,
    subPrompt: payload.subPrompt || `${template.representation}で、${template.interaction}ミッション！`,
    answer: payload.answer,
    answerKey,
    options,
    hints: fractionHintSteps({ ...payload, options })?.map(fractionHintText) || payload.hints || [
      `${template.representation}の手がかりを、一つずつ見つけよう。`,
      payload.hint || unit.objective,
      `${payload.explanation} だから、答えは ${payload.answer} です。`
    ],
    misconception: payload.misconception || unit.misconception,
    misconceptionId: payload.misconceptionId || `${unit.id}:${template.id}`,
    explanation: payload.explanation,
    skillId: stage.areaId,
    ageBand: stage.grade,
    difficultyBand: template.band,
    templateId: `${unit.id}:${template.id}`,
    templateLabel: template.label,
    interactionType: template.id,
    interactionLabel: payload.play.title,
    representation: template.representation,
    representationLabel: template.representation,
    cpaPhase,
    cpaPhaseId,
    cpaPhaseLabel: CPA_TEMPLATE_STEP_LABELS[template.id] || CPA_PHASE_LABELS[cpaPhaseId],
    contentContract: payload.contract || unit.id,
    missionId: `${stage.id}:${template.id}:${questionSeed}`,
    missionLabel: template.label,
    interaction: template.id,
    sceneId: `curriculum-${unit.worldId}`,
    sceneName: unit.board,
    sceneVisualVariantId: `${unit.id}:${template.id}:${questionSeed % 7}`,
    visual,
    sceneVisual: visual,
    gameVisual: visual,
    audioScript: `${payload.prompt} ${unit.objective}`,
    stageGame: game,
    // 見た目の役割カード番号ではなく、今回の冒険の何拍目かを盤面に渡す。
    // これで10・15問でも 5 拍の学び方をまっすぐ繰り返せる。
    stageRound: cpaPhase % game.rounds.length,
    stageRoundTitle: `${cpaPhase + 1}. ${CPA_TEMPLATE_STEP_LABELS[template.id] || CPA_PHASE_LABELS[cpaPhaseId]}`,
    stageRoundAction: template.interaction,
    answerInstruction: payload.answerInstruction || `${template.interaction}カードをえらぼう`,
    playStyle: payload.play.style,
    playIcon: payload.play.icon,
    playTitle: payload.play.title,
    playCue: payload.play.cue,
    playProp: payload.play.prop,
    inputMethod: input.inputMethod,
    inputPattern: input.inputPattern,
    presentationRole: input.presentationRole,
    inputActionLabel: input.inputActionLabel,
    keypadKeys: input.keypadKeys
  };
}

// ===== 小学校問題バンク =====
// 旧来の renderer 共通問題ではなく、各単元に数学的な「何を問うか」を明示する。
// family は UI の見た目ではなく、生成する問題の不変条件を表す。
const QUESTION_BANK = Object.freeze({
  "w1-capacity-potion": { family: "capacity" },
  "w1-solid-shadow": { family: "solid" },
  "w1-picture-graph": { family: "pictograph" },
  "w2-place-value": { family: "place", digits: 3 },
  "w2-column-calculation": { family: "addsub", digits: 2 },
  "w2-multiplication": { family: "multiplication", digits: 1 },
  "w2-division": { family: "division", remainder: false },
  "w2-fraction": { family: "fraction-intro" },
  "w2-money": { family: "money" },
  "w2-units": { family: "units" },
  "w2-rectangle": { family: "rectangle" },
  "w2-data": { family: "table-data" },
  "w3-number10000": { family: "place", digits: 4 },
  "w3-multiplication": { family: "multiplication", digits: 2 },
  "w3-division-remainder": { family: "division", remainder: true },
  "w3-decimal": { family: "decimal-read" },
  "w3-fraction": { family: "fraction-compare" },
  "w3-circle": { family: "circle-radius" },
  "w3-time": { family: "elapsed-time" },
  "w3-bargraph": { family: "bar-data" },
  "w4-rounding": { family: "rounding" },
  "w4-division": { family: "long-division" },
  "w4-decimal-calc": { family: "decimal-calc" },
  "w4-fraction-calc": { family: "same-denominator" },
  "w4-angle": { family: "angle" },
  "w4-parallel": { family: "parallel" },
  "w4-area": { family: "rectangle-area" },
  "w4-volume": { family: "cuboid-volume" },
  "w4-linegraph": { family: "line-data" },
  "w5-factors": { family: "factors" },
  "w5-decimal-muldiv": { family: "decimal-muldiv" },
  "w5-fraction-common": { family: "common-denominator" },
  "w5-unit-rate": { family: "unit-rate" },
  "w5-percent": { family: "percent" },
  "w5-shape-area": { family: "shape-area" },
  "w5-circle": { family: "circumference" },
  "w5-congruence": { family: "congruence" },
  "w5-average": { family: "average" },
  "w6-fraction-muldiv": { family: "fraction-muldiv" },
  "w6-ratio": { family: "ratio" },
  "w6-proportion": { family: "proportion" },
  "w6-formula": { family: "formula" },
  "w6-symmetry": { family: "symmetry" },
  "w6-scale": { family: "scale" },
  "w6-prism": { family: "prism" },
  "w6-probability": { family: "probability" },
  "w6-data": { family: "representative-data" }
});

function bankSeed(...parts) {
  let hash = 2166136261;
  for (const part of parts) {
    const text = String(part);
    for (let index = 0; index < text.length; index += 1) {
      hash ^= text.charCodeAt(index);
      hash = Math.imul(hash, 16777619);
    }
    hash ^= 31;
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function bankInt(seed, salt, min, max) {
  const lower = Math.ceil(Math.min(min, max));
  const upper = Math.floor(Math.max(min, max));
  return lower + (bankSeed(seed, salt) % Math.max(1, upper - lower + 1));
}

function bankPick(seed, salt, values) {
  return values[bankInt(seed, salt, 0, values.length - 1)];
}

function bankDistinctValues(seed, salt, min, max, count) {
  const lower = Math.ceil(Math.min(min, max));
  const upper = Math.floor(Math.max(min, max));
  const span = upper - lower + 1;
  if (count > span) throw new Error(`異なる値を${count}個作れません: ${min}〜${max}`);
  const values = [];
  for (let index = 0; index < count; index += 1) {
    let value = bankInt(seed, `${salt}:${index}`, lower, upper);
    while (values.includes(value)) value = lower + ((value - lower + 1) % span);
    values.push(value);
  }
  return values;
}

function bankShuffle(values, seed) {
  return [...values]
    .map((value, index) => ({ value, index, order: bankSeed(seed, index, canonicalAnswerKey(value?.value ?? value)) }))
    .sort((left, right) => left.order - right.order || left.index - right.index)
    .map(({ value }) => value);
}

function gcd(left, right) {
  let a = Math.abs(Number(left) || 0);
  let b = Math.abs(Number(right) || 0);
  while (b) [a, b] = [b, a % b];
  return a || 1;
}

function simplifyFraction(numerator, denominator) {
  const sign = denominator < 0 ? -1 : 1;
  const divisor = gcd(numerator, denominator);
  return { numerator: sign * numerator / divisor, denominator: Math.abs(denominator) / divisor };
}

function fractionText(numerator, denominator) {
  const reduced = simplifyFraction(numerator, denominator);
  return `${reduced.numerator}/${reduced.denominator}`;
}

// 0.1 + 0.2 のような JavaScript の丸め誤差を、問題文・選択肢・採点キーに
// 持ち込まない。小学校の問題では 4 桁を超える小数を見せる必然性がないため、
// ここで「計算用の数」と「子どもに見せる数」を同じ読みやすい値へそろえる。
function normalizeBankNumber(value) {
  if (typeof value !== "number" || !Number.isFinite(value)) return value;
  const rounded = Math.round((value + Number.EPSILON) * 10000) / 10000;
  return Object.is(rounded, -0) ? 0 : rounded;
}

function normalizeBankText(value) {
  return String(value ?? "").replace(/-?(?:\d+\.\d{5,}|\.\d{5,})/g, (raw) => {
    const numeric = Number(raw);
    return Number.isFinite(numeric) ? String(normalizeBankNumber(numeric)) : raw;
  });
}

function normalizeBankValue(value) {
  if (typeof value === "number") return normalizeBankNumber(value);
  if (typeof value === "string") return normalizeBankText(value);
  return value;
}

function canonicalAnswerKey(value) {
  const raw = String(value ?? "").trim().replaceAll("　", "").replaceAll(" ", "");
  const ratio = raw.match(/^(-?\d+):(-?\d+)$/);
  if (ratio) {
    const left = Number(ratio[1]); const right = Number(ratio[2]);
    const divisor = gcd(left, right);
    return `ratio:${left / divisor}:${right / divisor}`;
  }
  const fraction = raw.match(/^(-?\d+)\/(-?\d+)$/);
  if (fraction && Number(fraction[2]) !== 0) {
    const reduced = simplifyFraction(Number(fraction[1]), Number(fraction[2]));
    return `fraction:${reduced.numerator}/${reduced.denominator}`;
  }
  if (/^-?(?:\d+\.?\d*|\.\d+)$/.test(raw)) return `number:${Number(raw)}`;
  return `text:${raw}`;
}

function bankOptions(answer, distractors = [], seed = 0) {
  const candidates = [];
  const add = (value) => {
    if (value === undefined || value === null) return;
    const normalized = normalizeBankValue(value);
    const key = canonicalAnswerKey(normalized);
    if (!candidates.some((candidate) => canonicalAnswerKey(candidate) === key)) candidates.push(normalized);
  };
  const normalizedAnswer = normalizeBankValue(answer);
  add(normalizedAnswer);
  distractors.forEach(add);
  const numeric = Number(normalizedAnswer);
  if (Number.isFinite(numeric)) {
    const deltas = [-1, 1, -2, 2, -5, 5, -10, 10, -0.1, 0.1, -0.2, 0.2];
    for (const delta of deltas) {
      if (candidates.length >= 4) break;
      const value = Number.isInteger(numeric) ? Math.max(0, numeric + Math.round(delta)) : Math.max(0, Math.round((numeric + delta) * 100) / 100);
      add(value);
    }
  }
  if (candidates.length < 4) {
    throw new Error(`問題バンクの選択肢が4つそろいません: ${String(answer)}`);
  }
  return bankShuffle(candidates.slice(0, 4), seed).map((value) => ({ value, label: normalizeBankText(value) }));
}

function templateIndex(template) {
  const index = BANK_TEMPLATE_META.findIndex((candidate) => candidate.id === template?.id);
  return index < 0 ? 0 : index;
}

function bankForm(template, modulo = 5) {
  return templateIndex(template) % modulo;
}

function payload(prompt, answer, distractors, lab, explanation, extra = {}) {
  const normalizedExtra = {
    ...extra,
    ...(Array.isArray(extra.hints) ? { hints: extra.hints.map(normalizeBankText) } : {})
  };
  return {
    prompt: normalizeBankText(prompt),
    answer: normalizeBankValue(answer),
    distractors: (distractors || []).map(normalizeBankValue),
    lab,
    explanation: normalizeBankText(explanation),
    ...normalizedExtra
  };
}

function buildLearningSessionPlan(stage, sessionSeed = 0) {
  const count = sessionQuestionCount(stage);
  if (stage?.mode !== "curriculum") return Array.from({ length: count }, (_, index) => ({ id: `legacy-${index}`, questionSeed: sessionSeed + index }));
  const unit = stage.curriculum;
  const profile = skillProfile(stage.areaId);
  const repairFirst = Object.keys(profile.misconceptionCounts || {}).some((key) => key.startsWith(`${unit.id}:`));
  // 1セットを「ためす→みる→式にする→たしかめる→使う」の順に固定する。
  // 難しさで入口は替えるが、問題カードだけを回転させて学びの順番が崩れる
  // ことはない。10・15問では別の5拍子へ移るので、同じ手触りの連打にもならない。
  const levelOffset = Math.max(-1, Math.min(1, Number(profile.levelOffset) || 0));
  const flowOrder = levelOffset > 0
    ? ["challenge", "foundation", "practice"]
    : repairFirst && levelOffset === 0
      ? ["practice", "foundation", "challenge"]
      : ["foundation", "practice", "challenge"];
  const selectedTemplates = flowOrder
    .flatMap((flowId) => CPA_TEMPLATE_FLOWS[flowId])
    .slice(0, count)
    .map((templateId) => BANK_TEMPLATE_BY_ID[templateId])
    .filter(Boolean);
  const usedAnswers = new Set();
  return selectedTemplates.map((template, index) => {
    let questionSeed = bankSeed(unit.id, template.id, sessionSeed, index);
    for (let retry = 0; retry < 48; retry += 1) {
      const candidate = makeBankPayload(unit, template, questionSeed);
      const key = canonicalAnswerKey(candidate.answer);
      if (!usedAnswers.has(key)) {
        usedAnswers.add(key);
        break;
      }
      questionSeed = bankSeed(questionSeed, "retry", retry);
    }
    const cpaPhase = index % CPA_PHASES.length;
    return {
      id: `${unit.id}:${template.id}:${questionSeed}`,
      template,
      questionSeed,
      cpaPhase,
      cpaPhaseId: CPA_PHASES[cpaPhase]
    };
  });
}

function makeBankPayload(unit, template, seed) {
  const spec = QUESTION_BANK[unit.id];
  if (!spec) throw new Error(`問題バンク未登録の単元: ${unit.id}`);
  const factory = BANK_FACTORIES[spec.family];
  if (!factory) throw new Error(`問題バンクfactory未登録: ${spec.family}`);
  return factory(unit, template, seed, spec);
}

const BANK_FACTORIES = Object.freeze({
  capacity: makeCapacityBank,
  solid: makeSolidBank,
  pictograph: makePictographBank,
  place: makePlaceBank,
  addsub: makeAddSubBank,
  multiplication: makeMultiplicationBank,
  division: makeDivisionBank,
  "fraction-intro": makeFractionIntroBank,
  money: makeMoneyBank,
  units: makeUnitsBank,
  rectangle: makeRectangleBank,
  "table-data": makeTableDataBank,
  "decimal-read": makeDecimalReadBank,
  "fraction-compare": makeFractionCompareBank,
  "circle-radius": makeCircleRadiusBank,
  "elapsed-time": makeElapsedTimeBank,
  "bar-data": makeBarDataBank,
  rounding: makeRoundingBank,
  "long-division": makeLongDivisionBank,
  "decimal-calc": makeDecimalCalcBank,
  "same-denominator": makeSameDenominatorBank,
  angle: makeAngleBank,
  parallel: makeParallelBank,
  "rectangle-area": makeRectangleAreaBank,
  "cuboid-volume": makeCuboidVolumeBank,
  "line-data": makeLineDataBank,
  factors: makeFactorsBank,
  "decimal-muldiv": makeDecimalMulDivBank,
  "common-denominator": makeCommonDenominatorBank,
  "unit-rate": makeUnitRateBank,
  percent: makePercentBank,
  "shape-area": makeShapeAreaBank,
  circumference: makeCircumferenceBank,
  congruence: makeCongruenceBank,
  average: makeAverageBank,
  "fraction-muldiv": makeFractionMulDivBank,
  ratio: makeRatioBank,
  proportion: makeProportionBank,
  formula: makeFormulaBank,
  symmetry: makeSymmetryBank,
  scale: makeScaleBank,
  prism: makePrismBank,
  probability: makeProbabilityBank,
  "representative-data": makeRepresentativeDataBank
});

function makeCapacityBank(unit, template, seed) {
  const a = bankInt(seed, "a", 4, 12);
  const b = bankInt(seed, "b", 3, 11);
  const form = bankForm(template, 5);
  if (form === 0) return payload(`ポーションが ${a}ます と ${b}ます。あわせると何ます？`, a + b, [a, b, Math.abs(a - b)], { type: "measure", amount: a, unit: "ます" }, `${a}と${b}を合わせて${a + b}ます。`, { contract: "capacity-sum" });
  if (form === 1) return payload(`${a + b}ます 入るびんに ${a}ます 入れたよ。のこりは？`, b, [a, a + b, Math.max(0, b - 1)], { type: "measure", amount: a + b, unit: "ます" }, `全部から入れた${a}ますを引くと${b}ます。`, { contract: "capacity-remainder" });
  if (form === 2) return payload(`${a}ます と ${b}ます のちがいは何ます？`, Math.abs(a - b), [a + b, Math.min(a, b), Math.max(a, b)], { type: "measure", amount: Math.max(a, b), unit: "ます" }, `大きい方から小さい方を引くと${Math.abs(a - b)}ます。`, { contract: "capacity-difference" });
  if (form === 3) return payload(`1びんに ${a}ます。2びんなら何ます？`, a * 2, [a, a + 2, a * 3], { type: "measure", amount: a, unit: "ます" }, `${a}ますが2つで${a * 2}ます。`, { contract: "capacity-double" });
  return payload(`${a}ます 入ったあと、さらに ${b}ます 入れると何ます？`, a + b, [a, b, Math.abs(a - b)], { type: "measure", amount: a, unit: "ます" }, `目盛りを${b}ます分進めると${a + b}ます。`, { contract: "capacity-fill" });
}

function makeSolidBank(unit, template, seed) {
  const solids = ["はこ", "つつ", "たま", "さんかくのやね"];
  const shape = bankPick(seed, "solid", solids);
  const solidLab = (solid) => ({ type: "geometry", kind: "solid", solid });
  const form = bankForm(template, 4);
  if (form === 0) return payload("どの向きにも ころがる立体はどれ？", "たま", ["はこ", "つつ", "さんかくのやね"], solidLab("sphere"), "たまは角がなく、どの向きにもころがります。", { contract: "solid-roll" });
  if (form === 1) return payload("四角い平らな面だけで できているのはどれ？", "はこ", ["つつ", "たま", "さんかくのやね"], solidLab("cuboid"), "はこは四角い平らな面だけで囲まれています。", { contract: "solid-faces" });
  if (form === 2) return payload("まるい面が2つ、平らな面が1つあるのはどれ？", "つつ", ["はこ", "たま", "さんかくのやね"], solidLab("cylinder"), "つつには上下の丸い面と横の曲がった面があります。", { contract: "solid-cylinder" });
  const solidId = shape === "たま" ? "sphere" : shape === "つつ" ? "cylinder" : shape === "はこ" ? "cuboid" : "prism";
  return payload(`${shape}を ころがらないように置くには、どんな面を下にする？`, shape === "たま" ? "平らな台" : "平らな面", ["とがったところ", "まるいところ", "空中"], solidLab(solidId), "安定させるには、平らな場所に置きます。", { contract: "solid-stability" });
}

function makePictographBank(unit, template, seed) {
  const values = bankDistinctValues(seed, "pictograph", 1, 9, 3);
  const labels = ["ねこ", "いぬ", "うさぎ"];
  const form = bankForm(template, 5);
  const max = Math.max(...values); const min = Math.min(...values);
  if (form === 0) {
    const difference = Math.abs(values[1] - values[0]);
    return payload(`シール表で、ねこといぬの数のちがいは何こ？`, difference, [Math.max(0, difference - 1), difference + 1, values[0] + values[1]], { type: "chart", labels, values }, "大きい数から小さい数を引きます。", { contract: "pictograph-difference" });
  }
  if (form === 1) return payload(`3しゅるいのシールは、ぜんぶで何こ？`, values.reduce((sum, value) => sum + value, 0), [max, min, max + min], { type: "chart", labels, values }, "3本の印を全部足します。", { contract: "pictograph-total" });
  if (form === 2) return payload(`いちばん多いのはどれ？`, labels[values.indexOf(max)], labels.filter((label) => label !== labels[values.indexOf(max)]).concat("おなじ"), { type: "chart", labels, values }, "印がいちばん多い列を読みます。", { contract: "pictograph-most" });
  if (form === 3) return payload(`いちばん少ない数は何こ？`, min, [max, values.reduce((sum, value) => sum + value, 0), min + 1], { type: "chart", labels, values }, "いちばん低い列の数を読みます。", { contract: "pictograph-least" });
  return payload(`うさぎを ${values[2]}こ集めたよ。ねことうさぎで何こ？`, values[0] + values[2], [values[0], values[2], Math.abs(values[0] - values[2])], { type: "chart", labels, values }, "ねこと うさぎの印を合わせます。", { contract: "pictograph-combine" });
}

function makePlaceBank(unit, template, seed, spec) {
  const digits = spec.digits || 3;
  const lower = digits === 4 ? 1023 : 123;
  const upper = digits === 4 ? 9876 : 987;
  const value = bankInt(seed, "value", lower, upper);
  const text = String(value);
  const focusIndex = bankInt(seed, "focus", 0, text.length - 1);
  const digit = Number(text[focusIndex]);
  const power = text.length - focusIndex - 1;
  const placeNames = ["一の位", "十の位", "百の位", "千の位"];
  const form = bankForm(template, 5);
  if (form === 0) return payload(`${value}の ${placeNames[power]} は いくつ分？`, digit * (10 ** power), [digit, digit * (10 ** Math.max(0, power - 1)), digit * (10 ** Math.min(3, power + 1))], { type: "place", digits: text, focus: placeNames[power], focusIndex, value }, `${digit}は${placeNames[power]}なので${digit * (10 ** power)}です。`, { contract: "place-value" });
  if (form === 1) return payload(`${value}の 百の位の数字は？`, Number(text[text.length - 3]), [Number(text[text.length - 1]), Number(text[Math.max(0, text.length - 2)]), (Number(text[text.length - 3]) + 1) % 10], { type: "place", digits: text, focus: "百の位", focusIndex: text.length - 3, value }, "右から三つ目が百の位です。", { contract: "place-digit" });
  if (form === 2) return payload(`${value}より ${10 ** power} 大きい数は？`, value + 10 ** power, [value - 10 ** power, value + 1, value + 10 ** Math.max(0, power - 1)], { type: "place", digits: text, focus: placeNames[power], focusIndex, value }, `${placeNames[power]}を1つ増やします。`, { contract: "place-step" });
  if (form === 3) {
    const chunk = 10 ** power;
    const placeValue = digit * chunk;
    const rest = value - placeValue;
    return payload(`${value}を ${placeValue} と のこりに分けた式は？`, `${placeValue} + ${rest}`, [`${placeValue + chunk} + ${rest}`, `${placeValue} + ${rest + chunk}`, `${value} + ${placeValue}`], { type: "place", digits: text, focus: placeNames[power], focusIndex, value }, "その位のまとまりと、のこりに分けます。", { contract: "place-decompose" });
  }
  return payload(`${value}の ${placeNames[power]} を1つ小さくすると？`, value - 10 ** power, [value + 10 ** power, value - 1, value - 10 ** Math.max(0, power - 1)], { type: "place", digits: text, focus: placeNames[power], focusIndex, value }, `${placeNames[power]}を1つ分だけ減らします。`, { contract: "place-back" });
}

function makeAddSubBank(unit, template, seed) {
  const left = bankInt(seed, "left", 24, 78);
  const right = bankInt(seed, "right", 13, 39);
  const add = bankForm(template, 2) === 0;
  const larger = Math.max(left, right + 12); const smaller = Math.min(right, larger - 5);
  const form = bankForm(template, 5);
  const a = add ? left : larger; const b = add ? right : smaller; const answer = add ? a + b : a - b;
  if (form === 0) return payload(`${a} ${add ? "+" : "−"} ${b} はいくつ？`, answer, [answer + 1, answer - 1, add ? a - b : a + b], { type: "calculation", left: a, right: b, operator: add ? "+" : "−" }, `${a} ${add ? "+" : "−"} ${b} = ${answer}です。`, { contract: "column-calc" });
  if (form === 1) return payload(`${a}に何を足すと ${a + b}？`, b, [a, a + b, Math.abs(a - b)], { type: "calculation", left: a, right: "?", operator: "+" }, `${a + b}から${a}を引きます。`, { contract: "missing-addend" });
  if (form === 2) return payload(`${a + b}から ${a}を引くと？`, b, [a, a + b, Math.abs(a - b)], { type: "calculation", left: a + b, right: a, operator: "−" }, "足し算を引き算で確かめます。", { contract: "inverse-calc" });
  if (form === 3) return payload(`${a} ${add ? "+" : "−"} ${b} の見積もりで近いのは？`, Math.round(answer / 10) * 10, [Math.round(a / 10) * 10, Math.round(b / 10) * 10, Math.round((a + b) / 10) * 10 + 10], { type: "calculation", left: a, right: b, operator: add ? "+" : "−" }, "十の位に丸めてだいたいを考えます。", { contract: "estimate-calc" });
  const tensDigit = Math.floor(answer / 10) % 10;
  const digitDistractors = [1, 2, 3].map((offset) => (tensDigit + offset) % 10);
  return payload(`${a} ${add ? "+" : "−"} ${b} の答えは ${answer}。十の位の数字は？`, tensDigit, digitDistractors, { type: "calculation", left: a, right: b, operator: add ? "+" : "−" }, `${answer}の十の位の数字は${tensDigit}です。`, { contract: "place-after-calc" });
}

function makeMultiplicationBank(unit, template, seed, spec) {
  const rows = spec.digits === 2 ? bankInt(seed, "rows", 12, 29) : bankInt(seed, "rows", 2, 9);
  const cols = bankInt(seed, "cols", 2, 9);
  const answer = rows * cols;
  const form = bankForm(template, 5);
  if (form === 0) return payload(`${rows}こずつが ${cols}れつ。ぜんぶで？`, answer, [rows + cols, answer + rows, answer - cols], { type: "array", rows, cols, token: "●" }, `${rows}を${cols}回足すと${answer}です。`, { contract: "multiplication-array" });
  if (form === 1) return payload(`${rows} × ${cols} はいくつ？`, answer, [rows + cols, answer + rows, answer - rows], { type: "calculation", left: rows, right: cols, operator: "×" }, `${rows}を${cols}組にします。`, { contract: "multiplication-product" });
  if (form === 2) return payload(`${answer}になる式はどれ？`, `${rows} × ${cols}`, [`${rows} + ${cols}`, `${rows + 1} × ${cols}`, `${rows} × ${Math.max(1, cols - 1)}`], { type: "array", rows, cols, token: "●" }, "行の数と1行の数を掛けます。", { contract: "multiplication-expression" });
  if (form === 3) return payload(`${rows} × ${cols} を ${rows} × ${Math.max(1, cols - 1)} と何で考える？`, rows, [cols, answer, rows + cols], { type: "calculation", left: rows, right: cols, operator: "×" }, `${cols - 1}組に、もう1組の${rows}を足します。`, { contract: "multiplication-distribute" });
  const memo = answer + rows;
  return payload(`${rows}こ入りの袋を${cols}こ。メモには${memo}ことあるよ。正しい数は？`, answer, [memo, answer - 1, answer + 1], { type: "array", rows, cols, token: "●" }, `${rows}×${cols}=${answer}です。`, { contract: "multiplication-check" });
}

function makeDivisionBank(unit, template, seed, spec) {
  const divisor = bankInt(seed, "divisor", 2, 9);
  const quotient = bankInt(seed, "quotient", 2, 12);
  const remainder = spec.remainder ? bankInt(seed, "remainder", 1, divisor - 1) : 0;
  const total = divisor * quotient + remainder;
  const answerText = remainder ? `${quotient} あまり ${remainder}` : quotient;
  const divisionLab = { type: "calculation", left: total, right: divisor, operator: "÷", dividend: total, divisor, quotient, remainder };
  const form = bankForm(template, 5);
  if (form === 0) return payload(`${total}こを ${divisor}こずつ分けると？`, answerText, [`${quotient + 1} あまり ${remainder}`, `${quotient} あまり ${Math.max(0, remainder + 1)}`, quotient + 1], divisionLab, `${total} = ${divisor} × ${quotient}${remainder ? ` + ${remainder}` : ""}です。`, { contract: remainder ? "division-remainder" : "division-share" });
  if (form === 1) return payload(`${total}こを ${divisor}こずつで、余りを出さずに作れる袋は何袋？`, quotient, [divisor, quotient + 1, total - quotient], divisionLab, `1袋${divisor}こなので、余りを出さずに${quotient}袋作れます。`, { contract: "division-grouping" });
  if (form === 2) return payload(`${divisor} × ${quotient}${remainder ? ` + ${remainder}` : ""} は？`, total, [divisor * quotient, total + remainder, quotient + remainder], { ...divisionLab, left: divisor, right: quotient, operator: "×" }, "割り算を掛け算で確かめます。", { contract: "division-check" });
  if (form === 3 && remainder) return payload(`あまりは ${divisor}よりどうなる？`, "小さい", ["大きい", "同じ", "わからない"], divisionLab, "あまりは必ず割る数より小さくなります。", { contract: "remainder-rule" });
  return payload(`${total}を ${divisor}で割った商を1つ増やすと？`, quotient + 1, [quotient, divisor, total], divisionLab, `商${quotient}の次は${quotient + 1}です。`, { contract: "division-quotient" });
}

function makeFractionIntroBank(unit, template, seed) {
  const denominator = bankPick(seed, "den", [2, 3, 4, 5, 6]);
  const numerator = bankInt(seed, "num", 1, denominator - 1);
  const form = bankForm(template, 5);
  if (form === 0) return payload(`${denominator}とうぶんしたうち ${numerator}こぬった分数は？`, `${numerator}/${denominator}`, [`${denominator}/${numerator}`, `${numerator + 1}/${denominator}`, `${numerator}/${denominator + 1}`], { type: "fraction", numerator, denominator }, `${denominator}こに等しく分けたうち${numerator}こです。`, { contract: "fraction-shaded" });
  if (form === 1) return payload(`${numerator}/${denominator}の分母は？`, denominator, [numerator, denominator + 1, Math.max(1, denominator - 1)], { type: "fraction", numerator, denominator }, "分母は、全部を何こに分けたかです。", { contract: "fraction-denominator" });
  if (form === 2) return payload(`${numerator}/${denominator}の分子は？`, numerator, [denominator, numerator + 1, Math.max(0, numerator - 1)], { type: "fraction", numerator, denominator }, "分子は、色をぬった数です。", { contract: "fraction-numerator" });
  if (form === 3) return payload(`${denominator}こに同じ大きさで分けたら、1つ分は？`, `1/${denominator}`, [`${denominator}/1`, `1/${Math.max(1, denominator - 1)}`, "3/7"], { type: "fraction", numerator: 1, denominator }, `1つ分なので分子は1です。`, { contract: "fraction-unit" });
  return payload(`${numerator}/${denominator}で、ぬっていない部分は？`, `${denominator - numerator}/${denominator}`, ["1/7", "2/7", "3/7"], { type: "fraction", numerator, denominator }, `全部${denominator}こから${numerator}こを引きます。`, { contract: "fraction-complement" });
}

function makeMoneyBank(unit, template, seed) {
  const price = bankInt(seed, "price", 120, 780);
  const paid = Math.ceil((price + bankInt(seed, "extra", 20, 220)) / 10) * 10;
  const change = paid - price;
  const tens = bankInt(seed, "tens", 1, 9);
  const form = bankForm(template, 5);
  if (form === 0) return payload(`${paid}円出して ${price}円のおやつを買うと、おつりは？`, change, [paid, price, change + 10], { type: "money", paid, price }, `${paid}−${price}=${change}円です。`, { contract: "money-change" });
  if (form === 1) return payload(`${price}円のおやつを2こ買うと？`, price * 2, [price, price + 100, price * 2 + 10], { type: "money", paid: price * 2, price }, `${price}円が2こです。`, { contract: "money-double" });
  if (form === 2) return payload(`500円1まい、100円1まい、10円が${tens}まい。ぜんぶで？`, 600 + tens * 10, [500 + tens * 10, 600, 610 + tens * 10], { type: "money", paid: 600 + tens * 10, price: 0 }, "硬貨の値段を足します。", { contract: "money-composition" });
  if (form === 3) return payload(`${paid}円で ${price}円の買い物。${change}円より10円多いのは？`, change + 10, [change, change - 10, paid - 10], { type: "money", paid, price }, `おつり${change}円に10円を足します。`, { contract: "money-step" });
  const memo = paid + 10;
  return payload(`${price}円の品物に、あと${change}円。メモには合計${memo}円とあるよ。正しい合計は？`, paid, [memo, paid - 10, paid + 20], { type: "money", paid, price }, `${price}+${change}=${paid}円です。`, { contract: "money-check" });
}

function makeUnitsBank(unit, template, seed) {
  const cases = [
    { thing: "えんぴつの長さ", unit: "cm", wrong: ["m", "L", "分"] },
    { thing: "牛にゅうパックのかさ", unit: "L", wrong: ["cm", "m", "分"] },
    { thing: "教室の横の長さ", unit: "m", wrong: ["cm", "L", "分"] },
    { thing: "休み時間", unit: "分", wrong: ["cm", "L", "m"] }
  ];
  const item = bankPick(seed, "unit", cases);
  const form = bankForm(template, 4);
  if (form === 0) return payload(`${item.thing}を表すのに ぴったりな単位は？`, item.unit, item.wrong, { type: "measure", amount: 6, unit: item.unit }, `${item.thing}には${item.unit}を使います。`, { contract: "unit-select" });
  if (form === 1) return payload(`100cm は何m？`, 1, [10, 100, 1000], { type: "measure", amount: 100, unit: "cm" }, "100cmで1mです。", { contract: "unit-convert-length" });
  if (form === 2) return payload(`1L は何mL？`, 1000, [100, 10, 10000], { type: "measure", amount: 1, unit: "L" }, "1Lは1000mLです。", { contract: "unit-convert-capacity" });
  return payload(`1時間は何分？`, 60, [30, 100, 360], { type: "measure", amount: 1, unit: "時間" }, "1時間は60分です。", { contract: "unit-convert-time" });
}

function makeRectangleBank(unit, template, seed) {
  const width = bankInt(seed, "rectangle-width", 5, 10);
  let height = bankInt(seed, "rectangle-height", 3, 7);
  if (height === width) height = height === 7 ? height - 1 : height + 1;
  const rectangleLab = (shape, extra = {}) => {
    const squareSide = Number.isFinite(Number(extra.side)) ? Number(extra.side) : width;
    return {
      type: "geometry",
      kind: "rectangle",
      shape,
      width: shape === "square" ? squareSide : width,
      height: shape === "square" ? squareSide : height,
      sides: 4,
      labels: ["A", "B", "C", "D"],
      ...extra
    };
  };
  const form = bankForm(template, 5);
  if (form === 0) {
    return payload(
      `たて${height}cm、よこ${width}cm。4つの角が直角で、向かい合う辺が同じ長さの形は？`,
      "長方形",
      ["正方形", "三角形", "円"],
      rectangleLab("rectangle"),
      "4つの直角があり、向かい合う辺が同じ長さの四角形が長方形です。",
      { contract: "rectangle-properties" }
    );
  }
  if (form === 1) {
    const shape = bankInt(seed, "right-angle-shape", 0, 1) === 0 ? "正方形" : "長方形";
    return payload(
      `${shape}の直角は何こ？`,
      4,
      [2, 3, 5],
      rectangleLab(shape === "正方形" ? "square" : "rectangle", { rightAngles: 4 }),
      `${shape}には4つの直角があります。`,
      { contract: "square-right-angles" }
    );
  }
  if (form === 2) {
    const horizontalPair = bankInt(seed, "opposite-pair", 0, 1) === 0;
    const answer = horizontalPair ? "ABとCD" : "BCとAD";
    const distractors = horizontalPair
      ? ["ABとBC", "BCとCD", "ABとAC"]
      : ["ABとBC", "ABとCD", "BCとBD"];
    return payload(
      `長方形ABCDで、★のしるしがついた同じ長さの辺の組はどれ？`,
      answer,
      distractors,
      rectangleLab("rectangle", { equalPair: horizontalPair ? "horizontal" : "vertical" }),
      "★がついた向かい合う辺どうしが同じ長さです。",
      { contract: "rectangle-opposites" }
    );
  }
  if (form === 3) {
    const isRectangle = bankInt(seed, "rectangle-check", 0, 1) === 0;
    const rightAngles = isRectangle ? 4 : 2;
    return payload(
      `直角が${rightAngles}この四角形は、長方形？`,
      isRectangle ? "はい" : "いいえ",
      ["はい", "いいえ", "ときどき", "わからない"].filter((option) => option !== (isRectangle ? "はい" : "いいえ")),
      rectangleLab(isRectangle ? "rectangle" : "slanted", { rightAngles }),
      isRectangle ? "長方形には4つの直角があります。" : "長方形なら4つの角がすべて直角です。",
      { contract: "rectangle-not-rectangle" }
    );
  }
  const side = bankInt(seed, "square-side", 3, 9);
  return payload(
    `4つの辺が${side}cmで、4つの角が直角の形は？`,
    "正方形",
    ["三角形", "円", "五角形"],
    rectangleLab("square", { side }),
    "4つの辺が同じ長さで、4つの角が直角の四角形が正方形です。",
    { contract: "square-properties" }
  );
}

function makeTableDataBank(unit, template, seed) {
  const values = bankDistinctValues(seed, "table", 2, 10, 3);
  const labels = ["月", "火", "水"];
  const total = values.reduce((sum, value) => sum + value, 0);
  const form = bankForm(template, 4);
  if (form === 0) return payload(`表の火曜日の数は？`, values[1], [values[0], values[2], values[1] + 1], { type: "chart", labels, values }, "火の列を読みます。", { contract: "table-read" });
  if (form === 1) return payload(`3日間の合計は？`, total, [Math.max(...values), Math.min(...values), total - 1], { type: "chart", labels, values }, "表の数を全部足します。", { contract: "table-total" });
  if (form === 2) return payload(`いちばん多い曜日は？`, labels[values.indexOf(Math.max(...values))], labels.filter((label) => label !== labels[values.indexOf(Math.max(...values))]).concat("同じ"), { type: "chart", labels, values }, "高い棒の曜日を選びます。", { contract: "table-most" });
  return payload(`月と水のちがいは？`, Math.abs(values[0] - values[2]), [values[0] + values[2], values[0], values[2]], { type: "chart", labels, values }, "2つの数を引き算で比べます。", { contract: "table-difference" });
}

function makeDecimalReadBank(unit, template, seed) {
  const tenths = bankInt(seed, "tenths", 1, 9);
  const whole = bankInt(seed, "whole", 0, 4);
  const value = Number(`${whole}.${tenths}`);
  const form = bankForm(template, 5);
  if (form === 0) return payload(`${value}は 0.1が何こ分？`, whole * 10 + tenths, [tenths, whole + tenths, whole * 10], { type: "decimal", a: whole, b: `0.${tenths}`, operation: "+" }, `${value}は0.1が${whole * 10 + tenths}こです。`, { contract: "decimal-tenths" });
  if (form === 1) return payload(`${value}と ${Number((value + 0.1).toFixed(1))}、大きいのは？`, String(Number((value + 0.1).toFixed(1))), [String(value), String(Number(Math.max(0, value - 0.1).toFixed(1))), "おなじ"], { type: "decimal", a: value, b: Number((value + 0.1).toFixed(1)), operation: "くらべる" }, "小数点をそろえて、十分の一の位を比べます。", { contract: "decimal-compare" });
  if (form === 2) return payload(`${whole}と0.${tenths}を合わせた数は？`, value, [whole + tenths, Number(`0.${whole}${tenths}`), whole], { type: "decimal", a: whole, b: `0.${tenths}`, operation: "+" }, `整数${whole}と十分の一${tenths}こを合わせます。`, { contract: "decimal-compose" });
  if (form === 3) return payload(`${value}の小数第1位の数字は？`, tenths, [whole, tenths + 1, Math.max(0, tenths - 1)], { type: "decimal", a: value, b: "", operation: "読む" }, "小数点のすぐ右が小数第1位です。", { contract: "decimal-digit" });
  return payload(`0.1を ${whole * 10 + tenths}こ集めると？`, value, [tenths, whole + tenths, Number((value + 1).toFixed(1))], { type: "decimal", a: 0.1, b: whole * 10 + tenths, operation: "×" }, "0.1のまとまりを数えます。", { contract: "decimal-unit" });
}

function makeFractionCompareBank(unit, template, seed) {
  const denominator = bankPick(seed, "den", [5, 6, 7, 8]);
  const numerators = bankShuffle(Array.from({ length: denominator - 1 }, (_, index) => index + 1), seed).slice(0, 4).sort((a, b) => a - b);
  const options = numerators.map((numerator) => `${numerator}/${denominator}`);
  const form = bankForm(template, 4);
  if (form === 0) return payload(`この中で いちばん大きい分数は？`, options[options.length - 1], options.slice(0, -1), { type: "fraction", numerator: numerators[numerators.length - 1], denominator }, `分母が同じなら、分子が大きいほど大きい分数です。`, { contract: "fraction-same-denominator-compare" });
  if (form === 1) return payload(`この中で いちばん小さい分数は？`, options[0], options.slice(1), { type: "fraction", numerator: numerators[0], denominator }, `分母が同じなら、分子が小さいほど小さい分数です。`, { contract: "fraction-smallest" });
  if (form === 2) {
    const relation = ["left", "right", "same"][Math.abs(Math.trunc(Number(seed) || 0)) % 3];
    const pairs = {
      left: [
        ["1/2", "1/3"], ["2/3", "1/2"], ["3/4", "2/3"], ["3/5", "1/2"]
      ],
      right: [
        ["1/3", "1/2"], ["1/2", "2/3"], ["2/3", "3/4"], ["1/2", "3/5"]
      ],
      same: [
        ["1/2", "2/4"], ["2/3", "4/6"], ["3/4", "6/8"], ["2/5", "4/10"]
      ]
    };
    const [left, right] = bankPick(seed, "fraction-compare-pair", pairs[relation]);
    const [leftNumerator, leftDenominator] = left.split("/").map(Number);
    const [rightNumerator, rightDenominator] = right.split("/").map(Number);
    const leftProduct = leftNumerator * rightDenominator;
    const rightProduct = rightNumerator * leftDenominator;
    if (relation === "same") {
      return payload(
        `${left}と${right}は同じ大きさ？`,
        "おなじ",
        ["左の方が大きい", "右の方が大きい", "どちらも1より大きい"],
        { type: "fraction", numerator: leftNumerator, denominator: leftDenominator, comparison: { left, right, relation } },
        `${leftNumerator}×${rightDenominator}と${rightNumerator}×${leftDenominator}がどちらも${leftProduct}なので、同じ大きさです。`,
        { contract: "fraction-different-denominator-compare" }
      );
    }
    const answer = relation === "left" ? left : right;
    const explanation = relation === "left"
      ? `${leftNumerator}×${rightDenominator}=${leftProduct}が、${rightNumerator}×${leftDenominator}=${rightProduct}より大きいので${left}です。`
      : `${rightNumerator}×${leftDenominator}=${rightProduct}が、${leftNumerator}×${rightDenominator}=${leftProduct}より大きいので${right}です。`;
    return payload(
      `${left}と${right}で大きいのは？`,
      answer,
      [relation === "left" ? right : left, "おなじ", "どちらも1より大きい"],
      { type: "fraction", numerator: leftNumerator, denominator: leftDenominator, comparison: { left, right, relation } },
      explanation,
      { contract: "fraction-different-denominator-compare" }
    );
  }
  const numerator = bankInt(seed, "num", 1, denominator - 1);
  const smaller = numerator > 1 ? `${numerator - 1}/${denominator}` : `3/${denominator}`;
  return payload(`${numerator}/${denominator}より 1/${denominator} 大きい分数は？`, `${numerator + 1}/${denominator}`, [smaller, `${numerator}/${denominator}`, `${numerator + 1}/${denominator + 1}`], { type: "fraction", numerator, denominator }, "同じ大きさの1つ分を足します。", { contract: "fraction-step" });
}

function makeCircleRadiusBank(unit, template, seed) {
  const radius = bankInt(seed, "radius", 2, 9);
  const form = bankForm(template, 5);
  if (form === 0) return payload(`半径が${radius}cmの円の直径は？`, radius * 2, [radius, radius + 2, radius * 3], { type: "geometry", kind: "circle", radius }, "直径は半径の2倍です。", { contract: "circle-diameter" });
  if (form === 1) return payload(`直径が${radius * 2}cmの円の半径は？`, radius, [radius * 2, radius + 2, Math.max(1, radius - 1)], { type: "geometry", kind: "circle", radius }, "半径は直径の半分です。", { contract: "circle-radius" });
  if (form === 2) return payload("円の中心から円周までの線を何という？", "半径", ["直径", "弦", "辺"], { type: "geometry", kind: "circle", radius }, "中心から円周までが半径です。", { contract: "circle-vocabulary" });
  if (form === 3) return payload("円の中心を通って、円周から円周まで結ぶ線は？", "直径", ["半径", "弧", "辺"], { type: "geometry", kind: "circle", radius }, "中心を通る長い線が直径です。", { contract: "circle-center-line" });
  return payload(`半径${radius}cmを2本つなぐと？`, `${radius * 2}cm`, [`${radius}cm`, `${radius + 1}cm`, `${radius * 3}cm`], { type: "geometry", kind: "circle", radius }, "半径2本分が直径です。", { contract: "circle-two-radii" });
}

function elapsedClockLabel(totalMinutes) {
  const safe = Math.max(0, Math.round(totalMinutes));
  const hours = Math.floor(safe / 60);
  const minutes = safe % 60;
  return `${hours}時${minutes ? `${minutes}分` : ""}`;
}

function makeElapsedTimeBank(unit, template, seed) {
  const startHour = bankInt(seed, "hour", 7, 16);
  const duration = bankPick(seed, "duration", [20, 30, 40, 50, 60, 75, 90]);
  const endMinutes = startHour * 60 + duration;
  const endHour = Math.floor(endMinutes / 60); const endMinute = endMinutes % 60;
  const endLabel = elapsedClockLabel(endMinutes);
  const form = bankForm(template, 4);
  if (form === 0) return payload(`${startHour}時から${endLabel}まで、何分？`, duration, [duration + 10, Math.max(10, duration - 10), endMinute], { type: "measure", duration, unit: "分", kind: "time" }, `始まりから終わりまで${duration}分です。`, { contract: "elapsed-duration" });
  if (form === 1) return payload(`${startHour}時から${duration}分後は？`, endLabel, [elapsedClockLabel(endMinutes - 10), elapsedClockLabel(endMinutes + 10), elapsedClockLabel(endMinutes + 30)], { type: "measure", duration, unit: "分", kind: "time" }, `${duration}分進めると${endLabel}です。`, { contract: "elapsed-end" });
  if (form === 2) return payload(`${endLabel}の${duration}分前は？`, `${startHour}時`, [endLabel, `${startHour - 1}時`, `${startHour}時10分`], { type: "measure", duration, unit: "分", kind: "time" }, "終わりから時間を戻します。", { contract: "elapsed-start" });
  const wrongMinute = duration % 60 === 50 ? 40 : duration % 60 + 10;
  return payload(`${duration}分は何時間何分？`, `${Math.floor(duration / 60)}時間${duration % 60}分`, [`${duration}時間0分`, `${Math.floor(duration / 60) + 1}時間${duration % 60}分`, `${Math.floor(duration / 60)}時間${wrongMinute}分`], { type: "measure", duration, unit: "分", kind: "time" }, "60分で1時間にします。", { contract: "elapsed-convert" });
}

function makeBarDataBank(unit, template, seed) {
  const values = bankDistinctValues(seed, "bar", 2, 15, 4);
  const labels = ["赤", "青", "黄", "緑"];
  const max = Math.max(...values); const min = Math.min(...values);
  const form = bankForm(template, 5);
  if (form === 0) return payload(`青の棒は何こ？`, values[1], [values[0], values[2], values[1] + 1], { type: "chart", labels, values }, "青の目盛りを読みます。", { contract: "bar-read" });
  if (form === 1) return payload(`いちばん多い色は？`, labels[values.indexOf(max)], labels.filter((label) => label !== labels[values.indexOf(max)]).slice(0, 3), { type: "chart", labels, values }, "一番高い棒を選びます。", { contract: "bar-most" });
  if (form === 2) return payload(`いちばん多い数と少ない数の差は？`, max - min, [max + min, min, max], { type: "chart", labels, values }, "高い棒から低い棒を引きます。", { contract: "bar-difference" });
  if (form === 3) return payload(`赤と黄を合わせると？`, values[0] + values[2], [values[0], values[2], Math.abs(values[0] - values[2])], { type: "chart", labels, values }, "2本の棒の数を足します。", { contract: "bar-total" });
  return payload(`緑に${bankInt(seed, "add", 1, 4)}こ足すと？`, values[3] + bankInt(seed, "add", 1, 4), [values[3], values[3] - 1, values[3] + 1], { type: "chart", labels, values }, "緑の数に増える分を足します。", { contract: "bar-change" });
}

function makeRoundingBank(unit, template, seed) {
  const value = bankInt(seed, "round", 1234, 9876);
  const place = bankForm(template, 2) === 0 ? 10 : 100;
  const placeName = place === 10 ? "十の位" : "百の位";
  const lookPlaceName = place === 10 ? "一の位" : "十の位";
  const roundingInstruction = `${placeName}までの概数にする（${lookPlaceName}を四捨五入）`;
  const rounded = Math.round(value / place) * place;
  const lower = Math.floor(value / place) * place;
  const upper = Math.ceil(value / place) * place;
  const form = bankForm(template, 5);
  if (form === 0) return payload(`${value}を${roundingInstruction}と？`, rounded, [rounded - place, rounded + place, value === rounded ? rounded + place * 2 : value], { type: "place", digits: String(value), focus: placeName, focusIndex: String(value).length - (place === 10 ? 2 : 3), value, roundingPlace: place, lookPlace: place / 10 }, `${lookPlaceName}を見て${rounded}にします。`, { contract: "rounding" });
  if (form === 1) return payload(`${value}を${placeName}までの概数にして切り捨てると？`, lower, [lower + place, lower + place * 2, lower - place], { type: "place", digits: String(value), focus: placeName, value, roundingPlace: place, lookPlace: place / 10 }, `${placeName}より下を0にします。`, { contract: "round-down" });
  if (form === 2) return payload(`${value}を${placeName}までの概数にして切り上げると？`, upper, [upper - place, upper + place, upper + place * 2], { type: "place", digits: String(value), focus: placeName, value, roundingPlace: place, lookPlace: place / 10 }, `${placeName}より下があれば上へ進めます。`, { contract: "round-up" });
  if (form === 3) return payload(`${value}を${roundingInstruction}とき、どちらのまとまりにする？`, rounded, [rounded - place, rounded + place, value === rounded ? rounded + place * 2 : value], { type: "place", digits: String(value), focus: placeName, value, roundingPlace: place, lookPlace: place / 10 }, `${lookPlaceName}が5以上なら上へ、4以下なら下へ進めます。`, { contract: "round-nearest" });
  return payload(`${value}を${roundingInstruction}とき、見る位は？`, lookPlaceName, [placeName, "千の位", "万の位"], { type: "place", digits: String(value), focus: placeName, value, roundingPlace: place, lookPlace: place / 10 }, "丸める位の1つ右を見ます。", { contract: "round-look-right" });
}

function makeLongDivisionBank(unit, template, seed) {
  const divisor = bankInt(seed, "div", 3, 9);
  const quotient = bankInt(seed, "quo", 12, 98);
  const remainder = bankInt(seed, "rem", 0, divisor - 1);
  const dividend = divisor * quotient + remainder;
  const answerText = remainder ? `${quotient} あまり ${remainder}` : quotient;
  const form = bankForm(template, 4);
  if (form === 0) return payload(`${dividend} ÷ ${divisor} は？`, answerText, [`${quotient + 1} あまり ${remainder}`, `${quotient} あまり ${Math.min(divisor, remainder + 1)}`, quotient + 1], { type: "calculation", left: dividend, right: divisor, operator: "÷" }, `${divisor}×${quotient}${remainder ? `+${remainder}` : ""}=${dividend}です。`, { contract: "long-division" });
  if (form === 1) return payload(`${dividend} ÷ ${divisor} の商は？`, quotient, [divisor, remainder, quotient + 1], { type: "calculation", left: dividend, right: divisor, operator: "÷" }, "何こ分できるかが商です。", { contract: "long-division-quotient" });
  if (form === 2) return payload(`${dividend} ÷ ${divisor} のあまりは？`, remainder, [divisor, quotient, remainder + 1], { type: "calculation", left: dividend, right: divisor, operator: "÷" }, "割り切れない分があまりです。", { contract: "long-division-remainder" });
  return payload(`商${quotient}、あまり${remainder}のとき、わられる数は？`, dividend, [divisor * quotient, dividend + remainder, quotient + remainder], { type: "calculation", left: divisor, right: quotient, operator: "×" }, "割る数×商+あまりで戻せます。", { contract: "long-division-inverse" });
}

function makeDecimalCalcBank(unit, template, seed) {
  const a = bankInt(seed, "a", 12, 89) / 10;
  const b = bankInt(seed, "b", 11, 49) / 10;
  const add = bankForm(template, 2) === 0;
  const left = add ? a : Math.max(a, b + 1);
  const right = add ? b : Math.min(b, left - 0.1);
  const answer = Number((add ? left + right : left - right).toFixed(1));
  const form = bankForm(template, 5);
  if (form === 0) return payload(`${left} ${add ? "+" : "−"} ${right} は？`, answer, [Number((answer + 0.1).toFixed(1)), Number(Math.max(0, answer - 0.1).toFixed(1)), Number((left + right).toFixed(1))], { type: "decimal", a: left, b: right, operation: add ? "+" : "−" }, "小数点をまっすぐそろえて計算します。", { contract: "decimal-addsub" });
  if (form === 1) return payload(`${left}に${right}を足すと、小数第1位は？`, Math.round(((left + right) % 1) * 10), [Math.floor(left + right), Math.round((left % 1) * 10), Math.round((right % 1) * 10)], { type: "decimal", a: left, b: right, operation: "+" }, "十分の一どうしを合わせます。", { contract: "decimal-place-align" });
  if (form === 2) return payload(`${answer}に${right}を足すと？`, Number((answer + right).toFixed(1)), [left, right, Number((answer - right).toFixed(1))], { type: "decimal", a: answer, b: right, operation: "+" }, "引き算を足し算で確かめます。", { contract: "decimal-inverse" });
  if (form === 3) return payload(`${left}と${right}を、まず整数部分だけ足すと？`, Math.floor(left) + Math.floor(right), [Math.round(left + right), Math.floor(left), Math.floor(right)], { type: "decimal", a: left, b: right, operation: "+" }, "見積もりの土台に整数部分を足します。", { contract: "decimal-estimate" });
  return payload(`${left} ${add ? "+" : "−"} ${right} の答えは${answer}。小数点はどこをそろえた？`, "小数点どうし", ["右端どうし", "左端どうし", "数字の大きさ"], { type: "decimal", a: left, b: right, operation: add ? "+" : "−" }, "小数の加減では小数点をそろえます。", { contract: "decimal-rule" });
}

function makeSameDenominatorBank(unit, template, seed) {
  const denominator = bankPick(seed, "den", [5, 6, 7, 8, 9]);
  const a = bankInt(seed, "a", 1, denominator - 2);
  const b = bankInt(seed, "b", 1, denominator - a - 1);
  const add = bankForm(template, 2) === 0;
  const numerator = add ? a + b : Math.max(a, b) - Math.min(a, b);
  const left = add ? a : Math.max(a, b); const right = add ? b : Math.min(a, b);
  const answer = `${numerator}/${denominator}`;
  const form = bankForm(template, 5);
  if (form === 0) {
    const distractors = numerator === 0
      ? [`1/${denominator}`, `2/${denominator + 1}`, `3/${denominator + 2}`]
      : (add
        ? [`${numerator - 1}/${denominator}`, `${numerator + 1}/${denominator}`, `${numerator + 2}/${denominator}`]
        : [`${numerator + 1}/${denominator}`, `${numerator + 2}/${denominator}`, `${numerator + 3}/${denominator}`]);
    return payload(`${left}/${denominator} ${add ? "+" : "−"} ${right}/${denominator} は？`, answer, distractors, { type: "fraction", numerator: left, denominator, operation: add ? "add" : "subtract" }, "分母はそのまま、分子を計算します。", { contract: "same-denominator-calc" });
  }
  if (form === 1) return payload(`${left}/${denominator}に ${right}/${denominator}を足すと、約分する前の分母は？`, denominator, [left + right, denominator + 1, left], { type: "fraction", numerator: left, denominator, operation: "add" }, "同じ分母どうしなら、約分する前の分母は変わりません。", { contract: "same-denominator-rule" });
  if (form === 2) {
    const inverseTotal = left + right;
    return payload(`${inverseTotal}/${denominator}から ${right}/${denominator}を引くと？`, `${left}/${denominator}`, ["1/11", "2/11", "3/11"], { type: "fraction", numerator: inverseTotal, denominator, operation: "subtract" }, "足し算を引き算で確かめます。", { contract: "same-denominator-inverse" });
  }
  if (form === 3) {
    const high = left === right ? Math.min(denominator - 1, left + 1) : Math.max(left, right);
    const low = left === right ? left : Math.min(left, right);
    return payload(`${high}/${denominator}と${low}/${denominator}で大きいのは？`, `${high}/${denominator}`, [`${low}/${denominator}`, "おなじ", `${high}/${denominator + 1}`], { type: "fraction", numerator: high, denominator }, "分母が同じなら分子が大きい方です。", { contract: "same-denominator-compare" });
  }
  const before = bankInt(seed, "step-before", 1, denominator - 2);
  const increase = bankInt(seed, "step-increase", 1, denominator - before - 1);
  const after = before + increase;
  return payload(`分子を${before}から${after}にすると、何こ分増えた？`, increase, [Math.max(0, increase - 1), increase + 1, increase + 2], { type: "fraction", numerator: before, denominator }, `分子は${increase}こ分増えました。`, { contract: "same-denominator-step" });
}

function makeAngleBank(unit, template, seed) {
  const angle = bankPick(seed, "angle", [30, 45, 60, 75, 90, 120, 135, 150]);
  const form = bankForm(template, 5);
  if (form === 0) return payload(`${angle}°は、直角よりどう？`, angle < 90 ? "小さい" : angle === 90 ? "同じ" : "大きい", [angle < 90 ? "大きい" : "小さい", "わからない", "直線"], { type: "geometry", kind: "angle", angle }, "直角は90°です。", { contract: "angle-compare-right" });
  if (form === 1) {
    const knownAngle = bankPick(seed, "complement-part", [30, 45, 60]);
    const answer = 90 - knownAngle;
    const distractors = knownAngle === answer
      ? [90, 30, 60]
      : [knownAngle, 90, knownAngle === 30 ? 45 : 60];
    return payload(
      `90°の直角を${knownAngle}°ともう一つに分けるよ。90°から${knownAngle}°を引くと？`,
      answer,
      distractors,
      { type: "geometry", kind: "angle", angle: 90, totalAngle: 90, knownAngle, unknownAngle: answer, relation: "complement" },
      `直角90°を${knownAngle}°と${answer}°に分けます。`,
      { contract: "angle-complement" }
    );
  }
  if (form === 2) return payload(`一直線の角180°から${angle}°を引くと？`, 180 - angle, [angle, 90, 180 + angle], { type: "geometry", kind: "angle", angle }, "一直線は180°です。", { contract: "angle-straight" });
  if (form === 3) return payload("直角の大きさは何度？", 90, [45, 180, 360], { type: "geometry", kind: "angle", angle: 90 }, "直角は90°です。", { contract: "angle-right" });
  const splitAngle = bankPick(seed, "split-angle", [60, 90, 120]);
  const part = splitAngle / 2;
  return payload(
    `${splitAngle}°の角を同じ大きさに2つに分けると、1つは何度？`,
    part,
    [splitAngle, part + 15, Math.max(15, part - 15)],
    { type: "geometry", kind: "angle", angle: splitAngle, totalAngle: splitAngle, knownAngle: part, unknownAngle: part, relation: "split", equalParts: true, parts: 2 },
    `${splitAngle}°を同じ大きさ2つに分けるので、${splitAngle}÷2=${part}°です。`,
    { contract: "angle-split" }
  );
}

function makeParallelBank(unit, template, seed) {
  const form = bankForm(template, 5);
  if (form === 0) return payload("どこまでものばしても交わらない2本の直線は？", "平行", ["垂直", "直角", "曲線"], { type: "geometry", kind: "parallel", relationship: "definition", sides: 4 }, "同じ間かくで交わらない直線が平行です。", { contract: "parallel-definition" });
  if (form === 1) return payload("90°で交わる2本の直線は？", "垂直", ["平行", "同じ線", "曲線"], { type: "geometry", kind: "angle", angle: 90 }, "直角で交わると垂直です。", { contract: "perpendicular-definition" });
  if (form === 2) return payload("平行な線どうしの間かくは？", "どこでも同じ", ["だんだん広がる", "だんだんせまくなる", "決まらない"], { type: "geometry", kind: "parallel", relationship: "distance", sides: 4 }, "平行なら間かくは変わりません。", { contract: "parallel-distance" });
  if (form === 3) return payload("平行か確かめるために、線をのばした先まで見るのはなぜ？", "交わるか確かめるため", ["色をそろえるため", "線を短くするため", "角を消すため"], { type: "geometry", kind: "parallel", relationship: "extend", sides: 4 }, "どこまでものばして交わるかを確かめます。", { contract: "parallel-check" });
  return payload("四角形の向かい合う辺が2組とも平行な形は？", "平行四辺形", ["三角形", "円", "台形だけ"], { type: "geometry", kind: "parallel", relationship: "parallelogram", sides: 4 }, "向かい合う辺が2組平行なのが平行四辺形です。", { contract: "parallel-parallelogram" });
}

function makeRectangleAreaBank(unit, template, seed) {
  const width = bankInt(seed, "width", 3, 12);
  const height = bankInt(seed, "height", 2, 9);
  const area = width * height;
  const perimeter = (width + height) * 2;
  const form = bankForm(template, 5);
  if (form === 0) return payload(`たて${height}cm、よこ${width}cmの長方形の面積は？`, area, [perimeter, width + height, area + width], { type: "area", width, height }, `面積は${width}×${height}=${area}です。`, { contract: "rectangle-area" });
  if (form === 1) return payload(`面積${area}cm²、よこ${width}cm。たては？`, height, [width, area, height + 1], { type: "area", width, height }, `${area}÷${width}=${height}です。`, { contract: "rectangle-area-missing-side" });
  if (form === 2) return payload(`たて${height}cm、よこ${width}cmの周りの長さは？`, perimeter, [area, width + height, perimeter + 2], { type: "area", width, height }, "周りは4辺を足します。", { contract: "rectangle-perimeter" });
  if (form === 3) return payload(`面積を出す式はどれ？`, `${width} × ${height}`, [`${width} + ${height}`, `${width + height} × 2`, `${width} × ${height} × 2`], { type: "area", width, height }, "たて×よこで面積です。", { contract: "rectangle-area-formula" });
  return payload(`よこを1cm長くすると、面積は何cm²増える？`, height, [width, area, perimeter], { type: "area", width, height }, `幅1cm分は、たて${height}cmの帯です。`, { contract: "rectangle-area-growth" });
}

function makeCuboidVolumeBank(unit, template, seed) {
  const width = bankInt(seed, "width", 2, 6);
  const depth = bankInt(seed, "depth", 2, 5);
  const height = bankInt(seed, "height", 2, 5);
  const base = width * depth; const volume = base * height;
  const volumeLab = { type: "area", width, height: depth, baseArea: base, layers: height, solid: "cuboid" };
  const form = bankForm(template, 5);
  if (form === 0) return payload(`たて${height}、よこ${width}、奥行き${depth}の直方体。体積は？`, volume, [base, width + depth + height, volume + base], volumeLab, `${width}×${depth}×${height}=${volume}です。`, { contract: "cuboid-volume" });
  if (form === 1) return payload(`底面に${base}この立方体を${height}だん積むと？`, volume, [base, height, base + height], volumeLab, `1だん${base}こが${height}だんです。`, { contract: "cuboid-layers" });
  if (form === 2) return payload(`体積${volume}、底面${base}。高さは？`, height, [base, volume, height + 1], volumeLab, `${volume}÷${base}=${height}です。`, { contract: "cuboid-missing-height" });
  if (form === 3) return payload("体積は、見えているブロックだけを数えればよい？", "いいえ", ["はい", "ときどき", "色だけ数える"], volumeLab, "見えない奥や下のブロックも数えます。", { contract: "cuboid-hidden-blocks" });
  return payload(`高さを1だん増やすと、何こ分増える？`, base, [height, volume, width + depth], volumeLab, `底面1だん分の${base}こが増えます。`, { contract: "cuboid-layer-growth" });
}

function makeLineDataBank(unit, template, seed) {
  const values = bankDistinctValues(seed, "line", 7, 20, 4);
  const labels = ["月", "火", "水", "木"];
  const form = bankForm(template, 5);
  if (form === 0) return payload(`水曜日の気温は？`, values[2], [values[1], values[3], values[2] + 1], { type: "chart", labels, values }, "水の点の高さを読みます。", { contract: "line-read" });
  if (form === 1) return payload(`月から火へ何度変わった？`, Math.abs(values[1] - values[0]), [values[1] + values[0], values[1], values[0]], { type: "chart", labels, values }, "2日の値の差を取ります。", { contract: "line-change" });
  if (form === 2) return payload(`いちばん高い気温は？`, Math.max(...values), [Math.min(...values), values[0] + values[1], Math.max(...values) + 1], { type: "chart", labels, values }, "一番高い点を読みます。", { contract: "line-maximum" });
  if (form === 3) {
    const direction = values[2] > values[1] ? "上がった" : values[2] < values[1] ? "下がった" : "同じ";
    return payload(`火曜から水曜は上がった？下がった？同じ？`, direction, ["上がった", "下がった", "同じ", "わからない"].filter((option) => option !== direction), { type: "chart", labels, values }, "線が上向きか下向きか、同じ高さかを見ます。", { contract: "line-direction" });
  }
  return payload(`木曜を${bankInt(seed, "add", 1, 3)}度上げると？`, values[3] + bankInt(seed, "add", 1, 3), [values[3], values[3] - 1, values[3] + 1], { type: "chart", labels, values }, "木曜の値に増える分を足します。", { contract: "line-predict" });
}

function makeFactorsBank(unit, template, seed) {
  const number = bankPick(seed, "number", [12, 18, 20, 24, 30, 36]);
  const divisors = Array.from({ length: number }, (_, index) => index + 1).filter((value) => number % value === 0);
  const factor = bankPick(seed, "factor", divisors.filter((value) => value > 1 && value < number));
  const nonFactor = [number - 1, number + 1, factor + 1, factor + 2].find((value) => value > 1 && number % value !== 0);
  const form = bankForm(template, 5);
  if (form === 0) return payload(`${number}の約数はどれ？`, factor, [nonFactor, number + 1, number - 1], { type: "calculation", left: number, right: factor, operator: "÷" }, `${number}を${factor}で割り切れます。`, { contract: "factor-divisor" });
  if (form === 1) return payload(`${factor}の${number / factor}倍は？`, number, [factor, number / factor, number + factor], { type: "calculation", left: factor, right: number / factor, operator: "×" }, `${factor}×${number / factor}=${number}です。`, { contract: "factor-multiple" });
  if (form === 2) return payload(`${number}を割り切れる組は？`, `${factor} × ${number / factor}`, [`${factor} + ${number / factor}`, `${nonFactor} × ${Math.max(1, Math.floor(number / nonFactor))}`, `${factor + 1} × ${number / factor}`], { type: "calculation", left: number, right: factor, operator: "÷" }, "かけて元の数になる組を探します。", { contract: "factor-pair" });
  if (form === 3) return payload(`${number}の約数は${factor}と${number / factor}。ほかに必ずある約数は？`, 1, [0, number - 1, number + 1], { type: "calculation", left: number, right: 1, operator: "÷" }, "どの整数も1と自分自身で割り切れます。", { contract: "factor-one" });
  const asksFactor = bankInt(seed, "factor-direction", 0, 1) === 0;
  const candidate = asksFactor ? factor : nonFactor;
  const answer = number % candidate === 0 ? "はい" : "いいえ";
  return payload(`${number}は${candidate}の倍数？`, answer, ["はい", "いいえ", "ときどき", "わからない"].filter((option) => option !== answer), { type: "calculation", left: number, right: candidate, operator: "÷" }, answer === "はい" ? `${number}は${candidate}で割り切れます。` : `${number}は${candidate}で割り切れません。`, { contract: "factor-direction" });
}

function makeDecimalMulDivBank(unit, template, seed) {
  const tenths = bankInt(seed, "tenths", 12, 49) / 10;
  const factor = bankPick(seed, "factor", [2, 3, 4, 5]);
  const product = Number((tenths * factor).toFixed(1));
  const form = bankForm(template, 5);
  if (form === 0) return payload(`${tenths} × ${factor} は？`, product, [tenths + factor, Number((product + 0.1).toFixed(1)), Number(Math.max(0, product - 0.1).toFixed(1))], { type: "decimal", a: tenths, b: factor, operation: "×" }, `${tenths}を${factor}回分にします。`, { contract: "decimal-multiply" });
  if (form === 1) return payload(`${product} ÷ ${factor} は？`, tenths, [product, factor, Number((tenths + 0.1).toFixed(1))], { type: "decimal", a: product, b: factor, operation: "÷" }, "掛け算の逆で確かめます。", { contract: "decimal-divide" });
  if (form === 2) return payload(`${tenths}を10倍すると？`, tenths * 10, [tenths, tenths / 10, tenths + 10], { type: "decimal", a: tenths, b: 10, operation: "×" }, "10倍で小数点は右へ1けた分動きます。", { contract: "decimal-times-ten" });
  if (form === 3) return payload(`${tenths}を10で割ると？`, tenths / 10, [tenths, tenths * 10, tenths - 1], { type: "decimal", a: tenths, b: 10, operation: "÷" }, "10で割ると小数点は左へ1けた分動きます。", { contract: "decimal-divide-ten" });
  return payload(`${tenths} × ${factor}の答えの小数点は、なぜ必要？`, "十分の一の大きさを残すため", ["数字を大きく見せるため", "いつも右端に置くため", "消してよい"], { type: "decimal", a: tenths, b: factor, operation: "×" }, "小数点は量の大きさを表します。", { contract: "decimal-point-meaning" });
}

function makeCommonDenominatorBank(unit, template, seed) {
  const pairs = [[1, 2, 1, 3], [1, 3, 1, 4], [2, 3, 1, 6], [1, 4, 1, 6], [2, 5, 1, 2]];
  const [a, ad, b, bd] = bankPick(seed, "pair", pairs);
  const lcm = ad * bd / gcd(ad, bd);
  const an = a * (lcm / ad); const bn = b * (lcm / bd);
  const sum = fractionText(an + bn, lcm);
  const form = bankForm(template, 5);
  if (form === 0) return payload(`${a}/${ad} + ${b}/${bd} は？`, sum, [fractionText(a + b, ad + bd), fractionText(an + bn, lcm + 1), fractionText(Math.max(1, an + bn - 1), lcm)], { type: "fraction", numerator: an, denominator: lcm, operation: "add" }, `分母を${lcm}にそろえて${an}/${lcm}+${bn}/${lcm}です。`, { contract: "common-denominator-add" });
  if (form === 1) return payload(`${a}/${ad}を分母${lcm}にそろえると？`, `${an}/${lcm}`, [`${a}/${lcm}`, `${an + 1}/${lcm}`, `${an}/${lcm + 1}`], { type: "fraction", numerator: a, denominator: ad }, `分子・分母を同じ数で掛けます。`, { contract: "common-denominator-convert" });
  if (form === 2) return payload(`${a}/${ad}と${b}/${bd}で大きいのは？`, an > bn ? `${a}/${ad}` : `${b}/${bd}`, [an > bn ? `${b}/${bd}` : `${a}/${ad}`, "おなじ", `${Math.max(a, b)}/${lcm}`], { type: "fraction", numerator: Math.max(an, bn), denominator: lcm }, "同じ分母にして分子を比べます。", { contract: "common-denominator-compare" });
  if (form === 3) return payload(`分母をそろえるとき、分子と分母にすることは？`, "同じ数を掛ける", ["分子だけ足す", "分母だけ引く", "別々の数を掛ける"], { type: "fraction", numerator: an, denominator: lcm }, "分数の大きさを変えないため、上下に同じ数を掛けます。", { contract: "common-denominator-rule" });
  return payload(`${sum}から${b}/${bd}を引くと？`, `${a}/${ad}`, [sum, `${b}/${bd}`, fractionText(Math.max(1, an - bn), lcm)], { type: "fraction", numerator: an + bn, denominator: lcm, operation: "subtract" }, "足し算を引き算で確かめます。", { contract: "common-denominator-inverse" });
}

function makeUnitRateBank(unit, template, seed) {
  const units = bankInt(seed, "units", 2, 8);
  const rate = bankInt(seed, "rate", 3, 18);
  const total = units * rate;
  const form = bankForm(template, 5);
  if (form === 0) return payload(`${units}こで${total}円。1こあたり何円？`, rate, [total, units, rate + 1], { type: "ratio", left: units, right: total }, `${total}÷${units}=${rate}円です。`, { contract: "unit-rate" });
  if (form === 1) return payload(`1こ${rate}円の品物を${units}こ買うと？`, total, [rate + units, rate, units], { type: "ratio", left: rate, right: units }, `${rate}×${units}=${total}円です。`, { contract: "unit-rate-total" });
  if (form === 2) {
    const aRate = rate;
    const direction = bankInt(seed, "compare-direction", 0, 2);
    const bRate = direction === 0 ? aRate : direction === 1 ? aRate + 1 : Math.max(1, aRate - 1);
    const answer = aRate === bRate ? "おなじ" : aRate < bRate ? "A" : "B";
    return payload(`Aは2こで${aRate * 2}円、Bは3こで${bRate * 3}円。1こあたり安いのは？`, answer, ["A", "B", "おなじ", "わからない"].filter((option) => option !== answer), { type: "ratio", left: aRate, right: bRate, labels: ["A 1こ", "B 1こ"], comparisons: [{ id: "A", count: 2, total: aRate * 2, rate: aRate }, { id: "B", count: 3, total: bRate * 3, rate: bRate }] }, `Aは1こ${aRate}円、Bは1こ${bRate}円です。`, { contract: "unit-rate-compare" });
  }
  if (form === 3) return payload(`${total}円を${units}人で同じに分けると1人？`, rate, [total, units, rate + units], { type: "ratio", left: total, right: units }, "全体を人数で割ります。", { contract: "unit-rate-share" });
  return payload(`1こあたりを比べるには、何をそろえる？`, "1こ分", ["合計だけ", "人数だけ", "色だけ"], { type: "ratio", left: units, right: total }, "どちらも1こ分にそろえます。", { contract: "unit-rate-method" });
}

function makePercentBank(unit, template, seed) {
  const base = bankPick(seed, "base", [40, 60, 80, 100, 120, 200]);
  const percent = bankPick(seed, "percent", [10, 20, 25, 50, 75]);
  const part = base * percent / 100;
  const form = bankForm(template, 5);
  if (form === 0) return payload(`${base}この${percent}%は何こ？`, part, [base - part, percent, base * 2], { type: "ratio", left: percent, right: 100 }, `${base}を100%として${percent}%を取ります。`, { contract: "percent-part" });
  if (form === 1) {
    const complement = percent === 50 ? 25 : 100 - percent;
    return payload(`${part}こは${base}この何%？`, `${percent}%`, [`${complement}%`, `${Math.min(99, percent + 10)}%`, `${Math.max(1, percent - 10)}%`], { type: "ratio", left: part, right: base }, `${part}÷${base}=${percent / 100}です。`, { contract: "percent-rate" });
  }
  if (form === 2) return payload(`${base}円の${percent}%引き。引く金額は？`, part, [base - part, percent, base + part], { type: "money", paid: base, price: part }, "割引分は元の値段に割合を掛けます。", { contract: "percent-discount" });
  if (form === 3) return payload(`全体を100%とすると、半分は何%？`, "50%", ["25%", "10%", "200%"], { type: "ratio", left: 1, right: 2 }, "半分は100%の半分、50%です。", { contract: "percent-half" });
  return payload(`${percent}%を小数で表すと？`, percent / 100, [percent, percent / 10, 1 - percent / 100], { type: "ratio", left: percent, right: 100 }, "100で割ると小数になります。", { contract: "percent-decimal" });
}

function makeShapeAreaBank(unit, template, seed) {
  const base = bankInt(seed, "base", 4, 14);
  const height = bankInt(seed, "height", 3, 10);
  const triangle = bankForm(template, 2) === 0;
  const area = triangle ? base * height / 2 : base * height;
  const name = triangle ? "三角形" : "平行四辺形";
  const form = bankForm(template, 5);
  const shapeLab = (shape) => ({ type: "area", width: base, height, shape });
  if (form === 0) return payload(`底辺${base}cm、高さ${height}cmの${name}の面積は？`, area, [base + height, base * height, area + base], shapeLab(triangle ? "triangle" : "parallelogram"), `${name}の面積は${triangle ? "底辺×高さ÷2" : "底辺×高さ"}です。`, { contract: triangle ? "triangle-area" : "parallelogram-area" });
  if (form === 1) return payload(`${name}で、面積を出すのに必要な高さは？`, "底辺に垂直な長さ", ["ななめの辺", "周りの長さ", "色"], { type: "geometry", kind: "angle", angle: 90 }, "高さは底辺に垂直な長さです。", { contract: "shape-area-height" });
  if (form === 2) return payload(`面積${area}cm²、底辺${base}cmの${name}。高さは？`, triangle ? height : height, [base, area, height + 1], shapeLab(triangle ? "triangle" : "parallelogram"), `${triangle ? `${area}×2÷${base}` : `${area}÷${base}`}で高さを出します。`, { contract: "shape-area-missing-height" });
  if (form === 3) return payload(`同じ底辺と高さの長方形と三角形。三角形の面積は？`, "半分", ["同じ", "2倍", "わからない"], shapeLab("triangle"), "三角形は長方形の半分です。", { contract: "triangle-half-rectangle" });
  return payload(`${name}の底辺を2倍にし、高さが同じなら面積は？`, "2倍", ["半分", "同じ", "4倍"], shapeLab(triangle ? "triangle" : "parallelogram"), "底辺が2倍なら面積も2倍です。", { contract: "shape-area-scale-base" });
}

function makeCircumferenceBank(unit, template, seed) {
  const diameter = bankPick(seed, "diameter", [2, 3, 4, 5, 6, 8, 10]);
  const circumference = Number((diameter * 3.14).toFixed(2));
  const form = bankForm(template, 5);
  if (form === 0) return payload(`直径${diameter}cmの円周は？（円周率3.14）`, circumference, [diameter * 3.14 / 2, diameter + 3.14, diameter * 2], { type: "geometry", kind: "circle", radius: diameter / 2 }, `円周は直径×3.14で${circumference}cmです。`, { contract: "circumference" });
  if (form === 1) return payload(`円周が${circumference}cm。直径は？（円周率3.14）`, diameter, [diameter / 2, diameter * 2, 3.14], { type: "geometry", kind: "circle", radius: diameter / 2 }, `${circumference}÷3.14=${diameter}cmです。`, { contract: "circumference-diameter" });
  if (form === 2) return payload("円周を出すときに掛けるのは？", "円周率", ["半径だけ", "面積", "角度"], { type: "geometry", kind: "circle", radius: diameter / 2 }, "円周は直径×円周率です。", { contract: "circumference-pi" });
  if (form === 3) return payload(`半径${diameter / 2}cmなら、直径は？`, diameter, [diameter / 2, diameter + 2, diameter * 3], { type: "geometry", kind: "circle", radius: diameter / 2 }, "直径は半径の2倍です。", { contract: "circumference-radius" });
  return payload(`直径を2倍にすると、円周は？`, "2倍", ["半分", "同じ", "4倍"], { type: "geometry", kind: "circle", radius: diameter / 2 }, "円周は直径に比例するので2倍です。", { contract: "circumference-proportional" });
}

function makeCongruenceBank(unit, template, seed) {
  const mappings = [
    { left: "△ABC", right: "△DEF", answer: "DE", wrong: ["EF", "FD", "DF"] },
    { left: "△PQR", right: "△XYZ", answer: "XY", wrong: ["YZ", "ZX", "XZ"] },
    { left: "△LMN", right: "△RST", answer: "RS", wrong: ["ST", "TR", "RT"] }
  ];
  const map = bankPick(seed, "map", mappings);
  const form = bankForm(template, 5);
  if (form === 0) return payload(`${map.left}≡${map.right}で、最初の辺に対応する辺は？`, map.answer, map.wrong, { type: "proof", cards: [map.left, "対応", map.right] }, "合同の記号の順に、頂点を対応させます。", { contract: "congruence-correspondence" });
  if (form === 1) return payload("合同な図形で必ず同じなのは？", "対応する辺と角", ["面積だけ", "向きだけ", "色だけ"], { type: "proof", cards: ["辺", "角", "合同"] }, "対応する辺と角がそれぞれ等しくなります。", { contract: "congruence-properties" });
  if (form === 2) return payload("向きが反対でも、辺と角がすべて対応すれば合同？", "はい", ["いいえ", "ときどき", "大きさが同じなら不要"], { type: "proof", cards: ["回す", "重ねる", "合同"] }, "回したり裏返したりして重ねられれば合同です。", { contract: "congruence-orientation" });
  if (form === 3) return payload("合同を確かめるとき、先にそろえるのは？", "対応する頂点の順", ["色", "紙の向きだけ", "一番長い辺だけ"], { type: "proof", cards: ["頂点", "対応", "順番"] }, "頂点の順をそろえると、辺と角の対応も決まります。", { contract: "congruence-order" });
  return payload(`${map.left}≡${map.right}なら、対応する辺の長さは？`, "等しい", ["必ず2倍", "必ず半分", "わからない"], { type: "proof", cards: ["合同", "対応する辺", "等しい"] }, "合同なら対応する辺の長さは等しいです。", { contract: "congruence-equality" });
}

function makeAverageBank(unit, template, seed) {
  const values = [bankInt(seed, "a", 4, 12), bankInt(seed, "b", 5, 14), bankInt(seed, "c", 6, 15), bankInt(seed, "d", 3, 13)];
  const total = values.reduce((sum, value) => sum + value, 0);
  const average = total / values.length;
  const form = bankForm(template, 5);
  if (form === 0) return payload(`${values.join("、")}の平均は？`, average, [total, Math.max(...values), Math.min(...values)], { type: "chart", labels: ["A", "B", "C", "D"], values }, `合計${total}を${values.length}人で等しく分けます。`, { contract: "average" });
  if (form === 1) return payload(`平均${average}が${values.length}人分。合計は？`, total, [average, values.length, total - average], { type: "chart", labels: ["A", "B", "C", "D"], values }, `${average}×${values.length}=${total}です。`, { contract: "average-total" });
  if (form === 2) return payload(`合計${total}で${values.length}人。平均は？`, average, [total, total - values.length, Math.max(...values)], { type: "chart", labels: ["A", "B", "C", "D"], values }, "合計を人数で割ります。", { contract: "average-divide" });
  if (form === 3) return payload("平均は、最大と最小の真ん中の数？", "いいえ", ["はい", "いつでも", "人数が2人なら"], { type: "chart", labels: ["A", "B", "C", "D"], values }, "全部をならして1人分にします。", { contract: "average-misconception" });
  return payload(`平均${average}にするには、合計を何で割る？`, values.length, [average, total, Math.max(...values)], { type: "chart", labels: ["A", "B", "C", "D"], values }, "人数で割ります。", { contract: "average-count" });
}

function makeFractionMulDivBank(unit, template, seed) {
  const pairs = [[1, 2, 2, 3], [2, 3, 3, 4], [3, 5, 2, 3], [1, 4, 4, 5], [2, 5, 3, 4]];
  const [a, ad, b, bd] = bankPick(seed, "pair", pairs);
  const multiply = bankForm(template, 2) === 0;
  const answer = multiply ? fractionText(a * b, ad * bd) : fractionText(a * bd, ad * b);
  const form = bankForm(template, 5);
  if (form === 0) return payload(`${a}/${ad} ${multiply ? "×" : "÷"} ${b}/${bd} は？`, answer, [fractionText(a + b, ad + bd), fractionText(a * b, ad + bd), fractionText(a * bd, ad * bd)], { type: "fraction", numerator: a, denominator: ad, operation: multiply ? "multiply" : "divide" }, multiply ? "分子どうし、分母どうしを掛けます。" : "割る分数をひっくり返して掛けます。", { contract: multiply ? "fraction-multiply" : "fraction-divide" });
  if (form === 1) return payload(`${a}/${ad}を${b}/${bd}で割るとき、割る分数はどうする？`, "逆数にする", ["そのまま足す", "分母だけ変える", "0にする"], { type: "fraction", numerator: a, denominator: ad }, "割り算は逆数を掛け算にします。", { contract: "fraction-divide-reciprocal" });
  if (form === 2) return payload(`${a}/${ad} × ${b}/${bd}。約分する前の、答えの分子は？`, a * b, [ad * bd, a + b, ad + bd], { type: "fraction", numerator: a, denominator: ad, operation: "multiply" }, "約分する前の分子は、もとの分子どうしの掛け算です。", { contract: "fraction-multiply-numerator" });
  if (form === 3) return payload(`1/${ad}を${b}倍すると？`, `${b}/${ad}`, ["1/11", "2/11", "3/11"], { type: "fraction", numerator: 1, denominator: ad }, `分子を${b}倍します。`, { contract: "fraction-scale" });
  const given = bankPick(seed, "fraction-size", [answer, "1/1", fractionText(Number(answer.split("/")[1]), Number(answer.split("/")[0]))]);
  const [givenNumerator, givenDenominator] = given.split("/").map(Number);
  const relation = givenNumerator < givenDenominator ? "小さい" : givenNumerator > givenDenominator ? "大きい" : "同じ";
  return payload(`${given}を1と比べると？`, relation, ["小さい", "同じ", "大きい", "わからない"].filter((value) => value !== relation), { type: "fraction", numerator: givenNumerator, denominator: givenDenominator }, "分子が分母より小さいと1より小さく、同じなら1、大きいと1より大きくなります。", { contract: "fraction-result-size" });
}

function makeRatioBank(unit, template, seed) {
  const left = bankInt(seed, "left", 1, 6);
  let right = bankInt(seed, "right", 2, 8);
  if (right === left) right = right === 8 ? 7 : right + 1;
  const multiplier = bankPick(seed, "multiple", [2, 3, 4]);
  const divisor = gcd(left, right);
  const simpleLeft = left / divisor;
  const simpleRight = right / divisor;
  const equivalentLeft = left * multiplier;
  const equivalentRight = right * multiplier;
  const form = bankForm(template, 5);
  if (form === 0) {
    const answer = `${equivalentLeft}:${equivalentRight}`;
    const distractors = [];
    const addDistinctRatio = (a, b) => {
      const candidate = `${a}:${b}`;
      if (canonicalAnswerKey(candidate) !== canonicalAnswerKey(answer) && !distractors.some((value) => canonicalAnswerKey(value) === canonicalAnswerKey(candidate))) distractors.push(candidate);
    };
    addDistinctRatio(equivalentLeft, right * (multiplier + 1));
    addDistinctRatio(equivalentRight, equivalentLeft);
    addDistinctRatio(left + multiplier, right + multiplier);
    for (let shift = 1; distractors.length < 3 && shift < 12; shift += 1) addDistinctRatio(left * multiplier + shift, right * multiplier);
    return payload(`${left}:${right}と同じ比は？`, answer, distractors, { type: "ratio", left, right }, "両方に同じ数を掛けると同じ比です。", { contract: "ratio-equivalent" });
  }
  if (form === 1) return payload(`${equivalentLeft}:${equivalentRight}をいちばん簡単にすると？`, `${simpleLeft}:${simpleRight}`, [`${equivalentLeft}:${right}`, `${left}:${equivalentRight}`, "11:13"], { type: "ratio", left: equivalentLeft, right: equivalentRight }, "両方を共通の数で割り、これ以上割れない形にします。", { contract: "ratio-simplify" });
  if (form === 2) return payload(`赤${left}、青${right}の比を、いちばん簡単な「赤:青」で表すと？`, `${simpleLeft}:${simpleRight}`, [`${simpleRight}:${simpleLeft}`, `${simpleLeft + simpleRight}:1`, "11:13"], { type: "ratio", left, right }, "順番を赤:青にそろえ、共通の数で割ります。", { contract: "ratio-order" });
  if (form === 3) return payload(`${left}:${right}で、赤を${multiplier}倍にしたら青は？`, right * multiplier, [left * multiplier, right + multiplier, right], { type: "ratio", left, right }, `同じ比を保つため青も同じ${multiplier}倍です。`, { contract: "ratio-scale" });
  return payload("比が同じか確かめるには？", "両方を同じ数で倍や割りする", ["片方だけ増やす", "差だけ同じにする", "色をそろえる"], { type: "ratio", left, right }, "対応する2つを同じ倍率にします。", { contract: "ratio-method" });
}

function makeProportionBank(unit, template, seed) {
  const rate = bankInt(seed, "rate", 2, 9);
  const x = bankInt(seed, "x", 2, 8);
  const y = rate * x;
  const form = bankForm(template, 5);
  if (form === 0) return payload(`y=${rate}×x。x=${x}のときyは？`, y, [rate + x, rate * (x + 1), x], { type: "ratio", left: x, right: y }, `${rate}×${x}=${y}です。`, { contract: "proportion-value" });
  if (form === 1) return payload(`xが${x}から${x * 2}へ2倍。y=${y}は？`, y * 2, [y, y + 2, y / 2], { type: "ratio", left: x, right: y }, "比例ではxが2倍ならyも2倍です。", { contract: "proportion-double" });
  if (form === 2) return payload(`x:${x}、y:${y}のとき、1あたりのyは？`, rate, [x, y, rate + 1], { type: "ratio", left: x, right: y }, `${y}÷${x}=${rate}です。`, { contract: "proportion-rate" });
  if (form === 3) return payload("比例している表のきまりは？", "xが何倍でもyも同じ倍", ["いつも同じ数を足す", "yだけ変わる", "xが0ならyは必ず1"], { type: "ratio", left: x, right: y }, "倍率がそろうのが比例です。", { contract: "proportion-rule" });
  return payload(`y=${rate}×xでy=${y}。xは？`, x, [rate, y, x + 1], { type: "ratio", left: x, right: y }, `${y}÷${rate}=${x}です。`, { contract: "proportion-reverse" });
}

function makeFormulaBank(unit, template, seed) {
  const a = bankInt(seed, "a", 2, 9);
  const b = bankInt(seed, "b", 3, 12);
  const form = bankForm(template, 5);
  if (form === 0) return payload(`a=${a}、b=${b}。a+bは？`, a + b, [a * b, b - a, a], { type: "algebra", expression: "a + b", balance: true }, "aとbに数を入れて足します。", { contract: "formula-substitute-add" });
  if (form === 1) return payload(`a=${a}、b=${b}。2a+bは？`, a * 2 + b, [a + b, a * b, a * 2], { type: "algebra", expression: "2a + b", balance: true }, "2aはaを2回足すことです。", { contract: "formula-coefficient" });
  if (form === 2) return payload(`1このねだんがa円の品物をbこ。代金を表す式は？`, "a × b", ["a + b", "a − b", "a ÷ b"], { type: "algebra", expression: "a × b", balance: true }, "1こ分のねだんaに個数bを掛けます。", { contract: "formula-expression" });
  if (form === 3) return payload(`y=3aでa=${a}。yは？`, a * 3, [a + 3, a, a * 2], { type: "algebra", expression: "y = 3a", balance: true }, "aを3倍します。", { contract: "formula-substitute-multiply" });
  return payload("文字aは、計算から外してよい特別な記号？", "いいえ", ["はい", "数字より小さい", "0だけ"], { type: "algebra", expression: "a + b", balance: true }, "文字は数の代わりなので計算します。", { contract: "formula-letter-meaning" });
}

function makeSymmetryBank(unit, template, seed) {
  const form = bankForm(template, 5);
  if (form === 0) return payload("正方形の線対称の軸は何本？", 4, [1, 2, 8], { type: "geometry", sides: 4 }, "たて・よこと2本の対角線、合わせて4本です。", { contract: "symmetry-square-axes" });
  if (form === 1) return payload("正三角形の線対称の軸は何本？", 3, [1, 2, 6], { type: "geometry", sides: 3 }, "各頂点から向かいの辺の真ん中へ3本あります。", { contract: "symmetry-triangle-axes" });
  if (form === 2) return payload("点対称な図形は、中心のまわりに何度回すと重なる？", "180°", ["90°", "45°", "360°だけ"], { type: "geometry", kind: "angle", angle: 180 }, "点対称は半回転、180°で重なります。", { contract: "symmetry-point-rotate" });
  if (form === 3) return payload("線対称で対応する点は、軸からどうなっている？", "同じ距離", ["同じ色だけ", "片方が2倍遠い", "決まらない"], { type: "geometry", sides: 4 }, "軸からの垂直な距離が同じです。", { contract: "symmetry-axis-distance" });
  return payload("長方形は点対称？", "はい", ["いいえ", "正方形だけ", "円だけ"], { type: "geometry", sides: 4 }, "長方形は中心のまわりに180°回すと重なります。", { contract: "symmetry-rectangle-point" });
}

function makeScaleBank(unit, template, seed) {
  const scale = bankPick(seed, "scale", [100, 200, 500, 1000]);
  const mapLength = bankInt(seed, "length", 2, 8);
  const actual = mapLength * scale;
  const form = bankForm(template, 5);
  if (form === 0) return payload(`縮尺1:${scale}の地図で${mapLength}cm。実際は何cm？`, actual, [mapLength, scale, actual + scale], { type: "proof", cards: ["地図", `1:${scale}`, "実際"] }, `地図の長さを${scale}倍します。`, { contract: "scale-actual" });
  if (form === 1) return payload(`実際${actual}cmを縮尺1:${scale}で描くと何cm？`, mapLength, [actual, scale, mapLength + 1], { type: "proof", cards: ["実際", `÷${scale}`, "地図"] }, `${actual}÷${scale}=${mapLength}です。`, { contract: "scale-map" });
  if (form === 2) return payload("縮図で、たてとよこの倍率は？", "同じ", ["別々", "たてだけ2倍", "よこだけ半分"], { type: "proof", cards: ["たて", "よこ", "同じ倍率"] }, "対応する長さはすべて同じ倍率です。", { contract: "scale-consistent" });
  if (form === 3) return payload(`縮尺1:${scale}は、地図1cmが実際何cm？`, scale, [1, scale / 2, scale * 2], { type: "proof", cards: ["1cm", "→", `${scale}cm`] }, "比の後ろが実際の長さです。", { contract: "scale-read" });
  return payload(`地図を2倍に拡大したら、実際との比1:${scale}は？`, `1:${scale / 2}`, [`1:${scale}`, `1:${scale * 2}`, `3:${scale * 2}`], { type: "proof", cards: ["地図2倍", "比", `1:${scale / 2}`] }, "地図が2倍なら比の実際側は半分になります。", { contract: "scale-enlarge" });
}

function makePrismBank(unit, template, seed) {
  const baseArea = bankInt(seed, "base", 6, 30);
  const height = bankInt(seed, "height", 2, 10);
  const volume = baseArea * height;
  const prismLab = { type: "area", baseArea, layers: height, solid: "prism" };
  const form = bankForm(template, 5);
  if (form === 0) return payload(`底面積${baseArea}cm²、高さ${height}cmの角柱の体積は？`, volume, [baseArea + height, baseArea * 2, volume + baseArea], prismLab, `底面積×高さ=${baseArea}×${height}=${volume}です。`, { contract: "prism-volume" });
  if (form === 1) return payload(`体積${volume}cm³、底面積${baseArea}cm²。高さは？`, height, [baseArea, volume, height + 1], prismLab, `${volume}÷${baseArea}=${height}です。`, { contract: "prism-missing-height" });
  if (form === 2) return payload("角柱の体積を出すときに使う面積は？", "底面積", ["表面積", "側面積だけ", "見える面だけ"], prismLab, "同じ底面が高さ分だけ積み重なります。", { contract: "prism-base-area" });
  if (form === 3) return payload(`高さを2倍にすると体積は？`, "2倍", ["半分", "同じ", "4倍"], prismLab, "底面が同じなら高さに比例します。", { contract: "prism-height-scale" });
  return payload(`底面積${baseArea}cm²を${height}だん重ねると？`, volume, [baseArea, height, baseArea + height], prismLab, `${baseArea}が${height}だんで${volume}です。`, { contract: "prism-layers" });
}

function makeProbabilityBank(unit, template, seed) {
  const total = bankPick(seed, "total", [6, 8, 10, 12]);
  const favorable = bankInt(seed, "fav", 1, total - 1);
  const answer = fractionText(favorable, total);
  const form = bankForm(template, 5);
  if (form === 0) {
    const complement = total - favorable === favorable ? "1/11" : fractionText(total - favorable, total);
    return payload(`${total}このカプセル中、青が${favorable}こ。青が出る確率は？`, answer, [complement, fractionText(favorable, total - 1), fractionText(Math.max(0, favorable - 1), total)], { type: "ratio", left: favorable, right: total, labels: ["青", "ぜんぶ"], kind: "probability" }, "起こる場合を全体の場合で割ります。", { contract: "probability-favorable-over-total" });
  }
  if (form === 1) {
    const red = favorable;
    const blue = total - favorable;
    const likely = red === blue ? "おなじ" : red > blue ? "赤" : "青";
    const explanation = red === blue ? "入っている数が同じなら、出やすさも同じです。" : "入っている数が多い方が出やすいです。";
    return payload(`赤${red}こ、青${blue}こ。多く出そうなのは？`, likely, ["赤", "青", "おなじ", "好きな色"].filter((option) => option !== likely), { type: "ratio", left: red, right: blue, labels: ["赤", "青"], kind: "probability" }, explanation, { contract: "probability-compare" });
  }
  if (form === 2) return payload("同じ数ずつ入った2色のカプセル。どちらが出やすい？", "おなじ", ["赤", "青", "好きな色"], { type: "ratio", left: total / 2, right: total / 2, labels: ["赤", "青"], kind: "probability" }, "同じ数なら起こりやすさも同じです。", { contract: "probability-equal" });
  if (form === 3) return payload(`全体${total}こで、青が出ない場合は何こ？`, total - favorable, [favorable, total, total + favorable], { type: "ratio", left: favorable, right: total, labels: ["青", "ぜんぶ"], kind: "probability" }, "全体から青を引きます。", { contract: "probability-complement" });
  return payload("確率を考えるとき、色の好き嫌いは関係ある？", "いいえ", ["はい", "赤だけ", "青だけ"], { type: "ratio", left: favorable, right: total, labels: ["青", "ぜんぶ"], kind: "probability" }, "入っている数で考えます。", { contract: "probability-fairness" });
}

function makeRepresentativeDataBank(unit, template, seed) {
  const values = [bankInt(seed, "a", 3, 9), bankInt(seed, "b", 5, 12), bankInt(seed, "c", 7, 15), bankInt(seed, "d", 4, 11), bankInt(seed, "e", 6, 14)].sort((a, b) => a - b);
  const total = values.reduce((sum, value) => sum + value, 0);
  const average = total / values.length;
  const median = values[Math.floor(values.length / 2)];
  const range = values[values.length - 1] - values[0];
  const form = bankForm(template, 5);
  if (form === 0) return payload(`${values.join("、")}の中央値は？`, median, [average, values[0], values[values.length - 1]], { type: "chart", labels: ["1", "2", "3", "4", "5"], values }, "小さい順に並べた真ん中を選びます。", { contract: "data-median" });
  if (form === 1) return payload(`${values.join("、")}の範囲は？`, range, [average, values[values.length - 1], values[0]], { type: "chart", labels: ["1", "2", "3", "4", "5"], values }, "最大値から最小値を引きます。", { contract: "data-range" });
  if (form === 2) return payload(`${values.join("、")}の平均は？`, average, [median, range, total], { type: "chart", labels: ["1", "2", "3", "4", "5"], values }, `合計${total}を${values.length}で割ります。`, { contract: "data-mean" });
  if (form === 3) return payload("極端に大きい値が1つあるとき、真ん中の様子を見るのに役立つのは？", "中央値", ["最大値だけ", "最小値だけ", "色"], { type: "chart", labels: ["1", "2", "3", "4", "5"], values }, "中央値は極端な値の影響を受けにくい代表値です。", { contract: "data-representative-choice" });
  return payload("データを見るとき、平均だけで決めてよい？", "いいえ", ["はい", "いつでも", "人数が多いときだけ"], { type: "chart", labels: ["1", "2", "3", "4", "5"], values }, "中心だけでなく散らばりも見ます。", { contract: "data-spread" });
}

function validateBankQuestion(question) {
  const errors = [];
  if (question?.bankSource !== "question-bank") errors.push("question-bank source がない");
  if (!question?.templateId || !question?.skillId || !question?.contentContract) errors.push("bank metadata が不足している");
  const options = question?.options || [];
  if (options.length !== 4) errors.push(`選択肢数が${options.length}`);
  const keys = options.map((option) => canonicalAnswerKey(option.value));
  if (new Set(keys).size !== 4) errors.push("意味が重なる選択肢がある");
  const correct = options.filter((option) => canonicalAnswerKey(option.value) === question.answerKey);
  if (correct.length !== 1) errors.push(`正答選択肢が${correct.length}個`);
  if (!question?.prompt || !question?.explanation || !question?.lab?.type) errors.push("問題本文または盤面が不足している");
  return errors;
}

function makePlaceLab(unit, index, seed) {
  const isRounding = unit.id.includes("rounding");
  const value = unit.id.includes("10000") ? curriculumNumber(seed, 1034, 9876) : unit.id.includes("value") ? curriculumNumber(seed, 126, 987) : curriculumNumber(seed, 1200, 8900);
  if (isRounding) {
    const base = curriculumNumber(seed, 1200, 8800);
    const answer = Math.round(base / 100) * 100;
    return {
      prompt: `${base}を 百の位で四捨五入すると？`, answer,
      options: curriculumOptions(answer, [Math.floor(base / 100) * 100, Math.ceil(base / 100) * 100, answer + 100]),
      lab: { type: "place", digits: String(base), focus: "百の位", value: base, rounded: true },
      explanation: `十の位を見て、${base}は ${answer} に丸めます。`
    };
  }
  const digits = String(value);
  const focusIndex = (seed + index) % digits.length;
  const focus = digits[focusIndex];
  const placeNames = ["一の位", "十の位", "百の位", "千の位", "万の位"];
  const answer = Number(focus) * (10 ** (digits.length - focusIndex - 1));
  return {
    prompt: `${value}の「${focus}」は いくつ分？`, answer,
    options: curriculumOptions(answer, [Number(focus), Number(focus) * 10, Number(focus) * 1000]),
    lab: { type: "place", digits, focus: placeNames[digits.length - focusIndex - 1], focusIndex, value },
    explanation: `${focus}は ${placeNames[digits.length - focusIndex - 1]}なので、${answer}です。`
  };
}

function makeCalculationLab(unit, index, seed) {
  let left = curriculumNumber(seed, 12, 48);
  let right = curriculumNumber(seed + 3, 2, 9);
  let operator = "+";
  let answer;
  if (unit.id.includes("division") || unit.id.includes("remainder")) {
    right = curriculumNumber(seed, 2, 9);
    const quotient = curriculumNumber(seed + index, 3, 12);
    const remainder = unit.id.includes("remainder") ? curriculumNumber(seed + 2, 0, right - 1) : 0;
    left = quotient * right + remainder;
    answer = remainder ? `${quotient} あまり ${remainder}` : quotient;
    return {
      prompt: `${left}こを ${right}こずつ分けると？`, answer,
      options: curriculumOptions(answer, [`${quotient + 1} あまり ${remainder}`, `${quotient} あまり ${Math.max(0, remainder + 1)}`, quotient]),
      lab: { type: "calculation", left, right, operator: "÷", layout: "division", quotient, remainder },
      explanation: `${left} = ${right} × ${quotient}${remainder ? ` + ${remainder}` : ""} です。`
    };
  }
  if (unit.id.includes("multiplication") || unit.id.includes("factors")) {
    left = curriculumNumber(seed, 3, unit.id.includes("two-digit") ? 24 : 12);
    right = curriculumNumber(seed + index, 2, 9);
    answer = left * right;
    return {
      prompt: `${left} × ${right} は いくつ？`, answer,
      options: curriculumOptions(answer, [answer + left, answer - right, left + right]),
      lab: { type: "calculation", left, right, operator: "×", layout: "array" },
      explanation: `${left}のまとまりが${right}組で、${answer}です。`
    };
  }
  if (unit.id.includes("quadratic-expression")) {
    const a = curriculumNumber(seed, 2, 5);
    const b = curriculumNumber(seed + 1, 1, 4);
    const answerText = `x²+${a + b}x+${a * b}`;
    return {
      prompt: `(x+${a})(x+${b}) を展開すると？`, answer: answerText,
      options: curriculumOptions(answerText, [`x²+${a * b}x+${a + b}`, `x²+${a + b}x+${a * b + 1}`, `x²+${a * b}`]),
      lab: { type: "calculation", left: `x+${a}`, right: `x+${b}`, operator: "×", layout: "algebra-tiles" },
      explanation: `x²と${a + b}xと${a * b}を合わせます。`
    };
  }
  if (unit.id.includes("column")) operator = seed % 2 ? "+" : "−";
  if (operator === "−") { if (right > left) [left, right] = [right + 12, left]; answer = left - right; }
  else answer = left + right;
  return {
    prompt: `${left} ${operator} ${right} は いくつ？`, answer,
    options: curriculumOptions(answer, [answer + 1, answer - 1, left]),
    lab: { type: "calculation", left, right, operator, layout: "column" },
    explanation: `${left} ${operator} ${right} = ${answer}です。`
  };
}

function makeArrayLab(unit, index, seed) {
  const rows = curriculumNumber(seed, 2, 6);
  const cols = curriculumNumber(seed + index, 2, 7);
  const answer = rows * cols;
  return {
    prompt: `${rows}行、${cols}列の花はぜんぶでいくつ？`, answer,
    options: curriculumOptions(answer, [rows + cols, answer + cols, answer - rows]),
    lab: { type: "array", rows, cols, token: "✿" },
    explanation: `${rows} × ${cols} = ${answer}です。`
  };
}

function makeFractionLab(unit, index, seed) {
  let denominator = [2, 3, 4, 5, 6, 8][Math.abs(seed + index) % 6];
  let numerator = 1 + (Math.abs(seed * 3 + index) % (denominator - 1));
  let answer = `${numerator}/${denominator}`;
  let prompt = `${denominator}等分したうち ${numerator}こ分は？`;
  let operation = "read";
  if (unit.id.includes("common") || unit.id.includes("fraction-calc")) {
    const other = 1 + ((seed + 1) % Math.max(2, denominator - numerator));
    numerator = Math.min(denominator - 1, numerator);
    answer = `${numerator + other}/${denominator}`;
    prompt = `${numerator}/${denominator} + ${other}/${denominator} は？`;
    operation = "add";
  } else if (unit.id.includes("muldiv")) {
    const factor = 2 + (seed % 3);
    denominator = 4;
    numerator = 1 + (seed % 2);
    answer = `${numerator * factor}/${denominator * factor}`;
    prompt = `${numerator}/${denominator} と等しい分数を作ろう。`;
    operation = "equivalent";
  }
  return {
    prompt, answer,
    options: curriculumOptions(answer, [`${denominator}/${Math.max(1, numerator)}`, `${Math.max(1, numerator - 1)}/${denominator}`, `${numerator}/${denominator + 1}`]),
    lab: { type: "fraction", numerator, denominator, operation, answer },
    explanation: operation === "add" ? `分母は${denominator}のまま、分子を足します。` : `${answer}が等しい大きさを表します。`
  };
}

function makeDecimalLab(unit, index, seed) {
  const a10 = curriculumNumber(seed, 6, 26);
  const b10 = curriculumNumber(seed + index, 2, 14);
  const multiply = unit.id.includes("muldiv");
  const answer10 = multiply ? a10 * 2 : a10 + b10;
  const answer = (answer10 / 10).toFixed(1);
  const prompt = multiply ? `${(a10 / 10).toFixed(1)} × 2 は？` : `${(a10 / 10).toFixed(1)} + ${(b10 / 10).toFixed(1)} は？`;
  return {
    prompt, answer,
    options: curriculumOptions(answer, [((answer10 + 1) / 10).toFixed(1), ((answer10 - 1) / 10).toFixed(1), String(answer10)]),
    lab: { type: "decimal", a: a10 / 10, b: multiply ? 2 : b10 / 10, operation: multiply ? "×" : "+" },
    explanation: "小数点の位置をそろえて、10分のいくつかで考えます。"
  };
}

function makeMeasureLab(unit, index, seed) {
  if (unit.id.includes("money")) {
    const price = 120 + curriculumNumber(seed, 0, 7) * 10;
    const paid = 200;
    const answer = paid - price;
    return { prompt: `${paid}円で${price}円の品を買うと、おつりは？`, answer, options: curriculumOptions(answer, [price, answer + 10, answer - 10]), lab: { type: "money", price, paid }, explanation: `${paid}−${price}=${answer}円です。` };
  }
  if (unit.id.includes("time")) {
    const start = 8 + (seed % 3);
    const duration = 20 + (index % 3) * 10;
    const answer = `${duration}分`;
    return { prompt: `${start}:00から${start}:${String(duration).padStart(2, "0")}まで、何分？`, answer, options: curriculumOptions(answer, [`${duration + 10}分`, `${duration - 10}分`, `${duration + 20}分`]), lab: { type: "measure", start, duration, unit: "分", kind: "time" }, explanation: `時計の短い目盛りを数えると${duration}分です。` };
  }
  const cm = 2 + (seed % 7);
  const answer = unit.id.includes("capacity") ? `${cm}L` : `${cm * 10}cm`;
  const candidates = unit.id.includes("capacity") ? [`${cm + 1}L`, `${Math.max(1, cm - 1)}L`, `${cm * 10}L`] : [`${cm}cm`, `${cm * 10 + 10}cm`, `${cm * 10 - 10}cm`];
  return { prompt: unit.id.includes("capacity") ? `大きいポットに入る量は ${cm}L。ぴったりの札は？` : `${cm}dm は何cm？`, answer, options: curriculumOptions(answer, candidates), lab: { type: "measure", amount: cm, unit: unit.id.includes("capacity") ? "L" : "dm", kind: unit.id.includes("capacity") ? "capacity" : "length" }, explanation: unit.id.includes("capacity") ? `${cm}Lの札を選びます。` : `1dmは10cmなので${cm * 10}cmです。` };
}

function makeGeometryLab(unit, index, seed) {
  const type = unit.id.includes("angle") || unit.id.includes("parallel") ? "angle" : unit.id.includes("circle") ? "circle" : unit.id.includes("solid") ? "solid" : "shape";
  let answer; let prompt; let options; let lab;
  if (type === "angle") {
    const angle = [45, 90, 120, 180][Math.abs(seed + index) % 4];
    answer = `${angle}°`; prompt = `この角に近い角度は？`; options = curriculumOptions(answer, [`${angle === 90 ? 45 : 90}°`, `${angle + 30}°`, `${Math.max(0, angle - 30)}°`]); lab = { type: "geometry", kind: "angle", angle };
  } else if (type === "circle") {
    const radius = 2 + (seed % 5); answer = radius * 2; prompt = `半径が${radius}cmの円。直径は？`; options = curriculumOptions(answer, [radius, radius * 3, radius * 2 + 1]); lab = { type: "geometry", kind: "circle", radius };
  } else if (type === "solid") {
    answer = "6面"; prompt = "箱の形の立体には、面がいくつ？"; options = curriculumOptions(answer, ["4面", "5面", "8面"]); lab = { type: "geometry", kind: "solid", faces: 6 };
  } else {
    const sides = [3, 4, 5][Math.abs(seed) % 3]; answer = `${sides}本`; prompt = `${sides}角形の辺の数は？`; options = curriculumOptions(answer, [`${sides - 1}本`, `${sides + 1}本`, `${sides + 2}本`]); lab = { type: "geometry", kind: "polygon", sides };
  }
  return { prompt, answer, options, lab, explanation: "図の印と性質を一つずつ対応させます。" };
}

function makeAreaLab(unit, index, seed) {
  const width = 3 + (seed % 5);
  const height = 2 + ((seed + index) % 4);
  const isPythagoras = unit.id.includes("pythagoras");
  const answer = isPythagoras ? 5 : width * height;
  const prompt = isPythagoras ? "3cmと4cmを直角にはさんだ斜辺は？" : `${width}ます×${height}ますの花畑の面積は？`;
  return {
    prompt, answer,
    options: curriculumOptions(answer, isPythagoras ? [6, 7, 4] : [width + height, answer + width, answer - height]),
    lab: { type: "area", width, height, pythagoras: isPythagoras },
    explanation: isPythagoras ? "3²+4²=5²になるので、斜辺は5cmです。" : `${width}×${height}=${answer}ます分です。`
  };
}

function makeChartLab(unit, index, seed) {
  const values = [2 + (seed % 4), 4 + ((seed + 1) % 4), 3 + ((seed + 2) % 5), 5 + ((seed + 3) % 3)];
  const labels = ["もも", "そら", "みんと", "すみれ"];
  const max = Math.max(...values);
  const maxIndex = values.indexOf(max);
  let answer = labels[maxIndex];
  let prompt = "いちばん多いのはどれ？";
  if (unit.id.includes("average")) {
    const total = values.reduce((sum, value) => sum + value, 0);
    answer = total / values.length;
    prompt = "4人の平均は？";
  }
  if (unit.id.includes("survey") || unit.id.includes("inference")) {
    answer = "いろいろな人から選ぶ";
    prompt = "全体の様子を調べるための標本は？";
    return { prompt, answer, options: curriculumOptions(answer, ["近くの1人だけ", "好きな人だけ", "同じ学年だけ"]), lab: { type: "chart", labels, values, survey: true }, explanation: "偏りをへらすため、いろいろな人から選びます。" };
  }
  return { prompt, answer, options: curriculumOptions(answer, unit.id.includes("average") ? [answer + 1, answer - 1, Math.max(...values)] : labels.filter((label) => label !== answer)), lab: { type: "chart", labels, values, average: unit.id.includes("average") }, explanation: unit.id.includes("average") ? "合計を人数で同じように分けます。" : `${answer}の棒がいちばん高いです。` };
}

function makeRatioLab(unit, index, seed) {
  if (unit.id.includes("probability")) {
    const total = 8; const favorable = 2 + (seed % 3); const answer = `${favorable}/${total}`;
    return { prompt: `${total}このカプセルのうち青が${favorable}こ。青が出る確率は？`, answer, options: curriculumOptions(answer, [`${total - favorable}/${total}`, `${favorable}/${total - 1}`, `${favorable + 1}/${total}`]), lab: { type: "ratio", left: favorable, right: total - favorable, kind: "probability" }, explanation: "望む場合の数を全体の場合の数で割ります。" };
  }
  if (unit.id.includes("percent")) {
    const base = 200; const rate = 20 + (seed % 3) * 10; const answer = base * rate / 100;
    return { prompt: `${base}円の${rate}%は？`, answer, options: curriculumOptions(answer, [rate, answer + 20, answer - 20]), lab: { type: "ratio", left: rate, right: 100, kind: "percent", base }, explanation: `${base}の${rate}%は${answer}です。` };
  }
  const left = 2 + (seed % 4); const right = 3 + ((seed + index) % 4); const scale = 2 + (index % 2); const answer = `${left * scale}:${right * scale}`;
  return { prompt: `${left}:${right}と同じ比は？`, answer, options: curriculumOptions(answer, [`${left + scale}:${right + scale}`, `${left * scale}:${right}`, `${right * scale}:${left * scale}`]), lab: { type: "ratio", left, right, scale, kind: "mix" }, explanation: "両方に同じ数を掛けると、同じ比です。" };
}

function makeAlgebraLab(unit, index, seed) {
  if (unit.id.includes("integer")) {
    const left = -3 - (seed % 4); const right = 2 + (index % 4); const answer = left + right;
    return { prompt: `${left} + ${right} は？`, answer, options: curriculumOptions(answer, [left - right, Math.abs(answer), answer + 2]), lab: { type: "algebra", expression: `${left} + ${right}`, balance: false }, explanation: "数直線で右へ進むと答えが分かります。" };
  }
  if (unit.id.includes("system")) {
    const x = 2 + (seed % 3); const y = 1 + (index % 3); const answer = `(${x}, ${y})`;
    return { prompt: `x+y=${x + y}、x−y=${x - y} を満たす組は？`, answer, options: curriculumOptions(answer, [`(${x + 1}, ${y})`, `(${x}, ${y + 1})`, `(${y}, ${x})`]), lab: { type: "algebra", expression: "連立の交点", balance: true, x, y }, explanation: "二つの条件を同時に満たす組を選びます。" };
  }
  const x = 2 + (seed % 6); const add = 3 + (index % 4); const answer = x;
  return { prompt: `x + ${add} = ${x + add} の x は？`, answer, options: curriculumOptions(answer, [x + add, x - 1, add]), lab: { type: "algebra", expression: `x + ${add} = ${x + add}`, balance: true }, explanation: "両方から同じ${add}を引くとxが残ります。" };
}

function makeCoordinateLab(unit, index, seed) {
  if (unit.id.includes("quadratic")) {
    const x = 2 + (seed % 3); const answer = x * x;
    return { prompt: `y=x²で、x=${x}のときのyは？`, answer, options: curriculumOptions(answer, [x * 2, x + 2, answer + 1]), lab: { type: "coordinate", points: [[0, 0], [1, 1], [2, 4]], quadratic: true, target: [x, answer] }, explanation: `${x}²=${answer}です。` };
  }
  const x = -2 + (seed % 5); const y = -1 + ((seed + index) % 5); const answer = `(${x}, ${y})`;
  return { prompt: `星の座標はどれ？`, answer, options: curriculumOptions(answer, [`(${y}, ${x})`, `(${x + 1}, ${y})`, `(${x}, ${y + 1})`]), lab: { type: "coordinate", points: [[x, y]], target: [x, y], quadratic: false }, explanation: "横のx、縦のyの順で読みます。" };
}

function makeProofLab(unit, index, seed) {
  const isSimilarity = unit.id.includes("similarity") || unit.id.includes("scale");
  const answer = isSimilarity ? "対応する辺の比が等しい" : "対応する辺と角が等しい";
  const prompt = isSimilarity ? "二つの図形が相似だといえる手がかりは？" : "二つの図形が合同だといえる手がかりは？";
  return { prompt, answer, options: curriculumOptions(answer, ["面積だけが等しい", "色が同じ", "向きが同じ"]), lab: { type: "proof", kind: isSimilarity ? "similar" : "congruent", cards: ["条件", "根拠", "結論"] }, explanation: "対応する量の関係を根拠にして判断します。" };
}

function makeRootLab(unit, index, seed) {
  if (unit.id.includes("quadratic-equation")) {
    const root = 2 + (seed % 4); const answer = `${root} と −${root}`;
    return { prompt: `x²=${root * root} の解は？`, answer, options: curriculumOptions(answer, [`${root}`, `−${root}`, `${root + 1} と −${root + 1}`]), lab: { type: "root", square: root * root, roots: [root, -root], equation: true }, explanation: "2乗して同じ数になる正負二つの数を探します。" };
  }
  const root = 2 + (seed % 8); const answer = root;
  return { prompt: `√${root * root} は？`, answer, options: curriculumOptions(answer, [root + 1, root - 1, root * root]), lab: { type: "root", square: root * root, roots: [root], equation: false }, explanation: `${root}×${root}=${root * root}です。` };
}

function makeCountQuestion(stage, seed) {
  const max = Math.min(10, 1 + Math.ceil(stage.level * 1.25));
  // 0個を扱う専用ステージではないため、セッションseed=0でも必ず1以上。
  const answer = 1 + (Math.abs(Math.trunc(Number(seed) || 0)) % max);
  const total = Math.min(12, Math.max(answer + 2, max + 2));
  const visual = questionVisual("count", stage, seed);
  return {
    mode: "count",
    visual,
    prompt: `${visual.name}を ${answer}こ えらぼう`,
    subPrompt: "えらんだら「できた」をおしてね。",
    answer,
    total,
    hints: [
      "ひとつずつ、ゆびでさしながら かぞえてみよう。",
      `${answer}こで とまるよ。そこからふやさなくてだいじょうぶ。`,
      `${visual.name}を ${answer}こ えらびます。`
    ],
    misconception: "えらんだものを、さいしょから 1こずつ かぞえなおしてみよう。",
    explanation: `${visual.name}を ${answer}こ えらべたね。`
  };
}

function makeCompareQuestion(stage, seed) {
  const max = Math.min(10, 3 + stage.level);
  let left = 1 + ((seed + stage.order) % max);
  let right = 1 + ((seed * 3 + 2) % max);
  const asksLess = stage.level >= 4 && seed % 2 === 0;
  const allowSame = stage.level >= 5 && seed % 3 === 0 && seed % 2 === 0;
  if (!allowSame && left === right) right = right === max ? right - 1 : right + 1;
  if (allowSame && seed % 2 === 0) right = left;
  const answer = left === right ? "same" : asksLess ? (left < right ? "left" : "right") : left > right ? "left" : "right";
  const visual = questionVisual("compare", stage, seed);
  return {
    mode: "compare",
    visual,
    prompt: allowSame ? "おなじなら「おなじ」をえらぼう" : `${asksLess ? "すくない" : "おおい"} ほうを えらぼう`,
    subPrompt: `${visual.name}のかずをくらべよう。`,
    answer,
    allowSame,
    asksLess,
    groups: { left, right },
    hints: [
      "ひだりとみぎを、ひとつずつ かぞえてみよう。",
      asksLess ? "すくないほうは、かずがちいさいほうです。" : "おおいほうは、かずがたくさんあるほうです。",
      `ひだりは${left}こ、みぎは${right}こです。`
    ],
    misconception: "ひだりとみぎを、1こずつ むすぶように くらべてみよう。",
    explanation: `ひだりは${left}こ、みぎは${right}こです。`
  };
}

function makeShapeQuestion(stage, seed) {
  const available = stage.worldId === "w0"
    ? SHAPES.slice(0, 3)
    : SHAPES.slice(0, Math.min(SHAPES.length, 3 + Math.floor(stage.level / 2)));
  const target = available[(seed + stage.order) % available.length];
  const options = shuffle([...available]).slice(0, Math.min(4, available.length));
  if (!options.some((shape) => shape.id === target.id)) options[0] = target;
  return {
    mode: "shape",
    visual: { ...target, src: spriteUrl(SHAPE_SPRITES[target.id] || "shapes") },
    prompt: `${target.name}を さがそう`,
    subPrompt: "おなじかたちをタップしてね。",
    answer: target.id,
    options: shuffle(options),
    hints: [
      `${target.name}のかたちを、ゆっくり見てみよう。`,
      "かどや、まるいところをくらべよう。",
      `さがすのは ${target.name} です。`
    ],
    misconception: "いろではなく、まるいところや かどの かずを見てみよう。",
    explanation: `${target.name}を見つけました。`
  };
}

function makeSizeQuestion(stage, seed) {
  const asksSmall = stage.level >= 4 && seed % 2 === 1;
  const scales = shuffle([0.72, 1, 1.28, stage.level >= 5 ? 1.48 : 0.88]).slice(0, 3);
  const visual = questionVisual("size", stage, seed);
  const options = scales.map((scale) => ({ scale, visual: { ...visual } }));
  const values = options.map((option) => option.scale);
  const targetValue = asksSmall ? Math.min(...values) : Math.max(...values);
  const answer = options.findIndex((option) => option.scale === targetValue);
  return {
    mode: "size",
    visual,
    prompt: `いちばん ${asksSmall ? "ちいさい" : "おおきい"} ${visual.name}はどれ？`,
    subPrompt: "おなじものの大きさをくらべてね。",
    answer,
    options,
    hints: [
      "となりのものと、大きさをくらべてみよう。",
      asksSmall ? "ちいさいものは、いちばんひくく見えます。" : "おおきいものは、いちばんひろく見えます。",
      asksSmall ? "いちばんちいさいものをえらびます。" : "いちばんおおきいものをえらびます。"
    ],
    misconception: "おなじものどうしを、はしから はしまで見くらべてみよう。",
    explanation: asksSmall ? `いちばんちいさい${visual.name}です。` : `いちばんおおきい${visual.name}です。`
  };
}

function makeOrderQuestion(stage, seed) {
  const total = Math.min(7, 4 + Math.floor(stage.level / 2));
  const fromRight = stage.level >= 4 && seed % 2 === 0;
  const ordinal = 1 + ((seed + stage.order) % total);
  const answer = fromRight ? total - ordinal : ordinal - 1;
  const visual = questionVisual("order", stage, seed);
  return {
    mode: "order",
    visual,
    prompt: `${fromRight ? "みぎ" : "ひだり"}から ${ordinal}ばんめの ${visual.name}はどれ？`,
    subPrompt: "はじまりのほうから、ひとつずつかぞえよう。",
    answer,
    total,
    fromRight,
    ordinal,
    showGuideLabels: stage.level <= 2,
    hints: [
      `${fromRight ? "みぎ" : "ひだり"}のはしから、1、2、3とかぞえよう。`,
      `${ordinal}ばんめで とまってね。`,
      `${fromRight ? "みぎ" : "ひだり"}から${ordinal}ばんめをえらびます。`
    ],
    misconception: "はしを きめてから、ひとつずつ じゅんばんに かぞえてみよう。",
    explanation: `${ordinal}ばんめの${visual.name}です。`
  };
}

function makePatternQuestion(stage, seed) {
  const patternSet = PATTERN_SETS[(stage.order + seed) % PATTERN_SETS.length];
  const pool = patternSet.tokens.slice(0, Math.min(4, 2 + Math.floor(stage.level / 3)));
  const patternLength = stage.level >= 5 ? 3 : 2;
  const base = Array.from({ length: patternLength }, (_, index) => ({ ...pool[(seed + index) % pool.length] }));
  const visibleLength = stage.level >= 7 ? 5 : 4;
  const sequence = Array.from({ length: visibleLength }, (_, index) => ({ ...base[index % base.length] }));
  const answer = base[visibleLength % base.length];
  const options = shuffle(pool.map((token) => ({ ...token }))).slice(0, 4);
  if (!options.some((shape) => shape.id === answer.id)) options[0] = answer;
  return {
    mode: "pattern",
    visual: { ...base[0] },
    patternName: patternSet.name,
    prompt: "つぎにくる ものはどれ？",
    subPrompt: `${patternSet.name}のくりかえしを見つけよう。`,
    answer: answer.id,
    sequence,
    options: shuffle(options),
    hints: [
      "まえから、かたちのならびを声に出してみよう。",
      "おなじじゅんばんで、もういちどくりかえします。",
      `つぎは ${answer.name} です。`
    ],
    misconception: "くりかえす まとまりを、2つか3つずつに分けて見てみよう。",
    explanation: `${answer.name} がつぎにきます。`
  };
}

function makeNumberQuestion(stage, seed) {
  const maxTens = Math.min(9, Math.max(1, Math.ceil(stage.level * 0.85)));
  let tens = 1 + ((seed + stage.order) % maxTens);
  let ones = stage.level >= 4 ? (seed * 3 + stage.order) % (Math.min(9, 2 + (stage.level - 4) * 2) + 1) : 0;
  if (stage.level >= 10 && seed % 5 === 0) {
    tens = 10;
    ones = 0;
  }
  const answer = tens * 10 + ones;
  const visual = questionVisual("number", stage, seed);
  return {
    mode: "number",
    sceneVisual: visual,
    prompt: "10のまとまりと ばらを かぞえよう",
    subPrompt: "ぴったりのすうじカードをえらんでね。",
    answer,
    tens,
    ones,
    options: numberOptions(answer, 100, [answer - 10, answer + 1, answer + 10]),
    visual: renderPlaceValueVisual(tens, ones, visual),
    hints: [
      "ながいまとまりは10です。",
      `10のまとまりが${tens}こあります。`,
      ones ? `${tens * 10}に${ones}をたして ${answer} です。` : `${tens}こぶんの10で ${answer} です。`
    ],
    misconception: "まず10のまとまりを数えてから、ばらを足してみよう。",
    explanation: `${answer}をえらべました。`
  };
}

function makeAddQuestion(stage, seed) {
  const cap = Math.min(18, 3 + stage.level * 2);
  const answer = 2 + ((seed + stage.order) % (cap - 1));
  const leftMin = Math.max(1, answer - 9);
  const leftMax = Math.min(9, answer - 1);
  const left = leftMin + ((seed * 2 + stage.order) % (leftMax - leftMin + 1));
  const right = answer - left;
  const visual = questionVisual("add", stage, seed);
  return {
    mode: "add",
    sceneVisual: visual,
    prompt: `${left} + ${right} は いくつ？`,
    subPrompt: "はしにぴったりのカードをえらぼう。",
    answer,
    left,
    right,
    options: numberOptions(answer, 20, [answer - 1, answer + 1, left, right]),
    visual: renderBridgeVisual(left, right, "+", visual),
    hints: [
      "ひだりのかずから、みぎのかずぶん ふやしてみよう。",
      `${left}から ${right}こ すすみます。`,
      `こたえは ${answer} です。`
    ],
    misconception: "ひだりの数に、みぎの数だけ ひとつずつ足してみよう。",
    explanation: `${left}と${right}で ${answer} です。`
  };
}

function makeSubtractQuestion(stage, seed) {
  const cap = Math.min(18, 3 + stage.level * 2);
  const left = 2 + ((seed + stage.order) % (cap - 1));
  const right = 1 + ((seed * 2 + stage.level) % Math.min(9, left - 1));
  const answer = left - right;
  const visual = questionVisual("subtract", stage, seed);
  return {
    mode: "subtract",
    sceneVisual: visual,
    prompt: `${left} - ${right} は いくつ？`,
    subPrompt: "のこるかずをえらぼう。",
    answer,
    left,
    right,
    options: numberOptions(answer, 20, [answer - 1, answer + 1, left, right]),
    visual: renderBridgeVisual(left, right, "-", visual),
    hints: [
      `${left}こから ${right}こ とります。`,
      "とったあとに、のこったかずをかぞえよう。",
      `こたえは ${answer} です。`
    ],
    misconception: "はじめの数から、とる数だけ ひとつずつ へらしてみよう。",
    explanation: `${left}から${right}をとると ${answer} です。`
  };
}

function makeClockQuestion(stage, seed) {
  const maxHour = Math.min(12, 2 + Math.ceil(stage.level * 1.25));
  const hour = 1 + ((seed + stage.order) % maxHour);
  const half = stage.level >= 4 && seed % 2 === 0;
  const answer = half ? `${hour}じはん` : `${hour}じ`;
  const nextHour = hour === 12 ? 1 : hour + 1;
  const previousHour = hour === 1 ? 12 : hour - 1;
  const options = shuffle([answer, `${nextHour}じ`, half ? `${hour}じ` : `${hour}じはん`, `${previousHour}じ`])
    .filter((value, index, array) => array.indexOf(value) === index)
    .slice(0, 4);
  if (!options.includes(answer)) options[0] = answer;
  const hourAngle = ((hour % 12) * 30) + (half ? 15 : 0);
  const minuteAngle = half ? 180 : 0;
  const visual = questionVisual("clock", stage, seed);
  return {
    mode: "clock",
    visual,
    prompt: "とけいは なんじ？",
    subPrompt: "ながいはりと、みじかいはりを見てね。",
    answer,
    hour,
    half,
    options: shuffle(options),
    hourAngle,
    minuteAngle,
    hints: [
      "ながいはりが12なら、ぴったりのじかんです。",
      "ながいはりが6なら、なんじはんです。",
      `このとけいは ${answer} です。`
    ],
    misconception: "ながいはりを先に見てから、みじかいはりを見てみよう。",
    explanation: `${answer} のとけいです。`
  };
}

function makeLengthQuestion(stage, seed) {
  const base = 3 + (stage.level % 4);
  const ribbonVisuals = QUESTION_VISUALS.length;
  const ribbons = shuffle([base, base + 2, base + 4]).map((units, index) => {
    const visual = { ...ribbonVisuals[index] };
    return { units, color: visual.tint, name: visual.name.replace("リボン", ""), visual };
  });
  const asksShort = stage.level >= 5 && seed % 2 === 1;
  const targetUnits = asksShort ? Math.min(...ribbons.map((ribbon) => ribbon.units)) : Math.max(...ribbons.map((ribbon) => ribbon.units));
  const answer = ribbons.findIndex((ribbon) => ribbon.units === targetUnits);
  return {
    mode: "length",
    visual: { ...ribbons[0].visual },
    prompt: `${asksShort ? "いちばん みじかい" : "いちばん ながい"} リボンはどれ？`,
    subPrompt: "ますのかずをくらべてね。",
    answer,
    ribbons,
    hints: [
      "リボンのはしをそろえて見てみよう。",
      asksShort ? "ますが少ないほうが、みじかいです。" : "ますが多いほうが、ながいです。",
      `${ribbons[answer].name}のリボンをえらびます。`
    ],
    misconception: "リボンのはしを そろえてから、ますの数をくらべてみよう。",
    explanation: `${ribbons[answer].name}のリボンです。`
  };
}

function numberOptions(answer, max, extras = []) {
  const candidates = [Math.max(0, Math.min(max, Number(answer)))];
  const suggestions = [...extras, answer + 2, answer - 2];
  for (const value of suggestions) {
    const next = Math.max(0, Math.min(max, Number(value)));
    if (!candidates.includes(next)) candidates.push(next);
  }
  const fallbackDeltas = [-1, 1, -3, 3, -4, 4, -5, 5, -10, 10];
  for (const delta of fallbackDeltas) {
    if (candidates.length >= 4) break;
    const next = Math.max(0, Math.min(max, answer + delta));
    if (!candidates.includes(next)) candidates.push(next);
  }
  for (let value = 0; value <= max && candidates.length < 4; value += 1) {
    if (!candidates.includes(value)) candidates.push(value);
  }
  const selected = [candidates[0], ...shuffle(candidates.slice(1)).slice(0, 3)];
  return shuffle(selected);
}

function renderPlaceValueVisual(tens, ones, visual) {
  return `
    <div class="place-value-visual" aria-label="10のまとまりとばら">
      <div class="place-value-group">
        <span class="place-value-label">10のまとまり</span>
        <span class="ten-blocks">${Array.from({ length: tens }, () => `<span class="ten-stick" style="--src:url('${spriteUrl("tenFrame2")}')"></span>`).join("")}</span>
      </div>
      ${ones ? `<div class="place-value-group">
        <span class="place-value-label">ばら</span>
        <span class="one-run">${renderObjectRun({ ...visual, src: spriteUrl("oneBead"), name: "ビーズ" }, ones, "one-dot")}</span>
      </div>` : ""}
    </div>
  `;
}

function renderBridgeVisual(left, right, operator, visual) {
  const operatorSprite = operator === "+" ? "opPlus" : "opMinus";
  return `
    <div class="bridge-visual bridge-visual--${operator === "+" ? "add" : "subtract"}">
      <span class="bridge-group">${renderObjectRun(visual, left, "bridge-token")}<strong>${left}</strong></span>
      <span class="bridge-op-sprite" style="--src:url('${spriteUrl(operatorSprite)}')"></span>
      <span class="bridge-group">${renderObjectRun(visual, right, "bridge-token")}<strong>${right}</strong></span>
      <span class="bridge-op-sprite" style="--src:url('${spriteUrl("opEquals")}')"></span>
      <span class="bridge-answer">?</span>
    </div>
  `;
}

function submitCount() {
  const question = currentQuestion();
  if (!question || question.solved || (question.mode !== "count" && question.responseType !== "slot-fill")) return;
  submitAnswer(view.selected.size);
}

function currentQuestion() {
  return view.active?.questions?.[view.active.index] || null;
}

function clearRetryFeedback() {
  if (view.feedback?.kind === "try") view.feedback = null;
}

function resetQuestionInteractionState(question = currentQuestion()) {
  view.fractionHintClosed = false;
  view.selected = new Set();
  view.sequence = [];
  view.placement = null;
  view.pairLinks = [];
  view.pairFirst = null;
  view.routeCursor = Number.isFinite(question?.route?.start) ? question.route.start : null;
  view.routeNote = "";
  view.patternSlots = [];
  view.builder = { tens: null, ones: null };
  view.curriculumInput = { selectedValue: null, typed: "", clueOpen: false, estimate: null };
  // 正時・半時を扱う最初の時計では、12時から安心して動かし始められる。
  view.clockDraft = { hour: 12, minute: 0 };
  view.soundGame = question?.responseType === "sound-mini-game"
    ? createSoundGameState()
    : null;
}

function activeCurriculumQuestion() {
  const question = currentQuestion();
  return question?.responseType === "curriculum-lab" ? question : null;
}

function animateCalculationTouch(selector = ".calculation-digit-charm.is-last, .calculation-card-charm, .calculation-charm-empty") {
  window.requestAnimationFrame(() => {
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches) return;
    const charm = document.querySelector(selector);
    const pet = document.querySelector(".roleplay-customer-pet");
    charm?.classList.add("calculation-touch");
    pet?.classList.add("calculation-touch-pet");
    window.setTimeout(() => {
      charm?.classList.remove("calculation-touch");
      pet?.classList.remove("calculation-touch-pet");
    }, 450);
  });
}

function toggleCalculationBeads() {
  const question = activeCurriculumQuestion();
  if (!question || question.solved || !calculationBeadPlan(question)) return;
  const input = view.curriculumInput || {};
  const draft = input.beadHelp || { open: false, moves: 0, unwrapped: false };
  const open = !draft.open;
  // 支援を開いた問題は能力判定で「ヒントあり」として扱う。閉じたり、
  // 不正解のあとに開き直しても、同じ支援の記録を増やし続けない。
  if (open && !question.calculationBeadHintUsed) {
    question.calculationBeadHintUsed = true;
    recordHint(view.active.stage);
  }
  view.curriculumInput = { ...input, beadHelp: { ...draft, open } };
  playMiniTone("harp", 0);
  render();
}

function focusCalculationAnswer() {
  const question = activeCurriculumQuestion();
  if (!question || question.solved) return;
  const answerControl = document.querySelector('.curriculum-key:not(:disabled), button.curriculum-answer-option:not(:disabled)');
  answerControl?.focus?.({ preventScroll: true });
  answerControl?.scrollIntoView?.({ block: "center", behavior: "auto" });
}

function moveCalculationBead() {
  const question = activeCurriculumQuestion();
  const plan = calculationBeadPlan(question);
  const input = view.curriculumInput || {};
  const draft = input.beadHelp;
  if (!plan || question.solved || !draft?.open) return;
  const moves = Math.min(plan.moves, Math.max(0, Number(draft.moves) || 0));
  if (moves === plan.moves && (plan.addition || draft.unwrapped)) {
    focusCalculationAnswer();
    return;
  }
  if (!plan.addition && !draft.unwrapped) {
    view.curriculumInput = { ...input, beadHelp: { ...draft, unwrapped: true } };
  } else {
    if (moves === plan.moves) return;
    view.curriculumInput = { ...input, beadHelp: { ...draft, moves: moves + 1 } };
  }
  playMiniTone("harp", Math.min(4, (view.curriculumInput.beadHelp.moves || 0) + 1), true);
  render();
  animateCalculationTouch(".calculation-bead-dots");
}

function chooseCurriculumOption(value) {
  const question = activeCurriculumQuestion();
  if (!question || question.solved || ["direct-choice", "keypad", "option-keypad"].includes(question.inputPattern)) return;
  if (!question.options?.some((option) => String(option.value) === String(value))) return;
  clearRetryFeedback();
  view.curriculumInput = { ...(view.curriculumInput || {}), selectedValue: value };
  playMiniTone("harp", Math.max(0, question.options.findIndex(option => String(option.value) === String(value))));
  render();
  animateCalculationTouch(".curriculum-answer-option.is-selected");
}

function submitCurriculumSelection() {
  const question = activeCurriculumQuestion();
  const input = view.curriculumInput || {};
  if (!question || question.solved || ["direct-choice", "keypad", "option-keypad"].includes(question.inputPattern)) return;
  if (input.selectedValue === null || input.selectedValue === undefined) return;
  if (question.inputPattern === "clue-confirm" && !input.clueOpen) {
    toast("まず、手がかりをひらいてみよう。");
    return;
  }
  if (question.inputPattern === "estimate-confirm" && !input.estimate) {
    toast("ぴったりより小さめ・大きめか、まず予想してみよう。");
    return;
  }
  submitAnswer(input.selectedValue);
}

function appendCurriculumKey(value) {
  const question = activeCurriculumQuestion();
  if (!question || question.solved || !["keypad", "option-keypad"].includes(question.inputPattern)) return;
  const key = String(value || "");
  if (!question.keypadKeys?.includes(key)) return;
  const input = view.curriculumInput || {};
  const typed = question.inputPattern === "option-keypad" ? key : `${input.typed || ""}${key}`;
  if (typed.length > 14) return;
  clearRetryFeedback();
  view.curriculumInput = { ...input, typed };
  playMiniTone("harp", question.inputPattern === "option-keypad" ? Number(key) - 1 : Math.min(4, typed.length - 1));
  render();
  animateCalculationTouch();
}

function eraseCurriculumKey() {
  const question = activeCurriculumQuestion();
  if (!question || question.solved || !["keypad", "option-keypad"].includes(question.inputPattern)) return;
  const input = view.curriculumInput || {};
  if (!input.typed) return;
  clearRetryFeedback();
  view.curriculumInput = { ...input, typed: String(input.typed).slice(0, -1) };
  playMiniTone("harp", Math.min(4, Math.max(0, String(input.typed).length - 2)));
  render();
  animateCalculationTouch();
}

function submitCurriculumKeypad() {
  const question = activeCurriculumQuestion();
  const typed = String(view.curriculumInput?.typed || "");
  if (!question || question.solved || !["keypad", "option-keypad"].includes(question.inputPattern) || !typed) return;
  if (question.inputPattern === "option-keypad") {
    const option = question.options?.[Number(typed) - 1];
    if (!option) {
      toast("1から4の番号をひとつ入れてね。");
      return;
    }
    submitAnswer(option.value);
    return;
  }
  submitAnswer(typed);
}

function revealCurriculumClue() {
  const question = activeCurriculumQuestion();
  if (!question || question.solved || question.inputPattern !== "clue-confirm") return;
  clearRetryFeedback();
  view.curriculumInput = { ...(view.curriculumInput || {}), clueOpen: true };
  if (question.lab?.type === "fraction") {
    if (view.hintIndex < 0) { view.hintIndex = 0; recordHint(view.active.stage); }
    view.fractionHintClosed = false;
  }
  playSfx("tap");
  render();
}

function setCurriculumEstimate(value) {
  const question = activeCurriculumQuestion();
  if (!question || question.solved || question.inputPattern !== "estimate-confirm") return;
  if (!["小さめ", "ぴったり", "大きめ"].includes(String(value))) return;
  clearRetryFeedback();
  view.curriculumInput = { ...(view.curriculumInput || {}), estimate: String(value) };
  playSfx("tap");
  render();
}

function choosePairToken(side, index) {
  const question = currentQuestion();
  if (!question || question.solved || question.responseType !== "pair-link") return;
  const limit = Number(question.pairLink?.[side]) || 0;
  if (!Number.isInteger(index) || index < 0 || index >= limit) return;
  const links = Array.isArray(view.pairLinks) ? view.pairLinks : [];
  if (side === "left") {
    if (links.some((link) => link.left === index)) return;
    clearRetryFeedback();
    view.pairFirst = index;
  } else {
    if (!Number.isInteger(view.pairFirst) || links.some((link) => link.right === index)) return;
    clearRetryFeedback();
    view.pairLinks = [...links, { left: view.pairFirst, right: index }];
    view.pairFirst = null;
  }
  playSfx("tap");
  playLegacyLayerTone(question, index, side === "right");
  render();
}

function submitPairResult(value) {
  const question = currentQuestion();
  if (!question || question.solved || question.responseType !== "pair-link") return;
  // ペアを作り終えていなくても答えてよい（見てわかる子を待たせない）。
  submitAnswer(value);
}

function stepRoute(value) {
  const question = currentQuestion();
  if (!question || question.solved || question.responseType !== "route-step") return;
  const route = question.route;
  if (!route) return;
  const cursor = Number.isFinite(view.routeCursor) ? view.routeCursor : route.start;
  const expected = Number(cursor) + Number(route.direction);
  // 一歩ずつ進むのは確かめる手段。ゴールがわかっているなら、そこを直接タップして答えてよい。
  if (Number(value) === Number(route.target) && route.values.includes(Number(value))) {
    clearRetryFeedback();
    view.routeCursor = Number(value);
    playSfx("tap");
    playLegacyLayerTone(question, value, true);
    submitAnswer(question.answer);
    return;
  }
  if (Number(value) !== expected || !route.values.includes(Number(value))) {
    clearRetryFeedback();
    view.routeNote = "となりのマスへ進んでたしかめてもいいし、ゴールがわかったら そこをタップしてもいいよ。";
    playSfx("tap");
    render();
    return;
  }
  clearRetryFeedback();
  view.routeCursor = Number(value);
  view.routeNote = "いい一歩！ つぎの足あとをたどろう。";
  playSfx("tap");
  playLegacyLayerTone(question, value, Number(value) === Number(route.target));
  if (Number(value) === Number(route.target)) {
    submitAnswer(question.answer);
    return;
  }
  render();
}

function choosePatternToken(value) {
  const question = currentQuestion();
  if (!question || question.solved || question.responseType !== "pattern-compose") return;
  const expected = Array.isArray(question.patternSlots) ? question.patternSlots : [];
  if (!question.options?.some((token) => token.id === value) || view.patternSlots.length >= expected.length) return;
  clearRetryFeedback();
  view.patternSlots = [...view.patternSlots, value];
  playSfx("tap");
  playLegacyLayerTone(question, view.patternSlots.length - 1, view.patternSlots.length === expected.length);
  render();
}

function submitPatternSlots() {
  const question = currentQuestion();
  if (!question || question.solved || question.responseType !== "pattern-compose") return;
  if (view.patternSlots.length !== question.patternSlots.length) return;
  submitAnswer([...view.patternSlots]);
}

function chooseSortItem(index) {
  const question = currentQuestion();
  if (!question || question.solved || question.responseType !== "sequence") return;
  if (!question.sortItems.some((item) => item.index === index) || view.sequence.includes(index)) return;
  clearRetryFeedback();
  view.sequence = [...view.sequence, index];
  playSfx("tap");
  playLegacyLayerTone(question, view.sequence.length - 1, view.sequence.length === question.sortItems.length);
  render();
}

function submitSort() {
  const question = currentQuestion();
  if (!question || question.solved || question.responseType !== "sequence") return;
  if (view.sequence.length !== question.sortItems.length) return;
  submitAnswer([...view.sequence]);
}

function choosePlacement(value) {
  const question = currentQuestion();
  if (!question || question.solved || question.responseType !== "place") return;
  if (!question.placeChoices?.some((choice) => String(choice.value) === String(value))) return;
  clearRetryFeedback();
  view.placement = value;
  playSfx("tap");
  playLegacyLayerTone(question, 0, true);
  render();
}

function submitPlacement() {
  const question = currentQuestion();
  if (!question || question.solved || question.responseType !== "place" || view.placement === null) return;
  submitAnswer(view.placement);
}

function setBuilderPart(part, value) {
  const question = currentQuestion();
  if (!question || question.solved || question.responseType !== "builder") return;
  if (!Object.hasOwn(question.builder, part)) return;
  clearRetryFeedback();
  view.builder = { ...view.builder, [part]: value };
  playSfx("tap");
  playLegacyLayerTone(question, part === "tens" ? 0 : 4, Boolean(view.builder.tens !== null && view.builder.ones !== null));
  render();
}

function submitBuilder() {
  const question = currentQuestion();
  if (!question || question.solved || question.responseType !== "builder") return;
  if (view.builder.tens === null || view.builder.ones === null) return;
  submitAnswer({ ...view.builder });
}

function adjustClockDraft(part, delta) {
  const question = currentQuestion();
  if (!question || question.solved || question.responseType !== "clockset") return;
  clearRetryFeedback();
  if (part === "hour") {
    const hour = ((view.clockDraft.hour - 1 + delta + 120) % 12) + 1;
    view.clockDraft = { ...view.clockDraft, hour };
  } else if (part === "minute") {
    const minute = (((view.clockDraft.minute / 30) + delta + 20) % 2) * 30;
    view.clockDraft = { ...view.clockDraft, minute };
  } else {
    return;
  }
  playSfx("tap");
  playLegacyLayerTone(question, part === "hour" ? view.clockDraft.hour : view.clockDraft.minute / 30, true);
  render();
}

function submitClockDraft() {
  const question = currentQuestion();
  if (!question || question.solved || question.responseType !== "clockset") return;
  submitAnswer(clockTimeLabel(view.clockDraft.hour, view.clockDraft.minute));
}

function submitAnswer(value) {
  const active = view.active;
  if (!active) return;
  const question = active.questions[active.index];
  if (question.solved) return;

  active.submissions += 1;
  question.tries = question.tries || 0;
  const firstAttempt = question.tries === 0;
  const correct = isCorrect(question, value);
  question.lastAnswer = value;
  recordLearningAttempt(active.stage, question, correct, firstAttempt);
  if (correct) {
    const reward = question.rewarded ? 0 : grantQuestionReward();
    if (!question.rewarded) {
      question.rewarded = true;
      active.earnedShards += reward;
    }
    if (firstAttempt) active.firstTry += 1;
    question.solved = true;
    improveMastery(active.stage.areaId, 2);
    if (active.isTreasure) recoverTreasure(active.noteId);
    const gift = active.isTreasure ? null : grantFirstGlowUp();
    const atelierEvent = active.isTreasure ? null : grantAtelierThread();
    if (atelierEvent?.completed) active.atelierUnlocked = atelierEvent.lookId;
    view.feedback = {
      kind: "good",
      title: question.world?.successLine || question.stageGame?.reward || "ぴったり！",
      text: gift
        ? `${gift.name}が とどいたよ！`
        : reward
          ? "きらりん、できた！"
          : "さいごまで できたね！",
      reward,
      gift,
      atelier: atelierEvent
    };
  } else {
    question.tries += 1;
    view.hintIndex = Math.max(view.hintIndex, Math.min(1, question.tries - 1));
    const fractionSteps = fractionHintSteps(question);
    if (fractionSteps) view.fractionHintClosed = false;
    const scaffold = fractionSteps
      ? fractionSteps[view.hintIndex]?.title
      : question.tries >= 2 ? question.hints[1] : (question.misconception || question.hints[0]);
    addTreasureNote(active.stage, question);
    view.feedback = {
     kind: "try",
      title: "だいじょうぶ、もういちど",
      text: scaffold
    };
    // 直前の選択を赤く残し続けず、次の一手をまっさらな気持ちで試せるようにする。
    // 間違いの記録は学習用プロフィールだけに残し、子どもの画面では責めない。
    question.lastAnswer = null;
    // 並べかえは、答えを残したままだと次の挑戦ができないため、
    // フィードバックを出した後に新しい順番を組み直せるようにする。
    if (question.responseType === "sequence") view.sequence = [];
    if (question.responseType === "pattern-compose") view.patternSlots = [];
    if (question.responseType === "curriculum-lab") {
      const previousInput = view.curriculumInput || {};
      view.curriculumInput = {
        ...previousInput,
        selectedValue: null,
        typed: "",
        clueOpen: Boolean(previousInput.clueOpen),
        estimate: previousInput.estimate || null
      };
    }
  }
  state.stats.totalAnswers += 1;
  saveState();
  render();
  const joy = correct ? playJoyFor(active) : null;
  playSfx(correct ? "bloom" : "try", question.stageGame?.effect || question.mode, joy);
  if (!correct) playLegacyLayerTone(question, 1, false);
  triggerMoment(correct ? "correct" : "try", question.stageGame?.effect || question.mode, joy);
}

// ボタンの data-value は文字列、盤面操作は数値で届く。Number() にそのまま
// 渡すと空文字や空白が 0 になり、選択肢にない入力まで正答になり得るため、
// 数の答えは画面が送る表記そのものだけを受け付ける。
function isExactAnswerValue(value, expected) {
  if (typeof expected === "number") {
    if (typeof value === "number") return Number.isFinite(value) && value === expected;
    return typeof value === "string" && value === String(expected);
  }
  return (typeof value === "string" || typeof value === "number") && String(value) === String(expected);
}

function isCorrect(question, value) {
  if (typeof question?.checkAnswer === "function") return Boolean(question.checkAnswer(value));
  if (question?.contentContract === "common-denominator-convert") {
    const submitted = String(value ?? "").match(/^\s*(\d+)\s*\/\s*(\d+)\s*$/);
    const expected = String(question.answer).match(/^(\d+)\/(\d+)$/);
    return Boolean(submitted && expected && Number(submitted[1]) === Number(expected[1]) && Number(submitted[2]) === Number(expected[2]));
  }
  if (question?.answerKey) return canonicalAnswerKey(value) === question.answerKey;
  if (Array.isArray(question.answer)) {
    return Array.isArray(value)
      && value.length === question.answer.length
      && value.every((item, index) => isExactAnswerValue(item, question.answer[index]));
  }
  if (question.responseType === "pattern-compose") {
    return Array.isArray(value)
      && Array.isArray(question.answer)
      && value.length === question.answer.length
      && value.every((item, index) => isExactAnswerValue(item, question.answer[index]));
  }
  if (question.responseType === "sequence") {
    return Array.isArray(value)
      && Array.isArray(question.answer)
      && value.length === question.answer.length
      && value.every((item, index) => isExactAnswerValue(item, question.answer[index]));
  }
  if (question.responseType === "builder") {
    if (value && typeof value === "object") {
      return isExactAnswerValue(value?.tens, question.builder?.tens)
        && isExactAnswerValue(value?.ones, question.builder?.ones);
    }
    // 生成器の正答値も自己採点できるように残しつつ、画面では上の
    // 「10の束＋ばら」を組み立てる操作だけを使う。
    return isExactAnswerValue(value, Number(question.builder?.tens) * 10 + Number(question.builder?.ones));
  }
  if (question.mode === "count") return isExactAnswerValue(value, question.answer);
  // Every rendered control transports the canonical answer value.  In
  // particular, shape cards no longer accept a matching prefix such as
  // "circle:0" for the answer "circle".
  if (question.mode === "shape") return String(value) === String(question.answer);
  if (question.mode === "size" || question.mode === "order") return isExactAnswerValue(value, question.answer);
  return String(value) === String(question.answer);
}

function answerChoiceClass(question, value) {
  if (question.responseType === "sequence") return question.solved ? "answer-correct" : "";
  if (question.responseType === "builder") return "";
  if (question.solved && isCorrect(question, value)) return "answer-correct";
  if (!question.solved && question.lastAnswer !== null && question.lastAnswer !== undefined && String(question.lastAnswer) === String(value)) {
    return "answer-wrong";
  }
  return "";
}

function renderAnswerMark(question, value) {
  const answerClass = answerChoiceClass(question, value);
  if (!answerClass) return "";
  return `<span class="answer-state-mark" aria-hidden="true">${answerClass === "answer-correct" ? "✓" : "ここ"}</span>`;
}

function nextQuestion() {
  const active = view.active;
  if (!active) return;
  // UI には正答後だけ「つぎへ」を出すが、連打・古いDOM・拡張機能から
  // 呼ばれても未解答のまま進行や報酬へ到達しないよう、状態遷移でも守る。
  if (!active.questions[active.index]?.solved) return;
  stopQuestionSpeech();
  if (active.index >= active.questions.length - 1) {
    finishStage();
    return;
  }
  active.index += 1;
  active.questions[active.index].startedAt = Date.now();
  resetQuestionInteractionState(active.questions[active.index]);
  view.feedback = null;
  view.hintIndex = -1;
  view.resetScreenScroll = true;
  render();
}

function finishTreasure() {
  stopQuestionSpeech();
  view.active = null;
  view.feedback = null;
  view.selected = new Set();
  view.screen = "notebook";
  view.resetScreenScroll = true;
  render();
}

function finishStage() {
  const active = view.active;
  if (!active || active.isTreasure) return;
  if (!active.questions.length || active.questions.some((question) => !question.solved)) return;
  stopQuestionSpeech();
  const stars = Math.max(1, Math.round((active.firstTry / active.questions.length) * 3));
  const xp = 35 + active.stage.level * 2;
  const coins = 18 + active.stage.level + (active.coop ? 10 : 0);
  const previous = state.completedStages[active.stage.id];
  const drop = grantStageDrop(active.stage);
  const sticker = grantStickerDrop(active.stage);
  addXp(xp);
  const petEvent = grantPetLearningXp(active.stage, {
    firstCompletion: !previous,
    // 1回のステージ完走にだけ紐づくキー。再描画や二重送信では増えない。
    awardId: `${active.stage.id}:${state.stats.totalStages + 1}`
  });
  state.stats.coins += coins;
  state.stats.totalStages += 1;
  const breakSuggestion = recordStageCompletion();
  state.garden.treeReady = gardenHasFacility("tree");
  state.garden.harvestReady = gardenHasFacility("garden");

  state.completedStages[active.stage.id] = {
    stars: previous ? Math.max(previous.stars, stars) : stars,
    times: previous ? previous.times + 1 : 1,
    completedAt: new Date().toISOString()
  };
  // 島から始めた「今日の小さなぼうけん」と一致したときだけ、花の地図を育てる。
  // それ以外の完走や連打では何も変えない、低圧の一日一回設計。
  const dailyQuest = dailyGrowth?.completeForStage?.(active.stage.id);
  const gardenGift = previous ? null : unlockGardenGrowth();
  const gardenGifts = unlockGardenJourney();
  improveMastery(active.stage.areaId, 5);
  placementEngine?.observeCompletion?.(active.stage, active.questions, `${active.stage.id}:${active.sessionSeed}:${state.stats.totalStages}`);

  view.result = {
    stage: active.stage,
    stars,
    xp,
    coins,
    shards: active.earnedShards,
    drop,
    sticker,
    petEvent,
    gardenGift,
    gardenGifts,
    dailyQuestCompleted: Boolean(dailyQuest?.completed),
    atelierUnlocked: active.atelierUnlocked || null,
    joy: playJoyFor(active),
    breakSuggestion,
    message: active.coop ? "いっしょにさいごまで考えました。" : "さいごまで考えました。"
  };
  view.active = null;
  view.feedback = null;
  view.selected = new Set();
  view.resetScreenScroll = true;
  saveState();
  render();
  playSfx("reward", active.stage.game?.effect || active.stage.mode);
  triggerMoment("reward", active.stage.game?.effect || active.stage.mode);
}

function grantQuestionReward() {
  // 間違えた回数や連打で額が変わらない、見通しのよい正答ごほうび。
  const amount = 3;
  state.stats.shards += amount;
  return amount;
}

function grantFirstGlowUp() {
  if (state.onboarding?.firstGlowUpClaimed) return null;
  state.onboarding = { ...(state.onboarding || {}), firstGlowUpClaimed: true };
  // 初めての正解は、端の数字ではなく「自分が変わる」瞬間にする。すでに
  // 取得済みなら別の実在ドレスを選び、空のごほうびにはしない。
  const item = ["dress_apple_apron", "dress_shape_pastel", "dress_order_lane"]
    .map(itemById)
    .find((candidate) => candidate && !state.inventory.includes(candidate.id));
  if (!item) return null;
  state.inventory.push(item.id);
  return item;
}

function grantStageDrop(stage) {
  const preferred = LEARN_REWARD_ITEMS.filter((item) => item.area === stage.areaId && !state.inventory.includes(item.id));
  const avatarPool = AVATAR_PROGRESS_ITEMS.filter((item) => !state.inventory.includes(item.id));
  const fallback = LEARN_REWARD_ITEMS.filter((item) => !state.inventory.includes(item.id));
  // テーマ報酬とアバター素材を交互に出して、毎回の達成感を残す。
  const pool = preferred.length
    ? preferred
    : avatarPool.length
      ? avatarPool
      : fallback;
  if (!pool.length) {
    state.stats.shards += 12;
    return null;
  }
  const item = pool[(stage.level + stage.order + state.stats.totalStages) % pool.length];
  state.inventory.push(item.id);
  return item;
}

function grantStickerDrop(stage) {
  const preferred = STICKER_DEFS.filter((sticker) => sticker.area === stage.areaId);
  const pool = preferred.length ? preferred : STICKER_DEFS;
  const sticker = pool[(stage.level + state.stats.totalStages) % pool.length];
  if (state.stickers.owned.includes(sticker.id)) {
    state.stickers.duplicates += 1;
    toast("だぶりシールが1まい、交換ポイントになりました。");
    return null;
  }
  state.stickers.owned.push(sticker.id);
  // A reward is collected; the child chooses where and when to paste it.
  state.stats.stickers = state.stickers.owned.length;
  return sticker;
}

function unlockGardenGrowth() {
  const completedCount = Object.keys(state.completedStages).length;
  const gift = GARDEN_GROWTH_DEFS.find((decor) => completedCount >= decor.at && !state.garden.decorations.includes(decor.id));
  if (!gift) return null;
  state.garden.decorations.push(gift.id);
  return gift;
}

function addXp(amount) {
  state.stats.xp += amount;
  while (state.stats.xp >= xpToNext(state.stats.level)) {
    state.stats.xp -= xpToNext(state.stats.level);
    state.stats.level += 1;
    toast(`レベル ${state.stats.level} になりました。`);
  }
}

function xpToNext(level) {
  return 70 + level * 30;
}

function improveMastery(areaId, amount) {
  if (!areaId || !state.mastery[areaId]) state.mastery[areaId] = 0;
  state.mastery[areaId] = Math.min(100, state.mastery[areaId] + amount);
}

function addTreasureNote(stage, question) {
  if (stage.id === "treasure") return;
  const noteKey = `${stage.id}:${question.prompt}:${question.answer}`;
  if (state.notebook.some((note) => note.key === noteKey && !note.recovered)) return;
  state.notebook.push({
    id: `note-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    key: noteKey,
    areaId: stage.areaId,
    areaName: stage.areaName || stage.name,
    question: cloneQuestion(question),
    recovered: false,
    createdAt: new Date().toISOString()
  });
}

function recoverTreasure(noteId) {
  const note = state.notebook.find((candidate) => candidate.id === noteId);
  if (!note || note.recovered) return;
  note.recovered = true;
  note.recoveredAt = new Date().toISOString();
  state.stats.jewels += 3;
  toast("たからものジュエルが3こふえました。");
}

function cloneQuestion(question) {
  const clone = JSON.parse(JSON.stringify(question));
  delete clone.calculationBeadHintUsed;
  clone.solved = false;
  clone.tries = 0;
  return clone;
}

function togglePick(index) {
  const active = view.active;
  if (!active) return;
  const question = active.questions[active.index];
  if (question.solved) return;
  if (view.selected.has(index)) {
    view.selected.delete(index);
  } else {
    view.selected.add(index);
  }
  clearRetryFeedback();
  playSfx("tap");
  playLegacyLayerTone(question, index, view.selected.size === Number(question.slotFill?.targetCount || question.answer));
  render();
}

function activeSoundQuestion() {
  const question = currentQuestion();
  return question?.responseType === "sound-mini-game" && question.soundGame ? question : null;
}

function activeSoundCue() {
  const question = currentQuestion();
  const game = question?.soundGame || question?.soundLayer;
  return question && game ? { question, game } : null;
}

function replaySoundGameCue() {
  const cue = activeSoundCue();
  if (!cue || cue.question.solved) return;
  clearRetryFeedback();
  view.soundGame = { ...currentSoundGameState(), heard: true, notice: "光の順も見ながら、何回でも聞いてね。" };
  playToneSequence(cue.game.palette, cue.game.cue, 0.32);
  render();
}

function chooseSoundToken(index) {
  const question = activeSoundQuestion();
  if (!question || question.solved || !Number.isInteger(index)) return;
  const game = question.soundGame;
  const soundState = currentSoundGameState();
  clearRetryFeedback();
  if (["count", "pack", "pluck"].includes(game.interaction)) {
    const selected = soundState.selected || [];
    const next = selected.includes(index) ? selected.filter((value) => value !== index) : [...selected, index];
    view.soundGame = { ...soundState, selected: next, notice: next.length > game.targetCount ? "おとが多くなったら、ひとつ戻してみよう。" : "いい音！ 数えた印が残るよ。" };
    playMiniTone(game.palette, index % 5, next.length === game.targetCount);
    render();
    return;
  }
  if (["trace", "route"].includes(game.interaction)) {
    const position = Number(soundState.routePosition) || 0;
    if (index !== position) {
      view.soundGame = { ...soundState, notice: "光っている次の足あとから、ゆっくり進もう。" };
      playMiniTone(game.palette, Math.max(0, position % 4), false);
      render();
      return;
    }
    const nextPosition = position + 1;
    view.soundGame = { ...soundState, routePosition: nextPosition, notice: nextPosition >= game.targetCount ? "最後の音までつながった！" : "いい1歩！ つぎの星を鳴らそう。" };
    playMiniTone(game.palette, index % 6, nextPosition === game.targetCount);
    if (nextPosition >= game.targetCount) {
      submitAnswer(question.answer);
      return;
    }
    render();
  }
}

function chooseSoundPad(rawValue) {
  const question = activeSoundQuestion();
  if (!question || question.solved) return;
  const game = question.soundGame;
  if (!["echo", "loop"].includes(game.interaction)) return;
  const state = currentSoundGameState();
  const expected = game.interaction === "echo" ? game.cue : game.loopExpected;
  const value = game.interaction === "echo" ? Number(rawValue) : String(rawValue);
  if (!expected || state.input.length >= expected.length) return;
  clearRetryFeedback();
  view.soundGame = { ...state, input: [...state.input, value], notice: "音がひとつ増えたよ。最後までつなげよう。" };
  playMiniTone(game.palette, game.interaction === "echo" ? value : state.input.length % 5, state.input.length + 1 === expected.length);
  render();
}

function chooseSoundPair(side, index) {
  const question = activeSoundQuestion();
  if (!question || question.solved || question.soundGame.interaction !== "pair") return;
  const game = question.soundGame;
  const state = currentSoundGameState();
  const pairs = state.pairs || [];
  const limit = side === "left" ? game.pairLeft : game.pairRight;
  if (!Number.isInteger(index) || index < 0 || index >= limit) return;
  clearRetryFeedback();
  if (side === "left") {
    if (pairs.some((pair) => pair.left === index)) return;
    view.soundGame = { ...state, pairFirst: index, notice: "みぎのなかまを選ぶと、1拍ふえるよ。" };
  } else {
    if (!Number.isInteger(state.pairFirst) || pairs.some((pair) => pair.right === index)) return;
    const nextPairs = [...pairs, { left: state.pairFirst, right: index }];
    const complete = nextPairs.length >= Math.min(game.pairLeft, game.pairRight);
    view.soundGame = {
      ...state,
      pairs: nextPairs,
      pairFirst: null,
      notice: complete ? (game.needsAnswerChoice ? "音がそろったよ。余りを見て答えを選ぼう。" : "みんなの音がそろったよ！") : "もう1組、音をつなごう。"
    };
    playMiniTone(game.palette, nextPairs.length % 5, complete);
  }
  render();
}

function submitSoundGame() {
  const question = activeSoundQuestion();
  if (!question || question.solved) return;
  const game = question.soundGame;
  const state = currentSoundGameState();
  let correct = false;
  if (["count", "pack", "pluck"].includes(game.interaction)) correct = (state.selected || []).length === game.targetCount;
  if (game.interaction === "echo") correct = (state.input || []).length === game.cue.length && state.input.every((value, index) => Number(value) === Number(game.cue[index]));
  if (game.interaction === "loop") correct = (state.input || []).length === game.loopExpected.length && state.input.every((value, index) => String(value) === String(game.loopExpected[index]));
  if (game.interaction === "pair") {
    const complete = (state.pairs || []).length >= Math.min(game.pairLeft, game.pairRight);
    if (game.needsAnswerChoice && complete) {
      view.soundGame = { ...state, notice: "余りを見て、下の答えを選ぼう。" };
      render();
      return;
    }
    correct = complete;
  }
  if (game.interaction === "builder") correct = Number(state.builder?.tens) === game.targetTens && Number(state.builder?.ones) === game.targetOnes;
  if (game.interaction === "clock") correct = Number(state.clock?.hour) === game.targetHour && Boolean(state.clock?.half) === game.targetHalf;
  submitAnswer(correct ? question.answer : "__sound_miss__");
}

function undoSoundGameInput() {
  const question = activeSoundQuestion();
  if (!question || question.solved) return;
  const game = question.soundGame;
  const state = currentSoundGameState();
  if (["count", "pack", "pluck"].includes(game.interaction) && state.selected?.length) {
    view.soundGame = { ...state, selected: state.selected.slice(0, -1), notice: "ひとつ戻したよ。もう一度、好きな音を選ぼう。" };
  } else if (["echo", "loop"].includes(game.interaction) && state.input?.length) {
    view.soundGame = { ...state, input: state.input.slice(0, -1), notice: "最後の音を戻したよ。" };
  } else if (game.interaction === "pair" && state.pairs?.length) {
    view.soundGame = { ...state, pairs: state.pairs.slice(0, -1), notice: "最後のペアをほどいたよ。" };
  } else {
    return;
  }
  clearRetryFeedback();
  playMiniTone(game.palette, 1, false);
  render();
}

function resetSoundGameInput() {
  const question = activeSoundQuestion();
  if (!question || question.solved) return;
  const game = question.soundGame;
  if (!['echo', 'loop'].includes(game.interaction)) return;
  const state = currentSoundGameState();
  if (!state.input?.length) return;
  clearRetryFeedback();
  // 音を聞いた記憶（光のヒント）は残し、並べた入力だけを最初の状態へ戻す。
  view.soundGame = createSoundGameState({
    heard: Boolean(state.heard),
    notice: "はじめから、ゆっくり音をつなげよう。"
  });
  playMiniTone(game.palette, 0, false);
  render();
}

function chooseSoundAnswer(index) {
  const question = activeSoundQuestion();
  if (!question || question.solved) return;
  const game = question.soundGame;
  const choice = game.answerChoices?.[index];
  if (!choice) return;
  clearRetryFeedback();
  playMiniTone(game.palette, index % 5, String(choice.value) === String(question.answer));
  submitAnswer(choice.value);
}

function setSoundBuilderPart(part, value) {
  const question = activeSoundQuestion();
  if (!question || question.solved || question.soundGame.interaction !== "builder" || !["tens", "ones"].includes(part)) return;
  const state = currentSoundGameState();
  clearRetryFeedback();
  view.soundGame = { ...state, builder: { ...state.builder, [part]: value }, notice: part === "tens" ? "低い10の音を置いたよ。" : "高い1の音を置いたよ。" };
  playMiniTone(question.soundGame.palette, part === "tens" ? 0 : 4, false);
  render();
}

function setSoundClockHour(hour) {
  const question = activeSoundQuestion();
  if (!question || question.solved || question.soundGame.interaction !== "clock") return;
  const state = currentSoundGameState();
  clearRetryFeedback();
  view.soundGame = { ...state, clock: { ...state.clock, hour }, notice: `${hour}じの花が鳴ったよ。` };
  playMiniTone(question.soundGame.palette, hour % 5, false);
  render();
}

function toggleSoundClockHalf() {
  const question = activeSoundQuestion();
  if (!question || question.solved || question.soundGame.interaction !== "clock") return;
  const state = currentSoundGameState();
  clearRetryFeedback();
  view.soundGame = { ...state, clock: { ...state.clock, half: !state.clock.half }, notice: !state.clock.half ? "半分の拍を置いたよ。" : "半分の拍を戻したよ。" };
  playMiniTone(question.soundGame.palette, 2, false);
  render();
}

function chooseSoundMeasure(value) {
  const question = activeSoundQuestion();
  if (!question || question.solved || question.soundGame.interaction !== "measure") return;
  const correct = Number(value) === Number(question.soundGame.targetUnits);
  playMiniTone(question.soundGame.palette, Math.max(0, Number(value) - 1) % 6, correct);
  submitAnswer(correct ? question.answer : "__sound_miss__");
}

function showHint() {
  const active = view.active;
  if (!active || currentQuestion()?.solved) return;
  const previous = view.hintIndex;
  view.hintIndex = Math.min(2, view.hintIndex + 1);
  view.fractionHintClosed = false;
  if (view.hintIndex > previous) recordHint(active.stage);
  render();
}

function toggleFractionHint() {
  const question = activeCurriculumQuestion();
  if (question?.lab?.type !== "fraction" || question.solved) return;
  if (view.hintIndex < 0) { showHint(); return; }
  view.fractionHintClosed = !view.fractionHintClosed;
  render();
}

function equipItem(itemId) {
  const item = itemById(itemId);
  if (!item || !state.inventory.includes(itemId)) return;
  state.atelier.mode = "legacy";
  state.equipment[item.slot] = itemId;
  if (item.slot === "dress") {
    // ワンピ着用時は上下を隠す（データは保持）
    state.equipment.top = state.equipment.top || "top_cotton";
    state.equipment.bottom = state.equipment.bottom || "bottom_mint";
  }
  if (item.slot === "top" || item.slot === "bottom") {
    // セパレートを着たらワンピを外す
    state.equipment.dress = null;
  }
  toast(`${item.name}をきました。`);
  saveState();
  render();
  playSfx("equip");
  triggerMoment("reward", "dress");
}

function equipStarterLook(lookId) {
  const look = starterLooks().find((candidate) => candidate.id === lookId);
  if (!look) return;
  for (const itemId of Object.values(look.equipment)) {
    if (itemId && !state.inventory.includes(itemId)) state.inventory.push(itemId);
  }
  state.atelier.mode = "legacy";
  state.equipment = { ...state.equipment, ...look.equipment };
  saveState();
  render();
  toast(`${look.name}に へんしん！`);
  playSfx("equip", "dress");
  triggerMoment("reward", "dress");
}

function previewShopItem(itemId) {
  const item = SHOP_ITEMS.find((candidate) => candidate.id === itemId);
  if (!item) return;
  view.shopPreviewItemId = view.shopPreviewItemId === itemId ? null : itemId;
  render();
  playSfx("tap", "boutique");
}

function dressTabForSlot(slot) {
  return DRESS_TAB_GROUPS.find((group) => group.slots.includes(slot))?.id || "clothes";
}

function tryRewardItem() {
  state.atelier.mode = "legacy";
  const item = view.result?.drop;
  if (!item?.slot || !state.inventory.includes(item.id)) return;
  state.equipment[item.slot] = item.id;
  if (item.slot === "dress") {
    state.equipment.top = state.equipment.top || "top_cotton";
    state.equipment.bottom = state.equipment.bottom || "bottom_mint";
  }
  if (item.slot === "top" || item.slot === "bottom") state.equipment.dress = null;
  view.dressTab = dressTabForSlot(item.slot);
  view.screen = "dress";
  view.resetScreenScroll = true;
  view.result = null;
  saveState();
  render();
  toast(`${item.name}に へんしん！`);
  playSfx("reward");
  triggerMoment("reward", "dress");
}

function showFeedbackGift() {
  state.atelier.mode = "legacy";
  const item = view.feedback?.gift;
  if (!item?.slot || !state.inventory.includes(item.id)) return;
  state.equipment[item.slot] = item.id;
  view.dressTab = dressTabForSlot(item.slot);
  view.screen = "dress";
  view.resetScreenScroll = true;
  saveState();
  render();
  playSfx("equip", "dress");
}

function unequipSlot(slot) {
  const locked = ["hair", "eyes", "brows", "mouth", "blush", "socks", "shoes", "top", "bottom"];
  if (locked.includes(slot)) {
    toast("このばしょは、はずせません。");
    return;
  }
  state.equipment[slot] = null;
  toast(`${slotName(slot)}をはずしました。`);
  saveState();
  render();
}

function buyItem(itemId) {
  const item = itemById(itemId);
  if (!item || item.source !== "shop" || state.inventory.includes(itemId)) return;
  if (state.stats.shards < item.price) {
    toast("かけらがもう少しでたりそうです。");
    return;
  }
  state.stats.shards -= item.price;
  state.inventory.push(itemId);
  view.shopPreviewItemId = itemId;
  // 子どもが自分で選んだおしゃれは、画面を閉じても消えないことが大切。
  // 描画だけでは端末内のセーブに反映されないため、交換直後に確定する。
  saveState();
  toast(`${item.name}をこうかんしました。`);
  render();
  playSfx("reward");
  triggerMoment("reward", "boutique");
}

function placeSticker(stickerId) {
  if (!state.stickers.owned.includes(stickerId)) return;
  state.stickers.board = [stickerId, ...state.stickers.board.filter((id) => id !== stickerId)].slice(0, 12);
  state.stickers.layout = normaliseStickerLayout(state.stickers.layout, state.stickers.board);
  view.decoSelectedId = stickerId;
  saveState();
  toast("シールを ぺたっ！");
  render();
}

function selectDecoSticker(stickerId) {
  if (!state.stickers.board.includes(stickerId)) return;
  view.decoSelectedId = stickerId;
  render();
  playSfx("tap", "sticker");
}

function setDecoStickerPosition(stickerId, x, y) {
  if (!state.stickers.board.includes(stickerId)) return;
  if (!Number.isFinite(x) || !Number.isFinite(y)) return;
  x = Math.max(2, Math.min(88, x));
  y = Math.max(8, Math.min(82, y));
  const current = state.stickers.layout?.[stickerId] || { rotation: 0, scale: 1 };
  state.stickers.layout = { ...(state.stickers.layout || {}), [stickerId]: fitDecoSticker(stickerId, { ...current, x, y }) };
  view.decoSelectedId = stickerId;
  saveState();
  render();
  playSfx("tap", "sticker");
}

function fitDecoSticker(stickerId, layout) {
  const canvas = document.querySelector?.("[data-deco-canvas]");
  const sticker = Array.from(canvas?.querySelectorAll?.(".deco-sticker") || []).find((node) => node.dataset.stickerId === stickerId);
  if (!canvas?.clientWidth || !canvas?.clientHeight || !sticker?.offsetWidth) return layout;
  const radians = Number(layout.rotation || 0) * Math.PI / 180;
  const cosine = Math.abs(Math.cos(radians));
  const sine = Math.abs(Math.sin(radians));
  const scale = Number(layout.scale || 1);
  const halfWidth = ((sticker.offsetWidth * cosine + sticker.offsetHeight * sine) * scale / 2 + 6) / canvas.clientWidth * 100;
  const halfHeight = ((sticker.offsetWidth * sine + sticker.offsetHeight * cosine) * scale / 2 + 6) / canvas.clientHeight * 100;
  return { ...layout,
    x: Math.max(Math.min(halfWidth, 50), Math.min(100 - Math.min(halfWidth, 50), layout.x)),
    y: Math.max(Math.min(halfHeight, 50), Math.min(100 - Math.min(halfHeight, 50), layout.y))
  };
}

function moveDecoSticker(dx, dy) {
  const id = view.decoSelectedId;
  if (!id || !Number.isFinite(dx) || !Number.isFinite(dy)) return;
  const current = state.stickers.layout?.[id] || { x: 50, y: 50 };
  setDecoStickerPosition(id, current.x + dx, current.y + dy);
}

function transformDecoSticker(key, delta) {
  const id = view.decoSelectedId;
  if (!id || !state.stickers.board.includes(id) || !Number.isFinite(delta)) return;
  const current = state.stickers.layout?.[id] || { x: 50, y: 50, rotation: 0, scale: 1 };
  const next = { ...current };
  if (key === "rotation") next.rotation = Math.max(-30, Math.min(30, Number(current.rotation || 0) + delta));
  if (key === "scale") next.scale = Math.max(.65, Math.min(1.38, Number(current.scale || 1) + delta));
  state.stickers.layout = { ...(state.stickers.layout || {}), [id]: fitDecoSticker(id, next) };
  saveState();
  render();
  playSfx("tap", "sticker");
}

function removeDecoSticker() {
  const id = view.decoSelectedId;
  if (!id || !state.stickers.board.includes(id)) return;
  state.stickers.board = state.stickers.board.filter((candidate) => candidate !== id);
  const layout = { ...(state.stickers.layout || {}) };
  delete layout[id];
  state.stickers.layout = layout;
  view.decoSelectedId = state.stickers.board[0] || null;
  saveState();
  render();
  playSfx("tap", "sticker");
}

function exchangeDuplicateStickers() {
  if (state.stickers.duplicates < 3) return;
  const next = STICKER_DEFS.find((sticker) => !state.stickers.owned.includes(sticker.id));
  if (!next) {
    state.stats.shards += 20;
    state.stickers.duplicates -= 3;
    saveState();
    toast("かけら20こに交換しました。");
    render();
    return;
  }
  state.stickers.duplicates -= 3;
  state.stickers.owned.push(next.id);
  state.stickers.board = [next.id, ...state.stickers.board].slice(0, 12);
  state.stats.stickers = state.stickers.owned.length;
  saveState();
  toast(`${next.name}に交換しました。`);
  render();
}

function collectTree() {
  if (view.gardenEditing || !gardenFacilityIsPlaced("tree") || !state.garden.treeReady) return;
  const coins = 24 + state.stats.level * 2;
  state.stats.coins += coins;
  state.garden.treeReady = false;
  saveState();
  toast(`ちえのきからコインを${coins}こもらいました。`);
  render();
}

function harvestGarden() {
  if (view.gardenEditing || !gardenFacilityIsPlaced("garden") || !state.garden.harvestReady) return;
  const shards = 8 + Math.min(12, Object.keys(state.completedStages).length);
  state.stats.shards += shards;
  state.garden.harvestReady = false;
  saveState();
  toast(`はたけからかけらを${shards}こもらいました。`);
  render();
}

function visitIslandPlace(place) {
  if (!gardenFacilityIsPlaced(place) || view.gardenEditing) return false;
  if (place === "school") {
    openHelpPicker();
    return;
  }
  if (place === "home") {
    setScreen("dress");
    return;
  }
  if (place === "boutique") {
    setScreen("boutique");
    return;
  }
  if (place === "tree") {
    if (state.garden.treeReady) collectTree();
    else toast("ちえのきは、ステージをひとつできたら またきらきらするよ。");
    return;
  }
  if (place === "garden") {
    if (state.garden.harvestReady) harvestGarden();
    else toast("はたけは、ステージをひとつできたら またそだつよ。");
  }
}

function buyGardenDecor(itemId) {
  const decor = GARDEN_DECOR_SHOP.find((candidate) => candidate.id === itemId);
  if (!decor || state.garden.purchased.includes(itemId)) return;
  if (state.stats.coins < decor.price) {
    toast("街のおてつだいで、コインをあつめよう。");
    return;
  }
  state.stats.coins -= decor.price;
  state.garden.purchased.push(decor.id);
  state.garden.layout[decor.id] = null; toast(`${decor.name}が とどいたよ！`);
  saveState();
  render();
  playSfx("reward");
  triggerMoment("reward", "garden");
}

function expandGardenMap() {
  const next = GARDEN_EXPANSIONS[state.garden.expansionLevel + 1];
  if (view.gardenEditing || !next || gardenJourneyCount() < next.at) return false;
  state.garden.expansionLevel += 1;
  state.garden.mapExpanded = state.garden.expansionLevel === 4;
  if (state.garden.mapExpanded && !state.garden.decorations.includes(GARDEN_FINAL_DECOR.id)) {
    state.garden.decorations.push(GARDEN_FINAL_DECOR.id);
    state.garden.layout[GARDEN_FINAL_DECOR.id] = null;
  }
  saveState(); render();
  toast("おにわが ひろがったよ！");
  playSfx("reward", "garden");
  return true;
}

function likeIsland(islandId) {
  if (state.likedIslands[islandId]) return;
  state.likedIslands[islandId] = true;
  state.stats.coins += 5;
  saveState();
  toast("ハートをおくりました。");
  render();
}

function startCoLearn() {
  startHelp(automaticHelpRecommendation().stage.id, { coop: true });
  toast("いっしょに おてつだいしよう！");
}

function toggleSound() {
  const focusedControl = captureUiFocus();
  state.settings.soundEnabled = !state.settings.soundEnabled;
  if (!state.settings.soundEnabled && audioContext) {
    // フィーバーの予約音もここで止める。再オン時は新しいcontextで始める。
    const previousContext = audioContext;
    audioContext = null;
    try { previousContext.close?.()?.catch?.(() => {}); } catch (error) {
      console.debug("Could not close game sound", error);
    }
  }
  saveState();
  renderStats();
  restoreUiFocus(focusedControl);
  if (state.settings.soundEnabled) playSfx("tap");
  toast(state.settings.soundEnabled ? "おとをオンにしました。" : "おとをオフにしました。");
}

function ensureAudioContext() {
  if (state.settings?.soundEnabled === false) return null;
  const AudioCtor = window.AudioContext || window.webkitAudioContext;
  if (!AudioCtor) return null;
  try {
    if (!audioContext) audioContext = new AudioCtor();
    if (audioContext.state === "suspended") audioContext.resume().catch(() => {});
    return audioContext;
  } catch (error) {
    console.debug("Could not start game sound", error);
    return null;
  }
}

function soundPaletteSpec(palette = "marimba") {
  return {
    marimba: { notes: [523.25, 587.33, 659.25, 783.99, 880], wave: "sine", volume: 0.045 },
    bell: { notes: [659.25, 783.99, 987.77, 1174.66, 1318.51], wave: "sine", volume: 0.04 },
    drum: { notes: [196, 246.94, 293.66, 349.23, 392], wave: "triangle", volume: 0.055 },
    pluck: { notes: [392, 440, 523.25, 587.33, 659.25], wave: "triangle", volume: 0.042 },
    harp: { notes: [329.63, 392, 493.88, 587.33, 698.46], wave: "sine", volume: 0.04 },
    xylophone: { notes: [261.63, 329.63, 392, 523.25, 659.25, 783.99], wave: "triangle", volume: 0.047 }
  }[palette] || { notes: [523.25, 659.25, 783.99], wave: "sine", volume: 0.04 };
}

function scheduleMiniTone(context, palette, noteIndex = 0, delay = 0, accent = false) {
  const spec = soundPaletteSpec(palette);
  const frequency = spec.notes[Math.abs(Number(noteIndex) || 0) % spec.notes.length];
  const start = context.currentTime + Math.max(0, delay);
  const oscillator = context.createOscillator();
  const gain = context.createGain();
  oscillator.type = spec.wave;
  oscillator.frequency.setValueAtTime(frequency, start);
  gain.gain.setValueAtTime(0.0001, start);
  gain.gain.exponentialRampToValueAtTime(spec.volume * (accent ? 1.35 : 1), start + 0.012);
  gain.gain.exponentialRampToValueAtTime(0.0001, start + (accent ? 0.22 : 0.13));
  oscillator.connect(gain).connect(context.destination);
  oscillator.start(start);
  oscillator.stop(start + (accent ? 0.25 : 0.16));
}

function playMiniTone(palette = "marimba", noteIndex = 0, accent = false) {
  const context = ensureAudioContext();
  if (!context) return;
  try {
    scheduleMiniTone(context, palette, noteIndex, 0, accent);
  } catch (error) {
    console.debug("Could not play mini game tone", error);
  }
}

function playToneSequence(palette = "marimba", sequence = [], tempo = 0.32) {
  const context = ensureAudioContext();
  if (!context) return;
  try {
    (sequence || []).forEach((noteIndex, index) => scheduleMiniTone(context, palette, noteIndex, Number(tempo) * index, index === sequence.length - 1));
  } catch (error) {
    console.debug("Could not play mini game cue", error);
  }
}

function playSfx(kind = "tap", flavor = "", joy = null) {
  if (state.settings?.soundEnabled === false) return;
  const AudioCtor = window.AudioContext || window.webkitAudioContext;
  if (!AudioCtor) return;
  try {
    if (!audioContext) audioContext = new AudioCtor();
    if (audioContext.state === "suspended") audioContext.resume().catch(() => {});
    const patterns = {
      tap: [[587.33, 0, 0.045, "sine", 0.035]],
      equip: [[659.25, 0, 0.07, "sine", 0.045], [783.99, 0.07, 0.09, "sine", 0.04]],
      correct: [[659.25, 0, 0.075, "triangle", 0.055], [783.99, 0.07, 0.085, "triangle", 0.055], [1046.5, 0.16, 0.16, "sine", 0.06]],
      try: [[392, 0, 0.08, "sine", 0.035], [523.25, 0.1, 0.12, "sine", 0.04]],
      reward: [[523.25, 0, 0.07, "triangle", 0.05], [659.25, 0.08, 0.08, "triangle", 0.055], [783.99, 0.16, 0.09, "triangle", 0.055], [1046.5, 0.26, 0.18, "sine", 0.06]]
    };
    const flavorPitch = {
      lantern: 1.18,
      bloom: 1.08,
      ribbon: 0.92,
      bridge: 0.86,
      pet: 1.12,
      oven: 0.98,
      picnic: 1.04,
      float: 1.15,
      crystal: 1.24,
      sparkle: 1.1
    }[flavor] || 1;
    const now = audioContext.currentTime;
    for (const [frequency, delay, duration, wave, volume] of (kind === "bloom" && joy ? joySoundPattern(joy) : patterns[kind] || patterns.tap)) {
      const oscillator = audioContext.createOscillator();
      const gain = audioContext.createGain();
      oscillator.type = wave;
      oscillator.frequency.setValueAtTime(frequency * flavorPitch, now + delay);
      gain.gain.setValueAtTime(0.0001, now + delay);
      gain.gain.exponentialRampToValueAtTime(volume, now + delay + 0.012);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + delay + duration);
      oscillator.connect(gain).connect(audioContext.destination);
      oscillator.start(now + delay);
      oscillator.stop(now + delay + duration + 0.02);
    }
  } catch (error) {
    // 音を出せないブラウザでも学習体験は止めない。
    console.debug("Could not play game sound", error);
  }
}

function triggerMoment(kind = "correct", tone = "count", joy = null) {
  window.requestAnimationFrame(() => {
    const motionQuery = window.matchMedia ? window.matchMedia("(prefers-reduced-motion: reduce)") : null;
    const reduceMotion = Boolean(motionQuery?.matches);
    const panel = (joy ? document.querySelector(".joy-reward-cast") : null) || document.querySelector(".play-panel") || document.querySelector(".avatar-stage");
    const rect = panel?.getBoundingClientRect();
    const x = rect ? rect.left + rect.width * 0.52 : window.innerWidth * 0.5;
    const y = rect ? rect.top + rect.height * 0.4 : window.innerHeight * 0.45;
    const avatarClass = kind === "try" ? "avatar-reaction-try" : "avatar-reaction-correct";
    document.querySelectorAll(".avatar-doll, .pet-companion").forEach((companion) => {
      companion.classList.remove("avatar-reaction-correct", "avatar-reaction-try");
      companion.classList.add(avatarClass);
      window.setTimeout(() => companion.classList.remove(avatarClass), 1000);
    });
    if (reduceMotion) return;
    const layer = document.querySelector("#effectLayer");
    if (!layer) return;
    const burst = document.createElement("div");
    const safeTone = String(tone || "sparkle").replace(/[^a-z0-9_-]/gi, "").toLowerCase() || "sparkle";
    burst.className = `fx-burst fx-burst--${kind === "try" ? "try" : kind === "reward" ? "reward" : "correct"} fx-tone-${safeTone}${joy ? " fx-burst--joy" : ""}`;
    burst.style.setProperty("--x", `${x}px`);
    burst.style.setProperty("--y", `${y}px`);
    const pieces = joy ? ["fx-flower", "fx-heart", "fx-star", "fx-flower", "fx-sparkle"] : kind === "try" ? ["fx-puff", "fx-heart", "fx-sparkle", "fx-ring"] : ["fx-sparkle", "fx-star", "fx-confetti", "fx-heart", "fx-ring"];
    const count = joy ? (joy.complete ? 24 : 5 + joy.tier * 3) : kind === "reward" ? 14 : kind === "try" ? 7 : 10;
    for (let index = 0; index < count; index += 1) {
      const particle = document.createElement("span");
      particle.className = pieces[index % pieces.length];
      if (particle.className === "fx-flower") particle.textContent = "✿";
      const angle = (Math.PI * 2 * index) / count - Math.PI / 2;
      const distance = (joy ? (joy.complete ? 140 : 65 + joy.tier * 12) : kind === "reward" ? 84 : 62) + (index % 3) * 16;
      particle.style.setProperty("--travel-x", `${Math.cos(angle) * distance}px`);
      particle.style.setProperty("--travel-y", `${Math.sin(angle) * distance}px`);
      particle.style.setProperty("--delay", `${(index % 4) * 36}ms`);
      particle.style.setProperty("--duration", `${kind === "reward" ? 1050 : 820}ms`);
      particle.style.setProperty("--size", `${10 + (index % 3) * 4}px`);
      particle.style.setProperty("--spin", `${120 + index * 28}deg`);
      burst.append(particle);
    }
    if (kind !== "try" && !joy) {
      const flash = document.createElement("span");
      flash.className = "fx-screen-flash";
      flash.style.setProperty("--x", `${x}px`);
      flash.style.setProperty("--y", `${y}px`);
      burst.append(flash);
    }
    layer.append(burst);
    window.setTimeout(() => burst.remove(), 1300);
  });
}

function speakCurrentQuestion() {
  const question = view.active?.questions[view.active.index];
  if (!question) {
    toast("よみあげできるもんだいがありません。");
    return Promise.resolve();
  }
  const text = nyanlunaSpeechText(question);
  if (!text) {
    toast("よみあげることばがありません。");
    return Promise.resolve();
  }
  stopQuestionSpeech();
  return playNyanlunaSpeech(text);
}

function resetGame() {
  if (!view.parentVerified) {
    toast("ほごしゃのかたの確認がひつようです。");
    return;
  }
  const ok = window.confirm("セーブをけして、はじめからにしますか？");
  if (!ok) return;
  stopQuestionSpeech();
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    // 消去できない保存領域でも、今の画面を初期状態へ戻して遊び直せる。
    console.warn("Could not clear game data", error);
  }
  state = createInitialState();
  dailyGrowth?.reset?.();
  view = {
    screen: "island",
    world: "w0",
    active: null,
    result: null,
    helpPickerOpen: false,
    pausedHelps: {},
    selected: new Set(),
    sequence: [],
    placement: null,
    pairLinks: [],
    pairFirst: null,
    routeCursor: null,
    routeNote: "",
    patternSlots: [],
    builder: { tens: null, ones: null },
    clockDraft: { hour: 12, minute: 0 },
    soundGame: null,
    feedback: null,
    hintIndex: -1,
    fractionHintClosed: false,
    dressTab: "face",
    petMotion: null,
    gardenEditing: false,
    gardenTool: "objects",
    gardenSelectedId: "home",
    gardenSelectedFloor: "grass",
    gardenCursor: { x: 1, y: 1 },
    gardenMessage: "",
    gardenZoom: false,
    gardenScrollPositions: {},
    parentVerified: false,
    parentChallenge: null
  };
  render();
}

function areaProgress(areaId) {
  const stages = ALL_STAGES.filter((stage) => stage.areaId === areaId);
  const completed = stages.filter((stage) => state.completedStages[stage.id]).length;
  return Math.round((completed / stages.length) * 100);
}

function activeWorld() {
  const world = WORLDS.find((candidate) => candidate.id === view.world);
  return world && worldIsAvailable(world.id) ? world : WORLDS[0];
}

function stageSprite(stage) {
  if (!stage) return "numbers";
  if (stage.game?.sprite) return stage.game.sprite;
  return {
    count: "apple",
    compare: "numbers",
    shape: "shapes",
    size: "shapes",
    order: "flower",
    pattern: "stickerMacaron",
    number: "tenFrame",
    add: "bridge",
    subtract: "bridge",
    clock: "clock",
    length: "ruler"
  }[stage.mode] || "numbers";
}

function renderAssetSprite(spriteId, label = "", className = "") {
  return `
    <span
      class="asset-sprite ${className}"
      role="img"
      aria-label="${escapeHtml(String(label).replaceAll("<br>", ""))}"
      style="--src:url('${spriteUrl(spriteId)}')"
    ></span>
  `;
}

// 文字入りの実ボタン素材（OK/もどる/できた/おしい!）をそのままボタン化する。
function renderSpriteButton(action, spriteId, srLabel, { data = "", disabled = false, className = "" } = {}) {
  return `<button class="pill-sprite-button ${className}" data-action="${action}" ${data} ${disabled ? "disabled" : ""} aria-label="${escapeHtml(srLabel)}" style="background-image:url('${spriteUrl(spriteId)}')"></button>`;
}

function stickerById(stickerId) {
  return STICKER_DEFS.find((sticker) => sticker.id === stickerId);
}

function renderMeter(label, value) {
  return `
    <div class="meter">
      <div class="meter-label"><span>${label}</span><span>${value}%</span></div>
      <div class="meter-track" role="progressbar" aria-label="${escapeHtml(label)}" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${value}"><div class="meter-fill" style="--value:${value}%"></div></div>
    </div>
  `;
}

function renderDots(count) {
  return Array.from({ length: count }, () => `<span class="dot"></span>`).join("");
}

const SHAPE_SPRITES = {
  circle: "shapeCircle",
  square: "shapeSquare",
  triangle: "shapeTriangle",
  star: "shapeStar",
  diamond: "shapeDiamond"
};

function renderShape(id, color) {
  const spriteId = SHAPE_SPRITES[id];
  if (spriteId) {
    return `<span class="shape-sprite" role="img" aria-label="${id}" style="--src:url('${spriteUrl(spriteId)}')"></span>`;
  }
  const style = color ? ` style="--shape-color:${color}; background:${color};"` : "";
  return `<span class="shape ${id}"${style}></span>`;
}

function renderItemSwatch(item) {
  const badge = AVATAR_ACCESSORY_BADGES[item.id];
  if (badge) {
    return `<span class="item-swatch-badge av-badge-${badge.tone}" aria-hidden="true">${badge.symbol}</span>`;
  }
  const src = ITEM_SPRITE[item.id] || item.sprite;
  if (src) {
    const url = src.startsWith("./") ? src : `./assets/sprites/${src}`;
    const full = isFullCanvasSrc(url) || item.fullCanvas;
    if (item.slot === "hair" && full) {
      // 髪だけを白地に出すと顔の穴が「はげ」に見える。子どもが選ぶ画面では
      // いつもの素体と表情を下に敷いて、実際の着用イメージを見せる。
      return `<span class="item-swatch-avatar" role="img" aria-label="${escapeHtml(item.name)}" style="--avatar-base:url('${AV_BODY}');--avatar-blush:url('${avFaceV3("face_blush_normal")}');--avatar-eyes:url('${avFaceV3("face_eyes_open")}');--avatar-brows:url('${avFaceV3("face_brow_normal")}');--avatar-mouth:url('${avFaceV3("face_mouth_smile")}');--avatar-hair:url('${url}')"></span>`;
    }
    return `<span class="asset-sprite item-swatch-sprite item-swatch-slot-${item.slot} ${full ? "item-swatch-full" : ""}" role="img" aria-label="${escapeHtml(item.name)}" style="--src:url('${url}')"></span>`;
  }
  return `
    <div class="item-swatch-color" style="background:${item.color}"></div>
  `;
}

function isFullCanvasSrc(src) {
  return typeof src === "string" && (src.includes("avatar_parts_v3") || src.includes("avatar_footwear_v3") || src.includes("avatar_base_facefit_v3"));
}

function layerClass(slot, src) {
  const base = `av-layer av-${slot}`;
  return isFullCanvasSrc(src) ? `${base} av-full` : base;
}

function avatarLayerStyle(itemId, src) {
  const layout = LEGACY_AVATAR_LAYERS[itemId];
  const ratio = layout?.ratio ? `;--av-ratio:${layout.ratio}` : "";
  const width = layout?.width ? `;--av-width:${layout.width}` : "";
  return `--src:url('${src}')${ratio}${width}`;
}

// 顔：眉・目・口・ほっぺを equipment からフルキャンバス重ね
function renderFaceLayers(equipment = state.equipment) {
  const order = ["blush", "eyes", "brows", "mouth"];
  return order
    .map((part) => {
      const id = equipment?.[part];
      const src = id ? ITEM_AVLAYER[id] : null;
      return src
        ? `<span class="${layerClass(part, src)}" style="${avatarLayerStyle(id, src)}"></span>`
        : "";
    })
    .join("");
}

function isLongHairId(hairId) {
  return [
    "hair_v2_long",
    "hair_v2_twin",
    "hair_v2_ponytail",
    "hair_v2_braids",
    "hair_v2_hime",
    "hair_v2_wavy"
  ].includes(hairId);
}

function renderHairLayers(hairId, hairSrc) {
  const style = avatarLayerStyle(hairId, hairSrc);
  if (isFullCanvasSrc(hairSrc) && isLongHairId(hairId)) {
    // 前髪は顔の前、肩より下の髪は服の後ろへ。両方とも頭頂を含む同じ
    // 座標系なので、上側を切り落とさず40pxだけ重ねて生え際を守る。
    return `
      <span class="av-layer av-hair av-full av-hair-back" style="${style}"></span>
      <span class="av-layer av-hair av-full av-hair-front" style="${style}"></span>
    `;
  }
  return `<span class="${layerClass("hair", hairSrc)}" style="${style}"></span>`;
}

function renderAccessoryBadge(itemId) {
  const badge = AVATAR_ACCESSORY_BADGES[itemId];
  if (!badge) return "";
  return `<span class="av-accessory-badge av-badge-${badge.tone}" aria-hidden="true">${badge.symbol}</span>`;
}

function renderFootwearLayers(equipment, layer) {
  // 同じフルキャンバスで描いた 3 層。特例の一体画像を挟まないため、
  // どの組合せでも足→靴下→靴の順序と足首位置が変わらない。
  return layer("socks", "av-socks") + layer("shoes", "av-shoes");
}

function loadAvatarImage(source) {
  if (avatarImagesReady.has(source)) return Promise.resolve(true);
  if (avatarImageLoads.has(source)) return avatarImageLoads.get(source);
  const promise = new Promise((resolve) => {
    const bitmap = new window.Image();
    let finished = false;
    const complete = (ready) => {
      if (finished) return;
      finished = true;
      if (ready) avatarImagesReady.add(source);
      resolve(ready);
    };
    bitmap.onload = () => {
      if (typeof bitmap.decode === "function") bitmap.decode().then(() => complete(true), () => complete(false));
      else complete(true);
    };
    bitmap.onerror = () => complete(false);
    bitmap.src = source;
  });
  avatarImageLoads.set(source, promise);
  promise.then((ready) => { if (!ready) avatarImageLoads.delete(source); });
  return promise;
}

function revealReadyAvatars() {
  if (typeof window?.Image !== "function") return;
  const avatars = document.querySelectorAll?.(".avatar-doll.is-loading[data-avatar-sources]") || [];
  for (const avatar of avatars) {
    const sources = JSON.parse(avatar.dataset.avatarSources);
    avatar.dataset.avatarLabel ||= avatar.getAttribute("aria-label");
    Promise.all(sources.map(loadAvatarImage)).then((ready) => {
      if (!avatar.isConnected) return;
      avatar.setAttribute("aria-busy", "false");
      if (ready.every(Boolean)) {
        avatar.classList.remove("is-loading", "has-load-error");
        avatar.setAttribute("aria-label", avatar.dataset.avatarLabel);
      }
      else {
        avatar.classList.add("has-load-error");
        avatar.setAttribute("aria-label", `${avatar.dataset.avatarLabel}。画像を読み込めませんでした。`);
      }
    });
  }
}

// レイヤー順: 素体（足を含む） → 靴下 → 靴 → 服 → 顔 → 髪 → ヘアアクセ → ピン → バッグ
function renderAvatarLayered(equipment = state.equipment, ariaLabel = "わたしのアバター") {
  if (equipment === state.equipment && state.atelier?.mode !== "legacy") return renderAtelierAvatar(state.atelier, ariaLabel);
  return renderLegacyAvatarLayered(equipment, ariaLabel);
}

function renderLegacyAvatarLayered(equipment = state.equipment, ariaLabel = "わたしのアバター") {
  const eq = equipment || state.equipment;
  const layer = (slot, cls) => {
    const id = eq[slot];
    const src = id ? ITEM_AVLAYER[id] : null;
    if (!src) return "";
    const full = isFullCanvasSrc(src) ? " av-full" : "";
    return `<span class="av-layer ${cls}${full}" style="${avatarLayerStyle(id, src)}"></span>`;
  };
  const hairId = eq.hair || "hair_v2_bob_pink";
  const hairSrc = ITEM_AVLAYER[hairId] || avFaceV3("hair_bob_pink");
  const clothes = eq.dress
    ? layer("dress", "av-dress")
    : layer("bottom", "av-bottom") + layer("top", "av-top");
  const layers = `
      <span class="av-layer av-base av-legs" style="--src:url('${AV_BODY}')"></span>
      ${renderFootwearLayers(eq, layer)}
      ${clothes}
      ${renderFaceLayers(eq)}
      ${renderHairLayers(hairId, hairSrc)}
      ${layer("head", "av-head")}
      ${renderAccessoryBadge(eq.accessory)}
      ${layer("bag", "av-bag")}
  `;
  const sources = [...new Set([...layers.matchAll(/url\('([^']+)'\)/g)].map((match) => match[1]))];
  const canLoad = typeof window?.Image === "function";
  const loading = canLoad && !sources.every((source) => avatarImagesReady.has(source));
  return `<div class="avatar-doll${loading ? " is-loading" : ""}" role="img" aria-label="${escapeHtml(ariaLabel)}"${canLoad ? ` aria-busy="${loading}" data-avatar-sources="${escapeHtml(JSON.stringify(sources))}"` : ""}>${layers}</div>`;
}

function renderAvatarSvg() {
  const hair = equippedItem("hair") || itemById("hair_berry");
  const head = equippedItem("head");
  const top = equippedItem("top") || itemById("top_cotton");
  const bottom = equippedItem("bottom") || itemById("bottom_mint");
  const dress = equippedItem("dress");
  const shoes = equippedItem("shoes") || itemById("shoes_cream");
  const accessory = equippedItem("accessory");
  const bag = equippedItem("bag");
  const topColor = dress ? dress.color : top.color;
  const bottomColor = dress ? dress.color : bottom.color;

  return `
    <svg class="avatar-svg" viewBox="0 0 220 280" role="img" aria-label="アバター">
      <ellipse cx="110" cy="256" rx="62" ry="13" fill="rgba(64,56,71,.16)"/>
      ${bag ? `<rect x="148" y="145" width="34" height="48" rx="12" fill="${bag.color}" stroke="#6d5570" stroke-width="3"/>` : ""}
      <path d="M73 124 C64 154 62 191 77 226 L143 226 C158 190 155 154 147 124 Z" fill="${bottomColor}" stroke="#6d5570" stroke-width="3"/>
      <path d="M72 121 C80 99 140 99 148 121 L143 168 L77 168 Z" fill="${topColor}" stroke="#6d5570" stroke-width="3"/>
      ${dress ? `<path d="M83 159 L137 159 L158 226 L62 226 Z" fill="${dress.color}" opacity=".92" stroke="#6d5570" stroke-width="3"/>` : ""}
      <path d="M73 127 C47 140 43 171 58 181" fill="none" stroke="#f3b7a7" stroke-width="15" stroke-linecap="round"/>
      <path d="M147 127 C173 140 177 171 162 181" fill="none" stroke="#f3b7a7" stroke-width="15" stroke-linecap="round"/>
      <circle cx="110" cy="75" r="53" fill="${hair.color}" stroke="#6d5570" stroke-width="4"/>
      <circle cx="110" cy="82" r="44" fill="#ffd9c9" stroke="#6d5570" stroke-width="3"/>
      <path d="M67 78 C75 39 98 31 121 35 C142 38 155 54 160 78 C139 69 113 58 67 78 Z" fill="${hair.color}"/>
      <circle cx="94" cy="87" r="5" fill="#403847"/>
      <circle cx="126" cy="87" r="5" fill="#403847"/>
      <path d="M98 107 C106 113 116 113 124 107" fill="none" stroke="#8b5064" stroke-width="4" stroke-linecap="round"/>
      <circle cx="78" cy="100" r="7" fill="#ffb6c7" opacity=".8"/>
      <circle cx="142" cy="100" r="7" fill="#ffb6c7" opacity=".8"/>
      ${head ? `<path d="M91 34 L110 50 L129 34 L134 61 L86 61 Z" fill="${head.color}" stroke="#6d5570" stroke-width="3" stroke-linejoin="round"/>` : ""}
      ${accessory ? `<circle cx="146" cy="132" r="11" fill="${accessory.color}" stroke="#6d5570" stroke-width="3"/>` : ""}
      <path d="M84 226 L84 245" stroke="#ffd9c9" stroke-width="14" stroke-linecap="round"/>
      <path d="M136 226 L136 245" stroke="#ffd9c9" stroke-width="14" stroke-linecap="round"/>
      <ellipse cx="80" cy="249" rx="22" ry="10" fill="${shoes.color}" stroke="#6d5570" stroke-width="3"/>
      <ellipse cx="140" cy="249" rx="22" ry="10" fill="${shoes.color}" stroke="#6d5570" stroke-width="3"/>
    </svg>
  `;
}

function itemById(itemId) {
  return ITEM_DEFS.find((item) => item.id === itemId);
}

function equippedItem(slot) {
  return itemById(state.equipment[slot]);
}

function slotName(slot) {
  return {
    hair: "ヘア",
    eyes: "め",
    brows: "まゆ",
    mouth: "くち",
    blush: "ほっぺ",
    head: "ヘアアクセ",
    top: "トップス",
    bottom: "ボトムス",
    dress: "ワンピース",
    socks: "くつした",
    shoes: "くつ",
    accessory: "アクセ",
    bag: "バッグ"
  }[slot] || slot;
}

function shuffle(items) {
  return items
    .map((item, index) => ({ item, sort: Math.sin((index + 1) * 999) + Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ item }) => item);
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function toast(message, { key } = {}) {
  const area = document.querySelector("#toastArea");
  if (key) {
    Array.from(area.querySelectorAll?.("[data-toast-key]") || []).filter((node) => node.dataset?.toastKey === key).forEach((node) => node.remove());
  }
  const node = document.createElement("div");
  node.className = "toast";
  if (key) node.dataset.toastKey = key;
  node.textContent = message;
  area.append(node);
  window.setTimeout(() => node.remove(), 2800);
}
